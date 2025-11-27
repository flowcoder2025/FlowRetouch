# editor/ - 에디터 컴포넌트

## 파일 목록
| 파일 | 용도 |
|------|------|
| `ModeSelector.tsx` | 프로/자유 모드 선택 |
| `ProRetouchButton.tsx` | 원클릭 프로 보정 버튼 |

## ModeSelector
- `RetouchMode`: `"pro" | "free"`
- 프로 모드: 골드 그라데이션
- 자유 모드: 로즈 그라데이션

### Export
- `ModeSelector`: 모드 선택 버튼
- `ModeInfoCard`: 모드 설명 카드

## ProRetouchButton
- 프로 모드 원클릭 자동 보정 트리거
- `proAutoRetouch()` 함수 호출
- 로딩 상태 표시

## 모드별 동작
| 모드 | 설명 | API 함수 |
|------|------|----------|
| pro | After-Service 품질 자동 보정 | `proAutoRetouch()` |
| free | 대화형 자유 보정 | `chatWithImage()` |
