# Website Recovery Acceptance - Proxy Wave 2 - 2026-04-19

## Scope

This follow-up run captures the additional recovery work completed after the first proxy-wave full crawl:

- YMCA host browser-render policy
- Chan Kwong No.2 rerun recovery
- additional unlocked-host verification

Authoritative artifact:

- `docs/school-website-report.proxy-wave-2.json`

Comparison artifact:

- `docs/school-website-report.proxy-wave.json`

## Full-run Metrics

Previous proxy wave (`proxy-wave`):

- total: 868
- ok: 160
- unchanged: 430
- content_insufficient: 56
- robots_blocked: 4
- unreachable: 217
- error: 1

Current follow-up (`proxy-wave-2`):

- total: 868
- ok: 10
- unchanged: 587
- content_insufficient: 52
- robots_blocked: 4
- unreachable: 215
- error: 0

Important interpretation:

- the drop in `ok` does **not** indicate regression
- many records moved from fresh `ok` to stable `unchanged` because the database now already contains the recovered content hash

Net change that matters operationally:

- content_insufficient: `56 -> 52` (`-4`)
- unreachable: `217 -> 215` (`-2`)
- error: `1 -> 0` (`-1`)

Unresolved total (`unreachable + content_insufficient + robots_blocked + error`):

- `278 -> 271` (`-7`)

Compared with the earlier `post-fixes` baseline:

- `323 -> 271` (`-52`)

## Incremental Recoveries

YMCA:

- added forced browser-render policy for `ymcahk.org.hk` and `www.ymcahk.org.hk`
- result in the latest full report:
  - all `3 / 3` YMCA records are now stable `unchanged`

Chan Kwong No.2:

- single-school rerun artifact: `docs/acceptance-chankwong2-rerun.json`
- current full report shows the school as stable `unchanged`

Anfield:

- remains unresolved in the full report
- root site is reachable, but the stored school URL `https://anfield.edu.hk/lv/` returns a `404` page
- this should be treated as a URL normalization / side-channel correction task, not a crawler rendering issue

## Remaining Notes

The dominant blocker set is still the same:

- Cloudflare / anti-bot challenge hosts
- robot challenge / 202 shell hosts
- parked or near-empty domains

Still-high-value unresolved hosts include:

1. `www.yuenyuenkg.edu.hk`
2. `www.anchors.edu.hk`
3. `www.boxhill.edu.hk`
4. `www.wfb.edu.hk`
5. `www.elementiedu.org`

## Conclusion

The follow-up proxy wave produced another measurable reduction without introducing new crawler complexity outside a minimal YMCA browser policy:

- unresolved total dropped by another `7`
- the cumulative reduction versus `post-fixes` is now `52`

The next best ROI remains:

1. fix wrong or stale school URLs like Anfield where the root domain is alive but the stored path is dead
2. move persistent Cloudflare / robot-challenge hosts to side-channel recovery instead of more generic crawling work