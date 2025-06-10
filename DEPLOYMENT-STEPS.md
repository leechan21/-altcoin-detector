# Vercel 배포 단계별 가이드

## 1. GitHub 리포지토리 준비
```bash
git init
git add .
git commit -m "리챤 트레이더 - 바이낸스 API 통합"
git branch -M main
git remote add origin https://github.com/[사용자명]/richan-trader.git
git push -u origin main
```

## 2. Vercel 배포
1. https://vercel.com 방문
2. GitHub 계정으로 로그인
3. "New Project" 선택
4. GitHub 리포지토리 선택
5. 자동 배포 설정:
   - Framework: Node.js
   - Build Command: `npm run build`
   - Output Directory: `dist`

## 3. 환경 변수 설정 (중요!)
Vercel 프로젝트 설정 → Environment Variables:
```
BINANCE_API_KEY = wgLOQdzF0cztwxjwhhnRl1cQx6TRorqZ6QBxEiwIIG2otx2EHdz9NVD9YAZTTb1g
BINANCE_SECRET_KEY = [시크릿 키]
NODE_ENV = production
```

## 4. 배포 완료 후 확인
- 바이낸스 API 451 오류 해결 확인
- 실제 BTC 데이터 표시 (-2.12% 등)
- 실시간 코인 데이터 업데이트
- 펀딩 시간 경고 기능

## 예상 결과
Vercel 서버에서 바이낸스 API 접근이 성공하여 실제 시장 데이터가 표시될 것입니다.