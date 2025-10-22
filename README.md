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

### Étape 1: Créer un dépôt GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/USERNAME/mma-course-tracker-static.git
git push -u origin main
```

### Étape 2: Activer GitHub Pages
1. Aller dans **Settings** → **Pages**
2. Sous **Source**, sélectionner **GitHub Actions**

### Étape 3: Déploiement automatique
Le workflow GitHub Actions (`.github/workflows/deploy.yml`) se déclenche automatiquement à chaque push sur `main`.

Votre site sera disponible sur: `https://USERNAME.github.io/mma-course-tracker-static/`

## Configuration importante

Le fichier `vite.config.ts` contient la configuration du `base` path :
```typescript
base: '/mma-course-tracker-static/'
```

Si vous changez le nom du dépôt GitHub, vous devez aussi changer cette valeur.

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

## Support

Pour tout problème ou suggestion, créez une issue sur le dépôt GitHub.
