-- Private / international school vacancy enrichment from official school websites
UPDATE vacancies
SET
  n_vacancy = 'check_school',
  k1_vacancy = 'waiting_list',
  k2_vacancy = 'waiting_list',
  k3_vacancy = 'check_school',
  edb_source_url = 'https://www.victoria.edu.hk/application-procedure/?tab=PN_K1'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '542164' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'check_school', 'waiting_list', 'waiting_list', 'check_school', 'https://www.victoria.edu.hk/application-procedure/?tab=PN_K1', true
FROM schools
WHERE school_code = '542164' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'check_school',
  k1_vacancy = 'check_school',
  k2_vacancy = 'check_school',
  k3_vacancy = 'check_school',
  edb_source_url = 'https://www.highgatehouse.edu.hk/admission-online-enrolment/'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '545589' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'check_school', 'check_school', 'check_school', 'check_school', 'https://www.highgatehouse.edu.hk/admission-online-enrolment/', true
FROM schools
WHERE school_code = '545589' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'not_offered',
  k1_vacancy = 'no_information',
  k2_vacancy = 'no_information',
  k3_vacancy = 'no_information',
  edb_source_url = 'http://www.wisely.edu.hk/'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '566284' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'not_offered', 'no_information', 'no_information', 'no_information', 'http://www.wisely.edu.hk/', true
FROM schools
WHERE school_code = '566284' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'check_school',
  k1_vacancy = 'check_school',
  k2_vacancy = 'check_school',
  k3_vacancy = 'check_school',
  edb_source_url = 'http://www.dms.edu.hk/content.php?wid=37'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '588032' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'check_school', 'check_school', 'check_school', 'check_school', 'http://www.dms.edu.hk/content.php?wid=37', true
FROM schools
WHERE school_code = '588032' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'no_information',
  k1_vacancy = 'no_information',
  k2_vacancy = 'no_information',
  k3_vacancy = 'no_information',
  edb_source_url = 'http://www.witty.edu.hk/'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '590673' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'no_information', 'no_information', 'no_information', 'no_information', 'http://www.witty.edu.hk/', true
FROM schools
WHERE school_code = '590673' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'check_school',
  k1_vacancy = 'check_school',
  k2_vacancy = 'check_school',
  k3_vacancy = 'check_school',
  edb_source_url = 'https://www.tutortime.com.hk/admission/nursery-kindergarten-enrollment-2026-2027-new-students/'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '593133' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'check_school', 'check_school', 'check_school', 'check_school', 'https://www.tutortime.com.hk/admission/nursery-kindergarten-enrollment-2026-2027-new-students/', true
FROM schools
WHERE school_code = '593133' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'check_school',
  k1_vacancy = 'check_school',
  k2_vacancy = 'check_school',
  k3_vacancy = 'check_school',
  edb_source_url = 'https://guidepost.hk/apply-now'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '594725' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'check_school', 'check_school', 'check_school', 'check_school', 'https://guidepost.hk/apply-now', true
FROM schools
WHERE school_code = '594725' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'not_offered',
  k1_vacancy = 'no_information',
  k2_vacancy = 'no_information',
  k3_vacancy = 'no_information',
  edb_source_url = 'http://www.york.edu.hk/'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '601420' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'not_offered', 'no_information', 'no_information', 'no_information', 'http://www.york.edu.hk/', true
FROM schools
WHERE school_code = '601420' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'check_school',
  k1_vacancy = 'check_school',
  k2_vacancy = 'check_school',
  k3_vacancy = 'check_school',
  edb_source_url = 'https://www.mightyoaks.edu.hk/admission'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '603643' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'check_school', 'check_school', 'check_school', 'check_school', 'https://www.mightyoaks.edu.hk/admission', true
FROM schools
WHERE school_code = '603643' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'no_information',
  k1_vacancy = 'no_information',
  k2_vacancy = 'no_information',
  k3_vacancy = 'no_information',
  edb_source_url = 'http://www.mansangkg.edu.hk/'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '603724' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'no_information', 'no_information', 'no_information', 'no_information', 'http://www.mansangkg.edu.hk/', true
FROM schools
WHERE school_code = '603724' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'no_information',
  k1_vacancy = 'no_information',
  k2_vacancy = 'no_information',
  k3_vacancy = 'no_information',
  edb_source_url = 'http://www.fairchild.edu.hk/'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '605026' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'no_information', 'no_information', 'no_information', 'no_information', 'http://www.fairchild.edu.hk/', true
FROM schools
WHERE school_code = '605026' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'check_school',
  k1_vacancy = 'check_school',
  k2_vacancy = 'check_school',
  k3_vacancy = 'check_school',
  edb_source_url = 'http://www.wilderness.asia/new-page-1'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '607215' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'check_school', 'check_school', 'check_school', 'check_school', 'http://www.wilderness.asia/new-page-1', true
FROM schools
WHERE school_code = '607215' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'no_information',
  k1_vacancy = 'has_vacancy',
  k2_vacancy = 'has_vacancy',
  k3_vacancy = 'has_vacancy',
  edb_source_url = 'https://iws.edu.hk/admissions/'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '608319' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'no_information', 'has_vacancy', 'has_vacancy', 'has_vacancy', 'https://iws.edu.hk/admissions/', true
FROM schools
WHERE school_code = '608319' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'check_school',
  k1_vacancy = 'check_school',
  k2_vacancy = 'check_school',
  k3_vacancy = 'check_school',
  edb_source_url = 'https://guidepost.hk/apply-now'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '611484' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'check_school', 'check_school', 'check_school', 'check_school', 'https://guidepost.hk/apply-now', true
FROM schools
WHERE school_code = '611484' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'check_school',
  k1_vacancy = 'check_school',
  k2_vacancy = 'check_school',
  k3_vacancy = 'check_school',
  edb_source_url = 'https://www.malvernpreschool.hk/'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '613037' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'check_school', 'check_school', 'check_school', 'check_school', 'https://www.malvernpreschool.hk/', true
FROM schools
WHERE school_code = '613037' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'check_school',
  k1_vacancy = 'check_school',
  k2_vacancy = 'check_school',
  k3_vacancy = 'check_school',
  edb_source_url = 'https://hkkidsacademy.edu.hk/admissions'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '614904' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'check_school', 'check_school', 'check_school', 'check_school', 'https://hkkidsacademy.edu.hk/admissions', true
FROM schools
WHERE school_code = '614904' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'no_information',
  k1_vacancy = 'no_information',
  k2_vacancy = 'no_information',
  k3_vacancy = 'no_information',
  edb_source_url = 'https://www.hhik.edu.hk/'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '215635' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'no_information', 'no_information', 'no_information', 'no_information', 'https://www.hhik.edu.hk/', true
FROM schools
WHERE school_code = '215635' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'no_information',
  k1_vacancy = 'no_information',
  k2_vacancy = 'no_information',
  k3_vacancy = 'no_information',
  edb_source_url = 'http://www.oisca-youchien.com/'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '215694' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'no_information', 'no_information', 'no_information', 'no_information', 'http://www.oisca-youchien.com/', true
FROM schools
WHERE school_code = '215694' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'no_information',
  k1_vacancy = 'no_information',
  k2_vacancy = 'no_information',
  k3_vacancy = 'no_information',
  edb_source_url = 'https://www.magartedu.com/'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '215767' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'no_information', 'no_information', 'no_information', 'no_information', 'https://www.magartedu.com/', true
FROM schools
WHERE school_code = '215767' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'check_school',
  k1_vacancy = 'check_school',
  k2_vacancy = 'check_school',
  k3_vacancy = 'check_school',
  edb_source_url = 'http://www.mingwai.edu.hk/'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '321087' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'check_school', 'check_school', 'check_school', 'check_school', 'http://www.mingwai.edu.hk/', true
FROM schools
WHERE school_code = '321087' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'no_information',
  k1_vacancy = 'no_information',
  k2_vacancy = 'no_information',
  k3_vacancy = 'no_information',
  edb_source_url = 'http://www.mansangkg.edu.hk/'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '324965' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'no_information', 'no_information', 'no_information', 'no_information', 'http://www.mansangkg.edu.hk/', true
FROM schools
WHERE school_code = '324965' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'check_school',
  k1_vacancy = 'waiting_list',
  k2_vacancy = 'waiting_list',
  k3_vacancy = 'check_school',
  edb_source_url = 'https://www.victoria.edu.hk/application-procedure/?tab=PN_K1'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '325481' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'check_school', 'waiting_list', 'waiting_list', 'check_school', 'https://www.victoria.edu.hk/application-procedure/?tab=PN_K1', true
FROM schools
WHERE school_code = '325481' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'check_school',
  k1_vacancy = 'waiting_list',
  k2_vacancy = 'waiting_list',
  k3_vacancy = 'check_school',
  edb_source_url = 'https://www.victoria.edu.hk/application-procedure/?tab=PN_K1'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '566934' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'check_school', 'waiting_list', 'waiting_list', 'check_school', 'https://www.victoria.edu.hk/application-procedure/?tab=PN_K1', true
FROM schools
WHERE school_code = '566934' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'check_school',
  k1_vacancy = 'waiting_list',
  k2_vacancy = 'waiting_list',
  k3_vacancy = 'check_school',
  edb_source_url = 'https://www.victoria.edu.hk/application-procedure/?tab=PN_K1'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '566942' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'check_school', 'waiting_list', 'waiting_list', 'check_school', 'https://www.victoria.edu.hk/application-procedure/?tab=PN_K1', true
FROM schools
WHERE school_code = '566942' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'check_school',
  k1_vacancy = 'check_school',
  k2_vacancy = 'check_school',
  k3_vacancy = 'check_school',
  edb_source_url = 'http://www.mingwai.edu.hk/'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '566977' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'check_school', 'check_school', 'check_school', 'check_school', 'http://www.mingwai.edu.hk/', true
FROM schools
WHERE school_code = '566977' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'check_school',
  k1_vacancy = 'check_school',
  k2_vacancy = 'check_school',
  k3_vacancy = 'check_school',
  edb_source_url = 'http://www.mingwai.edu.hk/'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '567329' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'check_school', 'check_school', 'check_school', 'check_school', 'http://www.mingwai.edu.hk/', true
FROM schools
WHERE school_code = '567329' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'check_school',
  k1_vacancy = 'waiting_list',
  k2_vacancy = 'waiting_list',
  k3_vacancy = 'check_school',
  edb_source_url = 'https://www.victoria.edu.hk/application-procedure/?tab=PN_K1'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '569828' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'check_school', 'waiting_list', 'waiting_list', 'check_school', 'https://www.victoria.edu.hk/application-procedure/?tab=PN_K1', true
FROM schools
WHERE school_code = '569828' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'check_school',
  k1_vacancy = 'check_school',
  k2_vacancy = 'check_school',
  k3_vacancy = 'check_school',
  edb_source_url = 'https://www.tutortime.com.hk/admission/nursery-kindergarten-enrollment-2026-2027-new-students/'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '575852' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'check_school', 'check_school', 'check_school', 'check_school', 'https://www.tutortime.com.hk/admission/nursery-kindergarten-enrollment-2026-2027-new-students/', true
FROM schools
WHERE school_code = '575852' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'check_school',
  k1_vacancy = 'check_school',
  k2_vacancy = 'check_school',
  k3_vacancy = 'check_school',
  edb_source_url = 'https://www.abcpathways.edu.hk/%e5%85%a5%e5%ad%b8%e7%94%b3%e8%ab%8b/'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '602329' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'check_school', 'check_school', 'check_school', 'check_school', 'https://www.abcpathways.edu.hk/%e5%85%a5%e5%ad%b8%e7%94%b3%e8%ab%8b/', true
FROM schools
WHERE school_code = '602329' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'check_school',
  k1_vacancy = 'check_school',
  k2_vacancy = 'check_school',
  k3_vacancy = 'check_school',
  edb_source_url = 'http://www.gracegarden.edu.hk/admissions'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '604585' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'check_school', 'check_school', 'check_school', 'check_school', 'http://www.gracegarden.edu.hk/admissions', true
FROM schools
WHERE school_code = '604585' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'not_offered',
  k1_vacancy = 'has_vacancy',
  k2_vacancy = 'has_vacancy',
  k3_vacancy = 'has_vacancy',
  edb_source_url = 'https://icms.edu.hk/admissions-2/'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '607223' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'not_offered', 'has_vacancy', 'has_vacancy', 'has_vacancy', 'https://icms.edu.hk/admissions-2/', true
FROM schools
WHERE school_code = '607223' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'check_school',
  k1_vacancy = 'check_school',
  k2_vacancy = 'check_school',
  k3_vacancy = 'check_school',
  edb_source_url = 'https://guidepost.hk/apply-now'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '609285' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'check_school', 'check_school', 'check_school', 'check_school', 'https://guidepost.hk/apply-now', true
FROM schools
WHERE school_code = '609285' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'no_information',
  k1_vacancy = 'no_information',
  k2_vacancy = 'no_information',
  k3_vacancy = 'no_information',
  edb_source_url = 'http://www.learninghabitat.org/'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '613681' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'no_information', 'no_information', 'no_information', 'no_information', 'http://www.learninghabitat.org/', true
FROM schools
WHERE school_code = '613681' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'waiting_list',
  k1_vacancy = 'waiting_list',
  k2_vacancy = 'waiting_list',
  k3_vacancy = 'waiting_list',
  edb_source_url = 'http://www.nobelpreschool.org/admission-application/'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '622699' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'waiting_list', 'waiting_list', 'waiting_list', 'waiting_list', 'http://www.nobelpreschool.org/admission-application/', true
FROM schools
WHERE school_code = '622699' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'check_school',
  k1_vacancy = 'check_school',
  k2_vacancy = 'check_school',
  k3_vacancy = 'check_school',
  edb_source_url = 'http://www.discoverymind.edu.hk/'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '519871' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'check_school', 'check_school', 'check_school', 'check_school', 'http://www.discoverymind.edu.hk/', true
FROM schools
WHERE school_code = '519871' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'check_school',
  k1_vacancy = 'check_school',
  k2_vacancy = 'check_school',
  k3_vacancy = 'check_school',
  edb_source_url = 'http://www.discoverymind.edu.hk/'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '578193' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'check_school', 'check_school', 'check_school', 'check_school', 'http://www.discoverymind.edu.hk/', true
FROM schools
WHERE school_code = '578193' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'check_school',
  k1_vacancy = 'check_school',
  k2_vacancy = 'check_school',
  k3_vacancy = 'check_school',
  edb_source_url = 'http://www.dms.edu.hk/content.php?wid=37'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '584606' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'check_school', 'check_school', 'check_school', 'check_school', 'http://www.dms.edu.hk/content.php?wid=37', true
FROM schools
WHERE school_code = '584606' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'waiting_list',
  k1_vacancy = 'waiting_list',
  k2_vacancy = 'waiting_list',
  k3_vacancy = 'waiting_list',
  edb_source_url = 'https://www.littlelantaumontessori.com/admissions'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '587877' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'waiting_list', 'waiting_list', 'waiting_list', 'waiting_list', 'https://www.littlelantaumontessori.com/admissions', true
FROM schools
WHERE school_code = '587877' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'check_school',
  k1_vacancy = 'check_school',
  k2_vacancy = 'check_school',
  k3_vacancy = 'check_school',
  edb_source_url = 'https://www.godaddy.com/websites/website-builder?isc=pwugc&utm_source=wsb&utm_medium=applications&utm_campaign=en-ie_corp_applications_base'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '590029' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'check_school', 'check_school', 'check_school', 'check_school', 'https://www.godaddy.com/websites/website-builder?isc=pwugc&utm_source=wsb&utm_medium=applications&utm_campaign=en-ie_corp_applications_base', true
FROM schools
WHERE school_code = '590029' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'check_school',
  k1_vacancy = 'check_school',
  k2_vacancy = 'check_school',
  k3_vacancy = 'check_school',
  edb_source_url = 'http://www.dms.edu.hk/content.php?wid=37'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '600814' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'check_school', 'check_school', 'check_school', 'check_school', 'http://www.dms.edu.hk/content.php?wid=37', true
FROM schools
WHERE school_code = '600814' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'check_school',
  k1_vacancy = 'check_school',
  k2_vacancy = 'check_school',
  k3_vacancy = 'check_school',
  edb_source_url = 'https://guidepost.hk/apply-now'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '609625' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'check_school', 'check_school', 'check_school', 'check_school', 'https://guidepost.hk/apply-now', true
FROM schools
WHERE school_code = '609625' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'waiting_list',
  k1_vacancy = 'waiting_list',
  k2_vacancy = 'waiting_list',
  k3_vacancy = 'waiting_list',
  edb_source_url = 'https://st-johannes.edu.hk/applying-to-sjc/#admissions'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '212466' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'waiting_list', 'waiting_list', 'waiting_list', 'waiting_list', 'https://st-johannes.edu.hk/applying-to-sjc/#admissions', true
FROM schools
WHERE school_code = '212466' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'no_information',
  k1_vacancy = 'no_information',
  k2_vacancy = 'no_information',
  k3_vacancy = 'no_information',
  edb_source_url = 'http://www.stnicholas.edu.hk/'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '214868' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'no_information', 'no_information', 'no_information', 'no_information', 'http://www.stnicholas.edu.hk/', true
FROM schools
WHERE school_code = '214868' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'no_information',
  k1_vacancy = 'no_information',
  k2_vacancy = 'no_information',
  k3_vacancy = 'no_information',
  edb_source_url = 'http://www.stcatherines.edu.hk/'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '215120' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'no_information', 'no_information', 'no_information', 'no_information', 'http://www.stcatherines.edu.hk/', true
FROM schools
WHERE school_code = '215120' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'not_offered',
  k1_vacancy = 'no_information',
  k2_vacancy = 'no_information',
  k3_vacancy = 'no_information',
  edb_source_url = 'http://www.york.edu.hk/'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '215449' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'not_offered', 'no_information', 'no_information', 'no_information', 'http://www.york.edu.hk/', true
FROM schools
WHERE school_code = '215449' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'not_offered',
  k1_vacancy = 'no_information',
  k2_vacancy = 'no_information',
  k3_vacancy = 'no_information',
  edb_source_url = 'http://www.kentville.edu.hk/'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '322300' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'not_offered', 'no_information', 'no_information', 'no_information', 'http://www.kentville.edu.hk/', true
FROM schools
WHERE school_code = '322300' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'not_offered',
  k1_vacancy = 'no_information',
  k2_vacancy = 'no_information',
  k3_vacancy = 'no_information',
  edb_source_url = 'http://www.york.edu.hk/'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '322822' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'not_offered', 'no_information', 'no_information', 'no_information', 'http://www.york.edu.hk/', true
FROM schools
WHERE school_code = '322822' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'check_school',
  k1_vacancy = 'check_school',
  k2_vacancy = 'check_school',
  k3_vacancy = 'check_school',
  edb_source_url = 'http://www.kingston.edu.hk/admissions'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '519863' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'check_school', 'check_school', 'check_school', 'check_school', 'http://www.kingston.edu.hk/admissions', true
FROM schools
WHERE school_code = '519863' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'not_offered',
  k1_vacancy = 'no_information',
  k2_vacancy = 'no_information',
  k3_vacancy = 'no_information',
  edb_source_url = 'http://www.york.edu.hk/'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '526100' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'not_offered', 'no_information', 'no_information', 'no_information', 'http://www.york.edu.hk/', true
FROM schools
WHERE school_code = '526100' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'no_information',
  k1_vacancy = 'no_information',
  k2_vacancy = 'no_information',
  k3_vacancy = 'no_information',
  edb_source_url = 'https://anfield.edu.hk/lv/'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '535818' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'no_information', 'no_information', 'no_information', 'no_information', 'https://anfield.edu.hk/lv/', true
FROM schools
WHERE school_code = '535818' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'no_information',
  k1_vacancy = 'no_information',
  k2_vacancy = 'no_information',
  k3_vacancy = 'no_information',
  edb_source_url = 'http://www.keenmind.com.hk/'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '537713' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'no_information', 'no_information', 'no_information', 'no_information', 'http://www.keenmind.com.hk/', true
FROM schools
WHERE school_code = '537713' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'check_school',
  k1_vacancy = 'check_school',
  k2_vacancy = 'check_school',
  k3_vacancy = 'check_school',
  edb_source_url = 'https://www.tutortime.com.hk/admission/nursery-kindergarten-enrollment-2026-2027-new-students/'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '542504' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'check_school', 'check_school', 'check_school', 'check_school', 'https://www.tutortime.com.hk/admission/nursery-kindergarten-enrollment-2026-2027-new-students/', true
FROM schools
WHERE school_code = '542504' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'no_information',
  k1_vacancy = 'check_school',
  k2_vacancy = 'no_information',
  k3_vacancy = 'no_information',
  edb_source_url = 'https://www.cpskg.edu.hk/admissions'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '544744' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'no_information', 'check_school', 'no_information', 'no_information', 'https://www.cpskg.edu.hk/admissions', true
FROM schools
WHERE school_code = '544744' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'check_school',
  k1_vacancy = 'waiting_list',
  k2_vacancy = 'waiting_list',
  k3_vacancy = 'check_school',
  edb_source_url = 'https://www.victoria.edu.hk/application-procedure/?tab=PN_K1'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '566900' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'check_school', 'waiting_list', 'waiting_list', 'check_school', 'https://www.victoria.edu.hk/application-procedure/?tab=PN_K1', true
FROM schools
WHERE school_code = '566900' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'no_information',
  k1_vacancy = 'no_information',
  k2_vacancy = 'no_information',
  k3_vacancy = 'no_information',
  edb_source_url = 'http://www.york.edu.hk/'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '578479' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'no_information', 'no_information', 'no_information', 'no_information', 'http://www.york.edu.hk/', true
FROM schools
WHERE school_code = '578479' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'no_information',
  k1_vacancy = 'no_information',
  k2_vacancy = 'no_information',
  k3_vacancy = 'no_information',
  edb_source_url = 'http://www.york.edu.hk/'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '581852' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'no_information', 'no_information', 'no_information', 'no_information', 'http://www.york.edu.hk/', true
FROM schools
WHERE school_code = '581852' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'check_school',
  k1_vacancy = 'check_school',
  k2_vacancy = 'check_school',
  k3_vacancy = 'check_school',
  edb_source_url = 'http://manhabit.edu.hk/2026-2027-admission-enrol-now/'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '584517' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'check_school', 'check_school', 'check_school', 'check_school', 'http://manhabit.edu.hk/2026-2027-admission-enrol-now/', true
FROM schools
WHERE school_code = '584517' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'not_offered',
  k1_vacancy = 'no_information',
  k2_vacancy = 'no_information',
  k3_vacancy = 'no_information',
  edb_source_url = 'http://www.stcatherines.edu.hk/'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '586625' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'not_offered', 'no_information', 'no_information', 'no_information', 'http://www.stcatherines.edu.hk/', true
FROM schools
WHERE school_code = '586625' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'no_information',
  k1_vacancy = 'no_information',
  k2_vacancy = 'no_information',
  k3_vacancy = 'no_information',
  edb_source_url = 'http://kohitsujiyouchien.com/'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '593630' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'no_information', 'no_information', 'no_information', 'no_information', 'http://kohitsujiyouchien.com/', true
FROM schools
WHERE school_code = '593630' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'check_school',
  k1_vacancy = 'check_school',
  k2_vacancy = 'check_school',
  k3_vacancy = 'check_school',
  edb_source_url = 'https://docs.google.com/forms/d/e/1FAIpQLSf8U_m4qwPUCdYmoyj_Y11w6EZYB-81IVeIySgkH0N9toYEsA/viewform?usp=send_form'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '597031' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'check_school', 'check_school', 'check_school', 'check_school', 'https://docs.google.com/forms/d/e/1FAIpQLSf8U_m4qwPUCdYmoyj_Y11w6EZYB-81IVeIySgkH0N9toYEsA/viewform?usp=send_form', true
FROM schools
WHERE school_code = '597031' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'check_school',
  k1_vacancy = 'check_school',
  k2_vacancy = 'check_school',
  k3_vacancy = 'check_school',
  edb_source_url = 'http://www.stbrigit.edu.hk/admission.html'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '597538' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'check_school', 'check_school', 'check_school', 'check_school', 'http://www.stbrigit.edu.hk/admission.html', true
FROM schools
WHERE school_code = '597538' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'no_information',
  k1_vacancy = 'no_information',
  k2_vacancy = 'no_information',
  k3_vacancy = 'no_information',
  edb_source_url = 'https://www.sdm-chatsworth.hk/'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '599182' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'no_information', 'no_information', 'no_information', 'no_information', 'https://www.sdm-chatsworth.hk/', true
FROM schools
WHERE school_code = '599182' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'waiting_list',
  k1_vacancy = 'waiting_list',
  k2_vacancy = 'waiting_list',
  k3_vacancy = 'waiting_list',
  edb_source_url = 'http://www.nobelpreschool.org/admission-application/'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '599263' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'waiting_list', 'waiting_list', 'waiting_list', 'waiting_list', 'http://www.nobelpreschool.org/admission-application/', true
FROM schools
WHERE school_code = '599263' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'no_information',
  k1_vacancy = 'no_information',
  k2_vacancy = 'no_information',
  k3_vacancy = 'no_information',
  edb_source_url = 'https://www.abcpathways.edu.hk/language/en/'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '603864' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'no_information', 'no_information', 'no_information', 'no_information', 'https://www.abcpathways.edu.hk/language/en/', true
FROM schools
WHERE school_code = '603864' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'no_information',
  k1_vacancy = 'no_information',
  k2_vacancy = 'no_information',
  k3_vacancy = 'no_information',
  edb_source_url = 'http://www.kindergarten.sthilary.hk/'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '604445' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'no_information', 'no_information', 'no_information', 'no_information', 'http://www.kindergarten.sthilary.hk/', true
FROM schools
WHERE school_code = '604445' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'no_information',
  k1_vacancy = 'no_information',
  k2_vacancy = 'no_information',
  k3_vacancy = 'no_information',
  edb_source_url = 'http://www.learninghabitat.org/'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '609528' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'no_information', 'no_information', 'no_information', 'no_information', 'http://www.learninghabitat.org/', true
FROM schools
WHERE school_code = '609528' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'no_information',
  k1_vacancy = 'no_information',
  k2_vacancy = 'no_information',
  k3_vacancy = 'no_information',
  edb_source_url = 'https://www.magartedu.com/'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '610623' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'no_information', 'no_information', 'no_information', 'no_information', 'https://www.magartedu.com/', true
FROM schools
WHERE school_code = '610623' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'check_school',
  k1_vacancy = 'check_school',
  k2_vacancy = 'check_school',
  k3_vacancy = 'check_school',
  edb_source_url = 'https://www.imperialgroup.asia/en/news/view?id=18'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '617741' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'check_school', 'check_school', 'check_school', 'check_school', 'https://www.imperialgroup.asia/en/news/view?id=18', true
FROM schools
WHERE school_code = '617741' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'check_school',
  k1_vacancy = 'waiting_list',
  k2_vacancy = 'waiting_list',
  k3_vacancy = 'check_school',
  edb_source_url = 'https://www.victoria.edu.hk/application-procedure/?tab=PN_K1'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '618039' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'check_school', 'waiting_list', 'waiting_list', 'check_school', 'https://www.victoria.edu.hk/application-procedure/?tab=PN_K1', true
FROM schools
WHERE school_code = '618039' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'no_information',
  k1_vacancy = 'no_information',
  k2_vacancy = 'no_information',
  k3_vacancy = 'no_information',
  edb_source_url = 'http://www.good-health.edu.hk/'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '231614' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'no_information', 'no_information', 'no_information', 'no_information', 'http://www.good-health.edu.hk/', true
FROM schools
WHERE school_code = '231614' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'no_information',
  k1_vacancy = 'no_information',
  k2_vacancy = 'no_information',
  k3_vacancy = 'no_information',
  edb_source_url = 'http://www.learninghabitat.org/'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '534200' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'no_information', 'no_information', 'no_information', 'no_information', 'http://www.learninghabitat.org/', true
FROM schools
WHERE school_code = '534200' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'no_information',
  k1_vacancy = 'no_information',
  k2_vacancy = 'no_information',
  k3_vacancy = 'no_information',
  edb_source_url = 'http://www.good-health.edu.hk/'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '609919' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'no_information', 'no_information', 'no_information', 'no_information', 'http://www.good-health.edu.hk/', true
FROM schools
WHERE school_code = '609919' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'check_school',
  k1_vacancy = 'check_school',
  k2_vacancy = 'check_school',
  k3_vacancy = 'check_school',
  edb_source_url = 'https://oasiskindergarten.com/admission/'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '622982' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'check_school', 'check_school', 'check_school', 'check_school', 'https://oasiskindergarten.com/admission/', true
FROM schools
WHERE school_code = '622982' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'check_school',
  k1_vacancy = 'check_school',
  k2_vacancy = 'check_school',
  k3_vacancy = 'check_school',
  edb_source_url = 'https://www.think.edu.hk/admission'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '216267' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'check_school', 'check_school', 'check_school', 'check_school', 'https://www.think.edu.hk/admission', true
FROM schools
WHERE school_code = '216267' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'check_school',
  k1_vacancy = 'check_school',
  k2_vacancy = 'check_school',
  k3_vacancy = 'check_school',
  edb_source_url = 'https://www.maplebear.hk/admissions'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '593788' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'check_school', 'check_school', 'check_school', 'check_school', 'https://www.maplebear.hk/admissions', true
FROM schools
WHERE school_code = '593788' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'check_school',
  k1_vacancy = 'check_school',
  k2_vacancy = 'check_school',
  k3_vacancy = 'check_school',
  edb_source_url = 'https://www.telfordeducation.com/contact-us/admissions'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '601985' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'check_school', 'check_school', 'check_school', 'check_school', 'https://www.telfordeducation.com/contact-us/admissions', true
FROM schools
WHERE school_code = '601985' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'not_offered',
  k1_vacancy = 'check_school',
  k2_vacancy = 'check_school',
  k3_vacancy = 'check_school',
  edb_source_url = 'https://www.harrowhongkong.hk/hll/admissions/application/'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '627275' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'not_offered', 'check_school', 'check_school', 'check_school', 'https://www.harrowhongkong.hk/hll/admissions/application/', true
FROM schools
WHERE school_code = '627275' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'no_information',
  k1_vacancy = 'no_information',
  k2_vacancy = 'no_information',
  k3_vacancy = 'no_information',
  edb_source_url = 'https://www.magartedu.com/'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '566241' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'no_information', 'no_information', 'no_information', 'no_information', 'https://www.magartedu.com/', true
FROM schools
WHERE school_code = '566241' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'no_information',
  k1_vacancy = 'no_information',
  k2_vacancy = 'no_information',
  k3_vacancy = 'no_information',
  edb_source_url = 'http://www.anchors.edu.hk/'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '582417' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'no_information', 'no_information', 'no_information', 'no_information', 'http://www.anchors.edu.hk/', true
FROM schools
WHERE school_code = '582417' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'check_school',
  k1_vacancy = 'no_information',
  k2_vacancy = 'no_information',
  k3_vacancy = 'no_information',
  edb_source_url = 'http://www.mynors.edu.hk/'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '601250' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'check_school', 'no_information', 'no_information', 'no_information', 'http://www.mynors.edu.hk/', true
FROM schools
WHERE school_code = '601250' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'check_school',
  k1_vacancy = 'check_school',
  k2_vacancy = 'check_school',
  k3_vacancy = 'check_school',
  edb_source_url = 'http://greenfield.edu.hk/admission.php?id='
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '523984' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'check_school', 'check_school', 'check_school', 'check_school', 'http://greenfield.edu.hk/admission.php?id=', true
FROM schools
WHERE school_code = '523984' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'check_school',
  k1_vacancy = 'check_school',
  k2_vacancy = 'check_school',
  k3_vacancy = 'check_school',
  edb_source_url = 'http://www.edb.gov.hk/k1-admission_e'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '530131' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'check_school', 'check_school', 'check_school', 'check_school', 'http://www.edb.gov.hk/k1-admission_e', true
FROM schools
WHERE school_code = '530131' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'no_information',
  k1_vacancy = 'no_information',
  k2_vacancy = 'no_information',
  k3_vacancy = 'no_information',
  edb_source_url = 'http://busybees.webhost.ust.hk/'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '532355' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'no_information', 'no_information', 'no_information', 'no_information', 'http://busybees.webhost.ust.hk/', true
FROM schools
WHERE school_code = '532355' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'check_school',
  k1_vacancy = 'check_school',
  k2_vacancy = 'check_school',
  k3_vacancy = 'check_school',
  edb_source_url = 'http://www.greenvillekids.edu.hk/en/admission/'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '537527' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'check_school', 'check_school', 'check_school', 'check_school', 'http://www.greenvillekids.edu.hk/en/admission/', true
FROM schools
WHERE school_code = '537527' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'not_offered',
  k1_vacancy = 'no_information',
  k2_vacancy = 'no_information',
  k3_vacancy = 'no_information',
  edb_source_url = 'http://www.deborah-intl.edu.hk/'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '567108' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'not_offered', 'no_information', 'no_information', 'no_information', 'http://www.deborah-intl.edu.hk/', true
FROM schools
WHERE school_code = '567108' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'no_information',
  k1_vacancy = 'no_information',
  k2_vacancy = 'no_information',
  k3_vacancy = 'no_information',
  edb_source_url = 'http://www.deborah-intl.edu.hk/'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '567116' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'no_information', 'no_information', 'no_information', 'no_information', 'http://www.deborah-intl.edu.hk/', true
FROM schools
WHERE school_code = '567116' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'check_school',
  k1_vacancy = 'check_school',
  k2_vacancy = 'check_school',
  k3_vacancy = 'check_school',
  edb_source_url = 'https://www.gardenhouse.edu.hk/admissions-overview'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '575755' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'check_school', 'check_school', 'check_school', 'check_school', 'https://www.gardenhouse.edu.hk/admissions-overview', true
FROM schools
WHERE school_code = '575755' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'check_school',
  k1_vacancy = 'check_school',
  k2_vacancy = 'check_school',
  k3_vacancy = 'check_school',
  edb_source_url = 'https://guidepost.hk/apply-now'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '578630' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'check_school', 'check_school', 'check_school', 'check_school', 'https://guidepost.hk/apply-now', true
FROM schools
WHERE school_code = '578630' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'check_school',
  k1_vacancy = 'check_school',
  k2_vacancy = 'check_school',
  k3_vacancy = 'check_school',
  edb_source_url = 'https://boxhill.edu.hk/admission/'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '581836' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'check_school', 'check_school', 'check_school', 'check_school', 'https://boxhill.edu.hk/admission/', true
FROM schools
WHERE school_code = '581836' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'check_school',
  k1_vacancy = 'check_school',
  k2_vacancy = 'check_school',
  k3_vacancy = 'check_school',
  edb_source_url = 'https://guidepost.hk/apply-now'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '583774' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'check_school', 'check_school', 'check_school', 'check_school', 'https://guidepost.hk/apply-now', true
FROM schools
WHERE school_code = '583774' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'check_school',
  k1_vacancy = 'check_school',
  k2_vacancy = 'check_school',
  k3_vacancy = 'check_school',
  edb_source_url = 'http://greenfield.edu.hk/admission.php?id='
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '604372' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'check_school', 'check_school', 'check_school', 'check_school', 'http://greenfield.edu.hk/admission.php?id=', true
FROM schools
WHERE school_code = '604372' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'no_information',
  k1_vacancy = 'no_information',
  k2_vacancy = 'no_information',
  k3_vacancy = 'no_information',
  edb_source_url = 'https://www.york.edu.hk/'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '609749' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'no_information', 'no_information', 'no_information', 'no_information', 'https://www.york.edu.hk/', true
FROM schools
WHERE school_code = '609749' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'no_information',
  k1_vacancy = 'no_information',
  k2_vacancy = 'no_information',
  k3_vacancy = 'no_information',
  edb_source_url = 'http://www.learninghabitat.org/'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '612391' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'no_information', 'no_information', 'no_information', 'no_information', 'http://www.learninghabitat.org/', true
FROM schools
WHERE school_code = '612391' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'check_school',
  k1_vacancy = 'check_school',
  k2_vacancy = 'check_school',
  k3_vacancy = 'check_school',
  edb_source_url = 'https://loupichoun.com/school-applications'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '613088' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'check_school', 'check_school', 'check_school', 'check_school', 'https://loupichoun.com/school-applications', true
FROM schools
WHERE school_code = '613088' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'check_school',
  k1_vacancy = 'check_school',
  k2_vacancy = 'check_school',
  k3_vacancy = 'check_school',
  edb_source_url = 'https://www.maplebear.hk/admissions'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '613665' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'check_school', 'check_school', 'check_school', 'check_school', 'https://www.maplebear.hk/admissions', true
FROM schools
WHERE school_code = '613665' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'no_information',
  k1_vacancy = 'no_information',
  k2_vacancy = 'no_information',
  k3_vacancy = 'no_information',
  edb_source_url = 'http://www.invictusschool.hk/'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '615366' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'no_information', 'no_information', 'no_information', 'no_information', 'http://www.invictusschool.hk/', true
FROM schools
WHERE school_code = '615366' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'not_offered',
  k1_vacancy = 'check_school',
  k2_vacancy = 'check_school',
  k3_vacancy = 'check_school',
  edb_source_url = 'https://www.maplebear.hk/admissions'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '616311' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'not_offered', 'check_school', 'check_school', 'check_school', 'https://www.maplebear.hk/admissions', true
FROM schools
WHERE school_code = '616311' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'waiting_list',
  k1_vacancy = 'waiting_list',
  k2_vacancy = 'waiting_list',
  k3_vacancy = 'waiting_list',
  edb_source_url = 'https://www.pips.edu.hk/lohas/admission_pn-kg.asp#nav00'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '616443' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'waiting_list', 'waiting_list', 'waiting_list', 'waiting_list', 'https://www.pips.edu.hk/lohas/admission_pn-kg.asp#nav00', true
FROM schools
WHERE school_code = '616443' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'check_school',
  k1_vacancy = 'check_school',
  k2_vacancy = 'check_school',
  k3_vacancy = 'check_school',
  edb_source_url = 'https://www.aik.edu.hk/apply-online'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '604470' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'check_school', 'check_school', 'check_school', 'check_school', 'https://www.aik.edu.hk/apply-online', true
FROM schools
WHERE school_code = '604470' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'no_information',
  k1_vacancy = 'no_information',
  k2_vacancy = 'no_information',
  k3_vacancy = 'no_information',
  edb_source_url = 'http://www.york.edu.hk/'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '604615' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'no_information', 'no_information', 'no_information', 'no_information', 'http://www.york.edu.hk/', true
FROM schools
WHERE school_code = '604615' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'check_school',
  k1_vacancy = 'check_school',
  k2_vacancy = 'check_school',
  k3_vacancy = 'check_school',
  edb_source_url = 'https://www.kendall.edu.hk/admissions/#application-form'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '607703' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'check_school', 'check_school', 'check_school', 'check_school', 'https://www.kendall.edu.hk/admissions/#application-form', true
FROM schools
WHERE school_code = '607703' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'check_school',
  k1_vacancy = 'check_school',
  k2_vacancy = 'check_school',
  k3_vacancy = 'check_school',
  edb_source_url = 'https://www.think.edu.hk/admission'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '612782' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'check_school', 'check_school', 'check_school', 'check_school', 'https://www.think.edu.hk/admission', true
FROM schools
WHERE school_code = '612782' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'no_information',
  k1_vacancy = 'no_information',
  k2_vacancy = 'no_information',
  k3_vacancy = 'no_information',
  edb_source_url = 'http://www.learninghabitat.org/'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '615250' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'no_information', 'no_information', 'no_information', 'no_information', 'http://www.learninghabitat.org/', true
FROM schools
WHERE school_code = '615250' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'check_school',
  k1_vacancy = 'check_school',
  k2_vacancy = 'check_school',
  k3_vacancy = 'check_school',
  edb_source_url = 'http://www.catiline.edu.hk/primarynbsponenbspadmissions.html'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '231266' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'check_school', 'check_school', 'check_school', 'check_school', 'http://www.catiline.edu.hk/primarynbsponenbspadmissions.html', true
FROM schools
WHERE school_code = '231266' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'not_offered',
  k1_vacancy = 'no_information',
  k2_vacancy = 'no_information',
  k3_vacancy = 'no_information',
  edb_source_url = 'http://www.dek.edu.hk/'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '231517' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'not_offered', 'no_information', 'no_information', 'no_information', 'http://www.dek.edu.hk/', true
FROM schools
WHERE school_code = '231517' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'no_information',
  k1_vacancy = 'no_information',
  k2_vacancy = 'no_information',
  k3_vacancy = 'no_information',
  edb_source_url = 'http://www.good-health.edu.hk/'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '231657' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'no_information', 'no_information', 'no_information', 'no_information', 'http://www.good-health.edu.hk/', true
FROM schools
WHERE school_code = '231657' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'check_school',
  k1_vacancy = 'check_school',
  k2_vacancy = 'check_school',
  k3_vacancy = 'check_school',
  edb_source_url = 'http://www.hkpreschool.edu.hk/index.php/section/page/3142'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '522953' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'check_school', 'check_school', 'check_school', 'check_school', 'http://www.hkpreschool.edu.hk/index.php/section/page/3142', true
FROM schools
WHERE school_code = '522953' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'check_school',
  k1_vacancy = 'check_school',
  k2_vacancy = 'check_school',
  k3_vacancy = 'check_school',
  edb_source_url = 'https://www.think.edu.hk/admission'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '533360' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'check_school', 'check_school', 'check_school', 'check_school', 'https://www.think.edu.hk/admission', true
FROM schools
WHERE school_code = '533360' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'check_school',
  k1_vacancy = 'check_school',
  k2_vacancy = 'check_school',
  k3_vacancy = 'check_school',
  edb_source_url = 'https://boxhill.edu.hk/admission/'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '559415' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'check_school', 'check_school', 'check_school', 'check_school', 'https://boxhill.edu.hk/admission/', true
FROM schools
WHERE school_code = '559415' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'no_information',
  k1_vacancy = 'no_information',
  k2_vacancy = 'no_information',
  k3_vacancy = 'no_information',
  edb_source_url = 'http://www.good-health.edu.hk/'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '565113' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'no_information', 'no_information', 'no_information', 'no_information', 'http://www.good-health.edu.hk/', true
FROM schools
WHERE school_code = '565113' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'check_school',
  k1_vacancy = 'check_school',
  k2_vacancy = 'check_school',
  k3_vacancy = 'check_school',
  edb_source_url = 'https://boxhill.edu.hk/admission/'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '581739' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'check_school', 'check_school', 'check_school', 'check_school', 'https://boxhill.edu.hk/admission/', true
FROM schools
WHERE school_code = '581739' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'no_information',
  k1_vacancy = 'no_information',
  k2_vacancy = 'no_information',
  k3_vacancy = 'no_information',
  edb_source_url = 'http://www.joyfulenglish.edu.hk/'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '591777' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'no_information', 'no_information', 'no_information', 'no_information', 'http://www.joyfulenglish.edu.hk/', true
FROM schools
WHERE school_code = '591777' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'check_school',
  k1_vacancy = 'check_school',
  k2_vacancy = 'check_school',
  k3_vacancy = 'check_school',
  edb_source_url = 'https://www.mulberrytree.edu.hk/admissions'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '598054' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'check_school', 'check_school', 'check_school', 'check_school', 'https://www.mulberrytree.edu.hk/admissions', true
FROM schools
WHERE school_code = '598054' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'no_information',
  k1_vacancy = 'no_information',
  k2_vacancy = 'no_information',
  k3_vacancy = 'no_information',
  edb_source_url = 'http://www.learninghabitat.org/'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '604291' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'no_information', 'no_information', 'no_information', 'no_information', 'http://www.learninghabitat.org/', true
FROM schools
WHERE school_code = '604291' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'check_school',
  k1_vacancy = 'check_school',
  k2_vacancy = 'check_school',
  k3_vacancy = 'check_school',
  edb_source_url = 'http://www.puikiukg.edu.hk/chi/application-procedures'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '613916' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'check_school', 'check_school', 'check_school', 'check_school', 'http://www.puikiukg.edu.hk/chi/application-procedures', true
FROM schools
WHERE school_code = '613916' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'check_school',
  k1_vacancy = 'check_school',
  k2_vacancy = 'check_school',
  k3_vacancy = 'check_school',
  edb_source_url = 'https://kindergarten.sthilarys.edu.hk/?page_id=943'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '616290' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'check_school', 'check_school', 'check_school', 'check_school', 'https://kindergarten.sthilarys.edu.hk/?page_id=943', true
FROM schools
WHERE school_code = '616290' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'check_school',
  k1_vacancy = 'check_school',
  k2_vacancy = 'check_school',
  k3_vacancy = 'check_school',
  edb_source_url = 'http://www.puikiukg.edu.hk/chi/application-procedures'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '622389' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'check_school', 'check_school', 'check_school', 'check_school', 'http://www.puikiukg.edu.hk/chi/application-procedures', true
FROM schools
WHERE school_code = '622389' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'waiting_list',
  k1_vacancy = 'waiting_list',
  k2_vacancy = 'waiting_list',
  k3_vacancy = 'waiting_list',
  edb_source_url = 'http://www.pips.edu.hk/hk/admissions_process.asp#nav00'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '215937' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'waiting_list', 'waiting_list', 'waiting_list', 'waiting_list', 'http://www.pips.edu.hk/hk/admissions_process.asp#nav00', true
FROM schools
WHERE school_code = '215937' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'check_school',
  k1_vacancy = 'waiting_list',
  k2_vacancy = 'waiting_list',
  k3_vacancy = 'check_school',
  edb_source_url = 'https://www.victoria.edu.hk/application-procedure/?tab=PN_K1'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '216194' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'check_school', 'waiting_list', 'waiting_list', 'check_school', 'https://www.victoria.edu.hk/application-procedure/?tab=PN_K1', true
FROM schools
WHERE school_code = '216194' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'no_information',
  k1_vacancy = 'no_information',
  k2_vacancy = 'no_information',
  k3_vacancy = 'no_information',
  edb_source_url = 'http://www.rmkg.edu.hk/'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '325961' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'no_information', 'no_information', 'no_information', 'no_information', 'http://www.rmkg.edu.hk/', true
FROM schools
WHERE school_code = '325961' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'check_school',
  k1_vacancy = 'check_school',
  k2_vacancy = 'check_school',
  k3_vacancy = 'check_school',
  edb_source_url = 'https://form.jotform.me/82552941042453'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '565466' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'check_school', 'check_school', 'check_school', 'check_school', 'https://form.jotform.me/82552941042453', true
FROM schools
WHERE school_code = '565466' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'check_school',
  k1_vacancy = 'check_school',
  k2_vacancy = 'check_school',
  k3_vacancy = 'check_school',
  edb_source_url = 'https://mulberryhousekg.com/'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '578053' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'check_school', 'check_school', 'check_school', 'check_school', 'https://mulberryhousekg.com/', true
FROM schools
WHERE school_code = '578053' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'check_school',
  k1_vacancy = 'check_school',
  k2_vacancy = 'check_school',
  k3_vacancy = 'check_school',
  edb_source_url = 'https://guidepost.hk/apply-now'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '598089' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'check_school', 'check_school', 'check_school', 'check_school', 'https://guidepost.hk/apply-now', true
FROM schools
WHERE school_code = '598089' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'check_school',
  k1_vacancy = 'check_school',
  k2_vacancy = 'check_school',
  k3_vacancy = 'check_school',
  edb_source_url = 'https://guidepost.hk/apply-now'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '602256' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'check_school', 'check_school', 'check_school', 'check_school', 'https://guidepost.hk/apply-now', true
FROM schools
WHERE school_code = '602256' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'no_information',
  k1_vacancy = 'no_information',
  k2_vacancy = 'no_information',
  k3_vacancy = 'no_information',
  edb_source_url = 'http://www.anchors.edu.hk/'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '536067' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'no_information', 'no_information', 'no_information', 'no_information', 'http://www.anchors.edu.hk/', true
FROM schools
WHERE school_code = '536067' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'no_information',
  k1_vacancy = 'no_information',
  k2_vacancy = 'no_information',
  k3_vacancy = 'no_information',
  edb_source_url = 'http://www.anchors.edu.hk/'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '565199' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'no_information', 'no_information', 'no_information', 'no_information', 'http://www.anchors.edu.hk/', true
FROM schools
WHERE school_code = '565199' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'no_information',
  k1_vacancy = 'no_information',
  k2_vacancy = 'no_information',
  k3_vacancy = 'no_information',
  edb_source_url = 'http://www.mink.edu.hk/'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '567027' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'no_information', 'no_information', 'no_information', 'no_information', 'http://www.mink.edu.hk/', true
FROM schools
WHERE school_code = '567027' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'check_school',
  k1_vacancy = 'check_school',
  k2_vacancy = 'check_school',
  k3_vacancy = 'check_school',
  edb_source_url = 'https://mulberryhousekg.com/'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '601721' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'check_school', 'check_school', 'check_school', 'check_school', 'https://mulberryhousekg.com/', true
FROM schools
WHERE school_code = '601721' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'no_information',
  k1_vacancy = 'no_information',
  k2_vacancy = 'no_information',
  k3_vacancy = 'no_information',
  edb_source_url = 'http://www.lukyeungkg.edu.hk/'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '157716' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'no_information', 'no_information', 'no_information', 'no_information', 'http://www.lukyeungkg.edu.hk/', true
FROM schools
WHERE school_code = '157716' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'no_information',
  k1_vacancy = 'no_information',
  k2_vacancy = 'no_information',
  k3_vacancy = 'no_information',
  edb_source_url = 'http://www.funful.hk/'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '565105' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'no_information', 'no_information', 'no_information', 'no_information', 'http://www.funful.hk/', true
FROM schools
WHERE school_code = '565105' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'no_information',
  k1_vacancy = 'no_information',
  k2_vacancy = 'no_information',
  k3_vacancy = 'no_information',
  edb_source_url = 'http://www.joyfulenglish.edu.hk/'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '583340' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'no_information', 'no_information', 'no_information', 'no_information', 'http://www.joyfulenglish.edu.hk/', true
FROM schools
WHERE school_code = '583340' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'no_information',
  k1_vacancy = 'no_information',
  k2_vacancy = 'no_information',
  k3_vacancy = 'no_information',
  edb_source_url = 'http://www.swindon.edu.hk/'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '590860' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'no_information', 'no_information', 'no_information', 'no_information', 'http://www.swindon.edu.hk/', true
FROM schools
WHERE school_code = '590860' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'no_information',
  k1_vacancy = 'no_information',
  k2_vacancy = 'no_information',
  k3_vacancy = 'no_information',
  edb_source_url = 'http://www.joyfulenglish.edu.hk/'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '597716' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'no_information', 'no_information', 'no_information', 'no_information', 'http://www.joyfulenglish.edu.hk/', true
FROM schools
WHERE school_code = '597716' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'check_school',
  k1_vacancy = 'waiting_list',
  k2_vacancy = 'waiting_list',
  k3_vacancy = 'check_school',
  edb_source_url = 'https://www.victoria.edu.hk/application-procedure/?tab=PN_K1'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '619850' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'check_school', 'waiting_list', 'waiting_list', 'check_school', 'https://www.victoria.edu.hk/application-procedure/?tab=PN_K1', true
FROM schools
WHERE school_code = '619850' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'check_school',
  k1_vacancy = 'check_school',
  k2_vacancy = 'check_school',
  k3_vacancy = 'check_school',
  edb_source_url = 'http://sunkids.edu.hk/admissions'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '572764' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'check_school', 'check_school', 'check_school', 'check_school', 'http://sunkids.edu.hk/admissions', true
FROM schools
WHERE school_code = '572764' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'check_school',
  k1_vacancy = 'check_school',
  k2_vacancy = 'check_school',
  k3_vacancy = 'check_school',
  edb_source_url = 'https://www.jingjing.edu.hk/applications'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '587524' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'check_school', 'check_school', 'check_school', 'check_school', 'https://www.jingjing.edu.hk/applications', true
FROM schools
WHERE school_code = '587524' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'no_information',
  k1_vacancy = 'no_information',
  k2_vacancy = 'no_information',
  k3_vacancy = 'no_information',
  edb_source_url = 'http://www.wellcomekg.edu.hk/'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '590401' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'no_information', 'no_information', 'no_information', 'no_information', 'http://www.wellcomekg.edu.hk/', true
FROM schools
WHERE school_code = '590401' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'no_information',
  k1_vacancy = 'no_information',
  k2_vacancy = 'no_information',
  k3_vacancy = 'no_information',
  edb_source_url = 'http://www.joyfulenglish.edu.hk/'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '615170' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'no_information', 'no_information', 'no_information', 'no_information', 'http://www.joyfulenglish.edu.hk/', true
FROM schools
WHERE school_code = '615170' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'no_information',
  k1_vacancy = 'no_information',
  k2_vacancy = 'no_information',
  k3_vacancy = 'no_information',
  edb_source_url = 'http://www.york.edu.hk/'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '616990' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'no_information', 'no_information', 'no_information', 'no_information', 'http://www.york.edu.hk/', true
FROM schools
WHERE school_code = '616990' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'no_information',
  k1_vacancy = 'no_information',
  k2_vacancy = 'no_information',
  k3_vacancy = 'no_information',
  edb_source_url = 'http://www.teikyo.edu.hk/'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '325848' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'no_information', 'no_information', 'no_information', 'no_information', 'http://www.teikyo.edu.hk/', true
FROM schools
WHERE school_code = '325848' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'check_school',
  k1_vacancy = 'check_school',
  k2_vacancy = 'check_school',
  k3_vacancy = 'check_school',
  edb_source_url = 'https://guidepost.hk/apply-now'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '564958' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'check_school', 'check_school', 'check_school', 'check_school', 'https://guidepost.hk/apply-now', true
FROM schools
WHERE school_code = '564958' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'no_information',
  k1_vacancy = 'no_information',
  k2_vacancy = 'no_information',
  k3_vacancy = 'no_information',
  edb_source_url = 'http://www.braemarhillnurseryschool.edu.hk/'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '565938' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'no_information', 'no_information', 'no_information', 'no_information', 'http://www.braemarhillnurseryschool.edu.hk/', true
FROM schools
WHERE school_code = '565938' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'has_vacancy',
  k1_vacancy = 'no_information',
  k2_vacancy = 'no_information',
  k3_vacancy = 'no_information',
  edb_source_url = 'https://icms.edu.hk/admissions-2/'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '581119' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'has_vacancy', 'no_information', 'no_information', 'no_information', 'https://icms.edu.hk/admissions-2/', true
FROM schools
WHERE school_code = '581119' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'check_school',
  k1_vacancy = 'check_school',
  k2_vacancy = 'check_school',
  k3_vacancy = 'check_school',
  edb_source_url = 'http://www.pods.com.hk/pages/admissions'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '593770' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'check_school', 'check_school', 'check_school', 'check_school', 'http://www.pods.com.hk/pages/admissions', true
FROM schools
WHERE school_code = '593770' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'check_school',
  k1_vacancy = 'check_school',
  k2_vacancy = 'check_school',
  k3_vacancy = 'check_school',
  edb_source_url = 'https://www.masspreschool.com/admission'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '600334' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'check_school', 'check_school', 'check_school', 'check_school', 'https://www.masspreschool.com/admission', true
FROM schools
WHERE school_code = '600334' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'check_school',
  k1_vacancy = 'check_school',
  k2_vacancy = 'check_school',
  k3_vacancy = 'check_school',
  edb_source_url = 'https://littledalton.com/'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '607592' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'check_school', 'check_school', 'check_school', 'check_school', 'https://littledalton.com/', true
FROM schools
WHERE school_code = '607592' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'no_information',
  k1_vacancy = 'no_information',
  k2_vacancy = 'no_information',
  k3_vacancy = 'no_information',
  edb_source_url = 'http://ymcahk.org.hk/cikg/'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '216178' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'no_information', 'no_information', 'no_information', 'no_information', 'http://ymcahk.org.hk/cikg/', true
FROM schools
WHERE school_code = '216178' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'no_information',
  k1_vacancy = 'no_information',
  k2_vacancy = 'no_information',
  k3_vacancy = 'no_information',
  edb_source_url = 'http://www.learninghabitat.org/'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '561207' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'no_information', 'no_information', 'no_information', 'no_information', 'http://www.learninghabitat.org/', true
FROM schools
WHERE school_code = '561207' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'check_school',
  k1_vacancy = 'check_school',
  k2_vacancy = 'check_school',
  k3_vacancy = 'check_school',
  edb_source_url = 'https://www.edb.gov.hk/tc/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/index.html'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '566748' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'check_school', 'check_school', 'check_school', 'check_school', 'https://www.edb.gov.hk/tc/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/index.html', true
FROM schools
WHERE school_code = '566748' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'waiting_list',
  k1_vacancy = 'waiting_list',
  k2_vacancy = 'waiting_list',
  k3_vacancy = 'waiting_list',
  edb_source_url = 'https://www.pips.edu.hk/kln/admission_pn-kg.asp#nav00'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '571490' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'waiting_list', 'waiting_list', 'waiting_list', 'waiting_list', 'https://www.pips.edu.hk/kln/admission_pn-kg.asp#nav00', true
FROM schools
WHERE school_code = '571490' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'check_school',
  k1_vacancy = 'waiting_list',
  k2_vacancy = 'waiting_list',
  k3_vacancy = 'check_school',
  edb_source_url = 'https://www.victoria.edu.hk/application-procedure/?tab=PN_K1'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '574708' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'check_school', 'waiting_list', 'waiting_list', 'check_school', 'https://www.victoria.edu.hk/application-procedure/?tab=PN_K1', true
FROM schools
WHERE school_code = '574708' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'check_school',
  k1_vacancy = 'check_school',
  k2_vacancy = 'check_school',
  k3_vacancy = 'check_school',
  edb_source_url = 'http://www.mingwai.edu.hk/'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '583421' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'check_school', 'check_school', 'check_school', 'check_school', 'http://www.mingwai.edu.hk/', true
FROM schools
WHERE school_code = '583421' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'no_information',
  k1_vacancy = 'no_information',
  k2_vacancy = 'no_information',
  k3_vacancy = 'no_information',
  edb_source_url = 'http://www.sophiekg.edu.hk/'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '595543' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'no_information', 'no_information', 'no_information', 'no_information', 'http://www.sophiekg.edu.hk/', true
FROM schools
WHERE school_code = '595543' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'no_information',
  k1_vacancy = 'no_information',
  k2_vacancy = 'no_information',
  k3_vacancy = 'no_information',
  edb_source_url = 'http://www.hartspreschool.com/'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '601403' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'no_information', 'no_information', 'no_information', 'no_information', 'http://www.hartspreschool.com/', true
FROM schools
WHERE school_code = '601403' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'check_school',
  k1_vacancy = 'check_school',
  k2_vacancy = 'check_school',
  k3_vacancy = 'check_school',
  edb_source_url = 'http://www.malvernpreschool.hk/'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '606979' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'check_school', 'check_school', 'check_school', 'check_school', 'http://www.malvernpreschool.hk/', true
FROM schools
WHERE school_code = '606979' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'no_information',
  k1_vacancy = 'no_information',
  k2_vacancy = 'no_information',
  k3_vacancy = 'no_information',
  edb_source_url = 'http://www.learninghabitat.org/'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '617474' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'no_information', 'no_information', 'no_information', 'no_information', 'http://www.learninghabitat.org/', true
FROM schools
WHERE school_code = '617474' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'no_information',
  k1_vacancy = 'no_information',
  k2_vacancy = 'no_information',
  k3_vacancy = 'no_information',
  edb_source_url = 'http://www.st-lorraine.edu.hk/'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '151696' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'no_information', 'no_information', 'no_information', 'no_information', 'http://www.st-lorraine.edu.hk/', true
FROM schools
WHERE school_code = '151696' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'no_information',
  k1_vacancy = 'no_information',
  k2_vacancy = 'no_information',
  k3_vacancy = 'no_information',
  edb_source_url = 'http://www.st-lorraine.edu.hk/'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '517828' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'no_information', 'no_information', 'no_information', 'no_information', 'http://www.st-lorraine.edu.hk/', true
FROM schools
WHERE school_code = '517828' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'check_school',
  k1_vacancy = 'check_school',
  k2_vacancy = 'check_school',
  k3_vacancy = 'check_school',
  edb_source_url = 'http://www.edb.gov.hk/k1-admission_e'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '602000' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'check_school', 'check_school', 'check_school', 'check_school', 'http://www.edb.gov.hk/k1-admission_e', true
FROM schools
WHERE school_code = '602000' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'no_information',
  k1_vacancy = 'no_information',
  k2_vacancy = 'no_information',
  k3_vacancy = 'no_information',
  edb_source_url = 'http://www.york.edu.hk/'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '605441' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'no_information', 'no_information', 'no_information', 'no_information', 'http://www.york.edu.hk/', true
FROM schools
WHERE school_code = '605441' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'check_school',
  k1_vacancy = 'check_school',
  k2_vacancy = 'check_school',
  k3_vacancy = 'check_school',
  edb_source_url = 'https://www.tutortime.com.hk/admission/nursery-kindergarten-enrollment-2026-2027-new-students/'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '605794' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'check_school', 'check_school', 'check_school', 'check_school', 'https://www.tutortime.com.hk/admission/nursery-kindergarten-enrollment-2026-2027-new-students/', true
FROM schools
WHERE school_code = '605794' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'no_information',
  k1_vacancy = 'no_information',
  k2_vacancy = 'no_information',
  k3_vacancy = 'no_information',
  edb_source_url = 'http://www.joyfulenglish.edu.hk/'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '612189' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'no_information', 'no_information', 'no_information', 'no_information', 'http://www.joyfulenglish.edu.hk/', true
FROM schools
WHERE school_code = '612189' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'check_school',
  k1_vacancy = 'check_school',
  k2_vacancy = 'check_school',
  k3_vacancy = 'check_school',
  edb_source_url = 'https://www.eminent-education.org/admissions-1'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '615633' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'check_school', 'check_school', 'check_school', 'check_school', 'https://www.eminent-education.org/admissions-1', true
FROM schools
WHERE school_code = '615633' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'no_information',
  k1_vacancy = 'no_information',
  k2_vacancy = 'no_information',
  k3_vacancy = 'no_information',
  edb_source_url = 'http://www.york.edu.hk/'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '621480' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'no_information', 'no_information', 'no_information', 'no_information', 'http://www.york.edu.hk/', true
FROM schools
WHERE school_code = '621480' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
UPDATE vacancies
SET
  n_vacancy = 'no_information',
  k1_vacancy = 'no_information',
  k2_vacancy = 'no_information',
  k3_vacancy = 'no_information',
  edb_source_url = 'https://www.anchorsacademy.edu.hk/'
FROM schools
WHERE vacancies.school_id = schools.id AND schools.school_code = '622060' AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true;
INSERT INTO vacancies (school_id, academic_year, n_vacancy, k1_vacancy, k2_vacancy, k3_vacancy, edb_source_url, is_current)
SELECT id, '2026/27', 'no_information', 'no_information', 'no_information', 'no_information', 'https://www.anchorsacademy.edu.hk/', true
FROM schools
WHERE school_code = '622060' AND NOT EXISTS (
  SELECT 1 FROM vacancies WHERE vacancies.school_id = schools.id AND vacancies.academic_year = '2026/27' AND vacancies.is_current = true
);
