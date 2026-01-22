
import { GoogleGenAI } from "@google/genai";

export const sendMessageToGemini = async (message: string, base64Image?: string) => {
  try {
    // Inisialisasi SDK sesuai pedoman terbaru
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const parts: any[] = [{ text: message }];
    
    if (base64Image) {
      const cleanBase64 = base64Image.split(',')[1] || base64Image;
      parts.push({
        inlineData: {
          mimeType: "image/jpeg",
          data: cleanBase64
        }
      });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: { parts },
      config: {
        systemInstruction: `Anda adalah 'Pajak Jayapura AI', asisten virtual resmi KPP Pratama Jayapura.
Karakter: Ramah, profesional, dan solutif.
Tugas: Membantu Wajib Pajak memahami administrasi pajak (NPWP, PKP, SPT, dll).
Penting: Selalu arahkan ke Helpdesk WhatsApp 08114216899 untuk kasus spesifik.`,
        temperature: 0.7,
      }
    });

    return response.text || "Maaf, terjadi kendala saat memproses jawaban.";
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    if (error?.message?.includes("entity was not found")) {
      return "Terjadi kesalahan otentikasi. Mohon segarkan halaman atau hubungi administrator.";
    }
    return "Layanan AI sedang sibuk atau kunci API belum siap. Silakan coba beberapa saat lagi.";
  }
};

export const generateGeminiResponse = async (message: string) => {
  return sendMessageToGemini(message);
};
