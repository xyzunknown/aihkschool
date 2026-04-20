-- ============================================================
-- Seed 008: 熱門幼稚園暱稱 / 別名 / 分校名
-- ============================================================
-- 使用 school_code 查 id，ON CONFLICT 冪等。
-- ============================================================

-- ── 聖保羅堂幼稚園 (131466) ──
INSERT INTO school_aliases (school_id, alias, alias_type, confidence, source)
  SELECT id, '聖保羅', 'nickname', 1.0, 'manual' FROM schools WHERE school_code = '131466'
  ON CONFLICT (school_id, alias) DO NOTHING;
INSERT INTO school_aliases (school_id, alias, alias_type, confidence, source)
  SELECT id, 'St Paul''s Church KG', 'exact', 1.0, 'manual' FROM schools WHERE school_code = '131466'
  ON CONFLICT (school_id, alias) DO NOTHING;

-- ── 協恩中學附屬幼稚園 (132870) ──
INSERT INTO school_aliases (school_id, alias, alias_type, confidence, source)
  SELECT id, '協恩', 'nickname', 1.0, 'manual' FROM schools WHERE school_code = '132870'
  ON CONFLICT (school_id, alias) DO NOTHING;
INSERT INTO school_aliases (school_id, alias, alias_type, confidence, source)
  SELECT id, '協恩幼稚園', 'nickname', 1.0, 'manual' FROM schools WHERE school_code = '132870'
  ON CONFLICT (school_id, alias) DO NOTHING;
INSERT INTO school_aliases (school_id, alias, alias_type, confidence, source)
  SELECT id, 'Heep Yunn', 'abbreviation', 1.0, 'manual' FROM schools WHERE school_code = '132870'
  ON CONFLICT (school_id, alias) DO NOTHING;

-- ── 根德園幼稚園 (322300) ──
INSERT INTO school_aliases (school_id, alias, alias_type, confidence, source)
  SELECT id, '根德園', 'nickname', 1.0, 'manual' FROM schools WHERE school_code = '322300'
  ON CONFLICT (school_id, alias) DO NOTHING;
INSERT INTO school_aliases (school_id, alias, alias_type, confidence, source)
  SELECT id, 'Kentville', 'abbreviation', 1.0, 'manual' FROM schools WHERE school_code = '322300'
  ON CONFLICT (school_id, alias) DO NOTHING;

-- ── 啓思幼稚園（本校 323926）──
INSERT INTO school_aliases (school_id, alias, alias_type, confidence, source)
  SELECT id, '啟思', 'nickname', 1.0, 'manual' FROM schools WHERE school_code = '323926'
  ON CONFLICT (school_id, alias) DO NOTHING;
INSERT INTO school_aliases (school_id, alias, alias_type, confidence, source)
  SELECT id, '啓思', 'nickname', 1.0, 'manual' FROM schools WHERE school_code = '323926'
  ON CONFLICT (school_id, alias) DO NOTHING;
INSERT INTO school_aliases (school_id, alias, alias_type, confidence, source)
  SELECT id, 'Creative', 'abbreviation', 0.80, 'manual' FROM schools WHERE school_code = '323926'
  ON CONFLICT (school_id, alias) DO NOTHING;

-- ── 啓思幼稚園（杏花邨 215830）──
INSERT INTO school_aliases (school_id, alias, alias_type, confidence, source)
  SELECT id, '啓思杏花邨', 'branch', 1.0, 'manual' FROM schools WHERE school_code = '215830'
  ON CONFLICT (school_id, alias) DO NOTHING;
INSERT INTO school_aliases (school_id, alias, alias_type, confidence, source)
  SELECT id, '啟思杏花邨', 'branch', 1.0, 'manual' FROM schools WHERE school_code = '215830'
  ON CONFLICT (school_id, alias) DO NOTHING;

-- ── 啓思小學附屬幼稚園 (544744) ──
INSERT INTO school_aliases (school_id, alias, alias_type, confidence, source)
  SELECT id, '啓思小學附屬', 'branch', 1.0, 'manual' FROM schools WHERE school_code = '544744'
  ON CONFLICT (school_id, alias) DO NOTHING;

-- ── 啓思幼稚園（深灣軒 560090）──
INSERT INTO school_aliases (school_id, alias, alias_type, confidence, source)
  SELECT id, '啓思深灣軒', 'branch', 1.0, 'manual' FROM schools WHERE school_code = '560090'
  ON CONFLICT (school_id, alias) DO NOTHING;

-- ── 啓思幼兒園（匯景 566071）──
INSERT INTO school_aliases (school_id, alias, alias_type, confidence, source)
  SELECT id, '啓思匯景', 'branch', 1.0, 'manual' FROM schools WHERE school_code = '566071'
  ON CONFLICT (school_id, alias) DO NOTHING;

-- ── 維多利亞幼稚園（康山 325481）──
INSERT INTO school_aliases (school_id, alias, alias_type, confidence, source)
  SELECT id, '維多利亞', 'nickname', 1.0, 'manual' FROM schools WHERE school_code = '325481'
  ON CONFLICT (school_id, alias) DO NOTHING;
INSERT INTO school_aliases (school_id, alias, alias_type, confidence, source)
  SELECT id, 'Victoria KG', 'abbreviation', 1.0, 'manual' FROM schools WHERE school_code = '325481'
  ON CONFLICT (school_id, alias) DO NOTHING;
INSERT INTO school_aliases (school_id, alias, alias_type, confidence, source)
  SELECT id, 'Victoria', 'abbreviation', 0.80, 'manual' FROM schools WHERE school_code = '325481'
  ON CONFLICT (school_id, alias) DO NOTHING;

-- ── 維多利亞（海怡）國際幼稚園 (216194) ──
INSERT INTO school_aliases (school_id, alias, alias_type, confidence, source)
  SELECT id, '維多利亞海怡', 'branch', 1.0, 'manual' FROM schools WHERE school_code = '216194'
  ON CONFLICT (school_id, alias) DO NOTHING;

-- ── 維多利亞（寶翠園）幼稚園 (542164) ──
INSERT INTO school_aliases (school_id, alias, alias_type, confidence, source)
  SELECT id, '維多利亞寶翠園', 'branch', 1.0, 'manual' FROM schools WHERE school_code = '542164'
  ON CONFLICT (school_id, alias) DO NOTHING;

-- ── 維多利亞（何文田）國際幼兒園 (566900) ──
INSERT INTO school_aliases (school_id, alias, alias_type, confidence, source)
  SELECT id, '維多利亞何文田', 'branch', 1.0, 'manual' FROM schools WHERE school_code = '566900'
  ON CONFLICT (school_id, alias) DO NOTHING;

-- ── 維多利亞（海峰園）幼兒園 (566934) ──
INSERT INTO school_aliases (school_id, alias, alias_type, confidence, source)
  SELECT id, '維多利亞海峰園', 'branch', 1.0, 'manual' FROM schools WHERE school_code = '566934'
  ON CONFLICT (school_id, alias) DO NOTHING;

-- ── 學之園幼稚園（青衣 534200）──
INSERT INTO school_aliases (school_id, alias, alias_type, confidence, source)
  SELECT id, '學之園', 'nickname', 1.0, 'manual' FROM schools WHERE school_code = '534200'
  ON CONFLICT (school_id, alias) DO NOTHING;
INSERT INTO school_aliases (school_id, alias, alias_type, confidence, source)
  SELECT id, 'Learningland', 'abbreviation', 1.0, 'manual' FROM schools WHERE school_code = '534200'
  ON CONFLICT (school_id, alias) DO NOTHING;

-- ── 學之園幼稚園（凱帆薈 561207）──
INSERT INTO school_aliases (school_id, alias, alias_type, confidence, source)
  SELECT id, '學之園凱帆薈', 'branch', 1.0, 'manual' FROM schools WHERE school_code = '561207'
  ON CONFLICT (school_id, alias) DO NOTHING;

-- ── 港青基信國際幼稚園 (216178) = YMCA ──
INSERT INTO school_aliases (school_id, alias, alias_type, confidence, source)
  SELECT id, 'YMCA', 'abbreviation', 0.90, 'manual' FROM schools WHERE school_code = '216178'
  ON CONFLICT (school_id, alias) DO NOTHING;
INSERT INTO school_aliases (school_id, alias, alias_type, confidence, source)
  SELECT id, '港青', 'nickname', 1.0, 'manual' FROM schools WHERE school_code = '216178'
  ON CONFLICT (school_id, alias) DO NOTHING;
INSERT INTO school_aliases (school_id, alias, alias_type, confidence, source)
  SELECT id, 'YMCA International', 'exact', 1.0, 'manual' FROM schools WHERE school_code = '216178'
  ON CONFLICT (school_id, alias) DO NOTHING;

-- ── 保良局系列（選幾間高知名度分校）──

-- 保良局朱李月華幼稚園 (563641)
INSERT INTO school_aliases (school_id, alias, alias_type, confidence, source)
  SELECT id, 'PLK朱李月華', 'nickname', 1.0, 'manual' FROM schools WHERE school_code = '563641'
  ON CONFLICT (school_id, alias) DO NOTHING;

-- 保良局莊啓程幼稚園 (323896)
INSERT INTO school_aliases (school_id, alias, alias_type, confidence, source)
  SELECT id, 'PLK莊啓程', 'nickname', 1.0, 'manual' FROM schools WHERE school_code = '323896'
  ON CONFLICT (school_id, alias) DO NOTHING;
INSERT INTO school_aliases (school_id, alias, alias_type, confidence, source)
  SELECT id, '保良局莊啟程', 'exact', 1.0, 'manual' FROM schools WHERE school_code = '323896'
  ON CONFLICT (school_id, alias) DO NOTHING;

-- 保良局蔡冠深幼稚園 (539872)
INSERT INTO school_aliases (school_id, alias, alias_type, confidence, source)
  SELECT id, 'PLK蔡冠深', 'nickname', 1.0, 'manual' FROM schools WHERE school_code = '539872'
  ON CONFLICT (school_id, alias) DO NOTHING;

-- 保良局金卿幼稚園 (325821)
INSERT INTO school_aliases (school_id, alias, alias_type, confidence, source)
  SELECT id, 'PLK金卿', 'nickname', 1.0, 'manual' FROM schools WHERE school_code = '325821'
  ON CONFLICT (school_id, alias) DO NOTHING;

-- 保良局田家炳兆康幼稚園 (157376)
INSERT INTO school_aliases (school_id, alias, alias_type, confidence, source)
  SELECT id, 'PLK田家炳', 'nickname', 0.90, 'manual' FROM schools WHERE school_code = '157376'
  ON CONFLICT (school_id, alias) DO NOTHING;

-- ── 通用縮寫 ──
-- 保良局 → PLK（多校共用暱稱，不入 alias；只做具體分校）

-- ── 啓思幼稚園（匯景花園 325864）──
INSERT INTO school_aliases (school_id, alias, alias_type, confidence, source)
  SELECT id, '啓思匯景花園', 'branch', 1.0, 'manual' FROM schools WHERE school_code = '325864'
  ON CONFLICT (school_id, alias) DO NOTHING;

-- ── 聖保羅堂 = 聖保羅 alternates ──
INSERT INTO school_aliases (school_id, alias, alias_type, confidence, source)
  SELECT id, '聖保羅堂', 'nickname', 1.0, 'manual' FROM schools WHERE school_code = '131466'
  ON CONFLICT (school_id, alias) DO NOTHING;
INSERT INTO school_aliases (school_id, alias, alias_type, confidence, source)
  SELECT id, '聖保羅幼稚園', 'nickname', 1.0, 'manual' FROM schools WHERE school_code = '131466'
  ON CONFLICT (school_id, alias) DO NOTHING;

-- ============================================================
-- Seed 008b: 第二批熱門幼稚園別名（擴充）
-- ============================================================

-- ── 迦南幼稚園系列 ──
-- 迦南（九龍塘 531910）— 旗艦
INSERT INTO school_aliases (school_id, alias, alias_type, confidence, source)
  SELECT id, '迦南', 'nickname', 1.0, 'manual' FROM schools WHERE school_code = '531910'
  ON CONFLICT (school_id, alias) DO NOTHING;
INSERT INTO school_aliases (school_id, alias, alias_type, confidence, source)
  SELECT id, 'Cannan', 'abbreviation', 0.90, 'manual' FROM schools WHERE school_code = '531910'
  ON CONFLICT (school_id, alias) DO NOTHING;
INSERT INTO school_aliases (school_id, alias, alias_type, confidence, source)
  SELECT id, '迦南九龍塘', 'branch', 1.0, 'manual' FROM schools WHERE school_code = '531910'
  ON CONFLICT (school_id, alias) DO NOTHING;
-- 迦南（黃埔花園 575518）
INSERT INTO school_aliases (school_id, alias, alias_type, confidence, source)
  SELECT id, '迦南黃埔', 'branch', 1.0, 'manual' FROM schools WHERE school_code = '575518'
  ON CONFLICT (school_id, alias) DO NOTHING;
-- 迦南（窩打老道 565130）
INSERT INTO school_aliases (school_id, alias, alias_type, confidence, source)
  SELECT id, '迦南窩打老道', 'branch', 1.0, 'manual' FROM schools WHERE school_code = '565130'
  ON CONFLICT (school_id, alias) DO NOTHING;
-- 迦南（小西灣 325996）
INSERT INTO school_aliases (school_id, alias, alias_type, confidence, source)
  SELECT id, '迦南小西灣', 'branch', 1.0, 'manual' FROM schools WHERE school_code = '325996'
  ON CONFLICT (school_id, alias) DO NOTHING;
-- 迦南（麗港城 216054）
INSERT INTO school_aliases (school_id, alias, alias_type, confidence, source)
  SELECT id, '迦南麗港城', 'branch', 1.0, 'manual' FROM schools WHERE school_code = '216054'
  ON CONFLICT (school_id, alias) DO NOTHING;
-- 迦南（荃灣 516376）
INSERT INTO school_aliases (school_id, alias, alias_type, confidence, source)
  SELECT id, '迦南荃灣', 'branch', 1.0, 'manual' FROM schools WHERE school_code = '516376'
  ON CONFLICT (school_id, alias) DO NOTHING;
-- 迦南（將軍澳 619787）
INSERT INTO school_aliases (school_id, alias, alias_type, confidence, source)
  SELECT id, '迦南將軍澳', 'branch', 1.0, 'manual' FROM schools WHERE school_code = '619787'
  ON CONFLICT (school_id, alias) DO NOTHING;

-- ── 國際英文幼稚園 (215120) = St. Catherine's ──
INSERT INTO school_aliases (school_id, alias, alias_type, confidence, source)
  SELECT id, '國際英文', 'nickname', 1.0, 'manual' FROM schools WHERE school_code = '215120'
  ON CONFLICT (school_id, alias) DO NOTHING;
INSERT INTO school_aliases (school_id, alias, alias_type, confidence, source)
  SELECT id, 'St Catherine', 'abbreviation', 0.95, 'manual' FROM schools WHERE school_code = '215120'
  ON CONFLICT (school_id, alias) DO NOTHING;
INSERT INTO school_aliases (school_id, alias, alias_type, confidence, source)
  SELECT id, 'St. Catherine''s', 'abbreviation', 1.0, 'manual' FROM schools WHERE school_code = '215120'
  ON CONFLICT (school_id, alias) DO NOTHING;

-- ── 約克系列 ──
-- 約克（本校 215449）
INSERT INTO school_aliases (school_id, alias, alias_type, confidence, source)
  SELECT id, '約克', 'nickname', 1.0, 'manual' FROM schools WHERE school_code = '215449'
  ON CONFLICT (school_id, alias) DO NOTHING;
INSERT INTO school_aliases (school_id, alias, alias_type, confidence, source)
  SELECT id, 'York KG', 'abbreviation', 1.0, 'manual' FROM schools WHERE school_code = '215449'
  ON CONFLICT (school_id, alias) DO NOTHING;
-- 約克（九龍塘 322822）
INSERT INTO school_aliases (school_id, alias, alias_type, confidence, source)
  SELECT id, '約克九龍塘', 'branch', 1.0, 'manual' FROM schools WHERE school_code = '322822'
  ON CONFLICT (school_id, alias) DO NOTHING;
-- 約克國際 (581852)
INSERT INTO school_aliases (school_id, alias, alias_type, confidence, source)
  SELECT id, '約克國際', 'branch', 1.0, 'manual' FROM schools WHERE school_code = '581852'
  ON CONFLICT (school_id, alias) DO NOTHING;

-- ── 金巴倫英文幼稚園 (214868) ──
INSERT INTO school_aliases (school_id, alias, alias_type, confidence, source)
  SELECT id, '金巴倫', 'nickname', 1.0, 'manual' FROM schools WHERE school_code = '214868'
  ON CONFLICT (school_id, alias) DO NOTHING;
INSERT INTO school_aliases (school_id, alias, alias_type, confidence, source)
  SELECT id, 'St. Nicholas', 'abbreviation', 0.90, 'manual' FROM schools WHERE school_code = '214868'
  ON CONFLICT (school_id, alias) DO NOTHING;

-- ── 多多國際幼稚園系列 ──
-- 多多（九龍塘 542504）
INSERT INTO school_aliases (school_id, alias, alias_type, confidence, source)
  SELECT id, '多多', 'nickname', 1.0, 'manual' FROM schools WHERE school_code = '542504'
  ON CONFLICT (school_id, alias) DO NOTHING;
INSERT INTO school_aliases (school_id, alias, alias_type, confidence, source)
  SELECT id, 'Tutor Time', 'abbreviation', 1.0, 'manual' FROM schools WHERE school_code = '542504'
  ON CONFLICT (school_id, alias) DO NOTHING;
INSERT INTO school_aliases (school_id, alias, alias_type, confidence, source)
  SELECT id, '多多九龍塘', 'branch', 1.0, 'manual' FROM schools WHERE school_code = '542504'
  ON CONFLICT (school_id, alias) DO NOTHING;
-- 多多（半山 593133）
INSERT INTO school_aliases (school_id, alias, alias_type, confidence, source)
  SELECT id, '多多半山', 'branch', 1.0, 'manual' FROM schools WHERE school_code = '593133'
  ON CONFLICT (school_id, alias) DO NOTHING;
-- 多多（寶馬山 575852）
INSERT INTO school_aliases (school_id, alias, alias_type, confidence, source)
  SELECT id, '多多寶馬山', 'branch', 1.0, 'manual' FROM schools WHERE school_code = '575852'
  ON CONFLICT (school_id, alias) DO NOTHING;
-- 多多（形點 605794）
INSERT INTO school_aliases (school_id, alias, alias_type, confidence, source)
  SELECT id, '多多形點', 'branch', 1.0, 'manual' FROM schools WHERE school_code = '605794'
  ON CONFLICT (school_id, alias) DO NOTHING;

-- ── 德萃幼稚園系列 ──
-- 德萃（紅磡 604445）
INSERT INTO school_aliases (school_id, alias, alias_type, confidence, source)
  SELECT id, '德萃', 'nickname', 1.0, 'manual' FROM schools WHERE school_code = '604445'
  ON CONFLICT (school_id, alias) DO NOTHING;
INSERT INTO school_aliases (school_id, alias, alias_type, confidence, source)
  SELECT id, 'St. Hilary''s', 'abbreviation', 1.0, 'manual' FROM schools WHERE school_code = '604445'
  ON CONFLICT (school_id, alias) DO NOTHING;
INSERT INTO school_aliases (school_id, alias, alias_type, confidence, source)
  SELECT id, '德萃紅磡', 'branch', 1.0, 'manual' FROM schools WHERE school_code = '604445'
  ON CONFLICT (school_id, alias) DO NOTHING;
-- 德萃（馬鞍山 616290）
INSERT INTO school_aliases (school_id, alias, alias_type, confidence, source)
  SELECT id, '德萃馬鞍山', 'branch', 1.0, 'manual' FROM schools WHERE school_code = '616290'
  ON CONFLICT (school_id, alias) DO NOTHING;

-- ── 哈羅小獅幼稚園 (627275) ──
INSERT INTO school_aliases (school_id, alias, alias_type, confidence, source)
  SELECT id, '哈羅', 'nickname', 1.0, 'manual' FROM schools WHERE school_code = '627275'
  ON CONFLICT (school_id, alias) DO NOTHING;
INSERT INTO school_aliases (school_id, alias, alias_type, confidence, source)
  SELECT id, 'Harrow', 'abbreviation', 0.90, 'manual' FROM schools WHERE school_code = '627275'
  ON CONFLICT (school_id, alias) DO NOTHING;
INSERT INTO school_aliases (school_id, alias, alias_type, confidence, source)
  SELECT id, 'Harrow Little Lions', 'exact', 1.0, 'manual' FROM schools WHERE school_code = '627275'
  ON CONFLICT (school_id, alias) DO NOTHING;

-- ── 方方樂趣幼稚園 (565105) ──
INSERT INTO school_aliases (school_id, alias, alias_type, confidence, source)
  SELECT id, '方方樂趣', 'nickname', 1.0, 'manual' FROM schools WHERE school_code = '565105'
  ON CONFLICT (school_id, alias) DO NOTHING;
INSERT INTO school_aliases (school_id, alias, alias_type, confidence, source)
  SELECT id, 'Funful', 'abbreviation', 1.0, 'manual' FROM schools WHERE school_code = '565105'
  ON CONFLICT (school_id, alias) DO NOTHING;

-- ── 太陽島英文幼稚園系列 ──
-- 太陽島（本校 215678）
INSERT INTO school_aliases (school_id, alias, alias_type, confidence, source)
  SELECT id, '太陽島', 'nickname', 1.0, 'manual' FROM schools WHERE school_code = '215678'
  ON CONFLICT (school_id, alias) DO NOTHING;
INSERT INTO school_aliases (school_id, alias, alias_type, confidence, source)
  SELECT id, 'Sun Island', 'abbreviation', 1.0, 'manual' FROM schools WHERE school_code = '215678'
  ON CONFLICT (school_id, alias) DO NOTHING;

-- ── 安菲爾國際幼稚園 (535818) ──
INSERT INTO school_aliases (school_id, alias, alias_type, confidence, source)
  SELECT id, '安菲爾', 'nickname', 1.0, 'manual' FROM schools WHERE school_code = '535818'
  ON CONFLICT (school_id, alias) DO NOTHING;
INSERT INTO school_aliases (school_id, alias, alias_type, confidence, source)
  SELECT id, 'Anfield', 'abbreviation', 1.0, 'manual' FROM schools WHERE school_code = '535818'
  ON CONFLICT (school_id, alias) DO NOTHING;

-- ── 劍鳴幼稚園 (537713) ──
INSERT INTO school_aliases (school_id, alias, alias_type, confidence, source)
  SELECT id, '劍鳴', 'nickname', 1.0, 'manual' FROM schools WHERE school_code = '537713'
  ON CONFLICT (school_id, alias) DO NOTHING;
INSERT INTO school_aliases (school_id, alias, alias_type, confidence, source)
  SELECT id, 'Keen Mind', 'abbreviation', 1.0, 'manual' FROM schools WHERE school_code = '537713'
  ON CONFLICT (school_id, alias) DO NOTHING;

-- ── 思博幼稚園 (590860) ──
INSERT INTO school_aliases (school_id, alias, alias_type, confidence, source)
  SELECT id, '思博', 'nickname', 1.0, 'manual' FROM schools WHERE school_code = '590860'
  ON CONFLICT (school_id, alias) DO NOTHING;
INSERT INTO school_aliases (school_id, alias, alias_type, confidence, source)
  SELECT id, 'Swindon', 'abbreviation', 1.0, 'manual' FROM schools WHERE school_code = '590860'
  ON CONFLICT (school_id, alias) DO NOTHING;

-- ── 嘉諾撒聖心幼稚園 (325970) ──
INSERT INTO school_aliases (school_id, alias, alias_type, confidence, source)
  SELECT id, '嘉諾撒聖心', 'nickname', 1.0, 'manual' FROM schools WHERE school_code = '325970'
  ON CONFLICT (school_id, alias) DO NOTHING;
INSERT INTO school_aliases (school_id, alias, alias_type, confidence, source)
  SELECT id, 'Sacred Heart', 'abbreviation', 0.85, 'manual' FROM schools WHERE school_code = '325970'
  ON CONFLICT (school_id, alias) DO NOTHING;

-- ── 明我幼稚園 (324230) ──
INSERT INTO school_aliases (school_id, alias, alias_type, confidence, source)
  SELECT id, '明我', 'nickname', 1.0, 'manual' FROM schools WHERE school_code = '324230'
  ON CONFLICT (school_id, alias) DO NOTHING;
INSERT INTO school_aliases (school_id, alias, alias_type, confidence, source)
  SELECT id, 'Dominic Savio', 'abbreviation', 1.0, 'manual' FROM schools WHERE school_code = '324230'
  ON CONFLICT (school_id, alias) DO NOTHING;
-- 明我（奧運 533858）
INSERT INTO school_aliases (school_id, alias, alias_type, confidence, source)
  SELECT id, '明我奧運', 'branch', 1.0, 'manual' FROM schools WHERE school_code = '533858'
  ON CONFLICT (school_id, alias) DO NOTHING;

-- ── 聖三一中心幼稚園 (325180) ──
INSERT INTO school_aliases (school_id, alias, alias_type, confidence, source)
  SELECT id, '聖三一', 'nickname', 1.0, 'manual' FROM schools WHERE school_code = '325180'
  ON CONFLICT (school_id, alias) DO NOTHING;
INSERT INTO school_aliases (school_id, alias, alias_type, confidence, source)
  SELECT id, 'Holy Trinity', 'abbreviation', 0.85, 'manual' FROM schools WHERE school_code = '325180'
  ON CONFLICT (school_id, alias) DO NOTHING;

-- ── 崇真小學暨幼稚園 (514659) ──
INSERT INTO school_aliases (school_id, alias, alias_type, confidence, source)
  SELECT id, '崇真', 'nickname', 0.85, 'manual' FROM schools WHERE school_code = '514659'
  ON CONFLICT (school_id, alias) DO NOTHING;
INSERT INTO school_aliases (school_id, alias, alias_type, confidence, source)
  SELECT id, 'Tsung Tsin', 'abbreviation', 0.80, 'manual' FROM schools WHERE school_code = '514659'
  ON CONFLICT (school_id, alias) DO NOTHING;

-- ── 銅鑼灣維多利亞幼兒園 (566942) ──
INSERT INTO school_aliases (school_id, alias, alias_type, confidence, source)
  SELECT id, '銅鑼灣維多利亞', 'branch', 1.0, 'manual' FROM schools WHERE school_code = '566942'
  ON CONFLICT (school_id, alias) DO NOTHING;

-- ── 寶血幼稚園 (133019) ──
INSERT INTO school_aliases (school_id, alias, alias_type, confidence, source)
  SELECT id, '寶血', 'nickname', 0.85, 'manual' FROM schools WHERE school_code = '133019'
  ON CONFLICT (school_id, alias) DO NOTHING;
INSERT INTO school_aliases (school_id, alias, alias_type, confidence, source)
  SELECT id, 'Precious Blood', 'abbreviation', 0.80, 'manual' FROM schools WHERE school_code = '133019'
  ON CONFLICT (school_id, alias) DO NOTHING;

-- ── 宏廣國際幼稚園 (590401) ──
INSERT INTO school_aliases (school_id, alias, alias_type, confidence, source)
  SELECT id, '宏廣', 'nickname', 1.0, 'manual' FROM schools WHERE school_code = '590401'
  ON CONFLICT (school_id, alias) DO NOTHING;
INSERT INTO school_aliases (school_id, alias, alias_type, confidence, source)
  SELECT id, 'Wellcome International', 'exact', 1.0, 'manual' FROM schools WHERE school_code = '590401'
  ON CONFLICT (school_id, alias) DO NOTHING;

-- ── 繁簡體 / 常見錯寫 變體 ──
-- 啓 vs 啟 (already done for 啓思)
-- 學之園 simplified variant
INSERT INTO school_aliases (school_id, alias, alias_type, confidence, source)
  SELECT id, '学之园', 'nickname', 0.90, 'manual' FROM schools WHERE school_code = '534200'
  ON CONFLICT (school_id, alias) DO NOTHING;
-- 維多利亞 simplified
INSERT INTO school_aliases (school_id, alias, alias_type, confidence, source)
  SELECT id, '维多利亚', 'nickname', 0.90, 'manual' FROM schools WHERE school_code = '325481'
  ON CONFLICT (school_id, alias) DO NOTHING;
-- 根德園 simplified
INSERT INTO school_aliases (school_id, alias, alias_type, confidence, source)
  SELECT id, '根德园', 'nickname', 0.90, 'manual' FROM schools WHERE school_code = '322300'
  ON CONFLICT (school_id, alias) DO NOTHING;
-- 協恩 simplified
INSERT INTO school_aliases (school_id, alias, alias_type, confidence, source)
  SELECT id, '协恩', 'nickname', 0.90, 'manual' FROM schools WHERE school_code = '132870'
  ON CONFLICT (school_id, alias) DO NOTHING;
-- 聖保羅 simplified
INSERT INTO school_aliases (school_id, alias, alias_type, confidence, source)
  SELECT id, '圣保罗', 'nickname', 0.90, 'manual' FROM schools WHERE school_code = '131466'
  ON CONFLICT (school_id, alias) DO NOTHING;
-- 迦南 simplified
INSERT INTO school_aliases (school_id, alias, alias_type, confidence, source)
  SELECT id, '迦南', 'nickname', 0.90, 'manual' FROM schools WHERE school_code = '531910'
  ON CONFLICT (school_id, alias) DO NOTHING;
-- 德萃 simplified
INSERT INTO school_aliases (school_id, alias, alias_type, confidence, source)
  SELECT id, '德萃', 'nickname', 0.90, 'manual' FROM schools WHERE school_code = '604445'
  ON CONFLICT (school_id, alias) DO NOTHING;
