/* ==========================================================================
   [MY LIFE] 17개 직업군 상세 뉴스 데이터베이스 & 확률 엔진 (news.js)
   - 직업별 30개 뉴스 구성 (매우 좋음 2 / 좋음 6 / 평범 14 / 나쁨 6 / 최악 2)
   - 확률 테이블:
     * 매우 좋은 뉴스 : 5%
     * 좋은 뉴스     : 15%
     * 평범한 뉴스   : 60%
     * 나쁜 뉴스     : 15%
     * 최악의 뉴스   : 5%
   ========================================================================== */

const JOB_NEWS_DATA = {
  // --------------------------------------------------------------------------
  // 1. 삼성전자 회사원 (large_corp)
  // --------------------------------------------------------------------------
  large_corp: {
    veryGood: [
      {
        tier: "매우 좋은 뉴스",
        title: "🏆 차세대 HBM 대형 수주… OPI(초과이익성과급) 50% 상한 지급!",
        desc: "글로벌 빅테크향 차세대 메모리 독점 공급으로 역대 최대 분기 흑자를 달성했습니다.",
        apply: (game, won) => {
          const bonus = Math.round(game.annualIncome * 0.5);
          game.cash += bonus; game.happiness += 20; game.reputation += 10;
          return `OPI 성과급으로 ${won(bonus)}이 현금 입금되었습니다! (행복 +20, 평판 +10)`;
        }
      },
      {
        tier: "매우 좋은 뉴스",
        title: "🚀 전사 특별 주식 보상 및 RSU 대거 지급",
        desc: "회사의 글로벌 주가 랠리를 견인한 핵심 공로자들에게 대규모 자사주가 무상 지급되었습니다.",
        apply: (game, won) => {
          const stockVal = 20000000;
          game.assets.stock += stockVal; game.happiness += 18;
          return `우리사주 및 RSU ${won(stockVal)} 상당이 계좌에 입고되었습니다! (행복 +18)`;
        }
      }
    ],
    good: [
      {
        tier: "좋은 뉴스",
        title: "📈 사내 핵심 특허 발명 포상",
        desc: "제출한 반도체 공정 단축 직무발명 특허가 정식 등록되었습니다.",
        apply: (game, won) => {
          const bonus = 5000000;
          game.cash += bonus; game.reputation += 8;
          return `발명 장려금 ${won(bonus)}을 수령했습니다. (평판 +8)`;
        }
      },
      {
        tier: "좋은 뉴스",
        title: "🏖️ 복지포인트 대폭 인상 및 하계 콘도 당첨",
        desc: "노사 상생 합의로 복지포인트가 증액되고 최고급 리조트 숙박권에 당첨되었습니다.",
        apply: (game) => {
          game.happiness += 10; game.stress = Math.max(0, game.stress - 10);
          return "가족들과 휴가를 만끽했습니다. (행복 +10, 스트레스 -10)";
        }
      },
      {
        tier: "좋은 뉴스",
        title: "💡 부서 내 업무 프로세스 자동화 아이디어 채택",
        desc: "반복적인 수작업 엑셀 업무를 매크로로 자동화하여 본부장 표창을 받았습니다.",
        apply: (game) => {
          game.reputation += 6; game.happiness += 5;
          return "업무 효율성을 인정받았습니다. (평판 +6, 행복 +5)";
        }
      },
      {
        tier: "좋은 뉴스",
        title: "🍔 사내 구내식당 미슐랭 셰프 특식 이벤트",
        desc: "임직원 사기 진작을 위해 본사 구내식당에 특급 호텔 셰프 초청 뷔페가 열렸습니다.",
        apply: (game) => {
          game.happiness += 5;
          return "맛있는 식사로 소소한 행복을 느꼈습니다. (행복 +5)";
        }
      },
      {
        tier: "좋은 뉴스",
        title: "🎓 글로벌 기술 컨퍼런스 참가 지원 확정",
        desc: "미국 실리콘밸리에서 열리는 최신 반도체 테크 세미나 참관 인원으로 발탁되었습니다.",
        apply: (game) => {
          game.reputation += 5; game.happiness += 8;
          return "견문을 넓히고 돌아왔습니다. (평판 +5, 행복 +8)";
        }
      },
      {
        tier: "좋은 뉴스",
        title: "🏅 상반기 우수 사원 선정 및 포상 휴가",
        desc: "상반기 실적 기여도를 인정받아 3일간의 유급 포상 휴가를 얻었습니다.",
        apply: (game) => {
          game.happiness += 8; game.stress = Math.max(0, game.stress - 8);
          return "꿀맛 같은 휴가를 즐겼습니다. (행복 +8, 스트레스 -8)";
        }
      }
    ],
    normal: [
      {
        tier: "평범한 뉴스",
        title: "📋 반기 전사 조직개편 및 좌석 재배치",
        desc: "조직 효율화를 위해 본사 사옥 내 부서 층간 이동이 진행되었습니다.",
        apply: () => "자리 짐을 정리하고 모니터 세팅을 새로 마쳤습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "☕ 사내 카페 리뉴얼 및 조식 뷔페 개편",
        desc: "캠퍼스 내 베이커리 메뉴가 개편되었습니다.",
        apply: (game) => { game.happiness += 2; return "아침 커피로 활력을 얻었습니다."; }
      },
      {
        tier: "평범한 뉴스",
        title: "💻 업무용 노트북 교체",
        desc: "IT 인프라 정기 교체 주기에 따라 워크스테이션 랩톱이 지급되었습니다.",
        apply: (game) => { game.stress = Math.max(0, game.stress - 2); return "쾌적해진 환경에서 일합니다."; }
      },
      {
        tier: "평범한 뉴스",
        title: "📊 정기 준법경영·보안 온라인 교육 이수",
        desc: "정보보호 사이버 교육을 수료했습니다.",
        apply: () => "보안 퀴즈를 모두 통과했습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "🖨️ 사무실 프린터 및 OA 기기 전면 업그레이드",
        desc: "속도가 빠른 신형 복합기가 설치되었습니다.",
        apply: () => "서류 출력이 편리해졌습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "🧊 구내식당 제빙기 및 휴게실 안마의자 도입",
        desc: "직원 복지 공간에 안마의자가 확충되었습니다.",
        apply: (game) => { game.stress = Math.max(0, game.stress - 3); return "피로를 풀었습니다."; }
      },
      {
        tier: "평범한 뉴스",
        title: "🧹 사내 대청소 및 클린오피스 캠페인",
        desc: "서랍 속 묵은 서류를 정리하는 환경 정화의 날을 가졌습니다.",
        apply: () => "책상이 말끔해졌습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "📅 연간 휴가 계획 사전 제출",
        desc: "올해 사용할 연차 일정을 미리 캘린더에 등록했습니다.",
        apply: () => "휴가 일정을 조율했습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "🚗 주차장 구역 재도색 공사 진행",
        desc: "본사 주차타워 바닥 보수 공사가 있었습니다.",
        apply: () => "출퇴근 주차가 원활해졌습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "💡 사무실 조명 LED 교체 작업",
        desc: "어둡던 형광등을 화사한 LED로 전면 교체했습니다.",
        apply: () => "눈이 덜 피로해졌습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "📁 사내 클라우드 협업 툴 용량 증설",
        desc: "대용량 프로젝트 파일 공유가 자유로워졌습니다.",
        apply: () => "업무 공유가 빨라졌습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "🧥 회사 단체 방한 점퍼 지급",
        desc: "겨울철 야외 현장 점검용 패딩 점퍼가 보급되었습니다.",
        apply: () => "따뜻하게 외근을 다녀왔습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "🩺 사내 부속 의원 정기 건강검진 안내",
        desc: "올해 대상자 건강검진 예약 일정을 조율했습니다.",
        apply: () => "검진을 무사히 마쳤습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "🤝 신입사원 멘토링 프로그램 배정",
        desc: "후배 사원의 직무 적응을 돕는 멘토 역할을 맡았습니다.",
        apply: (game) => { game.reputation += 1; return "모범을 보였습니다."; }
      }
    ],
    bad: [
      {
        tier: "나쁜 뉴스",
        title: "⚠️ 테크 경기 둔화… 부서별 긴축재정 및 법인카드 한도 축소",
        desc: "회식비와 도서구입비 등 부서 예산이 30% 삭감되었습니다.",
        apply: (game) => {
          game.stress += 8; game.happiness = Math.max(0, game.happiness - 5);
          return "법카 한도가 줄어 회식이 눈치 보기가 되었습니다. (스트레스 +8)";
        }
      },
      {
        tier: "나쁜 뉴스",
        title: "📑 분기 경영실적 평가 대비 철야 데이터 집계",
        desc: "임원 주재 긴급 회의를 앞두고 주말 내내 엑셀 지표를 수정했습니다.",
        apply: (game) => {
          game.stress += 12; game.health = Math.max(0, game.health - 3);
          return "연속 야근으로 허리에 통증이 찾아옵니다. (스트레스 +12)";
        }
      },
      {
        tier: "나쁜 뉴스",
        title: "🌧️ 장마철 구내식당 누수 및 시설 보수 공사",
        desc: "천장 누수로 식당 일부가 폐쇄되어 점심시간에 큰 혼잡을 빚었습니다.",
        apply: (game) => { game.stress += 5; return "점심을 대충 때웠습니다."; }
      },
      {
        tier: "나쁜 뉴스",
        title: "🔌 야간 서버실 일시 정전으로 데이터 백업 오류",
        desc: "돌발 정전으로 새벽에 비상 출동하여 백신 무결성 검증을 벌였습니다.",
        apply: (game) => { game.stress += 10; return "새벽 작업을 하느라 피곤합니다."; }
      },
      {
        tier: "나쁜 뉴스",
        title: "🗣️ 타 부서와의 협업 프로젝트 의견 충돌",
        desc: "일정 조율 과정에서 팽팽한 신경전이 오가며 감정이 상했습니다.",
        apply: (game) => { game.stress += 8; return "소통의 벽을 느꼈습니다."; }
      },
      {
        tier: "나쁜 뉴스",
        title: "🚗 출근길 회사 지하주차장 접촉사고 발생",
        desc: "서둘러 주차하다 기둥을 살짝 긁어 수리비를 물게 되었습니다.",
        apply: (game, won) => {
          const cost = 500000; game.cash -= cost;
          return `주차장 수리비로 ${won(cost)}이 지출되었습니다.`;
        }
      }
    ],
    worst: [
      {
        tier: "최악의 뉴스",
        title: "🚨 반도체 라인 정전 사고 및 핵심 기술 감사 착수",
        desc: "공정 트러블로 수백억 원의 웨이퍼 손실이 발생해 전사 특별 감사가 시작되었습니다.",
        apply: (game) => {
          game.stress += 25; game.reputation = Math.max(0, game.reputation - 12); game.health = Math.max(0, game.health - 6);
          return "감사실 소환과 사유서 작성으로 멘탈이 무너졌습니다. (평판 -12, 스트레스 +25)";
        }
      },
      {
        tier: "최악의 뉴스",
        title: "🔥 R&D 기밀 유출 오인으로 인한 보안 조사위 회부",
        desc: "퇴사한 전 동료와의 연락 내역이 빌미가 되어 보안 감사팀의 강도 높은 조사를 받았습니다.",
        apply: (game) => {
          game.stress += 30; game.reputation = Math.max(0, game.reputation - 15);
          return "결백은 밝혔지만 씻을 수 없는 모멸감을 느꼈습니다. (평판 -15, 스트레스 +30)";
        }
      }
    ]
  },

  // --------------------------------------------------------------------------
  // 2. 블루어드 회사원 (sme_corp: SAP ERP & MS 클라우드 SW)
  // --------------------------------------------------------------------------
  sme_corp: {
    veryGood: [
      {
        tier: "매우 좋은 뉴스",
        title: "🚀 대기업 그룹사 200억 규모 SAP & Azure 클라우드 단독 수주!",
        desc: "경쟁사를 제치고 당사가 차세대 클라우드 ERP 구축 주사업자로 선정되었습니다.",
        apply: (game, won) => {
          const bonus = Math.round(game.annualIncome * 0.35);
          game.cash += bonus; game.reputation += 14; game.happiness += 18;
          return `프로젝트 수주 기여 특별 상여금 ${won(bonus)}이 지급되었습니다! (평판 +14)`;
        }
      },
      {
        tier: "매우 좋은 뉴스",
        title: "🏆 중소기업청 주관 '올해의 혁신 IT 기업인' 표창",
        desc: "회사 성장에 혁신적인 공헌을 한 핵심 엔지니어에게 주어지는 장관 표창을 수상했습니다.",
        apply: (game, won) => {
          const bonus = 10000000;
          game.cash += bonus; game.reputation += 16;
          return `포상금 ${won(bonus)}과 특별 휴가가 수여되었습니다! (평판 +16)`;
        }
      }
    ],
    good: [
      {
        tier: "좋은 뉴스",
        title: "📜 SAP 공인 컨설턴트 및 MS Azure 최고급 자격증 취득",
        desc: "주말을 바쳐 공부한 끝에 글로벌 최고 등급 자격을 취득했습니다.",
        apply: (game, won) => {
          const bonus = 3000000;
          game.cash += bonus; game.annualIncome += 2000000; game.reputation += 8;
          return `포상금 ${won(bonus)} 및 연봉 200만원 영구 인상! (평판 +8)`;
        }
      },
      {
        tier: "좋은 뉴스",
        title: "🤝 Microsoft 최우수 파트너 어워드 수상",
        desc: "클라우드 연간 솔루션 공급 실적 최상위 파트너로 선정되었습니다.",
        apply: (game) => {
          game.happiness += 12; game.reputation += 6;
          return "해외 컨퍼런스 견학 기회를 얻었습니다. (행복 +12)";
        }
      },
      {
        tier: "좋은 뉴스",
        title: "💡 고객사 고도화 사업 수의계약 체결",
        desc: "기존 고객사로부터 추가 모듈 개발 건을 안정적으로 수주했습니다.",
        apply: (game, won) => {
          const bonus = 4000000; game.cash += bonus;
          return `성공 보수 ${won(bonus)}이 입금되었습니다.`;
        }
      },
      {
        tier: "좋은 뉴스",
        title: "☕ 사내 복지 기금 샌드위치 조식 지원",
        desc: "바쁜 마감 시즌을 맞아 아침마다 신선한 샌드위치가 배달됩니다.",
        apply: (game) => { game.happiness += 4; return "든든하게 아침을 시작했습니다."; }
      },
      {
        tier: "좋은 뉴스",
        title: "🎉 회사 창립 기념 골드바 포상 추첨 당첨",
        desc: "창립 기념 행사 럭키드로우에서 순금 1돈 골드바에 당첨되었습니다.",
        apply: (game, won) => {
          const val = 400000; game.cash += val; game.happiness += 10;
          return `골드바 현금 정산액 ${won(val)}이 입금되었습니다!`;
        }
      },
      {
        tier: "좋은 뉴스",
        title: "👏 고객사 대표이사 명의 감사패 수령",
        desc: "안정적인 시스템 오픈을 이끈 점에 대해 고객사로부터 공식 감사패를 받았습니다.",
        apply: (game) => { game.reputation += 8; return "큰 보람을 느꼈습니다. (평판 +8)"; }
      }
    ],
    normal: [
      {
        tier: "평범한 뉴스",
        title: "🔄 고객사 분기 정기 SAP 패치 및 결산 모니터링",
        desc: "월말 마감 시간에 맞춰 ERP 원장 이상 유무를 점검했습니다.",
        apply: () => "큰 결함 없이 무사히 원장이 마감되었습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "💻 Microsoft Copilot 세미나 진행",
        desc: "고객사 임직원 대상 M365 협업 도구 교육을 진행했습니다.",
        apply: (game) => { game.reputation += 2; return "세미나를 마쳤습니다."; }
      },
      {
        tier: "평범한 뉴스",
        title: "📦 원격 하이브리드 근무 규정 갱신",
        desc: "Teams와 그룹웨어 인프라가 업데이트되었습니다.",
        apply: (game) => { game.happiness += 3; return "재택근무가 쾌적해졌습니다."; }
      },
      {
        tier: "평범한 뉴스",
        title: "📑 신규 고객사 SAP ERP 요구사항 분석",
        desc: "물류 모듈 인터페이스 설계를 위해 현업 인터뷰를 했습니다.",
        apply: () => "회의록 정리를 완료했습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "☕ 팀 회식 및 호프 미팅",
        desc: "퇴근 후 근처 치킨집에서 가볍게 맥주 한잔을 기울였습니다.",
        apply: (game) => { game.stress = Math.max(0, game.stress - 3); return "회포를 풀었습니다."; }
      },
      {
        tier: "평범한 뉴스",
        title: "🖨️ 개발실 서버 랙 정리 정돈",
        desc: "엉켜 있던 랜선을 케이블타이로 깔끔하게 정리했습니다.",
        apply: () => "서버실 환경이 쾌적해졌습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "📝 분기 개인 업무 실적 보고서 작성",
        desc: "이번 분기 투입 공수와 산출물을 문서화했습니다.",
        apply: () => "보고서를 제출했습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "🧹 사무실 화분 물주기 담당",
        desc: "공용 휴게실 화분에 물을 주는 차례가 되었습니다.",
        apply: () => "초록 식물들이 싱그럽습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "📚 사내 기술 도서 구입 신청 승인",
        desc: "최신 아키텍처 패턴 서적을 법인카드로 구매했습니다.",
        apply: () => "새 책을 배송받았습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "🅿️ 사옥 주차 정기권 갱신",
        desc: "분기별 주차 등록 확인 절차를 밟았습니다.",
        apply: () => "주차 등록이 갱신되었습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "🧼 개발 장비 키보드 클리닝",
        desc: "에어스프레이로 키보드 틈새 먼지를 불어냈습니다.",
        apply: () => "키감이 뽀송해졌습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "📞 고객사 장애 문의 헬프데스크 당번",
        desc: "오후 시간 동안 사내 기술 지원 핫라인을 담당했습니다.",
        apply: () => "특이 민원 없이 지나갔습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "📊 테크 블로그 사내 기고문 작성",
        desc: "최근 해결한 트러블슈팅 경험을 사내 위키에 공유했습니다.",
        apply: (game) => { game.reputation += 1; return "지식을 공유했습니다."; }
      },
      {
        tier: "평범한 뉴스",
        title: "🌤️ 점심시간 근처 공원 산책",
        desc: "식사 후 회사 앞 공원을 가볍게 걸었습니다.",
        apply: (game) => { game.stress = Math.max(0, game.stress - 2); return "바람을 쐬었습니다."; }
      }
    ],
    bad: [
      {
        tier: "나쁜 뉴스",
        title: "⚠️ 고객사 ERP 데이터 마이그레이션 불일치로 긴급 주말 출근",
        desc: "전환 중 데이터 오류가 발생해 이틀 내내 테이블 검증에 매달렸습니다.",
        apply: (game) => {
          game.stress += 14; game.health = Math.max(0, game.health - 4);
          return "주말 내내 쿼리를 돌리며 피로가 쏟아집니다. (스트레스 +14)";
        }
      },
      {
        tier: "나쁜 뉴스",
        title: "📢 고객사 팀장의 무리한 CBO(커스터마이징) 요구",
        desc: "표준 프로세스를 벗어나는 억지 개발 요구로 납기에 차질이 빚어졌습니다.",
        apply: (game) => {
          game.stress += 12;
          return "일정 조율에 진땀을 뺐습니다. (스트레스 +12)";
        }
      },
      {
        tier: "나쁜 뉴스",
        title: "🔌 테스트 서버 다운으로 데모 시연 직전 중단",
        desc: "임원 시연 직전 가상 머신에 락이 걸려 진땀을 흘렸습니다.",
        apply: (game) => { game.stress += 8; return "가슴이 철렁 내려앉았습니다."; }
      },
      {
        tier: "나쁜 뉴스",
        title: "🌧️ 폭우로 인해 외근 중 고객사 미팅 지각",
        desc: "교통체증이 겹쳐 중요한 킥오프 미팅에 20분 지각했습니다.",
        apply: (game) => { game.stress += 6; return "첫인상이 깎였습니다."; }
      },
      {
        tier: "나쁜 뉴스",
        title: "💻 노트북 어댑터 고장으로 인한 작업 지연",
        desc: "급하게 사내 비품을 수급하느라 2시간 동안 작업을 멈췄습니다.",
        apply: (game) => { game.stress += 5; return "업무 맥이 끊겼습니다."; }
      },
      {
        tier: "나쁜 뉴스",
        title: "📋 요구사항 명세서 누락으로 인한 재작업",
        desc: "스펙 변경 사항이 공유되지 않아 화면 단을 전부 갈아엎었습니다.",
        apply: (game) => { game.stress += 10; return "야근 확정입니다."; }
      }
    ],
    worst: [
      {
        tier: "최악의 뉴스",
        title: "🚨 ERP 오픈 첫날 결산 오류 마비… 위약벌 청구 위기",
        desc: "당일 서버 병목으로 물류 및 세금계산서 발행이 전면 중단되는 대참사가 터졌습니다.",
        apply: (game) => {
          game.stress += 26; game.reputation = Math.max(0, game.reputation - 14);
          return "경영진 긴급 소환 및 살벌한 비상대책위에 회부되었습니다. (평판 -14, 스트레스 +26)";
        }
      },
      {
        tier: "최악의 뉴스",
        title: "🔥 운영계 DB 직접 조작 실수로 전사 데이터 유실 사고",
        desc: "실수로 라이브 환경에서 DELETE 쿼리를 실행하여 백업본 복구까지 온종일 소동이 일어났습니다.",
        apply: (game) => {
          game.stress += 30; game.reputation = Math.max(0, game.reputation - 18);
          return "인사위원회 회부 및 감봉 조치 통보를 받았습니다. (평판 -18, 스트레스 +30)";
        }
      }
    ]
  },

  // --------------------------------------------------------------------------
  // 3. 구글AI개발자 (developer)
  // --------------------------------------------------------------------------
  developer: {
    veryGood: [
      {
        tier: "매우 좋은 뉴스",
        title: "🦄 초거대 AI 파운데이션 모델 세계 1위 등극… RSU 1억 수령!",
        desc: "설계한 모델 아키텍처가 글로벌 성능 벤치마크를 휩쓸었습니다.",
        apply: (game, won) => {
          const stockBonus = 100000000;
          game.assets.stock += stockBonus; game.reputation += 15; game.happiness += 25;
          return `구글 본사 RSU 주식 ${won(stockBonus)} 상당이 입고되었습니다! (행복 +25)`;
        }
      },
      {
        tier: "매우 좋은 뉴스",
        title: "🌟 구글 I/O 키노트 메인 세션에 최고 연구원으로 단독 초청",
        desc: "전 세계 수백만 개발자가 지켜보는 가운데 차세대 멀티모달 AI 핵심 기술을 시연했습니다.",
        apply: (game, won) => {
          const bonus = 30000000;
          game.cash += bonus; game.reputation += 20;
          return `특별 보너스 ${won(bonus)} 지급 및 글로벌 명성을 얻었습니다! (평판 +20)`;
        }
      }
    ],
    good: [
      {
        tier: "좋은 뉴스",
        title: "🏆 오픈소스 AI 경량화 라이브러리 GitHub 스타 50,000개 돌파",
        desc: "퇴근 후 공개한 오픈소스 패키지가 전 세계 엔지니어들의 필수 툴킷이 되었습니다.",
        apply: (game) => {
          game.reputation += 12; game.happiness += 12;
          return "테크 씬에서 독보적인 네임드가 되었습니다. (평판 +12)";
        }
      },
      {
        tier: "좋은 뉴스",
        title: "✈️ 미국 마운틴뷰 본사 테크 서밋 발표자 선정",
        desc: "실리콘밸리 본사에서 글로벌 엔지니어들을 대상으로 강연을 펼쳤습니다.",
        apply: (game) => {
          game.happiness += 10; game.reputation += 6;
          return "영감을 충전하고 돌아왔습니다. (행복 +10)";
        }
      },
      {
        tier: "좋은 뉴스",
        title: "💡 사내 핵심 특허 발명 성과금 수령",
        desc: "LLM 토큰 처리 속도를 3배 개선한 디코딩 알고리즘 특허가 등록되었습니다.",
        apply: (game, won) => {
          const bonus = 15000000; game.cash += bonus;
          return `특허 보상금 ${won(bonus)}이 입금되었습니다.`;
        }
      },
      {
        tier: "좋은 뉴스",
        title: "☕ 구글 사내 바리스타 라운지 우수 이용 후기 선정",
        desc: "사내 카페테리아 신메뉴 제안이 채택되었습니다.",
        apply: (game) => { game.happiness += 4; return "소소한 상품권을 받았습니다."; }
      },
      {
        tier: "좋은 뉴스",
        title: "🎓 명문대 AI 학과 석박사 대상 초청 특강",
        desc: "후배 연구자들을 대상으로 생성형 AI의 미래에 대해 강연했습니다.",
        apply: (game) => { game.reputation += 5; return "지식을 나누었습니다."; }
      },
      {
        tier: "좋은 뉴스",
        title: "🤝 최우수 리서치 팀 다면평가 S등급 획득",
        desc: "동료들로부터 가장 함께 일하고 싶은 엔지니어로 뽑혔습니다.",
        apply: (game) => { game.happiness += 8; game.reputation += 6; return "큰 격려를 받았습니다."; }
      }
    ],
    normal: [
      {
        tier: "평범한 뉴스",
        title: "☕ 캠퍼스 무료 뷔페와 1:1 테크 멘토링",
        desc: "동료들과 머신러닝 논문을 리뷰했습니다.",
        apply: () => "평온한 연구 루틴을 보냈습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "💻 H100 GPU 클러스터 1,024개 노드 할당",
        desc: "모델 분산 처리를 위한 초대형 GPU 팜이 승인되었습니다.",
        apply: (game) => { game.happiness += 4; return "쾌적하게 학습을 돌립니다."; }
      },
      {
        tier: "평범한 뉴스",
        title: "🔄 레거시 파이프라인 리팩토링",
        desc: "코드베이스를 정돈하고 테스트 커버리지를 높였습니다.",
        apply: (game) => { game.stress = Math.max(0, game.stress - 3); return "마음이 개운해졌습니다."; }
      },
      {
        tier: "평범한 뉴스",
        title: "📝 AI 윤리 및 거버넌스 가이드라인 검토",
        desc: "모델 배포 전 편향성 검증 프로세스를 밟았습니다.",
        apply: () => "윤리위 승인을 통과했습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "🧹 주피터 노트북 작업 디렉토리 정리",
        desc: "오래된 실험 로그와 pkl 모델 파일을 백업하고 지웠습니다.",
        apply: () => "디스크 용량이 확보되었습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "📚 최신 NeurIPS 논문 리딩 그룹 참석",
        desc: "동료 연구원들과 최신 트랜스포머 변형 구조를 토론했습니다.",
        apply: (game) => { game.reputation += 1; return "시야를 넓혔습니다."; }
      },
      {
        tier: "평범한 뉴스",
        title: "🍕 해커톤 행사 피자 세션 참여",
        desc: "사내 주말 해커톤 행사에 심사위원으로 참석했습니다.",
        apply: (game) => { game.happiness += 3; return "재미있는 아이디어를 구경했습니다."; }
      },
      {
        tier: "평범한 뉴스",
        title: "🎧 노이즈 캔슬링 헤드폰 교체",
        desc: "집중력을 높이기 위해 신형 장비를 자비로 구입했습니다.",
        apply: (game) => { game.stress = Math.max(0, game.stress - 2); return "몰입감이 좋아졌습니다."; }
      },
      {
        tier: "평범한 뉴스",
        title: "📊 사내 대시보드 메트릭 모니터링",
        desc: "실시간 추론 지연 시간과 토큰 처리량을 모니터링했습니다.",
        apply: () => "정상 범위를 유지 중입니다."
      },
      {
        tier: "평범한 뉴스",
        title: "🗂️ 깃허브 이슈 트래커 라벨링 정리",
        desc: "밀린 버그 리포트와 기능 요청 티켓을 분류했습니다.",
        apply: () => "백로그가 깔끔해졌습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "🧊 휴게실 냉장고 음료 보충 건의",
        desc: "탄산수와 제로 콜라 종류를 늘려달라고 총무팀에 요청했습니다.",
        apply: () => "음료 종류가 다양해졌습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "🚴 사내 자전거 대여소 이용",
        desc: "캠퍼스 동간 이동 시 전동 킥보드 대신 자전거를 탔습니다.",
        apply: (game) => { game.health += 1; return "가벼운 운동이 되었습니다."; }
      },
      {
        tier: "평범한 뉴스",
        title: "📅 분기 OKR 목표 수립 미팅",
        desc: "다음 분기 연구 개발 마일스톤을 팀원들과 확정했습니다.",
        apply: () => "목표가 명확해졌습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "🌿 사무실 공기정화 식물 물주기",
        desc: "책상 위 스킨답서스에 물을 주었습니다.",
        apply: () => "마음이 차분해집니다."
      }
    ],
    bad: [
      {
        tier: "나쁜 뉴스",
        title: "⚠️ GPU 메모리 오버플로우로 3주 치 학습 소실",
        desc: "스크립트 오류로 귀중한 수주일간의 훈련 데이터가 증발했습니다.",
        apply: (game) => {
          game.stress += 15;
          return "처음부터 다시 학습을 돌려야 합니다. (스트레스 +15)";
        }
      },
      {
        tier: "나쁜 뉴스",
        title: "💻 API 레이턴시 급증… 36시간 연속 비상 대기",
        desc: "동시 접속 폭주로 트래픽 스파이크가 발생해 밤샘 트러블슈팅을 진행했습니다.",
        apply: (game) => {
          game.stress += 16; game.health = Math.max(0, game.health - 5);
          return "밤을 지새우며 건강이 깎였습니다. (스트레스 +16)";
        }
      },
      {
        tier: "나쁜 뉴스",
        title: "🔥 분산 학습 노드 간 네트워크 패킷 손실 발생",
        desc: "인피니밴드 스위치 포트 불량으로 훈련 속도가 1/10로 떨어졌습니다.",
        apply: (game) => { game.stress += 10; return "원인 파악에 진땀을 뺐습니다."; }
      },
      {
        tier: "나쁜 뉴스",
        title: "📋 오픈소스 의존성 패키지 취약점 긴급 패치",
        desc: "널리 쓰이는 파이썬 라이브러리에서 제로데이 보안 허점이 발견되었습니다.",
        apply: (game) => { game.stress += 8; return "긴급 빌드 배포를 진행했습니다."; }
      },
      {
        tier: "나쁜 뉴스",
        title: "🗣️ 해외 리서치 센터와의 시차 회의로 수면 부족",
        desc: "미국 서부와 유럽 팀 간의 3자 화상회의로 밤낮이 바뀌었습니다.",
        apply: (game) => { game.stress += 9; game.health = Math.max(0, game.health - 2); return "시차 적응에 시달렸습니다."; }
      },
      {
        tier: "나쁜 뉴스",
        title: "📉 모델 환각(Hallucination) 현상 악화로 평가 지표 하락",
        desc: "파인튜닝 과정에서 데이터 믹스 비율이 꼬여 정답률이 떨어졌습니다.",
        apply: (game) => { game.stress += 11; return "하이퍼파라미터를 재조정했습니다."; }
      }
    ],
    worst: [
      {
        tier: "최악의 뉴스",
        title: "🚨 AI 모델 개인정보 유출 취약점 발각… 글로벌 언론 보도",
        desc: "파이프라인에서 고객 민감정보가 노출되는 제로데이 취약점이 외신에 대서특필되었습니다.",
        apply: (game) => {
          game.stress += 28; game.reputation = Math.max(0, game.reputation - 15);
          return "본사 법무팀 인터뷰와 보안 징계위에 회부되었습니다. (평판 -15, 스트레스 +28)";
        }
      },
      {
        tier: "최악의 뉴스",
        title: "🔥 저작권 침해 소송 피소 및 모델 서비스 긴급 중단 사태",
        desc: "학습 데이터셋 라이선스 위반 문제로 주요 작가 및 언론사들로부터 천문학적 소송을 당했습니다.",
        apply: (game) => {
          game.stress += 35; game.reputation = Math.max(0, game.reputation - 22);
          return "전 세계 테크 언론의 집중 포화를 맞았습니다. (평판 -22, 스트레스 +35)";
        }
      }
    ]
  },

  // --------------------------------------------------------------------------
  // 4. 시청 공무원 (civil)
  // --------------------------------------------------------------------------
  civil: {
    veryGood: [
      {
        tier: "매우 좋은 뉴스",
        title: "🎖️ 대한민국 행정혁신 대통령 표창 수상 및 1호봉 특별 승급",
        desc: "제안한 스마트 대중교통·복지 간소화 정책이 전국 최우수 사례로 뽑혔습니다.",
        apply: (game) => {
          game.annualIncome += 2500000; game.reputation += 15; game.happiness += 18;
          return "대통령 표창을 받으며 연소득이 250만원 영구 인상되었습니다! (평판 +15)";
        }
      },
      {
        tier: "매우 좋은 뉴스",
        title: "🌟 전국 지자체 합동 평가 '최우수 지자체' 선정 특진 포상",
        desc: "소속 과가 전 부문 S등급을 받으며 지자체장 직권 특진 대상자로 추천되었습니다.",
        apply: (game, won) => {
          const bonus = 7000000; game.cash += bonus; game.reputation += 15;
          return `포상금 ${won(bonus)} 수령 및 인사고과 최우수 반영! (평판 +15)`;
        }
      }
    ],
    good: [
      {
        tier: "좋은 뉴스",
        title: "🏛️ 시의회 행정사무감사 완벽 방어 및 시장님 표창",
        desc: "시의원들의 날카로운 예산 질의를 빈틈없는 데이터로 방어했습니다.",
        apply: (game) => {
          game.reputation += 8; game.happiness += 8;
          return "요직 부서 발령 1순위가 되었습니다. (평판 +8)";
        }
      },
      {
        tier: "좋은 뉴스",
        title: "💵 맞춤형 복지포인트 및 연가보상비 전액 수령",
        desc: "미사용 연차 보상비와 복지포인트가 연말에 알차게 입금되었습니다.",
        apply: (game, won) => {
          const bonus = 2000000; game.cash += bonus; game.happiness += 6;
          return `정산금 ${won(bonus)}이 통장에 입금되었습니다.`;
        }
      },
      {
        tier: "좋은 뉴스",
        title: "💡 시청 구내 규제 개혁 아이디어 공모 최우수상",
        desc: "불필요한 서류 증빙 간소화 제안이 채택되어 즉시 행정에 반영되었습니다.",
        apply: (game, won) => {
          const bonus = 2000000; game.cash += bonus; game.reputation += 5;
          return `포상금 ${won(bonus)}을 수령했습니다. (평판 +5)`;
        }
      },
      {
        tier: "좋은 뉴스",
        title: "☕ 모범 공무원 삼일절 특별 포상 휴가",
        desc: "성실한 대민 서비스로 민원인 추천 모범 공무원에 선정되었습니다.",
        apply: (game) => {
          game.happiness += 6; game.stress = Math.max(0, game.stress - 6);
          return "달콤한 연휴를 보냈습니다. (스트레스 -6)";
        }
      },
      {
        tier: "좋은 뉴스",
        title: "🤝 민원 처리 우수 친절 직원 표창",
        desc: "까다로운 인허가 민원을 원만하게 해결하여 칭찬 민원 카드가 접수되었습니다.",
        apply: (game) => { game.reputation += 5; return "자부심을 느꼈습니다. (평판 +5)"; }
      },
      {
        tier: "좋은 뉴스",
        title: "🌳 청사 주변 도심 숲 조성 사업 성공 완료",
        desc: "주민 휴식 공간 확충 공사를 기한 내에 깔끔하게 마무리했습니다.",
        apply: (game) => { game.happiness += 7; return "주민들의 호평을 받았습니다."; }
      }
    ],
    normal: [
      {
        tier: "평범한 뉴스",
        title: "📑 분기 정기 예산 집행 결산 및 지출결의서 정리",
        desc: "부서 내 회계 지출 증빙 서류를 차질 없이 마감했습니다.",
        apply: () => "오차 없이 깔끔하게 회계가 마감되었습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "🌸 청사 야외 산책 및 점심시간 휴식",
        desc: "날씨가 맑은 날 동기들과 청사 주변을 걸었습니다.",
        apply: (game) => { game.stress = Math.max(0, game.stress - 3); return "소소한 힐링을 누렸습니다."; }
      },
      {
        tier: "평범한 뉴스",
        title: "📋 공직자 청렴도 자가진단 설문 완료",
        desc: "온라인 청렴 교육을 이수했습니다.",
        apply: () => "우수 등급을 유지했습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "🗳️ 관내 선거 투·개표 지원 사무원 차출",
        desc: "주말 선거 개표소에 투입되어 용지 분류 작업을 도왔습니다.",
        apply: (game, won) => {
          const pay = 250000; game.cash += pay;
          return `수당 ${won(pay)}을 수령했습니다.`;
        }
      },
      {
        tier: "평범한 뉴스",
        title: "☕ 민원실 정수기 필터 교체 및 비품 점검",
        desc: "구민 휴게 공간의 커피믹스와 녹차 티백을 보충했습니다.",
        apply: () => "민원인들이 쾌적해졌습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "🖨️ 행정 복사기 토너 카트리지 교환",
        desc: "주민등록등본 발급용 무인 민원 발급기 용지를 보충했습니다.",
        apply: () => "민원 발급이 원활합니다."
      },
      {
        tier: "평범한 뉴스",
        title: "📞 악취 및 소음 민원 현장 출동 확인",
        desc: "인근 공사장 비산먼지 관련 현장을 방문해 계도장을 발부했습니다.",
        apply: () => "현장 조치를 마쳤습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "🚗 관용차량 정기 종합 검사 완료",
        desc: "부서 업무용 승용차를 지정 카센터에 입고했습니다.",
        apply: () => "검사를 무사히 통과했습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "📁 문서고 기록물 이관 작업",
        desc: "보존 연한이 지난 구형 인허가 장부를 지하 문서고로 옮겼습니다.",
        apply: () => "사무실 공간이 쾌적해졌습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "🧊 구청장 주재 확대 간부회의 속기록 정리",
        desc: "주간 현안 보고 회의 주요 발언 내용을 요약했습니다.",
        apply: () => "회의록 배포를 마쳤습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "🌿 청사 로비 미술품 교체 전시 관람",
        desc: "지역 예술가 초대전 작품 설치 과정을 도왔습니다.",
        apply: (game) => { game.happiness += 2; return "문화적 여유를 즐겼습니다."; }
      },
      {
        tier: "평범한 뉴스",
        title: "🧹 새봄맞이 대청소의 날 참여",
        desc: "직원들과 함께 청사 화단 잡초를 뽑고 쓰레기를 주웠습니다.",
        apply: () => "주변이 말끔해졌습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "🛡️ 민방위 대피소 안내 표지판 실태 점검",
        desc: "관내 지하 비상대호소 유도등 작동 여부를 확인했습니다.",
        apply: () => "점검표에 이상 없음을 서명했습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "📚 지방행정연수원 원격 강의 수강",
        desc: "인사 및 회계 실무 역량 강화를 위한 온라인 교육을 들었습니다.",
        apply: () => { game.reputation += 1; return "이수증을 발급받았습니다."; }
      }
    ],
    bad: [
      {
        tier: "나쁜 뉴스",
        title: "📢 악성 고질 민원인의 시청 민원실 난동 및 폭언",
        desc: "막무가내 인허가를 요구하는 민원인에게 2시간 동안 폭언을 들었습니다.",
        apply: (game) => {
          game.stress += 14;
          return "정신적 스트레스로 두통이 찾아왔습니다. (스트레스 +14)";
        }
      },
      {
        tier: "나쁜 뉴스",
        title: "🌧️ 폭우로 인한 시청 재난안전대책본부 비상 2단계 동원",
        desc: "새벽 긴급 호출을 받아 침수 취약지 모니터링과 빗물펌프장 철야 대기를 섰습니다.",
        apply: (game) => {
          game.stress += 12; game.health = Math.max(0, game.health - 4);
          return "밤샘 근무로 심신이 지쳤습니다. (스트레스 +12)";
        }
      },
      {
        tier: "나쁜 뉴스",
        title: "🔥 구청 지하 식당 전기 배선 합선 소동",
        desc: "연기가 나며 소방차가 출동하는 소동이 벌어져 직원들이 대피했습니다.",
        apply: (game) => { game.stress += 8; return "가슴이 철렁했습니다."; }
      },
      {
        tier: "나쁜 뉴스",
        title: "🗣️ 시의회 행정사무감사 자료 제출 지연 질타",
        desc: "의원 요구 자료 취합 과정에서 타 부서 협조가 늦어져 호통을 들었습니다.",
        apply: (game) => { game.stress += 10; return "식은땀을 흘렸습니다."; }
      },
      {
        tier: "나쁜 뉴스",
        title: "📋 보조금 정산 검사 중 수십만 원 회계 오류 발견",
        desc: "민간 단체 보증금 집행 내역서 증빙 영수증이 누락되어 보완 명령을 내렸습니다.",
        apply: (game) => { game.stress += 9; return "대조 작업을 다시 하느라 야근했습니다."; }
      },
      {
        tier: "나쁜 뉴스",
        title: "🚗 관용차 방전으로 출동 지연",
        desc: "현장 단속을 나가려 시동을 걸었으나 배터리가 방전되어 애를 먹었습니다.",
        apply: (game) => { game.stress += 6; return "보험 긴급출동을 불렀습니다."; }
      }
    ],
    worst: [
      {
        tier: "최악의 뉴스",
        title: "🚨 감사원 특별 감사 지적으로 징계위원회 회부 위기",
        desc: "과거 결재된 인허가 서류에서 상위 법령 해석 차이로 주의 처분을 받았습니다.",
        apply: (game) => {
          game.reputation = Math.max(0, game.reputation - 15); game.stress += 24;
          return "승진 누락 위기와 시말서 제출로 시련을 맞았습니다. (평판 -15, 스트레스 +24)";
        }
      },
      {
        tier: "최악의 뉴스",
        title: "🔥 관급 공사 업자로부터의 금품 수수 오인 투서 사건",
        desc: "악의적인 익명 투서로 경찰 반부패수사대에서 내사를 벌여 큰 곤욕을 치렀습니다.",
        apply: (game) => {
          game.stress += 32; game.reputation = Math.max(0, game.reputation - 25);
          return "무혐의로 종결되었지만 명예에 씻을 수 없는 상처를 입었습니다. (평판 -25, 스트레스 +32)";
        }
      }
    ]
  },

  // --------------------------------------------------------------------------
  // 5. 중학교 교사 (teacher)
  // --------------------------------------------------------------------------
  teacher: {
    veryGood: [
      {
        tier: "매우 좋은 뉴스",
        title: "🏆 전국 올해의 스승상 수상 및 교육감 특별 표창",
        desc: "혁신적인 인성 교육과 학생 진로 지도 프로그램으로 전국 최고의 모범 교사로 선정되었습니다.",
        apply: (game) => {
          game.reputation += 14; game.happiness += 20; game.annualIncome += 2000000;
          return "사도(師道)를 인정받으며 연봉 200만원 인상! (평판 +14, 행복 +20)";
        }
      },
      {
        tier: "매우 좋은 뉴스",
        title: "🌟 교육부 장관 표창 및 우수 수업 연구 실적물 1등급",
        desc: "디지털 교과서를 활용한 에듀테크 선도 수업 모델이 전국 표준안으로 채택되었습니다.",
        apply: (game, won) => {
          const bonus = 6000000; game.cash += bonus; game.reputation += 15;
          return `연구비 포상금 ${won(bonus)} 수령 및 승진 가점 획득! (평판 +15)`;
        }
      }
    ],
    good: [
      {
        tier: "좋은 뉴스",
        title: "🏫 맡은 학급 전원 학교폭력·이탈 제로 및 학업성취도 1위",
        desc: "따뜻한 상담과 관심으로 1년 동안 단 한 건의 사고도 없이 아이들을 이끌었습니다.",
        apply: (game) => {
          game.reputation += 8; game.happiness += 12;
          return "학부모님들의 진심 어린 감사 편지를 받았습니다. (평판 +8)";
        }
      },
      {
        tier: "좋은 뉴스",
        title: "☀️ 꿀맛 같은 여름방학 돌입 및 교원 자율연수",
        desc: "방학을 맞이해 온전한 재충전과 독서, 여행의 시간을 가졌습니다.",
        apply: (game) => {
          game.happiness += 10; game.stress = Math.max(0, game.stress - 15); game.health += 5;
          return "방학 동안 푹 쉬며 에너지를 채웠습니다. (스트레스 -15)";
        }
      },
      {
        tier: "좋은 뉴스",
        title: "💡 교육청 지원 창의융합 동아리 공모 사업 선정",
        desc: "학생들과 함께 운영하는 메이커스페이스 과학 동아리 예산을 따냈습니다.",
        apply: (game, won) => {
          const support = 4000000; game.reputation += 6;
          return `운영 지원비 ${won(support)}이 배정되었습니다. (평판 +6)`;
        }
      },
      {
        tier: "좋은 뉴스",
        title: "☕ 스승의 날 제자들이 직접 쓴 롤링페이퍼 전달",
        desc: "졸업한 제자들과 현재 반 아이들이 깜짝 파티를 열어주었습니다.",
        apply: (game) => { game.happiness += 12; return "교직의 커다란 보람을 느꼈습니다. (행복 +12)"; }
      },
      {
        tier: "좋은 뉴스",
        title: "🏅 학교 스포츠클럽 지도 교사 교육감상 수상",
        desc: "방과 후 축구부를 열정적으로 지도해 교육감배 대회 준우승을 차지했습니다.",
        apply: (game) => { game.reputation += 7; game.happiness += 8; return "아이들과 함께 기뻐했습니다."; }
      },
      {
        tier: "좋은 뉴스",
        title: "📚 진로진학 상담 역량 심화 직무연수 우수 수료",
        desc: "대입 수시 및 학종 트렌드 분석 전문가 과정 자격을 취득했습니다.",
        apply: (game) => { game.reputation += 5; return "진학 지도 능력이 향상되었습니다. (평판 +5)"; }
      }
    ],
    normal: [
      {
        tier: "평범한 뉴스",
        title: "📝 학기말 나이스(NEIS) 생활기록부 작성 기간",
        desc: "반 학생 전원의 세부능력 특기사항을 꼼꼼하게 입력했습니다.",
        apply: () => "밀린 생기부 입력을 기한 내 모두 마쳤습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "🏫 가을 운동회 및 학예 발표회 성황리 개최",
        desc: "응원전 속에 아이들과 함께 땀 흘리며 달렸습니다.",
        apply: (game) => { game.happiness += 4; return "아이들의 밝은 웃음을 보았습니다."; }
      },
      {
        tier: "평범한 뉴스",
        title: "🍱 학교 급식 모니터링 및 방과후 수업 참관",
        desc: "영양 만점 급식을 지도하고 특기적성 수업을 참관했습니다.",
        apply: () => "무난하고 평온한 하루를 보냈습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "📋 학부모 공개수업 및 상담 주간 진행",
        desc: "교실 뒤편 학부모님들의 참관 속에 공개수업을 마쳤습니다.",
        apply: (game) => { game.reputation += 2; return "긍정적 피드백을 받았습니다."; }
      },
      {
        tier: "평범한 뉴스",
        title: "🧹 교실 환경 미화 심사 실시",
        desc: "학생들과 함께 게시판을 꾸미고 대청소를 했습니다.",
        apply: (game) => { game.happiness += 2; return "교실이 화사해졌습니다."; }
      },
      {
        tier: "평범한 뉴스",
        title: "⚽ 점심시간 축구공 쟁탈전 중재",
        desc: "운동장에서 다툼이 벌어진 남학생들을 불러 모아 화해시켰습니다.",
        apply: () => "원만하게 갈등을 중재했습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "📋 학년 회의 및 현장체험학습 답사",
        desc: "다음 달 있을 수학여행 숙소와 식당 위생 상태를 사전 답사했습니다.",
        apply: () => "안전사고 유의 사항을 점검했습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "📚 교과서 배부 및 재고 파악",
        desc: "새학기 신간 교과서 부수를 확인하고 결석생 몫을 챙겼습니다.",
        apply: () => "교과서 배부가 깔끔하게 끝났습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "💻 교실 전자칠판 터치스크린 보수 요청",
        desc: "수업 중 판서 딜레이가 발생해 교육청 IT 지원센터에 수리를 접수했습니다.",
        apply: () => "엔지니어가 방문해 점검했습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "🎵 음악실 방음 부스 점검",
        desc: "합창단 연습 소리가 인근 교실에 새어 나가지 않는지 확인했습니다.",
        apply: () => "방음 상태가 양호합니다."
      },
      {
        tier: "평범한 뉴스",
        title: "🧪 과학실 폐시약 처리 일정 조율",
        desc: "화학 실험실 잔여 시약을 지정 업체에 안전하게 인계했습니다.",
        apply: () => "안전 규정을 준수했습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "🍼 보건실 위생 키트 점검",
        desc: "학급 상비약 통에 밴드와 소독약이 충분한지 확인했습니다.",
        apply: () => "비상용품을 보충했습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "🚌 등교길 학교 앞 교통안전 지도",
        desc: "녹색어머니회와 함께 횡단보도 깃발 봉사를 섰습니다.",
        apply: (game) => { game.reputation += 1; return "아이들의 안전을 지켰습니다."; }
      },
      {
        tier: "평범한 뉴스",
        title: "🍂 교내 낙엽 쓸기 환경미화",
        desc: "방과 후 동아리 학생들과 교정의 낙엽을 쓸어 모았습니다.",
        apply: (game) => { game.stress = Math.max(0, game.stress - 2); return "마음이 상쾌해졌습니다."; }
      }
    ],
    bad: [
      {
        tier: "나쁜 뉴스",
        title: "📞 심야 시간 학부모의 막무가내 전화 항의",
        desc: "사소한 다툼을 두고 밤 11시에 전화를 걸어 고성을 지르는 학부모로 고통받았습니다.",
        apply: (game) => {
          game.stress += 14;
          return "교직에 대한 회의감이 들며 잠을 설쳤습니다. (스트레스 +14)";
        }
      },
      {
        tier: "나쁜 뉴스",
        title: "⚠️ 학생 간 심각한 다툼 발생… 학교폭력대책심의위원회 개최",
        desc: "쉬는 시간 다툼으로 양측 부모가 대립하여 수개월간 진술서 정리에 시달렸습니다.",
        apply: (game) => {
          game.stress += 16; game.health = Math.max(0, game.health - 4);
          return "학폭위 서류 작업으로 기력이 소진되었습니다. (스트레스 +16)";
        }
      },
      {
        tier: "나쁜 뉴스",
        title: "🎒 현장체험학습 중 학생 이탈 소동 발생",
        desc: "놀이공원 인파 속에서 인솔하던 학생 한 명이 일시적으로 길을 잃어 진땀을 뺐습니다.",
        apply: (game) => { game.stress += 12; return "가슴이 철렁 내려앉았습니다."; }
      },
      {
        tier: "나쁜 뉴스",
        title: "🗣️ 수업 중 태도가 불량한 학생을 지도하다 감정 충돌",
        desc: "휴대폰을 압수하는 과정에서 학생이 반발해 교실 분위기가 얼어붙었습니다.",
        apply: (game) => { game.stress += 10; return "훈육의 어려움을 체감했습니다."; }
      },
      {
        tier: "나쁜 뉴스",
        title: "💻 성적 입력 마감 직전 학교 전산망 서버 장애",
        desc: "마감 10분을 남기고 나이스 시스템이 먹통이 되어 발을 동동 구르다 밤을 샜습니다.",
        apply: (game) => { game.stress += 11; return "식은땀을 흘리며 입력했습니다."; }
      },
      {
        tier: "나쁜 뉴스",
        title: "🌧️ 체육대회 당일 갑작스러운 폭우로 행사 전면 연기",
        desc: "한 달간 준비한 전교생 체육대회가 비로 취소되어 장비 철거를 지휘했습니다.",
        apply: (game) => { game.stress += 7; return "허탈감이 몰려왔습니다."; }
      }
    ],
    worst: [
      {
        tier: "최악의 뉴스",
        title: "🚨 정당한 생활지도에 대한 아동학대 무고 고소 피소 사건",
        desc: "수업을 방해하는 학생을 훈계했다가 학부모로부터 무리한 형사 고소를 당해 경찰 조사를 받았습니다.",
        apply: (game) => {
          game.stress += 30; game.happiness = Math.max(0, game.happiness - 20); game.reputation = Math.max(0, game.reputation - 10);
          return "교권보호위원회 소집과 변호사 선임으로 큰 트라우마를 겪었습니다. (평판 -10, 스트레스 +30)";
        }
      },
      {
        tier: "최악의 뉴스",
        title: "🔥 학급 내 집단 따돌림 방관 혐의 교육청 감사 및 징계",
        desc: "피해 학생 학부모가 학교폭력 방관으로 교사를 직접 고발하여 언론에 보도되었습니다.",
        apply: (game) => {
          game.stress += 35; game.reputation = Math.max(0, game.reputation - 25);
          return "교사로서의 명예에 씻을 수 없는 타격을 입었습니다. (평판 -25, 스트레스 +35)";
        }
      }
    ]
  },

  // --------------------------------------------------------------------------
  // 6. 소아과 간호사 (nurse)
  // --------------------------------------------------------------------------
  nurse: {
    veryGood: [
      {
        tier: "매우 좋은 뉴스",
        title: "💉 소아 응급 경련 환아 신속 처치로 기적적 소생… 보건복지부장관 표창!",
        desc: "호흡 마비가 온 아이를 침착한 기도 확보와 응급 처치로 살려내어 전국적 귀감이 되었습니다.",
        apply: (game, won) => {
          const bonus = 10000000;
          game.cash += bonus; game.reputation += 15; game.happiness += 20;
          return `용감한 간호사 포상금 ${won(bonus)} 수령! (평판 +15, 행복 +20)`;
        }
      },
      {
        tier: "매우 좋은 뉴스",
        title: "🌟 전국 대학병원 협회 '올해의 수호천사 간호사' 대상 수상",
        desc: "10년 이상 소아 병동에서 헌신하며 환아들과 부모들에게 희망을 준 공로를 인정받았습니다.",
        apply: (game, won) => {
          const bonus = 12000000; game.cash += bonus; game.reputation += 18;
          return `대상 트로피와 상금 ${won(bonus)}을 받았습니다! (평판 +18)`;
        }
      }
    ],
    good: [
      {
        tier: "좋은 뉴스",
        title: "👶 신생아실 라운딩 중 초기 패혈증 조기 발견 감별",
        desc: "미세한 활력징후 변화를 포착하여 위독해질 뻔한 아기의 골든타임을 지켜냈습니다.",
        apply: (game) => {
          game.reputation += 8; game.happiness += 10;
          return "주치의로부터 절대적인 신뢰를 얻었습니다. (평판 +8)";
        }
      },
      {
        tier: "좋은 뉴스",
        title: "🏥 나이트 전담 수당 인상 및 유급 리프레시 휴가",
        desc: "간호 인력 처우 개선 협약으로 야간 수당이 대폭 인상되고 5일간의 휴가를 받았습니다.",
        apply: (game, won) => {
          const bonus = 2500000;
          game.cash += bonus; game.stress = Math.max(0, game.stress - 12);
          return `격려금 ${won(bonus)}을 받고 푹 쉬었습니다. (스트레스 -12)`;
        }
      },
      {
        tier: "좋은 뉴스",
        title: "💡 병원 내 환자 안전사고 예방 제안 우수작 선정",
        desc: "고위험 약물 투약 오류 방지를 위한 더블체크 바코드 시스템 도입을 건의했습니다.",
        apply: (game, won) => {
          const bonus = 3000000; game.cash += bonus; game.reputation += 5;
          return `혁신 포상금 ${won(bonus)}을 받았습니다.`;
        }
      },
      {
        tier: "좋은 뉴스",
        title: "☕ 퇴원한 환아 가족의 정성 어린 손편지와 간식 선물",
        desc: "완쾌되어 퇴원한 아이의 엄마가 간호사 스테이션에 커피와 쿠키 세트를 두고 갔습니다.",
        apply: (game) => { game.happiness += 8; return "가슴 뭉클한 보람을 느꼈습니다. (행복 +8)"; }
      },
      {
        tier: "좋은 뉴스",
        title: "🏅 병원 친절 직원 왕중왕전 우수 상장",
        desc: "언제나 미소를 잃지 않고 소아 환자들을 달래주는 모습이 모범이 되었습니다.",
        apply: (game) => { game.reputation += 6; game.happiness += 6; return "원내 방송에 소개되었습니다."; }
      },
      {
        tier: "좋은 뉴스",
        title: "📚 전문 간호사 자격증 필기 시험 합격",
        desc: "근무 외 시간에 틈틈이 준비한 중환자 전문 간호사 고시에 합격했습니다.",
        apply: (game) => { game.reputation += 7; game.annualIncome += 1500000; return "전문성을 인정받았습니다."; }
      }
    ],
    normal: [
      {
        tier: "평범한 뉴스",
        title: "🍼 소아 예방접종 및 알레르기 반응 관찰 루틴",
        desc: "주사를 맞고 우는 아이들을 능숙하게 달래며 백신을 접종했습니다.",
        apply: (game) => {
          game.happiness += 3;
          return "사탕을 건네자 방긋 웃는 아이를 보았습니다.";
        }
      },
      {
        tier: "평범한 뉴스",
        title: "📋 3교대 인수인계 및 바이탈 체크 마감",
        desc: "환아들의 수액 속도와 투약 기록을 다음 근무자에게 인계했습니다.",
        apply: () => "특이사항 없이 칼퇴근에 성공했습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "🧸 소아 병동 크리스마스 캐릭터 코스튬 행사",
        desc: "입원한 아이들을 위해 삐에로 모자를 쓰고 작은 선물을 나누었습니다.",
        apply: (game) => {
          game.happiness += 5;
          return "환아들의 웃음꽃이 피었습니다. (행복 +5)";
        }
      },
      {
        tier: "평범한 뉴스",
        title: "💉 정기 감염관리 및 소독 멸균 검사 통과",
        desc: "병동 내 환경 검체 검사에서 무균 상태 100점을 받았습니다.",
        apply: () => "원내 감염 제로를 유지했습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "🧹 백신 냉장고 온도 일일 점검표 기록",
        desc: "콜드체인 의약품 보관용 특수 냉장고 온도를 체크했습니다.",
        apply: () => "규정 온도를 안전하게 유지 중입니다."
      },
      {
        tier: "평범한 뉴스",
        title: "🥣 유아식 및 이유식 배식 보조",
        desc: "보호자가 부재중인 입원 아동의 식사를 살살 떠먹였습니다.",
        apply: (game) => { game.happiness += 2; return "아이가 밥을 잘 먹었습니다."; }
      },
      {
        tier: "평범한 뉴스",
        title: "📦 링거 거대 수액 카트 소독 및 정돈",
        desc: "병동 복도에 비치된 응급 카트를 깨끗이 닦고 소모품을 채웠습니다.",
        apply: () => "응급 비품이 완벽히 세팅되었습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "☕ 야간 당직 중 동료와 마시는 캔커피",
        desc: "나이트킵 근무 중 조용했던 새벽 시간에 동료와 이야기를 나눴습니다.",
        apply: (game) => { game.stress = Math.max(0, game.stress - 2); return "잠을 깨웠습니다."; }
      },
      {
        tier: "평범한 뉴스",
        title: "🧷 아동학대 의심 징후 발견 및 원내 신고 교육 이수",
        desc: "아동보호전문기관 연계 의무 교육 사이버 강의를 들었습니다.",
        apply: () => "신고 절차를 숙지했습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "🛏️ 입원실 병상 시트 및 커버 교체",
        desc: "퇴원 환자가 빠진 자리에 새 고압 멸균 시트를 깔았습니다.",
        apply: () => "침구가 뽀송해졌습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "📋 퇴원 환자 홈케어 안내문 설명",
        desc: "퇴원하는 아이 부모님께 복약 지도와 주의사항을 설명했습니다.",
        apply: () => "보호자가 안심하고 귀가했습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "🩺 체온계 및 혈압계 장비 교정",
        desc: "의공학과와 함께 병동 생체징후 측정기 오차를 검교정했습니다.",
        apply: () => "측정 정확도를 확보했습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "📞 외래 예약 변경 환자 콜백 업무",
        desc: "독감 완치로 내원일을 미루는 보호자의 예약을 변경해 주었습니다.",
        apply: () => "일정을 조율했습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "🌿 간호사 휴게실 공기청정기 필터 세척",
        desc: "주말 휴식 공간의 가전 필터를 물청소하여 말렸습니다.",
        apply: (game) => { game.stress = Math.max(0, game.stress - 1); return "공기가 쾌적해졌습니다."; }
      }
    ],
    bad: [
      {
        tier: "나쁜 뉴스",
        title: "🩸 정맥 주사 혈관을 한 번에 못 찾았다고 보호자의 고성 항의",
        desc: "탈수가 심해 혈관이 가라앉은 아기에게 주사를 놓다 보호자로부터 폭언을 들었습니다.",
        apply: (game) => {
          game.stress += 14;
          return "눈물을 삼키며 사과했습니다. (스트레스 +14)";
        }
      },
      {
        tier: "나쁜 뉴스",
        title: "🏥 소아과 독감 대유행… 12시간 연속 화장실도 못 가고 격무",
        desc: "오픈런 대란으로 밀려드는 환아들로 인해 링거를 맞으며 일했습니다.",
        apply: (game) => {
          game.health = Math.max(0, game.health - 6); game.stress += 16;
          return "극심한 육체 피로로 몸살이 겹쳤습니다. (건강 -6, 스트레스 +16)";
        }
      },
      {
        tier: "나쁜 뉴스",
        title: "🗣️ 보호자 간 주차 갈등 및 병원 로비 소란 중재",
        desc: "병문안 차량 이중주차 문제로 로비에서 고성이 오가어 원무과와 함께 수습했습니다.",
        apply: (game) => { game.stress += 9; return "환자 안정이 깨져 난감했습니다."; }
      },
      {
        tier: "나쁜 뉴스",
        title: "💊 야간 응급 입원 환자 폭주로 병상 부족 대란",
        desc: "병동에 빈 자리가 없어 타 병원 전원을 알아보느라 땀을 뺐습니다.",
        apply: (game) => { game.stress += 11; return "진땀을 흘리며 조율했습니다."; }
      },
      {
        tier: "나쁜 뉴스",
        title: "📋 처방전 전산 입력 오타로 인한 약국 확인 전화 소동",
        desc: "소아 항생제 용량 단위 입력에 혼선이 생겨 즉시 바로잡았습니다.",
        apply: (game) => { game.stress += 10; return "식은땀이 흘렀습니다."; }
      },
      {
        tier: "나쁜 뉴스",
        title: "🦠 병동 내 노로바이러스 의심 환자 발생으로 격리 조치",
        desc: "급성 장염 증세를 보인 환아를 코호트 격리하고 방역 소독을 벌였습니다.",
        apply: (game) => { game.stress += 12; game.health = Math.max(0, game.health - 2); return "긴장 속에서 방호복을 입었습니다."; }
      }
    ],
    worst: [
      {
        tier: "최악의 뉴스",
        title: "🚨 투약 라벨 오류로 인한 니어미스(Near Miss) 사고 감사",
        desc: "바쁜 와중에 용량이 잘못 표기된 수액이 투약 직전 발견되어 병원 감사를 받았습니다.",
        apply: (game) => {
          game.reputation = Math.max(0, game.reputation - 14); game.stress += 25;
          return "시말서 제출과 특별 안전교육 대상자로 지정되었습니다. (평판 -14, 스트레스 +25)";
        }
      },
      {
        tier: "최악의 뉴스",
        title: "🔥 환아 보호자의 의료 과실 주장 허위 민원 및 언론 제보",
        desc: "아이가 열이 내리지 않는다는 이유로 간호사 과실을 주장하며 언론사에 제보하겠다고 협박했습니다.",
        apply: (game) => {
          game.stress += 32; game.reputation = Math.max(0, game.reputation - 20);
          return "병원 법무팀과 진상조사위원회가 열려 큰 마음고생을 했습니다. (평판 -20, 스트레스 +32)";
        }
      }
    ]
  },

  // --------------------------------------------------------------------------
  // 7. 치과의사 (doctor)
  // --------------------------------------------------------------------------
  doctor: {
    veryGood: [
      {
        tier: "매우 좋은 뉴스",
        title: "🦷 풀아치 컴퓨터 가이드 임플란트 학회 라이브 서저리 대성공!",
        desc: "치과의사 학술대회에서 무치악 환자 전악 임플란트 수술을 완벽히 시연했습니다.",
        apply: (game, won) => {
          const bonus = 40000000;
          game.cash += bonus; game.reputation += 16; game.happiness += 20;
          return `고난도 환자 유입으로 비보험 수익 ${won(bonus)}을 창출했습니다! (행복 +20)`;
        }
      },
      {
        tier: "매우 좋은 뉴스",
        title: "🌟 대형 플래그십 치과 병원 단독 개원 및 월 매출 3억 돌파",
        desc: "강남 중심가에 확장 이전한 치과가 프리미엄 심미 치료로 대성황을 이루고 있습니다.",
        apply: (game, won) => {
          const bonus = 70000000;
          game.cash += bonus; game.reputation += 20; game.happiness += 25;
          return `확장 개원 대박으로 현금 ${won(bonus)}이 금고에 쌓였습니다! (평판 +20)`;
        }
      }
    ],
    good: [
      {
        tier: "좋은 뉴스",
        title: "💎 투명 교정 및 치아 미백 환자 패키지 완판",
        desc: "방학 시즌을 맞아 기획한 심미 치과 프로그램이 대히트를 쳤습니다.",
        apply: (game, won) => {
          const bonus = 15000000;
          game.cash += bonus; game.happiness += 10;
          return `분기 인센티브 ${won(bonus)}이 현금 지급되었습니다. (행복 +10)`;
        }
      },
      {
        tier: "좋은 뉴스",
        title: "🔬 최첨단 3D 구강 스캐너 및 CT 장비 전면 도입",
        desc: "디지털 스캔으로 오차 없는 보철물 제작이 가능해져 진료 효율이 급상승했습니다.",
        apply: (game) => {
          game.reputation += 6; game.stress = Math.max(0, game.stress - 8);
          return "진료 만족도가 눈에 띄게 높아졌습니다. (스트레스 -8)";
        }
      },
      {
        tier: "좋은 뉴스",
        title: "💡 무통 마취기 도입으로 소아 치과 공포증 환자 대거 유입",
        desc: "아이들이 울지 않는 치과로 맘카페에서 입소문이 퍼졌습니다.",
        apply: (game, won) => {
          const bonus = 8000000; game.cash += bonus; game.reputation += 7;
          return `신규 환자 증가로 비보험 매출 ${won(bonus)} 상승!`;
        }
      },
      {
        tier: "좋은 뉴스",
        title: "☕ 치과협회 우수 임상 증례 발표상 수상",
        desc: "난치성 치주염 자가 혈소판 풍부 혈장(PRP) 치료법 논문이 대상을 받았습니다.",
        apply: (game) => { game.reputation += 8; return "학회에서 명성을 떨쳤습니다. (평판 +8)"; }
      },
      {
        tier: "좋은 뉴스",
        title: "🤝 오스템 임플란트 자문 의원 위촉",
        desc: "국내 선두 임플란트 제조사의 임상 자문의로 위촉되어 신제품 테스트를 맡았습니다.",
        apply: (game, won) => {
          const fee = 5000000; game.cash += fee; game.reputation += 6;
          return `자문료 ${won(fee)}을 수령했습니다.`;
        }
      },
      {
        tier: "좋은 뉴스",
        title: "👏 원내 위생관리 우수 치과 인증 획득",
        desc: "멸균 소독 프로세스가 완벽한 클린 치과로 보건소 인증을 받았습니다.",
        apply: (game) => { game.reputation += 5; return "환자들의 신뢰도가 상승했습니다."; }
      }
    ],
    normal: [
      {
        tier: "평범한 뉴스",
        title: "🦷 매복 사랑니 발치 3분 컷 완료",
        desc: "신경관에 붙은 하악 매복 사랑니를 깔끔하게 발치했습니다.",
        apply: (game) => {
          game.happiness += 4;
          return "환자가 통증 없이 귀가했습니다. (행복 +4)";
        }
      },
      {
        tier: "평범한 뉴스",
        title: "📋 분기 치과 건강보험 청구액 승인 완료",
        desc: "스케일링과 신경치료 공단 청구 심사가 삭감 없이 통과되었습니다.",
        apply: () => "보험 삭감 0건으로 정산되었습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "☕ 원내 스태프들과의 즐거운 점심 회식",
        desc: "치위생사들과 함께 분위기 좋은 레스토랑에서 식사했습니다.",
        apply: (game) => {
          game.stress = Math.max(0, game.stress - 4);
          return "병원 팀워크가 돈독해졌습니다. (스트레스 -4)";
        }
      },
      {
        tier: "평범한 뉴스",
        title: "📦 기공소 맞춤 지르코니아 크라운 정밀 장착",
        desc: "교합 조정 필요 없이 한 번에 완벽하게 들어맞는 보철물을 세팅했습니다.",
        apply: () => "환자가 편안한 교합에 만족했습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "🧹 유니트 체어 수압 및 핸드피스 오일링 점검",
        desc: "의료 장비 엔지니어를 불러 치과 의자 노후 배관을 청소했습니다.",
        apply: () => "장비 컨디션이 최상입니다."
      },
      {
        tier: "평범한 뉴스",
        title: "🦷 스케일링 체스판 예약 조정",
        desc: "스케일링 성수기를 맞아 내원 환자 동선을 효율적으로 배치했습니다.",
        apply: () => "대기 시간이 줄어들었습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "📚 치과의사 세미나 오프라인 청강",
        desc: "주말을 이용해 턱관절 장애 물리치료 연수회에 다녀왔습니다.",
        apply: (game) => { game.reputation += 1; return "임상 지식을 보강했습니다."; }
      },
      {
        tier: "평범한 뉴스",
        title: "📦 교정용 브라켓 및 레진 소모품 발주",
        desc: "치과 재료상에 다음 달 쓸 접착제와 마취제를 주문했습니다.",
        apply: () => "재고가 넉넉히 채워졌습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "🧊 파노라마 엑스레이 장비 필름 교체 검사",
        desc: "방사선 안전관리 책임자 정기 검사를 무사히 마쳤습니다.",
        apply: () => "안전 기준 적합 판정을 받았습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "📞 리콜 대상 정기 검진 환자 안내 문자 발송",
        desc: "6개월이 지난 스케일링 환자들에게 카카오톡 알림톡을 보냈습니다.",
        apply: () => "내원 예약률이 소폭 올랐습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "🧼 멸균 소독실 오토클레이브 고압 멸균기 가동",
        desc: "치과 기구들을 철저히 고온 소독 포장했습니다.",
        apply: () => "위생 관리가 철저합니다."
      },
      {
        tier: "평범한 뉴스",
        title: "🌿 데스크 인테리어 생화 화분 교체",
        desc: "접수처 안내데스크에 화사한 봄꽃 화분을 새로 들여놓았습니다.",
        apply: (game) => { game.happiness += 1; return "병원 분위기가 화사합니다."; }
      },
      {
        tier: "평범한 뉴스",
        title: "📝 환자 동의서 양식 디지털 서블릿 도입",
        desc: "종이로 받던 임플란트 수술 동의서를 태블릿 전자 서명으로 바꿨습니다.",
        apply: () => "행정 업무가 간편해졌습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "🚶 점심시간 원장실 휴식 및 스트레칭",
        desc: "목 디스크 예방을 위해 점심시간에 가벼운 맨손 체조를 했습니다.",
        apply: (game) => { game.health += 1; return "근육을 이완시켰습니다."; }
      }
    ],
    bad: [
      {
        tier: "나쁜 뉴스",
        title: "⚠️ 신경치료 후 지속적인 통증 호소… 환자의 끈질긴 환불 요구",
        desc: "미세 근관의 잔류 염증으로 환자가 데스크에 찾아와 소리를 질렀습니다.",
        apply: (game) => {
          game.stress += 14; game.reputation = Math.max(0, game.reputation - 4);
          return "진료실 밖 고성으로 스트레스가 치솟았습니다. (스트레스 +14)";
        }
      },
      {
        tier: "나쁜 뉴스",
        title: "📉 인근 기업형 덤핑 치과의 가격 파괴 공세",
        desc: "주변에 대형 네트워크 치과가 들어서며 환자가 일시 감소했습니다.",
        apply: (game) => {
          game.stress += 12;
          return "경영의 고충을 체감합니다. (스트레스 +12)";
        }
      },
      {
        tier: "나쁜 뉴스",
        title: "🦷 임시 치아 탈락으로 주말 응급 내원 민원",
        desc: "여행 중이던 환자가 식사 도중 임시 보철물이 빠졌다며 휴일에 문을 열어달라고 항의했습니다.",
        apply: (game) => { game.stress += 9; return "휴일에 치과로 출동했습니다."; }
      },
      {
        tier: "나쁜 뉴스",
        title: "🚰 유니트 체어 급수관 누수 사고로 진료실 바닥 침수",
        desc: "새벽에 메인 호스 연결 부위가 터져 아래층 학원으로 물이 새는 바람에 배상 소동이 벌어졌습니다.",
        apply: (game, won) => {
          const cost = 2000000; game.cash -= cost; game.stress += 11;
          return `누수 피해 배상금 ${won(cost)}이 지출되었습니다.`;
        }
      },
      {
        tier: "나쁜 뉴스",
        title: "🗣️ 예약 시간에 늦은 VIP 환자의 무리한 진료 강행 요구",
        desc: "지각해 놓고 당장 스케줄을 비워달라는 환자 실랑이로 대기실 분위기가 어수선해졌습니다.",
        apply: (game) => { game.stress += 8; return "응대하느라 진이 빠졌습니다."; }
      },
      {
        tier: "나쁜 뉴스",
        title: "⚡ 치과 메인 전기 스위치 판넬 차단기 트립",
        desc: "디지털 CT와 레이저 치료기를 동시에 가동하다 순간 과부하로 전기가 내려갔습니다.",
        apply: (game) => { game.stress += 7; return "한전 긴급 복구를 요청했습니다."; }
      }
    ],
    worst: [
      {
        tier: "최악의 뉴스",
        title: "🚨 임플란트 식립 중 신경 손상 의료분쟁",
        desc: "골질이 약한 환자의 수술 중 신경 마비 배상 분쟁이 발생하여 협회 공제회에 회부되었습니다.",
        apply: (game, won) => {
          const loss = 25000000;
          game.cash = Math.max(0, game.cash - loss); game.reputation = Math.max(0, game.reputation - 16); game.stress += 28;
          return `합의금 및 배상금으로 현금 ${won(loss)} 지출! (평판 -16, 스트레스 +28)`;
        }
      },
      {
        tier: "최악의 뉴스",
        title: "🔥 마취 주사 알러지 쇼크(Anaphylaxis) 응급 후송 사태",
        desc: "사랑니 국소마취 주사 직후 환자에게 급성 호흡곤란 쇼크가 와서 119 구급차로 대학병원에 실려갔습니다.",
        apply: (game) => {
          game.stress += 35; game.reputation = Math.max(0, game.reputation - 25); game.happiness = Math.max(0, game.happiness - 20);
          return "다행히 환자는 의식을 회복했지만 치과 영업 정지 위기를 맞았습니다. (평판 -25, 스트레스 +35)";
        }
      }
    ]
  },

  // --------------------------------------------------------------------------
  // 8. 경찰 (police)
  // --------------------------------------------------------------------------
  police: {
    veryGood: [
      {
        tier: "매우 좋은 뉴스",
        title: "🚨 전국 단위 1,000억대 전세사기 및 불법 도박 카르텔 일망타진!",
        desc: "6개월간의 끈질긴 위장 수사 끝에 조직원을 전원 검거하여 1계급 특진의 영예를 안았습니다.",
        apply: (game) => {
          game.annualIncome += 4000000; game.reputation += 18; game.happiness += 22;
          return "경찰청 특진으로 연봉 400만원 인상 및 영웅이 되었습니다! (평판 +18)";
        }
      },
      {
        tier: "매우 좋은 뉴스",
        title: "🌟 대한민국 베스트 의경/경찰관 대통령 명의 삼일절 훈장 수여",
        desc: "흉기 난동범을 맨몸으로 제압하여 시민의 생명을 구한 공로를 인정받았습니다.",
        apply: (game, won) => {
          const bonus = 10000000; game.cash += bonus; game.reputation += 22;
          return `포상금 ${won(bonus)} 및 옥조근정훈장을 수여받았습니다! (평판 +22)`;
        }
      }
    ],
    good: [
      {
        tier: "좋은 뉴스",
        title: "👶 실종된 치매 어르신 골든타임 내 CCTV 동선 추적으로 구조",
        desc: "영하의 날씨에 야산을 헤매던 실종자를 신속한 탐문으로 무사히 가족에게 인계했습니다.",
        apply: (game) => {
          game.reputation += 10; game.happiness += 12;
          return "가족들이 눈물의 감사를 표했습니다. (평판 +10)";
        }
      },
      {
        tier: "좋은 뉴스",
        title: "👮 범죄예방 우수 관서 선정 및 치안 포상금 수령",
        desc: "관내 5대 범죄 발생률을 전년 대비 30% 감소시켜 경찰서장 표창을 받았습니다.",
        apply: (game, won) => {
          const bonus = 1500000;
          game.cash += bonus; game.happiness += 8;
          return `치안 포상금 ${won(bonus)}을 수령했습니다.`;
        }
      },
      {
        tier: "좋은 뉴스",
        title: "💡 보이스피싱 인출책 현장 검거 공조 기여",
        desc: "은행 직원의 신고를 받고 출동해 현장에서 인출책 지문과 현금 5천만원을 압수했습니다.",
        apply: (game, won) => {
          const reward = 3000000; game.cash += reward; game.reputation += 7;
          return `검거 유공 포상금 ${won(reward)}이 지급되었습니다.`;
        }
      },
      {
        tier: "좋은 뉴스",
        title: "☕ 관내 초등학교 등굣길 안전 횡단보도 캠페인",
        desc: "모범운전자회와 함께 스쿨존 과속 단속 및 아이들 등교 지도를 펼쳤습니다.",
        apply: (game) => { game.reputation += 4; game.happiness += 5; return "학부모들의 박수를 받았습니다."; }
      },
      {
        tier: "좋은 뉴스",
        title: "🏅 지방경찰청장 표창 수여 (하반기 검거율 1위)",
        desc: "형사과 강력팀 성과 평가에서 관내 지명수배자 검거 실적 우수 팀으로 등극했습니다.",
        apply: (game, won) => {
          const bonus = 4000000; game.cash += bonus; game.reputation += 8;
          return `성과 포상금 ${won(bonus)}을 받았습니다. (평판 +8)`;
        }
      },
      {
        tier: "좋은 뉴스",
        title: "🤝 가출 청소년 선도 프로그램 성공 사례 발표",
        desc: "비행 청소년을 지속적으로 상담해 검정고시 합격과 취업을 도왔습니다.",
        apply: (game) => { game.reputation += 6; game.happiness += 8; return "마음 뿌듯한 보람을 느꼈습니다."; }
      }
    ],
    normal: [
      {
        tier: "평범한 뉴스",
        title: "🚓 심야 취약지역 112 순찰차 거점 근무",
        desc: "원룸촌과 유흥가 골목길을 정속 순찰하며 경광등을 켰습니다.",
        apply: () => "특이 사건 없이 안전하게 순찰을 마쳤습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "📝 음주운전 일제 단속 실시",
        desc: "주요 교차로에서 음주 단속을 벌여 안전한 교통 문화에 기여했습니다.",
        apply: (game) => { game.reputation += 2; return "단속 건수 없이 안전했습니다."; }
      },
      {
        tier: "평범한 뉴스",
        title: "☕ 팀원들과 지구대 야식 컵라면 타임",
        desc: "새벽 순찰 중간 컵라면을 먹으며 동료들과 전우애를 다졌습니다.",
        apply: (game) => { game.stress = Math.max(0, game.stress - 3); return "따뜻한 국물에 피로를 녹였습니다."; }
      },
      {
        tier: "평범한 뉴스",
        title: "📋 사건 송치 서류 검찰 전산 등록 마감",
        desc: "단순 절도 피의자 신문 조서를 꼼꼼히 검토해 송치했습니다.",
        apply: () => "서류 반려 없이 송치가 수리되었습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "🛡️ 지구대 방탄복 및 3단봉 장비 점검",
        desc: "야간 출동 시 사용하는 개인 안전장구 이상 유무를 확인했습니다.",
        apply: () => "장비가 완벽히 정비되었습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "🚶 관내 상가 번영회 치안 간담회 참석",
        desc: "상인들의 애로사항인 야간 심야 방범 순찰 강화 요청을 청취했습니다.",
        apply: (game) => { game.reputation += 1; return "주민 의견을 수렴했습니다."; }
      },
      {
        tier: "평범한 뉴스",
        title: "🚗 순찰차 소모품(엔진오일 및 타이어) 교체",
        desc: "지구대 공용 차량 카센터 정비 주기가 돌아와 점검을 받았습니다.",
        apply: () => "차량 컨디션이 좋아졌습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "🗂️ 유실물 센터 습득물 주인 찾아주기",
        desc: "택시에 두고 내린 명품 지갑을 주인의 신원 조회 끝에 돌려주었습니다.",
        apply: (game) => { game.happiness += 2; return "주인이 거듭 감사 인사를 했습니다."; }
      },
      {
        tier: "평범한 뉴스",
        title: "🥋 경찰서 무도 훈련장 체력 단련",
        desc: "체포술 및 주짓수 그라플링 기술 연마 정기 훈련에 참여했습니다.",
        apply: (game) => { game.health += 1; return "체력을 단련했습니다."; }
      },
      {
        tier: "평범한 뉴스",
        title: "🔍 유흥가 불법 광고물 야간 합동 단속",
        desc: "전단지 불법 살포 행위를 계도하고 과태료 부과 스티커를 부착했습니다.",
        apply: () => "거리가 깨끗해졌습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "🧊 지구대 휴게실 에어컨 필터 청소",
        desc: "무더위 여름을 앞두고 교대로 당직실 에어컨을 정비했습니다.",
        apply: (game) => { game.stress = Math.max(0, game.stress - 1); return "시원해졌습니다."; }
      },
      {
        tier: "평범한 뉴스",
        title: "📝 사격 훈련장 정기 권총 실탄 사격",
        desc: "경찰서 실내 사격장에서 38구경 권총 영점 사격을 실시했습니다.",
        apply: () => "사격 점수 만점에 가까웠습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "🐕‍🦺 유기견 신고 출동 및 동물보호센터 인계",
        desc: "아파트 단지를 배회하는 대형견을 안전하게 포획해 보호소에 넘겼습니다.",
        apply: () => "주민 안전사고를 예방했습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "🌙 야간 방범등 고장 지역 구청 통보",
        desc: "어두운 골목길 가로등 번호를 확인해 지자체에 수리를 요청했습니다.",
        apply: () => "보안등 보수가 접수되었습니다."
      }
    ],
    bad: [
      {
        tier: "나쁜 뉴스",
        title: "🥊 주취 난동자 제압 중 옷이 찢기고 욕설 세례",
        desc: "지구대 안에서 행패를 부리는 만취자를 분리하려다 멱살을 잡히고 폭언을 당했습니다.",
        apply: (game) => {
          game.stress += 14;
          return "깊은 자괴감과 스트레스를 받았습니다. (스트레스 +14)";
        }
      },
      {
        tier: "나쁜 뉴스",
        title: "🏃 흉기 난동범 추격전 중 넘어져 무릎 인대 타박상",
        desc: "도주하던 절도범을 몸을 던져 덮치다 아스팔트에 무릎을 크게 다쳤습니다.",
        apply: (game) => {
          game.health = Math.max(0, game.health - 6); game.stress += 10;
          return "절뚝이며 병원 치료를 받았습니다. (건강 -6, 스트레스 +10)";
        }
      },
      {
        tier: "나쁜 뉴스",
        title: "🚗 긴급 출동 중 골목길 불법 주정차 차량과 접촉사고",
        desc: "사이렌을 울리며 범죄 현장으로 가던 중 양보받지 못한 차량과 부딪혔습니다.",
        apply: (game, won) => {
          const cost = 1200000; game.cash -= cost; game.stress += 12;
          return `공용차량 수리비 ${won(cost)} 발생 및 경위서 작성!`;
        }
      },
      {
        tier: "나쁜 뉴스",
        title: "🗣️ 가정폭력 신고 출동 현장에서 쌍방 폭행 연루 항의",
        desc: "부부 싸움 중 중재를 하다 흥분한 남편에게 폭행 가담으로 오인받아 민원이 제기되었습니다.",
        apply: (game) => { game.stress += 13; return "억울한 진상 조사를 거쳤습니다."; }
      },
      {
        tier: "나쁜 뉴스",
        title: "🌧️ 폭우 속 야외 변사체 현장 감식 장시간 대기",
        desc: "산등성이 변사 사건 신고로 소방과 합동으로 6시간 동안 비를 맞으며 폴리스라인을 쳤습니다.",
        apply: (game) => { game.health = Math.max(0, game.health - 5); game.stress += 11; return "한기를 느껴 감기몸살이 났습니다."; }
      },
      {
        tier: "나쁜 뉴스",
        title: "📋 피의자 호송 중 수갑 채널 이탈 도주 미수 소동",
        desc: "지구대 화장실을 이용하던 주취 피의자가 순간적으로 도망치다 복도에서 제압되었습니다.",
        apply: (game) => { game.stress += 15; return "감사관실 주의 처분을 받았습니다."; }
      }
    ],
    worst: [
      {
        tier: "최악의 뉴스",
        title: "🚨 정당방위 물리력 행사 과잉진압 논란으로 청문감사관실 감찰",
        desc: "난동범 제압 과정이 왜곡 편집되어 SNS에 퍼지며 직무정지 처분을 받았습니다.",
        apply: (game) => {
          game.reputation = Math.max(0, game.reputation - 18); game.stress += 28; game.happiness = Math.max(0, game.happiness - 15);
          return "여론의 뭇매와 감찰 조사로 최대의 시련을 겪었습니다. (평판 -18, 스트레스 +28)";
        }
      },
      {
        tier: "최악의 뉴스",
        title: "🔥 야간 검문 도중 뺑소니 차량에 치여 중상 입고 수술",
        desc: "음주운전 의심 차량을 검문하다 도주하는 범인의 차에 치여 다리 골절 및 전치 12주 판정을 받았습니다.",
        apply: (game) => {
          game.health = Math.max(0, game.health - 25); game.stress += 35; game.happiness = Math.max(0, game.happiness - 20);
          return "몇 달간 병원에 입원하여 재활 치료를 받았습니다. (건강 -25, 스트레스 +35)";
        }
      }
    ]
  },

  // --------------------------------------------------------------------------
  // 9. 소방관 (firefighter)
  // --------------------------------------------------------------------------
  firefighter: {
    veryGood: [
      {
        tier: "매우 좋은 뉴스",
        title: "🚒 대형 아파트 화재 독가스 뚫고 일가족 구조… '영웅 소방관' 선정!",
        desc: "농연 속에서 마스크를 양보하며 아이를 품에 안고 탈출했습니다.",
        apply: (game, won) => {
          const bonus = 15000000;
          game.cash += bonus; game.reputation += 20; game.happiness += 25;
          return `소방영웅 포상금 ${won(bonus)}과 찬사를 받았습니다! (평판 +20)`;
        }
      },
      {
        tier: "매우 좋은 뉴스",
        title: "🌟 전국 119 소방안전왕 대상 대통령 표창 및 특진",
        desc: "인명 구조 및 재난 현장 대응 마스터로 선발되어 1계급 특진했습니다.",
        apply: (game, won) => {
          const bonus = 12000000; game.cash += bonus; game.annualIncome += 3500000;
          return `특진과 함께 포상금 ${won(bonus)} 수령! 연봉 350만원 인상! (평판 +22)`;
        }
      }
    ],
    good: [
      {
        tier: "좋은 뉴스",
        title: "🎖️ 전국 소방기술경연대회 최강소방관 분야 1위 입상",
        desc: "호스 전개, 중량물 운반, 타워 등반 등 극한의 체력 검정에서 1위를 차지했습니다.",
        apply: (game) => {
          game.reputation += 10; game.health += 5; game.happiness += 10;
          return "강철 체력을 입증하며 메달을 목에 걸았습니다. (건강 +5)";
        }
      },
      {
        tier: "좋은 뉴스",
        title: "🛡️ 신형 첨단 방화복 및 열화상 카메라 전원 보급",
        desc: "가볍고 내열성이 우수한 최고급 특수 화재진압 장비가 지급되었습니다.",
        apply: (game) => {
          game.stress = Math.max(0, game.stress - 10);
          return "현장 안전성이 높아져 든든합니다. (스트레스 -10)";
        }
      },
      {
        tier: "좋은 뉴스",
        title: "💡 소방서 주관 위험물 안전관리 우수 제안 당선",
        desc: "전통시장 노후 전선 정비 가이드라인을 제안해 화재 예방에 기여했습니다.",
        apply: (game, won) => {
          const bonus = 3500000; game.cash += bonus; game.reputation += 6;
          return `행안부 장관상 및 상금 ${won(bonus)} 수령!`;
        }
      },
      {
        tier: "좋은 뉴스",
        title: "☕ 구조된 시민이 보낸 수제 쿠키와 커피 박스",
        desc: "벌집 제거 출동으로 도움을 준 요구조자가 소방서로 간식 세트를 보냈습니다.",
        apply: (game) => { game.happiness += 7; return "동료들과 맛있게 나눠 먹었습니다. (행복 +7)"; }
      },
      {
        tier: "좋은 뉴스",
        title: "🏅 의소대(의용소방대) 합동 소방 훈련 최우수 지도관",
        desc: "지역 주민 소방 훈련을 성공적으로 이끌어 표창을 받았습니다.",
        apply: (game) => { game.reputation += 5; return "주민 친화력을 인정받았습니다."; }
      },
      {
        tier: "좋은 뉴스",
        title: "📚 인명구조사 1급 국가 자격 시험 최종 합격",
        desc: "전문 구조대원의 최고 자격증인 구조사 1급 배지를 달았습니다.",
        apply: (game) => { game.reputation += 8; game.happiness += 10; return "구조 전문성을 공인받았습니다."; }
      }
    ],
    normal: [
      {
        tier: "평범한 뉴스",
        title: "🚒 소방 펌프차 및 장비 일일 정기 점검",
        desc: "사이렌과 방수포, 유압 절단기 작동 상태를 정비했습니다.",
        apply: () => "출동 태세를 완벽히 유지했습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "🐱 높은 나무 위 고립된 아기 고양이 안전 구조",
        desc: "동물 구조 생활안전 출동을 나가 무사히 고양이를 구조했습니다.",
        apply: (game) => { game.happiness += 4; return "시민들이 박수를 쳐주었습니다."; }
      },
      {
        tier: "평범한 뉴스",
        title: "🏢 관내 초등학교 소방안전 및 CPR 교육",
        desc: "아이들에게 소화기 사용법과 흉부 압박을 가르쳤습니다.",
        apply: (game) => { game.reputation += 2; return "아이들의 눈망울이 반짝였습니다."; }
      },
      {
        tier: "평범한 뉴스",
        title: "🍲 출동 복귀 후 센터 동료들과 김치찌개 식사",
        desc: "간단한 쓰레기 화재 진압 후 귀소하여 동료들과 밥을 먹었습니다.",
        apply: () => "평온한 당직 루틴을 이어갔습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "🧯 지하상가 소화기 비치 현황 불시 점검",
        desc: "상가 내 노후 분말 소화기 교체 안내문을 배부했습니다.",
        apply: () => "화재 사각지대를 점검했습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "🏋️ 센터 헬스장 바벨 데드리프트 웨이트 트레이닝",
        desc: "비번 날에도 소방서 체력단련실에서 근력을 키웠습니다.",
        apply: (game) => { game.health += 1; return "완력과 체력을 유지했습니다."; }
      },
      {
        tier: "평범한 뉴스",
        title: "💧 소화전 주변 불법 주정차 계도장 부착",
        desc: "화재 시 소방용수 확보를 위해 주정차 금지 구역을 순찰했습니다.",
        apply: () => "주민 협조를 유도했습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "🚿 개인 방화복 고압 세척 및 건조",
        desc: "그을음이 묻은 진압복을 전용 세탁기에 돌려 말렸습니다.",
        apply: () => "장비가 뽀송해졌습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "🧼 구급차 내부 살균 소독 및 산소탱크 교체",
        desc: "환자 이송 후 음압 구급차 내외부를 락스 소독했습니다.",
        apply: () => "위생적인 구급 환경을 유지합니다."
      },
      {
        tier: "평범한 뉴스",
        title: "🪜 굴절사다리차 아파트 단지 진입 훈련",
        desc: "고층 빌딩 화재 진압을 위한 사다리 전개 시뮬레이션을 했습니다.",
        apply: () => "숙달된 조작법을 점검했습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "🧊 제빙기 얼음통 청소 및 보급",
        desc: "더운 현장에서 돌아온 대원들을 위해 얼음을 가득 얼려두었습니다.",
        apply: (game) => { game.stress = Math.max(0, game.stress - 2); return "갈증을 해소했습니다."; }
      },
      {
        tier: "평범한 뉴스",
        title: "📝 소방서 당직 근무 일지 작성",
        desc: "24시간 교대 근무 동안 발생한 출동 건수를 전산에 입력했습니다.",
        apply: () => "행정 업무를 마쳤습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "🌳 센터 마당 단풍나무 가지치기",
        desc: "소방차 출동 동선을 가로막는 가로수 나뭇가지를 잘라냈습니다.",
        apply: () => "차고 앞 시야가 트였습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "☕ 야간 당직 믹스커피 마시기",
        desc: "고요한 새벽 상황실에서 출동 벨 대기 중 커피를 마셨습니다.",
        apply: (game) => { game.stress = Math.max(0, game.stress - 1); return "차분한 밤입니다."; }
      }
    ],
    bad: [
      {
        tier: "나쁜 뉴스",
        title: "📞 술 취한 사람의 상습 허위 장난 신고 출동",
        desc: "화재 벨이 울려 긴급 출동했으나 주정뱅이의 장난 전화로 밝혀졌습니다.",
        apply: (game) => {
          game.stress += 12;
          return "낭비된 출동력에 허탈했습니다. (스트레스 +12)";
        }
      },
      {
        tier: "나쁜 뉴스",
        title: "🔥 강풍 타고 번진 산불 진화 24시간 사투",
        desc: "등짐펌프를 메고 험준한 산을 오르며 잔불을 끄느라 탈진했습니다.",
        apply: (game) => {
          game.health = Math.max(0, game.health - 8); game.stress += 14;
          return "연기를 많이 마셔 목이 칼칼합니다. (건강 -8, 스트레스 +14)";
        }
      },
      {
        tier: "나쁜 뉴스",
        title: "🚗 긴급 출동 중 골목길 불법 주차 차량 강제 견인 소동",
        desc: "소방차 진입을 가로막는 불법 주차 차량을 밀어내다 차주와 시비가 붙었습니다.",
        apply: (game) => { game.stress += 10; return "민원 압박에 시달렸습니다."; }
      },
      {
        tier: "나쁜 뉴스",
        title: "🐝 말벌 퇴치 출동 중 벌에 쏘여 알러지 반응",
        desc: "보호장구를 착용했으나 틈새로 말벌이 파고들어 손등을 쏘였습니다.",
        apply: (game) => { game.health = Math.max(0, game.health - 4); game.stress += 6; return "응급실에서 주사를 맞았습니다."; }
      },
      {
        tier: "나쁜 뉴스",
        title: "🌊 집중호우 지하차도 침수 차량 고립 구조 작전",
        desc: "흙탕물 속에서 허우적거리는 운전자를 로프를 던져 구조했습니다.",
        apply: (game) => { game.health = Math.max(0, game.health - 5); game.stress += 11; return "온몸에 흙탕물을 뒤집어썼습니다."; }
      },
      {
        tier: "나쁜 뉴스",
        title: "🚪 취한 독거노인 자택 문짝 강제 개방 출동",
        desc: "연락이 안 된다는 가족 신고로 현관문을 부수고 진입했으나 단순 숙면 중이었습니다.",
        apply: (game) => { game.stress += 8; return "허탈하게 복귀했습니다."; }
      }
    ],
    worst: [
      {
        tier: "최악의 뉴스",
        title: "🚨 붕괴 잔해물에 갇혀 순직할 뻔한 탈출… 외상후스트레스(PTSD)",
        desc: "공장 화재 현장에서 천장이 무너져 매몰되었다가 동료들에게 가까스로 구조되었습니다.",
        apply: (game) => {
          game.health = Math.max(0, game.health - 12); game.stress += 30; game.happiness = Math.max(0, game.happiness - 15);
          return "트라우마로 정신과 치료를 받게 되었습니다. (건강 -12, 스트레스 +30)";
        }
      },
      {
        tier: "최악의 뉴스",
        title: "🔥 화학 공장 폭발 사고 유독가스 흡입으로 폐렴 입원",
        desc: "탱크로리 화재 진압 도중 화학 물질이 유출되어 방독면 틈새로 독성 가스를 마셨습니다.",
        apply: (game) => {
          game.health = Math.max(0, game.health - 25); game.stress += 35;
          return "중환자실에 산소호흡기를 차고 입원했습니다. (건강 -25, 스트레스 +35)";
        }
      }
    ]
  },

  // --------------------------------------------------------------------------
  // 10. 미래에셋 펀드매니저 (finance)
  // --------------------------------------------------------------------------
  finance: {
    veryGood: [
      {
        tier: "매우 좋은 뉴스",
        title: "📈 롱숏 전략 대적중… 연간 운용 수익률 +80% 달성!",
        desc: "시장 폭락을 방어하고 주도주를 선제 매수하여 업계 1위 펀드로 기록되었습니다.",
        apply: (game, won) => {
          const bonus = Math.round(game.annualIncome * 0.6);
          game.cash += bonus; game.reputation += 18; game.happiness += 25;
          return `인센티브 ${won(bonus)}이 통장에 꽂혔습니다! (행복 +25)`;
        }
      },
      {
        tier: "매우 좋은 뉴스",
        title: "🌟 글로벌 금융 매거진 '올해의 아시아 최고 펀드매니저' 선정",
        desc: "아시아 신흥국 증시 변동성 속에서도 탁월한 알파 수익률을 거둔 점을 외신이 극찬했습니다.",
        apply: (game, won) => {
          const bonus = 50000000;
          game.cash += bonus; game.reputation += 22;
          return `글로벌 성과급 ${won(bonus)} 수령 및 업계 최고 명성 획득! (평판 +22)`;
        }
      }
    ],
    good: [
      {
        tier: "좋은 뉴스",
        title: "💼 대형 국민연금·공제회 위탁 운용 펀드 5,000억 유치",
        desc: "치열한 프레젠테이션 끝에 대형 기관투자자의 자금을 성공적으로 유치했습니다.",
        apply: (game, won) => {
          const bonus = 20000000;
          game.cash += bonus; game.reputation += 10;
          return `펀드 수탁고 증가 보너스 ${won(bonus)}을 수령했습니다. (평판 +10)`;
        }
      },
      {
        tier: "좋은 뉴스",
        title: "✈️ 글로벌 헤지펀드 투자자 해외 로드쇼 호평",
        desc: "해외 미팅에서 당사 포트폴리오의 독보적 안정성을 인정받았습니다.",
        apply: (game) => {
          game.reputation += 6; game.happiness += 8;
          return "글로벌 네트워크를 다지며 출장을 마쳤습니다. (행복 +8)";
        }
      },
      {
        tier: "좋은 뉴스",
        title: "💡 사내 베스트 애널리스트 추천 종목 대박",
        desc: "직접 발굴한 2차전지 소부장 종목이 한 달 만에 100% 급등했습니다.",
        apply: (game, won) => {
          const profit = 15000000; game.cash += profit; game.reputation += 8;
          return `운용 성과 보수로 ${won(profit)}이 입금되었습니다.`;
        }
      },
      {
        tier: "좋은 뉴스",
        title: "☕ 여의도 금융가 VIP 초청 골프 라운딩 미팅",
        desc: "주요 대기업 오너 일가 자산가들과 친목을 다졌습니다.",
        apply: (game) => { game.happiness += 6; game.reputation += 4; return "인맥을 넓혔습니다."; }
      },
      {
        tier: "좋은 뉴스",
        title: "🏅 한국증권학회 우수 논문상 금융 부문 수상",
        desc: "금리 인상기 자산 배분 전략에 대한 실증 분석 논문이 채택되었습니다.",
        apply: (game) => { game.reputation += 7; return "학술적 깊이를 입증했습니다. (평판 +7)"; }
      },
      {
        tier: "좋은 뉴스",
        title: "👏 본부 내 최고 성과 운용역 감사 패키지 수여",
        desc: "상반기 펀드 수익률 1위 달성 기념으로 사내 특별 포상을 받았습니다.",
        apply: (game, won) => {
          const bonus = 8000000; game.cash += bonus;
          return `특별 인센티브 ${won(bonus)}이 지급되었습니다.`;
        }
      }
    ],
    normal: [
      {
        tier: "평범한 뉴스",
        title: "📊 블룸버그 터미널 실시간 차트 분석 및 리밸런싱",
        desc: "환율과 국채 금리 움직임을 체크하며 펀드 내 비중을 조정했습니다.",
        apply: () => "변동성에 흔들리지 않고 무난하게 넘겼습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "☕ 여의도 증권가 정보 탐색 및 맛집 오찬",
        desc: "애널리스트들과 오찬을 가지며 최신 산업 팩트를 체크했습니다.",
        apply: (game) => {
          game.stress = Math.max(0, game.stress - 3);
          return "유용한 정보를 수집했습니다. (스트레스 -3)";
        }
      },
      {
        tier: "평범한 뉴스",
        title: "📑 분기 펀드 운용보고서 작성 및 고객 발송",
        desc: "가입자들을 위한 시장 전망과 수익률 리뷰 레터를 발송했습니다.",
        apply: () => "컴플레인 없이 보고서가 마감되었습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "💻 유망 테크 기업 IR 탐방 및 인터뷰",
        desc: "판교 테크 기업을 방문하여 신제품 파이프라인 상황을 실사했습니다.",
        apply: (game) => {
          game.reputation += 2;
          return "기업 분석 능력을 발휘했습니다. (평판 +2)";
        }
      },
      {
        tier: "평범한 뉴스",
        title: "📈 만기 도래 채권 리밸런싱 주문 접수",
        desc: "국고채 3년물 이자 정산 및 재투자 매매를 집행했습니다.",
        apply: () => "안정적으로 포트폴리오를 롤오버했습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "🏢 여의도 본사 사옥 피트니스 센터 운동",
        desc: "퇴근 전 빌딩 지하 헬스장에서 가벼운 러닝머신을 뛰었습니다.",
        apply: (game) => { game.health += 1; return "체력을 관리했습니다."; }
      },
      {
        tier: "평범한 뉴스",
        title: "📰 경제 일간지 마켓 아웃룩 인터뷰 기고",
        desc: "하반기 증시 전망에 대한 언론사 서면 인터뷰에 응답했습니다.",
        apply: (game) => { game.reputation += 2; return "전문가 칼럼이 게재되었습니다."; }
      },
      {
        tier: "평범한 뉴스",
        title: "🗂️ 펀드 자산운용 보고서 컴플라이언스 사전 심사",
        desc: "법적 규제 준수 여부를 준법감시인에게 검토받았습니다.",
        apply: () => "적법 승인을 취득했습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "📞 기관 투자자 정기 컨퍼런스 콜 진행",
        desc: "연기금 운용 픽스드 매니저들과 화상 회의를 열었습니다.",
        apply: () => "질의응답을 무난히 마쳤습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "🧊 증권가 빌딩 지하 편의점 아이스 아메리카노",
        desc: "점심 미팅 후 복귀하는 길에 시원한 커피를 마셨습니다.",
        apply: (game) => { game.stress = Math.max(0, game.stress - 1); return "더위를 식혔습니다."; }
      },
      {
        tier: "평범한 뉴스",
        title: "📉 환헤지 통화 선물 스와프 계약 연장",
        desc: "달러 환율 변동성 리스크를 방어하기 위해 은행과 계약을 갱신했습니다.",
        apply: () => "환오픈 포지션을 헷지했습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "📝 신규 입사 주니어 애널리스트 직무 교육",
        desc: "재무제표 분석 및 DCF 밸류에이션 모델링 특강을 진행했습니다.",
        apply: (game) => { game.reputation += 1; return "후배를 지도했습니다."; }
      },
      {
        tier: "평범한 뉴스",
        title: "🚌 퇴근길 여의도 지하철역 혼잡 피하기",
        desc: "증권가 장 마감 후 잠시 사무실에 남아 리서치 리포트를 읽었습니다.",
        apply: () => "지옥 출퇴근길을 피했습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "🌿 사무실 책상 위 미니 선인장 화분 돌보기",
        desc: "한 달에 한 번 소량의 물을 주며 싱싱함을 확인했습니다.",
        apply: () => "무탈하게 자라고 있습니다."
      }
    ],
    bad: [
      {
        tier: "나쁜 뉴스",
        title: "⚠️ 편입 핵심 성장주의 어닝 쇼크로 펀드 급락",
        desc: "기대주가 적자 전환을 발표하며 펀드 가치가 주저앉았습니다.",
        apply: (game) => {
          game.stress += 16; game.reputation = Math.max(0, game.reputation - 4);
          return "손절매를 진행하며 뼈아픈 손실을 기록했습니다. (스트레스 +16)";
        }
      },
      {
        tier: "나쁜 뉴스",
        title: "📞 거액 법인 고객의 원금 손실 항의 및 환매 요청",
        desc: "시장 조정으로 불안해진 VIP 고객이 전액 환매하겠다며 위탁 취소를 통보했습니다.",
        apply: (game) => {
          game.stress += 14;
          return "자금 이탈 방어를 위해 진이 빠졌습니다. (스트레스 +14)";
        }
      },
      {
        tier: "나쁜 뉴스",
        title: "📉 환율 급변동으로 파생상품 손실 한계치 임박",
        desc: "역대급 달러 강세로 풋옵션 방어 포지션에서 미실현 손실이 커졌습니다.",
        apply: (game) => { game.stress += 12; return "모니터 숫자를 보며 식은땀을 흘렸습니다."; }
      },
      {
        tier: "나쁜 뉴스",
        title: "🗣️ 리서치센터 오류 데이터 인용으로 인한 가짜 뉴스 해프닝",
        desc: "오인된 실적 전망치를 팟캐스트에서 언급했다가 정정 보도를 냈습니다.",
        apply: (game) => { game.stress += 10; game.reputation = Math.max(0, game.reputation - 2); return "신뢰도가 소폭 깎였습니다."; }
      },
      {
        tier: "나쁜 뉴스",
        title: "💻 증권사 홈트레이딩(HTS) 시스템 장애로 매매 타이밍 놓침",
        desc: "동시호가 시간에 주문 서버가 다운되어 호가창을 날렸습니다.",
        apply: (game) => { game.stress += 11; return "발을 동동 구르며 기술팀을 찾았습니다."; }
      },
      {
        tier: "나쁜 뉴스",
        title: "📋 금감원 자산운용사 정기 리스크 관리 실태 점검 지적",
        desc: "컴플라이언스 서류 미비 건으로 기관 주의 경고 조치를 받았습니다.",
        apply: (game) => { game.stress += 9; return "내부 통제 프로세스를 보완했습니다."; }
      }
    ],
    worst: [
      {
        tier: "최악의 뉴스",
        title: "🚨 미공개 정보 이용 의혹 금융감독원 긴급 압수수색 조사",
        desc: "블록딜 거래와 관련해 불공정거래 혐의로 자격 정지 위기에 놓였습니다.",
        apply: (game) => {
          game.reputation = Math.max(0, game.reputation - 20); game.stress += 30; game.happiness = Math.max(0, game.happiness - 20);
          return "금감원 대질 조사로 커리어에 타격을 입었습니다. (평판 -20, 스트레스 +30)";
        }
      },
      {
        tier: "최악의 뉴스",
        title: "🔥 펀드 부실 채권(PF) 불완전 판매 사태로 검찰 고발",
        desc: "판매사가 위험 자산을 안전하다고 속여 판 부실 사모펀드 사태의 운용 책임자로 지목되었습니다.",
        apply: (game) => {
          game.stress += 35; game.reputation = Math.max(0, game.reputation - 30); game.happiness = Math.max(0, game.happiness - 25);
          return "언론 보도와 함께 금융위원회 직무 정지 중징계를 받았습니다. (평판 -30, 스트레스 +35)";
        }
      }
    ]
  },

  // --------------------------------------------------------------------------
  // 11. 하이닉스 반도체 연구원 (researcher)
  // --------------------------------------------------------------------------
  researcher: {
    veryGood: [
      {
        tier: "매우 좋은 뉴스",
        title: "🔬 세계 최초 차세대 HBM4 초고단 적층 양산 수율 90% 돌파!",
        desc: "미세 접합 한계를 극복하며 글로벌 시장을 독점 선점했습니다.",
        apply: (game, won) => {
          const bonus = 35000000;
          game.cash += bonus; game.reputation += 18; game.happiness += 22;
          return `연구개발 포상금 ${won(bonus)}을 수령했습니다! (평판 +18)`;
        }
      },
      {
        tier: "매우 좋은 뉴스",
        title: "🌟 국가 과학기술 혁신 유공자 국무총리 표창 및 특별 성과급",
        desc: "대한민국 반도체 초격차 기술 유지에 기여한 최고 연구원으로 선정되었습니다.",
        apply: (game, won) => {
          const bonus = 25000000; game.cash += bonus; game.reputation += 20;
          return `정부 포상 및 연구 성과급 ${won(bonus)}이 입금되었습니다! (평판 +20)`;
        }
      }
    ],
    good: [
      {
        tier: "좋은 뉴스",
        title: "📜 국제 반도체 학회(IEDM) 최우수 논문상 만장일치 선정",
        desc: "차세대 트랜지스터 연구 논문이 석학들의 기립 박수를 받았습니다.",
        apply: (game) => {
          game.reputation += 12; game.happiness += 10;
          return "연구위원 승급 유력 후보로 부상했습니다. (평판 +12)";
        }
      },
      {
        tier: "좋은 뉴스",
        title: "🛡️ 초순수 클린룸 신규 R&D 라인 준공 및 개인 연구실 배정",
        desc: "최첨단 전자현미경이 구비된 단독 연구 부스가 배정되었습니다.",
        apply: (game) => {
          game.happiness += 8; game.stress = Math.max(0, game.stress - 6);
          return "최고의 연구 환경이 갖춰졌습니다. (스트레스 -6)";
        }
      },
      {
        tier: "좋은 뉴스",
        title: "💡 EUV 노광 공정 수율 개선 특허 등록 성과",
        desc: "빛의 파장 간섭 현상을 해결한 마스크 패턴 보정 기술을 개발했습니다.",
        apply: (game, won) => {
          const bonus = 10000000; game.cash += bonus; game.reputation += 7;
          return `직무발명 보상금 ${won(bonus)} 수령!`;
        }
      },
      {
        tier: "좋은 뉴스",
        title: "☕ 사내 연구동 테라스 카페테리아 리뉴얼",
        desc: "엔지니어들을 위한 최신 원두커피 머신과 리클라이너 휴게실이 생겼습니다.",
        apply: (game) => { game.happiness += 5; game.stress = Math.max(0, game.stress - 4); return "휴식이 쾌적해졌습니다."; }
      },
      {
        tier: "좋은 뉴스",
        title: "🏅 반도체 패키징 기술 세미나 키노트 스피커 초청",
        desc: "국내외 엔지니어들을 대상으로 하이브리드 본딩 기술을 발표했습니다.",
        apply: (game) => { game.reputation += 6; return "업계 인지도가 높아졌습니다. (평판 +6)"; }
      },
      {
        tier: "좋은 뉴스",
        title: "🤝 미국 메모리 반도체 학회 우수 포스터상",
        desc: "스토리지 성능을 극대화한 컨트롤러 아키텍처 포스터가 입상했습니다.",
        apply: (game, won) => {
          const prize = 3000000; game.cash += prize; game.reputation += 5;
          return `상금 ${won(prize)}을 받았습니다.`;
        }
      }
    ],
    normal: [
      {
        tier: "평범한 뉴스",
        title: "🥽 방진복 착용 및 300mm 웨이퍼 샘플 계측",
        desc: "클린룸에 입실해 원자층 증착(ALD) 박막 두께를 측정했습니다.",
        apply: () => "원하는 두께 프로파일을 얻었습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "☕ 사내 연구동 옥상 정원에서 티타임",
        desc: "복잡한 공정 공식을 잠시 내려놓고 동료들과 커피를 마셨습니다.",
        apply: (game) => {
          game.stress = Math.max(0, game.stress - 3);
          return "머리를 식혔습니다. (스트레스 -3)";
        }
      },
      {
        tier: "평범한 뉴스",
        title: "📊 공정 시뮬레이션 머신러닝 모델링 완료",
        desc: "AI 모델로 최적 레시피를 도출해 실험 시간을 단축했습니다.",
        apply: (game) => {
          game.reputation += 2;
          return "실험 효율을 높였습니다. (평판 +2)";
        }
      },
      {
        tier: "평범한 뉴스",
        title: "📝 국내외 반도체 선행 특허 방어 출원",
        desc: "경쟁사의 우회 침해를 차단하는 특허망을 구축했습니다.",
        apply: () => "특허청 우선심사 신청을 마쳤습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "🔬 주사전자현미경(SEM) 렌즈 정밀 클리닝",
        desc: "미세 구조 촬영 장비의 진공 챔버를 분해해 오염물을 닦아냈습니다.",
        apply: () => "해상도가 선명해졌습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "🗂️ 반도체 샘플 웨이퍼 보관함 이력 정리",
        desc: "클린룸 내 FOUP 카세트 라벨링을 바코드 체계로 일괄 정돈했습니다.",
        apply: () => "샘플 유실 위험이 줄었습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "🥼 방진복 방진화 세탁 서비스 위탁 관리",
        desc: "연구원들이 매일 입는 무진복 세탁 상태를 검수했습니다.",
        apply: () => "클린룸 청결도가 유지됩니다."
      },
      {
        tier: "평범한 뉴스",
        title: "📚 사내 도서관 반도체 물리학 신간 비치",
        desc: "연구 지원비로 신청한 해외 원서 전공 서적이 입고되었습니다.",
        apply: (game) => { game.reputation += 1; return "스터디에 활용합니다."; }
      },
      {
        tier: "평범한 뉴스",
        title: "🧊 연구동 지하 구내매점 간식 자판기 점검",
        desc: "밤샘 실험용 당충전 간식이 떨어지지 않도록 관리관에게 건의했습니다.",
        apply: () => "초코바가 가득 채워졌습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "📈 파운드리 양산 팹 수율 트렌드 리뷰 미팅",
        desc: "수율 마스터들과 함께 주간 결함 맵 분포를 검토했습니다.",
        apply: () => "이상 징후를 조기에 포착했습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "🎧 클린룸 내 무선 인터폰 주파수 안정화",
        desc: "방진복 착용 상태에서 통신이 끊기던 사각지대 기지국을 증설했습니다.",
        apply: () => "팀원 간 교신이 원활해졌습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "🚌 연구소 셔틀버스 노선 개편 의견 수렴",
        desc: "판교 및 분당 방면 출퇴근 셔틀버스 만족도 설문조사에 응했습니다.",
        apply: () => "출퇴근 편의가 개선되었습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "🌿 연구실 창가 다육식물 분갈이",
        desc: "건조한 실험실 환경에서 잘 자라는 다육이 화분을 새로 심었습니다.",
        apply: (game) => { game.stress = Math.max(0, game.stress - 1); return "푸른 초록빛을 감상했습니다."; }
      },
      {
        tier: "평범한 뉴스",
        title: "📅 연간 학회 스케줄 캘린더 공유",
        desc: "올해 발표할 국내외 반도체 심포지엄 일정을 조율했습니다.",
        apply: () => "논문 제출 마감일을 확인했습니다."
      }
    ],
    bad: [
      {
        tier: "나쁜 뉴스",
        title: "⚠️ 미세 박막 박리 현상 발생… 원인 불명 불량률 급등",
        desc: "테스트 칩에서 불량이 발생해 주말 내내 전자현미경 사진을 분석했습니다.",
        apply: (game) => {
          game.stress += 14;
          return "원인을 찾지 못해 압박을 받았습니다. (스트레스 +14)";
        }
      },
      {
        tier: "나쁜 뉴스",
        title: "⌛ 경쟁사의 깜짝 양산 발표 소식에 철야 프로젝트 돌입",
        desc: "해외 경쟁사가 먼저 차세대 칩 양산을 발표하자 단축 비상 연구에 들어갔습니다.",
        apply: (game) => {
          game.stress += 16; game.health = Math.max(0, game.health - 5);
          return "수면 부족으로 피로가 쌓였습니다. (스트레스 +16)";
        }
      },
      {
        tier: "나쁜 뉴스",
        title: "🔥 클린룸 가스 공급 배관 압력 저하 경보 발령",
        desc: "새벽에 질소(N2) 가스 라인 압력 센서가 오작동해 비상 소집되었습니다.",
        apply: (game) => { game.stress += 10; return "가슴이 철렁하며 달려왔습니다."; }
      },
      {
        tier: "나쁜 뉴스",
        title: "📋 웨이퍼 식각 장비(Etcher) RF 제너레이터 고장",
        desc: "수십억 원짜리 핵심 장비 부품이 타버려 수리 기간 동안 실험이 올스톱되었습니다.",
        apply: (game) => { game.stress += 12; return "일정이 일주일 밀렸습니다."; }
      },
      {
        tier: "나쁜 뉴스",
        title: "🗣️ 해외 라이선스 특허 침해 경고장 접수 소동",
        desc: "미국 특허 소송 전문 기업(NPE)으로부터 회로 설계 특허 침해 경고장을 받았습니다.",
        apply: (game) => { game.stress += 15; return "법무실과 긴급 대응 회의를 열었습니다."; }
      },
      {
        tier: "나쁜 뉴스",
        title: "🌡️ 항온항습기 고장으로 클린룸 온도 1도 상승",
        desc: "미세 공정 허용 오차 범위를 벗어나 웨이퍼 열팽창 불량 검수를 벌였습니다.",
        apply: (game) => { game.stress += 9; return "전수 조사를 하느라 녹초가 되었습니다."; }
      }
    ],
    worst: [
      {
        tier: "최악의 뉴스",
        title: "🚨 핵심 HBM 패키징 공정 기술 해외 유출 누명 감사",
        desc: "부서 내 기밀 유출 정황으로 정보보안팀의 강도 높은 포렌식 조사를 받았습니다.",
        apply: (game) => {
          game.reputation = Math.max(0, game.reputation - 15); game.stress += 28;
          return "의심의 눈초리로 엄청난 스트레스를 겪었습니다. (평판 -15, 스트레스 +28)";
        }
      },
      {
        tier: "최악의 뉴스",
        title: "🔥 양산 라인 투입 전 테스트 칩 전소 대형 화재 사고",
        desc: "파일럿 팹에서 시험 가동 중이던 테스트 챔버가 과열 폭발하여 연구동 일부가 불탔습니다.",
        apply: (game) => {
          game.health = Math.max(0, game.health - 15); game.stress += 35; game.reputation = Math.max(0, game.reputation - 20);
          return "가벼운 화상 치료와 함께 연구 책임을 추궁당했습니다. (건강 -15, 평판 -20, 스트레스 +35)";
        }
      }
    ]
  },

  // --------------------------------------------------------------------------
  // 12. 현대자동차 생산직 (large_factory)
  // --------------------------------------------------------------------------
  large_factory: {
    veryGood: [
      {
        tier: "매우 좋은 뉴스",
        title: "🚗 신형 SUV 글로벌 주문 폭주… 연말 풀 잔업·성과급 대박!",
        desc: "신차의 흥행으로 공장 풀가동과 함께 통 큰 성과급 지급이 확정되었습니다.",
        apply: (game, won) => {
          const bonus = 25000000;
          game.cash += bonus; game.happiness += 18; game.reputation += 10;
          return `성과급 및 격려금 ${won(bonus)}이 현금 입금되었습니다! (행복 +18)`;
        }
      },
      {
        tier: "매우 좋은 뉴스",
        title: "🌟 올해의 모범 생산직 근로자 대통령 표창 및 해외 연수",
        desc: "울산 공장 최고의 품질 무결점 기록을 세워 정부 포상을 받았습니다.",
        apply: (game, won) => {
          const bonus = 10000000; game.cash += bonus; game.reputation += 16;
          return `포상금 ${won(bonus)} 및 유럽 자동차 공장 견학 기회! (평판 +16)`;
        }
      }
    ],
    good: [
      {
        tier: "좋은 뉴스",
        title: "🏆 품질 분임조 전국 경진대회 대통령상 금상 수상",
        desc: "라인 결함 개선 아이디어가 수십억 원의 원가 절감 효과를 인정받았습니다.",
        apply: (game, won) => {
          const bonus = 4000000;
          game.cash += bonus; game.reputation += 8;
          return `포상금 ${won(bonus)}과 조장 승급 가점을 받았습니다. (평판 +8)`;
        }
      },
      {
        tier: "좋은 뉴스",
        title: "🏖️ 하계 휴가비 지급 및 사내 리조트 만끽",
        desc: "휴가비를 챙겨 가족들과 사내 전용 휴양소에서 즐겁게 보냈습니다.",
        apply: (game, won) => {
          const pay = 2000000;
          game.cash += pay; game.happiness += 12; game.stress = Math.max(0, game.stress - 12);
          return `휴가비 ${won(pay)}을 받고 푹 쉬다 왔습니다. (스트레스 -12)`;
        }
      },
      {
        tier: "좋은 뉴스",
        title: "💡 프레스 공정 안전 가이드 개선 제안 포상",
        desc: "손끼임 사고를 원천 방지하는 2중 광센서 차단기 설치를 건의하여 채택되었습니다.",
        apply: (game, won) => {
          const bonus = 3000000; game.cash += bonus; game.reputation += 5;
          return `안전 포상금 ${won(bonus)}을 수령했습니다.`;
        }
      },
      {
        tier: "좋은 뉴스",
        title: "🍖 공장 식당 삼겹살 데이 및 갈비탕 특식",
        desc: "노조와 사측이 합의해 생산직 식단에 프리미엄 특식이 제공되었습니다.",
        apply: (game) => { game.happiness += 6; return "든든하게 체력을 보충했습니다."; }
      },
      {
        tier: "좋은 뉴스",
        title: "🏅 울산공장 누적 무사고 1,000일 달성 기념 상품권",
        desc: "전 임직원이 안전 수칙을 철저히 지켜 대형 재해 제로를 달성했습니다.",
        apply: (game, won) => {
          const gift = 500000; game.cash += gift; game.happiness += 5;
          return `온누리 상품권 ${won(gift)}을 지급받았습니다.`;
        }
      },
      {
        tier: "좋은 뉴스",
        title: "🤝 노사 화합 체육대회 축구 우승 상금",
        desc: "의장부 대표 선수로 출전해 사내 체육대회 우승 트로피를 들어 올렸습니다.",
        apply: (game, won) => {
          const prize = 1000000; game.cash += prize; game.happiness += 8;
          return `우승 상금 ${won(prize)}을 회식비로 보탰습니다.`;
        }
      }
    ],
    normal: [
      {
        tier: "평범한 뉴스",
        title: "⚙️ 조립 라인 볼트 체결 토크 규격 준수",
        desc: "샤시 부품을 정확한 조임 토크로 안전하게 조립했습니다.",
        apply: () => "라인 정지 없이 목표 생산량을 채웠습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "☕ 라인 교대 시간 사내 자판기 율무차 타임",
        desc: "동료들과 함께 담소를 나누며 잠깐의 꿀맛 휴식을 즐겼습니다.",
        apply: (game) => {
          game.stress = Math.max(0, game.stress - 3);
          return "기분 좋게 다리를 쉬었습니다. (스트레스 -3)";
        }
      },
      {
        tier: "평범한 뉴스",
        title: "🛡️ 사내 안전보건 10대 수칙 무사고 달성",
        desc: "보호구 착용과 정리정돈을 솔선수범하여 안전 우수조로 선정되었습니다.",
        apply: (game) => {
          game.reputation += 2;
          return "무재해 일수를 이어갔습니다. (평판 +2)";
        }
      },
      {
        tier: "평범한 뉴스",
        title: "📦 신차 파일럿 시험 생산 테스트 참여",
        desc: "신규 차종의 부품 간극과 조립성을 사전 검증했습니다.",
        apply: () => "작업성 개선 의견을 설계팀에 전달했습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "🔧 전동 임팩트 렌치 배터리 교체",
        desc: "작업대 공구 충전 상태를 점검하고 예비 배터리를 장착했습니다.",
        apply: () => "체결 작업이 원활합니다."
      },
      {
        tier: "평범한 뉴스",
        title: "🧹 공장 작업복 세탁 서비스 수거함 정리",
        desc: "기름때가 묻은 정비복을 세탁 업체에 일괄 인계했습니다.",
        apply: () => "깨끗한 옷으로 갈아입었습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "🧊 여름철 작업장 대형 냉풍기 정비",
        desc: "더위가 기승을 부리는 도장부 라인에 얼음 냉풍기를 추가 배치했습니다.",
        apply: (game) => { game.stress = Math.max(0, game.stress - 2); return "더위를 식혔습니다."; }
      },
      {
        tier: "평범한 뉴스",
        title: "📦 수출용 컨테이너 차량 선적 검수",
        desc: "완성된 제네시스 차량들이 카캐리어에 스크래치 없이 실렸는지 확인했습니다.",
        apply: () => "선적 완료 지시서를 마쳤습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "📋 안전 보호구(보안경 및 안전화) 지급",
        desc: "노후된 안전화 밑창을 신형 미끄럼 방지 제품으로 교체했습니다.",
        apply: () => "발걸음이 안전해졌습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "☕ 야간 조업 전 영양제 원샷",
        desc: "특근 야간조 투입 전 매점에서 비타민 음료를 마셨습니다.",
        apply: (game) => { game.health += 1; return "활력을 충전했습니다."; }
      },
      {
        tier: "평범한 뉴스",
        title: "🚨 화재 대피 비상 유도등 소등 점검",
        desc: "공장 동별 야간 비상 탈출로에 불이 잘 들어오는지 확인했습니다.",
        apply: () => "안전 시설이 정상입니다."
      },
      {
        tier: "평범한 뉴스",
        title: "🚜 부품 이송용 무인 운반차(AGV) 경로 점검",
        desc: "자율주행 짐차 센서 주변에 장애물이 없도록 바닥을 치웠습니다.",
        apply: () => "물류 이동이 매끄럽습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "📝 생산 일지 수기 결재 서명",
        desc: "주야간 교대조 간 불량률 및 특이사항 인수인계를 마쳤습니다.",
        apply: () => "서류 철을 마감했습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "🌿 공장 앞 흡연실 그늘막 벤치 정돈",
        desc: "휴식 시간에 동료들과 차 한잔 마시며 담소를 나눴습니다.",
        apply: (game) => { game.stress = Math.max(0, game.stress - 1); return "바람을 쐬었습니다."; }
      }
    ],
    bad: [
      {
        tier: "나쁜 뉴스",
        title: "⚠️ 부품 협력사 이슈로 의장 라인 일시 정지… 특근 취소",
        desc: "부품 수급 차질로 조립 라인이 멈추며 기대했던 주말 특근이 취소되었습니다.",
        apply: (game) => {
          game.stress += 10;
          return "특근 수당이 날아가 아쉬움을 삼켰습니다. (스트레스 +10)";
        }
      },
      {
        tier: "나쁜 뉴스",
        title: "🦾 로봇 자동화 공정 재배치에 따른 손목 통증",
        desc: "작업 자세가 바뀌면서 손목 건초염 증세가 도졌습니다.",
        apply: (game) => {
          game.health = Math.max(0, game.health - 6); game.stress += 12;
          return "정형외과 물리치료를 받았습니다. (건강 -6, 스트레스 +12)";
        }
      },
      {
        tier: "나쁜 뉴스",
        title: "🔥 여름철 찜통더위 속 도장 공장 환기팬 고장",
        desc: "습하고 더운 도장 부스 내 온도 환기가 안 되어 숨이 턱턱 막혔습니다.",
        apply: (game) => { game.health = Math.max(0, game.health - 4); game.stress += 11; return "온열 질환 주의보가 발령되었습니다."; }
      },
      {
        tier: "나쁜 뉴스",
        title: "📋 신차 양산 초기 부품 조립 불량으로 라인 대기",
        desc: "철판 프레스 오차로 단차가 맞지 않아 엔지니어들이 대거 투입되었습니다.",
        apply: (game) => { game.stress += 8; return "대기 시간이 길어지며 지쳤습니다."; }
      },
      {
        tier: "나쁜 뉴스",
        title: "🗣️ 야간 조업 중더운 날씨로 인해 동료 간 언쟁",
        desc: "예민해진 상태에서 작업 분담을 두고 가벼운 말다툼이 오갔습니다.",
        apply: (game) => { game.stress += 7; return "서로 사과하고 풀었습니다."; }
      },
      {
        tier: "나쁜 뉴스",
        title: "🌧️ 울산 공장 집중호우로 야외 적재장 물품 침수 우려",
        desc: "빗물이 야적장 파렛트로 스며들어 방수포를 덮는 비상 작업을 했습니다.",
        apply: (game) => { game.stress += 9; game.health = Math.max(0, game.health - 2); return "비상을 맞았습니다."; }
      }
    ],
    worst: [
      {
        tier: "최악의 뉴스",
        title: "🚨 조립 불량 누락으로 수출 선적 500대 리콜 사태 발생",
        desc: "소속 파트의 센서 배선 오조립이 원인이 되어 품질 감사가 착수되었습니다.",
        apply: (game) => {
          game.reputation = Math.max(0, game.reputation - 16); game.stress += 26; game.happiness = Math.max(0, game.happiness - 12);
          return "감봉 조치 위기로 자존심에 큰 상처를 입었습니다. (평판 -16, 스트레스 +26)";
        }
      },
      {
        tier: "최악의 뉴스",
        title: "🔥 컨베이어 벨트 협착 대형 안전사고 발생",
        desc: "구동부 롤러 정비 도중 기계가 오작동하여 팔이 말려 들어가는 끔찍한 사고를 당했습니다.",
        apply: (game) => {
          game.health = Math.max(0, game.health - 30); game.stress += 38; game.happiness = Math.max(0, game.happiness - 25);
          return "응급 수술을 마치고 산재 요양 병원에 입원했습니다. (건강 -30, 스트레스 +38)";
        }
      }
    ]
  },

  // --------------------------------------------------------------------------
  // 13. 전문직(변호사/회계사) (professional)
  // --------------------------------------------------------------------------
  professional: {
    veryGood: [
      {
        tier: "매우 좋은 뉴스",
        title: "⚖️ 조 단위 초대형 M&A 자문 성공… 파트너 지분 배당 폭발!",
        desc: "치밀한 법률·회계 전략으로 완벽한 승리를 거두어 핵심 파트너로 우뚝 섰습니다.",
        apply: (game, won) => {
          const bonus = 70000000;
          game.cash += bonus; game.reputation += 20; game.happiness += 25;
          return `성공 보수 및 파트너 배당금 ${won(bonus)} 입금! (평판 +20, 행복 +25)`;
        }
      },
      {
        tier: "매우 좋은 뉴스",
        title: "🌟 대법원 최종 승소 판결 이끌어내며 대한민국 '올해의 변호사' 선정",
        desc: "전국을 뒤흔든 대기업 부당해고 소송에서 역사적인 승소 판례를 남겼습니다.",
        apply: (game, won) => {
          const bonus = 90000000; game.cash += bonus; game.reputation += 25;
          return `성공 보수 ${won(bonus)} 획득 및 공영 방송 출연! (평판 +25)`;
        }
      }
    ],
    good: [
      {
        tier: "좋은 뉴스",
        title: "📑 수백억 원대 기업 조세불복 소송 완전 승소 이끌어내",
        desc: "국세청의 부당한 과세 처분을 논리정연한 판례로 뒤집어 환급을 안겨주었습니다.",
        apply: (game, won) => {
          const bonus = 25000000;
          game.cash += bonus; game.reputation += 10;
          return `성공 보수 ${won(bonus)}을 수령했습니다. (평판 +10)`;
        }
      },
      {
        tier: "좋은 뉴스",
        title: "🎤 명문대 로스쿨/경영대 겸임교수 위촉",
        desc: "풍부한 실무 경험과 학술적 깊이를 인정받아 겸임교수로 강단에 서게 되었습니다.",
        apply: (game) => {
          game.reputation += 8; game.happiness += 8;
          return "사회적 명성이 격상되었습니다. (평판 +8, 행복 +8)";
        }
      },
      {
        tier: "좋은 뉴스",
        title: "💡 대형 로펌/회계법인 수석 파트너 승진 확정",
        desc: "법인 내 매출 기여도와 딜 클로징 실적 최상위 평가를 받았습니다.",
        apply: (game, won) => {
          const bonus = 40000000; game.cash += bonus; game.annualIncome += 50000000;
          return `지분 배당 ${won(bonus)} 및 연봉 5천만원 수직 상승!`;
        }
      },
      {
        tier: "좋은 뉴스",
        title: "☕ 서울지방변호사회/공인회계사회 우수 회원 표창",
        desc: "투명한 윤리 의식과 모범적인 자문 활동으로 협회장 표창장을 받았습니다.",
        apply: (game) => { game.reputation += 6; return "업계 신뢰도가 더욱 공고해졌습니다."; }
      },
      {
        tier: "좋은 뉴스",
        title: "✈️ 뉴욕 글로벌 로펌 연계 크로스보더 세미나 패널 초청",
        desc: "미국 맨해튼에서 열린 국제 조세 포럼에서 한국 측 연사로 참석했습니다.",
        apply: (game, won) => {
          const travelPay = 5000000; game.cash += travelPay; game.happiness += 10;
          return "글로벌 네트워크를 확장하고 돌아왔습니다.";
        }
      },
      {
        tier: "좋은 뉴스",
        title: "📚 베스트셀러 '실무 비즈니스 법률/세무 가이드' 출간",
        desc: "그간의 소송 및 자문 노하우를 엮어 쓴 단행본이 교보문고 경제 분야 1위에 올랐습니다.",
        apply: (game, won) => {
          const royalty = 8000000; game.cash += royalty; game.reputation += 9;
          return `인쇄소 인세 ${won(royalty)}이 입금되었습니다. (평판 +9)`;
        }
      }
    ],
    normal: [
      {
        tier: "평범한 뉴스",
        title: "📑 표준 계약서 및 재무 실사 보고서 검토 완료",
        desc: "고객사의 크로스보더 계약서 내 독소 조항을 꼼꼼하게 수정했습니다.",
        apply: () => "리스크 없는 완벽한 클린 계약서를 납품했습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "☕ 고급 호텔 라운지에서 VIP 고객 미팅",
        desc: "자산가 고객과 여유로운 티타임을 가지며 상속 플랜을 상담했습니다.",
        apply: (game) => {
          game.reputation += 2;
          return "고객의 두터운 신뢰를 확보했습니다. (평판 +2)";
        }
      },
      {
        tier: "평범한 뉴스",
        title: "📚 최신 대법원 판례 및 세법 개정안 사내 스터디",
        desc: "매년 바뀌는 복잡한 법 개정 조문을 완벽하게 분석했습니다.",
        apply: () => "전문 지식을 최신 트렌드로 업데이트했습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "🤝 공익 무료 변론/세무 상담 사회공헌 활동",
        desc: "취약계층을 위한 무료 법률 상담 봉사를 다녀왔습니다.",
        apply: (game) => {
          game.happiness += 4;
          return "가슴 벅찬 보람을 느꼈습니다. (행복 +4)";
        }
      },
      {
        tier: "평범한 뉴스",
        title: "🏛️ 서울중앙지방법원 민사 조정실 출석",
        desc: "소송 전 합의를 이끌어내기 위해 원피고 양측 대리인과 조정 기일을 가졌습니다.",
        apply: () => "원만한 조율을 시도했습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "🗂️ 법인 로펌 세무 기장 검수 회의",
        desc: "소속 어소시에이트 변호사/회계사들이 작성한 자문서 초안을 교정했습니다.",
        apply: () => "품질 검수를 마쳤습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "🚗 서초동 법조단지 법무사 사무실 방문",
        desc: "등기 신청 서류 접수를 위해 등기소 전자 시스템을 점검했습니다.",
        apply: () => "절차가 원활히 진행되었습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "🧊 법무법인 사옥 지하 갤러리 미술품 감상",
        desc: "로비에 전시된 신진 작가 초대전 그림을 보며 머리를 식혔습니다.",
        apply: (game) => { game.stress = Math.max(0, game.stress - 2); return "안식을 찾았습니다."; }
      },
      {
        tier: "평범한 뉴스",
        title: "📝 대한변협/공인회계사회 의무 연수 이수",
        desc: "윤리 교육 및 자금세탁 방지(AML) 관련 필수 학점을 채웠습니다.",
        apply: () => "연수 수료증을 등록했습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "📞 기업회생절차(법정관리) 채권자 설명회 참석",
        desc: "부도 위기 기업의 자산 매각 타당성을 채권단에 브리핑했습니다.",
        apply: () => "설명회를 차분히 마쳤습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "💻 서면 제출 마감 전 전자소송 시스템 업로드",
        desc: "법원 전산망을 통해 준비서면 최종본을 안전하게 접수했습니다.",
        apply: () => "접수증을 발급받았습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "☕ 선배 파트너 변호사와 고급 일식당 오찬",
        desc: "로펌 운영 방향과 대형 수임 건에 대한 조언을 구했습니다.",
        apply: (game) => { game.reputation += 1; return "유익한 격려를 들었습니다."; }
      },
      {
        tier: "평범한 뉴스",
        title: "🖨️ 개인 사무실 의자 인체공학 모델로 교체",
        desc: "허리 통증 완화를 위해 고가의 프리미엄 오피스 체어를 들여놓았습니다.",
        apply: (game) => { game.stress = Math.max(0, game.stress - 3); return "착좌감이 매우 훌륭합니다."; }
      },
      {
        tier: "평범한 뉴스",
        title: "🌿 사무실 책상 위 미니 난초 꽃망울 개화",
        desc: "작년에 선물 받은 동양란에 예쁜 꽃이 피어올랐습니다.",
        apply: (game) => { game.happiness += 2; return "기분 좋은 하루 시작입니다."; }
      }
    ],
    bad: [
      {
        tier: "나쁜 뉴스",
        title: "📑 3주 연속 새벽 3시 퇴근… 감사 보고서 마감 지옥",
        desc: "제출 기일과 감사 시즌이 겹쳐 사무실 소파에서 쪽잠을 잤습니다.",
        apply: (game) => {
          game.health = Math.max(0, game.health - 6); game.stress += 16;
          return "과로로 지쳤습니다. (건강 -6, 스트레스 +16)";
        }
      },
      {
        tier: "나쁜 뉴스",
        title: "⚠️ 고객사 경영진의 무리한 분식회계 합법화 압박",
        desc: "자문 의견서에 부당한 내용을 기재해 달라는 압력으로 윤리적 갈등을 겪었습니다.",
        apply: (game) => {
          game.stress += 15;
          return "전문직의 양심과 고객 유지 사이에서 스트레스를 받았습니다. (스트레스 +15)";
        }
      },
      {
        tier: "나쁜 뉴스",
        title: "🗣️ 패소한 의뢰인의 억지 환불 항의 및 사무실 소동",
        desc: "판결 결과에 불만을 품은 피고인이 사무실 로비에 누워 난동을 부렸습니다.",
        apply: (game) => { game.stress += 14; return "경찰에 임의동행 조치했습니다."; }
      },
      {
        tier: "나쁜 뉴스",
        title: "📋 법원 서류 제출 기한 1시간 앞두고 시스템 오류",
        desc: "전자소송 포털 서버 점검 시간과 겹쳐 담당 주무관에게 급히 전화 연장을 요청했습니다.",
        apply: (game) => { game.stress += 12; return "진땀을 흘리며 접수를 마쳤습니다."; }
      },
      {
        tier: "나쁜 뉴스",
        title: "🚗 지방 재판 출장길 고속도로 극심한 정체로 지각 위기",
        desc: "부산고법 재판정에 시간에 맞춰 가기 위해 KTX 안에서 서류를 최종 검토했습니다.",
        apply: (game) => { game.stress += 8; return "피마르는 출장길이었습니다."; }
      },
      {
        tier: "나쁜 뉴스",
        title: "💻 파트너 간 지분 배분 마찰로 로펌 분할 소동",
        desc: "수익 배분 정산 방식을 두고 공동 대표들 간에 갈등이 생겨 분위기가 뒤숭숭했습니다.",
        apply: (game) => { game.stress += 10; return "로펌 이직을 고민했습니다."; }
      }
    ],
    worst: [
      {
        tier: "최악의 뉴스",
        title: "🚨 부실 자문 논란으로 금융감독원 징계 및 손해배상 소송",
        desc: "자문했던 기업의 횡령 사태가 터지며 부실 책임으로 민사 소송에 피소되었습니다.",
        apply: (game, won) => {
          const loss = 35000000;
          game.cash = Math.max(0, game.cash - loss); game.reputation = Math.max(0, game.reputation - 20); game.stress += 30;
          return `소송 대응비 및 합의금으로 ${won(loss)} 지출! (평판 -20, 스트레스 +30)`;
        }
      },
      {
        tier: "최악의 뉴스",
        title: "🔥 의뢰인 비밀 유지 의무 위반 오인으로 인한 변호사협회 징계",
        desc: "상대방 변호인과의 통화 녹취가 유출되면서 변호사법 위반 제소라는 치명타를 입었습니다.",
        apply: (game) => {
          game.stress += 35; game.reputation = Math.max(0, game.reputation - 30); game.happiness = Math.max(0, game.happiness - 20);
          return "정직 6개월의 징계 처분을 받고 실추된 명예에 눈물을 삼켰습니다. (평판 -30, 스트레스 +35)";
        }
      }
    ]
  },

  // --------------------------------------------------------------------------
  // 14. 신발공장근로자 (factory_worker)
  // --------------------------------------------------------------------------
  factory_worker: {
    veryGood: [
      {
        tier: "매우 좋은 뉴스",
        title: "👟 글로벌 한정판 스니커즈 독점 생산… 특별 성과금 지급!",
        desc: "정밀 재단·봉제 퀄리티가 품질 심사 1위를 차지하여 독점 생산권을 따냈습니다.",
        apply: (game, won) => {
          const bonus = 8000000;
          game.cash += bonus; game.happiness += 18; game.reputation += 10;
          return `한정판 특별 격려금 ${won(bonus)}을 수령했습니다! (행복 +18)`;
        }
      },
      {
        tier: "매우 좋은 뉴스",
        title: "🌟 중소기업 중앙회 모범 근로자 포상 및 해외 관광권 당첨",
        desc: "20년 근속하며 현장을 묵묵히 지켜온 공로로 장관 표창과 동남아 여행권을 받았습니다.",
        apply: (game, won) => {
          const bonus = 5000000; game.cash += bonus; game.happiness += 20;
          return `포상금 ${won(bonus)}과 휴가 1주일 획득! (행복 +20)`;
        }
      }
    ],
    good: [
      {
        tier: "좋은 뉴스",
        title: "🏆 신발 갑피 가공 숙련 기술로 '올해의 사내 명장' 선정",
        desc: "가죽 손실률을 0%에 가깝게 줄인 숙련된 손기술로 사장님 표창을 받았습니다.",
        apply: (game, won) => {
          const bonus = 2000000;
          game.cash += bonus; game.reputation += 8;
          return `명장 포상금 ${won(bonus)}을 받았습니다. (평판 +8)`;
        }
      },
      {
        tier: "좋은 뉴스",
        title: "🍗 공장 마당에서 열린 삼겹살 통돼지 바베큐 회식",
        desc: "납기 목표를 달성하고 동료들과 함께 시원한 막걸리와 고기를 배부르게 먹었습니다.",
        apply: (game) => {
          game.happiness += 8; game.stress = Math.max(0, game.stress - 8);
          return "동료들과 회포를 풀었습니다. (스트레스 -8)";
        }
      },
      {
        tier: "좋은 뉴스",
        title: "💡 작업 능률 향상 자동 재단 지그 개발 포상",
        desc: "가죽 재단 불량을 획기적으로 줄이는 보조 도구를 발명해 현장 적용되었습니다.",
        apply: (game, won) => {
          const bonus = 2500000; game.cash += bonus; game.reputation += 6;
          return `제안 포상금 ${won(bonus)}을 수령했습니다.`;
        }
      },
      {
        tier: "좋은 뉴스",
        title: "☕ 신발공장 구내식당 수요일 특식 삼계탕 제공",
        desc: "초복을 맞아 사측에서 전 직원에게 뚝배기 삼계탕을 쏘았습니다.",
        apply: (game) => { game.health += 2; game.happiness += 5; return "원기 회복을 했습니다."; }
      },
      {
        tier: "좋은 뉴스",
        title: "🏅 노사 단체협상 타결 격려금 일시불 입금",
        desc: "올해 임단협이 파업 없이 원만하게 타결되어 타결 일시금이 나왔습니다.",
        apply: (game, won) => {
          const pay = 1500000; game.cash += pay;
          return `임단협 격려금 ${won(pay)}이 입금되었습니다.`;
        }
      },
      {
        tier: "좋은 뉴스",
        title: "👏 사내 볼링 동호회 사장배 대회 우승",
        desc: "퇴근 후 공장 볼링 동호회 리그전에서 개인전 1위를 차지했습니다.",
        apply: (game, won) => {
          const prize = 500000; game.cash += prize; game.happiness += 7;
          return `우승 상금 ${won(prize)}을 획득했습니다.`;
        }
      }
    ],
    normal: [
      {
        tier: "평범한 뉴스",
        title: "✂️ 고무 밑창 압착 및 가죽 재단 루틴",
        desc: "기계 프레스 소리에 맞춰 일정한 리듬으로 신발 밑창을 찍어냈습니다.",
        apply: () => "사고 없이 하루 할당량을 깔끔하게 채웠습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "☕ 10시 휴식 시간 믹스커피 한 잔",
        desc: "달달한 믹스커피 한 잔으로 굳어있던 어깨 근육을 풀었습니다.",
        apply: (game) => {
          game.stress = Math.max(0, game.stress - 3);
          return "기분 좋은 휴식을 취했습니다. (스트레스 -3)";
        }
      },
      {
        tier: "평범한 뉴스",
        title: "📦 납품 상자 포장 및 물류 탑차 적재",
        desc: "완성된 운동화 상자들을 테이핑하여 배송 트럭에 실었습니다.",
        apply: () => "납품 스케줄을 무사히 맞췄습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "🧹 작업장 바닥 청소 및 환기",
        desc: "퇴근 전 작업대 주변을 깨끗하게 정리하고 환풍기를 점검했습니다.",
        apply: () => "쾌적하게 정리를 마쳤습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "🔧 본드 도포용 에어건 노즐 세척",
        desc: "접착제가 굳지 않도록 솔벤트로 분사구를 깨끗이 씻어냈습니다.",
        apply: () => "장비 분사력이 좋아졌습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "📋 원자재 입고 가죽 원단 검수",
        desc: "이탈리아에서 수입된 소가죽 스킨의 스크래치 여부를 확인했습니다.",
        apply: () => "불량 원단을 골라냈습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "🧯 공장 방재실 소화기 위치 점검",
        desc: "본드 창고 주변 분말 소화기 압력 게이지를 체크했습니다.",
        apply: () => "안전 이상 무입니다."
      },
      {
        tier: "평범한 뉴스",
        title: "🧊 작업복 탈의실 선풍기 먼지 청소",
        desc: "후덥지근한 탈의실 벽걸이 선풍기 날개 묵은 먼지를 닦았습니다.",
        apply: (game) => { game.stress = Math.max(0, game.stress - 1); return "시원해졌습니다."; }
      },
      {
        tier: "평범한 뉴스",
        title: "🚚 트럭 하차 작업 인원 로테이션",
        desc: "원단 포대 하차 조와 완제품 상차 조를 번갈아 투입했습니다.",
        apply: () => "체력을 안배하며 일했습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "📝 작업반장 주간 안전 교육 청취",
        desc: "프레스 기계 안전 핀 체결 요령을 다시 한번 상기했습니다.",
        apply: () => "안전 수칙을 되새겼습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "☕ 사내 자판기 캔음료 뽑아 마시기",
        desc: "오후 3시 졸음이 쏟아질 때 차가운 보리차를 마셨습니다.",
        apply: (game) => { game.stress = Math.max(0, game.stress - 1); return "잠을 깼습니다."; }
      },
      {
        tier: "평범한 뉴스",
        title: "👟 신제품 밑창 샘플 접착 테스트",
        desc: "새로 개발된 아웃솔 접착력이 기준치를 넘는지 손으로 당겨보았습니다.",
        apply: () => "접착 강도가 튼튼합니다."
      },
      {
        tier: "평범한 뉴스",
        title: "🚌 퇴근길 공장 앞 버스정류장 기다리기",
        desc: "퇴근 버스 시간에 맞춰 동료들과 정류장 의자에 앉았습니다.",
        apply: () => "하루 일과를 마감했습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "🌿 공장 담벼락 장미 덩굴 구경",
        desc: "점심 식사 후 담벼락을 따라 예쁘게 핀 장미꽃을 보았습니다.",
        apply: (game) => { game.happiness += 1; return "여유를 가졌습니다."; }
      }
    ],
    bad: [
      {
        tier: "나쁜 뉴스",
        title: "⚠️ 해외 저가 신발 수입 급증으로 일감 감소… 잔업 취소",
        desc: "거래처 주문이 줄어들며 기본급만 받게 되어 가계 소득이 빠듯해졌습니다.",
        apply: (game) => {
          game.stress += 12;
          return "줄어든 월급봉투에 한숨이 깊어집니다. (스트레스 +12)";
        }
      },
      {
        tier: "나쁜 뉴스",
        title: "🩹 본드 냄새와 프레스 열기로 인한 만성 두통",
        desc: "접착제 유기용제 냄새로 하루 종일 속이 메스꺼웠습니다.",
        apply: (game) => {
          game.health = Math.max(0, game.health - 6); game.stress += 10;
          return "진통제를 사 먹으며 버텼습니다. (건강 -6, 스트레스 +10)";
        }
      },
      {
        tier: "나쁜 뉴스",
        title: "📦 납품 기일 맞추느라 주말 특근 강제 투입",
        desc: "바이어 긴급 발주로 토요일 휴일을 반납하고 라인에 불을 켰습니다.",
        apply: (game) => { game.stress += 10; return "주말 휴식이 날아갔습니다."; }
      },
      {
        tier: "나쁜 뉴스",
        title: "🪡 가죽 재단용 칼에 손가락 살짝 베이는 경상",
        desc: "원단을 재단하다 방심해 재단용 커터칼에 손가락을 스쳤습니다.",
        apply: (game) => { game.health = Math.max(0, game.health - 3); game.stress += 5; return "대일밴드를 붙이고 일했습니다."; }
      },
      {
        tier: "나쁜 뉴스",
        title: "🚚 원자재 수급 차질로 하루 동안 라인 대기 휴업",
        desc: "해상 물류 지연으로 천연 피혁 원단이 도착하지 않아 하루를 공쳤습니다.",
        apply: (game) => { game.stress += 7; return "조업 일수가 줄었습니다."; }
      },
      {
        tier: "나쁜 뉴스",
        title: "🌡️ 공장 창고 지붕 누수로 일부 운동화 박스 젖음",
        desc: "폭우로 물류 창고 구석에 쌓아둔 완제품 박스가 젖어 보수 작업을 했습니다.",
        apply: (game) => { game.stress += 8; return "재포장 작업을 하느라 땀을 흘렸습니다."; }
      }
    ],
    worst: [
      {
        tier: "최악의 뉴스",
        title: "🚨 밑창 압착기 오작동 손가락 골절 산재 사고 발생",
        desc: "프레스 센서 불량으로 손을 심하게 다쳐 수개월간 수술과 치료를 받게 되었습니다.",
        apply: (game) => {
          game.health = Math.max(0, game.health - 15); game.stress += 26; game.happiness = Math.max(0, game.happiness - 15);
          return "손가락 골절로 당분간 일할 수 없게 되었습니다. (건강 -15, 스트레스 +26)";
        }
      },
      {
        tier: "최악의 뉴스",
        title: "🔥 공장 화학 본드 창고 화재 발생으로 전소",
        desc: "유기용제 인화물질 보관 창고에서 대형 화재가 일어나 공장 전체가 전소되는 대형 참사가 발생했습니다.",
        apply: (game) => {
          game.health = Math.max(0, game.health - 20); game.stress += 35; game.annualIncome = 25000000;
          return "공장 폐쇄 및 구조조정 위기로 일자리를 잃을 위기에 처했습니다. (건강 -20, 스트레스 +35)";
        }
      }
    ]
  },

  // --------------------------------------------------------------------------
  // 15. 연예인 (celebrity)
  // --------------------------------------------------------------------------
  celebrity: {
    veryGood: [
      {
        tier: "매우 좋은 뉴스",
        title: "🌟 주연 천만 관객 영화 등극 & 국제 영화제 주연상 수상!",
        desc: "인생 연기를 펼친 대작이 박스오피스를 휩쓸며 대한민국 대표 탑스타로 공인받았습니다.",
        apply: (game, won) => {
          const bonus = 200000000;
          game.cash += bonus; game.annualIncome += 100000000; game.reputation += 25; game.happiness += 30;
          return `CF 및 영화 러닝 개런티 ${won(bonus)} 입금! 연봉 1억 추가 상승! (행복 +30)`;
        }
      },
      {
        tier: "매우 좋은 뉴스",
        title: "🏆 글로벌 OTT 오리지널 시리즈 전 세계 넷플릭스 1위 신드롬",
        desc: "출연한 사이코스릴러 드라마가 전 세계 90개국에서 1위를 차지하며 글로벌 스타로 등극했습니다.",
        apply: (game, won) => {
          const bonus = 300000000; game.cash += bonus; game.reputation += 30; game.happiness += 35;
          return `글로벌 보너스 ${won(bonus)} 수령 및 해외 에이전시 계약! (평판 +30, 행복 +35)`;
        }
      }
    ],
    good: [
      {
        tier: "좋은 뉴스",
        title: "📺 황금시간대 예능 고정 MC 발탁 및 브랜드 평판 1위",
        desc: "재치 있는 입담과 친근한 매력으로 호감도 조사에서 단독 1위를 차지했습니다.",
        apply: (game, won) => {
          const bonus = 30000000;
          game.cash += bonus; game.reputation += 12; game.happiness += 15;
          return `신규 광고 계약금 ${won(bonus)}을 수령했습니다. (평판 +12)`;
        }
      },
      {
        tier: "좋은 뉴스",
        title: "☕ 팬클럽의 감동적인 드라마 촬영장 커피차 서포트",
        desc: "촬영장 동료 배우와 스태프들에게 수제 도시락과 커피차가 전달되었습니다.",
        apply: (game) => {
          game.happiness += 10; game.stress = Math.max(0, game.stress - 10);
          return "팬들의 사랑에 어깨가 으쓱해졌습니다. (스트레스 -10)";
        }
      },
      {
        tier: "좋은 뉴스",
        title: "💡 명품 브랜드 글로벌 앰버서더(홍보대사) 발탁",
        desc: "프랑스 오트쿠튀르 명품 브랜드의 공식 글로벌 얼굴로 계약을 체결했습니다.",
        apply: (game, won) => {
          const fee = 150000000; game.cash += fee; game.reputation += 15;
          return `모델료 ${won(fee)}이 일시 입금되었습니다! (평판 +15)`;
        }
      },
      {
        tier: "좋은 뉴스",
        title: "🎤 발매한 디지털 싱글 음원 차트 '퍼펙트 올킬' 달성",
        desc: "직접 작사작곡한 감성 발라드가 주요 음원 사이트 실시간 차트 1위를 휩쓸었습니다.",
        apply: (game, won) => {
          const royalty = 40000000; game.cash += royalty; game.happiness += 12;
          return `음원 정산 수익 ${won(royalty)}이 입금되었습니다.`;
        }
      },
      {
        tier: "좋은 뉴스",
        title: "🏅 백상예술대상 최우수 연기상 트로피 거머쥐어",
        desc: "대체 불가능한 캐릭터 소화력으로 평단과 대중의 찬사를 받았습니다.",
        apply: (game) => { game.reputation += 14; game.happiness += 15; return "영광스러운 상을 수상했습니다."; }
      },
      {
        tier: "좋은 뉴스",
        title: "🤝 유니세프 한국위원회 친선대사 위촉",
        desc: "선한 영향력을 펼치며 아동 복지 기부 캠페인에 앞장섰습니다.",
        apply: (game) => { game.reputation += 10; game.happiness += 8; return "사회적 귀감이 되었습니다. (평판 +10)"; }
      }
    ],
    normal: [
      {
        tier: "평범한 뉴스",
        title: "📸 패션 매거진 단독 화보 촬영 진행",
        desc: "세련된 스타일링으로 계절 트렌드를 담은 감성 화보를 촬영했습니다.",
        apply: (game) => {
          game.reputation += 2;
          return "A컷이 쏟아져 나와 찬사를 받았습니다. (평판 +2)";
        }
      },
      {
        tier: "평범한 뉴스",
        title: "🥗 철저한 식단 관리와 필라테스 운동",
        desc: "다음 작품 배역을 위해 샐러드와 단백질 식단으로 몸을 가꿨습니다.",
        apply: (game) => {
          game.health += 3;
          return "건강한 바디라인을 완성했습니다. (건강 +3)";
        }
      },
      {
        tier: "평범한 뉴스",
        title: "🎬 공익 광고 캠페인 내레이션 녹음",
        desc: "깨끗한 목소리로 청소년 공익 캠페인 녹음을 마쳤습니다.",
        apply: (game) => {
          game.reputation += 3;
          return "선한 영향력을 펼쳤습니다. (평판 +3)";
        }
      },
      {
        tier: "평범한 뉴스",
        title: "✈️ 대본 리딩 워크숍 및 제주도 단합 여행",
        desc: "차기작 감독님, 작가님과 함께 제주도에서 작품 방향을 논의했습니다.",
        apply: () => "즐겁게 캐릭터 해석을 마쳤습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "🎙️ 라디오 프로그램 스페셜 게스트 출연",
        desc: "심야 음악 방송에 나와 근황 토크와 신청곡을 소개했습니다.",
        apply: (game) => { game.reputation += 1; return "팬들과 소통했습니다."; }
      },
      {
        tier: "평범한 뉴스",
        title: "📝 유튜브 웹예능 채널 사전 미팅",
        desc: "다음 주 촬영할 토크 쇼 콘텐츠 코너 구성을 협의했습니다.",
        apply: () => "재미있는 리액션을 구상했습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "💄 메이크업 샵 프로필 사진 촬영",
        desc: "청담동 뷰티 숍에서 광고 오디션용 포토폴리오를 갱신했습니다.",
        apply: () => "근사한 프로필이 완성되었습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "🧊 스튜디오 대기실 과일 바구니 간식",
        desc: "광고 스태프들이 준비해 준 샤인머스캣을 맛있게 먹었습니다.",
        apply: (game) => { game.stress = Math.max(0, game.stress - 2); return "당 충전을 했습니다."; }
      },
      {
        tier: "평범한 뉴스",
        title: "🚗 벤 매니저 차량 정기 세차",
        desc: "스케줄 이동용 스타렉스 차량 내부를 말끔히 청소했습니다.",
        apply: () => "쾌적하게 이동합니다."
      },
      {
        tier: "평범한 뉴스",
        title: "🗂️ 팬레터 우편물 수거 및 답장 검토",
        desc: "소속사 사무실로 도착한 손편지들을 읽어보았습니다.",
        apply: (game) => { game.happiness += 2; return "감동적인 편지에 미소를 지었습니다."; }
      },
      {
        tier: "평범한 뉴스",
        title: "🥷 액션 스쿨 카스턴트 무술 연습",
        desc: "차기작 추격 신을 위해 낙법과 구르기 액션을 리허설했습니다.",
        apply: (game) => { game.health += 1; return "유연성을 길렀습니다."; }
      },
      {
        tier: "평범한 뉴스",
        title: "🎵 보컬 트레이닝 고음 발성 연습",
        desc: "음반 녹음을 앞두고 목 상태를 점검하기 위해 스튜디오에 갔습니다.",
        apply: () => "성대 컨디션이 양호합니다."
      },
      {
        tier: "평범한 뉴스",
        title: "🚌 지방 촬영장 로케이션 버스 이동",
        desc: "강원도 사극 오픈세트장으로 이동하며 대본을 숙지했습니다.",
        apply: () => "이동 중 꿀잠을 잤습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "🌿 자택 테라스 식물 화분 분갈이",
        desc: "스케줄이 없는 날 집에서 반려 나무 흙을 갈아주었습니다.",
        apply: (game) => { game.stress = Math.max(0, game.stress - 2); return "마음의 안정을 찾았습니다."; }
      }
    ],
    bad: [
      {
        tier: "나쁜 뉴스",
        title: "⚠️ 악의적인 왜곡 찌라시 영상 확산",
        desc: "사이버 렉카 유튜버가 허위 열애설과 인성 조작 영상을 퍼뜨렸습니다.",
        apply: (game) => {
          game.stress += 18; game.reputation = Math.max(0, game.reputation - 6);
          return "고소장을 접수하며 속이 타들어갔습니다. (평판 -6, 스트레스 +18)";
        }
      },
      {
        tier: "나쁜 뉴스",
        title: "📉 야심 차게 들어간 드라마 첫 주 시청률 1%대 부진",
        desc: "혹평이 쏟아지며 조기 종영 위기에 처했습니다.",
        apply: (game) => {
          game.stress += 15; game.happiness = Math.max(0, game.happiness - 10);
          return "자신감이 바닥을 쳤습니다. (스트레스 +15)";
        }
      },
      {
        tier: "나쁜 뉴스",
        title: "🗣️ 스태프와의 갑질 오보 해명 기자회견 개최",
        desc: "현장 매니저에게 화를 냈다는 터무니없는 보도로 인터넷이 시끌벅적했습니다.",
        apply: (game) => { game.stress += 14; game.reputation = Math.max(0, game.reputation - 5); return "이미지에 흠집이 났습니다."; }
      },
      {
        tier: "나쁜 뉴스",
        title: "🏃 와이어 액션 촬영 중 추락하여 허리 부상",
        desc: "공중 회전 신 촬영 도중 장치 오작동으로 매트 바닥에 떨어졌습니다.",
        apply: (game) => { game.health = Math.max(0, game.health - 8); game.stress += 12; return "물리치료를 받게 되었습니다."; }
      },
      {
        tier: "나쁜 뉴스",
        title: "🎤 라이브 무대 음향 사고로 음이탈 굴욕",
        desc: "인이어 장비 모니터링 볼륨이 꺼져 콘서트 생방송 중 가사를 절었습니다.",
        apply: (game) => { game.stress += 13; game.reputation = Math.max(0, game.reputation - 3); return "온라인 커뮤니티에 직캠이 퍼졌습니다."; }
      },
      {
        tier: "나쁜 뉴스",
        title: " paparazzi 몰래카메라 무단 주거 침입 피해",
        desc: "파파라치가 사생활 자택 창문 안쪽을 촬영해 사생활 침해로 경찰에 신고했습니다.",
        apply: (game) => { game.stress += 16; return "불안감에 이사 결심을 했습니다."; }
      }
    ],
    worst: [
      {
        tier: "최악의 뉴스",
        title: "🚨 허위 폭로로 광고 위약금 청구 대참사",
        desc: "허위 폭로가 터지며 사실관계 확인도 전에 모든 광고가 중단되고 위약벌 위기에 직면했습니다.",
        apply: (game, won) => {
          const loss = 100000000;
          game.cash = Math.max(0, game.cash - loss); game.reputation = Math.max(0, game.reputation - 25); game.stress += 35;
          return `위약금으로 현금 ${won(loss)}을 날리고 방송이 정지되었습니다. (평판 -25, 스트레스 +35)`;
        }
      },
      {
        tier: "최악의 뉴스",
        title: "🔥 마약 투약 연루 누명으로 인한 연예계 무기한 활동 중단",
        desc: "이름이 초성으로 언급된 지라시가 번지며 출연 중인 모든 방송에서 하차 통보를 받았습니다.",
        apply: (game) => {
          game.stress += 40; game.reputation = Math.max(0, game.reputation - 40); game.happiness = Math.max(0, game.happiness - 30);
          return "경찰 소변 검사 음성 판정에도 불구하고 대중의 비난으로 칩거 생활에 들어갔습니다. (평판 -40, 스트레스 +40)";
        }
      }
    ]
  },

  // --------------------------------------------------------------------------
  // 16. BBQ치킨집 주인 (entrepreneur)
  // --------------------------------------------------------------------------
  entrepreneur: {
    veryGood: [
      {
        tier: "매우 좋은 뉴스",
        title: "🍗 축구 한일전 결승전 야간 주문 대폭발… 전국 매장 매출 1위 달성!",
        desc: "저녁 6시부터 새벽까지 준비한 닭 500마리가 순식간에 동나며 하루 매출 신기록을 세웠습니다.",
        apply: (game, won) => {
          const bonus = 18000000;
          game.cash += bonus; game.happiness += 20; game.reputation += 10;
          return `대박 순이익 ${won(bonus)}이 현금 금고에 들어왔습니다! (행복 +20)`;
        }
      },
      {
        tier: "매우 좋은 뉴스",
        title: "🌟 공중파 황금시간대 '골목 대박 맛집' 다큐멘터리 1시간 단독 방영",
        desc: "정성 가득한 위생 관리와 특제 소스 비법이 전국에 전파를 타며 전국구 성지가 되었습니다.",
        apply: (game, won) => {
          const bonus = 35000000;
          game.cash += bonus; game.reputation += 18; game.happiness += 25;
          return `방송 방영 특수로 월 매출 3배 급증 및 순이익 ${won(bonus)} 창출! (평판 +18)`;
        }
      }
    ],
    good: [
      {
        tier: "좋은 뉴스",
        title: "🌟 배달앱 맛집 랭킹 1위 등극 및 본사 우수 가맹점 표창",
        desc: "바삭하고 깨끗한 튀김 노하우로 리뷰 5.0 만점을 수개월간 유지했습니다.",
        apply: (game, won) => {
          const bonus = 5000000;
          game.cash += bonus; game.reputation += 8;
          return `본사 장학금 및 원자재 지원금 ${won(bonus)}을 받았습니다. (평판 +8)`;
        }
      },
      {
        tier: "좋은 뉴스",
        title: "🛵 인근 대단지 아파트 입주 시작… 단골 주문 급증",
        desc: "매장 바로 앞 신축 아파트 단지가 입주하며 고정 배달 주문량이 30% 증가했습니다.",
        apply: (game) => {
          game.happiness += 8; game.stress = Math.max(0, game.stress - 6);
          return "안정적인 매출 기반이 확보되었습니다. (스트레스 -6)";
        }
      },
      {
        tier: "좋은 뉴스",
        title: "💡 배달 대행 플랫폼 우수 상점 수수료 할인 혜택 당첨",
        desc: "주문 건수 우수 가맹점으로 선정되어 배달 수수료 1% 캐시백을 받게 되었습니다.",
        apply: (game, won) => {
          const save = 3000000; game.cash += save;
          return `고정 비용 절감액 ${won(save)}이 환급되었습니다.`;
        }
      },
      {
        tier: "좋은 뉴스",
        title: "🍗 인근 군부대 치킨 300마리 단체 야식 납품 계약",
        desc: "사단장 표창 위문 행사용 치킨 단체 주문을 독점 수주했습니다.",
        apply: (game, won) => {
          const profit = 4500000; game.cash += profit; game.happiness += 6;
          return `단체 주문 순이익 ${won(profit)}이 즉시 입금되었습니다.`;
        }
      },
      {
        tier: "좋은 뉴스",
        title: "🏅 식약처 주관 음식점 위생등급 '매우 우수' 인증 마크 획득",
        desc: "주방 후드 기름때 하나 없는 철저한 위생 점검으로 블루리본 급 평가를 받았습니다.",
        apply: (game) => { game.reputation += 7; return "동네 단골 손님들이 크게 늘었습니다. (평판 +7)"; }
      },
      {
        tier: "좋은 뉴스",
        title: "🤝 지역 아동센터 치킨 파티 후원 선행 기부",
        desc: "분기 수익의 일부를 털어 보육원 아이들에게 치킨 50마리를 기부했습니다.",
        apply: (game) => { game.reputation += 8; game.happiness += 10; return "지역 신문에 선행이 보도되었습니다."; }
      }
    ],
    normal: [
      {
        tier: "평범한 뉴스",
        title: "🍗 신선육 버무리기 및 튀김기 정밀 온도 세팅",
        desc: "165도 기름 온도계에 맞춰 노릇노릇하게 닭을 튀겨냈습니다.",
        apply: () => "손님들이 바삭하다며 칭찬했습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "🍺 무더운 여름 저녁 야외 테이블 생맥주 완판",
        desc: "퇴근길 직장인들이 모여 치맥을 즐기며 테라스를 가득 채웠습니다.",
        apply: (game) => {
          game.happiness += 4;
          return "시원한 맥주 탭을 내리며 흐뭇함을 느꼈습니다. (행복 +4)";
        }
      },
      {
        tier: "평범한 뉴스",
        title: "📦 폐식용유 수거 및 매장 방역 소독",
        desc: "주방 후드 기름때를 닦아내고 청결 상태를 점검했습니다.",
        apply: () => "위생 점검 A등급을 받았습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "🥫 신메뉴 시식 및 포장 박스 접기",
        desc: "다음날 쓸 치킨 상자를 정성스레 접어두었습니다.",
        apply: () => "내일 장사 준비를 여유 있게 마쳤습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "🔪 닭 가공육 염지 작업 및 냉장고 정리",
        desc: "하림에서 배송된 신선 하림 닭을 특제 소스에 담갔습니다.",
        apply: () => "염지가 맛있게 잘 되었습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "🧽 홀 테이블 오더 키오스크 점검",
        desc: "테이블마다 설치된 태블릿 주문 단말기 결제 오류를 재부팅했습니다.",
        apply: () => "주문 시스템이 원활합니다."
      },
      {
        tier: "평범한 뉴스",
        title: "🧅 양파 및 무 절임 피클 수제 담그기",
        desc: "새콤달콤한 치킨 무와 양파 장아찌를 대량으로 만들었습니다.",
        apply: () => "숙성고가 가득 찼습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "💡 홀 전구 조명 LED 교체 작업",
        desc: "치킨이 더 먹음직스럽게 보이도록 주황빛 무드등을 달았습니다.",
        apply: (game) => { game.happiness += 1; return "아늑한 홀 분위기가 되었습니다."; }
      },
      {
        tier: "평범한 뉴스",
        title: "📻 매장 내 배경음악(BGM) 플레이리스트 갱신",
        desc: "손님들이 좋아하는 90년대 가요 감성 음악으로 틀었습니다.",
        apply: () => "흥겨운 호프집 분위기입니다."
      },
      {
        tier: "평범한 뉴스",
        title: "🧹 매장 앞 인도 물청소 실시",
        desc: "전날 밤 손님이 흘린 맥주 자국을 고압 세척기로 말끔히 씻어냈습니다.",
        apply: () => "가게 앞이 깨끗해졌습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "📦 콜라 및 사이다 캔 음료 박스 정리",
        desc: "음료수 냉장고 재고를 채우고 유통기한을 확인했습니다.",
        apply: () => "음료 재고가 든든합니다."
      },
      {
        tier: "평범한 뉴스",
        title: "📞 배달앱 고객 리뷰 답글 일괄 작성",
        desc: "별점 5점 남겨준 단골 손님들께 일일이 감사 댓글을 달았습니다.",
        apply: (game) => { game.reputation += 1; return "단골 재주문율이 올랐습니다."; }
      },
      {
        tier: "평범한 뉴스",
        title: "🛡️ 세스코 정기 방역 소독 실시",
        desc: "해충 방제 전문 요원이 다녀가 세스코 멤버스 마크를 갱신했습니다.",
        apply: () => "위생 청결 구역 인증입니다."
      },
      {
        tier: "평범한 뉴스",
        title: "🌿 주방 환풍기 대형 덕트 모터 점검",
        desc: "기름때가 끼어 소리가 나던 환기 모터에 윤활유를 주입했습니다.",
        apply: () => "소음 없이 잘 돌아갑니다."
      }
    ],
    bad: [
      {
        tier: "나쁜 뉴스",
        title: "⚠️ 배달 지연으로 치킨 식어 도착… 악성 1점 리뷰",
        desc: "비 오는 날 배달 기사가 잡히지 않아 고객의 별점 테러를 받았습니다.",
        apply: (game) => {
          game.stress += 14; game.reputation = Math.max(0, game.reputation - 3);
          return "배달앱에 사과글을 남기며 속상해했습니다. (평판 -3, 스트레스 +14)";
        }
      },
      {
        tier: "나쁜 뉴스",
        title: "📉 튀김유 및 생닭 납품 원가 25% 인상 통보",
        desc: "본사의 일방적인 원가 인상 조치로 남는 마진이 줄어들었습니다.",
        apply: (game) => {
          game.stress += 15;
          return "자영업자의 비애를 절감합니다. (스트레스 +15)";
        }
      },
      {
        tier: "나쁜 뉴스",
        title: "🚰 주방 싱크대 하수구 막힘 역류 대소동",
        desc: "튀김 가루와 찌꺼기가 굳어 하수관이 막히는 바람에 홀 바닥이 물바다가 되었습니다.",
        apply: (game, won) => {
          const cost = 400000; game.cash -= cost; game.stress += 10;
          return `설비 업체 긴급 출동비 ${won(cost)} 지출!`;
        }
      },
      {
        tier: "나쁜 뉴스",
        title: "🗣️ 야간 홀 손님 간 고성방가 및 기물 파손 분쟁",
        desc: "만취한 손님들이 술에 취해 맥주잔을 깨고 싸우다 경찰이 출동했습니다.",
        apply: (game) => { game.stress += 12; return "깨진 유리잔을 치우며 진땀을 뺐습니다."; }
      },
      {
        tier: "나쁜 뉴스",
        title: "🔌 치킨 프랜차이즈 본사 정기 가맹비 및 로열티 인상",
        desc: "본사 차원에서 브랜드 광고비 명목으로 매월 청구하는 비용이 올랐습니다.",
        apply: (game) => { game.stress += 10; return "고정 지출이 늘어 한숨이 나옵니다."; }
      },
      {
        tier: "나쁜 뉴스",
        title: "🛵 배달 대행 기사의 배달 중 치킨 오배송 사고",
        desc: "라이더 실수로 다른 동 호수에 치킨을 두고 오는 바람에 재조리해 보내느라 늦었습니다.",
        apply: (game) => { game.stress += 8; return "닭 한 마리를 날렸습니다."; }
      }
    ],
    worst: [
      {
        tier: "최악의 뉴스",
        title: "🚨 조류독감(AI) 전국 확산 파동… 3개월간 손님 발길 뚝",
        desc: "전국적인 닭고기 파동으로 치킨 기피 현상이 벌어지며 적자가 누적되었습니다.",
        apply: (game, won) => {
          const loss = 15000000;
          game.cash = Math.max(0, game.cash - loss); game.stress += 28; game.happiness = Math.max(0, game.happiness - 15);
          return `적자 누적으로 비상금 ${won(loss)} 메워 넣기! (스트레스 +28)`;
        }
      },
      {
        tier: "최악의 뉴스",
        title: "🔥 주방 튀김기 과열로 인한 대형 화재 및 영업 정지",
        desc: "새벽 마감 직전 튀김유 화재 감지기가 울렸으나 진화가 늦어져 주방 전체가 불에 타버렸습니다.",
        apply: (game, won) => {
          const loss = 40000000;
          game.cash = Math.max(0, game.cash - loss); game.stress += 40; game.reputation = Math.max(0, game.reputation - 25);
          return `복구 공사비 ${won(loss)} 지출 및 6개월 영업 정지! (자산 타격 극심)`;
        }
      }
    ]
  },

  // --------------------------------------------------------------------------
  // 17. 무직(구직중) (unemployed)
  // --------------------------------------------------------------------------
  unemployed: {
    veryGood: [
      {
        tier: "매우 좋은 뉴스",
        title: "🎉 대기업·공공기관 최종 면접 합격 통보!",
        desc: "오랜 백수 생활의 피눈물 나는 스터디 끝에 마침내 꿈에 그리던 최종 합격 전화를 받았습니다!",
        apply: (game) => {
          game.happiness += 35; game.stress = Math.max(0, game.stress - 30); game.reputation += 15;
          return "부모님과 얼싸안고 눈물을 흘렸습니다! (행복 +35, 스트레스 -30)";
        }
      },
      {
        tier: "매우 좋은 뉴스",
        title: "🌟 정부 주관 청년 창업 지원금 최종 1억 원 사업 선정",
        desc: "야심 차게 준비한 스타트업 비즈니스 모델이 심사위원 만장일치로 통과되었습니다.",
        apply: (game, won) => {
          const fund = 100000000; game.cash += fund; game.happiness += 30;
          return `창업 지원금 ${won(fund)}이 통장에 입금되었습니다! (현금 대폭증)`;
        }
      }
    ],
    good: [
      {
        tier: "좋은 뉴스",
        title: "💵 정부 청년 취업성공패키지 선정… 구직촉진수당 300만 지급",
        desc: "고용노동부 지원 대상자로 확정되어 안정적인 생활비를 지원받게 되었습니다.",
        apply: (game, won) => {
          const bonus = 3000000;
          game.cash += bonus; game.happiness += 10;
          return `구직촉진수당 ${won(bonus)}이 통장으로 입금되었습니다. (행복 +10)`;
        }
      },
      {
        tier: "좋은 뉴스",
        title: "📜 토익 950점 달성 및 컴퓨터활용능력 1급 취득",
        desc: "도서관을 오가며 준비한 시험에서 만점에 가까운 고득점을 획득했습니다.",
        apply: (game) => {
          game.reputation += 8; game.happiness += 8;
          return "서류 스펙 깡패로 거듭났습니다. (평판 +8)";
        }
      },
      {
        tier: "좋은 뉴스",
        title: "💡 지자체 무료 코딩 부트캠프 우수 수료생 선정",
        desc: "6개월 간의 집중 실무 교육 과정을 수석으로 수료했습니다.",
        apply: (game, won) => {
          const award = 1000000; game.cash += award; game.reputation += 5;
          return `우수 수료 장학금 ${won(award)}을 받았습니다.`;
        }
      },
      {
        tier: "좋은 뉴스",
        title: "☕ 스터디룸 백일장 공모전 가상 입선",
        desc: "취준생 커뮤니티 수기 공모전에 당선되었습니다.",
        apply: (game, won) => {
          const prize = 300000; game.cash += prize; game.happiness += 4;
          return `상금 ${won(prize)}을 받았습니다.`;
        }
      },
      {
        tier: "좋은 뉴스",
        title: "🏅 한국사 능력 검정시험 1급 자격증 획득",
        desc: "공기업 가산점을 위한 한국사 시험에 여유 있게 패스했습니다.",
        apply: (game) => { game.reputation += 4; return "공공기관 서류 가점을 확보했습니다."; }
      },
      {
        tier: "좋은 뉴스",
        title: "🤝 취업 스터디 모임에서 평생 동반자 친구들 획득",
        desc: "서로 으싸으싸 격려하며 끈끈한 유대감을 나눴습니다.",
        apply: (game) => { game.happiness += 8; game.stress = Math.max(0, game.stress - 5); return "정신적 지위가 든든해졌습니다."; }
      }
    ],
    normal: [
      {
        tier: "평범한 뉴스",
        title: "☕ 집 근처 독서실에서 자기소개서 작성",
        desc: "지원 동기를 규격에 맞춰 꼼꼼하게 다듬었습니다.",
        apply: () => "문장이 매끄럽게 정리되었습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "🍙 편의점 삼각김밥과 컵라면 점심",
        desc: "식비를 아끼기 위해 편의점에서 소박하게 끼니를 해결했습니다.",
        apply: (game) => {
          game.health = Math.max(0, game.health - 1);
          return "배를 채우고 다시 열람실로 향했습니다.";
        }
      },
      {
        tier: "평범한 뉴스",
        title: "💻 취업 카페 채용 공고 스크랩",
        desc: "올해 하반기 공채 일정을 엑셀로 정리하며 전략을 세웠습니다.",
        apply: () => "마감 일정을 차질 없이 정리했습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "🏃 저녁 한강 둔치 달리기 운동",
        desc: "취준 스트레스를 날려버리기 위해 가벼운 조깅으로 땀을 흘렸습니다.",
        apply: (game) => {
          game.health += 2; game.stress = Math.max(0, game.stress - 3);
          return "몸이 한결 가벼워졌습니다. (건강 +2, 스트레스 -3)";
        }
      },
      {
        tier: "평범한 뉴스",
        title: "📚 시립 도서관 아침 오픈런 자리 맡기",
        desc: "인기 있는 창가 지정석을 사수하기 위해 아침 8시에 줄을 섰습니다.",
        apply: () => "원하던 공부 자리를 잡았습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "🎧 유튜브 무료 면접 강의 시청",
        desc: "1분 자기소개 스피치 노하우 영상을 반복 재생했습니다.",
        apply: (game) => { game.reputation += 1; return "면접 스킬이 늘었습니다."; }
      },
      {
        tier: "평범한 뉴스",
        title: "🍳 본가 냉장고 김치볶음밥 요리 해먹기",
        desc: "오랜만에 부모님 댁에서 직접 점심을 차려 먹었습니다.",
        apply: (game) => { game.happiness += 2; return "든든한 한 끼를 해결했습니다."; }
      },
      {
        tier: "평범한 뉴스",
        title: "🛒 다이소 면접용 깔끔한 정장 넥타이 구입",
        desc: "가성비 좋은 네이비색 실크 넥타이를 골랐습니다.",
        apply: (game, won) => {
          const cost = 10000; game.cash -= cost;
          return `소소한 지출 ${won(cost)}`;
        }
      },
      {
        tier: "평범한 뉴스",
        title: "🖨️ 동사무소 주민등록초본 무인 발급",
        desc: "이력서 첨부용 서류를 미리 3부 뗐습니다.",
        apply: () => "서류가 준비되었습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "🧹 자취방 빨래 세탁소 돌리기",
        desc: "밀려 있던 이불과 겨울옷을 빨래방 코인 세탁기에 넣었습니다.",
        apply: (game) => { game.stress = Math.max(0, game.stress - 1); return "방이 뽀송해졌습니다."; }
      },
      {
        tier: "평범한 뉴스",
        title: "🧊 편의점 1+1 행사 음료수 쟁여두기",
        desc: "독서실 책상 서랍에 비상용 에너지 드링크를 채워두었습니다.",
        apply: () => "든든한 식량 보급입니다."
      },
      {
        tier: "평범한 뉴스",
        title: "🚶 동네 산책하며 리프레시",
        desc: "종일 앉아 있어 뻐근한 다리를 이끌고 동네 한 바퀴를 돌았습니다.",
        apply: (game) => { game.health += 1; return "기분 전환을 했습니다."; }
      },
      {
        tier: "평범한 뉴스",
        title: "📝 이력서 사진 스튜디오 새로 찍기",
        desc: "포토샵 보정이 자연스러운 신사동 사진관에서 증명사진을 갱신했습니다.",
        apply: (game, won) => {
          const fee = 30000; game.cash -= fee;
          return `촬영비 ${won(fee)} 지출`;
        }
      },
      {
        tier: "평범한 뉴스",
        title: "🌿 방안 화분 물주기",
        desc: "볕이 잘 드는 창가 다육이에 물을 주었습니다.",
        apply: () => "무탈하게 자라납니다."
      }
    ],
    bad: [
      {
        tier: "나쁜 뉴스",
        title: "⚠️ 기대했던 중견기업 서류 전형 불합격 통보",
        desc: "정성 들여 작성한 지원서가 서류 심사에서 탈락하며 불합격 문자를 받았습니다.",
        apply: (game) => {
          game.stress += 14; game.happiness = Math.max(0, game.happiness - 8);
          return "자존감이 깎이고 씁쓸한 밤을 보냈습니다. (스트레스 +14)";
        }
      },
      {
        tier: "나쁜 뉴스",
        title: "👥 명절 친척 모임에서 '취직은 언제 하냐' 폭풍 잔소리",
        desc: "오랜만에 모인 친척들 앞에서 비교를 당하며 가시방석에 앉아있었습니다.",
        apply: (game) => {
          game.stress += 18;
          return "속이 상해 서둘러 자리를 빠져나왔습니다. (스트레스 +18)";
        }
      },
      {
        tier: "나쁜 뉴스",
        title: "💻 최종 면접 직전 노트북 블루스크린 발생",
        desc: "온라인 화상 면접 5분 전 노트북이 다운되어 스마트폰으로 급하게 접속했습니다.",
        apply: (game) => { game.stress += 16; return "식은땀을 흘리며 면접을 봤습니다."; }
      },
      {
        tier: "나쁜 뉴스",
        title: "📉 물가 상승으로 인해 원룸 월세 및 고시원비 인상 통보",
        desc: "건물주가 관리비를 5만원 더 올려달라고 통지해 생활비 압박이 커졌습니다.",
        apply: (game) => { game.stress += 10; return "한숨이 깊어집니다."; }
      },
      {
        tier: "나쁜 뉴스",
        title: "🤒 환절기 감기몸살로 일주일간 도서실 출석 실패",
        desc: "독감에 걸려 방에 누워 앓느라 공부 흐름이 완전히 끊겼습니다.",
        apply: (game) => { game.health = Math.max(0, game.health - 6); game.stress += 10; return "건강을 잃었습니다."; }
      },
      {
        tier: "나쁜 뉴스",
        title: "🚇 면접 장소 지하철 환승 착오로 10분 지각 탈락",
        desc: "초행길에 출구 번호를 헷갈려 뛰어갔으나 면접실 문이 닫혀 면접을 보지 못했습니다.",
        apply: (game) => { game.stress += 15; return "허탈함에 발길을 돌렸습니다."; }
      }
    ],
    worst: [
      {
        tier: "최악의 뉴스",
        title: "🚨 취업 사기 피싱에 속아 비상금 500만원 갈취당함",
        desc: "입사 보증금을 요구하는 교묘한 사기 범죄에 넘어가 마지막 남은 비상금을 날렸습니다.",
        apply: (game, won) => {
          const loss = 5000000;
          game.cash = Math.max(0, game.cash - loss); game.stress += 30; game.happiness = Math.max(0, game.happiness - 20);
          return `사기 피해로 피 같은 돈 ${won(loss)}을 날렸습니다. (스트레스 +30)`;
        }
      },
      {
        tier: "최악의 뉴스",
        title: "🔥 오랜 백수 생활 극심한 우울증으로 응급실 이송",
        desc: "반복되는 불합격 통보와 고립감으로 심신이 한계에 달해 결국 쓰러졌습니다.",
        apply: (game) => {
          game.health = Math.max(0, game.health - 20); game.stress += 40; game.happiness = Math.max(0, game.happiness - 35);
          return "정신건강의학과 입원 치료 권고를 받았습니다. (건강 -20, 스트레스 +40)";
        }
      }
    ]
  }
};

/**
 * 확률 엔진에 따라 직업별 뉴스를 엄격하게 추첨하는 유틸리티
 */
function getRandomJobNewsByProbability(jobKey) {
  const jobBucket = JOB_NEWS_DATA[jobKey] || JOB_NEWS_DATA["unemployed"];
  const rand = Math.random();
  let tierKey = "normal";

  if (rand < 0.05) {
    tierKey = "veryGood"; // 5%
  } else if (rand < 0.20) {
    tierKey = "good";     // 15%
  } else if (rand < 0.80) {
    tierKey = "normal";   // 60%
  } else if (rand < 0.95) {
    tierKey = "bad";      // 15%
  } else {
    tierKey = "worst";    // 5%
  }

  const categoryList = jobBucket[tierKey] && jobBucket[tierKey].length > 0
    ? jobBucket[tierKey]
    : jobBucket.normal;

  return categoryList[Math.floor(Math.random() * categoryList.length)];
}
