import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FlowRetouch | AI 웨딩사진 보정 서비스",
  description: "FlowCoder 팀이 제공하는 AI 기반 웨딩사진 보정 서비스. Gemini 3 Pro Image로 완벽한 웨딩 사진을 만들어보세요.",
  keywords: ["웨딩사진", "사진보정", "AI", "FlowRetouch", "FlowCoder", "Gemini"],
  authors: [{ name: "FlowCoder" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased min-h-screen bg-cream-50">
        {children}
      </body>
    </html>
  );
}
