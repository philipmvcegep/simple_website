import React, { useState } from 'react';
import axios from "axios";
import "../css/Connexion.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Connexion() {
    
    const [userData, setUserData] = useState({
        courriel: '',
        motDePasse: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8585/auth/login", {
                email: userData.courriel,
                password: userData.motDePasse
            });

            console.log(response.data);

            if (response.data.success) {
                localStorage.setItem("name", response.data.name);
                localStorage.setItem("id", response.data.id);
                localStorage.setItem("token", response.data.token);

                localStorage.removeItem("hasWelcomed");
                navigate("/evaluation");
            } else {
                setError(response.data.message);
            }

        } catch (err) {
            setError("Erreur de connexion. Vérifie tes identifiants.");
        }
    };

    return (
        <div className="series-page">
            <header className="navbar">
                <div className="navbar-left">
                    <h1 style={{ color: 'Red' }} className="logo">Series</h1>
                    <nav className="nav-links">
                        <Link to="/">Accueil</Link>
                        <Link to="/series">Séries</Link>
                        <Link to="/historique">Historique</Link>
                        <Link to="/recommandation">Recommandation</Link>
                        {localStorage.getItem("name") && (
                            <Link to="/evaluation">Évaluation</Link>
                        )}
                        <Link to="/connexion">Connexion</Link>
                    
                    </nav>
                </div>
            </header>
            <div className='maindivcontent'>
                <h1>Connexion</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="courriel">Email</label>
                        <input
                            type="email"
                            id="courriel"
                            name="courriel"
                            value={userData.courriel}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="motDePasse">Mot de passe</label>
                        <input
                            type="password"
                            id="motDePasse"
                            name="motDePasse"
                            value={userData.motDePasse}
                            onChange={handleChange}
                            minLength="8"
                            required
                        />
                    </div>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    <button type="submit" className="mainbutton" id="connexion">
                        Se connecter
                    </button>
                </form>
            </div>
        </div>

    );
}
