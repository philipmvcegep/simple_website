import React, { useState } from 'react';
import axios from "axios";
import "../css/Connexion.css";
import { useNavigate } from "react-router-dom";

export default function Connexion() {
    const [userData, setUserData] = useState({
        courriel: '',
        motDePasse: ''
    })
    const [error, setError] = useState('');
    const navigate = useNavigate();


    return (
        <div className='maindivcontent'>
            <h1>Connexion</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="courriel">Email</label>
                    <input type="email" id="courriel" name="courriel" value={userData.courriel} onChange={handleChage} required />
                </div>
                <div>
                    <label htmlFor="motDePasse">Mot de passe</label>
                    <input type="password" id="motDePasse" name="motDePasse" value={userData.motDePasse} onChange={handleChage} minLength="8" required />
                </div>
                <button type="submit" className="mainbutton" id="connexion">Se connecter</button>
            </form>

        </div>

    );
}