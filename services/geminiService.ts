
import { GoogleGenAI } from "@google/genai";

export const sendMessageToGemini = async (message: string, base64Image?: string) => {
  // Debugging log untuk memastikan API KEY tersedia di sisi browser
  if (!process.env.API_KEY) {
    console.error("DEBUG: API_KEY tidak terdeteksi di environment.");
  }

  try {
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

    // Perbaikan: contents HARUS berupa array [ { parts: [...] } ]
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [{ parts }],
      config: {
        systemInstruction: `Anda adalah 'Pajak Jayapura AI', asisten virtual resmi KPP Pratama Jayapura.
Karakter: Ramah, profesional, dan solutif.
Tugas: Membantu Wajib Pajak memahami administrasi pajak (NPWP, PKP, SPT, dll).
Penting: Selalu arahkan ke Helpdesk WhatsApp 08114216899 untuk kasus spesifik.`,
        temperature: 0.7,
      }
    });

    return response.text || "Maaf, asisten tidak memberikan jawaban.";
  } catch (error: any) {
    console.error("Gemini API Error Detail:", error);
    
    // Penanganan error spesifik
    if (error?.message?.includes("API_KEY_INVALID")) {
      return "Kunci API tidak valid. Pastikan Environment Variable API_KEY sudah diset di Vercel.";
    }
    
    return "Layanan AI sedang sibuk atau koneksi terputus. Mohon pastikan API KEY sudah terkonfigurasi di Dashboard Vercel.";
  }
};

export const generateGeminiResponse = async (message: string) => {
  return sendMessageToGemini(message);
};
