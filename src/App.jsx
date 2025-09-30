import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./pages/Home.jsx";
import Details from "./pages/Details.jsx";
import Library from "./pages/Library.jsx";
import { LibraryProvider } from "./context/LibraryContext.jsx";
import MovieQuiz from "./components/MovieQuiz";
import Header from "./components/Header";

export default function App() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("clap-theme") || "light"
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("clap-theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));
  const toggleMenu = () => setMenuOpen((o) => !o);

  return (
    <LibraryProvider>
      <Header theme={theme} onToggle={toggleTheme} onToggleMenu={toggleMenu} />

      {/* Menu mobile overlay */}
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

      <main className="container">
        <Routes>
          <Route path="/" element={<Home onOpen={(id) => navigate(`/movie/${id}`)} />} />
          <Route path="/movie/:id" element={<Details onBack={() => navigate(-1)} />} />
          <Route path="/library" element={<Library onOpen={(id) => navigate(`/movie/${id}`)} />} />
          <Route path="/jeu" element={<MovieQuiz />} />
          <Route path="*" element={<Home />} /> {/* toujours en dernier */}
        </Routes>

      </main>

      <footer className="footer">
        Données par OMDb API · Projet Clap!
      </footer>
    </LibraryProvider>
  );
}
