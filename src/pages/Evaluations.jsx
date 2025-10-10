import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/Evaluations.css";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
export default function Evaluations() {
  const userId = localStorage.getItem("id");
  const userName = localStorage.getItem("name");
  const [ratings, setRatings] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const hasWelcomed = localStorage.getItem("hasWelcomed");
    if (userName && !hasWelcomed) {
      alert(`Bienvenue ${userName} !`);
      localStorage.setItem("hasWelcomed", "true");
    }

    const fetchRatings = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setErrorMsg("Vous devez être connecté.");
          return;
        }

        const res = await axios.get(`http://localhost:8585/ratings/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        console.log("Données reçues :", res.data);
        setRatings(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error(err);
        setErrorMsg("Impossible de charger vos évaluations.");
      }
    };

    if (userId) fetchRatings();
  }, [userId, userName]);

  const handleLogout = () => {
    localStorage.removeItem("name");
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("hasWelcomed");
    window.location.href = "/connexion";
  };

  return (
    <div className="evaluation-page">
      <Navbar />


      <div className="evaluation-content">
        <h1>Page Évaluation</h1>
        <p>Bienvenue {userName} ! Voici vos évaluations :</p>

        {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}

        {ratings.length === 0 ? (
          <p>Vous n'avez encore évalué aucune série ou épisode.</p>
        ) : (
          <ul>
            {ratings.map((r) => (
              <li key={r.id} style={{ marginBottom: "10px" }}>
                <strong>Série :</strong> {r.series.title} <br />
                <strong>Genre :</strong> {r.series.genre} <br />
                <strong>Épisodes :</strong> {r.series.nbEpisodes} <br />
                <strong>Note :</strong> {r.score} / 5
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
