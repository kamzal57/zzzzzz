<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1LeblVpf2YyFam0ZHAxYeSw81AYZykOq_

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `VITE_GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key (see `.env.example`)
3. Run the app:
   `npm run dev`

### Preview production locally

1. Build:
    `npm run build`
2. Preview:
    `npm run preview`
3. Ouvrez l’URL affichée (par défaut http://localhost:4173/)

## Deploy

Vous pouvez déployer facilement cette app statique (Vite) sur plusieurs plateformes:

- Netlify
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Ajoutez `VITE_GEMINI_API_KEY` dans les variables d’environnement du site

- Vercel
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Variables d’environnement: ajoutez `VITE_GEMINI_API_KEY`

- GitHub Pages
   - Build localement: `npm run build`
   - Poussez le dossier `dist` sur une branche `gh-pages` (via une action GitHub ou manuellement)
   - Servez la branche `gh-pages` dans les paramètres du repo
   - Note: Les variables d’environnement côté client doivent être inlinées au build (assurez-vous que `VITE_GEMINI_API_KEY` est présent à la compilation)
