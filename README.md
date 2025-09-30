# Clap! – Projet React

Clap! est une application web permettant de rechercher des films et séries via l’API publique OMDb, d’afficher leurs détails et de gérer une petite librairie personnelle (favoris et vus).  
Elle propose également un mini-jeu pour tester sa culture cinématographique.

---

## Fonctionnalités

- Recherche de films et séries par titre  
- Affichage des résultats (poster, titre, année)  
- Page de détails avec synopsis, note IMDb, Metascore, année, pays, etc.  
- Librairie personnelle :
  - Ajouter/retirer des films en favoris
  - Ajouter/retirer des films dans les vus
  - Données sauvegardées dans `localStorage`
- Mini-jeu "Devine l'affiche" avec score  
- Mode clair/sombre  
- Pagination avec bouton "Charger plus"  
- Filtres avancés : type (film/série/épisode) et année (1950–2025)  

---

## Technologies utilisées

- [React](https://reactjs.org/) (Hooks, React Router)  
- [OMDb API](https://www.omdbapi.com/) pour les données films/séries  
- Context API (`useContext`) pour la gestion des favoris et vus  
- CSS pur (fichiers `tokens.css` et `index.css`) pour le style et la responsivité  
- Déploiement sur [Vercel](https://vercel.com/)  

---

## Installation et lancement

### 1. Cloner le projet  

git clone https://github.com/oxygenzoo/tpreact_clap_ID-D_I2.git
cd tpreact_clap_ID-D_I2

### 2. Installer les dépendances

npm install

### 3. Ajouter la clé API
Créer un fichier .env à la racine du projet :

VITE_OMDB_API_KEY=VOTRE_CLE_API

Un fichier .env.example est fourni comme modèle.

### 4. Lancer le projet en mode développement

npm run dev

### 5. Accéder à l’application
http://localhost:5173

## Structure du projet
src/
 ├── assets/               # Images et ressources
 ├── components/           # Composants réutilisables (Header, SearchBar, MovieList, MovieQuiz…)
 ├── context/              # Context global (LibraryContext)
 ├── hooks/                # Hooks personnalisés (ex: useLocalStorage)
 ├── lib/                  # Fonctions utilitaires (API OMDb)
 ├── pages/                # Pages principales (Home, Details, Library)
 ├── styles/               # Fichiers CSS (index.css, tokens.css)
 ├── App.jsx               # Point central avec les routes
 └── main.jsx              # Point d’entrée React

## Déploiement sur Vercel
Pousser le projet sur GitHub.
Connecter le dépôt à Vercel.
Dans Project Settings > Environment Variables, ajouter :

VITE_OMDB_API_KEY=VOTRE_CLE_API

L’application sera accessible via une URL fournie par Vercel. 

## Auteur
Guignabert Enzo
Projet réalisé dans le cadre d’un TP React.
Données fournies par OMDb API.
