import { createContext, useContext, useEffect, useMemo, useState } from "react"

const LibraryContext = createContext(null)

export function LibraryProvider({children}) {
  // favoris stockés en localStorage
  const [favorites, setFavorites] = useState(
    () => JSON.parse(localStorage.getItem("clap-favorites") || "[]")
  )
  // films vus stockés en localStorage
  const [seen, setSeen] = useState(
    () => JSON.parse(localStorage.getItem("clap-seen") || "[]")
  )

  // mettre à jour localStorage si favoris changent
  useEffect(() => {
    localStorage.setItem("clap-favorites", JSON.stringify(favorites))
  }, [favorites])

  // mettre à jour localStorage si vus changent
  useEffect(() => {
    localStorage.setItem("clap-seen", JSON.stringify(seen))
  }, [seen])

  // fonction pour identifier un film (utilise imdbID ou uid interne)
  const uid = (m) => m.imdbID || m.uid

  // vérifier si un film est dans favoris
  const isFav = (id) => favorites.some(m => uid(m) === id)

  // vérifier si un film est dans vus
  const isSeen = (id) => seen.some(m => uid(m) === id)

  // ajout / suppression dans favoris
  const toggleFav = (movie) => setFavorites(list => {
    const id = uid(movie)
    return list.some(m => uid(m) === id)
      ? list.filter(m => uid(m) !== id) // déjà dedans → on retire
      : [{ ...movie, uid:id }, ...list] // sinon on ajoute
  })

  // ajout / suppression dans vus
  const toggleSeen = (movie) => setSeen(list => {
    const id = uid(movie)
    return list.some(m => uid(m) === id)
      ? list.filter(m => uid(m) !== id)
      : [{ ...movie, uid:id }, ...list]
  })

  // valeur fournie au context (accessible partout via useLibrary)
  const value = useMemo(() => (
    { favorites, seen, isFav, isSeen, toggleFav, toggleSeen }
  ), [favorites, seen])

  return (
    <LibraryContext.Provider value={value}>
      {children}
    </LibraryContext.Provider>
  )
}

// hook custom pour récupérer les infos de la librairie
export const useLibrary = () => useContext(LibraryContext)
