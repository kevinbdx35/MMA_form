# Fiche de Cours MMA - Version Statique

Application web statique pour enregistrer et suivre vos sessions d'entraînement MMA. Cette version utilise uniquement le stockage local du navigateur (localStorage) et peut être déployée sur GitHub Pages.

## Caractéristiques

- ✅ Enregistrement de fiche de cours avec toutes les sections
- ✅ Impression en PDF avec mise en page optimisée
- ✅ Stockage local (localStorage) - données conservées dans le navigateur
- ✅ Interface Shadcn UI moderne et réactive
- ✅ Sélection de date avec calendrier intégré
- ✅ Onglets pour organiser les différentes sections du cours
- ✅ Badges colorés par discipline (Striking, Lutte, Sol, MMA)

## Technologies utilisées

- **React 19** avec TypeScript
- **Vite** pour le build ultra-rapide
- **Tailwind CSS v4** pour le styling
- **Shadcn UI** pour les composants
- **react-day-picker** pour le calendrier
- **date-fns** pour la manipulation des dates
- **Lucide React** pour les icônes

## Installation locale

```bash
# Installation des dépendances
npm install --legacy-peer-deps

# Lancement en mode développement
npm run dev

# Build pour la production
npm run build

# Prévisualisation du build
npm run preview
```

L'application sera accessible sur `http://localhost:5173/mma-course-tracker-static/`

## Structure du projet

```
src/
├── components/
│   ├── ui/              # Composants Shadcn UI
│   ├── CourseSheetView.tsx    # Vue principale
│   └── CourseSheetDialog.tsx  # Formulaire d'édition
├── lib/
│   ├── storage.ts       # Gestion localStorage
│   └── utils.ts         # Utilitaires
├── App.tsx              # Composant principal
├── main.tsx             # Point d'entrée
└── index.css            # Styles globaux + print
```

## Déploiement sur GitHub Pages

### Configuration avec GitHub Actions

Le déploiement est automatique grâce au workflow GitHub Actions inclus !

#### Étape 1: Créer un dépôt GitHub

```bash
cd mma-course-tracker-static

# Initialiser git
git init
git add .
git commit -m "Initial commit - Application Fiche de Cours MMA"
git branch -M main

# Ajouter votre remote (remplacer USERNAME par votre nom d'utilisateur GitHub)
git remote add origin https://github.com/USERNAME/mma-course-tracker-static.git

# Push vers GitHub
git push -u origin main
```

#### Étape 2: Activer GitHub Pages

**IMPORTANT** : Avant que le workflow puisse déployer, vous devez activer GitHub Pages :

1. Aller sur votre dépôt GitHub
2. Cliquer sur **Settings** (⚙️)
3. Dans le menu de gauche, cliquer sur **Pages**
4. Sous **Build and deployment** → **Source**, sélectionner **GitHub Actions**
5. Cliquer sur **Save**

#### Étape 3: Déploiement automatique ! 🎉

Une fois GitHub Pages activé, le workflow se déclenche automatiquement et va :
1. ✅ Installer les dépendances
2. ✅ Builder l'application
3. ✅ Déployer sur GitHub Pages

À chaque nouveau push sur `main`, le site sera automatiquement mis à jour !

#### URL de votre site

Votre site sera disponible sur:
```
https://USERNAME.github.io/mma-course-tracker-static/
```

#### Déploiement continu

À chaque `git push` sur la branche `main`, le site est automatiquement mis à jour !

#### Étape 4: Vérifier le déploiement

1. Aller dans l'onglet **Actions** de votre dépôt GitHub
2. Vous verrez le workflow "Deploy to GitHub Pages"
3. Si le premier workflow a échoué (❌) :
   - C'est normal ! Vous devez d'abord activer GitHub Pages (voir Étape 2)
   - Une fois Pages activé, cliquez sur le workflow échoué
   - Cliquez sur **Re-run all jobs**
4. Une fois terminé avec succès (✅), votre site est en ligne !

#### Note importante

- La première fois, le workflow peut échouer si Pages n'est pas activé → Activez Pages et relancez le workflow
- Après activation, GitHub Pages peut prendre 2-3 minutes pour être accessible
- Les déploiements suivants seront entièrement automatiques ✨

## Workflow GitHub Actions

Le fichier `.github/workflows/deploy.yml` contient la configuration du déploiement automatique :

```yaml
Déclencheurs:
  - Push sur la branche main
  - Manuel via workflow_dispatch

Permissions:
  - contents: read (lire le code)
  - pages: write (écrire sur Pages)
  - id-token: write (authentification)
  - deployments: write (gérer les déploiements)

Étapes:
  - Checkout du code
  - Setup Node.js v20
  - Installation: npm install --legacy-peer-deps
  - Build: npm run build
  - Configuration GitHub Pages
  - Upload du dossier dist/
  - Déploiement sur GitHub Pages
```

Une fois GitHub Pages activé dans les Settings, chaque push sur `main` déclenche automatiquement le workflow qui :
1. 🔧 Installe les dépendances avec `--legacy-peer-deps`
2. 🏗️ Build l'application avec Vite
3. 📦 Package le dossier `dist/`
4. 🚀 Déploie sur GitHub Pages

⏱️ Durée moyenne du déploiement : **2-3 minutes**

## Configuration importante

Le fichier `vite.config.ts` contient la configuration du `base` path :
```typescript
base: '/mma-course-tracker-static/'
```

⚠️ **Important** : Si vous changez le nom du dépôt GitHub, vous devez aussi changer cette valeur dans `vite.config.ts`.

## Fonctionnalités

### Enregistrement de cours
- Date du cours (avec sélecteur de calendrier)
- Discipline (Striking, Lutte, Sol, MMA)
- Échauffement
- Drills / Exercices
- Techniques travaillées
- Sparring
- Étirement
- Notes personnelles

### Impression PDF
- Bouton d'impression optimisé
- Mise en page A4 automatique
- Conservation des couleurs des badges
- Nom de fichier automatique : `cours_JJ-MM-AAAA.pdf`

### Stockage local
- Données sauvegardées automatiquement dans le navigateur
- Persistance entre les sessions
- Pas besoin de serveur ou base de données

## Notes techniques

### localStorage
Les données sont stockées dans le navigateur sous la clé `mma-course-sheet`. Si vous videz le cache du navigateur, les données seront perdues.

### Compatibilité
- Navigateurs modernes (Chrome, Firefox, Safari, Edge)
- Support mobile complet
- Mode impression optimisé pour tous les navigateurs

### Limitations
- Une seule fiche de cours peut être stockée à la fois
- Pas de synchronisation entre appareils
- Données limitées à ~5-10MB selon le navigateur

## Développement futur

Pour ajouter de nouvelles fonctionnalités :
- Modifier `src/lib/storage.ts` pour le modèle de données
- Mettre à jour `CourseSheetDialog.tsx` pour le formulaire
- Ajuster `CourseSheetView.tsx` pour l'affichage

## Dépannage (Troubleshooting)

### Le workflow GitHub Actions échoue

**Problème** : "HttpError: Resource not accessible by integration" ou "Get Pages site failed"

**Cause** : GitHub Pages n'est pas encore activé sur le dépôt.

**Solution** :
1. Aller dans **Settings** → **Pages**
2. Sous **Build and deployment** → **Source**, sélectionner **GitHub Actions**
3. Cliquer sur **Save**
4. Retourner dans l'onglet **Actions** et cliquer sur **Re-run all jobs** sur le workflow qui a échoué
5. Le déploiement devrait maintenant réussir ✅

**Note** : Cette configuration n'est nécessaire qu'UNE SEULE FOIS. Après, tous les déploiements seront automatiques.

### Le site affiche une page blanche

**Problème** : Le site est déployé mais affiche une page blanche

**Solutions** :
1. Vérifiez que le `base` path dans `vite.config.ts` correspond au nom de votre dépôt :
   ```typescript
   base: '/VOTRE-NOM-DE-REPO/'
   ```
2. Ouvrez la console du navigateur (F12) pour voir les erreurs
3. Vérifiez que les fichiers sont bien dans le dossier `dist/` après le build

### Erreur lors de `npm install`

**Problème** : Conflits de dépendances peer dependencies

**Solution** :
Toujours utiliser `--legacy-peer-deps` :
```bash
npm install --legacy-peer-deps
```

### Les données ne sont pas sauvegardées

**Problème** : Les fiches de cours disparaissent après fermeture du navigateur

**Solutions** :
1. Vérifiez que les cookies/localStorage ne sont pas bloqués dans votre navigateur
2. En navigation privée, les données localStorage sont effacées à la fermeture
3. Utilisez un navigateur moderne (Chrome, Firefox, Safari, Edge)

### L'impression PDF ne fonctionne pas bien

**Problème** : Mise en page incorrecte lors de l'impression

**Solutions** :
1. Utilisez Chrome ou Edge pour de meilleurs résultats d'impression
2. Dans les options d'impression, sélectionnez "Arrière-plans graphiques"
3. Le format A4 est automatiquement appliqué

## Support

Pour tout problème ou suggestion, créez une issue sur le dépôt GitHub.
