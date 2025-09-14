import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const API = "http://localhost:8585/series";

  // Définir les states
  const [rows, setRows] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setErrorMsg("");
        const res = await axios.get(API);
        // Vérifie que res.data est bien un tableau
        setRows(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Erreur en chargeant les séries:", err);
        setErrorMsg("Impossible de charger la liste des séries.");
      }
    })();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Liste des séries</h1>

      {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}

      <table border="1" cellPadding="5" style={{ marginTop: "1rem" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Genre</th>
            <th>Nb Episodes</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((serie) => (
            <tr key={serie.id}>
              <td>{serie.id}</td>
              <td>{serie.title}</td>
              <td>{serie.genre}</td>
              <td>{serie.nbEpisodes}</td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
