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
 */
function getAi(): GoogleGenAI {
  if (!ai) {
    const apiKey = getApiKey();
    if (!apiKey) {
      console.warn("Gemini API key missing. Set VITE_GEMINI_API_KEY in your .env.local.");
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
 */
export async function askWithSearch(context: string, question: string): Promise<GenerateContentResponse> {
  // Validate inputs
  if (!context || !question || typeof context !== 'string' || typeof question !== 'string') {
    throw new Error('Le contexte et la question doivent être des chaînes de caractères valides.');
  }
  
  if (question.length > 2000) {
    throw new Error('La question est trop longue. Veuillez limiter à 2000 caractères.');
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
  // Validate inputs
  if (!svgCode || typeof svgCode !== 'string') {
    throw new Error('Le code SVG doit être une chaîne de caractères valide.');
  }
  
  if (svgCode.length > 50000) {
    throw new Error('Le code SVG est trop long. Veuillez limiter à 50 000 caractères.');
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
  const response = await getAi().models.generateContent({ model, contents: prompt });
  return response.text;
}

/**
 * Generates SVG code from a text prompt using the most powerful model.
 * @param prompt - The user's description of the desired SVG.
 * @returns A string containing the raw SVG code.
 */
export async function generateSvg(prompt: string): Promise<string> {
  // Validate inputs
  if (!prompt || typeof prompt !== 'string') {
    throw new Error('La description doit être une chaîne de caractères valide.');
  }
  
  if (prompt.length > 1000) {
    throw new Error('La description est trop longue. Veuillez limiter à 1000 caractères.');
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

  const response = await getAi().models.generateContent({
    model,
    contents: fullPrompt,
    config: {
      thinkingConfig: { thinkingBudget: 32768 }
    }
  });
  return response.text;
}