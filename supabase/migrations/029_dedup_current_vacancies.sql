-- Deduplicate vacancies: for each school_id with is_current = true,
-- keep only the row with the latest edb_published_date (or latest created_at if all NULL).
WITH ranked AS (
  SELECT id,
    school_id,
    ROW_NUMBER() OVER (
      PARTITION BY school_id
      ORDER BY
        edb_published_date DESC NULLS LAST,
        created_at DESC
    ) AS rn
  FROM vacancies
  WHERE is_current = true
)
DELETE FROM vacancies
WHERE id IN (SELECT id FROM ranked WHERE rn > 1);

-- Prevent future duplicates: unique index on school_id for is_current rows
CREATE UNIQUE INDEX IF NOT EXISTS uniq_vacancy_current_per_school
  ON vacancies (school_id) WHERE is_current = true;
