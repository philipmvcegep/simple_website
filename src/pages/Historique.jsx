import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/Series.css";
export default function HistoriquePage() {
  const API = "http://localhost:8585/persons";

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [history, setHistory] = useState([]);
  const [search, setSearch] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

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

  const loadHistory = async (id) => {
    try {
      const res = await axios.get(`${API}/${id}/history`);
      setHistory(Array.isArray(res.data) ? res.data : []);
      setSelectedUser(id);
    } catch (err) {
      setErrorMsg("Impossible de charger l'historique.");
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="series-page">
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
     </header>

      <h2>Historique des utilisateurs</h2>
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
            <th>ID</th>
            <th>Nom</th>
            <th>Email</th>
            <th>Genre</th>
            <th>Voir l’historique</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
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
                  <h4>{serie.title}</h4>
                  <p>Genre: {serie.genre}</p>
                  <p>Nombre d’épisodes: {serie.nbEpisodes}</p>
                  <p>Note: {serie.note}</p>
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
