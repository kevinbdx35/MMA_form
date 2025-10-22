# Guide de Déploiement - GitHub Pages

Ce guide vous explique comment déployer l'application Fiche de Cours MMA sur GitHub Pages avec le déploiement automatique.

## 📋 Prérequis

- Un compte GitHub
- Git installé sur votre machine
- Node.js v20 ou supérieur

## 🚀 Déploiement en 4 étapes

### Étape 1 : Créer le dépôt GitHub

1. Aller sur [GitHub](https://github.com) et créer un nouveau dépôt
2. Nommer le dépôt : `mma-course-tracker-static` (ou autre nom)
3. **NE PAS** initialiser avec README, .gitignore ou licence
4. Copier l'URL du dépôt (ex: `https://github.com/USERNAME/mma-course-tracker-static.git`)

### Étape 2 : Push le code

```bash
cd mma-course-tracker-static

# Initialiser git
git init
git add .
git commit -m "Initial commit - Application Fiche de Cours MMA"
git branch -M main

# Ajouter votre remote (remplacer USERNAME et REPO)
git remote add origin https://github.com/USERNAME/REPO.git

# Push vers GitHub
git push -u origin main
```

### Étape 3 : Activer GitHub Pages ⚠️ IMPORTANT

**Cette étape est OBLIGATOIRE avant que le déploiement fonctionne !**

1. Aller sur votre dépôt GitHub
2. Cliquer sur **Settings** (⚙️ en haut à droite)
3. Dans le menu de gauche, cliquer sur **Pages**
4. Sous **Build and deployment** :
   - **Source** : Sélectionner **GitHub Actions**
   - Cliquer sur **Save** si nécessaire

![GitHub Pages Settings](https://docs.github.com/assets/cb-23660/images/help/pages/github-actions-source.png)

### Étape 4 : Vérifier le déploiement

1. Aller dans l'onglet **Actions** de votre dépôt
2. Vous verrez le workflow **"Deploy to GitHub Pages"**

#### Si le workflow a échoué (première fois) :

   - ✅ C'est **NORMAL** ! Il faut d'abord activer Pages (Étape 3)
   - Une fois Pages activé :
     1. Cliquer sur le workflow qui a échoué
     2. En haut à droite, cliquer sur **Re-run all jobs**
   - Le workflow devrait maintenant réussir ✅

#### Si le workflow a réussi :

   - ✅ Félicitations ! Votre site est déployé
   - Attendre 2-3 minutes pour que le site soit accessible
   - URL du site : `https://USERNAME.github.io/REPO/`

## 🔄 Déploiements futurs

Une fois la configuration initiale terminée, **tous les déploiements sont automatiques** !

Chaque fois que vous faites un `git push` sur la branche `main` :
1. 🔧 Le workflow s'exécute automatiquement
2. 🏗️ L'application est buildée
3. 🚀 Le site est mis à jour (2-3 minutes)

```bash
# Faire des modifications
git add .
git commit -m "Description des modifications"
git push

# ✨ Le déploiement se fait automatiquement !
```

## ⚙️ Configuration du base path

### Pourquoi le base path est important ?

Le `base` path indique à Vite où se trouvent les assets (CSS, JS) de votre application. Pour GitHub Pages, l'URL est :
```
https://USERNAME.github.io/NOM-DU-REPO/
```

Le `base` path doit donc être `/NOM-DU-REPO/` (avec les slashes).

### Configuration actuelle

Le fichier `vite.config.ts` est configuré pour :
- **Mode dev** : base path = `/` (racine, pour localhost)
- **Mode production** : base path = `/mma-course-tracker-static/`

```typescript
export default defineConfig(({ command }) => ({
  // En dev, pas de base path
  // En production, utiliser le nom du repo GitHub
  base: command === 'serve' ? '/' : '/mma-course-tracker-static/',
}))
```

### Si vous renommez le dépôt

⚠️ **IMPORTANT** : Si votre dépôt GitHub a un nom différent, vous **DEVEZ** changer le base path !

Par exemple, si votre dépôt est `mon-app-mma` :

1. **Modifier** `vite.config.ts` :
   ```typescript
   base: command === 'serve' ? '/' : '/mon-app-mma/',
   ```

2. **Rebuild et redéployer** :
   ```bash
   npm run build
   git add .
   git commit -m "Update base path to match repo name"
   git push
   ```

3. **Vérifier** que le site fonctionne sur :
   ```
   https://USERNAME.github.io/mon-app-mma/
   ```

### ⚠️ Sensible à la casse

Le nom dans `vite.config.ts` doit correspondre **EXACTEMENT** au nom du dépôt :
- `Mon-App-MMA` ≠ `mon-app-mma`
- Vérifier le nom exact sur GitHub

## 🐛 Résolution de problèmes

### Erreur : "HttpError: Resource not accessible by integration"

**Cause** : GitHub Pages n'est pas activé.

**Solution** : Suivre l'Étape 3 pour activer Pages, puis relancer le workflow.

### Le site affiche une page blanche

**Cause** : Le `base` path ne correspond pas au nom du dépôt.

**Solution** :
1. Vérifier le nom exact de votre dépôt sur GitHub
2. Mettre à jour `base: '/NOM-DU-REPO/'` dans `vite.config.ts`
3. Commit et push

### Erreurs 404 sur les assets (CSS/JS/images)

**Problème** : Console du navigateur affiche :
```
Failed to load resource: index-XXX.css:1 (404)
Failed to load resource: index-XXX.js:1 (404)
Failed to load resource: vite.svg:1 (404)
```

**Cause** : Le `base` path dans `vite.config.ts` ne correspond PAS au nom du dépôt GitHub.

**Solution rapide** :
1. Vérifier le nom **EXACT** du dépôt sur GitHub (attention à la casse !)
2. Modifier `vite.config.ts` ligne 15 :
   ```typescript
   base: command === 'serve' ? '/' : '/NOM-EXACT-DU-DEPOT/',
   ```
3. Rebuild et push :
   ```bash
   npm run build
   git add vite.config.ts dist/
   git commit -m "Fix: Update base path to match repo name"
   git push
   ```
4. Attendre 2-3 minutes → Recharger la page

**Exemple** :
- Si le dépôt est `tracker-mma` → `base: ... ? '/' : '/tracker-mma/'`
- Si le dépôt est `MMA-Tracker` → `base: ... ? '/' : '/MMA-Tracker/'`

### Le workflow reste "en cours" pendant longtemps

**Cause** : Problème avec les dépendances ou le build.

**Solution** :
1. Cliquer sur le workflow dans Actions
2. Regarder les logs pour voir l'erreur exacte
3. Le problème est souvent lié aux dépendances npm

### Le site n'affiche pas mes dernières modifications

**Solution** :
1. Vider le cache du navigateur (Ctrl+Shift+R ou Cmd+Shift+R)
2. Attendre 2-3 minutes après le déploiement
3. Vérifier que le workflow Actions a bien terminé avec succès

## 📊 Monitoring

### Vérifier l'état du déploiement

1. Onglet **Actions** : Voir l'historique des déploiements
2. Badge de status (optionnel) à ajouter au README :

```markdown
![Deploy Status](https://github.com/USERNAME/REPO/actions/workflows/deploy.yml/badge.svg)
```

### Logs du déploiement

- Cliquer sur n'importe quel workflow dans **Actions**
- Développer les étapes pour voir les logs détaillés
- Utile pour debugger les problèmes de build

## 🔒 Sécurité

- Le workflow utilise des permissions minimales requises
- Pas de secrets nécessaires (déploiement public)
- Les artifacts sont automatiquement nettoyés après déploiement

## 📝 Personnalisation du domaine (Avancé)

Pour utiliser un domaine personnalisé (ex: `mma-tracker.example.com`) :

1. Dans **Settings** → **Pages** → **Custom domain**
2. Entrer votre domaine
3. Configurer les DNS chez votre registrar :
   - Type CNAME pointant vers `USERNAME.github.io`
4. Attendre la propagation DNS (jusqu'à 24h)

Mettre à jour `vite.config.ts` :
```typescript
base: '/',  // Racine pour domaine personnalisé
```

## 💡 Astuces

- **Déploiement manuel** : Onglet Actions → "Deploy to GitHub Pages" → "Run workflow"
- **Désactiver le déploiement auto** : Supprimer `.github/workflows/deploy.yml`
- **Tester avant déploiement** : `npm run build && npm run preview`

## 📚 Ressources

- [GitHub Pages Documentation](https://docs.github.com/pages)
- [GitHub Actions Documentation](https://docs.github.com/actions)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)

---

**Besoin d'aide ?** Créez une issue sur le dépôt GitHub avec les détails de votre problème et les logs du workflow.
