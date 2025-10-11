import React, { useState } from "react";
import axios from "axios";
import "../css/CreationCompte.css";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

export default function CreationCompte() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [gender, setGender] = useState("male");
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!name || !email || !password || !gender) {
            setErrorMsg("Tous les champs sont obligatoires.");
            return;
        }

        try {
            const res = await axios.post("http://localhost:8585/auth/register", {
                name,
                email,
                password,
                gender
            });

            console.log("Réponse serveur :", res.data);

            if (res.data.token && res.data.id && res.data.name) {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("id", res.data.id);
                localStorage.setItem("name", res.data.name);
                localStorage.setItem("hasWelcomed", "true");

                setSuccessMsg("Compte créé et connecté avec succès !");
                setErrorMsg("");

                navigate("/"); 
            } else {
                setSuccessMsg("Compte créé avec succès ! Veuillez vous connecter.");
                setErrorMsg("");
                setTimeout(() => navigate("/connexion"), 2000);
            }
        } catch (err) {
            console.error(err);
            setErrorMsg(err.response?.data?.message || "Erreur lors de la création du compte.");
            setSuccessMsg("");
        }
    };

    return (
        <div className="creation-page">
            <Navbar />
            <div className="creation-content">
                <h1>Créer un compte</h1>

                {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
                {successMsg && <p style={{ color: "green" }}>{successMsg}</p>}

                <form onSubmit={handleRegister}>
                    <div>
                        <label>Nom :</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label>Email :</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label>Mot de passe :</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label>Genre :</label>
                        <select value={gender} onChange={(e) => setGender(e.target.value)}>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>

                    <button type="submit">Créer un compte</button>
                </form>

                <p>
                    Vous êtes déjà inscrit ? <a href="/connexion">Connectez-vous</a>
                </p>
            </div>
        </div>
    );
}
