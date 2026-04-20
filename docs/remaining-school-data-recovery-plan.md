# Remaining School Data Recovery Plan

Updated after `docs/school-website-report.proxy-wave-2.json` and the URL/side-channel follow-up on 2026-04-19.

## Current status

- Latest authoritative unresolved total: `271` (`215 unreachable` + `52 content_insufficient` + `4 robots_blocked`).
- Cumulative improvement versus `post-fixes`: `323 -> 271` (`-52`).
- `Anfield (535818)` has now been moved off the retired `/lv/` path at the canonical data layer.
- `Lok Sin Tong` should stay out of the active recovery backlog: the current targeted rerun `docs/school-website-report.loksintong-refresh-2026-04-20.json` cleared all 6 rows as `unchanged` with `0 unreachable`.

## Step 1: URL correction / canonical cleanup

Completed:

1. `anfield.edu.hk` / school_code `535818`
   Result:
   - corrected the canonical school website from `https://anfield.edu.hk/lv/` to `https://anfield.edu.hk/`
   - updated the canonical merged data, logo metadata, private profile enrichment, vacancy enrichment, and Supabase seed layers
   - added a safe admissions/open-day fallback in the profile enrichment layer instead of leaving the record on a known-dead path

2. protocol drift cleanup for `newklnwa.edu.hk` and `nursery.bgca.org.hk`
   Result:
   - upgraded `4 + 4` non-profit school canonical URLs from dead HTTP origins to live HTTPS origins
   - updated the canonical merged data and Supabase seed layer
   - intentionally left raw upstream EDB / KGP source files unchanged

3. `Invictus Kindergarten` / school_code `615366`
   Result:
   - replaced the retired legacy domain `invictusschool.hk` with the current `https://www.invictus.edu.hk/tko` campus path in canonical layers
   - updated the canonical merged data, private/international enrichment data, and Supabase seed layers
   - kept raw upstream KGP / EDB source files unchanged for traceability

4. protocol drift cleanup for `wisely.edu.hk`, `stcatherines.edu.hk`, `kllck.edu.hk`, and `wfb.edu.hk`
   Result:
   - upgraded canonical school URLs from stale HTTP origins to the HTTPS origins already observed by the website crawler normalization flow
   - updated the canonical merged data and relevant private/international seed layers
   - kept `scrape_status` crawler-derived; removed manual status overrides in favor of automated report outcomes

5. protocol drift cleanup for `cyckg.edu.hk` and `christianadrianne.edu.hk`
   Result:
   - upgraded 4 non-profit school canonical URLs from stale HTTP origins to the HTTPS origins already observed by the website crawler normalization flow
   - updated the canonical merged data and base Supabase seed layer
   - kept raw upstream EDB / KGP source files unchanged for traceability

6. protocol drift cleanup for `creative.edu.hk`
   Result:
   - upgraded 10 non-profit school canonical URLs from legacy `http://www.creative.edu.hk` variants to the crawler-confirmed `https://creative.edu.hk/` apex origin
   - updated the canonical merged data and base Supabase seed layer
   - kept raw upstream EDB / KGP source files unchanged for traceability

7. protocol drift cleanup for `good-health.edu.hk`
   Result:
   - upgraded 4 private school canonical URLs from stale `http://www.good-health.edu.hk` to the crawler-confirmed `https://www.good-health.edu.hk/`
   - updated the canonical merged data, base Supabase seed layer, and downstream private/international enrichment layers
   - kept raw upstream EDB / KGP source files unchanged for traceability

8. protocol drift cleanup for `tutortime.com.hk`
   Result:
   - upgraded 4 private school canonical URLs from stale HTTP Tutor Time origins to the crawler-confirmed HTTPS canonicals (`https://www.tutortime.com.hk/` and `https://www.tutortime.com.hk/en/home`)
   - updated the canonical merged data, base Supabase seed layer, downstream private/international enrichment layers, and logo metadata layer
   - tuned the shared-host Playwright fallback to tolerate Tutor Time's slower browser render path and reuse the shared host crawl across all 4 schools, which cleared the targeted refresh run (`docs/school-website-report.tutortime-canonical-refresh-2026-04-20.json`) with `0 unreachable`
   - kept raw upstream EDB / KGP source files unchanged for traceability

9. root canonical cleanup for `joyfulenglish.edu.hk`
   Result:
   - normalized 5 private school canonical URLs to the crawler-confirmed HTTP root `http://www.joyfulenglish.edu.hk/` instead of mixed root variants without a trailing slash
   - updated the canonical merged data, base Supabase seed layer, and downstream private/international enrichment layers
   - kept raw upstream EDB / KGP source files unchanged for traceability

10. protocol drift cleanup for `maynga.edu.hk`
   Result:
   - upgraded 3 non-profit school canonical URLs from stale `http://www.maynga.edu.hk` to the crawler-confirmed `https://www.maynga.edu.hk/`
   - updated the canonical merged data and base Supabase seed layer
   - kept raw upstream EDB / KGP source files unchanged for traceability

11. path-preserving protocol drift cleanup for `hkcschild.edu.hk`
   Result:
   - upgraded 3 non-profit school canonical URLs from stale `http://hkcschild.edu.hk/...` paths to the crawler-confirmed `https://hkcschild.edu.hk/...` paths
   - updated the canonical merged data and base Supabase seed layer only for rows with current `normalized_url=https://...` evidence
   - synced the 3 rows to Supabase and cleared the targeted refresh run (`docs/school-website-report.hkcschild-canonical-refresh-2026-04-20.json`) with `1 ok`, `2 unchanged`, `0 unreachable`
   - kept raw upstream EDB / KGP source files unchanged for traceability

12. protocol drift cleanup for `gciedu.hk`
   Result:
   - upgraded 2 non-profit school canonical URLs from stale `http://www.gciedu.hk` to the adapter-confirmed `https://www.gciedu.hk/`
   - updated the canonical merged data and base Supabase seed layer only for rows with acceptance/retry evidence showing `normalized_url=https://www.gciedu.hk/`
   - synced the 2 rows to Supabase and cleared the targeted refresh run (`docs/school-website-report.gciedu-canonical-refresh-2026-04-20.json`) with `2 unchanged`, `0 unreachable`
   - kept raw upstream EDB / KGP source files unchanged for traceability

13. path-preserving protocol drift cleanup for `tbcas.edu.hk`
   Result:
   - upgraded 2 non-profit school branch URLs from stale `http://www.tbcas.edu.hk/...` paths to the branch-preserving `https://www.tbcas.edu.hk/...` paths already observed in acceptance/retry artifacts
   - updated the canonical merged data and base Supabase seed layer only for rows with existing `normalized_url=https://www.tbcas.edu.hk/...` evidence
   - current targeted refresh still ends in `unreachable` because both HTTPS branch paths redirect to Cloudflare-protected branch hosts (`tbcww.edu.hk` / `tbcgn.edu.hk`) that return challenge pages to both fetch and Playwright in the current runtime
   - follow-up runtime verification (`docs/school-website-report.tbcas-runtime-refresh-2026-04-20.json`) now records host-specific anti-bot evidence as `anti_bot_challenge=www.tbcww.edu.hk` and `anti_bot_challenge=www.tbcgn.edu.hk`, so this family should stay out of the adapter backlog until access conditions change
   - kept raw upstream EDB / KGP source files unchanged for traceability

14. path-preserving protocol drift cleanup for `ymcahk.org.hk/cikg/`
   Result:
   - upgraded 1 private school canonical URL from stale `http://ymcahk.org.hk/cikg/` to the browser-confirmed `https://ymcahk.org.hk/cikg/`
   - updated the canonical merged data and base Supabase seed layer only for the row with existing `normalized_url=https://ymcahk.org.hk/cikg/` evidence
   - cleared the combined targeted refresh run (`docs/school-website-report.canonical-wave-2026-04-20.json`) as `unchanged`
   - kept raw upstream EDB source files unchanged for traceability

15. protocol drift cleanup for `abcpathways.edu.hk`
   Result:
   - upgraded 1 private school canonical URL from stale `http://www.abcpathways.edu.hk` to the adapter-confirmed `https://www.abcpathways.edu.hk/`
   - updated the canonical merged data, base Supabase seed layer, downstream private/international enrichment layers, and logo metadata layer for the row with existing `normalized_url=https://www.abcpathways.edu.hk/` evidence
   - cleared the combined targeted refresh run (`docs/school-website-report.canonical-wave-2026-04-20.json`) as `unchanged`
   - kept raw upstream EDB source files unchanged for traceability

16. `Lok Sin Tong` runtime revalidation closure
   Result:
   - reran all 6 previously recovered Lok Sin Tong schools through the current crawler and wrote `docs/school-website-report.loksintong-refresh-2026-04-20.json`
   - confirmed the whole family is still stable as `6 unchanged`, `0 unreachable` under the current runtime, so the earlier proxy-wave recovery remains valid
   - no additional canonical edit or host adapter work is needed here; remove this family from the active adapter backlog unless a future full run shows a real regression

17. protocol drift cleanup for `lingnankn.edu.hk`
   Result:
   - upgraded 2 non-profit school canonical URLs from stale `http://www.lingnankn.edu.hk` to the crawler-confirmed `https://www.lingnankn.edu.hk/`
   - updated the canonical merged data, fee enrichment layer, and base Supabase seed layer only for the rows with current `normalized_url=https://www.lingnankn.edu.hk/` evidence
   - cleared the targeted refresh run (`docs/school-website-report.lingnankn-refresh-2026-04-20.json`) with `2 unchanged`, `0 unreachable`
   - kept raw upstream EDB / KGP source files unchanged for traceability

18. path-preserving protocol drift cleanup for `salvationarmy.org.hk`
   Result:
   - upgraded 19 non-profit school canonical URLs from stale `http://www.salvationarmy.org.hk/esd/...` branch paths to the existing HTTPS branch paths already recorded in the crawler normalization flow
   - updated the canonical merged data, fee enrichment layer, and base Supabase seed layer only for the rows already carrying `normalized_url=https://www.salvationarmy.org.hk/esd/...` evidence in the latest authoritative report
   - kept the current operational classification unchanged: this family still belongs in the side-channel bucket because the shared host remains connection-refused in current runtime conditions even though the branch-path canonicals should stay on HTTPS
   - kept raw upstream EDB / KGP source files unchanged for traceability

19. protocol drift cleanup for `boxhill.edu.hk`
   Result:
   - upgraded 2 private school canonical URLs from stale `http://www.boxhill.edu.hk` to the browser-confirmed `https://www.boxhill.edu.hk` root already recorded as `normalized_url=https://www.boxhill.edu.hk/` in the latest authoritative report
   - updated the canonical merged data, fee enrichment layer, base Supabase seed layer, downstream private/international enrichment layers, and logo metadata layer for the 2 rows still carrying the stale HTTP root
   - kept the current operational classification unchanged: this family still belongs in the side-channel bucket because the shared host still yields only low-confidence `content_insufficient` output behind a JS/browser gate in the current runtime
   - kept raw upstream EDB source files unchanged for traceability

20. protocol drift cleanup for `anchors.edu.hk`
   Result:
   - upgraded 3 private school canonical URLs from stale `http://www.anchors.edu.hk` to the browser-confirmed `https://www.anchors.edu.hk` root already recorded as `normalized_url=https://www.anchors.edu.hk/` in the latest authoritative report
   - updated the canonical merged data, fee enrichment layer, base Supabase seed layer, downstream private/international enrichment layers, and logo metadata layer for the rows still carrying the stale HTTP root
   - kept the current operational classification unchanged: this family still belongs in the side-channel bucket because the shared host remains low-confidence `content_insufficient` behind a 403 anti-bot gate in the current runtime
   - kept raw upstream EDB source files unchanged for traceability

21. protocol drift cleanup for `elementiedu.org`
   Result:
   - upgraded 3 non-profit school canonical URLs from stale `http://www.elementiedu.org` to the crawler-confirmed `https://www.elementiedu.org` root already recorded as `normalized_url=https://www.elementiedu.org/` in the 2026-04-20 targeted refresh
   - updated the canonical merged data, fee enrichment layer, and base Supabase seed layer for the 3 rows still carrying the stale HTTP root
   - kept the current operational classification unchanged: this family still belongs in the side-channel bucket because the host is reachable but remains low-confidence `content_insufficient`
   - kept raw upstream EDB / KGP source files unchanged for traceability

22. protocol drift cleanup tail for `wfb.edu.hk`
   Result:
   - upgraded the remaining 3 fee-layer URLs from stale `http://www.wfb.edu.hk` variants to the already-confirmed HTTPS canonicals (`https://www.wfb.edu.hk/`, `https://www.wfb.edu.hk/min/`, and `https://www.wfb.edu.hk/1`)
   - updated the fee enrichment layer only, because the merged and seed layers were already aligned to HTTPS from the earlier canonical wave
   - kept the current operational classification unchanged: this family still belongs in the side-channel bucket because runtime output remains challenge/thin-content constrained

23. path-preserving protocol drift cleanup for `pips.edu.hk/hk`
   Result:
   - upgraded 1 private school canonical URL from stale `http://www.pips.edu.hk/hk` to `https://www.pips.edu.hk/hk`, preserving the Hong Kong campus path already implied by the current PIPS sibling canonicals
   - updated the canonical merged data, fee enrichment layer, base Supabase seed layer, downstream private/international enrichment layers, and logo metadata layer for the affected row
   - upgraded the related admissions and vacancy evidence URLs under `/hk/` to HTTPS in the profile/vacancy enrichment layers so the side-channel references stay protocol-consistent with the canonical school URL
   - kept raw upstream EDB source files unchanged for traceability

24. protocol drift cleanup for `york.edu.hk`
   Result:
   - upgraded the remaining York-family private school canonical URLs from stale `http://www.york.edu.hk` variants to `https://www.york.edu.hk`, matching the already-live HTTPS sibling canonicals now present in the latest report and operational data
   - updated the canonical merged data, fee enrichment layer, base Supabase seed layer, downstream private/international enrichment layers, and logo metadata layer for the remaining HTTP-root York rows
   - kept raw upstream EDB source files unchanged for traceability

25. protocol drift cleanup for `victoria.edu.hk`
   Result:
   - upgraded the remaining Victoria-family private school canonical URLs from stale `http://www.victoria.edu.hk` to `https://www.victoria.edu.hk`, matching the already-live HTTPS sibling canonicals now present in the latest report and operational data
   - updated the canonical merged data, fee enrichment layer, base Supabase seed layer, downstream private/international enrichment layers, and logo metadata layer for the remaining HTTP-root Victoria rows
   - kept raw upstream EDB source files unchanged for traceability

Important caveat:

- upstream data for `535818` mixes Kowloon Tong and Laguna Verde / Whampoa details under the same school code
- because of that conflict, the stable root site is safer than hard-binding the record to one campus subpage until the source data model is split

## Step 2: side-channel takeover for persistent blocked hosts

These hosts should no longer be treated as primary crawler-ROI targets under the current proxy state.

| Host | Schools | Current blocker | Existing side-channel coverage | Operational decision |
| --- | ---: | --- | --- | --- |
| `www.yuenyuenkg.edu.hk` | 5 | Cloudflare / challenge pages, only thin crawl output | no strong local fee / application / vacancy enrichment beyond base school rows | park for now; needs external source or new access condition |
| `www.anchors.edu.hk` | 3 | persistent content-insufficient / anti-bot | fee-side coverage now exists for all 3 rows, but profile/vacancy fields remain thin or empty and there is no stable admissions/open-day surface in current runtime output | fee-only side-channel; do not spend more generic crawler effort |
| `www.boxhill.edu.hk` | 3 | robot challenge / content-insufficient | all 3 rows now carry fee/profile/vacancy side-channel coverage, but the shared host still only yields low-confidence runtime output behind a JS gate | side-channel covered for now; no more generic crawler work unless richer school-specific content appears |
| `www.wfb.edu.hk` | 3 | challenge / thin content | fee seed exists for `565903`, `565890`, `565911`; no strong admissions seed | fee-only side-channel; no more generic crawler work for now |
| `www.dominicsaviokg.org` | 2 | fresh 2026-04-20 rerun still ends in a meta-refresh shell that points to `www.dominicsaviokg.edu.hk`, and the target host now records `anti_bot_challenge` | no strong admissions/vacancy side-channel coverage beyond base school rows | park for now; only reopen if the target host becomes reachable without challenge pages |
| `www.elementiedu.org` | 3 | fresh 2026-04-20 rerun is reachable but still `content_insufficient` across all rows | fee-side coverage exists for all 3 rows, but there is still no meaningful profile/vacancy-side admissions surface to backfill | fee-only side-channel; needs external source to go further |

## Next execution order

1. Keep prioritizing stale or dead canonical URLs where the root domain is alive.
2. Treat challenge-page host families as side-channel maintenance only unless proxy conditions materially change.
3. Only resume host-specific crawler work when a host shows new reachable content that is not already covered by the seed layers.

## Operational notes

- Do not expand retry as a main workflow. It remains diagnostic only.
- Prefer refreshing this plan from the latest full report before opening new adapter work.
- For blocked hosts, measure progress by new side-channel field coverage, not by crawler status alone.
- Do not introduce manual canonical-fix statuses. URL corrections should be justified by crawler/runtime evidence, and `scrape_status` should remain automation-derived.