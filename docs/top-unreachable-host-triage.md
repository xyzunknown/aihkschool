# Top 20 Unreachable Host Triage

Baseline: `docs/school-website-report.latest.json`

Active backlog note: this triage is manually reconciled against later targeted validation artifacts. Hosts already cleared in newer acceptance / refresh runs are removed from the active adapter queue even if they still appear in older full-run baselines.

Sorting rule: `unreachable school count DESC`, then `host ASC` for ties.

## 可做 adapter

Currently no shared-host adapter candidates here justify immediate runtime work.

## 已从 active backlog 移除

| Host | Why it should stay closed |
| --- | --- |
| `creative.edu.hk` | Adapter already implemented and accepted in the 2026-04-19 recovery wave. |
| `www.joyfulenglish.edu.hk` | Targeted acceptance already cleared the shared host; do not reopen it as unresolved adapter work. |
| `www.good-health.edu.hk` | Campus-subdomain adapter is already implemented and the canonical cleanup wave is complete. |
| `www.gciedu.hk` | Fixed-navigation adapter is already implemented and the 2026-04-20 canonical refresh cleared both rows as `unchanged`. |
| `www.lingnankn.edu.hk` | Targeted rerun `docs/school-website-report.lingnankn-refresh-2026-04-20.json` now shows both rows as `unchanged`, so the shared host is no longer an active runtime problem. |
| `www.loksintongkg.edu.hk` | Current targeted rerun `docs/school-website-report.loksintong-refresh-2026-04-20.json` shows `6 unchanged`, `0 unreachable`, so this family is no longer an active runtime problem. |

## 应转旁路数据源

| Host | Count | Why side-channel/backfill is the right default |
| --- | ---: | --- |
| `www.salvationarmy.org.hk` | 27 | Root and sampled branch paths are currently connection-refused. A branch adapter is implemented for future recovery, but current production strategy should be side-channel. |
| `www.dominicsaviokg.org` | 2 | Fresh rerun `docs/school-website-report.dominicsaviokg-refresh-2026-04-20.json` still shows the HTTP shell only meta-refreshing to `www.dominicsaviokg.edu.hk`, and the target host remains blocked as `anti_bot_challenge`, so this is not an active adapter candidate under current access conditions. |
| `www.elementiedu.org` | 3 | Fresh rerun `docs/school-website-report.elementiedu-refresh-2026-04-20.json` downgraded all 3 rows from `unreachable` to `content_insufficient`; the host is reachable but remains too thin to fill the missing admissions/vacancy fields. |
| `www.tbcas.edu.hk` | 2 | Branch paths now redirect to school-specific domains (`tbcww.edu.hk` / `tbcgn.edu.hk`) that sit behind Cloudflare challenge pages, so the old shared-host adapter assumption no longer holds. |
| `www.karlam.edu.hk` | 2 | Cloudflare challenge returns 403. Existing browser fallback still does not yield stable crawlable content. |
| `www.lphccs.edu.hk` | 2 | Both HTTP and HTTPS fail at transport level. |
| `www.melody.edu.hk` | 2 | Cloudflare challenge returns 403. |
| `www.mink.edu.hk` | 2 | Cloudflare challenge returns 403. |
| `www.sharonlutheran.edu.hk` | 2 | Cloudflare challenge returns 403. |
| `anfield.edu.hk` | 1 | Both HTTP and HTTPS fail at transport level. |
| `chanenmei-nursery.hklss.hk` | 1 | Cloudflare `Just a moment...` challenge blocks crawl traffic. |
| `cheungching-nursery.hklss.hk` | 1 | Cloudflare `Just a moment...` challenge blocks crawl traffic. |
| `clswh.hkfyg.org.hk` | 1 | Host returns explicit region/network access denial. |
| `clymt.hkfyg.org.hk` | 1 | Host returns explicit region/network access denial. |

## Immediate sequence

1. Treat `www.salvationarmy.org.hk` as side-channel in operations until the host is back, even though a branch adapter already exists in code.
2. Keep `www.elementiedu.org` in the side-channel bucket unless a richer admissions surface appears; the current host is reachable but still content-thin.
3. There are no remaining shared-host adapter candidates here with immediate runtime ROI; only reopen `www.dominicsaviokg.org` if the target host stops serving challenge pages.