# Guide de Démarrage Rapide

## Pour les développeurs

### Installation rapide

```bash
# Cloner le repository
git clone https://github.com/kamzal57/zzzzzz.git
cd zzzzzz

# Installer les dépendances
npm install

# Créer le fichier .env.local
npm run setup

# Éditer .env.local avec votre clé API
# Remplacez 'your_api_key_here' par votre vraie clé API

# Démarrer le serveur de développement
npm run dev
```

Visitez http://localhost:3000

### Obtenir une clé API Gemini

1. Allez sur https://aistudio.google.com/app/apikey
2. Créez une nouvelle clé API
3. Copiez la clé dans votre fichier `.env.local`

## Pour le déploiement

### Option 1: Netlify (Recommandé pour les débutants)

1. Fork ce repository
2. Connectez-vous sur https://netlify.com
3. Cliquez sur "Add new site" → "Import an existing project"
4. Sélectionnez votre repository
5. Ajoutez la variable d'environnement `VITE_GEMINI_API_KEY`
6. Cliquez sur "Deploy"

### Option 2: Vercel

1. Fork ce repository
2. Connectez-vous sur https://vercel.com
3. Cliquez sur "Add New Project"
4. Importez votre repository
5. Ajoutez la variable d'environnement `VITE_GEMINI_API_KEY`
6. Cliquez sur "Deploy"

### Option 3: GitHub Pages

1. Fork ce repository
2. Allez dans Settings → Secrets and variables → Actions
3. Ajoutez un secret `VITE_GEMINI_API_KEY`
4. Allez dans Settings → Pages
5. Sélectionnez "GitHub Actions" comme source
6. Poussez un commit sur la branche `main` pour déclencher le déploiement

## Commandes utiles

```bash
npm run setup       # Créer le fichier .env.local
npm run dev         # Démarrer le serveur de développement
npm run build       # Construire pour la production
npm run preview     # Prévisualiser la version de production
npm run lint        # Vérifier le code avec ESLint
npm run typecheck   # Vérifier les types TypeScript
```

## Support

Pour toute question ou problème, ouvrez une issue sur GitHub.
