/* ==========================================================================
   [MY LIFE] 정적 데이터 및 상수 설정 (data.js)
   - 직업 목록, 부동산 규격, 주식 테마, 계절 등의 기초 데이터
   ========================================================================== */

const SAVE_KEY = "myLifePrototype_v48";
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

// [업데이트] 주식 테마 이벤트에 minAge와 maxAge 조건을 추가하여 연령대(시대)별 뉴스가 다르게 나오도록 구현
const THEME_EVENTS = [
  // ===================== [현재 ~ 35세: 동시대적 뉴스] =====================
  { minAge: 20, maxAge: 35, up: "IT", down: "COMM", title: "애플 차세대 비전 프로 초도 물량 완판", desc: "공간 컴퓨팅 기기 돌풍으로 IT 섹터가 급등한 반면, 기존 모바일 기반 SNS 커뮤니케이션 플랫폼들은 체류 시간 감소 우려로 타격을 받았습니다." },
  { minAge: 20, maxAge: 35, up: "IT", down: "CDIS", title: "삼성전자 6세대 HBM 독점 공급 체결", desc: "반도체 슈퍼 사이클 기대감에 자금이 몰리며, 할부 금리 부담이 커진 자동차 등 내구 소비재 섹터는 매도세를 맞았습니다." },
  { minAge: 20, maxAge: 35, up: "IT", down: "CSTP", title: "엔비디아 차세대 AI 슈퍼칩 글로벌 품귀", desc: "AI 인프라 확충에 천문학적 자본이 집중되며, 방어주 성격의 필수소비재 기업들로부터 대규모 자금 이탈이 발생했습니다." },
  { minAge: 20, maxAge: 35, up: "IT", down: "HLTH", title: "SK하이닉스 차세대 AI 메모리 수율 100% 달성", desc: "글로벌 빅테크의 러브콜이 쏟아지며, 임상 지연 리스크가 부각된 제약/바이오 섹터의 투자금을 완벽히 흡수했습니다." },
  { minAge: 20, maxAge: 35, up: "COMM", down: "CDIS", title: "구글 생성형 AI 검색 완전 상용화", desc: "광고 수익 모델의 혁신적 진화로 주가가 급등했으며, 인플레이션 여파로 임의소비재는 판매 부진을 겪고 있습니다." },
  { minAge: 20, maxAge: 35, up: "COMM", down: "CSTP", title: "메타 가상 오피스 글로벌 점유율 1위", desc: "가상현실 플랫폼 생태계 확장에 성공하며, 실적 정체에 빠진 전통 필수소비재 식음료 기업들을 압도했습니다." },
  { minAge: 20, maxAge: 35, up: "COMM", down: "HLTH", title: "넷플릭스 글로벌 구독자 5억 명 돌파", desc: "압도적인 IP 수익화로 미디어 엔터주가 랠리한 반면, 글로벌 신약 규제 강화로 헬스케어 투자는 얼어붙었습니다." },
  { minAge: 20, maxAge: 35, up: "COMM", down: "FIN", title: "네이버 하이퍼클로바 B2B 솔루션 아시아 석권", desc: "AI 결합 플랫폼 비즈니스가 폭발적으로 성장하며, 핀테크에 밀려 예대마진이 감소한 전통 금융주를 압박했습니다." },
  { minAge: 20, maxAge: 35, up: "CDIS", down: "CSTP", title: "아마존 무인 드론 배송망 전미 확대", desc: "압도적인 유통 물류 혁신으로 시장을 장악하며, 오프라인 기반 전통 대형 마트들의 실적이 급감했습니다." },
  { minAge: 20, maxAge: 35, up: "CDIS", down: "HLTH", title: "테슬라 완전 자율주행(FSD) 로보택시 전격 승인", desc: "모빌리티 혁명 기대감에 매수세가 폭발한 반면, 천문학적 R&D 비용 부담을 맞은 헬스케어 섹터는 부진했습니다." },
  { minAge: 20, maxAge: 35, up: "CDIS", down: "FIN", title: "현대자동차 차세대 수소 전기차 초격차 기술 발표", desc: "글로벌 점유율 확대와 이익률 최고치 달성으로, 부실 대출 연체율이 증가한 금융 섹터와 극명한 대조를 이뤘습니다." },
  { minAge: 20, maxAge: 35, up: "CDIS", down: "IND", title: "LVMH 초고가 한정판 아시아 전역 완판", desc: "초고액 자산가들의 보복 소비로 명품 실적이 치솟은 반면, 원자재가 폭등으로 방산/제조업은 수익성 악화에 빠졌습니다." },
  { minAge: 20, maxAge: 35, up: "CSTP", down: "HLTH", title: "P&G 생필품 글로벌 마진율 역대 최고치 경신", desc: "경기 침체기 방어주로서의 독보적 위상을 증명한 반면, 신약 임상 실패가 겹친 헬스케어는 폭락했습니다." },
  { minAge: 20, maxAge: 35, up: "CSTP", down: "FIN", title: "코카콜라 헬스&웰니스 신제품 전 세계 열풍", desc: "강력한 브랜드 파워와 현금 창출력으로, 기준금리 인하기를 맞아 순이자마진이 축소된 은행주를 가볍게 압도했습니다." },
  { minAge: 20, maxAge: 35, up: "CSTP", down: "IND", title: "월마트 초저가 PB 상품 매출 300% 폭증", desc: "가성비 중심의 실속형 소비 트렌드가 유통망을 휩쓴 반면, 대규모 설비 투자가 필요한 중공업은 자금 조달에 실패했습니다." },
  { minAge: 20, maxAge: 35, up: "CSTP", down: "UTIL", title: "CJ제일제당 K-푸드 글로벌 매출 10조 돌파", desc: "가공식품의 글로벌 대성공으로 급등한 반면, 원가 상승분을 요금에 반영하지 못한 공공 유틸리티는 적자 전환했습니다." },
  { minAge: 20, maxAge: 35, up: "HLTH", down: "FIN", title: "일라이릴리 기적의 비만 신약 FDA 최종 승인", desc: "글로벌 블록버스터 신약 출시에 전 세계 투자금이 몰려, 부동산 PF 부실 사태가 터진 금융업을 소외시켰습니다." },
  { minAge: 20, maxAge: 35, up: "HLTH", down: "IND", title: "유나이티드헬스그룹 AI 원격 의료 네트워크 완성", desc: "헬스케어 효율화로 사상 최대 흑자를 기록하며, 항공/보잉 등 전통 제조업의 실적 부진과 극명히 대비되었습니다." },
  { minAge: 20, maxAge: 35, up: "HLTH", down: "UTIL", title: "존슨앤드존슨 메가 파마 초대형 인수합병 발표", desc: "막강한 자금력으로 바이오 시장 파이를 키운 반면, 요금 인상에 실패한 전력 및 가스 공기업들은 일제히 하락했습니다." },
  { minAge: 20, maxAge: 35, up: "HLTH", down: "MATR", title: "삼성바이오로직스 제6공장 풀가동 및 CMO 싹쓸이", desc: "수출 대박으로 랠리를 주도한 반면, 화학/철강 등 전통 첨단소재 산업은 글로벌 판가 하락으로 타격받았습니다." },
  { minAge: 20, maxAge: 35, up: "FIN", down: "IND", title: "버크셔 해서웨이 대규모 금융주 매수", desc: "투자의 귀재가 선택한 가치주로 유동성이 집중되며, 수주 가뭄에 시달리는 산업재 섹터는 하락장으로 접어들었습니다." },
  { minAge: 20, maxAge: 35, up: "FIN", down: "UTIL", title: "JP모건 글로벌 IB 부문 사상 최대 투자 수익", desc: "글로벌 금리 안정화 속 압도적인 자본력으로 시장을 선도하며, 과도한 부채율을 겪는 유틸리티를 억눌렀습니다." },
  { minAge: 20, maxAge: 35, up: "FIN", down: "MATR", title: "비자 크로스보더 해외 결제 수수료 대폭 인상", desc: "막강한 결제망 독점으로 영업이익률이 치솟은 반면, 원료 조달 비용이 폭등한 첨단소재 기업들은 대규모 적자를 냈습니다." },
  { minAge: 20, maxAge: 35, up: "FIN", down: "ENGY", title: "KB금융지주 파격적 주주환원율 50% 발표", desc: "고배당 매력에 글로벌 패시브 자금이 쏟아지며, 국제 유가 하락으로 정제마진이 급감한 정유주에서 자금이 이탈했습니다." },
  { minAge: 20, maxAge: 35, up: "IND", down: "UTIL", title: "보잉 차세대 친환경 항공기 2,000대 수주 잭팟", desc: "글로벌 운송/물류 정상화로 방산/항공이 급등한 반면, 설비 노후화 보수에 막대한 비용이 드는 유틸리티는 급락했습니다." },
  { minAge: 20, maxAge: 35, up: "IND", down: "MATR", title: "캐터필러 대규모 글로벌 재건 인프라 사업 독점", desc: "중장비 수출이 폭발적으로 늘어나며, 리튬/니켈 등 핵심 광물가 하락으로 신음하는 소재주를 거뜬히 앞질렀습니다." },
  { minAge: 20, maxAge: 35, up: "IND", down: "ENGY", title: "록히드마틴 6세대 전투기 국방부 독점 계약", desc: "신냉전 시대 자주국방 테마로 폭등했으며, 산유국 증산 합의로 마진이 붕괴된 에너지 섹터와 대조되었습니다." },
  { minAge: 20, maxAge: 35, up: "IND", down: "REST", title: "HD현대중공업 친환경 스마트 선박 건조 싹쓸이", desc: "조선업 슈퍼 사이클 진입으로 흑자 폭발을 이뤘으나, 대출 금리 상승 여파로 상업용 부동산/리츠 시장은 공실률이 급증했습니다." },
  { minAge: 20, maxAge: 35, up: "UTIL", down: "MATR", title: "넥스트에라 에너지 태양광 발전 단가 최저치 달성", desc: "신재생 에너지 인프라 수익성이 극대화되며, 환경 규제 철퇴를 맞은 전통 화학 소재 기업들을 완벽히 압도했습니다." },
  { minAge: 20, maxAge: 35, up: "UTIL", down: "ENGY", title: "듀크 에너지 전력망 현대화 조 단위 지원금 수령", desc: "안정적 관급 공사와 배당 매력이 부각된 반면, 대체 에너지 부상으로 화석 연료 중심의 정유주들은 폭락했습니다." },
  { minAge: 20, maxAge: 35, up: "UTIL", down: "REST", title: "한국전력공사 전기요금 전면 현실화 및 흑자 전환", desc: "적자를 해소하고 정상화에 돌입하며, 자금 조달에 실패해 배당을 컷한 상업용 부동산 섹터의 잉여 자금을 흡수했습니다." },
  { minAge: 20, maxAge: 35, up: "UTIL", down: "IT", title: "한국가스공사 동해 심해 가스전 상업 생산 가시화", desc: "자원 독립 기대감에 인프라 관련주가 상한가를 친 반면, 고평가 버블론이 불거진 IT/반도체 섹터는 차익 매물이 쏟아졌습니다." },
  { minAge: 20, maxAge: 35, up: "MATR", down: "ENGY", title: "린데 차세대 수소 액화 플랜트 전 세계 독점 계약", desc: "미래 첨단소재 가스 공급권을 쥐며 폭등한 반면, 친환경 전환에 뒤처진 전통 에너지 원유 기업들은 하락세를 탔습니다." },
  { minAge: 20, maxAge: 35, up: "MATR", down: "REST", title: "듀폰 차세대 초전도체 융합 소재 상용화 성공", desc: "산업 생태계를 바꿀 핵심 소재 개발로 자본이 집중되며, 유지보수 비용이 급증한 노후 상업용 리츠 시장은 붕괴 위기입니다." },
  { minAge: 20, maxAge: 35, up: "MATR", down: "IT", title: "LG화학 2차전지 전고체 배터리 소재 양산 대성공", desc: "주행거리 1,000km를 달성한 핵심 소재에 자금이 몰린 반면, 스마트폰 교체 주기 장기화로 기존 IT 하드웨어는 급락했습니다." },
  { minAge: 20, maxAge: 35, up: "MATR", down: "COMM", title: "포스코홀딩스 아르헨티나 리튬 염호 생산량 10배 폭증", desc: "하얀 석유 불리는 리튬 잭팟으로 기업 가치가 재평가되며, 메타버스 투자 실패로 적자가 눈덩이인 플랫폼을 소외시켰습니다." },
  { minAge: 20, maxAge: 35, up: "ENGY", down: "REST", title: "엑슨모빌 남미 심해 광구 초대형 유전 발견", desc: "사상 최대 특별 배당을 발표하며, 고금리 직격탄을 맞아 자금난에 빠진 상업용 부동산 투자금을 모두 빨아들였습니다." },
  { minAge: 20, maxAge: 35, up: "ENGY", down: "IT", title: "셰브론 글로벌 LNG 장기 공급망 싹쓸이 계약", desc: "천연가스 수요 폭발로 에너지 공룡들의 이익이 치솟은 반면, 전력비 급등으로 데이터센터 운영난에 빠진 IT 기업들은 적자 전환했습니다." },
  { minAge: 20, maxAge: 35, up: "ENGY", down: "COMM", title: "옥시덴탈 셰일가스 채산성 극대화 및 대량 매집", desc: "현금 창출력의 끝판왕으로 랠리를 주도했고, 반독점 플랫폼 규제 악재를 맞은 커뮤니케이션 주식들은 바닥을 쳤습니다." },
  { minAge: 20, maxAge: 35, up: "ENGY", down: "CDIS", title: "SK이노베이션 정제마진 슈퍼 사이클 겹호황", desc: "유가 급등으로 본업에서 조 단위 흑자를 기록하며, 연료비 폭탄을 맞아 운송 마진이 붕괴된 모빌리티/소비재를 압도했습니다." },
  { minAge: 20, maxAge: 35, up: "REST", down: "IT", title: "프로로지스 글로벌 AI 전용 물류센터 임대료 최고치", desc: "첨단 풀필먼트 부동산 가치가 폭등하며 배당이 늘어난 반면, 하드웨어 재고 과잉을 겪는 전통 IT 부품주는 매도 폭탄을 맞았습니다." },
  { minAge: 20, maxAge: 35, up: "REST", down: "COMM", title: "아메리칸 타워 6G 통신망 철탑 독점 임대 계약", desc: "통신사들의 기지국 임대 수요 폭발로 리츠 수익성이 극대화되며, 망 사용료 인상 압박을 받는 미디어/플랫폼은 폭락했습니다." },
  { minAge: 20, maxAge: 35, up: "REST", down: "CDIS", title: "리얼티 인컴 월배당 귀족주 부각 및 상권 싹쓸이", desc: "경기 방어 능력을 증명하며 대규모 자금이 쏟아진 반면, 소비 심리 위축으로 자동차 및 명품 소비재들은 급락세입니다." },
  { minAge: 20, maxAge: 35, up: "REST", down: "CSTP", title: "맥쿼리인프라 주요 유료도로 통행료 인상 최종 승인", desc: "압도적인 현금 배당률로 기관 자금을 블랙홀처럼 흡수하며, 원가 상승을 판가에 전가하지 못한 필수식음료 섹터를 억눌렀습니다." },

  // ===================== [10년 후 가상 뉴스 (36~49세)] =====================
  { minAge: 36, maxAge: 49, up: "IT", down: "COMM", title: "애플 뇌-컴퓨터 직접 연결 BCI 칩 상용화 발표", desc: "생각만으로 제어하는 스마트 기기 혁명에 IT는 급등했으나, 타이핑 기반의 전통 커뮤니케이션 플랫폼은 퇴출 위기입니다." },
  { minAge: 36, maxAge: 49, up: "IT", down: "CDIS", title: "광자(Photonic) 반도체 상용화로 삼성전자 폭등", desc: "발열이 없는 빛 기반 반도체가 IT를 장악하며, 내연기관 중심의 구형 임의소비재는 판매량이 곤두박질쳤습니다." },
  { minAge: 36, maxAge: 49, up: "IT", down: "CSTP", title: "엔비디아 행성 단위 시뮬레이터 옴니버스 완성", desc: "가상 지구 렌더링에 전 세계 자본이 집중되며, 오프라인 필수소비재 기업의 투자가 완전히 메말랐습니다." },
  { minAge: 36, maxAge: 49, up: "IT", down: "HLTH", title: "양자 컴퓨터 암호 해독 성공... 사이버 보안 패러다임 전환", desc: "차세대 양자 보안 IT 기업들이 잭팟을 터뜨렸지만, R&D 데이터가 유출된 헬스케어 기업들은 주가가 반토막 났습니다." },
  { minAge: 36, maxAge: 49, up: "COMM", down: "CDIS", title: "구글 완벽한 실시간 동시통역 렌즈 전 세계 보급", desc: "언어 장벽이 무너지며 글로벌 통신 플랫폼이 랠리하는 반면, 실물 번역기 및 관련 기기 임의소비재는 몰락했습니다." },
  { minAge: 36, maxAge: 49, up: "COMM", down: "CSTP", title: "메타 완전 몰입형 뉴럴 가상현실 10억 명 돌파", desc: "가상세계에서의 삶이 현실을 대체하며 통신 인프라는 폭등했으나, 현실 생필품의 소비는 사상 최저치를 기록했습니다." },
  { minAge: 36, maxAge: 49, up: "COMM", down: "HLTH", title: "AI 에이전트 간의 자동 협업 통신 프로토콜 표준화", desc: "기계들 간의 막대한 통신망 수익이 커뮤니케이션을 끌어올렸으나, 전통적인 진단 헬스케어는 성장이 멈췄습니다." },
  { minAge: 36, maxAge: 49, up: "COMM", down: "FIN", title: "우주 저궤도 6G 위성 통신망 전 지구 덮었다", desc: "초연결 시대의 완성으로 통신 섹터가 하늘을 날았으나, 구형 핀테크에 머문 금융사들은 수익성이 크게 악화되었습니다." },
  { minAge: 36, maxAge: 49, up: "CDIS", down: "CSTP", title: "현대자동차 수직이착륙 도심항공(UAM) 상용 서비스 개시", desc: "하늘을 나는 택시가 일상이 되며 모빌리티 섹터가 폭발했고, 동네 상권을 기반으로 한 필수소비재는 직격탄을 맞았습니다." },
  { minAge: 36, maxAge: 49, up: "CDIS", down: "HLTH", title: "테슬라 옵티머스 휴머노이드 가사 도우미 로봇 완판", desc: "로봇이 집안일을 대체하는 임의소비재 혁명으로 매수세가 쏠린 반면, 고령화 약물 치료 중심의 헬스케어는 소외되었습니다." },
  { minAge: 36, maxAge: 49, up: "CDIS", down: "FIN", title: "아마존 전 세계 지하 하이퍼루프 물류망 가동", desc: "30분 내 전 세계 배송망이 구축되며 소비재가 폭등했지만, 천문학적 인프라 대출을 감당한 금융권은 부실 위험에 처했습니다." },
  { minAge: 36, maxAge: 49, up: "CDIS", down: "IND", title: "루이비통 등 명품 브랜드, 메타버스 NFT 의류 매출이 실물 추월", desc: "가상세계 명품 소비 폭발로 임의소비재가 잭팟을 터뜨렸고, 전통적인 오프라인 중공업과 산업재는 끝없는 침체를 겪습니다." },
  { minAge: 36, maxAge: 49, up: "CSTP", down: "HLTH", title: "월마트 로봇 농장 직배송 초저가 식량 공급망 완성", desc: "완전 자동화된 생필품 공급으로 필수소비재 마진이 극대화되었고, 임상 실패가 연이은 헬스케어는 투자금을 잃었습니다." },
  { minAge: 36, maxAge: 49, up: "CSTP", down: "FIN", title: "대체 단백질 및 합성 식육 전 세계 대중화 선언", desc: "기후 변화 속 대체 식품 기업들의 매출이 폭발했으나, 기존 축산업에 대규모 PF 대출을 해준 은행들은 파산 위기입니다." },
  { minAge: 36, maxAge: 49, up: "CSTP", down: "IND", title: "코카콜라 해수 담수화 생수 사업 글로벌 장악", desc: "물 부족 사태 속 필수 음료 기업이 패권을 쥔 반면, 수자원을 막대하게 소모하는 전통 제조업은 공장 가동이 중단되었습니다." },
  { minAge: 36, maxAge: 49, up: "CSTP", down: "UTIL", title: "가정용 초소형 스마트팜 가전 전 세계 보급 폭증", desc: "자급자족 생필품 가전의 인기로 소비재는 급등했지만, 중앙 공급식 공공 유틸리티 산업은 수요 감소로 적자를 기록합니다." },
  { minAge: 36, maxAge: 49, up: "HLTH", down: "FIN", title: "유전자 가위(CRISPR) 맞춤형 난치병 치료제 상용화", desc: "유전자 편집 기술의 기적적인 성공으로 헬스케어가 폭등했고, 막대한 보험금을 지급해야 하는 금융/보험 섹터는 폭락했습니다." },
  { minAge: 36, maxAge: 49, up: "HLTH", down: "IND", title: "일라이릴리 노화 세포 제거 '회춘 신약' 1상 통과", desc: "수명 연장이라는 인류의 꿈이 실현되며 바이오 섹터가 랠리를 탔고, 인력 노령화로 타격을 입은 전통 산업재는 무너졌습니다." },
  { minAge: 36, maxAge: 49, up: "HLTH", down: "UTIL", title: "삼성바이오 AI 결합 세포 배양 자동화 메가 팩토리 준공", desc: "바이오 생산의 혁명적 단가 인하로 제약주가 날아올랐으나, 고정 요금제에 묶인 전력 유틸리티는 인플레이션을 견디지 못했습니다." },
  { minAge: 36, maxAge: 49, up: "HLTH", down: "MATR", title: "나노 머신 혈관 청소 로봇 임상 최종 성공", desc: "첨단 의료 로봇 테마에 글로벌 자금이 쏠리며 헬스케어가 급등한 반면, 철강/화학 등 구형 핵심 소재는 환경 규제로 몰락했습니다." },
  { minAge: 36, maxAge: 49, up: "FIN", down: "IND", title: "JP모건 글로벌 중앙은행 디지털 화폐(CBDC) 결제망 독점", desc: "미래 금융 네트워크를 선점한 은행주들이 사상 최대 실적을 낸 반면, 낙후된 설비를 보유한 산업재는 자금 조달에 실패했습니다." },
  { minAge: 36, maxAge: 49, up: "FIN", down: "UTIL", title: "AI 알고리즘이 100% 운용하는 초대형 무인 펀드 탄생", desc: "인간을 초월한 수익률로 금융권에 엄청난 자본이 쏟아졌고, 반대로 규제에 묶인 유틸리티는 자본 유출을 겪고 있습니다." },
  { minAge: 36, maxAge: 49, up: "FIN", down: "MATR", title: "비자 우주 궤도 간 금융 결제 프로토콜 상용화", desc: "우주 시대 금융 인프라를 장악하며 핀테크가 급등했으나, 지구 내 광물 채굴에 얽매인 소재 기업들은 비전 부재로 급락했습니다." },
  { minAge: 36, maxAge: 49, up: "FIN", down: "ENGY", title: "글로벌 탄소 배출권 파생상품 시장 규모 1,000조원 돌파", desc: "탄소 금융이라는 새로운 패러다임이 금융 섹터를 밀어 올렸지만, 전통 화석 연료 정유주들은 거액의 탄소세로 멸망의 길을 걷습니다." },
  { minAge: 36, maxAge: 49, up: "IND", down: "UTIL", title: "보잉 및 록히드마틴 달 궤도 정거장 건설 독점 수주", desc: "우주 인프라 구축이라는 메가 프로젝트로 산업재가 폭등한 반면, 지구 내 노후 전력망 교체 비용을 떠안은 유틸리티는 파산 직전입니다." },
  { minAge: 36, maxAge: 49, up: "IND", down: "MATR", title: "HD현대중공업 완전 무인 자동화 조선소 가동", desc: "AI 로봇 군단이 배를 건조하며 방산/제조업의 이익률이 극대화되었고, 희토류 가격 폭락으로 화학/소재는 최악의 해를 맞았습니다." },
  { minAge: 36, maxAge: 49, up: "IND", down: "ENGY", title: "초거대 해상 부유식 친환경 산업단지 건설 붐", desc: "미래형 해상 도시 건설 특수로 중공업이 황금기를 맞이했으나, 해양 시추가 금지된 전통 원유 섹터는 완전히 붕괴되었습니다." },
  { minAge: 36, maxAge: 49, up: "IND", down: "REST", title: "우주 쓰레기 청소 궤도 로봇 위성 대규모 발사", desc: "신사업 궤도 진입 성공으로 항공우주 방산주가 폭등했고, 반대로 공실이 넘쳐나는 상업용 오피스 리츠는 폭락했습니다." },
  { minAge: 36, maxAge: 49, up: "UTIL", down: "MATR", title: "초전도 케이블 적용 글로벌 전력망 무손실 송전 성공", desc: "전력 유실 0% 달성으로 유틸리티의 마진이 사상 최대치를 기록했으며, 기존 구리 전선 소재를 생산하던 기업들은 직격탄을 맞았습니다." },
  { minAge: 36, maxAge: 49, up: "UTIL", down: "ENGY", title: "소형 모듈 원전(SMR) 전 세계 10,000기 건설 완료", desc: "값싸고 안전한 원자력 에너지가 세상을 뒤덮으며 유틸리티가 폭등했고, 시추 단가가 비싼 전통 정유주들은 줄도산 위기입니다." },
  { minAge: 36, maxAge: 49, up: "UTIL", down: "REST", title: "지열 및 파력 융합형 차세대 공공 발전망 흑자 전환", desc: "공공 유틸리티가 기술 혁신으로 캐시카우로 거듭난 반면, 도심 상업용 부동산 리츠는 재택근무 고착화로 텅 비었습니다." },
  { minAge: 36, maxAge: 49, up: "UTIL", down: "IT", title: "우주 태양광 위성 지구 직접 송전 시스템 가동", desc: "우주에서 에너지를 쏘아 보내는 기적의 인프라로 유틸리티가 상한가를 쳤고, 전력 소모가 극심한 기존 AI 하드웨어 기업들은 퇴출 수순입니다." },
  { minAge: 36, maxAge: 49, up: "MATR", down: "ENGY", title: "그래핀 상온 대량 양산 및 차세대 배터리 적용 성공", desc: "꿈의 신소재가 드디어 상용화되며 첨단 화학/소재가 랠리를 주도했고, 리튬 기반과 화석 연료 관련주들은 폭락장을 맞았습니다." },
  { minAge: 36, maxAge: 49, up: "MATR", down: "REST", title: "스스로 형태를 복원하는 형상기억 메타물질 개발", desc: "건축과 모빌리티를 혁신할 신소재가 각광받으며 자금이 몰린 반면, 노후된 전통 상업용 부동산 리츠는 감가상각으로 폭락했습니다." },
  { minAge: 36, maxAge: 49, up: "MATR", down: "IT", title: "양자 점(Quantum Dot) 기반 완전 친환경 광학 소재 대박", desc: "차세대 디스플레이 소재 독점으로 화학주가 폭등했으나, 기존 실리콘 기반 IT 부품주들은 대체재의 등장으로 줄하한가입니다." },
  { minAge: 36, maxAge: 49, up: "MATR", down: "COMM", title: "플라스틱 완전 분해 및 100% 재활용 화학 촉매 상용화", desc: "친환경 ESG 소재 잭팟으로 기업 가치가 치솟은 반면, 가상 현실 사용자 이탈로 커뮤니케이션 플랫폼은 바닥을 치고 있습니다." },
  { minAge: 36, maxAge: 49, up: "ENGY", down: "REST", title: "상업용 핵융합 발전소 최초 임계점 돌파 성공", desc: "인공 태양이 드디어 점화되며 차세대 에너지 기업들이 역대급 폭등을 기록했고, 에너지 효율이 나쁜 낡은 부동산 리츠는 버림받았습니다." },
  { minAge: 36, maxAge: 49, up: "ENGY", down: "IT", title: "심해 메탄 하이드레이트 안전 채굴 기술 상용화", desc: "불타는 얼음의 채굴 성공으로 에너지 공룡들이 부활한 반면, 서버 발열을 잡지 못한 구형 IT 데이터센터들은 막대한 손실을 냈습니다." },
  { minAge: 36, maxAge: 49, up: "ENGY", down: "COMM", title: "수소 밸류체인 완전 구축 및 차세대 수소 경제 대호황", desc: "그린 수소의 대중화로 에너지 섹터가 황금기를 맞이했고, 반독점 규제에 묶인 커뮤니케이션 빅테크들은 주가가 반토막 났습니다." },
  { minAge: 36, maxAge: 49, up: "ENGY", down: "CDIS", title: "우주 소행성 희귀 광물/연료 채굴 탐사선 무사 귀환", desc: "우주 자원 채굴 잭팟으로 에너지/정유 테마가 초급등했으나, 지구 내수 소비에만 의존하는 임의소비재는 침체의 늪에 빠졌습니다." },
  { minAge: 36, maxAge: 49, up: "REST", down: "IT", title: "초거대 해저 데이터센터 및 수중 도시 리츠 대성공", desc: "바닷속 부동산이라는 새로운 섹터가 대박을 치며 리츠가 폭등했고, 지상 냉각 비용에 시달리는 구형 IT 하드웨어는 쇠락 중입니다." },
  { minAge: 36, maxAge: 49, up: "REST", down: "COMM", title: "메타버스용 가상 서버 임대 공간 리츠 전면 합법화", desc: "디지털 부동산 임대업이 실물 자산으로 인정받으며 수익성이 폭발했고, 수수료 모델에 의존하던 기존 플랫폼들은 하락세입니다." },
  { minAge: 36, maxAge: 49, up: "REST", down: "CDIS", title: "달 표면 상업 지구 개발 리츠 첫 배당금 지급 개시", desc: "우주 부동산이라는 몽상이 현실이 되며 리츠 섹터로 돈이 몰린 반면, 지구 기반의 자동차/소비재 판매는 극심한 부진을 겪습니다." },
  { minAge: 36, maxAge: 49, up: "REST", down: "CSTP", title: "노인 특화형 AI 메디컬 실버 타운 리츠 글로벌 싹쓸이", desc: "고령화 맞춤형 부동산이 안정적인 황금알을 낳으며 기관 자금을 흡수한 반면, 전통 식음료 필수소비재는 마진 압박에 시달립니다." },

  // ===================== [20년 후 가상 뉴스 (50세~)] =====================
  { minAge: 50, maxAge: 99, up: "IT", down: "COMM", title: "인공 일반 지능(AGI) '초월체' 대중 공개 완료", desc: "인간 지능을 넘어선 AGI의 등장으로 IT 기업들의 가치가 천문학적으로 치솟았지만, 기존의 소셜 미디어 플랫폼은 완전히 버림받았습니다." },
  { minAge: 50, maxAge: 99, up: "IT", down: "CDIS", title: "홀로그램 텔레포트 전송 장치 상용 프로토타입 발표", desc: "빛을 이용한 공간 전송 기술로 IT가 대폭등했고, 자동차와 비행기 등 물리적 이동을 담당하던 모빌리티 산업은 붕괴를 맞이했습니다." },
  { minAge: 50, maxAge: 99, up: "IT", down: "CSTP", title: "뇌파 직접 다운로드 학습 칩 글로벌 판매 1위", desc: "알약을 먹듯 지식을 주입하는 칩의 발명으로 IT 생태계가 정점을 찍었으며, 전통적 소비 행태에 의존하던 필수소비재는 소외되었습니다." },
  { minAge: 50, maxAge: 99, up: "IT", down: "HLTH", title: "양자-생물학 융합 '디지털 영생' 백업 서버 구축 성공", desc: "인간의 기억을 클라우드에 백업하는 시대가 열리며 IT가 신이 되었으나, 육체적 치료에 머문 헬스케어는 몰락했습니다." },
  { minAge: 50, maxAge: 99, up: "COMM", down: "CDIS", title: "인류 통합 의식 네트워크(Hive Mind) 플랫폼 가동", desc: "생각만으로 전 인류가 소통하는 궁극의 네트워크로 통신주가 폭발했고, 실물 사치품이나 임의소비재의 가치는 무의미해졌습니다." },
  { minAge: 50, maxAge: 99, up: "COMM", down: "CSTP", title: "태양계 행성 간 실시간 양자 통신망 완전 개통", desc: "지구와 화성을 실시간으로 잇는 퀀텀 인터넷으로 커뮤니케이션이 랠리를 탔고, 지구 내 식음료 필수 소비 기업들은 주가가 폭락했습니다." },
  { minAge: 50, maxAge: 99, up: "COMM", down: "HLTH", title: "메타버스 내 유전자 시뮬레이터로 신약 개발 대체", desc: "가상공간에서 완벽한 인체 시뮬레이션이 가능해지며 통신망 가치가 올랐으나, 실물 실험을 하던 바이오 기업들은 파산했습니다." },
  { minAge: 50, maxAge: 99, up: "COMM", down: "FIN", title: "감정 전달 텔레파시 소셜 미디어 유료 가입자 50억명", desc: "글과 사진을 넘어 감정 자체를 공유하는 플랫폼이 세상을 지배했고, 구시대적 숫자에 얽매인 금융 시스템은 붕괴 직전입니다." },
  { minAge: 50, maxAge: 99, up: "CDIS", down: "CSTP", title: "개인용 초광속 반중력 이동 장치 허가 및 시판", desc: "시공간을 접는 모빌리티의 등장으로 임의소비재 섹터가 초급등했으며, 거점 마트 기반의 유통 필수소비재는 쓸모가 없어졌습니다." },
  { minAge: 50, maxAge: 99, up: "CDIS", down: "HLTH", title: "우주 관광용 개인 크루즈선 1만대 돌파 선언", desc: "서민들도 주말에 달로 여행을 가는 시대가 열리며 소비재가 폭발했고, 생명 연장보다는 경험 소비로 자금이 몰려 헬스케어가 하락했습니다." },
  { minAge: 50, maxAge: 99, up: "CDIS", down: "FIN", title: "물질 생성기 '리플리케이터' 가정 보급률 50% 돌파", desc: "원하는 사물을 즉석에서 프린트하는 혁명적 소비재가 세상을 지배했고, 이로 인해 신용 화폐 경제의 근간인 금융 시스템이 흔들립니다." },
  { minAge: 50, maxAge: 99, up: "CDIS", down: "IND", title: "메타 유니버스 전용 한정판 럭셔리 아바타 스킨 100조 시장", desc: "가상 현실 내 초고가 명품 소비가 폭발적으로 늘어나며 임의소비재가 상한가를 쳤으나, 물리적 중공업 건설은 모두 중단되었습니다." },
  { minAge: 50, maxAge: 99, up: "CSTP", down: "HLTH", title: "나노봇 알약 하나로 한 달 영양 섭취 완벽 대체", desc: "궁극의 필수소비재 알약이 식문화를 대체하며 수익을 독식했고, 기존 영양제 및 내과 헬스케어 시장은 완벽히 파괴되었습니다." },
  { minAge: 50, maxAge: 99, up: "CSTP", down: "FIN", title: "공기 중의 수분과 탄소로 합성 식량 무한 생산 성공", desc: "식량 난을 영원히 종식시킨 필수소비재 혁명으로 주가가 치솟은 반면, 곡물 선물로 장사하던 금융 파생 시장은 붕괴되었습니다." },
  { minAge: 50, maxAge: 99, up: "CSTP", down: "IND", title: "모든 질병을 방어하는 '절대 면역 음료' 전 세계 식수화", desc: "수돗물처럼 공급되는 면역 필수 음료에 자본이 몰렸고, 방산 무기 체계 등 파괴적인 산업재 예산은 전면 삭감되었습니다." },
  { minAge: 50, maxAge: 99, up: "CSTP", down: "UTIL", title: "가정용 소형 유전자 맞춤형 식품 합성기 폭발적 인기", desc: "마트에 갈 필요 없이 집에서 완벽한 음식을 찍어내는 가전이 히트치며, 중앙집중식 농업 용수/전력 유틸리티는 폭락했습니다." },
  { minAge: 50, maxAge: 99, up: "HLTH", down: "FIN", title: "불멸의 시대 개막: 노화 역행(Anti-aging) 텔로미어 주사 상용화", desc: "생물학적 영생이 가능해지며 헬스케어 섹터가 증시를 모조리 흡수했고, 종신 보험과 연금 체계에 의존하던 금융사는 전부 파산했습니다." },
  { minAge: 50, maxAge: 99, up: "HLTH", down: "IND", title: "신체 일부를 기계로 교체하는 사이보그 수술 합법화", desc: "뇌를 제외한 신체 100% 교체가 가능해져 바이오메디컬이 황금기를 맞이했으나, 인간 노동력 중심의 전통 산업재는 끝이 났습니다." },
  { minAge: 50, maxAge: 99, up: "HLTH", down: "UTIL", title: "기억과 인격을 젊은 클론으로 이전하는 시술 대중화", desc: "복제 인간 클리닉이 대성공을 거두며 헬스케어 주가가 안드로메다로 향했고, 구형 전력 인프라 유틸리티는 관심에서 완전히 멀어졌습니다." },
  { minAge: 50, maxAge: 99, up: "HLTH", down: "MATR", title: "암세포를 1시간 내로 분해하는 표적 나노 폭탄 승인", desc: "암 정복이 선언되며 글로벌 제약주가 폭등의 폭등을 거듭했으나, 한계에 다다른 전통 화학 소재 산업은 무너져 내렸습니다." },
  { minAge: 50, maxAge: 99, up: "FIN", down: "IND", title: "우주 통합 단일 디지털 통화(Galactic Credit) 출범", desc: "초은하계 통화 스와프를 장악한 거대 은행들이 폭등했고, 지구 내 토목 공사에 매달리는 재래식 산업재는 폭락했습니다." },
  { minAge: 50, maxAge: 99, up: "FIN", down: "UTIL", title: "개인의 생체 데이터와 수명을 담보로 한 시간(Time) 대출 성행", desc: "수명을 사고파는 초유의 파생 금융 상품이 대박을 터뜨리며 금융이 급등했고, 단순 전력 판매에 그치는 유틸리티는 쇠퇴했습니다." },
  { minAge: 50, maxAge: 99, up: "FIN", down: "MATR", title: "초지능 AI가 예측하는 100% 승률 무위험 차익 펀드 탄생", desc: "손실이 존재하지 않는 완벽한 펀드에 전 세계 부가 집중되며 핀테크가 날아올랐고, 원가 변동에 시달리는 소재 기업은 버려졌습니다." },
  { minAge: 50, maxAge: 99, up: "FIN", down: "ENGY", title: "은하계 무역 연합 관세 시스템 독점 계약 체결", desc: "우주 교역의 수수료를 독점한 금융 섹터가 하늘을 뚫고 올랐으나, 구시대 화석 연료 기반의 낡은 정유주들은 상장 폐지 수순입니다." },
  { minAge: 50, maxAge: 99, up: "IND", down: "UTIL", title: "화성 거주를 위한 초거대 테라포밍 돔 건설 수주 잭팟", desc: "행성을 개조하는 우주 토목 공사로 산업재 섹터가 역대급 실적을 냈고, 지구 내 배관 보수에 급급한 유틸리티는 하한가를 쳤습니다." },
  { minAge: 50, maxAge: 99, up: "IND", down: "MATR", title: "소행성 통째로 지구로 견인하는 우주 예인선 성공", desc: "엄청난 우주 공학의 승리로 항공우주 방산주가 폭등했으며, 소행성에서 쏟아지는 자원 탓에 기존 지구 화학 소재 기업들은 망했습니다." },
  { minAge: 50, maxAge: 99, up: "IND", down: "ENGY", title: "태양을 둘러싸는 다이슨 스피어 프레임 1단계 준공", desc: "별의 에너지를 통째로 뽑아내는 거대 건축물 수주로 산업재가 급등했고, 낡은 시추 장비를 돌리던 화석 에너지 기업들은 소멸했습니다." },
  { minAge: 50, maxAge: 99, up: "IND", down: "REST", title: "인공중력 발생 거대 우주 요새 도시 완공 및 입주 시작", desc: "진정한 스페이스 콜로니가 완성되며 중공업이 랠리를 펼쳤으나, 중력에 묶인 지구 내 낡은 빌딩 리츠는 폭락 중입니다." },
  { minAge: 50, maxAge: 99, up: "UTIL", down: "MATR", title: "지구 핵 에너지(Geocore) 직접 추출 발전소 흑자 전환", desc: "지구 자체를 발전기로 쓰는 궁극의 인프라 기술로 유틸리티가 폭등했고, 독성 폐기물을 배출하는 기존 첨단소재는 퇴출되었습니다." },
  { minAge: 50, maxAge: 99, up: "UTIL", down: "ENGY", title: "무선 공간 에너지 전송망 '니콜라 테슬라 프로젝트' 완성", desc: "전선 없이 허공에서 무한 에너지를 뽑아쓰는 인프라로 유틸리티가 대폭발했으며, 석유를 나르던 정유 수송 섹터는 완전히 망했습니다." },
  { minAge: 50, maxAge: 99, up: "UTIL", down: "REST", title: "인공 미니 블랙홀을 이용한 무한 쓰레기 처리 발전소 가동", desc: "폐기물 제로 생태계를 구축한 공공 유틸리티가 극찬받으며 급등했고, 매립지에 지어진 부동산 리츠들은 지반 붕괴로 폭락했습니다." },
  { minAge: 50, maxAge: 99, up: "UTIL", down: "IT", title: "대기권 조작을 통한 날씨 100% 통제 인프라 상용화", desc: "태풍과 가뭄을 조절하는 기상 통제 서비스가 유틸리티 최고의 수익원이 되었고, 변덕스러운 기후에 취약했던 구형 IT 서버망은 소외되었습니다." },
  { minAge: 50, maxAge: 99, up: "MATR", down: "ENGY", title: "어떤 충격에도 파괴되지 않는 '초압축 중성자 장갑' 소재 개발", desc: "기적의 물리적 강도를 지닌 신소재 등장으로 관련 기업이 폭등했고, 에너지 효율이 나쁜 오래된 화석 연료 기업은 폐업했습니다." },
  { minAge: 50, maxAge: 99, up: "MATR", down: "REST", title: "스스로 증식하고 수리하는 살아있는 건축 소재 바이오크리트 완판", desc: "건물이 생물처럼 자가 치유되는 소재의 상용화로 화학/소재주가 날아올랐고, 노후화로 붕괴 위험에 처한 낡은 상업용 건물 리츠는 폭락했습니다." },
  { minAge: 50, maxAge: 99, up: "MATR", down: "IT", title: "투명 망토 기술 완벽 구현 '메타 스텔스' 직물 대량 양산", desc: "시각적 은폐가 완벽히 가능한 소재 혁명으로 돈이 쏠렸으나, 물리적 스크린에 의존하던 전통 디스플레이 IT 기업들은 몰락했습니다." },
  { minAge: 50, maxAge: 99, up: "MATR", down: "COMM", title: "상온 상압 100% 효율의 룸-템프 초전도체 글로벌 독점 체결", desc: "물리학의 성배라 불리는 완벽한 초전도 물질의 양산 성공으로 소재주가 폭등했고, 현실 감각을 상실한 커뮤니케이션 가상 기업들은 쇠퇴했습니다." },
  { minAge: 50, maxAge: 99, up: "ENGY", down: "REST", title: "반물질(Antimatter) 반응로 안정화 성공 및 상용 전력화", desc: "우주 최고의 효율을 자랑하는 반물질 에너지가 상용화되며 에너지 섹터가 신화적 폭등을 이뤘고, 지구 부동산 리츠는 자금난에 빠졌습니다." },
  { minAge: 50, maxAge: 99, up: "ENGY", down: "IT", title: "목성 대기 헬륨-3 대규모 포집 및 지구 귀환 작전 대성공", desc: "핵융합의 궁극적 연료를 대량 확보한 우주 에너지 기업들이 대박을 쳤고, 지구 내 전력 소모만 심한 낡은 IT 인프라는 폭락했습니다." },
  { minAge: 50, maxAge: 99, up: "ENGY", down: "COMM", title: "인공 소형 항성 궤도 배치 및 다이슨 링 발전 개시", desc: "우리만의 미니 태양을 만들어 무한 에너지를 공급하는 기업이 랠리를 탔고, 사용자 유출이 심각한 소셜 플랫폼들은 주가가 박살 났습니다." },
  { minAge: 50, maxAge: 99, up: "ENGY", down: "CDIS", title: "진공 에너지(Zero-point energy) 추출기 가정용 보급 시작", desc: "무의 공간에서 에너지를 뽑아내는 기적이 실현되며 에너지주가 폭등했고, 연료를 태워 움직이는 구형 모빌리티 소비재는 박물관으로 갔습니다." },
  { minAge: 50, maxAge: 99, up: "REST", down: "IT", title: "화성 올림푸스 산맥 최고급 테라포밍 리조트 리츠 초대박", desc: "태양계 최고의 뷰를 자랑하는 우주 부동산 분양이 대성공을 거두며 리츠가 폭등했고, 지구 내 구형 데이터센터 부품 기업들은 멸망했습니다." },
  { minAge: 50, maxAge: 99, up: "REST", down: "COMM", title: "인간 의식 업로드 전용 클라우드 아파트먼트 디지털 분양 1위", desc: "육체를 버리고 가상으로 이주하는 디지털 영주권 부동산이 폭등했으며, 단순 텍스트/영상 기반의 낡은 커뮤니케이션 앱들은 사라졌습니다." },
  { minAge: 50, maxAge: 99, up: "REST", down: "CDIS", title: "해저 2만리 심해 돔 시티 아틀란티스 분양 완판", desc: "지구 환경 오염을 피해 바다 깊은 곳으로 이주하는 거주 리츠가 상한가를 쳤고, 지상에서 쓸모없어진 전통 임의소비재는 몰락했습니다." },
  { minAge: 50, maxAge: 99, up: "REST", down: "CSTP", title: "지구 궤도 정지 위성 엘리베이터 정거장 메가 쇼핑몰 개장", desc: "우주로 향하는 관문에 지어진 초대형 상업 부동산 리츠가 돈을 쓸어 담았으나, 지상 동네 상권에 묶인 전통 생필품 업체들은 부도 위기입니다." }
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
  entrepreneur: { stages: ["1호점 초기창업", "1,2,3호점 주인", "동네 프랜차이즈 대표", "대형 프랜차이즈 대표"], pay: [40000000, 100000000, 250000000, 500000000] },
  unemployed: { stages: ["구직자"], pay: [0] }
};

// [업데이트] 자동차 등급 내 가상의 이름(중고 경차 등) 대신 실존하는 모델 3대씩 배열로 추가 및 7등급(스포츠카) 신설
const carLevels = [
  { level: 0, names: ["대중교통 이용"], value: 0 },
  { level: 1, names: ["기아 모닝", "쉐보레 스파크", "기아 레이"], value: 5000000 },
  { level: 2, names: ["현대 아반떼", "기아 K3", "쉐보레 크루즈"], value: 22000000 },
  { level: 3, names: ["현대 쏘나타", "기아 K5", "기아 스포티지"], value: 35000000 },
  { level: 4, names: ["현대 그랜저", "기아 K8", "현대 싼타페"], value: 55000000 },
  { level: 5, names: ["제네시스 G80", "제네시스 GV70", "BMW 5시리즈"], value: 80000000 },
  { level: 6, names: ["제네시스 G90", "벤츠 S클래스", "포르쉐 파나메라"], value: 130000000 },
  { level: 7, names: ["페라리 로마", "람보르기니 우라칸", "맥라렌 아투라"], value: 200000000 }
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
