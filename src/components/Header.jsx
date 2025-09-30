import { useEffect } from "react";
import { NavLink } from "react-router-dom";

export default function Header({ theme, onToggle, onToggleMenu }) {
  useEffect(() => {
    // mettre à jour la couleur du hamburger selon le thème
    const root = document.documentElement;
    root.style.setProperty("--hamburger-color", theme === "light" ? "#000" : "#fff");
  }, [theme]);

  return (
    <header className="header">
      <div className="header-inner">
        {/* Logo */}
        <div className="brand">
          <span className="logo-left">CL</span>
          <span className="play"></span>
          <span className="logo-right">P!</span>
        </div>

        {/* Navbar affichée seulement en PC */}
        <nav className="navbar">
          <NavLink to="/" className={({ isActive }) => (isActive ? "nav active" : "nav")}>
            Accueil
          </NavLink>
          <NavLink to="/library" className={({ isActive }) => (isActive ? "nav active" : "nav")}>
            Librairie
          </NavLink>
          <NavLink to="/jeu" className={({ isActive }) => (isActive ? "nav active" : "nav")}>
            Jeu
          </NavLink>
        </nav>

        {/* Actions à droite */}
        <div className="header-actions">
          {/* Thème mobile (icône) */}
          <button className="theme-btn-mobile" onClick={onToggle}>
            {theme === "light" ? "🌙" : "☀️"}
          </button>

          {/* Thème PC (texte) */}
          <button className="theme-btn-pc" onClick={onToggle}>
            Thème {theme === "light" ? "sombre" : "clair"}
          </button>

          {/* Hamburger */}
          <button className="hamburger" onClick={onToggleMenu}>
            ☰
          </button>
        </div>
      </div>
    </header>
  );
}
