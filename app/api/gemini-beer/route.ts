import { NextResponse } from "next/server";
import { defaultPromtResponse, generateContent } from "@/util/geminiApi";

export async function POST(request: Request) {
    try {
        const { prompt, locale } = await request.json();

        let language = "";

        if (prompt === "") {
            return NextResponse.json({ content: defaultPromtResponse });
        }

        if (locale === "es") {
            language = "Spanish";
        }

        let currate_promt = `You are an expert beer knowledge entity. Provide comprehensive, fact-checked information about ${prompt} beer. Include the following details in your response:
- ABV (Alcohol By Volume) percentage
- Country of origin
- Standard bottle size in milliliters
- Type of beer (e.g., ale, lager)
- Beer style (e.g., IPA, Stout, Pilsner)
- Detailed description of the beer's characteristics
- Any other extra information

Present the information in HTML5 format, wrapped in a single <div> element. Use appropriate heading tags (h2, h3) and unordered lists (ul, li) to structure the content. Apply basic CSS styling to enhance readability. Do not include <!DOCTYPE html> or <html> tags.

Ensure all information is accurate by cross-referencing multiple reliable sources. Do not repeat information unnecessarily.

Use <strong> tags for emphasis instead of asterisks (*).

Make the li more close to each other

${language && "Provide the entire response in Spanish."}

Example structure:

<div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto;">
  <h1 style="font-size: 22px">Beer Name</h1>
  <ul style="display:flex; flex-direction: column; gap: 2px">
    <li><strong>ABV:</strong> X%</li>
    <li><strong>Country of Origin:</strong> Country Name</li>
    <!-- Other details -->
  </ul>
  <h3>Description</h3>
  <p>Detailed description of the beer...</p>
  <p>The Extra information</p>
</div>`;

        const generatedContent = await generateContent(currate_promt);
        return NextResponse.json({
            content: generatedContent,
        });
    } catch (error) {
        return NextResponse.json(
            { error: "Error generating content" },
            { status: 500 }
        );
    }
}
