// As OpenAI is paid services I am not using this, But I have wrriten this to get insights

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export async function generateAIReply(prompt: string) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: `Generate a professional and friendly LinkedIn reply to the following message: ${prompt}` }],
      response_format: {
        "type": "text"
      },
      temperature: 1,
      max_completion_tokens: 2048,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0
    });

    return response.choices[0]?.message?.content || '';
  } catch (error) {
    console.error('API call failed:', error);
    return 'Error fetching AI response';
  }
}





