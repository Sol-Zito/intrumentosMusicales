import React from "react";
import { Link } from "react-router-dom";
import styles from "../Styles/Admin.module.css";
import { useReservasContext } from "../Context/reservascalendar";
import { useGlobalStatesAdmin } from "../Context/admin.context";

export const Reservashistorial = () => {
  const { reservaState } = useReservasContext();
  const { productoLista } = useGlobalStatesAdmin();

  let reservas = reservaState.reservasUsuario;

  let filtroProductoPorId = (idRe) => {
    let productoObtenido = productoLista?.productList.find(
      (producto) => producto.idProducto == idRe
    );
    return productoObtenido;
  };

  return (
    <div className={styles.containerAdminPanel}>
      {reservas.length > 0 ? (
        <>
          <table className={styles.table}>
            <thead className={styles.thead}>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Producto</th>
                <th scope="col">Precio</th>
                <th scope="col">Fecha Inicio</th>
                <th scope="col">Fecha Fin</th>
                <th scope="col">Detalles del producto</th>
              </tr>
            </thead>
            <tbody className={styles.tbody}>
              {reservas.map((elemento, index) => {
                return (
                  <tr key={elemento.idReserva}>
                    <td>{index + 1}</td>
                    <td>
                      <Link
                        to={`/ProductDetail/${elemento.idProducto}`}
                        style={{ color: "white" }}
                      >
                        {filtroProductoPorId(elemento.idProducto).nombre}
                      </Link>
                    </td>
                    <td>${elemento.precioReserva}</td>
                    <td>
                      {new Date(
                        elemento.fechaInicioReserva
                      ).toLocaleDateString()}
                    </td>
                    <td>
                      {new Date(elemento.fechaFinReserva).toLocaleDateString()}
                    </td>
                    <td>
                      <Link
                        to={`/ProductDetail/${elemento.idProducto}`}
                        style={{ color: "white" }}
                      >
                        Ver producto...
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      ) : (
        <div style={{ height: "60vh" }}>
          <h2 style={{ textAlign: "center" }}>Aun no se han creado reservas</h2>
        </div>
      )}
    </div>
  );
};
