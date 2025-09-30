import { useEffect } from "react";
import { NavLink } from "react-router-dom";

export default function Header({ theme, onToggle, onToggleMenu }) {
  // effet qui change la couleur de l’icône hamburger selon le thème choisi
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--hamburger-color", theme === "light" ? "#000" : "#fff");
  }, [theme]);

  return (
    <header className="header">
      <div className="header-inner">

        {/* Logo de l'application (CLAP!) */}
        <div className="brand">
          <span className="logo-left">CL</span>
          <span className="play"></span>
          <span className="logo-right">P!</span>
        </div>

        {/* Menu de navigation (s’affiche en version PC) */}
        <nav className="navbar">
          <NavLink 
            to="/" 
            className={({ isActive }) => (isActive ? "nav active" : "nav")}
          >
            Accueil
          </NavLink>
          <NavLink 
            to="/library" 
            className={({ isActive }) => (isActive ? "nav active" : "nav")}
          >
            Librairie
          </NavLink>
          <NavLink 
            to="/jeu" 
            className={({ isActive }) => (isActive ? "nav active" : "nav")}
          >
            Jeu
          </NavLink>
        </nav>

        {/* Zone à droite : changement de thème + hamburger */}
        <div className="header-actions">

          {/* Bouton pour basculer le thème (version mobile → icône) */}
          <button className="theme-btn-mobile" onClick={onToggle}>
            {theme === "light" ? "🌙" : "☀️"}
          </button>

          {/* Bouton pour basculer le thème (version PC → texte) */}
          <button className="theme-btn-pc" onClick={onToggle}>
            Thème {theme === "light" ? "sombre" : "clair"}
          </button>

          {/* Bouton hamburger (ouvre le menu latéral sur mobile) */}
          <button className="hamburger" onClick={onToggleMenu}>
            ☰
          </button>
        </div>
      </div>
    </header>
  );
}