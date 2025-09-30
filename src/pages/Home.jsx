import { useEffect, useState } from "react"
import SearchBar from "../components/SearchBar.jsx"
import MovieGrid from "../components/MovieList.jsx"
import { searchMovies } from "../lib/omdb.js"
import { Link } from "react-router-dom"
import "../styles/index.css"

export default function Home() {
  // état de la recherche (query contient le texte + filtres)
  const [query, setQuery] = useState({ q: "", type: "", year: "" })
  const [page, setPage] = useState(1)          // pagination
  const [items, setItems] = useState([])       // résultats affichés
  const [total, setTotal] = useState(0)        // total renvoyé par l'API
  const [state, setState] = useState("idle")   // idle, loading, error, done
  const [error, setError] = useState("")

  // déclenché à chaque fois que query ou page change
  useEffect(() => {
    if (!query.q) return // si pas de texte → ne lance pas la recherche
    let ignore = false
    async function run() {
      console.log("Appel API avec :", query, "page:", page)
      setState(page === 1 ? "loading" : "more")
      try {
        const res = await searchMovies({
          q: query.q,
          type: query.type,
          year: query.year,
          page,
        })
        if (ignore) return
        setTotal(res.total)
        // si page=1 → reset la liste, sinon concatène
        setItems(prev => (page === 1 ? res.items : [...prev, ...res.items]))
        setError(res.error || "")
        setState("done")
      } catch (e) {
        if (ignore) return
        setState("error")
        setError(e.message || "Erreur")
      }
    }
    run()
    return () => { ignore = true } // annule si composant démonté
  }, [query, page])

  // callback quand on soumet le formulaire de recherche
  const onSearch = ({ q, type, year }) => {
    console.log("Form submit →", { q, type, year })
    setQuery({ q, type, year }) // remet les filtres
    setPage(1) // revient à la première page
  }

  // bouton "charger plus" seulement si pas tout affiché
  const canMore = items.length < total

  return (
    <div className="container">

      {/* Section d’accueil avec titre + sous-titre */}
      <section className="hero">
        <h1>
          Bienvenue sur <span className="highlight">Clap!</span>
        </h1>
        <p>
          Le site indispensable pour la gestion et la recherche d'informations cinématographiques.
        </p>
      </section>

      {/* Lien vers le jeu */}
      <section className="quiz-section">
        <p>
          Tu penses avoir une bonne culture cinématographique ?{" "}
          <Link to="/jeu" className="quiz-link">
            Viens la tester juste ici
          </Link>
        </p>
      </section>

      {/* Bloc de recherche */}
      <section className="search-section">
        <h2>Cherche un film pour commencer !</h2>
        <SearchBar onSearch={onSearch} />

        {/* états possibles */}
        {state === "idle" && (
          <div className="center">
            <div className="alert">Tape un titre dans la barre de recherche.</div>
          </div>
        )}

        {state === "loading" && (
          <div className="center">
            <div className="alert">Chargement…</div>
          </div>
        )}
        {state === "error" && (
          <div className="center">
            <div className="alert">{error}</div>
          </div>
        )}
        {state !== "loading" && !items.length && query.q && (
          <div className="center">
            <div className="alert">Aucun film trouvé.</div>
          </div>
        )}

        {/* affichage des films */}
        <MovieGrid items={items} />

        {/* bouton pour charger la suite */}
        {canMore && state !== "loading" && (
          <div className="more-btn">
            <button
              className="btn btn-secondary"
              onClick={() => setPage(p => p + 1)}
            >
              Charger plus
            </button>
          </div>
        )}

        {/* compteur résultats */}
        <div className="results-count">
          {total ? `${items.length}/${total} résultats` : ""}
        </div>
      </section>
    </div>
  )
}
