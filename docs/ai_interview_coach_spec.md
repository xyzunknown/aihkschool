# AI 面试陪练（Interview Coach）— 开发规划 v1.1

> **⚠️ 上线冻结（Hold）**：本功能暂不进入开发排期，待平台自然流量与用户留存达到可观规模后再启动。当前阶段优先聚焦核心择校工具（学校搜索、学额追踪、家长口碑）的用户增长与数据护城河建设。本文档仅作技术储备，禁止在未获明确授权前创建任何相关代码文件或数据库迁移。
>
> 本文件是给开发 Agent 的实施规划。读完此文档应能开始编码，不需要回读上下文。
> 关联项目：HKSchoolPlace（Next.js 14 + Supabase + Vercel）。请遵守 `CLAUDE.md` 中的所有项目规约。

## Changelog

- **v1.1**（2026-04-19）：引入 per-persona 语音栈路由（OpenAI 英语 / 豆包粤语），粤语正式进 V1；Free tier 改为 1 次 + 邀请解锁最多 3 次；锁定 5 间首批名校名单；Phase 0 改为 OpenAI/豆包 双栈并行 POC。
- **v1.0**（2026-04-18）：初版。单栈 OpenAI Realtime + Claude Sonnet 4.6 评分 + 分阶段交付。

---

## 1. 产品目标与定位

为 HKSchoolPlace 现有 K1-K3 家长用户提供 **基于真实学校 DNA 的 AI 语音面试陪练**。

- **场景**：K3 升小一面试季（每年 9-12 月）+ K1/N 班面试季（9-11 月）+ 平日日常练习
- **核心差异化**：不是通用题库，是**每间学校配独立 persona**（基于现有 reputation 数据），AI 提问风格、语言比例、考核重点都按该校真实面试还原
- **不做**：替代真人面试班；自动评分代替老师；非语音的 chatbot
- **目标 KPI**：
  - V1 上线 30 天内：500 个有效练习 session
  - 付费转化率 >= 5%（Free → Standard）
  - 平均 session 时长 >= 5 分钟
  - 家长 NPS >= 30

---

## 2. 技术选型（已锁定）

| 层 | 选型 | 备注 |
|---|---|---|
| 实时语音对话（英语主导 persona） | **OpenAI Realtime API**（model: `gpt-realtime`） | DBS / Marymount / SPCC 等 |
| 实时语音对话（粤语主导 persona） | **豆包 Realtime**（火山引擎） | La Salle / Munsang 等传统名校 |
| 客户端连接方式 | WebRTC + DataChannel（不用 WebSocket） | 延迟更低，两栈一致 |
| 凭证机制 | Ephemeral Token（OpenAI 60s / 豆包按其文档） | 不暴露主 API key |
| 评分 LLM | **Claude Sonnet 4.6**（model id: `claude-sonnet-4-6`） | Anthropic SDK |
| Persona 自动生成 | Claude Sonnet 4.6 | 离线批处理脚本 |
| Voice TTS | OpenAI Realtime 内建 / 豆包粤语拟人 voice | 不再使用 ElevenLabs fallback |
| 前端 | Next.js 14 App Router + Tailwind | 项目既有栈 |
| 数据库 | Supabase Postgres + RLS | 项目既有栈 |
| 客户端音频 | `getUserMedia` + WebRTC native | 不需要额外 SDK |

### 2.1 Per-persona stack 路由规则

- `persona.language_primary == 'en'` **AND** `language_primary_pct >= 70` → **OpenAI Realtime**
- `persona.language_primary == 'zh-yue'` **AND** `language_primary_pct >= 70` → **豆包 Realtime**
- 混合（任一语言占比 < 70%）→ 取主语言对应 stack，在 system prompt 中明示 code-switch 容忍度
- 路由在 persona 生成时固化到 `stack_provider` 字段（见 §4.2 / §6.1），运行时直接读取，不做动态判定

**明确拒绝 sandwich 架构**（OpenAI 推理 → 豆包 TTS，或反向）：双向转译 + 跨服务编排的端到端延迟 > 2s，破坏儿童对话流畅度。宁可接受单栈的各自短板，也不引入三段式 pipeline。

**环境变量新增**：
```
OPENAI_API_KEY=sk-...
OPENAI_REALTIME_MODEL=gpt-realtime
DOUBAO_REALTIME_APP_ID=
DOUBAO_REALTIME_TOKEN=
DOUBAO_REALTIME_MODEL=
ANTHROPIC_API_KEY=sk-ant-...
INTERVIEW_COACH_FREE_TIER_MONTHLY_LIMIT=1
INTERVIEW_COACH_FREE_TIER_MAX_WITH_REFERRALS=3
```

---

## 3. 架构总览

```
┌─────────────────────────────────────────────────────────────┐
│  Browser (Next.js Client Component)                          │
│  - <RealtimeSession>: WebRTC handshake + audio I/O           │
│  - <ConversationLog>: live caption                           │
│  - <MicVisualizer>: 麦克风音量条                              │
│  - 收集 transcript events，session end 时 POST 给后端         │
└────────────┬────────────────────────────────┬───────────────┘
             │                                │
             │ ① POST /api/practice/sessions  │ ④ WebRTC SDP
             │                                │ Audio + Events
             ▼                                ▼
┌─────────────────────────┐         ┌──────────────────────────┐
│  Next.js API Routes     │         │  OpenAI Realtime          │
│  - 创建 session 记录     │  ②      │  - 接收 SDP, 建立通道     │
│  - 调 OpenAI 创建 session│ ───────▶│  - 流式音频 in/out        │
│  - 返回 ephemeral token  │ ◀───────│  - VAD + transcription    │
│                         │  ③      │  - 发送 conversation events│
└──────────┬──────────────┘         └──────────────────────────┘
           │
           │ ⑤ POST transcript on end
           ▼
┌─────────────────────────┐
│  Background Scoring Job  │
│  - Claude Sonnet 评分    │
│  - 写入 scores 表         │
│  - email/in-app 通知     │
└─────────────────────────┘
```

---

## 4. 数据库 Schema

> 全部启用 RLS。`children` 表如已存在请扩展；其余全新建。

```sql
-- ==========================================
-- 4.1 孩子档案（如果已有 children 表，扩展即可）
-- ==========================================
create table if not exists children (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  birthday date not null,
  current_school text,
  current_class text,  -- 'N' | 'K1' | 'K2' | 'K3' | 'P1' | ...
  
  -- 用于 persona 题目个性化
  interests text[],
  personality_traits text[],
  language_proficiency jsonb,  -- {chinese: 'native', english: 'beginner', ...}
  
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index idx_children_user on children(user_id);

-- ==========================================
-- 4.2 学校面试 Persona（系统 curate 维护）
-- ==========================================
create table school_interview_personas (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references schools(id) on delete cascade,
  
  -- 角色设定
  role_name text not null,  -- e.g. 'Mrs Chan' / '陈校长'
  role_title text,           -- 'Principal' | 'Vice Principal'
  voice text not null,       -- OpenAI voice id: shimmer | coral | onyx | ...
  tone_descriptor text,      -- 'warm formal' | 'energetic' | 'traditional strict'
  style_notes text,
  
  -- 语言策略
  language_primary text not null,  -- 'en' | 'zh-yue' | 'zh-cmn'
  language_secondary text,
  language_primary_pct int default 100,  -- 50-100
  switch_trigger text,  -- 'after_warmup' | 'mid_session' | 'never'
  
  -- 题目策略
  signature_questions jsonb,  -- [{question_zh, question_en, scenario, weight}]
  question_pool_weights jsonb,  -- {self_intro: 'high', math: 'low', creative: 'medium', ...}
  values_to_probe text[],  -- ['family_values', 'religion', 'service_orientation', 'english_fluency']
  taboo_topics text[],
  
  -- Stack 路由（见 §2.1）
  stack_provider text not null default 'openai_realtime'
    check (stack_provider in ('openai_realtime', 'doubao_realtime')),

  -- 元数据
  applies_to_scenarios text[],  -- ['k1_admission', 'p1_admission', 'parent_interview']
  generated_from_reputation_at timestamptz,
  generated_by_model text,
  needs_regen boolean default false,
  manual_override jsonb,  -- 人工调整的字段（覆盖自动生成）
  
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create unique index uq_persona_school_active 
  on school_interview_personas(school_id) 
  where is_active = true;

-- ==========================================
-- 4.3 练习 Session
-- ==========================================
create table interview_practice_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id),
  child_id uuid references children(id),
  school_id uuid references schools(id),
  persona_id uuid references school_interview_personas(id),
  
  -- 配置
  scenario text not null,  -- 'k1_admission' | 'p1_admission' | 'parent_interview' | 'general_practice'
  language_mode text,       -- 'persona_default' | 'cantonese_only' | 'english_only' | 'mixed'
  target_duration_minutes int default 7,
  
  -- 状态
  status text default 'pending',  
  -- 'pending' | 'active' | 'completed' | 'aborted' | 'analyzing' | 'scored' | 'failed'
  
  -- 时间
  created_at timestamptz default now(),
  started_at timestamptz,
  ended_at timestamptz,
  duration_seconds int,
  
  -- OpenAI 元数据
  openai_session_id text,
  realtime_model text,
  estimated_cost_usd numeric(10,4),
  
  -- 内容
  transcript jsonb,  
  -- [{role: 'assistant'|'user', text, timestamp_ms, language, duration_ms}]
  
  -- 错误处理
  error_message text,
  reconnect_count int default 0
);

create index idx_sessions_user_recent 
  on interview_practice_sessions(user_id, created_at desc);

create index idx_sessions_pending_score 
  on interview_practice_sessions(status, ended_at) 
  where status = 'completed';

-- ==========================================
-- 4.4 评分结果
-- ==========================================
create table interview_practice_scores (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references interview_practice_sessions(id) on delete cascade,
  
  -- 总分（0-100）
  overall_score numeric(5,2),
  
  -- 5 维度评分（每维 1-5）
  dimension_scores jsonb,
  -- {
  --   content: {score: 4, reason: '...', evidence: 'turn 3, 7'},
  --   clarity: {score: 3, reason: '...'},
  --   confidence: {score: 4, reason: '...'},
  --   politeness: {score: 5, reason: '...'},
  --   language: {score: 3, reason: '...'}
  -- }
  
  -- 反馈
  strengths jsonb,        -- [{point, evidence_turn_index}]
  weaknesses jsonb,
  recommendations jsonb,  -- [{action, priority}]
  
  flagged_moments jsonb,  
  -- [{timestamp_ms, type: 'long_silence'|'off_topic'|'distress'|'great_answer', note}]
  
  -- 元数据
  scored_at timestamptz default now(),
  scoring_model text,
  scoring_cost_usd numeric(10,4)
);

-- ==========================================
-- 4.5 用户使用配额（Free tier 限制）
-- ==========================================
create table interview_practice_quotas (
  user_id uuid primary key references auth.users(id),
  plan text default 'free',  -- 'free' | 'standard' | 'pro'
  monthly_limit int default 1,                    -- free 默认 1，邀请可加
  referral_unlocks_this_period int default 0,    -- 本周期邀请解锁的额度数，封顶 2 → 总上限 3
  current_period_start date,
  current_period_used int default 0,

  updated_at timestamptz default now()
);

-- ==========================================
-- RLS 策略
-- ==========================================
alter table children enable row level security;
alter table interview_practice_sessions enable row level security;
alter table interview_practice_scores enable row level security;
alter table interview_practice_quotas enable row level security;
alter table school_interview_personas enable row level security;

create policy children_owner on children for all using (auth.uid() = user_id);
create policy sessions_owner on interview_practice_sessions for all using (auth.uid() = user_id);
create policy scores_owner on interview_practice_scores for select 
  using (exists (select 1 from interview_practice_sessions s 
                 where s.id = session_id and s.user_id = auth.uid()));
create policy quotas_owner on interview_practice_quotas for all using (auth.uid() = user_id);

-- personas: anon 可读 active 的（用于显示给用户选）
create policy personas_anon_read on school_interview_personas 
  for select using (is_active = true);
```

---

## 5. API 路由设计

| 路由 | 方法 | 功能 |
|---|---|---|
| `/api/practice/sessions` | POST | 创建 session、扣 quota、调 OpenAI 拿 ephemeral token |
| `/api/practice/sessions` | GET | 列出当前用户的 session 历史 |
| `/api/practice/sessions/[id]` | GET | session 详情 + 评分 |
| `/api/practice/sessions/[id]/transcript` | POST | 客户端上报 transcript（session 结束时） |
| `/api/practice/sessions/[id]/end` | POST | 标记 session 结束，触发评分 job |
| `/api/practice/personas/[school_id]` | GET | 获取该校 persona（用于展示） |
| `/api/practice/quota` | GET | 当前用户配额状态 |
| `/api/cron/score-pending-sessions` | POST | Cron：扫待评分 session 跑评分（每 2 分钟） |
| `/api/admin/personas/generate` | POST | 后台：从 reputation 自动生成 persona（admin only） |

### 5.1 关键路由：POST `/api/practice/sessions`

```typescript
// src/app/api/practice/sessions/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabase/server';
import { buildSystemPrompt } from '@/lib/practice/prompt';
import { checkAndIncrementQuota } from '@/lib/practice/quota';

export async function POST(req: NextRequest) {
  const supabase = getSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: { code: 'UNAUTHORIZED' }}, { status: 401 });

  const body = await req.json();
  const { school_id, child_id, scenario, language_mode } = body;

  // 1. 配额检查
  const quotaOk = await checkAndIncrementQuota(user.id);
  if (!quotaOk.allowed) {
    return NextResponse.json({ 
      error: { code: 'QUOTA_EXCEEDED', message: quotaOk.message }
    }, { status: 429 });
  }

  // 2. 拉 persona、孩子资料
  const [persona, child] = await Promise.all([
    supabase.from('school_interview_personas').select('*').eq('school_id', school_id).eq('is_active', true).single(),
    supabase.from('children').select('*').eq('id', child_id).single()
  ]);

  // 3. 建 session 记录
  const { data: session } = await supabase.from('interview_practice_sessions').insert({
    user_id: user.id,
    child_id,
    school_id,
    persona_id: persona.data.id,
    scenario,
    language_mode,
    status: 'pending',
    realtime_model: process.env.OPENAI_REALTIME_MODEL,
  }).select().single();

  // 4. 构建 system prompt
  const systemPrompt = buildSystemPrompt({ persona: persona.data, child: child.data, scenario });

  // 5. 按 persona.stack_provider 路由到对应 Realtime 服务
  //    == 'openai_realtime' → 走下面的 OpenAI flow（已实现）
  //    == 'doubao_realtime' → 走 createDoubaoSession(persona, systemPrompt)
  //         ↳ 调火山引擎 Realtime 鉴权 endpoint，返回 { client_token, ws_url }
  //         ↳ 客户端走 DoubaoRealtimeSession 实现（见 §5.2 抽象接口）
  //         ↳ 具体 endpoint / 鉴权格式 / function calling 支持见 Phase 0 POC 报告后回填
  if (persona.data.stack_provider === 'doubao_realtime') {
    const doubaoSession = await createDoubaoSession({ persona: persona.data, systemPrompt });
    await supabase.from('interview_practice_sessions')
      .update({
        openai_session_id: doubaoSession.id,  // 复用该列存 provider session id
        status: 'active',
        started_at: new Date().toISOString(),
      })
      .eq('id', session.id);
    return NextResponse.json({
      session_id: session.id,
      provider: 'doubao_realtime',
      client_secret: doubaoSession.client_token,
      ws_url: doubaoSession.ws_url,
      expires_at: doubaoSession.expires_at,
    });
  }

  // 5a. OpenAI Realtime flow
  const oaiResp = await fetch('https://api.openai.com/v1/realtime/sessions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: process.env.OPENAI_REALTIME_MODEL,
      voice: persona.data.voice,
      instructions: systemPrompt,
      modalities: ['audio', 'text'],
      input_audio_transcription: { model: 'whisper-1' },
      turn_detection: {
        type: 'server_vad',
        threshold: 0.5,
        prefix_padding_ms: 300,
        silence_duration_ms: 800,
        create_response: true
      },
      tool_choice: 'auto',
      tools: [
        {
          type: 'function',
          name: 'end_interview',
          description: 'Call when interview should end (target time reached, child says they want to stop, or hard 10-minute limit).',
          parameters: { type: 'object', properties: { reason: { type: 'string' }} }
        },
        {
          type: 'function',
          name: 'flag_concerning_moment',
          description: 'Call when child shows distress, says something concerning, or there is a notable issue.',
          parameters: { type: 'object', properties: { 
            type: { type: 'string', enum: ['distress', 'inappropriate', 'great_answer', 'long_silence']},
            note: { type: 'string' }
          }}
        }
      ],
      max_response_output_tokens: 4096,
    })
  });

  const oaiSession = await oaiResp.json();

  // 6. 更新 session
  await supabase.from('interview_practice_sessions')
    .update({
      openai_session_id: oaiSession.id,
      status: 'active',
      started_at: new Date().toISOString(),
    })
    .eq('id', session.id);

  return NextResponse.json({
    session_id: session.id,
    provider: 'openai_realtime',
    client_secret: oaiSession.client_secret.value,
    expires_at: oaiSession.client_secret.expires_at,
  });
}
```

**客户端 `RealtimeSession` 抽象**：把 §5.2 的 `RealtimeSession` 升级为接口，具体实现两个类 `OpenAIRealtimeSession` / `DoubaoRealtimeSession`，对外暴露相同方法（`connect()` / `on(event, cb)` / `end()`）。前端按后端返回的 `provider` 字段实例化对应类。

### 5.2 客户端 WebRTC 连接

```typescript
// src/lib/practice/realtime-client.ts
export class RealtimeSession {
  private pc: RTCPeerConnection;
  private dc: RTCDataChannel;
  private audioEl: HTMLAudioElement;
  
  events: { [type: string]: ((e: any) => void)[] } = {};
  transcript: TranscriptEntry[] = [];
  
  constructor(private clientSecret: string) {
    this.pc = new RTCPeerConnection();
    this.audioEl = new Audio();
    this.audioEl.autoplay = true;
  }
  
  async connect() {
    // 1. 接 OpenAI 输出音频
    this.pc.ontrack = e => { this.audioEl.srcObject = e.streams[0]; };
    
    // 2. 接 mic
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    stream.getTracks().forEach(t => this.pc.addTrack(t, stream));
    
    // 3. 数据通道（接收 events）
    this.dc = this.pc.createDataChannel('oai-events');
    this.dc.onmessage = e => this.handleEvent(JSON.parse(e.data));
    
    // 4. SDP 交换
    const offer = await this.pc.createOffer();
    await this.pc.setLocalDescription(offer);
    
    const sdpResp = await fetch(
      `https://api.openai.com/v1/realtime?model=${process.env.NEXT_PUBLIC_OPENAI_REALTIME_MODEL}`,
      {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${this.clientSecret}`, 'Content-Type': 'application/sdp' },
        body: offer.sdp
      }
    );
    
    await this.pc.setRemoteDescription({ type: 'answer', sdp: await sdpResp.text() });
  }
  
  private handleEvent(event: any) {
    // 关注的事件类型：
    // - 'conversation.item.created' (新 turn)
    // - 'response.audio_transcript.done' (AI 说完了)
    // - 'conversation.item.input_audio_transcription.completed' (用户说完了)
    // - 'response.function_call_arguments.done' (function call)
    // - 'error'
    
    switch (event.type) {
      case 'conversation.item.input_audio_transcription.completed':
        this.transcript.push({
          role: 'user',
          text: event.transcript,
          timestamp_ms: Date.now(),
        });
        break;
      case 'response.audio_transcript.done':
        this.transcript.push({
          role: 'assistant',
          text: event.transcript,
          timestamp_ms: Date.now(),
        });
        break;
      case 'response.function_call_arguments.done':
        if (event.name === 'end_interview') this.emit('end_requested', JSON.parse(event.arguments));
        if (event.name === 'flag_concerning_moment') this.emit('flag', JSON.parse(event.arguments));
        break;
    }
    
    this.emit(event.type, event);
  }
  
  on(eventType: string, cb: (e: any) => void) {
    (this.events[eventType] ||= []).push(cb);
  }
  
  private emit(type: string, e: any) {
    (this.events[type] || []).forEach(cb => cb(e));
  }
  
  async end() {
    this.pc.close();
  }
}
```

---

## 6. Persona 系统（核心差异化）

### 6.1 自动从 reputation 数据生成 persona

脚本：`scripts/generate_school_personas.py`（一次性 + 增量跑）

```python
# 伪代码
for school in schools_with_reputation_data:
    enrichment = fetch_enrichment(school.id)  # reputation_summary, interview_style, etc.
    
    prompt = f"""
你是教育领域专家。基于下面这间香港学校的口碑数据，
为它生成一个面试 persona JSON，用于 AI 模拟该校的入学面试官。

学校：{school.name}（{school.school_type}）
教学理念：{enrichment.reputation_summary}
家长评价 - 优点：{enrichment.pros_tags}
家长评价 - 缺点：{enrichment.cons_tags}
面试风格描述：{enrichment.interview_style or '未知'}
宗教背景：{school.religious_affiliation or '无'}
教学语言：{school.medium_of_instruction}

输出 JSON，包含：
- role_name: 校长名字（虚构，符合学校文化）
- role_title: 'Principal'
- voice: 从 [shimmer, coral, onyx, sage, alloy] 选一个最合适
- tone_descriptor: 一句话描述语气风格
- language_primary: 'en' | 'zh-yue' | 'zh-cmn'
- language_secondary: 同上
- language_primary_pct: 50-100
- signature_questions: 5-8 道该校特色题（中英双版本）
- question_pool_weights: {{ self_intro/family/math/creative/obedience/general_knowledge/social: 'high'|'medium'|'low' }}
- values_to_probe: array
- taboo_topics: array
"""
    
    persona = claude.json_extract(prompt)

    # Stack 路由决策：锁死在 persona 记录上，运行时不再判定
    if persona.language_primary == 'zh-yue' and persona.language_primary_pct >= 70:
        persona.stack_provider = 'doubao_realtime'
    else:
        persona.stack_provider = 'openai_realtime'

    upsert_persona(school.id, persona)
```

跑完 1000+ 学校 ≈ $20-50 一次。后续靠 `needs_regen` flag 增量更新。

### 6.2 System prompt 构建（运行时）

```typescript
// src/lib/practice/prompt.ts
export function buildSystemPrompt({ persona, child, scenario }): string {
  const ageMonths = monthsBetween(new Date(child.birthday), new Date());
  
  return `
You are conducting a mock admission interview for ${child.name}, who is applying to ${scenario === 'p1_admission' ? 'Primary 1' : 'Kindergarten'}.

# Your role
You are ${persona.role_name}, ${persona.role_title} of the school. Stay in character throughout.
Tone: ${persona.tone_descriptor}
${persona.style_notes || ''}

# Language strategy
Speak ${persona.language_primary_pct}% in ${langName(persona.language_primary)}, the rest in ${langName(persona.language_secondary)}.
${persona.switch_trigger === 'after_warmup' ? 'Switch language naturally after the first 2 questions, not abruptly.' : ''}
Keep vocabulary simple — child is ${Math.floor(ageMonths/12)} years old.
Use short sentences (under 12 words for ages under 5).

# Interview structure (target ${scenario === 'p1_admission' ? '7' : '5'} minutes)
1. Warm greeting using child's name. Ask if they're ready.
2. Self-introduction question.
3. 4-6 questions chosen from the approved pool, weighted by school priorities below.
4. Closing: thank child, ask if they have any question for you.

# Question pool weights (this school cares about these topics):
${JSON.stringify(persona.question_pool_weights, null, 2)}

# Signature questions (use 2-3 of these — they're this school's known questions)
${persona.signature_questions.map(q => `- ${q.question_zh} / ${q.question_en}`).join('\n')}

# Values to probe through questions
${persona.values_to_probe.join(', ')}

# Taboo - DO NOT ask about
${persona.taboo_topics.join(', ') || 'None specified'}

# CRITICAL behavior rules (override anything else)
- Never say "wrong" / "incorrect" / "no". If child answers wrong, gently rephrase or move on.
- After child finishes speaking, wait 1-2 seconds before responding (natural pacing).
- If child stays silent for >8 seconds, give gentle encouragement OR skip with "let's try a different question".
- If child sounds distressed (whining, crying, very quiet, refuses to talk):
  → Call function flag_concerning_moment with type='distress'
  → Switch to easier topic (their favorite toy, family pet, etc.)
- If child says something inappropriate or troubling: do NOT engage with details, redirect kindly. Call flag_concerning_moment if it seems serious.
- Do not ask about: family income, parents' immigration/visa status, comparisons with siblings.

# Child's known information (use to personalize questions; do NOT recite back to child)
- Interests: ${child.interests?.join(', ') || 'unknown'}
- Personality: ${child.personality_traits?.join(', ') || 'unknown'}
- Languages: ${JSON.stringify(child.language_proficiency || {})}

# When to end
Call function end_interview when:
- Target duration reached AND closing complete, OR
- 10 minutes elapsed regardless, OR
- Child explicitly says they want to stop, OR
- Multiple consecutive distress signals (after 2 distress flags, gracefully wrap up)

Begin the interview now with your warm greeting.
`.trim();
}
```

---

## 7. 评分系统（Session 结束后）

### 7.1 触发

- Cron `/api/cron/score-pending-sessions` 每 2 分钟跑一次
- 扫 `status = 'completed'` 且 30 秒前结束的 session
- 标 `status = 'analyzing'` → 跑评分 → 标 `status = 'scored'`

### 7.2 评分 Prompt（用 Claude Sonnet 4.6）

```typescript
const SCORING_PROMPT = `
你是香港小学/幼稚园入学面试的资深评估官。

下面是一段 AI 模拟面试的 transcript。请评估**孩子（user 角色）**的表现，
站在该学校 ${schoolName}（${schoolType}）的真实面试官视角。

# 评估维度（每维 1-5 分，5 分为最优）
1. **Content 内容**：是否真的在回答问题？on-topic？
2. **Clarity 表达**：能否听懂？句子完整度？
3. **Confidence 自信**：流利度、停顿、音量（看 transcript 间隔时间）
4. **Politeness 礼貌**：称呼、谢谢请、回应礼仪
5. **Language 语言**：词汇是否适龄？grammar？双语切换自然度？

# 输出 JSON 格式
{
  "overall_score": 0-100 综合分,
  "dimension_scores": {
    "content": {"score": 1-5, "reason": "...", "evidence_turn_indices": [...]},
    "clarity": {"score": 1-5, ...},
    ...
  },
  "strengths": [
    {"point": "...", "evidence_turn_index": N}
  ],
  "weaknesses": [...],
  "recommendations": [
    {"action": "下次练习时多练...", "priority": "high|medium|low"}
  ],
  "flagged_moments": [
    {"timestamp_ms": ..., "type": "long_silence|off_topic|great_answer", "note": "..."}
  ]
}

# Transcript（带 turn index）
${formatTranscriptForScoring(session.transcript)}
`;
```

---

## 8. 前端页面

```
src/app/(auth)/practice/
├── page.tsx                          # 入口：选学校 / 选孩子
├── [schoolId]/
│   ├── setup/page.tsx                # 配置：scenario, language, child
│   └── live/page.tsx                 # 实战页（client component）
├── sessions/
│   ├── page.tsx                      # 历史列表
│   └── [id]/page.tsx                 # 单次详情 + 评分
└── components/
    ├── RealtimeSessionPanel.tsx      # client: WebRTC + UI
    ├── ConversationLog.tsx           # 实时字幕
    ├── MicVisualizer.tsx
    ├── EndSessionButton.tsx
    ├── ScoreCard.tsx
    ├── DimensionRadar.tsx            # 5 维雷达图
    └── TranscriptViewer.tsx          # 可点 turn 看对应评分依据
```

### 8.1 Live 页面状态机

```typescript
type SessionState = 
  | 'idle'           // 还没开始
  | 'requesting'     // 拿 token 中
  | 'connecting'     // WebRTC 握手中
  | 'warming_up'     // AI 说 opening
  | 'active'         // 正常对话
  | 'reconnecting'   // 网络断
  | 'completing'     // 收尾中（POST transcript）
  | 'analyzing'      // 等评分
  | 'done'           // 完成
  | 'error';
```

### 8.2 UI 关键交互

- **Live 页面顶部**：倒计时（target / hard limit 10:00）
- **中间**：当前对话气泡（user / assistant 流式字幕）
- **底部**：MicVisualizer + 「結束練習」按钮（确认弹窗）
- **侧边**：当前 persona 信息（家长可看："正在以陈校长身份提问"）
- **Hard limit 警告**：到 9:30 弹"剩余 30 秒"

---

## 9. 配额与计费

### 9.1 Free Tier
- **默认 1 次/月**（首次免费体验）
- **邀请解锁**：每邀请 1 位新用户成功注册（邮箱验证通过）+ 1 次，本周期最多累积到 **3 次**（即 referral_unlocks_this_period ≤ 2）
- 每次 hard cap 5 分钟（Standard / Pro 是 10 分钟）

**邀请闭环（V1 最小实现）**
- `/practice` 页有「邀请好友 +1 次」按钮 → 生成带 `?ref=<code>` 的分享链接（ref code = user.id 的短哈希）
- 新用户注册流读 `ref` query param → 写入 `users.referred_by`
- 邮箱验证成功后触发 quota 更新：邀请人 `referral_unlocks_this_period += 1`（若未达上限）
- 反作弊见 §13（待定：同邮箱域名 / 同 IP 限制）

### 9.2 Standard $138/月
- 30 次/月
- 10 分钟/次
- 全部学校 persona

### 9.3 Pro $268/月
- 80 次/月
- 10 分钟/次
- + family interview mode

**实现**：每次创建 session 前检查 `interview_practice_quotas`，超出返回 429。Stripe 订阅状态 sync 到 quotas 表。

---

## 10. 安全与隐私

### 10.1 必须做
- **不存音频**（V1 only transcript）
- 用户可一键删除整个练习历史 (`DELETE /api/practice/sessions/all`)
- transcript 保留 90 天后自动 purge（cron job）
- 创建 session 前显示明确告知："本次对话不会录音，仅会保存文字记录用于评分"
- Persona 含未成年保护逻辑（taboo_topics 必须包含个人信息相关）
- OpenAI Realtime API key **绝不出现在 client bundle**（只在 server 调）
- Ephemeral token 60s 有效期（OpenAI 默认）

### 10.2 危机检测
- AI 检测到 `flag_concerning_moment` type=`distress` 触发 ≥ 2 次 → 自动结束 session + 标记 + 给家长在 result 页温和提示
- 万一 transcript 中出现自伤/虐待相关关键词 → 不显示给家长前要 sanitize？或显示但加 disclaimer？（**这个需要产品最终决定**，见 §13 待决问题）

---

## 11. 分阶段交付

### Phase 0：双栈并行 POC（1 周）

不接 UI，两条 track 并行跑，验证 per-persona 路由假设。

**Track A — OpenAI Realtime POC**
- 用 DBS persona（英语为主，hardcoded）
- localhost 跑 5 分钟英文模拟面试
- 验 function call（`end_interview` / `flag_concerning_moment`）

**Track B — 豆包 Realtime POC**
- 用 La Salle persona（粤语为主，hardcoded）
- localhost 跑 5 分钟粤语模拟面试
- 重点验：function call 是否原生支持（否则需要服务端轮询 transcript 关键词 fallback），打断行为，粤语拟人度

**对比矩阵（acceptance criteria）**

| 指标 | OpenAI 目标 | 豆包目标 |
|---|---|---|
| 连接成功率（10 次） | ≥ 99% | ≥ 95% |
| 端到端延迟（user 说完 → AI 出声） | ≤ 1.5s | ≤ 2.0s |
| 英语拟人度（5 人盲听，5 分制） | ≥ 4.0 | n/a |
| 粤语拟人度（5 人盲听，5 分制） | n/a | ≥ 4.0 |
| function calling 支持 | 必须原生 | 必须原生；若不支持 → 定义 fallback 方案 |
| 打断处理 | 原生 server_vad 验收 | 验证豆包 VAD 行为 |
| 单 session 成本（5 min） | 实测记录 | 实测记录 |

**交付**：对比报告 `docs/realtime-poc.md`，锁定每种 persona 的 stack 归属 + 豆包 function calling fallback 方案（如需要）。

### Phase 1：MVP（4 周）
- DB schema 全部建好（含 `stack_provider` 列、`referral_unlocks_this_period` 列）
- **5 间手动 curate persona（V1 launch 名单，直接写 SQL，不用脚本生成）**：
  1. 拔萃男书院附属小学 (DBS Primary Division) — 男校 / 英语为主 / stack = `openai_realtime`
  2. 喇沙小学 (La Salle Primary School) — 男校 / 粤英混合偏粤 / stack = `doubao_realtime`
  3. 玛利曼小学 (Marymount Primary School) — 女校 / 英语为主 / stack = `openai_realtime`
  4. 圣保罗男女中学附属小学 (SPCC Primary) — 男女校 / 英语为主 / stack = `openai_realtime`
  5. 民生书院小学 (Munsang College Primary) — 男女校 / 粤语为主 / stack = `doubao_realtime`
  → 覆盖「男 / 女 / 男女」× 「英 / 粤」× 「直资 / 资助」组合，足以验证 per-persona 路由与评分在两种 stack 上的一致性
- 端到端 flow 跑通：setup → live → end → 评分 → result
- 单一 scenario：`p1_admission`
- 邀请解锁闭环跑通（1 → 3 额度逻辑）
- **不接** Stripe，所有用户免费
- 邀 10-15 位家长内测
- **交付**：能用 staging 环境给家长试用，收集反馈

### Phase 2：V1 公测（4 周）
- 接入 1000+ 学校的 auto-generated persona（脚本跑）
- 接 Stripe + 配额逻辑
- 加入 `k1_admission` scenario
- 评分历史 dashboard（趋势图）
- 邮件提醒：评分完成、配额用完、订阅快到期
- **交付**：production 上线，公开访问

### Phase 3：V2（按数据决定排期）
- `parent_interview` scenario
- Live Coach Mode（家长耳机里 AI 提示）
- Image card 题型（function call 触发显图）
- 粤语 voice 升级（接 ElevenLabs Cantonese）
- 进度追踪（每周报告）

---

## 12. 验证清单

每个 Phase 完成必须 pass：

**Phase 0（POC）**
- [ ] 连续 10 次 5 分钟 session，连接成功率 100%
- [ ] 端到端延迟 < 1.5s
- [ ] 5 个 OpenAI voice 各录一段，由真人盲听评分（≥3.5/5 才算可用）
- [ ] function call 至少触发一次 `end_interview`（有效）
- [ ] 粤语 voice 质量评分单独记录

**Phase 1（MVP）**
- [ ] 5 个 persona 各跑 3 次 session，transcript 完整率 100%
- [ ] 评分 job 在 session 结束 60s 内完成
- [ ] RLS：用户 A 拿不到用户 B 的 session
- [ ] 配额：Free 第 4 次 session 必返回 429
- [ ] Mobile（iPhone Safari）能用 — 这是项目 mobile-first 基本盘
- [ ] 至少 10 位真实家长完成 1 次完整 session 并填反馈

**Phase 2（V1）**
- [ ] 100+ 学校 persona 自动生成成功
- [ ] Stripe webhook 同步 plan 到 quotas 表
- [ ] 端到端 cost 监控仪表板：每 session 成本 ≤ $2.5
- [ ] 5% 转化率（Free → Standard）作为成功线

---

## 13. 待决问题（开发前需要产品确认）

> 开发 AI 不要自行决定，列在这里让产品 owner 决策后再开始相关工作。

1. ~~**Free tier 限制**：3 次/月 vs 1 次/周 vs 5 分钟试用~~ → **已解决 v1.1**：1 次免费 + 邀请解锁（每邀请 +1，封顶 3）
2. **危机内容处理**：transcript 中如果出现孩子自伤/虐待相关词，给家长看吗？怎么 sanitize？是否上报机制？→ ?
3. ~~**粤语是否进 V1**~~ → **已解决 v1.1**：YES，走豆包 Realtime
4. ~~**首批 5-10 间学校选哪些**~~ → **已解决 v1.1**：DBS / La Salle / Marymount / SPCC / Munsang 五间（见 §11 Phase 1）
5. **儿童语音同意**：需不需要明示父母同意 flow（即使不录音）？建议加 → ?
6. **Pricing 锁定**：$138 / $268 是否最终价位？取决于 OpenAI / 豆包 实际用量 → ?
7. **入口位置**：`/practice` 顶级 nav 还是埋在 `/account` 下？建议顶级 → ?
8. **Result 页面是否分享**：家长可截图分享给伴侣 / 老师？需要去 PII 化？→ ?
9. **（v1.1 新增）豆包 Realtime function calling 是否原生支持**：Phase 0 Track B 验证；若不支持，确认服务端轮询 transcript 关键词触发 `end_interview` / `flag_concerning_moment` 的 fallback 方案 → ?
10. **（v1.1 新增）邀请解锁反作弊**：是否限同一邮箱域名？同一注册 IP 只记一次？是否对一次性邮箱（mailinator 等）blocklist？→ ?

---

## 14. 文件清单（开发 checklist）

新增文件：
- `supabase/migrations/0XX_interview_coach.sql`（§4 全部 schema）
- `scripts/generate_school_personas.py`（§6.1）
- `src/lib/practice/realtime-client.ts`（§5.2）
- `src/lib/practice/prompt.ts`（§6.2）
- `src/lib/practice/scoring.ts`（§7.2）
- `src/lib/practice/quota.ts`
- `src/app/api/practice/sessions/route.ts`
- `src/app/api/practice/sessions/[id]/route.ts`
- `src/app/api/practice/sessions/[id]/transcript/route.ts`
- `src/app/api/practice/sessions/[id]/end/route.ts`
- `src/app/api/practice/personas/[school_id]/route.ts`
- `src/app/api/practice/quota/route.ts`
- `src/app/api/cron/score-pending-sessions/route.ts`
- `src/app/(auth)/practice/page.tsx`（含子路由如 §8）
- `src/app/(auth)/practice/components/`（多个组件）

修改文件：
- `vercel.json`（加 cron + env reference）
- `src/app/layout.tsx` 或导航组件（加 "面试陪练" tab）
- `package.json`（依赖：`@anthropic-ai/sdk`）

---

## 15. 参考文档

- OpenAI Realtime API: https://platform.openai.com/docs/guides/realtime
- OpenAI Realtime WebRTC quickstart: https://platform.openai.com/docs/guides/realtime-webrtc
- OpenAI Realtime function calling: https://platform.openai.com/docs/guides/realtime-function-calling
- Anthropic Claude SDK (Node): https://github.com/anthropics/anthropic-sdk-typescript
- Anthropic Prompt Caching: https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching
- 项目既有 Cron 模板：`src/app/api/cron/reminders/route.ts`
- 项目既有 Supabase server client：`src/lib/supabase/server.ts`
- 项目反爬护城河规约：`CLAUDE.md` §"數據護城河"

---

**结束**。本文档完成可让另一 AI 直接开始 Phase 0 实施。如需调整 scope，请编辑本文件并标注 changelog。
