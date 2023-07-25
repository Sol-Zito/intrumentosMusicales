import { createContext, useContext, useEffect, useReducer, useState } from "react";
import config from "../../env-config.js";
import Swal from "sweetalert2";
import styles from "../Styles/Register.module.css";
import stylesButton from "../Styles/Button.module.css";
import { ciudadesContext } from "./ciudades.context.jsx";
import {
  nombreValido,
} from "../Components/ValidacionesDeForm";


const baseURL = config.API_URL;

const SedesContext = createContext();

const initialStateAdress = {
  address: {
    sede: "",
    calle: "",
    numero: "",
    ciudad: "",
    pais: "Argentina",
  },
};

/*---------------------------------------UseReducer que guarda el estado de los datos ingresados por el form de crear sedes, está relacionado con setAddresField------------------------------------*/

const SET_ADDRESS_FIELD = "SET_ADDRESS_FIELD";
const reducerAddress = (state, action) => {
  switch (action.type) {
    case SET_ADDRESS_FIELD:
      return {
        ...state,
        address: {
          ...state.address,
          [action.payload.field]: action.payload.value,
        },
      };
    default:
      return state;
  }
};



const ContextProvider = ({ children }) => {
  const [provincesSelected, setProvincesSelected] = useState('');
  const [ciudadSelected, setCiudadSelected] = useState('');
  const [stateAddress, dispatchAddress] = useReducer(
    reducerAddress,
    initialStateAdress
  );
  const [listSedes, setListSedes] = useState([])
  const [flagSede, setFlagSede] = useState(false)
  const {ciudadesState, provinces, crearCiudad} = ciudadesContext()

 
  /*---------------------------------------Paginado de sedes------------------------------------*/
  const [pageSede, setPageSede] = useState(0);



  const upPageSede = () => {
    setPageSede(pageSede + 1);

  };

  const downPageSede = () => {
    setPageSede(pageSede - 1);
  
  };



  /*---------------------------------------obtiene lista de sedes de base de datos y guarda en estado listSedes------------------------------------*/
  const url = baseURL + "/api/v1/sede/buscarTodos";
  const getListSedes = () => {
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        pagina: pageSede,
        cantidad: 10,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((data) => {
    
        setListSedes(data);
      });
  };

  const getListSedesTodas = () => {
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

        setListSedes(data);
      });
  };




const deleteSede =((idSede)=>{
  setFlagSede(false);
  let url = baseURL + "/api/v1/sede/" + idSede;
  fetch(url, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  }).then(() => {
    Swal.fire({
      icon: "success",
      title: "Eliminada",
      text: "La sede se ha eiminado exitosamente",
      timer: 5000,
      backdrop: "rgb(64, 64, 64 )" ,
      didOpen: () => {
        Swal.showLoading()
        let timerInterval = setInterval(() => {
         Swal.getTimerLeft()
        }, 100)
      },
    });
    setFlagSede(true);
  });
})






const getSede= (idSede) => {

 
  setFlagSede(false)
  const urlSede =  baseURL + '/api/v1/sede' 
  const urlgetSede =  baseURL + '/api/v1/sede/' + idSede
  fetch(urlgetSede)
  .then(response => response.json())
     .then((data) => {
 

     Swal.fire({
      width: "60%",
      backdrop: "rgb(64, 64, 64 , 0.90)",
      title: "Actualizar Sede",
      html: `<form id="updateForm" class=${styles.containerFormRegister} >
                
      <div class="${styles.containerInputRegister}">
      <label class="${styles.labelRegister}" htmlFor="name">
        Sede:
        </label>
      <input
        class="${styles.input_user}"
        id="name"
        name="name"
        type="text"
        required
         value="${data?.sede}"

      />
    </div>
    <div class="${styles.containerInputRegister}">
    <label class="${styles.labelRegister}" htmlFor="direccion">
      Dirección: 
    </label>
    <input
      class="${styles.input_user}"
      id="direccion"
      name="direccion"
      type="text"
      required
       value="${data?.direccion}"
    />
  </div>

<div class="${styles.containerInputRegister}">
<label class="${styles.labelRegister}" htmlFor="latitud">
 Latitud: 
</label>
<input
  class="${styles.input_user}"
  id="latitud"
  name="latitud"
  type="float"
  required
   value=${data?.latitud} 
/>
</div>

<div class="${styles.containerInputRegister}">
<label class="${styles.labelRegister}" htmlFor="longitud">
 Longitud: 
</label>
<input
  class="${styles.input_user}"
  id="longitud"
  name="longitud"
  type="float"
  required
   value=${data?.longitud} 
/>



</div>
<div class="${styles.containerInputRegister}">
      <label class="${styles.labelRegister}" htmlFor="ciudad">
        Ciudad:
      </label>
      <select
        id="ciudad"
        name="ciudad"
        required
        class="${styles.input_user}"
      >
        ${ciudadesState.ciudadesList.map((ciudad) => {

          if(ciudad.idCiudad === data.idCiudad){
            return `<option
            class=${styles.option}
            value=${ciudad?.idCiudad}
            selected
          >
            ${ciudad.ciudad}
          </option>`;
          } else{
            return `<option
            class=${styles.option}
            value=${ciudad?.idCiudad}
        
          >
            ${ciudad.ciudad}
          </option>`;
          }
        
        }).join('')}
      </select>
      
    </div>

<div class="${styles.containerInputRegister}">
      <label class="${styles.labelRegister}" htmlFor="provincia">
        Provincia:
      </label>
      <select
        id="provincia"
        name="provincia"
        required
        class="${styles.inputRegister}"
      >
        ${provinces.map((provincia) => {

          if(provincia.idProvincia === data.idProvincia){
            return `<option
            class=${styles.option}
            value=${provincia?.idProvincia}
            selected
          >
            ${provincia.provincia}
          </option>`;
          } else{
            return `<option
            class=${styles.option}
            value=${provincia?.idProvincia}
        
          >
            ${provincia.provincia}
          </option>`;
          }
        
        }).join('')}
      </select>
    </div>
 
      </form>
      `, 
      showCancelButton: true,
      cancelButtonColor: 'rgb(136, 136, 136)',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Actualizar',
      confirmButtonColor: "#F0572D", 
      preConfirm: () => {
        const sede = Swal.getPopup().querySelector('#name').value
        const direccion = Swal.getPopup().querySelector('#direccion').value
        const ciudad = Swal.getPopup().querySelector('#ciudad').value
        const latitud = Swal.getPopup().querySelector('#latitud').value
        const longitud = Swal.getPopup().querySelector('#longitud').value
        const provincia = Swal.getPopup().querySelector('#provincia').value
        console.log(sede, direccion,ciudad)
       if(
        !nombreValido(sede)     
                 
       ){
        Swal.fire({
          icon: "error",
          title: "REVISAR CAMPOS",
          text: 'Nombre y apellido debe tener más de 3 caracteres y no pueden contener números',
          confirmButtonColor: "#F0572D", 
        
        })
          return false

       
      } else{
        return { 
          idSede:  data?.idSede,
          sede: sede, 
          direccion: direccion,
          ciudad: parseInt(ciudad),
          provincia: parseInt(provincia),
          latitud: parseFloat(latitud),
          longitud: parseFloat(longitud),
          indicadorHabilitado: true,       
          
        }
      }}

    }).then((result) => {

      console.log(result.value)
      if (result.value) {
           fetch(urlSede, {
              method: 'PUT',
              headers: {
            
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
              },
              body: JSON.stringify({
                idSede:  result.value.idSede,
                sede: result.value.sede,
                direccion:  result.value.direccion,
                idCiudad:  result.value.ciudad,
                idProvincia:  result.value.provincia,
                latitud:  result.value.latitud,
                longitud:  result.value.longitud,
                indicadorHabilitado:  result.value.indicadorHabilitado,
                               
                
              })
            
          })
          setTimeout(function(){
            setFlagSede(true)
        }, 5000);
    
        }
      
          if(result.isConfirmed){
            Swal.fire({
              icon: "success",
              title: "Sede actualizada",
              text: "La sede se actualizó con éxito",
              timer: 6000,
              backdrop: "rgb(64, 64, 64 )" ,
              didOpen: () => {
                Swal.showLoading()
                 timerInterval = setInterval(() => {
                 Swal.getTimerLeft()
                }, 100)
              },
            
            })
          
           }
          
   if(result.isDismissed){
    Swal.fire({
      icon: "error",
      title: "CANCELADO",
      text: "La sede no se actualizó",
      confirmButtonColor: "#F0572D", 
    })
   }     
  })
} 
)}
      
 
  /*-------------------------------------------------------------------------------------------------------------------------------------------*/
  return (
    <SedesContext.Provider
      value={{
        listSedes,
        getListSedes,
        stateAddress,
        dispatchAddress,
        SET_ADDRESS_FIELD,
        provincesSelected,
        setProvincesSelected,
        downPageSede,
        upPageSede,
        pageSede,
        deleteSede,
        flagSede,
        getSede,
        ciudadSelected, 
        setCiudadSelected,
        getListSedesTodas
      }}
    >
      {children}
    </SedesContext.Provider>
  );
};

export default ContextProvider;
export const useContextSede = () => useContext(SedesContext);

