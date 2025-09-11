import axios from 'axios';
import { useState, useEffect } from 'react';

function App() {
  const [rows, setRows] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const loadAll = async () => {
      try {
        const res = await axios.get('/persons');
        setRows(res.data); // tableau de personnes
      } catch (err) {
        console.error('Erreur en chargeant les personnes:', err);
      }
    };
    loadAll();
  }, []);

  const handleSearch = async (e) => {
    const input = e.target.value;
    setQuery(input);

    try {
      const res = await axios.get('/persons/search', { params: { query: input } });
      setRows(res.data);
    } catch (err) {
      console.error('Erreur lors de la recherche:', err);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Recherche dans la base de personnes</h1>
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Ex: PHI"
        style={{ padding: '0.5rem', width: '300px', fontSize: '1rem' }}
      />
      <table border="1" cellPadding="5" style={{ marginTop: '1rem' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Email</th>
            <th>Genre</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(rows) ? rows.map(person => (
            <tr key={person.id}>
              <td>{person.id}</td>
              <td>{person.name}</td>
              <td>{person.email}</td>
              <td>{person.gender}</td>
            </tr>
          )) : null}
        </tbody>
      </table>
    </div>
  );
}

export default App;
