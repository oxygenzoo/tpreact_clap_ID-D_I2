const API_KEY = import.meta.env.VITE_OMDB_API_KEY; // ⚠️ garde ce nom exact dans ton .env

if (!API_KEY) {
  console.error("[OMDb] ❌ Clé API manquante. Ajoute VITE_OMDB_API_KEY=xxx dans ton .env");
}

// 🔍 Recherche de films/séries
export async function searchMovies({ q, type = "", year = "", page = 1 }) {
  if (!q || !q.trim()) {
    console.warn("[OMDb] Recherche ignorée car q est vide");
    return { items: [], total: 0, error: "" };
  }

  const params = new URLSearchParams();
  params.set("apikey", API_KEY);
  params.set("s", q.trim());
  if (type) params.set("type", type);
  if (year) params.set("y", year);
  params.set("page", page);

  const url = `https://www.omdbapi.com/?${params.toString()}`;
  console.log("🌍 Appel API searchMovies →", url);

  const res = await fetch(url);
  const data = await res.json();
  console.log("📩 Réponse OMDb searchMovies →", data);

  if (data.Response === "False") {
    return { items: [], total: 0, error: data.Error };
  }

  return {
    items: data.Search || [],
    total: parseInt(data.totalResults || "0", 10),
    error: "",
  };
}

// 🎬 Détails d’un film
export async function fetchDetails(id) {
  if (!id) throw new Error("Missing IMDb ID");
  const params = new URLSearchParams();
  params.set("apikey", API_KEY);
  params.set("i", id);
  params.set("plot", "full");

  const url = `https://www.omdbapi.com/?${params.toString()}`;
  console.log("🌍 Appel API fetchDetails →", url);

  const res = await fetch(url);
  const data = await res.json();
  console.log("📩 Réponse OMDb fetchDetails →", data);

  if (data.Response === "False") {
    throw new Error(data.Error || "Film introuvable");
  }

  return data;
}
