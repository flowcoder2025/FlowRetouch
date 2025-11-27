# ui/ - 기본 UI 컴포넌트

## 파일 목록
| 파일 | 컴포넌트 | Variant | Size |
|------|----------|---------|------|
| `Button.tsx` | Button | O | O |

## Button 컴포넌트

### Props
```typescript
interface ButtonProps {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}
```

### 사용법
```tsx
<Button variant="primary" size="lg">
  시작하기
</Button>
```

## 신규 컴포넌트 추가 시
1. 동일한 variant/size 패턴 적용
2. `forwardRef` 필수
3. `displayName` 설정
4. 이 문서에 추가
