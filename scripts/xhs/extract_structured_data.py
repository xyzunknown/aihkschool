#!/usr/bin/env python3
"""
Phase 4: AI structured extraction using Claude API.

Reads raw posts (and optionally comments) and produces structured data
for each school using Claude API batch processing.

Usage:
    python -m scripts.xhs.extract_structured_data
    python -m scripts.xhs.extract_structured_data --include-comments
    python -m scripts.xhs.extract_structured_data --school 619841
    python -m scripts.xhs.extract_structured_data --dry-run  # preview only
"""
from __future__ import annotations

import argparse
import json
import os
import sys
import time
from datetime import datetime
from pathlib import Path

if __name__ == "__main__":
    sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from scripts.xhs import config
from scripts.xhs.utils import load_json, save_json, chunk_list

# ─── Extraction prompt ───────────────────────────────────────────────

EXTRACTION_SYSTEM_PROMPT = """你是一个香港幼稚园信息提取助手。你的任务是从小红书帖子中提取结构化信息。

## 规则

1. 只提取帖子中**明确提到的事实**，不要推断或编造。
2. 如果帖子讨论的不是目标幼稚园，返回 {"relevant": false}。
3. 如果帖子讨论的是小学（提到 P1/小一/升小/统一派位），返回 {"relevant": false}。
4. 对于多分校学校，如果帖子中有具体分校线索（地名/地址），填入 branch_hint 字段。
5. 一篇帖子可能包含多种类型的信息（面试+费用+时间线），全部提取。
6. 评论中的信息和正文同等重要，同样提取。每条有价值的评论单独生成一条 extracted_items。

## 输出格式

返回严格的 JSON 数组，每篇帖子一个对象。格式如下：

```json
[
  {
    "post_id": "原始帖子ID",
    "relevant": true,
    "is_kindergarten": true,
    "branch_hint": "小西灣" 或 null,
    "overall_sentiment": "positive" 或 "neutral" 或 "negative",
    "extracted_items": [
      {
        "content_type": "interview",
        "interview_year": "2025",
        "interview_grade": "K1",
        "interview_format": "group",
        "interview_group_size": 6,
        "interview_duration_minutes": 20,
        "interview_keywords": ["积木", "拼图", "英文颜色"],
        "parent_involved": false,
        "result": "admitted",
        "result_wait_days": 7,
        "source_type": "post"
      },
      {
        "content_type": "fee",
        "fee_type": "textbook",
        "fee_amount_low": 500,
        "fee_amount_high": 800,
        "fee_period": "yearly",
        "fee_year": "2025",
        "source_type": "comment"
      },
      {
        "content_type": "timeline",
        "timeline_year": "2025",
        "event_type": "interview_notice",
        "event_month": 10,
        "event_day": 15,
        "source_type": "post"
      },
      {
        "content_type": "general",
        "positive_keywords": ["老师有爱心", "活动丰富"],
        "negative_keywords": ["等候时间长"],
        "source_type": "comment"
      }
    ],
    "competition_signals": {
      "multi_round": true,
      "high_applicant_count": true,
      "mentioned_ratio": "报了300个收30个",
      "waitlist_position": null
    }
  }
]
```

## 枚举值

### content_type
- interview：面试经验
- fee：费用信息
- timeline：时间线数据点
- general：一般性评价

### interview_format
- individual：一对一
- group：小组
- parent_interview：家长面谈
- observation：观察活动
- mixed：混合形式

### fee_type
- textbook：教材费
- uniform：校服费
- activity：活动费
- snack：茶点费
- bus：校巴费
- registration：报名费/注册费
- deposit：留位费
- other：其他

### event_type
- application_open：报名开始
- application_close：报名截止
- interview_notice：面试通知
- interview：面试日期
- result：放榜
- offer_deadline：回复Offer截止

### result
- admitted：录取
- waitlist：候补
- rejected：未录取
- pending：等待中
- unknown：未提及

## 重要提醒

- interview_year 是面试发生的年份，不是帖子发布的年份
- fee_amount 用港币 HKD 整数，"大概五六百" → low=500, high=600
- 信息不明确的字段设为 null
- source_type: "post" = 来自正文, "comment" = 来自评论
- overall_sentiment: 整篇帖子的整体情感倾向
- 只返回 JSON 数组，不要其他文字"""


def create_client():
    """Create Anthropic client."""
    import anthropic

    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        # Try .env.local
        env_path = config.ROOT / ".env.local"
        if env_path.exists():
            for line in env_path.read_text().splitlines():
                if line.startswith("ANTHROPIC_API_KEY="):
                    api_key = line.split("=", 1)[1].strip().strip('"').strip("'")
                    break

    if not api_key:
        raise ValueError(
            "ANTHROPIC_API_KEY not found. Set it as env var or in .env.local"
        )

    return anthropic.Anthropic(api_key=api_key)


def build_batch_input(
    posts: list[dict],
    comments_map: dict[str, list],
    school_info: dict,
) -> str:
    """Build the user message for a batch of posts."""
    school_context = (
        f"目标学校：{school_info.get('name_tc', '')}\n"
        f"学校地区：{school_info.get('district', '')}\n"
        f"学校地址：{school_info.get('address_tc', '')}\n"
        f"学校类型：{school_info.get('school_type', '')}\n"
    )

    posts_text = []
    for p in posts:
        entry = (
            f"--- 帖子 ID: {p['post_id']} ---\n"
            f"标题：{p.get('title', '')}\n"
            f"正文：{(p.get('content', '') or '')[:config.MAX_CONTENT_LENGTH]}\n"
            f"发布日期：{p.get('publish_date', '未知')}\n"
            f"互动：{p.get('likes', 0)} 赞 / {p.get('collects', 0)} 收藏 / "
            f"{p.get('comments_count', 0)} 评论\n"
        )
        # Add comments if available
        post_comments = comments_map.get(p["post_id"], [])
        if post_comments:
            entry += f"\n评论（{len(post_comments)} 条）：\n"
            for c in post_comments[:20]:
                entry += f"  - {(c.get('content', '') or '')[:200]}\n"
        posts_text.append(entry)

    return (
        f"{school_context}\n"
        f"以下是 {len(posts)} 篇帖子，请逐一提取结构化信息并返回 JSON 数组：\n\n"
        + "\n".join(posts_text)
    )


def extract_batch(
    client,
    posts: list[dict],
    comments_map: dict[str, list],
    school_info: dict,
) -> list[dict]:
    """Send a batch of posts to Claude for extraction."""
    user_msg = build_batch_input(posts, comments_map, school_info)

    try:
        response = client.messages.create(
            model=config.CLAUDE_MODEL,
            max_tokens=4000,
            system=EXTRACTION_SYSTEM_PROMPT,
            messages=[{"role": "user", "content": user_msg}],
        )
        text = response.content[0].text.strip()

        # Try to parse JSON — handle markdown code blocks
        if text.startswith("```"):
            text = text.split("\n", 1)[1]
            if text.endswith("```"):
                text = text[:-3]

        result = json.loads(text)
        if isinstance(result, dict):
            result = [result]
        return result

    except json.JSONDecodeError as e:
        print(f"    ⚠️ JSON parse error: {e}")
        print(f"    Raw response: {text[:500]}")
        return []
    except Exception as e:
        print(f"    ⚠️ API error: {e}")
        return []


def process_school(
    client,
    school_code: str,
    school_info: dict,
    include_comments: bool,
) -> dict | None:
    """Process all posts for a single school."""
    raw_path = config.RAW_POSTS_DIR / f"{school_code}.json"
    if not raw_path.exists():
        return None

    raw_data = load_json(raw_path)
    posts = raw_data.get("posts", [])
    if not posts:
        return None

    # Load comments if available
    comments_map: dict[str, list] = {}
    if include_comments:
        raw_comments = raw_data.get("comments", {})
        comments_map.update(raw_comments)
        # Also check individual comment files
        for p in posts:
            cpath = config.RAW_COMMENTS_DIR / f"{p['post_id']}.json"
            if cpath.exists() and p["post_id"] not in comments_map:
                comments_map[p["post_id"]] = load_json(cpath)

    # Process in batches
    all_items: list[dict] = []
    total_comments = sum(len(v) for v in comments_map.values())

    for batch in chunk_list(posts, config.EXTRACTION_BATCH_SIZE):
        batch_comments = {
            p["post_id"]: comments_map.get(p["post_id"], []) for p in batch
        }
        results = extract_batch(client, batch, batch_comments, school_info)

        for result in results:
            if not result.get("relevant", True):
                continue
            if not result.get("is_kindergarten", True):
                continue

            post_id = result.get("post_id", "")
            # Find original post for engagement data
            original = next((p for p in posts if p["post_id"] == post_id), None)
            engagement = 0
            if original:
                engagement = (
                    original.get("likes", 0)
                    + original.get("collects", 0)
                    + original.get("comments_count", 0)
                )

            for item in result.get("extracted_items", []):
                all_items.append({
                    "post_id": post_id,
                    "source_url": f"https://www.xiaohongshu.com/explore/{post_id}",
                    "source_date": original.get("publish_date") if original else None,
                    "engagement_score": engagement,
                    "branch_identified": original.get("branch_identified", True) if original else True,
                    "match_confidence": original.get("match_confidence", "medium") if original else "medium",
                    "kg_confidence": original.get("kg_confidence", "yes") if original else "yes",
                    "content_type": item.get("content_type", "general"),
                    "structured_data": {
                        k: v for k, v in item.items()
                        if k not in ("content_type", "source_type", "positive_keywords", "negative_keywords")
                    },
                    "sentiment": result.get("overall_sentiment", "neutral"),
                    "positive_keywords": item.get("positive_keywords", []),
                    "negative_keywords": item.get("negative_keywords", []),
                    "competition_signals": result.get("competition_signals", {}),
                    "source_type": item.get("source_type", "post"),
                })

        # Rate limit between batches
        time.sleep(1.0)

    return {
        "school_code": school_code,
        "name_tc": school_info.get("name_tc", ""),
        "total_posts_processed": len(posts),
        "total_comments_processed": total_comments,
        "extraction_timestamp": datetime.now().isoformat(),
        "items": all_items,
    }


def main() -> None:
    parser = argparse.ArgumentParser(description="AI structured extraction from XHS posts")
    parser.add_argument("--include-comments", action="store_true", help="Include comments in extraction")
    parser.add_argument("--school", type=str, help="Process a single school code")
    parser.add_argument("--dry-run", action="store_true", help="Preview without API calls")
    args = parser.parse_args()

    # Load school info
    schools = load_json(config.SCHOOLS_MERGED_PATH)
    school_by_code = {s["code"]: s for s in schools}

    # Determine which schools to process
    if args.school:
        codes = [args.school]
    else:
        codes = [
            p.stem
            for p in config.RAW_POSTS_DIR.glob("*.json")
            if p.stem in school_by_code
        ]

    # Check already extracted
    config.EXTRACTED_DIR.mkdir(parents=True, exist_ok=True)
    already_done = {p.stem for p in config.EXTRACTED_DIR.glob("*.json")}
    remaining = [c for c in codes if c not in already_done or args.school]

    print(f"Phase 4: AI Structured Extraction")
    print(f"  Total schools with raw data: {len(codes)}")
    print(f"  Already extracted: {len(already_done)}")
    print(f"  Remaining: {len(remaining)}")
    print(f"  Include comments: {args.include_comments}")

    if args.dry_run:
        print("\n  [DRY RUN] Would process these schools:")
        for c in remaining[:10]:
            info = school_by_code.get(c, {})
            raw = load_json(config.RAW_POSTS_DIR / f"{c}.json")
            print(f"    {c}: {info.get('name_tc', '?')} — {len(raw.get('posts', []))} posts")
        if len(remaining) > 10:
            print(f"    ... and {len(remaining) - 10} more")
        return

    client = create_client()
    success = 0
    total_items = 0

    for i, code in enumerate(remaining):
        info = school_by_code.get(code, {})
        print(f"  [{i+1}/{len(remaining)}] {info.get('name_tc', code)}")

        result = process_school(client, code, info, args.include_comments)
        if result:
            save_json(result, config.EXTRACTED_DIR / f"{code}.json")
            items_count = len(result["items"])
            total_items += items_count
            success += 1
            print(f"    ✅ {result['total_posts_processed']} posts → {items_count} items")
        else:
            print(f"    ⏭️ No data")

        # Progress every 50
        if (i + 1) % 50 == 0:
            print(f"\n  📊 Progress: {success}/{i+1} done, {total_items} total items\n")

    print(f"\n✅ Extraction complete!")
    print(f"  Schools processed: {success}")
    print(f"  Total extracted items: {total_items}")


if __name__ == "__main__":
    main()
