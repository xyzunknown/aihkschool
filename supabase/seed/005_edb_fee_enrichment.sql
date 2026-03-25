-- EDB kindergarten profile fee enrichment
-- Source: data/KGP_2025_tc.csv

-- 聖士提反堂小學暨幼稚園 (131440)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 54780,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$54,780',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$0'
WHERE school_code = '131440';

-- 聖保羅堂幼稚園 (131466)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '131466';

-- 聖士提反女子中學附屬幼稚園 (132896)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '132896';

-- 聖嘉勒小學 (210021)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '210021';

-- 聖安多尼中英文小學暨幼稚園 (213632)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 51732,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$51,732',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '213632';

-- 偉思幼稚園 (214248)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '214248';

-- SMALL WORLD CHRISTIAN KINDERGARTEN (215724)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(600, application_fee_hkd),
  registration_fee_hkd = COALESCE(0, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$600；註冊費（半日班）：HK$0'
WHERE school_code = '215724';

-- CARMEL SCHOOL (216186)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 96600,
  application_fee_hkd = COALESCE(1000, application_fee_hkd),
  registration_fee_hkd = COALESCE(0, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$96,600',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$1,000；註冊費（半日班）：HK$0'
WHERE school_code = '216186';

-- 聖馬太堂幼稚園 (319813)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '319813';

-- 明愛凌月仙幼稚園 (322270)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '322270';

-- 嘉諾撒聖心幼稚園 (325970)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '325970';

-- 救恩學校 (512273)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '512273';

-- 禮賢會學校 (513423)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '513423';

-- 香港真光幼稚園（堅道） (536911)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '536911';

-- 維多利亞（寶翠園）幼稚園 (542164)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 148560,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(0, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$148,560',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$0；註冊費（全日班）：HK$0'
WHERE school_code = '542164';

-- HIGHGATE HOUSE SCHOOL - THE PEAK (545589)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 168000,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(0, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$168,000',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$0；註冊費（半日班）：HK$0'
WHERE school_code = '545589';

-- 蒙特梭利國際學校 (548430)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(2000, application_fee_hkd),
  registration_fee_hkd = COALESCE(28600, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$2,000；註冊費（半日班）：HK$28,600；註冊費（全日班）：HK$41,300'
WHERE school_code = '548430';

-- 太陽島英文幼稚園（西營盤分校）(舊校名稱:太陽島英文幼稚園（卑路乍街分校）) (552739)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '552739';

-- 仁濟醫院郭子樑幼稚園 (563439)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 58512,
  application_fee_hkd = COALESCE(30, application_fee_hkd),
  registration_fee_hkd = COALESCE(1500, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$58,512',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$30；註冊費（全日班）：HK$1,500'
WHERE school_code = '563439';

-- 香港西區婦女福利會幼稚園 (563692)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 40536,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$40,536',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$1,570'
WHERE school_code = '563692';

-- 聖雅各福群會寶翠園幼稚園 (564354)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 90828,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$90,828',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$1,570'
WHERE school_code = '564354';

-- 香港基督教女青年會戴翰芬幼兒學校 (564435)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 49080,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$49,080',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$1,570'
WHERE school_code = '564435';

-- 潮陽幼稚園 (564648)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 63768,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$63,768',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$1,570'
WHERE school_code = '564648';

-- 基督教香港信義會基恩幼兒學校 (564850)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 54492,
  application_fee_hkd = COALESCE(30, application_fee_hkd),
  registration_fee_hkd = COALESCE(1500, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$54,492',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$30；註冊費（全日班）：HK$1,500'
WHERE school_code = '564850';

-- 香港保護兒童會譚雅士幼兒學校 (565253)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 46428,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$46,428',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（全日班）：HK$1,570'
WHERE school_code = '565253';

-- 仁濟醫院方江輝幼稚園 (565440)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 58428,
  application_fee_hkd = COALESCE(30, application_fee_hkd),
  registration_fee_hkd = COALESCE(1300, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$58,428',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$30；註冊費（全日班）：HK$1,300'
WHERE school_code = '565440';

-- 明愛堅尼地城幼兒學校 (565954)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 42660,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$42,660',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$1,570'
WHERE school_code = '565954';

-- CITY KIDS PRESCHOOL AND PLAYGROUP (566080)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 22344,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(0, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$22,344',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$0；註冊費（半日班）：HK$0'
WHERE school_code = '566080';

-- 偉思幼兒園 (566284)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 75348,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$75,348；全日班：全年 HK$107,700',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '566284';

-- 香港國際蒙特梭利學校（中環） (588032)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 117840,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$117,840；全日班：全年 HK$178,308',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$970'
WHERE school_code = '588032';

-- 盈思幼稚園 (590673)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 73200,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$73,200；全日班：全年 HK$104,988',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '590673';

-- 多多國際幼稚園（半山） (593133)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 156960,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(0, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$156,960',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$0；註冊費（半日班）：HK$0'
WHERE school_code = '593133';

-- GUIDEPOST MONTESSORI INTERNATIONAL PRE-SCHOOL (MID-LEVELS) (594725)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = NULL,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(0, registration_fee_hkd),
  fee_notes = NULL,
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$0；註冊費（半日班）：HK$0'
WHERE school_code = '594725';

-- 弘立幼稚園 (600601)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(1000, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$1,000；註冊費（半日班）：HK$970'
WHERE school_code = '600601';

-- YORK INTERNATIONAL PRE-SCHOOL (HONG KONG) (601420)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 108900,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$108,900',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '601420';

-- 奧恩國際幼稚園 (603643)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 85200,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$85,200',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '603643';

-- 香港民生幼稚園（西區） (603724)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 68208,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$68,208；全日班：全年 HK$105,420',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '603724';

-- 楓薈幼稚園 (605026)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 114048,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$114,048',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '605026';

-- WILDERNESS INTERNATIONAL KINDERGARTEN (607215)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '607215';

-- 香島華德福學校 (608319)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(0, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$0；註冊費（半日班）：HK$0'
WHERE school_code = '608319';

-- GUIDEPOST MONTESSORI INTERNATIONAL KINDERGARTEN (KENNEDY TOWN) (611484)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 114000,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(0, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$114,000',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$0；註冊費（半日班）：HK$0'
WHERE school_code = '611484';

-- 香港墨爾文國際幼稚園（港島西） (613037)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 129408,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$129,408；全日班：全年 HK$222,144',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '613037';

-- LES PETITS LASCARS FRENCH INTERNATIONAL PRESCHOOL (614904)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(0, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$0；註冊費（半日班）：HK$0'
WHERE school_code = '614904';

-- 迦南幼稚園（中環堅道） (619841)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '619841';

-- 英藝幼稚園（西環） (620998)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 81600,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$81,600；全日班：全年 HK$116,400',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '620998';

-- 蘇浙小學校 (132730)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 62160,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$62,160',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '132730';

-- LYC'EE FRANCAIS INTERNATIONAL (FRENCH INTERNATIONAL SCHOOL) (214949)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(2200, application_fee_hkd),
  registration_fee_hkd = COALESCE(25000, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$2,200；註冊費（全日班）：HK$25,000'
WHERE school_code = '214949';

-- 高主教書院幼稚園部 (215538)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '215538';

-- 漢基國際學校 (215589)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(0, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$0；註冊費（半日班）：HK$0'
WHERE school_code = '215589';

-- HAMILTON HILL INTERNATIONAL KINDERGARTEN (ISLAND EAST) (215635)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '215635';

-- 奧伊斯嘉日本語幼稚園 (215694)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(0, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$0；註冊費（半日班）：HK$0；註冊費（全日班）：HK$0'
WHERE school_code = '215694';

-- 聖安娜中英文幼稚園（本地課程） (215740)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 32030,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$32,030',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '215740';

-- 聖安娜中英文幼稚園（非本地課程） (215740)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 32030,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$32,030',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$0；註冊費（半日班）：HK$970'
WHERE school_code = '215740';

-- 瑪歌瑞特國際幼稚園（康怡） (215767)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 163920,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$163,920',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '215767';

-- 啓思幼稚園（杏花邨） (215830)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 59028,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$59,028；全日班：全年 HK$94,656',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '215830';

-- 基督教康山中英文幼稚園 (215848)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '215848';

-- 怡寶中英文幼稚園 (215872)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '215872';

-- 宣道會上書房中英文幼稚園 (216135)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '216135';

-- KOREAN INTERNATIONAL SCHOOL (216216)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(2000, application_fee_hkd),
  registration_fee_hkd = COALESCE(0, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$2,000；註冊費（全日班）：HK$0'
WHERE school_code = '216216';

-- 浸信會培理學校 (311910)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '311910';

-- 北角衞理堂幼稚園 (314684)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '314684';

-- 北角聖彼得堂幼稚園 (315435)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '315435';

-- 路德會錫安堂幼稚園 (316660)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(30, application_fee_hkd),
  registration_fee_hkd = COALESCE(800, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$30；註冊費（半日班）：HK$800'
WHERE school_code = '316660';

-- 明慧幼稚園 (321087)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '321087';

-- 懷恩浸信會幼稚園 (323969)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '323969';

-- 天主教海星幼稚園 (324094)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '324094';

-- 明我幼稚園 (324230)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 54000,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$54,000',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '324230';

-- 香港民生幼稚園（北角） (324965)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 62400,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$62,400；全日班：全年 HK$106,500',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '324965';

-- 合一堂陳伯宏紀念幼稚園 (325163)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 36384,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$36,384；全日班：全年 HK$63,996',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '325163';

-- 聖道明中英文幼稚園 (325457)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 43728,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$43,728',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '325457';

-- 維多利亞幼稚園 (325481)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 124020,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$124,020',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '325481';

-- 新翠培元幼稚園 (325589)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 53508,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$53,508；全日班：全年 HK$75,336',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '325589';

-- 柴灣浸信會學前教育中心呂明才幼稚園 (325597)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 59184,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$59,184',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '325597';

-- 勵志會陳鄭潔雲幼稚園 (325619)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '325619';

-- 漢廸國際幼稚園（港島東） (325783)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 58800,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$58,800；全日班：全年 HK$0',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '325783';

-- 循道衛理聯合教會愛華村堂幼稚園 (325899)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 36000,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$36,000',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '325899';

-- 迦南幼稚園（小西灣） (325996)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = NULL,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = NULL,
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '325996';

-- 耀東浸信會幼稚園 (326011)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '326011';

-- 筲箕灣街坊福利會張錦添紀念幼稚園 (516910)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 41316,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$41,316；全日班：全年 HK$63,456',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '516910';

-- 路德會聖雅各幼稚園 (536040)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '536040';

-- 欣苗幼稚園 (542199)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '542199';

-- 筲箕灣循道衞理幼稚園 (543357)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '543357';

-- 蒙特梭利國際學校 (548430)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(2000, application_fee_hkd),
  registration_fee_hkd = COALESCE(28600, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$2,000；註冊費（半日班）：HK$28,600；註冊費（全日班）：HK$41,300'
WHERE school_code = '548430';

-- 救世軍北角幼兒學校 (563161)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 54228,
  application_fee_hkd = COALESCE(20, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$54,228',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$20；註冊費（全日班）：HK$1,570'
WHERE school_code = '563161';

-- 香港青年協會青樂幼稚園 (563331)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 65232,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$65,232',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$1,570'
WHERE school_code = '563331';

-- 港九街坊婦女會環翠幼稚園 (563889)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 39696,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(1500, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$39,696',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（全日班）：HK$1,500'
WHERE school_code = '563889';

-- 港九街坊婦女會丁毓珠幼稚園 (563897)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 50976,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(1500, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$50,976',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（全日班）：HK$1,500'
WHERE school_code = '563897';

-- 東華三院捷和鄭氏幼兒園 (564095)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 45972,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$45,972',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（全日班）：HK$1,570'
WHERE school_code = '564095';

-- 東華三院方樹泉幼兒園 (564133)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 41532,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$41,532',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（全日班）：HK$1,570'
WHERE school_code = '564133';

-- 香港東區婦女福利會幼兒園 (564222)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 47400,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$47,400',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（全日班）：HK$1,570'
WHERE school_code = '564222';

-- 香港東區婦女福利會黎桂添幼兒園 (564230)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 41616,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(1500, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$41,616',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（全日班）：HK$1,500'
WHERE school_code = '564230';

-- 基督教香港信義會興民幼兒學校 (564583)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 25020,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$25,020',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,500'
WHERE school_code = '564583';

-- 香港中國婦女會幼稚園 (564745)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 52464,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1000, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$52,464',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$1,000'
WHERE school_code = '564745';

-- 基督教香港信義會興華幼兒學校 (564800)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 51540,
  application_fee_hkd = COALESCE(30, application_fee_hkd),
  registration_fee_hkd = COALESCE(1500, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$51,540',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$30；註冊費（全日班）：HK$1,500'
WHERE school_code = '564800';

-- 路德會杏花邨幼兒園 (565830)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 40128,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(950, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$40,128',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$950；註冊費（全日班）：HK$1,500'
WHERE school_code = '565830';

-- 明愛香港太平洋獅子會幼兒學校 (566039)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 37728,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1500, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$37,728',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$1,500'
WHERE school_code = '566039';

-- 寶寶幼兒學校 (566101)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 49200,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(800, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$49,200；全日班：全年 HK$71,280',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$800；註冊費（全日班）：HK$800'
WHERE school_code = '566101';

-- 中華基督教會柴灣堂幼兒園 (566152)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 21972,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$21,972',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '566152';

-- 筲箕灣崇真幼兒學校 (566420)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 64092,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$64,092',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$1,570'
WHERE school_code = '566420';

-- 維多利亞（海峰園）幼兒園 (566934)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = NULL,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(0, registration_fee_hkd),
  fee_notes = NULL,
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$0'
WHERE school_code = '566934';

-- 銅鑼灣維多利亞（海峰園）幼兒園 (566942)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 114336,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(0, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$114,336',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$0；註冊費（全日班）：HK$0'
WHERE school_code = '566942';

-- 明慧國際幼稚園 (566977)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 71720,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$71,720；全日班：全年 HK$116,930',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '566977';

-- 明慧國際幼稚園（北角分校） (567329)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 71720,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$71,720',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '567329';

-- 保良局慧妍雅集幼稚園 (567345)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 38400,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$38,400',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（全日班）：HK$1,570'
WHERE school_code = '567345';

-- 康怡維多利亞幼稚園 (569828)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 123420,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$123,420',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '569828';

-- 多多寶馬山國際幼稚園 (575852)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 156960,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(0, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$156,960',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$0；註冊費（半日班）：HK$0'
WHERE school_code = '575852';

-- 嶺南幼稚園（小西灣） (589144)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '589144';

-- ABC PATHWAYS INTERNATIONAL KINDERGARTEN (602329)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 88560,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$88,560',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '602329';

-- 雅惠國際幼稚園（鯉景灣） (604585)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = NULL,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = NULL,
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '604585';

-- 港島蒙特梭利國際幼稚園 (607223)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '607223';

-- GUIDEPOST MONTESSORI INTERNATIONAL KINDERGARTEN (CHAI WAN) (609285)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 102000,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(0, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$102,000',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$0；註冊費（半日班）：HK$0'
WHERE school_code = '609285';

-- 嶺南幼稚園（小西灣）二校 (610534)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 39120,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$39,120；全日班：全年 HK$70,620',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '610534';

-- 學之園幼稚園（君豪峰） (613681)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 86400,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$86,400',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '613681';

-- 樂沛兒幼稚園 - 柴灣 (622699)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 68400,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$68,400；全日班：全年 HK$114,600',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '622699';

-- 中華基督教會長洲堂錦江幼稚園 (151424)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 37944,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(900, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$37,944；全日班：全年 HK$66,996',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$900；註冊費（全日班）：HK$1,500'
WHERE school_code = '151424';

-- 天主教露德聖母幼稚園 (151564)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,500'
WHERE school_code = '151564';

-- 長洲聖心幼稚園 (152978)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '152978';

-- 惠平幼稚園 (153931)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$0；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '153931';

-- 基督教宣道會大澳幼稚園 (155233)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(700, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（半日班）：HK$700；註冊費（全日班）：HK$700'
WHERE school_code = '155233';

-- 力行幼稚園 (155705)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '155705';

-- 力行幼稚園 (155705)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '155705';

-- 南英幼稚園 (156698)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(30, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$30；註冊費（半日班）：HK$970'
WHERE school_code = '156698';

-- DISCOVERY BAY INTERNATIONAL SCHOOL (230987)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(2000, application_fee_hkd),
  registration_fee_hkd = COALESCE(0, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$2,000；註冊費（全日班）：HK$0'
WHERE school_code = '230987';

-- 佛教張梅桂幼稚園 (517518)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(900, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$900；註冊費（全日班）：HK$1,500'
WHERE school_code = '517518';

-- 弘志幼稚園 (519871)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 91200,
  application_fee_hkd = COALESCE(50, application_fee_hkd),
  registration_fee_hkd = COALESCE(0, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$91,200',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$50；註冊費（半日班）：HK$0'
WHERE school_code = '519871';

-- 青松裕雅幼稚園 (520144)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '520144';

-- 保良局張潘美意幼稚園 (523445)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '523445';

-- 金巴崙長老會青草地幼稚園 (524123)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(900, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$900；註冊費（全日班）：HK$1,500'
WHERE school_code = '524123';

-- 國民學校中英文幼稚園 (舊校名稱:國民學校漢師中英文幼稚園) (527211)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 38856,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$38,856；全日班：全年 HK$68,172',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,940'
WHERE school_code = '527211';

-- 東涌浸信會幼稚園 (542296)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '542296';

-- 東涌天主教幼稚園 (543004)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '543004';

-- 基督徒信望愛堂逸東幼稚園 (554251)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(20, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$20；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '554251';

-- 太陽島幼稚園（東涌分校） (555576)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '555576';

-- 善一堂逸東幼稚園 (556122)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '556122';

-- 佛教真如李琴芝紀念幼稚園 (556220)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 33600,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$33,600',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '556220';

-- 路德會呂君博幼兒園 (565717)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 34152,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(500, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$34,152',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$500；註冊費（全日班）：HK$1,000'
WHERE school_code = '565717';

-- 路德會陳恩美幼兒園 (565741)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 34572,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(500, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$34,572',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$500；註冊費（全日班）：HK$1,000'
WHERE school_code = '565741';

-- 鄰舍輔導會東涌幼兒園 (566381)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 45960,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(1000, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$45,960',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（全日班）：HK$1,000'
WHERE school_code = '566381';

-- 香港聖公會東涌幼兒學校 (566926)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 45264,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(1000, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$45,264',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（全日班）：HK$1,000'
WHERE school_code = '566926';

-- 鄰舍輔導會東欣幼兒園 (575011)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 54768,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(1000, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$54,768',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（全日班）：HK$1,000'
WHERE school_code = '575011';

-- 弘志幼稚園（東涌） (578193)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 88800,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(0, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$88,800',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$0；註冊費（半日班）：HK$0'
WHERE school_code = '578193';

-- 香港國際蒙特梭利學校 (584606)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 105360,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$105,360',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$970'
WHERE school_code = '584606';

-- 小大嶼山蒙特梭利幼稚園 (587877)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(30, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$30；註冊費（半日班）：HK$970'
WHERE school_code = '587877';

-- LA PETITE ENFANCE KINDERGARTEN (590029)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(0, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$0；註冊費（半日班）：HK$0；註冊費（全日班）：HK$0'
WHERE school_code = '590029';

-- 英基國際幼稚園（東涌） (600350)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 149880,
  application_fee_hkd = COALESCE(1000, application_fee_hkd),
  registration_fee_hkd = COALESCE(0, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$149,880',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$1,000；註冊費（半日班）：HK$0'
WHERE school_code = '600350';

-- DISCOVERY MONTESSORI ACADEMY (600814)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(0, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$0；註冊費（半日班）：HK$0'
WHERE school_code = '600814';

-- GUIDEPOST MONTESSORI INTERNATIONAL KINDERGARTEN (DISCOVERY BAY) (609625)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(0, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$0；註冊費（半日班）：HK$0'
WHERE school_code = '609625';

-- 救世軍源林潔和幼稚園 (612936)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(30, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$30；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '612936';

-- 香港基督教女青年會趣沂幼稚園 (615080)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '615080';

-- 協恩中學附屬幼稚園 (132870)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '132870';

-- 神召第一幼稚園 (133779)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '133779';

-- 閩光書院 (133787)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '133787';

-- 宣道幼稚園 (138835)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '138835';

-- 基督堂幼稚園 (210196)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '210196';

-- 聖若望英文書院 (212466)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 88800,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$88,800',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '212466';

-- 金巴倫英文幼稚園 (214868)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(90, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$90；註冊費（半日班）：HK$970'
WHERE school_code = '214868';

-- 國際英文幼稚園 (215120)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '215120';

-- 國際英文幼稚園 (215120)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '215120';

-- KOWLOON BAPTIST CHURCH KINDERGARTEN (215244)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(0, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$0'
WHERE school_code = '215244';

-- 約克中英文幼稚園 (215449)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '215449';

-- 太陽島英文幼稚園 (215678)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 57408,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$57,408',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '215678';

-- 香港澳洲國際學校 (216275)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(1500, application_fee_hkd),
  registration_fee_hkd = COALESCE(0, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$1,500；註冊費（半日班）：HK$0'
WHERE school_code = '216275';

-- 美國國際學校 (287695)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(1500, application_fee_hkd),
  registration_fee_hkd = COALESCE(0, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$1,500；註冊費（半日班）：HK$0；註冊費（全日班）：HK$0'
WHERE school_code = '287695';

-- 聖羅撒幼稚園 (312479)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '312479';

-- 基督教中心幼稚園 (315907)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 54060,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$54,060',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '315907';

-- 根德園幼稚園 (322300)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '322300';

-- 約克英文小學暨幼稚園（九龍塘） (322822)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 68736,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$68,736',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '322822';

-- 約克英文小學暨幼稚園（九龍塘） (322822)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '322822';

-- 啓思幼稚園 (323926)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 97680,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$97,680；全日班：全年 HK$128,160',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '323926';

-- 九龍城浸信會幼稚園 (324078)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '324078';

-- 香港培道小學 (324477)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '324477';

-- 聖馬可堂白普理幼稚園 (324647)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '324647';

-- 九龍靈糧堂幼稚園 (324680)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '324680';

-- 九龍迦南中英文幼稚園 (324930)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '324930';

-- 美雅幼稚園 (325040)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 78228,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(950, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$78,228',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$950；註冊費（全日班）：HK$1,500'
WHERE school_code = '325040';

-- 耀中國際學校 (325147)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$0；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '325147';

-- 聖三一中心幼稚園 (325180)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 85392,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$85,392',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$1,570'
WHERE school_code = '325180';

-- 聖公會聖三一堂曾肇添幼稚園 (325600)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '325600';

-- 美雅幼稚園（分校） (325775)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = NULL,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(950, registration_fee_hkd),
  fee_notes = NULL,
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$950；註冊費（全日班）：HK$1,500'
WHERE school_code = '325775';

-- 香港創價幼稚園 (325856)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '325856';

-- 保良局李徐松聲紀念幼稚園 (325988)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '325988';

-- 香港培正小學 (513350)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(100, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$100；註冊費（半日班）：HK$970'
WHERE school_code = '513350';

-- 京斯敦國際幼稚園 (519863)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(0, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$0；註冊費（半日班）：HK$0'
WHERE school_code = '519863';

-- 太陽島英文幼稚園（樂民） (523526)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '523526';

-- YORK ENGLISH PRE-SCHOOL (526100)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 120000,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$120,000',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '526100';

-- 迦南幼稚園（九龍塘） (531910)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = NULL,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = NULL,
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '531910';

-- 安菲爾國際幼稚園 (535818)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 105600,
  application_fee_hkd = COALESCE(800, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$105,600',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$800；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '535818';

-- 安菲爾國際幼稚園 (535818)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(800, application_fee_hkd),
  registration_fee_hkd = COALESCE(0, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$800；註冊費（半日班）：HK$0；註冊費（全日班）：HK$0'
WHERE school_code = '535818';

-- 何文田浸信會幼稚園 (536024)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '536024';

-- 聖文嘉幼稚園 (537349)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '537349';

-- 劍鳴幼稚園 (537713)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 72660,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$72,660',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '537713';

-- 保良局譚歐陽少芳紀念幼稚園 (539104)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '539104';

-- 多多國際幼稚園（九龍塘） (542504)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 150960,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(0, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$150,960',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$0；註冊費（半日班）：HK$0'
WHERE school_code = '542504';

-- 啓思小學附屬幼稚園 (544744)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(80, application_fee_hkd),
  registration_fee_hkd = COALESCE(1600, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$80；註冊費（半日班）：HK$1,600'
WHERE school_code = '544744';

-- 救世軍樂民幼兒學校 (563064)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 45588,
  application_fee_hkd = COALESCE(20, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$45,588',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$20；註冊費（全日班）：HK$1,570'
WHERE school_code = '563064';

-- 東華三院羅黃碧珊幼兒園 (563579)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 40428,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$40,428',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（全日班）：HK$1,570'
WHERE school_code = '563579';

-- 基督教香港崇真會安基幼兒學校 (563781)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 67140,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1000, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$67,140',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$1,000'
WHERE school_code = '563781';

-- 保良局呂陳慧貞幼稚園 (563803)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 44604,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$44,604',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（全日班）：HK$1,570'
WHERE school_code = '563803';

-- 保良局林丁麗玲幼稚園 (563927)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 46164,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$46,164',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（全日班）：HK$1,570'
WHERE school_code = '563927';

-- 博愛醫院任永賢夫人幼稚園 (564001)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 51768,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$51,768',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$1,570'
WHERE school_code = '564001';

-- 九龍靈糧堂幼兒園 (564524)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 86220,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$86,220',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$1,570'
WHERE school_code = '564524';

-- 基督教香港信義會馬頭圍幼兒學校 (564567)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 32868,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1500, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$32,868',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$1,500'
WHERE school_code = '564567';

-- 嗇色園主辦可愛幼兒園 (564869)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 36600,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$36,600',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$1,570'
WHERE school_code = '564869';

-- 何文田循道衛理楊震幼兒學校 (565016)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 47952,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$47,952',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$1,570'
WHERE school_code = '565016';

-- 迦南幼稚園（窩打老道） (565130)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 51700,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$51,700',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '565130';

-- 香港保護兒童會馬頭涌幼兒學校 (565229)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 33444,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$33,444',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（全日班）：HK$1,570'
WHERE school_code = '565229';

-- 香港保護兒童會新航黃埔幼兒學校 (565288)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 40476,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$40,476',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（全日班）：HK$1,570'
WHERE school_code = '565288';

-- 港青基信幼兒學校（農圃道） (565520)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 55884,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$55,884',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$1,570'
WHERE school_code = '565520';

-- 美雅幼兒園 (565687)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 48000,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1500, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$48,000；全日班：全年 HK$78,012',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$1,500'
WHERE school_code = '565687';

-- 路德會包美達幼兒園 (565695)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 35616,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1500, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$35,616',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$1,500'
WHERE school_code = '565695';

-- 耀中國際幼稚園（窩打老道） (566110)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 145524,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$145,524；全日班：全年 HK$240,900',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$0；註冊費（全日班）：HK$1,570'
WHERE school_code = '566110';

-- 耀中國際幼稚園（根德道） (566128)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 145524,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$145,524；全日班：全年 HK$240,900',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$0；註冊費（全日班）：HK$1,570'
WHERE school_code = '566128';

-- 保良局陳黎惠蓮幼稚園 (566691)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 38376,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$38,376',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（全日班）：HK$1,570'
WHERE school_code = '566691';

-- 維多利亞（何文田）國際幼兒園 (566900)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 143184,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(0, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$143,184',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$0；註冊費（全日班）：HK$0'
WHERE school_code = '566900';

-- 耀中幼稚園（森麻實道） (567140)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 145524,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$145,524；全日班：全年 HK$240,900',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$0；註冊費（全日班）：HK$1,570'
WHERE school_code = '567140';

-- 民生書院幼稚園 (575410)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '575410';

-- 迦南幼稚園（黃埔花園） (575518)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = NULL,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = NULL,
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '575518';

-- YORK INTERNATIONAL PRE-SCHOOL (578479)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 102000,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$102,000',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '578479';

-- 約克國際幼稚園 (581852)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '581852';

-- 文娜雅拔幼稚園 (584517)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 73568,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$73,568',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '584517';

-- ST. CATHERINE'S KINDERGARTEN (HARBOUR PLACE) (586625)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 90324,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$90,324',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '586625';

-- KOHITSUJI KINDERGARTEN (593630)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = NULL,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(0, registration_fee_hkd),
  fee_notes = NULL,
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$0；註冊費（半日班）：HK$0；註冊費（全日班）：HK$0'
WHERE school_code = '593630';

-- 伽利利國際幼稚園 (597031)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 72000,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$72,000',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '597031';

-- 聖姬莉國際幼稚園 (597538)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 72000,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$72,000',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '597538';

-- 新加坡卓薈國際幼稚園（界限街） (599182)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 67632,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$67,632',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '599182';

-- 樂沛兒幼稚園 (599263)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 78960,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$78,960；全日班：全年 HK$126,060',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '599263';

-- 港青基信幼稚園（啟晴） (599700)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '599700';

-- 佛教陳策文伉儷幼稚園 (600890)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '600890';

-- ABC PATHWAYS INTERNATIONAL KINDERGARTEN (WHAMPOA GARDEN) (603864)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 88560,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$88,560',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '603864';

-- 德萃幼稚園（紅磡） (604445)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 82320,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(6860, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$82,320',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$6,860'
WHERE school_code = '604445';

-- 九龍真光中學（幼稚園部） (607150)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '607150';

-- 學之園幼稚園（昇御海逸） (609528)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 90000,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$90,000',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '609528';

-- 瑪歌瑞特國際幼稚園 (610623)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = NULL,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = NULL,
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '610623';

-- 威廉（睿智）幼稚園（黃埔）（本地課程） (610771)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '610771';

-- 威廉（睿智）幼稚園（黃埔）（非本地課程） (610771)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '610771';

-- 漢師幼稚園（龍總） (616001)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(30, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$30；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '616001';

-- 茵晴幼稚園 (617741)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '617741';

-- 維多利亞（何文田）國際幼稚園 (618039)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(0, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$0'
WHERE school_code = '618039';

-- 聖公會荊冕堂士德幼稚園 (153087)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$0'
WHERE school_code = '153087';

-- 葵涌浸信會幼稚園 (155560)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(800, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$800；註冊費（全日班）：HK$1,500'
WHERE school_code = '155560';

-- 樂景幼稚園 (156205)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '156205';

-- 富瑤幼稚園 (156272)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(30, application_fee_hkd),
  registration_fee_hkd = COALESCE(900, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$30；註冊費（半日班）：HK$900；註冊費（全日班）：HK$1,500'
WHERE school_code = '156272';

-- 聖斯德望天主教幼稚園 (156841)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$970'
WHERE school_code = '156841';

-- 嘉言中英文幼稚園 (157643)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$970'
WHERE school_code = '157643';

-- 救世軍富強幼稚園 (157678)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 43200,
  application_fee_hkd = COALESCE(30, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$43,200',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$30；註冊費（半日班）：HK$970；註冊費（全日班）：HK$970'
WHERE school_code = '157678';

-- 保良局田家炳幼稚園 (157813)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '157813';

-- 路德會恩石幼稚園 (157856)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '157856';

-- 青衣商會幼稚園 (158070)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '158070';

-- 保良局曹金霖夫人幼稚園 (158453)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '158453';

-- 伊斯蘭博愛幼稚園 (158461)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '158461';

-- 保良局張心瑜幼稚園 (158488)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '158488';

-- 荃灣商會鍾來幼稚園 (158640)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '158640';

-- 香港聖公會基督顯現堂幼稚園 (159000)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '159000';

-- 荃灣商會朱昌幼稚園 (159026)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '159026';

-- 仁愛堂彭鴻樟幼稚園 (159093)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(900, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$900；註冊費（全日班）：HK$1,200'
WHERE school_code = '159093';

-- 卓思英文學校暨幼稚園（青怡分校） (231240)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 64200,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$64,200',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '231240';

-- 太陽島英文幼稚園（葵興分校） (231347)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '231347';

-- 康傑中英文幼稚園（青衣） (231614)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 62400,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$62,400',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '231614';

-- 循道衛理聯合教會亞斯理幼稚園 (510726)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 45480,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$45,480',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '510726';

-- 荃灣商會邱健峰幼稚園 (518077)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '518077';

-- 宏福中英文幼稚園 (519103)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '519103';

-- 聖公會荊冕堂葵涌幼稚園 (526665)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '526665';

-- 葵盛禮賢會幼稚園 (528153)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(900, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$900；註冊費（全日班）：HK$1,500'
WHERE school_code = '528153';

-- 天主教聖多默幼稚園 (532533)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(900, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$900；註冊費（全日班）：HK$900'
WHERE school_code = '532533';

-- 英基國際幼稚園（青衣） (532541)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(1000, application_fee_hkd),
  registration_fee_hkd = COALESCE(0, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$1,000；註冊費（半日班）：HK$0'
WHERE school_code = '532541';

-- 學之園幼稚園 (534200)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 90000,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$90,000',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '534200';

-- 啓思幼稚園（青衣） (534226)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 35500,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$35,500',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '534226';

-- 主蔭幼稚園 (540498)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$970'
WHERE school_code = '540498';

-- 東華三院王胡麗明幼稚園 (542547)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '542547';

-- 保良局譚華正夫人幼稚園 (542768)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '542768';

-- 平安福音堂幼稚園（青衣） (546127)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '546127';

-- 荃浸石籬幼稚園 (549355)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(30, application_fee_hkd),
  registration_fee_hkd = COALESCE(950, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$30；註冊費（半日班）：HK$950；註冊費（全日班）：HK$1,500'
WHERE school_code = '549355';

-- 中華基督教會全完幼稚園 (559962)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '559962';

-- 救世軍大窩口幼兒學校 (563099)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 42132,
  application_fee_hkd = COALESCE(20, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$42,132',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$20；註冊費（全日班）：HK$1,570'
WHERE school_code = '563099';

-- 仁濟醫院裘錦秋幼稚園 (563374)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 31332,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(1500, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$31,332',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（全日班）：HK$1,500'
WHERE school_code = '563374';

-- 仁濟醫院九龍崇德社幼稚園 (563382)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 35820,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$35,820',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$1,570'
WHERE school_code = '563382';

-- 仁濟醫院董伯英幼稚園 (563404)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 41196,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(1000, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$41,196',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（全日班）：HK$1,000'
WHERE school_code = '563404';

-- 保良局李俊駒伉儷幼稚園 (563994)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 37296,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$37,296',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（全日班）：HK$1,570'
WHERE school_code = '563994';

-- 東華三院香港鑪峯獅子會幼兒園 (564141)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 45948,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$45,948',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（全日班）：HK$1,570'
WHERE school_code = '564141';

-- 禮賢會荔景幼兒園 (564630)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 53076,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(750, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$53,076',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（半日班）：HK$750；註冊費（全日班）：HK$1,500'
WHERE school_code = '564630';

-- 中華基督教青年會葵涌幼稚園 (564680)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '564680';

-- 基督教香港信義會靈工幼兒學校 (564842)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 50424,
  application_fee_hkd = COALESCE(30, application_fee_hkd),
  registration_fee_hkd = COALESCE(1500, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$50,424',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$30；註冊費（全日班）：HK$1,500'
WHERE school_code = '564842';

-- 香港聖公會麥理浩夫人中心〈石蔭〉幼稚園 (564893)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 41472,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$41,472',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$1,570'
WHERE school_code = '564893';

-- 香港聖公會麥理浩夫人中心幼稚園 (564907)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 43608,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$43,608',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$1,570'
WHERE school_code = '564907';

-- 基督教香港信義會天恩幼兒學校 (565571)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 42780,
  application_fee_hkd = COALESCE(30, application_fee_hkd),
  registration_fee_hkd = COALESCE(1500, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$42,780',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$30；註冊費（全日班）：HK$1,500'
WHERE school_code = '565571';

-- 路德會青衣城幼兒園 (565709)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 43032,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$43,032',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$1,570'
WHERE school_code = '565709';

-- 路德會長青幼兒園 (565733)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 34140,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(900, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$34,140',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$900；註冊費（全日班）：HK$1,500'
WHERE school_code = '565733';

-- 世佛會文殊幼兒學校 (565903)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 42000,
  application_fee_hkd = COALESCE(30, application_fee_hkd),
  registration_fee_hkd = COALESCE(900, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$42,000；全日班：全年 HK$45,900',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$30；註冊費（半日班）：HK$900；註冊費（全日班）：HK$1,500'
WHERE school_code = '565903';

-- 新界婦孺福利會長發幼兒學校 (566322)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 49332,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1500, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$49,332',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$1,500'
WHERE school_code = '566322';

-- 保良局呂陳慧貞（葵芳）幼稚園 (566675)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 36264,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$36,264',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（全日班）：HK$1,570'
WHERE school_code = '566675';

-- 聖公會聖基道幼兒園（葵涌） (568104)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 60504,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1500, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$60,504',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$1,500'
WHERE school_code = '568104';

-- 善正幼稚園 (582530)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,000'
WHERE school_code = '582530';

-- 康傑中英文幼稚園（青衣南） (609919)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 68400,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$68,400；全日班：全年 HK$102,000',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '609919';

-- 協康會上海總會康苗幼稚園 (612561)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '612561';

-- 奧基英文幼稚園 (622982)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 60000,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$60,000',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '622982';

-- 宏福幼稚園（青富） (623474)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 51600,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$51,600；全日班：全年 HK$88,596',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '623474';

-- 香港基督教女青年會青衣幼兒學校 (623598)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 40920,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$40,920',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$1,570'
WHERE school_code = '623598';

-- 迦南幼稚園（麗港城） (216054)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = NULL,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = NULL,
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '216054';

-- 朗思國際幼稚園 (216267)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 83040,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(0, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$83,040；全日班：全年 HK$148,620',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$0；註冊費（全日班）：HK$0'
WHERE school_code = '216267';

-- 香港路德會觀塘幼稚園 (311650)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(0, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$0；註冊費（全日班）：HK$1,000'
WHERE school_code = '311650';

-- 聖巴拿巴堂幼稚園 (319562)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '319562';

-- 觀塘循道幼稚園 (319775)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '319775';

-- 鑽石山浸信會美欣幼稚園 (322580)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '322580';

-- 歡樂創意幼稚園（觀塘分校） (323055)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '323055';

-- 中華基督教會基法幼稚園 (323250)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '323250';

-- 佛教金麗幼稚園 (323497)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(900, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$900'
WHERE school_code = '323497';

-- 官塘浸信會幼稚園 (324248)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$970'
WHERE school_code = '324248';

-- 善一堂安逸幼稚園 (324426)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '324426';

-- 德福幼稚園（非本地課程） (324736)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '324736';

-- 德福幼稚園（本地課程） (324736)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '324736';

-- 中華基督教會基華幼稚園 (324809)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '324809';

-- 路德會沙崙堂幼稚園 (325236)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '325236';

-- 基督教小天使（麗晶）幼稚園 (325244)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 40044,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$40,044',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '325244';

-- 天主教彩霞邨潔心幼稚園 (325694)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '325694';

-- 天主教聖雅各伯幼稚園 (325708)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '325708';

-- 路德會聖腓力堂幼稚園 (325732)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '325732';

-- 康盈中英文幼稚園 (325791)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 30324,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(800, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$30,324',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$800；註冊費（全日班）：HK$1,000'
WHERE school_code = '325791';

-- 啓思幼稚園（匯景花園）（非本地課程） (325864)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '325864';

-- 啓思幼稚園（匯景花園）（本地課程） (325864)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '325864';

-- 聖公會慈光堂聖匠幼稚園 (325937)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 43800,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$43,800；全日班：全年 HK$85,200',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '325937';

-- 保良局方王錦全幼稚園 (516309)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '516309';

-- 東華三院黃士心幼稚園 (517127)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '517127';

-- 中華傳道會基石幼稚園 (522910)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '522910';

-- 宣道會秀茂坪陳李詠貞幼稚園 (523178)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 31400,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$31,400；全日班：全年 HK$54,000',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '523178';

-- 救世軍平田幼稚園 (523364)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = NULL,
  application_fee_hkd = COALESCE(30, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = NULL,
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$30；註冊費（半日班）：HK$970'
WHERE school_code = '523364';

-- 路德會陳蒙恩幼稚園 (523895)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '523895';

-- 藍田靈糧幼稚園 (524034)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 66360,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$66,360',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '524034';

-- 圓玄幼稚園（平田邨） (528366)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 40896,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$40,896',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '528366';

-- 聖安當幼稚園 (532169)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '532169';

-- 順德聯誼總會梁潔華幼稚園 (543390)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '543390';

-- 樂善堂文吳泳沂幼稚園 (546038)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '546038';

-- 鯉魚門循道衞理幼稚園 (548278)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '548278';

-- 平安福音堂幼稚園（牛頭角） (550663)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '550663';

-- 晶晶幼稚園（順利分校） (550892)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 38480,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$38,480',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '550892';

-- 香港小童群益會樂緻幼稚園（九龍灣） (563455)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 31092,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$31,092；全日班：全年 HK$33,036',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$1,570'
WHERE school_code = '563455';

-- 天主教聖雲先幼兒學校 (563510)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 36744,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(1500, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$36,744',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（全日班）：HK$1,500'
WHERE school_code = '563510';

-- 東華三院陳嫺幼兒園 (563536)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 48720,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$48,720',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（全日班）：HK$1,570'
WHERE school_code = '563536';

-- 新九龍婦女會樂華幼兒園 (563609)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 30264,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1000, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$30,264',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$1,000'
WHERE school_code = '563609';

-- 保良局吳寶玲幼稚園 (563730)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 40440,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$40,440',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（全日班）：HK$1,570'
WHERE school_code = '563730';

-- 基督教香港崇真會安怡幼兒學校 (563749)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 55800,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1000, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$55,800',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$1,000'
WHERE school_code = '563749';

-- 保良局黃樹雄幼稚園 (563790)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 33372,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$33,372',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（全日班）：HK$1,570'
WHERE school_code = '563790';

-- 保良局李筱參幼稚園 (563935)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 38364,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$38,364',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（全日班）：HK$1,570'
WHERE school_code = '563935';

-- 保良局鄭關巧妍幼稚園 (563951)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 43680,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$43,680',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（全日班）：HK$1,570'
WHERE school_code = '563951';

-- 博愛醫院陳徐鳳蘭幼稚園 (564036)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 44784,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$44,784',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$1,570'
WHERE school_code = '564036';

-- 聖母潔心會福音秀茂坪幼稚園 (564389)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 52308,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1500, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$52,308',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$1,500'
WHERE school_code = '564389';

-- 禮賢會順天幼兒園 (564486)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 40644,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(1500, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$40,644',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（全日班）：HK$1,500'
WHERE school_code = '564486';

-- 基督教香港信義會啟業幼兒學校 (564575)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 28836,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1500, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$28,836',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$1,500'
WHERE school_code = '564575';

-- 基督教家庭服務中心德田幼稚園 (564656)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 54660,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$54,660',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$1,570'
WHERE school_code = '564656';

-- 基督教家庭服務中心趣樂幼稚園 (564664)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 43116,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$43,116',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$1,570'
WHERE school_code = '564664';

-- 基督教香港信義會靈安幼兒學校 (564834)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 45624,
  application_fee_hkd = COALESCE(30, application_fee_hkd),
  registration_fee_hkd = COALESCE(1500, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$45,624',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$30；註冊費（全日班）：HK$1,500'
WHERE school_code = '564834';

-- 香港保護兒童會譚雅士伉儷幼兒學校 (565210)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 36180,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$36,180',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（全日班）：HK$1,570'
WHERE school_code = '565210';

-- 花園大廈浸信會幼兒學校 (565369)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 59124,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$59,124',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$1,570'
WHERE school_code = '565369';

-- 香港基督教服務處觀塘幼兒學校 (565415)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 54720,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1500, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$54,720',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$1,500'
WHERE school_code = '565415';

-- 佛教慈慧幼兒園 (565946)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 31272,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1400, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$31,272',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$1,400'
WHERE school_code = '565946';

-- 明愛鯉魚門幼兒學校 (565962)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 33516,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$33,516',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$1,570'
WHERE school_code = '565962';

-- 明愛油塘幼兒學校 (566004)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 35568,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$35,568',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$1,570'
WHERE school_code = '566004';

-- 啓思幼兒園（匯景） (566071)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 43056,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$43,056；全日班：全年 HK$71,676',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '566071';

-- 香港學生輔助會寶達幼兒園 (566160)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 46368,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1500, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$46,368',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$1,500'
WHERE school_code = '566160';

-- 博愛醫院施淑鎮幼稚園 (566683)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 47976,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$47,976',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$1,570'
WHERE school_code = '566683';

-- 基督教聯合醫務協會幼兒學校 (566950)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 79584,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1500, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$79,584',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$1,500'
WHERE school_code = '566950';

-- 基督教小樹苗幼稚園 (577987)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '577987';

-- 楓葉小熊加拿大國際幼稚園（油塘） (593788)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 88200,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$88,200',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '593788';

-- 香港青年協會鄭堅固幼稚園 (594130)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '594130';

-- 救世軍中原慈善基金油塘幼稚園 (595365)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(30, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$30；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '595365';

-- 基督教中心幼稚園（油塘） (595837)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 51600,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$51,600',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '595837';

-- 德福英文幼稚園 (601985)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '601985';

-- 保良局李樹福幼稚園 (604259)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 54120,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$54,120',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '604259';

-- 東華三院何藍瓊纓幼稚園 (605530)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '605530';

-- 香港基督教服務處雋樂幼稚園 (605662)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '605662';

-- 聖公會慈光堂聖匠幼稚園（分校） (607886)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '607886';

-- 基督教家庭服務中心楊蔡慧嫻紀念幼稚園 (610291)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '610291';

-- 光愛樂幼稚園（安泰） (613509)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '613509';

-- 基督教宣道會安泰幼稚園 (614114)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '614114';

-- 哈羅小獅幼稚園 (627275)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(0, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$0；註冊費（全日班）：HK$0'
WHERE school_code = '627275';

-- 上水堂幼稚園 (150843)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$970'
WHERE school_code = '150843';

-- 粉嶺神召會幼稚園 (153451)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '153451';

-- 金錢村何東幼稚園 (156191)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '156191';

-- 粉嶺浸信會呂明才幼稚園 (156230)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '156230';

-- 佛教沈東福幼稚園 (157252)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '157252';

-- 上水禮賢會幼稚園 (157406)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$0'
WHERE school_code = '157406';

-- 基督教香港信義會祥華幼稚園 (157627)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '157627';

-- 基督教香港信義會祥華幼稚園 (157627)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '157627';

-- 神召會華人同工聯會彩蒲幼稚園 (157791)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(900, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$900；註冊費（全日班）：HK$1,500'
WHERE school_code = '157791';

-- 上水惠州幼稚園（分校） (158208)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '158208';

-- 鳳溪幼稚園 (158364)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(900, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$900；註冊費（全日班）：HK$1,500'
WHERE school_code = '158364';

-- 東華三院徐展堂幼稚園 (158534)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '158534';

-- 太平幼稚園 (158593)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '158593';

-- 香海正覺蓮社佛教慧光幼稚園 (158720)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '158720';

-- 基督徒信望愛堂華明幼稚園 (158763)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '158763';

-- 保良局莊啓程夫人幼稚園 (158780)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '158780';

-- 明愛聖方濟各幼稚園 (320544)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '320544';

-- 東華三院文頴怡幼稚園 (325767)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '325767';

-- 保良局葉吳彬彬皇后山幼稚園 (516384)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '516384';

-- 九龍城浸信會嘉福幼稚園 (516627)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '516627';

-- 神召會華人同工聯會景盛幼稚園 (519090)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '519090';

-- 基督教粉嶺神召會恩光幼稚園 (519499)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = NULL,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = NULL,
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '519499';

-- 牽晴間培元英文幼稚園 (536415)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 45624,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$45,624；全日班：全年 HK$67,524',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '536415';

-- 真理浸信會何袁惠琼幼稚園 (536709)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '536709';

-- 香港五常法幼稚園 (537098)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 32724,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$32,724；全日班：全年 HK$72,036',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '537098';

-- 香港道教聯合會蓬瀛通善皇后山幼稚園 (542326)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '542326';

-- 救世軍天平幼兒學校 (563110)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 43428,
  application_fee_hkd = COALESCE(20, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$43,428',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$20；註冊費（全日班）：HK$1,570'
WHERE school_code = '563110';

-- 嘉福浸信會幼兒園 (563285)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 53688,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$53,688',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$1,570'
WHERE school_code = '563285';

-- 仁濟醫院永隆幼稚園 (563390)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 43968,
  application_fee_hkd = COALESCE(30, application_fee_hkd),
  registration_fee_hkd = COALESCE(1500, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$43,968',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$30；註冊費（全日班）：HK$1,500'
WHERE school_code = '563390';

-- 東華三院洪王家琪幼兒園 (563544)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 47664,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(1500, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$47,664',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（全日班）：HK$1,500'
WHERE school_code = '563544';

-- 香港保護兒童會聖誕老人愛心粉嶺幼兒學校 (565202)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 37692,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$37,692',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（全日班）：HK$1,570'
WHERE school_code = '565202';

-- 明愛打鼓嶺幼兒學校 (565989)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 32124,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$32,124',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$1,570'
WHERE school_code = '565989';

-- 明愛香港崇德社幼兒學校 (566047)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 37536,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$37,536',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$1,570'
WHERE school_code = '566047';

-- 瑪歌瑞特國際幼稚園（粉嶺） (566241)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = NULL,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = NULL,
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '566241';

-- 新界婦孺福利會粉嶺幼兒學校 (566306)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 45504,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1500, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$45,504',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$1,500'
WHERE school_code = '566306';

-- 新界婦孺福利會上水幼兒學校 (566330)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 48576,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1500, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$48,576',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$1,500'
WHERE school_code = '566330';

-- 鄰舍輔導會粉嶺幼兒園 (566390)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 47544,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(1000, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$47,544',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（全日班）：HK$1,000'
WHERE school_code = '566390';

-- 香港宣教會優質幼兒學校 (569569)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '569569';

-- 中華基督教青年會上水幼稚園 (575429)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '575429';

-- 安基司幼稚園（粉嶺） (582417)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 74400,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$74,400；全日班：全年 HK$112,344',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '582417';

-- 香海正覺蓮社佛教慧光嘉福幼稚園 (587141)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 39720,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$39,720',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '587141';

-- 耀基創藝幼稚園 (587869)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 49610,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$49,610',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '587869';

-- 耀基創藝幼稚園（上水） (597295)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 49610,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$49,610',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '597295';

-- 麥克萊國際幼稚園 (601250)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 46800,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$46,800；全日班：全年 HK$92,400',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '601250';

-- 西貢樂育幼稚園 (153036)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(800, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$800；註冊費（全日班）：HK$1,500'
WHERE school_code = '153036';

-- 保良局葉吳彬彬幼稚園 (158232)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '158232';

-- 翠林邨浸信會幼稚園 (158470)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 51300,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$51,300',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,500'
WHERE school_code = '158470';

-- 崇真會美善幼稚園 (158526)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '158526';

-- 香港浸信會聯會香港西北扶輪社幼稚園 (158739)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '158739';

-- 將軍澳英皇幼稚園 (158771)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 44940,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$44,940；全日班：全年 HK$63,300',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '158771';

-- 東華三院力勤幼稚園 (158984)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '158984';

-- 保良局方王換娣幼稚園 (159204)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '159204';

-- 救世軍慶恩幼稚園 (159239)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = NULL,
  application_fee_hkd = COALESCE(30, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = NULL,
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$30；註冊費（半日班）：HK$970'
WHERE school_code = '159239';

-- 基督教宣道會香港區聯會將軍澳宣道幼稚園 (159255)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '159255';

-- LYC'EE FRANCAIS INTERNATIONAL (FRENCH INTERNATIONAL SCHOOL) (214949)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(2200, application_fee_hkd),
  registration_fee_hkd = COALESCE(25000, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$2,200；註冊費（全日班）：HK$25,000'
WHERE school_code = '214949';

-- 比華利中英文幼稚園 (231363)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 66960,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$66,960',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '231363';

-- SAI KUNG PRE-SCHOOL GROUP (231371)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(0, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$0；註冊費（半日班）：HK$0'
WHERE school_code = '231371';

-- 香港神託會培恩幼稚園 (324957)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '324957';

-- 香港華人基督會煜明幼稚園 (519634)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '519634';

-- 綠茵英文（國際）幼稚園（將軍澳） (523984)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 74400,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$74,400；全日班：全年 HK$102,000',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '523984';

-- 基督教宣道會茵怡幼稚園 (524026)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '524026';

-- 太陽島英文幼稚園（西貢分校） (525731)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '525731';

-- 嗇色園主辦可正幼稚園 (525758)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '525758';

-- 中華基督教會香港志道堂基博幼稚園（將軍澳） (528609)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '528609';

-- 德寶英文幼稚園（將軍澳） (530131)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = NULL,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = NULL,
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '530131';

-- 德寶英文幼稚園（將軍澳） (530131)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = NULL,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = NULL,
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '530131';

-- 將軍澳循道衛理幼稚園 (530417)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '530417';

-- 新界婦孺福利會梁省德中英文幼稚園 (530735)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 36000,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$36,000；全日班：全年 HK$58,848',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '530735';

-- 小蜜蜂幼稚園 (532355)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(30, application_fee_hkd),
  registration_fee_hkd = COALESCE(0, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$30；註冊費（半日班）：HK$0'
WHERE school_code = '532355';

-- 基督教香港信義會將軍澳幼稚園 (533351)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '533351';

-- 青衣商會將軍澳幼稚園 (534153)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '534153';

-- 翠茵小宇宙幼稚園 (537527)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 66000,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$66,000；全日班：全年 HK$83,268',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '537527';

-- 香港學堂國際學校 (539155)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(1500, application_fee_hkd),
  registration_fee_hkd = COALESCE(0, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$1,500；註冊費（半日班）：HK$0'
WHERE school_code = '539155';

-- 仁愛堂鄧楊詠曼幼稚園 (540811)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 44496,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$44,496',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '540811';

-- 觀塘浸信會彩明幼稚園 (542830)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,550'
WHERE school_code = '542830';

-- 英基雅柏國際幼稚園 (549240)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(1000, application_fee_hkd),
  registration_fee_hkd = COALESCE(0, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$1,000；註冊費（半日班）：HK$0'
WHERE school_code = '549240';

-- 基督教樂道幼稚園 (554901)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '554901';

-- 東華三院香港華都獅子會幼稚園 (559385)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 34080,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$34,080',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（半日班）：HK$970；註冊費（全日班）：HK$0'
WHERE school_code = '559385';

-- 天主教聖安德肋幼稚園 (559768)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '559768';

-- 救世軍明德幼兒學校 (563072)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 41544,
  application_fee_hkd = COALESCE(20, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$41,544',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$20；註冊費（全日班）：HK$1,570'
WHERE school_code = '563072';

-- 香港聖公會聖西門西貢幼兒學校 (563269)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 56040,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(1000, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$56,040',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（全日班）：HK$1,000'
WHERE school_code = '563269';

-- 中國基督教播道會茵怡幼兒學校 (563340)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 37428,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$37,428',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（全日班）：HK$1,570'
WHERE school_code = '563340';

-- 中國基督教播道會厚恩堂厚恩幼兒學校 (563480)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 43248,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$43,248',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（全日班）：HK$1,570'
WHERE school_code = '563480';

-- 基督教聖約教會司務道幼稚園 (563498)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 38064,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$38,064；全日班：全年 HK$39,132',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '563498';

-- 保良局蔡繼有幼稚園 (563978)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 36204,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$36,204',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（全日班）：HK$1,570'
WHERE school_code = '563978';

-- LEAPFROG KINDERGARTEN (564770)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(0, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$0；註冊費（半日班）：HK$0'
WHERE school_code = '564770';

-- 基督教香港信義會健明幼兒學校 (564818)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 50892,
  application_fee_hkd = COALESCE(30, application_fee_hkd),
  registration_fee_hkd = COALESCE(1500, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$50,892',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$30；註冊費（全日班）：HK$1,500'
WHERE school_code = '564818';

-- 香港保護兒童會維景灣幼兒學校 (565008)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 41676,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$41,676',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（全日班）：HK$1,570'
WHERE school_code = '565008';

-- 香港保護兒童會施吳淑敏幼兒學校 (565270)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 40440,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$40,440',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（全日班）：HK$1,570'
WHERE school_code = '565270';

-- 香港小童群益會樂緻幼稚園（將軍澳） (565458)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 31380,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$31,380；全日班：全年 HK$47,952',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$1,570'
WHERE school_code = '565458';

-- 路德會景林幼兒園 (565768)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 40476,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$40,476',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '565768';

-- 明愛翠林幼兒學校 (565997)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 38544,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$38,544',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$1,570'
WHERE school_code = '565997';

-- 竹園區神召會將軍澳康樂幼兒學校 (566586)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 47400,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$47,400',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$1,570'
WHERE school_code = '566586';

-- 德寶國際幼兒學校（將軍澳） (567108)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 63600,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$63,600；全日班：全年 HK$95,844',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '567108';

-- 德寶國際幼兒學校（寶盈花園） (567116)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 63600,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$63,600；全日班：全年 HK$95,844',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '567116';

-- GARDEN HOUSE WALDORF KINDERGARTEN (575755)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 71280,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(0, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$71,280',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$0'
WHERE school_code = '575755';

-- GUIDEPOST MONTESSORI INTERNATIONAL PRE-SCHOOL (SAI KUNG) (578630)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(0, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$0；註冊費（半日班）：HK$0'
WHERE school_code = '578630';

-- 博士山（香港）國際幼稚園 - 將軍澳 (581836)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 76560,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$76,560',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '581836';

-- GUIDEPOST MONTESSORI INTERNATIONAL KINDERGARTEN (CLEARWATER BAY) (583774)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 99000,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(0, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$99,000',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$0；註冊費（半日班）：HK$0'
WHERE school_code = '583774';

-- 歡樂創意幼稚園 (592080)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 34596,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$34,596；全日班：全年 HK$61,764',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '592080';

-- 綠茵英文（國際）幼稚園（日出康城） (604372)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 69840,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$69,840',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '604372';

-- 英藝幼稚園（將軍澳） (607258)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 90000,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$90,000；全日班：全年 HK$126,792',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '607258';

-- NORD ANGLIA INTERNATIONAL PRE-SCHOOL (SAI KUNG) (608475)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(0, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$0；註冊費（半日班）：HK$0'
WHERE school_code = '608475';

-- YORK MONTESSORI INTERNATIONAL PRE-SCHOOL (TSEUNG KWAN O) (609749)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 76200,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$76,200',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '609749';

-- 學之園幼稚園（海翩康城） (612391)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 90000,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$90,000',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '612391';

-- 樂必津法國幼稚園 (613088)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 95400,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$95,400',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$0；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '613088';

-- 耀中國際幼稚園（將軍澳） (613517)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 145524,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$145,524；全日班：全年 HK$240,900',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$0；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '613517';

-- 楓葉小熊加拿大國際幼稚園 (613665)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = NULL,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = NULL,
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '613665';

-- INVICTUS KINDERGARTEN (615366)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$970'
WHERE school_code = '615366';

-- 楓葉小熊加拿大國際幼稚園（康城） (616311)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 75600,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$75,600；全日班：全年 HK$129,540',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '616311';

-- 栢基幼稚園（康城） (616443)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 91200,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$91,200',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '616443';

-- 迦南幼稚園（將軍澳） (619787)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = NULL,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = NULL,
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '619787';

-- 中華基督教會協和幼稚園 (132152)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(900, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$900'
WHERE school_code = '132152';

-- 又一村學校 (133850)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '133850';

-- 九龍禮賢學校 (138177)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '138177';

-- 地利亞英文小學暨幼稚園 (216208)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,545'
WHERE school_code = '216208';

-- 深水埗浸信會幼稚園 (317403)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '317403';

-- 中華基督教會深愛堂幼稚園 (319511)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(900, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$900；註冊費（全日班）：HK$1,500'
WHERE school_code = '319511';

-- 基督教挪威差會主辦信義中英文幼稚園 (323080)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '323080';

-- 聖多馬堂幼稚園 (323357)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '323357';

-- 宣美幼稚園 (323683)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 57540,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$57,540',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '323683';

-- 佳寶幼稚園 (324159)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '324159';

-- 西太平洋幼稚園 (324264)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '324264';

-- 佛教曾果成中英文幼稚園 (324787)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '324787';

-- 中華基督教會基真幼稚園 (324795)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '324795';

-- 聖公會深水埗基愛堂幼稚園 (325252)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$970'
WHERE school_code = '325252';

-- 德貞幼稚園 (325511)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$0'
WHERE school_code = '325511';

-- 基督教香港信義會南昌幼稚園 (325635)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '325635';

-- 深水埗德善幼稚園 (325830)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$970'
WHERE school_code = '325830';

-- 香港基督教女青年會宏恩幼稚園 (325953)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '325953';

-- 崇真小學暨幼稚園（非本地課程） (514659)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '514659';

-- 崇真小學暨幼稚園（本地課程） (514659)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '514659';

-- 智樂幼稚園 (532550)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(950, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$950；註冊費（全日班）：HK$1,500'
WHERE school_code = '532550';

-- 智樂幼稚園 (532550)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(950, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$950；註冊費（全日班）：HK$1,500'
WHERE school_code = '532550';

-- 宣道會雷蔡群樂幼稚園 (532800)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '532800';

-- 崇真會白田美善幼稚園 (536482)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '536482';

-- 保良局劉陳小寶幼稚園 (548723)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '548723';

-- 救世軍白田幼兒學校 (563170)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 41820,
  application_fee_hkd = COALESCE(20, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$41,820',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$20；註冊費（全日班）：HK$1,570'
WHERE school_code = '563170';

-- 寶血幼稚園（深水埗） (564044)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 39720,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$39,720；全日班：全年 HK$61,188',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$1,570'
WHERE school_code = '564044';

-- 香港基督教女青年會紹邦幼兒學校 (564443)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 59520,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$59,520',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$1,570'
WHERE school_code = '564443';

-- 香港保護兒童會長沙灣幼兒學校 (564478)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 40368,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$40,368',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（全日班）：HK$1,570'
WHERE school_code = '564478';

-- 香港基督教女青年會趙靄華幼兒學校 (564516)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 42384,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$42,384',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$1,570'
WHERE school_code = '564516';

-- 香港聖公會基愛幼兒學校 (564729)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 51048,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(1000, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$51,048',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（全日班）：HK$1,000'
WHERE school_code = '564729';

-- 香港基督教服務處大坑東幼兒學校 (565393)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 55392,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1500, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$55,392',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$1,500'
WHERE school_code = '565393';

-- 香港基督教服務處李鄭屋幼兒學校 (565407)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 49836,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1500, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$49,836',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$1,500'
WHERE school_code = '565407';

-- 浸信會愛羣社會服務處培殷幼兒學校 (565563)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 51864,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$51,864',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$1,570'
WHERE school_code = '565563';

-- 竹園區神召會南昌康樂幼兒學校 (566560)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 54228,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$54,228',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$1,570'
WHERE school_code = '566560';

-- 香港基督教服務處石硤尾幼兒學校 (566705)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 57960,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1200, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$57,960',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$1,200'
WHERE school_code = '566705';

-- 仁愛堂龐盧淑燕幼稚園 (567051)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '567051';

-- 保良局梁安琪幼稚園 (596116)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 47568,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$47,568',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（全日班）：HK$1,570'
WHERE school_code = '596116';

-- 香港靈糧堂秀德幼稚園 (596787)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 54672,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$54,672',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '596787';

-- 香港靈糧堂秀德幼稚園（二校） (601861)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '601861';

-- 雅士圖國際幼稚園 (604470)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = NULL,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = NULL,
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '604470';

-- YORK MONTESSORI INTERNATIONAL PRE-SCHOOL (MEI FOO) (604615)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 108900,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$108,900',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '604615';

-- 漢迪國際幼稚園 (607703)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = NULL,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = NULL,
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '607703';

-- 朗思國際幼稚園（南昌） (612782)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 87936,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$87,936',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$970'
WHERE school_code = '612782';

-- 基督教香港崇真會安康幼兒學校（順寧道） (613169)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 59220,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1000, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$59,220',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$1,000'
WHERE school_code = '613169';

-- 學之園幼稚園（星匯居） (615250)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 90000,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$90,000',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '615250';

-- 東華三院譚錦球伉儷幼稚園 (615315)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '615315';

-- 救世軍蘇屋幼稚園 (615641)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(30, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$30；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '615641';

-- 佳寶幼稚園（南昌分校） (618527)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '618527';

-- 長沙灣街坊福利會林譚燕華幼稚園（麗翠苑） (620149)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 44076,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1500, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$44,076',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$1,500'
WHERE school_code = '620149';

-- 樂善堂董清波幼稚園 (623580)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = NULL,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = NULL,
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '623580';

-- 聖母無玷聖心幼稚園 (151009)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '151009';

-- 基督教香港信義會沙田信義幼稚園 (151203)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '151203';

-- 聖公會靈風堂幼稚園 (156493)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '156493';

-- 東華三院廖恩德紀念幼稚園 (156752)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '156752';

-- 保良局吳多泰幼稚園 (156779)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '156779';

-- 救世軍田家炳幼稚園 (156973)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(30, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$30；註冊費（半日班）：HK$970'
WHERE school_code = '156973';

-- 中華基督教會沙田堂博康幼稚園 (157295)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '157295';

-- 東華三院馬陳景霞幼稚園 (157384)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '157384';

-- 東華三院呂馮鳳紀念幼稚園 (157511)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '157511';

-- 港九街坊婦女會孫方中幼稚園 (157597)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(900, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$900；註冊費（全日班）：HK$1,500'
WHERE school_code = '157597';

-- 樂善堂梁泳釗幼稚園 (157864)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '157864';

-- 順德聯誼總會梁李秀娛沙田幼稚園 (158160)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '158160';

-- 保良局馮梁結紀念幼稚園 (158240)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '158240';

-- 真理浸信會幼稚園 (158259)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '158259';

-- 平安福音堂幼稚園 (158429)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '158429';

-- 九龍城浸信會禧年幼稚園 (158569)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 36575,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$36,575',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '158569';

-- 廣林浸信會呂郭碧鳳幼稚園 (158704)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '158704';

-- 真理浸信會碧濤幼稚園 (158860)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = NULL,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = NULL,
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '158860';

-- 香港中文大學校友會聯會張煊昌幼稚園 (158887)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '158887';

-- 香港神託會培真幼稚園 (159212)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '159212';

-- 嘉德麗中英文幼稚園 (231266)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 56100,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$56,100；全日班：全年 HK$85,800',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '231266';

-- 大衛幼稚園 (231517)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 72000,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$72,000',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '231517';

-- 康傑中英文幼稚園（馬鞍山） (231657)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '231657';

-- 樂善堂李賢義幼稚園 (324884)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '324884';

-- 馬鞍山靈糧幼稚園 (520071)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '520071';

-- 基督教小天使（錦豐）幼稚園 (522678)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 28320,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$28,320',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '522678';

-- 樂基幼兒學校（駿景園） (522953)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 76680,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$76,680',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '522953';

-- 基督教宣道會頌安幼稚園 (524328)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(900, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$900；註冊費（全日班）：HK$1,500'
WHERE school_code = '524328';

-- 合一堂單家傳紀念幼稚園 (524441)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 31053,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$31,053',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '524441';

-- 朗思國際幼稚園（馬鞍山） (533360)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 83040,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$83,040；全日班：全年 HK$148,620',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$970'
WHERE school_code = '533360';

-- 啓思幼稚園（帝堡城） (537578)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 38496,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$38,496',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '537578';

-- 崇真會美善幼稚園（馬鞍山） (540579)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = NULL,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = NULL,
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '540579';

-- 基督教國際學校 - 幼稚園 (542598)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(1000, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$1,000；註冊費（半日班）：HK$970'
WHERE school_code = '542598';

-- 基督教神召會合一堂幼稚園 (543861)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '543861';

-- 博士山（香港）國際幼稚園 (559415)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 84960,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$84,960',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '559415';

-- 救世軍乙明幼兒學校 (562947)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 48336,
  application_fee_hkd = COALESCE(20, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$48,336',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$20；註冊費（全日班）：HK$1,570'
WHERE school_code = '562947';

-- 救世軍禾輋幼兒學校 (563153)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 41316,
  application_fee_hkd = COALESCE(20, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$41,316',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$20；註冊費（全日班）：HK$1,570'
WHERE school_code = '563153';

-- 香港基督教女青年會隆亨幼兒學校 (563234)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 40524,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$40,524',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$1,570'
WHERE school_code = '563234';

-- 新九龍婦女會沙角幼兒園 (563625)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 37992,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1000, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$37,992',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$1,000'
WHERE school_code = '563625';

-- 新九龍婦女會新翠幼兒園 (563633)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 40320,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1000, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$40,320',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$1,000'
WHERE school_code = '563633';

-- 藍如溪盛成皿教育基金邊陳之娟幼稚園 (563838)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 28380,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$28,380',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$1,570'
WHERE school_code = '563838';

-- 循理會白普理循理幼兒學校 (563854)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 26928,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$26,928',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$1,570'
WHERE school_code = '563854';

-- 沙田靈光幼兒學校 (563862)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 28536,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$28,536',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$1,570'
WHERE school_code = '563862';

-- 港九街坊婦女會丁孫慧珠幼稚園 (563900)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 41328,
  application_fee_hkd = COALESCE(30, application_fee_hkd),
  registration_fee_hkd = COALESCE(1500, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$41,328',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$30；註冊費（全日班）：HK$1,500'
WHERE school_code = '563900';

-- 東華三院南九龍獅子會幼兒園 (564109)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 58272,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$58,272',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（全日班）：HK$1,570'
WHERE school_code = '564109';

-- 港九街坊婦女會孫方中幼稚園（穗禾苑） (564320)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 38556,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1500, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$38,556',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$1,500'
WHERE school_code = '564320';

-- 基督教香港信義會愛鄰幼兒學校 (564559)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 32664,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1500, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$32,664',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$1,500'
WHERE school_code = '564559';

-- 真理浸信會榮光幼兒園 (564753)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 51084,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$51,084；全日班：全年 HK$90,504',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '564753';

-- 基督教香港信義會頌安幼兒學校 (564826)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 56892,
  application_fee_hkd = COALESCE(30, application_fee_hkd),
  registration_fee_hkd = COALESCE(1500, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$56,892',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$30；註冊費（全日班）：HK$1,500'
WHERE school_code = '564826';

-- 香港浸信會聯會利安幼兒園 (564923)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 50016,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(235, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$50,016',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$235'
WHERE school_code = '564923';

-- 康傑幼稚園〈馬鞍山〉 (565113)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 52056,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$52,056；全日班：全年 HK$81,420',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '565113';

-- 香港保護兒童會賽馬會學心幼兒學校 (565261)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 42516,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$42,516',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（全日班）：HK$1,570'
WHERE school_code = '565261';

-- 保良局唐楚男（瀝源）幼稚園 (565326)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 40308,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$40,308',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（全日班）：HK$1,570'
WHERE school_code = '565326';

-- 恒安浸信會幼兒學校 (565431)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 54684,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$54,684',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$1,570'
WHERE school_code = '565431';

-- 基督教宣道會沙田幼兒學校 (565857)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 58164,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$58,164',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（全日班）：HK$1,570'
WHERE school_code = '565857';

-- 明愛沙田幼兒學校 (565970)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 40644,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$40,644',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$1,570'
WHERE school_code = '565970';

-- 新界婦孺福利會博康幼兒學校 (566314)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 46728,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1500, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$46,728',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$1,500'
WHERE school_code = '566314';

-- 救世軍中原慈善基金幼稚園 (576743)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(30, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$30；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '576743';

-- 英基國際幼稚園（烏溪沙） (578509)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(1000, application_fee_hkd),
  registration_fee_hkd = COALESCE(0, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$1,000；註冊費（半日班）：HK$0'
WHERE school_code = '578509';

-- 博士山（香港）國際幼稚園 - 火炭 (581739)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 83760,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$83,760',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '581739';

-- 心怡天地幼稚園（沙田） (591777)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 76560,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$76,560',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '591777';

-- 英藝幼稚園（沙田） (593680)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 80400,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$80,400；全日班：全年 HK$135,276',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '593680';

-- 童樂天國際幼稚園 (598054)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(440, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$440'
WHERE school_code = '598054';

-- 學之園幼稚園（迎海） (604291)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 84000,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$84,000',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '604291';

-- 救世軍水泉澳幼稚園 (605620)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(30, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$30；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '605620';

-- 基督教香港崇真會安頌幼稚園 (609137)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(500, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$500；註冊費（全日班）：HK$1,000'
WHERE school_code = '609137';

-- 培僑國際幼稚園 (613916)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 70800,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$70,800',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '613916';

-- 香港基督教服務處雋樂幼稚園（沙田） (614106)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '614106';

-- 德萃幼稚園（馬鞍山） (616290)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 82320,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(6860, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$82,320',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$6,860'
WHERE school_code = '616290';

-- 仁愛堂鄭丁港夫人幼稚園 (618594)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '618594';

-- 光愛樂幼稚園（顯徑） (621986)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 31200,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$31,200；全日班：全年 HK$52,560',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '621986';

-- 培僑國際幼稚園（碧濤花園） (622389)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 70800,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$70,800',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '622389';

-- 啟思中英文幼稚園（馬鞍山） (627178)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = NULL,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = NULL,
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '627178';

-- 德瑞國際學校 (214558)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(2350, application_fee_hkd),
  registration_fee_hkd = COALESCE(17700, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$2,350；註冊費（半日班）：HK$17,700'
WHERE school_code = '214558';

-- 聖文嘉中英文幼稚園 (215899)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '215899';

-- 栢基國際幼稚園 (215937)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 122400,
  application_fee_hkd = COALESCE(500, application_fee_hkd),
  registration_fee_hkd = COALESCE(0, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$122,400',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$500；註冊費（半日班）：HK$0'
WHERE school_code = '215937';

-- 新加坡國際學校 (216003)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(2800, application_fee_hkd),
  registration_fee_hkd = COALESCE(0, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$2,800；註冊費（半日班）：HK$0'
WHERE school_code = '216003';

-- 加拿大國際學校 (216011)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(2350, application_fee_hkd),
  registration_fee_hkd = COALESCE(20000, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$2,350；註冊費（半日班）：HK$20,000；註冊費（全日班）：HK$0'
WHERE school_code = '216011';

-- 加拿大國際學校 (216011)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 144000,
  application_fee_hkd = COALESCE(2350, application_fee_hkd),
  registration_fee_hkd = COALESCE(20000, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$144,000',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$2,350；註冊費（半日班）：HK$20,000；註冊費（全日班）：HK$0'
WHERE school_code = '216011';

-- 聖文嘉中英文幼稚園（華貴邨） (216038)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '216038';

-- 維多利亞（海怡）國際幼稚園 (216194)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 137292,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(0, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$137,292',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$0；註冊費（全日班）：HK$0'
WHERE school_code = '216194';

-- 天主教聖伯多祿幼稚園 (312134)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(950, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$950；註冊費（全日班）：HK$1,500'
WHERE school_code = '312134';

-- 聖德蘭幼稚園 (313637)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '313637';

-- 嗇色園主辦可仁幼稚園 (324850)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '324850';

-- 基督教海面傳道會仁愛幼稚園 (325570)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 48672,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$48,672',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '325570';

-- 右思維幼稚園 (325961)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 105600,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$105,600',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '325961';

-- 聖公會聖彼得堂幼稚園（赤柱分校） (326003)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 47400,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$47,400',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '326003';

-- 香港仔浸信會白光幼稚園 (523089)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '523089';

-- 東華三院田灣（一九九六至一九九七總理）幼稚園 (528161)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '528161';

-- 蒙特梭利國際學校 (548430)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(2000, application_fee_hkd),
  registration_fee_hkd = COALESCE(28600, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$2,000；註冊費（半日班）：HK$28,600；註冊費（全日班）：HK$41,300'
WHERE school_code = '548430';

-- 蒙特梭利國際學校 (548430)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(2000, application_fee_hkd),
  registration_fee_hkd = COALESCE(28600, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$2,000；註冊費（半日班）：HK$28,600；註冊費（全日班）：HK$41,300'
WHERE school_code = '548430';

-- 啓思幼稚園（深灣軒） (560090)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 52560,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$52,560；全日班：全年 HK$79,584',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '560090';

-- 救世軍華富幼兒學校 (563145)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 49500,
  application_fee_hkd = COALESCE(20, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$49,500',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$20；註冊費（全日班）：HK$1,570'
WHERE school_code = '563145';

-- 香港西區婦女福利會鴨脷洲邨幼稚園 (563714)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 37164,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(1500, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$37,164',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（全日班）：HK$1,500'
WHERE school_code = '563714';

-- 保良局莊啓程夫人（華貴）幼稚園 (563773)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 41844,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$41,844',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（全日班）：HK$1,570'
WHERE school_code = '563773';

-- 東華三院蕭旺李滿福幼兒園 (564184)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 40716,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$40,716',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（全日班）：HK$1,570'
WHERE school_code = '564184';

-- MONTESSORI FOR CHILDREN (NURSERY) (565466)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 125712,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(500, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$125,712',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$0；註冊費（半日班）：HK$500'
WHERE school_code = '565466';

-- 循道衛理田灣幼稚園 (565644)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 38988,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$38,988',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$1,570'
WHERE school_code = '565644';

-- 路德會利東幼兒園 (565750)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 41868,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$41,868',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '565750';

-- 基督教宣道會海怡幼兒學校 (565849)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 58920,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$58,920',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（全日班）：HK$1,570'
WHERE school_code = '565849';

-- 基督教宣道會利東幼兒學校 (565865)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 58836,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$58,836',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（全日班）：HK$1,570'
WHERE school_code = '565865';

-- MULBERRY HOUSE INTERNATIONAL KINDERGARTEN SOUTHSIDE (578053)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(0, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$0；註冊費（半日班）：HK$0'
WHERE school_code = '578053';

-- GUIDEPOST MONTESSORI INTERNATIONAL KINDERGARTEN (POK FU LAM) (598089)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = NULL,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(0, registration_fee_hkd),
  fee_notes = NULL,
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$0；註冊費（半日班）：HK$0'
WHERE school_code = '598089';

-- GUIDEPOST MONTESSORI INTERNATIONAL PRE-SCHOOL (REPULSE BAY) (602256)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 150000,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(0, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$150,000',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$0；註冊費（半日班）：HK$0'
WHERE school_code = '602256';

-- 意大利國際幼稚園 (611646)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 86064,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$86,064；全日班：全年 HK$141,540',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '611646';

-- 大埔禮賢會幼稚園 (150860)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '150860';

-- 大埔禮賢會幼稚園 (150860)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '150860';

-- 大埔浸信會幼稚園 (151157)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '151157';

-- 東華三院洪王家琪幼稚園 (157309)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '157309';

-- 保良局鄧碧雲紀念幼稚園 (157449)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '157449';

-- 香港道教聯合會圓玄幼稚園（富善邨） (158062)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 31416,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$31,416',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '158062';

-- 聖公會救主堂幼稚園 (158119)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '158119';

-- 基督教宣道會太和幼稚園 (158577)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '158577';

-- 天主教大埔幼稚園 (158585)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '158585';

-- 大埔商會幼稚園 (158828)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '158828';

-- 大埔循道衛理幼稚園 (158895)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '158895';

-- 富亨浸信會呂郭碧鳳幼稚園 (158909)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '158909';

-- 大埔浸信會幼稚園運頭塘邨分校 (159166)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,500'
WHERE school_code = '159166';

-- NORWEGIAN INTERNATIONAL SCHOOL (215520)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(900, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$900；註冊費（半日班）：HK$970'
WHERE school_code = '215520';

-- INTERNATIONAL COLLEGE HONG KONG HONG LOK YUEN (KINDERGARTEN SECTION) (230944)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(1850, application_fee_hkd),
  registration_fee_hkd = COALESCE(0, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$1,850；註冊費（半日班）：HK$0；註冊費（全日班）：HK$0'
WHERE school_code = '230944';

-- 明雅中英文幼稚園 (231134)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '231134';

-- 安基司幼稚園 (536067)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$970'
WHERE school_code = '536067';

-- 英藝幼稚園 (537225)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 81600,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$81,600；全日班：全年 HK$120,516',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '537225';

-- 香港教育大學幼兒發展中心（幼稚園部） (541613)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 117912,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$117,912',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '541613';

-- 救世軍大元幼兒學校 (563102)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 46056,
  application_fee_hkd = COALESCE(20, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$46,056',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$20；註冊費（全日班）：HK$1,570'
WHERE school_code = '563102';

-- 中國基督教播道會寶雅幼兒學校 (563471)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 48660,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$48,660',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（全日班）：HK$1,570'
WHERE school_code = '563471';

-- 東華三院方麗明幼兒園 (563560)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 45132,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$45,132',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（全日班）：HK$1,570'
WHERE school_code = '563560';

-- 保良局劉進幼稚園 (563722)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 43944,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(0, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$43,944',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（半日班）：HK$0；註冊費（全日班）：HK$1,570'
WHERE school_code = '563722';

-- 基督教香港崇真會安仁幼兒學校 (564087)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 59172,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1000, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$59,172',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$1,000'
WHERE school_code = '564087';

-- 仁愛堂張慕良夫人幼稚園 (564281)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 61920,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1000, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$61,920',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$1,000'
WHERE school_code = '564281';

-- 安基司國際幼兒園 (565199)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 74400,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$74,400；全日班：全年 HK$112,464',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '565199';

-- 安基司國際幼兒園 (565199)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 74400,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$74,400；全日班：全年 HK$112,464',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '565199';

-- 香港保護兒童會林護幼兒學校 (565237)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 31644,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$31,644',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（全日班）：HK$1,570'
WHERE school_code = '565237';

-- 基督教宣道會寶湖幼兒學校 (565806)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 51372,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$51,372',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（全日班）：HK$1,570'
WHERE school_code = '565806';

-- 竹園區神召會太和康樂幼兒學校 (566578)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 53484,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$53,484',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$1,570'
WHERE school_code = '566578';

-- 明雅國際幼兒學校 (567027)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 61800,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$61,800；全日班：全年 HK$95,544',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '567027';

-- 思百德國際幼稚園 (573973)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 57600,
  application_fee_hkd = COALESCE(300, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$57,600；全日班：全年 HK$98,400',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$300；註冊費（半日班）：HK$970'
WHERE school_code = '573973';

-- 懋柏禮國際幼稚園 (601721)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = NULL,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = NULL,
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '601721';

-- 天主教聖保祿幼兒園 (617849)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 103620,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(1100, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$103,620',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$0；註冊費（全日班）：HK$1,100'
WHERE school_code = '617849';

-- 香港西區婦女福利會何瑞棠紀念中英文幼稚園 (621366)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '621366';

-- 香港基督教服務處雋樂幼兒學校（大埔） (627550)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = NULL,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1500, registration_fee_hkd),
  fee_notes = NULL,
  other_fees_note = '幼稚園教育計劃申請審核中；報名費：HK$40；註冊費（全日班）：HK$1,500'
WHERE school_code = '627550';

-- 全完堂幼稚園 (152269)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(20, application_fee_hkd),
  registration_fee_hkd = COALESCE(550, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$20；註冊費（半日班）：HK$550'
WHERE school_code = '152269';

-- 福來邨錦全幼稚園 (152498)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(800, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$800；註冊費（全日班）：HK$800'
WHERE school_code = '152498';

-- 滿樂幼稚園 (152579)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(30, application_fee_hkd),
  registration_fee_hkd = COALESCE(600, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$30；註冊費（半日班）：HK$600'
WHERE school_code = '152579';

-- 荃灣聖母幼稚園 (153907)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '153907';

-- 萌兒幼稚園 (156612)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 48000,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$48,000；全日班：全年 HK$75,600',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '156612';

-- 香港道教聯合會圓玄幼稚園 (157066)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 38400,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$38,400',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '157066';

-- 綠楊幼稚園 (157716)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 63600,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$63,600',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '157716';

-- 荃灣浸信會幼稚園 (158496)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '158496';

-- 救世軍吳國偉紀念幼稚園 (158550)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(30, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$30；註冊費（半日班）：HK$970'
WHERE school_code = '158550';

-- 天主教領報幼稚園 (159220)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '159220';

-- 聖文嘉中英文幼稚園（荃灣） (231533)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '231533';

-- 聖安多尼中英文幼稚園（麗城花園） (231584)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '231584';

-- 栢基海韻幼稚園 (231690)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '231690';

-- 迦南幼稚園（荃灣） (516376)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '516376';

-- 迦南幼稚園（海濱花園） (526010)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 40392,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$40,392',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '526010';

-- 啓思幼稚園（馬灣） (552747)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 45888,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$45,888',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '552747';

-- 仁濟醫院蔡百泰幼稚園 (562890)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 41424,
  application_fee_hkd = COALESCE(30, application_fee_hkd),
  registration_fee_hkd = COALESCE(1300, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$41,424',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$30；註冊費（全日班）：HK$1,300'
WHERE school_code = '562890';

-- 救世軍梨木樹幼兒學校 (562963)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 41484,
  application_fee_hkd = COALESCE(20, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$41,484',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$20；註冊費（全日班）：HK$1,570'
WHERE school_code = '562963';

-- 救世軍荃灣幼兒學校 (563129)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 48588,
  application_fee_hkd = COALESCE(20, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$48,588',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$20；註冊費（全日班）：HK$1,570'
WHERE school_code = '563129';

-- 香港基督教女青年會荃灣幼兒學校 (563293)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 43800,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$43,800',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$1,570'
WHERE school_code = '563293';

-- 保良局方譚遠良幼稚園 (563676)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 42276,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$42,276',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（全日班）：HK$1,570'
WHERE school_code = '563676';

-- 保良局志沛幼稚園 (563757)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 41136,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$41,136',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（全日班）：HK$1,570'
WHERE school_code = '563757';

-- 藍如溪盛成皿教育基金邊耀良幼稚園 (563846)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 46548,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$46,548',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$1,570'
WHERE school_code = '563846';

-- 海濱方方樂趣幼稚園 (565105)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 88272,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$88,272；全日班：全年 HK$119,928',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '565105';

-- 香港保護兒童會深井幼兒學校 (565296)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 40680,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$40,680',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（全日班）：HK$1,570'
WHERE school_code = '565296';

-- 世德幼稚園（梨木樹） (565628)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '565628';

-- 聖文嘉幼稚園（荃灣） (566187)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 52560,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$52,560；全日班：全年 HK$81,360',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '566187';

-- 中華基督教會福幼幼稚園 (566403)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 33564,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$33,564',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '566403';

-- 中華基督教會福幼第二幼稚園 (566411)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 29976,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1500, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$29,976',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$1,500'
WHERE school_code = '566411';

-- 基督教安得兒幼稚園 (575640)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 52416,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$52,416；全日班：全年 HK$80,520',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '575640';

-- 心怡天地幼稚園 (583340)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 74160,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$74,160',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '583340';

-- 思博幼稚園 (590860)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 63840,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$63,840',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '590860';

-- 香港靈糧堂荃灣幼稚園 (595969)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '595969';

-- 心怡天地幼稚園（麗城） (597716)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 76560,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$76,560',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '597716';

-- 基督教安得兒幼稚園（灣景） (598038)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 52416,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$52,416；全日班：全年 HK$80,520',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '598038';

-- ６１１生命樹幼稚園 (601497)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 45516,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$45,516',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '601497';

-- 維多利亞（海之戀）國際幼稚園 (619850)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 134184,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$134,184',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '619850';

-- 聖公會青山聖彼得堂幼稚園 (151947)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '151947';

-- 天后中英文幼稚園 (156515)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '156515';

-- 東華三院高德根紀念幼稚園 (156744)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '156744';

-- 佳寶幼稚園（屯門分校） (156930)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '156930';

-- 仁愛堂顏寶鈴幼稚園 (157031)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '157031';

-- 路德會呂祥光幼稚園 (157074)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '157074';

-- 順德聯誼總會屯門梁李秀娛幼稚園 (157090)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$0'
WHERE school_code = '157090';

-- 青松湖景幼稚園 (157236)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '157236';

-- 仁愛堂葉德海幼稚園 (157279)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '157279';

-- 保良局田家炳兆康幼稚園 (157376)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '157376';

-- 聖公會青山聖彼得堂山景邨幼稚園 (157473)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '157473';

-- 中華基督教會屯門堂何福堂幼稚園 (157490)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = NULL,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = NULL,
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '157490';

-- 美樂中英文幼稚園 (157503)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$970'
WHERE school_code = '157503';

-- 東華三院李黃慶祥紀念幼稚園 (158054)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '158054';

-- 世界龍岡學校朱瑞蘭（中英文）幼稚園 (158380)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '158380';

-- 保良局廖烈正幼稚園 (158623)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$0'
WHERE school_code = '158623';

-- 佳寶幼稚園第二分校（建生邨） (158658)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '158658';

-- 路德會建生幼稚園 (158674)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '158674';

-- 田景邨浸信會呂郭碧鳳幼稚園 (158747)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '158747';

-- 樂善堂張葉茂清幼稚園 (158836)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '158836';

-- 啓思幼稚園（屯門分校） (158852)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 37128,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$37,128',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '158852';

-- 聖公會青山聖彼得堂兆麟苑幼稚園 (159131)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '159131';

-- 美樂中英文幼稚園（景峰花園分校） (231185)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 47940,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$47,940',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$970'
WHERE school_code = '231185';

-- 雅麗斯英文幼稚園 (231592)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 34771,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$34,771',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '231592';

-- 珈琳幼稚園（屯門分校） (536768)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = NULL,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = NULL,
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '536768';

-- 仁濟醫院嚴徐玉珊幼稚園 (539163)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '539163';

-- 香港浸信會聯會寶田幼稚園 (539554)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(800, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$800；註冊費（全日班）：HK$1,500'
WHERE school_code = '539554';

-- 保良局蔡冠深幼稚園 (539872)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '539872';

-- 真理浸信會富泰幼稚園 (541389)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '541389';

-- 樂善堂鄧德濂幼稚園 (543616)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '543616';

-- 啓思幼稚園（愛琴） (556246)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = NULL,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = NULL,
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '556246';

-- 建生浸信會白普理幼兒園 (562874)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 45588,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$45,588',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$1,570'
WHERE school_code = '562874';

-- 香港基督教女青年會安定幼兒學校 (562904)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 45264,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$45,264',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$1,570'
WHERE school_code = '562904';

-- 救世軍三聖幼兒學校 (563080)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 44004,
  application_fee_hkd = COALESCE(20, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$44,004',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$20；註冊費（全日班）：HK$1,570'
WHERE school_code = '563080';

-- 香港聖公會聖西門良景幼兒學校 (563277)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 43536,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(1000, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$43,536',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（全日班）：HK$1,000'
WHERE school_code = '563277';

-- 香港聖公會聖西門大興幼兒學校 (563307)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 51636,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(1000, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$51,636',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（全日班）：HK$1,000'
WHERE school_code = '563307';

-- 仁濟醫院友愛幼稚園 (563366)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 38628,
  application_fee_hkd = COALESCE(30, application_fee_hkd),
  registration_fee_hkd = COALESCE(1000, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$38,628',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$30；註冊費（全日班）：HK$1,000'
WHERE school_code = '563366';

-- 仁濟醫院山景幼稚園 (563412)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 47796,
  application_fee_hkd = COALESCE(30, application_fee_hkd),
  registration_fee_hkd = COALESCE(1000, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$47,796',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$30；註冊費（全日班）：HK$1,000'
WHERE school_code = '563412';

-- 東華三院田家炳幼兒園 (563595)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 43272,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$43,272',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（全日班）：HK$1,570'
WHERE school_code = '563595';

-- 保良局倪文玲（友愛）幼稚園 (563960)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 44160,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$44,160',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（全日班）：HK$1,570'
WHERE school_code = '563960';

-- 東華三院方譚遠良幼兒園 (564150)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 37680,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(0, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$37,680',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（全日班）：HK$0'
WHERE school_code = '564150';

-- 仁愛堂劉皇發幼稚園 (564265)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 49728,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1400, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$49,728',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$1,400'
WHERE school_code = '564265';

-- 仁愛堂田家炳幼稚園 (564273)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 63252,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1000, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$63,252',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$1,000'
WHERE school_code = '564273';

-- 香港保護兒童會蝴蝶邨幼兒學校 (565059)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 41220,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$41,220',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（全日班）：HK$1,570'
WHERE school_code = '565059';

-- 保良局倪文玲（蝴蝶灣）幼稚園 (565318)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 38268,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$38,268',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（全日班）：HK$1,570'
WHERE school_code = '565318';

-- 美樂幼兒園（美樂花園校） (565679)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 46284,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$46,284；全日班：全年 HK$66,564',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$970'
WHERE school_code = '565679';

-- 路德會良景幼兒園 (565725)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 47832,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$47,832',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '565725';

-- 路德會富泰幼兒園 (565784)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 36672,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(900, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$36,672',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$900；註冊費（全日班）：HK$1,500'
WHERE school_code = '565784';

-- 世佛會真言宗幼兒學校 (565890)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 28080,
  application_fee_hkd = COALESCE(30, application_fee_hkd),
  registration_fee_hkd = COALESCE(1100, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$28,080；全日班：全年 HK$35,232',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$30；註冊費（全日班）：HK$1,100'
WHERE school_code = '565890';

-- 世佛會觀自在幼兒學校 (565911)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 25272,
  application_fee_hkd = COALESCE(30, application_fee_hkd),
  registration_fee_hkd = COALESCE(1000, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$25,272',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$30；註冊費（全日班）：HK$1,000'
WHERE school_code = '565911';

-- 香港聖公會青山聖彼得堂青雲路幼稚園 (566179)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 41472,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$41,472；全日班：全年 HK$86,280',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$1,570'
WHERE school_code = '566179';

-- 中華基督教會屯門堂幼稚園 (566292)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 44052,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$44,052',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$1,570'
WHERE school_code = '566292';

-- 晶晶幼稚園（屯門校） (567892)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 37200,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$37,200；全日班：全年 HK$72,700',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '567892';

-- 加州天地幼稚園 (572764)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 53988,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$53,988；全日班：全年 HK$73,524',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '572764';

-- 晶晶國際幼稚園 (587524)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 73290,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$73,290；全日班：全年 HK$107,400',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '587524';

-- 宏廣國際幼稚園 (590401)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 67392,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$67,392；全日班：全年 HK$112,284',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '590401';

-- 哈羅香港國際學校 (590800)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(1500, application_fee_hkd),
  registration_fee_hkd = COALESCE(16905, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$1,500；註冊費（全日班）：HK$16,905'
WHERE school_code = '590800';

-- 小牛頓中英文幼稚園 (599999)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 47040,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$47,040；全日班：全年 HK$75,564',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '599999';

-- 迦南幼稚園（景峰花園） (609641)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$0'
WHERE school_code = '609641';

-- 東華三院馬陳家歡幼稚園 (611093)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（半日班）：HK$970'
WHERE school_code = '611093';

-- 心怡天地國際幼稚園（屯門） (615170)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 80160,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$80,160',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '615170';

-- YORK INTERNATIONAL PRE-SCHOOL (TUEN MUN) (616990)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 102000,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$102,000',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '616990';

-- 英藝幼稚園（兆康） (624829)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 81600,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$81,600；全日班：全年 HK$115,200',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '624829';

-- 聖公會幼稚園 (131636)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '131636';

-- 香港真光中學附屬小學暨幼稚園 (132047)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '132047';

-- 寶血幼稚園 (133019)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '133019';

-- 中華基督教會灣仔堂幼稚園 (133280)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 55080,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$55,080',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '133280';

-- 香港靈糧堂幼稚園 (133744)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '133744';

-- 聖保祿幼稚園 (214612)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(0, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$0'
WHERE school_code = '214612';

-- 卡莎迪曼幼稚園 (323853)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（半日班）：HK$970'
WHERE school_code = '323853';

-- 保良局莊啓程幼稚園 (323896)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 56172,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$56,172',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '323896';

-- 銅鑼灣維多利亞幼稚園 (324779)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 108924,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(0, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$108,924',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$0'
WHERE school_code = '324779';

-- 愛群道浸信會呂郭碧鳳幼稚園 (324922)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '324922';

-- 天主教聖瑪加利大幼稚園 (325368)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '325368';

-- 銅鑼灣維多利亞國際幼稚園 (325651)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(0, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$0；註冊費（全日班）：HK$0'
WHERE school_code = '325651';

-- 帝京香港幼稚園 (325848)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(0, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$0；註冊費（半日班）：HK$0'
WHERE school_code = '325848';

-- 穆斯林幼稚園 (518247)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(30, application_fee_hkd),
  registration_fee_hkd = COALESCE(0, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$30；註冊費（半日班）：HK$0'
WHERE school_code = '518247';

-- 聖保祿幼兒園 (563188)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 114096,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(0, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$114,096',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$0；註冊費（全日班）：HK$0'
WHERE school_code = '563188';

-- 香港小童群益會樂緻幼稚園（灣仔） (563447)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 72504,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$72,504',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$1,570'
WHERE school_code = '563447';

-- 保良局朱李月華幼稚園 (563641)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 44904,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$44,904',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（全日班）：HK$1,570'
WHERE school_code = '563641';

-- 聖雅各福群會麥潔蓮幼稚園 (564338)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 62364,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$62,364',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$1,570'
WHERE school_code = '564338';

-- 聖雅各福群會銅鑼灣幼稚園 (564346)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 70788,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$70,788',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$1,570'
WHERE school_code = '564346';

-- GUIDEPOST MONTESSORI INTERNATIONAL PRE-SCHOOL (HAPPY VALLEY HAWTHORN ROAD) (564958)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 152280,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(0, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$152,280',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$0；註冊費（半日班）：HK$0'
WHERE school_code = '564958';

-- 香港基督教服務處時代幼兒學校 (565385)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 56412,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1500, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$56,412',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$1,500'
WHERE school_code = '565385';

-- 寶山幼兒園 (565938)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 135000,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(0, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$135,000',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$0'
WHERE school_code = '565938';

-- 聖公會聖基道幼兒園（灣仔） (569712)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 55644,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1500, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$55,644',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$1,500'
WHERE school_code = '569712';

-- 英基國際幼稚園（曉新） (579149)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(1000, application_fee_hkd),
  registration_fee_hkd = COALESCE(0, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$1,000；註冊費（半日班）：HK$0'
WHERE school_code = '579149';

-- 港島兒童蒙特梭利幼稚園 (581119)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 76800,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$76,800',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '581119';

-- 樂䔄幼稚園 (593770)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 94248,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$94,248',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '593770';

-- 善行國際幼稚園 (600334)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 78600,
  application_fee_hkd = COALESCE(200, application_fee_hkd),
  registration_fee_hkd = COALESCE(950, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$78,600',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$200；註冊費（半日班）：HK$950'
WHERE school_code = '600334';

-- 保良局建造商會學校 (607290)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(800, application_fee_hkd),
  registration_fee_hkd = COALESCE(9320, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$800；註冊費（半日班）：HK$9,320'
WHERE school_code = '607290';

-- 道爾頓幼稚園 (607592)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 122400,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$122,400',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '607592';

-- 東華三院李賢義伉儷幼兒園 (614920)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 58080,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(1500, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$58,080',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（全日班）：HK$1,500'
WHERE school_code = '614920';

-- 信生中英文幼稚園 (216259)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '216259';

-- 第一幼稚園 (316504)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '316504';

-- 路德會救恩幼稚園 (321192)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '321192';

-- 基督教佈道中心樂富幼稚園 (323268)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '323268';

-- 天主教甘霖幼稚園 (324833)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '324833';

-- 港澳信義會錫安紀念幼稚園 (325090)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '325090';

-- 樂善堂顧李覺鮮幼稚園 (325317)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '325317';

-- 東華三院韋祥智紀念幼稚園 (325414)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '325414';

-- 聖公會慈光堂柯佩璋幼稚園 (325546)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 36360,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$36,360；全日班：全年 HK$72,840',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '325546';

-- 嗇色園主辦可德幼稚園 (325643)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 25320,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$25,320；全日班：全年 HK$53,400',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '325643';

-- 佛教傅康幼稚園 (325678)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '325678';

-- 香港道教聯合會圓玄幼稚園（東頭邨） (325716)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 33048,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$33,048',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '325716';

-- 保良局金卿幼稚園 (325821)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$0'
WHERE school_code = '325821';

-- 循道衛理聯合教會主恩堂幼稚園 (325880)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 47268,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$47,268',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '325880';

-- 樂富禮賢會幼稚園 (325929)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(900, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$900；註冊費（全日班）：HK$1,500'
WHERE school_code = '325929';

-- 嗇色園主辦可立幼稚園 (523429)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '523429';

-- 路德會沙崙堂幼稚園（慈愛分校） (523933)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 32648,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$32,648',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '523933';

-- 聖母幼稚園 (528625)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '528625';

-- 鑽石山靈糧幼稚園 (530379)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '530379';

-- 基督教恩苗東九龍幼稚園 (538132)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 42000,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$42,000',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '538132';

-- 慈正邨菩提幼稚園 (542601)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(30, application_fee_hkd),
  registration_fee_hkd = COALESCE(900, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$30；註冊費（半日班）：HK$900；註冊費（全日班）：HK$1,500'
WHERE school_code = '542601';

-- 基督教中國佈道會恩恩創意幼稚園 (549169)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '549169';

-- 香港幼稚園協會幼兒學校 (550035)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '550035';

-- 香港小童群益會樂緻幼稚園（黃大仙） (563463)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 34764,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$34,764；全日班：全年 HK$45,396',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$1,570'
WHERE school_code = '563463';

-- 東華三院方肇彝幼兒園 (563552)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 44868,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$44,868',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（全日班）：HK$1,570'
WHERE school_code = '563552';

-- 新九龍婦女會慈雲山幼兒園 (563617)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 32724,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1000, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$32,724',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$1,000'
WHERE school_code = '563617';

-- 保良局王少清幼稚園 (563811)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 38580,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$38,580',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（全日班）：HK$1,570'
WHERE school_code = '563811';

-- 保良局謝黃沛涓幼稚園 (563919)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 37704,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$37,704',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（全日班）：HK$1,570'
WHERE school_code = '563919';

-- 保良局方譚遠良（慈雲山）幼稚園 (563943)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 39552,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$39,552',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（全日班）：HK$1,570'
WHERE school_code = '563943';

-- 基督教香港崇真會安強幼兒學校 (564060)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 62784,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1000, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$62,784',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$1,000'
WHERE school_code = '564060';

-- 東華三院群芳幼兒園 (564176)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 62664,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$62,664',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（全日班）：HK$1,570'
WHERE school_code = '564176';

-- 五邑工商總會幼稚園 (564290)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 39240,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$39,240',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$1,570'
WHERE school_code = '564290';

-- 五邑工商總會張祝珊幼稚園 (564303)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 39852,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$39,852',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$1,570'
WHERE school_code = '564303';

-- 聖母潔心會黃大仙幼稚園 (564370)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 40920,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1500, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$40,920',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$1,500'
WHERE school_code = '564370';

-- 禮賢會樂富幼兒園 (564397)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 50496,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$50,496',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（全日班）：HK$1,570'
WHERE school_code = '564397';

-- 禮賢會新蒲崗幼兒園 (564400)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 43848,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(1500, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$43,848',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（全日班）：HK$1,500'
WHERE school_code = '564400';

-- 香港基督教女青年會彩雲幼兒學校 (564451)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 45204,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$45,204',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$1,570'
WHERE school_code = '564451';

-- 香港基督教女青年會信望幼兒學校 (565504)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 46656,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$46,656',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$1,570'
WHERE school_code = '565504';

-- 基督教宣道會富山幼兒學校 (565873)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 39072,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$39,072',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（全日班）：HK$1,570'
WHERE school_code = '565873';

-- 明愛啓幼幼兒學校 (566020)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 34992,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$34,992',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$1,570'
WHERE school_code = '566020';

-- 德望小學暨幼稚園 (588130)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '588130';

-- 永樂創新英文幼稚園 (595144)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = NULL,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = NULL,
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '595144';

-- 德信幼稚園 (133582)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '133582';

-- 深培中英文幼稚園 (216070)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(900, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$900；註冊費（全日班）：HK$1,500'
WHERE school_code = '216070';

-- 港青基信國際幼稚園 (216178)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '216178';

-- 救世軍陳昆棟幼稚園 (325198)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(30, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$30；註冊費（半日班）：HK$970'
WHERE school_code = '325198';

-- 旺角雅麗斯英文幼稚園 (516929)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '516929';

-- 迦南幼稚園（富榮花園） (531898)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 40260,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$40,260',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '531898';

-- 明我幼稚園（奧運校） (533858)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = NULL,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = NULL,
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '533858';

-- 中華基督教會望覺堂賢貞幼稚園 (547069)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '547069';

-- 太陽島幼稚園（港灣豪庭分校） (555436)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '555436';

-- LITTLE BUDS KINDERGARTEN (558346)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '558346';

-- 學之園幼稚園（凱帆薈） (561207)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 90000,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$90,000',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '561207';

-- 救世軍海富幼兒學校 (562939)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 45456,
  application_fee_hkd = COALESCE(20, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$45,456',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$20；註冊費（全日班）：HK$1,570'
WHERE school_code = '562939';

-- 救世軍荔枝角幼兒學校 (562955)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 46020,
  application_fee_hkd = COALESCE(20, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$46,020',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$20；註冊費（全日班）：HK$1,570'
WHERE school_code = '562955';

-- 香港青年協會青樂幼稚園（油麻地） (563323)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 59868,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$59,868',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$1,570'
WHERE school_code = '563323';

-- 保良局呂錦泰幼稚園 (563820)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 39144,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$39,144',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（全日班）：HK$1,570'
WHERE school_code = '563820';

-- 仁愛堂陳鄭玉而幼稚園 (564249)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 68364,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1000, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$68,364',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$1,000'
WHERE school_code = '564249';

-- 香港保護兒童會滙豐銀行慈善基金幼兒學校 (564931)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 37680,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$37,680',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（全日班）：HK$1,570'
WHERE school_code = '564931';

-- 油麻地循道衛理楊震幼兒學校 (565024)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 43884,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(1000, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$43,884',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（全日班）：HK$1,000'
WHERE school_code = '565024';

-- 香港保護兒童會中銀幼兒學校 (565067)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 45780,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$45,780',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（全日班）：HK$1,570'
WHERE school_code = '565067';

-- 香港保護兒童會百佳員工慈善基金幼兒學校 (565091)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 33048,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$33,048',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（全日班）：HK$1,570'
WHERE school_code = '565091';

-- 香港保護兒童會砵蘭街幼兒學校 (565300)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 31728,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$31,728',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（全日班）：HK$1,570'
WHERE school_code = '565300';

-- 香港基督教服務處雋匯幼兒學校 (565423)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 55152,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1500, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$55,152',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$1,500'
WHERE school_code = '565423';

-- 駿發花園浸信會幼兒學校 (565474)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 40368,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$40,368',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$1,570'
WHERE school_code = '565474';

-- 救世軍卜凱賽琳幼兒學校 (566535)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 43872,
  application_fee_hkd = COALESCE(20, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$43,872',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$20；註冊費（全日班）：HK$1,570'
WHERE school_code = '566535';

-- 滙豐幼兒學校 (566748)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 52200,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(1500, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$52,200',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$0；註冊費（全日班）：HK$1,500'
WHERE school_code = '566748';

-- 協康會康苗幼兒園 (566969)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 57048,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1500, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$57,048',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$1,500'
WHERE school_code = '566969';

-- 栢基國際幼稚園（九龍） (571490)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 97900,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(500, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$97,900',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$500；註冊費（全日班）：HK$500'
WHERE school_code = '571490';

-- 維多利亞（君匯港）幼稚園 (574708)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 141672,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(0, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$141,672',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$0；註冊費（全日班）：HK$0'
WHERE school_code = '574708';

-- 明慧國際幼稚園（太子分校） (583421)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 80760,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$80,760；全日班：全年 HK$139,440',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '583421';

-- 蔚思幼稚園 (595543)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 82800,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$82,800',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '595543';

-- 樂希幼兒學校 (601403)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 95256,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$95,256',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '601403';

-- 香港墨爾文國際幼稚園 (606979)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 128328,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$128,328',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '606979';

-- 啟文幼稚園 (616281)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 48756,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$48,756',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '616281';

-- 學之園幼稚園（奧運） (617474)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 90000,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$90,000',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '617474';

-- 卓爾中英文幼稚園 (622869)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,500'
WHERE school_code = '622869';

-- 匯成勞士施羅孚伉儷慈善基金幼稚園 (624195)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 18000,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$18,000',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '624195';

-- 中華基督教會元朗堂真光幼稚園 (151629)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '151629';

-- 萊恩幼稚園（元朗） (151696)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '151696';

-- 聖公會聖約瑟堂幼稚園 (154601)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '154601';

-- 元朗信義會生命幼稚園 (155624)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '155624';

-- 聖馬提亞堂肖珍幼稚園 (156795)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '156795';

-- 基督教宣道會錦綉幼稚園 (156949)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 37788,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$37,788；全日班：全年 HK$57,396',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '156949';

-- 麗晶幼稚園分校 (156981)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '156981';

-- 天純幼稚園 (157732)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '157732';

-- 新界神召會懷恩幼稚園 (158313)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '158313';

-- 元岡幼稚園 (158321)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(20, application_fee_hkd),
  registration_fee_hkd = COALESCE(800, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$20；註冊費（半日班）：HK$800'
WHERE school_code = '158321';

-- 朗屏邨聖恩幼稚園 (158410)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '158410';

-- 中華基督教會元朗堂朗屏邨真光幼稚園 (158500)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '158500';

-- 東華三院黃朱惠芬幼稚園 (158976)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '158976';

-- 元朗商會幼稚園 (159018)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '159018';

-- 保良局曾星如幼稚園 (159034)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '159034';

-- 宣道會陳李詠貞紀念幼稚園 (159042)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '159042';

-- 嗇色園主辦可瑞幼稚園 (159050)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '159050';

-- 元朗公立中學校友會劉良驤紀念幼稚園 (159140)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '159140';

-- 元朗三育幼稚園 (159158)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '159158';

-- 佳寶幼稚園第三分校（天瑞邨） (159190)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '159190';

-- 太陽島英文幼稚園（元朗分校） (231010)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '231010';

-- 珈琳中英文幼稚園 (231886)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 37128,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$37,128；全日班：全年 HK$70,416',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '231886';

-- 萊恩英文幼稚園 (517828)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 69600,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$69,600',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '517828';

-- 晶晶中英文幼稚園（洪水橋分校） (519812)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '519812';

-- 香海正覺蓮社佛教林黃明慧幼稚園 (524204)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '524204';

-- 殷翠幼稚園 (524360)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '524360';

-- 基督教聖約教會小天使（天盛）幼稚園 (532835)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 33672,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$33,672',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '532835';

-- 世德幼稚園 (534790)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '534790';

-- 翰林幼稚園（天水圍） (537594)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '537594';

-- 天樂幼稚園 (537950)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 47784,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$47,784；全日班：全年 HK$68,892',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '537950';

-- 青衣商會天水圍幼稚園 (540560)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '540560';

-- 激活幼稚園 (541222)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 47988,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$47,988',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '541222';

-- 中華基督教青年會幼稚園 (541230)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '541230';

-- 佛教慈光幼稚園 (541427)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '541427';

-- SAGARMATHA KINDERGARTEN (542687)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（半日班）：HK$970'
WHERE school_code = '542687';

-- 天主教聖葉理諾幼稚園 (543012)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '543012';

-- 天水圍宣道幼稚園 (543489)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(900, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$900；註冊費（全日班）：HK$1,500'
WHERE school_code = '543489';

-- 仁濟醫院明德幼稚園 (543918)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(900, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$900；註冊費（全日班）：HK$1,540'
WHERE school_code = '543918';

-- 大埔浸信會幼稚園天澤邨分校 (544167)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '544167';

-- 圓玄幼稚園（天逸邨） (545333)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 41520,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$41,520',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '545333';

-- 元朗東莞同鄉會熊定嘉幼稚園 (549304)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$970'
WHERE school_code = '549304';

-- 雅麗斯俊宏軒幼稚園 (554383)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 37932,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$37,932；全日班：全年 HK$67,620',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '554383';

-- 香港中文大學校友會聯會陳震夏幼稚園 (560740)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '560740';

-- 救世軍錦田幼兒學校 (562866)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 44712,
  application_fee_hkd = COALESCE(20, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$44,712',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$20；註冊費（全日班）：HK$1,570'
WHERE school_code = '562866';

-- 幼聯主辦安泰幼兒學校 (563226)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 26616,
  application_fee_hkd = COALESCE(30, application_fee_hkd),
  registration_fee_hkd = COALESCE(1150, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$26,616',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$30；註冊費（全日班）：HK$1,150'
WHERE school_code = '563226';

-- 仁濟醫院林李婉冰幼稚園 (563420)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 41016,
  application_fee_hkd = COALESCE(20, application_fee_hkd),
  registration_fee_hkd = COALESCE(1500, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$41,016',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$20；註冊費（全日班）：HK$1,500'
WHERE school_code = '563420';

-- 博愛醫院朱國京夫人紀念幼稚園 (564010)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 44616,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$44,616',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$1,570'
WHERE school_code = '564010';

-- 博愛醫院陳潘佩清紀念幼稚園 (564028)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 58968,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$58,968',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$1,570'
WHERE school_code = '564028';

-- 東華三院九龍崇德社幼兒園 (564125)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 38124,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$38,124',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（全日班）：HK$1,570'
WHERE school_code = '564125';

-- 仁愛堂吳黃鳳英幼稚園 (564257)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 41952,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(840, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$41,952',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$840'
WHERE school_code = '564257';

-- 禮賢會元朗幼兒園 (564508)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 41760,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(1500, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$41,760',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（全日班）：HK$1,500'
WHERE school_code = '564508';

-- 香港聖公會夏瑞芸幼兒學校 (564702)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 54768,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(1000, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$54,768',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（全日班）：HK$1,000'
WHERE school_code = '564702';

-- 聖公會聖馬提亞堂幼兒學校 (564710)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 39924,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$39,924',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$1,570'
WHERE school_code = '564710';

-- 保良局廖笑霞幼稚園 (564982)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 38856,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$38,856',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（全日班）：HK$1,570'
WHERE school_code = '564982';

-- 香港基督教服務處天恒幼兒學校 (565377)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 53472,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1500, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$53,472',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$1,500'
WHERE school_code = '565377';

-- 基督教宣道會天頌幼兒學校 (565814)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 41712,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$41,712',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（全日班）：HK$1,570'
WHERE school_code = '565814';

-- 神召會禮拜堂天澤幼兒園 (566012)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 50496,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1500, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$50,496',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$1,500'
WHERE school_code = '566012';

-- 中華基督教會元朗堂周宋主愛幼兒園 (566250)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 77772,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$77,772',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$1,570'
WHERE school_code = '566250';

-- 新界婦孺福利會元朗幼兒學校 (566349)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 49080,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(1500, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$49,080',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（全日班）：HK$1,500'
WHERE school_code = '566349';

-- 鄰舍輔導會元朗幼兒園 (566373)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 53676,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(1000, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$53,676',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（全日班）：HK$1,000'
WHERE school_code = '566373';

-- 中國基督教播道會天恩幼兒學校 (566780)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 39324,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(1570, registration_fee_hkd),
  fee_notes = '全日班：全年 HK$39,324',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$0；註冊費（全日班）：HK$1,570'
WHERE school_code = '566780';

-- 中華基督教會元朗堂真光幼稚園二校 (570885)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '570885';

-- 平安福音堂幼稚園（天水圍） (575666)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '575666';

-- 英揚樂兒中英文幼稚園 (590614)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '590614';

-- 遵道幼稚園 (597384)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '597384';

-- 雅麗斯樂思幼稚園 (598623)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 39372,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$39,372；全日班：全年 HK$63,228',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '598623';

-- 香港中文大學校友會聯會順龍仁澤幼稚園 (600377)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '600377';

-- 德怡國際幼稚園（元朗） (602000)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 69000,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$69,000',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '602000';

-- YORK MONTESSORI INTERNATIONAL PRE-SCHOOL (YUEN LONG) (605441)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 102000,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$102,000',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '605441';

-- 保良局郭羅桂珍幼稚園 (605735)
UPDATE schools
SET
  kep_participant = true,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '已參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$0'
WHERE school_code = '605735';

-- 多多國際幼稚園（形點） (605794)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 129000,
  application_fee_hkd = COALESCE(0, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$129,000',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$0；註冊費（半日班）：HK$970'
WHERE school_code = '605794';

-- 心怡天地國際幼稚園（元朗） (612189)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 76560,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$76,560',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970'
WHERE school_code = '612189';

-- 艾蒙特國際幼稚園 (615633)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 0,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$0；全日班：全年 HK$0',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '615633';

-- YORK INTERNATIONAL PRE-SCHOOL (WETLAND) (621480)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 62400,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$62,400',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '621480';

-- 安基司學校附屬國際幼稚園 (622060)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 122400,
  application_fee_hkd = COALESCE(800, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$122,400',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$800；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '622060';

-- 英藝幼稚園（賞湖） (622265)
UPDATE schools
SET
  kep_participant = false,
  fee_annual_hkd = 74400,
  application_fee_hkd = COALESCE(40, application_fee_hkd),
  registration_fee_hkd = COALESCE(970, registration_fee_hkd),
  fee_notes = '半日班：全年 HK$74,400；全日班：全年 HK$115,728',
  other_fees_note = '未參加幼稚園教育計劃；報名費：HK$40；註冊費（半日班）：HK$970；註冊費（全日班）：HK$1,570'
WHERE school_code = '622265';
