"use client";

import { useState, useRef, KeyboardEvent } from "react";
import { Send, ImagePlus } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  onImageSelect?: (base64: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export default function ChatInput({
  onSend,
  onImageSelect,
  disabled,
  placeholder = "보정 요청을 입력하세요...",
}: ChatInputProps) {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSend(message.trim());
      setMessage("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    // 자동 높이 조절
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onImageSelect) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageSelect(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
    // 파일 입력 리셋
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="relative">
      <div className="flex items-end gap-2 p-3 bg-white rounded-2xl shadow-lg border border-rose-100">
        {/* 이미지 추가 버튼 */}
        {onImageSelect && (
          <>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <button
              onClick={handleImageClick}
              disabled={disabled}
              className="p-2 text-rose-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-colors disabled:opacity-50"
              title="이미지 추가"
            >
              <ImagePlus className="w-5 h-5" />
            </button>
          </>
        )}

        {/* 텍스트 입력 */}
        <textarea
          ref={textareaRef}
          value={message}
          onChange={handleTextareaChange}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder={placeholder}
          rows={1}
          className="flex-1 resize-none bg-transparent border-none outline-none text-gray-700 placeholder-gray-400 text-sm py-2"
        />

        {/* 전송 버튼 */}
        <button
          onClick={handleSend}
          disabled={!message.trim() || disabled}
          className={`
            p-2.5 rounded-xl transition-all duration-200
            ${message.trim() && !disabled
              ? "bg-gradient-to-r from-rose-400 to-rose-500 text-white shadow-md hover:shadow-lg hover:scale-105"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }
          `}
        >
          <Send className="w-4 h-4" />
        </button>
      </div>

      {/* 프리셋 제안 */}
      <div className="flex gap-2 mt-3 flex-wrap">
        {[
          "피부 톤을 자연스럽게 보정해줘",
          "드레스를 더 밝게 해줘",
          "로맨틱한 핑크 톤으로 바꿔줘",
          "배경을 살짝 흐리게 해줘",
        ].map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => !disabled && onSend(suggestion)}
            disabled={disabled}
            className="px-3 py-1.5 text-xs bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-full transition-colors disabled:opacity-50"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
}
