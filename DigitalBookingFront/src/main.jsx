import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import ContextProvider from "./Context/global.context";
import ContextProviderAdmin from "./Context/admin.context";
import ContextProviderAuth from "./Context/auth.context";
import { LocalStorageProvider } from "./Context/auth.services";
import CiudadesProvider from "./Context/ciudades.context";
import SedesContext from "./Context/sedes.context";
import ReservasCalendarProvider from "./Context/reservascalendar";
import { LoadScript } from "@react-google-maps/api";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ContextProvider>
      <LocalStorageProvider>
        <ContextProviderAdmin>
          <ContextProviderAuth>
            <CiudadesProvider>
              <SedesContext>
                <ReservasCalendarProvider>
                  <LoadScript
                    googleMapsApiKey={"AIzaSyAJhjm0yE8qVX0BFwpjxA5NLY25h1kgFTk"}
                  >
                    <App />
                  </LoadScript>
                </ReservasCalendarProvider>
              </SedesContext>
            </CiudadesProvider>
          </ContextProviderAuth>
        </ContextProviderAdmin>
      </LocalStorageProvider>
    </ContextProvider>
  </BrowserRouter>
);
