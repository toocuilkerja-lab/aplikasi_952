
import { GoogleGenAI } from "@google/genai";

export const sendMessageToGemini = async (message: string, base64Image?: string) => {
  const apiKey = process.env.API_KEY;

  // Cek apakah API Key tersedia dan bukan string kosong atau placeholder
  if (!apiKey || apiKey === "" || apiKey === "PLACEHOLDER_API_KEY") {
    console.error("CRITICAL: API_KEY tidak terdeteksi di sisi klien.");
    return "Konfigurasi Error: API_KEY belum terpasang di Vercel. Silakan cek Project Settings > Environment Variables di Dashboard Vercel, lalu REDEPLOY aplikasi Anda.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    
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
    
    const errorMsg = error?.message || "";
    if (errorMsg.includes("API_KEY_INVALID")) {
      return "Kunci API tidak valid. Silakan periksa kembali API Key yang Anda masukkan di Vercel.";
    }
    if (errorMsg.includes("403") || errorMsg.includes("permission")) {
      return "Akses ditolak (403). Pastikan API Key Anda memiliki izin untuk model Gemini 3 Flash.";
    }
    
    return "Terjadi kendala teknis pada layanan AI. Silakan coba beberapa saat lagi atau hubungi petugas via WhatsApp.";
  }
};

export const generateGeminiResponse = async (message: string) => {
  return sendMessageToGemini(message);
};
