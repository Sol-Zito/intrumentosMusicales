import React, { useContext, useEffect, useState } from "react";
import { LocalStorageContext } from "../Context/auth.services";
import { Rating } from "@mui/material";
import { useGlobalStates } from "../Context/global.context";
import config from "../../env-config.js";

const baseURL = config.API_URL;

export const ValoracionProducto = ({ producto, isValid }) => {
  let productoData = producto;
  const { isLogged, idUsuario } = useContext(LocalStorageContext);
  const { cargarValoracion, loading, setFueValorado, fueValorado } =
    useGlobalStates();
  /*--------------Realiza la valoracion en el producto----------------*/
  function valoracion(newValue) {
    let valor = newValue.target.value;
    if (valor > 0) {
      let dataAEnviar = {
        idProducto: productoData.idProducto,
        idUsuario: idUsuario,
        valoracion: newValue.target.value,
      };
      cargarValoracion(dataAEnviar);
    }
  }
  /*--------------Se define el producto segun la cantidad de valoraciones dadas----------------*/
  let [respuesta, setRespuesta] = useState({ mensaje: "", valoracion: 0 });
  const definirvaloracion = (valor) => {
    console.log("productoData.promedio", productoData.promedio);
    if (valor == null || valor == 0) {
      setRespuesta({ valoracion: valor, mensaje: "Aun no hay reseñas" });
    }
    if (valor > 0 && valor <= 2) {
      setRespuesta({ mensaje: "Malo", valoracion: 2 });
    } else if (valor <= 3) {
      setRespuesta({ mensaje: "Bueno", valoracion: 3 });
    } else if (valor <= 4) {
      setRespuesta({ mensaje: "Muy bueno", valoracion: 4 });
    } else if (valor <= 6) {
      setRespuesta({ mensaje: "Excelente", valoracion: 5 });
    }
  };
  /*--------------Se toma la cantidad de valoraciones por producto----------------*/
  const [cantDeValoraciones, setCantValoraciones] = useState(0);
  function cantidadDeValoraciones() {
    fetch(
      baseURL +
        `/api/v1/valoracion/buscarPorIdProducto/${productoData.idProducto}`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setCantValoraciones(data.length);
      });
  }

  useEffect(() => {
    setFueValorado(false);
    cantidadDeValoraciones();
    definirvaloracion(productoData?.promedio);
  }, [loading, fueValorado]);

  return (
    <div
      style={{
        display: "flex",
        gap: "5px",
        alignItems: "strech",
        flexDirection: "row",
        justifyContent: "right",
        width: "100%",
        paddingRight: "10px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h4 style={{ margin: "3px" }}>{respuesta.mensaje}</h4>
        {isLogged ? (
          <Rating
            value={productoData.promedio}
            onClick={(event) => {
              valoracion(event);
            }}
            readOnly={isValid}
          />
        ) : (
          <Rating value={productoData.promedio} readOnly />
        )}
      </div>
      <button
        style={{
          backgroundColor: "rgb(237, 98, 39)",
          color: "white",
          height: "50px",
          borderRadius: "14px",
          width: "34px",
        }}
      >
        {cantDeValoraciones}
      </button>
    </div>
  );
};
