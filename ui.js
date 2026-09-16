/* ==========================================================================
   [MY LIFE] 사용자 인터페이스 (ui.js)
   - DOM 렌더링, 룰렛 제어, 주식 결산 UI 렌더링, 주택/차량 매매 등
   ========================================================================== */

const $ = id => document.getElementById(id);

function assignRandomName(gender) {
  const nameInput = $("playerName");
  if (!nameInput) return;
  nameInput.value = gender === "여성" 
    ? FEMALE_NAMES[Math.floor(Math.random() * FEMALE_NAMES.length)]
    : MALE_NAMES[Math.floor(Math.random() * MALE_NAMES.length)];
}

function initBirthUI() {
  const genderSelect = $("playerGender");
  const yearInput = $("playerBirthYear");
  const monthSelect = $("playerBirthMonth");
  const daySelect = $("playerBirthDay");

  if (genderSelect && !genderSelect.value) genderSelect.value = Math.random() < 0.5 ? "남성" : "여성";
  if (genderSelect) assignRandomName(genderSelect.value);
  if (yearInput) yearInput.value = `${FIXED_BIRTH_YEAR}년`;
  if (!monthSelect || !daySelect) return;

  monthSelect.innerHTML = "";
  for (let m = 1; m <= 12; m++) {
    const opt = document.createElement("option");
    opt.value = String(m).padStart(2, '0'); opt.textContent = `${m}월`;
    monthSelect.appendChild(opt);
  }
  monthSelect.value = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');

  function updateDays(keepCurrent = false) {
    const selectedMonth = parseInt(monthSelect.value, 10) || 1;
    const lastDay = new Date(FIXED_BIRTH_YEAR, selectedMonth, 0).getDate();
    const currentVal = daySelect.value;
    daySelect.innerHTML = "";
    for (let d = 1; d <= lastDay; d++) {
      const opt = document.createElement("option");
      opt.value = String(d).padStart(2, '0'); opt.textContent = `${d}일`;
      daySelect.appendChild(opt);
    }
    if (keepCurrent && currentVal && parseInt(currentVal, 10) <= lastDay) daySelect.value = currentVal;
    else daySelect.value = String(Math.floor(Math.random() * lastDay) + 1).padStart(2, '0');
  }

  monthSelect.onchange = () => { updateDays(false); updateProfilePreview(); };
  daySelect.onchange = () => { updateProfilePreview(); };
  updateDays(false); updateProfilePreview();
}

function getSelectedBirthDate() { return `${FIXED_BIRTH_YEAR}-${$("playerBirthMonth")?.value || "01"}-${$("playerBirthDay")?.value || "01"}`; }

function currentCareerTitle() {
  if (!game || !game.career) return "무직";
  if (jobs[game.jobKey] && jobs[game.jobKey].isGov) return `${game.career.title} (${game.career.govStep || 1}호봉)`;
  return game.career.title;
}

function renderEvent() {
  $("eventType").textContent = game.isStockPhase 
    ? `연말/연초 · ${currentEvent.type}` 
    : `${SEASONS[game.seasonIndex]} · ${currentEvent.type}`;
    
  $("eventTitle").textContent = currentEvent.title;
  $("eventDescription").innerHTML = currentEvent.desc;
  $("choices").innerHTML = "";

  currentEvent.choices.forEach((c, i) => {
    const b = document.createElement("button");
    b.className = "choice"; b.textContent = `${i + 1}. ${c.text}`;
    b.onclick = () => resolveEvent(i);
    $("choices").appendChild(b);
  });
  $("resultBox").classList.add("hidden");
  // [업데이트] eventNextBtn 버튼이 삭제되었으므로 해당 버튼 제어 코드는 제거되었습니다.
}

function updateUI() {
  $("ageText").textContent = game.age; 
  $("yearText").textContent = game.isStockPhase ? `${game.year} 증시 결산` : `${game.year} ${SEASONS[game.seasonIndex]}`;
  
  $("jobText").textContent = `${game.job} (${game.currentRegion})`;
  $("careerText").textContent = `${currentCareerTitle()} · ${game.education}`;
  $("incomeText").textContent = won(game.annualIncome); $("cumIncomeText").textContent = `생애소득 ${won(game.cumulativeIncome)}`;
  $("housingText").textContent = `${game.housing.name} (${game.currentRegion})`; $("netWorthText").textContent = `순자산 ${won(netWorth())}`;
  $("carText").textContent = `${game.car.name} (${won(game.assets.car)})`;
  $("familyText").textContent = game.divorced ? "돌싱" : (game.married ? (game.children ? `배우자·자녀 ${game.children}명` : "기혼") : "미혼");
  $("marriageStateText").textContent = `병역: ${game.military}`;
  $("healthText").textContent = game.health; $("happinessText").textContent = game.happiness;
  $("stressText").textContent = game.stress; $("repText").textContent = game.reputation;

  const currentSectorObj = THEME_SECTORS.find(s => s.id === game.currentStockSector);
  $("stockAsset").textContent = `${won(game.assets.stock)} ${game.assets.stock > 0 ? (currentSectorObj ? `[${currentSectorObj.name}]` : "[일반]") : ''}`;
  $("houseAsset").textContent = won(game.assets.house); $("carAsset").textContent = won(game.assets.car);
  $("debtAsset").textContent = won(game.debt); $("cashAsset").textContent = won(game.cash);
  $("totalAsset").textContent = won(totalAssets()); if ($("totalAssetSub")) $("totalAssetSub").textContent = won(totalAssets());

  if ($("careerDetail")) {
    const isGov = jobs[game.jobKey] && jobs[game.jobKey].isGov; const canNeg = jobs[game.jobKey] && jobs[game.jobKey].canNegotiate;
    const isPromotable = PROMOTABLE_JOB_KEYS.includes(game.jobKey);
    const promoInfo = isPromotable ? `근속 ${game.career.yearsInCurrentRank || 0}년차 (승진요건: ${game.career.promoTargetYears || 4}년 이상 & 평판 90점 이상)` : `독자 소득 시스템 적용`;
    $("careerDetail").innerHTML = `
      <div><span>학력 / 병역 / 거주</span><strong>${game.education} · ${game.military} · ${game.currentRegion}</strong></div>
      <div><span>현재 평판</span><strong>⭐ ${game.reputation}점 ${game.reputation >= 90 ? '(승진 유력)' : (game.reputation < 50 ? '(해고 위험)' : '(보통)')}</strong></div>
      <div><span>현재 연소득</span><strong>${won(game.annualIncome)} ${isGov ? '(호봉제)' : (canNeg ? '(협상가능)' : '')}</strong></div>
      <div><span>승진 현황</span><strong style="font-size:13px">${promoInfo}</strong></div>
    `;
  }
  updateActionButtonsLabel(); renderHistory(); renderTimeline(); drawChart("assetChart");
}



function updateActionButtonsLabel() {
  const regionalHousing = getRegionalHousingLevels(game.currentRegion);
  const curHLevel = game.housing.level !== undefined ? game.housing.level : 0;
  if ($("houseUpBtn")) {
    if (curHLevel >= regionalHousing.length - 1) { $("houseUpBtn").textContent = "🏠 주택 UP (최고 등급)"; $("houseUpBtn").disabled = true; }
    else { $("houseUpBtn").textContent = `🏠 주택 UP (${regionalHousing[curHLevel + 1].name})`; $("houseUpBtn").disabled = false; }
  }
  if ($("houseDownBtn")) {
    if (curHLevel <= 0) { $("houseDownBtn").textContent = "📉 주택 DOWN (최저 등급)"; $("houseDownBtn").disabled = true; }
    else { $("houseDownBtn").textContent = `📉 주택 DOWN (${regionalHousing[curHLevel - 1].name})`; $("houseDownBtn").disabled = false; }
  }
  
  // [수정됨] 자동차 UP/DOWN 버튼에 등급(Level) 표시
  const curCLevel = game.car.level !== undefined ? game.car.level : (game.assets.car > 0 ? 1 : 0);
  if ($("carUpBtn")) {
    if (curCLevel >= carLevels.length - 1) { $("carUpBtn").textContent = "🚗 차량 UP (최고 등급)"; $("carUpBtn").disabled = true; }
    else { $("carUpBtn").textContent = `🚗 차량 UP (${curCLevel + 1}등급)`; $("carUpBtn").disabled = false; }
  }
  if ($("carNewBtn")) {
    if (curCLevel <= 0) { $("carNewBtn").disabled = true; }
    else { $("carNewBtn").disabled = false; }
  }
  if ($("carDownBtn")) {
    if (curCLevel <= 0) { $("carDownBtn").textContent = "📉 차량 DOWN (차량 없음)"; $("carDownBtn").disabled = true; }
    else { 
      const downLabel = curCLevel - 1 === 0 ? "대중교통" : `${curCLevel - 1}등급`;
      $("carDownBtn").textContent = `📉 차량 DOWN (${downLabel}: 현금 확보)`; 
      $("carDownBtn").disabled = false; 
    }
  }
}


// 탭 기능 및 연대별 기록 분할 표시
let currentTableTab = 2; // 기본값: 20대
let currentHistoryTab = 2;

function setTableTab(decade) {
  currentTableTab = decade;
  renderHistory();
  document.querySelectorAll('.table-tab-btn').forEach(btn => {
    btn.classList.toggle('active', parseInt(btn.dataset.tab) === decade);
  });
}

function setHistoryTab(decade) {
  currentHistoryTab = decade;
  renderTimeline();
  document.querySelectorAll('.record-tab-btn').forEach(btn => {
    btn.classList.toggle('active', parseInt(btn.dataset.tab) === decade);
  });
}

function renderHistory() {
  $("historyCount").textContent = `${game.history.length}회 기록`;
  
  const decadeStart = currentTableTab * 10;
  const decadeEnd = decadeStart + 9;
  const filtered = game.history.filter(h => h.age >= decadeStart && h.age <= decadeEnd);

  $("historyBody").innerHTML = filtered.map(h => `
    <tr>
      <td><strong>${h.age}세</strong><br><small>${h.year} (${h.season})</small></td>
      <td>${h.job}<br><small style="color:#6b7280">${h.career}</small></td>
      <td style="color:#16a34a">${h.income > 0 ? `+${won(h.income)}` : '0원'}</td>
      <td style="color:#dc2626">${h.livingCost > 0 ? `-${won(h.livingCost)}` : '0원'}</td>
      <td>${won(h.houseAsset)}</td>
      <td>${won(h.carAsset)}</td>
      <td>${won(h.stockAsset)}</td>
      <td style="color:#dc2626">${h.debtAsset > 0 ? won(h.debtAsset) : '-'}</td>
      <td>${won(h.cashAsset)}</td>
      <td style="color:#2563eb"><strong>${won(h.netWorth)}</strong></td>
    </tr>
  `).join("");
}

function renderTimeline() {
  if (!game) return;
  const decadeStart = currentHistoryTab * 10;
  const decadeEnd = decadeStart + 9;
  const filtered = game.history.filter(h => h.age >= decadeStart && h.age <= decadeEnd);

  $("timeline").innerHTML = filtered.map(h => {
    // [업데이트] 특별한 이벤트 키워드 검출을 통한 배경색(highlightClass) 적용
    let highlightClass = "";
    const evt = h.event || "";
    if (evt.includes("[집구매]")) highlightClass = "event-highlight-house";
    else if (evt.includes("[자동차구매]")) highlightClass = "event-highlight-car";
    else if (evt.includes("[결혼]")) highlightClass = "event-highlight-marriage";
    else if (evt.includes("[이혼]")) highlightClass = "event-highlight-divorce";
    else if (evt.includes("[승진]")) highlightClass = "event-highlight-promo";
    else if (evt.includes("[주식급등]")) highlightClass = "event-highlight-stock";

    return `
    <article class="timeline-item ${highlightClass}">
      <div style="font-weight:bold">${h.age}세 (${h.year} ${h.season}) - ${h.job} (${h.career})</div>
      <div style="margin-top:6px;color:#475569; line-height:1.4;">${evt}</div>
      <div style="margin-top:8px; font-size:12px;">
        소득: <span style="color:#16a34a">${won(h.income)}</span> | 
        지출: <span style="color:#dc2626">${won(h.livingCost)}</span> | 
        주거: ${h.housing} | 대출: ${won(h.debtAsset)} | 
        <strong>순자산: ${won(h.netWorth)}</strong>
      </div>
    </article>
  `}).join("");
}

// 순자산 기준 특정 연령대 막대그래프 렌더링
function drawChart(id) {
  const canvas = $(id); if (!canvas || !game || !game.history.length) return;
  const ctx = canvas.getContext("2d");
  const r = canvas.getBoundingClientRect(), dpr = window.devicePixelRatio || 1;
  const w = Math.max(300, r.width), h = Math.max(180, r.height);
  canvas.width = w * dpr; canvas.height = h * dpr;
  ctx.scale(dpr, dpr);
  
  const pad = { l: 60, r: 15, t: 25, b: 25 };
  const targetAges = [20, 25, 30, 35, 40, 45, 50, 55, 60];
  
  const dataPoints = targetAges.map(age => {
    const entries = game.history.filter(h => h.age === age);
    if (entries.length > 0) return entries[entries.length - 1].netWorth;
    return null;
  });
  
  const validData = dataPoints.filter(v => v !== null);
  if (validData.length === 0) return;
  
  const maxVal = Math.max(...validData, 10000000); 
  const minVal = Math.min(...validData, 0); 
  const range = maxVal - minVal;
  
  ctx.clearRect(0, 0, w, h);
  ctx.strokeStyle = "#e5e7eb"; ctx.fillStyle = "#6b7280"; ctx.font = "11px Arial";
  
  for (let i = 0; i <= 4; i++) { 
     const val = maxVal - range * (i / 4);
     const y = pad.t + (h - pad.t - pad.b) * (i / 4); 
     ctx.beginPath(); ctx.moveTo(pad.l, y); ctx.lineTo(w - pad.r, y); ctx.stroke(); 
     ctx.fillText(won(val), 5, y + 4); 
  }
  
  const zeroY = pad.t + (maxVal / range) * (h - pad.t - pad.b);
  if(minVal < 0) {
     ctx.strokeStyle = "#9ca3af";
     ctx.beginPath(); ctx.moveTo(pad.l, zeroY); ctx.lineTo(w - pad.r, zeroY); ctx.stroke();
  }
  
  const pw = w - pad.l - pad.r;
  const ph = h - pad.t - pad.b;
  const barWidth = (pw / targetAges.length) * 0.6;
  
  targetAges.forEach((age, i) => {
     const xCenter = pad.l + (pw / targetAges.length) * (i + 0.5);
     ctx.fillStyle = "#6b7280";
     ctx.textAlign = "center";
     ctx.fillText(age + "세", xCenter, h - 5);
     
     const val = dataPoints[i];
     if (val !== null) {
         const barH = (Math.abs(val) / range) * ph;
         const barX = xCenter - barWidth / 2;
         
         ctx.fillStyle = val >= 0 ? "#3b82f6" : "#ef4444";
         if (val >= 0) {
             ctx.fillRect(barX, zeroY - barH, barWidth, barH);
         } else {
             ctx.fillRect(barX, zeroY, barWidth, barH);
         }
     }
  });
}

// ======================== 주식 모달 로직 ========================
function openStockModal() {
  const modal = $("stockModal"); if (!modal) return;
  const currentSectorObj = THEME_SECTORS.find(s => s.id === game.currentStockSector);
  $("currentStockModalInfo").textContent = game.assets.stock > 0 ? `현재 보유: [${currentSectorObj?.name || '일반'}] ${won(game.assets.stock)} (1개 테마만 보유 가능)` : "현재 보유 주식 없음 (1,000만원 단위로 매수 가능)";
  const listEl = $("gicsSectorList"); listEl.innerHTML = "";
  THEME_SECTORS.forEach(sec => {
    const item = document.createElement("div"); item.className = "sector-trade-item";
    const isCurrent = game.currentStockSector === sec.id;
    item.innerHTML = `<div><strong>${sec.name} ${isCurrent ? '<span style="color:#2563eb">(보유중)</span>' : ''}</strong><small>${sec.desc}</small></div><button class="primary" data-id="${sec.id}">${isCurrent ? '추가 매수(1,000만)' : (game.assets.stock > 0 ? '갈아타기(수수료 5%)' : '매수(1,000만)')}</button>`;
    item.querySelector("button").onclick = () => buySpecificStockSector(sec.id); listEl.appendChild(item);
  });
  modal.classList.remove("hidden");
}
function closeStockModal() { if ($("stockModal")) $("stockModal").classList.add("hidden"); }

function buySpecificStockSector(sectorId) {
  const sec = THEME_SECTORS.find(s => s.id === sectorId);
  if (game.assets.stock > 0 && game.currentStockSector === sectorId) { if (game.cash < 10000000) return alert("현금이 부족합니다."); game.cash -= 10000000; game.assets.stock += 10000000; game.reputation = clamp(game.reputation - (Math.floor(Math.random() * 3) + 1)); updateUI(); openStockModal(); return; }
  if (game.assets.stock > 0 && game.currentStockSector !== sectorId) {
    const fee = Math.round(game.assets.stock * 0.05);
    if (!confirm(`갈아타시겠습니까?\n수수료 5%(${won(fee)}) 차감.`)) return;
    game.assets.stock -= fee; game.currentStockSector = sectorId; game.reputation = clamp(game.reputation - (Math.floor(Math.random() * 3) + 1)); updateUI(); openStockModal(); return;
  }
  if (game.cash < 10000000) return alert("현금이 부족합니다.");
  game.cash -= 10000000; game.assets.stock += 10000000; game.currentStockSector = sectorId; game.reputation = clamp(game.reputation - (Math.floor(Math.random() * 3) + 1)); updateUI(); openStockModal();
}
function sellAllStock() { if (game.assets.stock <= 0) return alert("보유 주식이 없습니다."); const v = game.assets.stock; game.cash += v; game.assets.stock = 0; game.currentStockSector = null; alert(`현금 ${won(v)} 확보.`); updateUI(); closeStockModal(); }

// ======================== 주택 / 차량 조작 메뉴 연결 로직 ========================
function openHouseMenuModal() { $("houseMenuModal").classList.remove("hidden"); }
function closeHouseMenuModal() { $("houseMenuModal").classList.add("hidden"); }
function openCarMenuModal() { $("carMenuModal").classList.remove("hidden"); }
function closeCarMenuModal() { $("carMenuModal").classList.add("hidden"); }

function openHouseModal(nextHouse, availableHousingFunds, loanMax, downPayment, cashNeededWithLoan, cashNeededFull) {
  const modal = $("houseModal"); if (!modal) return;
  
  $("houseModalDesc").textContent = `[${nextHouse.name}] 매매가: ${won(nextHouse.houseValue)} (기존 주택 처분 적용: ${won(availableHousingFunds)})`;
  $("modalLoanText").textContent = `${Math.round(nextHouse.loanRate * 100)}% 대출(${won(loanMax)}, 연 4% 이자) | 필요현금: ${won(cashNeededWithLoan)}`;
  
  $("houseLoanBtn").onclick = () => { 
    if (game.cash < cashNeededWithLoan) return alert(`현금이 부족합니다.`); 
    game.cash = game.cash + availableHousingFunds - downPayment; 
    game.assets.house = nextHouse.houseValue; 
    game.debt = loanMax; 
    game.housing = { ...nextHouse, owned: true, deposit: 0 }; 
    game.happiness = clamp(game.happiness + 15);
    game.lastEvent = `[집구매] ${nextHouse.name} (대출) 확보`; // [업데이트] 연표 기록 하이라이팅용 태그 추가
    closeHouseModal(); closeHouseMenuModal(); updateUI(); 
  };
  
  $("houseFullBtn").onclick = () => { 
    if (game.cash < cashNeededFull) return alert(`일시불 매매를 위한 현금이 부족합니다.`); 
    game.cash = game.cash + availableHousingFunds - nextHouse.houseValue; 
    game.assets.house = nextHouse.houseValue; 
    game.debt = 0; 
    game.housing = { ...nextHouse, owned: true, deposit: 0 }; 
    game.happiness = clamp(game.happiness + 20); 
    game.lastEvent = `[집구매] ${nextHouse.name} (일시불) 확보`; // [업데이트] 연표 기록 하이라이팅용 태그 추가
    closeHouseModal(); closeHouseMenuModal(); updateUI(); 
  };
  
  $("closeHouseModalBtn").onclick = () => closeHouseModal(); modal.classList.remove("hidden");
}
function closeHouseModal() { if ($("houseModal")) $("houseModal").classList.add("hidden"); }

function houseUp() {
  const regionalHousing = getRegionalHousingLevels(game.currentRegion);
  const curLevel = game.housing.level !== undefined ? game.housing.level : 0;
  if (curLevel >= regionalHousing.length - 1) return alert("이미 최고 등급 주택에 거주 중입니다.");
  const next = regionalHousing[curLevel + 1]; 

  let availableHousingFunds = 0;
  if (game.housing.type === "owned") {
    availableHousingFunds = game.assets.house - game.debt; 
  } else {
    availableHousingFunds = game.housing.deposit || 0; 
  }

  if (next.name === "84㎡ 아파트 자가") { 
    const loanMax = Math.round(next.houseValue * next.loanRate);
    const downPayment = next.houseValue - loanMax;
    const cashNeededWithLoan = downPayment - availableHousingFunds;
    const cashNeededFull = next.houseValue - availableHousingFunds;
    openHouseModal(next, availableHousingFunds, loanMax, downPayment, cashNeededWithLoan, cashNeededFull); 
    return; 
  }
  
  if (next.houseValue > 0) {
    const cashNeeded = next.houseValue - availableHousingFunds; 
    const confirmMsg = `[일시불 매매 견적]\n\n매매가: ${won(next.houseValue)}\n기존 주택 처분 자금: +${won(availableHousingFunds)}\n실제 필요 현금: ${won(cashNeeded)}\n\n매매하시겠습니까?`;
    if (!confirm(confirmMsg)) return;
    if (game.cash < cashNeeded) return alert(`현금이 부족합니다. 추가로 ${won(cashNeeded - game.cash)}이 필요합니다.`);
    
    game.cash = game.cash + availableHousingFunds - next.houseValue; 
    game.assets.house = next.houseValue; game.debt = 0; 
    game.housing = { ...next, owned: true, deposit: 0 }; game.happiness = clamp(game.happiness + 25);
    game.lastEvent = `[집구매] ${next.name} 상향 확보`; // [업데이트] 연표 기록 하이라이팅용 태그 추가
  } else { 
    const diff = next.deposit - availableHousingFunds; 
    const confirmMsg = `[상향 이사 견적]\n\n대상 주택: ${next.name} (보증금 ${won(next.deposit)})\n기존 보증금 환급: +${won(availableHousingFunds)}\n추가 필요 금액: ${won(diff)}\n\n이사를 진행하시겠습니까?`;
    if (!confirm(confirmMsg)) return;
    if (game.cash < diff) return alert(`현금이 부족합니다. 추가로 ${won(diff - game.cash)}이 필요합니다.`);
    
    game.cash -= diff; game.assets.house = next.deposit; game.debt = 0; 
    game.housing = { ...next, owned: false }; game.happiness = clamp(game.happiness + 8);
  }
  closeHouseMenuModal(); updateUI();
}

function houseDown() {
  const regionalHousing = getRegionalHousingLevels(game.currentRegion);
  const curLevel = game.housing.level !== undefined ? game.housing.level : 0;
  if (curLevel <= 0) return alert("최저 등급 주택입니다.");
  const prev = regionalHousing[curLevel - 1];
  
  if (game.housing.type === "owned") {
    const sellPrice = Math.round(game.assets.house * 0.95); 
    const finalCashInHand = sellPrice - game.debt - prev.deposit;
    if (!confirm(`다운그레이드하시겠습니까?\n주택 매각 및 부채 상환 후 최종 확보 현금: ${won(finalCashInHand)} (행복 -10)`)) return;
    
    game.cash = game.cash + sellPrice - game.debt - prev.deposit; 
    game.debt = 0; game.assets.house = prev.deposit; 
    game.housing = { ...prev, owned: false }; game.happiness = clamp(game.happiness - 10);
  } else {
    const refund = (game.housing.deposit || 0) - prev.deposit; 
    if (!confirm(`하향 이사를 진행하시겠습니까?\n보증금 환급액: ${won(refund)}`)) return;
    game.cash += refund; game.assets.house = prev.deposit; game.housing = { ...prev, owned: false };
  }
  closeHouseMenuModal(); updateUI();
}

// [업데이트] 현금 자산으로 남은 대출 전액 상환하기 로직 추가
function repayLoan() {
  if (!game) return;
  if (game.debt <= 0) {
    return alert("현재 상환할 대출 부채가 없습니다.");
  }
  if (game.cash < game.debt) {
    return alert(`현금이 부족합니다. 대출은 전액 상환만 가능하며, 현금 ${won(game.debt)}이 필요합니다.`);
  }
  if (confirm(`현재 대출금 ${won(game.debt)}을 전액 상환하시겠습니까?\n(상환 시 주택은 완전한 자가로 전환되며, 대출 이자가 더 이상 나가지 않습니다.)`)) {
    game.cash -= game.debt;
    game.debt = 0;
    if (game.housing) game.housing.loanRate = 0; 
    game.lastEvent = "[집구매] 대출금 전액 상환 완료 및 완전한 자가 확보"; // [업데이트] 연표 기록 하이라이팅용 태그 추가
    alert("대출 상환이 완료되었습니다! 이제 완전한 자가 주택입니다.");
    updateUI();
  }
}


// [수정됨] 차종 배열(names)에서 랜덤으로 차량을 뽑아 game.car 에 저장
function carUp() {
  const curLevel = game.car.level !== undefined ? game.car.level : (game.assets.car > 0 ? 1 : 0);
  if (curLevel >= carLevels.length - 1) return alert("최고급 차량입니다.");
  const next = carLevels[curLevel + 1]; 
  const needCash = next.value - Math.round(game.assets.car * 0.9);
  if (!confirm(`차량을 업그레이드하시겠습니까?\n필요 현금: ${won(needCash)}`)) return;
  if (game.cash < needCash) return alert(`현금이 부족합니다.`);
  
  // 랜덤 자동차 뽑기
  const randomCarName = next.names[Math.floor(Math.random() * next.names.length)];
  
  game.cash -= needCash; 
  game.assets.car = next.value; 
  game.car = { level: next.level, name: randomCarName, value: next.value }; 
  game.carHoldingYears = 0; 
  game.carCheckCount = 0; 
  game.happiness = clamp(game.happiness + 8); 
  game.lastEvent = `[자동차구매] ${randomCarName} 업그레이드`; 
  closeCarMenuModal(); 
  updateUI();
}



function carNew() {
  const curLevel = game.car.level !== undefined ? game.car.level : (game.assets.car > 0 ? 1 : 0);
  if (curLevel <= 0) return alert("보유한 차량이 없어 신차 교환이 불가능합니다.");
  const targetCar = carLevels[curLevel];
  const tradeInVal = Math.round(game.assets.car * 0.9);
  const needCash = targetCar.value - tradeInVal;
  
  if (!confirm(`[동일 등급 신차 교환]\n기존 차량 처분 보상액: ${won(tradeInVal)}\n동일 신차 구입가: ${won(targetCar.value)}\n추가 필요 현금: ${won(needCash)}\n\n신차로 교체하여 차량 노후도를 리셋하시겠습니까?`)) return;
  if (game.cash < needCash) return alert(`현금이 부족합니다. 추가로 ${won(needCash - game.cash)}이 필요합니다.`);
  
  // 랜덤 자동차 뽑기
  const randomCarName = targetCar.names[Math.floor(Math.random() * targetCar.names.length)];
  
  game.cash -= needCash; 
  game.assets.car = targetCar.value; 
  game.car = { level: targetCar.level, name: randomCarName, value: targetCar.value }; 
  game.carHoldingYears = 0; 
  game.carCheckCount = 0; 
  game.happiness = clamp(game.happiness + 5); 
  game.lastEvent = `[자동차구매] ${randomCarName} 신차 교환`; 
  closeCarMenuModal(); 
  updateUI();
}


function carDown() {
  const curLevel = game.car.level !== undefined ? game.car.level : (game.assets.car > 0 ? 1 : 0);
  if (curLevel <= 0) return alert("차량이 없습니다.");
  const prev = carLevels[curLevel - 1]; 
  const getCash = Math.round(game.assets.car * 0.9) - prev.value;
  if (!confirm(`차량을 다운그레이드하시겠습니까?\n현금 확보액: ${won(getCash)}`)) return;
  
  // 랜덤 자동차 뽑기 (대중교통일 경우 배열에 1개밖에 없으므로 자연스럽게 할당됨)
  const randomCarName = prev.names[Math.floor(Math.random() * prev.names.length)];
  
  game.cash += getCash; 
  game.assets.car = prev.value; 
  game.car = { level: prev.level, name: randomCarName, value: prev.value }; 
  game.carHoldingYears = 0; 
  game.carCheckCount = 0; 
  closeCarMenuModal(); 
  updateUI();
}


function handleHomeReset() {
  if (confirm("다시 인생을 처음부터 시작하겠습니까?")) {
    game = null; currentEvent = null; eventResolved = false; show("startScreen"); initBirthUI();
  }
}

function endGame() {
  show("endScreen"); const nw = netWorth(); $("endingTitle").textContent = `${game.name}님의 60년 인생 결산`;
  $("endingMessage").textContent = `[${game.education} / ${game.military}]으로 출발하여 [${game.currentRegion}]에서 60세까지 달려온 총결산 리포트입니다.`;
  const stats = [
    { label: "💼 최종 커리어 & 거주지", val: `${game.job} (${currentCareerTitle()})`, sub: `거주지: ${game.currentRegion} | 학력: ${game.education}` },
    { label: "💰 최종 순자산", val: won(nw), sub: `총자산: ${won(totalAssets())} (부채 ${won(game.debt)})`, highlight: true },
    { label: "💵 누적 생애소득", val: won(game.cumulativeIncome), sub: `최종 연소득: ${won(game.annualIncome)}` },
    { label: "🏠 최종 주거 및 차량", val: `${game.housing.name}`, sub: `차량: ${game.car.name} (${won(game.assets.car)})` },
    { label: "👨‍👩‍👧 가족 관계", val: game.divorced ? "돌싱" : (game.married ? "화목한 가정" : "솔로"), sub: `행복: ${game.happiness}점 / 건강: ${game.health}점` },
    { label: "⭐ 최종 평판 & 명예", val: `${game.reputation}점`, sub: game.reputation >= 90 ? "사회적 존경" : "성실한 시민" }
  ];
  $("endingStats").innerHTML = stats.map(x => `<div class="stat-card ${x.highlight ? 'highlight-card' : ''}"><span>${x.label}</span><strong>${x.val}</strong><small>${x.sub}</small></div>`).join("");
  setTimeout(() => drawChart("endingChart"), 50);
}

function show(id) { ["startScreen", "rouletteScreen", "gameScreen", "recordScreen", "endScreen"].forEach(x => $(x).classList.toggle("hidden", x !== id)); }

function updateProfilePreview() {
  if ($("previewName") && $("playerName")) $("previewName").textContent = $("playerName").value.trim() || "플레이어";
  if ($("previewRegion") && $("playerRegion")) $("previewRegion").textContent = $("playerRegion").value;
  if ($("previewGender") && $("playerGender")) $("previewGender").textContent = $("playerGender").value;
  if ($("previewBirth")) $("previewBirth").textContent = getSelectedBirthDate();
}

let tripleSlotState = { spinning: false, base: null, target1: null, target2: null, target3Key: null };
function setupReelTrack(reelTrackId, list, targetLabel, getLabel, getDesc) {
  const track = $(reelTrackId); const items = [];
  for (let i = 0; i < 5; i++) for (const it of list) items.push(it);
  const midIndex = list.length * 3 + Math.floor(list.length / 2);
  items[midIndex] = list.find(x => getLabel(x) === targetLabel) || list[0];
  track.innerHTML = items.map(item => `<div class="reel-item" data-label="${getLabel(item)}">${getLabel(item)}<small>${getDesc(item)}</small></div>`).join("");
  track.style.transition = "none"; track.style.transform = "translateY(0px)";
}

function startTripleSlotRoulette(baseData) {
  tripleSlotState.base = baseData; tripleSlotState.spinning = false;
  const educations = [{ title: "고졸", addAge: 0 }, { title: "전문대졸 (2년제)", addAge: 2 }, { title: "대졸 (4년제)", addAge: 4 }, { title: "대학원 졸업", addAge: 6 }];
  let miliTypes = [{ title: "해당 없음", addAge: 0, penaltyHealth: 0, isDischarged: false }];
  if (baseData.gender === "남성") miliTypes = [{ title: "육군 만기 전역", addAge: 2, penaltyHealth: 0, isDischarged: true }, { title: "해군 만기 전역", addAge: 2, penaltyHealth: 0, isDischarged: true }, { title: "공군 만기 전역", addAge: 2, penaltyHealth: 0, isDischarged: true }, { title: "병역 면제", addAge: 0, penaltyHealth: 10, isDischarged: false }];
  const combos = []; educations.forEach(e => { miliTypes.forEach(m => { combos.push({ edu: e.title, mili: m.title, isDischarged: m.isDischarged, startAge: 20 + e.addAge + m.addAge, initialHealth: 90 - m.penaltyHealth, label: `${e.title} · ${m.title}`, desc: `${20 + e.addAge + m.addAge}세 출발` }); }); });
  
  tripleSlotState.target1 = combos[Math.floor(Math.random() * combos.length)];
  tripleSlotState.target2 = REGIONS[Math.floor(Math.random() * REGIONS.length)];
  
  const edu = tripleSlotState.target1.edu; const reg = tripleSlotState.target2; const mili = tripleSlotState.target1.mili;
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
  tripleSlotState.target3Key = eligibleJobKeys[Math.floor(Math.random() * eligibleJobKeys.length)];

  setupReelTrack("reelTrack1", combos, tripleSlotState.target1.label, x => x.label, x => x.desc);
  setupReelTrack("reelTrack2", REGIONS.map(r => ({ label: r, desc: "독립 거주지" })), tripleSlotState.target2, x => x.label, x => x.desc);
  setupReelTrack("reelTrack3", eligibleJobKeys.map(k => ({ key: k, label: jobs[k].name, desc: jobs[k].desc.slice(0, 16) + '...' })), jobs[tripleSlotState.target3Key].name, x => x.label, x => x.desc);

  $("reelStatus1").textContent = "대기 중"; $("reelStatus2").textContent = "대기 중"; $("reelStatus3").textContent = "대기 중";
  $("rouletteResult").classList.add("hidden"); $("rouletteConfirmBtn").classList.add("hidden"); $("rouletteStartBtn").classList.remove("hidden");
  show("rouletteScreen");
}

async function spinReel(trackId, targetLabel, duration) {
  const track = $(trackId); const items = [...track.querySelectorAll(".reel-item")];
  let targetIndex = items.findIndex((el, idx) => idx >= items.length / 2 && el.getAttribute("data-label") === targetLabel);
  if (targetIndex === -1) targetIndex = Math.floor(items.length / 2);
  track.style.transition = `transform ${duration}s cubic-bezier(0.15, 0.85, 0.2, 1)`;
  track.style.transform = `translateY(${-(targetIndex * 84)}px)`;
  await new Promise(r => setTimeout(r, duration * 1000));
}

async function runTripleSlotSpin() {
  if (tripleSlotState.spinning) return; tripleSlotState.spinning = true; $("rouletteStartBtn").classList.add("hidden");
  $("reelStatus1").textContent = "🌀 회전 중..."; $("reelStatus2").textContent = "🌀 회전 중..."; $("reelStatus3").textContent = "🌀 회전 중...";
  await Promise.all([
    spinReel("reelTrack1", tripleSlotState.target1.label, 2.5).then(() => { $("reelStatus1").textContent = `✓ [${tripleSlotState.target1.label}]`; }),
    spinReel("reelTrack2", tripleSlotState.target2, 3.8).then(() => { $("reelStatus2").textContent = `✓ [${tripleSlotState.target2}]`; }),
    spinReel("reelTrack3", jobs[tripleSlotState.target3Key].name, 5.0).then(() => { $("reelStatus3").textContent = `✓ [${jobs[tripleSlotState.target3Key].name}]`; })
  ]);
  const t1 = tripleSlotState.target1; const t2 = tripleSlotState.target2; const t3 = jobs[tripleSlotState.target3Key];
  $("rouletteResultJob").textContent = t3.name; $("rouletteResultCareer").textContent = `${t1.label} | ${t2} 거주 | ${t1.startAge}세 출발`;
  $("rouletteResultIncome").textContent = t3.desc; $("rouletteResultReason").textContent = `학력 [${t1.edu}] 및 거주 지역 조건에 최적화된 직무 배정 완료.`;
  $("rouletteResult").classList.remove("hidden"); $("rouletteConfirmBtn").classList.remove("hidden"); tripleSlotState.spinning = false;
}

function finalizeGameStart() {
  game = newGame({
    name: tripleSlotState.base.name, gender: tripleSlotState.base.gender, birthRegion: tripleSlotState.base.birthRegion, currentRegion: tripleSlotState.target2,
    education: tripleSlotState.target1.edu, military: tripleSlotState.target1.mili, isDischarged: tripleSlotState.target1.isDischarged,
    startAge: tripleSlotState.target1.startAge, initialHealth: tripleSlotState.target1.initialHealth, jobKey: tripleSlotState.target3Key
  });
  eventResolved = false; 
  recalculateHousingAndLifestyle(); recordHistory(); show("gameScreen"); updateUI(); generateEvent();
}

function setupApplication() {
  initBirthUI();
  if ($("playerGender")) { $("playerGender").addEventListener("change", () => { assignRandomName($("playerGender").value); updateProfilePreview(); }); }
  if ($("randomNameBtn")) { $("randomNameBtn").onclick = (e) => { e.preventDefault(); assignRandomName($("playerGender") ? $("playerGender").value : "남성"); updateProfilePreview(); }; }
  ["playerName", "playerRegion", "playerGender", "playerBirthMonth", "playerBirthDay"].forEach(id => { const el = $(id); if (el) { el.addEventListener("input", updateProfilePreview); el.addEventListener("change", updateProfilePreview); } });
  
  if ($("createCharacterBtn")) { $("createCharacterBtn").onclick = () => { startTripleSlotRoulette({ name: $("playerName").value.trim() || "플레이어", birthRegion: $("playerRegion").value, gender: $("playerGender").value, birth: getSelectedBirthDate() }); }; }
  if ($("rouletteStartBtn")) $("rouletteStartBtn").onclick = runTripleSlotSpin;
  if ($("rouletteConfirmBtn")) $("rouletteConfirmBtn").onclick = finalizeGameStart;

  // [업데이트] 결과 확인창 박스를 클릭했을 때 다음 턴(advanceYear)으로 넘어가도록 제어 변경
  if ($("resultBox")) $("resultBox").onclick = advanceYear;
  
  if ($("lifeRecordBtn")) $("lifeRecordBtn").onclick = () => show("recordScreen");
  if ($("closeRecordBtn")) $("closeRecordBtn").onclick = () => { if (game && game.age >= 60) show("endScreen"); else show("gameScreen"); };

  if ($("endingViewRecordBtn")) $("endingViewRecordBtn").onclick = () => show("recordScreen");
  if ($("homeBtn")) $("homeBtn").onclick = handleHomeReset;
  if ($("endingNewBtn")) $("endingNewBtn").onclick = () => { game = null; show("startScreen"); };

  if ($("closeStockModalBtn")) $("closeStockModalBtn").onclick = closeStockModal;
  if ($("sellAllStockBtn")) $("sellAllStockBtn").onclick = sellAllStock;
  
  // 모달 안의 버튼들에 기능 연결
  if ($("houseUpBtn")) $("houseUpBtn").onclick = houseUp;
  if ($("houseDownBtn")) $("houseDownBtn").onclick = houseDown;
  if ($("carUpBtn")) $("carUpBtn").onclick = carUp;
  if ($("carDownBtn")) $("carDownBtn").onclick = carDown;
  if ($("carNewBtn")) $("carNewBtn").onclick = carNew;
}

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", setupApplication);
else setupApplication();
window.onresize = () => { if (game) drawChart("assetChart"); };
