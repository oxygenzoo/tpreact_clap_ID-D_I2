import { useState, useEffect } from "react"

// Hook custom pour synchroniser un state avec localStorage
export function useLocalStorage(key, initialValue) {
  // au montage → essayer de lire dans localStorage, sinon valeur par défaut
  const [value, setValue] = useState(() => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch {
      return initialValue // si erreur (ex: JSON cassé), on revient au default
    }
  })

  // à chaque changement de `value` ou `key` → on sauvegarde dans localStorage
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // si erreur (quota dépassé, etc.) → on ignore
    }
  }, [key, value])

  // retourne un tableau comme useState
  return [value, setValue]
}
