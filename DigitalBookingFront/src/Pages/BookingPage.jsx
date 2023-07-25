import React, { useContext, useEffect, useState } from "react";
import styles from "../Styles/Booking.module.css";
import { LocalStorageContext } from "../Context/auth.services";
import { CalendarAvailableDates } from "../Components/CalendarAvailableDates";
import { BloqueDePoliticas } from "../Components/BloqueDePoliticas";
import { useGlobalStates } from "../Context/global.context";
import { useParams } from "react-router-dom";
import stylesText from "../Styles/Text.module.css";
import { ciudadesContext } from "../Context/ciudades.context";
import { ValoracionProducto } from "../Components/ValoracionProducto";
import Ubication from "../Components/Ubication";
import ButtonNavigate from "../Components/ButtonNavigate";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper";
import { useReservasContext } from "../Context/reservascalendar";
import styleBtn from "../Styles/Button.module.css";
import config from "../../env-config.js";
import Swal from "sweetalert2";

const baseURL = config.API_URL;

const Booking = () => {
  const { firstName, lastName, email, isLogged, idUsuario } =
    useContext(LocalStorageContext);
  const { productState, getProduct, listaImagenes } = useGlobalStates();
  const { idProducto } = useParams();
  const { coordenadas, productoSedes, fueValorado, setFueValorado } =
    useGlobalStates();
  const { ciudadesState, traigoCiudades, getProvincia, provinces } =
    ciudadesContext();
  const [sedeSelected, setsedeSelected] = useState(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const {
    reservaState,
    valuesRange,
    flagReserva,
    setFlagReserva,
    setValuesRange,
  } = useReservasContext();
  const [ciudadSelect, setCiudadSelect] = useState("");
  const [provinciaSelect, setProvinciaSelect] = useState("");

  useEffect(() => {
    traigoCiudades();
    getProvincia();
    getProduct(idProducto);
  }, [fueValorado]);

  const handleChangeSedeSelected = (e) => {
    const selectedIdSede = {
      idSede: parseInt(
        e.target.options[e.target.selectedIndex].getAttribute("data-idSede")
      ),
      direccion: e.target.options[e.target.selectedIndex].text,
    };

    setsedeSelected(selectedIdSede);
  };

  const handleBookingInstrument = (event) => {
    event.preventDefault();

    const nonFalseValidation =
      !parseInt(idProducto, 10) ||
      new Date(valuesRange[0]) === undefined ||
      new Date(valuesRange[1]) === undefined ||
      !productState.productDetail.precio ||
      !idUsuario ||
      sedeSelected === null;

    if (nonFalseValidation) {
      Swal.fire({
        icon: "info",
        text: "Revise que haya seleccionado todos los campos requeridos.",
        confirmButtonColor: "#F0572D",
      });
    } else {
      bookingInstrument();
    }
  };

  console.log(sedeSelected?.idSede);
  const fechaDetalleReserva = (fechaObtenida) => {
    let fecha = "";
    if (typeof fechaObtenida === "object") {
      let dia = fechaObtenida.day;
      let mes = fechaObtenida.monthIndex + 1; //month?.number;
      let año = fechaObtenida.year;
      fecha = `${dia < 10 ? `0${dia}` : dia}-${
        mes < 10 ? `0${mes}` : mes
      }-${año}`;
    }
    if (typeof fechaObtenida === "string") {
      let stringToArr = fechaObtenida.split("-");
      fecha = stringToArr.reverse().join("-");
    }

    return fecha;
  };

  const bookingInstrument = () => {
    const fecha = new Date(valuesRange[0]); // Supongamos que tienes una fecha

    const año = fecha.getFullYear(); // Obtiene el año de la fecha
    const mes = (fecha.getMonth() + 1).toString().padStart(2, "0"); // El método getMonth() devuelve el mes, pero los meses van de 0 a 11, por lo que se le suma 1
    const dia = (fecha.getDate() + 1).toString().padStart(2, "0"); // Obtiene el día del mes

    const fechaFin = new Date(valuesRange[1]);
    console.log(fechaFin);

    const añoFin = fechaFin.getFullYear(); // Obtiene el año de la fecha
    const mesFin = (fechaFin.getMonth() + 1).toString().padStart(2, "0"); // El método getMonth() devuelve el mes, pero los meses van de 0 a 11, por lo que se le suma 1
    const diaFin = (fechaFin.getDate() + 1).toString().padStart(2, "0"); // Obtiene el día del mes

    const fechaInicio = `${año}-${mes}-${dia}`;
    const fechaFinal = `${añoFin}-${mesFin}-${diaFin}`;

    const data = {
      idProducto: parseInt(idProducto, 10),
      fechaInicioReserva: fechaInicio,
      fechaFinReserva: fechaFinal,
      precioReserva: productState.productDetail.precio,
      idUsuario: idUsuario,
      idSede: sedeSelected?.idSede,
    };
    const payload = data;

    const url = baseURL + "/api/v1/reserva";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.status); // Lanzar una excepción en caso de que el estado de la respuesta no sea 200
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        Swal.fire({
          icon: "success",
          title: "Reserva realizada",
          text: "Reserva realizada exitosamente",
          confirmButtonColor: "#F0572D",
        });
        setValuesRange([]);
        setsedeSelected(null);
        setFlagReserva(true);
      })

      .catch((error) => {
        Swal.fire({
          icon: "error",
          text: "Ha ocurrido un error con su reserva, intente de nuevo. Verifique que haya completado todos los campos requeridos",
          confirmButtonColor: "#F0572D",
        });
      });
  };

  return (
    <>
      {isLogged && (
        <div>
          <ButtonNavigate />
          <div className={styles.locationInstrumentBooking}>
            <Ubication />
          </div>
          <p className={styles.titleData}>Tus datos:</p>
          <div className={styles.containerPrincipalBooking}>
            <div className={styles.containerBookingLeft}>
              <div className={styles.containerShowDataUserBooking}>
                <div className={styles.containerBookingDataUser}>
                  <p className={styles.userSpecificData}>Nombre</p>
                  <div className={styles.containerBookingGetDataUser}>
                    {`${firstName}`}
                  </div>
                </div>
                <div className={styles.containerBookingDataUser}>
                  <p className={styles.userSpecificData}>Apellido</p>
                  <div className={styles.containerBookingGetDataUser}>
                    {`${lastName}`}
                  </div>
                </div>
                <div className={styles.containerBookingDataUser}>
                  <p className={styles.userSpecificData}>Correo Electrónico</p>
                  <div className={styles.containerBookingGetDataUser}>
                    {`${email}`}
                  </div>
                </div>
              </div>
              <div className={styles.containerSelect}>
                <p className={styles.titleData}>
                  Selecciona la sede de la reserva:
                </p>
                <select
                  name="sede"
                  className={styles.select}
                  onChange={handleChangeSedeSelected}
                >
                  <option hidden>Seleccionar la sede</option>
                  {productoSedes.map((sede, index) => (
                    <option
                      data-idSede={sede.idSede}
                      value={`${sede.direccion} `}
                      key={sede.idSede}
                    >
                      <div className={styles.ubicationDetailInstrumentBooking}>
                        <p>{sede.direccion}, </p>
                        {ciudadesState.ciudadesList.map((ciudad) => {
                          if (ciudad.idCiudad === sede.idCiudad) {
                            return <p>{ciudad.ciudad}, </p>;
                          }
                        })}
                        {provinces.map((provincia) => {
                          if (provincia.idProvincia === sede.idProvincia)
                            return <p>{provincia.provincia}, </p>;
                        })}
                        <p>Argentina.</p>
                      </div>
                    </option>
                  ))}
                </select>
              </div>
              <div className={styles.containerModifyDataUserBooking}>
                <p className={styles.titleData}>
                  Selecciona tu fecha de reserva:
                </p>
                <CalendarAvailableDates showReserves={false} />
              </div>

              <BloqueDePoliticas />
            </div>
            <div className={styles.containerDetailBooking}>
              <div className={`${styles.divDetailBooking} ${stylesText.title}`}>
                Detalle de la reserva
              </div>
             
              <Swiper
                style={{
                  "--swiper-navigation-color": "#D9D9D9",
                  "--swiper-pagination-color": "#D9D9D9",
                  width: "100%",
                  position: "relative",
                  zIndex: "0",
                }}
                spaceBetween={2}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper2"
              >
                {listaImagenes.map((imagen) => (
                  <SwiperSlide key={imagen?.imagen?.idImagen}>
                    <img
                      className={styles.imgBookingPage}
                      src={imagen?.imagen?.urlImagen}
                      alt="foto instrumento"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>

              <div className={styles.headerDatesInstrumentBooking}>
                <div className={styles.containerValoracion}>
                  <div className={styles.nameInstrument}>Instrumento</div>
                  <div className={styles.nameInstrumentId}>
                    {productState.productDetail.nombre}
                  </div>
                </div>

                <div className={styles.containerValoracion}>
                  <div className={styles.valoracionProductBooking}>
                    <ValoracionProducto producto={productState.productDetail} />
                  </div>
                </div>
              </div>
              {sedeSelected && (
                <div className={styles.ubicationDetailBooking}>
                  <i className={`${"bi bi-geo-alt-fill"} ${stylesText.i}`}></i>
                  <p>{sedeSelected.direccion}</p>
                </div>
              )}

              <>
                <p>
                  {valuesRange[0] ? (
                    `Desde: ${fechaDetalleReserva(valuesRange[0])}`
                  ) : (
                    <span> Desde: _____/___/___</span>
                  )}
                </p>
                <p>
                  {valuesRange[1] ? (
                    `Hasta: ${fechaDetalleReserva(valuesRange[1])}`
                  ) : (
                    <span> Hasta: _____/___/___</span>
                  )}
                </p>
              </>
              <div className={styles.descriptionInstrumentBookingPage}>
                {productState.productDetail.descripcion}
              </div>

              <div className={styles.btnBooking}>
                <button
                  className={styleBtn.buttonSubmit}
                  onClick={handleBookingInstrument}
                >
                  Reservar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Booking;
