// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import SplitScreenLanding from "./components/SplitScreenLanding.jsx";
import AadhyaPage from "./components/AadhyaPage.jsx";
import AaditiPage from "./components/AaditiPage.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SplitScreenLanding />} />
      <Route path="/aadhya" element={<AadhyaPage />} />
      <Route path="/aaditi" element={<AaditiPage />} />
    </Routes>
  );
};

export default App;
