<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# SVG Animation Learning Path

Une application web interactive pour maîtriser les animations SVG avec l'IA.

View your app in AI Studio: https://ai.studio/apps/drive/1LeblVpf2YyFam0ZHAxYeSw81AYZykOq_

## Exécution Locale

**Prérequis:** Node.js 18+

1. **Installer les dépendances:**
   ```bash
   npm install
   ```

2. **Configurer la clé API Gemini:**
   - Créez un fichier `.env.local` à la racine du projet (ou exécutez `npm run setup`)
   - Obtenez votre clé API sur: https://aistudio.google.com/app/apikey
   - Ajoutez votre clé:
     ```
     VITE_GEMINI_API_KEY=votre_clé_api_ici
     ```

3. **Démarrer le serveur de développement:**
   ```bash
   npm run dev
   ```
   L'application sera accessible sur http://localhost:3000

## Prévisualisation en mode production

1. **Build de l'application:**
   ```bash
   npm run build
   ```

2. **Prévisualiser la version de production:**
   ```bash
   npm run preview
   ```
   L'application sera accessible sur http://localhost:4173/

3. **Vérification de la qualité du code:**
   ```bash
   npm run lint        # Vérifier le style de code
   npm run typecheck   # Vérifier les types TypeScript
   ```

## Déploiement

Cette application statique (Vite + React) peut être déployée sur plusieurs plateformes:

### Netlify

1. Connectez votre repository GitHub à Netlify
2. Configuration de build:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
3. Variables d'environnement:
   - Ajoutez `VITE_GEMINI_API_KEY` avec votre clé API dans les paramètres du site

### Vercel

1. Importez votre projet depuis GitHub
2. Configuration (détectée automatiquement):
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
3. Variables d'environnement:
   - Ajoutez `VITE_GEMINI_API_KEY` dans les paramètres du projet

### GitHub Pages

1. **Méthode avec GitHub Actions** (recommandée):
   - Créez `.github/workflows/deploy.yml`:
     ```yaml
     name: Deploy to GitHub Pages
     on:
       push:
         branches: [ main ]
     jobs:
       build-and-deploy:
         runs-on: ubuntu-latest
         steps:
           - uses: actions/checkout@v3
           - uses: actions/setup-node@v3
             with:
               node-version: 18
           - run: npm ci
           - run: npm run build
             env:
               VITE_GEMINI_API_KEY: ${{ secrets.VITE_GEMINI_API_KEY }}
           - uses: peaceiris/actions-gh-pages@v3
             with:
               github_token: ${{ secrets.GITHUB_TOKEN }}
               publish_dir: ./dist
     ```
   - Ajoutez `VITE_GEMINI_API_KEY` dans les Secrets du repository

2. **Méthode manuelle:**
   - Build avec votre clé API: `VITE_GEMINI_API_KEY=votre_clé npm run build`
   - Déployez le dossier `dist` sur la branche `gh-pages`
   - Activez GitHub Pages dans les paramètres du repository

### Autres plateformes (Cloudflare Pages, Render, etc.)

Configuration générale:
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Variable d'environnement:** `VITE_GEMINI_API_KEY`

## Fonctionnalités

- 🎨 **Générateur SVG avec IA** - Créez des SVG à partir de descriptions textuelles
- 🔧 **Optimiseur SVG** - Réduisez la taille de vos fichiers SVG
- 🤖 **Analyseur de code** - Comprenez votre code SVG grâce à l'IA
- 📚 **Parcours d'apprentissage** - Modules progressifs pour maîtriser les animations SVG

## Technologies

- React 19 + TypeScript
- Vite 6
- Tailwind CSS
- Google Gemini AI
- SVGO pour l'optimisation

## Licence

Ce projet est open source.
