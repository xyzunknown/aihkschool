-- Official school link enrichment
-- Source: data/KGP_2025_tc.csv
-- CHSC/KGP profile surface is represented as official_profile_url.

-- 聖士提反堂小學暨幼稚園 (131440)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=131440',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Central%20and%20Western_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/131440.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/StStephen''sCh_PriSch_KG.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/StStephen''sCh_PriSch_KG.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '131440';

-- 聖保羅堂幼稚園 (131466)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=131466',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Central%20and%20Western_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/131466.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/StPaulsCh.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/StPaulsCh.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '131466';

-- 聖士提反女子中學附屬幼稚園 (132896)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=132896',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Central%20and%20Western_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/132896.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/StStephenGirls.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/StStephenGirls.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '132896';

-- 聖嘉勒小學 (210021)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=210021',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Central%20and%20Western_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/210021.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/StClare''s_PriSch.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/StClare''s_PriSch.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '210021';

-- 聖安多尼中英文小學暨幼稚園 (213632)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=213632',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Central%20and%20Western_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/213632.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/StAnthonysAC_PriSch_KG.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/StAnthonysAC_PriSch_KG.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '213632';

-- 偉思幼稚園 (214248)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=214248',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Central%20and%20Western_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/214248.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Wisely.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Wisely.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '214248';

-- SMALL WORLD CHRISTIAN KINDERGARTEN (215724)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=215724',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/215724.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '215724';

-- CARMEL SCHOOL (216186)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=216186',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/216186.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '216186';

-- 聖馬太堂幼稚園 (319813)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=319813',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Central%20and%20Western_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/319813.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/StMatthewsCh.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/StMatthewsCh.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '319813';

-- 明愛凌月仙幼稚園 (322270)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=322270',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Central%20and%20Western_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/322270.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Caritas_LingYuetSin.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Caritas_LingYuetSin.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '322270';

-- 嘉諾撒聖心幼稚園 (325970)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=325970',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Central%20and%20Western_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/325970.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SacredHeart_Canossian.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SacredHeart_Canossian.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '325970';

-- 救恩學校 (512273)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=512273',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Central%20and%20Western_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/512273.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/KauYanSch.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/KauYanSch.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '512273';

-- 禮賢會學校 (513423)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=513423',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Central%20and%20Western_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/513423.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Rhenish_Mission.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Rhenish_Mission.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '513423';

-- 香港真光幼稚園（堅道） (536911)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=536911',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Central%20and%20Western_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/536911.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HK_TrueLight_CaineRd.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HK_TrueLight_CaineRd.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '536911';

-- 維多利亞（寶翠園）幼稚園 (542164)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=542164',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/542164.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '542164';

-- HIGHGATE HOUSE SCHOOL - THE PEAK (545589)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=545589',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/545589.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '545589';

-- 蒙特梭利國際學校 (548430)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=548430',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/548430.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '548430';

-- 太陽島英文幼稚園（西營盤分校）(舊校名稱:太陽島英文幼稚園（卑路乍街分校）) (552739)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=552739',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Central%20and%20Western_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/552739.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SI_BelcherBr.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SI_BelcherBr.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '552739';

-- 仁濟醫院郭子樑幼稚園 (563439)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=563439',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Central%20and%20Western_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/563439.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/YCH_KwokChiLeung.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/YCH_KwokChiLeung.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '563439';

-- 香港西區婦女福利會幼稚園 (563692)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=563692',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Central%20and%20Western_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/563692.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/WWCWDHK.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/WWCWDHK.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '563692';

-- 聖雅各福群會寶翠園幼稚園 (564354)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=564354',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Central%20and%20Western_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/564354.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SJS_Belcher.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SJS_Belcher.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '564354';

-- 香港基督教女青年會戴翰芬幼兒學校 (564435)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=564435',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Central%20and%20Western_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/564435.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKYWCA_TaiHonFan.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKYWCA_TaiHonFan.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '564435';

-- 潮陽幼稚園 (564648)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=564648',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Central%20and%20Western_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/564648.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/ChiuYang.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/ChiuYang.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '564648';

-- 基督教香港信義會基恩幼兒學校 (564850)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=564850',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Central%20and%20Western_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/564850.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/ELCHK_AmazingGrace.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/ELCHK_AmazingGrace.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '564850';

-- 香港保護兒童會譚雅士幼兒學校 (565253)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=565253',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Central%20and%20Western_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/565253.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKSPC_ThomasTam.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKSPC_ThomasTam.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '565253';

-- 仁濟醫院方江輝幼稚園 (565440)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=565440',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Central%20and%20Western_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/565440.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/YCH_FongKongFai.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/YCH_FongKongFai.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '565440';

-- 明愛堅尼地城幼兒學校 (565954)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=565954',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Central%20and%20Western_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/565954.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Caritas_KennedyTown.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Caritas_KennedyTown.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '565954';

-- CITY KIDS PRESCHOOL AND PLAYGROUP (566080)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=566080',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/566080.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '566080';

-- 偉思幼兒園 (566284)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=566284',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/566284.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '566284';

-- 香港國際蒙特梭利學校（中環） (588032)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=588032',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/588032.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '588032';

-- 盈思幼稚園 (590673)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=590673',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Central%20and%20Western_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/590673.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '590673';

-- 多多國際幼稚園（半山） (593133)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=593133',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/593133.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '593133';

-- GUIDEPOST MONTESSORI INTERNATIONAL PRE-SCHOOL (MID-LEVELS) (594725)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=594725',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/594725.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '594725';

-- 弘立幼稚園 (600601)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=600601',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/600601.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '600601';

-- YORK INTERNATIONAL PRE-SCHOOL (HONG KONG) (601420)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=601420',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/601420.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '601420';

-- 奧恩國際幼稚園 (603643)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=603643',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/603643.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '603643';

-- 香港民生幼稚園（西區） (603724)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=603724',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/603724.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '603724';

-- 楓薈幼稚園 (605026)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=605026',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/605026.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '605026';

-- WILDERNESS INTERNATIONAL KINDERGARTEN (607215)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=607215',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/607215.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '607215';

-- 香島華德福學校 (608319)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=608319',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'https://applications.edb.gov.hk/schoolsearch/schoolfee/608319.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '608319';

-- GUIDEPOST MONTESSORI INTERNATIONAL KINDERGARTEN (KENNEDY TOWN) (611484)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=611484',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'https://applications.edb.gov.hk/schoolsearch/schoolfee/611484.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '611484';

-- 香港墨爾文國際幼稚園（港島西） (613037)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=613037',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'https://applications.edb.gov.hk/schoolsearch/schoolfee/613037.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '613037';

-- LES PETITS LASCARS FRENCH INTERNATIONAL PRESCHOOL (614904)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=614904',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/614904.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '614904';

-- 迦南幼稚園（中環堅道） (619841)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=619841',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Central%20and%20Western_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/619841.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '619841';

-- 英藝幼稚園（西環） (620998)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=620998',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'https://applications.edb.gov.hk/schoolsearch/schoolfee/620998.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '620998';

-- 蘇浙小學校 (132730)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=132730',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/132730.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '132730';

-- LYC'EE FRANCAIS INTERNATIONAL (FRENCH INTERNATIONAL SCHOOL) (214949)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=214949',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'https://applications.edb.gov.hk/schoolsearch/schoolfee/214949.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '214949';

-- 高主教書院幼稚園部 (215538)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=215538',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Hong%20Kong%20East_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/215538.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'http://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/StJude''sCatholic.pdf',
  inspection_report_updated_at = CASE
    WHEN 'http://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/StJude''sCatholic.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '215538';

-- 漢基國際學校 (215589)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=215589',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'https://applications.edb.gov.hk/schoolsearch/schoolfee/215589.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '215589';

-- HAMILTON HILL INTERNATIONAL KINDERGARTEN (ISLAND EAST) (215635)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=215635',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/215635.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '215635';

-- 奧伊斯嘉日本語幼稚園 (215694)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=215694',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/215694.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '215694';

-- 聖安娜中英文幼稚園（本地課程） (215740)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=215740',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Hong%20Kong%20East_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/215740.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/StAnna.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/StAnna.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '215740';

-- 聖安娜中英文幼稚園（非本地課程） (215740)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=215740',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Hong%20Kong%20East_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/215740.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '215740';

-- 瑪歌瑞特國際幼稚園（康怡） (215767)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=215767',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/215767.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '215767';

-- 啓思幼稚園（杏花邨） (215830)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=215830',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Hong%20Kong%20East_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/215830.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Creative_HengFaChuen.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Creative_HengFaChuen.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '215830';

-- 基督教康山中英文幼稚園 (215848)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=215848',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Hong%20Kong%20East_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/215848.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/KornhillChristian_AC.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/KornhillChristian_AC.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '215848';

-- 怡寶中英文幼稚園 (215872)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=215872',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Hong%20Kong%20East_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/215872.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Epoch_AC.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Epoch_AC.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '215872';

-- 宣道會上書房中英文幼稚園 (216135)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=216135',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Hong%20Kong%20East_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/216135.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CMA_Scholars.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CMA_Scholars.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '216135';

-- KOREAN INTERNATIONAL SCHOOL (216216)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=216216',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/216216.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '216216';

-- 浸信會培理學校 (311910)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=311910',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Hong%20Kong%20East_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/311910.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Baptist_PuiLi.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Baptist_PuiLi.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '311910';

-- 北角衞理堂幼稚園 (314684)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=314684',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Hong%20Kong%20East_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/314684.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/NorthPointMethodist.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/NorthPointMethodist.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '314684';

-- 北角聖彼得堂幼稚園 (315435)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=315435',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Hong%20Kong%20East_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/315435.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/StPetersCh.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/StPetersCh.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '315435';

-- 路德會錫安堂幼稚園 (316660)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=316660',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Hong%20Kong%20East_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/316660.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Zion_Lutheran.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Zion_Lutheran.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '316660';

-- 明慧幼稚園 (321087)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=321087',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/321087.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '321087';

-- 懷恩浸信會幼稚園 (323969)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=323969',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Hong%20Kong%20East_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/323969.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Grace_Baptist.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Grace_Baptist.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '323969';

-- 天主教海星幼稚園 (324094)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=324094',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Hong%20Kong%20East_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/324094.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/StarOfSeaCatholic.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/StarOfSeaCatholic.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '324094';

-- 明我幼稚園 (324230)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=324230',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Hong%20Kong%20East_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/324230.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/DominicSavio.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/DominicSavio.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '324230';

-- 香港民生幼稚園（北角） (324965)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=324965',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/324965.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '324965';

-- 合一堂陳伯宏紀念幼稚園 (325163)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=325163',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Hong%20Kong%20East_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/325163.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HYC_ChanPakWang.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HYC_ChanPakWang.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '325163';

-- 聖道明中英文幼稚園 (325457)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=325457',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Hong%20Kong%20East_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/325457.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/StDominic_AC.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/StDominic_AC.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '325457';

-- 維多利亞幼稚園 (325481)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=325481',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/325481.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '325481';

-- 新翠培元幼稚園 (325589)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=325589',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Hong%20Kong%20East_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/325589.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/NewJadeElementi.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/NewJadeElementi.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '325589';

-- 柴灣浸信會學前教育中心呂明才幼稚園 (325597)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=325597',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Hong%20Kong%20East_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/325597.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CWBCPSELMC_ChaiWan.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CWBCPSELMC_ChaiWan.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '325597';

-- 勵志會陳鄭潔雲幼稚園 (325619)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=325619',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Hong%20Kong%20East_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/325619.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/E_CCKW.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/E_CCKW.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '325619';

-- 漢廸國際幼稚園（港島東） (325783)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=325783',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/325783.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Creativity_ParkVale.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Creativity_ParkVale.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '325783';

-- 循道衛理聯合教會愛華村堂幼稚園 (325899)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=325899',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Hong%20Kong%20East_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/325899.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/EpworthVillage_Methodist.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/EpworthVillage_Methodist.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '325899';

-- 迦南幼稚園（小西灣） (325996)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=325996',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Hong%20Kong%20East_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/325996.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Cannan_SSW.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Cannan_SSW.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '325996';

-- 耀東浸信會幼稚園 (326011)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=326011',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Hong%20Kong%20East_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/326011.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/YiuTung_Baptist.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/YiuTung_Baptist.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '326011';

-- 筲箕灣街坊福利會張錦添紀念幼稚園 (516910)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=516910',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Hong%20Kong%20East_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/516910.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SKWKFWCC_Elementi.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SKWKFWCC_Elementi.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '516910';

-- 路德會聖雅各幼稚園 (536040)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=536040',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Hong%20Kong%20East_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/536040.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/StJames_Lutheran.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/StJames_Lutheran.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '536040';

-- 欣苗幼稚園 (542199)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=542199',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Hong%20Kong%20East_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/542199.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SpringView.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SpringView.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '542199';

-- 筲箕灣循道衞理幼稚園 (543357)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=543357',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/543357.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/ShauKeiWan_Methodist.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/ShauKeiWan_Methodist.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '543357';

-- 蒙特梭利國際學校 (548430)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=548430',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/548430.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '548430';

-- 救世軍北角幼兒學校 (563161)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=563161',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Hong%20Kong%20East_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/563161.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SA_NP.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SA_NP.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '563161';

-- 香港青年協會青樂幼稚園 (563331)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=563331',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Hong%20Kong%20East_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/563331.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKFYG_ChingLok.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKFYG_ChingLok.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '563331';

-- 港九街坊婦女會環翠幼稚園 (563889)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=563889',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Hong%20Kong%20East_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/563889.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKKKFWA_WanTsui.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKKKFWA_WanTsui.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '563889';

-- 港九街坊婦女會丁毓珠幼稚園 (563897)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=563897',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Hong%20Kong%20East_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/563897.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKKKWA_TingYukChee.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKKKWA_TingYukChee.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '563897';

-- 東華三院捷和鄭氏幼兒園 (564095)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=564095',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Hong%20Kong%20East_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/564095.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TWGH_ChiapHuaCheng.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TWGH_ChiapHuaCheng.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '564095';

-- 東華三院方樹泉幼兒園 (564133)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=564133',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Hong%20Kong%20East_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/564133.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TWGH_FongShuChuen.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TWGH_FongShuChuen.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '564133';

-- 香港東區婦女福利會幼兒園 (564222)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=564222',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Hong%20Kong%20East_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/564222.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/WWCEDHK.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/WWCEDHK.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '564222';

-- 香港東區婦女福利會黎桂添幼兒園 (564230)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=564230',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Hong%20Kong%20East_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/564230.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/WWCEDHK_LaiKwaiTim.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/WWCEDHK_LaiKwaiTim.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '564230';

-- 基督教香港信義會興民幼兒學校 (564583)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=564583',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Hong%20Kong%20East_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/564583.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/LPH_HingMan.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/LPH_HingMan.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '564583';

-- 香港中國婦女會幼稚園 (564745)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=564745',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Hong%20Kong%20East_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/564745.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKCWC.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKCWC.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '564745';

-- 基督教香港信義會興華幼兒學校 (564800)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=564800',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Hong%20Kong%20East_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/564800.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/ELCHK_HingWah.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/ELCHK_HingWah.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '564800';

-- 路德會杏花邨幼兒園 (565830)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=565830',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Hong%20Kong%20East_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/565830.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HengFaChuen_Lutheran.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HengFaChuen_Lutheran.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '565830';

-- 明愛香港太平洋獅子會幼兒學校 (566039)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=566039',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Hong%20Kong%20East_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/566039.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Caritas_LionsClubHKPacific.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Caritas_LionsClubHKPacific.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '566039';

-- 寶寶幼兒學校 (566101)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=566101',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Hong%20Kong%20East_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/566101.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/BoBo.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/BoBo.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '566101';

-- 中華基督教會柴灣堂幼兒園 (566152)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=566152',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Hong%20Kong%20East_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/566152.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CCC_ChaiWanCh.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CCC_ChaiWanCh.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '566152';

-- 筲箕灣崇真幼兒學校 (566420)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=566420',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Hong%20Kong%20East_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/566420.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/ShaKiWan_TsungTsin.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/ShaKiWan_TsungTsin.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '566420';

-- 維多利亞（海峰園）幼兒園 (566934)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=566934',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/566934.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '566934';

-- 銅鑼灣維多利亞（海峰園）幼兒園 (566942)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=566942',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/566942.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '566942';

-- 明慧國際幼稚園 (566977)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=566977',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/566977.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '566977';

-- 明慧國際幼稚園（北角分校） (567329)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=567329',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/567329.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '567329';

-- 保良局慧妍雅集幼稚園 (567345)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=567345',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Hong%20Kong%20East_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/567345.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PLK_WaiYin.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PLK_WaiYin.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '567345';

-- 康怡維多利亞幼稚園 (569828)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=569828',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/569828.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '569828';

-- 多多寶馬山國際幼稚園 (575852)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=575852',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/575852.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '575852';

-- 嶺南幼稚園（小西灣） (589144)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=589144',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Hong%20Kong%20East_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/589144.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Lingnan_SSW.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Lingnan_SSW.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '589144';

-- ABC PATHWAYS INTERNATIONAL KINDERGARTEN (602329)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=602329',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/602329.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '602329';

-- 雅惠國際幼稚園（鯉景灣） (604585)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=604585',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/604585.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '604585';

-- 港島蒙特梭利國際幼稚園 (607223)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=607223',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/607223.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '607223';

-- GUIDEPOST MONTESSORI INTERNATIONAL KINDERGARTEN (CHAI WAN) (609285)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=609285',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'https://applications.edb.gov.hk/schoolsearch/schoolfee/609285.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '609285';

-- 嶺南幼稚園（小西灣）二校 (610534)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=610534',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Hong%20Kong%20East_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'https://applications.edb.gov.hk/schoolsearch/schoolfee/610534.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Lingnan_SSW_2.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Lingnan_SSW_2.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '610534';

-- 學之園幼稚園（君豪峰） (613681)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=613681',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'https://applications.edb.gov.hk/schoolsearch/schoolfee/613681.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '613681';

-- 樂沛兒幼稚園 - 柴灣 (622699)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=622699',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'https://applications.edb.gov.hk/schoolsearch/schoolfee/622699.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '622699';

-- 中華基督教會長洲堂錦江幼稚園 (151424)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=151424',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Islands_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/151424.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CCC_CheungChauCh_KamKong.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CCC_CheungChauCh_KamKong.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '151424';

-- 天主教露德聖母幼稚園 (151564)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=151564',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Islands_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/151564.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/OurLadyOfLourdesCatholic.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/OurLadyOfLourdesCatholic.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '151564';

-- 長洲聖心幼稚園 (152978)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=152978',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Islands_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/152978.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CC_SacredHeart.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CC_SacredHeart.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '152978';

-- 惠平幼稚園 (153931)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=153931',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/153931.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/WaiPeng.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/WaiPeng.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '153931';

-- 基督教宣道會大澳幼稚園 (155233)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=155233',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Islands_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/155233.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CMA_TaiO.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CMA_TaiO.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '155233';

-- 力行幼稚園 (155705)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=155705',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Islands_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/155705.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/LickHang.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/LickHang.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '155705';

-- 力行幼稚園 (155705)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=155705',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Islands_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/155705.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/LickHang.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/LickHang.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '155705';

-- 南英幼稚園 (156698)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=156698',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Islands_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/156698.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/NamYing.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/NamYing.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '156698';

-- DISCOVERY BAY INTERNATIONAL SCHOOL (230987)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=230987',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/230987.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '230987';

-- 佛教張梅桂幼稚園 (517518)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=517518',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Islands_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/517518.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Buddhish_CheungMuiKwai.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Buddhish_CheungMuiKwai.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '517518';

-- 弘志幼稚園 (519871)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=519871',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/519871.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '519871';

-- 青松裕雅幼稚園 (520144)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=520144',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Islands_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/520144.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/ChingChung_HingTung.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/ChingChung_HingTung.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '520144';

-- 保良局張潘美意幼稚園 (523445)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=523445',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Islands_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/523445.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PLK_CheungPoonMeiYee.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PLK_CheungPoonMeiYee.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '523445';

-- 金巴崙長老會青草地幼稚園 (524123)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=524123',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Islands_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/524123.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CPC_GreenPasture.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CPC_GreenPasture.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '524123';

-- 國民學校中英文幼稚園 (舊校名稱:國民學校漢師中英文幼稚園) (527211)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=527211',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Islands_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/527211.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Train''s_AC.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Train''s_AC.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '527211';

-- 東涌浸信會幼稚園 (542296)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=542296',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Islands_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/542296.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TungChung_Baptist.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TungChung_Baptist.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '542296';

-- 東涌天主教幼稚園 (543004)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=543004',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Islands_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/543004.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TungChungCatholic.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TungChungCatholic.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '543004';

-- 基督徒信望愛堂逸東幼稚園 (554251)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=554251',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Islands_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/554251.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TCTFHLC_YatTung.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TCTFHLC_YatTung.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '554251';

-- 太陽島幼稚園（東涌分校） (555576)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=555576',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Islands_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/555576.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SI_TungChung.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SI_TungChung.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '555576';

-- 善一堂逸東幼稚園 (556122)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=556122',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Islands_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/556122.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SYT_YatTung.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SYT_YatTung.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '556122';

-- 佛教真如李琴芝紀念幼稚園 (556220)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=556220',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Islands_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/556220.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Buddhist_ChunYue_TungChung.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Buddhist_ChunYue_TungChung.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '556220';

-- 路德會呂君博幼兒園 (565717)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=565717',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Islands_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/565717.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/LuiKwanPok_Lutheran.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/LuiKwanPok_Lutheran.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '565717';

-- 路德會陳恩美幼兒園 (565741)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=565741',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Islands_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/565741.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/ChanYanMeiLutheran.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/ChanYanMeiLutheran.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '565741';

-- 鄰舍輔導會東涌幼兒園 (566381)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=566381',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Islands_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/566381.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/NAAC_TungChung.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/NAAC_TungChung.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '566381';

-- 香港聖公會東涌幼兒學校 (566926)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=566926',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Islands_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/566926.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SKH_TungChung.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SKH_TungChung.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '566926';

-- 鄰舍輔導會東欣幼兒園 (575011)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=575011',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Islands_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/575011.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/NAAC_TungYan.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/NAAC_TungYan.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '575011';

-- 弘志幼稚園（東涌） (578193)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=578193',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/578193.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '578193';

-- 香港國際蒙特梭利學校 (584606)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=584606',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/584606.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '584606';

-- 小大嶼山蒙特梭利幼稚園 (587877)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=587877',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/587877.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '587877';

-- LA PETITE ENFANCE KINDERGARTEN (590029)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=590029',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/590029.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '590029';

-- 英基國際幼稚園（東涌） (600350)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=600350',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/600350.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '600350';

-- DISCOVERY MONTESSORI ACADEMY (600814)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=600814',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/600814.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '600814';

-- GUIDEPOST MONTESSORI INTERNATIONAL KINDERGARTEN (DISCOVERY BAY) (609625)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=609625',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'https://applications.edb.gov.hk/schoolsearch/schoolfee/609625.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '609625';

-- 救世軍源林潔和幼稚園 (612936)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=612936',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Islands_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'https://applications.edb.gov.hk/schoolsearch/schoolfee/612936.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SA_RY.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SA_RY.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '612936';

-- 香港基督教女青年會趣沂幼稚園 (615080)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=615080',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Islands_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'https://applications.edb.gov.hk/schoolsearch/schoolfee/615080.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKYWCA_HelenLee.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKYWCA_HelenLee.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '615080';

-- 協恩中學附屬幼稚園 (132870)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=132870',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kowloon%20City_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/132870.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HeepYunn.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HeepYunn.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '132870';

-- 神召第一幼稚園 (133779)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=133779',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kowloon%20City_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/133779.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/FAOG_PriSch_KG.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/FAOG_PriSch_KG.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '133779';

-- 閩光書院 (133787)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=133787',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kowloon%20City_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/133787.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/AmoyCollege.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/AmoyCollege.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '133787';

-- 宣道幼稚園 (138835)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=138835',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/138835.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'http://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Alliance.pdf',
  inspection_report_updated_at = CASE
    WHEN 'http://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Alliance.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '138835';

-- 基督堂幼稚園 (210196)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=210196',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/210196.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '210196';

-- 聖若望英文書院 (212466)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=212466',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/212466.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '212466';

-- 金巴倫英文幼稚園 (214868)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=214868',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/214868.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '214868';

-- 國際英文幼稚園 (215120)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=215120',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/215120.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '215120';

-- 國際英文幼稚園 (215120)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=215120',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/215120.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '215120';

-- KOWLOON BAPTIST CHURCH KINDERGARTEN (215244)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=215244',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/215244.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '215244';

-- 約克中英文幼稚園 (215449)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=215449',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/215449.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '215449';

-- 太陽島英文幼稚園 (215678)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=215678',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kowloon%20City_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/215678.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SI_Eng.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SI_Eng.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '215678';

-- 香港澳洲國際學校 (216275)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=216275',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/216275.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '216275';

-- 美國國際學校 (287695)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=287695',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/287695.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '287695';

-- 聖羅撒幼稚園 (312479)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=312479',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kowloon%20City_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/312479.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/StRoseLima.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/StRoseLima.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '312479';

-- 基督教中心幼稚園 (315907)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=315907',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kowloon%20City_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/315907.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/ChristianYouthCentre.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/ChristianYouthCentre.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '315907';

-- 根德園幼稚園 (322300)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=322300',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/322300.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '322300';

-- 約克英文小學暨幼稚園（九龍塘） (322822)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=322822',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/322822.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '322822';

-- 約克英文小學暨幼稚園（九龍塘） (322822)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=322822',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/322822.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '322822';

-- 啓思幼稚園 (323926)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=323926',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kowloon%20City_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/323926.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'http://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Creative.pdf',
  inspection_report_updated_at = CASE
    WHEN 'http://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Creative.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '323926';

-- 九龍城浸信會幼稚園 (324078)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=324078',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kowloon%20City_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/324078.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/KlnCityBaptist.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/KlnCityBaptist.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '324078';

-- 香港培道小學 (324477)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=324477',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kowloon%20City_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/324477.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PooiTo_PriSch.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PooiTo_PriSch.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '324477';

-- 聖馬可堂白普理幼稚園 (324647)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=324647',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kowloon%20City_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/324647.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/StMarkCh_Bradbury.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/StMarkCh_Bradbury.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '324647';

-- 九龍靈糧堂幼稚園 (324680)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=324680',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kowloon%20City_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/324680.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/KlnLingLiangCh.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/KlnLingLiangCh.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '324680';

-- 九龍迦南中英文幼稚園 (324930)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=324930',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kowloon%20City_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/324930.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Kln_Cannan_AC.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Kln_Cannan_AC.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '324930';

-- 美雅幼稚園 (325040)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=325040',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kowloon%20City_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/325040.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/MayNga.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/MayNga.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '325040';

-- 耀中國際學校 (325147)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=325147',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/325147.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '325147';

-- 聖三一中心幼稚園 (325180)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=325180',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kowloon%20City_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/325180.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HolyTrinityCentre.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HolyTrinityCentre.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '325180';

-- 聖公會聖三一堂曾肇添幼稚園 (325600)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=325600',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kowloon%20City_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/325600.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SKH_TsangShiuTim.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SKH_TsangShiuTim.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '325600';

-- 美雅幼稚園（分校） (325775)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=325775',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kowloon%20City_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/325775.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/MayNga_Br.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/MayNga_Br.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '325775';

-- 香港創價幼稚園 (325856)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=325856',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kowloon%20City_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/325856.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKSoka.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKSoka.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '325856';

-- 保良局李徐松聲紀念幼稚園 (325988)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=325988',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kowloon%20City_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/325988.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PLK_LiTsuiChungSing.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PLK_LiTsuiChungSing.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '325988';

-- 香港培正小學 (513350)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=513350',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/513350.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'http://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PuiChing_PriSch.pdf',
  inspection_report_updated_at = CASE
    WHEN 'http://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PuiChing_PriSch.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '513350';

-- 京斯敦國際幼稚園 (519863)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=519863',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/519863.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '519863';

-- 太陽島英文幼稚園（樂民） (523526)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=523526',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kowloon%20City_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/523526.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SI_Eng_YMT.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SI_Eng_YMT.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '523526';

-- YORK ENGLISH PRE-SCHOOL (526100)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=526100',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/526100.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '526100';

-- 迦南幼稚園（九龍塘） (531910)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=531910',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kowloon%20City_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/531910.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Cannan_KlnTong.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Cannan_KlnTong.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '531910';

-- 安菲爾國際幼稚園 (535818)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=535818',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/535818.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '535818';

-- 安菲爾國際幼稚園 (535818)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=535818',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/535818.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '535818';

-- 何文田浸信會幼稚園 (536024)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=536024',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kowloon%20City_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/536024.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HMTBaptistCh.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HMTBaptistCh.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '536024';

-- 聖文嘉幼稚園 (537349)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=537349',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kowloon%20City_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/537349.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/StMonica''s.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/StMonica''s.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '537349';

-- 劍鳴幼稚園 (537713)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=537713',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/537713.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '537713';

-- 保良局譚歐陽少芳紀念幼稚園 (539104)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=539104',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kowloon%20City_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/539104.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PLK_TamAuYeungSiuFong.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PLK_TamAuYeungSiuFong.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '539104';

-- 多多國際幼稚園（九龍塘） (542504)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=542504',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/542504.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '542504';

-- 啓思小學附屬幼稚園 (544744)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=544744',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/544744.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '544744';

-- 救世軍樂民幼兒學校 (563064)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=563064',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kowloon%20City_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/563064.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SA_LokMan.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SA_LokMan.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '563064';

-- 東華三院羅黃碧珊幼兒園 (563579)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=563579',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kowloon%20City_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/563579.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TWGH_LoWongPikShan.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TWGH_LoWongPikShan.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '563579';

-- 基督教香港崇真會安基幼兒學校 (563781)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=563781',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kowloon%20City_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/563781.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TTMHK_OnKei.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TTMHK_OnKei.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '563781';

-- 保良局呂陳慧貞幼稚園 (563803)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=563803',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kowloon%20City_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/563803.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PLK_SheungLok.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PLK_SheungLok.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '563803';

-- 保良局林丁麗玲幼稚園 (563927)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=563927',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kowloon%20City_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/563927.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PLK_TingMauHungHom.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PLK_TingMauHungHom.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '563927';

-- 博愛醫院任永賢夫人幼稚園 (564001)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=564001',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kowloon%20City_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/564001.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/POH_MrsYamWingYin.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/POH_MrsYamWingYin.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '564001';

-- 九龍靈糧堂幼兒園 (564524)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=564524',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kowloon%20City_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/564524.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'http://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Kln_LingLiangCh.pdf',
  inspection_report_updated_at = CASE
    WHEN 'http://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Kln_LingLiangCh.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '564524';

-- 基督教香港信義會馬頭圍幼兒學校 (564567)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=564567',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kowloon%20City_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/564567.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/LPH_MTW.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/LPH_MTW.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '564567';

-- 嗇色園主辦可愛幼兒園 (564869)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=564869',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kowloon%20City_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/564869.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SSY_HoOi.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SSY_HoOi.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '564869';

-- 何文田循道衛理楊震幼兒學校 (565016)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=565016',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kowloon%20City_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/565016.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HMT_Yang_Methodist.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HMT_Yang_Methodist.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '565016';

-- 迦南幼稚園（窩打老道） (565130)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=565130',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kowloon%20City_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/565130.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Cannan_WaterlooRd.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Cannan_WaterlooRd.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '565130';

-- 香港保護兒童會馬頭涌幼兒學校 (565229)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=565229',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kowloon%20City_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/565229.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKSPC_MaTauChung.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKSPC_MaTauChung.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '565229';

-- 香港保護兒童會新航黃埔幼兒學校 (565288)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=565288',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kowloon%20City_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/565288.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKSPC_SiaWhampoa.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKSPC_SiaWhampoa.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '565288';

-- 港青基信幼兒學校（農圃道） (565520)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=565520',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kowloon%20City_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/565520.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/YMCAHK_FarmRd.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/YMCAHK_FarmRd.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '565520';

-- 美雅幼兒園 (565687)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=565687',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kowloon%20City_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/565687.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/MayNga_Nur.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/MayNga_Nur.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '565687';

-- 路德會包美達幼兒園 (565695)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=565695',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kowloon%20City_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/565695.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/MarthaBoss_Lutheran.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/MarthaBoss_Lutheran.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '565695';

-- 耀中國際幼稚園（窩打老道） (566110)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=566110',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/566110.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '566110';

-- 耀中國際幼稚園（根德道） (566128)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=566128',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/566128.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '566128';

-- 保良局陳黎惠蓮幼稚園 (566691)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=566691',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kowloon%20City_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/566691.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PLK_ChanLaiWaiLin.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PLK_ChanLaiWaiLin.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '566691';

-- 維多利亞（何文田）國際幼兒園 (566900)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=566900',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/566900.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '566900';

-- 耀中幼稚園（森麻實道） (567140)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=567140',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/567140.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '567140';

-- 民生書院幼稚園 (575410)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=575410',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/575410.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'http://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/MunSang.pdf',
  inspection_report_updated_at = CASE
    WHEN 'http://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/MunSang.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '575410';

-- 迦南幼稚園（黃埔花園） (575518)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=575518',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kowloon%20City_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/575518.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Cannan_Whampoa.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Cannan_Whampoa.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '575518';

-- YORK INTERNATIONAL PRE-SCHOOL (578479)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=578479',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/578479.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '578479';

-- 約克國際幼稚園 (581852)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=581852',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/581852.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '581852';

-- 文娜雅拔幼稚園 (584517)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=584517',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/584517.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '584517';

-- ST. CATHERINE'S KINDERGARTEN (HARBOUR PLACE) (586625)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=586625',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/586625.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '586625';

-- KOHITSUJI KINDERGARTEN (593630)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=593630',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/593630.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '593630';

-- 伽利利國際幼稚園 (597031)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=597031',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/597031.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '597031';

-- 聖姬莉國際幼稚園 (597538)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=597538',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'https://applications.edb.gov.hk/schoolsearch/schoolfee/597538.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '597538';

-- 新加坡卓薈國際幼稚園（界限街） (599182)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=599182',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/599182.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '599182';

-- 樂沛兒幼稚園 (599263)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=599263',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/599263.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '599263';

-- 港青基信幼稚園（啟晴） (599700)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=599700',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kowloon%20City_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/599700.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/YMCAHK_KaiChing.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/YMCAHK_KaiChing.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '599700';

-- 佛教陳策文伉儷幼稚園 (600890)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=600890',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kowloon%20City_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/600890.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Buddist_ChanChartMan.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Buddist_ChanChartMan.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '600890';

-- ABC PATHWAYS INTERNATIONAL KINDERGARTEN (WHAMPOA GARDEN) (603864)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=603864',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'https://applications.edb.gov.hk/schoolsearch/schoolfee/603864.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '603864';

-- 德萃幼稚園（紅磡） (604445)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=604445',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/604445.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '604445';

-- 九龍真光中學（幼稚園部） (607150)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=607150',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/607150.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '607150';

-- 學之園幼稚園（昇御海逸） (609528)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=609528',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'https://applications.edb.gov.hk/schoolsearch/schoolfee/609528.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '609528';

-- 瑪歌瑞特國際幼稚園 (610623)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=610623',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'https://applications.edb.gov.hk/schoolsearch/schoolfee/610623.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '610623';

-- 威廉（睿智）幼稚園（黃埔）（本地課程） (610771)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=610771',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kowloon%20City_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'https://applications.edb.gov.hk/schoolsearch/schoolfee/610771.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/William_Smart_WP.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/William_Smart_WP.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '610771';

-- 威廉（睿智）幼稚園（黃埔）（非本地課程） (610771)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=610771',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kowloon%20City_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'https://applications.edb.gov.hk/schoolsearch/schoolfee/610771.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '610771';

-- 漢師幼稚園（龍總） (616001)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=616001',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kowloon%20City_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'https://applications.edb.gov.hk/schoolsearch/schoolfee/616001.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKVNS_KCC.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKVNS_KCC.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '616001';

-- 茵晴幼稚園 (617741)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=617741',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kowloon%20City_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'https://applications.edb.gov.hk/schoolsearch/schoolfee/617741.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '617741';

-- 維多利亞（何文田）國際幼稚園 (618039)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=618039',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'https://applications.edb.gov.hk/schoolsearch/schoolfee/618039.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '618039';

-- 聖公會荊冕堂士德幼稚園 (153087)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=153087',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwai%20Chung%20and%20Tsing%20Yi_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/153087.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SKHCTC_Sadick.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SKHCTC_Sadick.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '153087';

-- 葵涌浸信會幼稚園 (155560)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=155560',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwai%20Chung%20and%20Tsing%20Yi_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/155560.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/KwaiChung_BaptistCh.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/KwaiChung_BaptistCh.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '155560';

-- 樂景幼稚園 (156205)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=156205',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwai%20Chung%20and%20Tsing%20Yi_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/156205.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/LokKing.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/LokKing.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '156205';

-- 富瑤幼稚園 (156272)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=156272',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwai%20Chung%20and%20Tsing%20Yi_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/156272.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/FuYiu.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/FuYiu.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '156272';

-- 聖斯德望天主教幼稚園 (156841)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=156841',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwai%20Chung%20and%20Tsing%20Yi_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/156841.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/StStephen_Catholic.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/StStephen_Catholic.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '156841';

-- 嘉言中英文幼稚園 (157643)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=157643',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwai%20Chung%20and%20Tsing%20Yi_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/157643.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Greenville_AC.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Greenville_AC.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '157643';

-- 救世軍富強幼稚園 (157678)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=157678',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwai%20Chung%20and%20Tsing%20Yi_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/157678.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SA_FuKeung.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SA_FuKeung.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '157678';

-- 保良局田家炳幼稚園 (157813)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=157813',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwai%20Chung%20and%20Tsing%20Yi_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/157813.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PLK_TingKaPing.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PLK_TingKaPing.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '157813';

-- 路德會恩石幼稚園 (157856)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=157856',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwai%20Chung%20and%20Tsing%20Yi_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/157856.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/RockOfAge_Lutheran.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/RockOfAge_Lutheran.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '157856';

-- 青衣商會幼稚園 (158070)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=158070',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/158070.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TYTA.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TYTA.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '158070';

-- 保良局曹金霖夫人幼稚園 (158453)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=158453',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwai%20Chung%20and%20Tsing%20Yi_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/158453.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PLK_MrsCKL.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PLK_MrsCKL.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '158453';

-- 伊斯蘭博愛幼稚園 (158461)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=158461',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwai%20Chung%20and%20Tsing%20Yi_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/158461.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/IslamicPokOi.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/IslamicPokOi.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '158461';

-- 保良局張心瑜幼稚園 (158488)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=158488',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwai%20Chung%20and%20Tsing%20Yi_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/158488.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PLK_TingMau.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PLK_TingMau.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '158488';

-- 荃灣商會鍾來幼稚園 (158640)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=158640',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwai%20Chung%20and%20Tsing%20Yi_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/158640.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TWTA_ChungLoi.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TWTA_ChungLoi.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '158640';

-- 香港聖公會基督顯現堂幼稚園 (159000)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=159000',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwai%20Chung%20and%20Tsing%20Yi_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/159000.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SKHCTC_TY.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SKHCTC_TY.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '159000';

-- 荃灣商會朱昌幼稚園 (159026)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=159026',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwai%20Chung%20and%20Tsing%20Yi_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/159026.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TWTA_ChuCheong.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TWTA_ChuCheong.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '159026';

-- 仁愛堂彭鴻樟幼稚園 (159093)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=159093',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwai%20Chung%20and%20Tsing%20Yi_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/159093.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/YOT_PangHungCheung.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/YOT_PangHungCheung.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '159093';

-- 卓思英文學校暨幼稚園（青怡分校） (231240)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=231240',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwai%20Chung%20and%20Tsing%20Yi_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/231240.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Choice_TY.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Choice_TY.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '231240';

-- 太陽島英文幼稚園（葵興分校） (231347)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=231347',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwai%20Chung%20and%20Tsing%20Yi_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/231347.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SI_KwaiHing.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SI_KwaiHing.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '231347';

-- 康傑中英文幼稚園（青衣） (231614)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=231614',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/231614.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '231614';

-- 循道衛理聯合教會亞斯理幼稚園 (510726)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=510726',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwai%20Chung%20and%20Tsing%20Yi_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/510726.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Asbury_Methodist.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Asbury_Methodist.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '510726';

-- 荃灣商會邱健峰幼稚園 (518077)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=518077',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwai%20Chung%20and%20Tsing%20Yi_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/518077.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TWTA_YauKinFung.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TWTA_YauKinFung.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '518077';

-- 宏福中英文幼稚園 (519103)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=519103',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwai%20Chung%20and%20Tsing%20Yi_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/519103.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Tivoli_AC.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Tivoli_AC.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '519103';

-- 聖公會荊冕堂葵涌幼稚園 (526665)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=526665',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwai%20Chung%20and%20Tsing%20Yi_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/526665.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SKHCTC_KC.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SKHCTC_KC.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '526665';

-- 葵盛禮賢會幼稚園 (528153)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=528153',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwai%20Chung%20and%20Tsing%20Yi_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/528153.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/KwaiShingRenishCh.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/KwaiShingRenishCh.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '528153';

-- 天主教聖多默幼稚園 (532533)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=532533',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwai%20Chung%20and%20Tsing%20Yi_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/532533.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/StThomas_Catholic.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/StThomas_Catholic.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '532533';

-- 英基國際幼稚園（青衣） (532541)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=532541',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/532541.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '532541';

-- 學之園幼稚園 (534200)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=534200',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/534200.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '534200';

-- 啓思幼稚園（青衣） (534226)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=534226',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwai%20Chung%20and%20Tsing%20Yi_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/534226.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Creative_TsingYi.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Creative_TsingYi.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '534226';

-- 主蔭幼稚園 (540498)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=540498',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwai%20Chung%20and%20Tsing%20Yi_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/540498.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Anani.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Anani.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '540498';

-- 東華三院王胡麗明幼稚園 (542547)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=542547',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwai%20Chung%20and%20Tsing%20Yi_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/542547.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TWGH_WongWuLaiMing.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TWGH_WongWuLaiMing.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '542547';

-- 保良局譚華正夫人幼稚園 (542768)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=542768',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwai%20Chung%20and%20Tsing%20Yi_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/542768.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PLK_MrsTamWahChing.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PLK_MrsTamWahChing.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '542768';

-- 平安福音堂幼稚園（青衣） (546127)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=546127',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwai%20Chung%20and%20Tsing%20Yi_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/546127.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PEC_TY.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PEC_TY.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '546127';

-- 荃浸石籬幼稚園 (549355)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=549355',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwai%20Chung%20and%20Tsing%20Yi_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/549355.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TWBC_ShekLei.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TWBC_ShekLei.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '549355';

-- 中華基督教會全完幼稚園 (559962)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=559962',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwai%20Chung%20and%20Tsing%20Yi_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/559962.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CCC_ChuenYuen.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CCC_ChuenYuen.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '559962';

-- 救世軍大窩口幼兒學校 (563099)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=563099',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwai%20Chung%20and%20Tsing%20Yi_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/563099.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SA_TWH.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SA_TWH.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '563099';

-- 仁濟醫院裘錦秋幼稚園 (563374)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=563374',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwai%20Chung%20and%20Tsing%20Yi_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/563374.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/YCH_JuChingChu.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/YCH_JuChingChu.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '563374';

-- 仁濟醫院九龍崇德社幼稚園 (563382)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=563382',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwai%20Chung%20and%20Tsing%20Yi_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/563382.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/YCH_ZontaClubKln.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/YCH_ZontaClubKln.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '563382';

-- 仁濟醫院董伯英幼稚園 (563404)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=563404',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwai%20Chung%20and%20Tsing%20Yi_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/563404.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/YCH_TungPakYing.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/YCH_TungPakYing.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '563404';

-- 保良局李俊駒伉儷幼稚園 (563994)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=563994',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwai%20Chung%20and%20Tsing%20Yi_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/563994.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PLK_KwaiShing.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PLK_KwaiShing.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '563994';

-- 東華三院香港鑪峯獅子會幼兒園 (564141)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=564141',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwai%20Chung%20and%20Tsing%20Yi_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/564141.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TWGH_LionsClubThePeakHK.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TWGH_LionsClubThePeakHK.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '564141';

-- 禮賢會荔景幼兒園 (564630)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=564630',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwai%20Chung%20and%20Tsing%20Yi_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/564630.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/LaiKing_Rhenish.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/LaiKing_Rhenish.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '564630';

-- 中華基督教青年會葵涌幼稚園 (564680)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=564680',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwai%20Chung%20and%20Tsing%20Yi_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/564680.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CYMCA_KwaiChung.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CYMCA_KwaiChung.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '564680';

-- 基督教香港信義會靈工幼兒學校 (564842)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=564842',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwai%20Chung%20and%20Tsing%20Yi_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/564842.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/ELCHK_LingKung.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/ELCHK_LingKung.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '564842';

-- 香港聖公會麥理浩夫人中心〈石蔭〉幼稚園 (564893)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=564893',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwai%20Chung%20and%20Tsing%20Yi_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/564893.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SKH_LadyMaclehoseCtr_SY.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SKH_LadyMaclehoseCtr_SY.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '564893';

-- 香港聖公會麥理浩夫人中心幼稚園 (564907)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=564907',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwai%20Chung%20and%20Tsing%20Yi_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/564907.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SKH_LadyMaclehoseCtr.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SKH_LadyMaclehoseCtr.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '564907';

-- 基督教香港信義會天恩幼兒學校 (565571)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=565571',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwai%20Chung%20and%20Tsing%20Yi_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/565571.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/ELCHK_Grace.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/ELCHK_Grace.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '565571';

-- 路德會青衣城幼兒園 (565709)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=565709',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwai%20Chung%20and%20Tsing%20Yi_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/565709.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/MaritimeSq_Lutheran.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/MaritimeSq_Lutheran.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '565709';

-- 路德會長青幼兒園 (565733)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=565733',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwai%20Chung%20and%20Tsing%20Yi_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/565733.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CheungChing_Lutheran.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CheungChing_Lutheran.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '565733';

-- 世佛會文殊幼兒學校 (565903)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=565903',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwai%20Chung%20and%20Tsing%20Yi_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/565903.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/WFB_Manjusri.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/WFB_Manjusri.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '565903';

-- 新界婦孺福利會長發幼兒學校 (566322)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=566322',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwai%20Chung%20and%20Tsing%20Yi_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/566322.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/NTWJWA_CheungFatEst.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/NTWJWA_CheungFatEst.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '566322';

-- 保良局呂陳慧貞（葵芳）幼稚園 (566675)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=566675',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwai%20Chung%20and%20Tsing%20Yi_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/566675.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PLK_KwaiFong.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PLK_KwaiFong.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '566675';

-- 聖公會聖基道幼兒園（葵涌） (568104)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=568104',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwai%20Chung%20and%20Tsing%20Yi_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/568104.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SKH_StChristophers_KwaiChung.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SKH_StChristophers_KwaiChung.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '568104';

-- 善正幼稚園 (582530)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=582530',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwai%20Chung%20and%20Tsing%20Yi_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/582530.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SinChing.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SinChing.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '582530';

-- 康傑中英文幼稚園（青衣南） (609919)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=609919',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'https://applications.edb.gov.hk/schoolsearch/schoolfee/609919.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '609919';

-- 協康會上海總會康苗幼稚園 (612561)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=612561',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwai%20Chung%20and%20Tsing%20Yi_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'https://applications.edb.gov.hk/schoolsearch/schoolfee/612561.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HHSSFA_Healthy.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HHSSFA_Healthy.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '612561';

-- 奧基英文幼稚園 (622982)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=622982',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'https://applications.edb.gov.hk/schoolsearch/schoolfee/622982.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '622982';

-- 宏福幼稚園（青富） (623474)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=623474',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwai%20Chung%20and%20Tsing%20Yi_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'https://applications.edb.gov.hk/schoolsearch/schoolfee/623474.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '623474';

-- 香港基督教女青年會青衣幼兒學校 (623598)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=623598',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwai%20Chung%20and%20Tsing%20Yi_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/623598.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '623598';

-- 迦南幼稚園（麗港城） (216054)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=216054',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwun%20Tong_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/216054.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Cannan_LagunaCity.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Cannan_LagunaCity.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '216054';

-- 朗思國際幼稚園 (216267)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=216267',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/216267.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '216267';

-- 香港路德會觀塘幼稚園 (311650)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=311650',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/311650.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKLC_KwunTong.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKLC_KwunTong.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '311650';

-- 聖巴拿巴堂幼稚園 (319562)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=319562',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwun%20Tong_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/319562.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/StBarnaba''sCh.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/StBarnaba''sCh.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '319562';

-- 觀塘循道幼稚園 (319775)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=319775',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwun%20Tong_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/319775.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/KTMethodist.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/KTMethodist.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '319775';

-- 鑽石山浸信會美欣幼稚園 (322580)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=322580',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/322580.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/DHBC_BrightBlossoms.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/DHBC_BrightBlossoms.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '322580';

-- 歡樂創意幼稚園（觀塘分校） (323055)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=323055',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwun%20Tong_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/323055.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PS_Kingsland.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PS_Kingsland.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '323055';

-- 中華基督教會基法幼稚園 (323250)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=323250',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwun%20Tong_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/323250.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CCC_KeiFaat.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CCC_KeiFaat.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '323250';

-- 佛教金麗幼稚園 (323497)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=323497',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwun%20Tong_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/323497.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Buddhist_KamLai.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Buddhist_KamLai.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '323497';

-- 官塘浸信會幼稚園 (324248)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=324248',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwun%20Tong_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/324248.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/KwunTong_BaptistCh.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/KwunTong_BaptistCh.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '324248';

-- 善一堂安逸幼稚園 (324426)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=324426',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwun%20Tong_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/324426.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SYT_OnYat.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SYT_OnYat.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '324426';

-- 德福幼稚園（非本地課程） (324736)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=324736',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwun%20Tong_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/324736.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TelfordGdn.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TelfordGdn.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '324736';

-- 德福幼稚園（本地課程） (324736)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=324736',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwun%20Tong_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/324736.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TelfordGdn.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TelfordGdn.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '324736';

-- 中華基督教會基華幼稚園 (324809)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=324809',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwun%20Tong_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/324809.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CCC_KeiWa.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CCC_KeiWa.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '324809';

-- 路德會沙崙堂幼稚園 (325236)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=325236',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwun%20Tong_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/325236.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Sharon_LutheranCh.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Sharon_LutheranCh.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '325236';

-- 基督教小天使（麗晶）幼稚園 (325244)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=325244',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwun%20Tong_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/325244.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CLAKG_RichlandGdn.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CLAKG_RichlandGdn.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '325244';

-- 天主教彩霞邨潔心幼稚園 (325694)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=325694',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwun%20Tong_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/325694.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/ChoiHaEst_KitSam.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/ChoiHaEst_KitSam.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '325694';

-- 天主教聖雅各伯幼稚園 (325708)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=325708',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwun%20Tong_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/325708.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/StJames_Catholic.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/StJames_Catholic.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '325708';

-- 路德會聖腓力堂幼稚園 (325732)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=325732',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwun%20Tong_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/325732.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/StPhilip_LutheranCh.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/StPhilip_LutheranCh.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '325732';

-- 康盈中英文幼稚園 (325791)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=325791',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwun%20Tong_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/325791.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HongYing.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HongYing.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '325791';

-- 啓思幼稚園（匯景花園）（非本地課程） (325864)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=325864',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwun%20Tong_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/325864.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Creative_ScenewayGdn.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Creative_ScenewayGdn.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '325864';

-- 啓思幼稚園（匯景花園）（本地課程） (325864)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=325864',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwun%20Tong_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/325864.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Creative_ScenewayGdn.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Creative_ScenewayGdn.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '325864';

-- 聖公會慈光堂聖匠幼稚園 (325937)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=325937',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwun%20Tong_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/325937.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SKH_KLC_HolyCarpenter.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SKH_KLC_HolyCarpenter.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '325937';

-- 保良局方王錦全幼稚園 (516309)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=516309',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwun%20Tong_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/516309.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PLK_MrsFongWongKamChuen.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PLK_MrsFongWongKamChuen.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '516309';

-- 東華三院黃士心幼稚園 (517127)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=517127',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwun%20Tong_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/517127.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TWGH_WongSeeSum.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TWGH_WongSeeSum.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '517127';

-- 中華傳道會基石幼稚園 (522910)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=522910',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwun%20Tong_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/522910.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CNEC_Christian.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CNEC_Christian.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '522910';

-- 宣道會秀茂坪陳李詠貞幼稚園 (523178)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=523178',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwun%20Tong_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/523178.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CA_SMP_ChenLeeWingTsing.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CA_SMP_ChenLeeWingTsing.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '523178';

-- 救世軍平田幼稚園 (523364)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=523364',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwun%20Tong_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/523364.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SA_PingTin.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SA_PingTin.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '523364';

-- 路德會陳蒙恩幼稚園 (523895)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=523895',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwun%20Tong_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/523895.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/ChanMungYan_Lutheran.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/ChanMungYan_Lutheran.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '523895';

-- 藍田靈糧幼稚園 (524034)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=524034',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwun%20Tong_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/524034.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/LamTin_LingLiang.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/LamTin_LingLiang.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '524034';

-- 圓玄幼稚園（平田邨） (528366)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=528366',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwun%20Tong_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/528366.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/YY_PingTin.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/YY_PingTin.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '528366';

-- 聖安當幼稚園 (532169)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=532169',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwun%20Tong_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/532169.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/StAntonius.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/StAntonius.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '532169';

-- 順德聯誼總會梁潔華幼稚園 (543390)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=543390',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwun%20Tong_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/543390.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/STFA_LeungKitWah.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/STFA_LeungKitWah.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '543390';

-- 樂善堂文吳泳沂幼稚園 (546038)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=546038',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwun%20Tong_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/546038.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/LST_ManNgWingYee.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/LST_ManNgWingYee.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '546038';

-- 鯉魚門循道衞理幼稚園 (548278)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=548278',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwun%20Tong_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/548278.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/LeiYueMun_Methodist.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/LeiYueMun_Methodist.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '548278';

-- 平安福音堂幼稚園（牛頭角） (550663)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=550663',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwun%20Tong_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/550663.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PEC_NTK.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PEC_NTK.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '550663';

-- 晶晶幼稚園（順利分校） (550892)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=550892',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwun%20Tong_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/550892.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/JJ_ShunLee.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/JJ_ShunLee.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '550892';

-- 香港小童群益會樂緻幼稚園（九龍灣） (563455)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=563455',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwun%20Tong_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/563455.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/BGCAHK_Cheerland_KlnBay.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/BGCAHK_Cheerland_KlnBay.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '563455';

-- 天主教聖雲先幼兒學校 (563510)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=563510',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwun%20Tong_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/563510.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/StVincent_DePaul.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/StVincent_DePaul.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '563510';

-- 東華三院陳嫺幼兒園 (563536)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=563536',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwun%20Tong_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/563536.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TWGH_ChanHan.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TWGH_ChanHan.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '563536';

-- 新九龍婦女會樂華幼兒園 (563609)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=563609',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwun%20Tong_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/563609.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/NKWA_LokWah.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/NKWA_LokWah.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '563609';

-- 保良局吳寶玲幼稚園 (563730)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=563730',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwun%20Tong_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/563730.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PLK_KwunTong.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PLK_KwunTong.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '563730';

-- 基督教香港崇真會安怡幼兒學校 (563749)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=563749',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwun%20Tong_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/563749.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TTMHK_OnYee.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TTMHK_OnYee.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '563749';

-- 保良局黃樹雄幼稚園 (563790)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=563790',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwun%20Tong_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/563790.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PLK_PingShek.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PLK_PingShek.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '563790';

-- 保良局李筱參幼稚園 (563935)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=563935',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwun%20Tong_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/563935.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PLK_LeeSiuChan.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PLK_LeeSiuChan.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '563935';

-- 保良局鄭關巧妍幼稚園 (563951)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=563951',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwun%20Tong_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/563951.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PLK_ChengKwanHowYin.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PLK_ChengKwanHowYin.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '563951';

-- 博愛醫院陳徐鳳蘭幼稚園 (564036)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=564036',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwun%20Tong_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/564036.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/POH_ChanHsuFongLam.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/POH_ChanHsuFongLam.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '564036';

-- 聖母潔心會福音秀茂坪幼稚園 (564389)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=564389',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwun%20Tong_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/564389.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SIHMG_SMP.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SIHMG_SMP.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '564389';

-- 禮賢會順天幼兒園 (564486)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=564486',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwun%20Tong_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/564486.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/ShunTin_Rhenish.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/ShunTin_Rhenish.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '564486';

-- 基督教香港信義會啟業幼兒學校 (564575)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=564575',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwun%20Tong_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/564575.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/LPH_KaiYip.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/LPH_KaiYip.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '564575';

-- 基督教家庭服務中心德田幼稚園 (564656)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=564656',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwun%20Tong_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/564656.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CFSC_TakTin.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CFSC_TakTin.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '564656';

-- 基督教家庭服務中心趣樂幼稚園 (564664)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=564664',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwun%20Tong_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/564664.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CFSC_Cheerland.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CFSC_Cheerland.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '564664';

-- 基督教香港信義會靈安幼兒學校 (564834)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=564834',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwun%20Tong_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/564834.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/ELCHK_LingOn.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/ELCHK_LingOn.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '564834';

-- 香港保護兒童會譚雅士伉儷幼兒學校 (565210)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=565210',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwun%20Tong_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/565210.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKSPC_Mr&MrsThomasTam.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKSPC_Mr&MrsThomasTam.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '565210';

-- 花園大廈浸信會幼兒學校 (565369)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=565369',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwun%20Tong_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/565369.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/GardenEstBaptist.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/GardenEstBaptist.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '565369';

-- 香港基督教服務處觀塘幼兒學校 (565415)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=565415',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwun%20Tong_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/565415.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKCS_KwunTong.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKCS_KwunTong.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '565415';

-- 佛教慈慧幼兒園 (565946)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=565946',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwun%20Tong_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/565946.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Buddhist_ChiWai.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Buddhist_ChiWai.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '565946';

-- 明愛鯉魚門幼兒學校 (565962)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=565962',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwun%20Tong_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/565962.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Caritas_LYM.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Caritas_LYM.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '565962';

-- 明愛油塘幼兒學校 (566004)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=566004',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwun%20Tong_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/566004.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Caritas_YauTong.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Caritas_YauTong.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '566004';

-- 啓思幼兒園（匯景） (566071)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=566071',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwun%20Tong_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/566071.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Creative_Sceneway.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Creative_Sceneway.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '566071';

-- 香港學生輔助會寶達幼兒園 (566160)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=566160',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwun%20Tong_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/566160.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKSAS_PoTat.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKSAS_PoTat.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '566160';

-- 博愛醫院施淑鎮幼稚園 (566683)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=566683',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwun%20Tong_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/566683.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/POH_SySiokChun.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/POH_SySiokChun.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '566683';

-- 基督教聯合醫務協會幼兒學校 (566950)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=566950',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwun%20Tong_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/566950.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/UC_MedicalService.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/UC_MedicalService.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '566950';

-- 基督教小樹苗幼稚園 (577987)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=577987',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwun%20Tong_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/577987.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/ChrLittleTree.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/ChrLittleTree.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '577987';

-- 楓葉小熊加拿大國際幼稚園（油塘） (593788)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=593788',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/593788.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '593788';

-- 香港青年協會鄭堅固幼稚園 (594130)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=594130',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwun%20Tong_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/594130.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKFYG_KKCheng.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKFYG_KKCheng.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '594130';

-- 救世軍中原慈善基金油塘幼稚園 (595365)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=595365',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwun%20Tong_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/595365.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SA_CCF_YauTong.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SA_CCF_YauTong.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '595365';

-- 基督教中心幼稚園（油塘） (595837)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=595837',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwun%20Tong_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/595837.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CYC_YauTong.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CYC_YauTong.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '595837';

-- 德福英文幼稚園 (601985)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=601985',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/601985.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '601985';

-- 保良局李樹福幼稚園 (604259)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=604259',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwun%20Tong_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/604259.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PLK_LeeShuFook.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PLK_LeeShuFook.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '604259';

-- 東華三院何藍瓊纓幼稚園 (605530)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=605530',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwun%20Tong_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/605530.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TWGH_LucinaLaamHo.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TWGH_LucinaLaamHo.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '605530';

-- 香港基督教服務處雋樂幼稚園 (605662)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=605662',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwun%20Tong_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/605662.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKCS_Pario.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKCS_Pario.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '605662';

-- 聖公會慈光堂聖匠幼稚園（分校） (607886)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=607886',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwun%20Tong_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'https://applications.edb.gov.hk/schoolsearch/schoolfee/607886.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SKH_KLC_HolyCarpenter_Br.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SKH_KLC_HolyCarpenter_Br.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '607886';

-- 基督教家庭服務中心楊蔡慧嫻紀念幼稚園 (610291)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=610291',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwun%20Tong_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'https://applications.edb.gov.hk/schoolsearch/schoolfee/610291.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CFSC_YeohChoyWaiHaan.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CFSC_YeohChoyWaiHaan.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '610291';

-- 光愛樂幼稚園（安泰） (613509)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=613509',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwun%20Tong_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'https://applications.edb.gov.hk/schoolsearch/schoolfee/613509.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/LL_HomeHappy_OT.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/LL_HomeHappy_OT.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '613509';

-- 基督教宣道會安泰幼稚園 (614114)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=614114',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwun%20Tong_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'https://applications.edb.gov.hk/schoolsearch/schoolfee/614114.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CMA_OnTai.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CMA_OnTai.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '614114';

-- 哈羅小獅幼稚園 (627275)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=627275',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'https://applications.edb.gov.hk/schoolsearch/schoolfee/627275.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '627275';

-- 上水堂幼稚園 (150843)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=150843',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/North_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/150843.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SheungShuiCh.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SheungShuiCh.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '150843';

-- 粉嶺神召會幼稚園 (153451)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=153451',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/North_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/153451.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/FL_AOG.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/FL_AOG.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '153451';

-- 金錢村何東幼稚園 (156191)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=156191',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/North_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/156191.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/KTV_HoTung.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/KTV_HoTung.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '156191';

-- 粉嶺浸信會呂明才幼稚園 (156230)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=156230',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/North_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/156230.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/FL_BaptistCh_LuiMingChoi.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/FL_BaptistCh_LuiMingChoi.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '156230';

-- 佛教沈東福幼稚園 (157252)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=157252',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/North_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/157252.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Buddhist_SumTungFook.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Buddhist_SumTungFook.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '157252';

-- 上水禮賢會幼稚園 (157406)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=157406',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/North_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/157406.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SS_RenishCh.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SS_RenishCh.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '157406';

-- 基督教香港信義會祥華幼稚園 (157627)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=157627',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/North_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/157627.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/ELCHK_CheungWah.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/ELCHK_CheungWah.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '157627';

-- 基督教香港信義會祥華幼稚園 (157627)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=157627',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/North_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/157627.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/ELCHK_CheungWah.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/ELCHK_CheungWah.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '157627';

-- 神召會華人同工聯會彩蒲幼稚園 (157791)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=157791',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/North_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/157791.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CCWF_ChoiPo.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CCWF_ChoiPo.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '157791';

-- 上水惠州幼稚園（分校） (158208)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=158208',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/North_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/158208.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SS_WaiChow_Br.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SS_WaiChow_Br.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '158208';

-- 鳳溪幼稚園 (158364)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=158364',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/North_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/158364.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/FungKai.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/FungKai.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '158364';

-- 東華三院徐展堂幼稚園 (158534)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=158534',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/North_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/158534.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TWGH_TsuiTsinTong.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TWGH_TsuiTsinTong.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '158534';

-- 太平幼稚園 (158593)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=158593',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/North_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/158593.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TaiPing.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TaiPing.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '158593';

-- 香海正覺蓮社佛教慧光幼稚園 (158720)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=158720',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/North_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/158720.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HHCKLA_Buddhist_WaiKwong.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HHCKLA_Buddhist_WaiKwong.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '158720';

-- 基督徒信望愛堂華明幼稚園 (158763)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=158763',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/158763.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CFHLC_WahMing.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CFHLC_WahMing.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '158763';

-- 保良局莊啓程夫人幼稚園 (158780)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=158780',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/North_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/158780.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PLK_MrsVicwoodKTChong.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PLK_MrsVicwoodKTChong.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '158780';

-- 明愛聖方濟各幼稚園 (320544)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=320544',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/North_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'https://applications.edb.gov.hk/schoolsearch/schoolfee/320544.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Caritas_StFrancis.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Caritas_StFrancis.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '320544';

-- 東華三院文頴怡幼稚園 (325767)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=325767',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/North_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/325767.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TWGH_FongShuFookTong.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TWGH_FongShuFookTong.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '325767';

-- 保良局葉吳彬彬皇后山幼稚園 (516384)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=516384',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/North_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/516384.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PLK_YNBB_QueenHill.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PLK_YNBB_QueenHill.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '516384';

-- 九龍城浸信會嘉福幼稚園 (516627)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=516627',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/North_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/516627.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/KC_BaptistCh_KaFuk.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/KC_BaptistCh_KaFuk.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '516627';

-- 神召會華人同工聯會景盛幼稚園 (519090)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=519090',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/North_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/519090.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CCWF_KingShing.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CCWF_KingShing.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '519090';

-- 基督教粉嶺神召會恩光幼稚園 (519499)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=519499',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/North_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/519499.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/FAGC_GraceLight.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/FAGC_GraceLight.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '519499';

-- 牽晴間培元英文幼稚園 (536415)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=536415',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/North_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/536415.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/DawningViews_Elementi.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/DawningViews_Elementi.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '536415';

-- 真理浸信會何袁惠琼幼稚園 (536709)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=536709',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/North_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/536709.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TBC_HYWK.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TBC_HYWK.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '536709';

-- 香港五常法幼稚園 (537098)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=537098',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/North_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/537098.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HK5S.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HK5S.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '537098';

-- 香港道教聯合會蓬瀛通善皇后山幼稚園 (542326)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=542326',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/North_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'https://applications.edb.gov.hk/schoolsearch/schoolfee/542326.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKTA_QueensHill.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKTA_QueensHill.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '542326';

-- 救世軍天平幼兒學校 (563110)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=563110',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/North_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/563110.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SA_TingPing.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SA_TingPing.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '563110';

-- 嘉福浸信會幼兒園 (563285)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=563285',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/North_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/563285.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/KaFuk_Baptist.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/KaFuk_Baptist.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '563285';

-- 仁濟醫院永隆幼稚園 (563390)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=563390',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/North_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/563390.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/YCH_WingLung.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/YCH_WingLung.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '563390';

-- 東華三院洪王家琪幼兒園 (563544)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=563544',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/North_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/563544.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TWGH_HongWongKarGee.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TWGH_HongWongKarGee.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '563544';

-- 香港保護兒童會聖誕老人愛心粉嶺幼兒學校 (565202)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=565202',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/North_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/565202.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKSPC_SantaClaus_FL.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKSPC_SantaClaus_FL.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '565202';

-- 明愛打鼓嶺幼兒學校 (565989)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=565989',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/North_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/565989.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Caritas_TKL.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Caritas_TKL.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '565989';

-- 明愛香港崇德社幼兒學校 (566047)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=566047',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/North_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/566047.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Caritas_ZontaClubHK.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Caritas_ZontaClubHK.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '566047';

-- 瑪歌瑞特國際幼稚園（粉嶺） (566241)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=566241',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/566241.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '566241';

-- 新界婦孺福利會粉嶺幼兒學校 (566306)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=566306',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/North_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/566306.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/NTWJWA_FLChildren.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/NTWJWA_FLChildren.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '566306';

-- 新界婦孺福利會上水幼兒學校 (566330)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=566330',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/North_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/566330.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/NTWJWA_SSChildren.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/NTWJWA_SSChildren.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '566330';

-- 鄰舍輔導會粉嶺幼兒園 (566390)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=566390',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/North_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/566390.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/NAAC_FL.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/NAAC_FL.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '566390';

-- 香港宣教會優質幼兒學校 (569569)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=569569',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/North_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/569569.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKEC_Elite.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKEC_Elite.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '569569';

-- 中華基督教青年會上水幼稚園 (575429)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=575429',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/North_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/575429.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CYMCA_SS.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CYMCA_SS.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '575429';

-- 安基司幼稚園（粉嶺） (582417)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=582417',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/582417.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '582417';

-- 香海正覺蓮社佛教慧光嘉福幼稚園 (587141)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=587141',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/North_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/587141.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HHCKLA_Buddhist_WaiKwong_KaFuk.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HHCKLA_Buddhist_WaiKwong_KaFuk.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '587141';

-- 耀基創藝幼稚園 (587869)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=587869',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/North_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/587869.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/GloriaCreative.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/GloriaCreative.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '587869';

-- 耀基創藝幼稚園（上水） (597295)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=597295',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/North_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/597295.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/GloriaCreative_SS.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/GloriaCreative_SS.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '597295';

-- 麥克萊國際幼稚園 (601250)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=601250',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/601250.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '601250';

-- 西貢樂育幼稚園 (153036)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=153036',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sai%20Kung_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/153036.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SK_LokYuk.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SK_LokYuk.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '153036';

-- 保良局葉吳彬彬幼稚園 (158232)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=158232',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sai%20Kung_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/158232.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PLK_YipBunBun.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PLK_YipBunBun.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '158232';

-- 翠林邨浸信會幼稚園 (158470)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=158470',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sai%20Kung_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/158470.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TsuiLamEst_Baptist.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TsuiLamEst_Baptist.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '158470';

-- 崇真會美善幼稚園 (158526)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=158526',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sai%20Kung_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/158526.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TTM_Graceful.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TTM_Graceful.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '158526';

-- 香港浸信會聯會香港西北扶輪社幼稚園 (158739)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=158739',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sai%20Kung_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/158739.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/BCHK_RCHK_NW.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/BCHK_RCHK_NW.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '158739';

-- 將軍澳英皇幼稚園 (158771)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=158771',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sai%20Kung_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/158771.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/JB_Kingsland.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/JB_Kingsland.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '158771';

-- 東華三院力勤幼稚園 (158984)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=158984',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sai%20Kung_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/158984.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TWGH_Nickon.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TWGH_Nickon.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '158984';

-- 保良局方王換娣幼稚園 (159204)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=159204',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sai%20Kung_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/159204.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PLK_FongWongWoonTai.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PLK_FongWongWoonTai.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '159204';

-- 救世軍慶恩幼稚園 (159239)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=159239',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sai%20Kung_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/159239.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SA_HingYan.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SA_HingYan.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '159239';

-- 基督教宣道會香港區聯會將軍澳宣道幼稚園 (159255)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=159255',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sai%20Kung_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/159255.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CMACU_TKO_Alliance.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CMACU_TKO_Alliance.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '159255';

-- LYC'EE FRANCAIS INTERNATIONAL (FRENCH INTERNATIONAL SCHOOL) (214949)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=214949',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'https://applications.edb.gov.hk/schoolsearch/schoolfee/214949.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '214949';

-- 比華利中英文幼稚園 (231363)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=231363',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sai%20Kung_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/231363.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Beverly_AC.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Beverly_AC.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '231363';

-- SAI KUNG PRE-SCHOOL GROUP (231371)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=231371',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/231371.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '231371';

-- 香港神託會培恩幼稚園 (324957)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=324957',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sai%20Kung_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/324957.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Stewards_PooiYan.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Stewards_PooiYan.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '324957';

-- 香港華人基督會煜明幼稚園 (519634)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=519634',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sai%20Kung_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/519634.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKCCC_TheLight.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKCCC_TheLight.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '519634';

-- 綠茵英文（國際）幼稚園（將軍澳） (523984)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=523984',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/523984.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '523984';

-- 基督教宣道會茵怡幼稚園 (524026)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=524026',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sai%20Kung_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/524026.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CMAC_Verbena.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CMAC_Verbena.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '524026';

-- 太陽島英文幼稚園（西貢分校） (525731)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=525731',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sai%20Kung_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/525731.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SI_SaiKung.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SI_SaiKung.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '525731';

-- 嗇色園主辦可正幼稚園 (525758)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=525758',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sai%20Kung_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/525758.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HoChing_SSY.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HoChing_SSY.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '525758';

-- 中華基督教會香港志道堂基博幼稚園（將軍澳） (528609)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=528609',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sai%20Kung_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/528609.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CCC_ChiToCh_KeiPok.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CCC_ChiToCh_KeiPok.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '528609';

-- 德寶英文幼稚園（將軍澳） (530131)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=530131',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/530131.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '530131';

-- 德寶英文幼稚園（將軍澳） (530131)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=530131',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/530131.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '530131';

-- 將軍澳循道衛理幼稚園 (530417)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=530417',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sai%20Kung_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/530417.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TKO_Methodist.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TKO_Methodist.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '530417';

-- 新界婦孺福利會梁省德中英文幼稚園 (530735)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=530735',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sai%20Kung_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/530735.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/NTWJWA_LeungSingTak_SheungTakEst.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/NTWJWA_LeungSingTak_SheungTakEst.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '530735';

-- 小蜜蜂幼稚園 (532355)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=532355',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/532355.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '532355';

-- 基督教香港信義會將軍澳幼稚園 (533351)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=533351',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sai%20Kung_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/533351.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/ELCHK_TKO.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/ELCHK_TKO.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '533351';

-- 青衣商會將軍澳幼稚園 (534153)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=534153',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sai%20Kung_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/534153.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TTTA_TKO.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TTTA_TKO.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '534153';

-- 翠茵小宇宙幼稚園 (537527)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=537527',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/537527.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '537527';

-- 香港學堂國際學校 (539155)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=539155',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/539155.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '539155';

-- 仁愛堂鄧楊詠曼幼稚園 (540811)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=540811',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sai%20Kung_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/540811.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/YOT_DYWM.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/YOT_DYWM.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '540811';

-- 觀塘浸信會彩明幼稚園 (542830)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=542830',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sai%20Kung_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/542830.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/KTBC_ChoiMing.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/KTBC_ChoiMing.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '542830';

-- 英基雅柏國際幼稚園 (549240)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=549240',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/549240.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '549240';

-- 基督教樂道幼稚園 (554901)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=554901',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sai%20Kung_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/554901.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/LockTao_Christian.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/LockTao_Christian.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '554901';

-- 東華三院香港華都獅子會幼稚園 (559385)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=559385',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sai%20Kung_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/559385.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TWGH_LCMHK.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TWGH_LCMHK.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '559385';

-- 天主教聖安德肋幼稚園 (559768)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=559768',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sai%20Kung_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/559768.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/StAndewsCatholic.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/StAndewsCatholic.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '559768';

-- 救世軍明德幼兒學校 (563072)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=563072',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sai%20Kung_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/563072.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SA_MingTak.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SA_MingTak.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '563072';

-- 香港聖公會聖西門西貢幼兒學校 (563269)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=563269',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sai%20Kung_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/563269.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKSKH_StSimon_SK.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKSKH_StSimon_SK.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '563269';

-- 中國基督教播道會茵怡幼兒學校 (563340)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=563340',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sai%20Kung_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/563340.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/AEFCHK_EFCC_Verbena.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/AEFCHK_EFCC_Verbena.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '563340';

-- 中國基督教播道會厚恩堂厚恩幼兒學校 (563480)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=563480',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sai%20Kung_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/563480.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/AEFCHK_EFCC_AGC_AbundantGrace.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/AEFCHK_EFCC_AGC_AbundantGrace.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '563480';

-- 基督教聖約教會司務道幼稚園 (563498)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=563498',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sai%20Kung_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/563498.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/MCC_SisAnnies.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/MCC_SisAnnies.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '563498';

-- 保良局蔡繼有幼稚園 (563978)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=563978',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sai%20Kung_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/563978.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PLK_ChoiKaiYau.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PLK_ChoiKaiYau.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '563978';

-- LEAPFROG KINDERGARTEN (564770)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=564770',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/564770.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '564770';

-- 基督教香港信義會健明幼兒學校 (564818)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=564818',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sai%20Kung_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/564818.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/ELCHK_KinMing.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/ELCHK_KinMing.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '564818';

-- 香港保護兒童會維景灣幼兒學校 (565008)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=565008',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sai%20Kung_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/565008.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKSPC_OceanShores.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKSPC_OceanShores.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '565008';

-- 香港保護兒童會施吳淑敏幼兒學校 (565270)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=565270',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sai%20Kung_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/565270.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKSPC_SzeWuShuMin.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKSPC_SzeWuShuMin.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '565270';

-- 香港小童群益會樂緻幼稚園（將軍澳） (565458)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=565458',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sai%20Kung_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/565458.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/BGCAHK_Cheerland_TKO.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/BGCAHK_Cheerland_TKO.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '565458';

-- 路德會景林幼兒園 (565768)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=565768',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sai%20Kung_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/565768.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/KingLamLutheran.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/KingLamLutheran.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '565768';

-- 明愛翠林幼兒學校 (565997)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=565997',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sai%20Kung_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/565997.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Caritas_TsuiLam.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Caritas_TsuiLam.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '565997';

-- 竹園區神召會將軍澳康樂幼兒學校 (566586)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=566586',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sai%20Kung_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/566586.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PCHK_TKO.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PCHK_TKO.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '566586';

-- 德寶國際幼兒學校（將軍澳） (567108)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=567108',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/567108.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '567108';

-- 德寶國際幼兒學校（寶盈花園） (567116)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=567116',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/567116.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '567116';

-- GARDEN HOUSE WALDORF KINDERGARTEN (575755)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=575755',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/575755.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '575755';

-- GUIDEPOST MONTESSORI INTERNATIONAL PRE-SCHOOL (SAI KUNG) (578630)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=578630',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/578630.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '578630';

-- 博士山（香港）國際幼稚園 - 將軍澳 (581836)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=581836',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/581836.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '581836';

-- GUIDEPOST MONTESSORI INTERNATIONAL KINDERGARTEN (CLEARWATER BAY) (583774)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=583774',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/583774.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '583774';

-- 歡樂創意幼稚園 (592080)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=592080',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sai%20Kung_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/592080.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Bilok_Creative.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Bilok_Creative.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '592080';

-- 綠茵英文（國際）幼稚園（日出康城） (604372)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=604372',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/604372.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '604372';

-- 英藝幼稚園（將軍澳） (607258)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=607258',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/607258.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '607258';

-- NORD ANGLIA INTERNATIONAL PRE-SCHOOL (SAI KUNG) (608475)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=608475',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/608475.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '608475';

-- YORK MONTESSORI INTERNATIONAL PRE-SCHOOL (TSEUNG KWAN O) (609749)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=609749',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'https://applications.edb.gov.hk/schoolsearch/schoolfee/609749.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '609749';

-- 學之園幼稚園（海翩康城） (612391)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=612391',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'https://applications.edb.gov.hk/schoolsearch/schoolfee/612391.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '612391';

-- 樂必津法國幼稚園 (613088)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=613088',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/613088.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '613088';

-- 耀中國際幼稚園（將軍澳） (613517)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=613517',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'https://applications.edb.gov.hk/schoolsearch/schoolfee/613517.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '613517';

-- 楓葉小熊加拿大國際幼稚園 (613665)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=613665',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'https://applications.edb.gov.hk/schoolsearch/schoolfee/613665.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '613665';

-- INVICTUS KINDERGARTEN (615366)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=615366',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/615366.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '615366';

-- 楓葉小熊加拿大國際幼稚園（康城） (616311)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=616311',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sai%20Kung_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'https://applications.edb.gov.hk/schoolsearch/schoolfee/616311.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '616311';

-- 栢基幼稚園（康城） (616443)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=616443',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'https://applications.edb.gov.hk/schoolsearch/schoolfee/616443.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '616443';

-- 迦南幼稚園（將軍澳） (619787)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=619787',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sai%20Kung_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'https://applications.edb.gov.hk/schoolsearch/schoolfee/619787.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Cannan_TKO.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Cannan_TKO.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '619787';

-- 中華基督教會協和幼稚園 (132152)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=132152',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sham%20Shui%20Po_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/132152.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CCC_HipWoh.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CCC_HipWoh.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '132152';

-- 又一村學校 (133850)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=133850',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sham%20Shui%20Po_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/133850.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/YauYatChuen.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/YauYatChuen.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '133850';

-- 九龍禮賢學校 (138177)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=138177',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/138177.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'http://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Kln_Rhenish.pdf',
  inspection_report_updated_at = CASE
    WHEN 'http://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Kln_Rhenish.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '138177';

-- 地利亞英文小學暨幼稚園 (216208)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=216208',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sham%20Shui%20Po_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/216208.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/DeliaEngPriSchKG.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/DeliaEngPriSchKG.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '216208';

-- 深水埗浸信會幼稚園 (317403)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=317403',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sham%20Shui%20Po_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/317403.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SSP_BaptistCh.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SSP_BaptistCh.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '317403';

-- 中華基督教會深愛堂幼稚園 (319511)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=319511',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sham%20Shui%20Po_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/319511.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/ShumOiCh.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/ShumOiCh.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '319511';

-- 基督教挪威差會主辦信義中英文幼稚園 (323080)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=323080',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sham%20Shui%20Po_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/323080.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/NMS_Lutheran.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/NMS_Lutheran.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '323080';

-- 聖多馬堂幼稚園 (323357)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=323357',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sham%20Shui%20Po_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/323357.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/StThomasCh.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/StThomasCh.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '323357';

-- 宣美幼稚園 (323683)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=323683',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sham%20Shui%20Po_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/323683.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SuenMei.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SuenMei.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '323683';

-- 佳寶幼稚園 (324159)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=324159',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/324159.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/GuidePosts.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/GuidePosts.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '324159';

-- 西太平洋幼稚園 (324264)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=324264',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sham%20Shui%20Po_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/324264.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/WesternPacific.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/WesternPacific.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '324264';

-- 佛教曾果成中英文幼稚園 (324787)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=324787',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sham%20Shui%20Po_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/324787.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Buddhist_TsangKorSing.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Buddhist_TsangKorSing.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '324787';

-- 中華基督教會基真幼稚園 (324795)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=324795',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sham%20Shui%20Po_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/324795.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CCC_KeiChun.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CCC_KeiChun.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '324795';

-- 聖公會深水埗基愛堂幼稚園 (325252)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=325252',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sham%20Shui%20Po_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/325252.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SKH_SSP_KeiOiCh.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SKH_SSP_KeiOiCh.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '325252';

-- 德貞幼稚園 (325511)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=325511',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sham%20Shui%20Po_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/325511.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TackChing.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TackChing.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '325511';

-- 基督教香港信義會南昌幼稚園 (325635)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=325635',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sham%20Shui%20Po_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/325635.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/ELCHK_NamCheong.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/ELCHK_NamCheong.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '325635';

-- 深水埗德善幼稚園 (325830)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=325830',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sham%20Shui%20Po_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/325830.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SSP_TakShin.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SSP_TakShin.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '325830';

-- 香港基督教女青年會宏恩幼稚園 (325953)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=325953',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sham%20Shui%20Po_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/325953.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKYWCA_Athena.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKYWCA_Athena.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '325953';

-- 崇真小學暨幼稚園（非本地課程） (514659)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=514659',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sham%20Shui%20Po_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/514659.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '514659';

-- 崇真小學暨幼稚園（本地課程） (514659)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=514659',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sham%20Shui%20Po_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/514659.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TT_PriSch_KG.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TT_PriSch_KG.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '514659';

-- 智樂幼稚園 (532550)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=532550',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sham%20Shui%20Po_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/532550.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CheLok.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CheLok.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '532550';

-- 智樂幼稚園 (532550)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=532550',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sham%20Shui%20Po_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/532550.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CheLok.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CheLok.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '532550';

-- 宣道會雷蔡群樂幼稚園 (532800)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=532800',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sham%20Shui%20Po_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/532800.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CA_LoueyChoyKwanLok.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CA_LoueyChoyKwanLok.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '532800';

-- 崇真會白田美善幼稚園 (536482)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=536482',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sham%20Shui%20Po_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/536482.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TTM_PakTinGraceful.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TTM_PakTinGraceful.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '536482';

-- 保良局劉陳小寶幼稚園 (548723)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=548723',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sham%20Shui%20Po_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/548723.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PLK_LauChanSiuPo.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PLK_LauChanSiuPo.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '548723';

-- 救世軍白田幼兒學校 (563170)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=563170',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sham%20Shui%20Po_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/563170.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SA_PakTin.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SA_PakTin.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '563170';

-- 寶血幼稚園（深水埗） (564044)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=564044',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sham%20Shui%20Po_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/564044.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PreciousBlood_SSP.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PreciousBlood_SSP.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '564044';

-- 香港基督教女青年會紹邦幼兒學校 (564443)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=564443',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sham%20Shui%20Po_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/564443.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKYWCA_ShiuPong.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKYWCA_ShiuPong.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '564443';

-- 香港保護兒童會長沙灣幼兒學校 (564478)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=564478',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sham%20Shui%20Po_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/564478.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKSPC_CSW.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKSPC_CSW.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '564478';

-- 香港基督教女青年會趙靄華幼兒學校 (564516)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=564516',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sham%20Shui%20Po_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/564516.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKYWCA_ChiuOiWah.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKYWCA_ChiuOiWah.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '564516';

-- 香港聖公會基愛幼兒學校 (564729)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=564729',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sham%20Shui%20Po_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/564729.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKSKH_KeiOi.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKSKH_KeiOi.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '564729';

-- 香港基督教服務處大坑東幼兒學校 (565393)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=565393',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sham%20Shui%20Po_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/565393.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKCS_THT.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKCS_THT.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '565393';

-- 香港基督教服務處李鄭屋幼兒學校 (565407)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=565407',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sham%20Shui%20Po_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/565407.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKCS_LeiChengUk.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKCS_LeiChengUk.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '565407';

-- 浸信會愛羣社會服務處培殷幼兒學校 (565563)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=565563',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sham%20Shui%20Po_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/565563.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/BOKSS_PuiYan.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/BOKSS_PuiYan.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '565563';

-- 竹園區神召會南昌康樂幼兒學校 (566560)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=566560',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sham%20Shui%20Po_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/566560.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PCHK_NamCheong.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PCHK_NamCheong.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '566560';

-- 香港基督教服務處石硤尾幼兒學校 (566705)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=566705',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sham%20Shui%20Po_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/566705.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKCS_SKM.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKCS_SKM.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '566705';

-- 仁愛堂龐盧淑燕幼稚園 (567051)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=567051',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sham%20Shui%20Po_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/567051.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/YOT_PongLokShukYin.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/YOT_PongLokShukYin.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '567051';

-- 保良局梁安琪幼稚園 (596116)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=596116',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sham%20Shui%20Po_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/596116.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PLK_SKM.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PLK_SKM.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '596116';

-- 香港靈糧堂秀德幼稚園 (596787)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=596787',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sham%20Shui%20Po_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/596787.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'http://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/LingLiangCh_SauTak.pdf',
  inspection_report_updated_at = CASE
    WHEN 'http://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/LingLiangCh_SauTak.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '596787';

-- 香港靈糧堂秀德幼稚園（二校） (601861)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=601861',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sham%20Shui%20Po_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/601861.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/LingLiangCh_SauTak_2.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/LingLiangCh_SauTak_2.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '601861';

-- 雅士圖國際幼稚園 (604470)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=604470',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/604470.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '604470';

-- YORK MONTESSORI INTERNATIONAL PRE-SCHOOL (MEI FOO) (604615)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=604615',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/604615.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '604615';

-- 漢迪國際幼稚園 (607703)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=607703',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/607703.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '607703';

-- 朗思國際幼稚園（南昌） (612782)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=612782',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/612782.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '612782';

-- 基督教香港崇真會安康幼兒學校（順寧道） (613169)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=613169',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sham%20Shui%20Po_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'https://applications.edb.gov.hk/schoolsearch/schoolfee/613169.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TTMHK_OnHong.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TTMHK_OnHong.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '613169';

-- 學之園幼稚園（星匯居） (615250)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=615250',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'https://applications.edb.gov.hk/schoolsearch/schoolfee/615250.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '615250';

-- 東華三院譚錦球伉儷幼稚園 (615315)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=615315',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sham%20Shui%20Po_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'https://applications.edb.gov.hk/schoolsearch/schoolfee/615315.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TWGH_TamKamKau.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TWGH_TamKamKau.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '615315';

-- 救世軍蘇屋幼稚園 (615641)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=615641',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sham%20Shui%20Po_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'https://applications.edb.gov.hk/schoolsearch/schoolfee/615641.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SA_SoUk.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SA_SoUk.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '615641';

-- 佳寶幼稚園（南昌分校） (618527)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=618527',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sham%20Shui%20Po_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'https://applications.edb.gov.hk/schoolsearch/schoolfee/618527.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/GuidePost_NC.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/GuidePost_NC.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '618527';

-- 長沙灣街坊福利會林譚燕華幼稚園（麗翠苑） (620149)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=620149',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sham%20Shui%20Po_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'https://applications.edb.gov.hk/schoolsearch/schoolfee/620149.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '620149';

-- 樂善堂董清波幼稚園 (623580)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=623580',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sham%20Shui%20Po_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'https://applications.edb.gov.hk/schoolsearch/schoolfee/623580.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '623580';

-- 聖母無玷聖心幼稚園 (151009)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=151009',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sha%20Tin_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/151009.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/ImmaculateHeartMary.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/ImmaculateHeartMary.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '151009';

-- 基督教香港信義會沙田信義幼稚園 (151203)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=151203',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sha%20Tin_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/151203.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/ELCHK_ST_Lutheran.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/ELCHK_ST_Lutheran.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '151203';

-- 聖公會靈風堂幼稚園 (156493)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=156493',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sha%20Tin_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/156493.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SKH_HolySpiritCh_WoChe.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SKH_HolySpiritCh_WoChe.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '156493';

-- 東華三院廖恩德紀念幼稚園 (156752)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=156752',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sha%20Tin_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/156752.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TWGH_LiuYanTak.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TWGH_LiuYanTak.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '156752';

-- 保良局吳多泰幼稚園 (156779)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=156779',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sha%20Tin_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/156779.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PLK_NTT.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PLK_NTT.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '156779';

-- 救世軍田家炳幼稚園 (156973)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=156973',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sha%20Tin_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/156973.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SA_TinKaPing.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SA_TinKaPing.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '156973';

-- 中華基督教會沙田堂博康幼稚園 (157295)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=157295',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/157295.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CCC_STCh_PokHong.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CCC_STCh_PokHong.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '157295';

-- 東華三院馬陳景霞幼稚園 (157384)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=157384',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sha%20Tin_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/157384.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TWGH_ChanKingHar.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TWGH_ChanKingHar.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '157384';

-- 東華三院呂馮鳳紀念幼稚園 (157511)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=157511',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sha%20Tin_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/157511.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TWGH_LuiFungFaung.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TWGH_LuiFungFaung.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '157511';

-- 港九街坊婦女會孫方中幼稚園 (157597)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=157597',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sha%20Tin_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/157597.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKKKWA_SunFongChung.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKKKWA_SunFongChung.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '157597';

-- 樂善堂梁泳釗幼稚園 (157864)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=157864',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sha%20Tin_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/157864.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/LST_StephenLeung.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/LST_StephenLeung.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '157864';

-- 順德聯誼總會梁李秀娛沙田幼稚園 (158160)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=158160',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sha%20Tin_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/158160.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/STFA_LLSY_ST.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/STFA_LLSY_ST.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '158160';

-- 保良局馮梁結紀念幼稚園 (158240)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=158240',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sha%20Tin_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/158240.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PLK_FungLeungKit.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PLK_FungLeungKit.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '158240';

-- 真理浸信會幼稚園 (158259)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=158259',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sha%20Tin_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/158259.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TBC.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TBC.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '158259';

-- 平安福音堂幼稚園 (158429)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=158429',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sha%20Tin_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/158429.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PEC.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PEC.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '158429';

-- 九龍城浸信會禧年幼稚園 (158569)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=158569',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sha%20Tin_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/158569.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/KC_BaptistCh_HayNien.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/KC_BaptistCh_HayNien.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '158569';

-- 廣林浸信會呂郭碧鳳幼稚園 (158704)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=158704',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sha%20Tin_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/158704.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/KL_Baptist_LuiKwokPatFong.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/KL_Baptist_LuiKwokPatFong.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '158704';

-- 真理浸信會碧濤幼稚園 (158860)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=158860',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sha%20Tin_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/158860.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TBC_Pictorial.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TBC_Pictorial.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '158860';

-- 香港中文大學校友會聯會張煊昌幼稚園 (158887)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=158887',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sha%20Tin_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/158887.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CUHKFAA_ThomasCheung.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CUHKFAA_ThomasCheung.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '158887';

-- 香港神託會培真幼稚園 (159212)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=159212',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sha%20Tin_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/159212.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Stewards_PooiChun.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Stewards_PooiChun.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '159212';

-- 嘉德麗中英文幼稚園 (231266)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=231266',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/231266.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '231266';

-- 大衛幼稚園 (231517)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=231517',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/231517.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '231517';

-- 康傑中英文幼稚園（馬鞍山） (231657)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=231657',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/231657.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '231657';

-- 樂善堂李賢義幼稚園 (324884)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=324884',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sha%20Tin_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/324884.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/LST.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/LST.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '324884';

-- 馬鞍山靈糧幼稚園 (520071)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=520071',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sha%20Tin_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/520071.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/MOS_LingLiang.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/MOS_LingLiang.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '520071';

-- 基督教小天使（錦豐）幼稚園 (522678)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=522678',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sha%20Tin_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/522678.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CLA_KamFungCourt.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CLA_KamFungCourt.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '522678';

-- 樂基幼兒學校（駿景園） (522953)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=522953',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/522953.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '522953';

-- 基督教宣道會頌安幼稚園 (524328)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=524328',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sha%20Tin_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/524328.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CMA_JoyfulPeace.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CMA_JoyfulPeace.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '524328';

-- 合一堂單家傳紀念幼稚園 (524441)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=524441',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sha%20Tin_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/524441.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HYC_ShinKaChuen.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HYC_ShinKaChuen.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '524441';

-- 朗思國際幼稚園（馬鞍山） (533360)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=533360',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/533360.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '533360';

-- 啓思幼稚園（帝堡城） (537578)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=537578',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sha%20Tin_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/537578.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Creative_Castello.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Creative_Castello.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '537578';

-- 崇真會美善幼稚園（馬鞍山） (540579)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=540579',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sha%20Tin_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/540579.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TT_MissionGrace.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TT_MissionGrace.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '540579';

-- 基督教國際學校 - 幼稚園 (542598)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=542598',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/542598.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '542598';

-- 基督教神召會合一堂幼稚園 (543861)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=543861',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sha%20Tin_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/543861.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/AOG_UnionCh.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/AOG_UnionCh.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '543861';

-- 博士山（香港）國際幼稚園 (559415)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=559415',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/559415.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '559415';

-- 救世軍乙明幼兒學校 (562947)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=562947',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sha%20Tin_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/562947.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SA_JatMin.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SA_JatMin.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '562947';

-- 救世軍禾輋幼兒學校 (563153)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=563153',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sha%20Tin_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/563153.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SA_WoChe.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SA_WoChe.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '563153';

-- 香港基督教女青年會隆亨幼兒學校 (563234)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=563234',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sha%20Tin_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/563234.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKYWCA_LungHang.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKYWCA_LungHang.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '563234';

-- 新九龍婦女會沙角幼兒園 (563625)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=563625',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sha%20Tin_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/563625.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/NKWA_ShaKok.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/NKWA_ShaKok.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '563625';

-- 新九龍婦女會新翠幼兒園 (563633)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=563633',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sha%20Tin_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/563633.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/NKWA_SunChui.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/NKWA_SunChui.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '563633';

-- 藍如溪盛成皿教育基金邊陳之娟幼稚園 (563838)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=563838',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sha%20Tin_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/563838.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/AL&VSEF_DeliaPei.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/AL&VSEF_DeliaPei.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '563838';

-- 循理會白普理循理幼兒學校 (563854)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=563854',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sha%20Tin_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/563854.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/FMC_BradburyChunLei.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/FMC_BradburyChunLei.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '563854';

-- 沙田靈光幼兒學校 (563862)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=563862',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sha%20Tin_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/563862.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/EmmanuelCh_ST.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/EmmanuelCh_ST.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '563862';

-- 港九街坊婦女會丁孫慧珠幼稚園 (563900)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=563900',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sha%20Tin_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/563900.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKKKWA_TingSunHuiChiu.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKKKWA_TingSunHuiChiu.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '563900';

-- 東華三院南九龍獅子會幼兒園 (564109)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=564109',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sha%20Tin_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/564109.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TWGH_LionsClubSKln.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TWGH_LionsClubSKln.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '564109';

-- 港九街坊婦女會孫方中幼稚園（穗禾苑） (564320)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=564320',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sha%20Tin_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/564320.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKKKWA_SunFongChung_SuiWoCourt.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKKKWA_SunFongChung_SuiWoCourt.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '564320';

-- 基督教香港信義會愛鄰幼兒學校 (564559)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=564559',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sha%20Tin_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/564559.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/LPH_OiLun.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/LPH_OiLun.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '564559';

-- 真理浸信會榮光幼兒園 (564753)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=564753',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sha%20Tin_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/564753.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TBC_Glory.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TBC_Glory.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '564753';

-- 基督教香港信義會頌安幼兒學校 (564826)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=564826',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sha%20Tin_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/564826.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/ELCHK_ChungOn.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/ELCHK_ChungOn.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '564826';

-- 香港浸信會聯會利安幼兒園 (564923)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=564923',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sha%20Tin_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/564923.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/BCHK_LeeOn.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/BCHK_LeeOn.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '564923';

-- 康傑幼稚園〈馬鞍山〉 (565113)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=565113',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/565113.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '565113';

-- 香港保護兒童會賽馬會學心幼兒學校 (565261)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=565261',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sha%20Tin_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/565261.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKSPC_JockeyClubHokSum.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKSPC_JockeyClubHokSum.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '565261';

-- 保良局唐楚男（瀝源）幼稚園 (565326)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=565326',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sha%20Tin_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/565326.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PLK_LekYuen.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PLK_LekYuen.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '565326';

-- 恒安浸信會幼兒學校 (565431)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=565431',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sha%20Tin_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/565431.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HengOn_Baptist.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HengOn_Baptist.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '565431';

-- 基督教宣道會沙田幼兒學校 (565857)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=565857',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sha%20Tin_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/565857.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CMA_ST.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CMA_ST.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '565857';

-- 明愛沙田幼兒學校 (565970)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=565970',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sha%20Tin_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/565970.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Caritas_ST.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Caritas_ST.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '565970';

-- 新界婦孺福利會博康幼兒學校 (566314)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=566314',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sha%20Tin_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/566314.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/NTWJWAL_PokHongEst.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/NTWJWAL_PokHongEst.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '566314';

-- 救世軍中原慈善基金幼稚園 (576743)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=576743',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sha%20Tin_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/576743.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SA_CentalineCharityFund.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SA_CentalineCharityFund.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '576743';

-- 英基國際幼稚園（烏溪沙） (578509)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=578509',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/578509.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '578509';

-- 博士山（香港）國際幼稚園 - 火炭 (581739)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=581739',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/581739.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '581739';

-- 心怡天地幼稚園（沙田） (591777)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=591777',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/591777.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '591777';

-- 英藝幼稚園（沙田） (593680)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=593680',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/593680.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '593680';

-- 童樂天國際幼稚園 (598054)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=598054',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'https://applications.edb.gov.hk/schoolsearch/schoolfee/598054.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '598054';

-- 學之園幼稚園（迎海） (604291)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=604291',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/604291.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '604291';

-- 救世軍水泉澳幼稚園 (605620)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=605620',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sha%20Tin_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/605620.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SA_SCO.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SA_SCO.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '605620';

-- 基督教香港崇真會安頌幼稚園 (609137)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=609137',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sha%20Tin_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'https://applications.edb.gov.hk/schoolsearch/schoolfee/609137.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TTMHK_OnChung.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TTMHK_OnChung.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '609137';

-- 培僑國際幼稚園 (613916)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=613916',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'https://applications.edb.gov.hk/schoolsearch/schoolfee/613916.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '613916';

-- 香港基督教服務處雋樂幼稚園（沙田） (614106)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=614106',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sha%20Tin_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'https://applications.edb.gov.hk/schoolsearch/schoolfee/614106.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKCS_Pario_ST.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKCS_Pario_ST.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '614106';

-- 德萃幼稚園（馬鞍山） (616290)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=616290',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'https://applications.edb.gov.hk/schoolsearch/schoolfee/616290.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '616290';

-- 仁愛堂鄭丁港夫人幼稚園 (618594)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=618594',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sha%20Tin_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'https://applications.edb.gov.hk/schoolsearch/schoolfee/618594.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/YOT_MCTK.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/YOT_MCTK.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '618594';

-- 光愛樂幼稚園（顯徑） (621986)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=621986',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Sha%20Tin_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'https://applications.edb.gov.hk/schoolsearch/schoolfee/621986.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/LL_HomeHappy_HK.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/LL_HomeHappy_HK.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '621986';

-- 培僑國際幼稚園（碧濤花園） (622389)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=622389',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'https://applications.edb.gov.hk/schoolsearch/schoolfee/622389.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '622389';

-- 啟思中英文幼稚園（馬鞍山） (627178)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=627178',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'https://applications.edb.gov.hk/schoolsearch/schoolfee/627178.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '627178';

-- 德瑞國際學校 (214558)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=214558',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/214558.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '214558';

-- 聖文嘉中英文幼稚園 (215899)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=215899',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Southern_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/215899.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/StMonica''s_AC.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/StMonica''s_AC.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '215899';

-- 栢基國際幼稚園 (215937)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=215937',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/215937.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '215937';

-- 新加坡國際學校 (216003)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=216003',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/216003.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '216003';

-- 加拿大國際學校 (216011)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=216011',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/216011.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '216011';

-- 加拿大國際學校 (216011)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=216011',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'https://applications.edb.gov.hk/schoolsearch/schoolfee/216011.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '216011';

-- 聖文嘉中英文幼稚園（華貴邨） (216038)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=216038',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Southern_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/216038.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/StMonicas_WahKwai.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/StMonicas_WahKwai.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '216038';

-- 維多利亞（海怡）國際幼稚園 (216194)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=216194',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/216194.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '216194';

-- 天主教聖伯多祿幼稚園 (312134)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=312134',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Southern_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/312134.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/StPetersCatholic.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/StPetersCatholic.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '312134';

-- 聖德蘭幼稚園 (313637)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=313637',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Southern_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/313637.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/StTeresa.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/StTeresa.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '313637';

-- 嗇色園主辦可仁幼稚園 (324850)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=324850',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Southern_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/324850.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HoYan_SSY.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HoYan_SSY.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '324850';

-- 基督教海面傳道會仁愛幼稚園 (325570)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=325570',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Southern_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/325570.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKHMC_YanOi.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKHMC_YanOi.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '325570';

-- 右思維幼稚園 (325961)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=325961',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/325961.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '325961';

-- 聖公會聖彼得堂幼稚園（赤柱分校） (326003)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=326003',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Southern_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/326003.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/StPeterCh_Stanley.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/StPeterCh_Stanley.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '326003';

-- 香港仔浸信會白光幼稚園 (523089)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=523089',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Southern_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/523089.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/AberdeenBaptistCh_PakKwong.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/AberdeenBaptistCh_PakKwong.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '523089';

-- 東華三院田灣（一九九六至一九九七總理）幼稚園 (528161)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=528161',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Southern_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/528161.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TWGH_TinWan.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TWGH_TinWan.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '528161';

-- 蒙特梭利國際學校 (548430)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=548430',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/548430.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '548430';

-- 蒙特梭利國際學校 (548430)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=548430',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/548430.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '548430';

-- 啓思幼稚園（深灣軒） (560090)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=560090',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Southern_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/560090.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Creative_ShamWanTowers.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Creative_ShamWanTowers.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '560090';

-- 救世軍華富幼兒學校 (563145)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=563145',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Southern_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/563145.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SA_WahFu.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SA_WahFu.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '563145';

-- 香港西區婦女福利會鴨脷洲邨幼稚園 (563714)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=563714',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Southern_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/563714.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/WWCWDHK_ApLeiChau.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/WWCWDHK_ApLeiChau.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '563714';

-- 保良局莊啓程夫人（華貴）幼稚園 (563773)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=563773',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Southern_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/563773.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PLK_MrsVicwoodKTChong_WahKwai.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PLK_MrsVicwoodKTChong_WahKwai.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '563773';

-- 東華三院蕭旺李滿福幼兒園 (564184)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=564184',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Southern_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/564184.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TWGH_ShiuWongLeeMoonFook.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TWGH_ShiuWongLeeMoonFook.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '564184';

-- MONTESSORI FOR CHILDREN (NURSERY) (565466)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=565466',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/565466.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '565466';

-- 循道衛理田灣幼稚園 (565644)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=565644',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Southern_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/565644.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TinWan_Methodist.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TinWan_Methodist.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '565644';

-- 路德會利東幼兒園 (565750)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=565750',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Southern_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/565750.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/LeiTung_Lutheran.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/LeiTung_Lutheran.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '565750';

-- 基督教宣道會海怡幼兒學校 (565849)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=565849',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Southern_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/565849.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CMA_SouthHorizons.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CMA_SouthHorizons.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '565849';

-- 基督教宣道會利東幼兒學校 (565865)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=565865',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Southern_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/565865.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CMA_LeiTung.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CMA_LeiTung.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '565865';

-- MULBERRY HOUSE INTERNATIONAL KINDERGARTEN SOUTHSIDE (578053)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=578053',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/578053.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '578053';

-- GUIDEPOST MONTESSORI INTERNATIONAL KINDERGARTEN (POK FU LAM) (598089)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=598089',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/598089.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '598089';

-- GUIDEPOST MONTESSORI INTERNATIONAL PRE-SCHOOL (REPULSE BAY) (602256)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=602256',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/602256.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '602256';

-- 意大利國際幼稚園 (611646)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=611646',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'https://applications.edb.gov.hk/schoolsearch/schoolfee/611646.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '611646';

-- 大埔禮賢會幼稚園 (150860)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=150860',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tai%20Po_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/150860.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TP_RhenishCh.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TP_RhenishCh.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '150860';

-- 大埔禮賢會幼稚園 (150860)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=150860',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tai%20Po_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/150860.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TP_RhenishCh.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TP_RhenishCh.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '150860';

-- 大埔浸信會幼稚園 (151157)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=151157',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tai%20Po_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/151157.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TP_Baptist.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TP_Baptist.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '151157';

-- 東華三院洪王家琪幼稚園 (157309)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=157309',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tai%20Po_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/157309.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TWGH_HungWongKarGee.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TWGH_HungWongKarGee.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '157309';

-- 保良局鄧碧雲紀念幼稚園 (157449)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=157449',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tai%20Po_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/157449.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PLK_TangBikWan_Mem.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PLK_TangBikWan_Mem.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '157449';

-- 香港道教聯合會圓玄幼稚園（富善邨） (158062)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=158062',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tai%20Po_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/158062.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKTAYY_FuShinEst.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKTAYY_FuShinEst.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '158062';

-- 聖公會救主堂幼稚園 (158119)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=158119',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tai%20Po_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/158119.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SKH_ChOurSaviour.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SKH_ChOurSaviour.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '158119';

-- 基督教宣道會太和幼稚園 (158577)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=158577',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tai%20Po_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/158577.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CMAC_TW.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CMAC_TW.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '158577';

-- 天主教大埔幼稚園 (158585)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=158585',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tai%20Po_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/158585.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TaiPo_Catholic.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TaiPo_Catholic.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '158585';

-- 大埔商會幼稚園 (158828)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=158828',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/158828.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TaiPoMerchAsso.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TaiPoMerchAsso.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '158828';

-- 大埔循道衛理幼稚園 (158895)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=158895',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tai%20Po_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/158895.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TaiPo_Methodist.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TaiPo_Methodist.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '158895';

-- 富亨浸信會呂郭碧鳳幼稚園 (158909)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=158909',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tai%20Po_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/158909.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/FHB_LuiKwokPatFong.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/FHB_LuiKwokPatFong.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '158909';

-- 大埔浸信會幼稚園運頭塘邨分校 (159166)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=159166',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tai%20Po_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/159166.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TP_Baptist_WanTauTongEst.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TP_Baptist_WanTauTongEst.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '159166';

-- NORWEGIAN INTERNATIONAL SCHOOL (215520)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=215520',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/215520.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '215520';

-- INTERNATIONAL COLLEGE HONG KONG HONG LOK YUEN (KINDERGARTEN SECTION) (230944)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=230944',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/230944.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '230944';

-- 明雅中英文幼稚園 (231134)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=231134',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tai%20Po_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/231134.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Mink_AC.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Mink_AC.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '231134';

-- 安基司幼稚園 (536067)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=536067',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/536067.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '536067';

-- 英藝幼稚園 (537225)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=537225',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/537225.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '537225';

-- 香港教育大學幼兒發展中心（幼稚園部） (541613)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=541613',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/541613.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'http://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKIEd_ECLC_KG.pdf',
  inspection_report_updated_at = CASE
    WHEN 'http://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKIEd_ECLC_KG.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '541613';

-- 救世軍大元幼兒學校 (563102)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=563102',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tai%20Po_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/563102.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SA_TaiYuen.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SA_TaiYuen.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '563102';

-- 中國基督教播道會寶雅幼兒學校 (563471)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=563471',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tai%20Po_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/563471.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/AEFCHK_PoNga.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/AEFCHK_PoNga.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '563471';

-- 東華三院方麗明幼兒園 (563560)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=563560',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tai%20Po_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/563560.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TWGH_FongLaiMing.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TWGH_FongLaiMing.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '563560';

-- 保良局劉進幼稚園 (563722)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=563722',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tai%20Po_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/563722.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PLK_KwongFuk.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PLK_KwongFuk.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '563722';

-- 基督教香港崇真會安仁幼兒學校 (564087)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=564087',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tai%20Po_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/564087.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TTMHK_OnYan.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TTMHK_OnYan.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '564087';

-- 仁愛堂張慕良夫人幼稚園 (564281)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=564281',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tai%20Po_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/564281.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/YOT_MrsAugustaCheung.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/YOT_MrsAugustaCheung.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '564281';

-- 安基司國際幼兒園 (565199)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=565199',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/565199.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '565199';

-- 安基司國際幼兒園 (565199)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=565199',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/565199.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '565199';

-- 香港保護兒童會林護幼兒學校 (565237)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=565237',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tai%20Po_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/565237.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKSPC_LamWoo.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKSPC_LamWoo.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '565237';

-- 基督教宣道會寶湖幼兒學校 (565806)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=565806',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tai%20Po_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/565806.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CMAC_PloverCove.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CMAC_PloverCove.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '565806';

-- 竹園區神召會太和康樂幼兒學校 (566578)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=566578',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tai%20Po_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/566578.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PCHK_TaiWo.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PCHK_TaiWo.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '566578';

-- 明雅國際幼兒學校 (567027)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=567027',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/567027.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '567027';

-- 思百德國際幼稚園 (573973)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=573973',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/573973.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '573973';

-- 懋柏禮國際幼稚園 (601721)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=601721',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/601721.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '601721';

-- 天主教聖保祿幼兒園 (617849)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=617849',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'https://applications.edb.gov.hk/schoolsearch/schoolfee/617849.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '617849';

-- 香港西區婦女福利會何瑞棠紀念中英文幼稚園 (621366)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=621366',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tai%20Po_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'https://applications.edb.gov.hk/schoolsearch/schoolfee/621366.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/WWCWDHK_DavidWoo.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/WWCWDHK_DavidWoo.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '621366';

-- 香港基督教服務處雋樂幼兒學校（大埔） (627550)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=627550',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tai%20Po_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'https://applications.edb.gov.hk/schoolsearch/schoolfee/627550.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '627550';

-- 全完堂幼稚園 (152269)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=152269',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tsuen%20Wan_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/152269.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/ChuenYuenCh.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/ChuenYuenCh.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '152269';

-- 福來邨錦全幼稚園 (152498)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=152498',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tsuen%20Wan_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/152498.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/FLE_KamChuen.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/FLE_KamChuen.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '152498';

-- 滿樂幼稚園 (152579)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=152579',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tsuen%20Wan_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/152579.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/MoonLok.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/MoonLok.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '152579';

-- 荃灣聖母幼稚園 (153907)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=153907',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tsuen%20Wan_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/153907.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TW_OurLady.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TW_OurLady.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '153907';

-- 萌兒幼稚園 (156612)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=156612',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tsuen%20Wan_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/156612.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Allway.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Allway.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '156612';

-- 香港道教聯合會圓玄幼稚園 (157066)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=157066',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tsuen%20Wan_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/157066.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKTA_YuenYuen.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKTA_YuenYuen.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '157066';

-- 綠楊幼稚園 (157716)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=157716',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/157716.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '157716';

-- 荃灣浸信會幼稚園 (158496)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=158496',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tsuen%20Wan_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/158496.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TWBC.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TWBC.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '158496';

-- 救世軍吳國偉紀念幼稚園 (158550)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=158550',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tsuen%20Wan_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/158550.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SA_NgKwokWaiMemorial.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SA_NgKwokWaiMemorial.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '158550';

-- 天主教領報幼稚園 (159220)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=159220',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tsuen%20Wan_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/159220.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Annunciation_Catholic.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Annunciation_Catholic.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '159220';

-- 聖文嘉中英文幼稚園（荃灣） (231533)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=231533',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tsuen%20Wan_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/231533.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/StMonicas_TsuenWan.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/StMonicas_TsuenWan.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '231533';

-- 聖安多尼中英文幼稚園（麗城花園） (231584)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=231584',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tsuen%20Wan_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/231584.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Blessing_Belvedere.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Blessing_Belvedere.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '231584';

-- 栢基海韻幼稚園 (231690)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=231690',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tsuen%20Wan_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/231690.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/ParkviewRhineGdn.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/ParkviewRhineGdn.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '231690';

-- 迦南幼稚園（荃灣） (516376)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=516376',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tsuen%20Wan_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/516376.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Cannan_TW.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Cannan_TW.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '516376';

-- 迦南幼稚園（海濱花園） (526010)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=526010',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tsuen%20Wan_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/526010.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Cannan_RivieraGdn.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Cannan_RivieraGdn.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '526010';

-- 啓思幼稚園（馬灣） (552747)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=552747',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tsuen%20Wan_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/552747.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Creative_MaWan.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Creative_MaWan.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '552747';

-- 仁濟醫院蔡百泰幼稚園 (562890)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=562890',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tsuen%20Wan_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/562890.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/YCH_ChoiPatTai.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/YCH_ChoiPatTai.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '562890';

-- 救世軍梨木樹幼兒學校 (562963)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=562963',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tsuen%20Wan_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/562963.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SA_LeiMukShue.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SA_LeiMukShue.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '562963';

-- 救世軍荃灣幼兒學校 (563129)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=563129',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tsuen%20Wan_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/563129.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SA_TsuenWan.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SA_TsuenWan.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '563129';

-- 香港基督教女青年會荃灣幼兒學校 (563293)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=563293',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tsuen%20Wan_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/563293.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKYWCA_TW.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKYWCA_TW.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '563293';

-- 保良局方譚遠良幼稚園 (563676)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=563676',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tsuen%20Wan_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/563676.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PLK_FongTamYuenLeung.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PLK_FongTamYuenLeung.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '563676';

-- 保良局志沛幼稚園 (563757)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=563757',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tsuen%20Wan_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/563757.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PLK_LMS.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PLK_LMS.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '563757';

-- 藍如溪盛成皿教育基金邊耀良幼稚園 (563846)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=563846',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tsuen%20Wan_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/563846.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/ALVSEF_GordonPei.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/ALVSEF_GordonPei.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '563846';

-- 海濱方方樂趣幼稚園 (565105)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=565105',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/565105.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '565105';

-- 香港保護兒童會深井幼兒學校 (565296)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=565296',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tsuen%20Wan_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/565296.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKSPC_ShamTseng.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKSPC_ShamTseng.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '565296';

-- 世德幼稚園（梨木樹） (565628)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=565628',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tsuen%20Wan_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/565628.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Castar_LMS.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Castar_LMS.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '565628';

-- 聖文嘉幼稚園（荃灣） (566187)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=566187',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tsuen%20Wan_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/566187.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/StMonica_TW.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/StMonica_TW.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '566187';

-- 中華基督教會福幼幼稚園 (566403)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=566403',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tsuen%20Wan_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/566403.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CCC_FukYau.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CCC_FukYau.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '566403';

-- 中華基督教會福幼第二幼稚園 (566411)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=566411',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tsuen%20Wan_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/566411.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CCC_FukYauNoII.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CCC_FukYauNoII.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '566411';

-- 基督教安得兒幼稚園 (575640)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=575640',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tsuen%20Wan_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/575640.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/ChristianAdrianna.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/ChristianAdrianna.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '575640';

-- 心怡天地幼稚園 (583340)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=583340',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/583340.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '583340';

-- 思博幼稚園 (590860)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=590860',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/590860.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '590860';

-- 香港靈糧堂荃灣幼稚園 (595969)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=595969',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tsuen%20Wan_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/595969.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/LingLiang_TW.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/LingLiang_TW.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '595969';

-- 心怡天地幼稚園（麗城） (597716)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=597716',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/597716.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '597716';

-- 基督教安得兒幼稚園（灣景） (598038)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=598038',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tsuen%20Wan_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/598038.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/ChristianAdrianna_Bayview.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/ChristianAdrianna_Bayview.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '598038';

-- ６１１生命樹幼稚園 (601497)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=601497',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tsuen%20Wan_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/601497.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/611TreeOfLife.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/611TreeOfLife.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '601497';

-- 維多利亞（海之戀）國際幼稚園 (619850)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=619850',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'https://applications.edb.gov.hk/schoolsearch/schoolfee/619850.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '619850';

-- 聖公會青山聖彼得堂幼稚園 (151947)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=151947',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tuen%20Mun_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/151947.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SKH_SPCCP.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SKH_SPCCP.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '151947';

-- 天后中英文幼稚園 (156515)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=156515',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/156515.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/ReginaCoeli.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/ReginaCoeli.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '156515';

-- 東華三院高德根紀念幼稚園 (156744)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=156744',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tuen%20Mun_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/156744.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TWGH_KoTeckKin_Mem.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TWGH_KoTeckKin_Mem.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '156744';

-- 佳寶幼稚園（屯門分校） (156930)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=156930',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tuen%20Mun_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/156930.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/GuidePost_TM.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/GuidePost_TM.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '156930';

-- 仁愛堂顏寶鈴幼稚園 (157031)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=157031',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tuen%20Mun_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/157031.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/YOT_NPL.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/YOT_NPL.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '157031';

-- 路德會呂祥光幼稚園 (157074)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=157074',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tuen%20Mun_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/157074.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/LuiCheungKwong_Lutheran.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/LuiCheungKwong_Lutheran.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '157074';

-- 順德聯誼總會屯門梁李秀娛幼稚園 (157090)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=157090',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tuen%20Mun_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/157090.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/STFA_TM_LeungLeeSauYu.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/STFA_TM_LeungLeeSauYu.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '157090';

-- 青松湖景幼稚園 (157236)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=157236',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tuen%20Mun_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/157236.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CC_WuKing.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CC_WuKing.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '157236';

-- 仁愛堂葉德海幼稚園 (157279)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=157279',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tuen%20Mun_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/157279.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/YOT_AllanYap.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/YOT_AllanYap.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '157279';

-- 保良局田家炳兆康幼稚園 (157376)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=157376',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tuen%20Mun_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/157376.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PLK_TingKaPing_SiuHong.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PLK_TingKaPing_SiuHong.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '157376';

-- 聖公會青山聖彼得堂山景邨幼稚園 (157473)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=157473',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tuen%20Mun_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/157473.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SKH_StPetersCh_ShanKing.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SKH_StPetersCh_ShanKing.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '157473';

-- 中華基督教會屯門堂何福堂幼稚園 (157490)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=157490',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tuen%20Mun_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/157490.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CCC_TuenMun_HFT.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CCC_TuenMun_HFT.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '157490';

-- 美樂中英文幼稚園 (157503)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=157503',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tuen%20Mun_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/157503.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Melody_AC.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Melody_AC.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '157503';

-- 東華三院李黃慶祥紀念幼稚園 (158054)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=158054',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tuen%20Mun_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/158054.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TWGH_LeeWongHingCheung.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TWGH_LeeWongHingCheung.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '158054';

-- 世界龍岡學校朱瑞蘭（中英文）幼稚園 (158380)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=158380',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tuen%20Mun_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/158380.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/LKWFS_ChuSiuLan.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/LKWFS_ChuSiuLan.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '158380';

-- 保良局廖烈正幼稚園 (158623)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=158623',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tuen%20Mun_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/158623.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PLK_YickKwaiFong.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PLK_YickKwaiFong.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '158623';

-- 佳寶幼稚園第二分校（建生邨） (158658)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=158658',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tuen%20Mun_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/158658.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Guideposts_KinSangEst.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Guideposts_KinSangEst.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '158658';

-- 路德會建生幼稚園 (158674)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=158674',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tuen%20Mun_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/158674.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/KinSang_Lutheran.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/KinSang_Lutheran.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '158674';

-- 田景邨浸信會呂郭碧鳳幼稚園 (158747)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=158747',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tuen%20Mun_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/158747.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TKEB_LuiKwokPatFong.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TKEB_LuiKwokPatFong.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '158747';

-- 樂善堂張葉茂清幼稚園 (158836)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=158836',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tuen%20Mun_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/158836.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/LST_CheungYipMouChing.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/LST_CheungYipMouChing.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '158836';

-- 啓思幼稚園（屯門分校） (158852)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=158852',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tuen%20Mun_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/158852.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Creative_TM.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Creative_TM.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '158852';

-- 聖公會青山聖彼得堂兆麟苑幼稚園 (159131)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=159131',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tuen%20Mun_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/159131.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SKH_StPetersCH_SiuLunCourt.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SKH_StPetersCH_SiuLunCourt.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '159131';

-- 美樂中英文幼稚園（景峰花園分校） (231185)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=231185',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tuen%20Mun_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/231185.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Melody_PrimeViewGdn.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Melody_PrimeViewGdn.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '231185';

-- 雅麗斯英文幼稚園 (231592)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=231592',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tuen%20Mun_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/231592.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Agnes_Eng.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Agnes_Eng.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '231592';

-- 珈琳幼稚園（屯門分校） (536768)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=536768',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tuen%20Mun_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/536768.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Karlam_TM.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Karlam_TM.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '536768';

-- 仁濟醫院嚴徐玉珊幼稚園 (539163)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=539163',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tuen%20Mun_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/539163.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/YCH_YimTsuiYukShan.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/YCH_YimTsuiYukShan.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '539163';

-- 香港浸信會聯會寶田幼稚園 (539554)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=539554',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/539554.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/BaptistConvention_PoTin.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/BaptistConvention_PoTin.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '539554';

-- 保良局蔡冠深幼稚園 (539872)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=539872',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tuen%20Mun_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/539872.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PLK_ChoiKoonShum.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PLK_ChoiKoonShum.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '539872';

-- 真理浸信會富泰幼稚園 (541389)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=541389',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tuen%20Mun_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/541389.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TBC_Empower.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TBC_Empower.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '541389';

-- 樂善堂鄧德濂幼稚園 (543616)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=543616',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tuen%20Mun_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/543616.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/LST_TangTakLim.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/LST_TangTakLim.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '543616';

-- 啓思幼稚園（愛琴） (556246)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=556246',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tuen%20Mun_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/556246.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Creative_AegeanCoast.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Creative_AegeanCoast.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '556246';

-- 建生浸信會白普理幼兒園 (562874)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=562874',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tuen%20Mun_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/562874.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/KinSang_BaptistCh_Bradbury.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/KinSang_BaptistCh_Bradbury.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '562874';

-- 香港基督教女青年會安定幼兒學校 (562904)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=562904',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tuen%20Mun_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/562904.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKYWCA_OnTing.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKYWCA_OnTing.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '562904';

-- 救世軍三聖幼兒學校 (563080)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=563080',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tuen%20Mun_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/563080.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SA_SamShing.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SA_SamShing.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '563080';

-- 香港聖公會聖西門良景幼兒學校 (563277)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=563277',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tuen%20Mun_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/563277.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SKH_StSimon_LeungKing.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SKH_StSimon_LeungKing.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '563277';

-- 香港聖公會聖西門大興幼兒學校 (563307)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=563307',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tuen%20Mun_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/563307.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SKH_StSimons_TaiHing.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SKH_StSimons_TaiHing.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '563307';

-- 仁濟醫院友愛幼稚園 (563366)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=563366',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tuen%20Mun_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/563366.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/YCH_YauOi.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/YCH_YauOi.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '563366';

-- 仁濟醫院山景幼稚園 (563412)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=563412',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tuen%20Mun_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/563412.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/YCH_ShanKing.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/YCH_ShanKing.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '563412';

-- 東華三院田家炳幼兒園 (563595)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=563595',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tuen%20Mun_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/563595.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TWGH_TinKaPing.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TWGH_TinKaPing.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '563595';

-- 保良局倪文玲（友愛）幼稚園 (563960)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=563960',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tuen%20Mun_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/563960.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PLK_YauOi.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PLK_YauOi.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '563960';

-- 東華三院方譚遠良幼兒園 (564150)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=564150',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tuen%20Mun_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/564150.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TWGH_FongTamYuenLeung.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TWGH_FongTamYuenLeung.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '564150';

-- 仁愛堂劉皇發幼稚園 (564265)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=564265',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tuen%20Mun_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/564265.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/YOT_LauWongFat.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/YOT_LauWongFat.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '564265';

-- 仁愛堂田家炳幼稚園 (564273)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=564273',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tuen%20Mun_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/564273.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/YOT_TinKaPing.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/YOT_TinKaPing.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '564273';

-- 香港保護兒童會蝴蝶邨幼兒學校 (565059)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=565059',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tuen%20Mun_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/565059.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKSPC_ButterflyEst.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKSPC_ButterflyEst.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '565059';

-- 保良局倪文玲（蝴蝶灣）幼稚園 (565318)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=565318',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tuen%20Mun_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/565318.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PLK_ButterflyBay.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PLK_ButterflyBay.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '565318';

-- 美樂幼兒園（美樂花園校） (565679)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=565679',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tuen%20Mun_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/565679.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Melody_MelodyGdn.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Melody_MelodyGdn.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '565679';

-- 路德會良景幼兒園 (565725)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=565725',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tuen%20Mun_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/565725.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/LeungKing_Lutheran.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/LeungKing_Lutheran.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '565725';

-- 路德會富泰幼兒園 (565784)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=565784',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tuen%20Mun_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/565784.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/FuTai_Lutheran.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/FuTai_Lutheran.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '565784';

-- 世佛會真言宗幼兒學校 (565890)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=565890',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tuen%20Mun_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/565890.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/WFB_Mantra.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/WFB_Mantra.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '565890';

-- 世佛會觀自在幼兒學校 (565911)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=565911',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tuen%20Mun_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/565911.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/WFB_Avalokitesvara.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/WFB_Avalokitesvara.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '565911';

-- 香港聖公會青山聖彼得堂青雲路幼稚園 (566179)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=566179',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tuen%20Mun_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/566179.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SKH_SPCCP_TsingWunRd.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SKH_SPCCP_TsingWunRd.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '566179';

-- 中華基督教會屯門堂幼稚園 (566292)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=566292',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tuen%20Mun_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/566292.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CCC_TM.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CCC_TM.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '566292';

-- 晶晶幼稚園（屯門校） (567892)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=567892',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tuen%20Mun_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/567892.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/JJ_TM.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/JJ_TM.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '567892';

-- 加州天地幼稚園 (572764)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=572764',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/572764.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '572764';

-- 晶晶國際幼稚園 (587524)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=587524',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/587524.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '587524';

-- 宏廣國際幼稚園 (590401)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=590401',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/590401.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '590401';

-- 哈羅香港國際學校 (590800)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=590800',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/590800.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '590800';

-- 小牛頓中英文幼稚園 (599999)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=599999',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tuen%20Mun_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/599999.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/LittleNewton_AC.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/LittleNewton_AC.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '599999';

-- 迦南幼稚園（景峰花園） (609641)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=609641',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tuen%20Mun_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'https://applications.edb.gov.hk/schoolsearch/schoolfee/609641.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Cannon_PrimeViewGdn.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Cannon_PrimeViewGdn.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '609641';

-- 東華三院馬陳家歡幼稚園 (611093)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=611093',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Tuen%20Mun_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'https://applications.edb.gov.hk/schoolsearch/schoolfee/611093.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TWGH_KatherineMa.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TWGH_KatherineMa.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '611093';

-- 心怡天地國際幼稚園（屯門） (615170)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=615170',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'https://applications.edb.gov.hk/schoolsearch/schoolfee/615170.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '615170';

-- YORK INTERNATIONAL PRE-SCHOOL (TUEN MUN) (616990)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=616990',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'https://applications.edb.gov.hk/schoolsearch/schoolfee/616990.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '616990';

-- 英藝幼稚園（兆康） (624829)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=624829',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/624829.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '624829';

-- 聖公會幼稚園 (131636)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=131636',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/131636.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'http://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SKH.pdf',
  inspection_report_updated_at = CASE
    WHEN 'http://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SKH.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '131636';

-- 香港真光中學附屬小學暨幼稚園 (132047)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=132047',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/132047.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'http://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TrueLight_MidSch.pdf',
  inspection_report_updated_at = CASE
    WHEN 'http://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TrueLight_MidSch.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '132047';

-- 寶血幼稚園 (133019)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=133019',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Wan%20Chai_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/133019.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PreciousBlood.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PreciousBlood.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '133019';

-- 中華基督教會灣仔堂幼稚園 (133280)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=133280',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Wan%20Chai_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/133280.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CCC_WanChaiCh.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CCC_WanChaiCh.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '133280';

-- 香港靈糧堂幼稚園 (133744)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=133744',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Wan%20Chai_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/133744.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HK_LingLiangCh.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HK_LingLiangCh.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '133744';

-- 聖保祿幼稚園 (214612)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=214612',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/214612.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'http://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/StPaul''s_KG.pdf',
  inspection_report_updated_at = CASE
    WHEN 'http://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/StPaul''s_KG.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '214612';

-- 卡莎迪曼幼稚園 (323853)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=323853',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Wan%20Chai_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/323853.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/KhalsaDiwan.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/KhalsaDiwan.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '323853';

-- 保良局莊啓程幼稚園 (323896)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=323896',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Wan%20Chai_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/323896.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PLK_VicwoodChongKeeTing.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PLK_VicwoodChongKeeTing.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '323896';

-- 銅鑼灣維多利亞幼稚園 (324779)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=324779',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/324779.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '324779';

-- 愛群道浸信會呂郭碧鳳幼稚園 (324922)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=324922',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Wan%20Chai_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/324922.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/OiKwanRd_BaptistCh_LKPF.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/OiKwanRd_BaptistCh_LKPF.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '324922';

-- 天主教聖瑪加利大幼稚園 (325368)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=325368',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Wan%20Chai_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/325368.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/StMargaretMary_Catholic.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/StMargaretMary_Catholic.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '325368';

-- 銅鑼灣維多利亞國際幼稚園 (325651)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=325651',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/325651.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '325651';

-- 帝京香港幼稚園 (325848)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=325848',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/325848.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '325848';

-- 穆斯林幼稚園 (518247)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=518247',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Wan%20Chai_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/518247.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Muslim_Community.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Muslim_Community.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '518247';

-- 聖保祿幼兒園 (563188)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=563188',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/563188.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '563188';

-- 香港小童群益會樂緻幼稚園（灣仔） (563447)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=563447',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Wan%20Chai_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/563447.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/BGCAHK_WC.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/BGCAHK_WC.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '563447';

-- 保良局朱李月華幼稚園 (563641)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=563641',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Wan%20Chai_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/563641.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PLK_ChuLeeYuetWah.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PLK_ChuLeeYuetWah.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '563641';

-- 聖雅各福群會麥潔蓮幼稚園 (564338)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=564338',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Wan%20Chai_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/564338.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SJS_KathleenMcDouall.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SJS_KathleenMcDouall.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '564338';

-- 聖雅各福群會銅鑼灣幼稚園 (564346)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=564346',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Wan%20Chai_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/564346.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SJS_CausewayBay.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SJS_CausewayBay.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '564346';

-- GUIDEPOST MONTESSORI INTERNATIONAL PRE-SCHOOL (HAPPY VALLEY HAWTHORN ROAD) (564958)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=564958',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/564958.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '564958';

-- 香港基督教服務處時代幼兒學校 (565385)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=565385',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/565385.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKCS_Times.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKCS_Times.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '565385';

-- 寶山幼兒園 (565938)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=565938',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/565938.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '565938';

-- 聖公會聖基道幼兒園（灣仔） (569712)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=569712',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Wan%20Chai_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/569712.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SKH_StChristopher''s_WC.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SKH_StChristopher''s_WC.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '569712';

-- 英基國際幼稚園（曉新） (579149)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=579149',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/579149.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '579149';

-- 港島兒童蒙特梭利幼稚園 (581119)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=581119',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/581119.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '581119';

-- 樂䔄幼稚園 (593770)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=593770',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'https://applications.edb.gov.hk/schoolsearch/schoolfee/593770.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '593770';

-- 善行國際幼稚園 (600334)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=600334',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/600334.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '600334';

-- 保良局建造商會學校 (607290)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=607290',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'https://applications.edb.gov.hk/schoolsearch/schoolfee/607290.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '607290';

-- 道爾頓幼稚園 (607592)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=607592',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/607592.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '607592';

-- 東華三院李賢義伉儷幼兒園 (614920)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=614920',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Wan%20Chai_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/614920.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TWGH_LeeYinYee.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TWGH_LeeYinYee.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '614920';

-- 信生中英文幼稚園 (216259)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=216259',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Wong%20Tai%20Sin_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/216259.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/ShunSang_AC.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/ShunSang_AC.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '216259';

-- 第一幼稚園 (316504)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=316504',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Wong%20Tai%20Sin_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/316504.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/A-One.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/A-One.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '316504';

-- 路德會救恩幼稚園 (321192)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=321192',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Wong%20Tai%20Sin_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/321192.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Redemption_Lutheran.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Redemption_Lutheran.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '321192';

-- 基督教佈道中心樂富幼稚園 (323268)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=323268',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Wong%20Tai%20Sin_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/323268.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CEC_LokFu.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CEC_LokFu.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '323268';

-- 天主教甘霖幼稚園 (324833)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=324833',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Wong%20Tai%20Sin_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/324833.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/KamLam_Catholic.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/KamLam_Catholic.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '324833';

-- 港澳信義會錫安紀念幼稚園 (325090)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=325090',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Wong%20Tai%20Sin_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/325090.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKMLC_ShekOn.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKMLC_ShekOn.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '325090';

-- 樂善堂顧李覺鮮幼稚園 (325317)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=325317',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Wong%20Tai%20Sin_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/325317.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/LST_KuLeeKwokSin.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/LST_KuLeeKwokSin.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '325317';

-- 東華三院韋祥智紀念幼稚園 (325414)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=325414',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Wong%20Tai%20Sin_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/325414.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TWGH_LaiTangYuenKaw.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TWGH_LaiTangYuenKaw.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '325414';

-- 聖公會慈光堂柯佩璋幼稚園 (325546)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=325546',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Wong%20Tai%20Sin_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/325546.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SKH_KLCh_OrPuiCheung.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SKH_KLCh_OrPuiCheung.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '325546';

-- 嗇色園主辦可德幼稚園 (325643)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=325643',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Wong%20Tai%20Sin_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/325643.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SSY_HoTak.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SSY_HoTak.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '325643';

-- 佛教傅康幼稚園 (325678)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=325678',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Wong%20Tai%20Sin_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/325678.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Buddhist_FooHong.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Buddhist_FooHong.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '325678';

-- 香港道教聯合會圓玄幼稚園（東頭邨） (325716)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=325716',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Wong%20Tai%20Sin_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/325716.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKT_YY_TungTauEst.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKT_YY_TungTauEst.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '325716';

-- 保良局金卿幼稚園 (325821)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=325821',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Wong%20Tai%20Sin_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/325821.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PLK_KamHing.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PLK_KamHing.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '325821';

-- 循道衛理聯合教會主恩堂幼稚園 (325880)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=325880',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Wong%20Tai%20Sin_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/325880.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/GraceMethodistCh.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/GraceMethodistCh.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '325880';

-- 樂富禮賢會幼稚園 (325929)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=325929',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Wong%20Tai%20Sin_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/325929.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/LokFu_RhenishCh.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/LokFu_RhenishCh.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '325929';

-- 嗇色園主辦可立幼稚園 (523429)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=523429',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Wong%20Tai%20Sin_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/523429.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SSY_HoLap.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SSY_HoLap.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '523429';

-- 路德會沙崙堂幼稚園（慈愛分校） (523933)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=523933',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Wong%20Tai%20Sin_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/523933.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Sharon_Lutheran_TszOi.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Sharon_Lutheran_TszOi.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '523933';

-- 聖母幼稚園 (528625)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=528625',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Wong%20Tai%20Sin_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/528625.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/OurLadys.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/OurLadys.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '528625';

-- 鑽石山靈糧幼稚園 (530379)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=530379',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Wong%20Tai%20Sin_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/530379.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'http://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/DH_LingLiang.pdf',
  inspection_report_updated_at = CASE
    WHEN 'http://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/DH_LingLiang.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '530379';

-- 基督教恩苗東九龍幼稚園 (538132)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=538132',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Wong%20Tai%20Sin_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/538132.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Gracefield_EKnChr.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Gracefield_EKnChr.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '538132';

-- 慈正邨菩提幼稚園 (542601)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=542601',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Wong%20Tai%20Sin_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/542601.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TszChingEst_BodhiSiksa.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TszChingEst_BodhiSiksa.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '542601';

-- 基督教中國佈道會恩恩創意幼稚園 (549169)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=549169',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Wong%20Tai%20Sin_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/549169.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/ECF_BlessCreativity.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/ECF_BlessCreativity.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '549169';

-- 香港幼稚園協會幼兒學校 (550035)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=550035',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/550035.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKKA_PreSch.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKKA_PreSch.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '550035';

-- 香港小童群益會樂緻幼稚園（黃大仙） (563463)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=563463',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Wong%20Tai%20Sin_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/563463.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/BGCAHK_WTS.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/BGCAHK_WTS.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '563463';

-- 東華三院方肇彝幼兒園 (563552)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=563552',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Wong%20Tai%20Sin_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/563552.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TWGH_FongShiuYee.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TWGH_FongShiuYee.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '563552';

-- 新九龍婦女會慈雲山幼兒園 (563617)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=563617',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Wong%20Tai%20Sin_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/563617.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/NKWA_TWS.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/NKWA_TWS.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '563617';

-- 保良局王少清幼稚園 (563811)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=563811',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Wong%20Tai%20Sin_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/563811.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PLK_WongSiuChing.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PLK_WongSiuChing.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '563811';

-- 保良局謝黃沛涓幼稚園 (563919)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=563919',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Wong%20Tai%20Sin_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/563919.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PLK_TseWongPuiKuen.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PLK_TseWongPuiKuen.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '563919';

-- 保良局方譚遠良（慈雲山）幼稚園 (563943)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=563943',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Wong%20Tai%20Sin_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/563943.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PLK_FongTamYuenLeung_TWS.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PLK_FongTamYuenLeung_TWS.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '563943';

-- 基督教香港崇真會安強幼兒學校 (564060)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=564060',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Wong%20Tai%20Sin_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/564060.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TTMHK_OnKeung.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TTMHK_OnKeung.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '564060';

-- 東華三院群芳幼兒園 (564176)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=564176',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Wong%20Tai%20Sin_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/564176.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TWGH_KwanFong.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TWGH_KwanFong.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '564176';

-- 五邑工商總會幼稚園 (564290)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=564290',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Wong%20Tai%20Sin_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/564290.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/5DBWA.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/5DBWA.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '564290';

-- 五邑工商總會張祝珊幼稚園 (564303)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=564303',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Wong%20Tai%20Sin_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/564303.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/FDBWA_CheungChukShan.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/FDBWA_CheungChukShan.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '564303';

-- 聖母潔心會黃大仙幼稚園 (564370)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=564370',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Wong%20Tai%20Sin_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/564370.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SIHM_WTS.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SIHM_WTS.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '564370';

-- 禮賢會樂富幼兒園 (564397)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=564397',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Wong%20Tai%20Sin_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/564397.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/LF_Rhenish.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/LF_Rhenish.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '564397';

-- 禮賢會新蒲崗幼兒園 (564400)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=564400',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Wong%20Tai%20Sin_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/564400.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SPK_Rhenish.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SPK_Rhenish.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '564400';

-- 香港基督教女青年會彩雲幼兒學校 (564451)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=564451',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Wong%20Tai%20Sin_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/564451.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKYWCA_ChoiWan.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKYWCA_ChoiWan.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '564451';

-- 香港基督教女青年會信望幼兒學校 (565504)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=565504',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Wong%20Tai%20Sin_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/565504.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKYWCA_FaithHope.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKYWCA_FaithHope.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '565504';

-- 基督教宣道會富山幼兒學校 (565873)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=565873',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Wong%20Tai%20Sin_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/565873.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CMA_FuShan.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CMA_FuShan.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '565873';

-- 明愛啓幼幼兒學校 (566020)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=566020',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/566020.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Caritas_KaiYau.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Caritas_KaiYau.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '566020';

-- 德望小學暨幼稚園 (588130)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=588130',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/588130.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '588130';

-- 永樂創新英文幼稚園 (595144)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=595144',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Wong%20Tai%20Sin_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/595144.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/JonathanInnovative.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/JonathanInnovative.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '595144';

-- 德信幼稚園 (133582)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=133582',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Yau%20Tsim%20and%20Mong%20Kok_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/133582.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TakSun.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TakSun.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '133582';

-- 深培中英文幼稚園 (216070)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=216070',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Yau%20Tsim%20and%20Mong%20Kok_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/216070.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Semple.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Semple.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '216070';

-- 港青基信國際幼稚園 (216178)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=216178',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/216178.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '216178';

-- 救世軍陳昆棟幼稚園 (325198)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=325198',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Yau%20Tsim%20and%20Mong%20Kok_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/325198.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SA_ChanKwanTung.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SA_ChanKwanTung.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '325198';

-- 旺角雅麗斯英文幼稚園 (516929)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=516929',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Yau%20Tsim%20and%20Mong%20Kok_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/516929.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/MK_Agnes_Eng.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/MK_Agnes_Eng.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '516929';

-- 迦南幼稚園（富榮花園） (531898)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=531898',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Yau%20Tsim%20and%20Mong%20Kok_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/531898.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Cannan_CharmingGdn.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Cannan_CharmingGdn.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '531898';

-- 明我幼稚園（奧運校） (533858)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=533858',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Yau%20Tsim%20and%20Mong%20Kok_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/533858.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/DominicSavio_OlympicBr.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/DominicSavio_OlympicBr.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '533858';

-- 中華基督教會望覺堂賢貞幼稚園 (547069)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=547069',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Yau%20Tsim%20and%20Mong%20Kok_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/547069.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CCC_MKCh_Jeannette.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CCC_MKCh_Jeannette.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '547069';

-- 太陽島幼稚園（港灣豪庭分校） (555436)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=555436',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Yau%20Tsim%20and%20Mong%20Kok_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/555436.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SI_MetroHarbour.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SI_MetroHarbour.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '555436';

-- LITTLE BUDS KINDERGARTEN (558346)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=558346',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Yau%20Tsim%20and%20Mong%20Kok_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/558346.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/LittleBuds.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/LittleBuds.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '558346';

-- 學之園幼稚園（凱帆薈） (561207)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=561207',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/561207.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '561207';

-- 救世軍海富幼兒學校 (562939)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=562939',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Yau%20Tsim%20and%20Mong%20Kok_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/562939.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SA_HoiFu.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SA_HoiFu.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '562939';

-- 救世軍荔枝角幼兒學校 (562955)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=562955',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Yau%20Tsim%20and%20Mong%20Kok_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/562955.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SA_LCK.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SA_LCK.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '562955';

-- 香港青年協會青樂幼稚園（油麻地） (563323)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=563323',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Yau%20Tsim%20and%20Mong%20Kok_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/563323.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKFYG_ChingLok_YMT.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKFYG_ChingLok_YMT.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '563323';

-- 保良局呂錦泰幼稚園 (563820)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=563820',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Yau%20Tsim%20and%20Mong%20Kok_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/563820.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PLK_TaiKokTsui.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PLK_TaiKokTsui.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '563820';

-- 仁愛堂陳鄭玉而幼稚園 (564249)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=564249',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Yau%20Tsim%20and%20Mong%20Kok_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/564249.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/YOT_ChanChengYukYee.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/YOT_ChanChengYukYee.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '564249';

-- 香港保護兒童會滙豐銀行慈善基金幼兒學校 (564931)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=564931',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Yau%20Tsim%20and%20Mong%20Kok_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/564931.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKSPC_HKBF.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKSPC_HKBF.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '564931';

-- 油麻地循道衛理楊震幼兒學校 (565024)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=565024',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Yau%20Tsim%20and%20Mong%20Kok_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/565024.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/YMT_YangMemorial_Methodist.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/YMT_YangMemorial_Methodist.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '565024';

-- 香港保護兒童會中銀幼兒學校 (565067)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=565067',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Yau%20Tsim%20and%20Mong%20Kok_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/565067.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKSPC_BOC.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKSPC_BOC.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '565067';

-- 香港保護兒童會百佳員工慈善基金幼兒學校 (565091)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=565091',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Yau%20Tsim%20and%20Mong%20Kok_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/565091.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKSPC_Park''Nshop.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKSPC_Park''Nshop.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '565091';

-- 香港保護兒童會砵蘭街幼兒學校 (565300)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=565300',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Yau%20Tsim%20and%20Mong%20Kok_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/565300.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKSPC_PortlandSt.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKSPC_PortlandSt.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '565300';

-- 香港基督教服務處雋匯幼兒學校 (565423)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=565423',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Yau%20Tsim%20and%20Mong%20Kok_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/565423.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKCS_Central.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKCS_Central.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '565423';

-- 駿發花園浸信會幼兒學校 (565474)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=565474',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Yau%20Tsim%20and%20Mong%20Kok_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/565474.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/ProsperousGdn_Baptist.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/ProsperousGdn_Baptist.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '565474';

-- 救世軍卜凱賽琳幼兒學校 (566535)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=566535',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Yau%20Tsim%20and%20Mong%20Kok_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/566535.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SA_CatherineBooth.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SA_CatherineBooth.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '566535';

-- 滙豐幼兒學校 (566748)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=566748',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/566748.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '566748';

-- 協康會康苗幼兒園 (566969)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=566969',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Yau%20Tsim%20and%20Mong%20Kok_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/566969.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HHS_HealthyKids.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HHS_HealthyKids.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '566969';

-- 栢基國際幼稚園（九龍） (571490)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=571490',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/571490.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '571490';

-- 維多利亞（君匯港）幼稚園 (574708)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=574708',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/574708.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '574708';

-- 明慧國際幼稚園（太子分校） (583421)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=583421',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/583421.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '583421';

-- 蔚思幼稚園 (595543)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=595543',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/595543.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '595543';

-- 樂希幼兒學校 (601403)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=601403',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/601403.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '601403';

-- 香港墨爾文國際幼稚園 (606979)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=606979',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/606979.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '606979';

-- 啟文幼稚園 (616281)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=616281',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Yau%20Tsim%20and%20Mong%20Kok_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'https://applications.edb.gov.hk/schoolsearch/schoolfee/616281.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Clement.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Clement.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '616281';

-- 學之園幼稚園（奧運） (617474)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=617474',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'https://applications.edb.gov.hk/schoolsearch/schoolfee/617474.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '617474';

-- 卓爾中英文幼稚園 (622869)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=622869',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Yau%20Tsim%20and%20Mong%20Kok_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'https://applications.edb.gov.hk/schoolsearch/schoolfee/622869.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '622869';

-- 匯成勞士施羅孚伉儷慈善基金幼稚園 (624195)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=624195',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Yau%20Tsim%20and%20Mong%20Kok_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'https://applications.edb.gov.hk/schoolsearch/schoolfee/624195.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/IBEL.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/IBEL.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '624195';

-- 中華基督教會元朗堂真光幼稚園 (151629)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=151629',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Yuen%20Long_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/151629.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/YLCh_CCC_Ltd_ChanKwong.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/YLCh_CCC_Ltd_ChanKwong.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '151629';

-- 萊恩幼稚園（元朗） (151696)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=151696',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/151696.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'http://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/StLorraine_YL.pdf',
  inspection_report_updated_at = CASE
    WHEN 'http://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/StLorraine_YL.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '151696';

-- 聖公會聖約瑟堂幼稚園 (154601)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=154601',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Yuen%20Long_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/154601.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SKH_StJoseph''sCh.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SKH_StJoseph''sCh.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '154601';

-- 元朗信義會生命幼稚園 (155624)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=155624',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Yuen%20Long_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/155624.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/YuenLong_LutheranLife.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/YuenLong_LutheranLife.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '155624';

-- 聖馬提亞堂肖珍幼稚園 (156795)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=156795',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Yuen%20Long_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/156795.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/StMatthiasCh_ChiuChun.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/StMatthiasCh_ChiuChun.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '156795';

-- 基督教宣道會錦綉幼稚園 (156949)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=156949',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Yuen%20Long_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/156949.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CMA_FairviewPark.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CMA_FairviewPark.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '156949';

-- 麗晶幼稚園分校 (156981)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=156981',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Yuen%20Long_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/156981.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Regent''s_Br.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Regent''s_Br.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '156981';

-- 天純幼稚園 (157732)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=157732',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Yuen%20Long_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/157732.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Pristine.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Pristine.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '157732';

-- 新界神召會懷恩幼稚園 (158313)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=158313',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Yuen%20Long_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/158313.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/NTAGC_WaiYan.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/NTAGC_WaiYan.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '158313';

-- 元岡幼稚園 (158321)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=158321',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Yuen%20Long_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/158321.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/YuenKong.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/YuenKong.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '158321';

-- 朗屏邨聖恩幼稚園 (158410)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=158410',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Yuen%20Long_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/158410.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/LPE_SingYan.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/LPE_SingYan.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '158410';

-- 中華基督教會元朗堂朗屏邨真光幼稚園 (158500)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=158500',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Yuen%20Long_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/158500.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/YLC_CCC_LongPingEst_ChanKwong.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/YLC_CCC_LongPingEst_ChanKwong.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '158500';

-- 東華三院黃朱惠芬幼稚園 (158976)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=158976',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Yuen%20Long_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/158976.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TWGH_WongChuWaiFun.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TWGH_WongChuWaiFun.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '158976';

-- 元朗商會幼稚園 (159018)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=159018',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Yuen%20Long_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/159018.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/YLMA.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/YLMA.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '159018';

-- 保良局曾星如幼稚園 (159034)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=159034',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Yuen%20Long_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/159034.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PLK_ChanSengYee.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PLK_ChanSengYee.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '159034';

-- 宣道會陳李詠貞紀念幼稚園 (159042)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=159042',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Yuen%20Long_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/159042.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CA_ChenLeeWT.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CA_ChenLeeWT.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '159042';

-- 嗇色園主辦可瑞幼稚園 (159050)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=159050',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Yuen%20Long_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/159050.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SSY_HoShui.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SSY_HoShui.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '159050';

-- 元朗公立中學校友會劉良驤紀念幼稚園 (159140)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=159140',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Yuen%20Long_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/159140.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/YLPMSAA_LauLeungSheung.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/YLPMSAA_LauLeungSheung.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '159140';

-- 元朗三育幼稚園 (159158)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=159158',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Yuen%20Long_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/159158.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/YL_SamYuk.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/YL_SamYuk.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '159158';

-- 佳寶幼稚園第三分校（天瑞邨） (159190)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=159190',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Yuen%20Long_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/159190.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Guideposts_3rdBr_TinShuiEst.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Guideposts_3rdBr_TinShuiEst.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '159190';

-- 太陽島英文幼稚園（元朗分校） (231010)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=231010',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Yuen%20Long_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/231010.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SI_YuenLong.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SI_YuenLong.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '231010';

-- 珈琳中英文幼稚園 (231886)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=231886',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Yuen%20Long_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/231886.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Karlam_AC.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Karlam_AC.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '231886';

-- 萊恩英文幼稚園 (517828)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=517828',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/517828.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '517828';

-- 晶晶中英文幼稚園（洪水橋分校） (519812)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=519812',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Yuen%20Long_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/519812.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/JJ_AC_HungShuiKiu.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/JJ_AC_HungShuiKiu.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '519812';

-- 香海正覺蓮社佛教林黃明慧幼稚園 (524204)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=524204',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/524204.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HHCKLA_Buddhish_LamWongMingWai.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HHCKLA_Buddhish_LamWongMingWai.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '524204';

-- 殷翠幼稚園 (524360)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=524360',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Yuen%20Long_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/524360.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Jade.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Jade.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '524360';

-- 基督教聖約教會小天使（天盛）幼稚園 (532835)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=532835',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Yuen%20Long_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/532835.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/MCC_LittleAngel_TingShing.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/MCC_LittleAngel_TingShing.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '532835';

-- 世德幼稚園 (534790)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=534790',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Yuen%20Long_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/534790.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Castar.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Castar.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '534790';

-- 翰林幼稚園（天水圍） (537594)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=537594',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Yuen%20Long_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/537594.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Academy_TSW.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Academy_TSW.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '537594';

-- 天樂幼稚園 (537950)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=537950',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Yuen%20Long_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/537950.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Talent.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Talent.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '537950';

-- 青衣商會天水圍幼稚園 (540560)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=540560',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Yuen%20Long_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/540560.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TYTA_TSW.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TYTA_TSW.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '540560';

-- 激活幼稚園 (541222)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=541222',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Yuen%20Long_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/541222.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Gigamind.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Gigamind.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '541222';

-- 中華基督教青年會幼稚園 (541230)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=541230',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Yuen%20Long_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/541230.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/ChineseYMCA.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/ChineseYMCA.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '541230';

-- 佛教慈光幼稚園 (541427)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=541427',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Yuen%20Long_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/541427.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Buddhist_ChiKwong.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Buddhist_ChiKwong.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '541427';

-- SAGARMATHA KINDERGARTEN (542687)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=542687',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Yuen%20Long_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/542687.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Sagarmatha.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Sagarmatha.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '542687';

-- 天主教聖葉理諾幼稚園 (543012)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=543012',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Yuen%20Long_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/543012.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/StJeromesCatholic.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/StJeromesCatholic.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '543012';

-- 天水圍宣道幼稚園 (543489)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=543489',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Yuen%20Long_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/543489.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TinShuiWai_Alliance.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TinShuiWai_Alliance.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '543489';

-- 仁濟醫院明德幼稚園 (543918)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=543918',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Yuen%20Long_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/543918.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/YCH_MingTak.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/YCH_MingTak.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '543918';

-- 大埔浸信會幼稚園天澤邨分校 (544167)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=544167',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Yuen%20Long_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/544167.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TPBaptist_TinChakEst.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TPBaptist_TinChakEst.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '544167';

-- 圓玄幼稚園（天逸邨） (545333)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=545333',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Yuen%20Long_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/545333.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/YY_TinYatEst.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/YY_TinYatEst.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '545333';

-- 元朗東莞同鄉會熊定嘉幼稚園 (549304)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=549304',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Yuen%20Long_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/549304.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/YLTKDA_HungTingKa.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/YLTKDA_HungTingKa.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '549304';

-- 雅麗斯俊宏軒幼稚園 (554383)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=554383',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Yuen%20Long_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/554383.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Agnes_GrandeurTerrace.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Agnes_GrandeurTerrace.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '554383';

-- 香港中文大學校友會聯會陳震夏幼稚園 (560740)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=560740',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Yuen%20Long_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/560740.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CUHKFAA_ChanChunHa.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CUHKFAA_ChanChunHa.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '560740';

-- 救世軍錦田幼兒學校 (562866)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=562866',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Yuen%20Long_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/562866.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SA_KamTin.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SA_KamTin.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '562866';

-- 幼聯主辦安泰幼兒學校 (563226)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=563226',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Yuen%20Long_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/563226.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CO_Aetna.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CO_Aetna.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '563226';

-- 仁濟醫院林李婉冰幼稚園 (563420)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=563420',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Yuen%20Long_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/563420.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/YCH_NinaLam.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/YCH_NinaLam.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '563420';

-- 博愛醫院朱國京夫人紀念幼稚園 (564010)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=564010',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Yuen%20Long_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/564010.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/POH_MrsChuKwokKing.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/POH_MrsChuKwokKing.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '564010';

-- 博愛醫院陳潘佩清紀念幼稚園 (564028)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=564028',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Yuen%20Long_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/564028.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/POH_ChanPoonPuiChing.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/POH_ChanPoonPuiChing.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '564028';

-- 東華三院九龍崇德社幼兒園 (564125)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=564125',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Yuen%20Long_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/564125.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TWGH_ZontaClubOfKln.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TWGH_ZontaClubOfKln.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '564125';

-- 仁愛堂吳黃鳳英幼稚園 (564257)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=564257',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Yuen%20Long_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/564257.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/YOT_TinYiu.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/YOT_TinYiu.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '564257';

-- 禮賢會元朗幼兒園 (564508)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=564508',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Yuen%20Long_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/564508.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/YL_Rhenish.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/YL_Rhenish.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '564508';

-- 香港聖公會夏瑞芸幼兒學校 (564702)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=564702',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Yuen%20Long_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/564702.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SKH_HaSuiWan.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SKH_HaSuiWan.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '564702';

-- 聖公會聖馬提亞堂幼兒學校 (564710)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=564710',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Yuen%20Long_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/564710.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/StMatthiasCh.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/StMatthiasCh.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '564710';

-- 保良局廖笑霞幼稚園 (564982)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=564982',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Yuen%20Long_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/564982.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PLK_YL.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PLK_YL.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '564982';

-- 香港基督教服務處天恒幼兒學校 (565377)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=565377',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Yuen%20Long_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/565377.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKCS_TinHeng.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKCS_TinHeng.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '565377';

-- 基督教宣道會天頌幼兒學校 (565814)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=565814',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Yuen%20Long_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/565814.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CMA_TinChung.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CMA_TinChung.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '565814';

-- 神召會禮拜堂天澤幼兒園 (566012)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=566012',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Yuen%20Long_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/566012.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/FAGC_TinChak.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/FAGC_TinChak.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '566012';

-- 中華基督教會元朗堂周宋主愛幼兒園 (566250)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=566250',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Yuen%20Long_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/566250.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/YLCh_CCC_ChowSungChuOi.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/YLCh_CCC_ChowSungChuOi.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '566250';

-- 新界婦孺福利會元朗幼兒學校 (566349)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=566349',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Yuen%20Long_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/566349.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/NTWJWA_YL.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/NTWJWA_YL.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '566349';

-- 鄰舍輔導會元朗幼兒園 (566373)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=566373',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Yuen%20Long_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/566373.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/NAAC_YL.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/NAAC_YL.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '566373';

-- 中國基督教播道會天恩幼兒學校 (566780)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=566780',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Yuen%20Long_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/566780.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/AEFCHK_TinYan.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/AEFCHK_TinYan.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '566780';

-- 中華基督教會元朗堂真光幼稚園二校 (570885)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=570885',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Yuen%20Long_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/570885.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/YLC_CCC_ChanKwong_No2.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/YLC_CCC_ChanKwong_No2.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '570885';

-- 平安福音堂幼稚園（天水圍） (575666)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=575666',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Yuen%20Long_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/575666.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PEC_TinShuiWai.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PEC_TinShuiWai.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '575666';

-- 英揚樂兒中英文幼稚園 (590614)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=590614',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Yuen%20Long_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/590614.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/EliteKids_AC.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/EliteKids_AC.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '590614';

-- 遵道幼稚園 (597384)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=597384',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Yuen%20Long_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/597384.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Abiding.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Abiding.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '597384';

-- 雅麗斯樂思幼稚園 (598623)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=598623',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Yuen%20Long_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/598623.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/AgnesWise.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/AgnesWise.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '598623';

-- 香港中文大學校友會聯會順龍仁澤幼稚園 (600377)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=600377',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Yuen%20Long_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/600377.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CUHKFAA_ShunLungYanChak.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CUHKFAA_ShunLungYanChak.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '600377';

-- 德怡國際幼稚園（元朗） (602000)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=602000',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/602000.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '602000';

-- YORK MONTESSORI INTERNATIONAL PRE-SCHOOL (YUEN LONG) (605441)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=605441',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/605441.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '605441';

-- 保良局郭羅桂珍幼稚園 (605735)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=605735',
  official_notice_url = 'https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Yuen%20Long_K1-K3%20Vacancy.pdf',
  official_notice_updated_at = '2026-03-17'::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/605735.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PLK_EleanorKwokLKC.pdf',
  inspection_report_updated_at = CASE
    WHEN 'https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PLK_EleanorKwokLKC.pdf' IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '605735';

-- 多多國際幼稚園（形點） (605794)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=605794',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'http://applications.edb.gov.hk/schoolsearch/schoolfee/605794.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '605794';

-- 心怡天地國際幼稚園（元朗） (612189)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=612189',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'https://applications.edb.gov.hk/schoolsearch/schoolfee/612189.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '612189';

-- 艾蒙特國際幼稚園 (615633)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=615633',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'https://applications.edb.gov.hk/schoolsearch/schoolfee/615633.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '615633';

-- YORK INTERNATIONAL PRE-SCHOOL (WETLAND) (621480)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=621480',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'https://applications.edb.gov.hk/schoolsearch/schoolfee/621480.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '621480';

-- 安基司學校附屬國際幼稚園 (622060)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=622060',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'https://applications.edb.gov.hk/schoolsearch/schoolfee/622060.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '622060';

-- 英藝幼稚園（賞湖） (622265)
UPDATE schools
SET
  official_profile_url = 'https://kgp2025.azurewebsites.net/edb/school.php?lang=tc&schoolno=622265',
  official_notice_url = NULL,
  official_notice_updated_at = NULL::date,
  fee_certificate_url = 'https://applications.edb.gov.hk/schoolsearch/schoolfee/622265.pdf',
  fee_certificate_updated_at = DATE '2025-10-16',
  inspection_report_url = NULL,
  inspection_report_updated_at = CASE
    WHEN NULL IS NULL THEN inspection_report_updated_at
    ELSE DATE '2025-10-16'
  END
WHERE school_code = '622265';
