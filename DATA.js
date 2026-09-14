/* ==========================================================================
   [MY LIFE] 정적 데이터 및 상수 설정 (data.js)
   - 직업 목록, 부동산 규격, 주식 테마, 계절 등의 기초 데이터
   ========================================================================== */

const SAVE_KEY = "myLifePrototype_v47";
const START_YEAR = 2026;
const FIXED_BIRTH_YEAR = START_YEAR - 20;

const REGIONS = ["서울", "경기도", "충청도", "강원도", "전라도", "경상도", "제주도"];

const MALE_NAMES = [
  "이순신", "라재민", "정수영", "유영재", "우재헌", "편현준", "이현준",
  "유재홍", "이재진", "이복록", "서순용", "신동민", "김완호",
  "박종민", "이승현", "전선중", "최대원", "송평우",
  "박태주", "김상현", "이기호", "황지웅",
  "유호진", "임종열", "연규동", "문정훈", "진홍식",
  "임기문", "임희윤", "이구용", "오성훈",
  "신동환", "안수용", "이광진", "선효원",
  "김홍택", "박태선", "김진석", "강서원", "김영광"
];

const FEMALE_NAMES = [
  "김지은", "송민지", "박예나", "서지은", "박서경", "장지수", "박주희", "신민선", "임은빈"
];

const THEME_SECTORS = [
  { id: "IT", name: "💻 정보기술", desc: "애플, 삼성전자, SK하이닉스, 엔비디아" },
  { id: "COMM", name: "📡 커뮤니케이션", desc: "구글, 메타, 넷플릭스, 네이버" },
  { id: "CDIS", name: "🛍️ 소비재/모빌리티", desc: "아마존, 테슬라, 현대자동차, LVMH" },
  { id: "CSTP", name: "🛒 필수생활소비", desc: "P&G, 코카콜라, 월마트, CJ제일제당" },
  { id: "HLTH", name: "🏥 제약/바이오헬스", desc: "일라이릴리, 유나이티드헬스그룹, 존슨앤드존슨, 삼성바이오로직스" },
  { id: "FIN", name: "💰 금융/증권/은행", desc: "버크셔 해서웨이, JP모건, 비자, KB금융지주" },
  { id: "IND", name: "🏭 방산/제조/산업재", desc: "보잉, 캐터필러, 록히드마틴, HD현대중공업" },
  { id: "UTIL", name: "⚡ 전력/인프라/유틸리티", desc: "넥스트에라 에너지, 듀크 에너지, 한국전력공사, 한국가스공사" },
  { id: "MATR", name: "🧪 첨단화학/핵심소재", desc: "린데, 듀폰, LG화학, 포스코홀딩스" },
  { id: "ENGY", name: "🛢️ 에너지/정유/원유", desc: "엑슨모빌, 셰브론, 옥시덴탈, SK이노베이션" },
  { id: "REST", name: "🏢 부동산/리츠", desc: "프로로지스, 아메리칸 타워, 리얼티 인컴, 맥쿼리인프라" }
];

const THEME_EVENTS = [
  // --- IT ---
  { up: "IT", down: "COMM", title: "애플 차세대 비전 프로 초도 물량 완판", desc: "공간 컴퓨팅 기기 돌풍으로 IT 섹터가 급등한 반면, 기존 모바일 기반 SNS 커뮤니케이션 플랫폼들은 체류 시간 감소 우려로 타격을 받았습니다." },
  { up: "IT", down: "CDIS", title: "삼성전자 6세대 HBM 독점 공급 체결", desc: "반도체 슈퍼 사이클 기대감에 자금이 몰리며, 할부 금리 부담이 커진 자동차 등 내구 소비재 섹터는 매도세를 맞았습니다." },
  { up: "IT", down: "CSTP", title: "엔비디아 차세대 AI 슈퍼칩 글로벌 품귀", desc: "AI 인프라 확충에 천문학적 자본이 집중되며, 방어주 성격의 필수소비재 기업들로부터 대규모 자금 이탈이 발생했습니다." },
  { up: "IT", down: "HLTH", title: "SK하이닉스 차세대 AI 메모리 수율 100% 달성", desc: "글로벌 빅테크의 러브콜이 쏟아지며, 임상 지연 리스크가 부각된 제약/바이오 섹터의 투자금을 완벽히 흡수했습니다." },

  // --- COMM ---
  { up: "COMM", down: "CDIS", title: "구글 생성형 AI 검색 완전 상용화", desc: "광고 수익 모델의 혁신적 진화로 주가가 급등했으며, 인플레이션 여파로 임의소비재는 판매 부진을 겪고 있습니다." },
  { up: "COMM", down: "CSTP", title: "메타 가상 오피스 글로벌 점유율 1위", desc: "가상현실 플랫폼 생태계 확장에 성공하며, 실적 정체에 빠진 전통 필수소비재 식음료 기업들을 압도했습니다." },
  { up: "COMM", down: "HLTH", title: "넷플릭스 글로벌 구독자 5억 명 돌파", desc: "압도적인 IP 수익화로 미디어 엔터주가 랠리한 반면, 글로벌 신약 규제 강화로 헬스케어 투자는 얼어붙었습니다." },
  { up: "COMM", down: "FIN", title: "네이버 하이퍼클로바 B2B 솔루션 아시아 석권", desc: "AI 결합 플랫폼 비즈니스가 폭발적으로 성장하며, 핀테크에 밀려 예대마진이 감소한 전통 금융주를 압박했습니다." },

  // --- CDIS ---
  { up: "CDIS", down: "CSTP", title: "아마존 무인 드론 배송망 전미 확대", desc: "압도적인 유통 물류 혁신으로 시장을 장악하며, 오프라인 기반 전통 대형 마트들의 실적이 급감했습니다." },
  { up: "CDIS", down: "HLTH", title: "테슬라 완전 자율주행(FSD) 로보택시 전격 승인", desc: "모빌리티 혁명 기대감에 매수세가 폭발한 반면, 천문학적 R&D 비용 부담을 맞은 헬스케어 섹터는 부진했습니다." },
  { up: "CDIS", down: "FIN", title: "현대자동차 차세대 수소 전기차 초격차 기술 발표", desc: "글로벌 점유율 확대와 이익률 최고치 달성으로, 부실 대출 연체율이 증가한 금융 섹터와 극명한 대조를 이뤘습니다." },
  { up: "CDIS", down: "IND", title: "LVMH 초고가 한정판 아시아 전역 완판", desc: "초고액 자산가들의 보복 소비로 명품 실적이 치솟은 반면, 원자재가 폭등으로 방산/제조업은 수익성 악화에 빠졌습니다." },

  // --- CSTP ---
  { up: "CSTP", down: "HLTH", title: "P&G 생필품 글로벌 마진율 역대 최고치 경신", desc: "경기 침체기 방어주로서의 독보적 위상을 증명한 반면, 신약 임상 실패가 겹친 헬스케어는 폭락했습니다." },
  { up: "CSTP", down: "FIN", title: "코카콜라 헬스&웰니스 신제품 전 세계 열풍", desc: "강력한 브랜드 파워와 현금 창출력으로, 기준금리 인하기를 맞아 순이자마진이 축소된 은행주를 가볍게 압도했습니다." },
  { up: "CSTP", down: "IND", title: "월마트 초저가 PB 상품 매출 300% 폭증", desc: "가성비 중심의 실속형 소비 트렌드가 유통망을 휩쓴 반면, 대규모 설비 투자가 필요한 중공업은 자금 조달에 실패했습니다." },
  { up: "CSTP", down: "UTIL", title: "CJ제일제당 K-푸드 글로벌 매출 10조 돌파", desc: "가공식품의 글로벌 대성공으로 급등한 반면, 원가 상승분을 요금에 반영하지 못한 공공 유틸리티는 적자 전환했습니다." },

  // --- HLTH ---
  { up: "HLTH", down: "FIN", title: "일라이릴리 기적의 비만 신약 FDA 최종 승인", desc: "글로벌 블록버스터 신약 출시에 전 세계 투자금이 몰려, 부동산 PF 부실 사태가 터진 금융업을 소외시켰습니다." },
  { up: "HLTH", down: "IND", title: "유나이티드헬스그룹 AI 원격 의료 네트워크 완성", desc: "헬스케어 효율화로 사상 최대 흑자를 기록하며, 항공/보잉 등 전통 제조업의 실적 부진과 극명히 대비되었습니다." },
  { up: "HLTH", down: "UTIL", title: "존슨앤드존슨 메가 파마 초대형 인수합병 발표", desc: "막강한 자금력으로 바이오 시장 파이를 키운 반면, 요금 인상에 실패한 전력 및 가스 공기업들은 일제히 하락했습니다." },
  { up: "HLTH", down: "MATR", title: "삼성바이오로직스 제6공장 풀가동 및 CMO 싹쓸이", desc: "수출 대박으로 랠리를 주도한 반면, 화학/철강 등 전통 첨단소재 산업은 글로벌 판가 하락으로 타격받았습니다." },

  // --- FIN ---
  { up: "FIN", down: "IND", title: "버크셔 해서웨이 대규모 금융주 매수", desc: "투자의 귀재가 선택한 가치주로 유동성이 집중되며, 수주 가뭄에 시달리는 산업재 섹터는 하락장으로 접어들었습니다." },
  { up: "FIN", down: "UTIL", title: "JP모건 글로벌 IB 부문 사상 최대 투자 수익", desc: "글로벌 금리 안정화 속 압도적인 자본력으로 시장을 선도하며, 과도한 부채율을 겪는 유틸리티를 억눌렀습니다." },
  { up: "FIN", down: "MATR", title: "비자 크로스보더 해외 결제 수수료 대폭 인상", desc: "막강한 결제망 독점으로 영업이익률이 치솟은 반면, 원료 조달 비용이 폭등한 첨단소재 기업들은 대규모 적자를 냈습니다." },
  { up: "FIN", down: "ENGY", title: "KB금융지주 파격적 주주환원율 50% 발표", desc: "고배당 매력에 글로벌 패시브 자금이 쏟아지며, 국제 유가 하락으로 정제마진이 급감한 정유주에서 자금이 이탈했습니다." },

  // --- IND ---
  { up: "IND", down: "UTIL", title: "보잉 차세대 친환경 항공기 2,000대 수주 잭팟", desc: "글로벌 운송/물류 정상화로 방산/항공이 급등한 반면, 설비 노후화 보수에 막대한 비용이 드는 유틸리티는 급락했습니다." },
  { up: "IND", down: "MATR", title: "캐터필러 대규모 글로벌 재건 인프라 사업 독점", desc: "중장비 수출이 폭발적으로 늘어나며, 리튬/니켈 등 핵심 광물가 하락으로 신음하는 소재주를 거뜬히 앞질렀습니다." },
  { up: "IND", down: "ENGY", title: "록히드마틴 6세대 전투기 국방부 독점 계약", desc: "신냉전 시대 자주국방 테마로 폭등했으며, 산유국 증산 합의로 마진이 붕괴된 에너지 섹터와 대조되었습니다." },
  { up: "IND", down: "REST", title: "HD현대중공업 친환경 스마트 선박 건조 싹쓸이", desc: "조선업 슈퍼 사이클 진입으로 흑자 폭발을 이뤘으나, 대출 금리 상승 여파로 상업용 부동산/리츠 시장은 공실률이 급증했습니다." },

  // --- UTIL ---
  { up: "UTIL", down: "MATR", title: "넥스트에라 에너지 태양광 발전 단가 최저치 달성", desc: "신재생 에너지 인프라 수익성이 극대화되며, 환경 규제 철퇴를 맞은 전통 화학 소재 기업들을 완벽히 압도했습니다." },
  { up: "UTIL", down: "ENGY", title: "듀크 에너지 전력망 현대화 조 단위 지원금 수령", desc: "안정적 관급 공사와 배당 매력이 부각된 반면, 대체 에너지 부상으로 화석 연료 중심의 정유주들은 폭락했습니다." },
  { up: "UTIL", down: "REST", title: "한국전력공사 전기요금 전면 현실화 및 흑자 전환", desc: "적자를 해소하고 정상화에 돌입하며, 자금 조달에 실패해 배당을 컷한 상업용 부동산 섹터의 잉여 자금을 흡수했습니다." },
  { up: "UTIL", down: "IT", title: "한국가스공사 동해 심해 가스전 상업 생산 가시화", desc: "자원 독립 기대감에 인프라 관련주가 상한가를 친 반면, 고평가 버블론이 불거진 IT/반도체 섹터는 차익 매물이 쏟아졌습니다." },

  // --- MATR ---
  { up: "MATR", down: "ENGY", title: "린데 차세대 수소 액화 플랜트 전 세계 독점 계약", desc: "미래 첨단소재 가스 공급권을 쥐며 폭등한 반면, 친환경 전환에 뒤처진 전통 에너지 원유 기업들은 하락세를 탔습니다." },
  { up: "MATR", down: "REST", title: "듀폰 차세대 초전도체 융합 소재 상용화 성공", desc: "산업 생태계를 바꿀 핵심 소재 개발로 자본이 집중되며, 유지보수 비용이 급증한 노후 상업용 리츠 시장은 붕괴 위기입니다." },
  { up: "MATR", down: "IT", title: "LG화학 2차전지 전고체 배터리 소재 양산 대성공", desc: "주행거리 1,000km를 달성한 핵심 소재에 자금이 몰린 반면, 스마트폰 교체 주기 장기화로 기존 IT 하드웨어는 급락했습니다." },
  { up: "MATR", down: "COMM", title: "포스코홀딩스 아르헨티나 리튬 염호 생산량 10배 폭증", desc: "하얀 석유 불리는 리튬 잭팟으로 기업 가치가 재평가되며, 메타버스 투자 실패로 적자가 눈덩이인 플랫폼을 소외시켰습니다." },

  // --- ENGY ---
  { up: "ENGY", down: "REST", title: "엑슨모빌 남미 심해 광구 초대형 유전 발견", desc: "사상 최대 특별 배당을 발표하며, 고금리 직격탄을 맞아 자금난에 빠진 상업용 부동산 투자금을 모두 빨아들였습니다." },
  { up: "ENGY", down: "IT", title: "셰브론 글로벌 LNG 장기 공급망 싹쓸이 계약", desc: "천연가스 수요 폭발로 에너지 공룡들의 이익이 치솟은 반면, 전력비 급등으로 데이터센터 운영난에 빠진 IT 기업들은 적자 전환했습니다." },
  { up: "ENGY", down: "COMM", title: "옥시덴탈 셰일가스 채산성 극대화 및 대량 매집", desc: "현금 창출력의 끝판왕으로 랠리를 주도했고, 반독점 플랫폼 규제 악재를 맞은 커뮤니케이션 주식들은 바닥을 쳤습니다." },
  { up: "ENGY", down: "CDIS", title: "SK이노베이션 정제마진 슈퍼 사이클 겹호황", desc: "유가 급등으로 본업에서 조 단위 흑자를 기록하며, 연료비 폭탄을 맞아 운송 마진이 붕괴된 모빌리티/소비재를 압도했습니다." },

  // --- REST ---
  { up: "REST", down: "IT", title: "프로로지스 글로벌 AI 전용 물류센터 임대료 최고치", desc: "첨단 풀필먼트 부동산 가치가 폭등하며 배당이 늘어난 반면, 하드웨어 재고 과잉을 겪는 전통 IT 부품주는 매도 폭탄을 맞았습니다." },
  { up: "REST", down: "COMM", title: "아메리칸 타워 6G 통신망 철탑 독점 임대 계약", desc: "통신사들의 기지국 임대 수요 폭발로 리츠 수익성이 극대화되며, 망 사용료 인상 압박을 받는 미디어/플랫폼은 폭락했습니다." },
  { up: "REST", down: "CDIS", title: "리얼티 인컴 월배당 귀족주 부각 및 상권 싹쓸이", desc: "경기 방어 능력을 증명하며 대규모 자금이 쏟아진 반면, 소비 심리 위축으로 자동차 및 명품 소비재들은 급락세입니다." },
  { up: "REST", down: "CSTP", title: "맥쿼리인프라 주요 유료도로 통행료 인상 최종 승인", desc: "압도적인 현금 배당률로 기관 자금을 블랙홀처럼 흡수하며, 원가 상승을 판가에 전가하지 못한 필수식음료 섹터를 억눌렀습니다." }
];

const jobs = {
  large_corp: { id:"large_corp", name:"삼성전자 회사원", type:"private", desc:"탄탄한 복지와 높은 기본급, 파격적인 성과급이 주어집니다.", canNegotiate:false },
  sme_corp: { id:"sme_corp", name:"블루어드 회사원", type:"private", desc:"SAP/MS 클라우드 엔터프라이즈 SW 전문 IT 기업입니다.", canNegotiate:true },
  developer: { id:"developer", name:"구글AI개발자", type:"private", desc:"최첨단 인공지능 기술을 연구하며 압도적인 성과급을 누립니다.", canNegotiate:true },
  civil: { id:"civil", name:"시청 공무원", type:"government", desc:"호봉표에 따라 정직하고 안정적인 보수가 지급됩니다.", canNegotiate:false, isGov:true },
  teacher: { id:"teacher", name:"중학교 교사", type:"public", desc:"호봉과 근속연수에 따른 복지와 정년이 보장됩니다.", canNegotiate:false, isGov:true },
  nurse: { id:"nurse", name:"소아과 간호사", type:"medical", desc:"전문 의료인으로서 연차와 협상에 따라 임금이 상승합니다.", canNegotiate:true },
  doctor: { id:"doctor", name:"치과의사", type:"medical", desc:"높은 소득과 사회적 대우를 받는 최상위 전문 의료 직군입니다.", canNegotiate:false },
  police: { id:"police", name:"경찰", type:"public", desc:"국민 안전을 지키며 계급과 호봉에 따라 승급합니다.", canNegotiate:false, isGov:true },
  firefighter: { id:"firefighter", name:"소방관", type:"public", desc:"재난 현장을 지키며 호봉에 따라 보수를 수령합니다.", canNegotiate:false, isGov:true },
  finance: { id:"finance", name:"미래에셋 펀드매니저", type:"private", desc:"성과급 규모가 크지만 막대한 실적 압박이 동반됩니다.", canNegotiate:false },
  researcher: { id:"researcher", name:"하이닉스 반도체 연구원", type:"research", desc:"첨단 HBM 반도체 연구와 두둑한 성과급을 받습니다.", canNegotiate:false },
  large_factory: { id:"large_factory", name:"현대자동차 생산직", type:"technical", desc:"강력한 호봉제와 높은 성과급으로 안정성이 매우 높습니다.", canNegotiate:false },
  professional: { id:"professional", name:"법무법인 세종 변호사", type:"professional", desc:"고도의 전문성과 파트너 승진에 따라 고수익을 창출합니다.", canNegotiate:false },
  factory_worker: { id:"factory_worker", name:"신발공장 근로자", type:"technical", desc:"제조 현장에서 땀 흘려 일하며 매년 동결 위험이 있습니다.", canNegotiate:true },
  celebrity: { id:"celebrity", name:"연예인", type:"entertainer", desc:"인지도에 따라 소득 편차가 극단적인 프리랜서 직업입니다.", canNegotiate:false },
  entrepreneur: { id:"entrepreneur", name:"BBQ치킨집 주인", type:"business", desc:"매장 확장과 프랜차이즈 성장에 따라 막대한 순익을 거둡니다.", canNegotiate:false },
  unemployed: { id:"unemployed", name:"무직(구직중)", type:"none", desc:"현재 소득이 없으며 구직 및 재취업이 시급합니다.", canNegotiate:false }
};

const PROMOTABLE_JOB_KEYS = [
  "large_corp", "sme_corp", "developer", "civil", "teacher", 
  "nurse", "doctor", "police", "firefighter", "finance", 
  "researcher", "large_factory", "factory_worker"
];

const careerTracks = {
  large_corp: { stages: ["사원", "대리", "과장", "차장", "부장", "임원"], pay: [52000000, 65000000, 80000000, 95000000, 115000000, 160000000] },
  sme_corp: { stages: ["사원", "대리", "과장", "차장", "부장"], pay: [33000000, 40000000, 48000000, 56000000, 68000000] },
  developer: { stages: ["주니어", "미들", "시니어", "테크리드", "수석 아키텍트"], pay: [45000000, 60000000, 85000000, 110000000, 150000000] },
  civil: { stages: ["9급 주무관", "8급 주무관", "7급 주무관", "6급 팀장", "5급 사무관"], pay: [31000000, 37000000, 43000000, 51000000, 62000000] },
  teacher: { stages: ["신규교사", "1급정교사", "부장교사", "교감", "교장"], pay: [34000000, 42000000, 53000000, 61000000, 72000000] },
  nurse: { stages: ["일반간호사", "책임간호사", "수간호사", "간호과장"], pay: [30000000, 39000000, 46000000, 52000000] },
  doctor: { stages: ["인턴/레지던트", "전임의(펠로우)", "과장급 전문의", "원장"], pay: [80000000, 150000000, 300000000, 500000000] },
  police: { stages: ["순경", "경장", "경사", "경위", "경감", "경정"], pay: [33000000, 42000000, 49000000, 55000000, 63000000, 70000000] },
  firefighter: { stages: ["소방사", "소방교", "소방장", "소방위", "소방경"], pay: [32000000, 41000000, 50000000, 60000000, 72000000] },
  finance: { stages: ["주임", "대리", "과장", "차장", "부장", "지점장/이사"], pay: [65000000, 90000000, 105000000, 130000000, 160000000, 220000000] },
  researcher: { stages: ["선임연구원", "책임연구원", "수석연구원", "연구위원"], pay: [58000000, 78000000, 105000000, 140000000] },
  large_factory: { stages: ["사원", "조장", "반장", "직장", "기정"], pay: [58000000, 72000000, 84000000, 96000000, 110000000] },
  professional: { stages: ["어쏘", "시니어", "주니어파트너", "대표 파트너"], pay: [80000000, 150000000, 220000000, 400000000] },
  factory_worker: { stages: ["신입사원", "숙련공", "선임공", "생산반장"], pay: [28000000, 35000000, 42000000, 50000000] },
  celebrity: { stages: ["신인/무명", "라이징 스타", "인지도 주연급", "탑스타"], pay: [20000000, 100000000, 500000000, 2000000000] },
  entrepreneur: { stages: ["1호점 초기창업", "1,2,3호점 주인", "동네 프랜차이즈 대표", "대형 프랜차이즈 대표"], pay: [45000000, 120000000, 250000000, 600000000] },
  unemployed: { stages: ["구직자"], pay: [0] }
};

const carLevels = [
  { level: 0, name:"대중교통 이용", value:0 },
  { level: 1, name:"중고 경차", value:5000000 },
  { level: 2, name:"준중형 세단", value:22000000 },
  { level: 3, name:"중형 세단/SUV", value:35000000 },
  { level: 4, name:"고급 세단", value:55000000 },
  { level: 5, name:"프리미엄 SUV", value:80000000 },
  { level: 6, name:"럭셔리 플래그십", value:130000000 }
];

const SEASONS = ["봄", "여름", "가을", "겨울"];

function getRegionalHousingLevels(region) {
  const base = [
    { level: 0, type: "monthly", name: "고시원", deposit: 5000000, rent: 200000, houseValue: 0 },
    { level: 1, type: "monthly", name: "원룸 월세", deposit: 10000000, rent: 300000, houseValue: 0 },
    { level: 2, type: "monthly", name: "오피스텔 월세", deposit: 30000000, rent: 500000, houseValue: 0 },
    { level: 3, type: "monthly", name: "소형 아파트 월세", deposit: 100000000, rent: 700000, houseValue: 0 }
  ];

  if (region === "서울") {
    return [
      ...base,
      { level: 4, type: "jeonse", name: "84㎡ 아파트 전세", deposit: 300000000, rent: 0, houseValue: 0 },
      { level: 5, type: "owned", name: "84㎡ 아파트 자가", deposit: 0, rent: 0, houseValue: 1000000000, loanRate: 0.40 },
      { level: 6, type: "owned", name: "대형 아파트 자가", deposit: 0, rent: 0, houseValue: 2000000000, loanRate: 0 },
      { level: 7, type: "owned", name: "고급 아파트 자가", deposit: 0, rent: 0, houseValue: 3000000000, loanRate: 0 }
    ];
  } else if (region === "경기도") {
    return [
      ...base,
      { level: 4, type: "jeonse", name: "84㎡ 아파트 전세", deposit: 250000000, rent: 0, houseValue: 0 },
      { level: 5, type: "owned", name: "84㎡ 아파트 자가", deposit: 0, rent: 0, houseValue: 700000000, loanRate: 0.60 },
      { level: 6, type: "owned", name: "대형 아파트 자가", deposit: 0, rent: 0, houseValue: 1000000000, loanRate: 0 },
      { level: 7, type: "owned", name: "고급 아파트 자가", deposit: 0, rent: 0, houseValue: 1500000000, loanRate: 0 }
    ];
  } else if (["경상도", "전라도", "충청도"].includes(region)) {
    return [
      ...base,
      { level: 4, type: "jeonse", name: "84㎡ 아파트 전세", deposit: 200000000, rent: 0, houseValue: 0 },
      { level: 5, type: "owned", name: "84㎡ 아파트 자가", deposit: 0, rent: 0, houseValue: 500000000, loanRate: 0.70 },
      { level: 6, type: "owned", name: "대형 아파트 자가", deposit: 0, rent: 0, houseValue: 700000000, loanRate: 0 },
      { level: 7, type: "owned", name: "고급 아파트 자가", deposit: 0, rent: 0, houseValue: 1000000000, loanRate: 0 }
    ];
  } else {
    return [
      ...base,
      { level: 4, type: "jeonse", name: "84㎡ 아파트 전세", deposit: 150000000, rent: 0, houseValue: 0 },
      { level: 5, type: "owned", name: "84㎡ 아파트 자가", deposit: 0, rent: 0, houseValue: 300000000, loanRate: 0.80 },
      { level: 6, type: "owned", name: "대형 아파트 자가", deposit: 0, rent: 0, houseValue: 500000000, loanRate: 0 }
    ];
  }
}
