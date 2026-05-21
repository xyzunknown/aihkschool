# Cross-platform school data sync

## Rule

All school data shown in the iOS app must match the web app source data.

When changing school names, school codes, districts, fees, vacancy status, programme availability, application notes, or any other school data field, update both sides in the same change:

- Web: Supabase seeds, database update scripts, and public data files under `newhkschoolplace`.
- iOS: `HKSchoolPlaceiOS/HKSchoolPlace/Models.swift` or the iOS data loader that replaces it.

Do not use invented placeholder school names in production screens. If a mock or stress-test screen needs sample content, use a real school from the web data and keep its school code, Chinese name, English name, district, fees, and vacancy status consistent.

## Current source of truth

The web app remains the source of truth for school data. For kindergarten records, the main local sources are:

- `newhkschoolplace/supabase/seed/001_schools.sql`
- `newhkschoolplace/supabase/seed/002_private_international_schools.sql`
- `newhkschoolplace/supabase/seed/005_edb_fee_enrichment.sql`
- `newhkschoolplace/supabase/seed/006_private_international_vacancy_enrichment.sql`
- `newhkschoolplace/supabase/seed/013_fee_monthly_infer.sql`
- `newhkschoolplace/data/KGP_2025_tc.csv`
- `newhkschoolplace/data/K1-K3_vacancy_tc_202627.csv`

For public verification, use official EDB school search / kindergarten profile pages when possible.

## Required check before handoff

After changing iOS school sample data, run:

```bash
cd newhkschoolplace
npm run test:ios-school-data
```

If the script fails, fix the iOS data or the expected web-source values before reporting the change as complete.

## Specific correction logged

`WITTY KINDERGARTEN` is a real school, school code `590673`, but the official Chinese name is `盈思幼稚園`. `茵茵幼稚園` must not be used for this school.
