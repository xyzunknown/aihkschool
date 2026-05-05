-- Schooland text/intro fields for school detail enrichment
ALTER TABLE schools
  ADD COLUMN IF NOT EXISTS schooland_intro text,
  ADD COLUMN IF NOT EXISTS schooland_teaching_summary text,
  ADD COLUMN IF NOT EXISTS schooland_facilities_summary text,
  ADD COLUMN IF NOT EXISTS schooland_founded_year smallint,
  ADD COLUMN IF NOT EXISTS schooland_staff_count smallint,
  ADD COLUMN IF NOT EXISTS schooland_teacher_student_ratio text;
