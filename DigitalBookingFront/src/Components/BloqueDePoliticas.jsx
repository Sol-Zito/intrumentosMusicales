import React from "react";

import stylesDetail from "../Styles/BloquePoliticas.module.css";

export const BloqueDePoliticas = () => {
  return (
    <div className={stylesDetail.contenedor}>
      <h2 className={stylesDetail.title}>¿Qué tenés que saber?</h2>
      <div className={stylesDetail.divider}></div>
      <div className={stylesDetail.contenedorPoliticas}>
        <div className={stylesDetail.itemPoliticas}>
          <h4>Políticas de alquiler:</h4>
          <p>
            La formalización del contrato de alquiler se llevará a cabo personal
            y físicamente en el punto asociado a DigitalBooking que desees.
          </p>
          <p>
            Para cualquier cambio, reparación o devolución deberás dirigirte al
            mismo punto asociado a DigitalBooking.
          </p>
        </div>
        <div className={stylesDetail.itemPoliticas}>
          <h4>Cambio de instrumento:</h4>
          <p>
            Ya sea porque el instrumento alquilado no te guste y quieras probar otro tipo,
            o porque se te ha quedado física o cualitativamente pequeño, DigitalBooking te
            permite hacer un cambio de instrumento sin coste alguno.
          </p>
        </div>
        <div className={stylesDetail.itemPoliticas}>
          <h4>Política de cancelación:</h4>
          <p>El tiempo de cancelación es de una semana antes de la reserva.</p>
          <p>
            En caso de no poder acudir/avisar a tiempo no se devolverá el
            dinero, tomándolo como parte de daños y perjuicios.
          </p>
        </div>
      </div>
    </div>
  );
};
