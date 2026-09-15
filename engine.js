/* ==========================================================================
   [MY LIFE] 엔진 로직 및 게임 코어 (engine.js)
   - 턴 경과(advanceYear), 이벤트 생성(주식 페이즈 및 쿨타임 제어), 소득/지출 기록 등
   ========================================================================== */

let game = null;
let currentEvent = null;
let eventResolved = false;
let baseCreationData = null;

const clamp = (v, a = 0, b = 100) => Math.max(a, Math.min(b, Math.round(v)));
const won = v => {
  const n = Math.round(v);
  if (Math.abs(n) >= 1e8) return `${(n / 1e8).toFixed(Math.abs(n) % 1e8 === 0 ? 0 : 1)}억원`;
  return `${Math.round(n / 10000).toLocaleString("ko-KR")}만원`;
};

function newCareer(jobKey) {
  if (jobKey === "unemployed") return { type: "unemployed", title: "구직자", step: 1, rankIndex: 0, govStep: 1, yearsInCurrentRank: 0, promoTargetYears: 5 };
  const track = careerTracks[jobKey];
  const randomPromoYears = Math.floor(Math.random() * 5) + 4; // 4~8년

  return { 
    type: jobKey, step: 1, rankIndex: 0, govStep: 1, 
    yearsInCurrentRank: 0, promoTargetYears: randomPromoYears, 
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
    initHouseAsset = 10000000; initCash = 10000000; firstYearLivingCost = 7000000;
  } else if (chosenTier === 30000000) {
    initHousing = { ...regionalHousing[1] }; initCar = { ...carLevels[1] };
    initHouseAsset = 10000000; initCarAsset = 5000000; initCash = 15000000; firstYearLivingCost = 10000000;
  }

  const startYear = START_YEAR + (finalConfig.startAge - 20);

  return {
    name: finalConfig.name, gender: finalConfig.gender,
    birthRegion: finalConfig.birthRegion, currentRegion: finalConfig.currentRegion,
    age: finalConfig.startAge, year: startYear, seasonIndex: 0,
    
    isStockPhase: false, 
    travelCooldown: 0,   

    // [업데이트] 해당 턴(계절)에 실제 발생한 소득/지출만 기록하는 변수
    turnIncome: 0,
    turnExpense: 0,

    newsSeasonInYear: Math.floor(Math.random() * 4), yearsWithoutTravelEvent: 0, hasTravelOccurredThisYear: false,
    lastDiseaseAnyYear: startYear, lastDiseaseL1L2Year: -999, lastDiseaseL3Year: -999, hasDiseaseL4Occurred: false,
    marriageDelayCount: 0, marriageBlockedUntilYear: 0, carCheckCount: 0,
    housingYearsInCurrent: 0, chickenStore1Years: 0, chickenStore2Years: 0, chickenStore3Years: 0,
    startYearRecorded: startYear, isFirstYearWinter: true, firstYearLivingCostFixed: firstYearLivingCost,
    jobKey: finalConfig.jobKey, job: j.name, career,
    annualIncome: initialIncome, cumulativeIncome: initialIncome,
    education: finalConfig.education, military: finalConfig.military, isDischarged: finalConfig.isDischarged,
    declaredSolo: false, chickenStoreCount: 1, hasOpenedStore2: false, hasOpenedStore3: false,
    cash: initCash, assets: { house: initHouseAsset, car: initCarAsset, stock: 0, etc: 0 },
    debt: 0, health: finalConfig.initialHealth, happiness: 70, stress: 25, reputation: 70,
    married: false, divorced: false, marriageYear: 0, lastTravelYear: 0, carHoldingYears: 0, children: 0,
    housing: initHousing, car: initCar, currentStockSector: null, lastYearLivingCost: 0, history: [],
    lastEvent: `인생의 출발 (거주지: ${finalConfig.currentRegion}, 초기 자산: ${won(chosenTier)})`
  };
}

function totalAssets() { return game.cash + game.assets.house + game.assets.car + game.assets.stock + game.assets.etc; }
function netWorth() { return totalAssets() - game.debt; }

function getChickenBasePay() {
  if (!game || game.jobKey !== "entrepreneur") return 45000000;
  if (game.career.title === "대형 프랜차이즈 대표") return 600000000;
  if (game.career.title === "동네 프랜차이즈 대표") return 250000000;
  if (game.career.title === "1,2,3호점 주인") return 120000000;
  return 45000000;
}

function checkChickenEnterpriseGrowth() {
  if (game.jobKey !== "entrepreneur") return;
  const nw = netWorth();
  const hasOperatedStore3For5Years = game.hasOpenedStore3 && (game.chickenStore3Years >= 5);
  if (hasOperatedStore3For5Years) {
    if (nw >= 3000000000 && game.career.title !== "대형 프랜차이즈 대표") {
      game.career.title = "대형 프랜차이즈 대표"; game.annualIncome = Math.max(game.annualIncome, 600000000);
      alert("축하합니다! 3호점 운영 5년 달성 및 순자산 30억을 돌파하여 전국구 [대형 프랜차이즈 대표]로 도약했습니다! (연소득 6억원 보장)");
    } 
    else if (nw >= 1000000000 && game.career.title !== "동네 프랜차이즈 대표" && game.career.title !== "대형 프랜차이즈 대표") {
      game.career.title = "동네 프랜차이즈 대표"; game.annualIncome = Math.max(game.annualIncome, 250000000);
      alert("축하합니다! 3호점 운영 5년 달성 및 자본금 10억원을 확보하여 [동네 프랜차이즈 대표]로 발돋움했습니다! (연소득 2.5억원 보장)");
    }
  }
}

function recalculateHousingAndLifestyle() {
  if (game.seasonIndex === 0 && game.assets.car > 0) {
    const depRate = 0.05 + Math.random() * 0.05;
    game.assets.car = Math.round(game.assets.car * (1 - depRate)); game.car.value = game.assets.car;
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
    game.cash += stockVal; game.assets.stock = 0; game.currentStockSector = null;
    log += `[주식 처분] 보유 주식을 10% 급매 할인하여 ${won(stockVal)} 충당. `;
  }
  if (game.cash < 0 && game.assets.house > 0) {
    const houseVal = Math.round(game.assets.house * 0.9);
    game.cash += houseVal; game.assets.house = 5000000; game.cash -= 5000000; game.debt = 0;
    const regionalHousing = getRegionalHousingLevels(game.currentRegion);
    game.housing = { ...regionalHousing[0], name: "고시원 (강등)" };
    log += `[주택 처분] 주거 자산을 감가 정리하여 ${won(houseVal)} 충당 후 고시원으로 강등 이주. `;
  }
  return log;
}

function recordHistory() {
  const h = {
    age: game.age, year: game.year, 
    season: game.isStockPhase ? "증시/결산" : SEASONS[game.seasonIndex], 
    job: game.job, career: currentCareerTitle(), 
    
    // [업데이트] 계절별 실제 발생 소득/지출 기록
    income: game.turnIncome,
    livingCost: game.turnExpense,
    
    housing: `${game.housing.name} (${game.currentRegion})`,
    car: game.car.name, family: game.divorced ? "돌싱" : (game.married ? (game.children ? `배우자·자녀 ${game.children}명` : "기혼") : "미혼"),
    houseAsset: Math.round(game.assets.house), carAsset: Math.round(game.assets.car), stockAsset: Math.round(game.assets.stock),
    debtAsset: Math.round(game.debt), cashAsset: Math.round(game.cash), totalAsset: Math.round(totalAssets()),
    netWorth: Math.round(netWorth()), event: game.lastEvent || ""
  };
  game.history.push(h);
  
  // 기록 후 해당 턴의 소득/지출 리셋
  game.turnIncome = 0;
  game.turnExpense = 0;
}

function createTravelEventObj(currentSeason) {
  const setTravelFlags = () => {
    game.travelCooldown = 8; 
    game.hasTravelOccurredThisYear = true;
  };

  return {
    id: "travel_event", type: "휴가", title: `✈️ ${currentSeason} 휴가 여행 계획`,
    desc: "바쁜 일상에서 벗어나 여행을 떠납니다. 힐링이 되지만 피로로 건강과 평판이 소폭 깎입니다.",
    ok: () => true,
    choices: [
      {
        text: "국내 힐링 여행 (비용 50만)",
        result: "국내 명소에서 푹 쉬다 왔습니다. (행복 +8, 스트레스 -7, 평판 -4, 건강 -2)",
        apply: () => {
          if (game.cash >= 500000) {
            game.cash -= 500000; game.happiness = clamp(game.happiness + 8);
            game.stress = clamp(game.stress - 7); game.reputation = clamp(game.reputation - 4);
            game.health = clamp(game.health - 2);
            if (game.married) game.lastTravelYear = game.year;
          }
          setTravelFlags(); 
        }
      },
      {
        text: "해외 여행 (비용 300만)",
        result: "해외에서 뜻깊은 추억을 쌓았습니다. (행복 +18, 스트레스 -12, 평판 -7, 건강 -5)",
        apply: () => {
          if (game.cash >= 3000000) {
            game.cash -= 3000000; game.happiness = clamp(game.happiness + 18);
            game.stress = clamp(game.stress - 12); game.reputation = clamp(game.reputation - 7);
            game.health = clamp(game.health - 5);
            if (game.married) game.lastTravelYear = game.year;
          }
          setTravelFlags(); 
        }
      },
      { 
        text: "집에서 휴식 (비용 0원)", 
        result: "조용히 집에서 쉬며 체력을 비축했습니다. (스트레스 -3, 행복 -5)", 
        apply: () => { 
          game.stress = clamp(game.stress - 3); 
          game.happiness = clamp(game.happiness - 5);
          setTravelFlags(); 
        } 
      }
    ]
  };
}

function checkHealthDiseaseEvent() {
  const currentSeason = SEASONS[game.seasonIndex];
  const yearsSinceAny = game.year - (game.lastDiseaseAnyYear || game.startYearRecorded);
  const yearsSinceL1L2 = game.year - (game.lastDiseaseL1L2Year || -999);
  const yearsSinceL3 = game.year - (game.lastDiseaseL3Year || -999);

  let riskJobMultiplier = 1.0;
  if (["large_factory", "factory_worker", "firefighter", "police"].includes(game.jobKey)) riskJobMultiplier = 1.35;
  const isSoloMultiplier = (!game.married || game.divorced) ? 1.25 : 1.0;
  
  let healthMultiplier = 1.0;
  if (game.health < 60) healthMultiplier = 1.6;
  else if (game.health < 75) healthMultiplier = 1.25;

  const totalM = riskJobMultiplier * isSoloMultiplier * healthMultiplier;
  let forceL1L2 = (yearsSinceAny >= 10);
  let eventLevel = 0;

  if (forceL1L2) eventLevel = Math.random() < 0.3 ? 2 : 1; 
  else {
    if (!game.hasDiseaseL4Occurred && Math.random() < (0.0025 * totalM)) eventLevel = 4;
    else if (yearsSinceL3 >= 10 && Math.random() < (0.0050 * totalM)) eventLevel = 3;
    else if (yearsSinceL1L2 >= 5 && Math.random() < (0.0150 * totalM)) eventLevel = 2;
    else if (yearsSinceL1L2 >= 5 && Math.random() < (0.0350 * totalM)) eventLevel = 1;
  }

  if (eventLevel === 4) {
    const cost = 15000000;
    return {
      id: "health_tier4", type: "중증 질환", title: `🏥 ${currentSeason} 중증 질환 진단 및 긴급 대수술`,
      desc: `정밀 검진 결과 조기 치료가 시급한 중증 질환이 발견되어 입원 후 긴급 수술을 받았습니다. 수술비와 특실 입원비 ${won(cost)}이 지출됩니다.`,
      ok: () => true,
      choices: [{
        text: `수술비 지출 및 요양 치료 (${won(cost)})`, result: `대수술을 무사히 마치고 장기간 회복 치료에 들어갔습니다. (건강 -35, 스트레스 +35)`,
        apply: () => { game.cash -= cost; game.health = clamp(game.health - 35); game.stress = clamp(game.stress + 35); game.happiness = clamp(game.happiness - 20); game.hasDiseaseL4Occurred = true; game.lastDiseaseAnyYear = game.year; }
      }]
    };
  } else if (eventLevel === 3) {
    const cost = 2000000;
    return {
      id: "health_tier3", type: "교통사고", title: `🚑 ${currentSeason} 불의의 교통사고 발생 및 입원 치료`,
      desc: `이동 중 발생한 차량 접촉 사고로 전치 4주의 부상을 입고 정형외과에 입원했습니다. 병원비 및 합의 처리비용 ${won(cost)}이 발생합니다.`,
      ok: () => true,
      choices: [{
        text: `치료비 납부 및 입원 치료 (${won(cost)})`, result: `입원 치료를 마쳤으나 당분간 재활이 필요합니다. (건강 -18, 스트레스 +20)`,
        apply: () => { game.cash -= cost; game.health = clamp(game.health - 18); game.stress = clamp(game.stress + 20); game.lastDiseaseL3Year = game.year; game.lastDiseaseAnyYear = game.year; }
      }]
    };
  } else if (eventLevel === 2) {
    const cost = 300000;
    return {
      id: "health_tier2", type: "부상 사고", title: `🩹 ${currentSeason} 일상생활 중 낙상 부상`,
      desc: `계단에서 발을 헛디뎌 발목 인대가 늘어나는 부상을 당했습니다. 반깁스 처치와 물리치료비 ${won(cost)}이 소요됩니다.`,
      ok: () => true,
      choices: [{
        text: `정형외과 치료 수용 (${won(cost)})`, result: `반깁스를 하고 2주간 통원 치료를 받았습니다. (건강 -8, 스트레스 +10)`,
        apply: () => { game.cash -= cost; game.health = clamp(game.health - 8); game.stress = clamp(game.stress + 10); game.lastDiseaseL1L2Year = game.year; game.lastDiseaseAnyYear = game.year; }
      }]
    };
  } else if (eventLevel === 1) {
    const cost = 50000;
    return {
      id: "health_tier1", type: "질병", title: `🤒 ${currentSeason} 환절기 급성 독감 및 감기몸살`,
      desc: `면역력 저하와 과로로 인해 고열과 오한을 동반한 심한 감기몸살을 앓았습니다. 이비인후과 진료비와 영양 수액비 ${won(cost)}이 지출됩니다.`,
      ok: () => true,
      choices: [{
        text: `수액 처방 및 약 복용 (${won(cost)})`, result: `주말 동안 푹 쉬며 수액을 맞고 기력을 회복했습니다. (건강 -3)`,
        apply: () => { game.cash -= cost; game.health = clamp(game.health - 3); game.stress = clamp(game.stress + 4); game.lastDiseaseL1L2Year = game.year; game.lastDiseaseAnyYear = game.year; }
      }]
    };
  }
  return null;
}

function eventList() {
  const currentSeason = SEASONS[game.seasonIndex];
  const isSecondYearSpringOrLater = game.year > game.startYearRecorded;

  if (game.isStockPhase) {
    const tEvent = THEME_EVENTS[Math.floor(Math.random() * THEME_EVENTS.length)];
    const upSector = THEME_SECTORS.find(s => s.id === tEvent.up);
    const downSector = THEME_SECTORS.find(s => s.id === tEvent.down);

    const currentUpRate = (Math.floor(Math.random() * 7) + 4) * 5;
    const currentDownRate = (Math.floor(Math.random() * 7) + 4) * 5;
    const minorOptions = [5, 10, -5, -10, 0];
    const currentOthersRate = minorOptions[Math.floor(Math.random() * minorOptions.length)];

    let stockFluctuationLog = "";
    
    if (game.assets.stock > 0 && game.currentStockSector) {
      if (game.currentStockSector === tEvent.up) {
        const profit = Math.round(game.assets.stock * (currentUpRate / 100));
        game.assets.stock += profit;
        stockFluctuationLog = `<div style="color:#16a34a; margin-top:8px; font-weight:bold;">📈 [수혜 반영] 보유 중인 [${upSector.name}] 테마 주가가 +${currentUpRate}% 급등하여 ${won(profit)}의 평가 차익이 발생했습니다!</div>`;
      } else if (game.currentStockSector === tEvent.down) {
        const loss = Math.round(game.assets.stock * (currentDownRate / 100));
        game.assets.stock -= loss;
        stockFluctuationLog = `<div style="color:#dc2626; margin-top:8px; font-weight:bold;">📉 [악재 반영] 보유 중인 [${downSector.name}] 테마 주가가 -${currentDownRate}% 급락하여 ${won(loss)}의 손실을 입었습니다.</div>`;
      } else {
        const diff = Math.round(game.assets.stock * (currentOthersRate / 100));
        game.assets.stock += diff;
        const diffText = diff > 0 ? `+${won(diff)} 수익` : (diff < 0 ? `${won(Math.abs(diff))} 손실` : `자산 변동 없음`);
        const diffColor = diff > 0 ? `#16a34a` : (diff < 0 ? `#dc2626` : `#6b7280`);
        const directionIcon = diff > 0 ? `🔼` : (diff < 0 ? `🔽` : `➖`);
        stockFluctuationLog = `<div style="color:${diffColor}; margin-top:8px;">${directionIcon} [시장 변동] 보유 중인 테마는 시장 흐름(${currentOthersRate > 0 ? '+'+currentOthersRate : currentOthersRate}%)에 따라 ${diffText}을 기록했습니다.</div>`;
      }
    }

    const currentSecId = game.currentStockSector;
    const currentSecObj = THEME_SECTORS.find(s => s.id === currentSecId);
    const otherSectors = THEME_SECTORS.filter(s => s.id !== currentSecId);
    const shuffledOthers = [...otherSectors].sort(() => 0.5 - Math.random());
    const pickThree = shuffledOthers.slice(0, 3);
    const stockChoices = [];

    const applyStockReputationPenalty = () => { game.reputation = clamp(game.reputation - (Math.floor(Math.random() * 3) + 1)); };

    if (currentSecObj && game.assets.stock > 0) {
      stockChoices.push({
        text: `${currentSecObj.name} 추가 매수 (1,000만)`, result: "",
        apply: function() {
          if (game.cash >= 10000000) { game.cash -= 10000000; game.assets.stock += 10000000; applyStockReputationPenalty(); this.result = `보유 중인 [${currentSecObj.name}] 주식 1,000만원을 추가 매수했습니다.`; } 
          else { this.result = "현금이 부족하여 매수하지 못했습니다."; }
        }
      });
    } else {
      const firstPick = shuffledOthers[3] || THEME_SECTORS[0];
      stockChoices.push({
        text: `${firstPick.name} 신규 매수 (1,000만)`, result: "",
        apply: function() {
          if (game.cash >= 10000000) { game.cash -= 10000000; game.assets.stock += 10000000; game.currentStockSector = firstPick.id; applyStockReputationPenalty(); this.result = `[${firstPick.name}] 주식 1,000만원을 신규 매수했습니다.`; } 
          else { this.result = "현금이 부족하여 매수하지 못했습니다."; }
        }
      });
    }

    pickThree.forEach(sec => {
      stockChoices.push({
        text: `${sec.name} ${game.assets.stock > 0 ? '갈아타기 (수수료 5%)' : '매수 (1,000만)'}`, result: "",
        apply: function() {
          if (game.assets.stock > 0) {
            const fee = Math.round(game.assets.stock * 0.05); game.assets.stock -= fee; game.currentStockSector = sec.id; applyStockReputationPenalty(); this.result = `[${sec.name}]으로 갈아탔습니다. (교체 수수료 5%인 ${won(fee)} 차감)`;
          } else {
            if (game.cash >= 10000000) { game.cash -= 10000000; game.assets.stock += 10000000; game.currentStockSector = sec.id; applyStockReputationPenalty(); this.result = `[${sec.name}] 주식 1,000만원을 매수했습니다.`; } 
            else { this.result = "현금이 부족하여 거래를 진행하지 못했습니다."; }
          }
        }
      });
    });

    if (game.assets.stock > 0) {
      stockChoices.push({
        text: "보유 주식 전량 매도 (현금화)", result: "",
        apply: function() { const v = game.assets.stock; game.cash += v; game.assets.stock = 0; game.currentStockSector = null; this.result = `보유 주식을 전량 매도하여 현금 ${won(v)}을 확보했습니다.`; }
      });
    }

    stockChoices.push({ text: "거래 안 함 (관망하고 넘어가기)", result: "이번 분기는 추가 거래 없이 시장 동향만 살피고 지나갑니다.", apply: () => {} });

    return [{
      id: "stock_integrated_event", type: "증시 시황", 
      title: `📊 ${game.year}년 연말 증시 결산 및 신년 시황`, 
      desc: `<div style="font-weight:bold; font-size:14px; margin-bottom:8px; color:#1e293b;">[시장 주요 현안] ${tEvent.title}</div>` +
            `<div style="font-size:13px; color:#475569; line-height:1.5; margin-bottom:10px;">${tEvent.desc}</div>` +
            `<div style="font-size:13px; line-height:1.6;">` +
            `• 📈 <b>급등 수혜</b>: ${upSector.name} (+${currentUpRate}% 상승)<br>` +
            `• 📉 <b>급락 악재</b>: ${downSector.name} (-${currentDownRate}% 하락)` +
            `</div>` + stockFluctuationLog,
      ok: () => true, choices: stockChoices
    }];
  }

  const e = [];

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
        const promoBonus = Math.round((game.annualIncome * (0.02 + Math.random() * 0.03)) / 10000) * 10000;
        const finalPay = game.annualIncome + promoBonus;

        e.push({
          id: "general_promotion_event", type: "정기 승진", title: `🎖️ [경사] 정기 승진 심사 통과: [${nextTitle}] 발령!`,
          desc: `현재 직급에서 ${yearsInRank}년간 성실히 근무하며 뛰어난 평판(${game.reputation}점)을 증명했습니다! [${nextTitle}]으로 공식 승진하며 연소득이 추가 인상됩니다.`,
          ok: () => true,
          choices: [{
            text: `승진 발령 수락 및 추가 인상분 수령 (${won(promoBonus)})`, 
            result: `[${nextTitle}]으로 승진 완료! 새 연소득 ${won(finalPay)}이 확정되었습니다! (평판 +5, 행복 +20)`,
            apply: function() {
              game.career.rankIndex = nextRankIdx; game.career.title = nextTitle; game.career.yearsInCurrentRank = 0;
              game.career.promoTargetYears = Math.floor(Math.random() * 5) + 4; game.annualIncome = finalPay;
              game.cumulativeIncome += promoBonus; game.cash += promoBonus;
              game.reputation = clamp(game.reputation + 5); game.happiness = clamp(game.happiness + 20);
            }
          }]
        });
      }
    }
  }

  if (game.jobKey === "entrepreneur") {
    if (game.chickenStoreCount === 1 && !game.hasOpenedStore2 && game.chickenStore1Years >= 5 && game.reputation >= 80 && game.cash >= 50000000) {
      e.push({
        id: "chicken_store2", type: "매장 확장", title: `🍗 [경사] BBQ치킨집 2호점 직영 확장 오픈!`,
        desc: `1호점을 5년간 성공적으로 운영하고 평판(${game.reputation}점)을 쌓아 2호점을 출점합니다! 가맹/인테리어 비용 5,000만원이 현금에서 지출되며, 연소득이 대폭 증가합니다.`,
        ok: () => true,
        choices: [
          { text: "현금 5,000만원 지출 및 2호점 개점식 진행", result: "직영 2호점이 대박을 터뜨리며 연소득이 3,000만원 증가했습니다!", apply: () => { game.cash -= 50000000; game.chickenStoreCount = 2; game.hasOpenedStore2 = true; game.chickenStore2Years = 0; game.annualIncome += 30000000; game.happiness += 15; } },
          { text: "자금 여유를 위해 개점을 보류한다", result: "2호점 개점을 미루고 현재 매장 운영에 집중합니다.", apply: () => {} }
        ]
      });
    }
    if (game.chickenStoreCount === 2 && !game.hasOpenedStore3 && game.chickenStore2Years >= 5 && game.reputation >= 80 && game.cash >= 50000000) {
      e.push({
        id: "chicken_store3", type: "매장 확장", title: `🍗 [대박] BBQ치킨집 3호점 오픈 및 '1,2,3호점 주인' 승급!`,
        desc: `2호점 오픈 후 5년의 노력 끝에 대망의 3호점을 개설합니다! 투자비 5,000만원이 지출되며, [1,2,3호점 주인]으로 승급합니다.`,
        ok: () => true,
        choices: [
          { text: "현금 5,000만원 지출 및 3호점 오픈", result: "3개 매장을 거느린 지역구 거물로 도약했습니다!", apply: () => { game.cash -= 50000000; game.chickenStoreCount = 3; game.hasOpenedStore3 = true; game.career.title = "1,2,3호점 주인"; game.annualIncome = Math.max(game.annualIncome + 50000000, 120000000); game.happiness += 25; } },
          { text: "안정적인 현금 보유를 위해 보류한다", result: "3호점 개점을 미루기로 결정했습니다.", apply: () => {} }
        ]
      });
    }
  }

  if (typeof getRandomJobNewsByProbability === "function" && game.jobKey && game.seasonIndex === game.newsSeasonInYear) {
    const jobNews = getRandomJobNewsByProbability(game.jobKey);
    if (jobNews) {
      e.push({
        id: "job_probability_news", type: `직장 뉴스 · ${jobNews.tier || "이슈"}`, title: `🏢 [${game.job}] ${jobNews.title}`, desc: jobNews.desc,
        ok: () => true, choices: [{ text: "현안 대응 및 결과 확인", result: "", apply: function() { this.result = jobNews.apply(game, won); } }]
      });
    }
  }

  if (game.travelCooldown === 0) {
    if (game.yearsWithoutTravelEvent >= 4 && game.seasonIndex === 1) {
      e.push(createTravelEventObj(currentSeason));
    } else if (Math.random() < 0.25) {
      e.push(createTravelEventObj(currentSeason));
    }
  }

  const diseaseEvent = checkHealthDiseaseEvent();
  if (diseaseEvent) e.push(diseaseEvent);

  if (typeof getRandomJobNewsByProbability === "function" && game.jobKey && Math.random() < 0.35) {
    const jobNews = getRandomJobNewsByProbability(game.jobKey);
    if (jobNews) {
      e.push({
        id: "job_probability_news_extra", type: `직장 소식 · ${jobNews.tier || "현안"}`, title: `🏢 [${game.job}] ${jobNews.title}`, desc: jobNews.desc,
        ok: () => true, choices: [{ text: "업무 확인 및 결과 수용", result: "", apply: function() { this.result = jobNews.apply(game, won); } }]
      });
    }
  }

  if (game.assets.car > 0) {
    if (game.carHoldingYears >= 15 || game.carCheckCount >= 2) {
      e.push({
        id: "car_scrap_event", type: "차량 폐차", title: `🚨 ${currentSeason} 자동차 점검 불가 및 강제 폐차`,
        desc: `운행 연수가 ${game.carHoldingYears}년에 달하고 누적 정비 불능 상태에 도달했습니다. 차량을 강제 폐차합니다.`,
        ok: () => true,
        choices: [{
          text: "폐차 인수증 수령 및 폐차 완료 (차량 소멸)", result: "",
          apply: function() { game.assets.car = 0; game.car = { ...carLevels[0] }; game.carHoldingYears = 0; game.carCheckCount = 0; game.stress = clamp(game.stress + 15); this.result = "차량이 완전히 폐차되어 대중교통 이용 상태로 복귀했습니다."; }
        }]
      });
    } else if (game.carHoldingYears >= 10) {
      e.push({
        id: "car_old_event", type: "차량 노후화", title: `🚗 ${currentSeason} 자동차 노후화 정기 점검`,
        desc: `현재 차량을 ${game.carHoldingYears}년째 운행 중입니다. 정밀 점검을 받습니다. (누적 3회 점검 시 강제 폐차. 현재 ${game.carCheckCount + 1}/3회)`,
        ok: () => true, choices: [{ text: "차량 상태 점검 및 수리", result: "", apply: function() { game.carCheckCount++; game.stress = clamp(game.stress + 10); game.carHoldingYears = 8; this.result = `임시 수리를 완료했습니다. (누적 점검 ${game.carCheckCount}/3회, 스트레스 +10)`; } }]
      });
    }
  }

  if (game.married && !game.divorced) {
    const yearsWithoutTravel = game.year - (game.lastTravelYear || game.marriageYear || game.year);
    const isBroke = game.annualIncome < 25000000 || netWorth() < 0;
    if ((yearsWithoutTravel >= 10 && Math.random() < 0.50) || isBroke) {
      e.push({
        id: "divorce_crisis", type: "가정 불화", title: `💔 ${currentSeason} 성격 차이 및 이혼 소송 청구`,
        desc: yearsWithoutTravel >= 10 ? `결혼 생활 중 여행을 다녀오지 않은 지 ${yearsWithoutTravel}년이 흘렀습니다. 배우자가 이혼을 청구합니다.` : "경제난으로 배우자의 이혼 청구로 합의 이혼에 도달합니다.",
        ok: () => true,
        choices: [{
          text: "이혼 합의 및 재산 50% 분할 확정", result: "",
          apply: function() {
            game.married = false; game.divorced = true; game.happiness = clamp(game.happiness - 40); game.stress = clamp(game.stress + 35); game.reputation = clamp(game.reputation - 15);
            const lostCash = Math.round(Math.max(0, game.cash) * 0.5); const lostStock = Math.round(game.assets.stock * 0.5); const lostEtc = Math.round(game.assets.etc * 0.5);
            game.cash -= lostCash; game.assets.stock -= lostStock; game.assets.etc -= lostEtc;
            this.result = `이혼 절차가 마무리되었습니다. 재산 분할로 현금 ${won(lostCash)}, 주식 ${won(lostStock)}이 지급되었습니다.`;
          }
        }]
      });
    }
  }

  if (game.seasonIndex === 0 && isSecondYearSpringOrLater) {
    const canNeg = jobs[game.jobKey] && jobs[game.jobKey].canNegotiate;
    const choices = [{ text: `통보된 연소득 확정 수락 (${won(game.annualIncome)})`, result: `올해 연소득 ${won(game.annualIncome)} 계약이 정상 완료되었습니다.`, apply: function() {} }];
    if (canNeg) {
      choices.push({
        text: "연소득 협상 시도 (추가 5~10% 인상 도전)", result: "",
        apply: function() {
          if (Math.random() < 0.25) {
            const extraMoney = Math.round((game.annualIncome * (0.05 + Math.random() * 0.05)) / 10000) * 10000;
            const repPenalty = Math.floor(Math.random() * 4) + 1;
            game.annualIncome += extraMoney; game.cumulativeIncome += extraMoney; game.cash += extraMoney; game.reputation = clamp(game.reputation - repPenalty);
            this.result = `🎉 연소득 협상 성공! 추가 인상분 ${won(extraMoney)} 획득. (평판 -${repPenalty})`;
          } else {
            const repPenalty = Math.floor(Math.random() * 11) + 10;
            game.reputation = clamp(game.reputation - repPenalty); game.stress += 12;
            this.result = `❌ 연소득 협상 결렬! 추가 인상 없이 기본 연봉 유지. (평판 -${repPenalty}, 스트레스 +12)`;
          }
        }
      });
    }
    e.push({ id: "spring_salary_event", type: "연소득 통보", title: `🌸 봄 정기 연소득 통보 및 계약`, desc: `올해 책정된 연소득 ${won(game.annualIncome)}이 확정되었습니다.`, ok: () => true, choices });
  }

  if (game.seasonIndex === 3 && !["celebrity", "entrepreneur", "unemployed", "doctor"].includes(game.jobKey)) {
    e.push({
      id: "job_bonus", type: "보너스", title: `❄️ 겨울 연말 특별 성과급`, desc: `한 해 동안의 근속 및 업무 실적을 치하하는 상여금입니다.`, ok: () => true,
      choices: [{
        text: "성과급 수령", result: "", apply: function() {
          let bonus = 0; let logDetail = "";
          if (game.jobKey === "factory_worker") { 
            bonus = Math.random() < 0.5 ? 100000 : 0; 
            logDetail = bonus ? "연말 격려금 10만원 지급!" : "성과급 미지급."; 
          }
          else if (["developer", "large_corp", "researcher", "large_factory"].includes(game.jobKey)) {
            const rand = Math.random(); 
            let rate = rand < 0.1 ? 0 : rand < 0.5 ? 0.1 : rand < 0.8 ? 0.2 : rand < 0.9 ? 0.5 : rand < 0.97 ? 1.0 : 3.0;
            bonus = Math.round((game.annualIncome * rate) / 10000) * 10000; 
            logDetail = rate > 0 ? `대기업 성과급 ${won(bonus)} 지급!` : "미지급.";
          }
          else { 
            const rate = 0.02 + Math.random() * 0.05; 
            bonus = Math.round((game.annualIncome * rate) / 10000) * 10000; 
            logDetail = `정기 성과금 ${won(bonus)} 지급.`; 
          }
          game.cash += bonus; 
          if (bonus > 0) game.happiness += 8; 
          this.result = logDetail;
        }
      }]
    });
  }

  if (!game.married && !game.divorced && !game.declaredSolo && game.gender === "남성" && game.year >= (game.marriageBlockedUntilYear || 0)) {
    const hasNoCar = !game.car || game.car.level === 0 || game.assets.car <= 0;
    const isBelowStudio = !game.housing || (game.housing.level !== undefined ? game.housing.level < 2 : false);
    if ((game.age >= 35 && game.age <= 45) || Math.random() < 0.30) {
      if (game.age >= 30 && (hasNoCar || isBelowStudio)) {
        e.push({ id: "marriage_prerequisite_alert", type: "결혼 고민", title: `💭 ${currentSeason} 결혼에 대한 현실적인 장벽`, desc: `자산 부족으로 청혼을 망설입니다.`, ok: () => true, choices: [{ text: "더 집중하기", result: "자립을 결심했습니다.", apply: () => { game.stress = clamp(game.stress + 5); } }] });
      } else if (game.age >= 45 && Math.random() < 0.60) {
        e.push({
          id: "marriage_intl", type: "인생", title: `💍 ${currentSeason} 국제결혼 주선`, desc: "지인의 주선으로 국제결혼 만남이 성사되었습니다.", ok: () => true,
          choices: [{ text: "결혼 진행 (1,500만)", result: "새 가정을 꾸렸습니다.", apply: () => { if (game.cash >= 15000000) game.cash -= 15000000; else game.debt += 15000000; game.married = true; game.marriageYear = game.year; game.lastTravelYear = game.year; game.happiness += 20; } }, { text: "평생 솔로 선언", result: "싱글라이프 선언!", apply: () => { game.declaredSolo = true; game.stress -= 10; } }]
        });
      } else if (game.age >= 30 && game.age < 35 && Math.random() < 0.70) {
        e.push({
          id: "marriage_high", type: "인생", title: `💍 ${currentSeason} 결혼 결심`, desc: "안정적인 기반을 바탕으로 연인과 결혼을 결심합니다.", ok: () => true,
          choices: [
            { text: "결혼식 진행 (3,000만)", result: "결혼식을 올렸습니다!", apply: () => { if (game.cash >= 30000000) game.cash -= 30000000; else game.debt += 30000000; game.married = true; game.marriageYear = game.year; game.lastTravelYear = game.year; game.happiness += 25; game.marriageDelayCount = 0; } },
            { text: "미룬다", result: "", apply: function() {
              game.marriageDelayCount = (game.marriageDelayCount || 0) + 1;
              if (game.marriageDelayCount >= 3) { game.health = clamp(game.health - 10); game.happiness = clamp(game.happiness - 25); game.stress = clamp(game.stress + 20); game.marriageBlockedUntilYear = game.year + 2; game.marriageDelayCount = 0; this.result = "💔 [이별] 계속해서 미루자 여자친구가 이별을 통보했습니다. (결혼 차단 2년)"; }
              else { this.result = `일에 전념합니다. (미루기 ${game.marriageDelayCount}/3회)`; }
            } }
          ]
        });
      }
    }
  }

  const validEvents = e.filter(x => x.ok());
  
  if (validEvents.length === 0) {
    validEvents.push({
      id: "ordinary_day", type: "일상", title: `🍃 ${currentSeason} 평온한 일상`,
      desc: "특별한 사건 사고 없이 무난하고 평온하게 이번 계절이 지나갑니다.",
      ok: () => true,
      choices: [
        { text: "가볍게 휴식을 취하며 다음을 기약한다", result: "조용히 일상을 보내며 소소하게 체력과 스트레스를 관리했습니다. (스트레스 -2, 건강 +2 )", 
          apply: () => { game.stress = clamp(game.stress - 2); game.health = clamp(game.health + 2); } }
      ]
    });
  }
  return validEvents;
}

function generateEvent() {
  const list = eventList();
  currentEvent = list[Math.floor(Math.random() * list.length)];
  game.lastEvent = `[${game.isStockPhase ? "증시/결산" : SEASONS[game.seasonIndex]}] ${currentEvent.title}`;
  renderEvent();
}

function resolveEvent(i) {
  if (eventResolved) return;
  const c = currentEvent.choices[i];
  
  const beforeCash = game.cash;
  const beforeStock = game.assets.stock;
  const beforeRep = game.reputation;
  
  c.apply();
  
  // [업데이트] 이벤트로 인한 직접적인 현금 증감량을 해당 시즌의 소득/지출에 기록
  const cashDiff = game.cash - beforeCash;
  if (cashDiff > 0) game.turnIncome += cashDiff;
  else if (cashDiff < 0) game.turnExpense += Math.abs(cashDiff);

  game.health = clamp(game.health); game.happiness = clamp(game.happiness); game.stress = clamp(game.stress); game.reputation = clamp(game.reputation);
  recalculateHousingAndLifestyle();
  eventResolved = false;

  $("resultText").textContent = c.result || "처리가 완료되었습니다.";
  const changes = [["현금", game.cash - beforeCash], ["주식", game.assets.stock - beforeStock], ["평판", game.reputation - beforeRep]].filter(x => x[1] !== 0).map(x => `<span class="change">${x[0]} ${typeof x[1] === "number" && Math.abs(x[1]) > 1000 ? won(x[1]) : (x[1] > 0 ? "+" : "") + x[1]}</span>`).join("");
  $("resultChanges").innerHTML = changes || '<span class="change">변동 없음</span>';
  $("resultBox").classList.remove("hidden");
  [...document.querySelectorAll(".choice")].forEach(b => b.disabled = true);
  $("eventNextBtn").disabled = false;
  updateUI();
  eventResolved = true;
}

function advanceYear() {
  if (!eventResolved) return;
  eventResolved = false;

  if (game.isStockPhase) {
    game.isStockPhase = false;
    recordHistory(); 
    generateEvent(); 
    updateUI();
    return;
  }

  if (game.travelCooldown > 0) {
    game.travelCooldown--;
  }

  if (game.seasonIndex === 3) { 
    let baseLivingCost = 0;
    
    if (game.isFirstYearWinter) {
      baseLivingCost = game.firstYearLivingCostFixed || 4000000;
      game.isFirstYearWinter = false;
      if (game.cash < 0) { 
        const liquidLog = liquidateAssetsForCash(); 
        alert(`[첫해 겨울 생활비 지출]\n${won(baseLivingCost)} 차감.\n${liquidLog}`); 
      }
    } else {
      if (game.annualIncome > 0) baseLivingCost = Math.round((game.annualIncome * (0.40 + Math.random() * 0.10)) / 10000) * 10000;
    }
    
    if (game.married && game.marriageYear && game.year > game.marriageYear) baseLivingCost = Math.round(baseLivingCost * 1.5);
    
    let housingAnnualCost = 0; let housingCostNote = "";
    
    if (game.housing.type === "monthly" && game.housing.rent > 0) { 
      housingAnnualCost = game.housing.rent * 12; 
      housingCostNote = `월세 연 ${won(housingAnnualCost)}`; 
    }
    if (game.debt > 0) { 
      const loanInterest = Math.round(game.debt * 0.04); 
      housingAnnualCost += loanInterest; 
      housingCostNote += `${housingCostNote ? ' + ' : ''}대출이자 ${won(loanInterest)}`; 
    }
    
    const totalAnnualLivingCost = baseLivingCost + housingAnnualCost;
    
    // [업데이트] 주거비/생활비를 해당 시즌 지출로 기록
    game.cash -= totalAnnualLivingCost; 
    game.turnExpense += totalAnnualLivingCost;
    game.lastYearLivingCost = totalAnnualLivingCost;
    
    if (game.cash < 0) { 
      const liquidLog = liquidateAssetsForCash(); 
      alert(`현금이 부족하여 자산이 강제 처분되었습니다.\n${liquidLog}`); 
    }

    if (game.housing.type === "jeonse") {
      game.housingYearsInCurrent = (game.housingYearsInCurrent || 0) + 1;
      if (game.housingYearsInCurrent >= 2) {
        game.housingYearsInCurrent = 0;
        const increaseDeposit = Math.round(game.assets.house * 0.05); 
        game.assets.house += increaseDeposit; 
        game.housing.deposit += increaseDeposit; 
        
        // [업데이트] 전세 인상금액도 지출로 기록
        game.cash -= increaseDeposit;
        game.turnExpense += increaseDeposit;
        
        let jeonseLog = ""; 
        if (game.cash < 0) jeonseLog = liquidateAssetsForCash();
        alert(`[전세 갱신]\n보증금 5% 인상: -${won(increaseDeposit)}\n현재 보증금: ${won(game.assets.house)}${jeonseLog ? '\n' + jeonseLog : ''}`);
      }
    } else { 
      game.housingYearsInCurrent = 0; 
    }

    if (game.age >= 60) { endGame(); return; }
    
    game.age++; 
    game.year++; 
    game.seasonIndex = 0; 
    
    game.isStockPhase = true;

    if (game.jobKey === "entrepreneur") { 
      game.chickenStore1Years++; 
      if (game.hasOpenedStore2) game.chickenStore2Years++; 
      if (game.hasOpenedStore3) game.chickenStore3Years++; 
    }
    if (game.career && game.career.yearsInCurrentRank !== undefined) game.career.yearsInCurrentRank++;
    
    if (game.hasTravelOccurredThisYear) {
      game.yearsWithoutTravelEvent = 0;
    } else {
      game.yearsWithoutTravelEvent++;
    }
    game.hasTravelOccurredThisYear = false;
    game.newsSeasonInYear = Math.floor(Math.random() * 4);

    if (game.assets.car > 0) game.carHoldingYears++;
    else {
      const oldStress = game.stress; 
      game.stress = clamp(game.stress + Math.floor(Math.random() * 10) + 1);
      if (Math.floor(game.stress / 20) > Math.floor(oldStress / 20)) {
        game.health = clamp(game.health - ((Math.floor(game.stress / 20) - Math.floor(oldStress / 20)) * 10));
      }
    }
    
    game.reputation = clamp(game.reputation + Math.floor(Math.random() * 5) + 1);

    if (game.jobKey !== "unemployed") {
      if (game.jobKey === "factory_worker") { 
        if (Math.random() >= 0.5) game.annualIncome = Math.round((game.annualIncome * 1.03) / 10000) * 10000; 
      }
      else if (["developer", "large_corp", "researcher", "large_factory"].includes(game.jobKey)) {
        game.annualIncome = Math.round((game.annualIncome * (1 + 0.03 + Math.random() * 0.03)) / 10000) * 10000;
      }
      else if (["civil", "teacher", "nurse", "police", "firefighter", "sme_corp"].includes(game.jobKey)) { 
        game.annualIncome = Math.round((game.annualIncome * (1 + 0.01 + Math.random() * 0.03)) / 10000) * 10000; 
        if (jobs[game.jobKey].isGov) game.career.govStep++;
      }
      else if (game.jobKey === "entrepreneur") { 
        if (game.annualIncome < getChickenBasePay()) game.annualIncome = getChickenBasePay(); 
      }
      else if (game.jobKey === "celebrity") { 
        game.annualIncome = Math.max(20000000, Math.round((game.annualIncome * (1 - 0.20 + Math.random() * 0.60)) / 10000) * 10000); 
        if (game.reputation >= 90) game.career.title = "탑스타"; 
      }
      else if (game.jobKey === "professional") {
        game.annualIncome = Math.round((game.annualIncome * (1 + 0.05 + Math.random() * 0.05)) / 10000) * 10000;
      }
      else {
        game.annualIncome = Math.round((game.annualIncome * (1.02 + Math.random() * 0.03)) / 10000) * 10000;
      }
      
      // [업데이트] 당해 연봉을 해당 시즌(겨울/증시)의 소득으로 기록
      game.cash += game.annualIncome; 
      game.turnIncome += game.annualIncome;
      game.cumulativeIncome += game.annualIncome;
    }
  } else { 
    game.seasonIndex++; 
  }

  recalculateHousingAndLifestyle(); 
  recordHistory(); // 시즌 결산 및 소득/지출 기록 저장 후 리셋
  if (game.age >= 60 && game.seasonIndex === 3) { endGame(); return; }
  generateEvent(); 
  updateUI();
}
