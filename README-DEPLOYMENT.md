# 리챤 트레이더 배포 가이드

## 바이낸스 API 지역 제한 해결을 위한 배포 옵션

현재 Replit 환경에서 바이낸스 API가 451 지역 제한으로 차단되어 있습니다. 다른 플랫폼에 배포하여 실제 바이낸스 데이터에 접근할 수 있습니다.

### 옵션 1: Vercel (추천)

#### 1단계: GitHub 리포지토리 생성
```bash
git init
git add .
git commit -m "리챤 트레이더 초기 버전"
git remote add origin https://github.com/[username]/richan-trader.git
git push -u origin main
```

#### 2단계: Vercel 배포
1. https://vercel.com 에서 회원가입/로그인
2. "New Project" 클릭
3. GitHub 리포지토리 연결
4. 빌드 설정:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

#### 3단계: 환경 변수 설정
Vercel 프로젝트 설정에서 다음 환경 변수 추가:
- `BINANCE_API_KEY`: 바이낸스 API 키
- `BINANCE_SECRET_KEY`: 바이낸스 시크릿 키
- `NODE_ENV`: `production`

### 옵션 2: Railway

#### 1단계: Railway 배포
1. https://railway.app 에서 회원가입/로그인
2. "New Project" → "Deploy from GitHub repo"
3. 리포지토리 선택

#### 2단계: 환경 변수 설정
Railway 프로젝트 설정에서 환경 변수 추가 (위와 동일)

### 옵션 3: Render

#### 1단계: Render 배포
1. https://render.com 에서 회원가입/로그인
2. "New" → "Web Service"
3. GitHub 리포지토리 연결
4. 설정:
   - Build Command: `npm run build`
   - Start Command: `npm start`

#### 2단계: 환경 변수 설정
Render 환경 변수에 바이낸스 API 키 추가

## 배포 후 확인사항

1. 바이낸스 API 접근 확인 (451 오류 해결)
2. 실제 BTC 데이터 표시 (-2.12% 등)
3. 실시간 코인 데이터 업데이트
4. 펀딩 시간 경고 기능
5. 1분 캔들 플로우 분석

## 문제 해결

- 여전히 451 오류 발생 시: 다른 지역 서버 시도
- API 키 오류 시: 환경 변수 확인
- 빌드 실패 시: Node.js 18 이상 사용 확인