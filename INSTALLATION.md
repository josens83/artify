# 🚀 Canva Clone 설치 가이드

## 사전 요구사항

- Node.js 18.x 이상
- Python 3.11 이상
- npm 또는 yarn
- Git

## 빠른 시작

### 1. 프로젝트 클론
```bash
git clone https://github.com/yourusername/canva-clone-project.git
cd canva-clone-project
```

### 2. Backend (Node.js) 설치
```bash
cd backend
npm install
```

**환경 변수 설정 (.env):**
```
PORT=3001
JWT_SECRET=your-secret-key-here
```

### 3. Backend (Python) 설치
```bash
cd backend-python
python -m venv venv

# Windows
.\venv\Scripts\Activate.ps1

# Mac/Linux
source venv/bin/activate

pip install -r requirements.txt
```

**환경 변수 설정 (.env):**
```
GEMINI_API_KEY=your-gemini-api-key-here
```

> 💡 Gemini API 키: https://aistudio.google.com/app/apikey

### 4. 서버 실행

**터미널 1 (Python):**
```bash
cd backend-python
.\venv\Scripts\Activate.ps1
uvicorn main:app --reload --port 8000
```

**터미널 2 (Node.js):**
```bash
cd backend
npm start
```

### 5. 브라우저 접속
```
http://localhost:3001
```

## 문제 해결

### 포트 충돌
```bash
# Windows
netstat -ano | findstr :8000
taskkill /PID [PID번호] /F

# Mac/Linux
lsof -ti:8000 | xargs kill -9
```

### 패키지 설치 오류 (Python)
```bash
pip install [패키지명] --break-system-packages
```

### 데이터베이스 초기화
```bash
cd backend
rm canva-clone.db
npm start
```

## 더 자세한 정보

- [README.md](README.md) - 전체 프로젝트 문서
- [API 문서](README.md#api-문서)
- [사용 방법](README.md#사용-방법)