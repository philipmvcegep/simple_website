import React, { useEffect, useState } from "react";
import axios from "axios";

export default function SeriesFilterPage() {
  const API = "http://localhost:8585/series";
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(API);
        setRows(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        setErrorMsg("Impossible de charger la liste des séries.");
      }
    })();
  }, []);

  const filteredRows = rows.filter(
    (serie) =>
      serie.title?.toLowerCase().includes(search.toLowerCase()) ||
      serie.genre?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Liste des Séries</h1>
      <form className="d-flex mb-3" onSubmit={(e) => e.preventDefault()}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Rechercher une série..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>

      {errorMsg && <p className="text-danger">{errorMsg}</p>}

      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Titre</th>
            <th>Genre</th>
          </tr>
        </thead>
        <tbody>
          {filteredRows.length > 0 ? (
            filteredRows.map(({ id, title, genre }) => (
              <tr key={id}>
                <td>{id}</td>
                <td>{title}</td>
                <td>{genre}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center">
                Aucune série trouvée
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
