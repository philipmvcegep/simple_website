import { useEffect, useState } from 'react';
import { loadDatabaseFromCSV } from './db';
import { searchPeople } from './utils/search';

function App() {
  const [rows, setRows] = useState([]);
  const [query, setQuery] = useState('');
  const [db, setDb] = useState(null);

  useEffect(() => {
    const load = async () => {
      const database = await loadDatabaseFromCSV('/data/people.csv');
      setDb(database);
      const res = database.exec('SELECT * FROM people');
      if (res.length > 0) {
        setRows(res[0].values);
      }
    };
    load();
  }, []);

  const handleSearch = (e) => {
    const input = e.target.value;
    setQuery(input);

    if (db) {
      const results = searchPeople(db, input);
      setRows(results);
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
            <th>Prénom</th>
            <th>Nom</th>
            <th>Email</th>
            <th>Genre</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([id, first, last, email, gender]) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{first}</td>
              <td>{last}</td>
              <td>{email}</td>
              <td>{gender}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
