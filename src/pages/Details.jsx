import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchDetails } from "../lib/omdb.js";
import { useLibrary } from "../context/LibraryContext.jsx";

export default function Details({ onBack }) {
  // récupère l'ID du film depuis l'URL
  const { id } = useParams();

  // data = infos du film, state = état de chargement, error = message d'erreur
  const [data, setData] = useState(null);
  const [state, setState] = useState("loading");
  const [error, setError] = useState("");

  // fonctions/favoris provenant du context (localStorage)
  const { isFav, toggleFav, isSeen, toggleSeen } = useLibrary();

  // au montage (ou si id change) → charger les détails du film
  useEffect(() => {
    let ignore = false;
    async function run() {
      setState("loading");
      try {
        const d = await fetchDetails(id);
        if (ignore) return;
        setData(d);
        setState("done");
      } catch (e) {
        if (ignore) return;
        setError(e.message || "Erreur");
        setState("error");
      }
    }
    run();
    return () => {
      // permet d'ignorer la réponse si le composant est démonté
      ignore = true;
    };
  }, [id]);

  // affichage selon état (chargement/erreur)
  if (state === "loading")
    return (
      <div className="center">
        <div className="alert">Chargement…</div>
      </div>
    );
  if (state === "error")
    return (
      <div className="center">
        <div className="alert">{error}</div>
      </div>
    );
  if (!data) return null;

  // si pas de poster → afficher un placeholder
  const poster =
    data.Poster && data.Poster !== "N/A"
      ? data.Poster
      : "https://placehold.co/300x450?text=No+Poster";

  return (
    <div>
      {/* bouton retour */}
      <div className="backline">
        <button className="btn btn-secondary" onClick={onBack}>
          ← Retour
        </button>
      </div>

      <div className="detail">
        {/* affichage du poster */}
        <div className="detail-left">
          <img src={poster} alt={data.Title} />
        </div>

        {/* partie texte à droite */}
        <div className="detail-right">
          <div className="detail-title">
            <h1>
              {data.Title}{" "}
              <span style={{ color: "var(--muted)", fontSize: 18 }}>
                ({data.Year})
              </span>
            </h1>

            {/* actions → ajouter aux vus / favoris */}
            <div className="actions">
              <button
                className={
                  isSeen(data.imdbID) ? "btn btn-primary" : "btn btn-secondary"
                }
                onClick={() => toggleSeen({ ...data, uid: data.imdbID })}
              >
                {isSeen(data.imdbID) ? "Dans les vus" : "Ajouter aux vus"}
              </button>
              <button
                className={
                  isFav(data.imdbID) ? "btn btn-primary" : "btn btn-secondary"
                }
                onClick={() => toggleFav({ ...data, uid: data.imdbID })}
              >
                {isFav(data.imdbID)
                  ? "Dans les favoris"
                  : "Ajouter aux favoris"}
              </button>
            </div>
          </div>

          {/* notes */}
          <div className="badges">
            <div className="badge">IMDb {data.imdbRating || "N/A"}</div>
            <div className="badge">Metascore {data.Metascore || "N/A"}</div>
          </div>

          {/* résumé */}
          <div className="plot">{data.Plot}</div>

          {/* autres infos */}
          <ul className="list">
            <li>
              <strong>Réalisateur</strong>: {data.Director}
            </li>
            <li>
              <strong>Auteurs</strong>: {data.Writer}
            </li>
            <li>
              <strong>Acteurs</strong>: {data.Actors}
            </li>
            <li>
              <strong>Pays</strong>: {data.Country}
            </li>
            <li>
              <strong>Langue</strong>: {data.Language}
            </li>
            <li>
              <strong>Date de sortie</strong>: {data.Released}
            </li>
            <li>
              <strong>Box Office</strong>: {data.BoxOffice || "N/A"}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
