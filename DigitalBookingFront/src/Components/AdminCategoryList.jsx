import React, { useEffect, useState } from "react";
import styles from "../Styles/Admin.module.css";
import stylesButton from "../Styles/Button.module.css";
import { useGlobalStates } from "../Context/global.context";
import { useGlobalStatesAdmin } from "../Context/admin.context";

const AdminCategoryList = () => {
  const { flagCategoria, deleteCategoria } = useGlobalStatesAdmin();

  const { getCategorys, categoryState } = useGlobalStates();

  useEffect(() => {
    getCategorys();
  }, [flagCategoria]);

  return (
    <div className={styles.containerAdminPanel}>
      <div></div>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Categoría</th>
            <th scope="col">Imagen</th>
            <th scope="col">Descripcion</th>
            <th scope="col">Eliminar</th>
          </tr>
        </thead>

        <tbody className={styles.tbody}>
          {categoryState.categoryList.map((categoria, index) => {
            return (
              <tr key={categoria.idCategoria}>
                <td>{index + 1}</td>
                <td>{categoria.nombre}</td>
                <td>
                  <img
                    className={styles.previstaImagen}
                    src={categoria.urlImagen}
                    alt="imagen de categoria"
                  />
                </td>
                <td> {categoria.descripcion}</td>
                <td>
                  <button
                    id="eliminar"
                    className={stylesButton.buttonSinfondo}
                    onClick={() => deleteCategoria(categoria.idCategoria)}
                  >
                    <i className="bi bi-trash3"></i>
                    <span> Eliminar</span>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AdminCategoryList;
