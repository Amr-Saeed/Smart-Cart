import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./Components/TextAnimations/FallingText/FallingText.jsx";
// import "./index.css";
import App from "./App.jsx";
import React from "react";
import ReactDOM from "react-dom/client";
import FallingText from "./Components/TextAnimations/FallingText/FallingText.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
