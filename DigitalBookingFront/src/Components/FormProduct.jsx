import React, { useEffect, useRef, useState } from 'react'
import styles from "../Styles/Admin.module.css";
import stylesButton from "../Styles/Button.module.css";
import {
    descripcionProductValido,
    errorMensajes,
    imgValida,
    marcaProductValida,
    modeloProductValido,
    nombreProductValida,
  } from "./ValidacionesDeForm";
import { useGlobalStatesAdmin } from '../Context/admin.context';
import { useGlobalStates } from '../Context/global.context';
import Swal from 'sweetalert2';
import config from '../../env-config.js';
import { useContextSede } from '../Context/sedes.context';

const baseURL = config.API_URL;

const FormProduct = () => {
    const [imagen, setImage] = useState([]);
    const [urlImagenes, setUrlImagenes] = useState([]);
    const { newState, createProductDispatch, isChecked, setIsChecked} = useGlobalStatesAdmin();
    const { categoryState, setFlagProduct, flagCategory, getCategorys} = useGlobalStates();
    const {getListSedes, listSedes} = useContextSede()
    let selectRef = useRef();
    const [vistaLista, setVistaLista] = useState(false);
    const [nombreCategoriaElegida, setNombreCategoriaElegida] = useState(null)

    useEffect(() => {
      getCategorys();
      getListSedes();
    }, [flagCategory]);

    const handleChangeName = (event) => {
      createProductDispatch({
        type: "CREAR_NOMBRE",
        payload: event.target.value,
      });
    };
  
    const handleChangeDescription = (event) => {
      createProductDispatch({
        type: "CREAR_DESCRIPCION",
        payload: event.target.value,
      });
    };
    const handleChangePrecio = (event) => {
      createProductDispatch({
        type: "CREAR_PRECIO",
        payload: event.target.value,
      });
    };
  
    const handleChangeIdCategoria = (event) => {
      createProductDispatch({
        type: "CREAR_ID_CATEGORIA",
        payload:  event.target.value,       
      });
      setNombreCategoriaElegida(event.target.options[event.target.selectedIndex].text) 
      setVistaLista(false)
      
    };
  
    const handleChangeModelo = (event) => {
      createProductDispatch({
        type: "CREAR_MODELO",
        payload: event.target.value,
      });
    };
    const handleChangeMarca = (event) => {
      createProductDispatch({ type: "CREAR_MARCA", payload: event.target.value });
    };
  
    const handleChangeElectrico = (event) => {
      createProductDispatch({
        type: "ES_ELECTRICO",
        payload: event.target.value,
      });
    };
    const handleChangeProtector = (event) => {
      createProductDispatch({
        type: "TIENE_PROTECTOR",
        payload: event.target.value,
      });
    };
    
    const [sedesSeleccionadas, setSedesSeleccionadas]= useState([])
    const [sedesFiltradas, setSedesFiltradas] = useState([])
    

    const handleOnChange = (e) => {
       setSedesSeleccionadas({
        ...sedesSeleccionadas,
        [e.target.value]: e.target.checked,

       })


        if(e.target.checked){
          const resultadosSedes = listSedes.filter(item => item.sede === e.target.value)
   
          setSedesFiltradas([
            ...sedesFiltradas,
            ...resultadosSedes
        ])
    
        }else{
          const resultadosSedes = listSedes.filter(item=> item.sede !== e.target.value)
          setSedesFiltradas([
               ...resultadosSedes
          ])
        
        }
   

    }
   
   // Declarar el array fuera del bucle map()
   const handleIdSedes = ()=>{
    const listId = [];

    sedesFiltradas.map((sede) => {
      let idSede = sede.idSede;
      listId.push(idSede) // Agregar el idSede al array listId
      
    });
  

    createProductDispatch({
      type: "SEDES",
      payload: listId,
    });

  }


  


    const handleChangeImage = (event) => {
      handleIdSedes()
      const files = event.target.files;
      const filesArray = Array.from(files);
      setImage([...imagen, ...filesArray]);
    };
  
    const handleSubmitInstrument = (event) => {
      event.preventDefault();
      const {
        nombre,
        descripcion,
        precio,
        idCategoria,
        indicadorHabilitado,
        marca,
        modelo,
        esElectrico,
        tieneProtector,
        listasIdsImagen,
      } = newState;
  
      if (
        !nombreProductValida(nombre) &&
        !descripcionProductValido(descripcion) &&
        precio == null &&
        idCategoria == null &&
        !marcaProductValida(marca) &&
        !modeloProductValido(modelo) &&
        esElectrico == null &&
        tieneProtector == null &&
        !imgValida(listasIdsImagen, 5)
      ) {
        Swal.fire({
          icon: "error",
          title: " Completar",
          text: "Corrobore los campos a completar",
          confirmButtonColor: "#F0572D", 
        })
      
      } else if (
        !nombreProductValida(nombre) ||
        !descripcionProductValido(descripcion) ||
        precio < 0 ||
        precio == null ||
        idCategoria == null ||
        !marcaProductValida(marca) ||
        !modeloProductValido(modelo) ||
        esElectrico == null ||
        tieneProtector == null ||
        !imgValida(listasIdsImagen, 5)
      ) {
        if (esElectrico == null || tieneProtector == null) {
          Swal.fire({
            icon: "error",
            title: "Propiedades del producto",
            text: "Debe seleccionar las propiedades del producto",
            confirmButtonColor: "#F0572D", 
          })
         
        }
        if (idCategoria == null) {
          Swal.fire({
            icon: "error",
            title: "Categoría",
            text: "Debe elegir una categoria",
            confirmButtonColor: "#F0572D", 
          })
      
        }
        if (precio <= 0 || precio == null) {
          Swal.fire({
            icon: "error",
            title: "Precio",
            text: "El precio debe ser mayor a 0",
            confirmButtonColor: "#F0572D", 
          })
          
         
        } 
        if (sedesFiltradas == []) {
          Swal.fire({
            icon: "error",
            title: "Sede",
            text: "Debe seleccionar al menos una sede",
            confirmButtonColor: "#F0572D", 
          })
        
        } else if (
          !nombreProductValida(nombre) ||
          !descripcionProductValido(descripcion) ||
          !marcaProductValida(marca) ||
          !modeloProductValido(modelo) ||
          !imgValida(listasIdsImagen, 5)
        ) {
          
          Swal.fire({
            icon: "error",
            title: "Error",
            text: errorMensajes.mensaje,
            confirmButtonColor: "#F0572D", 
          })
          
         
        }
      } else {
        
        createProduct(event);
      }
    };
  
    const uploadImage = (event) => {
      event.preventDefault();
      Swal.fire({
        icon: "info",
        title: "Imágenes",
        text: "Por favor espere a visualizar las imagenes",
        confirmButtonColor: "#F0572D", 
        timer: 2000,
      })
     
      const url = baseURL + "/api/v1/imagen/upload/bulk";
       if (imagen.length > 0) {
        const formData = new FormData();
        imagen.forEach((file) => formData.append("imagen", file));
  
        fetch(url, {
          method: "POST",
          headers: {
            "Access-Control-Allow-Origin": "http://localhost:5173",
          },
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            let idImagenes = data.map((img) => img.idImagen);
            setUrlImagenes(data.map((img) => img.urlImagen));
            createProductDispatch({
              type: "LISTA_IMAGENES",
              payload: idImagenes,
            });
          })
  
          .catch((error) => {
            console.log("ha ocurrido un error: ", error);
          });
      }
    };
  
    const createProduct = (event) => {
      const url = baseURL + "/api/v1/producto/";
      fetch(
        url,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newState),
        },
       
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              Swal.fire({
                icon: "error",
                title: "Producto no creado",
                text: "Hubo un error creando el producto, por favor intente más tarde",
                confirmButtonColor: "#F0572D", 
              })
            
            );
          }
          return response.json();
        })
        .then((data) => {
      
          Swal.fire({
            icon: "success",
            title: "Producto agregado",
            text: "Producto agregado exitosamente",
            confirmButtonColor: "#F0572D", 
          })
        
          setFlagProduct(true);
          setUrlImagenes([]);
          setImage([]);
          event.target.reset();
        })
        .catch((error) => {
          console.log(error);
        });
    };
  
 
  return (
    <div className={styles.formProducto}>
       <form className={styles.form} onSubmit={handleSubmitInstrument}>
      <div className={styles.container}>
        <div className={styles.containerInput}>
          <label className={styles.label} htmlFor="name">
            Nombre del producto:
          </label>
          <input
            className={styles.select}
            id="name"
            name="name"
            type="text"
            onChange={handleChangeName}
            value={newState.newProduct?.nombre}
          />
        </div>
        <div className={styles.containerInput}>
          <label className={styles.label} htmlFor="marca">
            Marca:
          </label>
          <input
            className={styles.select}
            id="marca"
            name="marca"
            type="text"
            onChange={handleChangeMarca}
            value={newState.newProduct?.marca}
          />
        </div>
        <div className={styles.containerInput}>
          <label className={styles.label} htmlFor="modelo">
            Modelo:
          </label>
          <input
            className={styles.select}
            id="modelo"
            name="modelo"
            type="text"
            onChange={handleChangeModelo}
            value={newState.newProduct?.modelo}
          />
        </div>

        <div className={styles.containerInput}>
          <label className={styles.label} htmlFor="description">
            Descripción:
          </label>
          <textarea
            className={styles.select}
            row="4"
            col="50"
            id="description"
            name="description"
            type="text"
            onChange={handleChangeDescription}
            value={newState.newProduct?.descripcion}
          />
        </div>
        <div className={styles.containerInput}>
          <label className={styles.label} htmlFor="precio">
            Precio:
          </label>
          <input
            className={styles.select}
            id="precio"
            name="precio"
            type="number"
            min="0"
            onChange={handleChangePrecio}
            value={newState.newProduct?.precio}
          />
        </div>
        <div className={styles.containerInput}>
          <label className={styles.label} htmlFor="category">
            Categoría del producto:
          </label>
          <input
              className={styles.inputText}
              value={nombreCategoriaElegida || "Seleccione una categoría"}
              type="button"
              onClick={() => setVistaLista(!vistaLista)}
            />
      {vistaLista == true && (
          <select
            ref={selectRef}
            className={styles.select}
            id="category"
            onChange={handleChangeIdCategoria}
            size={3}
            name="category"
          >
          
            {categoryState.categoryList.map((categoryOption, index) => {
              return (
                <option
                  value={categoryOption.idCategoria}
                  key={index}
            
                >
                  {categoryOption.nombre}
                </option>
              );
            })}
          </select>
            )}
        </div>
        <div className={styles.containerInput}>
          <label className={styles.label} >
            Ubicación del producto:
          </label>
          <fieldset className={styles.inputText}>
            {<div>
              {listSedes.map((sede, index) =>{
                    return (
                    
                      <div
                        className={styles.inputRadio}
                        key={index}
                      >
                     
                        <input
                          type="checkbox"
                          id={sede.sede}
                          name="sede"
                          value={sede.sede}
                          onChange={handleOnChange}
                        />
                       <label htmlFor={sede.sede}> {sede.sede}</label>

                    </div>
                  
                    )
          
              })}
        
         </div> }
       </fieldset>
        </div>
        <div className={styles.containerInput}>
          <label className={styles.label}>
            Elige las propiedades adecuadas al producto:
          </label>
          <fieldset className={styles.inputText}>
            <div>
              <div
                className={styles.inputRadio}
                onChange={handleChangeElectrico}
              >
                <label className={styles.label} htmlFor="esElectrico">
                  ¿Es eléctrico?
                </label>
                <div>
                <input
                  type="radio"
                  id="esElectrico"
                  name="esElectrico"
                  value={true}
                />
                Sí
                <input
                  type="radio"
                  id="esElectrico"
                  name="esElectrico"
                  value={false}
                />
                No
                </div>
              </div>
            </div>
            <div>
              <div
                className={styles.inputRadio}
                id="esElectrico"
                onChange={handleChangeProtector}
              >
                <label className={styles.label} htmlFor="tieneProtector">
                  ¿Tiene protector?
                </label>
                <div>
                <input
                  type="radio"
                  id="tieneProtector"
                  name="tieneProtector"
                  value={true}
                />
                Sí
                <input
                  type="radio"
                  id="tieneProtector"
                  name="tieneProtector"
                  value={false}
                />
                No
                </div>
              </div>
            </div>
          </fieldset>
        </div>
        <div>
          <div className={styles.containerImage}>
            <div>
              {urlImagenes.map((url) => (
                <img className={styles.previstaImagenMini} src={url} />
              ))}
              <input
                className={styles.inputTypeFile}
                type="file"
                id="myFileInput"
                accept="image/*"
                onChange={handleChangeImage}
                name="Subir"
                multiple
              />
            </div>

            <div>
              {imagen.length > 4 ? (
                <ul>
                  {imagen.map((file, index) => (
                    <li className={styles.files} key={index}>
                      {file.name}
                    </li>
                  ))}
                </ul>
              ) : (
                <>
                <label
                  for="myFileInput"
                  className={stylesButton.customFileUpload}
                >
                  Seleccionar Imagen
                </label>
                <ul>
                {imagen.map((file, index) => (
                  <li className={styles.files} key={index}>
                    {file.name}
                  </li>
                ))}
              </ul>
                </>
              )}

              <button
                className={stylesButton.buttonSubirImagen}
                onClick={uploadImage}
              >
                Subir Imagen
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
            value="Cancelar"
            type="reset"
          />
        </div>
      </div>
    </form>
  </div>
  )
}

export default FormProduct