<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1LeblVpf2YyFam0ZHAxYeSw81AYZykOq_

## Run Locally

**Prerequisites:**  Node.js (v16 or higher recommended)


1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure API Key:
   - Copy `.env.example` to `.env.local`:
     ```bash
     cp .env.example .env.local
     ```
   - Get a free API key from [Google AI Studio](https://aistudio.google.com/apikey)
   - Edit `.env.local` and set your key:
     ```
     VITE_GEMINI_API_KEY=your_api_key_here
     ```

3. Run the app:
   ```bash
   npm run dev
   ```
   
4. Open your browser at `http://localhost:3000`

## Features

- 🎨 **AI SVG Generator** - Generate SVG graphics from text descriptions
- 🔍 **SVG Optimizer** - Optimize and compress SVG files
- 💡 **AI Code Explanation** - Get detailed explanations of SVG code
- 📚 **Interactive Learning Path** - Comprehensive SVG animation tutorials

## Note

Some AI features require a Gemini API key. Without it, the app will still work but AI-powered features will be disabled. You'll see helpful instructions in the UI on how to configure your API key.
