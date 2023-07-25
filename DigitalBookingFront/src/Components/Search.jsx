import React, { useEffect, useRef, useState } from "react";
import styles from "../Styles/Search.module.css";
import stylesText from "../Styles/Text.module.css";
import DatePicker from "react-multi-date-picker";
import InputIcon from "react-multi-date-picker/components/input_icon";
import "react-multi-date-picker/styles/layouts/mobile.css";
import "react-multi-date-picker/styles/colors/red.css";
import { ciudadesContext } from "../Context/ciudades.context";
import { useGlobalStatesAdmin } from "../Context/admin.context";
import Swal from "sweetalert2";
import { useReservasContext } from "../Context/reservascalendar";

const Search = () => {
  const { ciudadesState, ciudadesDispatch, traigoCiudades } = ciudadesContext();
  const { productoLista, listaTodosProductos, productState } =
    useGlobalStatesAdmin();
  // datos para el calendario
  const {
    reservaState,
    reservasTodas,
    weekDays,
    months,
    valuesRange,
    setValuesRange,
  } = useReservasContext();
  let fechaActual = new Date(Date.now());
  let todasReservas = reservaState.reservasLista;
  const [fechaSelect, setFechaSelect] = useState([]);

  //Data ciudad
  let ciudadesApi = ciudadesState.ciudadesList;
  const [ciudadSelect, setciudadSelect] = useState(0);

  // autocomplete
  let selectRef = useRef();
  const [ciudadSelectName, setciudadSelectName] = useState("");
  const [vistaLista, setVistaLista] = useState(false);

  const cambioValores = (e) => {
    setciudadSelect(e.target.value);
    let ciudadName = ciudadesApi.find(
      (elemento) => elemento.idCiudad == e.target.value
    );
    setciudadSelectName(ciudadName.ciudad);
    setVistaLista(false);
  };

  // funcionalidad para buscar resultados
  const validacionDeBusqueda = (res) => {
    if (res.length > 0) {
      ciudadesDispatch({
        type: "SET_RESULTADO",
        payload: res,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No se encontraron registros!",
      });
      ciudadesDispatch({
        type: "SET_RESULTADO",
        payload: [],
      });
    }
  };

  /*--------busca por fecha---------- */
  function buscaPorFecha(valuesRange) {
    let fechaInicio = valuesRange[0].toDate();
    let fechaFin = valuesRange[1]?.toDate();
    let filtroFecha = todasReservas.filter((elemento) =>
      valuesRange.some(
        (range) =>
          (elemento[0] >= fechaInicio && elemento[0] <= fechaFin) ||
          (elemento[1] >= fechaInicio && elemento[1] <= fechaFin) ||
          (elemento[0] < fechaInicio && elemento[1] > fechaFin)
      )
    );
    let filtroPorId = productoLista.productList.filter((producto) =>
      filtroFecha.every((elemento) => producto.idProducto != elemento[2])
    );
    return filtroPorId;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (ciudadSelect == 0 && valuesRange.length < 0 && fechaSelect.length < 0) {
      Swal.fire({
        icon: "info",
        text: "Debe completar correctamente los campos.",
      });
    } else if (
      ciudadSelect > 0 &&
      valuesRange.length > 0 &&
      fechaSelect.length > 0
    ) {
      //busca por fecha y luego por ciudad
      let filtradoPorFechas = buscaPorFecha(valuesRange);
      let resCiudad = filtradoPorFechas.filter((element) =>
        element.sede.some((ciudad) => ciudad.idCiudad == ciudadSelect)
      );
      validacionDeBusqueda(resCiudad);
      reset(event);
    } else if (ciudadSelect > 0 && fechaSelect.length <= 0) {
      //busca por ciudad
      let filtradoPorCiudad = productoLista.productList.filter((element) =>
        element.sede.some((ciudad) => ciudad.idCiudad == ciudadSelect)
      );
      validacionDeBusqueda(filtradoPorCiudad);
      reset(event);
    } else if (
      ciudadSelect <= 0 &&
      valuesRange.length > 0 &&
      valuesRange[0].isValid &&
      fechaSelect.length > 0
    ) {
      //busca por fecha
      let filtradoDeFechas = buscaPorFecha(valuesRange);
      validacionDeBusqueda(filtradoDeFechas);
      reset(event);
    }
  };

  // reset form
  const reset = (event) => {
    setciudadSelect(0);
    setciudadSelectName("");
    setFechaSelect([]);
    event.target.reset();
  };

  useEffect(() => {
    traigoCiudades();
    listaTodosProductos();
    reservasTodas();
  }, []);

  return (
    <div className={stylesText.containerTitle}>
      <h2 className={stylesText.searchTitle}>
        Busca todos los instrumentos en un solo lugar
      </h2>
      <form
        className={styles.containerForm}
        onSubmit={(event) => handleSubmit(event)}
      >
        <div className={styles.containerSearch}>
          <div className={styles.contenedorInputCiudad}>
            <input
              className={styles.inputSearch}
              value={ciudadSelectName || "Seleccione una ciudad"}
              type="button"
              onClick={() => setVistaLista(!vistaLista)}
            />
            {vistaLista == true && (
              <div className={styles.contenedorLista}>
                <select
                  ref={selectRef}
                  className={styles.lista}
                  name="ciudadElegida"
                  onClick={(e) => cambioValores(e)}
                  size={ciudadesApi.length < 5 ? ciudadesApi.length : 5}
                >
                  {ciudadesApi.map((elemento) => (
                    <option key={elemento.idCiudad} value={elemento.idCiudad}>
                      {elemento.ciudad}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
          <div className="calendarDesk">
            <DatePicker
              className="orange rmdp-mobile"
              calendarPosition="bottom-center"
              value={fechaSelect}
              onChange={(event) => {
                setValuesRange(event);
                setFechaSelect(event);
              }}
              minDate={fechaActual}
              maxDate="2023-09-30"
              format="YYYY-MM-DD"
              range
              dateSeparator="~"
              weekDays={weekDays}
              months={months}
              render={<InputIcon />}
              numberOfMonths={2}
              inputClass="custom-input"
              placeholder="Check in - Check out"
            />
          </div>
          <div className="calendarmobile">
            <DatePicker
              placeholder="Check in - Check out"
              className="rmdp-mobile orange"
              mobileLabels={{
                OK: "Aceptar",
                CANCEL: "Cerrar",
              }}
              value={fechaSelect}
              minDate={fechaActual}
              maxDate="2023-09-30"
              onChange={(event) => {
                setValuesRange(event);
                setFechaSelect(event);
              }}
              format="YYYY-MM-DD"
              range
              dateSeparator="~"
              weekDays={weekDays}
              months={months}
              render={<InputIcon />}
              inputClass="custom-input"
            />
          </div>
          <button className={styles.btnSearch} type="submit">
            <i className="fa fa-search" aria-hidden="true"></i>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Search;
