import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

export async function generateContent(prompt: string): Promise<string> {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
}

export const defaultPromtResponse = `
<div style={{ whiteSpace: "pre-line" }}>I can't provide you with specific information about a particular beer without knowing which one you're interested in. There are literally thousands of different beers, each with its own unique characteristics.
However, I can give you a general overview of what kind of information is available for each beer, and how you can find it:

General Beer Information:
    ABV% (Alcohol by Volume): This indicates the percentage of alcohol content in the beer. 
    Country of Origin: This tells you where the beer was brewed.
    ML in a Bottle: Standard bottle sizes vary, but common ones are 330ml and 500ml. 
    Type of Beer (Ale, Lager, etc.): This broadly categorizes the beer based on its brewing process and characteristics.
    Style: This describes the specific style of beer within its type, offering more detailed information about flavor, color, and brewing methods.
    Description: This provides information about the beer's aroma, taste, and mouthfeel. 
    Image: Visual representation of the beer bottle and its label.

How to Find Information about a Specific Beer:

 Use a Beer Search Engine: Websites like BeerAdvocate, RateBeer, Untappd, or BeerMenus allow you to search for beers by name, brewery, style, or location.
 Visit Brewery Websites: Many breweries have detailed information about their beers on their websites. 
 Consult a Beer Encyclopedia: There are many excellent beer books and online resources that offer comprehensive information about different beer styles and breweries.
</div>`;

export function getPrompt(beer: string, language: string, id: string): string {
    const promptsDB = {
        prompt1: `You are a beer knowledge entity, I want the whole information about ${beer} beer
    and FACT check it more than one time to compare it but not show information multiple times,
    including in bullet points ABV %, country of origin, ml in a bottle, type of beer (ale, lager, etc), style, 
    description, Image, and an url for an image. With no "*" (for strong use HTML).
    Deliver all code as Html5 (syntax) so it can be displayed directly in a page use H2's and ul-li, with no DOCTYPE, just a div wrapper, 
    add some styling and remove unnecessary empty spaces, margin and paddings. ${
        language && "The result has to be in Spanish"
    }`,
    };

    return promptsDB[id as keyof typeof promptsDB];
}
