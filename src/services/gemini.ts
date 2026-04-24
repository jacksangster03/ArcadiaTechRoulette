import { GoogleGenAI } from "@google/genai";

const key = process.env.GEMINI_API_KEY || 'no-key';
export const ai = new GoogleGenAI({ apiKey: key });
