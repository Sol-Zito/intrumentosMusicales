import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { LocalStorageContext } from "../Context/auth.services";

const UserButtonPanel = ({ idUsuario }) => {
  const { ChangeBtnMenu, btnMenu } = useContext(LocalStorageContext);
  return (
    <>
      {!btnMenu ? (
        <Link to={`/Reservas/Historial/${idUsuario}`} onClick={ChangeBtnMenu}>
          <li style={{ listStyleType: "none" }}>
            <p>Lista de reservas</p>
          </li>
        </Link>
      ) : (
        <Link to={`/Reservas/Historial/${idUsuario}`}>
          <li style={{ listStyleType: "none" }}>
            <p>Lista de reservas</p>
          </li>
        </Link>
      )}
    </>
  );
};

export default UserButtonPanel;
