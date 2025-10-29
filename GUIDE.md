# 🎨 Canva Clone - Phase 1 완성! 

## 🎉 축하합니다!

완전히 작동하는 **사용자 인증 시스템**과 **프로젝트 관리 시스템**이 완성되었습니다!

---

## 📦 받은 파일들

```
canva-clone-project/
│
├── 📄 START.md              ← 이것부터 읽으세요! (빠른 시작)
├── 📄 README.md             ← 전체 문서
│
├── 🖥️ backend/              ← 서버 (Node.js + Express)
│   ├── server.js           ← 메인 서버 코드
│   └── package.json        ← 의존성 목록
│
└── 🌐 frontend/             ← 웹 앱 (React)
    └── index.html          ← 메인 앱 파일
```

---

## ⚡ 3분 안에 실행하기

### 1️⃣ 터미널 열기 (필수!)

**Windows**: `cmd` 또는 `PowerShell`
**Mac**: `Terminal`

### 2️⃣ 백엔드 실행

```bash
cd canva-clone-project/backend
npm install
npm start
```

기다리세요... 설치 중... ⏳

✅ 성공 메시지를 보면 OK!

### 3️⃣ 프론트엔드 열기

`frontend/index.html` 파일 더블클릭!

---

## 🎮 사용법

### 첫 화면
![로그인 화면]
- 보라색 그라데이션 배경
- 이메일 / 비밀번호 입력

### 회원가입
1. 아래 "회원가입" 링크 클릭
2. 이름, 이메일, 비밀번호 입력
3. 완료!

### 대시보드
- 👋 환영 메시지
- 📊 통계 (프로젝트, 폴더, 팀 개수)
- 📁 내 프로젝트 목록
- ➕ "새 디자인 만들기" 버튼

---

## 🔥 핵심 기능

### ✅ 완전한 인증 시스템
- 회원가입
- 로그인/로그아웃
- 비밀번호 암호화 (bcrypt)
- JWT 토큰 인증
- 자동 로그인 (토큰 저장)

### ✅ 프로젝트 관리
- 프로젝트 생성/수정/삭제
- 폴더 시스템
- 프로젝트 공유
- 썸네일

### ✅ 팀 협업
- 팀 생성
- 팀원 초대
- 권한 관리

### ✅ 데이터베이스
- SQLite (설치 불필요!)
- 자동 테이블 생성
- 관계형 데이터 구조

---

## 💾 데이터베이스

백엔드 폴더에 자동으로 생성됩니다:
- `canva-clone.db` ← 모든 데이터가 여기 저장됨

**테이블:**
- users (사용자)
- projects (프로젝트)
- folders (폴더)
- teams (팀)
- team_members (팀 멤버)
- shared_projects (공유 프로젝트)

---

## 🔌 API 목록

### 인증
```
POST /api/auth/register   - 회원가입
POST /api/auth/login      - 로그인
GET  /api/auth/profile    - 프로필 조회
PUT  /api/auth/profile    - 프로필 수정
```

### 프로젝트
```
GET    /api/projects      - 목록
POST   /api/projects      - 생성
GET    /api/projects/:id  - 상세
PUT    /api/projects/:id  - 수정
DELETE /api/projects/:id  - 삭제
```

### 폴더 & 팀
```
GET  /api/folders         - 폴더 목록
POST /api/folders         - 폴더 생성
GET  /api/teams           - 팀 목록
POST /api/teams           - 팀 생성
```

---

## 🎯 Phase 로드맵

### ✅ Phase 1 (완료!) - 인프라
- [x] 사용자 시스템
- [x] 인증
- [x] 데이터베이스
- [x] 프로젝트 관리
- [x] 대시보드

### 🚧 Phase 2 (다음) - 에디터
- [ ] 디자인 에디터 통합
- [ ] 실시간 저장
- [ ] 파일 업로드
- [ ] 템플릿 갤러리

### 🔮 Phase 3 - Visual Suite
- [ ] 멀티 포맷 디자인
- [ ] 프레젠테이션
- [ ] 문서 편집
- [ ] 화이트보드

### 🤖 Phase 4 - AI 기능
- [ ] Canva AI
- [ ] Magic Studio
- [ ] 이미지 생성
- [ ] 자동 디자인

---

## 📚 학습 자료

### 이 프로젝트로 배울 수 있는 것

**백엔드:**
- Node.js + Express
- RESTful API 설계
- JWT 인증
- bcrypt 암호화
- SQLite 데이터베이스
- CRUD 작업

**프론트엔드:**
- React Hooks (useState, useEffect)
- API 호출 (fetch)
- 로컬 스토리지
- 라우팅
- 폼 처리

**보안:**
- 비밀번호 해싱
- 토큰 기반 인증
- CORS 설정

---

## 🐛 FAQ

### Q: Node.js가 없어요!
A: https://nodejs.org 에서 다운로드하세요 (LTS 버전 추천)

### Q: 포트 3001이 이미 사용 중이래요
A: server.js 파일에서 PORT를 3002로 변경하고, frontend/index.html의 API_URL도 변경하세요

### Q: 데이터가 사라졌어요
A: 데이터는 `backend/canva-clone.db` 파일에 저장됩니다. 이 파일을 삭제하면 데이터가 초기화됩니다.

### Q: Phase 2는 언제?
A: 준비되면 말씀해주세요! 바로 시작하겠습니다 😊

---

## 🎁 보너스 팁

### 개발 모드 (자동 재시작)
```bash
cd backend
npm run dev
```
코드를 수정하면 서버가 자동으로 재시작됩니다!

### API 테스트
브라우저에서 http://localhost:3001/api/health 접속
→ `{"status":"OK"}` 가 보이면 정상!

### 데이터베이스 초기화
```bash
cd backend
rm canva-clone.db
npm start
```

---

## 💪 실력 향상 과제

Phase 1을 더 깊이 이해하려면:

1. **새 API 추가하기**
   - 프로필 이미지 업로드
   - 비밀번호 변경
   - 이메일 인증

2. **UI 개선하기**
   - 다크 모드
   - 반응형 디자인
   - 애니메이션

3. **기능 추가하기**
   - 검색 기능
   - 정렬/필터
   - 페이지네이션

---

## 🚀 준비 완료!

이제 Phase 2로 넘어갈 준비가 되었습니다!

**다음에 만들 것:**
- 🎨 완전한 디자인 에디터
- 🔄 실시간 자동저장
- 📁 파일 업로드
- 🎭 템플릿 시스템
- ⚡ 드래그 앤 드롭
- 🎯 레이어 관리

---

**준비되면 "Phase 2 시작하자!"라고 말씀해주세요! 🎉**
