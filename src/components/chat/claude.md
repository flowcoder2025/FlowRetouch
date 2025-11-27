# chat/ - 채팅 인터페이스 컴포넌트

## 파일 목록
| 파일 | 용도 |
|------|------|
| `ChatInput.tsx` | 메시지 입력 + 프리셋 버튼 |
| `ChatMessage.tsx` | 채팅 메시지 버블 |
| `ImageUpload.tsx` | 이미지 업로드 드롭존 |

## ChatInput
- Enter로 전송, Shift+Enter로 줄바꿈
- 프리셋 제안 버튼 포함
- 이미지 첨부 지원 (`onImageSelect`)

## ChatMessage
- role에 따라 user/assistant 스타일 분기
- 이미지 첨부 시 썸네일 표시
- 결과 이미지 다운로드 버튼

## ImageUpload
- 드래그 앤 드롭 지원
- base64 변환 후 콜백
- 파일 크기/형식 제한

## 데이터 흐름
```
ImageUpload → ChatInput → API → ChatMessage (결과)
```
