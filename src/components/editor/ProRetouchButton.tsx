"use client";

import { Wand2 } from "lucide-react";

interface ProRetouchButtonProps {
  onClick: () => void;
  disabled?: boolean;
  isLoading?: boolean;
}

export default function ProRetouchButton({ onClick, disabled, isLoading }: ProRetouchButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`
        w-full py-4 px-6 rounded-xl font-semibold text-lg
        flex items-center justify-center gap-3
        transition-all duration-300 transform
        ${disabled || isLoading
          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
          : "bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 text-white shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98]"
        }
      `}
    >
      {isLoading ? (
        <>
          <div className="relative">
            <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
            <div className="absolute inset-0 w-6 h-6 border-3 border-transparent border-t-amber-200 rounded-full animate-spin animate-pulse-ring" />
          </div>
          <span>프로 보정 적용 중...</span>
        </>
      ) : (
        <>
          <Wand2 className="w-6 h-6" />
          <span>✨ 원클릭 프로 보정</span>
        </>
      )}
    </button>
  );
}

// 프로 보정 진행 표시 컴포넌트
interface ProRetouchProgressProps {
  isProcessing: boolean;
  isComplete?: boolean;
}

export function ProRetouchProgress({ isProcessing, isComplete = false }: ProRetouchProgressProps) {
  if (!isProcessing && !isComplete) return null;

  const steps = [
    { text: "피부 분석 중...", duration: "0-10초" },
    { text: "Glass Skin 효과 적용 중...", duration: "10-25초" },
    { text: "입체 조명 조정 중...", duration: "25-40초" },
    { text: "V라인 윤곽 보정 중...", duration: "40-50초" },
    { text: "눈 & 헤어 정리 중...", duration: "50-60초" },
    { text: "최종 마무리 중...", duration: "60-70초" },
  ];

  return (
    <div className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-200">
      <div className="flex flex-col items-center gap-4">
        {/* 애니메이션 링 */}
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 border-4 border-amber-200 rounded-full" />
          {isComplete ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          ) : (
            <>
              <div className="absolute inset-0 border-4 border-transparent border-t-amber-500 rounded-full animate-spin" />
              <div className="absolute inset-2 border-4 border-transparent border-t-orange-400 rounded-full animate-spin" style={{ animationDuration: "1.5s" }} />
              <div className="absolute inset-4 border-4 border-transparent border-t-rose-400 rounded-full animate-spin" style={{ animationDuration: "2s" }} />
              <Wand2 className="absolute inset-0 m-auto w-6 h-6 text-amber-600" />
            </>
          )}
        </div>

        {/* 진행 상태 */}
        <div className="text-center">
          <p className="font-semibold text-amber-800 mb-1">
            {isComplete ? "프로 보정 완료!" : "프로 보정 적용 중"}
          </p>
          {!isComplete && (
            <div className="h-6 overflow-hidden">
              <div className="animate-[slideUp_66s_linear_forwards]">
                {steps.map((step, index) => (
                  <p key={index} className="text-sm text-amber-600 h-6 flex items-center justify-center">
                    {step.text}
                  </p>
                ))}
              </div>
            </div>
          )}
          {isComplete && (
            <p className="text-sm text-green-600">이미지가 성공적으로 보정되었습니다</p>
          )}
        </div>

        {/* 프로그레스 바 - 68초 기준 95%까지, 완료 시 100% */}
        <div className="w-full">
          <div className="flex justify-between text-xs text-amber-600 mb-1">
            <span>진행률</span>
            <span className={isComplete ? "text-green-600 font-semibold" : ""}>
              {isComplete ? "100%" : ""}
            </span>
          </div>
          <div className="w-full h-3 bg-amber-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                isComplete
                  ? "bg-gradient-to-r from-green-400 to-green-500 w-full"
                  : "bg-gradient-to-r from-amber-400 to-orange-500 animate-[progressTo95_68s_ease-out_forwards]"
              }`}
            />
          </div>
          {!isComplete && (
            <p className="text-xs text-amber-500 mt-1 text-center">
              예상 소요시간: 약 1분 10초
            </p>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes slideUp {
          0%, 15% { transform: translateY(0); }
          15.1%, 35% { transform: translateY(-24px); }
          35.1%, 55% { transform: translateY(-48px); }
          55.1%, 72% { transform: translateY(-72px); }
          72.1%, 88% { transform: translateY(-96px); }
          88.1%, 100% { transform: translateY(-120px); }
        }
        @keyframes progressTo95 {
          0% { width: 0%; }
          10% { width: 12%; }
          25% { width: 30%; }
          50% { width: 55%; }
          75% { width: 78%; }
          100% { width: 95%; }
        }
      `}</style>
    </div>
  );
}
