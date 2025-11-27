# components/ - React 컴포넌트

## 구조
```
components/
├── ui/       # 기본 UI 컴포넌트 (Button, Input 등)
├── chat/     # 채팅 인터페이스 컴포넌트
└── editor/   # 에디터 관련 컴포넌트
```

## Variant 시스템 규칙

### 표준 Props
```typescript
variant?: "primary" | "secondary" | "ghost" | "outline";
size?: "sm" | "md" | "lg";
```

### 스타일 구조
```typescript
const baseStyles = "공통 스타일";
const variants = { primary: "...", secondary: "..." };
const sizes = { sm: "...", md: "...", lg: "..." };
```

## 컴포넌트 생성 원칙
1. `forwardRef` 사용으로 ref 전달 지원
2. `...props` spread로 HTML 속성 확장
3. `className` prop으로 커스텀 스타일 허용
4. variant/size 기본값 설정

## 색상 팔레트
- **Primary**: rose-400 ~ rose-600
- **Secondary**: blush-100 ~ blush-300
- **Background**: cream-50, rose-50

> 상세 가이드: [/docs/ui-components.md](../../docs/ui-components.md)
