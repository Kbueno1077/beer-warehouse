import { NextResponse } from "next/server";
import { defaultPromtResponse, generateContent } from "@/util/geminiApi";

export async function POST(request: Request) {
    try {
        const { prompt, locale } = await request.json();

        let language = "";

        console.log(prompt);
        if (prompt === "") {
            return NextResponse.json({ content: defaultPromtResponse });
        }

        if (locale === "es") {
            language = "Spanish";
        }

        let currate_promt = `You are a beer knowledge entity, I want the whole information about ${prompt} beer
           and FACT check it more that one time to compare it but not show information multiple times,
           including in bullet points ABV %, country of origin, ml in a bottle,type of beer (ale, laguer, etc), style, 
           description, Image, and an url for an image.With no "*" (for strong use HTML).
           Deliver all code as Html5 (syntax) so it can be displayed directly in a page use H2's and ul-li, with no DOCTYPE, just a div wrapper, 
           add some styling and remove unnecessary emtpy spaces, margin and paddings. ${
               language && "The result has to be in Spanish"
           }
        `;

        const generatedContent = await generateContent(currate_promt);
        return NextResponse.json({ content: generatedContent });
    } catch (error) {
        return NextResponse.json(
            { error: "Error generating content" },
            { status: 500 }
        );
    }
}
