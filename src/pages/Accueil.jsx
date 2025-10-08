import "../css/Accueil.css";
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { filmsPopulaires, seriesSuspense, comedies } from "../data/data";
import { Link } from "react-router-dom";

import breaking from "../assets/images/breaking.jpg";

export default function Accueil() {
  useEffect(() => {
    const name = localStorage.getItem("name");
    if (name) {
      alert(`Bienvenue ${name} !`);
      localStorage.removeItem("name");
    }
  })
  const [isOpenVideo, setIsOpenVide] = useState(false);

  // Composant Accueil avec navigation, sections de contenu et  vidéo
  return (
    <div className="accueil-container">
      <header className="navbar">
        <div className="navbar-left">
          <h1 style={{ color: 'red' }} className="logo">Series</h1>
          <nav className="nav-links">
            <Link to="/">Accueil</Link>
            <Link to="/series">Séries</Link>
            <Link to="/historique">Historique</Link>
            <Link to="/recommandation">Recommandation</Link>
            {localStorage.getItem("name") && (
              <Link to="/evaluation">Évaluation</Link>
            )}
            <Link to="/connexion">Connexion</Link>
          </nav>
        </div>
      </header>
      <main className="main-content">
        <h2 style={{ fontFamily: 'Arial Black' }}>Bienvenue sur Series</h2>
        <p style={{ color: 'Red', fontFamily: 'Arial Black' }}>Découvrez vos films et séries préférés!</p>
      </main>

      <div className="images-section">
        <img src={breaking} alt="Breaking Bad" className="breaking" />
        <div className="info-section">
          <h2>Breaking Bad</h2>
          <p>
            Une série culte où un professeur de chimie devient l’un des plus grands barons de la drogue.
          </p>
          <button className="watch-btn" onClick={() => setIsOpenVide(true)}>
            Regarder maintenant
          </button>
        </div>
      </div>

      {isOpenVideo && (
        <div className="modal-overlay" onClick={() => setIsOpenVide(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-btn" onClick={() => setIsOpenVide(false)}>✕</span>
            <iframe
              width="900"
              height="600"
              src="https://www.youtube.com/embed/HhesaQXLuRY"
              title="Breaking Bad Trailer"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      <div className="bibliotheque">
        <h2 style={{ color: 'Red' }}>Populaires</h2>
        <div className="grille">
          {filmsPopulaires.map((film) => (
            <div key={film.id} className="carte">
              <img src={film.image} alt={film.titre} />
              <p>{film.titre}</p>
            </div>
          ))}
        </div>
      </div>
      <hr className="hr-biblio" />

      <div className="bibliotheque">
        <h2>Séries</h2>
        <div className="grille">
          {seriesSuspense.map((serie) => (
            <div key={serie.id} className="carte">
              <img src={serie.image} alt={serie.titre} />
              <p>{serie.titre}</p>
            </div>
          ))}
        </div>
      </div>
      <hr className="hr-biblio" />

      <div className="bibliotheque">
        <h2 style={{ color: 'Red' }}>Comédies</h2>
        <div className="grille">
          {comedies.map((comedy) => (
            <div key={comedy.id} className="carte">
              <img src={comedy.image} alt={comedy.titre} />
              <p>{comedy.titre}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
