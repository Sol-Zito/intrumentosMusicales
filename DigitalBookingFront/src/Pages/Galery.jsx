import React, { useEffect } from "react";
import ImageGalery from "../Components/ImageGalery";
import ButtonNavigate from "../Components/ButtonNavigate";
import TitleHeader from "../Components/TitleHeader";
import styles from "../Styles/ProductDetail.module.css";
import { useGlobalStates } from "../Context/global.context";
import { useParams } from "react-router-dom";

const Galery = () => {
  const { idProducto } = useParams();
  const { productState, getProduct } = useGlobalStates();


  useEffect(() => {
    getProduct(idProducto);
  }, [idProducto]);

    return (
    <section>
      <TitleHeader title={"Galería de Imágenes del producto"} />
      <ButtonNavigate />
      {productState.productDetail?.indicadorHabilitado ? (
      <div className={styles.galery}>
        <ImageGalery listaProductosImagenes={productState.productDetail?.listaProductosImagenes}/>
      </div>
     ): (
      <h2></h2>
    )}
    </section>
  );
};

export default Galery;
