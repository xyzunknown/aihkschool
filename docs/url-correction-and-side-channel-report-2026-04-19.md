# URL Correction And Side-Channel Report - 2026-04-19

## Scope

This report closes the two next actions queued after `docs/website-recovery-acceptance-proxy-wave-2-2026-04-19.md`:

1. fix wrong or stale school URLs where the stored path is dead but the root site is alive
2. move persistent challenge-page hosts to explicit side-channel handling instead of treating them as crawler-first targets

## Step 1: canonical URL correction

Completed for `Anfield` (`school_code = 535818`).

Changes made:

- replaced the retired campus subpath with the stable `https://anfield.edu.hk/` site root in canonical layers
- updated the canonical merged dataset and downstream metadata / enrichment layers
- updated Supabase seed files so future reseeds do not restore the dead `/lv/` path
- added a minimal safe admissions/open-day fallback in the private profile enrichment layer

Why root URL instead of a campus subpage:

- the repository currently contains conflicting upstream records for the same school code `535818`
- one source chain points to Kowloon Tong, another points to Laguna Verde / Whampoa
- binding the canonical row to one campus page would silently pick one branch of a mixed source record
- the root site is stable and keeps the record reachable until the upstream model is split by campus

## Step 2: side-channel takeover matrix

The following blocked hosts were reviewed against local side-channel sources already present in the repo.

| Host | School codes | Status | Side-channel outcome |
| --- | --- | --- | --- |
| `www.yuenyuenkg.edu.hk` | `325716`, `528366`, `157066`, `545333`, `158062` | blocked / content-insufficient | no meaningful local fee / application / vacancy enrichment beyond base school rows |
| `www.anchors.edu.hk` | `536067`, `565199`, `582417` | content-insufficient | partial only: fee seed exists for `536067`; fee/vacancy seed exists for `565199`; `582417` remains thin |
| `www.boxhill.edu.hk` | `559415`, `581739`, `581836` | robot challenge / content-insufficient | mixed: `559415` already has fee + application + open-day + vacancy side-channel coverage; the two branch rows do not |
| `www.wfb.edu.hk` | `565903`, `565890`, `565911` | content-insufficient | fee-side coverage exists, but admissions-side coverage is still missing |
| `www.elementiedu.org` | `325589`, `516910`, `536415` | unreachable / thin | only partial fee-side coverage is available locally; no strong admissions-side enrichment |

Notes:

- `Anchors`, `WFB`, and `Elementi` are not truly "solved by side-channel" yet; they are only partially coverable with the data already in repo.
- `Box Hill` is the clearest example of a host where one school row is already effectively covered by side-channel while sibling branch rows are not.
- `Yuen Yuen` currently has the weakest local side-channel coverage and should stay parked until a new data source or better access path is available.

## Operational conclusion

The immediate ROI is no longer another round of generic adapter work on these blocked families.

Remaining references to the old Anfield `/lv/` path are intentionally preserved only in raw upstream source files, not in canonical operational layers.

The correct order from here is:

1. keep fixing source-data URL drift like `Anfield`
2. treat blocked host families as side-channel maintenance only
3. only reopen crawler work for a blocked family if proxy conditions change or a newly live page appears