# 🚀 빠른 시작 가이드

## Phase 1이 완성되었습니다! 🎉

---

## 📦 1단계: Node.js 설치 확인

터미널을 열고:
```bash
node --version
npm --version
```

없다면 https://nodejs.org 에서 설치하세요.

---

## 🖥️ 2단계: 백엔드 서버 실행

### Windows:
```bash
cd canva-clone-project\backend
npm install
npm start
```

### Mac/Linux:
```bash
cd canva-clone-project/backend
npm install
npm start
```

✅ 이런 메시지가 나오면 성공:
```
╔════════════════════════════════════════╗
║  🚀 Canva Clone Backend Server        ║
║  📍 http://localhost:3001             ║
║  ✅ Phase 1: User System Ready        ║
╚════════════════════════════════════════╝
```

⚠️ **중요**: 서버를 종료하지 마세요! 계속 실행 상태로 두세요.

---

## 🌐 3단계: 프론트엔드 열기

`canva-clone-project/frontend/index.html` 파일을 더블클릭하여 브라우저에서 열기

---

## 🎯 4단계: 사용해보기

### 회원가입
1. "회원가입" 링크 클릭
2. 이름, 이메일, 비밀번호 입력
3. 회원가입 완료!

### 대시보드
- 로그인 후 자동으로 대시보드가 열립니다
- 통계 확인 가능
- "새 디자인 만들기" 버튼 클릭 (Phase 2에서 에디터 구현 예정)

---

## 🐛 문제가 생겼나요?

### "서버 연결 실패" 에러
→ 백엔드 서버가 실행 중인지 확인하세요 (2단계)

### 패키지 설치 오류
```bash
npm cache clean --force
npm install
```

---

## ✅ 확인해보세요

- [ ] Node.js 설치됨
- [ ] 백엔드 서버 실행 중 (localhost:3001)
- [ ] 프론트엔드 브라우저에서 열림
- [ ] 회원가입/로그인 작동
- [ ] 대시보드 표시됨

---

## 🎓 Phase 1에서 만든 것

✅ 완전한 사용자 인증 시스템
✅ 회원가입/로그인
✅ JWT 토큰 인증
✅ 프로젝트 저장/불러오기
✅ 데이터베이스 (SQLite)
✅ 대시보드 UI
✅ 팀 & 폴더 시스템

---

## 📚 더 알아보기

자세한 내용은 `README.md` 파일을 참고하세요:
- API 문서
- 데이터베이스 구조
- 고급 설정

---

## 🚀 다음 Phase

**Phase 2에서 만들 것:**
- 완전한 디자인 에디터
- 실시간 자동저장
- 파일 업로드
- 템플릿 시스템

준비되면 말씀해주세요! 😊
