# Wedding Retouch AI

웨딩사진 보정 웹 애플리케이션 - Nano Banana Pro (Gemini 3 Pro Image Preview) 기반

## 기능

- 🖼️ 웨딩사진 업로드 (드래그 앤 드롭 지원)
- 💬 대화형 AI 보정 인터페이스
- ✨ Nano Banana Pro 모델을 활용한 고품질 이미지 보정
- 📥 보정된 이미지 다운로드

## 기술 스택

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **AI**: Google Gemini API (gemini-3-pro-image-preview)

## 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

`.env.local.example`을 `.env.local`로 복사하고 Google AI API 키를 설정합니다:

```bash
cp .env.local.example .env.local
```

Google AI Studio에서 API 키 발급: https://aistudio.google.com/apikey

### 3. 개발 서버 실행

```bash
npm run dev
```

http://localhost:3000 에서 애플리케이션을 확인할 수 있습니다.

## 사용 방법

1. 홈페이지에서 "지금 시작하기" 클릭
2. 웨딩 사진 업로드
3. 원하는 보정 내용을 대화형으로 요청
   - "피부 톤을 자연스럽게 보정해줘"
   - "드레스를 더 밝게 해줘"
   - "로맨틱한 핑크 톤으로 바꿔줘"
4. 보정된 이미지 다운로드

## 라이선스

MIT
