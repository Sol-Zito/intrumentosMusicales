import React from "react";
import styles from "../Styles/ProductDetail.module.css";
import { useGlobalStates } from "../Context/global.context";
import { useParams } from "react-router-dom";

const ImageGalery = ({listaProductosImagenes}) => {

  return (
    <>
      <div className={styles.gridLayaout}>
        {listaProductosImagenes.map((imagen) => (
          <div key={imagen.idProductoImagen} className={styles.box}>
            <img
              className={styles.imgInstrument}
              src={imagen.imagen?.urlImagen}
              alt="imagen del instrumento"
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default ImageGalery;
