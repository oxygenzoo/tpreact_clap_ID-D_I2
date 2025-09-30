import { createContext, useContext, useEffect, useMemo, useState } from "react"

const LibraryContext = createContext(null)

export function LibraryProvider({children}) {
  const [favorites, setFavorites] = useState(()=>JSON.parse(localStorage.getItem("clap-favorites")||"[]"))
  const [seen, setSeen] = useState(()=>JSON.parse(localStorage.getItem("clap-seen")||"[]"))

  useEffect(()=>localStorage.setItem("clap-favorites", JSON.stringify(favorites)),[favorites])
  useEffect(()=>localStorage.setItem("clap-seen", JSON.stringify(seen)),[seen])

  const uid = (m)=>m.imdbID || m.uid
  const isFav = (id)=>favorites.some(m=>uid(m)===id)
  const isSeen = (id)=>seen.some(m=>uid(m)===id)
  const toggleFav = (movie)=>setFavorites(list=>{
    const id = uid(movie); return list.some(m=>uid(m)===id) ? list.filter(m=>uid(m)!==id) : [{...movie, uid:id}, ...list]
  })
  const toggleSeen = (movie)=>setSeen(list=>{
    const id = uid(movie); return list.some(m=>uid(m)===id) ? list.filter(m=>uid(m)!==id) : [{...movie, uid:id}, ...list]
  })

  const value = useMemo(()=>({favorites,seen,isFav,isSeen,toggleFav,toggleSeen}),[favorites,seen])
  return <LibraryContext.Provider value={value}>{children}</LibraryContext.Provider>
}

export const useLibrary = ()=>useContext(LibraryContext)
