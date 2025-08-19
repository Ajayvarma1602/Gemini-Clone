// src/config/gemini.js
import { GoogleGenerativeAI } from "@google/generative-ai";

// Read API key from Vite .env
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
if (!apiKey) {
  console.warn("VITE_GEMINI_API_KEY is not set in .env");
}

// Initialize Gemini client
const genAI = new GoogleGenerativeAI(apiKey);

// Choose a model (use "gemini-2.0-flash" if your project has access)
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

/**
 * Generate text from Gemini
 * @param {string} prompt - user input
 * @returns {Promise<string>} - model response text
 */
export default async function main(prompt) {
  try {
    if (!prompt || !prompt.trim()) return "";

    // Call Gemini
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        maxOutputTokens: 500,
        temperature: 0.1,
      },
    });

    return result.response.text();
  } catch (err) {
    console.error("Gemini error:", err);
    return "⚠️ Sorry — something went wrong. Please try again.";
  }
}
