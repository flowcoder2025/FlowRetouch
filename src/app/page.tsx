"use client";

import { useRouter } from "next/navigation";
import { Sparkles, ImageIcon, MessageCircle, Download, ArrowRight, Heart } from "lucide-react";
import Button from "@/components/ui/Button";

export default function Home() {
  const router = useRouter();

  const features = [
    {
      icon: <ImageIcon className="w-8 h-8" />,
      title: "스마트 이미지 업로드",
      description: "드래그 앤 드롭으로 간편하게 웨딩 사진을 업로드하세요.",
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "대화형 보정",
      description: "AI와 대화하며 원하는 스타일로 사진을 보정할 수 있습니다.",
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Nano Banana Pro",
      description: "Google의 최신 AI 모델로 프로페셔널한 보정 결과를 제공합니다.",
    },
    {
      icon: <Download className="w-8 h-8" />,
      title: "고화질 다운로드",
      description: "보정된 사진을 원본 화질 그대로 다운로드하세요.",
    },
  ];

  const presets = [
    { name: "로맨틱 핑크", color: "from-pink-300 to-rose-400" },
    { name: "클래식 화이트", color: "from-gray-100 to-white" },
    { name: "빈티지 웜", color: "from-amber-200 to-orange-300" },
    { name: "내추럴 소프트", color: "from-rose-100 to-pink-200" },
    { name: "시네마틱", color: "from-slate-400 to-gray-600" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-cream-50 to-blush-50" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-rose-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blush-200/30 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:py-32">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 rounded-full shadow-sm mb-8">
              <Sparkles className="w-4 h-4 text-rose-500" />
              <span className="text-sm font-medium text-rose-600">Powered by Nano Banana Pro</span>
            </div>

            {/* Title */}
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
              당신의 웨딩 사진을
              <br />
              <span className="gradient-text">완벽하게</span> 보정하세요
            </h1>

            {/* Description */}
            <p className="max-w-2xl mx-auto text-lg text-gray-600 mb-10">
              AI와 대화하며 웨딩 사진을 전문가 수준으로 보정하세요.
              <br />
              피부 톤, 색감, 조명까지 원하는 대로 조절할 수 있습니다.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => router.push("/editor")}>
                지금 시작하기
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="outline" size="lg">
                샘플 보기
              </Button>
            </div>
          </div>

          {/* Preview Image Placeholder */}
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-rose-100">
              <div className="aspect-video bg-gradient-to-br from-rose-100 to-blush-100 flex items-center justify-center">
                <div className="text-center">
                  <Heart className="w-16 h-16 text-rose-300 mx-auto mb-4" />
                  <p className="text-rose-400 font-medium">미리보기 이미지</p>
                </div>
              </div>
              {/* Floating cards */}
              <div className="absolute top-4 right-4 glass px-4 py-2 rounded-lg shadow-lg">
                <span className="text-sm font-medium text-rose-600">✨ AI 보정 적용 중</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              강력한 기능
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              최신 AI 기술로 웨딩 사진 보정의 새로운 경험을 제공합니다
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-gradient-to-br from-rose-50 to-cream-50 border border-rose-100 hover:shadow-lg transition-shadow"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-rose-400 to-blush-400 flex items-center justify-center text-white mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Presets Section */}
      <section className="py-24 bg-gradient-to-br from-cream-50 to-rose-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              웨딩 전용 프리셋
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              전문가가 디자인한 웨딩 특화 프리셋으로 빠르게 보정하세요
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {presets.map((preset, index) => (
              <div
                key={index}
                className="group cursor-pointer"
              >
                <div className={`
                  w-32 h-32 rounded-2xl bg-gradient-to-br ${preset.color}
                  shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300
                  border border-white/50
                `} />
                <p className="text-center mt-3 text-sm font-medium text-gray-700">{preset.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-rose-500 to-blush-500">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-6">
            지금 바로 시작하세요
          </h2>
          <p className="text-rose-100 mb-10 text-lg">
            무료로 웨딩 사진 보정을 체험해보세요
          </p>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => router.push("/editor")}
            className="bg-white text-rose-600 hover:bg-rose-50"
          >
            에디터 시작하기
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-900 text-gray-400">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm">
            © 2025 Wedding Retouch AI. Powered by Nano Banana Pro (Gemini 3 Pro Image Preview)
          </p>
        </div>
      </footer>
    </div>
  );
}
