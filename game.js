const SAVE_KEY = "myLifePrototype_v21";
const START_YEAR = 2026;
const FIXED_BIRTH_YEAR = START_YEAR - 20;

const jobs = {
  employee:{id:"employee",name:"회사원",type:"private",desc:"기업의 직급과 성과에 따라 연봉이 상승하고 이직 기회가 생깁니다."},
  developer:{id:"developer",name:"개발자",type:"private",desc:"기술 레벨과 회사 규모, 이직에 따라 소득이 크게 달라집니다."},
  civil:{id:"civil",name:"공무원",type:"government",desc:"직급·호봉·근무평정에 따라 연간 총보수가 상승합니다."},
  teacher:{id:"teacher",name:"교사",type:"public",desc:"호봉과 경력에 따라 소득이 증가하며 교육 경력이 쌓입니다."},
  nurse:{id:"nurse",name:"간호사",type:"medical",desc:"임상 경력과 전문성에 따라 직급과 연봉이 상승합니다."},
  police:{id:"police",name:"경찰",type:"public",desc:"계급과 근속에 따라 보수가 증가하고 승진 경쟁이 존재합니다."},
  firefighter:{id:"firefighter",name:"소방관",type:"public",desc:"재난·안전 분야의 계급과 근속에 따라 보수가 증가합니다."},
  finance:{id:"finance",name:"금융직",type:"private",desc:"성과와 직급에 따라 연봉 변동이 크고 승진 경쟁이 치열합니다."},
  researcher:{id:"researcher",name:"연구원",type:"research",desc:"연구 경력과 전문성이 쌓이며 연구기관·기업으로 이직할 수 있습니다."},
  engineer:{id:"engineer",name:"기술직",type:"technical",desc:"현장 경험과 자격·기술 숙련도에 따라 소득이 증가합니다."},
  professional:{id:"professional",name:"전문직",type:"professional",desc:"전문자격과 경력에 따라 소득과 사회적 영향력이 크게 달라집니다."},
  entrepreneur:{id:"entrepreneur",name:"자영업자",type:"business",desc:"직급 대신 사업 규모·매출·순이익이 성장하는 사업가 커리어입니다."}
};

const careerTracks = {
  employee:{stages:[
    {id:"new",title:"신입사원",promotionYears:1},{id:"staff",title:"사원",promotionYears:2},
    {id:"assistant_manager",title:"대리",promotionYears:3},{id:"manager",title:"과장",promotionYears:4},
    {id:"deputy_manager",title:"차장",promotionYears:4},{id:"general_manager",title:"부장",promotionYears:5},
    {id:"executive",title:"임원",promotionYears:999}
  ],pay:[36000000,41000000,48000000,58000000,68000000,80000000,110000000]},
  developer:{stages:[
    {id:"junior",title:"주니어 개발자",promotionYears:2},{id:"developer",title:"개발자",promotionYears:3},
    {id:"senior",title:"시니어 개발자",promotionYears:4},{id:"lead",title:"테크 리드",promotionYears:4},
    {id:"principal",title:"Principal Engineer",promotionYears:5},{id:"director",title:"개발 책임자",promotionYears:999}
  ],pay:[42000000,54000000,72000000,90000000,115000000,145000000]},
  teacher:{stages:[
    {id:"new_teacher",title:"신규 교사",promotionYears:3},{id:"teacher",title:"교사",promotionYears:5},
    {id:"senior_teacher",title:"선임 교사",promotionYears:7},{id:"lead_teacher",title:"수석교사",promotionYears:999}
  ],pay:[39000000,48000000,60000000,72000000]},
  nurse:{stages:[
    {id:"staff_nurse",title:"간호사",promotionYears:3},{id:"charge_nurse",title:"책임간호사",promotionYears:4},
    {id:"head_nurse",title:"수간호사",promotionYears:5},{id:"nursing_manager",title:"간호관리자",promotionYears:999}
  ],pay:[39000000,50000000,65000000,82000000]},
  police:{stages:[
    {id:"constable",title:"순경",promotionYears:3},{id:"assistant_inspector",title:"경장",promotionYears:3},
    {id:"inspector",title:"경사",promotionYears:4},{id:"senior_inspector",title:"경위",promotionYears:5},
    {id:"chief_inspector",title:"경감",promotionYears:5},{id:"superintendent",title:"경정",promotionYears:6},
    {id:"senior_superintendent",title:"총경",promotionYears:999}
  ],pay:[38000000,43000000,50000000,58000000,70000000,85000000,105000000]},
  firefighter:{stages:[
    {id:"firefighter",title:"소방사",promotionYears:3},{id:"senior_firefighter",title:"소방교",promotionYears:3},
    {id:"fire_sergeant",title:"소방장",promotionYears:4},{id:"fire_lieutenant",title:"소방위",promotionYears:5},
    {id:"fire_captain",title:"소방경",promotionYears:5},{id:"fire_superintendent",title:"소방령",promotionYears:999}
  ],pay:[38000000,43000000,50000000,58000000,70000000,88000000]},
  finance:{stages:[
    {id:"analyst",title:"금융 사원",promotionYears:2},{id:"associate",title:"대리",promotionYears:3},
    {id:"manager",title:"과장",promotionYears:4},{id:"senior_manager",title:"차장",promotionYears:4},
    {id:"director",title:"부장",promotionYears:5},{id:"executive",title:"임원",promotionYears:999}
  ],pay:[45000000,60000000,78000000,98000000,125000000,180000000]},
  researcher:{stages:[
    {id:"junior",title:"연구원",promotionYears:3},{id:"researcher",title:"선임연구원",promotionYears:4},
    {id:"senior",title:"책임연구원",promotionYears:5},{id:"principal",title:"수석연구원",promotionYears:999}
  ],pay:[43000000,57000000,76000000,105000000]},
  engineer:{stages:[
    {id:"entry",title:"기술직 신입",promotionYears:2},{id:"skilled",title:"기술직",promotionYears:4},
    {id:"senior",title:"선임 기술자",promotionYears:5},{id:"master",title:"숙련 기술자",promotionYears:999}
  ],pay:[38000000,48000000,62000000,80000000]},
  professional:{stages:[
    {id:"trainee",title:"수습/초기 전문가",promotionYears:2},{id:"professional",title:"전문가",promotionYears:4},
    {id:"senior",title:"시니어 전문가",promotionYears:5},{id:"partner",title:"파트너/원장급",promotionYears:999}
  ],pay:[50000000,80000000,130000000,220000000]},
  entrepreneur:{stages:[
    {id:"startup",title:"초기 사업가"},{id:"small",title:"소규모 사업가"},
    {id:"growth",title:"성장 사업가"},{id:"owner",title:"사업주"},{id:"business_leader",title:"기업가"}
  ],pay:[30000000,45000000,70000000,110000000,180000000]},
  civil:{
    stages:[
      {rank:9,title:"9급 주무관",minYears:2},{rank:8,title:"8급 주무관",minYears:3},
      {rank:7,title:"7급 주무관",minYears:4},{rank:6,title:"6급 팀장",minYears:4},
      {rank:5,title:"5급 사무관",minYears:5},{rank:4,title:"4급 서기관",minYears:5},
      {rank:3,title:"3급 부이사관",minYears:6},{rank:2,title:"2급 이사관",minYears:6},
      {rank:1,title:"1급 관리관",minYears:999}
    ]
  }
};

const civilBaseMonthly = {
  9:[2133000,2147600,2168000,2194000,2226100,2264600,2309900,2367500,2456700,2542700,2624400,2705900,2783900,2859800,2932300,3002300,3070800,3134500,3197300,3257000,3313400],
  8:[2162100,2195700,2233800,2276600,2331700,2412900,2519600,2622400,2720300,2813000,2902700,2990300,3074500,3155100,3232400,3307100,3376800,3444300,3509300,3571100,3630200],
  7:[2317100,2367900,2423800,2485200,2567100,2682600,2798700,2915800,3027100,3133300,3233400,3331900,3425300,3514500,3599900,3680600,3758100,3832100,3902000,3968400,4031800],
  6:[2389500,2500700,2615200,2732400,2853100,2977100,3101500,3226200,3351300,3468700,3580000,3689600,3792700,3890000,3983600,4071300,4154900,4234100,4309100,4379600,4447600],
  5:[2896400,3013400,3135000,3261300,3390900,3523000,3657300,3793200,3929600,4066800,4195300,4319000,4436400,4545900,4649400,4746800,4838400,4924800,5006300,5082700,5154500],
  4:[3241200,3373500,3508000,3645700,3785200,3926200,4068300,4211100,4354500,4497700,4642100,4778100,4905100,5023800,5135500,5240900,5338700,5430100,5515500,5595300,5669800],
  3:[3781700,3921600,4065700,4210800,4358300,4507200,4658000,4809000,4961400,5113600,5266200,5424200,5571200,5707600,5833400,5950500,6059400,6160700,6254300,6342100,6423300],
  2:[4191600,4347100,4504700,4663700,4825100,4986500,5150200,5313600,5478200,5642500,5807700,5978600,6150500,6306200,6449600,6581000,6702000,6812700,6914900,7008100,7093400],
  1:[4656100,4819300,4986600,5157700,5333000,5510400,5690400,5871900,6056100,6241300,6426000,6617100,6809200,7001800,7170100,7319600,7452100,7570100,7675800,7770600,7857800]
};

const civilTotalCompFactor = {9:1.38,8:1.36,7:1.34,6:1.32,5:1.30,4:1.29,3:1.28,2:1.27,1:1.26};

const civilPromotionRules = {
  9:{minimumYears:2,baseChance:.48,nextRank:8},
  8:{minimumYears:3,baseChance:.38,nextRank:7},
  7:{minimumYears:4,baseChance:.27,nextRank:6},
  6:{minimumYears:4,baseChance:.18,nextRank:5},
  5:{minimumYears:5,baseChance:.12,nextRank:4},
  4:{minimumYears:5,baseChance:.08,nextRank:3},
  3:{minimumYears:6,baseChance:.05,nextRank:2},
  2:{minimumYears:6,baseChance:.03,nextRank:1},
  1:{minimumYears:999,baseChance:0,nextRank:null}
};

const regionJobWeights = {
  "서울":{finance:1.35,developer:1.30,professional:1.20,researcher:1.10,employee:1.15,civil:1.00},
  "경기도":{employee:1.20,developer:1.15,engineer:1.15,researcher:1.10,civil:1.05},
  "충청도":{researcher:1.35,engineer:1.20,employee:1.05,civil:1.10,teacher:1.10},
  "강원도":{civil:1.20,teacher:1.20,firefighter:1.15,police:1.10,employee:1.00},
  "전라도":{civil:1.15,teacher:1.15,professional:1.05,engineer:1.05,employee:1.00},
  "경상도":{engineer:1.30,employee:1.15,finance:1.05,police:1.10,civil:1.05},
  "제주도":{employee:1.10,professional:1.10,civil:1.15,entrepreneur:1.20}
};
const baseJobWeights = {
  employee:20,developer:11,civil:14,teacher:8,nurse:8,police:6,firefighter:5,
  finance:7,researcher:6,engineer:7,professional:4,entrepreneur:4
};
const jobCareerReasons = {
  employee:"기업 취업 시장과 일반적인 사회초년생 채용 기회가 연결되었습니다.",
  developer:"디지털 산업과 기술 수요가 당신의 경력 생성에 유리하게 작용했습니다.",
  civil:"안정적인 공공부문 진입 가능성이 높은 경력으로 생성되었습니다.",
  teacher:"교육 분야와 지역의 인력 수요가 반영되었습니다.",
  nurse:"의료·보건 분야의 지속적인 인력 수요가 반영되었습니다.",
  police:"공공안전 분야와 지역 수요가 반영되었습니다.",
  firefighter:"재난·안전 분야의 지역 수요가 반영되었습니다.",
  finance:"금융·기업 본사가 집중된 지역의 산업 구조가 반영되었습니다.",
  researcher:"연구기관·산업단지·대학 인접성이 반영되었습니다.",
  engineer:"제조·건설·기술 산업의 지역 수요가 반영되었습니다.",
  professional:"전문 서비스 시장과 자격 기반 진로 가능성이 반영되었습니다.",
  entrepreneur:"취업 대신 독립적인 사업 경로를 선택할 가능성이 생성되었습니다."
};
const careerLabels = {
  employee:"직급·성과형",developer:"기술 레벨·이직형",civil:"직급·호봉·승진형",
  teacher:"호봉·경력형",nurse:"임상경력·승진형",police:"계급·승진형",
  firefighter:"계급·승진형",finance:"성과·승진형",researcher:"연구경력형",
  engineer:"숙련·자격형",professional:"전문성·성과형",entrepreneur:"사업규모·순이익형"
};

const housingLevels = [
  {name:"원룸 월세",city:"지방 중소도시",minIncome:0,minNet:-1e12,houseValue:0},
  {name:"오피스텔 월세",city:"광역시",minIncome:32000000,minNet:30000000,houseValue:0},
  {name:"소형 아파트 전세",city:"수도권",minIncome:48000000,minNet:90000000,houseValue:0},
  {name:"84㎡ 아파트 전세",city:"수도권",minIncome:65000000,minNet:180000000,houseValue:0},
  {name:"84㎡ 아파트 자가",city:"수도권",minIncome:75000000,minNet:350000000,houseValue:450000000},
  {name:"대형 아파트 자가",city:"서울",minIncome:100000000,minNet:900000000,houseValue:1200000000},
  {name:"고급 아파트/주택",city:"서울",minIncome:180000000,minNet:2000000000,houseValue:2500000000}
];

const cars = [
  {name:"중고 경차",minIncome:0,minNet:-1e12,value:5000000},
  {name:"현대 아반떼급",minIncome:35000000,minNet:30000000,value:22000000},
  {name:"현대 쏘나타 / 기아 K5",minIncome:50000000,minNet:120000000,value:35000000},
  {name:"그랜저 / 중형 SUV",minIncome:70000000,minNet:300000000,value:55000000},
  {name:"GV70 / 팰리세이드급",minIncome:100000000,minNet:700000000,value:80000000},
  {name:"고급 세단 / 대형 SUV",minIncome:180000000,minNet:1800000000,value:130000000}
];

const SEASONS = ["봄", "여름", "가을", "겨울"];

let game=null, currentEvent=null, eventResolved=false;
const $=id=>document.getElementById(id);
const clamp=(v,a=0,b=100)=>Math.max(a,Math.min(b,Math.round(v)));
const won=v=>{const n=Math.round(v);if(Math.abs(n)>=1e8)return `${(n/1e8).toFixed(Math.abs(n)%1e8===0?0:1)}억원`;return `${Math.round(n/10000).toLocaleString("ko-KR")}만원`;};
const signedWon=v=>`${v>=0?"+":"-"}${won(Math.abs(v))}`;
const chance=p=>`${Math.round(p*100)}%`;

function initBirthUI() {
  const yearInput = $("playerBirthYear");
  const monthSelect = $("playerBirthMonth");
  const daySelect = $("playerBirthDay");

  if (!monthSelect || !daySelect) return;

  if (yearInput) {
    if (yearInput.tagName === "INPUT" || yearInput.tagName === "SELECT") {
      yearInput.value = `${FIXED_BIRTH_YEAR}년`;
    } else {
      yearInput.textContent = `${FIXED_BIRTH_YEAR}년`;
    }
  }

  monthSelect.innerHTML = "";
  for (let m = 1; m <= 12; m++) {
    const opt = document.createElement("option");
    const val = String(m).padStart(2, '0');
    opt.value = val;
    opt.textContent = `${m}월`;
    monthSelect.appendChild(opt);
  }

  function updateDays() {
    const selectedMonth = parseInt(monthSelect.value, 10) || 1;
    const lastDay = new Date(FIXED_BIRTH_YEAR, selectedMonth, 0).getDate();
    const currentDay = daySelect.value;

    daySelect.innerHTML = "";
    for (let d = 1; d <= lastDay; d++) {
      const opt = document.createElement("option");
      const val = String(d).padStart(2, '0');
      opt.value = val;
      opt.textContent = `${d}일`;
      daySelect.appendChild(opt);
    }

    if (currentDay && parseInt(currentDay, 10) <= lastDay) {
      daySelect.value = currentDay;
    } else {
      daySelect.value = "01";
    }
  }

  monthSelect.onchange = () => {
    updateDays();
    if (typeof updateProfilePreview === "function") updateProfilePreview();
  };

  daySelect.onchange = () => {
    if (typeof updateProfilePreview === "function") updateProfilePreview();
  };

  updateDays();
  if (typeof updateProfilePreview === "function") updateProfilePreview();
}

function getSelectedBirthDate() {
  const monthSelect = $("playerBirthMonth");
  const daySelect = $("playerBirthDay");
  
  const m = monthSelect ? monthSelect.value : "01";
  const d = daySelect ? daySelect.value : "01";
  return `${FIXED_BIRTH_YEAR}-${m}-${d}`;
}

function profileSeed(profile){
  const s=`${profile.name}|${profile.region}|${profile.gender}|${profile.birth}`;
  let h=2166136261;
  for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619);}
  return (h>>>0);
}
function seededRandom(seed){
  let x=seed>>>0;
  return function(){x+=0x6D2B79F5;let t=x;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return ((t^t>>>14)>>>0)/4294967296;}
}
function generateCareer(profile){
  const rng=seededRandom(profileSeed(profile));
  const region=regionJobWeights[profile.region]||{};
  const weights=Object.entries(baseJobWeights).map(([key,w])=>[key,w*(region[key]||1)]);
  const total=weights.reduce((a,x)=>a+x[1],0);
  let n=rng()*total, selected=weights[weights.length-1][0];
  for(const [key,w] of weights){n-=w;if(n<=0){selected=key;break;}}
  return {jobKey:selected,seed:profileSeed(profile),reason:jobCareerReasons[selected]};
}

function currentCareerTitle(){
  return game.career.title;
}

function currentAnnualPayForCareer(career){
  if(career.type==="civil"){
    const arr=civilBaseMonthly[career.rank]||civilBaseMonthly[9];
    const base=arr[Math.min((career.step||1)-1,arr.length-1)]*12;
    return Math.round(base*civilTotalCompFactor[career.rank]/10000)*10000;
  }
  if(career.type==="entrepreneur") return 30000000;
  const track=careerTracks[career.type]||careerTracks.employee;
  const base=track.pay?track.pay[career.index||0]||track.pay[0]:30000000;
  return Math.round(base*(1+Math.min((career.step||1)-1,8)*.035)/10000)*10000;
}

function currentAnnualPay(){
  if(game.jobKey==="civil"){
    const arr=civilBaseMonthly[game.career.rank]||civilBaseMonthly[9];
    const base=arr[Math.min(Math.max((game.career.step||1)-1,0),arr.length-1)]*12;
    const performanceFactor=game.career.performance==="excellent"?1.04:game.career.performance==="good"?1.02:game.career.performance==="poor"?.96:1;
    return Math.round(base*civilTotalCompFactor[game.career.rank]*performanceFactor/10000)*10000;
  }
  if(game.jobKey==="entrepreneur")return game.annualIncome||30000000;
  const track=careerTracks[game.jobKey]||careerTracks.employee;
  const idx=game.career.index||0;
  const base=track.pay?track.pay[idx]||track.pay[track.pay.length-1]:30000000;
  const step=game.career.step||1;
  return Math.round(base*(1+Math.min(step-1,8)*.035)/10000)*10000;
}

function newCareer(jobKey){
  if(jobKey==="civil")return {type:"civil",rank:9,step:1,title:"9급 주무관",yearsInRank:0,performance:"normal",political:null};
  if(jobKey==="entrepreneur")return {type:"entrepreneur",index:0,step:1,title:"초기 사업가",yearsInRank:0,businessLevel:1};
  const track=careerTracks[jobKey]||careerTracks.employee;
  const first=track.stages[0];
  return {type:jobKey,index:0,step:1,title:first.title,yearsInRank:0,performance:"normal", companySize:jobKey==="developer"?"중소기업":undefined};
}

function getCareerStartingIncome(jobKey, career){
  if(jobKey==="civil"){
    const arr=civilBaseMonthly[career.rank]||civilBaseMonthly[9];
    return Math.round(arr[0]*12*civilTotalCompFactor[career.rank]/10000)*10000;
  }
  const track=careerTracks[jobKey];
  if(track&&track.pay)return track.pay[career.index||0]||track.pay[0];
  return 30000000;
}

function newGame(name,jobKey){
  const career=newCareer(jobKey);
  const j=jobs[jobKey];
  const initialIncome=jobKey==="entrepreneur"?30000000:currentAnnualPayForCareer(career);
  return {
    name,age:20,year:START_YEAR,seasonIndex:0,jobKey,job:j.name,career,annualIncome:initialIncome,
    cash:10000000,assets:{house:0,car:5000000,stock:0,etc:0},debt:0,health:90,happiness:70,stress:25,
    married:false,children:0,spouseName:null,housing:{name:"원룸 월세",city:"지방 중소도시",owned:false},car:{name:"중고 경차",value:5000000},
    currentStockSector: null, // 한 번에 한 섹터의 주식만 보유 (예: "군사", "자원", "IT", "헬스케어" 등)
    lastHouseUpgradeYear:0,
    history:[],lastEvent:null,totalIncome:0,totalInvestmentProfit:0,totalBusinessProfit:0,yearCashFlow:0,careerHistory:[],
    jobChangeHistory:[]
  };
}

function totalAssets(){return game.cash+game.assets.house+game.assets.car+game.assets.stock+game.assets.etc;}
function netWorth(){return totalAssets()-game.debt;}
function livingCost(){let cost=4500000;if(game.married)cost+=1750000;cost+=game.children*1750000;if(game.housing.owned)cost+=1250000;if(game.assets.car>0)cost+=750000;return cost;}
function businessIncome(){const level=game.career.businessLevel||1;const base=(25000000+Math.random()*65000000)*(1+level*.22);const skill=(game.health+game.happiness-game.stress+100)/300;return Math.max(0,base*(.65+skill)-5000000-Math.random()*10000000);}
function updateMarket(){if(game.assets.stock<=0)return 0;let rate=-.05+Math.random()*.12;if(Math.random()<.08)rate-=.05;const change=game.assets.stock*rate;game.assets.stock+=change;game.totalInvestmentProfit+=change;return change;}

function recalculateLifestyle(){
  const nw=netWorth(),income=game.annualIncome;
  
  if(!game.housing.owned){
    let house=housingLevels[0];
    for(const h of housingLevels) if(income>=h.minIncome && nw>=h.minNet) house=h;
    game.housing={name:house.name,city:house.city,owned:false};
    game.assets.house=0;
  } else {
    game.assets.house *= 1 + (-.005 + Math.random()*.025);
  }

  let car=cars[0];
  for(const c of cars) if(income>=c.minIncome && nw>=c.minNet) car=c;
  if(car.value > game.assets.car) {
    game.car={name:car.name,value:car.value};
    game.assets.car=car.value;
  }
}

function careerSnapshot(){
  return {job:game.job,career:currentCareerTitle(),annualIncome:Math.round(game.annualIncome),jobKey:game.jobKey,
    rank:game.jobKey==="civil"?game.career.rank:null,step:game.career.step||null,yearsInRank:game.career.yearsInRank||0,
    performance:game.career.performance||null,political:game.career.political?game.career.political.stage:null};
}
function recordCareer(reason){
  const snap=careerSnapshot();
  const last=game.careerHistory[game.careerHistory.length-1];
  if(!last||last.age!==game.age||last.reason!==reason||last.annualIncome!==snap.annualIncome||last.career!==snap.career){
    game.careerHistory.push({...snap,age:game.age,year:game.year,season:SEASONS[game.seasonIndex],reason});
  }
}

function recordHistory(){
  const h = {
    age: game.age,
    year: game.year,
    season: SEASONS[game.seasonIndex],
    job: game.job,
    career: currentCareerTitle(),
    income: Math.round(game.annualIncome),
    city: game.housing.city,
    housing: game.housing.name,
    car: game.car.name,
    family: game.married ? (game.children ? `배우자 · 자녀 ${game.children}명` : "배우자") : "미혼",
    married: game.married,
    children: game.children,
    houseAsset: Math.round(game.assets.house),
    carAsset: Math.round(game.assets.car),
    stockAsset: Math.round(game.assets.stock),
    etcAsset: Math.round(game.assets.etc),
    cashAsset: Math.round(game.cash),
    totalAsset: Math.round(totalAssets()),
    debtAsset: Math.round(game.debt),
    netWorth: Math.round(netWorth()),
    event: game.lastEvent || "인생의 시작",
    rank: game.jobKey==="civil" ? game.career.rank : null,
    step: game.career.step || null
  };
  const i = game.history.findIndex(x => x.age === game.age && x.season === h.season);
  if (i >= 0) game.history[i] = h;
  else game.history.push(h);
}

function evaluatePerformance(){
  if(game.jobKey==="entrepreneur")return;
  const score=Math.random()+game.happiness/200-game.stress/250+game.health/300;
  game.career.performance=score>.95?"excellent":score>.70?"good":score<.35?"poor":"normal";
}
function civilPromotionChance(){
  const r=game.career.rank,rule=civilPromotionRules[r];if(!rule||game.career.yearsInRank<rule.minimumYears)return 0;
  let p=rule.baseChance;
  if(game.career.performance==="excellent")p+=.18;else if(game.career.performance==="good")p+=.08;else if(game.career.performance==="poor")p-=.08;
  p+=Math.min(.12,Math.max(0,game.career.yearsInRank-rule.minimumYears)*.03);
  return Math.max(0,Math.min(.85,p));
}
function promoteCivil(){
  const next=civilPromotionRules[game.career.rank]?.nextRank;if(!next)return false;
  game.career.rank=next;game.career.step=1;game.career.yearsInRank=0;game.career.title=careerTracks.civil.stages.find(x=>x.rank===next).title;
  game.career.performance="normal";game.annualIncome=currentAnnualPay();game.stress+=8;game.happiness+=4;recordCareer("승진");return true;
}
function promoteGeneric(){
  const track=careerTracks[game.jobKey];const idx=game.career.index||0;if(idx>=track.stages.length-1)return false;
  game.career.index=idx+1;game.career.step=1;game.career.yearsInRank=0;game.career.title=track.stages[idx+1].title;game.annualIncome=currentAnnualPay();game.stress+=7;game.happiness+=4;recordCareer("승진");return true;
}
function tryPromotion(){
  if(game.jobKey==="civil"){
    const p=civilPromotionChance();
    if(p>0&&Math.random()<p)return {success:promoteCivil(),chance:p};
    return {success:false,chance:p};
  }
  if(game.jobKey==="entrepreneur")return {success:false,chance:0};
  const track=careerTracks[game.jobKey]||careerTracks.employee;
  const idx=game.career.index||0,stage=track.stages[idx];
  if(!stage||game.career.yearsInRank<stage.promotionYears||idx>=track.stages.length-1)return {success:false,chance:0};
  let p=.30;
  if(game.career.performance==="excellent")p+=.18;
  else if(game.career.performance==="good")p+=.08;
  else if(game.career.performance==="poor")p-=.08;
  p=Math.max(.05,Math.min(.75,p));
  if(Math.random()<p)return {success:promoteGeneric(),chance:p};
  return {success:false,chance:p};
}

function careerLabelDetail(){
  const perf={excellent:"탁월",good:"우수",poor:"미흡",normal:"보통"}[game.career.performance]||"보통";
  if(game.jobKey==="civil")return `${game.career.rank}급 · ${game.career.step}호봉 · ${perf}`;
  if(game.jobKey==="entrepreneur")return `사업 단계 ${game.career.businessLevel} · 연간 순이익 변동형`;
  return `경력 ${game.career.step}년차 · ${perf}`;
}

function eventList(){
  const currentSeason = SEASONS[game.seasonIndex];
  const e=[
    // -------------------------------------------------------------
    // 1. 선택과 관계없이 진행되는 뉴스/돌발 이벤트 (자연발생 글로벌 이슈)
    // -------------------------------------------------------------
    {
      id:"news_war_event", type:"뉴스 속보", title:`🚨 [속보] ${currentSeason} 지정학적 분쟁 (전쟁) 발생`,
      desc:"세계 각국에 긴장이 감돌며 전쟁이 발발했습니다! 국제 정세가 급변하면서 주식 시장이 크게 출렁입니다. 군수/방산 주식은 급등하고, 원자재/자원 주식은 파급 효과로 급락합니다.",
      ok:()=>true,
      choices:[
        {
          text:"뉴스 확인 및 주식 포트폴리오 관리",
          result:"",
          apply:function(){
            let stockMsg = "";
            if(game.assets.stock > 0){
              if(game.currentStockSector === "군사"){
                const profit = game.assets.stock * 0.8; // +80%
                game.assets.stock += profit;
                stockMsg = ` 보유 중인 군사/방산 주식이 폭등하여 ${won(profit)}의 시세 차익을 거두었습니다!`;
              } else if(game.currentStockSector === "자원"){
                const loss = game.assets.stock * 0.5; // -50%
                game.assets.stock -= loss;
                stockMsg = ` 보유 중인 자원 관련 주식이 급락하여 ${won(loss)}의 손실을 입었습니다.`;
              } else {
                const loss = game.assets.stock * 0.15; // -15%
                game.assets.stock -= loss;
                stockMsg = ` 시장 불확실성으로 보유 주식 가치가 ${won(loss)} 감소했습니다.`;
              }
            } else {
              stockMsg = " (보유 주식이 없어 직접적인 주식 자산 영향은 없습니다.)";
            }
            game.stress += 8;
            game.happiness -= 5;
            this.result = `전쟁 뉴스 속보가 타전되었습니다.${stockMsg} 세계 경제 불안으로 스트레스가 증가합니다.`;
          }
        }
      ]
    },
    {
      id:"news_disease_event", type:"뉴스 속보", title:`🚨 [속보] ${currentSeason} 전염병 유행 및 건강 악화`,
      desc:"신종 바이러스 감염병이 유행하여 사회적 거리두기가 발령되었습니다. 본인도 독감 및 전염병에 걸려 고생하게 됩니다.",
      ok:()=>true,
      choices:[
        {
          text:"상황 수용 및 격리 치료",
          result:"",
          apply:function(){
            game.health = clamp(game.health - 20);
            game.stress += 10;
            let stockMsg = "";
            if(game.assets.stock > 0 && game.currentStockSector === "바이오"){
              const profit = game.assets.stock * 0.5;
              game.assets.stock += profit;
              stockMsg = ` 바이오/헬스케어 보유 주식은 상승하여 ${won(profit)} 수익을 냈습니다!`;
            }
            this.result = `전염병에 감염되어 건강이 크게 악화되었습니다 (-20).${stockMsg}`;
          }
        }
      ]
    },
    // -------------------------------------------------------------
    // 2. 주식 거래/갈아타기/전량매도 선택 이벤트 (한 번에 1개 카테고리만 보유)
    // -------------------------------------------------------------
    {
      id:"stock_investment", type:"투자", title:`${currentSeason} 주식 시장 동향 및 거래`,
      desc: game.assets.stock > 0 
        ? `현재 [${game.currentStockSector || '일반'}] 종목 주식을 ${won(game.assets.stock)} 보유 중입니다. 종목을 갈아타거나 전량 매도할 수 있습니다.`
        : "새로운 종목 주식을 매수할 기회입니다. 주식은 한 번에 한 카테고리만 운용할 수 있습니다.",
      ok:()=>true,
      choices:[
        {
          text:"[군사/방산 주식]으로 갈아타기/매수 (1,000만원)",
          result:"",
          apply:function(){
            if(game.cash >= 10000000){
              game.cash -= 10000000;
              game.assets.stock += 10000000;
              game.currentStockSector = "군사";
              game.happiness += 2;
              this.result = "군사/방산 섹터 주식에 1,000만원을 투자하였습니다.";
            } else {
              this.result = "현금이 부족하여 매수하지 못했습니다.";
            }
          }
        },
        {
          text:"[자원/원자재 주식]으로 갈아타기/매수 (1,000만원)",
          result:"",
          apply:function(){
            if(game.cash >= 10000000){
              game.cash -= 10000000;
              game.assets.stock += 10000000;
              game.currentStockSector = "자원";
              game.happiness += 2;
              this.result = "자원/원자재 섹터 주식에 1,000만원을 투자하였습니다.";
            } else {
              this.result = "현금이 부족하여 매수하지 못했습니다.";
            }
          }
        },
        {
          text:"[IT/테크 주식]으로 갈아타기/매수 (1,000만원)",
          result:"",
          apply:function(){
            if(game.cash >= 10000000){
              game.cash -= 10000000;
              game.assets.stock += 10000000;
              game.currentStockSector = "IT";
              game.happiness += 2;
              this.result = "IT/테크 섹터 주식에 1,000만원을 투자하였습니다.";
            } else {
              this.result = "현금이 부족하여 매수하지 못했습니다.";
            }
          }
        },
        {
          text:"보유 주식 전량 매도하여 현금화",
          result:"",
          apply:function(){
            if(game.assets.stock > 0){
              const sold = game.assets.stock;
              game.cash += sold;
              game.assets.stock = 0;
              game.currentStockSector = null;
              this.result = `보유 중이던 주식을 전량 매도하여 ${won(sold)}의 현금을 확보했습니다.`;
            } else {
              this.result = "보유 중인 주식이 없습니다.";
            }
          }
        },
        {
          text:"현재 주식 상태 유지",
          result:"현재 주식 포트폴리오를 그대로 유지하기로 결정했습니다.",
          apply:()=>{ game.stress -= 1; }
        }
      ]
    },
    // -------------------------------------------------------------
    // 3. 성과급 이벤트: 1년 중 '겨울'에만 발생하도록 조건 추가
    // -------------------------------------------------------------
    {
      id:"job_bonus", type:"수익", title:`[겨울 특별] 직업 연말 성과급`,
      desc:`한 해 동안의 (${game.job}) 성과 평가에 따라 연말 특별 성과급 또는 보너스가 지급됩니다.`,
      ok:() => game.seasonIndex === 3, // 겨울(index 3)에만 발생
      choices:[
        {
          text:"성과 보고서 제출 및 연말 보너스 수령",
          result:"",
          apply:function(){
            let bonus = 0;
            if(game.jobKey === "finance" || game.jobKey === "developer" || game.jobKey === "professional"){
              bonus = Math.round((game.annualIncome * (0.10 + Math.random() * 0.20)) / 10000) * 10000;
            } else if(game.jobKey === "employee" || game.jobKey === "researcher" || game.jobKey === "engineer"){
              bonus = Math.round((game.annualIncome * (0.05 + Math.random() * 0.10)) / 10000) * 10000;
            } else if(game.jobKey === "civil" || game.jobKey === "teacher" || game.jobKey === "police" || game.jobKey === "firefighter" || game.jobKey === "nurse"){
              bonus = Math.round((game.annualIncome * (0.02 + Math.random() * 0.05)) / 10000) * 10000;
            } else {
              bonus = Math.round((2000000 + Math.random() * 10000000) / 10000) * 10000;
            }
            game.cash += bonus;
            game.happiness += 8;
            this.result = `한 해 동안의 ${game.job} 성과를 높게 평가받아 연말 성과급 ${won(bonus)}을 수령했습니다!`;
          }
        }
      ]
    },
    // -------------------------------------------------------------
    // 기타 일상 이벤트들
    // -------------------------------------------------------------
    {
      id:"travel_event",type:"지출",title:`${currentSeason} 휴가 여행 계획`,
      desc:"일상에서 벗어나 여행을 떠날 기회가 왔습니다. 예산과 자산 상황에 따라 선택하세요.",
      ok:()=>true,
      choices:[
        {
          text:"국내 여행 (비용 100만원)",
          result:"가까운 국내 명소로 알찬 여행을 다녀왔습니다.",
          apply:()=>{
            const cost = 1000000;
            if(game.cash >= cost){ game.cash -= cost; game.happiness += 6; game.stress -= 8; }
            else { game.stress += 4; }
          }
        },
        {
          text:"해외 여행 (비용 400만원)",
          result:"해외에서 색다른 경험을하며 특별한 추억을 만들었습니다.",
          apply:()=>{
            const cost = 4000000;
            if(game.cash >= cost){ game.cash -= cost; game.happiness += 15; game.stress -= 15; }
            else { game.stress += 5; }
          }
        },
        {
          text:"럭셔리 크루즈 여행 (비용 1,200만원)",
          result:"호화 크루즈를 타고 최고의 휴식을 즐겼습니다.",
          apply:()=>{
            const cost = 12000000;
            if(game.cash >= cost){ game.cash -= cost; game.happiness += 30; game.stress -= 25; }
            else { game.stress += 8; }
          }
        },
        {
          text:"집에서 휴식 (비용 0원)",
          result:"집에서 조용히 휴식을 취했습니다.",
          apply:()=>{ game.stress -= 3; }
        }
      ]
    },
    {
      id:"hobby_event",type:"취미",title:`${currentSeason} 취미 활동`,
      desc:"새로운 취미를 통해 삶의 에너지를 충전하고자 합니다.",
      ok:()=>true,
      choices:(()=>{
        const hobbies = [
          { name:"골프 레슨 받기", cost:2000000, hap:10, str:5 },
          { name:"캠핑 장비 구매 및 여행", cost:1500000, hap:8, str:7 },
          { name:"악기 배우기 및 연주", cost:800000, hap:6, str:5 },
          { name:"피트니스 개인 PT", cost:1200000, hap:5, str:10, heal:8 },
          { name:"독서 및 인문학 모임", cost:300000, hap:4, str:4 }
        ];
        const selected = hobbies[Math.floor(Math.random()*hobbies.length)];
        return [
          {
            text:`${selected.name} (비용 ${won(selected.cost)})`,
            result:`${selected.name}을(를) 즐기며 스트레스를 해소했습니다.`,
            apply:()=>{
              if(game.cash >= selected.cost){
                game.cash -= selected.cost;
                game.happiness += selected.hap;
                game.stress -= selected.str;
                if(selected.heal) game.health += selected.heal;
              } else { game.stress += 3; }
            }
          },
          {
            text:"소소한 산책과 독서 (비용 0원)",
            result:"소소한 지출 없이 잔잔한 휴식을 취했습니다.",
            apply:()=>{ game.happiness += 2; game.stress -= 2; }
          }
        ];
      })()
    },
    {
      id:"house_upgrade",type:"지출",title:`${currentSeason} 주거 환경 개선`,
      desc:"더 쾌적한 주거 공간으로 가꾸거나 이사를 고려해볼 수 있습니다.",
      ok:()=>(game.year - (game.lastHouseUpgradeYear || 0)) >= 2,
      choices:[
        {
          text:"인테리어 및 집 단장 (비용 1,500만원)",
          result:"집안 공간을 새롭게 바꾸어 삶의 질이 향상되었습니다.",
          apply:()=>{
            if(game.cash >= 15000000){
              game.cash -= 15000000;
              game.assets.house += 15000000;
              game.happiness += 12;
              game.lastHouseUpgradeYear = game.year;
            } else { game.stress += 4; }
          }
        },
        {
          text:"현재 상태 유지",
          result:"주거 비용을 아끼고 기존 환경에 만족하기로 했습니다.",
          apply:()=>{ game.stress -= 1; }
        }
      ]
    },
    {
      id:"lotto_event",type:"수익",title:`${currentSeason} 복권(로또) 구매`,
      desc:"혹시 모를 대박을 기대하며 로또 복권을 한 장 살 수 있습니다.",
      ok:()=>true,
      choices:[
        {
          text:"로또 구매 (비용 1만원)",
          result:"",
          apply:function(){
            game.cash -= 10000;
            const rand = Math.random();
            if(rand < 0.00005){
              game.cash += 3000000000; game.happiness += 50;
              this.result = "🎉 1등 당첨! 30억원의 대박 행운이 찾아왔습니다!";
            } else if(rand < 0.001){
              game.cash += 50000000; game.happiness += 30;
              this.result = "🎊 2등 당첨! 5,000만원의 상금을 받았습니다!";
            } else if(rand < 0.02){
              game.cash += 1000000; game.happiness += 15;
              this.result = "🎈 3등 당첨! 100만원의 축하금을 수령했습니다!";
            } else if(rand < 0.12){
              game.cash += 50000; game.happiness += 5;
              this.result = "😊 4등 당첨! 5만원을 얻었습니다.";
            } else {
              game.happiness -= 1;
              this.result = "아쉽게도 낙첨되었습니다. 다음 기회를 기약합니다.";
            }
          }
        },
        {
          text:"구매하지 않음",
          result:"복권을 사지 않고 조용히 지나갔습니다.",
          apply:()=>{}
        }
      ]
    }
  ];
  return e.filter(x=>x.ok());
}

function generateEvent(){const list=eventList();currentEvent=list[Math.floor(Math.random()*list.length)];game.lastEvent=`[${SEASONS[game.seasonIndex]}] ${currentEvent.title}`;eventResolved=false;renderEvent();}
function renderEvent(){
  $("eventType").textContent=`${SEASONS[game.seasonIndex]} · ${currentEvent.type}`;$("eventTitle").textContent=currentEvent.title;$("eventDescription").textContent=currentEvent.desc;$("choices").innerHTML="";
  currentEvent.choices.forEach((c,i)=>{const b=document.createElement("button");b.className="choice";b.textContent=`${i+1}. ${c.text}`;b.onclick=()=>resolveEvent(i);$("choices").appendChild(b)});
  $("resultBox").classList.add("hidden");$("eventNextBtn").disabled=true;
}
function resolveEvent(i){
  if(eventResolved)return;const c=currentEvent.choices[i];
  const before={cash:game.cash,annualIncome:game.annualIncome,health:game.health,happiness:game.happiness,stress:game.stress,stock:game.assets.stock,children:game.children,married:game.married};
  c.apply();game.health=clamp(game.health);game.happiness=clamp(game.happiness);game.stress=clamp(game.stress);game.annualIncome=Math.max(0,Math.round(game.annualIncome/10000)*10000);recalculateLifestyle();eventResolved=true;
  $("resultText").textContent=c.result || "선택에 따른 처리가 완료되었습니다.";
  const changes=[["현금",game.cash-before.cash],["연간 소득",game.annualIncome-before.annualIncome],["주식",game.assets.stock-before.stock],["건강",game.health-before.health],["행복",game.happiness-before.happiness],["스트레스",game.stress-before.stress],["자녀",game.children-before.children]].filter(x=>x[1]!==0).map(x=>`<span class="change">${x[0]} ${typeof x[1]==="number"&&Math.abs(x[1])>1000?signedWon(x[1]):(x[1]>0?"+":"")+x[1]}</span>`).join("");
  $("resultChanges").innerHTML=changes||'<span class="change">주요 수치 변화 없음</span>';$("resultBox").classList.remove("hidden");[...document.querySelectorAll(".choice")].forEach(b=>b.disabled=true);$("eventNextBtn").disabled=false;updateUI();
}

function advanceYear(){
  if(!eventResolved)return;
  
  if(game.seasonIndex < 3){
    game.seasonIndex++;
  } else {
    game.seasonIndex = 0;
    if(game.age>=60){endGame();return;}
    game.age++;
    game.year++;

    if(game.jobKey==="entrepreneur"){
      game.annualIncome=businessIncome();game.totalBusinessProfit+=Math.max(0,game.annualIncome);
      if(Math.random()<.28&&game.career.businessLevel<5)game.career.businessLevel++;
    }else{
      game.career.step=(game.career.step||1)+1;game.career.yearsInRank=(game.career.yearsInRank||0)+1;evaluatePerformance();game.annualIncome=currentAnnualPay();
      const p=tryPromotion();
      if(p.success)game.lastEvent=`승진 · ${currentCareerTitle()}`;
    }
    if(game.jobKey!=="civil"&&game.jobKey!=="entrepreneur"&&game.career.index<careerTracks[game.jobKey].stages.length-1)game.annualIncome=currentAnnualPay();
    
    game.totalIncome+=Math.max(0,game.annualIncome);
  }

  const investment=updateMarket();
  game.cash += (game.annualIncome / 4) - livingCost();
  game.cash=Math.max(game.cash,-500000000);
  game.health=clamp(game.health+(game.stress>60?-2:0.5)+(Math.random()*2-1));
  game.happiness=clamp(game.happiness+(Math.random()*4-2));
  game.stress=clamp(game.stress+(Math.random()*6-3));
  if(investment<0)game.stress+=1;
  
  recalculateLifestyle();
  recordCareer("계절별 경력 기록");
  recordHistory();

  if(game.age>=60 && game.seasonIndex === 3){saveGame(false);endGame();return;}
  generateEvent();
  updateUI();
  saveGame(false);
}

function updateUI(){
  $("ageText").textContent=game.age;
  $("yearText").textContent=`${game.year} (${SEASONS[game.seasonIndex]})`;
  $("jobText").textContent=game.job;
  $("careerText").textContent=currentCareerTitle();
  $("incomeText").textContent=won(game.annualIncome);
  $("incomeSub").textContent=careerLabelDetail();
  $("cityText").textContent=game.housing.city;
  $("housingText").textContent=game.housing.name;
  $("netWorthText").textContent=won(netWorth());
  $("debtSub").textContent=`부채 ${won(game.debt)}`;
  $("houseText").textContent=`${game.housing.name} · ${game.housing.city}`;
  $("carText").textContent=game.car.name;
  $("familyText").textContent=game.married?(game.children?`배우자 · 자녀 ${game.children}명`:"배우자"):"미혼";
  $("marriageText").textContent=game.married?"기혼":"미혼";
  $("childrenText").textContent=`${game.children}명`;
  $("healthText").textContent=game.health;
  $("happinessText").textContent=game.happiness;
  $("stressText").textContent=game.stress;
  $("healthBar").style.width=game.health+"%";
  $("happinessBar").style.width=game.happiness+"%";
  $("stressBar").style.width=game.stress+"%";
  $("houseAsset").textContent=won(game.assets.house);
  $("carAsset").textContent=won(game.assets.car);
  $("stockAsset").textContent=won(game.assets.stock) + (game.currentStockSector ? ` (${game.currentStockSector})` : "");
  $("etcAsset").textContent=won(game.assets.etc);
  $("cashAsset").textContent=won(game.cash);
  $("totalAsset").textContent=won(totalAssets());
  $("lifeTagline").textContent=`${game.housing.city}에서 ${game.job}으로 살아가고 있습니다.`;
  
  if($("eventNextBtn")){
    $("eventNextBtn").textContent = game.seasonIndex < 3 ? "결과를 확인한 뒤 다음 계절로 →" : "결과를 확인한 뒤 다음 해로 →";
  }

  if($("careerDetail")){
    $("careerDetail").innerHTML=`<div><span>현재 경력</span><strong>${currentCareerTitle()}</strong></div><div><span>연간 총소득</span><strong>${won(game.annualIncome)}</strong></div><div><span>경력 연차</span><strong>${game.career.yearsInRank||0}년</strong></div>${game.jobKey==="civil"?`<div><span>승진 가능성</span><strong>${chance(civilPromotionChance())}</strong></div>`:""}`;
  }
  renderHistory();renderTimeline();drawChart("assetChart");
}

function renderHistory(){
  $("historyCount").textContent=`${game.history.length}회 기록`;
  $("historyBody").innerHTML = game.history.map(h => `
    <tr>
      <td><strong>${h.age}세</strong><br><small>${h.year}년 (${h.season||"봄"})</small></td>
      <td>${h.job}<br><small style="color:#6b7280">${h.career}</small></td>
      <td>${won(h.income)}</td>
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

function renderTimeline(){
  if(!game)return;
  $("timeline").innerHTML=game.history.map(h=>`
    <article class="timeline-item">
      <div class="timeline-top">
        <span class="timeline-age">${h.age}세 · ${h.year}년 (${h.season||"봄"})</span>
        <span class="timeline-job">${h.job} · ${h.career}</span>
      </div>
      <div style="margin-top:7px;color:#6b7280;font-size:13px">${h.event}</div>
      <div class="timeline-main">
        <div><span>💼 연간 소득</span><strong>${won(h.income)}</strong></div>
        <div><span>🏠 주택 자산</span><strong>${won(h.houseAsset)}</strong></div>
        <div><span>🚗 자동차 자산</span><strong>${won(h.carAsset)}</strong></div>
        <div><span>📈 주식 자산</span><strong>${won(h.stockAsset)}</strong></div>
        <div><span>💰 합계 자산</span><strong>${won(h.totalAsset)}</strong></div>
        <div><span>💵 순자산</span><strong>${won(h.netWorth)}</strong></div>
      </div>
    </article>
  `).join("");
}

function drawChart(id){
  const canvas=$(id);if(!canvas||!game||!game.history.length)return;
  const r=canvas.getBoundingClientRect(),dpr=devicePixelRatio||1,w=Math.max(300,r.width),h=Math.max(180,r.height);
  canvas.width=w*dpr;canvas.height=h*dpr;const ctx=canvas.getContext("2d");ctx.scale(dpr,dpr);
  const pad={l:70,r:25,t:20,b:40},data=game.history.map(x=>x.totalAsset),max=Math.max(...data,1),min=Math.min(...data,0),range=max-min||1;
  ctx.clearRect(0,0,w,h);ctx.strokeStyle="#e5e7eb";ctx.fillStyle="#6b7280";ctx.font="11px Arial";
  for(let i=0;i<=4;i++){const y=pad.t+(h-pad.t-pad.b)*i/4;ctx.beginPath();ctx.moveTo(pad.l,y);ctx.lineTo(w-pad.r,y);ctx.stroke();ctx.fillText(won(max-range*i/4),5,y+4)}
  const pw=w-pad.l-pad.r,ph=h-pad.t-pad.b;ctx.strokeStyle="#2563eb";ctx.lineWidth=3;ctx.beginPath();
  data.forEach((v,i)=>{const x=pad.l+(data.length===1?pw/2:pw*i/(data.length-1)),y=pad.t+(max-v)/range*ph;i?ctx.lineTo(x,y):ctx.moveTo(x,y)});
  ctx.stroke();ctx.fillStyle="#2563eb";
  data.forEach((v,i)=>{const x=pad.l+(data.length===1?pw/2:pw*i/(data.length-1)),y=pad.t+(max-v)/range*ph;ctx.beginPath();ctx.arc(x,y,3.5,0,Math.PI*2);ctx.fill();});
}

function buyStock(){if(game.cash<1e7)return alert("현금 1,000만원이 필요합니다.");game.cash-=1e7;game.assets.stock+=1e7;if(!game.currentStockSector)game.currentStockSector="일반";updateUI();saveGame(false)}
function sellStock(){if(game.assets.stock<=0)return alert("보유 주식이 없습니다.");const v=Math.min(1e7,game.assets.stock);game.assets.stock-=v;if(game.assets.stock===0)game.currentStockSector=null;game.cash+=v;updateUI();saveGame(false)}
function buyHouse(){
  if(game.housing.owned)return alert("현재 자가 주택을 보유하고 있습니다.");
  const price=450000000,loan=300000000,down=price-loan;
  if(game.cash<down)return alert(`최소 ${won(down)}의 현금이 필요합니다.`);
  game.cash-=down;game.assets.house=price;game.debt+=loan;
  game.housing={name:"84㎡ 아파트 자가",city:game.annualIncome>=180000000?"서울":"수도권",owned:true};
  game.happiness=clamp(game.happiness+8);updateUI();saveGame(false);
}
function buyCar(){
  const price=80000000;if(game.cash<price)return alert(`자동차 교체에는 ${won(price)}의 현금이 필요합니다.`);
  game.cash-=price;game.assets.car=price;game.car={name:"GV70 / 팰리세이드급",value:price};
  game.happiness=clamp(game.happiness+5);updateUI();saveGame(false);
}
function careerChallenge(){
  if(game.jobKey==="entrepreneur"){
    const p=10000000+Math.random()*30000000;game.cash+=p;game.assets.etc+=p*.2;game.stress+=5;
    alert(`사업 도전에 성공했습니다. 추가 수익 ${won(p)}을 얻었습니다.`);
  } else {
    evaluatePerformance();const r=tryPromotion();
    if(r.success)alert(`커리어 도전에 성공했습니다. ${currentCareerTitle()}로 승진했습니다.`);
    else{game.stress+=5;alert(`이번 도전에서는 승진하지 못했습니다. 현재 승진 가능성은 ${chance(r.chance)}입니다.`)}
  }
  game.health=clamp(game.health);game.happiness=clamp(game.happiness);game.stress=clamp(game.stress);
  recalculateLifestyle();updateUI();saveGame(false);
}

function saveGame(show=true){if(!game)return;localStorage.setItem(SAVE_KEY,JSON.stringify(game));if(show)alert("게임을 저장했습니다.")}
function loadGame(){
  const raw=localStorage.getItem(SAVE_KEY);if(!raw)return alert("저장된 게임이 없습니다.");
  try{game=JSON.parse(raw);migrateGame();show("gameScreen");updateUI();generateEvent();alert("저장된 게임을 불러왔습니다.")}
  catch(e){console.error(e);alert("저장 데이터를 읽지 못했습니다.")}
}
function migrateGame(){
  if(!game.profile)game.profile={name:game.name||"플레이어",region:"서울",gender:"선택안함",birth:`${FIXED_BIRTH_YEAR}-01-01`};
  if(game.seasonIndex === undefined) game.seasonIndex = 0;
  if(game.currentStockSector === undefined) game.currentStockSector = null;
  if(!game.career||typeof game.career!=="object"){game.career=newCareer(game.jobKey);}
  if(game.jobKey==="civil"&&game.career.rank===undefined){
    const old=String(game.career.title||game.career||"9급");
    const rank=[9,8,7,6,5,4,3,2,1].find(r=>old.includes(String(r)))||9;
    game.career={...newCareer("civil"),rank};
    game.career.title=careerTracks.civil.stages.find(x=>x.rank===rank).title;
  }
  if(game.jobKey!=="civil"&&game.jobKey!=="entrepreneur"&&game.career.index===undefined){
    game.career={...newCareer(game.jobKey),title:game.career.title||game.job};
  }
  if(!game.careerHistory)game.careerHistory=[];
  if(!game.jobChangeHistory)game.jobChangeHistory=[];
  game.job=jobs[game.jobKey]?.name||game.job;
  game.annualIncome=currentAnnualPay();
}

function reset(){if(!confirm("현재 게임을 삭제하고 새로 시작할까요?"))return;localStorage.removeItem(SAVE_KEY);game=null;currentEvent=null;show("startScreen");$("continueBtn").classList.toggle("hidden",!localStorage.getItem(SAVE_KEY))}
function endGame(){
  show("endScreen");const nw=netWorth();
  let title="나만의 인생을 완성했습니다",msg="20세부터 60세까지 다양한 선택을 통해 당신만의 이야기를 만들었습니다.";
  if(nw>=3e9){title="전설적인 자산가";msg="장기적인 선택과 자산 관리가 큰 경제적 성취로 이어졌습니다."}
  else if(nw>=1e9){title="성공한 인생";msg="꾸준한 소득과 자산 관리로 안정적인 경제 기반을 만들었습니다."}
  else if(nw<0){title="굴곡 많은 인생";msg="경제적으로 쉽지 않은 결과였지만, 인생은 돈만으로 평가할 수 없습니다."}
  $("endingTitle").textContent=title;$("endingMessage").textContent=`${game.name}님의 20세부터 60세까지의 인생입니다. ${msg}`;
  const stats=[
    ["최종 직업",`${game.job} · ${currentCareerTitle()}`],
    ["최종 연간 소득",won(game.annualIncome)],
    ["평생 소득",won(game.totalIncome)],
    ["최종 주거",`${game.housing.city} · ${game.housing.name}`],
    ["가족",game.married?`배우자 · 자녀 ${game.children}명`:"미혼 · 자녀 없음"],
    ["총자산",won(totalAssets())],
    ["순자산",won(nw)]
  ];
  $("endingStats").innerHTML=stats.map(x=>`<div class="ending-stat"><span>${x[0]}</span><strong>${x[1]}</strong></div>`).join("");
  setTimeout(()=>drawChart("endingChart"),50);
}

function show(id){["startScreen","rouletteScreen","gameScreen","recordScreen","endScreen"].forEach(x=>$(x).classList.toggle("hidden",x!==id))}

function jobRouletteItems(selectedKey){
  const keys=Object.keys(jobs);const items=[];
  for(let i=0;i<5;i++)for(const k of keys)items.push(k);
  const targetIndex=keys.length*2+Math.floor(keys.length/2);
  items[targetIndex]=selectedKey;
  return items;
}

function updateProfilePreview(){
  const nameEl = $("playerName");
  const regionEl = $("playerRegion");
  const genderEl = $("playerGender");
  
  if($("previewName") && nameEl) $("previewName").textContent = nameEl.value.trim() || "플레이어";
  if($("previewRegion") && regionEl) $("previewRegion").textContent = regionEl.value;
  if($("previewGender") && genderEl) $("previewGender").textContent = genderEl.value;
  if($("previewBirth")) $("previewBirth").textContent = getSelectedBirthDate();
}

function showRoulette(profile){
  const generated=generateCareer(profile);
  rouletteState={profile,generated,started:false};
  $("rouletteProfile").textContent=`20세 · ${profile.region} 출신 · ${profile.birth}`;
  $("rouletteCandidate").textContent="직업을 생성할 준비가 되었습니다.";
  $("rouletteResult").classList.add("hidden");
  $("rouletteConfirmBtn").classList.add("hidden");
  $("rouletteStartBtn").classList.remove("hidden");
  
  const keys=jobRouletteItems(generated.jobKey);
  $("rouletteTrack").innerHTML=keys.map(k=>`<div class="roulette-item" data-job="${k}">${jobs[k].name}<small>${careerLabels[k]}</small></div>`).join("");
  $("rouletteTrack").style.transition="none";
  $("rouletteTrack").style.transform="translateX(0px)";
  
  show("rouletteScreen");
}

let rouletteState={profile:null,generated:null,started:false};

async function spinCareerRoulette(){
  if(!rouletteState.generated||rouletteState.started)return;
  rouletteState.started=true;
  $("rouletteStartBtn").classList.add("hidden");
  $("rouletteTitle").textContent="첫 직업을 생성하는 중...";
  $("rouletteSubtitle").textContent="20세의 출발점이 결정됩니다.";
  
  const track=$("rouletteTrack"), windowEl=$("rouletteWindow");
  const items=[...track.querySelectorAll(".roulette-item")];
  
  const targetKey = rouletteState.generated.jobKey;
  let targetIndex = items.findIndex((el, idx) => idx >= items.length / 2 && el.getAttribute("data-job") === targetKey);
  if (targetIndex === -1) targetIndex = Math.floor(items.length / 2);

  const itemWidth = items[0] ? items[0].getBoundingClientRect().width + 10 : 220;
  const target = -(targetIndex * itemWidth - (windowEl.clientWidth / 2 - itemWidth / 2));
  
  track.style.transition = "none";
  track.style.transform = `translateX(0px)`;
  
  await new Promise(r => requestAnimationFrame(() => setTimeout(r, 50)));

  track.style.transition = "transform 4.5s cubic-bezier(0.15, 0.85, 0.15, 1)";
  track.style.transform = `translateX(${target}px)`;
  
  await new Promise(r => setTimeout(r, 4700));

  const key=rouletteState.generated.jobKey;
  const career=newCareer(key);
  const income=getCareerStartingIncome(key,career);
  $("rouletteCandidate").textContent=`🎯 ${jobs[key].name}`;
  $("rouletteResultJob").textContent=jobs[key].name;
  $("rouletteResultCareer").textContent=career.title;
  $("rouletteResultIncome").textContent=`연간 예상 소득 ${won(income)}`;
  $("rouletteResultReason").textContent=rouletteState.generated.reason;
  $("rouletteResult").classList.remove("hidden");
  $("rouletteConfirmBtn").classList.remove("hidden");
  $("rouletteTitle").textContent="당신의 첫 직업이 결정되었습니다!";
  $("rouletteSubtitle").textContent="이제 이 직업에서 어떤 인생을 만들어갈지 선택합니다.";
}

function startGeneratedGame(){
  if(!rouletteState.generated)return;
  const p=rouletteState.profile, key=rouletteState.generated.jobKey;
  game=newGame(p.name,key);
  game.profile={...p};
  game.careerOrigin={seed:rouletteState.generated.seed,reason:rouletteState.generated.reason};
  game.annualIncome=currentAnnualPay();
  recalculateLifestyle();recordCareer("첫 직업 생성");recordHistory();
  show("gameScreen");updateUI();generateEvent();saveGame(false);
}

window.addEventListener("DOMContentLoaded", () => {
  initBirthUI();

  ["playerName","playerRegion","playerGender"].forEach(id=>{
    if($(id)){
      $(id).addEventListener("input",updateProfilePreview);
      $(id).addEventListener("change",updateProfilePreview);
    }
  });

  if($("createCharacterBtn")){
    $("createCharacterBtn").onclick=()=>{
      const name=$("playerName").value.trim()||"플레이어";
      const profile={
        name,
        region:$("playerRegion").value,
        gender:$("playerGender").value,
        birth:getSelectedBirthDate()
      };
      showRoulette(profile);
    };
  }

  if($("rouletteStartBtn")) $("rouletteStartBtn").onclick=spinCareerRoulette;
  if($("rouletteConfirmBtn")) $("rouletteConfirmBtn").onclick=startGeneratedGame;
  if($("continueBtn")) $("continueBtn").onclick=loadGame;
  if($("saveBtn")) $("saveBtn").onclick=()=>saveGame(true);
  if($("loadBtn")) $("loadBtn").onclick=loadGame;
  if($("newBtn")) $("newBtn").onclick=reset;
  if($("endingNewBtn")) $("endingNewBtn").onclick=reset;
  if($("nextYearBtn")) $("nextYearBtn").onclick=()=>{if(eventResolved)advanceYear()};
  if($("eventNextBtn")) $("eventNextBtn").onclick=advanceYear;
  if($("lifeRecordBtn")) $("lifeRecordBtn").onclick=()=>show("recordScreen");
  if($("closeRecordBtn")) $("closeRecordBtn").onclick=()=>show("gameScreen");
  if($("stockBuyBtn")) $("stockBuyBtn").onclick=buyStock;
  if($("stockSellBtn")) $("stockSellBtn").onclick=sellStock;
  if($("houseBuyBtn")) $("houseBuyBtn").onclick=buyHouse;
  if($("carBuyBtn")) $("carBuyBtn").onclick=buyCar;
  if($("careerBtn")) $("careerBtn").onclick=careerChallenge;

  if($("continueBtn")) $("continueBtn").classList.toggle("hidden",!localStorage.getItem(SAVE_KEY));
});

window.onresize=()=>{if(game){drawChart("assetChart");drawChart("endingChart")}};