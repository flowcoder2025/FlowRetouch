import { GoogleGenAI } from "@google/genai";

// Gemini API 클라이언트 초기화 (새 SDK - 환경변수 자동 감지)
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || process.env.GOOGLE_AI_API_KEY || "",
});

console.log("[Gemini] SDK initialized with API key:", process.env.GEMINI_API_KEY ? "GEMINI_API_KEY" : process.env.GOOGLE_API_KEY ? "GOOGLE_API_KEY" : "GOOGLE_AI_API_KEY");

// Gemini 3 Pro Image 모델 (이미지 생성/편집 전용)
const IMAGE_MODEL_NAME = "gemini-3-pro-image-preview";
// Gemini 3 Pro 모델 (텍스트 전용) - 향후 텍스트 전용 기능 확장용
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const TEXT_MODEL_NAME = "gemini-3-pro-preview";

// 보정 모드 타입
export type RetouchMode = "pro" | "free";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  image?: string; // base64 이미지
  resultImage?: string; // 결과 이미지
}

export interface RetouchRequest {
  image: string; // base64 이미지
  prompt: string; // 보정 요청 프롬프트
  mode: RetouchMode; // 보정 모드
  history?: ChatMessage[]; // 대화 히스토리
}

export interface RetouchResponse {
  success: boolean;
  message: string;
  resultImage?: string; // base64 결과 이미지
  error?: string;
}

// ============================================
// 🎯 PRO MODE: 전문 웨딩 스튜디오 보정 프롬프트 (모듈 기반)
// ============================================
const PRO_MODE_SYSTEM_PROMPT = `### 1. Role & Objective
You are a top-tier professional retoucher specializing in Korean high-end wedding photography.
Your goal is to transform the input Raw Image into a sophisticated, "After-Service" quality portrait by following specific retouching logic.

### 2. CRITICAL GUARDRAILS (Strict Constraints)
* **PRESERVE BACKGROUND & DEPTH:** Do NOT remove the background. Do NOT whiten the shadows on the wall. You must maintain the original environmental lighting and the natural shadows cast by the subjects to ensure a 3D realistic look.
* **NO DISTORTION:** Do not distort the facial features to the point of changing the person's identity.

### 3. RETOUCHING LOGIC MODULES

**[Module A: Smart Ironing (Clothing)]**
* **Objective:** Clean, expensive-looking fabric without looking artificial.
* **Logic:**
    1.  **Identify:** Distinguish between "messy micro-wrinkles" (accidental creases) and "structural folds" (natural drapery caused by movement/posture).
    2.  **Action:** Completely smooth out the messy micro-wrinkles.
    3.  **Preserve:** Keep the major structural folds intact. The clothes must retain realistic fabric texture and volume, looking "steam-ironed" rather than flat.

**[Module B: Body Balance (Female Arm & Shoulder)]**
* **Objective:** A natural, slender silhouette preferred in K-Beauty standards.
* **Condition:** ONLY apply if the female subject's arms appear noticeably thick or bulging. If the arms already look slim and toned, skip this module to preserve the natural body shape.
* **Logic:**
    1.  **Target:** The outer line of the upper arm (triceps) and the shoulder-to-elbow curve.
    2.  **Action (Slim & Linearize):** Gently slim down thick arms by pushing in the bulging curve to create a straighter, more vertical line. Apply gradually - do NOT over-slim.
    3.  **Natural Preservation:** The slimming must look completely natural. Preserve skin texture, muscle definition, and natural shadows. The result should look like a fit, toned body - NOT an unnaturally thin stick or plastic-looking arm.
    4.  **Balance:** Ensure the arm thickness remains proportional to the shoulder width and overall body frame.

**[Module C: Glass Skin & Face Shape]**
* **Skin:** Apply a "Glass Skin" finish. Remove pores and blemishes. Brighten the skin tone with a rosy, translucent glow.
* **Face Shape:** Apply a subtle "V-line" contouring to the jaw. Slim the cheekbones slightly to make the face look smaller and more refined.
* **Eyes:** Increase sharpness and catchlights (sparkle) in the eyes to make them look alive.

**[Module D: Lighting & Atmosphere]**
* **Action:** Enhance the lighting to be soft yet contrasting.
* **Highlighting:** Add subtle highlights to the T-zone (forehead, nose bridge) and cheekbones to enhance facial dimensionality (3D effect).

### 4. Negative Prompt (What to Avoid)
* White background, cutout sticker look, removing shadows.
* Plastic skin texture, blurring hair details.
* Messy clothes, wrinkled fabric.
* Muscular or bulging arm lines (for female).
* Changing the color of the outfit.

### 5. Output Requirements
1. Generate the retouched image applying all modules above.
2. Provide a brief Korean explanation of the key improvements.
3. Maintain the original image resolution and aspect ratio.

한국어로 응답하고, 적용된 보정 모듈별 내용을 간단히 설명해주세요.`;

// ============================================
// 🆓 FREE MODE: 자유 대화형 보정 프롬프트
// ============================================
const FREE_MODE_SYSTEM_PROMPT = `당신은 친절한 웨딩사진 보정 AI 어시스턴트입니다.

사용자가 원하는 대로 자유롭게 이미지를 보정해드립니다.
사용자의 요청을 정확히 이해하고, 요청에 맞는 보정을 적용한 후 결과를 설명해주세요.

가능한 보정 작업:
- 피부 보정 (매끄럽게, 자연스럽게, 톤업 등)
- 색감 조정 (따뜻하게, 차갑게, 빈티지, 시네마틱 등)
- 밝기/대비 조정
- 배경 처리 (흐리게, 밝게, 색상 변경 등)
- 얼굴 보정 (윤곽, 눈, 입술 등)
- 드레스/의상 보정
- 특정 스타일 적용 (로맨틱, 클래식, 모던 등)

사용자의 요청이 모호하면 구체적으로 어떤 보정을 원하는지 친절하게 물어봐주세요.
모든 응답은 한국어로 해주세요.`;

// ============================================
// 🚀 원클릭 프로 보정용 기본 프롬프트 (모듈 기반)
// ============================================
export const PRO_AUTO_RETOUCH_PROMPT = `이 웨딩 사진에 전문 "After-Service" 수준의 보정을 적용해주세요.

모든 모듈을 순서대로 적용하세요:

**[Module A: Smart Ironing]** - 의상 주름 제거, 구조적 주름 유지
**[Module B: Body Balance]** - 팔 슬림화, K-Beauty 실루엣
**[Module C: Glass Skin & Face]** - 피부 광채, V라인, 눈 강화
**[Module D: Lighting]** - 입체감 조명

⚠️ 주의사항:
- 배경과 자연스러운 그림자는 반드시 유지
- 얼굴 왜곡 없이 자연스럽게 보정
- 의상 색상 변경 금지`;

// Base64 이미지에서 순수 데이터와 MIME 타입 추출
function parseBase64Image(base64Image: string): { data: string; mimeType: string } {
  const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, "");
  const mimeType = base64Image.match(/data:(image\/\w+);base64/)?.[1] || "image/jpeg";
  return { data: base64Data, mimeType };
}

// 모드에 따른 시스템 프롬프트 반환
function getSystemPrompt(mode: RetouchMode): string {
  return mode === "pro" ? PRO_MODE_SYSTEM_PROMPT : FREE_MODE_SYSTEM_PROMPT;
}

// 대화형 보정 세션 관리
export async function chatWithImage(
  messages: ChatMessage[],
  newMessage: string,
  currentImage?: string,
  mode: RetouchMode = "free"
): Promise<RetouchResponse> {
  try {
    // 콘텐츠 파트 구성
    const parts: Array<{ text: string } | { inlineData: { mimeType: string; data: string } }> = [];

    // 시스템 프롬프트 추가
    parts.push({ text: getSystemPrompt(mode) + "\n\n" });

    // 대화 히스토리 추가
    for (const msg of messages) {
      if (msg.image) {
        const { data, mimeType } = parseBase64Image(msg.image);
        parts.push({ inlineData: { mimeType, data } });
      }
      parts.push({ text: `${msg.role === "user" ? "사용자" : "AI"}: ${msg.content}\n` });
    }

    // 현재 이미지가 있으면 추가
    if (currentImage) {
      const { data, mimeType } = parseBase64Image(currentImage);
      parts.push({ inlineData: { mimeType, data } });
    }

    // 새 메시지 추가
    parts.push({ text: `사용자: ${newMessage}` });

    const response = await ai.models.generateContent({
      model: IMAGE_MODEL_NAME,
      contents: parts,
      config: {
        responseModalities: ["TEXT", "IMAGE"],
      },
    });

    // 결과 추출
    let textResult = "";
    let resultImage: string | undefined;

    const candidates = response.candidates;
    if (candidates && candidates[0]?.content?.parts) {
      for (const part of candidates[0].content.parts) {
        if (part.text) {
          textResult += part.text;
        } else if (part.inlineData?.data) {
          resultImage = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        }
      }
    }

    return {
      success: true,
      message: textResult || "보정이 완료되었습니다.",
      resultImage: resultImage,
    };
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return {
      success: false,
      message: "대화 처리 중 오류가 발생했습니다.",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

// 프로 모드 원클릭 자동 보정
export async function proAutoRetouch(image: string): Promise<RetouchResponse> {
  try {
    console.log("[ProAutoRetouch] Starting...");
    const { data, mimeType } = parseBase64Image(image);
    console.log("[ProAutoRetouch] Image parsed:", { mimeType, dataLength: data.length });

    console.log("[ProAutoRetouch] Calling Gemini API with model:", IMAGE_MODEL_NAME);
    const response = await ai.models.generateContent({
      model: IMAGE_MODEL_NAME,
      contents: [
        { inlineData: { mimeType, data } },
        { text: PRO_MODE_SYSTEM_PROMPT + "\n\n" + PRO_AUTO_RETOUCH_PROMPT }
      ],
      config: {
        responseModalities: ["TEXT", "IMAGE"],
      },
    });
    console.log("[ProAutoRetouch] API response received");

    // 결과 추출
    let textResult = "";
    let resultImage: string | undefined;

    const candidates = response.candidates;
    if (candidates && candidates[0]?.content?.parts) {
      for (const part of candidates[0].content.parts) {
        if (part.text) {
          textResult += part.text;
        } else if (part.inlineData?.data) {
          resultImage = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        }
      }
    }

    return {
      success: true,
      message: textResult || "프로 보정이 완료되었습니다.",
      resultImage: resultImage,
    };
  } catch (error) {
    console.error("Pro Auto Retouch Error:", error);
    return {
      success: false,
      message: "프로 보정 중 오류가 발생했습니다.",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
