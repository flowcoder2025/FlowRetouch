"use client";

import { Download, User, Sparkles } from "lucide-react";
import Button from "@/components/ui/Button";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  image?: string;
  resultImage?: string;
  isLoading?: boolean;
}

export default function ChatMessage({ role, content, image, resultImage, isLoading }: ChatMessageProps) {
  const isUser = role === "user";

  const handleDownload = () => {
    if (!resultImage) return;

    const link = document.createElement("a");
    link.href = resultImage;
    link.download = `wedding-retouch-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={`flex gap-3 animate-fade-in-up ${isUser ? "flex-row-reverse" : ""}`}>
      {/* 아바타 */}
      <div className={`
        flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center
        ${isUser ? "bg-rose-100" : "bg-gradient-to-br from-rose-400 to-blush-400"}
      `}>
        {isUser ? (
          <User className="w-5 h-5 text-rose-500" />
        ) : (
          <Sparkles className="w-5 h-5 text-white" />
        )}
      </div>

      {/* 메시지 내용 */}
      <div className={`flex-1 max-w-[80%] ${isUser ? "text-right" : ""}`}>
        {/* 업로드된 이미지 */}
        {image && (
          <div className={`mb-3 ${isUser ? "ml-auto" : ""}`}>
            <img
              src={image}
              alt="업로드된 이미지"
              className="rounded-xl shadow-md max-w-sm max-h-64 object-contain"
            />
          </div>
        )}

        {/* 텍스트 메시지 */}
        <div className={`
          inline-block px-5 py-3 rounded-2xl max-w-full
          ${isUser
            ? "bg-gradient-to-r from-rose-400 to-rose-500 text-white rounded-tr-md"
            : "bg-white shadow-md border border-rose-100 text-gray-700 rounded-tl-md"
          }
        `}>
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-rose-300 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 bg-rose-300 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 bg-rose-300 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
              <span className="text-sm text-gray-500">이미지 보정 중...</span>
            </div>
          ) : (
            <p className="whitespace-pre-wrap text-sm leading-relaxed">{content}</p>
          )}
        </div>

        {/* 결과 이미지 */}
        {resultImage && (
          <div className="mt-3">
            <div className="relative inline-block">
              <img
                src={resultImage}
                alt="보정된 이미지"
                className="rounded-xl shadow-lg max-w-sm max-h-80 object-contain border-2 border-rose-200"
              />
              <div className="absolute -bottom-3 -right-3">
                <Button
                  size="sm"
                  onClick={handleDownload}
                  className="shadow-lg"
                >
                  <Download className="w-4 h-4 mr-1" />
                  저장
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
