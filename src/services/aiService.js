import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function getGameRecommendation(userPrompt, games) {
  const gamesList = games.map(g => `${g.id}: ${g.title} (${g.category}) - ${g.description}`).join("\n");
  
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `You are a gaming assistant for "Nova Games". 
    Based on the user's request: "${userPrompt}", recommend the best game from the following list.
    
    Games List:
    ${gamesList}
    
    Return ONLY a JSON object with the following structure:
    {
      "recommendedGameId": "id-of-the-game",
      "reason": "short explanation why this game fits"
    }`,
    config: {
      responseMimeType: "application/json"
    }
  });

  try {
    return JSON.parse(response.text || "{}");
  } catch (e) {
    console.error("Failed to parse AI response", e);
    return null;
  }
}
