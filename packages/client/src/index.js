import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { AppProviders } from "./AppProviders";

ReactDOM.render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>,
  document.getElementById("root")
);
