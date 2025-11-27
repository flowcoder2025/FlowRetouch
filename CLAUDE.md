# FlowRetouch - 웨딩 사진 AI 보정 서비스

## 프로젝트 개요
- **스택**: Next.js 16 + React 19 + TypeScript + Tailwind CSS
- **AI**: Google Gemini 3 Pro Image (`@google/genai` SDK)
- **배포**: Vercel Serverless

## 핵심 규칙

### Gemini SDK 사용 시 필수 사항
이미지 생성/편집 모델 사용 시 반드시 `responseModalities` 설정 필요:

```typescript
const response = await ai.models.generateContent({
  model: "gemini-3-pro-image-preview",
  contents: parts,
  config: {
    responseModalities: ["TEXT", "IMAGE"],  // 필수!
  },
});
```

**주의**: `temperature`, `maxOutputTokens`는 이미지 모델에서 지원하지 않음.

> 상세 가이드: [docs/gemini-sdk.md](./docs/gemini-sdk.md)

### UI 컴포넌트 Variant 시스템
모든 UI 컴포넌트는 `variant`와 `size` props를 통해 재사용:

```typescript
interface ComponentProps {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
}
```

> 상세 가이드: [docs/ui-components.md](./docs/ui-components.md)

## 디렉토리 구조
```
src/
├── app/          # Next.js App Router 페이지
├── components/   # React 컴포넌트
│   ├── ui/       # 기본 UI (Button, Input 등)
│   ├── chat/     # 채팅 관련
│   └── editor/   # 에디터 관련
└── lib/          # 유틸리티 (Gemini SDK 등)
```

각 디렉토리의 `claude.md` 파일에서 해당 영역의 상세 가이드 확인.

## 환경 변수
```env
GEMINI_API_KEY=xxx      # 우선순위 1
GOOGLE_API_KEY=xxx      # 우선순위 2 (자동 감지용)
GOOGLE_AI_API_KEY=xxx   # 우선순위 3
```

## Vercel 배포 설정
- `maxDuration = 60`: API 라우트에 필수 (Pro 플랜 필요)
- 이미지 처리는 60초 타임아웃 내 완료되어야 함

## 작업 마무리 프로세스

### 필수 단계
1. **최종 피드백 확인**: 마무리 전 사용자에게 피드백 요청
2. **문서 업데이트**: 변경사항 발생 시 관련 `claude.md` 파일 먼저 수정
3. **품질 검증**: 타입체크 + 빌드테스트 실행
4. **버전 관리**: 커밋 + 푸쉬

### 검증 명령어
```bash
# 타입체크
npx tsc --noEmit

# 빌드테스트
npm run build

# 커밋 & 푸쉬
git add .
git commit -m "feat: 작업 내용 요약"
git push
```

### 프로세스 순서
```
작업 완료 → 피드백 요청 → (변경 시) claude.md 업데이트 → 타입체크 → 빌드테스트 → 커밋 → 푸쉬 → 완료
```
