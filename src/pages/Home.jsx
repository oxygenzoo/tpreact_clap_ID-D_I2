import { useEffect, useState } from "react"
import SearchBar from "../components/SearchBar.jsx"
import MovieGrid from "../components/MovieList.jsx"
import { searchMovies } from "../lib/omdb.js"
import { Link } from "react-router-dom"
import "../styles/index.css"

export default function Home() {
  const [query, setQuery] = useState({ q: "", type: "", year: "" })
  const [page, setPage] = useState(1)
  const [items, setItems] = useState([])
  const [total, setTotal] = useState(0)
  const [state, setState] = useState("idle")
  const [error, setError] = useState("")

  useEffect(() => {
    if (!query.q) return
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
    return () => { ignore = true }
  }, [query, page])

  const onSearch = ({ q, type, year }) => {
    console.log("🔍 Form submit →", { q, type, year })
    setQuery({ q, type, year })
    setPage(1)
  }

  const canMore = items.length < total

  return (
    <div className="container">

      {/* 🟡 Hero */}
      <section className="hero">
        <h1>
          Bienvenue sur <span className="highlight">Clap!</span>
        </h1>
        <p>
          Le site indispensable pour la gestion et la recherche d'informations cinématographiques.
        </p>
      </section>

      <section className="quiz-section">
        <p>
          Tu penses avoir une bonne culture cinématographique ?{" "}
          <Link to="/MovieQuiz" className="quiz-link">
            Viens la tester juste ici
          </Link>
        </p>
      </section>

      {/* 🟡 Recherche */}
      <section className="search-section">
        <h2>Cherche un film pour commencer !</h2>
        <SearchBar onSearch={onSearch} />

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

        <MovieGrid items={items} />

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

        <div className="results-count">
          {total ? `${items.length}/${total} résultats` : ""}
        </div>
      </section>
    </div>
  )
}
