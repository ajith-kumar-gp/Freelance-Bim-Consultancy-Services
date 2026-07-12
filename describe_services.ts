import { GoogleGenAI } from "@google/genai";
import * as fs from "fs";

async function main() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("No GEMINI_API_KEY found in process.env");
    process.exit(1);
  }

  const ai = new GoogleGenAI({ apiKey });

  try {
    const imageBuffer = fs.readFileSync("services_photo.jpeg");
    const base64Image = imageBuffer.toString("base64");

    console.log("Analyzing services_photo.jpeg using Gemini...");
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: [
        {
          inlineData: {
            mimeType: "image/jpeg",
            data: base64Image
          }
        },
        "This image contains a list of services for a consultancy. Please transcribe the exact text or list of services shown, including any categories, descriptions, titles, or subtitles, so I can implement them on the website exactly as shown. Be as thorough, detailed, and professional as possible."
      ]
    });

    console.log("\n=== GEMINI ANALYSIS RESULT ===");
    console.log(response.text);
    console.log("==============================\n");
  } catch (error) {
    console.error("Error analyzing image:", error);
  }
}

main();
