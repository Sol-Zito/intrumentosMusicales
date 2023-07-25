import React from "react";
import { Link } from "react-router-dom";
import Card from "./Card";
import styles from "../Styles/Card.module.css";
import stylesText from "../Styles/Text.module.css";
import { ciudadesContext } from "../Context/ciudades.context";

const ResultadoBusqueda = () => {
  const { ciudadesState } = ciudadesContext();
  return (
    <>
      <h2 className={stylesText.title}>Resultado de busqueda:</h2>
      <div className={styles.cardGrid}>
        {ciudadesState.resultado.map((producto) => {
          return (
            <Link
              key={producto.idProducto}
              to={"/productDetail/" + producto.idProducto}
            >
              <Card product={producto} />
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default ResultadoBusqueda;
