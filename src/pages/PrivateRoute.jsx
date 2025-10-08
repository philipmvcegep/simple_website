import React from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  // Vérifie si l'utilisateur est connecté
  const isLoggedIn = !!localStorage.getItem("name"); // ou token si tu utilises JWT

  // Si connecté, affiche le composant enfant, sinon redirige vers connexion
  return isLoggedIn ? children : <Navigate to="/evalution" replace />;
}
