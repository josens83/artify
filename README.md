# 🎨 Canva Clone - AI 기반 마케팅 콘텐츠 생성 플랫폼

> Google Gemini AI를 활용한 지능형 마케팅 콘텐츠 제작 툴

![Project Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

---

## 📋 목차

- [프로젝트 개요](#-프로젝트-개요)
- [주요 기능](#-주요-기능)
- [기술 스택](#-기술-스택)
- [시스템 아키텍처](#-시스템-아키텍처)
- [설치 방법](#-설치-방법)
- [실행 방법](#-실행-방법)
- [사용 방법](#-사용-방법)
- [API 문서](#-api-문서)
- [프로젝트 구조](#-프로젝트-구조)
- [스크린샷](#-스크린샷)
- [개발 팀](#-개발-팀)
- [라이선스](#-라이선스)

---

## 🎯 프로젝트 개요

**Canva Clone**은 AI 기술을 활용하여 마케팅 콘텐츠 제작을 자동화하는 웹 기반 디자인 플랫폼입니다. 
Google Gemini Pro API를 통해 플랫폼별, 목적별로 최적화된 마케팅 카피를 자동 생성하고, 
실시간 트렌드 데이터와 성과 예측 기능을 제공합니다.

### 🎓 개발 배경
- **문제**: 마케터들이 여러 SNS 플랫폼에 맞는 콘텐츠를 제작하는 데 많은 시간 소요
- **해결**: AI 기반 자동화로 플랫폼별 최적화된 콘텐츠를 빠르게 생성
- **가치**: 콘텐츠 제작 시간 70% 단축, 일관된 브랜드 메시지 유지

---

## ✨ 주요 기능

### 1. 🎨 비주얼 에디터
- **드래그 앤 드롭**: 직관적인 요소 배치 및 이동
- **실시간 편집**: 크기 조절, 회전, 색상 변경
- **다양한 요소**: 도형(사각형, 원, 삼각형), 텍스트, 이미지
- **레이어 관리**: 요소 선택, 삭제, 순서 변경
- **Zoom 기능**: 25% ~ 200% 확대/축소

### 2. 🤖 AI 텍스트 생성 (Google Gemini Pro)
- **플랫폼별 최적화**
  - Instagram: 비주얼 중심, 이모지 많이 사용, 해시태그 7개
  - Twitter: 간결함, 280자 제한, 해시태그 3-5개
  - Facebook: 스토리텔링, 공감대 형성
  - LinkedIn: 전문적, 데이터 기반
  
- **목적별 전략**
  - 프로모션: 긴급성, 혜택, 한정판 강조
  - 공지: 명확성, 정보 전달
  - 참여유도: 질문, 인터랙션
  - 브랜딩: 가치, 감성

- **톤앤매너 커스터마이징**
  - 친근함, 전문적, 흥미진진, 고급스러움

### 3. 📊 데이터 기반 인사이트
- **트렌드 분석**: 실시간 인기 키워드 및 해시태그
- **성과 예측**: AI 기반 인게이지먼트율, 도달 수 예측
- **개선 제안**: 데이터 기반 콘텐츠 최적화 제안

### 4. 💾 프로젝트 관리
- **저장/불러오기**: 프로젝트 자동 저장 및 복원
- **다중 프로젝트**: 여러 디자인 동시 작업
- **버전 관리**: 프로젝트 수정 이력 추적

### 5. 📥 내보내기
- **다양한 포맷**: PNG, JPG, SVG
- **고품질 출력**: 원본 해상도 유지
- **빠른 다운로드**: 클라이언트 사이드 처리

---

## 🏗️ 기술 스택

### Frontend
```
- React 18 (CDN)
- TailwindCSS 3.x
- Vanilla JavaScript (ES6+)
- HTML5 Canvas API
```

### Backend (Node.js)
```
- Node.js 22.x
- Express 4.x
- SQLite3 (better-sqlite3)
- JWT Authentication
- WebSocket (ws)
- Multer (파일 업로드)
```

### AI Backend (Python)
```
- Python 3.11+
- FastAPI
- Google Gemini Pro API
- Pydantic (데이터 검증)
- python-dotenv
```

### DevOps
```
- Git & GitHub
- npm / pip
- dotenv (환경 변수)
```

---

## 🔧 시스템 아키텍처
```
┌─────────────────────────────────────────────┐
│                                             │
│          Frontend (React + Canvas)          │
│         http://localhost:3001               │
│                                             │
└──────────────┬──────────────────────────────┘
               │
               ├──────────────┬────────────────┐
               │              │                │
               ▼              ▼                ▼
┌──────────────────┐ ┌──────────────┐ ┌──────────────┐
│   Node.js API    │ │ Python API   │ │  WebSocket   │
│   (Express)      │ │  (FastAPI)   │ │   Server     │
│   Port: 3001     │ │  Port: 8000  │ │  Port: 3001  │
├──────────────────┤ ├──────────────┤ └──────────────┘
│ - 사용자 인증    │ │ - AI 생성    │
│ - 프로젝트 CRUD  │ │ - 트렌드     │
│ - 파일 업로드    │ │ - 성과 예측  │
│ - 내보내기       │ │              │
└────────┬─────────┘ └──────┬───────┘
         │                  │
         ▼                  ▼
  ┌─────────────┐   ┌──────────────┐
  │   SQLite    │   │ Gemini API   │
  │  Database   │   │  (Google)    │
  └─────────────┘   └──────────────┘
```

---

## 📦 설치 방법

### 사전 요구사항
- Node.js 18.x 이상
- Python 3.11 이상
- npm 또는 yarn
- Git

### 1. 프로젝트 클론
```bash
git clone https://github.com/yourusername/canva-clone-project.git
cd canva-clone-project
```

### 2. Node.js 백엔드 설치
```bash
cd backend
npm install
```

**필요한 패키지:**
```json
{
  "express": "^4.18.2",
  "cors": "^2.8.5",
  "dotenv": "^16.0.3",
  "better-sqlite3": "^9.2.2",
  "bcryptjs": "^2.4.3",
  "jsonwebtoken": "^9.0.2",
  "multer": "^1.4.5-lts.1",
  "ws": "^8.14.2"
}
```

### 3. Python 백엔드 설치
```bash
cd ../backend-python

# 가상환경 생성
python -m venv venv

# 가상환경 활성화 (Windows)
.\venv\Scripts\Activate.ps1

# 가상환경 활성화 (Mac/Linux)
source venv/bin/activate

# 패키지 설치
pip install fastapi uvicorn google-generativeai python-dotenv pydantic --break-system-packages
```

### 4. 환경 변수 설정

**backend/.env:**
```env
PORT=3001
JWT_SECRET=your-super-secret-jwt-key-change-this
```

**backend-python/.env:**
```env
GEMINI_API_KEY=your-gemini-api-key-here
```

> 💡 **Gemini API 키 발급**: https://aistudio.google.com/app/apikey

---

## 🚀 실행 방법

### 1. Python 서버 실행 (터미널 1)
```bash
cd backend-python
.\venv\Scripts\Activate.ps1  # Windows
# source venv/bin/activate    # Mac/Linux

uvicorn main:app --reload --port 8000
```

**성공 메시지:**
```
✅ Gemini API configured
INFO:     Uvicorn running on http://127.0.0.1:8000
INFO:     Application startup complete.
```

### 2. Node.js 서버 실행 (터미널 2)
```bash
cd backend
npm start
```

**성공 메시지:**
```
🚀 Server running on http://localhost:3001
📁 Database initialized
WebSocket server initialized
```

### 3. 브라우저에서 접속
```
http://localhost:3001
```

---

## 📖 사용 방법

### 1. 회원가입 / 로그인
```
1. http://localhost:3001/login.html 접속
2. 회원가입 또는 로그인
3. 대시보드로 이동
```

### 2. 프로젝트 생성
```
1. "새 디자인 만들기" 클릭
2. 캔버스 크기 선택 (기본: 800x1000px)
3. 에디터 화면 로드
```

### 3. 요소 추가
```
좌측 사이드바 > 요소 탭:
- 사각형 클릭 → 빨간색 사각형 추가
- 원 클릭 → 청록색 원 추가
- 삼각형 클릭 → 노란색 삼각형 추가
- 텍스트 클릭 → 텍스트 박스 추가
```

### 4. AI 텍스트 생성
```
좌측 사이드바 > AI 텍스트 탭:
1. 브랜드명 입력 (예: 스타벅스)
2. 제품/서비스 입력 (예: 신메뉴 딸기 프라푸치노)
3. 목적 선택 (프로모션, 공지, 참여유도)
4. 톤앤매너 선택 (친근함, 전문적, 흥미진진, 고급스러움)
5. "✍️ 텍스트 생성" 클릭
6. 생성된 카피 중 하나 선택 → 캔버스에 자동 추가
```

### 5. 요소 편집
```
요소 클릭 → 우측 속성 패널:
- 색상 변경
- 크기 조절 (드래그)
- 회전 (상단 핸들 또는 슬라이더)
- 불투명도 조절
- 텍스트 내용 수정 (텍스트 요소)
- 글자 크기 변경 (텍스트 요소)
```

### 6. 성과 예측
```
1. 텍스트 요소 선택
2. "📊 성과 예측" 클릭
3. 우측 패널에서 결과 확인:
   - 인게이지먼트율
   - 예상 도달 수
   - 예상 좋아요 수
   - 개선 제안
```

### 7. 저장 및 내보내기
```
상단 툴바:
- "💾 저장" → 프로젝트 저장
- "⬇️ 다운로드" → PNG/JPG로 내보내기
```

---

## 📡 API 문서

### Node.js API (포트 3001)

#### 인증
```http
POST /api/auth/signup
POST /api/auth/login
GET  /api/auth/me
```

#### 프로젝트
```http
POST   /api/projects          # 프로젝트 생성
GET    /api/projects          # 프로젝트 목록
GET    /api/projects/:id      # 프로젝트 상세
PUT    /api/projects/:id      # 프로젝트 수정
DELETE /api/projects/:id      # 프로젝트 삭제
```

#### 파일
```http
POST /api/upload              # 이미지 업로드
```

#### 내보내기
```http
POST /api/export/png          # PNG 내보내기
POST /api/export/jpg          # JPG 내보내기
POST /api/export/svg          # SVG 내보내기
```

### Python API (포트 8000)

#### AI 텍스트 생성
```http
POST /api/ai/generate-text
```

**Request Body:**
```json
{
  "brand_name": "스타벅스",
  "product": "신메뉴 딸기 프라푸치노",
  "purpose": "promotion",
  "tone": "friendly",
  "platform": "instagram"
}
```

**Response:**
```json
{
  "copies": [
    {
      "id": "copy_1",
      "text": "🎉 특별한 순간을 위한...",
      "score": 0.92,
      "hashtags": ["#스타벅스", "#신메뉴", ...],
      "reasoning": "감성적 접근으로...",
      "tone": "friendly",
      "platform": "instagram"
    }
  ],
  "generation_time": 3.45,
  "ai_model": "gemini-pro-optimized-v2"
}
```

#### 트렌드 데이터
```http
GET /api/data/trending?platform=twitter&industry=all
```

#### 성과 예측
```http
POST /api/analytics/predict
```

**Request Body:**
```json
{
  "text": "생성된 카피 텍스트",
  "has_image": true,
  "hashtags": ["#태그1", "#태그2"],
  "platform": "instagram"
}
```

---

## 📁 프로젝트 구조
```
canva-clone-project/
│
├── backend/                      # Node.js 백엔드
│   ├── server.js                # Express 서버
│   ├── package.json
│   ├── .env                     # 환경 변수
│   ├── canva-clone.db          # SQLite 데이터베이스
│   ├── uploads/                # 업로드된 이미지
│   └── exports/                # 내보낸 파일
│
├── backend-python/              # Python 백엔드
│   ├── main.py                 # FastAPI 서버
│   ├── .env                    # Gemini API 키
│   ├── templates/              # 카피 템플릿
│   │   └── copy_templates.json
│   ├── data/                   # 샘플 데이터
│   │   └── sample_trends.json
│   └── venv/                   # Python 가상환경
│
├── frontend/                    # 프론트엔드
│   ├── login.html              # 로그인 페이지
│   ├── index.html              # 대시보드
│   └── editor.html             # 에디터 (메인)
│
└── README.md                    # 프로젝트 문서 (이 파일)
```

---

## 📸 스크린샷

### 1. 로그인 페이지
```
[스크린샷 추가 예정]
- 회원가입 / 로그인 폼
- 반응형 디자인
```

### 2. 대시보드
```
[스크린샷 추가 예정]
- 프로젝트 목록
- 새 디자인 만들기
- 프로젝트 썸네일
```

### 3. 에디터
```
[스크린샷 추가 예정]
- 캔버스 편집 화면
- 좌측: 요소/AI 텍스트 사이드바
- 중앙: 캔버스
- 우측: 속성 패널 + 트렌드
```

### 4. AI 텍스트 생성
```
[스크린샷 추가 예정]
- AI 생성 폼
- 생성된 카피 결과
- 해시태그 & 점수
```

---

## 🎥 데모 영상

> 📹 [YouTube 데모 링크 추가 예정]

**시연 내용:**
1. 로그인 및 프로젝트 생성
2. 요소 추가 및 편집
3. AI 텍스트 생성
4. 트렌드 데이터 확인
5. 성과 예측
6. 내보내기

---

## 🔧 트러블슈팅

### 포트 충돌
```bash
# 포트 8000 사용 중
netstat -ano | findstr :8000
taskkill /PID [PID번호] /F

# 포트 3001 사용 중
netstat -ano | findstr :3001
taskkill /PID [PID번호] /F
```

### Gemini API 에러
```
⚠️ GEMINI_API_KEY not found in .env
→ backend-python/.env 파일에 API 키 추가
```

### 데이터베이스 에러
```bash
# SQLite 데이터베이스 초기화
cd backend
rm canva-clone.db
npm start
```

### Python 패키지 설치 에러
```bash
pip install [패키지명] --break-system-packages
```

---

## 🚀 향후 개선 계획

### Phase 9 (추가 기능)
- [ ] AI 이미지 생성 (DALL-E 또는 Stable Diffusion)
- [ ] 템플릿 시스템 (미리 만든 디자인)
- [ ] 협업 기능 (실시간 공동 편집)
- [ ] 버전 관리 (되돌리기/다시하기 무제한)
- [ ] 폰트 추가 (Google Fonts 연동)

### Phase 10 (배포)
- [ ] Frontend: Vercel 배포
- [ ] Python API: Render 배포
- [ ] Node.js API: Railway 배포
- [ ] Database: PostgreSQL로 마이그레이션

### Phase 11 (최적화)
- [ ] 이미지 압축 및 최적화
- [ ] 코드 번들링 (Webpack/Vite)
- [ ] CDN 적용
- [ ] 캐싱 전략

---

## 👥 개발 팀

| 이름 | 역할 | 담당 |
|------|------|------|
| 김도현 | Full-stack Developer | 전체 시스템 설계 및 구현 |

---

## 🙏 감사의 말

이 프로젝트는 다음 기술들을 활용했습니다:
- [Google Gemini API](https://ai.google.dev/)
- [FastAPI](https://fastapi.tiangolo.com/)
- [Express.js](https://expressjs.com/)
- [React](https://react.dev/)
- [TailwindCSS](https://tailwindcss.com/)

---

## 📄 라이선스

MIT License

Copyright (c) 2025 Canva Clone Project

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---

## 📞 연락처

- 이메일: dohurnk@gmail.com
- GitHub: [프로젝트 저장소](https://github.com/yourusername/canva-clone-project)

---

<div align="center">

**⭐ 이 프로젝트가 마음에 드셨다면 Star를 눌러주세요! ⭐**

Made with ❤️ by Canva Clone Team

</div>