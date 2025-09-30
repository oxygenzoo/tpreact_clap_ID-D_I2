import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "./App.jsx"
import "./styles/tokens.css"
import "./styles/index.css"

// Point d'entrée principal de l'application React
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* BrowserRouter gère la navigation (URLs propres sans #) */}
    <BrowserRouter>
      {/* App contient toutes les routes et la logique globale */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
)