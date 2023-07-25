import React, { createContext, useContext, useReducer, useState } from "react";
import config from "../../env-config.js";
import Swal from "sweetalert2";

const UtilCalendario = createContext();

const baseURL = config.API_URL;

const fechasReservadas = {
  reservas: [],
  reservasLista: [],
  fechasInhabilitadas: [],
  reservasUsuario: [],
};

const reservasReducer = (state, action) => {
  switch (action.type) {
    case "GET_FECHAS_RESERVADAS":
      return {
        ...state,
        reservas: action.payload,
      };
    case "GET_TODAS_RESERVADAS":
      return {
        ...state,
        reservasLista: action.payload,
      };

    case "RESERVAS_POR_PRODUCTOS":
      return {
        ...state,
        fechasInhabilitadas: action.payload,
      };
    case "GET_RESERVAS_USUARIO":
      return {
        ...state,
        reservasUsuario: action.payload,
      };
    default:
      throw new Error();
  }
};

const ReservasCalendarProvider = ({ children }) => {
  const weekDays = ["DO", "LU", "MA", "MI", "JU", "VI", "SA"];
  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const [reservaState, reservaDispatch] = useReducer(
    reservasReducer,
    fechasReservadas
  );
  const [flagReserva, setFlagReserva] = useState(false);

  /*--------variable de fechas seleccionadas por el usuario---------*/
  const [valuesRange, setValuesRange] = useState([]);
  console.log("valuesRange", valuesRange);

  function reservasPorProducto(idProducto) {
    fetch(`${baseURL}/api/v1/reserva/producto/${idProducto}`)
      .then((res) => res.json())
      .then((data) => {
        const reserva = data.map((el) => [
          new Date(el.fechaInicioReserva),
          new Date(el.fechaFinReserva),
        ]);
        reservaDispatch({ type: "GET_FECHAS_RESERVADAS", payload: reserva });
      });
  }
  /*--------trae todas las reservas---------*/
  function reservasTodas() {
    fetch(`${baseURL}/api/v1/reserva/buscarTodos`, {
      method: "POST",
      body: JSON.stringify({
        pagina: 0,
        cantidad: 50,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const reservas = data?.map((el) => [
          new Date(el.fechaInicioReserva),
          new Date(el.fechaFinReserva),
          el.idProducto,
        ]);
        reservaDispatch({ type: "GET_TODAS_RESERVADAS", payload: reservas });
      });
  }

  /*--------fechas inhabilitadas por producto---------*/
  function fechasInhabilitadas(idProducto, fechaInicio, fechaFin) {
    fetch(`${baseURL}/api/v1/reserva/fechas/inhabilitadas`, {
      method: "POST",
      body: JSON.stringify({
        idProducto: idProducto,
        fechaDesde: fechaInicio,
        fechaHasta: fechaFin,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        reservaDispatch({
          type: "RESERVAS_POR_PRODUCTOS",
          payload: data.rangoFechas,
        });
      });
  }

  function reservasPorUsuario(idUsuario) {
    fetch(`${baseURL}/api/v1/reserva/usuario/${idUsuario}`)
      .then((res) => res.json())
      .then((data) => {
        reservaDispatch({ type: "GET_RESERVAS_USUARIO", payload: data });
      });
  }

  function fechasValidas(idProducto, fechaInicio, fechaFin) {
    Swal.fire("Validando datos", "Aguarde un momento...");
    Swal.showLoading(Swal.getConfirmButton());
    fetch(`${baseURL}/api/v1/reserva/fechas/inhabilitadas`, {
      method: "POST",
      body: JSON.stringify({
        idProducto: idProducto,
        fechaDesde: fechaInicio,
        fechaHasta: fechaFin,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.rangoFechas.length > 0) {
          Swal.fire("", "Días no disponibles", "warning");
          setValuesRange([]);
        } else {
          Swal.fire("Fecha actualizada", "", "success");
          setValuesRange([fechaInicio, fechaFin]);
        }
      });
  }

  return (
    <UtilCalendario.Provider
      value={{
        reservaState,
        reservaDispatch,
        reservasPorProducto,
        weekDays,
        months,
        valuesRange,
        setValuesRange,
        reservasTodas,
        fechasInhabilitadas,
        fechasValidas,
        reservasPorUsuario,
        flagReserva,
        setFlagReserva,
      }}
    >
      {children}
    </UtilCalendario.Provider>
  );
};

export default ReservasCalendarProvider;
export const useReservasContext = () => useContext(UtilCalendario);
