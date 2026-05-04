# Priority Top100 Completion Report

Generated at: 2026-05-04T14:44:34.269Z

## Final Status

- Target schools crawled: 100
- Effective extraction rows: 64
- Retry / escalation rows: 36
- Raw open-day signal rows: 6
- Validated open-day rows after manual review: 2
- Pending open-day CTA rows: 4
- Activity-only signal rows: 0
- Rejected false-positive rows: 0

## Acceptance

- Full queue executed: 100/100
- Application signal rows: 64
- Open-day signal rows before review: 6
- Status breakdown: ok=39, unchanged=25, content_insufficient=2, robots_blocked=2, unreachable=32

## Deliverables

- data/xhs/internal_priority_school_effective65.json
- data/xhs/internal_priority_school_retry_queue.json
- data/xhs/internal_priority_school_open_day_review.json
- data/xhs/internal_priority_school_frontend65.json

## Open Day Review

- 已复核前 20 条 raw signal，其中 validated=2、pending CTA=4、activity-only=0、rejected=0。
- 香港五常法幼稚園: 2025-09-27 明确为学校开放日，可作为已核验开放日。
- 加州天地幼稚園: Admissions FAQ 明确列出 Open Day: 2025-10-25，可作为已核验开放日。
- Learning Habitat 与 Victoria 多条信号实际来自申请结果/申请时段，已降级为 false positive。

## Recommended Operational Use

- 先用 `internal_priority_school_effective65.json` 作为官网招生信息可用池。
- 用 `internal_priority_school_retry_queue.json` 作为二次攻坚池，其中 robots_blocked 只建议人工处理。
- 前端把已核验开放日、待核验开放日、活动线索分层展示；false positive 不展示。
- 如需对外做强口径宣传，只使用 validated_open_day。

## Queue Provenance

- Queue source rows: 100
- Queue file: data/xhs/internal_priority_school_top100.json
- Crawl report: docs/school-website-report.priority-top100-2026-05-04.json
- Merged result: data/xhs/internal_priority_school_top100_results.json
