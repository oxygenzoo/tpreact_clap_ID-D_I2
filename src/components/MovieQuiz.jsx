import React, { useState, useEffect } from "react";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

export default function MovieQuiz() {
  // état du film courant
  const [movie, setMovie] = useState(null);
  // réponse de l'utilisateur
  const [guess, setGuess] = useState("");
  // score cumulé
  const [score, setScore] = useState(0);
  // flou appliqué à l'affiche
  const [blur, setBlur] = useState(15);
  // retour affiché après tentative
  const [feedback, setFeedback] = useState("");

  // fonction pour récupérer un film/série aléatoire dans une liste fixe
  const fetchRandomMovie = async () => {
    try {
      const randomTitles = [
        "The Godfather",
        "Pulp Fiction",
        "Fight Club",
        "The Matrix",
        "Star Wars",
        "Blade Runner",
        "Forrest Gump",
        "A Clockwork Orange",
        "The Shawshank Redemption",
        "Back to the Future",
        "Friends",
        "Breaking Bad",
        "Game of Thrones",
        "Twin Peaks",
        "Lost",
        "Stranger Things",
        "Snowfall",
        "The Simpsons",
        "The Wire",
        "Sherlock"
      ];

      // on choisit un titre au hasard
      const random = randomTitles[Math.floor(Math.random() * randomTitles.length)];
      // appel API OMDb pour récupérer les infos
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&t=${encodeURIComponent(random)}`
      );
      const data = await res.json();

      // si l'API répond correctement, on met à jour l'état du jeu
      if (data.Response === "True") {
        setMovie(data);
        setBlur(15); // on remet le flou au max
        setFeedback(""); // on efface le message précédent
        setGuess(""); // on vide le champ texte
      }
    } catch (error) {
      console.error("Erreur API OMDB :", error);
    }
  };

  // au premier rendu -> on lance une première affiche
  useEffect(() => {
    fetchRandomMovie();
  }, []);

  // gestion de la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!movie) return;

    // bonne réponse -> on augmente le score et on recharge un nouveau film après délai
    if (guess.trim().toLowerCase() === movie.Title.toLowerCase()) {
      setScore(score + 1);
      setFeedback("Bravo, c'était bien " + movie.Title + " !");
      setTimeout(() => fetchRandomMovie(), 1500);
    } else {
      // mauvaise réponse -> on réduit le flou (indice visuel)
      setFeedback("Mauvaise réponse !");
      setBlur((prev) => Math.max(prev - 5, 0));
    }
  };

  return (
    <div className="quiz-container">
      <h2>Devine l'affiche</h2>

      {/* affiche floutée */}
      {movie && (
        <div className="poster-container">
          <img
            src={movie.Poster}
            alt="Movie Poster"
            style={{ filter: `blur(${blur}px)` }}
          />
        </div>
      )}

      {/* champ texte + bouton valider */}
      <form onSubmit={handleSubmit} className="quiz-form">
        <input
          type="text"
          placeholder="Écris le titre..."
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
        />
        <button type="submit">Valider</button>
      </form>

      {/* retour utilisateur + score */}
      <p className="feedback">{feedback}</p>
      <p>Score : {score}</p>
    </div>
  );
}
