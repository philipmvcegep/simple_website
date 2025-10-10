import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const isLoggedIn = !!localStorage.getItem("name");
  return isLoggedIn ? children : <Navigate to="/connexion" replace />;
}
