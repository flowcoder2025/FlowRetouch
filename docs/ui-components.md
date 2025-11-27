# UI 컴포넌트 가이드

## Variant 시스템
모든 UI 컴포넌트는 일관된 variant/size 패턴을 따름.

### 표준 Props 인터페이스

```typescript
interface BaseProps {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
}
```

### Variant 스타일 매핑

| Variant | 용도 | 색상 |
|---------|------|------|
| `primary` | 주요 액션 | rose 그라데이션 |
| `secondary` | 보조 액션 | blush 배경 |
| `ghost` | 투명 배경 | hover 시 rose-50 |
| `outline` | 테두리만 | rose 테두리 |

### Size 스타일 매핑

| Size | padding | font-size |
|------|---------|-----------|
| `sm` | `px-3 py-1.5` | `text-sm` |
| `md` | `px-5 py-2.5` | `text-base` |
| `lg` | `px-8 py-3.5` | `text-lg` |

## 컴포넌트 생성 템플릿

```typescript
interface ComponentProps extends HTMLAttributes<HTMLElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
}

const Component = forwardRef<HTMLElement, ComponentProps>(
  ({ variant = "primary", size = "md", className = "", ...props }, ref) => {
    const variants = { /* 스타일 맵 */ };
    const sizes = { /* 사이즈 맵 */ };

    return (
      <element
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      />
    );
  }
);
```

## 컴포넌트 목록

| 컴포넌트 | 위치 | Variant 지원 |
|----------|------|-------------|
| Button | `ui/Button.tsx` | O |
| ChatInput | `chat/ChatInput.tsx` | - |
| ChatMessage | `chat/ChatMessage.tsx` | - |
| ModeSelector | `editor/ModeSelector.tsx` | - |

## 디자인 토큰
- **Primary Color**: rose (400-600)
- **Secondary Color**: blush (100-300)
- **Background**: cream-50, rose-50
- **Border Radius**: `rounded-xl`, `rounded-2xl`
