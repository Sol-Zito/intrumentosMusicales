import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import config from "../../env-config.js";
import Swal from "sweetalert2";

const baseURL = config.API_URL;

const ContextGlobal = createContext();
const initialProductState = { productList: [], productDetail: {} };
const initialCategoryState = { categoryList: [], categoryDetail: [] };

const productReducer = (state, action) => {
  switch (action.type) {
    case "GET_PRODUCTS":
      return {
        productList: action.payload,
        productDetail: state.productDetail,
      };
    case "GET_PRODUCT":
      return { productDetail: action.payload, productList: state.productList };
    case "DELETE_PRODUCT":
      return {
        productDetail: action.payload,
        productList: state.productDetail,
      };
    case "UPDATE_PRODUCT":
      return {
        productDetail: action.payload,
        productList: state.productDetail,
      };
    default:
      throw new Error();
  }
};

const categoryReducer = (state, action) => {
  switch (action.type) {
    case "GET_CATEGORYS":
      return {
        categoryList: action.payload,
        categoryDetail: state.categoryDetail,
      };
    case "GET_CATEGORY":
      return {
        categoryDetail: action.payload,
        categoryList: state.categoryList,
      };
    default:
      throw new Error();
  }
};

const ContextProvider = ({ children }) => {
  const [productState, productDispatch] = useReducer(
    productReducer,
    initialProductState
  );
  const [categoryState, categoryDispatch] = useReducer(
    categoryReducer,
    initialCategoryState
  );
  const [flagCategory, setFlagCategory] = useState(false);
  const [flagProduct, setFlagProduct] = useState(false);
  const [flagUser, setFlagUser] = useState(false);
  const [loading, setLoading] = useState(false);
  const url = baseURL + "/api/v1/producto/aleatorio";
  const urlCategory = baseURL + "/api/v1/categoria/activas";
  const [pageProduct, setPageProduct] = useState(0);
  const [coordenadas, setCoordenadas] = useState({});
  const [ubication, setUbication] = useState({});
  const [productoObtenido, setProductoObtenido] = useState(false);
  const [position, setPosition] = useState(null);
  const [productoSedes, setProductoSedes] = useState([]);
  const [distanciaUserSede, setDistanciaUserSede] = useState("");
  const [userCoordinates, setUserCoordinates] = useState({ lat: 0, lon: 0 });
  const [listaImagenes, setListaImagenes] = useState([]);

  /* ----------------------------Obtener producto por ID----------------------------*/

  const getProduct = (idProducto) => {
    setLoading(true);
    let url = baseURL + "/api/v1/producto/" + idProducto;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        setProductoSedes(data.sede);
        data.sede.map((sede) =>
          setCoordenadas({
            lat: parseFloat(sede?.latitud),
            lng: parseFloat(sede?.longitud),
            nombreSede: sede?.sede,
            direccion: sede?.direccion,
            idCiudad: sede?.idCiudad,
            idProvincia: sede?.idProvincia,
          })
        );
        setListaImagenes(data.listaProductosImagenes);
        productDispatch({ type: "GET_PRODUCT", payload: data });
        setLoading(false);
        setProductoObtenido(true);
      });
  };

  /* ----------------------------Obtener ubicación de usuario ----------------------------*/
  const obtenerUbicacionUsuario = () => {
    if (!"geolocation" in navigator) {
      return alert(
        "Tu navegador no soporta el acceso a la ubicación. Intenta con otro"
      );
    }

    const onUbicacionConcedida = (ubicacion) => {
      const { latitude, longitude } = ubicacion.coords;
      setUserCoordinates({ lat: latitude, lon: longitude });
    };

    const onErrorDeUbicacion = (err) => {
      console.log("Error obteniendo ubicación: ", err);
    };

    const opcionesDeSolicitud = {
      enableHighAccuracy: false,
      maximumAge: 0,
      timeout: 5000,
    };
    // Solicitar
    navigator.geolocation.getCurrentPosition(
      onUbicacionConcedida,
      onErrorDeUbicacion,
      opcionesDeSolicitud
    );
  };
  /* ---------------------------Calcular distancia entre usuario y sede----------------------------*/
  const distance = (lat1, lon1) => {
    const earthRadiusInKm = 6371; // Radio de la Tierra en kilómetros
    const toRadians = (degrees) => {
      return (degrees * Math.PI) / 180;
    };

    const lat2 = userCoordinates.lat;
    const lon2 = userCoordinates.lon;

    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distanceInKm = earthRadiusInKm * c;
    setDistanciaUserSede(parseInt(distanceInKm));

    return parseInt(distanceInKm);
  };

  /* ----------------------------paginado de productos ----------------------------*/
  const upPageProduct = () => {
    setPageProduct(pageProduct + 1);
  };

  const downPageProduct = () => {
    setPageProduct(pageProduct - 1);
  };
  /* ----------------------------Obtener Lista de productos aleaotrios----------------------------*/
  const getProductList = () => {
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

  /* ----------------------------Obtener listado de categorías----------------------------*/
  const getCategorys = () => {
    setLoading(true);
    fetch(urlCategory)
      .then((response) => response.json())
      .then((data) => {
        categoryDispatch({ type: "GET_CATEGORYS", payload: data });
        setLoading(false);
      });
  };

  /* ----------------------------Obtener categoría por ID----------------------------*/
  const getCategory = (idCategoria) => {
    setLoading(true);
    let url2 = baseURL + "/api/v1/producto/paginable/categoria/" + idCategoria;
    fetch(url2, {
      method: "POST",
      body: JSON.stringify({
        pagina: 0,
        cantidad: 10,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        categoryDispatch({ type: "GET_CATEGORY", payload: data });
        setLoading(false);
      });
  };

  /*--------------------------Valoracion de productos------------------------*/
  const [fueValorado, setFueValorado] = useState(false);
  function cargarValoracion(data) {
    Swal.fire("Validando datos", "Aguarde un momento...");
    Swal.showLoading(Swal.getConfirmButton());
    const url = baseURL + "/api/v1/valoracion";
    fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        let mensaje = data.mensaje;
        setFueValorado(true);
        Swal.fire(
          `${mensaje ? mensaje : "Valoracion enviada exitosamente."}`,
          "",
          `${mensaje ? "warning" : "success"}`
        );
      });
  }

  return (
    <ContextGlobal.Provider
      value={{
        productState,
        getProduct,
        getProductList,
        productDispatch,
        categoryState,
        getCategorys,
        categoryDispatch,
        getCategory,
        flagCategory,
        setFlagCategory,
        flagProduct,
        setFlagProduct,
        loading,
        setLoading,
        url,
        urlCategory,
        flagUser,
        setFlagUser,
        pageProduct,
        setPageProduct,
        upPageProduct,
        downPageProduct,
        cargarValoracion,
        coordenadas,
        setUbication,
        ubication,
        position,
        setPosition,
        productoSedes,
        distanciaUserSede,
        setDistanciaUserSede,
        obtenerUbicacionUsuario,
        distance,
        userCoordinates,
        listaImagenes,
        fueValorado,
        setFueValorado,
      }}
    >
      {children}
    </ContextGlobal.Provider>
  );
};

export default ContextProvider;
export const useGlobalStates = () => useContext(ContextGlobal);
