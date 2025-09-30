import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./pages/Home.jsx";
import Details from "./pages/Details.jsx";
import Library from "./pages/Library.jsx";
import { LibraryProvider } from "./context/LibraryContext.jsx";
import MovieQuiz from "./components/MovieQuiz";
import Header from "./components/Header";

export default function App() {
  // état pour gérer le thème (light/dark), sauvegardé en localStorage
  const [theme, setTheme] = useState(
    () => localStorage.getItem("clap-theme") || "light"
  );

  // état qui gère l'ouverture du menu mobile (hamburger)
  const [menuOpen, setMenuOpen] = useState(false);

  // hook pour naviguer entre les routes
  const navigate = useNavigate();

  // applique le thème choisi dans l'attribut data-theme du <html>
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("clap-theme", theme);
  }, [theme]);

  // change le thème light <-> dark
  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  // ouvre/ferme le menu mobile
  const toggleMenu = () => setMenuOpen((o) => !o);

  return (
    <LibraryProvider>
      {/* en-tête commun à toutes les pages */}
      <Header theme={theme} onToggle={toggleTheme} onToggleMenu={toggleMenu} />

      {/* overlay pour menu mobile, affiché uniquement si menuOpen=true */}
      {menuOpen && (
        <div className="mobile-overlay">
          <button className="close-btn" onClick={toggleMenu}>
            ✖
          </button>
          <nav className="mobile-nav">
            <a href="/" className="mobile-link" onClick={toggleMenu}>
              Accueil
            </a>
            <a href="/library" className="mobile-link" onClick={toggleMenu}>
              Librairie
            </a>
            <a href="/jeu" className="mobile-link" onClick={toggleMenu}>
              Jeu
            </a>
          </nav>
        </div>
      )}

      {/* routes principales de l'application */}
      <main className="container">
        <Routes>
          {/* page d’accueil avec recherche de films */}
          <Route
            path="/"
            element={<Home onOpen={(id) => navigate(`/movie/${id}`)} />}
          />
          {/* page détails d’un film (onBack = revenir en arrière) */}
          <Route
            path="/movie/:id"
            element={<Details onBack={() => navigate(-1)} />}
          />
          {/* page librairie (favoris + vus) */}
          <Route
            path="/library"
            element={<Library onOpen={(id) => navigate(`/movie/${id}`)} />}
          />
          {/* page du quiz */}
          <Route path="/jeu" element={<MovieQuiz />} />
          {/* fallback : si route inconnue → redirige sur Home */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      {/* footer fixe, commun à toutes les pages */}
      <footer className="footer">
        Données par OMDb API · Projet Clap!
      </footer>
    </LibraryProvider>
  );
}
