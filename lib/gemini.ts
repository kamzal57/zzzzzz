import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

let ai: GoogleGenAI | undefined;

/**
 * Lazy-initializes the GoogleGenAI instance.
 * @returns An initialized GoogleGenAI instance.
 */
function getAi(): GoogleGenAI {
  if (!ai) {
    let apiKey: string = '';
    // Use globalThis to safely check for the 'process' object across environments.
    // The guidelines state process.env.API_KEY is pre-configured and accessible.
    // This check is merely to prevent a ReferenceError if 'process' itself is not defined
    // in the specific execution context where the module is parsed.
    if (typeof globalThis !== 'undefined' && (globalThis as any).process && (globalThis as any).process.env && (globalThis as any).process.env.API_KEY) {
      apiKey = (globalThis as any).process.env.API_KEY as string;
    } else {
      // If globalThis.process.env.API_KEY is not found,
      // it means the environment has failed to provide it as per guidelines.
      // Log a warning, but proceed with an empty string as required by the constructor type.
      // Actual API calls will fail due to missing key, but the app will load.
      console.warn("API_KEY (process.env.API_KEY) not found. Gemini API calls will likely fail. Ensure the environment variable is correctly set.");
    }
    
    ai = new GoogleGenAI({ apiKey: apiKey });
  }
  return ai;
}


/**
 * Asks a question with context, using Google Search for up-to-date information.
 * @param context - The context from the lesson.
 * @param question - The user's question.
 * @returns The full GenerateContentResponse object.
 */
export async function askWithSearch(context: string, question: string): Promise<GenerateContentResponse> {
  const model = 'gemini-2.5-flash';
  const prompt = `
    You are an expert on SVG and web animation.
    Based on the context below and your general knowledge, answer the following question.
    Use Google Search to find the most up-to-date and accurate information if needed.
    Provide a concise and helpful answer. Format the answer in Markdown.
    
    Context:
    ---
    ${context}
    ---
    
    Question: ${question}
  `;

  const response = await getAi().models.generateContent({
    model,
    contents: prompt,
    config: {
      tools: [{googleSearch: {}}],
    },
  });
  return response;
}

/**
 * Explains a piece of SVG code for a beginner.
 * @param svgCode - The SVG code string to explain.
 * @returns The explanation text in Markdown.
 */
export async function explainSvg(svgCode: string): Promise<string> {
  const model = 'gemini-2.5-flash';
  const prompt = `
    You are an expert SVG developer. Explain the following SVG code to a beginner.
    Break down the main elements and attributes. Explain what each part does.
    Keep the explanation clear, concise, and easy to understand.
    Format the response in Markdown.

    SVG Code:
    ---
    ${svgCode}
    ---
  `;
  const response = await getAi().models.generateContent({ model, contents: prompt });
  return response.text;
}

/**
 * Generates SVG code from a text prompt using the most powerful model.
 * @param prompt - The user's description of the desired SVG.
 * @returns A string containing the raw SVG code.
 */
export async function generateSvg(prompt: string): Promise<string> {
  const model = 'gemini-2.5-pro';
  const fullPrompt = `
    You are an expert SVG designer. Create a complete, valid SVG code based on the following description.
    The SVG should be visually appealing and well-structured.
    - The SVG must be a single, self-contained block of code.
    - The SVG should be scalable and must use a viewBox attribute. For a square icon, use viewBox="0 0 100 100".
    - Do not include any raster images or external resources.
    - Use inline styles or classes if necessary, but prefer attributes for colors and shapes. Use presentation attributes (e.g., fill, stroke) over CSS styles.
    - Add a <title> element that describes the SVG.
    - Respond ONLY with the raw SVG code, and nothing else. Do not wrap it in markdown backticks or any other text.
    
    Description: "${prompt}"
  `;

  const response = await getAi().models.generateContent({
    model,
    contents: fullPrompt,
    config: {
      thinkingConfig: { thinkingBudget: 32768 }
    }
  });
  return response.text;
}