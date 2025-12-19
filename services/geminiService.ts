
import { GoogleGenAI } from "@google/genai";
import { APARTMENTS, SITE_CONFIG } from "../constants";
import { Language } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const getSystemInstruction = (lang: Language) => `
You are '${SITE_CONFIG.hostName}', the friendly local host of ${SITE_CONFIG.name}. 
You manage 4 boutique apartments in Laveno Mombello, on Lake Maggiore.

Properties Data (Localized):
${JSON.stringify(APARTMENTS, null, 2)}

Current Guest Language Preference: ${lang === 'it' ? 'Italian' : lang === 'de' ? 'German' : 'English'}.
You MUST respond to the guest in their preferred language (${lang}).

Your goal:
- Help guests find the right apartment.
- Share local tips about Laveno Mombello (Bucket Cable Car, Ferry, Ceramics museum).
- Explain that we handle bookings personally via WhatsApp (${SITE_CONFIG.whatsapp}) or Email (${SITE_CONFIG.email}).
- Tone: Warm, welcoming, professional Italian hospitality.
`;

export const getConciergeResponse = async (userMessage: string, history: { role: 'user' | 'model', content: string }[], lang: Language) => {
  try {
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: getSystemInstruction(lang),
      },
    });
    const response = await chat.sendMessage({ message: userMessage });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    const fallback = {
      it: `Ciao! Ho un piccolo problema tecnico. Per favore contattami via WhatsApp al ${SITE_CONFIG.whatsapp}!`,
      en: `Hi! I'm having a little trouble connecting. Please reach out via WhatsApp at ${SITE_CONFIG.whatsapp}!`,
      de: `Hallo! Ich habe gerade ein technisches Problem. Bitte kontaktieren Sie mich über WhatsApp unter ${SITE_CONFIG.whatsapp}!`
    };
    return fallback[lang];
  }
};
