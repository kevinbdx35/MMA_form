# Changelog

Toutes les modifications notables de ce projet seront documentées dans ce fichier.

## [1.0.0] - 2025-10-22

### 🎉 Version Initiale

Application complète de gestion de fiches de cours MMA avec déploiement automatique sur GitHub Pages.

### ✨ Fonctionnalités

- **Gestion de fiches de cours**
  - Création, édition et suppression de fiche
  - Sélection de date avec calendrier intégré
  - Choix de discipline (Striking, Lutte, Sol, MMA)
  - Sections organisées par onglets :
    - Échauffement
    - Drills / Exercices
    - Techniques travaillées
    - Sparring
    - Étirement
    - Notes personnelles

- **Interface utilisateur**
  - Design moderne avec Shadcn UI
  - Badges colorés par discipline
  - Interface responsive (mobile & desktop)
  - Mode d'impression optimisé A4

- **Stockage**
  - LocalStorage pour la persistance des données
  - Pas besoin de serveur ou base de données
  - Données conservées entre les sessions

- **Impression PDF**
  - Mise en page A4 automatique
  - Conservation des couleurs des badges
  - Nom de fichier automatique : `cours_JJ-MM-AAAA.pdf`
  - Optimisé pour Chrome, Firefox, Safari, Edge

### 🚀 Déploiement

- **GitHub Actions**
  - Workflow de déploiement automatique
  - Déclenchement sur push vers `main`
  - Déploiement manuel possible via `workflow_dispatch`
  - Build avec Node.js v20
  - Installation avec `--legacy-peer-deps`

- **GitHub Pages**
  - Configuration automatique du déploiement
  - Base path configuré pour GitHub Pages
  - Support des domaines personnalisés

### 🛠️ Technologies

- **Frontend**
  - React 19 avec TypeScript
  - Vite 7 (build ultra-rapide)
  - Tailwind CSS v4 (styling moderne avec OKLCH)
  - Shadcn UI (composants)

- **Bibliothèques**
  - react-day-picker v8 (calendrier)
  - date-fns v4 (manipulation des dates)
  - lucide-react (icônes)
  - react-hook-form (formulaires)
  - tw-animate-css (animations)

### 📝 Documentation

- **README.md**
  - Documentation complète du projet
  - Instructions d'installation
  - Structure du projet
  - Fonctionnalités détaillées
  - Notes techniques et limitations

- **DEPLOYMENT.md**
  - Guide de déploiement pas à pas
  - Configuration GitHub Pages
  - Résolution de problèmes courants
  - Astuces et personnalisation

### 🎨 Design

- **Système de couleurs OKLCH**
  - Variables CSS modernes
  - Support du mode dark
  - Palette cohérente avec la version Next.js

- **Composants Shadcn UI**
  - Accordion, Badge, Button, Calendar
  - Card, Dialog, Form, Input
  - Label, Popover, Select, Separator
  - Tabs, Textarea

### 🔧 Configuration

- **Vite**
  - Base path configuré pour GitHub Pages
  - Alias `@` pour imports simplifiés
  - Build optimisé avec tree-shaking

- **Tailwind CSS v4**
  - Configuration inline via `@theme`
  - Variables personnalisées
  - Plugin tw-animate-css

- **TypeScript**
  - Configuration stricte
  - Types pour tous les composants
  - Support des path aliases

### 📦 Build

- **Tailles des fichiers (production)**
  - HTML : 0.54 kB (0.32 kB gzippé)
  - CSS : 40.15 kB (7.71 kB gzippé)
  - JS : 394.87 kB (124.17 kB gzippé)

### 🐛 Corrections

- Compatibilité react-day-picker v8 avec date-fns v4
- Gestion des peer dependencies avec `--legacy-peer-deps`
- Configuration PostCSS pour Tailwind v4
- Permissions GitHub Actions pour le déploiement

### 📋 Limitations connues

- Une seule fiche de cours stockée à la fois
- Pas de synchronisation entre appareils
- Données limitées par localStorage (~5-10MB)
- Nécessite l'activation manuelle de GitHub Pages pour le premier déploiement

### 🔮 Améliorations futures possibles

- Support de multiples fiches de cours
- Export/import des données
- Historique des cours
- Statistiques et graphiques
- Synchronisation cloud (Firebase, Supabase)
- Mode hors ligne (PWA)
- Partage de fiches

---

**Format du changelog** : [Keep a Changelog](https://keepachangelog.com/)
**Versioning** : [Semantic Versioning](https://semver.org/)
