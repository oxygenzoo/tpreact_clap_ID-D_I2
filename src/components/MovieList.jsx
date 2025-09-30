import { Link } from "react-router-dom";

export default function MovieGrid({ items }) {
  if (!items?.length) return null;

  return (
    <div className="grid" style={{ marginTop: 16 }}>
      {items.map((m, idx) => {
        const poster =
          m.Poster && m.Poster !== "N/A"
            ? m.Poster
            : "https://placehold.co/300x450?text=No+Poster"; // ✅ corrige placeholder cassé

        return (
          <Link
            key={`${m.imdbID}-${idx}`} // ✅ clé unique pour éviter warning React
            to={`/movie/${m.imdbID}`}
            className="card"
          >
            <img className="poster" src={poster} alt={m.Title} />
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
