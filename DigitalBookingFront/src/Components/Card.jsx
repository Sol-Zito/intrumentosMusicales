import React, { useEffect, useState } from "react";
import styles from "../Styles/Card.module.css";
import stylesText from "../Styles/Text.module.css";
import { ValoracionProducto } from "./ValoracionProducto";

const Card = ({ product }) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardImage}>
        <img
          className={styles.imgInstrument}
          src={product?.listaProductosImagenes[0]?.imagen?.urlImagen}
          alt="foto instrumento"
        />
      </div>
      <div className={styles.cardText}>
        <h3 className={stylesText.subtitle}>{product?.nombre}</h3>
        <ValoracionProducto producto={product} isValid={true} />
        <p>{product?.categoria?.nombre}</p>
        <p>{product?.descripcion}</p>
        <p>Valor de alquiler: ${product?.precio}</p>
        <button className={styles.button}>Ver más</button>
      </div>
    </div>
  );
};

export default Card;
