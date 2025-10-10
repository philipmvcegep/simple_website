import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/Historique.css";
import breaking from "../assets/images/breaking.jpg";
import family from "../assets/images/family.jpg";
import dark from "../assets/images/dark.jpg";
import super2 from "../assets/images/super2.jpg";
import breakingpoint from "../assets/images/breakingpoint.jpg";
import family1 from "../assets/images/family1.jpg";
import hah from "../assets/images/hah.jpg";
import hs from "../assets/images/hs.jpg";
import superaction from "../assets/images/superaction.jpg";
import Navbar from "./Navbar";

export default function HistoriquePage() {
  const API = "http://localhost:8585/persons";

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [history, setHistory] = useState([]);
  const [search, setSearch] = useState("");
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
  // Récupération des utilisateurs au chargement du composant
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(API);
        setUsers(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        setErrorMsg("Impossible de charger les utilisateurs.");
      }
    };
    fetchUsers();
  }, []);
  // Chargement de l'historique d'un utilisateur sélectionné
  const loadHistory = async (id) => {
    try {
      const res = await axios.get(`${API}/${id}/history`);
      setHistory(Array.isArray(res.data) ? res.data : []);
      setSelectedUser(id);
    } catch (err) {
      setErrorMsg("Impossible de charger l'historique.");
    }
  };
  // Filtrage des utilisateurs en fonction de la recherche
  const filteredUsers = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase())
  );
  // Rendu du composant HistoriquePage et navigation
  return (
    <div className="series-page">
      <Navbar />


      <h2 style={{ color: 'Red', font: 'Arial Black' }}>Historique des utilisateurs</h2>

      <input
        type="text"
        placeholder="Rechercher un utilisateur..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input mb-3"
      />

      {errorMsg && <p className="text-danger">{errorMsg}</p>}

      <table className="table table-dark table-striped">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Email</th>
            <th>Genre</th>
            <th>Voir l’historique</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((u) => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.gender}</td>
              <td>
                <button
                  className="btn btn-outline-light btn-sm"
                  onClick={() => loadHistory(u.id)}
                >
                  Consulter
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedUser && (
        <div className="mt-4">
          <h3>Historique de l’utilisateur #{selectedUser}</h3>
          {history.length > 0 ? (
            <div className="series-list">
              {history.map((serie) => (
                <div key={serie.id} className="serie-card">
                  <div className="poster">
                    <img src={imagesMap[serie.title]} alt={serie.title} />
                  </div>
                  <div className="info">
                    <h3 style={{ color: "red" }}>{serie.title}</h3>
                    <p><strong>Genre:</strong> {serie.genre}</p>
                    <p><strong>Épisodes:</strong> {serie.nbEpisodes}</p>
                    <p><strong>Note:</strong> {serie.note}</p>
                    <p>{serie.description}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>Aucun historique trouvé.</p>
          )}
        </div>
      )}
    </div>
  );
}
