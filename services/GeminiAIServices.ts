import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function generateGeminiReply(prompt:string) {
    try {
        const result  = await model.generateContent(`Generate a single, professional, and friendly LinkedIn message for a ${prompt}.The response should be in plain text, concise, natural, and easy to copy-paste directly into LinkedIn. Avoid using markdown, bold text, or special characters. Ensure the reply fits well in a professional networking context.`);
    
        // console.log('gemini reply -', result.response.text());
        return result.response.text() || '';
      } catch (error) {
        console.error('API call failed:', error);
        return 'Error fetching AI response, Please try again';
      }
}
