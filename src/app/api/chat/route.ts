import { NextRequest, NextResponse } from "next/server";
import { chatWithImage, proAutoRetouch, ChatMessage, RetouchMode } from "@/lib/gemini";

export const maxDuration = 60; // 최대 60초 타임아웃

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages, newMessage, currentImage, mode, action } = body as {
      messages: ChatMessage[];
      newMessage: string;
      currentImage?: string;
      mode?: RetouchMode;
      action?: "chat" | "auto-retouch";
    };

    // API 키 확인
    if (!process.env.GOOGLE_AI_API_KEY) {
      return NextResponse.json(
        {
          success: false,
          error: "API 키가 설정되지 않았습니다. .env.local 파일에 GOOGLE_AI_API_KEY를 설정해주세요."
        },
        { status: 500 }
      );
    }

    // 프로 모드 원클릭 자동 보정
    if (action === "auto-retouch") {
      if (!currentImage) {
        return NextResponse.json(
          { success: false, error: "이미지를 먼저 업로드해주세요." },
          { status: 400 }
        );
      }

      const result = await proAutoRetouch(currentImage);

      if (!result.success) {
        return NextResponse.json(
          { success: false, error: result.error || result.message },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        message: result.message,
        resultImage: result.resultImage,
      });
    }

    // 대화형 보정
    if (!newMessage || newMessage.trim() === "") {
      return NextResponse.json(
        { success: false, error: "메시지를 입력해주세요." },
        { status: 400 }
      );
    }

    // Gemini API 호출 (모드 전달)
    const result = await chatWithImage(
      messages || [],
      newMessage,
      currentImage,
      mode || "free"
    );

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error || result.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: result.message,
      resultImage: result.resultImage,
    });
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "서버 오류가 발생했습니다."
      },
      { status: 500 }
    );
  }
}
