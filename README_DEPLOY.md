# Guide de Déploiement

## Déploiement sur différentes plateformes

### Netlify

#### Déploiement automatique via Git:
1. Connectez votre repository GitHub à Netlify
2. Netlify détectera automatiquement les paramètres depuis `netlify.toml`
3. Ajoutez la variable d'environnement `VITE_GEMINI_API_KEY` dans les paramètres du site

#### Déploiement manuel:
```bash
npm run build
netlify deploy --prod --dir=dist
```

### Vercel

#### Déploiement automatique via Git:
1. Connectez votre repository GitHub à Vercel
2. Vercel détectera automatiquement les paramètres depuis `vercel.json`
3. Ajoutez la variable d'environnement `VITE_GEMINI_API_KEY` dans les paramètres du projet

#### Déploiement via CLI:
```bash
npm install -g vercel
vercel --prod
```

### GitHub Pages

#### Déploiement automatique via GitHub Actions:
1. Ajoutez `VITE_GEMINI_API_KEY` dans les secrets du repository (Settings > Secrets and variables > Actions)
2. Le workflow `.github/workflows/deploy.yml` déploiera automatiquement sur chaque push vers `main`
3. Activez GitHub Pages dans Settings > Pages (source: GitHub Actions)

#### Déploiement manuel:
```bash
npm run build
git subtree push --prefix dist origin gh-pages
```

## Scripts de validation

Avant de déployer, validez votre application:

```bash
npm run validate  # Lance typecheck, lint, et build
npm run predeploy # Alias pour validate
```
