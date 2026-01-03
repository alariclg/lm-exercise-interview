# Technical Interview Exercise - ~~Reviewed~~ Reinterpreted by Alaric

## ~~Overview~~

~~You have **1 hour** to complete this technical exercise. The goal is to demonstrate your global skills.~~

## Ma démarche

Au lieu de suivre strictement le cadre du test technique initial (1h), j'ai choisi de prendre du recul et d'utiliser cet exercice comme une opportunité de :

- **Découvrir en profondeur** les technologies proposées (Ionic, TanStack Query, Valtio)
- **Démontrer ma vision** d'une architecture de projet propre et maintenable
- **Appliquer les bonnes pratiques** que j'utiliserais en conditions réelles

**Temps investi :** ~7-8 heures de travail réparties sur une journée

## Current Setup

This is an Ionic React application with:

- TypeScript support
- Electron desktop and capacitor mobile app capability
- Cypress for E2E testing
- ~~Vitest~~ **Jest** for unit testing
- SASS/CSS support
- Platform detection utilities
- **TanStack Query** pour la gestion des requêtes API
- **Valtio** pour la gestion d'état
- **Husky** pour les hooks Git et qualité du code

### Prerequisites

- Git available
- Node.js installed
- java (android)

There is a `mise.toml` file to help install the correct tools and versions using [mise](https://mise.jdx.dev/).

## ~~Tasks~~ Réalisations

### ✅ ~~1. Create a New Page (15 minutes)~~ Page de profil créée et améliorée

~~Create a new page called that is navigatable from the home page.~~

**Ce qui a été fait :**

- ✅ Page Profil créée avec navigation depuis Home
- ✅ Utilisation de composants Ionic (IonCard, IonButton, IonBackButton, etc.)
- ✅ Gestion de la déconnexion avec redirection
- ✅ Intégration réactive avec Valtio (`useSnapshot`)

### ✅ ~~2. Create a Platform-Aware Component (25 minutes)~~ PlatformInfo créé et testé

~~Create an inner component that displays different content based on the platform/OS.~~

**Ce qui a été fait :**

- ✅ Composant `PlatformInfo` créé
- ✅ Détection de plateforme (iOS/Android/Desktop/Web)
- ✅ Affichage des informations OS spécifiques
- ✅ Intégré dans la page Profil

### ✅ ~~3. Unit Testing (10 minutes)~~ Tests unitaires et fonctionnels

~~Create a unit test for your PlatformInfo component.~~

**Approche adoptée :**

- ✅ Tests unitaires pour les **méthodes/fonctions** (utilitaires, helpers, hooks API)
- ✅ Tests **fonctionnels** pour les **composants** React (Header, Home)
- ✅ Configuration Vitest avec React Testing Library
- ✅ Tests réactifs et maintenables avec mocks appropriés

**Tests implémentés :**

- `src/tests/utils/platform.test.ts` - Tests des utilitaires de détection de plateforme
- `src/tests/api/data.test.tsx` - Tests du hook `useDataQuery`
- `src/tests/api/user.test.tsx` - Tests du hook `useLoginMutation`
- `src/tests/components/Header.test.tsx` - Tests fonctionnels du composant Header
- `src/tests/pages/Home.test.tsx` - Tests fonctionnels de la page Home

**Note sur les tests :** La couverture actuelle démontre une approche pragmatique avec des tests unitaires pour la logique métier et des tests fonctionnels pour les composants clés. D'autres composants (Login, Profil, DataExampleList, PrivateRoute) pourraient être testés de manière similaire. **J'aimerais discuter de votre vision et de vos attentes en matière de tests** pour aligner ma pratique sur les standards de l'équipe.

### ✅ ~~4. BONUS: Component/E2E Testing (10 minutes)~~ Cypress configuré

~~If time permits, create a Cypress test.~~

**État :** Configuration Cypress maintenue et prête à l'emploi

## 🚀 Améliorations architecturales apportées

### 1. **Restructuration de l'API et des requêtes**

- Création du dossier `/src/api` pour centraliser les appels API
- Pattern hooks réutilisables : `useDataQuery()`, `useLoginMutation()`
- Typage TypeScript strict avec inférence automatique
- Séparation claire entre data fetching et UI

**Exemple :**

```typescript
// src/api/data.ts
export const useDataQuery = () => {
  return useQuery<DataExample[], Error>({
    queryKey: ["fetchData"],
    queryFn: async () => {
      /* ... */
    },
  });
};
```

### 2. **Gestion d'état avec Valtio**

- State management réactif et minimal
- Fonctions `login()` et `logout()` encapsulées
- `useSnapshot()` pour la réactivité dans les composants

### 3. **Amélioration des alias et imports**

- Configuration TypeScript avec path mapping (`@api`, `@components`, `@store`, etc.)
- Imports plus lisibles et maintenables

### 4. **Qualité de code**

- Installation et configuration de **Husky** pour les hooks Git
- Pre-commit hooks pour validation du code
- ESLint configuré et appliqué

### 5. **API Backend déployée**

- API accessible à l'adresse : **[edulib.alariclg.com](http://edulib.alariclg.com)**
- Endpoints fonctionnels pour l'authentification et les données
- CORS configuré pour le développement
- **Identifiants de test :**
  - Username : `"user"` (n'importe quelle valeur fonctionne)
  - Password : `"password"` (requis pour que l'API génère un token)

### 6. **Architecture propre et scalable**

```
src/
├── api/          # Hooks TanStack Query centralisés
├── components/   # Composants réutilisables
├── models/       # Types et interfaces
├── pages/        # Pages de l'application
├── schema/       # Schémas de validation (Zod)
├── store/        # State management (Valtio)
└── utils/        # Utilitaires
```

### 7. **Configuration multi-plateforme**

- Configuration des builds **Android** (Capacitor + Gradle)
- Configuration des builds **iOS** (CocoaPods + Xcode)
- Résolution des problèmes de dépendances natives (Ruby gems, Bundler)
- Tests sur émulateurs/simulateurs iOS et Android
- Temps significatif investi dans la configuration de l'environnement mobile

## 🛠️ Technologies explorées en profondeur

1. **TanStack Query (React Query)**

   - Documentation officielle étudiée
   - Patterns modernes (`queryOptions`, hooks customs)
   - Gestion du cache et des états de chargement

2. **Valtio**

   - Proxy-based state management
   - Intégration avec React via `useSnapshot`

3. **Ionic React**
   - Composants et patterns UI
   - Navigation et routing
   - Gestion des événements (`onClick` vs `onIonClick`)

## 🤖 Méthodologie de travail

J'ai été accompagné par **GitHub Copilot** (Claude Sonnet 4.5) pour :

- ✅ Accélérer la recherche dans la documentation
- ✅ Valider des choix architecturaux
- ✅ Déboguer plus rapidement
- ✅ Explorer les meilleures pratiques TypeScript/React
- ✅ **Appréhender les tests et les mocks avec Vitest** - Copilot m'a permis de comprendre rapidement le fonctionnement des mocks, les patterns de tests avec TanStack Query, et d'écrire des tests robustes pour les hooks, mutations et utilitaires

Cette approche m'a permis de **gagner en vélocité** tout en **approfondissant ma compréhension** des technologies.

## ~~Getting Started~~

~~Take your time to explore the repository and the scripts provided. Don't hesitate to ask questions if anything is unclear.~~

## Installation et lancement

```bash
# Installation des dépendances
npm install

# Lancement en mode développement web
npm run dev:web

# Tests
npm test

# Linting
npm run lint

# Build pour mobile
npm run build:lm

# Android (nécessite Java/Android SDK)
npm run dev:android

# iOS (nécessite macOS/Xcode)
# 1. Installer les dépendances iOS
cd ios/App && bundle install && bundle exec pod install && cd ../..
# 2. Lancer sur simulateur
npx ionic cap run ios
```

## ~~Evaluation Criteria~~

~~1. **Code Quality:** Clean, readable, well-structured code~~
~~3. **TypeScript:** Correct typing and interfaces~~
~~5. **Testing:** Working unit tests with good coverage~~
~~6. **Problem Solving:** How you approach and solve the requirements~~

## Points clés de ma démarche

1. **Code Quality** - Architecture modulaire, séparation des responsabilités
2. **TypeScript** - Typage strict avec inférence, interfaces cohérentes
3. **Testing** - Distinction tests unitaires/fonctionnels, approche pragmatique
4. **Problem Solving** - Vision long-terme, scalabilité, maintenabilité
5. **Best Practices** - Hooks Git (Husky), ESLint, patterns modernes

## Réflexion finale

J'ai choisi de **sortir du cadre initial** pour démontrer :

- Ma capacité à **prendre du recul** sur un problème
- Mon approche **architecturale** d'un projet
- Ma **curiosité** et ma volonté d'apprendre en profondeur
- Ma vision d'un **code maintenable et scalable**

J'espère que cette approche, bien que potentiellement hors cadre, démontrera ma valeur ajoutée et ma façon de travailler sur des projets réels.

## Conclusion

J'ai réellement apprécié réaliser ce petit projet dans son intégralité. Il m'a permis d'appréhender différents concepts que je n'avais pas encore eu l'occasion d'explorer en profondeur : TanStack Query pour la gestion avancée des requêtes, Valtio pour un state management moderne, et la configuration complète d'une application multi-plateforme avec Capacitor.

Cette expérience m'a conforté dans mon approche d'apprentissage : prendre le temps de comprendre les fondamentaux plutôt que de simplement implémenter rapidement une solution fonctionnelle.

## ~~During the Interview (45-60 minutes)~~

~~1. Demo the working application~~
~~2. Explain your code and design decisions~~
~~3. Run the tests to show they pass~~
~~4. Discuss any challenges you encountered~~

---

**Note :** Ce README documente ma démarche personnelle et les choix techniques effectués. Le test initial reste disponible dans l'historique Git pour référence.

~~Good coding!~~ Bonne lecture ! 🚀
