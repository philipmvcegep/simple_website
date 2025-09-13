import initSqlJs from 'sql.js';
import Papa from 'papaparse';

export async function loadDatabaseFromCSV(csvUrl) {
  // Charger le fichier CSV
  const response = await fetch(csvUrl);
  const csvText = await response.text();

  // Parser le CSV
  const { data } = Papa.parse(csvText, {
    header: true,
    skipEmptyLines: true
  });

  // Initialiser SQL.js
  const SQL = await initSqlJs({
    locateFile: file => `https://sql.js.org/dist/${file}`
  });

  const db = new SQL.Database();

  // Créer la table
  db.run(`
    CREATE TABLE people (
      id INTEGER,
      first_name TEXT,
      last_name TEXT,
      email TEXT,
      gender TEXT
    );
  `);

  // Préparer l’insertion
  const insert = db.prepare(
    'INSERT INTO people (id, first_name, last_name, email, gender) VALUES (?, ?, ?, ?, ?)'
  );

  // Insérer les données
  data.forEach((person) => {
    insert.run([
      parseInt(person.id),
      person.first_name,
      person.last_name,
      person.email,
      person.gender,
    ]);
  });

  insert.free();

  return db;
}
