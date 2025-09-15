import "../css/Recommandation.css";
import React, { useEffect, useState } from "react";
export default function Recommandation() {
    const API = "http://localhost:8585/persons";

    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [recommandation, setRecommandation] = useState([]);
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
    
      const loadRecommandation = async (id) => {
        try {
          const res = await axios.get(`${API}/${id}/recommendations`);
          setRecommandation(Array.isArray(res.data) ? res.data : []);
          setSelectedUser(id);
        } catch (err) {
          setErrorMsg("Impossible de charger l'historique.");
        }
      };
    return (
        <div className="navbar-recommandation">
            <header className="navbar">
                <div className="navbar-left">
                    <h1 style={{ color: 'Red' }} className="logo">Series</h1>
                    <nav className="nav-links">
                        <a href="/">Accueil</a>
                        <a href="/series">Séries</a>
                        <a href="/historique">Historique</a>
                        <a href="recommandation">Recommandation</a>

                    </nav>
                </div>

            </header>
            <main className="main-recommandation">
                <h2 style={{ fontFamily: 'Arial Black' }}>Bienvenue sur Series</h2>
                <p style={{ color: 'Red', fontFamily: 'Arial Black' }}>Rating!</p>
                <div className="card" style={{ width: "18rem" }}>
                    <div className="card-body">
                        <h5 className="card-title">Emile</h5>
                        <p className="card-text">
                        Breaking Bad est une série captivante qui suit la transformation radicale d’un professeur de chimie en baron de la drogue. L’intrigue est intense, les personnages sont profonds et l’évolution de Walter White est à la fois fascinante et troublante. C’est une œuvre incontournable pour les amateurs de suspense et de drame.                            ⭐⭐⭐⭐
                        </p>
                        <a href="#" className="btn btn-primary">
                            Go somewhere
                        </a>
                    </div>
                </div>
                <div className="card" style={{ width: "18rem" }}>
                    <div className="card-body">
                        <h5 className="card-title">Alice</h5>
                        <p className="card-text">
                        Avec une mise en scène soignée et un scénario parfaitement maîtrisé, Breaking Bad tient le spectateur en haleine du début à la fin. Les performances des acteurs, notamment Bryan Cranston, sont remarquables. C’est une série brillante, riche en rebondissements et en émotions.                            ⭐⭐⭐⭐⭐
                        </p>
                        <a href="#" className="btn btn-primary">
                            Go somewhere
                        </a>
                    </div>
                </div>
            </main>
        </div>

    )
}