import React, { useState } from "react";
import "../css/Accueil.css";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import breaking from "../assets/images/breaking.jpg";
import family from "../assets/images/family.jpg";
import dark from "../assets/images/dark.jpg";

export default function Accueil() {
  const [search, setSearch] = useState("");
  const filmsPopulaires = [
    { id: 1, titre: "Breaking Bad", image: breaking },
    { id: 2, titre: "Dark", image: dark },
    { id: 3, titre: "Family Secrets", image: family },
    { id: 4, titre: "Inception", image: "https://th.bing.com/th/id/R.7d82d780b0679dba7737c24246e50818?rik=b2HcjJxLhtY3MA&pid=ImgRaw&r=0" },
    { id: 5, titre: "Interstellar", image: "https://image.tmdb.org/t/p/w500/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg" },
    { id: 6, titre: "Stranger Things", image: "https://image.tmdb.org/t/p/w500/x2LSRK2Cm7MZhjluni1msVJ3wDF.jpg" },
  ];

  const seriesSuspense = [
    { id: 7, titre: "Prison Break", image: "https://m.media-amazon.com/images/M/MV5BMTljM2Y5OTUtMzg3Yy00ZjI3LTg4YzUtMmVkMGY2NTgyMmQ3XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },
    { id: 8, titre: "La Casa de Papel", image: "https://image.tmdb.org/t/p/w500/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg" },
    { id: 9, titre: "You", image: "https://fontmeme.com/images/you-season-3-font.png" },
    { id: 10, titre: "Squid Game", image: "https://fr.web.img5.acsta.net/r_1280_720/img/bd/81/bd81c21a3d3bc1c9e81390b1236d0f20.jpg" },
    { id: 11, titre: "The Witcher", image: "https://image.tmdb.org/t/p/w500/7vjaCdMw15FEbXyLQTVa04URsPm.jpg" },
    { id: 12, titre: "Severance", image: "https://tse3.mm.bing.net/th/id/OIP.zu2URzzynuqk1KF4dUfw0QHaLH?r=0&rs=1&pid=ImgDetMain&o=7&rm=3" },
  ];

  const comedies = [
    { id: 13, titre: "Friends", image: "https://image.tmdb.org/t/p/w500/f496cm9enuEsZkSPzCwnTESEK5s.jpg" },
    { id: 14, titre: "Brooklyn 99", image: "https://image.tmdb.org/t/p/w500/hlLXt2tOPT6RRnjiUmoxyG1LTFi.jpg" },
    { id: 15, titre: "The Office", image: "https://image.tmdb.org/t/p/w500/qWnJzyZhyy74gjpSjIXWmuk0ifX.jpg" },
    { id: 16, titre: "Modern Family", image: "https://tse2.mm.bing.net/th/id/OIP.InLnhc4MeQ_nLIU7dfu1kgHaKf?r=0&rs=1&pid=ImgDetMain&o=7&rm=3" },
    { id: 17, titre: "How I Met Your Mother", image: "https://tse2.mm.bing.net/th/id/OIP.hVxJUogIEVFPH9hv0KZVEAHaJ7?r=0&rs=1&pid=ImgDetMain&o=7&rm=3" },
    { id: 18, titre: "Community", image: "https://tse1.mm.bing.net/th/id/OIP.93Ob5iycLj5VBxsX7DDphQHaLH?r=0&rs=1&pid=ImgDetMain&o=7&rm=3" },
  ];

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
