# 🎨 Artify - AI 디자인 에디터

> OpenAI GPT-4 및 DALL-E 3를 활용한 지능형 소셜 미디어 디자인 제작 툴

![Project Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js)
![Python](https://img.shields.io/badge/Python-FastAPI-009688?logo=python)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4%20%7C%20DALL--E--3-412991?logo=openai)

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

**Artify**는 AI 기술을 활용하여 소셜 미디어 디자인 제작을 자동화하는 웹 기반 디자인 플랫폼입니다. 
OpenAI GPT-4 API를 통해 플랫폼별, 목적별로 최적화된 마케팅 카피를 자동 생성하고, 
DALL-E 3로 AI 이미지를 생성하며, 실시간 트렌드 데이터와 성과 예측 기능을 제공합니다.

### 🎓 개발 배경
- **문제**: 마케터들이 여러 SNS 플랫폼에 맞는 콘텐츠를 제작하는 데 많은 시간 소요
- **해결**: AI 기반 자동화로 플랫폼별 최적화된 콘텐츠를 빠르게 생성
- **가치**: 콘텐츠 제작 시간 70% 단축, 일관된 브랜드 메시지 유지, AI 이미지 생성으로 디자인 리소스 절감

---

## ✨ 주요 기능

### 1. 🎨 비주얼 에디터
- **드래그 앤 드롭**: 직관적인 요소 배치 및 이동
- **실시간 편집**: 크기 조절, 회전, 색상 변경
- **다양한 요소**: 도형(사각형, 원, 삼각형), 텍스트, 이미지
- **레이어 관리**: 요소 선택, 삭제, 순서 변경
- **Zoom 기능**: 25% ~ 200% 확대/축소
- **Undo/Redo**: 전체 편집 히스토리 관리 (Ctrl+Z / Ctrl+Y)

### 2. 🤖 AI 텍스트 생성 (OpenAI GPT-4)
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

- **AI 생성 결과**
  - 3가지 카피 옵션 제공
  - 각 카피별 추천 해시태그
  - 점수 및 이유 설명

### 3. 🖼️ AI 이미지 생성 (OpenAI DALL-E 3)
- **고품질 이미지 생성**
  - 텍스트 프롬프트로 이미지 자동 생성
  - 1024×1024, 1792×1024, 1024×1792 해상도 지원
  
- **스타일 옵션**
  - Vivid: 생생하고 화려한 스타일
  - Natural: 자연스럽고 사실적인 스타일

- **품질 설정**
  - Standard: 일반 품질 ($0.04/이미지)
  - HD: 고화질 ($0.08/이미지)

- **프롬프트 최적화**
  - DALL-E 3가 자동으로 프롬프트 개선
  - 생성 시간: 약 10-20초

### 4. 📱 SNS 템플릿
- **Instagram Post**: 1080×1080px (정사각형)
- **Instagram Story**: 1080×1920px (세로형)
- **Facebook Post**: 1200×630px (가로형)
- **Twitter Post**: 1200×675px (가로형)
- **빈 캔버스**: 800×1000px (커스텀)

### 5. 🔤 Google Fonts 지원
- **Noto Sans KR**: 한글 기본 폰트
- **Roboto**: 모던하고 깔끔한 폰트
- **Montserrat**: 기하학적 산세리프
- **Playfair Display**: 우아한 세리프
- **Pacifico**: 손글씨 스타일
- **Lobster**: 볼드한 스크립트

### 6. 📊 데이터 기반 인사이트
- **트렌드 분석**: 실시간 인기 키워드 및 해시태그 (샘플 데이터)
- **성과 예측**: AI 기반 인게이지먼트율, 도달 수 예측
- **개선 제안**: 데이터 기반 콘텐츠 최적화 제안

### 7. 💾 프로젝트 관리
- **저장/불러오기**: 프로젝트 자동 저장 및 복원
- **다중 프로젝트**: 여러 디자인 동시 작업
- **JWT 인증**: 안전한 사용자 세션 관리

### 8. 📥 고품질 내보내기
- **PNG 내보내기**: 무손실 고품질 이미지
- **JPG 내보내기**: 압축된 고품질 이미지
- **2배 해상도**: html2canvas로 고해상도 렌더링
- **빠른 다운로드**: 클라이언트 사이드 처리

---

## 🏗️ 기술 스택

### Frontend
```
- React 18 (CDN)
- TailwindCSS 3.x
- HTML5 Canvas API
- html2canvas (스크린샷)
- Google Fonts API
```

### Backend (Node.js)
```
- Node.js 18.x+
- Express 4.x
- SQLite3
- JWT Authentication
- bcrypt (비밀번호 해싱)
- WebSocket (ws)
- Multer (파일 업로드)
```

### AI Backend (Python)
```
- Python 3.8+
- FastAPI
- OpenAI GPT-4 API
- OpenAI DALL-E 3 API
- Pydantic (데이터 검증)
- python-dotenv
- httpx
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
│ - 사용자 인증    │ │ - AI 텍스트  │
│ - 프로젝트 CRUD  │ │ - AI 이미지  │
│ - 파일 업로드    │ │ - 트렌드     │
│ - JWT 토큰       │ │ - 성과 예측  │
└────────┬─────────┘ └──────┬───────┘
         │                  │
         ▼                  ▼
  ┌─────────────┐   ┌──────────────┐
  │   SQLite    │   │  OpenAI API  │
  │  Database   │   │ GPT-4/DALL-E │
  └─────────────┘   └──────────────┘
```

---

## 📦 설치 방법

### 사전 요구사항
- Node.js 16.x 이상
- Python 3.8 이상
- npm 또는 yarn
- Git
- OpenAI API 키

### 1. 프로젝트 클론
```bash
git clone https://github.com/josens83/artify.git
cd artify
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
  "sqlite3": "^5.1.7",
  "bcrypt": "^5.1.1",
  "jsonwebtoken": "^9.0.2",
  "multer": "^1.4.5-lts.1",
  "ws": "^8.16.0"
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
pip install -r requirements.txt
```

**requirements.txt:**
```txt
fastapi==0.109.0
uvicorn==0.27.0
openai==1.10.0
pydantic==2.5.3
python-dotenv==1.0.0
httpx==0.26.0
```

### 4. 환경 변수 설정

**backend-python/.env:**
```env
OPENAI_API_KEY=your-openai-api-key-here
```

> 💡 **OpenAI API 키 발급**: https://platform.openai.com/api-keys

⚠️ **중요**: `.env` 파일은 절대 Git에 커밋하지 마세요!

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
📁 Serving static files from: frontend
```

### 3. 브라우저에서 접속
```
http://localhost:3001/login.html
```

---

## 📖 사용 방법

### 1. 회원가입 / 로그인
```
1. http://localhost:3001/login.html 접속
2. 회원가입 또는 로그인
3. 대시보드로 자동 이동
```

### 2. 프로젝트 생성
```
1. 대시보드에서 "✨ 새 프로젝트" 클릭
2. 템플릿 선택:
   - Instagram Post (1080×1080)
   - Instagram Story (1080×1920)
   - Facebook Post (1200×630)
   - Twitter Post (1200×675)
   - 빈 캔버스 (800×1000)
3. 에디터 화면 로드
```

### 3. 요소 추가
```
좌측 사이드바 > ⭐ 요소 탭:
- 사각형 클릭 → 빨간색 사각형 추가
- 원 클릭 → 청록색 원 추가
- 삼각형 클릭 → 노란색 삼각형 추가
- 텍스트 클릭 → 텍스트 박스 추가
```

### 4. 이미지 업로드
```
좌측 사이드바 > 📁 업로드 탭:
1. "📁 파일 선택" 클릭 또는 드래그 앤 드롭
2. 이미지 선택 (JPG, PNG, GIF, WEBP, 최대 10MB)
3. 업로드 완료 후 자동으로 캔버스에 추가
```

### 5. AI 텍스트 생성
```
좌측 사이드바 > ✍️ AI 텍스트 탭:
1. 브랜드명 입력 (예: 스타벅스)
2. 제품/서비스 입력 (예: 신메뉴 딸기 프라푸치노)
3. 목적 선택 (프로모션, 공지, 참여유도)
4. 톤앤매너 선택 (친근함, 전문적, 흥미진진, 고급스러움)
5. 플랫폼 선택 (Instagram, Twitter, Facebook, LinkedIn)
6. "✍️ 텍스트 생성" 클릭
7. 생성된 3가지 카피 중 하나 선택
8. 선택한 카피가 캔버스에 자동 추가
```

### 6. AI 이미지 생성
```
좌측 사이드바 > 🎨 AI 이미지 탭:
1. 이미지 설명(프롬프트) 입력
   예시: "A cup of strawberry frappuccino on pink background, 
          Starbucks style, commercial photography, natural lighting"
2. 스타일 선택 (Vivid / Natural)
3. 크기 선택 (1024×1024 / 1792×1024 / 1024×1792)
4. 품질 선택 (Standard $0.04 / HD $0.08)
5. "🎨 AI 이미지 생성" 클릭
6. 10-20초 대기
7. 생성된 이미지 확인
8. "➕ 캔버스에 추가" 클릭

💡 팁: 영어 프롬프트가 더 좋은 결과를 생성합니다!
```

### 7. 요소 편집
```
캔버스에서 요소 클릭 → 우측 속성 패널:

공통 속성:
- 불투명도: 0% ~ 100% 슬라이더
- 회전: 0° ~ 360° 슬라이더
- 삭제: 🗑️ 삭제 버튼 (또는 Delete 키)

도형 속성:
- 색상: 컬러 피커로 변경

텍스트 속성:
- 텍스트 내용 수정
- 폰트 선택 (6가지 Google Fonts)
- 글자 크기: 12px ~ 120px
- 글자 굵기: Normal / Medium / Bold / Black
- 색상: 컬러 피커

캔버스 조작:
- 이동: 요소 드래그
- 크기 조절: 모서리 핸들 드래그
- 회전: 상단 중앙 핸들 드래그
```

### 8. 키보드 단축키
```
- Ctrl+Z: 되돌리기 (Undo)
- Ctrl+Y: 다시하기 (Redo)
- Delete: 선택한 요소 삭제
```

### 9. 성과 예측
```
1. 텍스트 요소 선택
2. 우측 속성 패널에서 "📊 성과 예측" 클릭
3. 결과 확인:
   - 인게이지먼트율 (예: 4.2%)
   - 예상 도달 수 (예: 15,234명)
   - 예상 좋아요 수 (예: 1,250개)
   - 개선 제안 (3가지)
```

### 10. 저장 및 내보내기
```
상단 툴바:
- "💾 저장" → 프로젝트 데이터베이스에 저장
- "⬇️ PNG" → PNG 고품질 이미지 다운로드
- "⬇️ JPG" → JPG 압축 이미지 다운로드

파일명 형식: [프로젝트명] - [날짜].png
```

---

## 📡 API 문서

### Node.js API (포트 3001)

#### 인증
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "홍길동",
  "email": "hong@example.com",
  "password": "password123"
}

Response:
{
  "message": "User registered successfully"
}
```
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "hong@example.com",
  "password": "password123"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "홍길동",
    "email": "hong@example.com"
  }
}
```

#### 프로젝트
```http
GET /api/projects
Authorization: Bearer <token>

Response:
[
  {
    "id": 1,
    "title": "Instagram Post - 2025-01-15",
    "canvas_width": 1080,
    "canvas_height": 1080,
    "canvas_data": [...],
    "created_at": "2025-01-15T10:30:00Z",
    "updated_at": "2025-01-15T12:45:00Z"
  }
]
```
```http
POST /api/projects
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "New Project",
  "canvas_width": 800,
  "canvas_height": 1000
}

Response:
{
  "id": 2,
  "title": "New Project",
  "canvas_width": 800,
  "canvas_height": 1000
}
```
```http
PUT /api/projects/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Title",
  "canvas_data": [...],
  "canvas_width": 1080,
  "canvas_height": 1080
}

Response:
{
  "message": "Project updated successfully"
}
```
```http
DELETE /api/projects/:id
Authorization: Bearer <token>

Response:
{
  "message": "Project deleted successfully"
}
```

#### 파일 업로드
```http
POST /api/upload
Authorization: Bearer <token>
Content-Type: multipart/form-data

file: [이미지 파일]

Response:
{
  "url": "/uploads/1642345678901-image.jpg"
}
```

### Python API (포트 8000)

#### AI 텍스트 생성
```http
POST /api/ai/generate-text
Content-Type: application/json

{
  "brand_name": "스타벅스",
  "product": "신메뉴 딸기 프라푸치노",
  "purpose": "promotion",
  "tone": "friendly",
  "platform": "instagram"
}

Response:
{
  "copies": [
    {
      "text": "🍓 봄이 왔어요! 달콤한 딸기가 가득한 신메뉴 딸기 프라푸치노를 만나보세요. 💕",
      "hashtags": ["#스타벅스", "#딸기프라푸치노", "#신메뉴", "#봄음료", "#딸기시즌", "#카페", "#스타벅스신메뉴"],
      "score": 0.92,
      "reasoning": "감성적이고 친근한 톤으로 봄 시즌과 딸기를 강조했습니다."
    },
    {
      "text": "🌸 상큼한 딸기의 향연! 지금 스타벅스에서 딸기 프라푸치노와 함께 봄을 느껴보세요.",
      "hashtags": ["#스타벅스", "#딸기음료", "#봄시즌", "#프라푸치노", "#신메뉴", "#딸기", "#카페스타그램"],
      "score": 0.88,
      "reasoning": "시각적 요소와 계절감을 강조한 카피입니다."
    },
    {
      "text": "딸기 사랑하는 당신을 위한 특별한 선물! 🎁 스타벅스 딸기 프라푸치노가 돌아왔어요!",
      "hashtags": ["#스타벅스", "#딸기프라푸치노", "#딸기음료", "#신메뉴", "#봄음료", "#스벅", "#카페"],
      "score": 0.85,
      "reasoning": "개인화된 메시지로 고객과의 친밀감을 형성합니다."
    }
  ]
}
```

#### AI 이미지 생성
```http
POST /api/ai/generate-image
Content-Type: application/json

{
  "prompt": "A cup of strawberry frappuccino on pink background, Starbucks style, commercial photography, natural lighting",
  "style": "vivid",
  "size": "1024x1024",
  "quality": "standard"
}

Response:
{
  "success": true,
  "image_url": "https://oaidalleapiprodscus.blob.core.windows.net/...",
  "prompt": "A cup of strawberry frappuccino on pink background...",
  "revised_prompt": "A vibrant cup of strawberry frappuccino with whipped cream topping, placed on a soft pink background. The drink features fresh strawberry pieces and has a Starbucks-style appearance. Commercial photography with natural lighting creates a fresh and appetizing look.",
  "style": "vivid",
  "size": "1024x1024",
  "quality": "standard",
  "meta": {
    "model": "dall-e-3",
    "cost": 0.04,
    "timestamp": "2025-01-15T14:30:00Z"
  }
}
```

#### 트렌드 데이터
```http
GET /api/data/trending

Response:
{
  "trending_topics": [
    {
      "keyword": "봄신메뉴",
      "volume": 15234,
      "growth_rate": 45.2,
      "category": "food"
    },
    {
      "keyword": "다이어트",
      "volume": 23456,
      "growth_rate": 32.1,
      "category": "health"
    }
  ]
}
```

#### 성과 예측
```http
POST /api/analytics/predict
Content-Type: application/json

{
  "text": "🍓 봄이 왔어요! 달콤한 딸기가 가득한 신메뉴 딸기 프라푸치노를 만나보세요. 💕",
  "has_image": true,
  "hashtags": ["#스타벅스", "#딸기프라푸치노", "#신메뉴"],
  "platform": "instagram"
}

Response:
{
  "predictions": {
    "engagement_rate": {
      "value": 4.2,
      "confidence": 0.85
    },
    "estimated_reach": 15234,
    "estimated_likes": 1250
  },
  "recommendations": [
    {
      "aspect": "해시태그",
      "suggestion": "트렌딩 해시태그 #봄음료 추가 권장",
      "impact": "높음"
    },
    {
      "aspect": "비주얼",
      "suggestion": "제품 이미지 크기를 더 크게 배치",
      "impact": "중간"
    },
    {
      "aspect": "카피",
      "suggestion": "CTA(행동 유도) 문구 추가",
      "impact": "중간"
    }
  ]
}
```

---

## 📁 프로젝트 구조
```
artify/
│
├── backend/                      # Node.js 백엔드
│   ├── server.js                # Express 서버 메인 파일
│   ├── package.json             # Node.js 의존성
│   ├── database.db              # SQLite 데이터베이스 (자동 생성)
│   └── uploads/                 # 업로드된 이미지 저장
│       └── .gitkeep
│
├── backend-python/              # Python AI 백엔드
│   ├── main.py                 # FastAPI 서버 메인 파일
│   ├── requirements.txt        # Python 의존성
│   ├── .env                    # 환경 변수 (Git 제외)
│   ├── .env.example            # 환경 변수 예시
│   └── venv/                   # Python 가상환경 (Git 제외)
│
├── frontend/                    # 프론트엔드
│   ├── index.html              # 대시보드 (프로젝트 목록)
│   ├── login.html              # 로그인 페이지
│   └── editor.html             # 캔버스 에디터 (React)
│
├── .gitignore                   # Git 제외 파일 목록
├── LICENSE                      # MIT 라이선스
├── README.md                    # 프로젝트 문서 (이 파일)
├── INSTALLATION.md              # 설치 가이드
└── GUIDE.md                     # 사용자 가이드
```

---

## 📸 스크린샷

### 1. 로그인 페이지
```
[스크린샷 추가 예정]
- 깔끔한 로그인 UI
- 회원가입 기능
- JWT 기반 인증
```

### 2. 대시보드
```
[스크린샷 추가 예정]
- 프로젝트 카드 그리드 레이아웃
- 새 프로젝트 생성 버튼
- 프로젝트 편집/삭제 기능
```

### 3. 템플릿 선택 모달
```
[스크린샷 추가 예정]
- 5가지 SNS 템플릿
- Instagram, Facebook, Twitter
- 템플릿별 해상도 표시
```

### 4. 캔버스 에디터
```
[스크린샷 추가 예정]
- 좌측: 요소/업로드/AI 사이드바
- 중앙: 캔버스 편집 영역
- 우측: 속성 패널 + 트렌드
- 상단: 툴바 (저장, 다운로드, Undo/Redo)
```

### 5. AI 텍스트 생성
```
[스크린샷 추가 예정]
- AI 생성 폼 (브랜드, 제품, 목적, 톤)
- 생성된 3가지 카피 결과
- 해시태그 & 점수 표시
```

### 6. AI 이미지 생성
```
[스크린샷 추가 예정]
- 프롬프트 입력 필드
- 스타일/크기/품질 선택
- 생성된 이미지 미리보기
- 비용 정보 표시
```

### 7. 요소 편집
```
[스크린샷 추가 예정]
- 텍스트 속성 패널 (폰트, 크기, 색상)
- 도형 속성 패널 (색상, 불투명도)
- 회전 및 크기 조절 핸들
```

### 8. 성과 예측
```
[스크린샷 추가 예정]
- 인게이지먼트율 예측
- 예상 도달 수 / 좋아요 수
- AI 기반 개선 제안
```

---

## 🎥 데모 영상

> 📹 [YouTube 데모 링크 추가 예정]

**시연 내용:**
1. 로그인 및 프로젝트 생성
2. 템플릿 선택 (Instagram Post)
3. 요소 추가 및 편집 (도형, 텍스트)
4. 이미지 업로드
5. AI 텍스트 생성 (GPT-4)
6. AI 이미지 생성 (DALL-E 3)
7. 트렌드 데이터 확인
8. 성과 예측
9. PNG/JPG 내보내기

---

## 🔧 트러블슈팅

### 포트 충돌
```bash
# 포트 8000 사용 중인 프로세스 종료 (Windows)
netstat -ano | findstr :8000
taskkill /PID [PID번호] /F

# 포트 3001 사용 중인 프로세스 종료 (Windows)
netstat -ano | findstr :3001
taskkill /PID [PID번호] /F

# Mac/Linux
lsof -ti:8000 | xargs kill -9
lsof -ti:3001 | xargs kill -9
```

### OpenAI API 에러
```
⚠️ OpenAI API 키가 없거나 잘못됨
→ backend-python/.env 파일 확인
→ OPENAI_API_KEY=sk-proj-... 형식 확인
→ API 키 유효성 확인: https://platform.openai.com/api-keys
```

### Python 가상환경 활성화 실패
```powershell
# Windows PowerShell 실행 정책 변경
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# 다시 활성화
.\venv\Scripts\Activate.ps1
```

### 데이터베이스 에러
```bash
# SQLite 데이터베이스 초기화
cd backend
rm database.db  # Mac/Linux
del database.db # Windows
npm start       # 자동으로 재생성됨
```

### npm install 실패
```bash
# 캐시 삭제 후 재설치
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Python 패키지 설치 에러
```bash
# --break-system-packages 옵션 사용
pip install [패키지명] --break-system-packages

# 또는 가상환경 재생성
rm -rf venv
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

### CORS 에러
```
⚠️ Access to fetch has been blocked by CORS policy
→ backend/server.js에서 CORS 설정 확인
→ app.use(cors()) 코드 확인
→ 브라우저 캐시 삭제 (Ctrl+Shift+Delete)
```

### 이미지 업로드 실패
```
⚠️ 파일 크기 초과
→ 10MB 이하 파일만 업로드 가능
→ 이미지 압축 후 재시도

⚠️ uploads 폴더 권한 에러
→ backend/uploads 폴더 생성
→ 폴더 쓰기 권한 확인
```

---

## 🚀 향후 개선 계획

### Phase 2 (추가 기능)
- [ ] 레이어 관리 패널 (순서 변경, 잠금)
- [ ] 그라데이션 배경 지원
- [ ] 텍스트 정렬 옵션 (좌/중/우)
- [ ] 이미지 필터 및 효과
- [ ] 도형 그림자 효과
- [ ] 글자 간격 조절

### Phase 3 (협업 기능)
- [ ] 실시간 다중 사용자 편집 (WebSocket)
- [ ] 댓글 시스템
- [ ] 버전 히스토리 (무제한 Undo/Redo)
- [ ] 팀 워크스페이스

### Phase 4 (템플릿 마켓플레이스)
- [ ] 커뮤니티 템플릿 공유
- [ ] 템플릿 검색 및 필터
- [ ] 인기 템플릿 랭킹
- [ ] 템플릿 리뷰 시스템

### Phase 5 (배포)
- [ ] Frontend: Vercel 배포
- [ ] Python API: Render 배포
- [ ] Node.js API: Railway 배포
- [ ] Database: PostgreSQL 마이그레이션
- [ ] CDN: Cloudflare 적용
- [ ] 도메인 연결

### Phase 6 (최적화)
- [ ] 이미지 자동 압축 (Sharp)
- [ ] 코드 번들링 (Vite)
- [ ] 레이지 로딩
- [ ] 서버 사이드 캐싱
- [ ] 데이터베이스 인덱싱

### Phase 7 (모바일)
- [ ] 반응형 디자인 개선
- [ ] 터치 제스처 지원
- [ ] PWA 변환
- [ ] 모바일 앱 (React Native)

---

## 👥 개발 팀

| 이름 | 역할 | 담당 | GitHub |
|------|------|------|--------|
| 김도현 | Full-stack Developer | 전체 시스템 설계 및 구현 | [@josens83](https://github.com/josens83) |

---

## 🙏 감사의 말

이 프로젝트는 다음 오픈소스 기술들을 활용했습니다:

- **[OpenAI API](https://openai.com/)** - GPT-4 텍스트 생성 및 DALL-E 3 이미지 생성
- **[FastAPI](https://fastapi.tiangolo.com/)** - 현대적인 Python 웹 프레임워크
- **[Express.js](https://expressjs.com/)** - Node.js 웹 애플리케이션 프레임워크
- **[React](https://react.dev/)** - 사용자 인터페이스 라이브러리
- **[Tailwind CSS](https://tailwindcss.com/)** - 유틸리티 우선 CSS 프레임워크
- **[html2canvas](https://html2canvas.hertzen.com/)** - HTML을 Canvas로 변환
- **[Google Fonts](https://fonts.google.com/)** - 웹 폰트 제공

---

## 📄 라이선스

MIT License

Copyright (c) 2025 Artify Project

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

- **이메일**: dohurnk@gmail.com
- **GitHub**: [@josens83](https://github.com/josens83)
- **프로젝트 저장소**: [Artify](https://github.com/josens83/artify)
- **이슈 리포트**: [GitHub Issues](https://github.com/josens83/artify/issues)

---

<div align="center">

**⭐ 이 프로젝트가 마음에 드셨다면 Star를 눌러주세요! ⭐**

Made with ❤️ by Do Hurn Kim

</div>