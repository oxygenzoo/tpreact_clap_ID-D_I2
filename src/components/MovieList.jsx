import { Link } from "react-router-dom";

export default function MovieGrid({ items }) {
  // si aucun film à afficher -> rien ne s'affiche
  if (!items?.length) return null;

  return (
    <div className="grid" style={{ marginTop: 16 }}>
      {items.map((m, idx) => {
        // gestion du poster (si pas dispo -> image de remplacement)
        const poster =
          m.Poster && m.Poster !== "N/A"
            ? m.Poster
            : "https://placehold.co/300x450?text=No+Poster";

        return (
          // chaque film est cliquable et mène à la page de détails
          <Link
            key={`${m.imdbID}-${idx}`} // clé unique obligatoire en React
            to={`/movie/${m.imdbID}`}
            className="card"
          >
            {/* affiche le poster */}
            <img className="poster" src={poster} alt={m.Title} />

            {/* infos sous l’image : titre + année */}
            <div className="movie-info">
              <div className="movie-title">{m.Title}</div>
              <div className="movie-meta">{m.Year}</div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
