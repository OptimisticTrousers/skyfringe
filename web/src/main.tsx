import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { ToastProvider } from "./context/ToastContext";
import "./index.css";
import RouteSwitch from "./RouteSwitch";

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
