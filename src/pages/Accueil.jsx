import React, { useState } from "react";
import "../css/Accueil.css";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { filmsPopulaires, seriesSuspense, comedies } from "../data/data";

import breaking from "../assets/images/breaking.jpg";
import family from "../assets/images/family.jpg";
import dark from "../assets/images/dark.jpg";

export default function Accueil() {
  //const [search, setSearch] = useState("");

  return (
    <div className="accueil-container">
      <header className="navbar">
        <div className="navbar-left">
          <h1 style={{color:'red'}}className="logo">Series</h1>
          <nav className="nav-links">
            <a href="/">Accueil</a>
            <a href="/series">Séries</a>
            <a href="/historique">Historique</a>
            <a href="/about">À propos</a>
          </nav>
        </div>
        {/* <div className="navbar-right">
          <input
            type="text"
            placeholder="Rechercher..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
          <button className="search-btn">Recherche</button>
        </div> */}
      </header>

      <main className="main-content">
        <h2 style={{fontFamily: 'Arial Black'}}>Bienvenue sur Series</h2>
        <p style={{ color: 'Red', fontFamily: 'Arial Black'}}>Découvrez vos films et séries préférés!</p>
      </main>

      <div>
        <Carousel>
          <Carousel.Item>
            <img className="d-block w-100" src={breaking} alt="Breaking Bad" />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={family} alt="family secrets" />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={dark} alt="dark" />
          </Carousel.Item>
        </Carousel>
      </div>

      <div className="bibliotheque">
        <h2 style={{ color: 'Red'}}>Populaires</h2>
        <div className="grille">
          {filmsPopulaires.map((film) => (
            <div key={film.id} className="carte">
              <img src={film.image} alt={film.titre} />
              <p>{film.titre}</p>
            </div>
          ))}
        </div>
      </div>
  <hr className="hr hr-blurry" />

      <div className="bibliotheque">
        <h2 >Séries</h2>
        <div className="grille">
          {seriesSuspense.map((serie) => (
            <div key={serie.id} className="carte">
              <img src={serie.image} alt={serie.titre} />
              <p>{serie.titre}</p>
            </div>
          ))}
        </div>
      </div>
        <hr className="hr hr-blurry" />

      <div className="bibliotheque">
        <h2 style={{ color: 'Red'}}>Comédies</h2>
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
