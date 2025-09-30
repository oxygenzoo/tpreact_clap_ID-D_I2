import { useLibrary } from "../context/LibraryContext.jsx"
import { Link } from "react-router-dom"

export default function Library({ onOpen }) {
  // récupération des films stockés dans le contexte (favoris + vus)
  const { favorites, seen } = useLibrary()

  // composant interne pour afficher une carte film
  const Card = ({ m }) => (
    <div className="card">
      <img
        className="poster"
        src={m.Poster !== "N/A" ? m.Poster : "https://via.placeholder.com/300x450?text=No+Poster"}
        alt={m.Title}
      />
      <div className="movie-info">
        <div className="movie-title">{m.Title}</div>
        <div className="movie-meta">{m.Year}</div>
        {/* bouton qui appelle onOpen pour afficher les détails */}
        <button className="btn btn-secondary" onClick={() => onOpen(m.imdbID)}>
          Ouvrir
        </button>
      </div>
    </div>
  )

  return (
    <div>
      {/* retour à la page d’accueil */}
      <div style={{ marginTop: 16 }}>
        <Link to="/" className="btn btn-secondary">← Retour</Link>
      </div>

      <h2>Librairie</h2>

      {/* section favoris */}
      <h3>Favoris</h3>
      {!favorites.length && <div className="alert">Aucun favori.</div>}
      <div className="grid" style={{ marginBottom: 24 }}>
        {favorites.map(m => <Card key={m.uid} m={m} />)}
      </div>

      {/* section vus */}
      <h3>Vus</h3>
      {!seen.length && <div className="alert">Aucun élément vu.</div>}
      <div className="grid">
        {seen.map(m => <Card key={m.uid} m={m} />)}
      </div>

      {/* petit message d’aide */}
      <div style={{ marginTop: 12, color: "var(--muted)" }}>
        Astuce: clique sur un élément pour afficher les détails.
      </div>
    </div>
  )
}
