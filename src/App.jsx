import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Accueil from "./pages/Accueil";
import SeriesFilterPage from "./pages/SeriesFilterPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/series" element={<SeriesFilterPage />} />
      </Routes>
    </Router>
  );
}

export default App;
