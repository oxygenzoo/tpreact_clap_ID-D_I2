import React, { useState } from "react";

export default function SearchBar({ onSearch }) {
  // état pour le champ texte
  const [q, setQ] = useState("")
  // état pour le filtre type (films/séries/episodes)
  const [type, setType] = useState("")
  // état pour le filtre année
  const [year, setYear] = useState("")

  // envoi du formulaire
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!q.trim()) return // éviter requêtes vides
    console.log("🔍 Form submit →", { q, type, year })
    onSearch?.({ q: q.trim(), type, year }) // callback vers parent
  }

  // tableau des années (de 2025 à 1950)
  const years = []
  for (let y = 2025; y >= 1950; y--) {
    years.push(y)
  }

  return (
    <form className="searchbar" onSubmit={handleSubmit}>
      {/* champ texte */}
      <input
        type="text"
        placeholder="Rechercher..."
        className="search-input"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        aria-label="Champ de recherche"
      />

      {/* filtres supplémentaires */}
      <div className="search-filters">
        {/* choix du type */}
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

        {/* choix de l'année */}
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

      {/* bouton de validation */}
      <button type="submit" className="search-btn">
        Rechercher
      </button>
    </form>
  )
}
