/* ==========================================================================
   [MY LIFE] 현실 기반 인생 시뮬레이션 엔진 (game.js)
   - 최신 업데이트 내역:
     1) 질병 이벤트 쿨타임 및 빈도 정밀 제어 
        - 1,2단계: 5년 쿨타임 적용 (10년 무발생 시 최소 1회 강제 발생 보장)
        - 3단계: 10년 쿨타임 적용 (생애 1~2회 수준)
        - 4단계: 평생 단 1회 발생 제한 (이후 영구 차단)
     2) 치킨집 2호점/3호점: 운영 5년 후 + 평판 90 이상 + 5,000만원 실제 지출 차감
     3) 주식 이벤트: 말줄임표 없이 줄바꿈으로 전체 텍스트 출력, 발생 빈도 축소
     4) 직장 뉴스: 출현 빈도 확대 (연 1회 확정 외에 추가 분기 등장 지원)
     5) 84㎡ 주택 자가 매매: 클릭형 모달 선택창
     6) 결혼 3회 미룰 시 이별 페널티 및 35~45세 구간 30% 확률 등장
     7) 결혼 다음 해부터 기본 생활비 1.5배 가중 및 주거비용 자동 합산
     8) 3열 슬롯머신 룰렛 연출 및 교체된 연소득 테이블 완벽 반영
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
  { id: "IT", name: "💻 정보기술", desc: "애플, 마이크로소프트, 엔비디아 등" },
  { id: "COMM", name: "📡 커뮤니케이션", desc: "구글, 메타, 넷플릭스 등" },
  { id: "CDIS", name: "🛍️ 소비재/모빌리티", desc: "아마존, 테슬라, 자동차, 패션 등" },
  { id: "CSTP", name: "🛒 필수생활소비", desc: "P&G, 코카콜라, 식료품 등" },
  { id: "HLTH", name: "🏥 제약/바이오헬스", desc: "일라이릴리, 유나이티드헬스, 신약 등" },
  { id: "FIN", name: "💰 금융/증권/은행", desc: "버크셔 해서웨이, JP모건, 은행 등" },
  { id: "IND", name: "🏭 방산/제조/산업재", desc: "보잉, 캐터필러, 방산, 중공업 등" },
  { id: "UTIL", name: "⚡ 전력/인프라/유틸리티", desc: "신재생에너지, 전력 공기업, 수도 등" },
  { id: "MATR", name: "🧪 첨단화학/핵심소재", desc: "화학소재, 2차전지 양극재, 금속 등" },
  { id: "ENGY", name: "🛢️ 에너지/정유/원유", desc: "엑슨모빌, 셰브론, 천연가스 등" },
  { id: "REST", name: "🏢 부동산/리츠", desc: "글로벌 상업용 빌딩 리츠 등" }
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
  professional: { id:"professional", name:"전문직(변호사/회계사)", type:"professional", desc:"고도의 전문성과 파트너 승진에 따라 고수익을 창출합니다.", canNegotiate:false },
  factory_worker: { id:"factory_worker", name:"신발공장근로자", type:"technical", desc:"제조 현장에서 땀 흘려 일하며 매년 동결 위험이 있습니다.", canNegotiate:true },
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
  civil: { stages: ["9급 주무관", "8급 주무관", "7급 주무관", "6급 팀장", "5급 사무관"], pay: [32000000, 38000000, 45000000, 54000000, 68000000] },
  teacher: { stages: ["신규교사", "1급정교사", "부장교사", "교감", "교장"], pay: [36000000, 45000000, 58000000, 70000000, 78000000] },
  nurse: { stages: ["일반간호사", "책임간호사", "수간호사", "간호과장"], pay: [33000000, 42000000, 54000000, 60000000] },
  doctor: { stages: ["인턴/레지던트", "전임의(펠로우)", "과장급 전문의", "원장"], pay: [80000000, 150000000, 300000000, 500000000] },
  police: { stages: ["순경", "경장", "경사", "경위", "경감", "경정"], pay: [35000000, 42000000, 50000000, 60000000, 72000000, 88000000] },
  firefighter: { stages: ["소방사", "소방교", "소방장", "소방위", "소방경"], pay: [35000000, 42000000, 50000000, 60000000, 72000000] },
  finance: { stages: ["주임", "대리", "과장", "차장", "부장", "지점장/이사"], pay: [65000000, 90000000, 105000000, 130000000, 160000000, 220000000] },
  researcher: { stages: ["선임연구원", "책임연구원", "수석연구원", "연구위원"], pay: [58000000, 78000000, 105000000, 140000000] },
  large_factory: { stages: ["사원", "조장", "반장", "직장", "기정"], pay: [58000000, 72000000, 84000000, 96000000, 110000000] },
  professional: { stages: ["어쏘", "시니어", "주니어파트너", "대표 파트너"], pay: [80000000, 150000000, 220000000, 400000000] },
  factory_worker: { stages: ["신입사원", "숙련공", "선임공", "생산반장"], pay: [30000000, 36000000, 42000000, 50000000] },
  celebrity: { stages: ["신인/무명", "라이징 스타", "인지도 주연급", "탑스타"], pay: [20000000, 100000000, 500000000, 2000000000] },
  entrepreneur: { stages: ["1호점 초기창업", "1,2,3호점 주인", "동네 프랜차이즈 대표", "대형 프랜차이즈 대표"], pay: [45000000, 120000000, 250000000, 600000000] },
  unemployed: { stages: ["구직자"], pay: [0] }
};

const THEME_EVENTS = [
  { up:"IT", down:"COMM", title:"글로벌 AI 데이터센터 대규모 증설 발표", desc:"생성형 AI 모델 고도화로 인한 초고성능 AI 가속기 및 인프라 서버 수요가 전 세계적으로 폭증했습니다.", upRate:45, downRate:30 },
  { up:"IT", down:"REST", title:"스마트 팩토리 및 초고속 클라우드 인프라 전환", desc:"제조 대기업들의 자동화 전산망 클라우드 전환 투자가 집중되며 전통 상업용 부동산 임대 수요가 둔화되었습니다.", upRate:40, downRate:25 },
  { up:"CDIS", down:"CSTP", title:"소비자 심리지수 10년 만에 최고치 경신", desc:"경기 회복 기대감으로 명품, 신차, 레저 소비재 판매가 폭발하는 반면 경기방어 성격의 필수소비재는 매도세를 맞았습니다.", upRate:50, downRate:35 },
  { up:"CSTP", down:"CDIS", title:"글로벌 경기 둔화 우려 및 실속형 소비 확산", desc:"외식을 대폭 줄이고 대형 마트 필수 식료품과 생활 생필품을 사재기하는 수요가 몰리고 있습니다.", upRate:35, downRate:40 },
  { up:"HLTH", down:"ENGY", title:"비만·항암 혁신 신약 글로벌 임상 최종 승인", desc:"글로벌 블록버스터 신약 출시로 바이오 섹터가 급등하는 반면 화석연료 수요는 단기 조정을 겪고 있습니다.", upRate:55, downRate:30 },
  { up:"FIN", down:"REST", title:"중앙은행 기준금리 전격 인상 단행", desc:"예대마진 확대로 시중은행 수익성이 급등하는 반면 고금리로 인한 부동산 PF 및 리츠 시장은 급랭했습니다.", upRate:38, downRate:35 },
  { up:"IND", down:"COMM", title:"국제 안보 위기 고조 및 각국 국방비 증액", desc:"자주국방 테마 속에 K-방산 및 특수 정밀 장비 대규모 수출 잭팟이 터졌습니다.", upRate:48, downRate:28 },
  { up:"UTIL", down:"ENGY", title:"원자력 및 청정 공공전력 공급 체계 개편", desc:"국가 전력망 안정화를 위한 공공 전력 인프라가 재평가받으며 전통 화석 정유주는 약세를 보입니다.", upRate:35, downRate:30 },
  { up:"MATR", down:"CDIS", title:"2차전지 및 첨단 산업 핵심 광물 수급난 심화", desc:"희토류 및 양극재 소재 기업들의 판가가 폭등하며 원가 부담이 커진 완성차 제조사들은 실적이 위축되었습니다.", upRate:42, downRate:28 },
  { up:"ENGY", down:"IND", title:"산유국 협의체 감산 발표 및 국제 유가 폭등", desc:"국제 유가가 치솟으며 정유·시추 기업들이 사상 최대 흑자를 낸 반면 연료비 폭탄을 맞은 항공/물류는 적자로 돌아섰습니다.", upRate:50, downRate:35 },
  { up:"REST", down:"FIN", title:"초저금리 기조 진입 및 상업용 리츠 랠리", desc:"낮아진 자금 조달 비용으로 상업용 오피스 빌딩 리츠의 배당 매력이 크게 상승했습니다.", upRate:40, downRate:25 }
];

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

// -------------------------------------------------------------
// 지역별 부동산 규격 정의
// -------------------------------------------------------------
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
    // 강원도, 제주도
    return [
      ...base,
      { level: 4, type: "jeonse", name: "84㎡ 아파트 전세", deposit: 150000000, rent: 0, houseValue: 0 },
      { level: 5, type: "owned", name: "84㎡ 아파트 자가", deposit: 0, rent: 0, houseValue: 300000000, loanRate: 0.80 },
      { level: 6, type: "owned", name: "대형 아파트 자가", deposit: 0, rent: 0, houseValue: 500000000, loanRate: 0 }
    ];
  }
}

// -------------------------------------------------------------
// 전역 상태
// -------------------------------------------------------------
let game = null;
let currentEvent = null;
let eventResolved = false;
let baseCreationData = null;

const $ = id => document.getElementById(id);
const clamp = (v, a = 0, b = 100) => Math.max(a, Math.min(b, Math.round(v)));
const won = v => {
  const n = Math.round(v);
  if (Math.abs(n) >= 1e8) return `${(n / 1e8).toFixed(Math.abs(n) % 1e8 === 0 ? 0 : 1)}억원`;
  return `${Math.round(n / 10000).toLocaleString("ko-KR")}만원`;
};

// -------------------------------------------------------------
// 캐릭터 생성 UI 초기화
// -------------------------------------------------------------
function assignRandomName(gender) {
  const nameInput = $("playerName");
  if (!nameInput) return;
  if (gender === "여성") {
    nameInput.value = FEMALE_NAMES[Math.floor(Math.random() * FEMALE_NAMES.length)];
  } else {
    nameInput.value = MALE_NAMES[Math.floor(Math.random() * MALE_NAMES.length)];
  }
}

function initBirthUI() {
  const genderSelect = $("playerGender");
  const yearInput = $("playerBirthYear");
  const monthSelect = $("playerBirthMonth");
  const daySelect = $("playerBirthDay");

  if (genderSelect) {
    if (!genderSelect.value) {
      genderSelect.value = Math.random() < 0.5 ? "남성" : "여성";
    }
    assignRandomName(genderSelect.value);
  }

  if (yearInput) {
    yearInput.value = `${FIXED_BIRTH_YEAR}년`;
  }

  if (!monthSelect || !daySelect) return;

  monthSelect.innerHTML = "";
  for (let m = 1; m <= 12; m++) {
    const opt = document.createElement("option");
    opt.value = String(m).padStart(2, '0');
    opt.textContent = `${m}월`;
    monthSelect.appendChild(opt);
  }

  const randomMonth = Math.floor(Math.random() * 12) + 1;
  monthSelect.value = String(randomMonth).padStart(2, '0');

  function updateDays(keepCurrent = false) {
    const selectedMonth = parseInt(monthSelect.value, 10) || 1;
    const lastDay = new Date(FIXED_BIRTH_YEAR, selectedMonth, 0).getDate();
    const currentVal = daySelect.value;

    daySelect.innerHTML = "";
    for (let d = 1; d <= lastDay; d++) {
      const opt = document.createElement("option");
      opt.value = String(d).padStart(2, '0');
      opt.textContent = `${d}일`;
      daySelect.appendChild(opt);
    }

    if (keepCurrent && currentVal && parseInt(currentVal, 10) <= lastDay) {
      daySelect.value = currentVal;
    } else {
      const randomDay = Math.floor(Math.random() * lastDay) + 1;
      daySelect.value = String(randomDay).padStart(2, '0');
    }
  }

  monthSelect.onchange = () => { 
    updateDays(false); 
    updateProfilePreview(); 
  };
  daySelect.onchange = () => { 
    updateProfilePreview(); 
  };

  updateDays(false);
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
  const randomPromoYears = Math.floor(Math.random() * 5) + 4; // 4~8년

  return { 
    type: jobKey, 
    step: 1, 
    rankIndex: 0, 
    govStep: 1, 
    yearsInCurrentRank: 0, 
    promoTargetYears: randomPromoYears, 
    title: track ? track.stages[0] : "신입"
  };
}

function newGame(finalConfig) {
  const career = newCareer(finalConfig.jobKey);
  const j = jobs[finalConfig.jobKey];
  const initialIncome = careerTracks[finalConfig.jobKey] ? careerTracks[finalConfig.jobKey].pay[0] : 30000000;

  const startingAssetTiers = [10000000, 20000000, 30000000];
  const chosenTier = startingAssetTiers[Math.floor(Math.random() * startingAssetTiers.length)];

  const regionalHousing = getRegionalHousingLevels(finalConfig.currentRegion);
  let initHousing = { ...regionalHousing[0] };
  let initCar = { ...carLevels[0] };
  let initHouseAsset = 5000000;
  let initCarAsset = 0;
  let initCash = 5000000;
  let firstYearLivingCost = 4000000;

  if (chosenTier === 20000000) {
    initHousing = { ...regionalHousing[1] };
    initCar = { ...carLevels[0] };
    initHouseAsset = 10000000;
    initCash = 10000000;
    firstYearLivingCost = 7000000;
  } else if (chosenTier === 30000000) {
    initHousing = { ...regionalHousing[1] };
    initCar = { ...carLevels[1] };
    initHouseAsset = 10000000;
    initCarAsset = 5000000;
    initCash = 15000000;
    firstYearLivingCost = 10000000;
  }

  const startYear = START_YEAR + (finalConfig.startAge - 20);

  return {
    name: finalConfig.name,
    gender: finalConfig.gender,
    birthRegion: finalConfig.birthRegion,
    currentRegion: finalConfig.currentRegion,
    age: finalConfig.startAge,
    year: startYear,
    seasonIndex: 0,
    newsSeasonInYear: Math.floor(Math.random() * 4),
    yearsWithoutTravelEvent: 0,
    hasTravelOccurredThisYear: false,
    
    // [신규 병합 반영] 질병 쿨타임 및 추적 변수
    lastDiseaseAnyYear: startYear,
    lastDiseaseL1L2Year: -999,
    lastDiseaseL3Year: -999,
    hasDiseaseL4Occurred: false,

    marriageDelayCount: 0,
    marriageBlockedUntilYear: 0,
    carCheckCount: 0,
    housingYearsInCurrent: 0,
    chickenStore1Years: 0,
    chickenStore2Years: 0,
    chickenStore3Years: 0, // [추가] 3호점 운영 연수 카운터
    startYearRecorded: START_YEAR + (finalConfig.startAge - 20),
    isFirstYearWinter: true,
    firstYearLivingCostFixed: firstYearLivingCost,
    jobKey: finalConfig.jobKey,
    job: j.name,
    career,
    annualIncome: initialIncome,
    cumulativeIncome: initialIncome,
    education: finalConfig.education,
    military: finalConfig.military,
    isDischarged: finalConfig.isDischarged,
    declaredSolo: false,
    chickenStoreCount: 1,
    hasOpenedStore2: false,
    hasOpenedStore3: false,
    cash: initCash,
    assets: { house: initHouseAsset, car: initCarAsset, stock: 0, etc: 0 },
    debt: 0,
    health: finalConfig.initialHealth,
    happiness: 70,
    stress: 25,
    reputation: 70,
    married: false,
    divorced: false,
    marriageYear: 0,
    lastTravelYear: 0,
    carHoldingYears: 0,
    children: 0,
    housing: initHousing,
    car: initCar,
    currentStockSector: null,
    lastYearLivingCost: 0,
    history: [],
    lastEvent: `인생의 출발 (거주지: ${finalConfig.currentRegion}, 초기 자산: ${won(chosenTier)})`
  };
}

function totalAssets() { return game.cash + game.assets.house + game.assets.car + game.assets.stock + game.assets.etc; }
function netWorth() { return totalAssets() - game.debt; }


function checkChickenEnterpriseGrowth() {
  if (game.jobKey !== "entrepreneur") return;
  const nw = netWorth();
  
  // [추가] 3호점을 오픈했고, 그 후로 5년 이상 운영했는지 확인
  const hasOperatedStore3For5Years = game.hasOpenedStore3 && (game.chickenStore3Years >= 5);

  // 3호점 운영 5년 충족 시에만 프랜차이즈 대표 승급 심사 진행
  if (hasOperatedStore3For5Years) {
    if (nw >= 3000000000 && game.career.title !== "대형 프랜차이즈 대표") {
      game.career.title = "대형 프랜차이즈 대표";
      game.annualIncome = Math.max(game.annualIncome, 600000000);
      alert("축하합니다! 3호점 운영 5년 달성 및 순자산 30억을 돌파하여 전국구 [대형 프랜차이즈 대표]로 도약했습니다! (연소득 6억원 보장)");
    } 
    else if (nw >= 1000000000 && game.career.title !== "동네 프랜차이즈 대표" && game.career.title !== "대형 프랜차이즈 대표") {
      game.career.title = "동네 프랜차이즈 대표";
      game.annualIncome = Math.max(game.annualIncome, 250000000);
      alert("축하합니다! 3호점 운영 5년 달성 및 자본금 10억원을 확보하여 [동네 프랜차이즈 대표]로 발돋움했습니다! (연소득 2.5억원 보장)");
    }
  }
}


function recalculateHousingAndLifestyle() {
  if (game.seasonIndex === 0 && game.assets.car > 0) {
    const depRate = 0.05 + Math.random() * 0.05;
    game.assets.car = Math.round(game.assets.car * (1 - depRate));
    game.car.value = game.assets.car;
  }

  if (game.housing.type === "owned" && game.assets.house > 0) {
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
    game.debt = 0;
    const regionalHousing = getRegionalHousingLevels(game.currentRegion);
    game.housing = { ...regionalHousing[0], name: "고시원 (강등)" };
    log += `[주택 처분] 주거 자산을 감가 정리하여 ${won(houseVal)} 충당 후 고시원으로 강등 이주. `;
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
    housing: `${game.housing.name} (${game.currentRegion})`,
    car: game.car.name,
    family: game.divorced ? "돌싱" : (game.married ? (game.children ? `배우자·자녀 ${game.children}명` : "기혼") : "미혼"),
    houseAsset: Math.round(game.assets.house),
    carAsset: Math.round(game.assets.car),
    stockAsset: Math.round(game.assets.stock),
    debtAsset: Math.round(game.debt),
    cashAsset: Math.round(game.cash),
    totalAsset: Math.round(totalAssets()),
    netWorth: Math.round(netWorth()),
    event: game.lastEvent || ""
  };
  game.history.push(h);
}

function createTravelEventObj(currentSeason) {
  return {
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
  };
}

// -------------------------------------------------------------
// 건강 & 질병 4단계 동적 추첨 엔진 (1~4단계 정밀 쿨타임 제어)
// -------------------------------------------------------------
function checkHealthDiseaseEvent() {
  const currentSeason = SEASONS[game.seasonIndex];
  const yearsSinceAny = game.year - (game.lastDiseaseAnyYear || game.startYearRecorded);
  const yearsSinceL1L2 = game.year - (game.lastDiseaseL1L2Year || -999);
  const yearsSinceL3 = game.year - (game.lastDiseaseL3Year || -999);

  let riskJobMultiplier = 1.0;
  if (["large_factory", "factory_worker", "firefighter", "police"].includes(game.jobKey)) {
    riskJobMultiplier = 1.35;
  }

  const isSoloMultiplier = (!game.married || game.divorced) ? 1.25 : 1.0;
  
  let healthMultiplier = 1.0;
  if (game.health < 60) healthMultiplier = 1.6;
  else if (game.health < 75) healthMultiplier = 1.25;

  const totalM = riskJobMultiplier * isSoloMultiplier * healthMultiplier;

  // 10년간 아무 질병도 없었다면 1단계 또는 2단계 무조건 강제 발생 (최소 1회 보장)
  let forceL1L2 = (yearsSinceAny >= 10);
  let eventLevel = 0;

  if (forceL1L2) {
    eventLevel = Math.random() < 0.3 ? 2 : 1; // 30% 확률로 2단계, 70% 확률로 1단계
  } else {
    // 4단계 (살면서 0~1번, 4단계 발생 이력 없어야 함)
    if (!game.hasDiseaseL4Occurred && Math.random() < (0.0025 * totalM)) eventLevel = 4;
    // 3단계 (생애 한 번 정도, 10년 쿨타임)
    else if (yearsSinceL3 >= 10 && Math.random() < (0.0050 * totalM)) eventLevel = 3;
    // 2단계 (10년에 최대 3회, 5년 쿨타임)
    else if (yearsSinceL1L2 >= 5 && Math.random() < (0.0150 * totalM)) eventLevel = 2;
    // 1단계 (10년에 최대 3회, 5년 쿨타임)
    else if (yearsSinceL1L2 >= 5 && Math.random() < (0.0350 * totalM)) eventLevel = 1;
  }

  if (eventLevel === 4) {
    const cost = 15000000;
    return {
      id: "health_tier4", type: "중증 질환", title: `🏥 ${currentSeason} 중증 질환 진단 및 긴급 대수술`,
      desc: `정밀 검진 결과 조기 치료가 시급한 중증 질환이 발견되어 입원 후 긴급 수술을 받았습니다. 수술비와 특실 입원비 ${won(cost)}이 지출됩니다. (건강 -35, 스트레스 +35)`,
      ok: () => true,
      choices: [{
        text: `수술비 지출 및 요양 치료 (${won(cost)})`,
        result: `대수술을 무사히 마치고 장기간 회복 치료에 들어갔습니다. 의료비 ${won(cost)}이 정산되었습니다. (건강 -35, 스트레스 +35)`,
        apply: () => {
          game.cash -= cost;
          game.health = clamp(game.health - 35);
          game.stress = clamp(game.stress + 35);
          game.happiness = clamp(game.happiness - 20);
          game.hasDiseaseL4Occurred = true;
          game.lastDiseaseAnyYear = game.year;
        }
      }]
    };
  } else if (eventLevel === 3) {
    const cost = 2000000;
    return {
      id: "health_tier3", type: "교통사고", title: `🚑 ${currentSeason} 불의의 교통사고 발생 및 입원 치료`,
      desc: `이동 중 발생한 차량 접촉 사고로 전치 4주의 부상을 입고 정형외과에 입원했습니다. 병원비 및 합의 처리비용 ${won(cost)}이 발생합니다. (건강 -18, 스트레스 +20)`,
      ok: () => true,
      choices: [{
        text: `치료비 납부 및 입원 치료 (${won(cost)})`,
        result: `입원 치료를 마쳤으나 당분간 재활이 필요합니다. 병원비 ${won(cost)}이 지출되었습니다. (건강 -18, 스트레스 +20)`,
        apply: () => {
          game.cash -= cost;
          game.health = clamp(game.health - 18);
          game.stress = clamp(game.stress + 20);
          game.lastDiseaseL3Year = game.year;
          game.lastDiseaseAnyYear = game.year;
        }
      }]
    };
  } else if (eventLevel === 2) {
    const cost = 300000;
    return {
      id: "health_tier2", type: "부상 사고", title: `🩹 ${currentSeason} 일상생활 중 낙상 부상`,
      desc: `계단에서 발을 헛디뎌 발목 인대가 늘어나는 부상을 당했습니다. 반깁스 처치와 물리치료비 ${won(cost)}이 소요됩니다. (건강 -8, 스트레스 +10)`,
      ok: () => true,
      choices: [{
        text: `정형외과 치료 수용 (${won(cost)})`,
        result: `반깁스를 하고 2주간 통원 치료를 받았습니다. (건강 -8, 스트레스 +10)`,
        apply: () => {
          game.cash -= cost;
          game.health = clamp(game.health - 8);
          game.stress = clamp(game.stress + 10);
          game.lastDiseaseL1L2Year = game.year;
          game.lastDiseaseAnyYear = game.year;
        }
      }]
    };
  } else if (eventLevel === 1) {
    const cost = 50000;
    return {
      id: "health_tier1", type: "질병", title: `🤒 ${currentSeason} 환절기 급성 독감 및 감기몸살`,
      desc: `면역력 저하와 과로로 인해 고열과 오한을 동반한 심한 감기몸살을 앓았습니다. 이비인후과 진료비와 영양 수액비 ${won(cost)}이 지출됩니다. (건강 -3)`,
      ok: () => true,
      choices: [{
        text: `수액 처방 및 약 복용 (${won(cost)})`,
        result: `주말 동안 푹 쉬며 수액을 맞고 기력을 회복했습니다. (건강 -3)`,
        apply: () => {
          game.cash -= cost;
          game.health = clamp(game.health - 3);
          game.stress = clamp(game.stress + 4);
          game.lastDiseaseL1L2Year = game.year;
          game.lastDiseaseAnyYear = game.year;
        }
      }]
    };
  }

  return null;
}

// -------------------------------------------------------------
// 메인 이벤트 엔진
// -------------------------------------------------------------
function eventList() {
  const currentSeason = SEASONS[game.seasonIndex];

  // 1. [승진 심사]
  const isSecondYearSpringOrLater = game.year > game.startYearRecorded;
  if (game.seasonIndex === 0 && isSecondYearSpringOrLater) {
    const isPromotable = PROMOTABLE_JOB_KEYS.includes(game.jobKey);
    if (isPromotable) {
      const track = careerTracks[game.jobKey];
      const curRankIdx = game.career.rankIndex || 0;
      const canPromote = curRankIdx < track.stages.length - 1;
      const yearsInRank = game.career.yearsInCurrentRank || 0;
      const targetYears = game.career.promoTargetYears || 4;

      if (canPromote && yearsInRank >= targetYears && game.reputation >= 90) {
        const nextRankIdx = curRankIdx + 1;
        const nextTitle = track.stages[nextRankIdx];
        const extraPromoRate = 0.10 + Math.random() * 0.05;
        const promoBonus = Math.round((game.annualIncome * extraPromoRate) / 10000) * 10000;
        const finalPay = game.annualIncome + promoBonus;

        return [{
          id: "general_promotion_event", type: "정기 승진", title: `🎖️ [경사] 정기 승진 심사 통과: [${nextTitle}] 발령!`,
          desc: `현재 직급에서 ${yearsInRank}년간 성실히 근무하며 뛰어난 평판(${game.reputation}점)을 증명했습니다! [${nextTitle}]으로 공식 승진하며 연소득이 10~15% 추가 인상됩니다.`,
          ok: () => true,
          choices: [
            {
              text: `승진 발령 수락 및 추가 인상분 수령 (${won(promoBonus)})`,
              result: `[${nextTitle}]으로 승진 완료! 새 연소득 ${won(finalPay)}이 확정되었습니다! (평판 +5, 행복 +20)`,
              apply: function() {
                game.career.rankIndex = nextRankIdx;
                game.career.title = nextTitle;
                game.career.yearsInCurrentRank = 0;
                game.career.promoTargetYears = Math.floor(Math.random() * 5) + 4;
                game.annualIncome = finalPay;
                game.cumulativeIncome += promoBonus;
                game.cash += promoBonus;
                game.reputation = clamp(game.reputation + 5);
                game.happiness = clamp(game.happiness + 20);
              }
            }
          ]
        }];
      }
    }
  }

  // 2. [치킨집 2호점/3호점 오픈]
  if (game.jobKey === "entrepreneur") {
    if (game.chickenStoreCount === 1 && !game.hasOpenedStore2 && game.chickenStore1Years >= 5) {
      if (game.reputation >= 90 && game.cash >= 50000000) {
        return [{
          id: "chicken_store2", type: "매장 확장", title: `🍗 [경사] BBQ치킨집 2호점 직영 확장 오픈!`,
          desc: `1호점을 5년간 성공적으로 운영하고 평판(${game.reputation}점)을 쌓아 2호점을 출점합니다! 가맹/인테리어 비용 5,000만원이 현금에서 지출되며, 연소득이 대폭 증가합니다.`,
          ok: () => true,
          choices: [
            {
              text: "현금 5,000만원 지출 및 2호점 개점식 진행",
              result: "직영 2호점이 대박을 터뜨리며 연소득이 3,000만원 증가했습니다! (현금 -5,000만, 행복 +15)",
                apply: () => {
                game.cash -= 50000000;
                game.chickenStoreCount = 2;
                game.hasOpenedStore2 = true;
                game.chickenStore2Years = 0;
                game.annualIncome += 30000000;
                // 직책 변경 코드 삭제 (1호점 초기창업 유지)
                game.happiness += 15;
              }
            },
            {
              text: "자금 여유를 위해 개점을 보류한다",
              result: "2호점 개점을 미루고 현재 매장 운영에 집중합니다.",
              apply: () => {}
            }
          ]
        }];
      }
    }

    if (game.chickenStoreCount === 2 && !game.hasOpenedStore3 && game.chickenStore2Years >= 5) {
      if (game.reputation >= 90 && game.cash >= 50000000) {
        return [{
          id: "chicken_store3", type: "매장 확장", title: `🍗 [대박] BBQ치킨집 3호점 오픈 및 '1,2,3호점 주인' 승급!`,
          desc: `2호점 오픈 후 5년의 노력 끝에 대망의 3호점을 개설합니다! 투자비 5,000만원이 현금에서 지출되며, [1,2,3호점 주인]으로 승급합니다.`,
          ok: () => true,
          choices: [
            {
              text: "현금 5,000만원 지출 및 3호점 오픈",
              result: "축하합니다! 3개 매장을 거느린 지역구 거물로 도약했습니다! (현금 -5,000만, 연소득 1.2억원으로 상승)",
              apply: () => {
                game.cash -= 50000000;
                game.chickenStoreCount = 3;
                game.hasOpenedStore3 = true;
                game.career.title = "1,2,3호점 주인";
                game.annualIncome = Math.max(game.annualIncome + 50000000, 120000000);
                game.happiness += 25;
              }
            },
            {
              text: "안정적인 현금 보유를 위해 보류한다",
              result: "3호점 개점을 미루기로 결정했습니다.",
              apply: () => {}
            }
          ]
        }];
      }
    }
  }

  // 3. [직장 뉴스 정기 발생] 지정 계절 100% 보장
  if (typeof getRandomJobNewsByProbability === "function" && game.jobKey) {
    if (game.seasonIndex === game.newsSeasonInYear) {
      const jobNews = getRandomJobNewsByProbability(game.jobKey);
      if (jobNews) {
        return [{
          id: "job_probability_news",
          type: `직장 뉴스 · ${jobNews.tier || "이슈"}`,
          title: `🏢 [${game.job}] ${jobNews.title}`,
          desc: jobNews.desc,
          ok: () => true,
          choices: [{
            text: "현안 대응 및 결과 확인",
            result: "",
            apply: function() { this.result = jobNews.apply(game, won); }
          }]
        }];
      }
    }
  }

  // 4. [여행 이벤트] 4년 연속 미발생 시 5년째 여름 강제 출현
  if (game.yearsWithoutTravelEvent >= 4 && game.seasonIndex === 1) {
    game.hasTravelOccurredThisYear = true;
    return [createTravelEventObj(currentSeason)];
  }

  // 5. [질병 이벤트] 건강 추첨 최우선 발동
  const diseaseEvent = checkHealthDiseaseEvent();
  if (diseaseEvent) {
    return [diseaseEvent];
  }

  const e = [];

  // [직장 뉴스 추가 발생 기회] 직장 뉴스의 출현 비중 확대 (35% 확률로 일반 풀 진입)
  if (typeof getRandomJobNewsByProbability === "function" && game.jobKey && Math.random() < 0.35) {
    const jobNews = getRandomJobNewsByProbability(game.jobKey);
    if (jobNews) {
      e.push({
        id: "job_probability_news_extra",
        type: `직장 소식 · ${jobNews.tier || "현안"}`,
        title: `🏢 [${game.job}] ${jobNews.title}`,
        desc: jobNews.desc,
        ok: () => true,
        choices: [{
          text: "업무 확인 및 결과 수용",
          result: "",
          apply: function() { this.result = jobNews.apply(game, won); }
        }]
      });
    }
  }

  // [A] 자동차 노후화 및 강제 폐차 시스템
  if (game.assets.car > 0) {
    const isOld15 = game.carHoldingYears >= 15;
    const isCheck3 = game.carCheckCount >= 2;

    if (isOld15 || isCheck3) {
      e.push({
        id: "car_scrap_event", type: "차량 폐차", title: `🚨 ${currentSeason} 자동차 점검 불가 및 강제 폐차`,
        desc: `운행 연수가 ${game.carHoldingYears}년에 달하고 누적 정비 불능 상태에 도달했습니다. 정비소 최종 판정으로 차량을 강제 폐차(말소) 처리합니다. (잔존가치 전액 소멸)`,
        ok: () => true,
        choices: [
          {
            text: "폐차 인수증 수령 및 폐차 완료 (차량 소멸)",
            result: "",
            apply: function() {
              game.assets.car = 0;
              game.car = { ...carLevels[0] };
              game.carHoldingYears = 0;
              game.carCheckCount = 0;
              game.stress = clamp(game.stress + 15);
              this.result = "차량이 완전히 폐차되어 대중교통 이용 상태로 복귀했습니다. 차량 자산이 0원으로 소멸되었습니다.";
            }
          }
        ]
      });
    } else if (game.carHoldingYears >= 10) {
      e.push({
        id: "car_old_event", type: "차량 노후화", title: `🚗 ${currentSeason} 자동차 노후화 정기 점검`,
        desc: `현재 차량을 ${game.carHoldingYears}년째 운행 중입니다. 소음과 잔고장이 심해져 정밀 점검을 받습니다. (누적 3회 점검 시 정비 불가로 강제 폐차됩니다. 현재 ${game.carCheckCount + 1}/3회)`,
        ok: () => true,
        choices: [
          {
            text: "차량 상태 점검 및 수리 (스트레스 +10)",
            result: "",
            apply: function() {
              game.carCheckCount++;
              game.stress = clamp(game.stress + 10);
              game.carHoldingYears = 8;
              this.result = `임시 수리를 완료했습니다. (누적 점검 ${game.carCheckCount}/3회, 스트레스 +10)`;
            }
          }
        ]
      });
    }
  }

  // [B] 이혼 이벤트
  if (game.married && !game.divorced) {
    const yearsWithoutTravel = game.year - (game.lastTravelYear || game.marriageYear || game.year);
    const isBroke = game.annualIncome < 25000000 || netWorth() < 0;

    if ((yearsWithoutTravel >= 10 && Math.random() < 0.50) || isBroke) {
      e.push({
        id: "divorce_crisis", type: "가정 불화", title: `💔 ${currentSeason} 성격 차이 및 이혼 소송 청구`,
        desc: yearsWithoutTravel >= 10
          ? `결혼 생활 중 여행을 다녀오지 않은 지 ${yearsWithoutTravel}년이 흘렀습니다. 배우자가 이혼을 청구하여 전 재산의 50%를 분할하게 됩니다.`
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

              this.result = `이혼 절차가 마무리되었습니다. 위자료 및 재산 분할로 현금 ${won(lostCash)}, 주식 ${won(lostStock)}이 지급되었습니다.`;
            }
          }
        ]
      });
    }
  }

  // [C] 봄 정기 연소득 통보
  if (game.seasonIndex === 0 && isSecondYearSpringOrLater) {
    const canNeg = jobs[game.jobKey] && jobs[game.jobKey].canNegotiate;
    const yearsInRank = game.career ? (game.career.yearsInCurrentRank || 0) : 0;
    const targetYears = game.career ? (game.career.promoTargetYears || 4) : 4;
    const isPromotable = PROMOTABLE_JOB_KEYS.includes(game.jobKey);

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

    const reasonNote = isPromotable 
      ? (yearsInRank < targetYears ? `현재 직급 근속 ${yearsInRank}년차 (승진 심사까지 최소 ${targetYears}년 필요)` : `현재 직급 근속 ${yearsInRank}년차이나 평판(${game.reputation}점)이 승진 기준(90점) 미달`)
      : `독자 연봉 체계 적용 직군`;

    e.push({
      id: "spring_salary_event", type: "연소득 통보", title: `🌸 봄 정기 연소득 통보 및 계약`,
      desc: `올해 책정된 연소득 ${won(game.annualIncome)}이 현금 자산으로 전액 입금되었습니다. (${reasonNote})`,
      ok: () => true,
      choices
    });
  }

  // [D] 통합 주식 투자 기회 이벤트 (발생 비율 15%로 축소)
  if (Math.random() < 0.15) {
    const tEvent = THEME_EVENTS[Math.floor(Math.random() * THEME_EVENTS.length)];
    const upSector = THEME_SECTORS.find(s => s.id === tEvent.up);
    const downSector = THEME_SECTORS.find(s => s.id === tEvent.down);

    let stockFluctuationLog = "";
    if (game.assets.stock > 0 && game.currentStockSector) {
      if (game.currentStockSector === tEvent.up) {
        const profit = Math.round(game.assets.stock * (tEvent.upRate / 100));
        game.assets.stock += profit;
        stockFluctuationLog = `<div style="color:#16a34a; margin-top:8px; font-weight:bold;">📈 [수혜 반영] 보유 중인 [${upSector.name}] 테마 주가가 +${tEvent.upRate}% 급등하여 ${won(profit)}의 평가 차익이 발생했습니다!</div>`;
      } else if (game.currentStockSector === tEvent.down) {
        const loss = Math.round(game.assets.stock * (tEvent.downRate / 100));
        game.assets.stock -= loss;
        stockFluctuationLog = `<div style="color:#dc2626; margin-top:8px; font-weight:bold;">📉 [악재 반영] 보유 중인 [${downSector.name}] 테마 주가가 -${tEvent.downRate}% 급락하여 ${won(loss)}의 손실을 입었습니다.</div>`;
      } else {
        const normalRate = -0.05 + Math.random() * 0.10;
        const diff = Math.round(game.assets.stock * normalRate);
        game.assets.stock += diff;
        stockFluctuationLog = `<div style="color:#6b7280; margin-top:8px;">보유 종목 변동: ${won(diff)}</div>`;
      }
    }

    const currentSecId = game.currentStockSector;
    const currentSecObj = THEME_SECTORS.find(s => s.id === currentSecId);
    const otherSectors = THEME_SECTORS.filter(s => s.id !== currentSecId);
    const shuffledOthers = [...otherSectors].sort(() => 0.5 - Math.random());
    const pickThree = shuffledOthers.slice(0, 3);
    const stockChoices = [];

    function applyStockReputationPenalty() {
      const penalty = Math.floor(Math.random() * 3) + 1;
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
            this.result = `보유 중인 [${currentSecObj.name}] 주식 1,000만원을 추가 매수했습니다.`;
          } else {
            this.result = "현금이 부족하여 매수하지 못했습니다.";
          }
        }
      });
    } else {
      const firstPick = shuffledOthers[3] || THEME_SECTORS[0];
      stockChoices.push({
        text: `${firstPick.name} 신규 매수 (1,000만)`,
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
        text: `${sec.name} ${game.assets.stock > 0 ? '갈아타기 (수수료 5%)' : '매수 (1,000만)'}`,
        result: "",
        apply: function() {
          if (game.assets.stock > 0) {
            const fee = Math.round(game.assets.stock * 0.05);
            game.assets.stock -= fee;
            game.currentStockSector = sec.id;
            applyStockReputationPenalty();
            this.result = `[${sec.name}]으로 갈아탔습니다. (교체 수수료 5%인 ${won(fee)} 차감)`;
          } else {
            if (game.cash >= 10000000) {
              game.cash -= 10000000;
              game.assets.stock += 10000000;
              game.currentStockSector = sec.id;
              applyStockReputationPenalty();
              this.result = `[${sec.name}] 주식 1,000만원을 매수했습니다.`;
            } else {
              this.result = "현금이 부족하여 거래를 진행하지 못했습니다.";
            }
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
    }

    stockChoices.push({
      text: "거래 안 함 (관망하고 넘어가기)",
      result: "이번 분기는 추가 거래 없이 시장 동향만 살피고 지나갑니다.",
      apply: () => {}
    });

    // 줄바꿈으로 수혜와 악재를 온전히 표시
    e.push({
      id: "stock_integrated_event", type: "증시 시황", 
      title: `📊 ${currentSeason} 증시 시황 및 투자 기회`,
      desc: `<div style="font-weight:bold; font-size:13px; margin-bottom:6px; color:#1e293b;">[시장 주요 현안] ${tEvent.title}</div>` +
            `<div style="font-size:12px; color:#475569; line-height:1.5; margin-bottom:8px;">${tEvent.desc}</div>` +
            `<div style="font-size:12px; line-height:1.6;">` +
            `• 📈 <b>급등 수혜</b>: ${upSector.name} (+${tEvent.upRate}% 상승)<br>` +
            `• 📉 <b>급락 악재</b>: ${downSector.name} (-${tEvent.downRate}% 하락)` +
            `</div>` +
            stockFluctuationLog,
      ok: () => true,
      choices: stockChoices
    });
  }

  // [E] 휴가 여행 (25%)
  if (Math.random() < 0.25) {
    game.hasTravelOccurredThisYear = true;
    e.push(createTravelEventObj(currentSeason));
  }

  // [F] 겨울 보너스
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
              if (rand < 0.10) rate = 0;
              else if (rand < 0.50) rate = 0.10;
              else if (rand < 0.80) rate = 0.20;
              else if (rand < 0.90) rate = 0.50;
              else if (rand < 0.97) rate = 1.00;
              else rate = 3.00;

              bonus = Math.round((game.annualIncome * rate) / 10000) * 10000;
              logDetail = rate > 0 
                ? `대기업 성과급 평가 결과, 연소득의 ${Math.round(rate * 100)}%인 ${won(bonus)}이 지급되었습니다!`
                : "경영 실적 기준 미달로 올해 성과급은 미지급되었습니다.";
            } else if (["civil", "teacher", "nurse", "police", "firefighter", "sme_corp"].includes(game.jobKey)) {
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

  // [G] 결혼 이벤트 (35세~45세 구간 30% 확률 등장)
  const isMarriageBlocked = game.year < (game.marriageBlockedUntilYear || 0);

  if (!game.married && !game.divorced && !game.declaredSolo && game.gender === "남성" && !isMarriageBlocked) {
    const hasNoCar = !game.car || game.car.level === 0 || game.assets.car <= 0;
    const isBelowStudio = !game.housing || (game.housing.level !== undefined ? game.housing.level < 2 : false);

    const isInMarriageAgeWindow = (game.age >= 35 && game.age <= 45);
    const passMarriageChance = !isInMarriageAgeWindow || (Math.random() < 0.30);

    if (passMarriageChance) {
      if (game.age >= 30 && (hasNoCar || isBelowStudio)) {
        e.push({
          id: "marriage_prerequisite_alert", type: "결혼 고민", title: `💭 ${currentSeason} 결혼에 대한 현실적인 장벽`,
          desc: `주변 친구들이 하나둘 가정을 꾸리고 있지만, 자동차와 주택문제로 청혼을 꺼리게 됩니다.`,
          ok: () => true,
          choices: [
            {
              text: "자산 마련에 더 집중하기로 다짐한다",
              result: "주택 UP이나 차량 UP을 통해 자립 기반을 마련한 뒤 결혼을 진행하기로 결심했습니다.",
              apply: () => { game.stress = clamp(game.stress + 5); }
            }
          ]
        });
      } else {
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
                  game.marriageDelayCount = 0;
                }
              },
              {
                text: "아직은 미룬다",
                result: "",
                apply: function() {
                  game.marriageDelayCount = (game.marriageDelayCount || 0) + 1;
                  if (game.marriageDelayCount >= 3) {
                    game.health = clamp(game.health - 10);
                    game.happiness = clamp(game.happiness - 25);
                    game.stress = clamp(game.stress + 20);
                    game.marriageBlockedUntilYear = game.year + 2;
                    game.marriageDelayCount = 0;
                    this.result = "💔 [이별] 계속해서 결혼을 미루자 지친 여자친구가 결국 이별을 통보하고 떠났습니다. (건강 -10, 행복 -25, 스트레스 +20, 2년간 결혼 이벤트 차단)";
                  } else {
                    this.result = `결혼을 미루고 일에 전념합니다. (결혼 미루기 ${game.marriageDelayCount}/3회)`;
                  }
                }
              }
            ]
          });
        }
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
  $("eventDescription").innerHTML = currentEvent.desc;
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

// -------------------------------------------------------------
// 턴 진행 (결혼 가중 생활비 및 치킨집 운영 연수 합산)
// -------------------------------------------------------------
function advanceYear() {
  if (!eventResolved) return;

  if (game.seasonIndex === 3) {
    let baseLivingCost = 0;

    if (game.isFirstYearWinter) {
      baseLivingCost = game.firstYearLivingCostFixed || 4000000;
      game.isFirstYearWinter = false;

      if (game.cash < 0) {
        const liquidLog = liquidateAssetsForCash();
        alert(`[첫해 겨울 생활비 지출]\n약정된 첫해 생활비 ${won(baseLivingCost)}이 차감되었습니다.\n${liquidLog}`);
      }
    } else {
      if (game.annualIncome > 0) {
        const livingRate = 0.40 + Math.random() * 0.10;
        baseLivingCost = Math.round((game.annualIncome * livingRate) / 10000) * 10000;
      }
    }

    // 결혼 다음 해부터 기본 생활비 1.5배 가중
    if (game.married && game.marriageYear && game.year > game.marriageYear) {
      baseLivingCost = Math.round(baseLivingCost * 1.5);
    }

    // 주거비(월세 연세 및 대출이자 연 4%) 합산
    let housingAnnualCost = 0;
    let housingCostNote = "";

    if (game.housing.type === "monthly" && game.housing.rent > 0) {
      housingAnnualCost = game.housing.rent * 12;
      housingCostNote = `월세 연 ${won(housingAnnualCost)}`;
    }
    if (game.debt > 0) {
      const loanInterest = Math.round(game.debt * 0.04);
      housingAnnualCost += loanInterest;
      housingCostNote += `${housingCostNote ? ' + ' : ''}대출이자(연4%) ${won(loanInterest)}`;
    }

    const totalAnnualLivingCost = baseLivingCost + housingAnnualCost;
    game.cash -= totalAnnualLivingCost;
    game.lastYearLivingCost = totalAnnualLivingCost;

    if (game.cash < 0) {
      const liquidLog = liquidateAssetsForCash();
      alert(`[겨울 연간 생활비 및 주거비 지출]\n총 지출: ${won(totalAnnualLivingCost)} (기본 생활비 ${won(baseLivingCost)}${game.married && game.year > game.marriageYear ? ' [결혼가중 1.5배]' : ''}${housingCostNote ? ' + ' + housingCostNote : ''})\n현금이 부족하여 자산이 처분되었습니다.\n${liquidLog}`);
    }

    // 전세 2년 갱신 시 5% 인상
    if (game.housing.type === "jeonse") {
      game.housingYearsInCurrent = (game.housingYearsInCurrent || 0) + 1;
      if (game.housingYearsInCurrent >= 2) {
        game.housingYearsInCurrent = 0;
        const increaseDeposit = Math.round(game.assets.house * 0.05);
        game.assets.house += increaseDeposit;
        game.housing.deposit += increaseDeposit;
        game.cash -= increaseDeposit;

        let jeonseLog = "";
        if (game.cash < 0) {
          jeonseLog = liquidateAssetsForCash();
        }
        alert(`[전세 계약 갱신]\n전세 계약 2년 경과로 보증금이 5% 인상되었습니다.\n추가 보증금 납입: -${won(increaseDeposit)}\n현재 전세 보증금: ${won(game.assets.house)}${jeonseLog ? '\n' + jeonseLog : ''}`);
      }
    } else {
      game.housingYearsInCurrent = 0;
    }

    if (game.age >= 60) { endGame(); return; }
    game.age++;
    game.year++;
    game.seasonIndex = 0;

    // 치킨집 매장별 운영 연수 증가
      if (game.jobKey === "entrepreneur") {
      game.chickenStore1Years = (game.chickenStore1Years || 0) + 1;
      if (game.hasOpenedStore2) {
        game.chickenStore2Years = (game.chickenStore2Years || 0) + 1;
      }
      if (game.hasOpenedStore3) {
        game.chickenStore3Years = (game.chickenStore3Years || 0) + 1; // [추가] 3호점 운영 누적
      }
    }

    // 승진 연차 증가
    if (game.career && game.career.yearsInCurrentRank !== undefined) {
      game.career.yearsInCurrentRank++;
    }

    if (game.hasTravelOccurredThisYear) {
      game.yearsWithoutTravelEvent = 0;
    } else {
      game.yearsWithoutTravelEvent = (game.yearsWithoutTravelEvent || 0) + 1;
    }
    game.hasTravelOccurredThisYear = false;
    game.newsSeasonInYear = Math.floor(Math.random() * 4);

    if (game.assets.car > 0) {
      game.carHoldingYears = (game.carHoldingYears || 0) + 1;
    } else {
      const oldStress = game.stress;
      const noCarStress = Math.floor(Math.random() * 10) + 1;
      game.stress = clamp(game.stress + noCarStress);

      const prevBracket = Math.floor(oldStress / 20);
      const newBracket = Math.floor(game.stress / 20);
      if (newBracket > prevBracket) {
        const damage = (newBracket - prevBracket) * 10;
        game.health = clamp(game.health - damage);
      }
    }

    const repIncrease = Math.floor(Math.random() * 10) + 1;
    game.reputation = clamp(game.reputation + repIncrease);

    if (game.jobKey !== "unemployed") {
      if (game.jobKey === "factory_worker") {
        if (Math.random() >= 0.5) {
          game.annualIncome = Math.round((game.annualIncome * 1.03) / 10000) * 10000;
        }
      } else if (["developer", "large_corp", "researcher", "large_factory"].includes(game.jobKey)) {
        const hikeRate = 0.05 + Math.random() * 0.02;
        game.annualIncome = Math.round((game.annualIncome * (1 + hikeRate)) / 10000) * 10000;
      } else if (["civil", "teacher", "nurse", "police", "firefighter", "sme_corp"].includes(game.jobKey)) {
        const hikeRate = 0.02 + Math.random() * 0.02;
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

// -------------------------------------------------------------
// UI 렌더링
// -------------------------------------------------------------
function updateUI() {
  $("ageText").textContent = game.age;
  $("yearText").textContent = `${game.year} ${SEASONS[game.seasonIndex]}`;
  $("jobText").textContent = `${game.job} (${game.currentRegion})`;
  $("careerText").textContent = `${currentCareerTitle()} · ${game.education}`;
  $("incomeText").textContent = won(game.annualIncome);
  $("cumIncomeText").textContent = `생애소득 ${won(game.cumulativeIncome)}`;
  $("housingText").textContent = `${game.housing.name} (${game.currentRegion})`;
  $("netWorthText").textContent = `순자산 ${won(netWorth())}`;
  $("carText").textContent = `${game.car.name} (${won(game.assets.car)})`;

  $("familyText").textContent = game.divorced ? "돌싱" : (game.married ? (game.children ? `배우자·자녀 ${game.children}명` : "기혼") : "미혼");
  $("marriageStateText").textContent = `병역: ${game.military}`;

  $("healthText").textContent = game.health;
  $("happinessText").textContent = game.happiness;
  $("stressText").textContent = game.stress;
  $("repText").textContent = game.reputation;

  const currentSectorObj = THEME_SECTORS.find(s => s.id === game.currentStockSector);
  const stockSectorInfo = game.assets.stock > 0 ? (currentSectorObj ? `[${currentSectorObj.name}]` : "[일반]") : "없음";
  $("stockAsset").textContent = `${won(game.assets.stock)} ${game.assets.stock > 0 ? stockSectorInfo : ''}`;
  $("houseAsset").textContent = won(game.assets.house);
  $("carAsset").textContent = won(game.assets.car);
  $("debtAsset").textContent = won(game.debt);
  $("cashAsset").textContent = won(game.cash);
  $("totalAsset").textContent = won(totalAssets());
  if ($("totalAssetSub")) $("totalAssetSub").textContent = won(totalAssets());

  if ($("careerDetail")) {
    const isGov = jobs[game.jobKey] && jobs[game.jobKey].isGov;
    const canNeg = jobs[game.jobKey] && jobs[game.jobKey].canNegotiate;
    const isPromotable = PROMOTABLE_JOB_KEYS.includes(game.jobKey);
    const promoInfo = isPromotable 
      ? `근속 ${game.career.yearsInCurrentRank || 0}년차 (승진요건: ${game.career.promoTargetYears || 4}년 이상 & 평판 90점 이상)`
      : `독자 소득 시스템 적용`;

    $("careerDetail").innerHTML = `
      <div><span>학력 / 병역 / 거주</span><strong>${game.education} · ${game.military} · ${game.currentRegion}</strong></div>
      <div><span>현재 평판</span><strong>⭐ ${game.reputation}점 ${game.reputation >= 90 ? '(승진 유력)' : (game.reputation < 50 ? '(해고 위험)' : '(보통)')}</strong></div>
      <div><span>현재 연소득</span><strong>${won(game.annualIncome)} ${isGov ? '(호봉제)' : (canNeg ? '(협상가능)' : '')}</strong></div>
      <div><span>승진 현황</span><strong style="font-size:12px">${promoInfo}</strong></div>
    `;
  }

  updateActionButtonsLabel();
  renderHistory();
  renderTimeline();
  drawChart("assetChart");
}

function updateActionButtonsLabel() {
  const regionalHousing = getRegionalHousingLevels(game.currentRegion);
  const curHLevel = game.housing.level !== undefined ? game.housing.level : 0;
  const houseUpBtn = $("houseUpBtn");
  const houseDownBtn = $("houseDownBtn");

  if (houseUpBtn) {
    if (curHLevel >= regionalHousing.length - 1) {
      houseUpBtn.textContent = "🏠 주택 UP (최고 등급)";
      houseUpBtn.disabled = true;
    } else {
      const nextH = regionalHousing[curHLevel + 1];
      houseUpBtn.textContent = `🏠 주택 UP (${nextH.name})`;
      houseUpBtn.disabled = false;
    }
  }

  if (houseDownBtn) {
    if (curHLevel <= 0) {
      houseDownBtn.textContent = "📉 주택 DOWN (최저 등급)";
      houseDownBtn.disabled = true;
    } else {
      const prevH = regionalHousing[curHLevel - 1];
      houseDownBtn.textContent = `📉 주택 DOWN (${prevH.name})`;
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
      <td style="color:#dc2626">${h.debtAsset > 0 ? won(h.debtAsset) : '-'}</td>
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
      <div style="margin-top:6px">연소득: ${won(h.income)} ${h.livingCost > 0 ? `| 연지출: -${won(h.livingCost)}` : ''} | 주거: ${h.housing} | 대출: ${won(h.debtAsset)} | 총자산: ${won(h.totalAsset)} | 순자산: ${won(h.netWorth)}</div>
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

// -------------------------------------------------------------
// 주식 모달 제어
// -------------------------------------------------------------
function openStockModal() {
  const modal = $("stockModal");
  if (!modal) return;

  const currentSectorObj = THEME_SECTORS.find(s => s.id === game.currentStockSector);
  $("currentStockModalInfo").textContent = game.assets.stock > 0
    ? `현재 보유: [${currentSectorObj?.name || '일반'}] ${won(game.assets.stock)} (1개 테마만 보유 가능)`
    : "현재 보유 주식 없음 (1,000만원 단위로 매수 가능)";

  const listEl = $("gicsSectorList");
  listEl.innerHTML = "";

  THEME_SECTORS.forEach(sec => {
    const item = document.createElement("div");
    item.className = "sector-trade-item";

    const isCurrent = game.currentStockSector === sec.id;
    item.innerHTML = `
      <div>
        <strong>${sec.name} ${isCurrent ? '<span style="color:#2563eb">(보유중)</span>' : ''}</strong>
        <small>${sec.desc}</small>
      </div>
      <button class="primary" data-id="${sec.id}">
        ${isCurrent ? '추가 매수 (1,000만)' : (game.assets.stock > 0 ? '갈아타기 (수수료 5%)' : '매수 (1,000만)')}
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
  const sec = THEME_SECTORS.find(s => s.id === sectorId);

  if (game.assets.stock > 0 && game.currentStockSector === sectorId) {
    if (game.cash < 10000000) return alert("현금 1,000만원이 필요합니다.");
    game.cash -= 10000000;
    game.assets.stock += 10000000;
    const penalty = Math.floor(Math.random() * 3) + 1;
    game.reputation = clamp(game.reputation - penalty);
    updateUI();
    openStockModal();
    return;
  }

  if (game.assets.stock > 0 && game.currentStockSector !== sectorId) {
    const fee = Math.round(game.assets.stock * 0.05);
    const oldSecName = THEME_SECTORS.find(s => s.id === game.currentStockSector)?.name;
    if (!confirm(`[${oldSecName}]에서 [${sec.name}]으로 갈아타시겠습니까?\n\n수수료 5%(${won(fee)})가 차감됩니다.`)) {
      return;
    }
    game.assets.stock -= fee;
    game.currentStockSector = sectorId;
    const penalty = Math.floor(Math.random() * 3) + 1;
    game.reputation = clamp(game.reputation - penalty);
    updateUI();
    openStockModal();
    return;
  }

  if (game.cash < 10000000) return alert("현금 1,000만원이 필요합니다.");
  game.cash -= 10000000;
  game.assets.stock += 10000000;
  game.currentStockSector = sectorId;
  const penalty = Math.floor(Math.random() * 3) + 1;
  game.reputation = clamp(game.reputation - penalty);
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

// -------------------------------------------------------------
// 84㎡ 아파트 매매 방식 모달 제어 및 주택 UP / DOWN
// -------------------------------------------------------------
function openHouseModal(nextHouse, refundDeposit, loanMax, downPayment, cashNeededWithLoan, cashNeededFull) {
  const modal = $("houseModal");
  if (!modal) return;

  $("houseModalDesc").textContent = `[${nextHouse.name}] 매매가: ${won(nextHouse.houseValue)} (기존 보증금 ${won(refundDeposit)} 환급 예정)`;
  $("modalLoanText").textContent = `${Math.round(nextHouse.loanRate * 100)}% 대출(${won(loanMax)}, 연 4% 이자) | 필요현금: ${won(cashNeededWithLoan)}`;

  $("houseLoanBtn").onclick = () => {
    if (game.cash < cashNeededWithLoan) {
      alert(`대출 매매를 위한 현금이 부족합니다. (최소 ${won(cashNeededWithLoan)} 필요)`);
      return;
    }
    game.cash += refundDeposit;
    game.cash -= downPayment;
    game.assets.house = nextHouse.houseValue;
    game.debt += loanMax;
    game.housing = { ...nextHouse, owned: true, deposit: 0 };
    game.happiness = clamp(game.happiness + 15);
    closeHouseModal();
    updateUI();
  };

  $("houseFullBtn").onclick = () => {
    if (game.cash < cashNeededFull) {
      alert(`일시불 매매를 위한 현금이 부족합니다. (최소 ${won(cashNeededFull)} 필요)`);
      return;
    }
    game.cash += refundDeposit;
    game.cash -= nextHouse.houseValue;
    game.assets.house = nextHouse.houseValue;
    game.housing = { ...nextHouse, owned: true, deposit: 0 };
    game.happiness = clamp(game.happiness + 20);
    closeHouseModal();
    updateUI();
  };

  $("closeHouseModalBtn").onclick = () => closeHouseModal();
  modal.classList.remove("hidden");
}

function closeHouseModal() {
  const modal = $("houseModal");
  if (modal) modal.classList.add("hidden");
}

function houseUp() {
  const regionalHousing = getRegionalHousingLevels(game.currentRegion);
  const curLevel = game.housing.level !== undefined ? game.housing.level : 0;
  if (curLevel >= regionalHousing.length - 1) return alert("이미 최고 등급 주택에 거주 중입니다.");

  const next = regionalHousing[curLevel + 1];
  const refundDeposit = game.housing.deposit || 0;

  if (next.name === "84㎡ 아파트 자가") {
    const loanMax = Math.round(next.houseValue * next.loanRate);
    const downPayment = next.houseValue - loanMax;
    const cashNeededWithLoan = downPayment - refundDeposit;
    const cashNeededFull = next.houseValue - refundDeposit;

    openHouseModal(next, refundDeposit, loanMax, downPayment, cashNeededWithLoan, cashNeededFull);
    return;
  } 
  else if (next.houseValue > 0) {
    const cashNeeded = next.houseValue - refundDeposit;
    const confirmMsg = `[${next.name} 일시불 매매 견적]\n\n` +
      `매매가: ${won(next.houseValue)} (대출 불가, 일시불 전액 납부)\n` +
      `기존 보증금 환급: +${won(refundDeposit)}\n` +
      `실제 필요 현금: ${won(cashNeeded)}\n\n` +
      `매매를 진행하시겠습니까?`;

    if (!confirm(confirmMsg)) return;

    if (game.cash < cashNeeded) {
      return alert(`현금이 부족합니다. 최소 ${won(cashNeeded)}의 현금이 필요합니다.`);
    }

    game.cash += refundDeposit;
    game.cash -= next.houseValue;
    game.assets.house = next.houseValue;
    game.housing = { ...next, owned: true, deposit: 0 };
    game.happiness = clamp(game.happiness + 25);
  } 
  else {
    const diff = next.deposit - refundDeposit;
    const confirmMsg = `[주택 UP 견적]\n\n` +
      `대상 주택: ${next.name} (보증금 ${won(next.deposit)}${next.rent ? ', 월세 ' + won(next.rent) : ''})\n` +
      `추가 필요 보증금: ${won(diff)}\n\n` +
      `상향 이사를 진행하시겠습니까?`;

    if (!confirm(confirmMsg)) return;

    if (game.cash < diff) {
      return alert(`보증금 증액을 위해 현금 ${won(diff)}이 필요합니다.`);
    }
    game.cash -= diff;
    game.assets.house = next.deposit;
    game.housing = { ...next, owned: false };
    game.happiness = clamp(game.happiness + 8);
  }

  updateUI();
}

function houseDown() {
  const regionalHousing = getRegionalHousingLevels(game.currentRegion);
  const curLevel = game.housing.level !== undefined ? game.housing.level : 0;
  if (curLevel <= 0) return alert("이미 가장 저렴한 고시원에 거주 중입니다.");

  const prev = regionalHousing[curLevel - 1];

  if (game.housing.type === "owned") {
    const sellPrice = Math.round(game.assets.house * 0.95);
    const netCash = sellPrice - game.debt;
    const finalCashInHand = netCash - prev.deposit;

    const confirmMsg = `[주택 DOWN 정산]\n\n` +
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
  } else {
    const refund = (game.housing.deposit || 0) - prev.deposit;
    const confirmMsg = `[주택 DOWN 정산]\n\n이전 대상: ${prev.name}\n보증금 환급액: ${won(refund)}\n\n하향 이사를 진행하시겠습니까?`;
    if (!confirm(confirmMsg)) return;

    game.cash += refund;
    game.assets.house = prev.deposit;
    game.housing = { ...prev, owned: false };
  }
  updateUI();
}

function carUp() {
  const curLevel = game.car.level !== undefined ? game.car.level : (game.assets.car > 0 ? 1 : 0);
  if (curLevel >= carLevels.length - 1) return alert("이미 최고급 플래그십 차량을 보유 중입니다.");

  const next = carLevels[curLevel + 1];
  const tradeInVal = Math.round(game.assets.car * 0.9);
  const needCash = next.value - tradeInVal;

  const confirmMsg = `[차량 UP 견적]\n\n` +
    `현재 차량 처분액: ${won(tradeInVal)} (자산가의 90% 보상)\n` +
    `신차 가격: ${next.name} (${won(next.value)})\n` +
    `추가 필요 현금: ${won(needCash)}\n\n` +
    `차량을 업그레이드하시겠습니까?`;

  if (!confirm(confirmMsg)) return;

  if (game.cash < needCash) {
    return alert(`현금이 부족합니다. 추가로 ${won(needCash)}이 필요합니다.`);
  }

  game.cash -= needCash;
  game.assets.car = next.value;
  game.car = { ...next };
  game.carHoldingYears = 0;
  game.carCheckCount = 0;
  game.happiness = clamp(game.happiness + 8);
  updateUI();
}

function carDown() {
  const curLevel = game.car.level !== undefined ? game.car.level : (game.assets.car > 0 ? 1 : 0);
  if (curLevel <= 0) return alert("현재 차량이 없어 더 낮출 수 없습니다.");

  const prev = carLevels[curLevel - 1];
  const sellVal = Math.round(game.assets.car * 0.9);
  const getCash = sellVal - prev.value;

  const confirmMsg = `[차량 DOWN 정산]\n\n` +
    `기존 차량 처분액: ${won(sellVal)}\n` +
    `하향 대상: ${prev.name} (${won(prev.value)})\n` +
    `최종 현금 확보액: ${won(getCash)}\n\n` +
    `차량을 다운그레이드하시겠습니까?`;

  if (!confirm(confirmMsg)) return;

  game.cash += getCash;
  game.assets.car = prev.value;
  game.car = { ...prev };
  game.carHoldingYears = 0;
  game.carCheckCount = 0;
  updateUI();
}

function handleHomeReset() {
  if (confirm("다시 인생을 처음부터 시작하겠습니까?")) {
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
  $("endingTitle").textContent = `${game.name}님의 60년 인생 결산`;
  $("endingMessage").textContent = `[${game.education} / ${game.military}]으로 출발하여 [${game.currentRegion}]에서 60세까지 달려온 총결산 리포트입니다.`;

  const stats = [
    { label: "💼 최종 커리어 & 거주지", val: `${game.job} (${currentCareerTitle()})`, sub: `거주지: ${game.currentRegion} | 학력: ${game.education}` },
    { label: "💰 최종 순자산", val: won(nw), sub: `총자산: ${won(totalAssets())} (부채 ${won(game.debt)})`, highlight: true },
    { label: "💵 누적 생애소득", val: won(game.cumulativeIncome), sub: `최종 연소득: ${won(game.annualIncome)}` },
    { label: "🏠 최종 주거 및 차량", val: `${game.housing.name}`, sub: `차량: ${game.car.name} (${won(game.assets.car)})` },
    { label: "👨‍👩‍👧 가족 관계", val: game.divorced ? "돌싱" : (game.married ? "화목한 기혼 가정" : "자유로운 솔로"), sub: `행복: ${game.happiness}점 / 건강: ${game.health}점` },
    { label: "⭐ 최종 평판 & 명예", val: `${game.reputation}점`, sub: game.reputation >= 90 ? "사회적 존경을 받는 인물" : "성실하게 살아온 시민" }
  ];

  $("endingStats").innerHTML = stats.map(x => `
    <div class="stat-card ${x.highlight ? 'highlight-card' : ''}">
      <span>${x.label}</span>
      <strong>${x.val}</strong>
      <small>${x.sub}</small>
    </div>
  `).join("");

  setTimeout(() => drawChart("endingChart"), 50);
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

// -------------------------------------------------------------
// 3열 슬롯머신 룰렛 시스템
// -------------------------------------------------------------
let tripleSlotState = {
  spinning: false,
  base: null,
  target1: null,
  target2: null,
  target3Key: null
};

function setupReelTrack(reelTrackId, list, targetLabel, getLabel, getDesc) {
  const track = $(reelTrackId);
  const items = [];
  for (let i = 0; i < 5; i++) {
    for (const it of list) items.push(it);
  }
  const midIndex = list.length * 3 + Math.floor(list.length / 2);
  const targetItem = list.find(x => getLabel(x) === targetLabel) || list[0];
  items[midIndex] = targetItem;

  track.innerHTML = items.map(item => `
    <div class="reel-item" data-label="${getLabel(item)}">
      ${getLabel(item)}
      <small>${getDesc(item)}</small>
    </div>
  `).join("");

  track.style.transition = "none";
  track.style.transform = "translateY(0px)";
}

function startTripleSlotRoulette(baseData) {
  tripleSlotState.base = baseData;
  tripleSlotState.spinning = false;

  const educations = [
    { title: "고졸", addAge: 0 },
    { title: "전문대졸 (2년제)", addAge: 2 },
    { title: "대졸 (4년제)", addAge: 4 },
    { title: "대학원 졸업", addAge: 6 }
  ];

  let miliTypes = [{ title: "해당 없음", addAge: 0, penaltyHealth: 0, isDischarged: false }];
  if (baseData.gender === "남성") {
    miliTypes = [
      { title: "육군 만기 전역", addAge: 2, penaltyHealth: 0, isDischarged: true },
      { title: "해군 만기 전역", addAge: 2, penaltyHealth: 0, isDischarged: true },
      { title: "공군 만기 전역", addAge: 2, penaltyHealth: 0, isDischarged: true },
      { title: "병역 면제", addAge: 0, penaltyHealth: 10, isDischarged: false }
    ];
  }

  const combos = [];
  educations.forEach(e => {
    miliTypes.forEach(m => {
      combos.push({
        edu: e.title,
        mili: m.title,
        isDischarged: m.isDischarged,
        startAge: 20 + e.addAge + m.addAge,
        initialHealth: 90 - m.penaltyHealth,
        label: `${e.title} · ${m.title}`,
        desc: `${20 + e.addAge + m.addAge}세 출발`
      });
    });
  });

  const chosen1 = combos[Math.floor(Math.random() * combos.length)];
  tripleSlotState.target1 = chosen1;

  const chosen2 = REGIONS[Math.floor(Math.random() * REGIONS.length)];
  tripleSlotState.target2 = chosen2;

  const edu = chosen1.edu;
  const reg = chosen2;
  const mili = chosen1.mili;

  const eligibleJobKeys = Object.keys(jobs).filter(k => {
    if (k === "unemployed") return false;
    if (["large_corp", "researcher"].includes(k) && reg !== "경기도") return false;
    if (["sme_corp", "celebrity"].includes(k) && !["서울", "경기도"].includes(reg)) return false;
    if (["developer", "finance"].includes(k) && reg !== "서울") return false;
    if (k === "large_factory" && reg !== "경상도") return false;

    if (["developer", "doctor", "researcher"].includes(k) && edu !== "대학원 졸업") return false;
    if (["large_corp", "professional", "teacher", "finance"].includes(k) && !["대졸 (4년제)", "대학원 졸업"].includes(edu)) return false;
    if (["large_factory", "factory_worker"].includes(k) && edu !== "고졸") return false;
    if (["police", "firefighter"].includes(k) && mili === "병역 면제") return false;

    return true;
  });

  if (eligibleJobKeys.length === 0) eligibleJobKeys.push("entrepreneur");
  const chosen3Key = eligibleJobKeys[Math.floor(Math.random() * eligibleJobKeys.length)];
  tripleSlotState.target3Key = chosen3Key;

  setupReelTrack("reelTrack1", combos, chosen1.label, x => x.label, x => x.desc);
  setupReelTrack("reelTrack2", REGIONS.map(r => ({ label: r, desc: "독립 거주지" })), chosen2, x => x.label, x => x.desc);
  setupReelTrack("reelTrack3", eligibleJobKeys.map(k => ({ key: k, label: jobs[k].name, desc: jobs[k].desc.slice(0, 16) + '...' })), jobs[chosen3Key].name, x => x.label, x => x.desc);

  $("reelStatus1").textContent = "대기 중";
  $("reelStatus2").textContent = "대기 중";
  $("reelStatus3").textContent = "대기 중";
  $("rouletteResult").classList.add("hidden");
  $("rouletteConfirmBtn").classList.add("hidden");
  $("rouletteStartBtn").classList.remove("hidden");

  show("rouletteScreen");
}

async function spinReel(trackId, targetLabel, duration) {
  const track = $(trackId);
  const items = [...track.querySelectorAll(".reel-item")];
  let targetIndex = items.findIndex((el, idx) => idx >= items.length / 2 && el.getAttribute("data-label") === targetLabel);
  if (targetIndex === -1) targetIndex = Math.floor(items.length / 2);

  const itemHeight = 76;
  const targetY = -(targetIndex * itemHeight);

  track.style.transition = `transform ${duration}s cubic-bezier(0.15, 0.85, 0.2, 1)`;
  track.style.transform = `translateY(${targetY}px)`;

  await new Promise(r => setTimeout(r, duration * 1000));
}

async function runTripleSlotSpin() {
  if (tripleSlotState.spinning) return;
  tripleSlotState.spinning = true;
  $("rouletteStartBtn").classList.add("hidden");

  $("reelStatus1").textContent = "🌀 회전 중...";
  $("reelStatus2").textContent = "🌀 회전 중...";
  $("reelStatus3").textContent = "🌀 회전 중...";

  const p1 = spinReel("reelTrack1", tripleSlotState.target1.label, 2.5).then(() => {
    $("reelStatus1").textContent = `✓ [${tripleSlotState.target1.label}]`;
  });
  const p2 = spinReel("reelTrack2", tripleSlotState.target2, 3.8).then(() => {
    $("reelStatus2").textContent = `✓ [${tripleSlotState.target2}]`;
  });
  const p3 = spinReel("reelTrack3", jobs[tripleSlotState.target3Key].name, 5.0).then(() => {
    $("reelStatus3").textContent = `✓ [${jobs[tripleSlotState.target3Key].name}]`;
  });

  await Promise.all([p1, p2, p3]);

  const t1 = tripleSlotState.target1;
  const t2 = tripleSlotState.target2;
  const t3 = jobs[tripleSlotState.target3Key];

  $("rouletteResultJob").textContent = t3.name;
  $("rouletteResultCareer").textContent = `${t1.label} | ${t2} 거주 | ${t1.startAge}세 출발`;
  $("rouletteResultIncome").textContent = t3.desc;
  $("rouletteResultReason").textContent = `학력 [${t1.edu}] 및 거주 지역 [${t2}] 조건에 최적화된 출발 직무가 배정되었습니다.`;
  $("rouletteResult").classList.remove("hidden");
  $("rouletteConfirmBtn").classList.remove("hidden");

  tripleSlotState.spinning = false;
}

function finalizeGameStart() {
  const finalConfig = {
    name: tripleSlotState.base.name,
    gender: tripleSlotState.base.gender,
    birthRegion: tripleSlotState.base.birthRegion,
    currentRegion: tripleSlotState.target2,
    education: tripleSlotState.target1.edu,
    military: tripleSlotState.target1.mili,
    isDischarged: tripleSlotState.target1.isDischarged,
    startAge: tripleSlotState.target1.startAge,
    initialHealth: tripleSlotState.target1.initialHealth,
    jobKey: tripleSlotState.target3Key
  };

  game = newGame(finalConfig);
  recalculateHousingAndLifestyle();
  recordHistory();
  show("gameScreen");
  updateUI();
  generateEvent();
}

// -------------------------------------------------------------
// 부트스트랩 및 이벤트 리스너 바인딩
// -------------------------------------------------------------
function setupApplication() {
  initBirthUI();

  const genderEl = $("playerGender");
  if (genderEl) {
    genderEl.addEventListener("change", () => {
      assignRandomName(genderEl.value);
      updateProfilePreview();
    });
  }

  const randomNameBtn = $("randomNameBtn");
  if (randomNameBtn) {
    randomNameBtn.onclick = (e) => {
      e.preventDefault();
      assignRandomName(genderEl ? genderEl.value : "남성");
      updateProfilePreview();
    };
  }

  ["playerName", "playerRegion", "playerGender", "playerBirthMonth", "playerBirthDay"].forEach(id => {
    const el = $(id);
    if (el) {
      el.addEventListener("input", updateProfilePreview);
      el.addEventListener("change", updateProfilePreview);
    }
  });

  const createBtn = $("createCharacterBtn");
  if (createBtn) {
    createBtn.onclick = () => {
      baseCreationData = {
        name: $("playerName").value.trim() || "플레이어",
        birthRegion: $("playerRegion").value,
        gender: $("playerGender").value,
        birth: getSelectedBirthDate()
      };
      startTripleSlotRoulette(baseCreationData);
    };
  }

  if ($("rouletteStartBtn")) $("rouletteStartBtn").onclick = runTripleSlotSpin;
  if ($("rouletteConfirmBtn")) $("rouletteConfirmBtn").onclick = finalizeGameStart;

  if ($("nextYearBtn")) $("nextYearBtn").onclick = () => { if (eventResolved) advanceYear(); };
  if ($("eventNextBtn")) $("eventNextBtn").onclick = advanceYear;
  if ($("lifeRecordBtn")) $("lifeRecordBtn").onclick = () => show("recordScreen");
  if ($("closeRecordBtn")) {
    $("closeRecordBtn").onclick = () => {
      if (game && game.age >= 60) show("endScreen");
      else show("gameScreen");
    };
  }

  if ($("endingViewRecordBtn")) $("endingViewRecordBtn").onclick = () => show("recordScreen");
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
