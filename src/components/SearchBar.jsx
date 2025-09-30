import React, { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [q, setQ] = useState("");
  const [type, setType] = useState(""); // "" = pas de filtre
  const [year, setYear] = useState(""); // "" = pas de filtre

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!q.trim()) return;
    console.log("🔍 Form submit →", { q, type, year });
    onSearch?.({ q: q.trim(), type, year });
  };

  // Génération des années de 2025 à 1950
  const years = [];
  for (let y = 2025; y >= 1950; y--) {
    years.push(y);
  }

  return (
    <form className="searchbar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Rechercher..."
        className="search-input"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        aria-label="Champ de recherche"
      />

      <div className="search-filters">
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          aria-label="Filtre type"
        >
          <option value="">Tous</option>
          <option value="movie">Films</option>
          <option value="series">Séries</option>
          <option value="episode">Episodes</option>
        </select>

        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          aria-label="Filtre année"
        >
          <option value="">Date</option>
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" className="search-btn">
        Rechercher
      </button>
    </form>
  );
}
