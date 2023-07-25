import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LocalStorageContext = createContext();

const LocalStorageProvider = ({ children }) => {
  const [localStorageData, setLocalStorageData] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [idUsuario, setidUsuario] = useState("");
  const [email, setEmail] = useState("")
  const [isLogged, setIsLogged] = useState(false);
  const [btnMenu, setBtnMenu] = useState(true);
  const userRol = localStorageData?.rol?.idRol;

  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("infoUser"));
    const token = localStorage.getItem("infoToken");
    const firstName = data?.persona?.nombre;
    const lastName = data?.persona?.apellido;
    const email = data?.persona?.correo;
    const isLogged = !!token;
 
    setidUsuario(data?.idUsuario);
    setFirstName(firstName);
    setLastName(lastName);
    setEmail(email);
    setLocalStorageData(data);
    setIsLogged(isLogged);
  }, []);

  const logout = () => {
    localStorage.removeItem("infoToken"), localStorage.removeItem("infoUser");
    navigate("/");
    location.reload();
  };

  const getRol = () => {
    const userRol = localStorageData?.rol?.idRol;
  };

  const ChangeBtnMenu = () => {
    setBtnMenu(!btnMenu);
    if (btnMenu) {
      const x = window.scrollX;
      const y = window.scrollY;
      window.onscroll = function () {
        window.scrollTo(x, y);
      };
    } else {
      window.onscroll = function () {};
    }
  };

  return (
    <LocalStorageContext.Provider
      value={{
        localStorageData,
        firstName,
        isLogged,
        lastName,
        email,
        userRol,
        logout,
        getRol,
        btnMenu,
        ChangeBtnMenu,
        idUsuario,
      }}
    >
      {children}
    </LocalStorageContext.Provider>
  );
};

export { LocalStorageContext, LocalStorageProvider };
