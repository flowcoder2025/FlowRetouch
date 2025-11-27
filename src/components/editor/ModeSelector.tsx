"use client";

import { Crown, MessageCircle, Sparkles } from "lucide-react";

export type RetouchMode = "pro" | "free";

interface ModeSelectorProps {
  currentMode: RetouchMode;
  onModeChange: (mode: RetouchMode) => void;
}

export default function ModeSelector({ currentMode, onModeChange }: ModeSelectorProps) {
  return (
    <div className="flex gap-2 p-1 bg-gray-100 rounded-xl">
      {/* 프로 모드 */}
      <button
        onClick={() => onModeChange("pro")}
        className={`
          flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg
          font-medium text-sm transition-all duration-200
          ${currentMode === "pro"
            ? "bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-lg"
            : "text-gray-600 hover:bg-gray-200"
          }
        `}
      >
        <Crown className="w-4 h-4" />
        <span>프로 모드</span>
      </button>

      {/* 자유 모드 */}
      <button
        onClick={() => onModeChange("free")}
        className={`
          flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg
          font-medium text-sm transition-all duration-200
          ${currentMode === "free"
            ? "bg-gradient-to-r from-rose-400 to-pink-500 text-white shadow-lg"
            : "text-gray-600 hover:bg-gray-200"
          }
        `}
      >
        <MessageCircle className="w-4 h-4" />
        <span>자유 모드</span>
      </button>
    </div>
  );
}

// 모드 정보 카드 컴포넌트
interface ModeInfoCardProps {
  mode: RetouchMode;
}

export function ModeInfoCard({ mode }: ModeInfoCardProps) {
  if (mode === "pro") {
    return (
      <div className="p-3 lg:p-4 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg lg:rounded-xl">
        <div className="flex items-center gap-2 mb-1.5 lg:mb-2">
          <Crown className="w-4 h-4 lg:w-5 lg:h-5 text-amber-600" />
          <h3 className="font-semibold text-amber-800 text-xs lg:text-sm">프로 모드 (After-Service)</h3>
        </div>
        <p className="text-xs lg:text-sm text-amber-700 mb-2 lg:mb-3">
          한국 고급 웨딩 스튜디오의 After-Service 품질 보정이 적용됩니다.
        </p>
        <div className="grid grid-cols-2 gap-1.5 lg:gap-2 text-[10px] lg:text-xs text-amber-600">
          <div className="flex items-start gap-1">
            <Sparkles className="w-3 h-3 mt-0.5 flex-shrink-0" />
            <span><b>A:</b> 의상 주름</span>
          </div>
          <div className="flex items-start gap-1">
            <Sparkles className="w-3 h-3 mt-0.5 flex-shrink-0" />
            <span><b>B:</b> 바디 밸런스</span>
          </div>
          <div className="flex items-start gap-1">
            <Sparkles className="w-3 h-3 mt-0.5 flex-shrink-0" />
            <span><b>C:</b> Skin & V라인</span>
          </div>
          <div className="flex items-start gap-1">
            <Sparkles className="w-3 h-3 mt-0.5 flex-shrink-0" />
            <span><b>D:</b> 입체 조명</span>
          </div>
        </div>
        <p className="text-[10px] lg:text-xs text-amber-500 mt-1.5 lg:mt-2 italic">
          ※ 배경 & 자연스러운 그림자 유지
        </p>
      </div>
    );
  }

  return (
    <div className="p-3 lg:p-4 bg-gradient-to-r from-rose-50 to-pink-50 border border-rose-200 rounded-lg lg:rounded-xl">
      <div className="flex items-center gap-2 mb-1.5 lg:mb-2">
        <MessageCircle className="w-4 h-4 lg:w-5 lg:h-5 text-rose-600" />
        <h3 className="font-semibold text-rose-800 text-xs lg:text-sm">자유 모드</h3>
      </div>
      <p className="text-xs lg:text-sm text-rose-700 mb-2 lg:mb-3">
        원하는 보정 내용을 자유롭게 대화로 요청하세요.
      </p>
      <ul className="text-[10px] lg:text-xs text-rose-600 space-y-0.5 lg:space-y-1">
        <li>• &quot;피부만 살짝 보정해줘&quot;</li>
        <li>• &quot;따뜻한 빈티지 느낌으로 바꿔줘&quot;</li>
        <li>• &quot;배경만 흐리게 해줘&quot;</li>
      </ul>
    </div>
  );
}
