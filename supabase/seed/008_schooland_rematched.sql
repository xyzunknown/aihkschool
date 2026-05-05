-- Schooland rematched enrichment for previously unmatched schools
-- Generated: 2026-05-05
-- Newly matched: 18 schools

-- 明我幼稚園 matched by website_host
UPDATE schools SET
  schooland_url = 'https://www.schooland.hk/kg/dsk',
  schooland_source_url = 'https://www.schooland.hk/kg/dsk',
  schooland_source_updated_at = now(),
  schooland_intro = COALESCE('以循序漸進螺旋式原則設計課程，透過切合兒童生活經驗的主題，利用多元化的活動和遊戲，綜合不同學科的概念，包括中文、英文、早期數學、科學與科技、體能與健康、藝術和通識教育，為兒童提供全面和均衡的學習經驗。採用主題學習及設計活動，以遊戲貫穿學習內容，透過創意教學以啟發兒童的全面發展，並有新聞分享、情境創作、參觀、旅行、表演等多項課外學習活動，培養兒童關心社會的公民意識。', schooland_intro),
  schooland_teaching_summary = COALESCE('學校有教職員約 30 位，師生比例約 1 位教師對 11 名學生', schooland_teaching_summary),
  schooland_facilities_summary = COALESCE('學校有註冊課室 16 個，可容納約 392 個學生', schooland_facilities_summary),
  schooland_founded_year = COALESCE(1977, schooland_founded_year),
  schooland_staff_count = COALESCE(30, schooland_staff_count),
  schooland_teacher_student_ratio = COALESCE('11', schooland_teacher_student_ratio),
  last_profile_scraped_at = now()
WHERE school_code = '324230';

-- Hamilton Hill 國際幼稚園 matched by website_host
UPDATE schools SET
  schooland_url = 'https://www.schooland.hk/kg/hamilton',
  schooland_source_url = 'https://www.schooland.hk/kg/hamilton',
  schooland_source_updated_at = now(),
  schooland_intro = COALESCE('漢密爾頓山國際幼稚園是一所位於香港的國際學校，專注於啟發式和創意教學。學校以表演藝術和語言學習為特色，透過舞蹈、音樂和戲劇等課程，培養孩子的自信與表達能力，同時鼓勵他們主動探索、獨立思考，從小建立對學習的熱愛。', schooland_intro),
  schooland_teaching_summary = COALESCE('學校有教職員約 2 位，師生比例約 1 位教師對 4 名學生', schooland_teaching_summary),
  schooland_facilities_summary = COALESCE('學校課室可容納約 137 個學生', schooland_facilities_summary),
  schooland_founded_year = COALESCE(2014, schooland_founded_year),
  schooland_staff_count = COALESCE(2, schooland_staff_count),
  schooland_teacher_student_ratio = COALESCE('4', schooland_teacher_student_ratio),
  last_profile_scraped_at = now()
WHERE school_code = '215635';

-- 維多利亞(康怡)幼兒園 matched by website_host
UPDATE schools SET
  schooland_url = 'https://www.schooland.hk/kg/victoria-kh2',
  schooland_source_url = 'https://www.schooland.hk/kg/victoria-kh2',
  schooland_source_updated_at = now(),
  schooland_intro = COALESCE('透過有趣的探索主題，配合相關的遊戲，促進嬰幼兒大小肌肉的協調，刺激他們的感官發展，引發他們的好奇心及探索事物的興趣。讓嬰幼兒在成人的陪同下，透過啟發性的環境，在遊戲中進行個別或小組活動。', schooland_intro),
  schooland_teaching_summary = COALESCE('學校有教職員約 11 位，師生比例約 1 位教師對 2 名學生', schooland_teaching_summary),
  schooland_facilities_summary = COALESCE('學校有註冊課室 4 個', schooland_facilities_summary),
  schooland_founded_year = COALESCE(1986, schooland_founded_year),
  schooland_staff_count = COALESCE(11, schooland_staff_count),
  schooland_teacher_student_ratio = COALESCE('2', schooland_teacher_student_ratio),
  last_profile_scraped_at = now()
WHERE school_code = '569828';

-- 保良局莊啟程夫人(華貴)幼稚園 matched by name_prefix
UPDATE schools SET
  schooland_url = 'https://www.schooland.hk/kg/plk-vktcwk',
  schooland_source_url = 'https://www.schooland.hk/kg/plk-vktcwk',
  schooland_source_updated_at = now(),
  schooland_intro = COALESCE('按幼兒發展需要，設計以幼兒為本的課程。學習內容結合生活經驗及興趣作編排，以多元化活動，如探究式科學、戲劇、奧福音樂、情意教育、創意美術活動等，培育幼兒作均衡發展；並提供多感官學習，鼓勵探索，提升幼兒訊息處理及社交解難能力，並定期檢視課程的適切性。學習著重親身探索和創意，安排幼兒走出課堂，參與各類活動如參觀、探訪等。課堂學習包括活動教學、專題研習、個別及小組學習，並利用奧福音樂理念推行音樂活動，由外籍教師教授英語及普通話教師教授普通話，其他活動包括制服團隊、興趣班等。', schooland_intro),
  schooland_teaching_summary = COALESCE('學校有教職員約 8 位，師生比例約 1 位教師對 7 名學生', schooland_teaching_summary),
  schooland_facilities_summary = COALESCE('學校有註冊課室 4 個，可容納約 96 個學生', schooland_facilities_summary),
  schooland_founded_year = COALESCE(1992, schooland_founded_year),
  schooland_staff_count = COALESCE(8, schooland_staff_count),
  schooland_teacher_student_ratio = COALESCE('7', schooland_teacher_student_ratio),
  last_profile_scraped_at = now()
WHERE school_code = '563773';

-- 力行幼稚園(南便圍) matched by website_host
UPDATE schools SET
  schooland_url = 'https://www.schooland.hk/kg/lickhang',
  schooland_source_url = 'https://www.schooland.hk/kg/lickhang',
  schooland_source_updated_at = now(),
  schooland_intro = COALESCE('以綜合課程為主，透過活動及遊戲，配合主題及兒童身心發展需要而編訂。非華裔兒童透過漸進式教學法學習中文。兒童透過主動探索、同伴討論及思考來建立知識及自信。戶外體驗課程，加強兒童觀察力及關懷社區。大自然教室提供充足機會讓兒童接觸大自然。小組活動教學，並配合朗讀故事、普通話、操作式數學、唱遊、律動及英語拼音教學，讓兒童學習得到全面發展。注重兒童健康及體能發展，每天有體能活動，包括：跑步、伸展體操。每週借閱圖書計劃，培養閱讀興趣。家校互動合作，協助兒童不同領域的學習。每週有學習表現評量表，記錄兒童在校的學習表現，讓家長更了解兒童每週的學習內容及情況。', schooland_intro),
  schooland_teaching_summary = COALESCE('學校有教職員約 4 位，師生比例約 1 位教師對 15 名學生', schooland_teaching_summary),
  schooland_facilities_summary = COALESCE('學校有註冊課室 1 個，可容納約 78 個學生', schooland_facilities_summary),
  schooland_founded_year = COALESCE(1964, schooland_founded_year),
  schooland_staff_count = COALESCE(4, schooland_staff_count),
  schooland_teacher_student_ratio = COALESCE('15', schooland_teacher_student_ratio),
  last_profile_scraped_at = now()
WHERE school_code = '155705';

-- 力行幼稚園(梅窩鄉事會路) matched by website_host
UPDATE schools SET
  schooland_url = 'https://www.schooland.hk/kg/lickhang2',
  schooland_source_url = 'https://www.schooland.hk/kg/lickhang2',
  schooland_source_updated_at = now(),
  schooland_intro = COALESCE('以綜合課程為主，透過活動及遊戲，配合主題及兒童身心發展需要而編訂。非華裔兒童透過漸進式教學法學習中文。兒童透過主動探索、同伴討論及思考來建立知識及自信。戶外體驗課程，加強兒童觀察力及關懷社區。大自然教室提供充足機會讓兒童接觸大自然。小組活動教學，並配合朗讀故事、普通話、操作式數學、唱遊、律動及英語拼音教學，讓兒童學習得到全面發展。注重兒童健康及體能發展，每天有體能活動，包括：跑步、伸展體操。每週借閱圖書計劃，培養閱讀興趣。家校互動合作，協助兒童不同領域的學習。每週有學習表現評量表，記錄兒童在校的學習表現，讓家長更了解兒童每週的學習內容及情況。', schooland_intro),
  schooland_teaching_summary = COALESCE('學校有教職員約 3 位，師生比例約 1 位教師對 5 名學生', schooland_teaching_summary),
  schooland_facilities_summary = COALESCE('學校有註冊課室 2 個，可容納約 30 個學生', schooland_facilities_summary),
  schooland_founded_year = COALESCE(1964, schooland_founded_year),
  schooland_staff_count = COALESCE(3, schooland_staff_count),
  schooland_teacher_student_ratio = COALESCE('5', schooland_teacher_student_ratio),
  last_profile_scraped_at = now()
WHERE school_code = '155705';

-- 佳寶幼稚園 matched by website_host
UPDATE schools SET
  schooland_url = 'https://www.schooland.hk/kg/guideposts1',
  schooland_source_url = 'https://www.schooland.hk/kg/guideposts1',
  schooland_source_updated_at = now(),
  schooland_intro = COALESCE('按照兒童的年齡特點，以主題作綜合德、智、體、群、美、靈六育均衡的課程，發展兒童個人的潛能。並滲入全腦發展、科學探索、生活技能、解難能力、情緒處理等學習元素。採用主題設計分組活動，透過遊戲課程、角色扮演、實物觀察、體能訓練、戶外參觀等動、靜交替活動。更透過環境佈置，各項啟發性的教具、教材，誘發兒童多元化的學習興趣。', schooland_intro),
  schooland_teaching_summary = COALESCE('學校有教職員約 7 位，師生比例約 1 位教師對 12 名學生', schooland_teaching_summary),
  schooland_facilities_summary = COALESCE('學校有註冊課室 6 個，可容納約 135 個學生', schooland_facilities_summary),
  schooland_founded_year = COALESCE(1976, schooland_founded_year),
  schooland_staff_count = COALESCE(7, schooland_staff_count),
  schooland_teacher_student_ratio = COALESCE('12', schooland_teacher_student_ratio),
  last_profile_scraped_at = now()
WHERE school_code = '159190';

-- 地利亞英文小學暨幼稚園 matched by name_tc_exact
UPDATE schools SET
  schooland_url = 'https://www.schooland.hk/kg/depsk',
  schooland_source_url = 'https://www.schooland.hk/kg/depsk',
  schooland_source_updated_at = now(),
  schooland_intro = COALESCE('按照幼兒身心發展的需要，啟發幼兒多元智能的潛能。以兒童為本之綜合活動教學、並以遊戲、專題研習、參觀、實地探究、趣味英語等活動以提昇幼兒學習興趣.', schooland_intro),
  schooland_teaching_summary = COALESCE('學校有教職員約 14 位，師生比例約 1 位教師對 10 名學生', schooland_teaching_summary),
  schooland_facilities_summary = COALESCE('學校有註冊課室 6 個，可容納約 257 個學生', schooland_facilities_summary),
  schooland_founded_year = COALESCE(1965, schooland_founded_year),
  schooland_staff_count = COALESCE(14, schooland_staff_count),
  schooland_teacher_student_ratio = COALESCE('10', schooland_teacher_student_ratio),
  last_profile_scraped_at = now()
WHERE school_code = '216208';

-- 智樂幼稚園(南昌街) matched by website_host
UPDATE schools SET
  schooland_url = 'https://www.schooland.hk/kg/clk',
  schooland_source_url = 'https://www.schooland.hk/kg/clk',
  schooland_source_updated_at = now(),
  schooland_intro = COALESCE('按照不同年齡兒童的發展進度和個別差異，配合兒童的學習興趣。從遊戲中學習，分主題教學、小組教學、不同類型的參觀、表演，令兒童從中獲得不同的知識。', schooland_intro),
  schooland_teaching_summary = COALESCE('學校有教職員約 8 位，師生比例約 1 位教師對 13 名學生', schooland_teaching_summary),
  schooland_facilities_summary = COALESCE('學校有註冊課室 6 個，可容納約 135 個學生', schooland_facilities_summary),
  schooland_founded_year = COALESCE(1999, schooland_founded_year),
  schooland_staff_count = COALESCE(8, schooland_staff_count),
  schooland_teacher_student_ratio = COALESCE('13', schooland_teacher_student_ratio),
  last_profile_scraped_at = now()
WHERE school_code = '532550';

-- 智樂幼稚園(大南街) matched by website_host
UPDATE schools SET
  schooland_url = 'https://www.schooland.hk/kg/clk2',
  schooland_source_url = 'https://www.schooland.hk/kg/clk2',
  schooland_source_updated_at = now(),
  schooland_intro = COALESCE('按照不同年齡兒童的發展進度和個別差異，配合兒童的學習興趣。從遊戲中學習，分主題教學、小組教學、不同類型的參觀、表演，令兒童從中獲得不同的知識。', schooland_intro),
  schooland_teaching_summary = COALESCE('學校有教職員約 3 位，師生比例約 1 位教師對 6 名學生', schooland_teaching_summary),
  schooland_facilities_summary = COALESCE('學校有註冊課室 1 個，可容納約 36 個學生', schooland_facilities_summary),
  schooland_founded_year = COALESCE(1999, schooland_founded_year),
  schooland_staff_count = COALESCE(3, schooland_staff_count),
  schooland_teacher_student_ratio = COALESCE('6', schooland_teacher_student_ratio),
  last_profile_scraped_at = now()
WHERE school_code = '532550';

-- 香港靈糧堂秀德幼稚園(二校) Hong Kong Ling Liang Church Sau Tak Kindergarten (Campus 2) matched by website_host
UPDATE schools SET
  schooland_url = 'https://www.schooland.hk/kg/llc9',
  schooland_source_url = 'https://www.schooland.hk/kg/llc9',
  schooland_source_updated_at = now(),
  schooland_intro = COALESCE('課程設計以靈育為「核心」，主題教學為「骨幹」，高廣度教學為「經」，方案教學為「緯」，遊戲為「脈絡」。以「高廣度」教學之「計劃」、「進行」、「經驗分享」的學習過程,提供多元「學習區」,令兒童經歷「經驗→探索→創作→認知」的自學歷程。由主題作為引起動機而衍生至專題研習的方案活動,營造「帶著一個問題走進課室,又帶著多個問題離開課室」的學習氣氛。創意的全語文學習激發兒童對文字產生高度興趣；「請聽我讀計劃」令兒童能認讀大量中英文字彙,提升兒童運用文字及創寫短文的能力。外籍老師以生活化模式透過校本設計教材,幫助兒童輕易掌握聽、講、讀及拼音的能力。採用奧福音樂教學法,以音樂元素開發想像、抽象、空間及情緒智能,為未來學習樂器作好基礎。採用「幼兒體適能課程」,引發兒童的潛能,提升體力及自我保護能力,養成獨立自主的個性。提倡「生活教育藝術化,藝術教育生活化」,以創新方式引領幼兒進行各種藝術元素之學習活動。', schooland_intro),
  schooland_teaching_summary = COALESCE('學校有教職員約 22 位，師生比例約 1 位教師對 10 名學生', schooland_teaching_summary),
  schooland_facilities_summary = COALESCE('學校有註冊課室 8 個，可容納約 458 個學生', schooland_facilities_summary),
  schooland_founded_year = COALESCE(2015, schooland_founded_year),
  schooland_staff_count = COALESCE(22, schooland_staff_count),
  schooland_teacher_student_ratio = COALESCE('10', schooland_teacher_student_ratio),
  last_profile_scraped_at = now()
WHERE school_code = '601861';

-- 中華基督教會沙田堂博康幼稚園 matched by name_prefix
UPDATE schools SET
  schooland_url = 'https://www.schooland.hk/kg/ccc-stcph',
  schooland_source_url = 'https://www.schooland.hk/kg/ccc-stcph',
  schooland_source_updated_at = now(),
  schooland_intro = COALESCE('課程編排分別有「體能」、「語文」、「數學」、「科學」、「社群」和「藝術」六個學習範疇；學校強調是知識概念的建立，目標是培育兒童獲得全面及均衡的發展，為未來學習奠好基礎。學校主要是採用「活動教學」及「專題研習」的教學方式，並透過「遊戲中學習」及「做中學」，和提供豐富的語文環境建立兒童兩文三語的語文能力，有策略地推行閱讀計劃，培養兒童閱讀的興趣和習慣。', schooland_intro),
  schooland_teaching_summary = COALESCE('學校有教職員約 7 位，師生比例約 1 位教師對 8 名學生', schooland_teaching_summary),
  schooland_facilities_summary = COALESCE('學校有註冊課室 6 個，可容納約 99 個學生', schooland_facilities_summary),
  schooland_founded_year = COALESCE(1983, schooland_founded_year),
  schooland_staff_count = COALESCE(7, schooland_staff_count),
  schooland_teacher_student_ratio = COALESCE('8', schooland_teacher_student_ratio),
  last_profile_scraped_at = now()
WHERE school_code = '570885';

-- 大埔禮賢會幼稚園(富蝶分校) matched by website_host
UPDATE schools SET
  schooland_url = 'https://www.schooland.hk/kg/rhenish-tpcb',
  schooland_source_url = 'https://www.schooland.hk/kg/rhenish-tpcb',
  schooland_source_updated_at = now(),
  schooland_intro = COALESCE('綜合課程、小組教學、語常會優質學前英語教學活動、生命教育、自由遊戲。本校著重兩文三語，由專科老師進行英語及普通話活動，為幼兒的語言發展建立良好的基礎。採用小組及遊戲方式教學，配合不同主題和生活經驗，讓幼兒透過遊戲及親身體驗，於群體和環境中互動學習，並培養良好的品德。', schooland_intro),
  schooland_teaching_summary = COALESCE('學校有教職員約 16 位，師生比例約 1 位教師對 8 名學生', schooland_teaching_summary),
  schooland_facilities_summary = COALESCE('學校有註冊課室 7 個，可容納約 192 個學生', schooland_facilities_summary),
  schooland_founded_year = COALESCE(1979, schooland_founded_year),
  schooland_staff_count = COALESCE(16, schooland_staff_count),
  schooland_teacher_student_ratio = COALESCE('8', schooland_teacher_student_ratio),
  last_profile_scraped_at = now()
WHERE school_code = '150860';

-- 大埔禮賢會幼稚園(汀角路) matched by website_host
UPDATE schools SET
  schooland_url = 'https://www.schooland.hk/kg/rhenish-tpc',
  schooland_source_url = 'https://www.schooland.hk/kg/rhenish-tpc',
  schooland_source_updated_at = now(),
  schooland_intro = COALESCE('綜合課程、小組教學、語常會優質學前英語教學活動、生命教育、自由遊戲。學校著重兩文三語，由專科老師進行英語及普通話活動，為幼兒的語言發展建立良好的基礎。 採用小組及遊戲方式教學，配合不同主題和生活經驗，讓幼兒透過遊戲及親身體驗，於群體和環境中互動學習，並培養良好的品德。', schooland_intro),
  schooland_teaching_summary = COALESCE('學校有教職員約 18 位，師生比例約 1 位教師對 9 名學生', schooland_teaching_summary),
  schooland_facilities_summary = COALESCE('學校有註冊課室 6 個，可容納約 261 個學生', schooland_facilities_summary),
  schooland_founded_year = COALESCE(1957, schooland_founded_year),
  schooland_staff_count = COALESCE(18, schooland_staff_count),
  schooland_teacher_student_ratio = COALESCE('9', schooland_teacher_student_ratio),
  last_profile_scraped_at = now()
WHERE school_code = '150860';

-- 佳寶幼稚園第三分校(天瑞邨) Guideposts Kindergarten 3 matched by website_host
UPDATE schools SET
  schooland_url = 'https://www.schooland.hk/kg/guideposts4',
  schooland_source_url = 'https://www.schooland.hk/kg/guideposts4',
  schooland_source_updated_at = now(),
  schooland_intro = COALESCE('按照兒童的年齡特點，以主題作綜合德、智、體、群、美、靈六育均衡的課程，發展兒童個人的潛能。並滲入全腦發展、科學探索、生活技能、解難能力、情緒處理等學習元素。採用主題設計分組活動，透過遊戲課程、角色扮演、實物觀察、體能訓練、戶外參觀等動、靜交替活動，並透過環境佈置及各項啟發性的教具、教材，誘發兒童多元化的學習興趣。', schooland_intro),
  schooland_teaching_summary = COALESCE('學校有教職員約 15 位，師生比例約 1 位教師對 10 名學生', schooland_teaching_summary),
  schooland_facilities_summary = COALESCE('學校有註冊課室 6 個，可容納約 254 個學生', schooland_facilities_summary),
  schooland_founded_year = COALESCE(1993, schooland_founded_year),
  schooland_staff_count = COALESCE(15, schooland_staff_count),
  schooland_teacher_student_ratio = COALESCE('10', schooland_teacher_student_ratio),
  last_profile_scraped_at = now()
WHERE school_code = '159190';

-- 遵道幼稚園 matched by website_host
UPDATE schools SET
  schooland_url = 'https://www.schooland.hk/kg/abiding',
  schooland_source_url = 'https://www.schooland.hk/kg/abiding',
  schooland_source_updated_at = now(),
  schooland_intro = COALESCE('以單元教學為中心，按兒童發展階段編排由淺入深的學習經驗，並因應兒童之興趣進行專題研習，以啟動自主學習的探究精神，發展兒童各方面的潛能。以綜合方式教學，鼓勵幼兒從「做」中學習，提供多樣化的遊戲活動，讓幼兒透過實際的參與，配合主題安排相關的校內及校外體驗活動，引導兒童發展與人溝通，表達意見，解決問題，分析判斷等終生受用的技能，延續學習興趣。', schooland_intro),
  schooland_teaching_summary = COALESCE('學校有教職員約 13 位，師生比例約 1 位教師對 9 名學生', schooland_teaching_summary),
  schooland_facilities_summary = COALESCE('學校有註冊課室 6 個，可容納約 202 個學生', schooland_facilities_summary),
  schooland_founded_year = COALESCE(2014, schooland_founded_year),
  schooland_staff_count = COALESCE(13, schooland_staff_count),
  schooland_teacher_student_ratio = COALESCE('9', schooland_teacher_student_ratio),
  last_profile_scraped_at = now()
WHERE school_code = '597384';

-- 基督教香港信義會祥華幼稚園(祥裕樓) matched by name_prefix
UPDATE schools SET
  schooland_url = 'https://www.schooland.hk/kg/elchk-cw1',
  schooland_source_url = 'https://www.schooland.hk/kg/elchk-cw1',
  schooland_source_updated_at = now(),
  schooland_intro = COALESCE('根據教育局課程指引，所有活動安排包括德、智、體、群、美、靈各方面均衡發展，引入瑞吉歐教學理念，容許兒童自行創意研習、解決問題，培養思考能力，建立喜歡藝術的文化。教師「聆聽」童聲，與兒童談論他們的想法，提出開放式問題來刺激他們的思考，誘發學生作多方面的嘗試，包括方案教學活動、體能、音樂、藝術、課程等活動。', schooland_intro),
  schooland_teaching_summary = COALESCE('學校有教職員約 7 位，師生比例約 1 位教師對 7 名學生', schooland_teaching_summary),
  schooland_facilities_summary = COALESCE('學校有註冊課室 4 個，可容納約 61 個學生', schooland_facilities_summary),
  schooland_founded_year = COALESCE(1984, schooland_founded_year),
  schooland_staff_count = COALESCE(7, schooland_staff_count),
  schooland_teacher_student_ratio = COALESCE('7', schooland_teacher_student_ratio),
  last_profile_scraped_at = now()
WHERE school_code = '564575';

-- 基督教香港信義會祥華幼稚園(祥豐樓) matched by name_prefix
UPDATE schools SET
  schooland_url = 'https://www.schooland.hk/kg/elchk-cw2',
  schooland_source_url = 'https://www.schooland.hk/kg/elchk-cw2',
  schooland_source_updated_at = now(),
  schooland_intro = COALESCE('根據教育局課程指引，所有活動安排包括德、智、體、群、美、靈各方面均衡發展，引入瑞吉歐教學理念，容許兒童自行創意研習、解決問題，培養思考能力，建立喜歡藝術的文化。教師「聆聽」童聲，與兒童談論他們的想法，提出開放式問題來刺激他們的思考，誘發學生作多方面的嘗試，包括方案教學活動、體能、音樂、藝術、課程等活動。', schooland_intro),
  schooland_teaching_summary = COALESCE('學校有教職員約 9 位，師生比例約 1 位教師對 9 名學生', schooland_teaching_summary),
  schooland_facilities_summary = COALESCE('學校有註冊課室 6 個，可容納約 123 個學生', schooland_facilities_summary),
  schooland_founded_year = COALESCE(1984, schooland_founded_year),
  schooland_staff_count = COALESCE(9, schooland_staff_count),
  schooland_teacher_student_ratio = COALESCE('9', schooland_teacher_student_ratio),
  last_profile_scraped_at = now()
WHERE school_code = '564575';

