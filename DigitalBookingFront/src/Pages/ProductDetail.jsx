import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useGlobalStates } from "../Context/global.context";
import stylesDetail from "../Styles/ProductDetail.module.css";
import ButtonNavigate from "../Components/ButtonNavigate";
import TitleHeader from "../Components/TitleHeader";
import ImageGalery from "../Components/ImageGalery";
import Loader from "../Components/Loader";
import Ubication from "../Components/Ubication";
import { CalendarAvailableDates } from "../Components/CalendarAvailableDates";
import MapView from "../Components/MapView";
import { BloqueDePoliticas } from "../Components/BloqueDePoliticas";
import { ValoracionProducto } from "../Components/ValoracionProducto";

const ProductDetail = () => {
  const { idProducto } = useParams();
  const { productState, getProduct, fueValorado, setFueValorado, loading } =
    useGlobalStates();

  console.log(productState);
  useEffect(() => {
    getProduct(idProducto);
  }, [idProducto, fueValorado]);

  return (
    <>
      <TitleHeader title="Características del producto" />
      <ButtonNavigate />
      {loading ? (
        <Loader />
      ) : (
        <div className={stylesDetail.gridContainer}>
          {productState.productDetail?.indicadorHabilitado ? (
            <>
              <div className={stylesDetail.containerUbicatioValoracion}>
                <Ubication />
                <div className={stylesDetail.containerValoracion}>
                  <ValoracionProducto producto={productState.productDetail} />
                </div>
              </div>

              <h2 className={stylesDetail.h2}>
                {productState.productDetail.nombre}
              </h2>
              <ImageGalery
                listaProductosImagenes={
                  productState.productDetail?.listaProductosImagenes
                }
              />
              <Link
                key={productState.productDetail.idProduct}
                to={"/Galery/" + productState.productDetail.idProducto}
              >
                <p className={stylesDetail.verMas}>Ver más</p>
              </Link>
              <h2 className={stylesDetail.h2}>Descripción</h2>
              <div className={stylesDetail.cardTextDetail}>
                <p>{productState.productDetail.descripcion}</p>
                <p>Valor de alquiler: ${productState.productDetail.precio}</p>
              </div>
              <h2 className={stylesDetail.h2}>
                ¿Qué caraterísticas tiene este instrumento?
              </h2>
              <div className={stylesDetail.divider}></div>
              <div className={stylesDetail.características}>
                <div>
                  <p>
                    {" "}
                    <i
                      className="fa fa-flag"
                      aria-hidden="true"
                    ></i> Marca: {productState.productDetail.marca}
                  </p>
                  <p>
                    {" "}
                    <i
                      className="fa fa-asterisk"
                      aria-hidden="true"
                    ></i>Modelo: {productState.productDetail.modelo}
                  </p>
                </div>
                <div>
                  <p>
                    <i className="fa fa-bolt" aria-hidden="true"></i>
                    {productState.productDetail.esElectrico
                      ? "Es eléctrico"
                      : "No es eléctrico"}
                  </p>
                  <p>
                    <i className="fa fa-suitcase" aria-hidden="true"></i>
                    {productState.productDetail.tieneProtector
                      ? "Tiene protector"
                      : "No tiene Protector"}
                  </p>
                </div>
              </div>
              <div className={stylesDetail.divider}></div>
              <CalendarAvailableDates idProducto={idProducto} />
              <div className={stylesDetail.divider}></div>

              <MapView />

              <BloqueDePoliticas />
            </>
          ) : (
            <h2></h2>
          )}
        </div>
      )}
    </>
  );
};

export default ProductDetail;
