import React from "react";
import ButtonNavigate from "../Components/ButtonNavigate";
import styles from "../Styles/Admin.module.css";
const NotFound = () => {
  return (
    <section>
        <ButtonNavigate />
    <div className={styles.containerAdminPanel}>
      <h1>
       Página no encontrada
      </h1>
      </div>
    </section>
  );
};

export default NotFound;
