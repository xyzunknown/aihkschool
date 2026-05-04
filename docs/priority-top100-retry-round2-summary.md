# Priority Top100 Retry Round 2 Summary

Generated at: 2026-05-04

## Scope

- Retry target type: focused subset only
- Source: `data/xhs/internal_priority_school_retry_queue.json`
- Included strategies:
  - `manual_review`
  - `adapter_or_manual_page_selection`
- Excluded strategies:
  - `browser_or_manual_capture`
  - `respect_robots_manual_only`

## Execution

- Command output report: `docs/school-website-report.priority-top100-retry-focus-2026-05-04.json`
- Retried schools: 8
- Concurrency: 1

## Result

- Recovered to `ok`: 0
- Still `content_insufficient`: 3
- Still `unreachable`: 5

## School Outcomes

- `325970` 嘉諾撒聖心幼稚園: `content_insufficient`
- `151157` 大埔浸信會幼稚園: `unreachable`
- `622060` 安基司學校附屬國際幼稚園: `content_insufficient`
- `541222` 激活幼稚園: `unreachable`
- `564729` 香港聖公會基愛幼兒學校: `unreachable`
- `564702` 香港聖公會夏瑞芸幼兒學校: `unreachable`
- `566926` 香港聖公會東涌幼兒學校: `unreachable`
- `563323` 香港青年協會青樂幼稚園（油麻地）: `content_insufficient`

## Operational Conclusion

- This focused retry round recovered 0 schools.
- For these 8 schools, the current automated crawler path does not improve outcome versus round 1.
- Next step should be manual URL discovery / page selection, or per-domain adapter work for the `content_insufficient` group.