# app/ - Next.js App Router

## 라우트 구조
```
app/
├── page.tsx           # / (랜딩 페이지)
├── globals.css        # 전역 스타일
├── layout.tsx         # 루트 레이아웃
├── editor/
│   └── page.tsx       # /editor (에디터 페이지)
└── api/
    └── chat/
        └── route.ts   # POST /api/chat
```

## 페이지

### / (랜딩)
- 히어로 섹션 + 기능 소개
- CTA → /editor로 이동

### /editor
- 이미지 업로드
- 프로/자유 모드 선택
- 채팅 인터페이스

## API 라우트

### POST /api/chat
```typescript
// 요청
{
  image: string;      // base64
  prompt: string;
  mode: "pro" | "free";
  history?: ChatMessage[];
}

// 응답
{
  success: boolean;
  message: string;
  resultImage?: string;  // base64
  error?: string;
}
```

### Vercel 설정
```typescript
export const maxDuration = 60;  // 필수! (Pro 플랜)
```

## 전역 스타일 (globals.css)
- 커스텀 스크롤바 (rose 색상)
- `.gradient-text`: 그라데이션 텍스트
- `.glass`: 글래스모피즘 효과
- `.animate-fade-in-up`: 채팅 애니메이션
