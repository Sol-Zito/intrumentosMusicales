import React, { useContext, useEffect, useState } from "react";
import styles from "../Styles/Logout.module.css";
import { LocalStorageContext } from "../Context/auth.services";


const Logout = () => {
  const { logout } = useContext(LocalStorageContext);

  return (
    <div className={styles.containerBtnLogout}>
      <input
        className={styles.btnLogout}
        type="button"
        value="Cerrar Sesión"
        onClick={logout}
      />
    
    </div>
  );
};

export default Logout;
