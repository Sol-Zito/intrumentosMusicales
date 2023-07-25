import React, { useState } from "react";
import {
  codigoValido,
  descripcionCatValida,
  errorMensajes,
  imgValida,
  nombreValido,
} from "./ValidacionesDeForm";
import { useGlobalStatesAdmin } from "../Context/admin.context";
import { useGlobalStates } from "../Context/global.context";
import styles from "../Styles/Admin.module.css";
import stylesButton from "../Styles/Button.module.css";
import config from '../../env-config.js';
import Swal from "sweetalert2";

const baseURL = config.API_URL;

const FormCategory = () => {
  let imgPrevisual = document.getElementById("previstaImg");
  const [imageCategory, setImageCategory] = useState(null);
  const { stateCategory, dispatchCategory } = useGlobalStatesAdmin();
  const { flagCategory, setFlagCategory } = useGlobalStates();

  console.log(stateCategory);

  const handleChangeName = (event) => {
    dispatchCategory({ type: "CREAR_NOMBRE", payload: event.target.value });
  };

  const handleChangeDescription = (event) => {
    dispatchCategory({
      type: "CREAR_DESCRIPCION",
      payload: event.target.value,
    });
  };
  const handleChangeCodigo = (event) => {
    dispatchCategory({ type: "CREAR_CODIGO", payload: event.target.value });
  };

  const handleChangeImage = (event) => {
    event.preventDefault();
    setImageCategory(event.target.files[0]);
  };

  const handleSubmitCategory = (event) => {
    event.preventDefault();
    const { codigo, nombre, descripcion, idImagen } = stateCategory;
    if (
      !codigoValido(codigo) &&
      !nombreValido(nombre) &&
      !descripcionCatValida(descripcion)
    ) {
      Swal.fire({
        icon: "info",
        title: "Imágenes",
        text: "Corrobore los campos a completar",
        confirmButtonColor: "#F0572D", 
      })


    } else if (
      !codigoValido(codigo) ||
      !nombreValido(nombre) ||
      !descripcionCatValida(descripcion) ||
      !imgValida(idImagen, 1)
    ) {
      Swal.fire({
        icon: "info",
        title: "Imágenes",
        text: errorMensajes.mensaje,
        confirmButtonColor: "#F0572D", 
      })
    
    } else {
      createCategory(event);
      console.log("todos pasaron");
    }
  };

  function modBtnImg() {
    let btn = document.getElementById("subirImg");
    btn.classList.add(stylesButton.btnDisabled);
    btn.classList.remove(stylesButton.buttonSubirImagen);
    btn.setAttribute("disabled", "");
  }

  const uploadImageCategory = (event) => {
    event.preventDefault();
    Swal.fire({
      icon: "info",
      title: "Imágenes",
      text: "Por favor espere a visualizar las imagenes",
      confirmButtonColor: "#F0572D", 
    })
    modBtnImg();
    const url = baseURL + "/api/v1/imagen/upload";

    if (imageCategory) {
      const formData = new FormData();
      formData.append("imagen", imageCategory);

      fetch(url, {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "http://localhost:5173",
        },
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          let idimageCategory = data.idImagen;
          let urlimageCategory = data.urlImagen;
          dispatchCategory({
            type: "CREAR_URL_IMAGEN",
            payload: urlimageCategory,
          });
          dispatchCategory({
            type: "CREAR_ID_IMAGEN",
            payload: idimageCategory,
          });
          console.log("data de imagen", data);
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Ha ocurrido un error",
            confirmButtonColor: "#F0572D", 
          })
      
          console.log("ha ocurrido un error: ", error);
        });
    }
  };

  const createCategory = (event) => {
    const url = baseURL + "/api/v1/categoria";
    fetch(
      url,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(stateCategory),
      },

    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Hubo un error creando la categoría, por favor intente más tarde",
              confirmButtonColor: "#F0572D", 
            })
          
          );
        }
        return response.json();
      })
      .then((data) => {
        Swal.fire({
          icon: "success",
          title: "Categoría agregada",
          text: "Categoría agregada exitosamente",
          confirmButtonColor: "#F0572D", 
        })
      
      
        event.target.reset();
        setImageCategory([]);
        setFlagCategory(!flagCategory);
        imgPrevisual.classList.add("disabled");
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={styles.formProducto}>
       <form className={styles.form} onSubmit={handleSubmitCategory}>
        <div className={styles.container} style={{ alignItems: "stretch" }}>
          <div className={styles.containerInput}>
            <label className={styles.label} htmlFor="name">
              Nombre de la categoria:
            </label>
            <input
              className={styles.select}
              id="name"
              name="name"
              type="text"
              onChange={handleChangeName}
              value={stateCategory.categoryDetail?.nombre}
            />
          </div>
          <div className={styles.containerInput}>
            <label className={styles.label} htmlFor="descripcion">
              Descripción de la categoría:
            </label>
            <input
              className={styles.select}
              id="descripcion"
              name="descripcion"
              type="text"
              onChange={handleChangeDescription}
              value={stateCategory.categoryDetail?.descripcion}
            />
          </div>
          <div className={styles.containerInput}>
            <label className={styles.label} htmlFor="codigo">
              Código de la categoría:
            </label>
            <input
              className={styles.select}
              id="codigo"
              name="codigo"
              type="text"
              onChange={handleChangeCodigo}
              value={stateCategory.categoryDetail?.codigo}
            />
          </div>
          <div>
            <div className={styles.containerImage}>
              <div>
                <img
                  id="previstaImg"
                  className={styles.previstaImagen}
                  src={stateCategory.urlImagen}
                ></img>
              </div>
              <div>
                <input
                  className={styles.inputTypeFile}
                  type="file"
                  id="myFileInput"
                  accept="image/*"
                  onChange={handleChangeImage}
                  name="Subir"
                />

                <label
                  htmlFor="myFileInput"
                  className={stylesButton.customFileUpload}
                >
                  Seleccionar imagen
                </label>

                <p>{imageCategory?.name}</p>
                <button
                  id="subirImg"
                  className={stylesButton.buttonSubirImagen}
                  onClick={uploadImageCategory}
                >
                  Subir imagen
                </button>
              </div>
            </div>
          </div>
          <div className={styles.decisionButtons}>
            <input
              className={stylesButton.buttonSubmit}
              type="submit"
              value="Agregar"
            />
            <input
              className={stylesButton.buttonSubmit}
              type="reset"
              value="Cancelar"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormCategory;
