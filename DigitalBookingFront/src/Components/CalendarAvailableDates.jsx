import React, { useContext, useEffect } from "react";
import stylesGeneral from "../Styles/CalendarAvailable.module.css";
import styleBtn from "../Styles/Button.module.css";
import { Calendar } from "react-multi-date-picker";
import "react-multi-date-picker/styles/layouts/mobile.css";
import "react-multi-date-picker/styles/colors/red.css";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { LocalStorageContext } from "../Context/auth.services";
import { useNavigate } from "react-router-dom";
import { useReservasContext } from "../Context/reservascalendar";

export const CalendarAvailableDates = ({ showReserves = true }) => {
  const {
    reservaState,
    reservasPorProducto,
    weekDays,
    months,
    valuesRange,
    fechasInhabilitadas,
    fechasValidas,
    flagReserva, 
  } = useReservasContext();
  let fechaActual = new Date(Date.now());
  const { isLogged } = useContext(LocalStorageContext);
  const navigate = useNavigate();
  const { idProducto } = useParams();

  let inhabilitadas = reservaState.fechasInhabilitadas;

  /*---------evalua las fechas reservadas---------- */
  function isReserved(strDate) {
    return inhabilitadas.some((ele) => strDate == ele);
  }

  useEffect(() => {
    reservasPorProducto(idProducto);
    fechasInhabilitadas(idProducto, "2023-06-01", "2023-09-30");
  }, [flagReserva]);

  const blockBooking = () => {
    if (!isLogged) {
      Swal.fire({
        icon: "info",
        text: "Para poder continuar tu reserva debes iniciar sesión",
        showCloseButton: true,
        showDenyButton: true,
        confirmButtonText: "Iniciar Sesión",
        confirmButtonAriaLabel: "Thumbs up, great!",
        confirmButtonColor: "#F0572D",
        denyButtonText: "Cancelar",
        denyButtonColor: "gray",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/Login");
        } else {
          navigate("/");
        }
      });
      return;
    }
    if (isLogged) {
      navigate("/Booking/" + idProducto);
    }
  };

  return (
    <div className={stylesGeneral.divContenedorPrincipal}>
      <div className={stylesGeneral.contenedorDeCalendario}>
        {showReserves && (
          <h2 className={stylesGeneral.title}>Fechas disponibles</h2>
        )}
        <div className={stylesGeneral.desk}>
          <Calendar
            value={valuesRange}
            onChange={(ranges) => {
              if (ranges.length > 1) {
                fechasValidas(
                  idProducto,
                  ranges[0].format(),
                  ranges[1].format()
                );
              }
            }}
            range
            className="orange rmdp-mobile"
            minDate={fechaActual}
            maxDate="2023-09-30"
            format="YYYY-MM-DD"
            mapDays={({ date }) => {
              const strDate = date.format();
              if (isReserved(strDate)) {
                return {
                  disabled: true,
                  style: { color: "#8395adde" },
                  onClick: () => Swal.fire("", "Día no disponible", "warning"),
                };
              }
            }}
            weekDays={weekDays}
            months={months}
            numberOfMonths={2}
          />
        </div>
        <div className={stylesGeneral.mobile}>
          <Calendar
            value={valuesRange}
            onChange={(ranges) => {
              if (ranges.length > 1) {
                fechasValidas(
                  idProducto,
                  ranges[0].format(),
                  ranges[1].format()
                );
              }
            }}
            range
            className="orange rmdp-mobile"
            minDate={fechaActual}
            maxDate="2023-09-30"
            format="YYYY-MM-DD"
            mapDays={({ date }) => {
              const strDate = date.format();
              if (isReserved(strDate)) {
                return {
                  disabled: true,
                  style: { color: "#8395adde" },
                  onClick: () => Swal.fire("", "Día no disponible", "warning"),
                };
              }
            }}
            weekDays={weekDays}
            months={months}
          />
        </div>
      </div>

      {showReserves && (
        <div className={stylesGeneral.contenedorDeReserva}>
          <p className={stylesGeneral.subTitle && stylesGeneral.desk}>
            Agregue sus fechas de reserva para obtener precios exactos!
          </p>
          <button className={styleBtn.buttonSubmit} onClick={blockBooking}>
            Iniciar Reserva
          </button>
        </div>
      )}
    </div>
  );
};
