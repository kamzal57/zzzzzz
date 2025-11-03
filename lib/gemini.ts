import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

let ai: GoogleGenAI | undefined;

/**
 * Returns the configured API key from environment (Vite) or process define fallback.
 */
export function getApiKey(): string | undefined {
  // Preferred: Vite exposes variables starting with VITE_
  // This will be statically replaced at build time for client code
  const viteKey = (import.meta as any)?.env?.VITE_GEMINI_API_KEY as string | undefined;
  if (viteKey && typeof viteKey === 'string' && viteKey.trim().length > 0) return viteKey;

  // Fallback for previous define mapping if present
  // Note: In the browser, `process` is undefined; we only read the literal if Vite replaced it
  try {
    // @ts-ignore - this may be replaced by Vite define
    const definedApiKey = (process as any)?.env?.API_KEY as string | undefined;
    if (definedApiKey && definedApiKey.trim().length > 0) return definedApiKey;
    // @ts-ignore - also try GEMINI_API_KEY if defined
    const definedGeminiKey = (process as any)?.env?.GEMINI_API_KEY as string | undefined;
    if (definedGeminiKey && definedGeminiKey.trim().length > 0) return definedGeminiKey;
  } catch {
    // ignore
  }
  return undefined;
}

export function isApiKeyConfigured(): boolean {
  return !!getApiKey();
}

/**
 * Lazy-initializes the GoogleGenAI instance.
 * @returns An initialized GoogleGenAI instance.
 * @throws Error if API key is not configured
 */
function getAi(): GoogleGenAI {
  if (!ai) {
    const apiKey = getApiKey();
    if (!apiKey) {
      console.warn("Gemini API key missing. Set VITE_GEMINI_API_KEY in your .env.local.");
      // Still initialize with empty key to avoid null checks, but functions will fail
    }
    ai = new GoogleGenAI({ apiKey: apiKey ?? '' });
  }
  return ai;
}


/**
 * Asks a question with context, using Google Search for up-to-date information.
 * @param context - The context from the lesson.
 * @param question - The user's question.
 * @returns The full GenerateContentResponse object.
 * @throws Error if API key is not configured or request fails
 */
export async function askWithSearch(context: string, question: string): Promise<GenerateContentResponse> {
  if (!isApiKeyConfigured()) {
    throw new Error('API key not configured. Please set VITE_GEMINI_API_KEY in .env.local');
  }

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

  try {
    const response = await getAi().models.generateContent({
      model,
      contents: prompt,
      config: {
        tools: [{googleSearch: {}}],
      },
    });
    return response;
  } catch (error: any) {
    throw new Error(`Failed to get AI response: ${error.message || 'Unknown error'}`);
  }
}

/**
 * Explains a piece of SVG code for a beginner.
 * @param svgCode - The SVG code string to explain.
 * @returns The explanation text in Markdown.
 * @throws Error if API key is not configured or request fails
 */
export async function explainSvg(svgCode: string): Promise<string> {
  if (!isApiKeyConfigured()) {
    throw new Error('API key not configured. Please set VITE_GEMINI_API_KEY in .env.local');
  }

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
  try {
    const response = await getAi().models.generateContent({ model, contents: prompt });
    return response.text;
  } catch (error: any) {
    throw new Error(`Failed to explain SVG: ${error.message || 'Unknown error'}`);
  }
}

/**
 * Generates SVG code from a text prompt using the most powerful model.
 * @param prompt - The user's description of the desired SVG.
 * @returns A string containing the raw SVG code.
 * @throws Error if API key is not configured or request fails
 */
export async function generateSvg(prompt: string): Promise<string> {
  if (!isApiKeyConfigured()) {
    throw new Error('API key not configured. Please set VITE_GEMINI_API_KEY in .env.local');
  }

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

  try {
    const response = await getAi().models.generateContent({
      model,
      contents: fullPrompt,
      config: {
        thinkingConfig: { thinkingBudget: 32768 }
      }
    });
    return response.text;
  } catch (error: any) {
    throw new Error(`Failed to generate SVG: ${error.message || 'Unknown error'}`);
  }
}