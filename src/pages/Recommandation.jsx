import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/Recommandation.css";
import { Link } from "react-router-dom";

export default function Recommandation() {
  const API_BASE = "http://localhost:8585/persons";
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [loadingRecs, setLoadingRecs] = useState(false);
  const [error, setError] = useState("");
  // Récupération de la liste des utilisateurs au chargement du composant
  useEffect(() => {
    const fetchUsers = async () => {
      setLoadingUsers(true);
      setError("");
      try {
        const res = await axios.get(`${API_BASE}`);
        setUsers(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        setError("Impossible de charger la liste d'utilisateurs.");
      } finally {
        setLoadingUsers(false);
      }
    };
    fetchUsers();
  }, []);

  // Chargement des recommandations pour l'utilisateur sélectionné
  const handleLoadRecommendations = async (user) => {
    setSelectedUser(user);
    setRecommendations([]);
    setLoadingRecs(true);
    setError("");
    try {
      const res = await axios.get(`${API_BASE}/${user.id}/recommendation`);
      setRecommendations(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      setError("Impossible de charger les recommandations.");
    } finally {
      setLoadingRecs(false);
    }
  };
  // Filtrage des utilisateurs en fonction de la recherche
  const filtered = users.filter((u) =>
    (u.name || "").toLowerCase().includes(search.toLowerCase()) ||
    (u.email || "").toLowerCase().includes(search.toLowerCase())
  );
  // Rendu du composant Recommandation avec navigation, liste d'utilisateurs et recommandations
  return (
    <div className="accueil-container">
      <header className="navbar">
        <div className="navbar-left">
          <h1 style={{ color: "red" }} className="logo">Series</h1>
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
      <div className="reco-page">
        <h1 style={{ color: "Red", font: "Arial Black" }}>Recommandations de séries</h1>

        <div className="row">
          <div className="col users">
            <input
              type="text"
              placeholder="Rechercher par nom ou email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />
            <ul className="user-list">
              {filtered.map((u) => (
                <li key={u.id} className="user-item">
                  <div>
                    <strong>{u.name}</strong><br />
                    <small>{u.email}</small>
                  </div>
                  <div>
                    <button
                      style={{ color: "Red", font: "Arial Black" }}
                      onClick={() => handleLoadRecommendations(u)}
                    >
                      Voir recommandations
                    </button>
                  </div>
                </li>
              ))}
              {filtered.length === 0 && <li>Aucun utilisateur trouvé.</li>}
            </ul>

          </div>

          <div className="recommandatons col">
            <h2>Recommandations</h2>
            {!selectedUser && (
              <p>Sélectionne un utilisateur pour voir ses recommandations.</p>
            )}
            {selectedUser && (
              <div>
                <h3>
                  Pour : {selectedUser.name}{" "}
                  <small>({selectedUser.email})</small>
                </h3>

                {loadingRecs ? <p>Chargement des recommandations...</p> : null}
                {error && <p className="error">{error}</p>}

                {!loadingRecs && recommendations.length === 0 && (
                  <p>Aucune recommandation trouvée.</p>
                )}

                {!loadingRecs && recommendations.length > 0 && (
                  <table className="reco-table">
                    <thead>
                      <tr>
                        <th>Titre</th>
                        <th>Genre</th>
                        <th>Note</th>
                        <th>Score</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recommendations.map((r) => {
                        const score = r.note != null ? r.note / 10 : 0;
                        return (
                          <tr key={r.seriesId}>
                            <td>{r.title}</td>
                            <td>{r.genre || "-"}</td>
                            <td>{r.note != null ? r.note : "-"}</td>
                            <td>{(score * 100).toFixed(1)}%</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
