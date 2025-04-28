import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./Components/TextAnimations/FallingText/FallingText.jsx";
// import "./index.css";
import App from "./App.jsx";
import React from "react";
import ReactDOM from "react-dom/client";
import FallingText from "./Components/TextAnimations/FallingText/FallingText.jsx";
// Import your Clerk Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key");
}
import { ClerkProvider } from "@clerk/clerk-react";
createRoot(document.getElementById("root")).render(
  <ClerkProvider
    navigate={(to) => window.history.pushState(null, "", to)}
    routing="path" // 👈 use React Router-style routing
    signInUrl="/"
    signUpUrl="/sign-up"
    publishableKey={PUBLISHABLE_KEY}
    afterSignOutUrl="/"
  >
    <App />
  </ClerkProvider>
);
