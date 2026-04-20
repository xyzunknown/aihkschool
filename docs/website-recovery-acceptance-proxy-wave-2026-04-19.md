# Website Recovery Acceptance - Proxy Wave - 2026-04-19

## Scope

This acceptance run validates the new proxy-assisted recovery wave after the latest host-adapter fixes for:

- ABC Pathways
- Salvation Army
- Lok Sin Tong

Authoritative full-run artifact:

- `docs/school-website-report.proxy-wave.json`

Comparison baseline:

- `docs/school-website-report.post-fixes.json`

## Full-run Metrics

Previous baseline (`post-fixes`):

- total: 868
- ok: 9
- unchanged: 536
- content_insufficient: 56
- robots_blocked: 4
- unreachable: 263
- error: 0

Current proxy wave (`proxy-wave`):

- total: 868
- ok: 160
- unchanged: 430
- content_insufficient: 56
- robots_blocked: 4
- unreachable: 217
- error: 1

Net change:

- ok: +151
- unchanged: -106
- unreachable: -46
- content_insufficient: 0
- robots_blocked: 0
- error: +1

Unresolved total (`unreachable + content_insufficient + robots_blocked + error`):

- 323 -> 278 (`-45`)

## Validated Wins

ABC Pathways:

- `2 / 2` now stable in the full report as `unchanged`
- dedicated host adapter bypasses the broken `/language/en/` entry and uses fixed admission/navigation pages

Salvation Army:

- `28` matched records in the full report
- `16 ok`, `12 unchanged`, `0 unreachable`
- branch-path adapter is now operational under the new proxy

Lok Sin Tong:

- targeted validation artifact: `docs/acceptance-loksintong-proxy.json`
- `6 / 6 ok` in the dedicated acceptance run
- in the full run, the recovered schools now appear as stable `unchanged`

## Remaining Top Hosts

Largest remaining unresolved hosts in `proxy-wave`:

1. `www.yuenyuenkg.edu.hk` - 5 content_insufficient
2. `www.anchors.edu.hk` - 3 content_insufficient
3. `www.boxhill.edu.hk` - 3 content_insufficient
4. `www.elementiedu.org` - 3 unreachable
5. `www.wfb.edu.hk` - 3 content_insufficient
6. `mulberryhousekg.com` - 2 content_insufficient
7. `www.christianadrianne.edu.hk` - 2 content_insufficient
8. `www.cyckg.edu.hk` - 2 content_insufficient
9. `www.deborah-intl.edu.hk` - 2 content_insufficient
10. `www.dominicsaviokg.org` - 2 unreachable

## Blocker Notes

The remaining floor is still dominated by a small set of known patterns:

- Cloudflare / bot challenge pages returning thin HTML as `content_insufficient`
- parked or low-signal domains, such as `www.deborah-intl.edu.hk`
- hosts exposing only minimal text, such as `www.elementiedu.org`
- intermittent transport failures, including one `error` record:
  - `LOU PICHOUN FRENCH KINDERGARTEN` (`https://loupichoun.com/`) -> `TypeError: fetch failed`

## Conclusion

This proxy wave produced a real full-run gain, not just targeted sample wins.

- unreachable schools dropped by `46`
- unresolved total dropped by `45`
- ABC Pathways, Salvation Army, and Lok Sin Tong are now incorporated into the authoritative full-run result

The next highest-yield work should focus on hosts that are no longer hard-blocked but still return thin challenge-like pages. Hosts that remain parked, Cloudflare-blocked, or near-empty should move to side-channel recovery instead of more generic crawler work.