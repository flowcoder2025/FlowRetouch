# lib/ - 유틸리티 및 외부 서비스

## 파일 구조
```
lib/
└── gemini.ts    # Gemini AI SDK 래퍼
```

## gemini.ts

### 핵심 함수

| 함수 | 용도 | 모드 |
|------|------|------|
| `chatWithImage()` | 대화형 이미지 보정 | free/pro |
| `proAutoRetouch()` | 원클릭 프로 보정 | pro |

### 필수 config 설정
```typescript
config: {
  responseModalities: ["TEXT", "IMAGE"],  // 필수!
}
```

**금지 옵션** (이미지 모델 미지원):
- `temperature`
- `maxOutputTokens`

### Export 타입
- `RetouchMode`: `"pro" | "free"`
- `ChatMessage`: 대화 메시지 구조
- `RetouchRequest`: API 요청 구조
- `RetouchResponse`: API 응답 구조

## 수정 시 주의사항
1. `responseModalities` 제거 금지
2. 이미지 모델용 config에 텍스트 모델 옵션 추가 금지
3. 환경변수 fallback 체인 유지

> 상세 가이드: [/docs/gemini-sdk.md](../../docs/gemini-sdk.md)
