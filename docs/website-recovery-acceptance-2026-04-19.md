# Website Recovery Acceptance Report — 2026-04-19

## Scope

This wave focused on reducing unresolved school website enrichments without waiting for manual input.

Implemented fixes:

1. `creative.edu.hk` WordPress REST host adapter
2. `www.salvationarmy.org.hk` branch-path adapter scaffold
3. generic `meta refresh` follow support
4. `www.good-health.edu.hk` campus-subdomain adapter
5. `www.gciedu.hk` fixed-navigation adapter
6. JavaScript app-shell detection to force browser rendering
7. `www.maynga.edu.hk` switched to Playwright rendering

## Targeted validation results

Validation artifacts:

- `docs/acceptance-host-adapters.json`
- `docs/creative-adapter-run.json`
- `docs/acceptance-joyful-goodhealth.json`
- `docs/acceptance-gciedu-maynga.json`
- `docs/acceptance-maynga-rerun.json`

Host-level outcomes:

- `creative.edu.hk`: 10 / 10 schools `ok`
- `www.joyfulenglish.edu.hk`: 5 / 5 schools `ok`
- `www.good-health.edu.hk`: 4 / 4 schools `ok`
- `www.gciedu.hk`: 2 / 2 schools `ok`
- `www.maynga.edu.hk`: 3 / 3 schools `ok`
- `www.salvationarmy.org.hk`: adapter path added, but host still connection-refused during validation

## Full acceptance crawl

Baseline report before this wave:

- `docs/school-website-report.latest.json`

Post-fix full crawl report:

- `docs/school-website-report.post-fixes.json`

Key metrics:

| Metric | Before | After | Delta |
| --- | ---: | ---: | ---: |
| `unreachable` | 289 | 263 | `-26` |
| `content_insufficient` | 52 | 56 | `+4` |
| total unresolved (`unreachable + content_insufficient + error + spa_detected`) | 341 | 319 | `-22` |

Notes:

- `ok` dropped from `74` to `9` only because many previously solved records are now reported as `unchanged`, not because data regressed.
- `unchanged` increased from `449` to `536`, which is expected after successful updates were written back and then re-crawled.

## Remaining blockers

The largest unresolved hosts after the post-fix crawl are:

1. `www.salvationarmy.org.hk` — `27 unreachable`
2. `www.yuenyuenkg.edu.hk` — `5 content_insufficient`
3. `www.anchors.edu.hk` — `3 content_insufficient`
4. `www.boxhill.edu.hk` — `3 content_insufficient`
5. `www.elementiedu.org` — `3 unreachable`
6. `www.loksintongkg.edu.hk` — `3 unreachable`
7. `www.wfb.edu.hk` — `3 content_insufficient`

Observed technical constraints:

- `www.salvationarmy.org.hk`: connection refused
- `www.yuenyuenkg.edu.hk`, `www.anchors.edu.hk`, `www.wfb.edu.hk`, several others: Cloudflare block / bot challenge page, including under browser automation
- `www.boxhill.edu.hk`, `mulberryhousekg.com`: robot challenge / cookie gate under browser automation
- `www.elementiedu.org`, `www.loksintongkg.edu.hk`: verification interstitial (`One moment, please...`)
- `www.dominicsaviokg.org`: only a meta-refresh shell; target host is Cloudflare-blocked

## Conclusion

This wave produced measurable reduction in unresolved schools and cleared the highest-value adapter-friendly families that were solvable inside the current environment.

Current hard limit is no longer crawler structure alone. The main remaining blockers are:

1. network-level outage
2. Cloudflare / robot verification that also blocks Playwright from this environment
3. sites whose real content is inaccessible without a different IP reputation, valid session cookies, or side-channel source data

## Recommended next execution order

1. Treat `www.salvationarmy.org.hk` and other hard-blocked hosts as side-channel recovery, not primary crawl targets.
2. If continuing crawler work only, focus on hosts where browser automation still returns real content rather than challenge pages.
3. If the goal is to push below the current floor, the next required capability is either residential/browser-authenticated access or manual side-channel data backfill.