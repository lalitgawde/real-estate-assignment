import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext.jsx";
import { PropertyProvider } from "./Context/PropertyContext.jsx";
import { AppointmentProvider } from "./Context/AppointmentsContext.jsx";
import { NotificationProvider } from "./Context/NotificationContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <PropertyProvider>
          <AppointmentProvider>
            <NotificationProvider>
              <App />
            </NotificationProvider>
          </AppointmentProvider>
        </PropertyProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
