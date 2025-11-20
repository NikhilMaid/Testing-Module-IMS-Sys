import { GoogleGenAI } from "@google/genai";

// Initialize the client using the environment variable
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || 'dummy_key_for_build' });

export const getMarketSentiment = async (todaysRates: any): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `
        You are a financial analyst for the Gold & Jewellery market. 
        Based on the following mock market data, provide a concise 2-sentence sentiment analysis for a retail jeweller manager.
        Do not mention you are an AI. Be professional.
        
        Data: ${JSON.stringify(todaysRates)}
      `,
    });
    return response.text || "Market stable. Monitor fluctuations in spot gold prices.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Unable to fetch live market sentiment.";
  }
};

export const analyzeInventoryHealth = async (inventorySummary: any): Promise<string> => {
  try {
     const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `
        Analyze this jewellery inventory summary. Suggest 3 brief actionable insights regarding stock levels, heavy vs light weight mix, or potential dead stock.
        
        Inventory Data: ${JSON.stringify(inventorySummary)}
      `,
    });
    return response.text || "Inventory levels appear normal.";
  } catch (error) {
    return "Inventory analysis unavailable.";
  }
}