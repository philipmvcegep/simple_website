import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/Series.css";
import breaking from "../assets/images/breaking.jpg";
import family from "../assets/images/family.jpg";
import dark from "../assets/images/dark.jpg";
import super2 from "../assets/images/super2.jpg";
import breakingpoint from "../assets/images/breakingpoint.jpg";
import family1 from "../assets/images/family1.jpg";
import hah from "../assets/images/hah.jpg";
import hs from "../assets/images/hs.jpg";
import superaction from "../assets/images/superaction.jpg";

export default function SeriesFilterPage() {
  const API = "http://localhost:8585/series";

  const [series, setSeries] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [activeGenres, setActiveGenres] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  const imagesMap = {
    "Breaking Bad": breaking,
    "hah": hah,
    "Family Secrets": family,
    "Dark": dark,
    "Action Super 2": super2,
    "Breaking Point": breakingpoint,
    "Family": family1,
    "High School": hs,
    "Super Action": superaction,
  };

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
    <div className="series-page-container">
      <header className="navbar">
        <div className="navbar-left">
          <h1 className="logo" style={{ color: 'red' }}>Series</h1>
          <nav className="nav-links">
            <a href="/">Accueil</a>
            <a href="/series">Séries</a>
            <a href="/historique">Historique</a>
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
        </div>
      </header>

      <div className="filter-layout">
        <aside className="filters">
          <h3 style={{ color: 'red' }}>Filtres de recherche</h3>
          <div className="genre-buttons">
            {genres.map((genre) => (
              <button
                key={genre}
                className="btn-genre"
                onClick={() => addGenre(genre)}
              >
                {genre}
              </button>
            ))}
          </div>
          <div className="active-genres">
            {activeGenres.map((genre) => (
              <span 
                key={genre}
                className="badge"
                onClick={() => removeGenre(genre)}
              >
                {genre} ✕
              </span>
            ))}
          </div>
        </aside>

        <main className="series-list">
          {errorMsg && <p className="text-danger">{errorMsg}</p>}
          {filteredSeries.length > 0 ? (
            filteredSeries.map((serie) => (
              <div key={serie.id} className="serie-card">
                <div className="poster">
                  <img 
                    src={imagesMap[serie.title]} 
                    alt={serie.title} 
                  />
                </div>
                <div className="info">
                  <h3 style={{ color: 'red' }}>{serie.title}</h3>
                  <p><strong>Genre:</strong> {serie.genre}</p>
                  <p><strong>Épisodes:</strong> {serie.nbEpisodes}</p>
                  <p><strong>Note:</strong> {serie.note}</p>
                  <p>{serie.description}</p>
                </div>
              </div>
            ))
          ) : (
            <p>Aucune série trouvée.</p>
          )}
        </main>
      </div>

    
    </div>
  );
}
