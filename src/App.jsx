import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Accueil from "./pages/Accueil";
import Footer from "./pages/Footer";
import SeriesFilterPage from "./pages/SeriesFilterPage";

function App() {
  return (
    <Router>
      <div className="content">
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/series" element={<SeriesFilterPage />} />
      </Routes>
      <Footer/>
      </div>
    </Router>
  );
}

export default App;
