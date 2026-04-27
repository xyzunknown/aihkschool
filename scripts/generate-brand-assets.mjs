#!/usr/bin/env node
// 用 GPT Image 2.0（OpenAI 兼容接口，走第三方中转）批量生成品牌视觉资源。
// 仅在目标文件不存在时调用，可安全重复运行。

import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const BASE_URL = process.env.GPT_IMAGE_BASE_URL || "https://img.hair.aisea.space";
const API_KEY =
  process.env.GPT_IMAGE_API_KEY ||
  "sk-b73be91b46ea9e48a4d6c08632683fdfc014d6975b804440cc36e736547b710f";
const MODEL = process.env.GPT_IMAGE_MODEL || "gpt-image-2";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, "..");
const PUBLIC_BRAND = path.join(PROJECT_ROOT, "public", "brand");

const STYLE_BASE =
  "soft watercolor illustration, warm cream beige background, sage forest-green accents, gentle warm sunlight, hand-drawn organic strokes, no text, no letters, no logo, no watermark";

const TASKS = [
  // 4 角叶片装饰（透明 PNG）
  {
    file: "decor/leaf-tl.png",
    size: "1024x1024",
    prompt: `${STYLE_BASE}. A botanical decoration of fresh sage-green leaves and small ivy vines arranged in the top-left corner. Transparent PNG with no background. Delicate watercolor leaves cascading from the corner inward, suitable for a website corner decoration.`,
  },
  {
    file: "decor/leaf-tr.png",
    size: "1024x1024",
    prompt: `${STYLE_BASE}. A botanical decoration of fresh sage-green leaves and small ivy vines arranged in the top-right corner. Transparent PNG with no background. Delicate watercolor leaves cascading from the corner inward, mirrored from the top-left version.`,
  },
  {
    file: "decor/leaf-bl.png",
    size: "1024x1024",
    prompt: `${STYLE_BASE}. A botanical decoration of fresh sage-green leaves with a few small wildflowers in the bottom-left corner. Transparent PNG with no background. Watercolor style.`,
  },
  {
    file: "decor/leaf-br.png",
    size: "1024x1024",
    prompt: `${STYLE_BASE}. A botanical decoration of fresh sage-green leaves with a few small wildflowers in the bottom-right corner. Transparent PNG with no background. Watercolor style.`,
  },

  // Hero 背景：水彩港岛天际线
  {
    file: "decor/skyline-watercolor.png",
    size: "1536x1024",
    prompt: `${STYLE_BASE}. A faint watercolor silhouette of Hong Kong Victoria Harbour skyline including iconic skyscrapers and Victoria Peak in the distance, very pale and washed out, soft mint-green and powder-blue tones blending with cream beige background. Wide horizontal composition. The skyline should occupy only the lower one-third, leaving the upper area light cream for text overlay.`,
  },

  // 推荐学校配图 ×4
  {
    file: "schools/sample-1.jpg",
    size: "1024x1024",
    prompt: `${STYLE_BASE}. Interior of a bright cozy Hong Kong kindergarten classroom with wooden Montessori shelves, children's small chairs, soft natural light from large windows. Warm and welcoming, no people, no text.`,
  },
  {
    file: "schools/sample-2.jpg",
    size: "1024x1024",
    prompt: `${STYLE_BASE}. Hallway of a kindergarten with wooden floors, colorful artwork on cream walls, plants, and natural light. Warm illustrative style, no people, no text.`,
  },
  {
    file: "schools/sample-3.jpg",
    size: "1024x1024",
    prompt: `${STYLE_BASE}. Outdoor kindergarten playground with wooden play structures, small garden, blue sky and city skyline in the far background. Warm illustrative style, no people, no text.`,
  },
  {
    file: "schools/sample-4.jpg",
    size: "1024x1024",
    prompt: `${STYLE_BASE}. Montessori-style classroom with wooden learning materials neatly arranged on shelves, large windows, plants, warm sunlight. No people, no text.`,
  },

  // 家长攻略文章封面 ×4
  {
    file: "articles/article-1.jpg",
    size: "1024x1024",
    prompt: `${STYLE_BASE}. A warm family scene of parents and a young child reading books together at a wooden table, in a Hong Kong home setting with windows showing city in distance. Illustrated storybook style, no text.`,
  },
  {
    file: "articles/article-2.jpg",
    size: "1024x1024",
    prompt: `${STYLE_BASE}. A mother helping her young daughter prepare for a kindergarten interview, sitting at a small table with books and pencils. Warm illustrative style, no text.`,
  },
  {
    file: "articles/article-3.jpg",
    size: "1024x1024",
    prompt: `${STYLE_BASE}. Parents discussing school options together with brochures and a laptop on a cozy table. Warm illustrative style, no text.`,
  },
  {
    file: "articles/article-4.jpg",
    size: "1024x1024",
    prompt: `${STYLE_BASE}. A family of three (parents and a small child) walking hand in hand toward a kindergarten gate on a sunny morning. Warm illustrative style, no text.`,
  },

  // 课外活动 8 个分类配图
  ...[
    ["music", "musical instruments — piano keys, violin, music notes floating"],
    ["sports", "sports equipment — football, badminton racket, running shoes"],
    ["art", "art supplies — paintbrushes, colored pencils, palette with watercolor"],
    ["dance", "ballet shoes and ribbons in warm pastel tones"],
    ["science", "science elements — magnifying glass, microscope, beakers, leaves"],
    ["language", "open storybook with colorful letters and floating language symbols"],
    ["drama", "theater masks and stage curtain in soft warm tones"],
    ["other", "a friendly cluster of school items — backpack, books, art supplies"],
  ].map(([slug, subject]) => ({
    file: `activities/category-${slug}.jpg`,
    size: "1024x1024",
    prompt: `${STYLE_BASE}. A still-life arrangement of ${subject}, centered on a soft cream background. Cute, warm, hand-drawn watercolor style. No text, no letters.`,
  })),

  // 时间线左侧场景图标 ×3（透明 PNG）
  {
    file: "timeline/school.png",
    size: "1024x1024",
    prompt: `${STYLE_BASE}. A simple cute illustration of a kindergarten school building with a small flag on top. Transparent background. Hand-drawn warm style, no text.`,
  },
  {
    file: "timeline/microphone.png",
    size: "1024x1024",
    prompt: `${STYLE_BASE}. A simple cute illustration of a microphone surrounded by small leaves. Transparent background. Hand-drawn warm style, no text.`,
  },
  {
    file: "timeline/calendar.png",
    size: "1024x1024",
    prompt: `${STYLE_BASE}. A simple cute illustration of a small wall calendar with a green ribbon. Transparent background. Hand-drawn warm style, no text.`,
  },
];

async function ensureDir(p) {
  await fs.mkdir(path.dirname(p), { recursive: true });
}

async function fileExists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function postWithRetry(endpoint, body, taskFile, maxAttempts = 5) {
  let lastErr = null;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (res.ok) return res;
      const status = res.status;
      // Retry on 5xx (gateway/upstream issues)
      if (status >= 500 && attempt < maxAttempts) {
        const wait = Math.min(2 ** attempt * 1000, 30000);
        console.log(`    ↻ ${taskFile}: HTTP ${status}, retrying in ${wait / 1000}s (attempt ${attempt + 1}/${maxAttempts})`);
        await new Promise((r) => setTimeout(r, wait));
        continue;
      }
      const text = await res.text();
      throw new Error(`HTTP ${status}: ${text.slice(0, 200)}`);
    } catch (err) {
      lastErr = err;
      if (attempt >= maxAttempts) throw err;
      const wait = Math.min(2 ** attempt * 1000, 30000);
      console.log(`    ↻ ${taskFile}: ${err.message.slice(0, 120)}, retrying in ${wait / 1000}s`);
      await new Promise((r) => setTimeout(r, wait));
    }
  }
  throw lastErr;
}

async function generateOne(task) {
  const target = path.join(PUBLIC_BRAND, task.file);
  if (await fileExists(target)) {
    console.log(`  ✓ skip (exists): ${task.file}`);
    return { skipped: true };
  }

  const endpoint = `${BASE_URL.replace(/\/$/, "")}/v1/images/generations`;
  const body = {
    model: MODEL,
    prompt: task.prompt,
    size: task.size,
    n: 1,
  };

  console.log(`  → generating: ${task.file} (${task.size})`);
  const res = await postWithRetry(endpoint, body, task.file, 5);

  const json = await res.json();
  const item = json?.data?.[0];
  if (!item) throw new Error(`Empty data for ${task.file}: ${JSON.stringify(json).slice(0, 300)}`);

  let buffer;
  if (item.b64_json) {
    buffer = Buffer.from(item.b64_json, "base64");
  } else if (item.url) {
    const imgRes = await fetch(item.url);
    if (!imgRes.ok) throw new Error(`Image download failed: ${imgRes.status}`);
    buffer = Buffer.from(await imgRes.arrayBuffer());
  } else {
    throw new Error(`No b64_json or url in response for ${task.file}`);
  }

  await ensureDir(target);
  await fs.writeFile(target, buffer);
  console.log(`  ✓ saved: ${task.file} (${(buffer.length / 1024).toFixed(0)} KB)`);
  return { skipped: false };
}

async function main() {
  console.log(`GPT Image 2.0 batch — endpoint: ${BASE_URL}`);
  console.log(`Total tasks: ${TASKS.length}\n`);

  let ok = 0;
  let skipped = 0;
  let failed = 0;

  for (const task of TASKS) {
    try {
      const result = await generateOne(task);
      if (result.skipped) skipped++;
      else ok++;
    } catch (err) {
      failed++;
      console.error(`  ✗ FAIL ${task.file}: ${err.message}`);
    }
  }

  console.log(`\nDone. generated=${ok} skipped=${skipped} failed=${failed}`);
  if (failed > 0) process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
