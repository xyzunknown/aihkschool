# Official School Master Chain

Updated: 2026-04-24

## Main Table Fields

| Group | Fields | Owner |
| --- | --- | --- |
| Basic identity | `school_code`, `name_tc`, `name_en`, `district`, `address_tc`, `address_en`, `phone`, `fax`, `website` | KGP / EDB |
| Official attributes | `school_type`, `kep_participant`, `has_nursery`, `session_type`, `grades_offered` | KGP / EDB |
| Official dynamics | K1/K2/K3/N vacancy, `edb_published_date`, `official_notice_url`, `official_notice_updated_at` | EDB |
| Official supplements | fees, fee certificate, quality review / inspection report, KGP profile page | EDB / KGP |
| School website supplements | admissions, open day, application details, school-provided notes | School website |

School websites must not overwrite school identity fields unless a manual confirmation note is recorded.

## CHSC Decision

CHSC does not enter the separate master-data chain for now.

Reason: the current kindergarten profile is the EDB / CHSC KGP surface already represented by `data/KGP_2025_tc.csv`. A separate CHSC website feed was not found in the repository, and the public CHSC/KGP site does not add a stable independent identifier or stable new field beyond the KGP/EDB profile data already used. If this changes, CHSC may be added only as an official supplement source, never as a replacement for KGP / EDB identity fields.

## Source Priority

1. Official directory
2. EDB
3. School website
4. Schooland
5. Media
6. Forum

The executable rule lives in `src/lib/schools/officialDataPolicy.ts`.

## Link Rules

Official notices: only EDB, GovHK or school website announcement URLs are accepted.

Inspection / quality review reports: only official report pages or official PDFs are accepted.

Each school keeps one current URL plus one update date for notices and inspection / quality review reports.
