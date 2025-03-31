import React from "react";
import "./SplitScreenLanding.css";
import { useNavigate } from "react-router-dom";

const SplitScreenLanding = () => {
  const navigate = useNavigate();

  return (
    <div className="split-container">
      <div className="split left" onClick={() => navigate("/aadhya")}>
        <h1>Aadhya</h1>
      </div>
      <div className="split right" onClick={() => navigate("/aaditi")}>
        <h1>Aaditi</h1>
      </div>
    </div>
  );
};

export default SplitScreenLanding;
