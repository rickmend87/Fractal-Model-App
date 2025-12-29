import { GoogleGenAI, Type, Schema } from "@google/genai";
import { AnalysisResult } from "../types";

const SYSTEM_INSTRUCTION = `
You are an expert trader analyzing charts based on the 'TTrades Universal Model'.
Your goal is to analyze the provided chart images (usually a triad pair like NQ/ES) and output a Confidence Score (0-100).

THE FRAMEWORK:
1. UNIVERSAL MODELS: Determine if price is moving Internal->External, External->Internal, or is in a Manipulation Range.
2. SMT DIVERGENCE: Look for cracks in correlation. Did Asset A take a low while Asset B failed to? Did Asset A hit an FVG while Asset B missed it?
3. SWING POINTS:
   - Candle 2 Closure: The reaction candle closes back inside the previous candle's range.
   - Candle 3 Continuation: Candle 3 closes above Candle 2's body.
   - Small Wicks: Reversal candles should have small wicks to support expansion.

SCORING CRITERIA (Calculate strictly):
- Base Score: 0
- +30 points if price is clearly reacting to a Key Level (FVG or Swing High/Low).
- +30 points if "Two-Stage SMT" is visible (SMT at the level AND SMT at the swing point).
- +15 points if only standard SMT is visible.
- +25 points if there is a "Precision Swing Point" (PSP) - Assets closing in opposite directions.
- +15 points for a valid "Candle 2" closure confirmation.

Analyze the image provided and extract these details into the JSON format.
`;

const responseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    detectedModel: { type: Type.STRING, description: "e.g., External to Internal" },
    keyLevelObservation: { type: Type.STRING, description: "e.g., Price swept the Previous Week Low" },
    smtStatus: { type: Type.STRING, description: "e.g., Bearish SMT found: NQ made a higher high, ES made a lower high" },
    entryTrigger: { type: Type.STRING, description: "e.g., Valid Candle 2 closure detected" },
    confidenceScore: { type: Type.NUMBER, description: "The calculated confidence score from 0-100" },
    nextStep: { type: Type.STRING, description: "e.g., Set limit order at 50% equilibrium" },
    reasoning: { type: Type.STRING, description: "A brief summary of why this score was given." }
  },
  required: ["detectedModel", "keyLevelObservation", "smtStatus", "entryTrigger", "confidenceScore", "nextStep", "reasoning"],
};

export const analyzeChartWithGemini = async (base64Image: string): Promise<AnalysisResult> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found in environment variables.");
  }

  const ai = new GoogleGenAI({ apiKey });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        thinkingConfig: { thinkingBudget: 4000 } // Enable thinking for complex trade reasoning
      },
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: "image/png",
              data: base64Image,
            },
          },
          {
            text: "Analyze this trading chart according to the TTrades Universal Model logic.",
          },
        ],
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");

    return JSON.parse(text) as AnalysisResult;
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw error;
  }
};