import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || "sk-your-default-key" 
});

export interface AIResponse {
  text: string;
  recommendations?: Array<{
    name: string;
    imageUrl: string;
  }>;
}

export async function getChatResponse(message: string, conversationHistory: Array<{ role: "user" | "assistant", content: string }>): Promise<AIResponse> {
  // Prepare the messages array for the API call
  const messages = [
    {
      role: "system",
      content: "You are a helpful AI assistant for a tile and sanitary ware company called TileAI. Provide friendly, professional advice about tiles, bathroom fixtures, designs, and installation. Keep responses concise and helpful. When appropriate, suggest specific product types that might meet the customer's needs."
    },
    ...conversationHistory,
    { role: "user", content: message }
  ];

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: messages as any,
      temperature: 0.7,
      max_tokens: 500,
    });

    return {
      text: response.choices[0].message.content || "I'm sorry, I couldn't generate a response."
    };
  } catch (error) {
    console.error("Error calling OpenAI:", error);
    throw new Error("Failed to get AI response. Please try again later.");
  }
}

export async function getTileRecommendations(roomType: string, surfaceType: string, area: number): Promise<AIResponse> {
  try {
    const prompt = `
      I need recommendations for ${roomType} ${surfaceType} tiles for an area of ${area} square meters.
      Provide a brief explanation and suggest 2-4 types of tiles that would work well.
      Response should be concise and helpful for a customer looking to make a purchase decision.
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a tile specialist AI for TileAI, a company selling tiles and sanitary products. Provide helpful, specific recommendations."
        },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    return {
      text: response.choices[0].message.content || "I'm sorry, I couldn't generate recommendations."
    };
  } catch (error) {
    console.error("Error calling OpenAI for recommendations:", error);
    throw new Error("Failed to get tile recommendations. Please try again later.");
  }
}
