# Render 배포 가이드 (Railway 무료 플랜 제한으로 인한 대안)

Railway 무료 플랜은 웹 서비스 배포에 제한이 있어 Render를 사용합니다.

## Render 배포 단계

1. **https://render.com** 접속
2. **GitHub 계정으로 로그인**
3. **"New +" → "Web Service"** 클릭
4. **"Connect a repository"** → **richan-trader 선택**

## 배포 설정

- **Name**: `richan-trader`
- **Region**: `US West` (바이낸스 API 접근 가능)
- **Branch**: `main`
- **Build Command**: `npm run build`
- **Start Command**: `npm start`
- **Plan**: **Free** 선택

## 환경 변수 설정

Environment 탭에서:
- `BINANCE_API_KEY` = (API 키)
- `BINANCE_SECRET_KEY` = (시크릿 키)
- `NODE_ENV` = `production`

## 예상 결과

Render 서버는 미국 서버로 바이낸스 API 451 지역 제한이 해결되어 실제 데이터가 표시될 것입니다.

## 백업: Railway (유료)

Railway는 $5/월 Pro 플랜부터 웹 서비스 배포가 가능합니다.