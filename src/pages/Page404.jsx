import React from "react";
import "../css/NotFound.css";

export default function Page404() {
  return (
    // Composant pour la page 404 - Page non trouvée
    <div className="notfound-container">
      <div className="notfound-content">
        <h1>404</h1>
        <h2>Oups ! La page est introuvable</h2>
        <p>La page que vous cherchez n'existe pas.</p>
        <a href="/" className="btn-home">Retour à l'accueil</a>
      </div>
    </div>
  );
}
