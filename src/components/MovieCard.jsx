import { useLibrary } from "../context/LibraryContext";

export default function MovieCard({ movie, onBack }) {
  const { isFav, toggleFav, isSeen, toggleSeen } = useLibrary();

  return (
    <div className="movie-card">
      {/* Poster à gauche */}
      <div className="movie-poster">
        <img src={movie.Poster} alt={movie.Title} />
      </div>

      {/* Détails à droite */}
      <div className="movie-details">
        {/* Titre + actions */}
        <div className="movie-header">
          <h1>
            {movie.Title} <span>({movie.Year})</span>
          </h1>
          <div className="movie-actions">
            <button
              className={isFav(movie.uid) ? "btn favorited" : "btn"}
              onClick={() => toggleFav(movie)}
            >
              ★ Favori
            </button>
            <button
              className={isSeen(movie.uid) ? "btn seen" : "btn"}
              onClick={() => toggleSeen(movie)}
            >
              👁 Vu
            </button>
            {onBack && (
              <button className="btn back" onClick={onBack}>
                ← Retour
              </button>
            )}
          </div>
        </div>

        {/* Notes */}
        <div className="movie-ratings">
          <span className="badge">⭐ IMDb: {movie.imdbRating}</span>
          <span className="badge">🎯 Metascore: {movie.Metascore}</span>
        </div>

        {/* Plot */}
        <p className="movie-plot">{movie.Plot}</p>

        {/* Infos */}
        <ul className="movie-info">
          <li><strong>Réalisateur :</strong> {movie.Director}</li>
          <li><strong>Auteurs :</strong> {movie.Writer}</li>
          <li><strong>Acteurs :</strong> {movie.Actors}</li>
          <li><strong>Pays :</strong> {movie.Country}</li>
          <li><strong>Langue :</strong> {movie.Language}</li>
          <li><strong>Date de sortie :</strong> {movie.Released}</li>
          <li><strong>Box Office :</strong> {movie.BoxOffice}</li>
        </ul>
      </div>
    </div>
  );
}
