"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowLeft, Trash2, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import ImageUpload from "@/components/chat/ImageUpload";
import ChatMessage from "@/components/chat/ChatMessage";
import ChatInput from "@/components/chat/ChatInput";
import ModeSelector, { ModeInfoCard, RetouchMode } from "@/components/editor/ModeSelector";
import ProRetouchButton, { ProRetouchProgress } from "@/components/editor/ProRetouchButton";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  image?: string;
  resultImage?: string;
}

export default function EditorPage() {
  const router = useRouter();
  const [currentImage, setCurrentImage] = useState<string | undefined>();
  const [originalImage, setOriginalImage] = useState<string | undefined>(); // 원본 이미지 보존
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<RetouchMode>("pro");
  const [isProProcessing, setIsProProcessing] = useState(false);
  const [isProComplete, setIsProComplete] = useState(false); // 프로 보정 완료 상태
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // 자동 스크롤
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // 모드 변경 시 안내 메시지 업데이트
  useEffect(() => {
    const welcomeMessage = mode === "pro"
      ? {
          id: "welcome",
          role: "assistant" as const,
          content: `✨ 프로 모드가 활성화되었습니다!

이미지를 업로드하면 한국 고급 웨딩 스튜디오 스타일의 전문 보정을 한 번의 클릭으로 적용할 수 있습니다.

**프로 보정에 포함된 내용:**
• Glass Skin 효과 (매끄럽고 촉촉한 피부)
• 입체적 조명 (턱선, 광대뼈 음영)
• V라인 윤곽 보정
• 눈 강조 & 생기있는 반짝임
• 잔머리 정리
• 드레스 화이트 & 배경 보케

📷 웨딩 사진을 업로드해주세요!`,
        }
      : {
          id: "welcome",
          role: "assistant" as const,
          content: `💬 자유 모드가 활성화되었습니다!

원하는 보정 내용을 자유롭게 말씀해주세요.

**예시 요청:**
• "피부만 살짝 자연스럽게 보정해줘"
• "따뜻한 빈티지 톤으로 바꿔줘"
• "배경만 흐리게 해줘"
• "눈을 더 크고 또렷하게 해줘"
• "드레스를 더 밝게 해줘"

📷 먼저 웨딩 사진을 업로드하고, 원하는 보정을 요청해주세요!`,
        };

    setMessages([welcomeMessage]);
  }, [mode]);

  const handleImageSelect = (base64: string) => {
    setCurrentImage(base64);
    setOriginalImage(base64); // 원본 이미지 저장
    setIsProComplete(false); // 새 이미지 업로드 시 완료 상태 리셋

    const imageUploadMessage = mode === "pro"
      ? `사진이 업로드되었습니다! 🎊

아래 **"원클릭 프로 보정"** 버튼을 클릭하면 전문 웨딩 스튜디오 스타일의 보정이 자동으로 적용됩니다.

또는 추가로 원하는 보정이 있다면 말씀해주세요!`
      : `사진이 업로드되었습니다! 💕

어떤 보정을 원하시나요? 자유롭게 말씀해주세요.

예: "피부를 자연스럽게 보정해줘", "로맨틱한 핑크 톤으로 바꿔줘"`;

    setMessages((prev) => [
      ...prev,
      {
        id: `user-${Date.now()}`,
        role: "user",
        content: "이 사진을 보정해주세요.",
        image: base64,
      },
      {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: imageUploadMessage,
      },
    ]);
  };

  // 프로 모드 원클릭 보정
  const handleProAutoRetouch = async () => {
    if (!currentImage) return;

    setIsLoading(true);
    setIsProProcessing(true);

    // 요청 메시지 추가
    setMessages((prev) => [
      ...prev,
      {
        id: `user-${Date.now()}`,
        role: "user",
        content: "✨ 프로 보정을 적용해주세요",
      },
    ]);

    // 로딩 메시지 추가
    const loadingId = `loading-${Date.now()}`;
    setMessages((prev) => [
      ...prev,
      {
        id: loadingId,
        role: "assistant",
        content: "",
      },
    ]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "auto-retouch",
          currentImage: currentImage,
        }),
      });

      const data = await response.json();

      setMessages((prev) => {
        const filtered = prev.filter((m) => m.id !== loadingId);
        return [
          ...filtered,
          {
            id: `assistant-${Date.now()}`,
            role: "assistant",
            content: data.success
              ? `✅ 프로 보정이 완료되었습니다!\n\n${data.message}`
              : `❌ 오류가 발생했습니다: ${data.error}`,
            resultImage: data.resultImage,
          },
        ];
      });

      // 완료 시 상태 업데이트 (원본 이미지는 유지)
      if (data.resultImage) {
        setIsProComplete(true);
      }
    } catch {
      setMessages((prev) => {
        const filtered = prev.filter((m) => m.id !== loadingId);
        return [
          ...filtered,
          {
            id: `assistant-${Date.now()}`,
            role: "assistant",
            content: "죄송합니다. 프로 보정 중 오류가 발생했습니다. 다시 시도해주세요.",
          },
        ];
      });
    } finally {
      setIsLoading(false);
      setIsProProcessing(false);
    }
  };

  // 대화형 보정
  const handleSendMessage = async (message: string) => {
    if (!currentImage) {
      setMessages((prev) => [
        ...prev,
        { id: `user-${Date.now()}`, role: "user", content: message },
        {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          content: "먼저 보정할 웨딩 사진을 업로드해주세요! 📷",
        },
      ]);
      return;
    }

    setMessages((prev) => [
      ...prev,
      { id: `user-${Date.now()}`, role: "user", content: message },
    ]);

    setIsLoading(true);
    const loadingId = `loading-${Date.now()}`;
    setMessages((prev) => [
      ...prev,
      { id: loadingId, role: "assistant", content: "" },
    ]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: messages.map((m) => ({
            role: m.role,
            content: m.content,
            image: m.image,
          })),
          newMessage: message,
          currentImage: currentImage,
          mode: mode,
        }),
      });

      const data = await response.json();

      setMessages((prev) => {
        const filtered = prev.filter((m) => m.id !== loadingId);
        return [
          ...filtered,
          {
            id: `assistant-${Date.now()}`,
            role: "assistant",
            content: data.success ? data.message : `오류가 발생했습니다: ${data.error}`,
            resultImage: data.resultImage,
          },
        ];
      });

      // 자유 모드에서 결과 이미지는 채팅에만 표시, 원본 유지
      // (필요시 다음 보정을 위해 결과 이미지로 업데이트 가능)
    } catch {
      setMessages((prev) => {
        const filtered = prev.filter((m) => m.id !== loadingId);
        return [
          ...filtered,
          {
            id: `assistant-${Date.now()}`,
            role: "assistant",
            content: "죄송합니다. 요청 처리 중 오류가 발생했습니다. 다시 시도해주세요.",
          },
        ];
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearImage = () => {
    setCurrentImage(undefined);
    setOriginalImage(undefined);
    setIsProComplete(false);
    setMessages([{
      id: "cleared",
      role: "assistant",
      content: "이미지가 초기화되었습니다. 새로운 웨딩 사진을 업로드해주세요! 📷",
    }]);
  };

  const handleClearChat = () => {
    setMessages([{
      id: "cleared",
      role: "assistant",
      content: currentImage
        ? `대화가 초기화되었습니다.\n\n${mode === "pro" ? "프로 보정 버튼을 클릭하거나" : ""} 새로운 보정 요청을 해주세요!`
        : "대화가 초기화되었습니다. 웨딩 사진을 업로드해주세요! 📷",
    }]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 to-rose-50">
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-rose-100">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 text-gray-600 hover:text-rose-500 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">홈으로</span>
          </button>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-rose-500" />
            <span className="font-display font-semibold text-gray-800">Wedding Retouch AI</span>
          </div>
          <Button variant="ghost" size="sm" onClick={handleClearChat}>
            <Trash2 className="w-4 h-4 mr-1" />
            초기화
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-120px)]">
          {/* 왼쪽: 이미지 + 모드 선택 영역 */}
          <div className="flex flex-col gap-4">
            {/* 모드 선택 */}
            <div className="bg-white rounded-2xl shadow-lg border border-rose-100 p-4">
              <h3 className="text-sm font-medium text-gray-600 mb-3">보정 모드 선택</h3>
              <ModeSelector currentMode={mode} onModeChange={setMode} />
            </div>

            {/* 이미지 업로드 영역 */}
            <div className="bg-white rounded-2xl shadow-lg border border-rose-100 p-6 flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-gray-800">웨딩 사진</h2>
                {currentImage && (
                  <Button variant="ghost" size="sm" onClick={handleClearImage}>
                    새 이미지
                  </Button>
                )}
              </div>
              <div className="flex-1 flex items-center justify-center">
                <ImageUpload
                  onImageSelect={handleImageSelect}
                  currentImage={currentImage}
                  onClear={handleClearImage}
                />
              </div>
            </div>

            {/* 프로 모드: 원클릭 보정 버튼 */}
            {mode === "pro" && (
              <div className="bg-white rounded-2xl shadow-lg border border-rose-100 p-4">
                {isProProcessing || isProComplete ? (
                  <ProRetouchProgress isProcessing={isProProcessing} isComplete={isProComplete} />
                ) : (
                  <ProRetouchButton
                    onClick={handleProAutoRetouch}
                    disabled={!currentImage}
                    isLoading={isLoading}
                  />
                )}
                {/* 완료 후 다시 보정 버튼 */}
                {isProComplete && (
                  <button
                    onClick={() => setIsProComplete(false)}
                    className="w-full mt-3 py-2 text-sm text-amber-600 hover:text-amber-700 font-medium"
                  >
                    다시 보정하기
                  </button>
                )}
              </div>
            )}
          </div>

          {/* 오른쪽: 채팅 영역 */}
          <div className="flex flex-col bg-white rounded-2xl shadow-lg border border-rose-100 overflow-hidden">
            {/* 채팅 헤더 + 모드 정보 */}
            <div className="px-6 py-4 border-b border-rose-100 bg-gradient-to-r from-rose-50 to-blush-50">
              <h2 className="font-semibold text-gray-800 mb-2">AI 보정 어시스턴트</h2>
              <ModeInfoCard mode={mode} />
            </div>

            {/* 채팅 메시지 */}
            <div
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto p-6 space-y-6"
            >
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  role={message.role}
                  content={message.content}
                  image={message.image}
                  resultImage={message.resultImage}
                  isLoading={isLoading && message.content === ""}
                />
              ))}
            </div>

            {/* 채팅 입력 */}
            <div className="p-4 border-t border-rose-100 bg-gray-50">
              <ChatInput
                onSend={handleSendMessage}
                onImageSelect={handleImageSelect}
                disabled={isLoading}
                placeholder={
                  mode === "pro"
                    ? "추가 보정 요청을 입력하세요..."
                    : "원하는 보정 내용을 자유롭게 입력하세요..."
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
