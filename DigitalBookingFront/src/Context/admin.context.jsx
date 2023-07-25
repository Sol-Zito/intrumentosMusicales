import { createContext, useContext, useReducer, useState } from "react";
import { useGlobalStates } from "./global.context";
import Swal from "sweetalert2";

import config from "../../env-config.js";

const baseURL = config.API_URL;

const ContextGlobalAdmin = createContext();

const initialState = { newProduct: {} };

const initialStateCategory = { categoryDetail: {} };

const createProductReducer = (state, action) => {
  switch (action.type) {
    case "CREAR_NOMBRE":
      return { ...state, nombre: action.payload };
    case "CREAR_DESCRIPCION":
      return { ...state, descripcion: action.payload };
    case "CREAR_PRECIO":
      return { ...state, precio: action.payload };
    case "CREAR_ID_CATEGORIA":
      return { ...state, idCategoria: action.payload };
    case "CREAR_INDICADOR_HABILITADO":
      return { ...state, indicadorHabilitado: action.payload };
    case "CREAR_MARCA":
      return { ...state, marca: action.payload };
    case "CREAR_MODELO":
      return { ...state, modelo: action.payload };
    case "ES_ELECTRICO":
      return { ...state, esElectrico: action.payload };
    case "TIENE_PROTECTOR":
      return { ...state, tieneProtector: action.payload };
    case "LISTA_IMAGENES":
      return { ...state, listasIdsImagen: action.payload };
    case "SEDES":
      return { ...state, listaIdsSedes: action.payload };
    default:
      throw new Error();
  }
};

const createCategoryReducer = (state, action) => {
  switch (action.type) {
    case "CREAR_NOMBRE":
      return { ...state, nombre: action.payload };
    case "CREAR_DESCRIPCION":
      return { ...state, descripcion: action.payload };
    case "CREAR_ID_CATEGORIA":
      return { ...state, idCategoria: action.payload };
    case "CREAR_CODIGO":
      return { ...state, codigo: action.payload };
    case "CREAR_INDICADOR_HABILITADO":
      return { ...state, indicadorHabilitado: action.payload };
    case "CREAR_ID_IMAGEN":
      return { ...state, idImagen: action.payload };
    case "CREAR_URL_IMAGEN":
      return { ...state, urlImagen: action.payload };

    default:
      throw new Error();
  }
};
const listEveryProducts = { productList: [] };

const listEveryProductsReducer = (state, action) => {
  switch (action.type) {
    case "GET_PRODUCTS_TODOS":
      return {
        ...state,
        productList: action.payload,
      };
    default:
      throw new Error();
  }
};

const ContextProvider = ({ children }) => {
  const { productState, productDispatch } = useGlobalStates();
  const [newState, createProductDispatch] = useReducer(
    createProductReducer,
    initialState
  );

  const [stateCategory, dispatchCategory] = useReducer(
    createCategoryReducer,
    initialStateCategory
  );
  const { flagProduct, setFlagProduct, setLoading, pageProduct } =
    useGlobalStates();

  const [productoLista, productosListaDispatch] = useReducer(
    listEveryProductsReducer,
    listEveryProducts
  );
 
  const [flagCategoria, setflagCategoria]= useState(true)
  /* ----------------------------Obtener lista de todos los productos ----------------------------*/
  const listaTodosProductos = () => {

    const url = baseURL + "/api/v1/producto/buscarTodos";
    setLoading(true);
    fetch(url, {
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
        productosListaDispatch({ type: "GET_PRODUCTS_TODOS", payload: data });
        setLoading(false);
      });
  };

  /* ----------------------------Obtener lista de productos ----------------------------*/
  const getProductListTodos = () => {
console.log(pageProduct)
    const url = baseURL + "/api/v1/producto/buscarTodos";
    setLoading(true);
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        pagina: pageProduct,
        cantidad: 10,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        productDispatch({ type: "GET_PRODUCTS", payload: data });
        setLoading(false);
      });
  };
  /* ----------------------------Borrar Producto----------------------------*/

  const deleteProduct = (idProducto) => {
    setFlagProduct(true);
    let url = baseURL + "/api/v1/producto/" + idProducto;
    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then(() => {
      Swal.fire({
        icon: "success",
        title: "Eliminado",
        text: "Producto Eliminado exitosamente",
        confirmButtonColor: "#F0572D",
      });
      setFlagProduct(false);
    });
  };
 /* ----------------------------Eliminar categoria----------------------------*/
  const deleteCategoria = (idCategoria) => {
    setflagCategoria(true);
    let url = baseURL + "/api/v1/categoria/" + idCategoria;
    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then(() => {
      Swal.fire({
        icon: "success",
        title: "Eliminada",
        text: "Categoria Eliminada exitosamente",
        timer: 2000,
      backdrop: "rgb(64, 64, 64 )" ,
      didOpen: () => {
        Swal.showLoading()
        let timerInterval = setInterval(() => {
         Swal.getTimerLeft()
        }, 100)
      },
    });

      setflagCategoria(false);
    });
  };


  return (
    <ContextGlobalAdmin.Provider
      value={{
        newState,
        createProductDispatch,
        productState,
        getProductListTodos,
        productDispatch,
        stateCategory,
        dispatchCategory,
        flagProduct,
        setFlagProduct,
        deleteProduct,
        productoLista,
        productosListaDispatch,
        listaTodosProductos,
        deleteCategoria,
        flagCategoria
      }}
    >
      
          {children}
    </ContextGlobalAdmin.Provider>
  );
};

export default ContextProvider;
export const useGlobalStatesAdmin = () => useContext(ContextGlobalAdmin);
