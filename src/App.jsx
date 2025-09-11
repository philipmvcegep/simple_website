import axios from 'axios';

import { useState, useEffect } from 'react';

function App() {

  const [rows, setRows] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const API = 'http://localhost:8585/persons';

  // Charger tout au départ
  useEffect(() => {
    (async () => {
      try {
        setErrorMsg('');
        const res = await axios.get(`${API}/getAllPerson`);
        setRows(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error('Erreur en chargeant les personnes:', err);
        setErrorMsg("Impossible de charger la liste des personnes.");
      }
    })();
  }, []);

  const handleSearch = async (term) => {
    const t = term?.trim();
    if (!t) {
      setSearchResult([]);
      return;
    }

    try {
      setIsLoading(true);
      setErrorMsg('');
      const res = await axios.get(`${API}/search`, { params: { name: t } });
      setSearchResult(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error('Erreur lors de la recherche:', err);
      setErrorMsg("Erreur lors de la recherche.");
      setSearchResult([]);
    } finally {
      setIsLoading(false);
    }
  };

  const displayed = searchTerm.trim() ? searchResult : rows;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Recherche dans la base de personnes</h1>
      <div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSearch(searchTerm);
          }}
          placeholder="Ex: PHI"
          style={{ padding: '0.5rem', width: '300px', fontSize: '1rem' }}
        />

        {isLoading && <span style={{ marginLeft: 12 }}>Chargement...</span>}
      </div>

      {errorMsg && <p style={{ color: 'crimson' }}>{errorMsg}</p>}

      <table border="1" cellPadding="5" style={{ marginTop: '1rem', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Email</th>
            <th>Genre</th>
          </tr>
        </thead>
        <tbody>

          {displayed.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center', padding: '0.75rem' }}>
                Aucun résultat
              </td>
            </tr>
          ) : (
            displayed.map((person) => (
              <tr key={person.id}>
                <td>{person.id}</td>
                <td>{person.name}</td>
                <td>{person.email}</td>
                <td>{person.gender}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;

