import React from "react";
import ReactDOM from "react-dom/client";
import RouteSwitch from "./RouteSwitch";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { ToastProvider } from "./context/ToastContext";
import "./assets/global.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <ToastProvider>
        <ThemeProvider>
          <RouteSwitch />
        </ThemeProvider>
      </ToastProvider>
    </AuthProvider>
  </React.StrictMode>
);
