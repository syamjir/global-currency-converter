import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// Get the root DOM element and create a React root
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the main App component inside React.StrictMode for highlighting potential issues
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
