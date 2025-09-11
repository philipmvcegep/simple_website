import { useEffect, useState } from 'react';
import { loadDatabaseFromCSV } from './db';
import { searchPeople } from './utils/search';
import axios from 'axios';


function App() {
  const [input, setInput ] = useState("");
  const handleInput = (e) => setInput(e.target.value);

  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:8080/api/persons/search?name=${input}`) 
      .then((response) => {
        setData(response.data);})
      .catch((error) => {
        console.error("Erreur lors de la récupération des données (404) :", error);
      });
  }, [input]);
  

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Recherche dans la base de personnes</h1>

      <input
        type="text"
        value={input}
        onChange={handleInput}
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
