import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles.css";
import AuthProvider from "./context/AuthProvider";
import "bootstrap/dist/css/bootstrap.min.css";

import ViveOutdoorProvider from "./context/viveProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ViveOutdoorProvider>
          <App />
        </ViveOutdoorProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
