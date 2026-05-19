# Cross-platform backend design

## Goal

HKSchoolPlace should use one account system and one source of truth for web, iOS, and Android. Admins should edit shared data once, then choose which client apps can show it.

## Shared model

```text
Supabase Auth user
  ├─ profile
  ├─ favorites
  ├─ reminders
  ├─ programme subscriptions
  └─ child / preference data

Shared content
  ├─ schools
  ├─ vacancies
  ├─ activities
  ├─ lcsd_programmes
  ├─ media_articles
  └─ homepage managed content
```

## Publishing rule

Use a `publish_channels` field on admin-managed content:

- `web`: visible to the website.
- `ios`: visible to the iOS app.
- `android`: visible to the Android app.
- Any combination is allowed, such as web only, mobile only, or all platforms.

Existing content defaults to all three channels so the migration does not hide live data.

## Admin UI rule

Every admin screen that edits front-facing content should show the same controls:

```text
顯示在哪些端
[x] 網頁端
[x] iOS 端
[x] Android 端
```

This is separate from the general visible/hidden state:

- Visible/hidden answers: should this content be public at all?
- Publish channels answer: if public, which client can show it?

## Rollout order

1. Add `publish_channels` to shared content tables.
2. Add admin controls where editors already update content.
3. Filter website reads to `web`.
4. When iOS switches from sample data to APIs, filter iOS reads to `ios`.
5. When Android is added, filter Android reads to `android`.
6. Keep user-owned data shared across platforms, not channel-specific.

## Product guardrails

- Do not duplicate user accounts by platform.
- Do not make separate iOS or Android copies of school, vacancy, activity, or article records.
- Use channel controls only for presentation and rollout.
- Keep favorites, reminders, and subscriptions shared for the same logged-in user.
