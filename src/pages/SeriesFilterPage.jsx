import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/Series.css";

export default function SeriesFilterPage() {
  const API = "http://localhost:8585/series";

  const [series, setSeries] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [activeGenres, setActiveGenres] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const res = await axios.get(API);
        setSeries(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        setErrorMsg("Impossible de charger la liste des séries.");
      }
    };
    fetchSeries();
  }, []);

  const genres = [...new Set(series.map((s) => s.genre))];

  const addGenre = (genre) => {
    if (!activeGenres.includes(genre)) setActiveGenres([...activeGenres, genre]);
  };
  const removeGenre = (genre) => {
    setActiveGenres(activeGenres.filter((g) => g !== genre));
  };

  const filteredSeries = series.filter((serie) => {
    const matchSearch = serie.title?.toLowerCase().includes(searchName.toLowerCase());
    const matchGenres = activeGenres.length === 0 || activeGenres.includes(serie.genre);
    return matchSearch && matchGenres;
  });

  return (
    <div className="series-page">

      <header className="navbar">
        <div className="navbar-left">
          <h1 className="logo">Series</h1>
          <nav className="nav-links">
            <a href="/">Accueil</a>
            <a href="/series">Séries</a>
            <a href="/historique">Historique</a>
            <a href="/about">À propos</a>
          </nav>
        </div>
        <div className="navbar-right">
          <input
            type="text"
            placeholder="Rechercher..."
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="search-input"
          />
          <button className="search-btn">Recherche</button>
        </div>
      </header>

      <h2>Filtrer les séries</h2>

      <div className="genre-buttons mb-2">
        {genres.map((genre) => (
          <button
            key={genre}
            className="btn btn-outline-light me-2 mb-2"
            onClick={() => addGenre(genre)}
          >
            {genre}
          </button>
        ))}
      </div>

      <div className="active-genres mb-3">
        {activeGenres.map((genre) => (
          <span
            key={genre}
            className="badge bg-primary me-2 mb-2"
            style={{ cursor: "pointer" }}
            onClick={() => removeGenre(genre)}
          >
            {genre} ✕
          </span>
        ))}
      </div>

      {errorMsg && <p className="text-danger">{errorMsg}</p>}

      <div className="series-list">
        {filteredSeries.length > 0 ? (
          filteredSeries.map((serie) => (
            <div key={serie.id} className="serie-card">
              <h3>{serie.title}</h3>
              <p>Genre: {serie.genre}</p>
              <p>Nombre d'épisodes: {serie.nbEpisodes}</p>
              <p>Note: {serie.note}</p>
            </div>
          ))
        ) : (
          <p>Aucune série trouvée.</p>
        )}
      </div>
    </div>
  );
}
