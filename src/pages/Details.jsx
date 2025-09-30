import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchDetails } from "../lib/omdb.js";
import { useLibrary } from "../context/LibraryContext.jsx";

export default function Details({ onBack }) {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [state, setState] = useState("loading");
  const [error, setError] = useState("");
  const { isFav, toggleFav, isSeen, toggleSeen } = useLibrary();

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
      ignore = true;
    };
  }, [id]);

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

  const poster =
    data.Poster && data.Poster !== "N/A"
      ? data.Poster
      : "https://placehold.co/300x450?text=No+Poster"; // ✅ corrige placeholder

  return (
    <div>
      <div className="backline">
        <button className="btn btn-secondary" onClick={onBack}>
          ← Retour
        </button>
      </div>

      <div className="detail">
        <div className="detail-left">
          <img src={poster} alt={data.Title} />
        </div>

        <div className="detail-right">
          <div className="detail-title">
            <h1>
              {data.Title}{" "}
              <span style={{ color: "var(--muted)", fontSize: 18 }}>
                ({data.Year})
              </span>
            </h1>
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

          <div className="badges">
            <div className="badge">IMDb {data.imdbRating || "N/A"}</div>
            <div className="badge">Metascore {data.Metascore || "N/A"}</div>
          </div>

          <div className="plot">{data.Plot}</div>

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
