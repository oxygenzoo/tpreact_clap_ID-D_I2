import React, { useState, useEffect } from "react";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

export default function MovieQuiz() {
  const [movie, setMovie] = useState(null);
  const [guess, setGuess] = useState("");
  const [score, setScore] = useState(0);
  const [blur, setBlur] = useState(15); // niveau de flou initial
  const [feedback, setFeedback] = useState("");

  // Charger un film/série aléatoire
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

      const random =
        randomTitles[Math.floor(Math.random() * randomTitles.length)];
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&t=${encodeURIComponent(
          random
        )}`
      );
      const data = await res.json();
      if (data.Response === "True") {
        setMovie(data);
        setBlur(15);
        setFeedback("");
        setGuess("");
      }
    } catch (error) {
      console.error("Erreur API OMDB :", error);
    }
  };

  useEffect(() => {
    fetchRandomMovie();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!movie) return;

    if (guess.trim().toLowerCase() === movie.Title.toLowerCase()) {
      setScore(score + 1);
      setFeedback("Bravo, c'était bien " + movie.Title + " !");
      setTimeout(() => fetchRandomMovie(), 1500);
    } else {
      setFeedback("Mauvaise réponse !");
      setBlur((prev) => Math.max(prev - 5, 0)); // réduire le flou
    }
  };

  return (
    <div className="quiz-container">
      <h2>Devine l'affiche</h2>

      {movie && (
        <div className="poster-container">
          <img
            src={movie.Poster}
            alt="Movie Poster"
            style={{ filter: `blur(${blur}px)` }}
          />
        </div>
      )}

      <form onSubmit={handleSubmit} className="quiz-form">
        <input
          type="text"
          placeholder="Écris le titre..."
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
        />
        <button type="submit">Valider</button>
      </form>

      <p className="feedback">{feedback}</p>
      <p>Score : {score}</p>
    </div>
  );
}
