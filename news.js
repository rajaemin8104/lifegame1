/* ==========================================================================
   [MY LIFE] 17개 직업군 상세 뉴스 데이터베이스 & 확률 엔진 (news.js)
   - 확률 테이블:
     * 매우 좋은 뉴스 : 5%
     * 좋은 뉴스     : 15%
     * 평범한 뉴스   : 60%
     * 나쁜 뉴스     : 15%
     * 최악의 뉴스   : 5%
   - 카테고리 내 복수 뉴스 균등 무작위 추첨
   ========================================================================== */

const JOB_NEWS_DATA = {
  // --------------------------------------------------------------------------
  // 1. 삼성전자 회사원 (large_corp)
  // --------------------------------------------------------------------------
  large_corp: {
    veryGood: [
      {
        tier: "매우 좋은 뉴스",
        title: "🏆 차세대 HBM 및 파운드리 대형 수주… OPI(초과이익성과급) 50% 상한 지급!",
        desc: "글로벌 빅테크향 차세대 메모리 독점 공급으로 역대 최대 분기 흑자를 달성했습니다. 전사 성과급 상한선이 터졌습니다!",
        apply: (game, won) => {
          const bonus = Math.round(game.annualIncome * 0.5);
          game.cash += bonus; game.happiness += 20; game.reputation += 10;
          return `OPI 성과급으로 ${won(bonus)}이 전액 현금 입금되었습니다! (행복 +20, 평판 +10)`;
        }
      }
    ],
    good: [
      {
        tier: "좋은 뉴스",
        title: "📈 사내 핵심 특허 발명 포상 및 우수 사원 표창",
        desc: "제출한 반도체 공정 단축 직무발명 특허가 정식 등록되며 대표이사 직속 포상 대상자로 선정되었습니다.",
        apply: (game, won) => {
          const bonus = 5000000;
          game.cash += bonus; game.reputation += 8; game.happiness += 10;
          return `발명 장려금 ${won(bonus)}을 수령하고 사내 명예의 전당에 올랐습니다. (평판 +8, 행복 +10)`;
        }
      },
      {
        tier: "좋은 뉴스",
        title: "🏖️ 복지포인트 대폭 인상 및 하계 패밀리 휴양 콘도 당첨",
        desc: "노사 상생 합의로 사내 복지포인트가 증액되고 최고급 호텔 숙박권에 전격 당첨되었습니다.",
        apply: (game) => {
          game.happiness += 12; game.stress = Math.max(0, game.stress - 15);
          return "가족들과 최고급 호텔에서 럭셔리한 휴식을 즐겼습니다. (행복 +12, 스트레스 -15)";
        }
      }
    ],
    normal: [
      {
        tier: "평범한 뉴스",
        title: "📋 반기 전사 조직개편 및 사내 부서 층간 이동",
        desc: "조직 효율화를 위해 본사 사옥 내 좌석 재배치와 층간 부서 이동이 진행되었습니다.",
        apply: () => "자리 짐을 정리하고 모니터 세팅을 새로 마쳤습니다. 일상적인 직장 루틴입니다."
      },
      {
        tier: "평범한 뉴스",
        title: "☕ 사내 카페 리뉴얼 및 웰빙 조식 뷔페 개편",
        desc: "캠퍼스 내 베이커리와 조식 라운지 메뉴가 개편되어 아침 출근길 소소한 즐거움이 생겼습니다.",
        apply: (game) => {
          game.happiness += 3;
          return "아침 갓 구운 빵과 커피로 활력을 얻었습니다. (행복 +3)";
        }
      },
      {
        tier: "평범한 뉴스",
        title: "💻 사내 업무용 최신 노트북 및 듀얼 모니터 전면 교체",
        desc: "IT 인프라 정기 교체 주기에 따라 초고성능 워크스테이션 랩톱이 지급되었습니다.",
        apply: (game) => {
          game.stress = Math.max(0, game.stress - 3);
          return "빠릿해진 업무 환경 덕분에 잔렉 스트레스가 줄었습니다. (스트레스 -3)";
        }
      },
      {
        tier: "평범한 뉴스",
        title: "📊 정기 준법경영·보안 온라인 의무 교육 이수",
        desc: "산업기밀 유출 방지 및 정보보호 사이버 교육을 수료했습니다.",
        apply: () => "지루한 보안 퀴즈를 모두 통과하여 정상 처리되었습니다."
      }
    ],
    bad: [
      {
        tier: "나쁜 뉴스",
        title: "⚠️ 글로벌 테크 경기 둔화… 부서별 긴축재정 및 법인카드 한도 축소",
        desc: "거시경제 불확실성으로 회식비와 도서구입비 등 부서 예산이 30% 일괄 삭감되었습니다.",
        apply: (game) => {
          game.stress += 8; game.happiness = Math.max(0, game.happiness - 5);
          return "법카 한도가 줄어 팀 회식 분위기가 눈치 보기가 되었습니다. (스트레스 +8, 행복 -5)";
        }
      },
      {
        tier: "나쁜 뉴스",
        title: "📑 분기 경영실적 평가 대비 철야 데이터 집계",
        desc: "임원 주재 긴급 경영점검 회의를 앞두고 주말 내내 PPT와 엑셀 지표를 수정했습니다.",
        apply: (game) => {
          game.stress += 14; game.health = Math.max(0, game.health - 4);
          return "연속 야근으로 눈이 침침하고 허리에 통증이 찾아옵니다. (스트레스 +14, 건강 -4)";
        }
      }
    ],
    worst: [
      {
        tier: "최악의 뉴스",
        title: "🚨 반도체 라인 정전 사고 및 핵심 기술 감사 착수",
        desc: "소속 사업부에서 공정 챔버 트러블이 발생해 수백억 원의 웨이퍼 손실이 보도되며 전사 특별 감사가 시작되었습니다.",
        apply: (game) => {
          game.stress += 25; game.reputation = Math.max(0, game.reputation - 12); game.health = Math.max(0, game.health - 6);
          return "감사실 소환과 사유서 작성으로 극심한 멘탈 붕괴를 겪었습니다. (스트레스 +25, 평판 -12, 건강 -6)";
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
        title: "🚀 대기업 그룹사 200억 규모 SAP S/4HANA & Azure 클라우드 전환 단독 수주!",
        desc: "경쟁 대기업 SI를 제치고 당사가 차세대 클라우드 ERP 구축 주사업자로 선정되었습니다. 회사에 전례 없는 성공 보수가 지급됩니다!",
        apply: (game, won) => {
          const bonus = Math.round(game.annualIncome * 0.35);
          game.cash += bonus; game.reputation += 14; game.happiness += 18;
          return `프로젝트 수주 기여 특별 상여금 ${won(bonus)}이 현금 지급되었습니다! (평판 +14, 행복 +18)`;
        }
      }
    ],
    good: [
      {
        tier: "좋은 뉴스",
        title: "📜 SAP 공인 컨설턴트 및 MS Azure 최고급 아키텍트 자격증 취득",
        desc: "주말을 반납하고 공부한 끝에 글로벌 최고 등급 자격을 취득하여 사내 핵심 기술 멘토로 임명되었습니다.",
        apply: (game, won) => {
          const bonus = 3000000;
          game.cash += bonus; game.annualIncome += 2000000; game.reputation += 8;
          return `자격 취득 포상금 ${won(bonus)} 수령 및 자격 수당으로 연봉 200만원 영구 인상! (평판 +8)`;
        }
      },
      {
        tier: "좋은 뉴스",
        title: "🤝 Microsoft 최우수 파트너 어워드 수상 및 라이선스 리베이트",
        desc: "당사가 MS 클라우드 연간 솔루션 공급 실적 최상위 파트너로 선정되며 해외 테크 컨퍼런스 참가 기회를 얻었습니다.",
        apply: (game) => {
          game.happiness += 12; game.reputation += 6; game.stress = Math.max(0, game.stress - 8);
          return "해외 컨퍼런스 견학을 다녀오며 식견을 넓히고 스트레스를 풀었습니다. (행복 +12, 평판 +6, 스트레스 -8)";
        }
      }
    ],
    normal: [
      {
        tier: "평범한 뉴스",
        title: "🔄 고객사 분기 정기 SAP 패치 및 월말 결산 모니터링",
        desc: "고객사의 회계 월말 마감 시간에 맞춰 ERP 원장 이상 유무를 점검하고 시스템 배포를 마쳤습니다.",
        apply: () => "큰 결함 없이 무사히 원장 마감이 종료되었습니다. 평온한 분기입니다."
      },
      {
        tier: "평범한 뉴스",
        title: "💻 Microsoft Copilot 도입 사내 전파 세미나 진행",
        desc: "고객사 임직원들을 대상으로 사내 M365 협업 도구 및 AI 자동화 기능 교육 세션을 진행했습니다.",
        apply: (game) => {
          game.reputation += 3;
          return "성공적인 세미나 진행으로 고객사 담당자에게 감사의 메일을 받았습니다. (평판 +3)";
        }
      },
      {
        tier: "평범한 뉴스",
        title: "📦 원격 하이브리드 근무 규정 갱신 및 협업 툴 재정비",
        desc: "Teams와 사내 그룹웨어 인프라가 업데이트되어 주 2회 재택근무 편의성이 향상되었습니다.",
        apply: (game) => {
          game.happiness += 4;
          return "출퇴근 혼잡을 피해 쾌적하게 원격 근무를 수행했습니다. (행복 +4)";
        }
      },
      {
        tier: "평범한 뉴스",
        title: "📑 신규 고객사 SAP ERP 모듈 기능 요구사항(RFP) 분석",
        desc: "제조 고객사의 구매·물류(MM/SD) 모듈 인터페이스 설계를 위해 현업 인터뷰를 진행했습니다.",
        apply: () => "현업 담당자들과의 미팅을 끝내고 회의록 정리를 완료했습니다."
      }
    ],
    bad: [
      {
        tier: "나쁜 뉴스",
        title: "⚠️ 고객사 ERP 데이터 마이그레이션 불일치로 긴급 주말 출근",
        desc: "레거시 시스템에서 SAP 전환 중 데이터 불일치가 발생해 이틀 내내 테이블 검증에 매달렸습니다.",
        apply: (game) => {
          game.stress += 14; game.health = Math.max(0, game.health - 4);
          return "주말 내내 DB 쿼리를 돌리며 피로가 쏟아집니다. (스트레스 +14, 건강 -4)";
        }
      },
      {
        tier: "나쁜 뉴스",
        title: "📢 고객사 전산팀장의 무리한 CBO(커스터마이징) 기능 추가 요구",
        desc: "표준 SAP 프로세스를 벗어나는 억지 개발 요구로 납기 일정에 차질이 빚어졌습니다.",
        apply: (game) => {
          game.stress += 12; game.reputation = Math.max(0, game.reputation - 3);
          return "갑을 관계 속에서 일정 조율에 진땀을 뺐습니다. (스트레스 +12, 평판 -3)";
        }
      }
    ],
    worst: [
      {
        tier: "최악의 뉴스",
        title: "🚨 ERP 시스템 오픈 첫날 결산 오류 마비… 위약벌 청구 위기",
        desc: "Go-Live 당일 서버 트래픽 병목과 인터페이스 먹통으로 고객사 물류 및 세금계산서 발행이 전면 중단되는 대참사가 터졌습니다.",
        apply: (game) => {
          game.stress += 26; game.reputation = Math.max(0, game.reputation - 14); game.happiness = Math.max(0, game.happiness - 15);
          return "경영진 긴급 소환 및 살벌한 비상대책위 호출로 사경을 헤맸습니다. (스트레스 +26, 평판 -14, 행복 -15)";
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
        title: "🦄 초거대 AI 파운데이션 모델 세계 1위 등극… RSU(주식) 1억 수령!",
        desc: "설계한 모델 아키텍처가 글로벌 성능 벤치마크를 휩쓸며 전 세계 개발자의 찬사를 받았습니다.",
        apply: (game, won) => {
          const stockBonus = 100000000;
          game.assets.stock += stockBonus; game.reputation += 15; game.happiness += 25;
          return `구글 본사 RSU 주식 ${won(stockBonus)} 상당이 입고되었습니다! (평판 +15, 행복 +25)`;
        }
      }
    ],
    good: [
      {
        tier: "좋은 뉴스",
        title: "🏆 오픈소스 AI 경량화 라이브러리 GitHub 스타 50,000개 돌파",
        desc: "퇴근 후 공개한 오픈소스 패키지가 전 세계 엔지니어들의 필수 툴킷으로 자리 잡았습니다.",
        apply: (game) => {
          game.reputation += 12; game.happiness += 12;
          return "테크 씬에서 독보적인 네임드로 인정받았습니다. (평판 +12, 행복 +12)";
        }
      },
      {
        tier: "좋은 뉴스",
        title: "✈️ 미국 마운틴뷰 본사 테크 서밋 발표자 전액 지원 출장",
        desc: "실리콘밸리 본사 서밋에서 글로벌 엔지니어들을 대상으로 키노트 강연을 펼쳤습니다.",
        apply: (game) => {
          game.happiness += 10; game.reputation += 6; game.stress = Math.max(0, game.stress - 6);
          return "본사 개발자들과 교류하며 영감을 충전했습니다. (행복 +10, 평판 +6)";
        }
      }
    ],
    normal: [
      {
        tier: "평범한 뉴스",
        title: "☕ 구글 캠퍼스 무료 고급 뷔페와 1:1 테크 멘토링",
        desc: "캠퍼스 카페에서 동료들과 머신러닝 논문을 리뷰하며 평화로운 연구 루틴을 보냈습니다.",
        apply: () => "맛있는 식사와 함께 버그 없는 평온한 분기였습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "💻 H100 GPU 클러스터 1,024개 노드 인프라 할당 완료",
        desc: "학습 모델 분산 처리를 위한 초대형 GPU 노드가 승인되어 훈련을 시작했습니다.",
        apply: (game) => {
          game.happiness += 4;
          return "충분한 컴퓨팅 자원으로 쾌적하게 연구를 이어갑니다. (행복 +4)";
        }
      },
      {
        tier: "평범한 뉴스",
        title: "🔄 레거시 파이프라인 리팩토링 및 CI/CD 자동화 구축",
        desc: "복잡하던 코드베이스를 깔끔하게 정돈하고 단위 테스트 커버리지를 95%로 끌어올렸습니다.",
        apply: (game) => {
          game.stress = Math.max(0, game.stress - 4);
          return "코드 부채를 털어내어 마음이 편안해졌습니다. (스트레스 -4)";
        }
      },
      {
        tier: "평범한 뉴스",
        title: "📝 사내 AI 윤리 및 데이터 거버넌스 가이드라인 검토",
        desc: "모델 배포 전 편향성과 데이터 저작권 위반 여부를 검증하는 내부 프로세스를 밟았습니다.",
        apply: () => "사내 윤리위원회의 승인을 통과했습니다."
      }
    ],
    bad: [
      {
        tier: "나쁜 뉴스",
        title: "⚠️ GPU 클러스터 메모리 오버플로우로 3주 치 모델 학습 소실",
        desc: "체크포인트 저장 스크립트 오류로 귀중한 수주일간의 훈련 데이터가 증발했습니다.",
        apply: (game) => {
          game.stress += 15;
          return "처음부터 다시 학습을 돌려야 하는 허탈감에 빠졌습니다. (스트레스 +15)";
        }
      },
      {
        tier: "나쁜 뉴스",
        title: "💻 글로벌 서비스 API 레이턴시 급증… 36시간 연속 비상 대기",
        desc: "동시 접속 폭주로 트래픽 스파이크가 발생해 밤샘 트러블슈팅을 진행했습니다.",
        apply: (game) => {
          game.stress += 16; game.health = Math.max(0, game.health - 5);
          return "모니터 앞에서 밤을 지새우며 건강이 크게 깎였습니다. (스트레스 +16, 건강 -5)";
        }
      }
    ],
    worst: [
      {
        tier: "최악의 뉴스",
        title: "🚨 생성형 AI 모델 개인정보 유출 취약점 발각… 글로벌 언론 보도",
        desc: "담당 파이프라인에서 고객 민감정보가 노출되는 제로데이 취약점이 외신에 대서특필되었습니다.",
        apply: (game) => {
          game.stress += 28; game.reputation = Math.max(0, game.reputation - 15);
          return "본사 법무팀 인터뷰와 보안 징계 위원회에 회부되었습니다. (스트레스 +28, 평판 -15)";
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
        desc: "제안한 스마트 대중교통·복지 간소화 정책이 전국 최우수 사례로 뽑혀 특별 승진 가점을 획득했습니다.",
        apply: (game) => {
          game.annualIncome += 2500000; game.reputation += 15; game.happiness += 18;
          return "대통령 표창을 받으며 연소득이 250만원 영구 인상되었습니다! (평판 +15, 행복 +18)";
        }
      }
    ],
    good: [
      {
        tier: "좋은 뉴스",
        title: "🏛️ 시의회 행정사무감사 완벽 방어 및 시장님 격려 표창",
        desc: "시의원들의 날카로운 예산 질의를 빈틈없는 데이터와 논리로 완벽히 방어해 냈습니다.",
        apply: (game) => {
          game.reputation += 8; game.happiness += 8;
          return "요직 부서 발령 1순위가 되었습니다. (평판 +8, 행복 +8)";
        }
      },
      {
        tier: "좋은 뉴스",
        title: "💵 맞춤형 복지포인트 및 공무원 연가보상비 전액 수령",
        desc: "미사용 연차 보상비와 복지포인트가 연말에 알차게 입금되었습니다.",
        apply: (game, won) => {
          const bonus = 2000000;
          game.cash += bonus; game.happiness += 6;
          return `정산금 ${won(bonus)}이 통장에 입금되었습니다. (행복 +6)`;
        }
      }
    ],
    normal: [
      {
        tier: "평범한 뉴스",
        title: "📑 분기 정기 예산 집행 결산 및 지출결의서 정리",
        desc: "부서 내 관공서 회계 지출 증빙 서류를 차질 없이 마감했습니다.",
        apply: () => "서류상 오차 없이 깔끔하게 회계가 마감되었습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "🌸 청사 야외 버스킹 및 점심시간 사내 산책",
        desc: "날씨가 맑은 봄날 동기들과 함께 청사 주변을 걸으며 소소한 힐링을 누렸습니다.",
        apply: (game) => {
          game.stress = Math.max(0, game.stress - 5);
          return "산책으로 소소하게 힐링했습니다. (스트레스 -5)";
        }
      },
      {
        tier: "평범한 뉴스",
        title: "📋 하반기 공직자 청렴도 평가 설문 완료",
        desc: "사내 공직윤리 자가진단 및 온라인 청렴 교육을 이수했습니다.",
        apply: () => "청렴도 지표 우수 등급을 유지했습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "🗳️ 관내 선거 투·개표 지원 사무원 차출",
        desc: "주말 새벽 선거 개표소에 투입되어 투표용지 분류 작업을 도왔습니다.",
        apply: (game, won) => {
          const pay = 250000;
          game.cash += pay;
          return `개표 수당 ${won(pay)}을 수령했습니다.`;
        }
      }
    ],
    bad: [
      {
        tier: "나쁜 뉴스",
        title: "📢 악성 고질 민원인의 시청 민원실 난동 및 폭언",
        desc: "지속적으로 막무가내 인허가를 요구하는 민원인에게 2시간 동안 폭언을 들었습니다.",
        apply: (game) => {
          game.stress += 14;
          return "정신적 스트레스로 두통이 찾아왔습니다. (스트레스 +14)";
        }
      },
      {
        tier: "나쁜 뉴스",
        title: "🌧️ 기습 폭우로 인한 시청 재난안전대책본부 비상 2단계 동원",
        desc: "새벽 2시 긴급 호출을 받아 침수 취약지 모니터링과 빗물펌프장 철야 대기를 섰습니다.",
        apply: (game) => {
          game.stress += 12; game.health = Math.max(0, game.health - 4);
          return "잠을 한숨도 못 자고 밤샘 근무를 섰습니다. (스트레스 +12, 건강 -4)";
        }
      }
    ],
    worst: [
      {
        tier: "최악의 뉴스",
        title: "🚨 감사원 특별 감사 지적으로 징계위원회 회부 위기",
        desc: "과거 결재된 인허가 서류에서 상위 법령 해석 차이로 시정 조치 및 주의 처분을 받았습니다.",
        apply: (game) => {
          game.reputation = Math.max(0, game.reputation - 15); game.stress += 24;
          return "승진 누락 위기와 시말서 제출로 시련을 맞았습니다. (평판 -15, 스트레스 +24)";
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
          return "사도(師道)를 인정받으며 연봉 200만원 인상 및 큰 보람을 얻었습니다! (평판 +14, 행복 +20)";
        }
      }
    ],
    good: [
      {
        tier: "좋은 뉴스",
        title: "🏫 맡은 학급 전원 학교폭력·이탈 제로 및 학업성취도 1위",
        desc: "따뜻한 상담과 관심으로 1년 동안 단 한 건의 사고도 없이 아이들을 바르게 이끌었습니다.",
        apply: (game) => {
          game.reputation += 8; game.happiness += 12;
          return "학부모님들의 진심 어린 감사 편지를 한가득 받았습니다. (평판 +8, 행복 +12)";
        }
      },
      {
        tier: "좋은 뉴스",
        title: "☀️ 꿀맛 같은 여름방학 돌입 및 교원 자율연수",
        desc: "방학을 맞이해 온전한 재충전과 독서, 여행의 시간을 가졌습니다.",
        apply: (game) => {
          game.happiness += 10; game.stress = Math.max(0, game.stress - 15); game.health += 5;
          return "방학 동안 푹 쉬며 몸과 마음의 에너지를 채웠습니다. (행복 +10, 스트레스 -15, 건강 +5)";
        }
      }
    ],
    normal: [
      {
        tier: "평범한 뉴스",
        title: "📝 학기말 나이스(NEIS) 생활기록부 작성 기간",
        desc: "반 학생 전원의 세부능력 특기사항과 행동발달을 꼼꼼하게 입력했습니다.",
        apply: () => "밀린 생기부 입력을 기한 내 모두 마쳤습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "🏫 가을 운동회 및 학예 발표회 성황리 개최",
        desc: "응원전 속에 아이들과 함께 땀 흘리며 달렸습니다.",
        apply: (game) => {
          game.happiness += 4;
          return "아이들의 밝은 웃음에 마음이 훈훈해졌습니다. (행복 +4)";
        }
      },
      {
        tier: "평범한 뉴스",
        title: "🍱 학교 급식 모니터링 및 방과후 수업 참관",
        desc: "영양 만점 급식을 지도하고 방과후 특기적성 수업을 참관했습니다.",
        apply: () => "무난하고 평온한 하루를 보냈습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "📋 학부모 공개수업 및 상담 주간 진행",
        desc: "교실 뒤편 학부모님들의 참관 속에 공개수업을 차분하게 마쳤습니다.",
        apply: (game) => {
          game.reputation += 2;
          return "수업이 알찼다는 긍정적인 피드백을 받았습니다. (평판 +2)";
        }
      }
    ],
    bad: [
      {
        tier: "나쁜 뉴스",
        title: "📞 심야 시간 학부모의 막무가내 전화 항의",
        desc: "아이들 간의 사소한 다툼을 두고 밤 11시에 전화를 걸어 고성을 지르는 학부모로 고통받았습니다.",
        apply: (game) => {
          game.stress += 14;
          return "교직에 대한 회의감이 들며 잠을 설쳤습니다. (스트레스 +14)";
        }
      },
      {
        tier: "나쁜 뉴스",
        title: "⚠️ 교내 학생 간 심각한 다툼 발생… 학교폭력대책심의위원회 개최",
        desc: "쉬는 시간 일어난 다툼으로 양측 부모가 대립하여 수개월간 진술서와 증거 정리에 시달렸습니다.",
        apply: (game) => {
          game.stress += 16; game.health = Math.max(0, game.health - 4);
          return "학폭위 서류 작업과 분쟁 중재로 기력이 소진되었습니다. (스트레스 +16, 건강 -4)";
        }
      }
    ],
    worst: [
      {
        tier: "최악의 뉴스",
        title: "🚨 정당한 생활지도에 대한 아동학대 무고 고소 피소 사건",
        desc: "수업을 방해하는 학생을 훈계했다가 학부모로부터 무리한 형사 고소를 당해 경찰 조사를 받게 되었습니다.",
        apply: (game) => {
          game.stress += 30; game.happiness = Math.max(0, game.happiness - 20); game.reputation = Math.max(0, game.reputation - 10);
          return "교권보호위원회 소집과 변호사 선임으로 큰 트라우마를 겪었습니다. (스트레스 +30, 행복 -20, 평판 -10)";
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
          return `용감한 간호사 포상금 ${won(bonus)}과 특별 승진 가점을 받았습니다! (평판 +15, 행복 +20)`;
        }
      }
    ],
    good: [
      {
        tier: "좋은 뉴스",
        title: "👶 신생아실 라운딩 중 초기 패혈증 조기 발견 감별",
        desc: "미세한 활력징후 변화를 예리하게 포착하여 위독해질 뻔한 아기의 골든타임을 지켜냈습니다.",
        apply: (game) => {
          game.reputation += 8; game.happiness += 10;
          return "소아과 과장님과 주치의로부터 절대적인 신뢰를 얻었습니다. (평판 +8, 행복 +10)";
        }
      },
      {
        tier: "좋은 뉴스",
        title: "🏥 나이트 전담 수당 인상 및 유급 리프레시 휴가",
        desc: "간호 인력 처우 개선 협약으로 야간 수당이 대폭 인상되고 5일간의 포상 휴가를 받았습니다.",
        apply: (game, won) => {
          const bonus = 2500000;
          game.cash += bonus; game.stress = Math.max(0, game.stress - 12);
          return `처우 개선 격려금 ${won(bonus)}을 받고 푹 쉬었습니다. (스트레스 -12)`;
        }
      }
    ],
    normal: [
      {
        tier: "평범한 뉴스",
        title: "🍼 소아 예방접종 및 알레르기 반응 관찰 루틴",
        desc: "주사를 맞고 우는 아이들을 능숙하게 달래며 예방백신을 접종했습니다.",
        apply: (game) => {
          game.happiness += 3;
          return "사탕을 건네자 방긋 웃는 아이를 보며 보람을 느꼈습니다. (행복 +3)";
        }
      },
      {
        tier: "평범한 뉴스",
        title: "📋 3교대 인수인계 및 바이탈 체크 마감",
        desc: "인계 간호사에게 환아들의 수액 속도와 투약 기록을 인계했습니다.",
        apply: () => "특이사항 없이 깔끔하게 칼퇴근에 성공했습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "🧸 소아 병동 크리스마스 캐릭터 코스튬 행사",
        desc: "입원한 아이들을 위해 삐에로 모자를 쓰고 작은 선물을 나누어 주었습니다.",
        apply: (game) => {
          game.happiness += 5;
          return "환아들과 보호자들의 얼굴에 웃음꽃이 피었습니다. (행복 +5)";
        }
      },
      {
        tier: "평범한 뉴스",
        title: "💉 정기 감염관리 및 소독 멸균 검사 통과",
        desc: "소아과 병동 내 환경 검체 검사에서 무균 상태 100점을 받았습니다.",
        apply: () => "원내 감염 제로를 유지했습니다."
      }
    ],
    bad: [
      {
        tier: "나쁜 뉴스",
        title: "🩸 정맥 주사 혈관을 한 번에 못 찾았다고 보호자의 고성 항의",
        desc: "탈수가 심해 혈관이 가라앉은 아기에게 주사를 놓다 보호자로부터 거친 폭언을 들었습니다.",
        apply: (game) => {
          game.stress += 14;
          return "죄송하다는 말을 반복하며 눈물을 삼켰습니다. (스트레스 +14)";
        }
      },
      {
        tier: "나쁜 뉴스",
        title: "🏥 소아청소년과 독감 대유행… 12시간 연속 화장실도 못 가고 격무",
        desc: "오픈런 대란으로 밀려드는 환아들로 인해 링거를 맞으며 일했습니다.",
        apply: (game) => {
          game.health = Math.max(0, game.health - 6); game.stress += 16;
          return "극심한 육체 피로로 몸살이 겹쳤습니다. (건강 -6, 스트레스 +16)";
        }
      }
    ],
    worst: [
      {
        tier: "최악의 뉴스",
        title: "🚨 투약 라벨 오류로 인한 니어미스(Near Miss) 사고 감사",
        desc: "바쁜 와중에 용량이 잘못 표기된 수액이 투약 직전 발견되어 병원 의료안전 감사를 받았습니다.",
        apply: (game) => {
          game.reputation = Math.max(0, game.reputation - 14); game.stress += 25;
          return "시말서 제출과 특별 안전교육 대상자로 지정되었습니다. (평판 -14, 스트레스 +25)";
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
        desc: "치과의사 학술대회에서 무치악 환자 전악 임플란트 수술을 완벽히 시연하여 전국적인 스타 원장으로 등극했습니다.",
        apply: (game, won) => {
          const bonus = 40000000;
          game.cash += bonus; game.reputation += 16; game.happiness += 20;
          return `고난도 환자 유입으로 비보험 수익 ${won(bonus)}을 창출했습니다! (평판 +16, 행복 +20)`;
        }
      }
    ],
    good: [
      {
        tier: "좋은 뉴스",
        title: "💎 투명 교정 및 치아 미백 환자 패키지 완판",
        desc: "방학 시즌을 맞아 기획한 심미 치과 프로그램이 대히트를 치며 매출이 급증했습니다.",
        apply: (game, won) => {
          const bonus = 15000000;
          game.cash += bonus; game.happiness += 10;
          return `분기 인센티브 ${won(bonus)}이 현금 지급되었습니다. (행복 +10)`;
        }
      },
      {
        tier: "좋은 뉴스",
        title: "🔬 최첨단 3D 구강 스캐너 및 CT 장비 전면 도입",
        desc: "본을 뜨는 번거로움 없이 디지털 스캔으로 오차 없는 보철물 제작이 가능해졌습니다.",
        apply: (game) => {
          game.reputation += 6; game.stress = Math.max(0, game.stress - 8);
          return "진료 효율성이 비약적으로 향상되었습니다. (평판 +6, 스트레스 -8)";
        }
      }
    ],
    normal: [
      {
        tier: "평범한 뉴스",
        title: "🦷 매복 사랑니 발치 3분 컷 완료",
        desc: "신경관에 바짝 붙은 고난도 하악 매복 사랑니를 단 3분 만에 깔끔하게 발치했습니다.",
        apply: (game) => {
          game.happiness += 4;
          return "환자가 연신 고마워했습니다. (행복 +4)";
        }
      },
      {
        tier: "평범한 뉴스",
        title: "📋 분기 치과 건강보험 청구액 승인 완료",
        desc: "스케일링과 근관치료(신경치료) 공단 청구 심사가 삭감 없이 통과되었습니다.",
        apply: () => "보험 삭감 0건으로 깔끔하게 정산되었습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "☕ 원내 스태프들과의 즐거운 점심 회식",
        desc: "진료팀 치위생사들과 함께 맛있는 파스타를 먹으며 팀워크를 다졌습니다.",
        apply: (game) => {
          game.stress = Math.max(0, game.stress - 4);
          return "병원 내 분위기가 화기애애해졌습니다. (스트레스 -4)";
        }
      },
      {
        tier: "평범한 뉴스",
        title: "📦 기공소 맞춤 지르코니아 크라운 정밀 장착",
        desc: "교합 조정 필요 없이 한 번에 완벽하게 들어맞는 보철물을 세팅했습니다.",
        apply: () => "환자가 편안한 교합에 만족했습니다."
      }
    ],
    bad: [
      {
        tier: "나쁜 뉴스",
        title: "⚠️ 신경치료 후 지속적인 통증 호소… 환자의 끈질긴 환불 요구",
        desc: "미세 근관의 잔류 염증으로 환자가 데스크에 찾아와 소리를 질렀습니다.",
        apply: (game) => {
          game.stress += 14; game.reputation = Math.max(0, game.reputation - 4);
          return "진료실 밖 고성으로 스트레스가 치솟았습니다. (스트레스 +14, 평판 -4)";
        }
      },
      {
        tier: "나쁜 뉴스",
        title: "📉 인근 기업형 덤핑 치과의 가격 파괴 공세",
        desc: "주변에 대형 네트워크 치과가 들어서며 출혈 마케팅으로 환자가 일시 감소했습니다.",
        apply: (game) => {
          game.stress += 12;
          return "병원 경영의 고충을 체감합니다. (스트레스 +12)";
        }
      }
    ],
    worst: [
      {
        tier: "최악의 뉴스",
        title: "🚨 임플란트 식립 중 신경 손상 의료분쟁",
        desc: "골질이 약한 환자의 수술 중 신경 마비 배상 분쟁이 발생하여 치과의사협회 공제회에 회부되었습니다.",
        apply: (game, won) => {
          const loss = 25000000;
          game.cash = Math.max(0, game.cash - loss); game.reputation = Math.max(0, game.reputation - 16); game.stress += 28;
          return `합의금 및 배상금으로 현금 ${won(loss)}이 지출되었습니다. (평판 -16, 스트레스 +28)`;
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
        desc: "6개월간의 끈질긴 위장 수사 끝에 조직원 40여 명을 전원 검거하여 1계급 특진의 영예를 안았습니다.",
        apply: (game) => {
          game.annualIncome += 4000000; game.reputation += 18; game.happiness += 22;
          return "경찰청 특진으로 연봉 400만원 인상 및 영웅이 되었습니다! (평판 +18, 행복 +22)";
        }
      }
    ],
    good: [
      {
        tier: "좋은 뉴스",
        title: "👶 실종된 치매 어르신 골든타임 내 CCTV 동선 추적으로 구조",
        desc: "영하의 날씨에 야산을 헤매던 실종자를 신속한 탐문과 드론 수색으로 무사히 가족에게 인계했습니다.",
        apply: (game) => {
          game.reputation += 10; game.happiness += 12;
          return "가족들이 지구대를 찾아와 눈물의 감사를 표했습니다. (평판 +10, 행복 +12)";
        }
      },
      {
        tier: "좋은 뉴스",
        title: "👮 범죄예방 우수 관서 선정 및 치안 포상금 수령",
        desc: "관내 5대 범죄 발생률을 전년 대비 30% 감소시켜 경찰서장 표창을 받았습니다.",
        apply: (game, won) => {
          const bonus = 1500000;
          game.cash += bonus; game.happiness += 8;
          return `치안 포상금 ${won(bonus)}을 수령했습니다. (행복 +8)`;
        }
      }
    ],
    normal: [
      {
        tier: "평범한 뉴스",
        title: "🚓 심야 취약지역 112 순찰차 거점 근무",
        desc: "원룸촌과 유흥가 골목길을 정속 순찰하며 범죄 예방 경광등을 켰습니다.",
        apply: () => "특이 사건 없이 안전하게 순찰 근무를 교대했습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "📝 음주운전 일제 단속 실시",
        desc: "주요 교차로에서 음주 단속을 벌여 안전한 교통 문화에 기여했습니다.",
        apply: (game) => {
          game.reputation += 2;
          return "교통 안전 확립에 기여했습니다. (평판 +2)";
        }
      },
      {
        tier: "평범한 뉴스",
        title: "☕ 팀원들과 지구대 야식 컵라면 타임",
        desc: "새벽 순찰 중간 꿀맛 같은 컵라면을 먹으며 동료들과 전우애를 다졌습니다.",
        apply: (game) => {
          game.stress = Math.max(0, game.stress - 3);
          return "따뜻한 국물에 피로를 녹였습니다. (스트레스 -3)";
        }
      },
      {
        tier: "평범한 뉴스",
        title: "📋 사건 송치 서류 검찰 전산 등록 마감",
        desc: "단순 절도 및 폭행 피의자 신문 조서를 꼼꼼히 검토해 송치했습니다.",
        apply: () => "서류 반려 없이 송치가 수리되었습니다."
      }
    ],
    bad: [
      {
        tier: "나쁜 뉴스",
        title: "🥊 주취 난동자 제압 중 옷이 찢기고 욕설 세례",
        desc: "지구대 안에서 행패를 부리는 만취자를 분리하려다 멱살을 잡히고 폭언을 당했습니다.",
        apply: (game) => {
          game.stress += 14;
          return "자괴감과 함께 깊은 스트레스를 받았습니다. (스트레스 +14)";
        }
      },
      {
        tier: "나쁜 뉴스",
        title: "🏃 흉기 난동범 추격전 중 넘어져 무릎 인대 타박상",
        desc: "도주하던 절도범을 몸을 던져 덮치다 아스팔트에 무릎을 다쳤습니다.",
        apply: (game) => {
          game.health = Math.max(0, game.health - 6); game.stress += 10;
          return "다리를 절뚝이며 병원 치료를 받았습니다. (건강 -6, 스트레스 +10)";
        }
      }
    ],
    worst: [
      {
        tier: "최악의 뉴스",
        title: "🚨 정당방위 물리력 행사 과잉진압 논란으로 청문감사관실 감찰",
        desc: "난동범 제압 과정이 왜곡 편집되어 SNS에 퍼지며 직무정지 처분을 받았습니다.",
        apply: (game) => {
          game.reputation = Math.max(0, game.reputation - 18); game.stress += 28; game.happiness = Math.max(0, game.happiness - 15);
          return "여론의 뭇매와 감찰 조사로 최대의 시련을 겪었습니다. (평판 -18, 스트레스 +28, 행복 -15)";
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
        title: "🚒 대형 아파트 화재 독가스 뚫고 일가족 4명 전원 구조… '영웅 소방관' 선정!",
        desc: "시야 제로의 농연 속에서 마스크를 양보하며 아이를 품에 안고 탈출했습니다.",
        apply: (game, won) => {
          const bonus = 15000000;
          game.cash += bonus; game.reputation += 20; game.happiness += 25;
          return `소방영웅 포상금 ${won(bonus)}과 찬사를 받았습니다! (평판 +20, 행복 +25)`;
        }
      }
    ],
    good: [
      {
        tier: "좋은 뉴스",
        title: "🎖️ 전국 소방기술경연대회 최강소방관 분야 1위 입상",
        desc: "호스 전개, 중량물 운반, 타워 등반 등 극한의 체력 검정에서 압도적 기록을 세웠습니다.",
        apply: (game) => {
          game.reputation += 10; game.health += 5; game.happiness += 10;
          return "강철 체력을 입증하며 메달을 목에 걸었습니다. (평판 +10, 건강 +5, 행복 +10)";
        }
      },
      {
        tier: "좋은 뉴스",
        title: "🛡️ 신형 첨단 방화복 및 열화상 카메라 전원 보급",
        desc: "가볍고 내열성이 우수한 최고급 특수 화재진압 장비가 지급되었습니다.",
        apply: (game) => {
          game.stress = Math.max(0, game.stress - 10);
          return "현장 안전성이 높아져 든든함을 느낍니다. (스트레스 -10)";
        }
      }
    ],
    normal: [
      {
        tier: "평범한 뉴스",
        title: "🚒 소방 펌프차 및 장비 일일 정기 점검",
        desc: "사이렌과 방수포, 유압 절단기 작동 상태를 꼼꼼히 정비했습니다.",
        apply: () => "출동 태세를 완벽하게 유지했습니다."
      },
      {
        tier: "평범한 뉴스",
        title: "🐱 높은 나무 위 고립된 아기 고양이 안전 구조",
        desc: "동물 구조 생활안전 출동을 나가 다친 곳 없이 고양이를 구조했습니다.",
        apply: (game) => {
          game.happiness += 4;
          return "시민들이 박수를 치며 감사를 표했습니다. (행복 +4)";
        }
      },
      {
        tier: "평범한 뉴스",
        title: "🏢 관내 초등학교 소방안전 및 CPR 교육",
        desc: "아이들에게 소화기 사용법과 마네킹을 활용한 흉부 압박을 가르쳤습니다.",
        apply: (game) => {
          game.reputation += 2;
          return "아이들의 눈망울에 뿌듯함을 느꼈습니다. (평판 +2)";
        }
      },
      {
        tier: "평범한 뉴스",
        title: "🍲 출동 복귀 후 센터 동료들과 뜨끈한 김치찌개 식사",
        desc: "화재 진압 후 귀소하여 동료들과 든든한 밥을 먹었습니다.",
        apply: () => "평온한 당직 루틴을 이어갑니다."
      }
    ],
    bad: [
      {
        tier: "나쁜 뉴스",
        title: "📞 술 취한 사람의 상습 허위 장난 신고 출동",
        desc: "화재 비상벨이 울려 긴급 출동했으나 술주정으로 비상벨을 누른 것으로 밝혀졌습니다.",
        apply: (game) => {
          game.stress += 12;
          return "낭비된 출동력에 깊은 한숨이 나왔습니다. (스트레스 +12)";
        }
      },
      {
        tier: "나쁜 뉴스",
        title: "🔥 강풍 타고 번진 산불 진화 24시간 사투",
        desc: "무거운 등짐펌프를 메고 험준한 산을 오르며 잔불을 끄느라 탈진했습니다.",
        apply: (game) => {
          game.health = Math.max(0, game.health - 8); game.stress += 14;
          return "연기를 많이 마셔 목이 칼칼합니다. (건강 -8, 스트레스 +14)";
        }
      }
    ],
    worst: [
      {
        tier: "최악의 뉴스",
        title: "🚨 붕괴 잔해물에 갇혀 순직할 뻔한 탈출… 외상후스트레스(PTSD)",
        desc: "공장 화재 현장에서 천장이 무너져 매몰되었다가 동료들에게 가까스로 구조되었습니다.",
        apply: (game) => {
          game.health = Math.max(0, game.health - 12); game.stress += 30; game.happiness = Math.max(0, game.happiness - 15);
          return "트라우마 치료를 받게 되었습니다. (건강 -12, 스트레스 +30, 행복 -15)";
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
          return `인센티브 ${won(bonus)}이 통장에 꽂혔습니다! (평판 +18, 행복 +25)`;
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
          return "글로벌 네트워크를 다지며 출장을 마쳤습니다. (평판 +6, 행복 +8)";
        }
      }
    ],
    normal: [
      {
        tier: "평범한 뉴스",
        title: "📊 블룸버그 터미널 실시간 차트 분석 및 리밸런싱",
        desc: "외환 시장과 금리 움직임을 체크하며 펀드 내 비중을 미세 조정했습니다.",
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
      }
    ],
    bad: [
      {
        tier: "나쁜 뉴스",
        title: "⚠️ 편입 핵심 성장주의 어닝 쇼크로 펀드 급락",
        desc: "기대주가 적자 전환을 발표하며 펀드 가치가 하루 만에 주저앉았습니다.",
        apply: (game) => {
          game.stress += 16; game.reputation = Math.max(0, game.reputation - 4);
          return "손절매를 진행하며 뼈아픈 손실을 기록했습니다. (스트레스 +16, 평판 -4)";
        }
      },
      {
        tier: "나쁜 뉴스",
        title: "📞 거액 법인 고객의 원금 손실 고성 환매 요청",
        desc: "시장 조정으로 불안해진 VIP 고객이 전액 환매하겠다며 위탁 취소를 통보했습니다.",
        apply: (game) => {
          game.stress += 14;
          return "설득하느라 진이 빠졌습니다. (스트레스 +14)";
        }
      }
    ],
    worst: [
      {
        tier: "최악의 뉴스",
        title: "🚨 미공개 정보 이용 의혹 금융감독원 긴급 압수수색 조사",
        desc: "과거 블록딜 거래와 관련해 불공정거래 혐의로 자격 정지 위기에 놓였습니다.",
        apply: (game) => {
          game.reputation = Math.max(0, game.reputation - 20); game.stress += 30; game.happiness = Math.max(0, game.happiness - 20);
          return "금감원 대질 조사로 커리어에 큰 타격을 입었습니다. (평판 -20, 스트레스 +30, 행복 -20)";
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
          return `연구개발 포상금 ${won(bonus)}을 수령했습니다! (평판 +18, 행복 +22)`;
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
          return "연구위원 승급 유력 후보로 부상했습니다. (평판 +12, 행복 +10)";
        }
      },
      {
        tier: "좋은 뉴스",
        title: "🛡️ 초순수 클린룸 신규 R&D 라인 준공 및 개인 연구실 배정",
        desc: "최첨단 전자현미경이 구비된 단독 연구 부스가 배정되었습니다.",
        apply: (game) => {
          game.happiness += 8; game.stress = Math.max(0, game.stress - 6);
          return "최고의 연구 환경이 갖춰졌습니다. (행복 +8, 스트레스 -6)";
        }
      }
    ],
    normal: [
      {
        tier: "평범한 뉴스",
        title: "🥽 방진복 착용 및 300mm 웨이퍼 샘플 계측",
        desc: "클린룸에 입실해 원자층 증착(ALD) 박막 두께를 오차 없이 측정했습니다.",
        apply: () => "원하는 두께 프로파일을 정확히 얻었습니다."
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
        desc: "AI 모델로 최적 공정 레시피를 도출해 실험 시간을 단축했습니다.",
        apply: (game) => {
          game.reputation += 2;
          return "실험 효율을 높였습니다. (평판 +2)";
        }
      },
      {
        tier: "평범한 뉴스",
        title: "📝 국내외 반도체 선행 특허 방어 출원",
        desc: "경쟁사의 우회 침해를 차단하는 촘촘한 특허망을 구축했습니다.",
        apply: () => "특허청 우선심사 신청을 마쳤습니다."
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
          return "수면 부족으로 피로가 쌓였습니다. (스트레스 +16, 건강 -5)";
        }
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
          return `성과급 및 격려금 ${won(bonus)}이 현금 입금되었습니다! (행복 +18, 평판 +10)`;
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
          return `휴가비 ${won(pay)}을 받고 푹 쉬다 왔습니다. (행복 +12, 스트레스 -12)`;
        }
      }
    ],
    normal: [
      {
        tier: "평범한 뉴스",
        title: "⚙️ 조립 라인 볼트 체결 토크 100% 규격 준수",
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
          return "퇴근길 정형외과 물리치료를 받았습니다. (건강 -6, 스트레스 +12)";
        }
      }
    ],
    worst: [
      {
        tier: "최악의 뉴스",
        title: "🚨 조립 불량 누락으로 수출 선적 500대 리콜 사태 발생",
        desc: "소속 파트의 센서 배선 오조립이 원인이 되어 품질 감사가 착수되었습니다.",
        apply: (game) => {
          game.reputation = Math.max(0, game.reputation - 16); game.stress += 26; game.happiness = Math.max(0, game.happiness - 12);
          return "감봉 조치 위기로 자존심에 큰 상처를 입었습니다. (평판 -16, 스트레스 +26, 행복 -12)";
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
          return `성공 보수 및 파트너 배당금 ${won(bonus)}이 전액 입금되었습니다! (평판 +20, 행복 +25)`;
        }
      }
    ],
    good: [
      {
        tier: "좋은 뉴스",
        title: "📑 수백억 원대 기업 조세불복 소송 완전 승소 이끌어내",
        desc: "부당한 과세 처분을 논리정연한 판례로 뒤집어 환급을 안겨주었습니다.",
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
      }
    ],
    bad: [
      {
        tier: "나쁜 뉴스",
        title: "📑 3주 연속 새벽 3시 퇴근… 감사 보고서 마감 지옥",
        desc: "제출 기일과 감사 시즌이 겹쳐 사무실 소파에서 쪽잠을 잤습니다.",
        apply: (game) => {
          game.health = Math.max(0, game.health - 6); game.stress += 16;
          return "카페인 과다 복용과 수면 부족으로 지쳤습니다. (건강 -6, 스트레스 +16)";
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
          return `소송 대응비 및 합의금으로 ${won(loss)}이 빠져나갔습니다. (평판 -20, 스트레스 +30)`;
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
          return `한정판 특별 격려금 ${won(bonus)}을 수령했습니다! (행복 +18, 평판 +10)`;
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
          return "동료들과 회포를 풀었습니다. (행복 +8, 스트레스 -8)";
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
      }
    ],
    worst: [
      {
        tier: "최악의 뉴스",
        title: "🚨 밑창 압착기 오작동 손가락 골절 산재 사고 발생",
        desc: "프레스 센서 불량으로 손을 심하게 다쳐 수개월간 수술과 치료를 받게 되었습니다.",
        apply: (game) => {
          game.health = Math.max(0, game.health - 15); game.stress += 26; game.happiness = Math.max(0, game.happiness - 15);
          return "손가락 골절로 당분간 일할 수 없게 되었습니다. (건강 -15, 스트레스 +26, 행복 -15)";
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
          return `CF 및 영화 러닝 개런티 ${won(bonus)} 입금! 연봉 1억 추가 상승! (평판 +25, 행복 +30)`;
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
          return `신규 광고 계약금 ${won(bonus)}을 수령했습니다. (평판 +12, 행복 +15)`;
        }
      },
      {
        tier: "좋은 뉴스",
        title: "☕ 팬클럽의 감동적인 드라마 촬영장 커피차 서포트",
        desc: "촬영장 동료 배우와 스태프들에게 수제 도시락과 커피차가 전달되었습니다.",
        apply: (game) => {
          game.happiness += 10; game.stress = Math.max(0, game.stress - 10);
          return "팬들의 사랑에 어깨가 으쓱해졌습니다. (행복 +10, 스트레스 -10)";
        }
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
      }
    ],
    bad: [
      {
        tier: "나쁜 뉴스",
        title: "⚠️ 악의적인 왜곡 찌라시 영상 확산",
        desc: "사이버 렉카 유튜버가 허위 열애설과 인성 조작 영상을 퍼뜨렸습니다.",
        apply: (game) => {
          game.stress += 18; game.reputation = Math.max(0, game.reputation - 6);
          return "고소장을 접수하며 속이 타들어갔습니다. (스트레스 +18, 평판 -6)";
        }
      },
      {
        tier: "나쁜 뉴스",
        title: "📉 야심 차게 들어간 드라마 첫 주 시청률 1%대 부진",
        desc: "혹평이 쏟아지며 조기 종영 위기에 처했습니다.",
        apply: (game) => {
          game.stress += 15; game.happiness = Math.max(0, game.happiness - 10);
          return "자신감이 바닥을 치며 우울한 나날을 보냈습니다. (스트레스 +15, 행복 -10)";
        }
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
          return `대박 순이익 ${won(bonus)}을 현금 금고에 넣었습니다! (행복 +20, 평판 +10)`;
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
          return "안정적인 매출 기반이 확보되었습니다. (행복 +8, 스트레스 -6)";
        }
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
      }
    ],
    bad: [
      {
        tier: "나쁜 뉴스",
        title: "⚠️ 배달 지연으로 치킨 식어 도착… 악성 1점 리뷰",
        desc: "비 오는 날 배달 기사가 잡히지 않아 고객의 별점 테러를 받았습니다.",
        apply: (game) => {
          game.stress += 14; game.reputation = Math.max(0, game.reputation - 3);
          return "배달앱에 사과글을 남기며 속상해했습니다. (스트레스 +14, 평판 -3)";
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
          return `적자 누적으로 비상금 ${won(loss)}을 메워 넣었습니다. (스트레스 +28, 행복 -15)`;
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
          return "부모님과 얼싸안고 눈물을 흘렸습니다! (행복 +35, 스트레스 -30, 평판 +15)";
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
          return "서류 스펙 깡패로 거듭났습니다. (평판 +8, 행복 +8)";
        }
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
      }
    ],
    bad: [
      {
        tier: "나쁜 뉴스",
        title: "⚠️ 기대했던 중견기업 서류 전형 불합격 통보",
        desc: "정성 들여 작성한 지원서가 서류 심사에서 탈락하며 불합격 문자를 받았습니다.",
        apply: (game) => {
          game.stress += 14; game.happiness = Math.max(0, game.happiness - 8);
          return "자존감이 깎이고 씁쓸한 밤을 보냈습니다. (스트레스 +14, 행복 -8)";
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
          return `사기 피해로 피 같은 돈 ${won(loss)}을 날렸습니다. (스트레스 +30, 행복 -20)`;
        }
      }
    ]
  }
};

/**
 * 확률 엔진에 따라 직업별 뉴스를 엄격하게 추첨하는 유틸리티
 * - 매우 좋은 뉴스 (5%) : 0.00 <= r < 0.05
 * - 좋은 뉴스     (15%): 0.05 <= r < 0.20
 * - 평범한 뉴스   (60%): 0.20 <= r < 0.80
 * - 나쁜 뉴스     (15%): 0.80 <= r < 0.95
 * - 최악의 뉴스   (5%) : 0.95 <= r < 1.00
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

  // 카테고리 내 무작위 1개 선택
  return categoryList[Math.floor(Math.random() * categoryList.length)];
}