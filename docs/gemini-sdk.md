# Gemini SDK 가이드

## SDK 정보
- **패키지**: `@google/genai`
- **모델**: `gemini-3-pro-image-preview` (이미지 생성/편집)

## 초기화
SDK는 환경변수를 자동 감지하므로 여러 키 이름 지원:

```typescript
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || "",
});
```

## 이미지 모델 필수 설정

### responseModalities (필수)
이미지 생성/편집 시 반드시 명시해야 함:

| 값 | 용도 |
|---|---|
| `["TEXT", "IMAGE"]` | 텍스트 + 이미지 응답 (보정 설명 포함) |
| `["IMAGE"]` | 이미지만 응답 |

### 지원하지 않는 옵션
이미지 모델에서 다음 옵션은 **무시되거나 오류 발생**:
- `temperature`
- `maxOutputTokens`
- `topP`, `topK`

## API 호출 패턴

```typescript
const response = await ai.models.generateContent({
  model: "gemini-3-pro-image-preview",
  contents: [
    { inlineData: { mimeType: "image/jpeg", data: base64Data } },
    { text: "보정 프롬프트" }
  ],
  config: {
    responseModalities: ["TEXT", "IMAGE"],
  },
});
```

## 응답 처리

```typescript
for (const part of response.candidates[0].content.parts) {
  if (part.text) {
    // 텍스트 응답
  } else if (part.inlineData?.data) {
    // 이미지 응답 (base64)
    const imageUrl = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
  }
}
```

## 흔한 실수

| 문제 | 원인 | 해결 |
|-----|-----|-----|
| 이미지 응답 없음 | `responseModalities` 누락 | `["TEXT", "IMAGE"]` 추가 |
| 타임아웃 | 이미지 처리 시간 | Vercel `maxDuration=60` 설정 |
| API 키 오류 | 환경변수 미설정 | `.env.local` 확인 |

## 참고 자료
- 공식 문서: https://ai.google.dev/gemini-api/docs/image-generation
