import React from "react";

export default function Evaluation() {
  const userName = localStorage.getItem("name");

  return (
    <div className="evaluation-page">
      <header className="navbar">
        <div className="navbar-left">
          <h1 style={{ color: 'red' }} className="logo">Series</h1>
        </div>
      </header>
      <div className="evaluation-content">
        <h1>Page Évaluation</h1>
        <p>Bienvenue {userName} ! Vous êtes connecté et pouvez voir cette page.</p>
      </div>
    </div>
  );
}
