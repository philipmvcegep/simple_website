export function searchPeople(db, query) {
  const trimmed = query.trim().toLowerCase();

  if (trimmed === "") {
    // Retourner tout si rien écrit
    const res = db.exec("SELECT * FROM people");
    return res[0]?.values || [];
  }

  // Préparer la requête SQL
  const stmt = db.prepare(`
    SELECT * FROM people
    WHERE lower(first_name) LIKE $search
       OR lower(last_name) LIKE $search
       OR lower(email) LIKE $search
       OR lower(gender) LIKE $search
  `);

  const results = [];

  const searchTerm = `${trimmed}%`; // Match début de mot
  stmt.bind({ $search: searchTerm });

  while (stmt.step()) {
    results.push(stmt.get());
  }

  stmt.free();

  return results;
}
