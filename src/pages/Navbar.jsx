import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import '../css/Navbar.css';

export default function Navbar() {
  const [isLogged, setIsLogged] = useState(!!localStorage.getItem("token"));

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/connexion";
  };

  useEffect(() => {
    setIsLogged(!!localStorage.getItem("token"));
  }, []);

  return (
    <header className="navbar">
      <div className="navbar-left">
        <h1 className="logo">Series</h1>
        <nav className="nav-links">
          <Link to="/">Accueil</Link>
          <Link to="/series">Séries</Link>
          <Link to="/historique">Historique</Link>
          <Link to="/recommandation">Recommandation</Link>
          {isLogged && <Link to="/evaluation">Évaluation</Link>}
          {!isLogged && <Link to="/connexion">Connexion</Link>}
        </nav>
      </div>

      <div className="navbar-right">
        {!isLogged && (
          <Link to="/creationCompte" className="creation-link">Création de compte</Link>
        )}
        {isLogged && (
          <button onClick={handleLogout} className="logout-btn">Se déconnecter</button>
        )}
      </div>
    </header>
  );
}
