# 叩門信 AI 生成 — 品質評估 Rubric v1.1

## Changelog

- **v1.1**（2026-04-19）：gold set 改 silver set 全 AI 合成（無真人無人工）；pass 線 4.0 → 3.7；embedding 改用 OpenAI API（不自託管 bge-m3）；刪除人工 review 界面，改 AI 自動重試 loop；pairwise 雙向跑寫進代碼 checklist
- **v1.0**（2026-04-19）：初版

> 本文件定義：AI 生成的叩門信如何被**自動評分** + **回歸測試** + **A/B prompt 對比**。
> 前置：B 產品 spec 另文（假設 prompt / schema / UI 已有）。本 rubric 聚焦 **evaluation 層**，供 CI、prompt 迭代、每週 regression 跑。

---

## 0. 為什麼需要這套 rubric

叩門信不是 "生成即交付"。一封出錯的信可能：

- **直接害死申請**（事實幻覺、宗教踩雷、語氣過度、繁簡混用）
- **被家長大量改寫才敢用**（變相沒幫上忙）
- **所有家庭讀起來像同一封**（特色 = 0，家長不會付費續訂）

所以必須有辦法在**無家長參與**下自動打分，才能：
- prompt 改動前後回歸（不退步）
- 不同學校 persona 之間橫向比較
- 識別系統性失敗模式（e.g. 宗教學校總是不提信仰）

---

## 1. 八維度 Rubric

每維 1-5 分，5 為最優。整體分 = 加權和（見 §1.9）。

### 1.1 Factual Accuracy 事實準確性（weight 20%）

**考察**：信中所有"事實性陳述"是否可溯源到 input？

| 分 | 表現 |
|---|---|
| 5 | 所有事實陳述（孩子姓名/學校/年齡/興趣/經歷）100% 源自 input，無添油加醋 |
| 4 | 1 處 minor 推測（e.g. 把 "喜歡音樂" 說成 "學過鋼琴"），但不影響用 |
| 3 | 2-3 處小幻覺，家長需修正 |
| 2 | 1 處嚴重事實捏造（編造考試名次、編造獲獎） |
| 1 | 多處捏造，不可用 |

**自動檢測**：LLM judge 逐句抽取事實 claim，對照 input JSON 標 entailed / not_entailed / contradicted。not_entailed 算幻覺。contradicted = 直接扣到 2 分以下。

### 1.2 School Fit 學校契合度（weight 20%）

**考察**：是否真的"為這間學校"寫，換個校名就明顯不通？

| 分 | 表現 |
|---|---|
| 5 | 引用該校具體特色（校訓/辦學團體/學科強項/獨有活動），換校名後全文明顯不通 |
| 4 | 有 1-2 處該校專屬引用 |
| 3 | 只有泛泛的 "貴校名聲卓越" |
| 2 | 任何 DSS 學校都能套用 |
| 1 | 完全通用模板 |

**自動檢測**：把信中校名 mask 掉，讓 LLM 從 5 間候選校中猜是哪間。猜對 = 5 分，3 選 1 範圍內 = 3 分，蒙對概率 = 1 分。

### 1.3 Voice Authenticity 家長真誠感（weight 15%）

**考察**：讀起來像真人家長寫的，還是像 AI 模板？

| 分 | 表現 |
|---|---|
| 5 | 具體場景（"上次開放日他站在操場看高年級踢波看了半小時"），情感有節制 |
| 4 | 1-2 個具體細節 + 適度情感 |
| 3 | 情感真誠但無細節 |
| 2 | 套話多（"深感榮幸"、"誠摯希望"連發）、感歎號 3+ |
| 1 | 明顯 AI 味（"綜合以上所述"、"基於此"、"與此同時"） |

**自動檢測**：
- AI 套語黑名單正則計數（超 2 個即扣到 ≤3）
- "具體場景"要求：LLM judge 標出有多少"細節句"（時間/地點/動作三選二），<2 句扣分
- 感嘆號計數 > 3 即扣

### 1.4 Linguistic Quality 語言質量（weight 15%）

**考察**：繁體中文規範、敬語、無病句。

**硬指標（自動）**：
- **繁簡混用**：簡體字出現 ≥1 → **直接 1 分**（硬故障）。用 `OpenCC` 檢測簡體字符
- **敬語正確性**：必備 "貴校 / 小兒(女) / 敝人 / 懇請 / 如蒙" 中任選 3 個用對 → ≥4 分
- **常見誤用黑名單**：`您好` + 正文有 `你` 混用、`貴子女` 自稱（應用 "小兒/小女"）、`弊` ≠ `敝` → 每條扣 1 分
- **長度**：中文 300-500 字 / 英文 200-350 詞 — 超出 ±20% 扣 1 分

**軟指標（LLM judge）**：流暢度、正式語域一致性。

### 1.5 Structural Completeness 結構完整（weight 10%）

**考察**：五段是否齊全且順序正確。

必備結構：
1. **開頭稱謂**（"敬啟者" / "XXX 校長 鈞鑒"）
2. **來意說明 + 家長身份**
3. **孩子介紹（具體特長 + 學校契合）**
4. **懇請考慮 + 附件說明**
5. **敬祝 + 署名 + 聯絡方式**

每缺一段扣 1 分。順序錯誤扣 1 分。

**自動檢測**：segment 抽取 + 正則 / LLM 分類每段是否存在。

### 1.6 Taboo Avoidance 避免踩雷（weight 10%，硬扣）

**紅線清單**（命中任一 = 直接 0 分該維度，整體最高 3 分）：

| 類型 | 關鍵詞/模式 |
|---|---|
| 金錢暗示 | "捐款" / "donation" / "support the school financially" / "校友基金" 連結申請 |
| 貶低他校 | 比較 "優於 XX 小學" / "相比之下" 帶校名 |
| 兄弟姊妹比較 | "比他哥哥更..." / "不像他姐姐那樣..." |
| 乞求語氣 | "求求" / "跪求" / "萬望垂憐" / "beg" |
| 宗教踩雷 | 非宗教校硬提信仰、或錯配宗教（向天主教校提佛教背景而無 nuance） |
| 不實承諾 | "保證" / "guarantee" 孩子未來表現 |
| 過度美化 | "神童" / "genius" / "unique in his generation" 類字眼 |

**自動檢測**：正則 + LLM 雙層。LLM judge 專門問 "這封信有無任何可能讓招生官反感的表述"。

### 1.7 Specificity & Diversity 具體性與多樣性（weight 5%）

**考察**：兩個不同孩子給同一學校的信，應該明顯不同。

- 檢測方式：生成 10 個不同孩子 profile 對同一學校的信，計算 pairwise **cosine similarity**（embedding 層）
- 平均 similarity > 0.85 → Diversity 不合格，整體扣 1 分
- 信中至少 **3 個具體名詞**來自該孩子 input（興趣 / 經歷 / 性格關鍵詞）

**Embedding 模型選型**：用 **OpenAI `text-embedding-3-small`** API（或 Voyage-3），按量付費 ~$0.02 / 1M tokens。1 萬封信做 diversity matrix 約 **$0.04**。不自託管 bge-m3（模型 2GB+，Vercel serverless 跑不了，需額外 VPS，只有月調用 > 百萬次才合算——我們用量遠不到）。

### 1.8 Actionability 可用性（weight 5%）

**考察**：家長拿到能否直接用？

- 聯絡方式佔位符是否保留（`[聯絡電話]`, `[電郵]`）還是模型自己編了假號碼？ → 編了假號碼扣 2 分
- 日期佔位（"X 年 X 月 X 日"）還是寫死某日？ → 寫死扣 1 分
- 附件清單（成績表、獎狀、報告書）列清楚 → 有 = 5

### 1.9 加權總分

```
overall = 
  0.20 * factual +
  0.20 * school_fit +
  0.15 * voice +
  0.15 * linguistic +
  0.10 * structural +
  0.10 * taboo +
  0.05 * specificity +
  0.05 * actionability
```

**硬故障覆蓋**（bypass 加權）：
- 繁簡混用 → overall = 1.0（生成失敗）
- 任一 taboo 命中 → overall ≤ 3.0
- Factual 1 分 → overall ≤ 2.0

**Pass 線**：overall ≥ **3.7** 且無硬故障，才能進入"可交付"狀態。
未過線信件進入 §7 的 **AI 自動重試 loop**，完全無人工介入。

---

## 2. Judge 系統架構

### 2.1 三層評估 pipeline

```
Generated Letter
      │
      ▼
┌─────────────────────────┐
│ L1: Deterministic Checks │  ← 正則 / 字符集 / 長度 / 黑名單
│  (繁簡/長度/佔位符/套話) │     語言固定的硬指標，0 成本，毫秒級
└──────────┬──────────────┘
           │
           ▼
┌─────────────────────────┐
│ L2: Claim-level Entailment│  ← Claude Sonnet 4.6
│  (事實 vs input JSON)    │     每句抽 claim, 對照 input 標 label
└──────────┬──────────────┘
           │
           ▼
┌─────────────────────────┐
│ L3: Holistic LLM Judge   │  ← Claude Sonnet 4.6 (或 Opus 4.7 for gold)
│  (voice / fit / taboo)   │     打全部 8 維 + 文字 rationale
└──────────┬──────────────┘
           │
           ▼
   { 8 scores + overall + flags + rationales }
```

### 2.2 L3 Judge Prompt（核心）

```
你係香港小學/幼稚園叩門信的資深審稿編輯。你要評估一封家長寫給學校的叩門信的質量。

# 輸入
學校資料：{school_metadata_json}
孩子 input：{child_input_json}
待評估信件：{letter_text}

# 任務
嚴格按以下 8 個維度打分（1-5 分，5 最優），並輸出 JSON：

1. factual_accuracy — 信中所有事實陳述是否可溯源到孩子 input？幻覺扣分。
2. school_fit — 是否引用該校具體特色，換個校名會明顯不通？
3. voice_authenticity — 像真人家長寫還是 AI 模板？具體場景 > 套話。
4. linguistic_quality — 繁體中文規範、敬語、無病句。
5. structural_completeness — 五段結構（稱謂/來意/介紹/懇請/署名）齊全？
6. taboo_avoidance — 有無金錢暗示/貶低他校/乞求語氣/宗教踩雷/不實承諾？
7. specificity — 至少 3 個具體名詞來自該孩子 input？
8. actionability — 佔位符保留、附件清單完整、可直接使用？

每維給 {score: 1-5, evidence: "引原文片段", reason: "為何這個分"}。

重點關注（出現即扣狠）：
- 繁簡混用（任何簡體字）
- 編造事實（input 沒提的經歷/獎項/名次）
- 任何 taboo 關鍵詞（見下列清單）
- 通用模板（換校名照樣通）

Taboo 黑名單：{taboo_list}

# 輸出 JSON schema
{
  "scores": {
    "factual_accuracy": {"score": 1-5, "evidence": "...", "reason": "..."},
    ...
  },
  "hard_failures": ["simplified_chinese" | "taboo:religion" | "fabricated_fact:..." | null],
  "overall_pass": true | false,
  "top_3_improvements": ["..."]
}
```

### 2.3 Claim-level Entailment（L2）

```python
# 伪代码
claims = llm.extract_factual_claims(letter)
# e.g. ["小兒曾獲校際朗誦冠軍", "在 ABC 幼稚園就讀 3 年", ...]

for claim in claims:
    label = llm.classify(
        claim=claim,
        source=child_input_json,
        labels=['entailed', 'neutral', 'contradicted', 'fabricated']
    )
    if label == 'fabricated':
        hard_failures.append(f'hallucination: {claim}')
    elif label == 'contradicted':
        factual_score = min(factual_score, 1)
```

**為何拆出 L2**：整體打分會遺漏單句幻覺。claim-level 能精確定位到哪句造假。

---

## 3. Silver Set（全 AI 合成金標，無人工）

**原則**：不找真人信、不做隱私審查、不人工標註。用 **"強模型合成 + 交叉裁判校準"** 三件套替代傳統 gold set。

### 3.1 合成內容（N = 50）

| 類型 | 數量 | 生成方式 |
|---|---|---|
| 高質量正例 | 25 | **Opus 4.7** 扮演資深升學顧問，為 5 間首批學校 × 5 種孩子 profile 各生成 1 封。prompt 明列每維滿分特徵 + 反例 |
| 故障負例（已知標籤） | 15 | **Sonnet 4.5** 刻意生成含特定缺陷的信（3 封繁簡混 / 3 封幻覺 / 3 封 taboo / 3 封通用模板 / 3 封結構殘缺） |
| 學校視角 reference | 10 | 爬每間學校**公開官網** mission/校長致辭/校訊電子版 → Opus 抽該校 8-15 個價值觀關鍵詞 → 反向生成"該校招生官最想收到的信" |

**成本**：一次性 ~$15（Opus 生成 50 封，平均每封 ~$0.30）。

### 3.2 學校特異性（Anchor 抽取）

對每間學校跑一次：

```python
# scripts/extract_school_anchors.py
for school in five_launch_schools:
    public_materials = scrape_school_public_pages(school.website)
    # 只爬公開頁面：about, mission, principal-message, latest-newsletter
    # 嚴守 CLAUDE.md 反爬規約 — 我們是訪客，不是爬蟲
    
    anchors = claude_opus.extract_json(
        prompt="""
        從下列該校公開材料中，抽取該校核心價值觀關鍵詞（8-15 個）。
        這些關鍵詞將作為"判斷一封叩門信是否真為該校而寫"的 ground truth。
        """,
        materials=public_materials,
        schema={"anchors": ["...", "..."], "style_notes": "..."}
    )
    
    upsert_school_anchors(school.id, anchors)
```

`school_fit` 維度的自動檢測（§1.2 的 "mask 校名猜學校"）升級為：
- 信件中 anchor 命中 ≥ 3 個 → 5 分
- 命中 1-2 個 → 3 分
- 0 個 → 1 分（通用模板）

### 3.3 Judge 校準（全自動，無人工標）

不依賴人類打分。改用**三重機器校準**：

1. **Cross-model 一致性**：每個 silver 樣本讓 **Sonnet 4.6 + Opus 4.7 + GPT-5** 各打一次分
   - 三者 8 維分 Pearson r ≥ **0.80** → judge 可信
   - 分歧 > 1 分的維度標記為 "low-confidence dimension"，在 regression 中降權 0.5×

2. **Self-consistency**：同一 model 同一信跑 3 次（temperature=0.3）
   - 同一信 overall 分方差 > 0.3 → 該樣本不計入基線，換一封重生成

3. **Negative set 校準**：15 封故障負例喂給 judge
   - 命中對應 hard_failure 的比例 ≥ **95%** → judge 可信
   - < 95% → 改 judge prompt 直到達標

產出 `eval/silver_set.jsonl`：
```json
{
  "id": "silver_001",
  "input": {...},
  "school": {...},
  "letter": "...",
  "expected_label": "high_quality" | "negative:simplified" | "negative:taboo" | ...,
  "machine_consensus_scores": {
    "factual_accuracy": 4.6,
    ...
  },
  "overall_consensus": 4.5,
  "confidence": 0.92,  // cross-model agreement
  "source": "opus_synthetic" | "sonnet_negative" | "school_anchor_reverse"
}
```

### 3.4 用途

- **Prompt 迭代基線**：每次改 B 的生成 prompt，在 silver set 上重跑，overall 不能退步 > 0.2
- **Judge drift 檢測**：每季度重跑 cross-model 校準，若 Pearson 掉到 < 0.75 → 觸發 judge prompt 重新調校
- **模型升級 regression**：Claude 版本升級、OpenAI 換 model 時全量重跑

**永遠不需要**：招募真人寫信、人工標註、隱私審查、法務 review。

---

## 4. 自動回歸測試（CI 集成）

### 4.1 運行時機

- **每次 B 生成 prompt PR**：必跑
- **每週定時**（cron）：跑全量 gold set + 抽樣生產 100 封
- **模型升級時**（Claude 版本跳升、OpenAI Realtime 換 model）：全量重跑

### 4.2 Fail 條件

PR **被自動 block** 若：

- gold set 平均 overall 相比 main 分支下降 > 0.15
- 任一 gold 樣本 overall 下降 > 0.5
- 硬故障率上升 > 2%
- Diversity（§1.7 的 cosine）平均上升 > 0.03（意味多樣性下降）

### 4.3 輸出 artifact

```
eval/reports/YYYY-MM-DD/
  ├── summary.md          # 總分 + top 退步項 + top 進步項
  ├── per_dimension.csv
  ├── failed_cases.jsonl   # overall < 3.5 的全部樣本 + judge rationale
  └── diversity_matrix.png
```

---

## 5. Pairwise Preference（prompt A/B 專用）

**場景**：改 prompt 想知道新版 vs 舊版哪個好。絕對打分區分度不夠，用成對偏好。

```python
for sample in silver_set_sample(n=30):
    letter_a = prompt_v_old.generate(sample)
    letter_b = prompt_v_new.generate(sample)

    # 必須雙向跑抵消順序 bias（judge 天然偏好後給的那封）
    winner_1 = llm_judge.compare(letter_a, letter_b, sample.input)  # A,B 順序
    winner_2 = llm_judge.compare(letter_b, letter_a, sample.input)  # B,A 順序

    # 只有兩次一致才算真偏好；不一致 = tie
    if winner_1 == 'first' and winner_2 == 'second':
        wins_a += 1
    elif winner_1 == 'second' and winner_2 == 'first':
        wins_b += 1
    else:
        ties += 1

# 決策條件
wins_new / (wins_new + wins_old) >= 0.55 with p < 0.05  # binomial test
```

**必須遵守**：
- 永遠雙向跑（A/B + B/A），成本 × 2 但消除順序 bias
- temperature=0 讓 judge 確定性輸出
- judge model 和生成 model **必須不同**（避免自家打自家偏見）
- 實施時寫進 `src/lib/letter_eval/pairwise.ts` 作為唯一入口，禁止單向調用

比絕對打分更敏感，適合微調 prompt。

---

## 6. Red Team 測試集（上線前門禁）

**20 個已知刁鑽 input**，必須全部通過（overall ≥ 4，無硬故障）才能部署：

| case_id | 測試點 |
|---|---|
| rt_001 | 孩子有輕度 SEN — 模型會否不當美化或隱瞞？ |
| rt_002 | 父母已離婚 — 稱呼正確？不過度感傷？ |
| rt_003 | 非本地家庭（內地 / 海外新到） — 文化契合、繁簡 |
| rt_004 | 孩子完全零特長 — 能否真誠寫、不編造？ |
| rt_005 | 申請宗教學校但家庭無信仰 — 如何體面處理？ |
| rt_006 | input 含 emoji / 粵語口語 — 生成信是否正式化？ |
| rt_007 | 孩子曾被其他幼稚園勸退 — 能否不提或體面轉化？ |
| rt_008 | 家長英文差 — 不要生成 high-register 英文把家長嚇到 |
| rt_009 | 申請多間學校 — 每封明顯不同？ |
| rt_010 | input 極短（只有姓名年齡） — 拒答還是硬寫？應該引導補充而非幻覺 |
| rt_011-020 | 宗教跨派（基督教向天主教校、佛教向基督教校）、殘疾表述、單親、收養、跨性別議題等 |

**rt_010 的正確行為**：返回 `error: "input_too_sparse"` + 引導補充，**不生成**。

---

## 7. AI 自動重試 Loop（完全無人工）

**設計原則**：這是 AI 驅動產品。失敗信件**絕不**進人工隊列。

### 7.1 生產流程

```
User submit input
     │
     ▼
Generate letter (Sonnet 4.6, default)
     │
     ▼
L1 + L2 checks (每封必跑, <1s, ~$0.01)
     │
     ▼
L3 judge (每封必跑, ~$0.05)
     │
     ├──── overall >= 3.7 AND 無硬故障 ────▶ ✅ 交付用戶
     │
     └──── 未達標 ────▶ Retry Loop
                            │
                            ▼
                    ┌─────────────────────┐
                    │ Retry 1: 用 Opus 4.7│
                    │   重寫（更強模型）  │
                    └───────┬─────────────┘
                            │
                            ▼
                    L1+L2+L3 re-check
                            │
                            ├── 達標 → ✅ 交付
                            │
                            └── 仍未達標 ▶ Retry 2
                                            │
                                            ▼
                            ┌─────────────────────────┐
                            │ 分析 failed dimensions │
                            │ 若 factual_accuracy 低 │
                            │   → 返回 "info_too_sparse"│
                            │ 若 school_fit 低       │
                            │   → 補加 school anchors │
                            │     到 prompt 再生成   │
                            └───────┬─────────────────┘
                                    │
                                    ▼
                            L1+L2+L3 re-check
                                    │
                                    ├── 達標 → ✅ 交付
                                    │
                                    └── 最終未達標
                                         ▼
                    ┌──────────────────────────────────┐
                    │ 前端顯示：                       │
                    │ "需要更多信息才能為你寫最打動   │
                    │  XX 學校的信。補完以下 3 個問題   │
                    │  再試？"                         │
                    │ + AI 生成 3 個針對性補充問題     │
                    │   （基於 failed dimensions）      │
                    └──────────────────────────────────┘
```

### 7.2 Retry 策略細節

- **最多 2 次重試**（避免無限循環 + 成本失控）
- **每次重試升級模型**：Sonnet 4.6 → Opus 4.7 → Opus 4.7 + 增強 prompt
- **診斷驅動**：第 2 次重試前，讀 L3 返回的 `top_3_improvements`，針對性調整 prompt
- **fail-graceful**：最終失敗不顯示"生成失敗"技術語言，改為"引導補充信息"的產品化話術

### 7.3 觀察性（Aggregate 告警，無產品內置 UI）

**完全不建人工後台**。只對運營者（我）發告警：

- 每日平均 overall 分 < 3.9 → Slack 告警
- 硬故障率 > 5% → Slack 告警
- 單日 retry 率 > 30% → Slack 告警
- 任一學校 school_fit 平均 < 3.5 → 該校 anchor 可能過期，觸發重新爬 + 重新 extract

告警用現有的 `src/lib/email/resend.ts` 發到開發者郵箱，或接一個簡單 webhook。

### 7.4 監控儀表板（開發者內部用）

Grafana / 簡單 Next.js 管理頁（只有我能看）：

- 每日平均分、硬故障率、按學校 / 按模型分組 heatmap
- retry 率趨勢
- 成本趨勢（每千封信的 judge 費用）

**不暴露給家長，不暴露給"審稿員"（沒有這個角色）**。

### Schema 建議（新表）

```sql
create table letter_evaluations (
  id uuid primary key default gen_random_uuid(),
  letter_id uuid references generated_letters(id),

  l1_checks jsonb,  -- {simplified: false, length: 432, taboo_hits: []}
  l2_claims jsonb,  -- [{claim, label, evidence_turn}]
  l3_scores jsonb,  -- full 8-dim + overall + rationales

  overall_score numeric(4,2),
  hard_failures text[],
  passed boolean,           -- overall >= 3.7 AND no hard_failures

  retry_attempt int default 0,  -- 0 = first try, 1/2 = retries
  final_delivered boolean,      -- 本次迭代是否是交付給用戶的最終版
  generator_model text,
  evaluator_model text,
  evaluation_cost_usd numeric(10,4),
  evaluated_at timestamptz default now()
);

create index idx_letter_eval_failed on letter_evaluations(passed, evaluated_at) where passed = false;
create index idx_letter_eval_retry on letter_evaluations(letter_id, retry_attempt);
```

---

## 8. 成本預算

| 項目 | 單位成本 | 月量 | 月成本 |
|---|---|---|---|
| L1 checks（純代碼 + OpenCC） | ~0 | 10k 封 | $0 |
| L2 claim entailment（Sonnet 4.6，~2k tokens） | ~$0.02 | 10k | $200 |
| L3 full judge（Sonnet 4.6，~4k tokens） | ~$0.05 | **10k**（每封必跑） | $500 |
| Retry loop（Opus 4.7 重寫，估 25% 命中） | ~$0.30 | 2.5k | $750 |
| Diversity embeddings（OpenAI text-embedding-3-small） | ~$0.04 / 1k 封 | 10k | $0.4 |
| Silver set regression（每次 PR） | ~$0.05 × 50 | 20 PR | $50 |
| Red team 每次部署 | ~$0.05 × 20 | 10 次 | $10 |
| School anchor 抽取（每校一次性 + 季度更新） | ~$1 × 5 校 | 季度 | $5 |
| **合計** | | | **~$1,515/月** |

10k 封 / 月相當於 ~330 封 / 天。若按 Standard $138/月 30 次的假設換算到叩門信場景（假設用戶 10 封/月），服務 1000 活躍付費用戶。每用戶 eval 成本 ~$1.5，相對訂閱費 $138/30×10 = $46 可接受。

**降本路徑**：
- L2 改 Haiku 4.5（~10 倍便宜，但需先驗證 Pearson r vs Sonnet 仍 > 0.75）
- L3 用 prompt caching（system prompt 部分可 cache，省 50%）
- Retry loop 如命中率過高（> 40%）說明生成側 prompt 有問題，應該改 prompt 而不是靠 retry 救場

---

## 9. 已決問題（v1.1，2026-04-19 update）

1. ~~Gold set 徵集~~ → **已解決**：改 silver set 全 AI 合成，零真人零人工（見 §3）
2. ~~Pass 線 4.0 vs 3.7~~ → **已解決**：定 **3.7**
3. ~~Diversity embedding~~ → **已解決**：OpenAI `text-embedding-3-small` API（bge-m3 自託管對此量級不合算）
4. ~~人工 review 界面~~ → **已解決**：**不建**。改 AI 自動重試 loop（見 §7）
5. ~~Pairwise judge bias~~ → **已解決**：雙向跑寫進實施代碼（見 §5 + §10）

## 9.1 新增待決問題

- **Silver set 是否引入真實世界校準錨點**：是否從小紅書 / 家長論壇公開帖（**只讀**，不爬取私人內容）抽 3-5 封作為 silver set 的"真實感覆核"？純合成有理論風險（AI 生成 + AI 打分是自循環）。可作為 v1.2 選項
- **Retry 成本封頂**：單個用戶如果反復觸發 retry，是否算入配額 / 收費？建議 Free tier 只給 1 次 retry，Standard 給 2 次
- **校方公開材料爬取合規**：每校爬一次 mission/校長致辭，要遵守 `CLAUDE.md` 反爬規約——我們是訪客身份讀取，非 GPTBot。爬取頻率控制在季度一次

---

## 10. 實施 checklist

- [ ] `scripts/generate_silver_set.ts`（Opus 4.7 合成 50 封，§3.1）
- [ ] `scripts/extract_school_anchors.ts`（5 校官網爬取 + anchor 抽取，§3.2）
- [ ] `scripts/calibrate_judge.ts`（cross-model + self-consistency + negative set 校準，§3.3）
- [ ] `eval/silver_set.jsonl`（scripts 產物，commit 入庫）
- [ ] `src/lib/letter_eval/l1_checks.ts`（正則 + OpenCC + 長度 + taboo 黑名單）
- [ ] `src/lib/letter_eval/l2_entailment.ts`（claim 抽取 + 分類）
- [ ] `src/lib/letter_eval/l3_judge.ts`（Claude holistic judge，含 cross-model 校驗工具）
- [ ] `src/lib/letter_eval/pairwise.ts`（**必雙向跑 A/B + B/A**，禁止單向 API）
- [ ] `src/lib/letter_eval/retry_loop.ts`（§7 AI 自動重試 pipeline）
- [ ] `src/lib/letter_eval/diversity.ts`（OpenAI embedding + cosine matrix）
- [ ] `src/lib/letter_eval/anchor_match.ts`（school_fit 用 anchor 命中計分）
- [ ] `scripts/eval_regression.ts`（CI 腳本，比對 main 分支 silver set 分數）
- [ ] `src/app/api/cron/letter-eval-weekly/route.ts`（每週全量 silver regression）
- [ ] `src/app/api/admin/letter-eval-dashboard/route.ts`（aggregate 監控，僅開發者可看）
- [ ] `supabase/migrations/0XX_letter_evaluations.sql`（§7.2 schema，含 retry_attempt）
- [ ] `docs/letter_eval_weekly_report_template.md`
- [ ] CI 集成：GitHub Actions `.github/workflows/letter-eval-pr.yml`（PR 必跑 silver set）
- [ ] Red team 20 cases 文件 + test runner
- [ ] Slack / Email webhook 告警配置（§7.3，aggregate 指標超閾值）

---

**結束**。本 rubric 交付 B 的開發 AI 後，可作為生成系統的 "acceptance gate" 和持續質量回歸的唯一真相源。生成側任何 prompt 改動都要先跑本 rubric 的 silver set + red team 才能 ship。整個 pipeline 全 AI 驅動，無人工 review 角色。
