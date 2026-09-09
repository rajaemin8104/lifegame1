const SAVE_KEY = "myLifePrototype_v34";
const START_YEAR = 2026;
const FIXED_BIRTH_YEAR = START_YEAR - 20;

// 시작 시 추천 이름 풀 (50명)
const DEFAULT_NAMES = [
  "이순신", "라재민", "정수영", "유영재", "우재헌", "편현준", "이현준",
  "유재홍", "이재진", "이복록", "서순용", "신동민", "김완호",
  "박종민", "이승현", "전선중", "최대원", "임은빈", "송평우",
  "박주희", "신민선", "박태주", "김상현", "이기호", "황지웅",
  "유호진", "임종열", "연규동", "문정훈", "진홍식", "장지수",
  "박서경", "임기문", "서지은", "임희윤", "이구용", "오성훈",
  "박예나", "신동환", "안수용", "이광진", "선효원", "장지웅",
  "송민지", "김홍택", "박태선", "김진석", "강서원", "김지은", "김영광"
];

// GICS 11대 섹터 정의[cite: 1]
const GICS_SECTORS = [
  { id: "IT", name: "💻 정보기술", desc: "애플, 마이크로소프트, 엔비디아 등" },
  { id: "COMM", name: "📡 커뮤니케이션 서비스", desc: "구글, 메타, 넷플릭스 등" },
  { id: "CDIS", name: "🛍️ 임의소비재", desc: "아마존, 테슬라, 자동차, 의류 등" },
  { id: "CSTP", name: "🛒 필수소비재", desc: "P&G, 코카콜라, 식료품 등" },
  { id: "HLTH", name: "🏥 헬스케어", desc: "일라이릴리, 유나이티드헬스, 제약 등" },
  { id: "FIN", name: "💰 금융", desc: "버크셔 해서웨이, JP모건, 은행 등" },
  { id: "IND", name: "🏭 산업재", desc: "보잉, 캐터필러, 방산, 건설기계 등" },
  { id: "UTIL", name: "⚡ 유틸리티", desc: "넥스트에라 에너지, 전력, 수도 등" },
  { id: "MATR", name: "🧪 소재", desc: "린데, 화학, 금속, 포장 등" },
  { id: "ENGY", name: "🛢️ 에너지", desc: "엑슨모빌, 셰브론, 석유 및 정유 등" },
  { id: "REST", name: "🏢 부동산", desc: "아메리칸 타워, 상업용 리츠 등" }
];

// 17개 직업군[cite: 1]
const jobs = {
  large_corp: { id:"large_corp", name:"삼성전자 회사원", type:"private", desc:"탄탄한 복지와 높은 기본급, 파격적인 성과급이 주어집니다.", canNegotiate:false },
  sme_corp: { id:"sme_corp", name:"블루어드 회사원", type:"private", desc:"조직 내 영향력이 크며 매년 적극적인 연소득협상이 가능합니다.", canNegotiate:true },
  developer: { id:"developer", name:"구글AI개발자", type:"private", desc:"최첨단 인공지능 기술을 연구하며 압도적인 성과급과 이직 프리미엄을 누립니다.", canNegotiate:true },
  civil: { id:"civil", name:"서울시청 공무원", type:"government", desc:"호봉표에 따라 정직하고 안정적인 보수가 지급됩니다.", canNegotiate:false, isGov:true },
  teacher: { id:"teacher", name:"중학교 교사", type:"public", desc:"호봉과 근속연수에 따른 복지와 정년이 보장됩니다.", canNegotiate:false, isGov:true },
  nurse: { id:"nurse", name:"소아과 간호사", type:"medical", desc:"전문 의료인으로서 연차와 협상에 따라 임금이 상승합니다.", canNegotiate:true },
  doctor: { id:"doctor", name:"치과의사", type:"medical", desc:"높은 소득과 사회적 대우를 받는 최상위 전문 의료 직군입니다.", canNegotiate:false },
  police: { id:"police", name:"경찰", type:"public", desc:"국민 안전을 지키며 계급과 호봉에 따라 승급합니다.", canNegotiate:false, isGov:true },
  firefighter: { id:"firefighter", name:"소방관", type:"public", desc:"재난 현장을 지키며 호봉에 따라 보수를 수령합니다.", canNegotiate:false, isGov:true },
  finance: { id:"finance", name:"미래에셋 펀드매니저", type:"private", desc:"성과급과 기본급 규모가 크지만 막대한 실적 압박이 동반됩니다.", canNegotiate:false },
  researcher: { id:"researcher", name:"하이닉스 반도체 연구원", type:"research", desc:"첨단 HBM/메모리 반도체 연구와 두둑한 PS 성과급을 받습니다.", canNegotiate:false },
  large_factory: { id:"large_factory", name:"현대자동차 생산직", type:"technical", desc:"강력한 호봉제와 높은 성과급, 잔업 특근 수당으로 안정성이 매우 높습니다.", canNegotiate:false },
  professional: { id:"professional", name:"전문직(변호사/회계사)", type:"professional", desc:"고도의 전문성과 파트너 승진에 따라 고수익을 창출합니다.", canNegotiate:false },
  factory_worker: { id:"factory_worker", name:"신발공장근로자", type:"technical", desc:"제조 현장에서 땀 흘리며 일하며 매년 동결 위험이 존재합니다.", canNegotiate:true },
  celebrity: { id:"celebrity", name:"연예인", type:"entertainer", desc:"인지도에 따라 소득 편차가 극단적인 프리랜서 직업입니다.", canNegotiate:false },
  entrepreneur: { id:"entrepreneur", name:"BBQ치킨집 주인", type:"business", desc:"매장 확장과 프랜차이즈 성장에 따라 막대한 순익을 거둡니다.", canNegotiate:false },
  unemployed: { id:"unemployed", name:"무직(구직중)", type:"none", desc:"현재 소득이 없으며 구직 및 재취업이 시급합니다.", canNegotiate:false }
};

// 승진 시스템 가능 직군
const PROMOTABLE_JOB_KEYS = [
  "large_corp", "sme_corp", "developer", "civil", "teacher", 
  "nurse", "doctor", "police", "firefighter", "finance", 
  "researcher", "large_factory", "factory_worker"
];

// 직급별 단계 및 기본급
const careerTracks = {
  large_corp: { stages: ["사원", "대리", "과장", "차장", "부장", "임원"], pay: [52000000, 65000000, 80000000, 95000000, 115000000, 160000000] },
  sme_corp: { stages: ["사원", "대리", "과장", "차장", "부장"], pay: [33000000, 40000000, 48000000, 56000000, 68000000] },
  developer: { stages: ["주니어", "미들", "시니어", "테크리드", "수석 아키텍트"], pay: [45000000, 60000000, 85000000, 110000000, 150000000] },
  civil: { stages: ["9급 주무관", "8급 주무관", "7급 주무관", "6급 팀장", "5급 사무관"], pay: [32000000, 38000000, 46000000, 56000000, 70000000] },
  teacher: { stages: ["신규교사", "1급정교사", "부장교사", "교감", "교장"], pay: [36000000, 47000000, 62000000, 75000000, 88000000] },
  nurse: { stages: ["일반간호사", "책임간호사", "수간호사", "간호과장"], pay: [38000000, 48000000, 62000000, 78000000] },
  doctor: { stages: ["인턴/레지던트", "전임의(펠로우)", "과장급 전문의", "원장"], pay: [65000000, 120000000, 190000000, 300000000] },
  police: { stages: ["순경", "경장", "경사", "경위", "경감", "경정"], pay: [35000000, 42000000, 50000000, 60000000, 72000000, 88000000] },
  firefighter: { stages: ["소방사", "소방교", "소방장", "소방위", "소방경"], pay: [35000000, 42000000, 50000000, 60000000, 72000000] },
  finance: { stages: ["주임", "대리", "과장", "차장", "부장", "지점장/이사"], pay: [55000000, 72000000, 95000000, 120000000, 160000000, 220000000] },
  researcher: { stages: ["선임연구원", "책임연구원", "수석연구원", "연구위원"], pay: [58000000, 78000000, 105000000, 140000000] },
  large_factory: { stages: ["사원", "조장", "반장", "직장", "기정"], pay: [48000000, 62000000, 76000000, 92000000, 110000000] },
  professional: { stages: ["어쏘", "시니어", "주니어파트너", "대표 파트너"], pay: [70000000, 110000000, 170000000, 280000000] },
  factory_worker: { stages: ["신입사원", "숙련공", "선임공", "생산반장"], pay: [32000000, 38000000, 45000000, 54000000] },
  celebrity: { stages: ["신인/무명", "라이징 스타", "인지도 주연급", "탑스타"], pay: [20000000, 50000000, 150000000, 500000000] },
  entrepreneur: { stages: ["1호점 초기창업", "1,2,3호점 주인", "동네 프랜차이즈 대표", "대형 프랜차이즈 대표"], pay: [45000000, 120000000, 250000000, 600000000] },
  unemployed: { stages: ["구직자"], pay: [0] }
};

// GICS 33개 테마별 주가 연동 이벤트
const GICS_EVENTS = [
  { up:"IT", down:"COMM", title:"글로벌 AI 데이터센터 대규모 증설 발표", desc:"빅테크의 AI 칩 및 클라우드 하드웨어 수요가 폭발하며 정보기술(IT) 섹터가 급등합니다. 반면 투자비 부담 증가로 통신 및 플랫폼(커뮤니케이션) 수익성은 단기 악화됩니다." },
  { up:"IT", down:"REST", title:"스마트 팩토리 및 초고속 클라우드 전환 가속화", desc:"기업들의 IT 인프라 투자가 집중되며 IT 소프트웨어/반도체가 초강세를 보입니다. 반면 재택 근무 정착으로 전통 상업용 부동산(리츠) 공실률이 증가합니다." },
  { up:"IT", down:"IND", title:"차세대 온디바이스 AI 기기 대유행", desc:"스마트 디바이스 및 반도체 업종(IT)이 실적 서프라이즈를 기록합니다. 반면 공급망 이슈로 기존 부품을 수급하던 전통 기계 조립(산업재) 섹터는 타격을 입습니다." },
  { up:"COMM", down:"IND", title:"남북 평화회담 전격 개최 및 문화 교류 합의", desc:"문화 콘텐츠 개방과 통신 인프라 연결 기대감에 커뮤니케이션 서비스가 급등합니다. 반면 긴장 완화로 방산/무기 제조업(산업재) 주가는 급락합니다." },
  { up:"COMM", down:"CDIS", title:"글로벌 초대작 OTT 시리즈 전 세계 1위 흥행", desc:"미디어 콘텐츠 및 스트리밍 플랫폼(커뮤니케이션) 매출이 사상 최고치를 달성합니다. 반면 소비자들의 집콕 시간이 늘며 의류, 레저 등 경기소비재(임의소비재) 지출은 위축됩니다." },
  { up:"COMM", down:"REST", title:"메타버스 디지털 가상 오피스 상용화 성공", desc:"가상 플랫폼 및 디지털 광고(커뮤니케이션) 생태계가 번창합니다. 반면 실물 사무실 수요가 감소하며 오피스 리츠(부동산) 자산가치는 하락세를 면치 못합니다." },
  { up:"CDIS", down:"CSTP", title:"소비자 심리지수 10년 만에 최고치 경신", desc:"경기 회복 기대감으로 명품, 자동차, 고급 패션(임의소비재) 판매가 폭발합니다. 반면 안정성 위주의 생필품(필수소비재) 방어주 섹터는 투자자들의 매도로 약세를 보입니다." },
  { up:"CDIS", down:"UTIL", title:"전기차 파격 보조금 및 신차 사전예약 돌풍", desc:"글로벌 전기 완성차 및 관련 소비재 업종이 랠리를 펼칩니다. 반면 전력망 과부하 우려와 발전 원가 규제로 전력 공기업(유틸리티)의 부담이 커집니다." },
  { up:"CDIS", down:"FIN", title:"보복 소비 열풍 및 해외 명품 관광 대호황", desc:"소비자들의 카드 지출과 명품 구매(임의소비재)가 급증합니다. 반면 과도한 가계부채 증가로 금융권(금융)의 연체율 경고등이 켜지며 금융주가 하락합니다." },
  { up:"CSTP", down:"CDIS", title:"글로벌 경기 침체 공포 및 안전 소비 확산", desc:"불황이 닥치자 외식과 쇼핑을 줄이고 가공식품, 필수 식료품(필수소비재)을 찾는 수요가 몰립니다. 반면 자동차, 고가 의류 등 임의소비재 기업들은 직격탄을 맞습니다." },
  { up:"CSTP", down:"IT", title:"스태그플레이션 우려 속 배당 방어주 재조명", desc:"현금 흐름이 튼튼한 식음료, 생활용품(필수소비재) 기업으로 자금이 집중됩니다. 반면 밸류에이션 부담이 컸던 고성장 기술주(IT)는 큰 폭의 조정을 받습니다." },
  { up:"CSTP", down:"MATR", title:"생필품 가격 인상 수용 및 마진 개선", desc:"소비재 대기업들이 판매가를 인상하며 필수소비재 마진이 급증합니다. 반면 원자재를 비싸게 사서 싸게 납품해야 하는 화학/포장 소재(소재) 기업의 채산성은 악화됩니다." },
  { up:"HLTH", down:"ENGY", title:"신종 바이러스 대유행 및 치료제 FDA 긴급 승인", desc:"백신, 치료제, 바이오 의약품(헬스케어) 섹터가 폭등세를 기록합니다. 반면 전 세계 이동 봉쇄 조치로 인해 원유 소비가 급감하며 에너지 정유주가 폭락합니다." },
  { up:"HLTH", down:"FIN", title:"기적의 비만·항노화 혁신 신약 상용화", desc:"글로벌 제약바이오(헬스케어) 기업들의 시가총액이 급증합니다. 반면 보험사들의 실손/치료비 지급 청구가 사상 최대로 폭증하며 대형 보험(금융) 섹터가 약세를 보입니다." },
  { up:"HLTH", down:"MATR", title:"정부 바이오 헬스케어 특별 육성법 제정", desc:"의료기기 및 제약주(헬스케어)에 대규모 국가 펀드가 유입됩니다. 반면 전통 중화학 및 플라스틱(소재) 기업들에 대한 환경 규제가 강화되며 소재주가 하락합니다." },
  { up:"FIN", down:"REST", title:"중앙은행의 가파른 기준금리 인상 단행", desc:"예대마진(이자이익)이 급증하며 시중은행과 금융지주(금융) 주가가 날아오릅니다. 반면 대출 이자 부담이 커지며 부동산(리츠) 시장은 급격한 침체기에 진입합니다." },
  { up:"FIN", down:"IT", title:"글로벌 핀테크 규제 강화 및 전통 금융 규제 완화", desc:"제도권 대형 은행과 증권사(금융)의 독점적 시장 지위가 공고해집니다. 반면 핀테크를 추진하던 IT 플랫폼 및 빅테크(IT)는 성장세가 꺾이며 주가가 하락합니다." },
  { up:"FIN", down:"UTIL", title:"시장 채권 금리 급등 및 자금 시장 경색", desc:"단기 자금 시장을 장악한 대형 투자은행(금융)의 수수료 수익이 급증합니다. 반면 대규모 설비 차입금이 많은 전력/가스(유틸리티) 기업들은 이자 비용 폭탄을 맞습니다." },
  { up:"IND", down:"COMM", title:"국제 안보 위기 고조 및 각국 국방비 증액", desc:"방위산업체, 항공우주, 특수 방산 장비(산업재) 수주가 쏟아지며 주가가 급등합니다. 반면 소비 심리와 콘텐츠(커뮤니케이션) 시장은 위축됩니다." },
  { up:"IND", down:"REST", title:"국가 주도 초대형 인프라 재건 사업 확정", desc:"건설 기계, 철도, 엔지니어링(산업재) 섹터가 역사적 호황기를 맞이합니다. 반면 인프라 공사 장기화로 주변 구도심 상업용 빌딩(부동산) 임대료는 하락합니다." },
  { up:"IND", down:"CSTP", title:"글로벌 물류 및 해운 운임 지수 사상 최고치", desc:"조선소, 컨테이너 화물, 물류 장비(산업재) 업체들이 역대급 영업이익을 달성합니다. 반면 수입 물류비가 폭등한 필수 식료품/가공(필수소비재) 업체들은 마진이 급감합니다." },
  { up:"UTIL", down:"ENGY", title:"원자력 및 청정 공공전력 공급 체계 개편", desc:"안정적인 공공 전력망을 보유한 유틸리티 기업들의 기업가치가 재평가받습니다. 반면 화석연료 감축 기조 속에 정유/석유(에너지) 기업의 입지는 좁아집니다." },
  { up:"UTIL", down:"IT", title:"주식 시장 대폭락 속 대표 안전자산 부각", desc:"증시가 폭락하자 배당 수익률이 높고 국가가 보장하는 전력/가스(유틸리티)로 자금이 대피합니다. 반면 거품이 빠지며 고성장 IT/반도체 주식은 투매를 맞습니다." },
  { up:"UTIL", down:"CDIS", title:"정부의 전기·수도 공공요금 현실화 승인", desc:"오랜 적자에 시달리던 유틸리티 공기업들의 흑자 전환이 가시화됩니다. 반면 가계의 공공요금 지출 증가로 외식/의류/레저(임의소비재) 소비는 얼어붙습니다." },
  { up:"MATR", down:"CDIS", title:"핵심 광물 및 2차전지 양극재 수급난 심화", desc:"화학, 특수합금, 희토류 정제(소재) 기업들의 판가가 폭등하며 어닝 서프라이즈를 기록합니다. 반면 부품 단가가 치솟은 자동차 및 가전(임의소비재) 완제품 제조사는 실적이 급감합니다." },
  { up:"MATR", down:"REST", title:"글로벌 친환경 신소재 의무화 규제 시행", desc:"생분해 플라스틱과 친환경 패키징(소재) 기업들이 독점 공급 계약을 체결합니다. 반면 건축 자재 기준 강화로 건설 비용이 폭등하며 상업용 리츠(부동산) 개발이 올스톱됩니다." },
  { up:"MATR", down:"HLTH", title:"반도체·배터리용 초고순도 화학 물질 독점 개발", desc:"첨단 산업의 기초 소재를 장악한 화학/소재 섹터가 폭등합니다. 반면 R&D 자금이 소재 기술로 분산되며 제약바이오(헬스케어) 임상 투자금은 위축됩니다." },
  { up:"ENGY", down:"COMM", title:"산유국 협의체(OPEC+) 전격 감산 및 유가 폭등", desc:"국제 유가가 배럴당 120달러를 돌파하며 정유·시추(에너지) 기업들이 사상 최대 흑자를 냅니다. 반면 고유가로 글로벌 경기 둔화가 촉발되며 광고(커뮤니케이션) 시장이 직격탄을 맞습니다." },
  { up:"ENGY", down:"IND", title:"전 세계 LNG 가스관 공급 차단 사태", desc:"천연가스 및 석유(에너지) 메이저 기업들의 현금 창출력이 극대화됩니다. 반면 연료비 폭탄을 맞은 항공, 해운, 중공업(산업재) 기업들은 영업손실로 전환됩니다." },
  { up:"ENGY", down:"UTIL", title:"화석연료 화력 발전 긴급 재가동 승인", desc:"원유와 발전용 가스(에너지) 가격이 치솟으며 정유사가 웃습니다. 반면 원자재를 비싸게 사서 전기를 만들어야 하는 전력 발전(유틸리티) 업체들은 적자 폭이 급증합니다." },
  { up:"REST", down:"FIN", title:"초저금리 기조 진입 및 상업용 부동산 리츠 부활", desc:"낮은 조달 금리로 대규모 빌딩을 매입한 부동산(리츠)의 배당 매력과 주가가 급등합니다. 반면 순이자마진(NIM)이 축소된 시중 대형 은행(금융)의 주가는 하락세를 탑니다." },
  { up:"REST", down:"MATR", title:"도심 대규모 스마트시티 재개발 완공 호조", desc:"부동산 리츠 자산가치가 급상승하며 투자자들의 환호를 받습니다. 반면 원자재 납품 단가 인하 압박을 받은 철강/시멘트(소재) 기업들의 마진은 축소됩니다." },
  { up:"REST", down:"ENGY", title:"친환경 그린 리츠(Green REITs) 대세화", desc:"태양광 자립형 친환경 스마트 빌딩을 보유한 부동산 섹터에 글로벌 ESG 자금이 쏟아집니다. 반면 전통 탄소배출 화석연료(에너지) 기업들은 매도 대상이 됩니다." }
];

// 주택 등급 (고시원 ~ 고급 주택)
const housingLevels = [
  { level: 0, name:"고시원", city:"지방 중소도시", deposit:5000000, houseValue:0 },
  { level: 1, name:"원룸 월세", city:"지방 중소도시", deposit:10000000, houseValue:0 },
  { level: 2, name:"오피스텔 월세", city:"광역시", deposit:20000000, houseValue:0 },
  { level: 3, name:"소형 아파트 월세", city:"수도권", deposit:30000000, houseValue:0 },
  { level: 4, name:"84㎡ 아파트 전세", city:"수도권", deposit:200000000, houseValue:0 },
  { level: 5, name:"84㎡ 아파트 자가", city:"수도권", deposit:0, houseValue:450000000 },
  { level: 6, name:"대형 아파트 자가", city:"서울", deposit:0, houseValue:1200000000 },
  { level: 7, name:"고급 주택", city:"서울", deposit:0, houseValue:2500000000 }
];

// 자동차 등급 (대중교통 ~ 럭셔리)
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

let game = null, currentEvent = null, eventResolved = false;
let generatedProfileData = null;

const $ = id => document.getElementById(id);
const clamp = (v, a = 0, b = 100) => Math.max(a, Math.min(b, Math.round(v)));
const won = v => {
  const n = Math.round(v);
  if (Math.abs(n) >= 1e8) return `${(n / 1e8).toFixed(Math.abs(n) % 1e8 === 0 ? 0 : 1)}억원`;
  return `${Math.round(n / 10000).toLocaleString("ko-KR")}만원`;
};

// 50명 이름 중 무작위 1명 자동 세팅
function initBirthUI() {
  const nameInput = $("playerName");
  if (nameInput && (!nameInput.value || nameInput.value === "플레이어")) {
    nameInput.value = DEFAULT_NAMES[Math.floor(Math.random() * DEFAULT_NAMES.length)];
  }

  const yearInput = $("playerBirthYear");
  const monthSelect = $("playerBirthMonth");
  const daySelect = $("playerBirthDay");

  if (!monthSelect || !daySelect) return;

  if (yearInput) {
    yearInput.value = `${FIXED_BIRTH_YEAR}년`;
    yearInput.textContent = `${FIXED_BIRTH_YEAR}년`;
  }

  monthSelect.innerHTML = "";
  for (let m = 1; m <= 12; m++) {
    const opt = document.createElement("option");
    opt.value = String(m).padStart(2, '0');
    opt.textContent = `${m}월`;
    monthSelect.appendChild(opt);
  }

  function updateDays() {
    const selectedMonth = parseInt(monthSelect.value, 10) || 1;
    const lastDay = new Date(FIXED_BIRTH_YEAR, selectedMonth, 0).getDate();
    const currentDayVal = daySelect.value;

    daySelect.innerHTML = "";
    for (let d = 1; d <= lastDay; d++) {
      const opt = document.createElement("option");
      opt.value = String(d).padStart(2, '0');
      opt.textContent = `${d}일`;
      daySelect.appendChild(opt);
    }

    if (currentDayVal && parseInt(currentDayVal, 10) <= lastDay) {
      daySelect.value = currentDayVal;
    } else {
      daySelect.value = "01";
    }
  }

  monthSelect.onchange = () => { updateDays(); updateProfilePreview(); };
  daySelect.onchange = updateProfilePreview;
  updateDays();
  updateProfilePreview();
}

function getSelectedBirthDate() {
  const m = $("playerBirthMonth") ? $("playerBirthMonth").value : "01";
  const d = $("playerBirthDay") ? $("playerBirthDay").value : "01";
  return `${FIXED_BIRTH_YEAR}-${m}-${d}`;
}

function currentCareerTitle() {
  if (!game || !game.career) return "무직";
  if (jobs[game.jobKey] && jobs[game.jobKey].isGov) {
    return `${game.career.title} (${game.career.govStep || 1}호봉)`;
  }
  return game.career.title;
}

function getChickenBasePay() {
  if (!game || game.jobKey !== "entrepreneur") return 45000000;
  if (game.career.title === "대형 프랜차이즈 대표") return 600000000;
  if (game.career.title === "동네 프랜차이즈 대표") return 250000000;
  if (game.career.title === "1,2,3호점 주인") return 120000000;
  return 45000000;
}

function newCareer(jobKey) {
  if (jobKey === "unemployed") return { type: "unemployed", title: "구직자", step: 1, rankIndex: 0, govStep: 1, yearsInCurrentRank: 0, promoTargetYears: 5 };
  const track = careerTracks[jobKey];
  return { 
    type: jobKey, 
    step: 1, 
    rankIndex: 0, 
    govStep: 1, 
    yearsInCurrentRank: 0, 
    promoTargetYears: Math.floor(Math.random() * 3) + 4, // 4~6년 사이 승진 요건
    title: track ? track.stages[0] : "신입" 
  };
}

function generateFullProfile(baseProfile) {
  const educations = [
    { title: "고졸", addAge: 0 },
    { title: "전문대졸 (2년제)", addAge: 2 },
    { title: "대졸 (4년제)", addAge: 4 }
  ];
  const edu = educations[Math.floor(Math.random() * educations.length)];

  let military = { title: "해당 없음", addAge: 0, penaltyHealth: 0, isDischarged: false };
  if (baseProfile.gender === "남성") {
    const miliTypes = [
      { title: "육군 만기 전역", addAge: 2, penaltyHealth: 0, isDischarged: true },
      { title: "해군 만기 전역", addAge: 2, penaltyHealth: 0, isDischarged: true },
      { title: "공군 만기 전역", addAge: 2, penaltyHealth: 0, isDischarged: true },
      { title: "병역 면제", addAge: 0, penaltyHealth: 10, isDischarged: false }
    ];
    military = miliTypes[Math.floor(Math.random() * miliTypes.length)];
  }

  const startAge = 20 + edu.addAge + military.addAge;
  const initialHealth = 90 - military.penaltyHealth;

  return {
    ...baseProfile,
    education: edu.title,
    military: military.title,
    isDischarged: military.isDischarged,
    startAge,
    initialHealth
  };
}

function newGame(profile, jobKey) {
  const career = newCareer(jobKey);
  const j = jobs[jobKey];
  const initialIncome = careerTracks[jobKey] ? careerTracks[jobKey].pay[0] : 30000000;

  const startingAssetTiers = [10000000, 20000000, 30000000];
  const chosenTier = startingAssetTiers[Math.floor(Math.random() * startingAssetTiers.length)];

  let initHousing = { ...housingLevels[0] };
  let initCar = { ...carLevels[0] };
  let initHouseAsset = 5000000;
  let initCarAsset = 0;
  let initCash = 5000000;
  let firstYearLivingCost = 4000000;

  if (chosenTier === 10000000) {
    initHousing = { ...housingLevels[0] };
    initCar = { ...carLevels[0] };
    initHouseAsset = 5000000;
    initCarAsset = 0;
    initCash = 5000000;
    firstYearLivingCost = 4000000;
  } else if (chosenTier === 20000000) {
    initHousing = { ...housingLevels[1] };
    initCar = { ...carLevels[0] };
    initHouseAsset = 10000000;
    initCarAsset = 0;
    initCash = 10000000;
    firstYearLivingCost = 7000000;
  } else {
    initHousing = { ...housingLevels[1] };
    initCar = { ...carLevels[1] };
    initHouseAsset = 10000000;
    initCarAsset = 5000000;
    initCash = 15000000;
    firstYearLivingCost = 10000000;
  }

  return {
    name: profile.name,
    gender: profile.gender,
    age: profile.startAge,
    year: START_YEAR + (profile.startAge - 20),
    seasonIndex: 0,
    startYearRecorded: START_YEAR + (profile.startAge - 20),
    isFirstYearWinter: true,
    firstYearLivingCostFixed: firstYearLivingCost,
    jobKey,
    job: j.name,
    career,
    annualIncome: initialIncome,
    cumulativeIncome: initialIncome,
    education: profile.education,
    military: profile.military,
    isDischarged: profile.isDischarged,
    declaredSolo: false,
    chickenStoreCount: 1,
    hasOpenedStore2: false,
    hasOpenedStore3: false,
    cash: initCash,
    assets: { house: initHouseAsset, car: initCarAsset, stock: 0, etc: 0 },
    debt: 0,
    health: profile.initialHealth,
    happiness: 70,
    stress: 25,
    reputation: 70,
    married: false,
    divorced: false,
    marriageYear: 0,
    lastTravelYear: 0,
    carHoldingYears: 0, // 자동차 보유 기간 (10년 추적용)
    children: 0,
    housing: initHousing,
    car: initCar,
    currentStockSector: null,
    lastYearLivingCost: 0,
    history: [],
    lastEvent: `인생의 출발 (초기 자산: ${won(chosenTier)})`
  };
}

function totalAssets() { return game.cash + game.assets.house + game.assets.car + game.assets.stock + game.assets.etc; }
function netWorth() { return totalAssets() - game.debt; }

function checkChickenEnterpriseGrowth() {
  if (game.jobKey !== "entrepreneur") return;
  const nw = netWorth();
  if (nw >= 3000000000 && game.career.title !== "대형 프랜차이즈 대표") {
    game.career.title = "대형 프랜차이즈 대표";
    game.annualIncome = Math.max(game.annualIncome, 600000000);
    alert("축하합니다! 순자산 30억을 돌파하여 전국구 [대형 프랜차이즈 대표]로 도약했습니다! (연소득 6억원 이상 보장)");
  } else if (nw >= 1000000000 && game.career.title !== "동네 프랜차이즈 대표" && game.career.title !== "대형 프랜차이즈 대표") {
    game.career.title = "동네 프랜차이즈 대표";
    game.annualIncome = Math.max(game.annualIncome, 250000000);
    alert("축하합니다! 자본금 10억원을 확보하여 [동네 프랜차이즈 대표]로 발돋움했습니다! (연소득 2.5억원 이상 보장)");
  }
}

function recalculateHousingAndLifestyle() {
  if (game.seasonIndex === 0 && game.assets.car > 0) {
    const depRate = 0.05 + Math.random() * 0.05;
    game.assets.car = Math.round(game.assets.car * (1 - depRate));
    game.car.value = game.assets.car;
  }

  if (game.housing.owned && game.assets.house > 0) {
    game.assets.house = Math.round(game.assets.house * (1 + (-0.01 + Math.random() * 0.03)));
  }

  checkChickenEnterpriseGrowth();
}

function liquidateAssetsForCash() {
  let log = "";
  if (game.assets.stock > 0) {
    const stockVal = Math.round(game.assets.stock * 0.9);
    game.cash += stockVal;
    game.assets.stock = 0;
    game.currentStockSector = null;
    log += `[주식 처분] 보유 주식을 10% 급매 할인하여 ${won(stockVal)} 충당. `;
  }

  if (game.cash < 0 && game.assets.house > 0) {
    const houseVal = Math.round(game.assets.house * 0.9);
    game.cash += houseVal;
    game.assets.house = 5000000;
    game.cash -= 5000000;
    game.housing = { ...housingLevels[0], name: "고시원 (강등)" };
    log += `[주택 처분] 주거 자산을 10% 감가 정리하여 ${won(houseVal)} 충당 후 고시원으로 강등 이주. `;
  }
  return log;
}

function recordHistory() {
  const h = {
    age: game.age,
    year: game.year,
    season: SEASONS[game.seasonIndex],
    job: game.job,
    career: currentCareerTitle(),
    income: Math.round(game.annualIncome),
    livingCost: Math.round(game.lastYearLivingCost || 0),
    housing: game.housing.name,
    car: game.car.name,
    family: game.divorced ? "돌싱" : (game.married ? (game.children ? `배우자·자녀 ${game.children}명` : "기혼") : "미혼"),
    houseAsset: Math.round(game.assets.house),
    carAsset: Math.round(game.assets.car),
    stockAsset: Math.round(game.assets.stock),
    etcAsset: Math.round(game.assets.etc),
    cashAsset: Math.round(game.cash),
    totalAsset: Math.round(totalAssets()),
    netWorth: Math.round(netWorth()),
    event: game.lastEvent || ""
  };
  game.history.push(h);
}

// -------------------------------------------------------------
// 이벤트 생성 엔진
// -------------------------------------------------------------
function eventList() {
  const currentSeason = SEASONS[game.seasonIndex];
  const e = [];

  // ========================================================
  // [자동차 10년 장기 보유 노후화 이벤트]
  // ========================================================
  if (game.assets.car > 0 && game.carHoldingYears >= 10) {
    e.push({
      id: "car_old_event", type: "차량 노후화", title: `🚗 ${currentSeason} 자동차 노후화 경고`,
      desc: `현재 차량을 교체하지 않고 10년 동안 운행했습니다. 잦은 고장과 소음으로 스트레스가 쌓입니다. 자동차를 바꿀 때가 되었습니다!`,
      ok: () => true,
      choices: [
        {
          text: "차량 상태 점검 및 수용 (스트레스 +10)",
          result: "노후 차량을 수리하며 스트레스가 10 상승했습니다. 차량 UP/DOWN 메뉴를 통한 교체를 권장합니다.",
          apply: () => {
            game.stress = clamp(game.stress + 10);
            game.carHoldingYears = 8; // 반복 과부하 완화
          }
        }
      ]
    });
  }

  // ========================================================
  // [기혼 전용 이혼 이벤트]: 여행 10년 미이행 시 매년 50% 확률 발동
  // ========================================================
  if (game.married && !game.divorced) {
    const yearsWithoutTravel = game.year - (game.lastTravelYear || game.marriageYear || game.year);
    const isBroke = game.annualIncome < 25000000 || netWorth() < 0;

    if ((yearsWithoutTravel >= 10 && Math.random() < 0.50) || isBroke) {
      e.push({
        id: "divorce_crisis", type: "가정 불화", title: `💔 ${currentSeason} 성격 차이 및 이혼 소송 청구`,
        desc: yearsWithoutTravel >= 10
          ? `결혼 생활 중 여행을 다녀오지 않은 지 ${yearsWithoutTravel}년이 흘렀습니다. 쌓인 피로와 무관심에 지친 배우자가 이혼을 청구하여 전 재산의 50%를 분할하게 됩니다.`
          : "심각한 경제난으로 가정에 불화가 닥쳤습니다. 배우자의 이혼 청구로 합의 이혼에 도달하며 재산의 50%를 분할하게 됩니다.",
        ok: () => true,
        choices: [
          {
            text: "이혼 합의 및 재산 50% 분할 확정",
            result: "",
            apply: function() {
              game.married = false;
              game.divorced = true;
              game.happiness = clamp(game.happiness - 40);
              game.stress = clamp(game.stress + 35);
              game.reputation = clamp(game.reputation - 15);

              const lostCash = Math.round(Math.max(0, game.cash) * 0.5);
              const lostStock = Math.round(game.assets.stock * 0.5);
              const lostEtc = Math.round(game.assets.etc * 0.5);

              game.cash -= lostCash;
              game.assets.stock -= lostStock;
              game.assets.etc -= lostEtc;

              this.result = `이혼 절차가 마무리되어 [돌싱] 상태가 되었습니다. 위자료 및 재산 분할로 현금 ${won(lostCash)}, 주식 ${won(lostStock)}이 지급되었습니다.`;
            }
          }
        ]
      });
    }
  }

  // ========================================================
  // 1. [두 번째 해 봄부터만 발동] 승진 이벤트 (4~6년차 & 평판 90 이상 필수)
  // ========================================================
  const isSecondYearSpringOrLater = game.year > game.startYearRecorded;
  if (game.seasonIndex === 0 && isSecondYearSpringOrLater) {
    const isPromotable = PROMOTABLE_JOB_KEYS.includes(game.jobKey);

    if (isPromotable) {
      const track = careerTracks[game.jobKey];
      const curRankIdx = game.career.rankIndex || 0;
      const canPromote = curRankIdx < track.stages.length - 1;
      const yearsInRank = game.career.yearsInCurrentRank || 0;
      const targetYears = game.career.promoTargetYears || 5;

      if (canPromote && yearsInRank >= targetYears && game.reputation >= 90) {
        const nextRankIdx = curRankIdx + 1;
        const nextTitle = track.stages[nextRankIdx];
        const extraPromoRate = 0.10 + Math.random() * 0.05;
        const promoBonus = Math.round((game.annualIncome * extraPromoRate) / 10000) * 10000;
        const finalPay = game.annualIncome + promoBonus;

        return [{
          id: "general_promotion_event", type: "직급 승진", title: `🎖️ [경사] 정기 승진 심사 통과: ${nextTitle} 발령!`,
          desc: `현재 직급에서 ${yearsInRank}년간 성실히 근무하며 뛰어난 평판(${game.reputation}점)을 증명했습니다! [${nextTitle}]으로 정식 승진하며 연소득이 10~15% 추가 인상됩니다.`,
          ok: () => true,
          choices: [
            {
              text: `승진 발령 수락 및 추가 인상분 수령 (${won(promoBonus)})`,
              result: `[${nextTitle}]으로 승진 완료! 새 연소득 ${won(finalPay)}이 확정되었으며 추가 인상분 ${won(promoBonus)}이 입금되었습니다! (평판 +5, 행복 +20)`,
              apply: function() {
                game.career.rankIndex = nextRankIdx;
                game.career.title = nextTitle;
                game.career.yearsInCurrentRank = 0;
                game.career.promoTargetYears = Math.floor(Math.random() * 3) + 4;
                game.annualIncome = finalPay;
                game.cumulativeIncome += promoBonus;
                game.cash += promoBonus;
                game.reputation = clamp(game.reputation + 5);
                game.happiness = clamp(game.happiness + 20);
              }
            }
          ]
        }];
      } else {
        const canNeg = jobs[game.jobKey] && jobs[game.jobKey].canNegotiate;
        const choices = [
          {
            text: `통보된 연소득 확정 수락 (${won(game.annualIncome)})`,
            result: `올해 연소득 ${won(game.annualIncome)} 계약이 정상 완료되었습니다. 현재 직급을 유지합니다.`,
            apply: function() {}
          }
        ];

        if (canNeg) {
          choices.push({
            text: "연소득 협상 시도 (추가 5~10% 인상 도전)",
            result: "",
            apply: function() {
              const success = Math.random() < 0.25;
              if (success) {
                const extraRate = 0.05 + Math.random() * 0.05;
                const extraMoney = Math.round((game.annualIncome * extraRate) / 10000) * 10000;
                const repPenalty = Math.floor(Math.random() * 4) + 1;
                game.annualIncome += extraMoney;
                game.cumulativeIncome += extraMoney;
                game.cash += extraMoney;
                game.reputation = clamp(game.reputation - repPenalty);
                this.result = `🎉 연소득 협상 성공! 추가 인상분 ${won(extraMoney)}이 현금 자산에 즉시 입금되었습니다. (평판 -${repPenalty})`;
              } else {
                const repPenalty = Math.floor(Math.random() * 11) + 10;
                game.reputation = clamp(game.reputation - repPenalty);
                game.stress += 12;
                this.result = `❌ 연소득 협상 결렬! 추가 인상 없이 기본 연소득으로 유지되며 평판이 대폭 깎였습니다. (평판 -${repPenalty}, 스트레스 +12)`;
              }
            }
          });
        }

        const reasonNote = yearsInRank < targetYears 
          ? `현재 직급 근속 ${yearsInRank}년차 (승진 심사까지 최소 ${targetYears}년 필요)` 
          : `현재 직급 근속 ${yearsInRank}년차이나 평판이 ${game.reputation}점으로 기준치(90점)에 미달하여 승진 보류`;

        return [{
          id: "spring_salary_event", type: "연소득 통보", title: `🌸 봄 정기 연소득 통보 및 계약`,
          desc: `올해 책정된 연소득 ${won(game.annualIncome)}이 현금 자산으로 전액 입금되었습니다. (${reasonNote})${canNeg ? ' 추가 인상을 위한 협상이 가능합니다.' : ''}`,
          ok: () => true,
          choices
        }];
      }
    }
  }

  // ========================================================
  // 2. [치킨집사장 전용 이벤트]
  // ========================================================
  if (game.jobKey === "entrepreneur") {
    if (game.chickenStoreCount === 1 && !game.hasOpenedStore2 && Math.random() < 0.35) {
      return [{
        id: "chicken_store2", type: "매장 확장", title: `🍗 [경사] BBQ치킨집 2호점 직영 확장 오픈!`,
        desc: "인근 번화가에 직영 2호점을 성공적으로 개점했습니다! 매출 규모가 2배로 커지며 연소득이 3,000만원 증가합니다.",
        ok: () => true,
        choices: [{
          text: "2호점 개점식 진행 및 매출 증대",
          result: "직영 2호점이 대박을 터뜨리며 연소득이 3,000만원 증가했습니다!",
          apply: () => {
            game.chickenStoreCount = 2;
            game.hasOpenedStore2 = true;
            game.annualIncome += 30000000;
            game.happiness += 12;
          }
        }]
      }];
    }

    if (game.chickenStoreCount === 2 && !game.hasOpenedStore3 && Math.random() < 0.35) {
      return [{
        id: "chicken_store3", type: "매장 확장", title: `🍗 [대박] BBQ치킨집 3호점 오픈 및 '1,2,3호점 주인' 승급!`,
        desc: "3개 매장을 거느린 지역구 요식업계 거물이 되었습니다! 직함이 [1,2,3호점 주인]으로 승급하며 연소득이 1억 2천만원 수준으로 대폭 점프합니다.",
        ok: () => true,
        choices: [{
          text: "3호점 개점 및 공식 승급 수락",
          result: "축하합니다! 3호점 오픈과 함께 [1,2,3호점 주인]으로 공식 승급했습니다! (연소득 1.2억원으로 상승)",
          apply: () => {
            game.chickenStoreCount = 3;
            game.hasOpenedStore3 = true;
            game.career.title = "1,2,3호점 주인";
            game.annualIncome = Math.max(game.annualIncome + 50000000, 120000000);
            game.happiness += 25;
          }
        }]
      }];
    }

    const chickenDailyEvents = [
      {
        title: "🍗 공중파 유명 맛집 방송 전격 방영",
        desc: "유명 예능 방송에 치킨 맛집으로 소개되며 매일 문전성시를 이룹니다!",
        apply: () => {
          const boost = Math.round((game.annualIncome * 0.40) / 10000) * 10000;
          game.annualIncome += boost;
          game.happiness += 15;
          return `방송 출연 대박으로 연소득이 ${won(boost)} 급증했습니다! (연소득 40% 증가)`;
        }
      },
      {
        title: "🍗 SNS 숏폼 챌린지 및 입소문 열풍",
        desc: "특제 양념 치킨이 젊은 층 사이에서 화제가 되며 배달 주문이 폭주합니다.",
        apply: () => {
          const boost = Math.round((game.annualIncome * 0.25) / 10000) * 10000;
          game.annualIncome += boost;
          game.happiness += 10;
          return `입소문 열풍으로 연소득이 ${won(boost)} 증가했습니다! (연소득 25% 증가)`;
        }
      },
      {
        title: "🍗 무난한 분기 판매 실적",
        desc: "단골 고객들의 꾸준한 방문으로 무난하게 매장을 운영했습니다.",
        apply: () => "특별한 변동 없이 연소득이 안정적으로 동결 유지되었습니다."
      },
      {
        title: "🍗 고물가 경기 불황 및 외식 소비 위축",
        desc: "경기 침체로 야식 소비가 줄어들며 치킨 주문량이 크게 감소했습니다.",
        apply: () => {
          const drop = Math.round((game.annualIncome * 0.25) / 10000) * 10000;
          game.annualIncome = Math.max(25000000, game.annualIncome - drop);
          game.stress += 10;
          return `경기 불황 여파로 연소득이 ${won(drop)} 감소했습니다. (1년 뒤 기본 연소득으로 복구됩니다)`;
        }
      },
      {
        title: "🍗 고병원성 조류독감(AI) 파동 발생",
        desc: "조류독감 확산으로 닭고기 수급 불안 및 소비자들의 기피 심리가 닥쳤습니다.",
        apply: () => {
          const drop = Math.round((game.annualIncome * 0.40) / 10000) * 10000;
          game.annualIncome = Math.max(20000000, game.annualIncome - drop);
          game.stress += 15;
          return `조류독감 사태로 치킨 소비가 얼어붙으며 연소득이 ${won(drop)} 급감했습니다! (1년 뒤 복구됩니다)`;
        }
      },
      {
        title: "🍗 프랜차이즈 본사 갑질 및 필수원자재 폭리",
        desc: "본사의 일방적인 튀김유 및 전용 파우더 공급가 인상으로 영업이익이 급감했습니다.",
        apply: () => {
          const drop = Math.round((game.annualIncome * 0.20) / 10000) * 10000;
          game.annualIncome = Math.max(25000000, game.annualIncome - drop);
          game.stress += 12;
          return `본사의 과도한 원가 인상으로 연소득이 ${won(drop)} 감소했습니다.`;
        }
      }
    ];

    const pick = chickenDailyEvents[Math.floor(Math.random() * chickenDailyEvents.length)];
    e.push({
      id: "chicken_biz_event", type: "치킨집 운영", title: `${currentSeason} 치킨 매장 실적 이슈`,
      desc: pick.desc,
      ok: () => true,
      choices: [{
        text: "매장 결산 확인",
        result: "",
        apply: function() { this.result = pick.apply(); }
      }]
    });
  }

  // 3. GICS 33개 테마별 주가 연동 이벤트
  const gEvent = GICS_EVENTS[Math.floor(Math.random() * GICS_EVENTS.length)];
  const upSector = GICS_SECTORS.find(s => s.id === gEvent.up);
  const downSector = GICS_SECTORS.find(s => s.id === gEvent.down);

  e.push({
    id: "gics_market_news", type: "시장 뉴스", title: `📰 ${currentSeason} 글로벌 시장 리포트`,
    desc: `${gEvent.title}\n\n${gEvent.desc}\n(수혜: ${upSector.name} ▲ / 악재: ${downSector.name} ▼)`,
    ok: () => true,
    choices: [
      {
        text: "뉴스 확인 및 포트폴리오 영향 반영",
        result: "",
        apply: function() {
          let msg = "";
          if (game.assets.stock > 0 && game.currentStockSector) {
            if (game.currentStockSector === gEvent.up) {
              const profit = Math.round(game.assets.stock * (0.35 + Math.random() * 0.25));
              game.assets.stock += profit;
              msg = ` 📈 보유 중인 [${upSector.name}] 섹터가 급등하여 ${won(profit)}의 시세 차익을 거두었습니다!`;
            } else if (game.currentStockSector === gEvent.down) {
              const loss = Math.round(game.assets.stock * (0.25 + Math.random() * 0.20));
              game.assets.stock -= loss;
              msg = ` 📉 보유 중인 [${downSector.name}] 섹터가 급락하여 ${won(loss)}의 손실을 입었습니다.`;
            } else {
              const normalRate = -0.05 + Math.random() * 0.10;
              const diff = Math.round(game.assets.stock * normalRate);
              game.assets.stock += diff;
              msg = ` 보유 종목은 소폭 등락(${won(diff)})했습니다.`;
            }
          } else {
            msg = " (보유 중인 주식이 없어 자산 영향은 없습니다.)";
          }
          this.result = `세계 금융시장 뉴스가 반영되었습니다.${msg}`;
        }
      }
    ]
  });

  // 4. 주식 개별 거래 이벤트 (5개 선택지 즉시 노출 + 매수 시 평판 1~3점 하락)
  const currentSecId = game.currentStockSector;
  const currentSecObj = GICS_SECTORS.find(s => s.id === currentSecId);
  const otherSectors = GICS_SECTORS.filter(s => s.id !== currentSecId);

  const shuffledOthers = [...otherSectors].sort(() => 0.5 - Math.random());
  const pickThree = shuffledOthers.slice(0, 3);
  const stockChoices = [];

  function applyStockReputationPenalty() {
    const penalty = Math.floor(Math.random() * 3) + 1; // 1~3점 하락
    game.reputation = clamp(game.reputation - penalty);
  }

  if (currentSecObj && game.assets.stock > 0) {
    stockChoices.push({
      text: `${currentSecObj.name} 추가 매수 (1,000만)`,
      result: "",
      apply: function() {
        if (game.cash >= 10000000) {
          game.cash -= 10000000;
          game.assets.stock += 10000000;
          applyStockReputationPenalty();
          this.result = `현재 보유 중인 [${currentSecObj.name}] 주식 1,000만원을 추가 매수했습니다.`;
        } else {
          this.result = "현금이 부족하여 매수하지 못했습니다.";
        }
      }
    });
  } else {
    const firstPick = shuffledOthers[3] || GICS_SECTORS[0];
    stockChoices.push({
      text: `${firstPick.name} 매수 (1,000만)`,
      result: "",
      apply: function() {
        if (game.cash >= 10000000) {
          game.cash -= 10000000;
          game.assets.stock += 10000000;
          game.currentStockSector = firstPick.id;
          applyStockReputationPenalty();
          this.result = `[${firstPick.name}] 주식 1,000만원을 신규 매수했습니다.`;
        } else {
          this.result = "현금이 부족하여 매수하지 못했습니다.";
        }
      }
    });
  }

  pickThree.forEach(sec => {
    stockChoices.push({
      text: `${sec.name} ${game.assets.stock > 0 ? '갈아타기' : '매수'} (1,000만)`,
      result: "",
      apply: function() {
        if (game.cash >= 10000000) {
          game.cash -= 10000000;
          game.assets.stock += 10000000;
          game.currentStockSector = sec.id;
          applyStockReputationPenalty();
          this.result = `[${sec.name}] 주식 1,000만원을 ${game.assets.stock > 10000000 ? '갈아타며 투자' : '매수'}했습니다.`;
        } else {
          this.result = "현금이 부족하여 거래를 진행하지 못했습니다.";
        }
      }
    });
  });

  if (game.assets.stock > 0) {
    stockChoices.push({
      text: "보유 주식 전량 매도 (현금화)",
      result: "",
      apply: function() {
        const v = game.assets.stock;
        game.cash += v;
        game.assets.stock = 0;
        game.currentStockSector = null;
        this.result = `보유 주식을 전량 매도하여 현금 ${won(v)}을 확보했습니다.`;
      }
    });
  } else {
    stockChoices.push({
      text: "거래 안 함 (관망)",
      result: "이번 분기는 주식 거래 없이 관망하기로 결정했습니다.",
      apply: () => {}
    });
  }

  e.push({
    id: "gics_stock_trading", type: "투자 기회", title: `📊 ${currentSeason} 주식 거래 시장 오픈`,
    desc: game.assets.stock > 0
      ? `현재 [${currentSecObj?.name || '일반'}] 주식을 ${won(game.assets.stock)} 보유 중입니다. 보유 종목을 늘리거나 다른 유망 섹터로 즉시 갈아탈 수 있습니다.`
      : "증시에 새로운 투자 기회가 찾아왔습니다. 추천 섹터 중 하나를 선택해 매수할 수 있습니다.",
    ok: () => true,
    choices: stockChoices
  });

  // 5. 여행 이벤트
  e.push({
    id: "travel_event", type: "휴가", title: `✈️ ${currentSeason} 휴가 여행 계획`,
    desc: "바쁜 일상에서 벗어나 여행을 떠납니다. 힐링이 되지만 피로로 건강과 평판이 소폭 깎입니다. (부부 관계 개선)",
    ok: () => true,
    choices: [
      {
        text: "국내 힐링 여행 (비용 100만)",
        result: "국내 명소에서 푹 쉬다 왔습니다. (행복 +8, 스트레스 -10, 평판 -1, 건강 -2)",
        apply: () => {
          if (game.cash >= 1000000) {
            game.cash -= 1000000;
            game.happiness = clamp(game.happiness + 8);
            game.stress = clamp(game.stress - 10);
            game.reputation = clamp(game.reputation - 1);
            game.health = clamp(game.health - 2);
            if (game.married) game.lastTravelYear = game.year;
          }
        }
      },
      {
        text: "해외 장기 여행 (비용 400만)",
        result: "해외에서 뜻깊은 추억을 쌓았습니다. (행복 +18, 스트레스 -18, 평판 -3, 건강 -4)",
        apply: () => {
          if (game.cash >= 4000000) {
            game.cash -= 4000000;
            game.happiness = clamp(game.happiness + 18);
            game.stress = clamp(game.stress - 18);
            game.reputation = clamp(game.reputation - 3);
            game.health = clamp(game.health - 4);
            if (game.married) game.lastTravelYear = game.year;
          }
        }
      },
      {
        text: "집에서 휴식 (비용 0원)",
        result: "조용히 집에서 쉬며 체력을 비축했습니다.",
        apply: () => { game.stress = clamp(game.stress - 3); }
      }
    ]
  });

  // 6. [겨울 전용] 성과급 이벤트
  if (game.seasonIndex === 3 && game.jobKey !== "celebrity" && game.jobKey !== "entrepreneur" && game.jobKey !== "unemployed") {
    e.push({
      id: "job_bonus", type: "보너스", title: `❄️ 겨울 연말 특별 성과급`,
      desc: `한 해 동안의 근속 및 업무 실적을 치하하는 특별 상여금이 지급됩니다.`,
      ok: () => true,
      choices: [
        {
          text: "성과급 수령",
          result: "",
          apply: function() {
            let bonus = 0;
            let logDetail = "";

            if (game.jobKey === "factory_worker") {
              if (Math.random() < 0.5) {
                bonus = 100000;
                logDetail = "신발공장 연말 격려금 10만원이 지급되었습니다.";
              } else {
                bonus = 0;
                logDetail = "공장 수주 감소로 올해 성과급은 지급되지 않았습니다.";
              }
            } else if (["developer", "large_corp", "researcher", "large_factory"].includes(game.jobKey)) {
              const rand = Math.random();
              let rate = 0;
              if (rand < 0.10) {
                rate = 0;
              } else if (rand < 0.50) {
                rate = 0.10;
              } else if (rand < 0.80) {
                rate = 0.20;
              } else if (rand < 0.90) {
                rate = 0.50;
              } else if (rand < 0.97) {
                rate = 1.00;
              } else {
                rate = 3.00;
              }

              bonus = Math.round((game.annualIncome * rate) / 10000) * 10000;
              logDetail = rate > 0 
                ? `대기업 성과급 평가 결과, 연소득의 ${Math.round(rate * 100)}%인 ${won(bonus)}이 지급되었습니다!`
                : "경영 실적 기준 미달로 올해 성과급은 미지급되었습니다.";
            } else if (["civil", "teacher", "nurse", "police", "firefighter", "sme_corp"].includes(game.jobKey)) {
              // 2% ~ 5%로 조정
              const rate = 0.02 + Math.random() * 0.03;
              bonus = Math.round((game.annualIncome * rate) / 10000) * 10000;
              logDetail = `정기 성과평가에 따라 연소득의 ${Math.round(rate * 100)}%인 ${won(bonus)}이 지급되었습니다.`;
            } else {
              const rate = 0.05 + Math.random() * 0.10;
              bonus = Math.round((game.annualIncome * rate) / 10000) * 10000;
              logDetail = `연말 성과급 ${won(bonus)}이 지급되었습니다.`;
            }

            game.cash += bonus;
            if (bonus > 0) game.happiness += 8;
            this.result = logDetail;
          }
        }
      ]
    });
  }

  // ========================================================
  // 7. 결혼 이벤트 및 결혼 전 조건 충족 경고 이벤트
  // ========================================================
  if (!game.married && !game.divorced && !game.declaredSolo && game.gender === "남성") {
    const hasNoCar = !game.car || game.car.level === 0 || game.assets.car <= 0;
    const isBelowStudio = !game.housing || (game.housing.level !== undefined ? game.housing.level < 2 : false);

    // 결혼 적령기(30세 이상)인데 차가 없거나 오피스텔 미만(고시원, 원룸)일 때 현실 자각 이벤트
    if (game.age >= 30 && (hasNoCar || isBelowStudio)) {
      e.push({
        id: "marriage_prerequisite_alert", type: "결혼 고민", title: `💭 ${currentSeason} 결혼에 대한 현실적인 장벽`,
        desc: `주변 친구들이 하나둘 가정을 꾸리고 있지만, ${hasNoCar ? '자동차가 없고 ' : ''}${isBelowStudio ? '주거 환경이 오피스텔 월세 미만' : ''}이라 청혼을 꺼리게 됩니다. 안정적인 결혼을 위해서는 차량 마련과 최소 오피스텔 이상의 집이 필요합니다.`,
        ok: () => true,
        choices: [
          {
            text: "자산 마련에 더 집중하기로 다짐한다",
            result: "주택 UP이나 차량 UP을 통해 자립 기반을 마련한 뒤 결혼을 진행하기로 결심했습니다.",
            apply: () => { game.stress = clamp(game.stress + 5); }
          }
        ]
      });
    }
    // 조건 충족(차 보유 + 오피스텔 이상 주거) 시 정규 결혼 이벤트 발동
    else {
      if (game.age >= 45 && Math.random() < 0.60) {
        e.push({
          id: "marriage_intl", type: "인생", title: `💍 ${currentSeason} 국제결혼 주선`,
          desc: "지인의 주선으로 국제결혼 만남이 성사되었습니다. 솔로 선언 시 향후 결혼 이벤트가 차단됩니다.",
          ok: () => true,
          choices: [
            {
              text: "국제결혼을 진행한다 (예식 및 체류비 1,500만)",
              result: "배우자와 함께 새로운 가정을 꾸렸습니다.",
              apply: () => {
                if (game.cash >= 15000000) game.cash -= 15000000; else game.debt += 15000000;
                game.married = true; game.marriageYear = game.year; game.lastTravelYear = game.year; game.happiness += 20;
              }
            },
            {
              text: "평생 솔로를 선언한다 (앞으로 결혼 사절)",
              result: "자유로운 싱글라이프를 선언했습니다!",
              apply: () => { game.declaredSolo = true; game.stress -= 10; }
            }
          ]
        });
      } else if (game.age >= 30 && game.age < 35 && Math.random() < 0.70) {
        e.push({
          id: "marriage_high", type: "인생", title: `💍 ${currentSeason} 결혼 결심`,
          desc: "안정적인 직장과 보금자리를 바탕으로 연인과 부부의 연을 맺기로 결심했습니다.",
          ok: () => true,
          choices: [
            {
              text: "결혼식을 올린다 (예식 비용 3,000만)",
              result: "축복 속에 결혼식을 올리고 가정을 꾸렸습니다!",
              apply: () => {
                if (game.cash >= 30000000) game.cash -= 30000000; else game.debt += 30000000;
                game.married = true; game.marriageYear = game.year; game.lastTravelYear = game.year; game.happiness += 25;
              }
            },
            {
              text: "아직은 미룬다",
              result: "결혼을 미루고 일에 전념합니다.",
              apply: () => {}
            }
          ]
        });
      }
    }
  }

  return e.filter(x => x.ok());
}

function generateEvent() {
  const list = eventList();
  currentEvent = list[Math.floor(Math.random() * list.length)];
  game.lastEvent = `[${SEASONS[game.seasonIndex]}] ${currentEvent.title}`;
  eventResolved = false;
  renderEvent();
}

function renderEvent() {
  $("eventType").textContent = `${SEASONS[game.seasonIndex]} · ${currentEvent.type}`;
  $("eventTitle").textContent = currentEvent.title;
  $("eventDescription").textContent = currentEvent.desc;
  $("choices").innerHTML = "";

  currentEvent.choices.forEach((c, i) => {
    const b = document.createElement("button");
    b.className = "choice";
    b.textContent = `${i + 1}. ${c.text}`;
    b.onclick = () => resolveEvent(i);
    $("choices").appendChild(b);
  });

  $("resultBox").classList.add("hidden");
  $("eventNextBtn").disabled = true;
}

function resolveEvent(i) {
  if (eventResolved) return;
  const c = currentEvent.choices[i];
  const before = { cash: game.cash, stock: game.assets.stock, rep: game.reputation };

  c.apply();
  game.health = clamp(game.health);
  game.happiness = clamp(game.happiness);
  game.stress = clamp(game.stress);
  game.reputation = clamp(game.reputation);
  recalculateHousingAndLifestyle();
  eventResolved = true;

  $("resultText").textContent = c.result || "처리가 완료되었습니다.";
  const changes = [
    ["현금", game.cash - before.cash],
    ["주식", game.assets.stock - before.stock],
    ["평판", game.reputation - before.rep]
  ].filter(x => x[1] !== 0).map(x => `<span class="change">${x[0]} ${typeof x[1] === "number" && Math.abs(x[1]) > 1000 ? won(x[1]) : (x[1] > 0 ? "+" : "") + x[1]}</span>`).join("");

  $("resultChanges").innerHTML = changes || '<span class="change">변동 없음</span>';
  $("resultBox").classList.remove("hidden");
  [...document.querySelectorAll(".choice")].forEach(b => b.disabled = true);
  $("eventNextBtn").disabled = false;
  updateUI();
}

// 분기 및 연도 진행
function advanceYear() {
  if (!eventResolved) return;

  if (game.seasonIndex === 3) {
    let annualLivingCost = 0;

    if (game.isFirstYearWinter) {
      annualLivingCost = game.firstYearLivingCostFixed || 4000000;
      game.cash -= annualLivingCost;
      game.isFirstYearWinter = false;

      if (game.cash < 0) {
        const liquidLog = liquidateAssetsForCash();
        alert(`[첫해 겨울 생활비 지출]\n약정된 첫해 생활비 ${won(annualLivingCost)}이 차감되었습니다.\n현금이 부족하여 자산이 처분되었습니다.\n${liquidLog}`);
      }
    } else {
      if (game.annualIncome > 0) {
        const livingRate = 0.40 + Math.random() * 0.10;
        annualLivingCost = Math.round((game.annualIncome * livingRate) / 10000) * 10000;
        game.cash -= annualLivingCost;

        if (game.cash < 0) {
          const liquidLog = liquidateAssetsForCash();
          alert(`[겨울 연간 생활비 지출]\n연소득의 ${Math.round(livingRate * 100)}%인 ${won(annualLivingCost)}이 생활비로 차감되었습니다.\n현금이 부족하여 자산이 처분되었습니다.\n${liquidLog}`);
        }
      }
    }

    game.lastYearLivingCost = annualLivingCost;

    if (game.age >= 60) { endGame(); return; }
    game.age++;
    game.year++;
    game.seasonIndex = 0; // 봄으로 이동

    // 자동차 보유 기간 1년 추가
    if (game.assets.car > 0) {
      game.carHoldingYears = (game.carHoldingYears || 0) + 1;
    } else {
      // 자동차가 없으면(대중교통) 매년 스트레스 1~10 무작위 상승
      const oldStress = game.stress;
      const noCarStress = Math.floor(Math.random() * 10) + 1;
      game.stress = clamp(game.stress + noCarStress);

      // 스트레스가 20단위로 쌓일 때마다 건강 -10 차감 (20, 40, 60, 80, 100 경계 돌파)
      const prevBracket = Math.floor(oldStress / 20);
      const newBracket = Math.floor(game.stress / 20);
      if (newBracket > prevBracket) {
        const damage = (newBracket - prevBracket) * 10;
        game.health = clamp(game.health - damage);
      }
    }

    // 봄 진입 시 평판 자동 상승 (매년 봄 1~10점 상승)
    const repIncrease = Math.floor(Math.random() * 10) + 1;
    game.reputation = clamp(game.reputation + repIncrease);

    // 현재 직급 근속 연수 1년 증가
    if (game.career && game.career.yearsInCurrentRank !== undefined) {
      game.career.yearsInCurrentRank++;
    }

    // 새해 봄 진입 시 연소득 정산
    if (game.jobKey !== "unemployed") {
      if (game.jobKey === "factory_worker") {
        if (Math.random() < 0.5) {
          // 동결 (50% 확률)
        } else {
          game.annualIncome = Math.round((game.annualIncome * 1.03) / 10000) * 10000;
        }
      } else if (["developer", "large_corp", "researcher", "large_factory"].includes(game.jobKey)) {
        const hikeRate = 0.05 + Math.random() * 0.02; // 5% ~ 7%
        game.annualIncome = Math.round((game.annualIncome * (1 + hikeRate)) / 10000) * 10000;
      } else if (["civil", "teacher", "nurse", "police", "firefighter", "sme_corp"].includes(game.jobKey)) {
        const hikeRate = 0.02 + Math.random() * 0.02; // 2% ~ 4%로 조정
        game.annualIncome = Math.round((game.annualIncome * (1 + hikeRate)) / 10000) * 10000;
        if (jobs[game.jobKey].isGov) {
          game.career.govStep = (game.career.govStep || 1) + 1;
        }
      } else if (game.jobKey === "entrepreneur") {
        const basePay = getChickenBasePay();
        if (game.annualIncome < basePay) {
          game.annualIncome = basePay;
        }
      } else if (game.jobKey === "celebrity") {
        const celebRate = -0.20 + Math.random() * 0.60;
        game.annualIncome = Math.max(20000000, Math.round((game.annualIncome * (1 + celebRate)) / 10000) * 10000);
        if (game.reputation >= 90) game.career.title = "탑스타";
      } else if (game.jobKey === "professional") {
        const profRate = 0.05 + Math.random() * 0.07;
        game.annualIncome = Math.round((game.annualIncome * (1 + profRate)) / 10000) * 10000;
      } else {
        game.annualIncome = Math.round((game.annualIncome * (1.03 + Math.random() * 0.04)) / 10000) * 10000;
      }

      game.cash += game.annualIncome;
      game.cumulativeIncome += game.annualIncome;
    }
  } else {
    game.seasonIndex++;
  }

  recalculateHousingAndLifestyle();
  recordHistory();

  if (game.age >= 60 && game.seasonIndex === 3) { endGame(); return; }
  generateEvent();
  updateUI();
}

function updateUI() {
  $("ageText").textContent = game.age;
  $("yearText").textContent = `${game.year} ${SEASONS[game.seasonIndex]}`;
  $("jobText").textContent = `${game.job} (${game.education})`;
  $("careerText").textContent = currentCareerTitle();
  $("incomeText").textContent = won(game.annualIncome);
  $("cumIncomeText").textContent = `생애소득 ${won(game.cumulativeIncome)}`;
  $("housingText").textContent = `${game.housing.name} (${game.housing.city})`;
  $("netWorthText").textContent = `순자산 ${won(netWorth())}`;
  $("carText").textContent = `${game.car.name} (${won(game.assets.car)})`;
  $("familyText").textContent = game.divorced ? "돌싱" : (game.married ? (game.children ? `배우자·자녀 ${game.children}명` : "기혼") : "미혼");

  let marriageNote = `병역: ${game.military}`;
  if (game.married && !game.divorced) {
    const noTripYears = game.year - (game.lastTravelYear || game.marriageYear || game.year);
    marriageNote = noTripYears >= 10 ? `⚠️ 미여행 ${noTripYears}년 (이혼위기 50%)` : `여행미이행: ${noTripYears}년차`;
  }
  $("marriageStateText").textContent = marriageNote;

  $("healthText").textContent = game.health;
  $("happinessText").textContent = game.happiness;
  $("stressText").textContent = game.stress;
  $("repText").textContent = game.reputation;

  const currentSectorObj = GICS_SECTORS.find(s => s.id === game.currentStockSector);
  const stockSectorInfo = game.assets.stock > 0 ? (currentSectorObj ? `[${currentSectorObj.name}]` : "[일반]") : "없음";
  $("stockAsset").textContent = `${won(game.assets.stock)} ${game.assets.stock > 0 ? stockSectorInfo : ''}`;
  $("houseAsset").textContent = won(game.assets.house);
  $("carAsset").textContent = won(game.assets.car);
  $("etcAsset").textContent = won(game.assets.etc);
  $("cashAsset").textContent = won(game.cash);
  $("totalAsset").textContent = won(totalAssets());
  if ($("totalAssetSub")) $("totalAssetSub").textContent = won(totalAssets());

  if ($("careerDetail")) {
    const isGov = jobs[game.jobKey] && jobs[game.jobKey].isGov;
    const canNeg = jobs[game.jobKey] && jobs[game.jobKey].canNegotiate;
    const isPromotable = PROMOTABLE_JOB_KEYS.includes(game.jobKey);
    const promoInfo = isPromotable 
      ? `근속 ${game.career.yearsInCurrentRank || 0}년차 (승진요건: ${game.career.promoTargetYears || 5}년 & 평판 90점 이상)`
      : `승진제외 직군 (독자 소득 시스템 적용)`;

    $("careerDetail").innerHTML = `
      <div><span>학력 / 병역</span><strong>${game.education} · ${game.military}</strong></div>
      <div><span>현재 평판</span><strong>⭐ ${game.reputation}점 ${game.reputation >= 90 ? '(승진 유력)' : (game.reputation < 50 ? '(해고 위험)' : '(보통)')}</strong></div>
      <div><span>현재 연소득</span><strong>${won(game.annualIncome)} ${isGov ? '(호봉제)' : (canNeg ? '(협상가능)' : '')}</strong></div>
      <div><span>승진 현황</span><strong style="font-size:12px">${promoInfo}</strong></div>
    `;
  }

  // 주택 & 자동차 UP/DOWN 버튼에 비용 사전 안내 업데이트
  updateActionButtonsLabel();

  renderHistory();
  renderTimeline();
  drawChart("assetChart");
}

// 주택/자동차 UP/DOWN 비용 사전 안내 버튼 텍스트 갱신
function updateActionButtonsLabel() {
  const curHLevel = game.housing.level !== undefined ? game.housing.level : (game.housing.owned ? 5 : 1);
  const houseUpBtn = $("houseUpBtn");
  const houseDownBtn = $("houseDownBtn");

  if (houseUpBtn) {
    if (curHLevel >= housingLevels.length - 1) {
      houseUpBtn.textContent = "🏠 주택 UP (최고 등급)";
      houseUpBtn.disabled = true;
    } else {
      const nextH = housingLevels[curHLevel + 1];
      let cost = 0;
      if (nextH.houseValue > 0) {
        cost = Math.round(nextH.houseValue * 0.4) - (game.housing.deposit || 0); // 대출 60% 제외 자부담
      } else {
        cost = nextH.deposit - (game.housing.deposit || 0);
      }
      houseUpBtn.textContent = `🏠 주택 UP (${nextH.name}: ${cost > 0 ? won(cost) + ' 필요' : '차액 환급'})`;
      houseUpBtn.disabled = false;
    }
  }

  if (houseDownBtn) {
    if (curHLevel <= 0) {
      houseDownBtn.textContent = "📉 주택 DOWN (최저 등급)";
      houseDownBtn.disabled = true;
    } else {
      const prevH = housingLevels[curHLevel - 1];
      houseDownBtn.textContent = `📉 주택 DOWN (${prevH.name}: 현금 환급)`;
      houseDownBtn.disabled = false;
    }
  }

  const curCLevel = game.car.level !== undefined ? game.car.level : (game.assets.car > 0 ? 1 : 0);
  const carUpBtn = $("carUpBtn");
  const carDownBtn = $("carDownBtn");

  if (carUpBtn) {
    if (curCLevel >= carLevels.length - 1) {
      carUpBtn.textContent = "🚗 차량 UP (최고 등급)";
      carUpBtn.disabled = true;
    } else {
      const nextC = carLevels[curCLevel + 1];
      const tradeIn = Math.round(game.assets.car * 0.9);
      const need = nextC.value - tradeIn;
      carUpBtn.textContent = `🚗 차량 UP (${nextC.name}: ${won(need)} 필요)`;
      carUpBtn.disabled = false;
    }
  }

  if (carDownBtn) {
    if (curCLevel <= 0) {
      carDownBtn.textContent = "📉 차량 DOWN (차량 없음)";
      carDownBtn.disabled = true;
    } else {
      const prevC = carLevels[curCLevel - 1];
      carDownBtn.textContent = `📉 차량 DOWN (${prevC.name}: 현금 확보)`;
      carDownBtn.disabled = false;
    }
  }
}

function renderHistory() {
  $("historyCount").textContent = `${game.history.length}회 기록`;
  $("historyBody").innerHTML = game.history.map(h => `
    <tr>
      <td><strong>${h.age}세</strong><br><small>${h.year} (${h.season})</small></td>
      <td>${h.job}<br><small style="color:#6b7280">${h.career}</small></td>
      <td>${won(h.income)}</td>
      <td style="color:#dc2626">${h.livingCost > 0 ? `-${won(h.livingCost)}` : '-'}</td>
      <td>${won(h.houseAsset)}</td>
      <td>${won(h.carAsset)}</td>
      <td>${won(h.stockAsset)}</td>
      <td>${won(h.etcAsset)}</td>
      <td>${won(h.cashAsset)}</td>
      <td style="color:#2563eb"><strong>${won(h.totalAsset)}</strong></td>
      <td><strong>${won(h.netWorth)}</strong></td>
    </tr>
  `).join("");
}

function renderTimeline() {
  if (!game) return;
  $("timeline").innerHTML = game.history.map(h => `
    <article class="timeline-item">
      <div style="font-weight:bold">${h.age}세 (${h.year} ${h.season}) - ${h.job} (${h.career})</div>
      <div style="margin-top:4px;color:#6b7280">${h.event}</div>
      <div style="margin-top:6px">연소득: ${won(h.income)} ${h.livingCost > 0 ? `| 생활비: -${won(h.livingCost)}` : ''} | 총자산: ${won(h.totalAsset)} | 순자산: ${won(h.netWorth)}</div>
    </article>
  `).join("");
}

function drawChart(id) {
  const canvas = $(id);
  if (!canvas || !game || !game.history.length) return;
  const r = canvas.getBoundingClientRect(), dpr = devicePixelRatio || 1, w = Math.max(300, r.width), h = Math.max(160, r.height);
  canvas.width = w * dpr; canvas.height = h * dpr;
  const ctx = canvas.getContext("2d"); ctx.scale(dpr, dpr);
  const pad = { l: 50, r: 15, t: 15, b: 25 }, data = game.history.map(x => x.totalAsset), max = Math.max(...data, 1), min = Math.min(...data, 0), range = max - min || 1;
  ctx.clearRect(0, 0, w, h); ctx.strokeStyle = "#e5e7eb"; ctx.fillStyle = "#6b7280"; ctx.font = "10px Arial";
  for (let i = 0; i <= 4; i++) {
    const y = pad.t + (h - pad.t - pad.b) * i / 4;
    ctx.beginPath(); ctx.moveTo(pad.l, y); ctx.lineTo(w - pad.r, y); ctx.stroke();
    ctx.fillText(won(max - range * i / 4), 5, y + 3);
  }
  const pw = w - pad.l - pad.r, ph = h - pad.t - pad.b;
  ctx.strokeStyle = "#2563eb"; ctx.lineWidth = 2; ctx.beginPath();
  data.forEach((v, i) => {
    const x = pad.l + (data.length === 1 ? pw / 2 : pw * i / (data.length - 1)), y = pad.t + (max - v) / range * ph;
    i ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
  });
  ctx.stroke();
}

function openStockModal() {
  const modal = $("stockModal");
  if (!modal) return;

  const currentSectorObj = GICS_SECTORS.find(s => s.id === game.currentStockSector);
  $("currentStockModalInfo").textContent = game.assets.stock > 0
    ? `현재 보유: [${currentSectorObj?.name || '일반'}] ${won(game.assets.stock)} (1개 섹터만 보유 가능)`
    : "현재 보유 주식 없음 (1,000만원 단위로 매수 가능)";

  const listEl = $("gicsSectorList");
  listEl.innerHTML = "";

  GICS_SECTORS.forEach(sec => {
    const item = document.createElement("div");
    item.className = "sector-trade-item";

    const isCurrent = game.currentStockSector === sec.id;
    item.innerHTML = `
      <div>
        <strong>${sec.name} ${isCurrent ? '<span style="color:#2563eb">(보유중)</span>' : ''}</strong>
        <small>${sec.desc}</small>
      </div>
      <button class="primary" data-id="${sec.id}">
        ${isCurrent ? '추가 매수 (1,000만)' : (game.assets.stock > 0 ? '갈아타기 (1,000만)' : '매수 (1,000만)')}
      </button>
    `;

    item.querySelector("button").onclick = () => {
      buySpecificStockSector(sec.id);
    };

    listEl.appendChild(item);
  });

  modal.classList.remove("hidden");
}

function closeStockModal() {
  const modal = $("stockModal");
  if (modal) modal.classList.add("hidden");
}

function buySpecificStockSector(sectorId) {
  if (game.cash < 10000000) {
    return alert("현금 1,000만원이 필요합니다.");
  }
  const sec = GICS_SECTORS.find(s => s.id === sectorId);

  if (game.assets.stock > 0 && game.currentStockSector !== sectorId) {
    const oldSecName = GICS_SECTORS.find(s => s.id === game.currentStockSector)?.name;
    if (!confirm(`현재 보유 중인 [${oldSecName}] 주식에 더해 [${sec.name}]으로 단일 종목을 교체(갈아타기)하시겠습니까?`)) {
      return;
    }
  }

  game.cash -= 10000000;
  game.assets.stock += 10000000;
  game.currentStockSector = sectorId;

  // 주식 거래 시 평판 1~3점 하락
  const penalty = Math.floor(Math.random() * 3) + 1;
  game.reputation = clamp(game.reputation - penalty);

  alert(`[${sec.name}] 섹터 주식 1,000만원을 매수했습니다.`);
  updateUI();
  openStockModal();
}

function sellAllStock() {
  if (game.assets.stock <= 0) return alert("보유 중인 주식이 없습니다.");
  const v = game.assets.stock;
  game.cash += v;
  game.assets.stock = 0;
  game.currentStockSector = null;
  alert(`보유 주식을 전량 매도하여 현금 ${won(v)}을 확보했습니다.`);
  updateUI();
  closeStockModal();
}

// 주택 UP 시스템 (사전 비용 안내 및 확인창)
function houseUp() {
  const curLevel = game.housing.level !== undefined ? game.housing.level : (game.housing.owned ? 5 : 1);
  if (curLevel >= housingLevels.length - 1) return alert("이미 최고 등급 주택에 거주 중입니다.");

  const next = housingLevels[curLevel + 1];

  if (next.houseValue > 0) {
    const loan = Math.round(next.houseValue * 0.6);
    const down = next.houseValue - loan;
    const refundDeposit = game.housing.deposit || 0;
    const requiredCash = down - refundDeposit;

    const confirmMsg = `[주택 UP 견적서]\n\n` +
      `이전 주택: ${game.housing.name} (보증금 ${won(refundDeposit)} 환급 예정)\n` +
      `대상 주택: ${next.name} (매매가 ${won(next.houseValue)})\n` +
      `예상 대출: ${won(loan)} (매매가의 60%)\n` +
      `실제 필요 현금: ${won(requiredCash)}\n` +
      `현재 보유 현금: ${won(game.cash)}\n\n` +
      `정말 상향 이사를 진행하시겠습니까?`;

    if (!confirm(confirmMsg)) return;

    if (game.cash < requiredCash) {
      return alert(`현금이 부족합니다. 최소 ${won(requiredCash)}의 현금이 필요합니다.`);
    }

    game.cash += refundDeposit;
    game.cash -= down;
    game.assets.house = next.houseValue;
    game.debt += loan;
    game.housing = { ...next, owned: true, deposit: 0 };
    game.happiness = clamp(game.happiness + 15);
    alert(`🎉 [${next.name}] 자가 주택으로 상향 이사 완료! (대출 ${won(loan)})`);
  } else {
    const diff = next.deposit - (game.housing.deposit || 0);
    const confirmMsg = `[주택 UP 견적서]\n\n` +
      `이전 주택: ${game.housing.name}\n` +
      `대상 주택: ${next.name} (보증금 ${won(next.deposit)})\n` +
      `보증금 추가 필요액: ${won(diff)}\n` +
      `현재 보유 현금: ${won(game.cash)}\n\n` +
      `상향 이사를 진행하시겠습니까?`;

    if (!confirm(confirmMsg)) return;

    if (game.cash < diff) {
      return alert(`보증금 증액을 위해 현금 ${won(diff)}이 필요합니다.`);
    }
    game.cash -= diff;
    game.assets.house = next.deposit;
    game.housing = { ...next, owned: false };
    game.happiness = clamp(game.happiness + 8);
    alert(`[${next.name}]으로 상향 이사 완료! (보증금 ${won(next.deposit)})`);
  }
  updateUI();
}

// 주택 DOWN 시스템 (사전 환급액 안내 및 확인창)
function houseDown() {
  const curLevel = game.housing.level !== undefined ? game.housing.level : (game.housing.owned ? 5 : 1);
  if (curLevel <= 0) return alert("이미 가장 저렴한 고시원에 거주 중입니다.");

  const prev = housingLevels[curLevel - 1];

  if (game.housing.owned) {
    const sellPrice = Math.round(game.assets.house * 0.95);
    const netCash = sellPrice - game.debt;
    const finalCashInHand = netCash - prev.deposit;

    const confirmMsg = `[주택 DOWN 정산서]\n\n` +
      `처분 주택: ${game.housing.name} (매각금 ${won(sellPrice)})\n` +
      `부채 상환: ${won(game.debt)}\n` +
      `이전 대상: ${prev.name} (보증금 ${won(prev.deposit)} 지출)\n` +
      `최종 현금 확보액: ${won(finalCashInHand)}\n\n` +
      `정말 주택을 다운그레이드하시겠습니까? (행복 -10)`;

    if (!confirm(confirmMsg)) return;

    game.debt = 0;
    game.cash += netCash;
    game.cash -= prev.deposit;
    game.assets.house = prev.deposit;
    game.housing = { ...prev, owned: false };
    game.happiness = clamp(game.happiness - 10);
    alert(`자가 주택을 처분하고 [${prev.name}]으로 다운 이주하여 현금 ${won(finalCashInHand)}을 확보했습니다.`);
  } else {
    const refund = (game.housing.deposit || 0) - prev.deposit;

    const confirmMsg = `[주택 DOWN 정산서]\n\n` +
      `이전 주택: ${game.housing.name}\n` +
      `이전 대상: ${prev.name}\n` +
      `보증금 환급(현금 확보): ${won(refund)}\n\n` +
      `하향 이사를 진행하시겠습니까?`;

    if (!confirm(confirmMsg)) return;

    game.cash += refund;
    game.assets.house = prev.deposit;
    game.housing = { ...prev, owned: false };
    alert(`[${prev.name}]으로 하향 이사하여 보증금 차액 ${won(refund)}을 회수했습니다.`);
  }
  updateUI();
}

// 차량 UP 시스템 (사전 견적 안내 및 확인창)
function carUp() {
  const curLevel = game.car.level !== undefined ? game.car.level : (game.assets.car > 0 ? 1 : 0);
  if (curLevel >= carLevels.length - 1) return alert("이미 최고급 플래그십 차량을 보유 중입니다.");

  const next = carLevels[curLevel + 1];
  const tradeInVal = Math.round(game.assets.car * 0.9);
  const needCash = next.value - tradeInVal;

  const confirmMsg = `[차량 UP 구매 견적서]\n\n` +
    `현재 차량 처분액: ${won(tradeInVal)} (자산가의 90% 보상)\n` +
    `신차 가격: ${next.name} (${won(next.value)})\n` +
    `추가 필요 현금: ${won(needCash)}\n` +
    `현재 보유 현금: ${won(game.cash)}\n\n` +
    `차량을 업그레이드하시겠습니까?`;

  if (!confirm(confirmMsg)) return;

  if (game.cash < needCash) {
    return alert(`현금이 부족합니다. 추가로 ${won(needCash)}이 필요합니다.`);
  }

  game.cash -= needCash;
  game.assets.car = next.value;
  game.car = { ...next };
  game.carHoldingYears = 0; // 신차 교체로 보유 연수 리셋
  game.happiness = clamp(game.happiness + 8);
  alert(`🚗 [${next.name}]으로 상향 교체 완료!`);
  updateUI();
}

// 차량 DOWN 시스템 (사전 환급액 안내 및 확인창)
function carDown() {
  const curLevel = game.car.level !== undefined ? game.car.level : (game.assets.car > 0 ? 1 : 0);
  if (curLevel <= 0) return alert("현재 차량이 없어 더 낮출 수 없습니다.");

  const prev = carLevels[curLevel - 1];
  const sellVal = Math.round(game.assets.car * 0.9);
  const getCash = sellVal - prev.value;

  const confirmMsg = `[차량 DOWN 정산서]\n\n` +
    `기존 차량 처분액: ${won(sellVal)}\n` +
    `하향 대상: ${prev.name} (${won(prev.value)})\n` +
    `최종 현금 확보액: ${won(getCash)}\n\n` +
    `차량을 다운그레이드하시겠습니까?`;

  if (!confirm(confirmMsg)) return;

  game.cash += getCash;
  game.assets.car = prev.value;
  game.car = { ...prev };
  game.carHoldingYears = 0;
  alert(`차량을 [${prev.name}]으로 변경하고 현금 ${won(getCash)}을 확보했습니다.`);
  updateUI();
}

function handleHomeReset() {
  if (confirm("다시 인생을 처음부터 시작하겠습니까?\n\n(확인: 첫 화면으로 이동, 취소: 현재 화면 유지)")) {
    game = null;
    currentEvent = null;
    eventResolved = false;
    show("startScreen");
    initBirthUI();
  }
}

function endGame() {
  show("endScreen");
  const nw = netWorth();
  $("endingTitle").textContent = "인생 결산 완료";
  $("endingMessage").textContent = `${game.name}님의 ${game.education} 출발, 60세까지의 인생 여정입니다.`;
  const stats = [
    ["최종 직업", `${game.job} (${currentCareerTitle()})`],
    ["학력 / 병역", `${game.education} · ${game.military}`],
    ["최종 연소득", won(game.annualIncome)],
    ["누적 생애소득", won(game.cumulativeIncome)],
    ["최종 순자산", won(nw)],
    ["최종 평판", `${game.reputation}점`]
  ];
  $("endingStats").innerHTML = stats.map(x => `<div class="ending-stat"><span>${x[0]}</span><strong>${x[1]}</strong></div>`).join("");
  setTimeout(()=>drawChart("endingChart"), 50);
}

function show(id) {
  ["startScreen", "rouletteScreen", "gameScreen", "recordScreen", "endScreen"].forEach(x => $(x).classList.toggle("hidden", x !== id));
}

function updateProfilePreview() {
  const nameEl = $("playerName");
  const regionEl = $("playerRegion");
  const genderEl = $("playerGender");
  if ($("previewName") && nameEl) $("previewName").textContent = nameEl.value.trim() || "플레이어";
  if ($("previewRegion") && regionEl) $("previewRegion").textContent = regionEl.value;
  if ($("previewGender") && genderEl) $("previewGender").textContent = genderEl.value;
  if ($("previewBirth")) $("previewBirth").textContent = getSelectedBirthDate();
}

let rouletteState = { profile: null, generatedKey: null, started: false };

function showRoulette(profile) {
  rouletteState = { profile, generatedKey: null, started: false };

  const eligibleJobKeys = Object.keys(jobs).filter(key => {
    if (key === "unemployed") return false;

    // 4년제 대졸 한정 직업[cite: 1]
    const onlyUnivKeys = ["large_corp", "researcher", "professional", "doctor", "teacher", "finance"];
    if (onlyUnivKeys.includes(key) && profile.education !== "대졸 (4년제)") return false;

    // 고졸 한정 직업[cite: 1]
    const onlyHighSchoolKeys = ["large_factory", "factory_worker"];
    if (onlyHighSchoolKeys.includes(key) && profile.education !== "고졸") return false;

    // 경찰, 소방관: 병역 면제자 지원 불가[cite: 1]
    if ((key === "police" || key === "firefighter") && profile.military === "병역 면제") return false;

    return true;
  });

  const selectedKey = eligibleJobKeys[Math.floor(Math.random() * eligibleJobKeys.length)];
  rouletteState.generatedKey = selectedKey;

  $("rouletteProfile").textContent = `[${profile.startAge}세 출발] ${profile.education} · ${profile.military} · ${profile.region} 출신`;
  $("rouletteCandidate").textContent = "직업 추첨 준비 완료";
  $("rouletteResult").classList.add("hidden");
  $("rouletteConfirmBtn").classList.add("hidden");
  $("rouletteStartBtn").classList.remove("hidden");

  const items = [];
  for (let i = 0; i < 4; i++) for (const k of eligibleJobKeys) items.push(k);
  const targetIndex = eligibleJobKeys.length * 2 + Math.floor(eligibleJobKeys.length / 2);
  items[targetIndex] = selectedKey;

  $("rouletteTrack").innerHTML = items.map(k => `<div class="roulette-item" data-job="${k}">${jobs[k].name}<small>${jobs[k].desc.slice(0, 14)}...</small></div>`).join("");
  $("rouletteTrack").style.transition = "none";
  $("rouletteTrack").style.transform = "translateX(0px)";

  show("rouletteScreen");
}

async function spinCareerRoulette() {
  if (!rouletteState.profile || rouletteState.started) return;
  rouletteState.started = true;
  $("rouletteStartBtn").classList.add("hidden");

  const track = $("rouletteTrack"), windowEl = $("rouletteWindow");
  const items = [...track.querySelectorAll(".roulette-item")];
  const targetKey = rouletteState.generatedKey;
  let targetIndex = items.findIndex((el, idx) => idx >= items.length / 2 && el.getAttribute("data-job") === targetKey);
  if (targetIndex === -1) targetIndex = Math.floor(items.length / 2);

  const itemWidth = items[0] ? items[0].getBoundingClientRect().width + 8 : 168;
  const target = -(targetIndex * itemWidth - (windowEl.clientWidth / 2 - itemWidth / 2));

  track.style.transition = "transform 3.8s cubic-bezier(0.15, 0.85, 0.15, 1)";
  track.style.transform = `translateX(${target}px)`;

  await new Promise(r => setTimeout(r, 4000));

  const key = rouletteState.generatedKey;
  $("rouletteCandidate").textContent = `🎯 ${jobs[key].name}`;
  $("rouletteResultJob").textContent = jobs[key].name;
  $("rouletteResultCareer").textContent = `${rouletteState.profile.startAge}세 출발 직업`;
  $("rouletteResultIncome").textContent = jobs[key].desc;
  $("rouletteResultReason").textContent = `${rouletteState.profile.education} 및 ${rouletteState.profile.military} 이력 조건에 부합하여 직무가 배정되었습니다.`;
  $("rouletteResult").classList.remove("hidden");
  $("rouletteConfirmBtn").classList.remove("hidden");
}

function startGeneratedGame() {
  if (!rouletteState.profile) return;
  game = newGame(rouletteState.profile, rouletteState.generatedKey);
  recalculateHousingAndLifestyle();
  recordHistory();
  show("gameScreen");
  updateUI();
  generateEvent();
}

function setupApplication() {
  initBirthUI();

  ["playerName", "playerRegion", "playerGender"].forEach(id => {
    const el = $(id);
    if (el) {
      el.addEventListener("input", updateProfilePreview);
      el.addEventListener("change", updateProfilePreview);
    }
  });

  const createBtn = $("createCharacterBtn");
  if (createBtn) {
    createBtn.onclick = () => {
      const base = {
        name: $("playerName").value.trim() || "플레이어",
        region: $("playerRegion").value,
        gender: $("playerGender").value,
        birth: getSelectedBirthDate()
      };
      generatedProfileData = generateFullProfile(base);
      showRoulette(generatedProfileData);
    };
  }

  if ($("rouletteStartBtn")) $("rouletteStartBtn").onclick = spinCareerRoulette;
  if ($("rouletteConfirmBtn")) $("rouletteConfirmBtn").onclick = startGeneratedGame;
  if ($("nextYearBtn")) $("nextYearBtn").onclick = () => { if (eventResolved) advanceYear(); };
  if ($("eventNextBtn")) $("eventNextBtn").onclick = advanceYear;
  if ($("lifeRecordBtn")) $("lifeRecordBtn").onclick = () => show("recordScreen");
  if ($("closeRecordBtn")) $("closeRecordBtn").onclick = () => show("gameScreen");

  if ($("homeBtn")) $("homeBtn").onclick = handleHomeReset;

  if ($("openStockModalBtn")) $("openStockModalBtn").onclick = openStockModal;
  if ($("closeStockModalBtn")) $("closeStockModalBtn").onclick = closeStockModal;
  if ($("sellAllStockBtn")) $("sellAllStockBtn").onclick = sellAllStock;

  if ($("houseUpBtn")) $("houseUpBtn").onclick = houseUp;
  if ($("houseDownBtn")) $("houseDownBtn").onclick = houseDown;
  if ($("carUpBtn")) $("carUpBtn").onclick = carUp;
  if ($("carDownBtn")) $("carDownBtn").onclick = carDown;

  if ($("endingNewBtn")) $("endingNewBtn").onclick = () => { game = null; show("startScreen"); };
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", setupApplication);
} else {
  setupApplication();
}

window.onresize = () => { if (game) drawChart("assetChart"); };
