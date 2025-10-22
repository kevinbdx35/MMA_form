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

Si vous changez le nom du dépôt, vous devez mettre à jour le fichier `vite.config.ts` :

```typescript
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  base: '/NOUVEAU-NOM-DU-REPO/',  // ← Changer ici
})
```

Ensuite, faire un commit et push pour redéployer.

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
