const API_KEY = import.meta.env.VITE_OMDB_API_KEY

if (!API_KEY) {
  console.error("[OMDb] Clé API manquante → ajouter VITE_OMDB_API_KEY=xxx dans .env")
}

// Fonction pour chercher une liste de films/séries via OMDb
export async function searchMovies({ q, type = "", year = "", page = 1 }) {
  // si pas de mot-clé → pas d’appel API
  if (!q || !q.trim()) {
    return { items: [], total: 0, error: "" }
  }

  // construction des paramètres de la requête
  const params = new URLSearchParams()
  params.set("apikey", API_KEY)
  params.set("s", q.trim()) // "s" = search dans OMDb
  if (type) params.set("type", type) // filtre type (film, série…)
  if (year) params.set("y", year)    // filtre année
  params.set("page", page)           // pagination (10 résultats max/page)

  const url = `https://www.omdbapi.com/?${params.toString()}`
  const res = await fetch(url)
  const data = await res.json()

  // si OMDb renvoie une erreur → on gère proprement
  if (data.Response === "False") {
    return { items: [], total: 0, error: data.Error }
  }

  // sinon → on renvoie résultats + nombre total
  return {
    items: data.Search || [],
    total: parseInt(data.totalResults || "0", 10),
    error: "",
  }
}

// Fonction pour récupérer les détails complets d’un film/série
export async function fetchDetails(id) {
  if (!id) throw new Error("Missing IMDb ID")

  const params = new URLSearchParams()
  params.set("apikey", API_KEY)
  params.set("i", id)        // "i" = id IMDb
  params.set("plot", "full") // résumé complet

  const url = `https://www.omdbapi.com/?${params.toString()}`
  const res = await fetch(url)
  const data = await res.json()

  // gestion des erreurs
  if (data.Response === "False") {
    throw new Error(data.Error || "Film introuvable")
  }

  return data // renvoie l’objet complet (titre, acteurs, etc.)
}