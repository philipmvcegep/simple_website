import React, { useState } from "react";
import "../css/Accueil.css";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import breaking from "../assets/images/breaking.jpg";
import family from "../assets/images/family.jpg";
import dark from "../assets/images/dark.jpg";


export default function Accueil() {
  const [search, setSearch] = useState("");

  return (
    <div className="accueil-container">
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
          {/* <input
            type="text"
            placeholder="RechercherS..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
            
          /> */}
{/*           <button className="search-btn">Recherche</button>
 */}        </div>
      </header>

      <main className="main-content">
        <h2>Bienvenue sur Series</h2>
        <p>Découvrez vos films et séries préférés!</p>
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
    </div>
  );
}
