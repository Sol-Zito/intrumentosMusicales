import { createContext, useContext, useReducer, useState } from "react";
import config from "../../env-config.js";
import Swal from "sweetalert2";
import styles from "../Styles/Admin.module.css";
import stylesRegister from "../Styles/Register.module.css";
import stylesButton from "../Styles/Button.module.css";
import {
 nombreValido
} from "../Components/ValidacionesDeForm";
import { useContextSede } from "./sedes.context.jsx";

const baseURL = config.API_URL;

const ResultadoBusquedaContext = createContext();


const listadoInitial = {
  ciudadesList: [],
  resultado: [],
};

const ciudadesReducer = (state, action) => {
  switch (action.type) {
    case "GET_CIUDADES":
      return { ...state, ciudadesList: action.payload };
    case "SET_RESULTADO":
      return { ...state, resultado: action.payload };
    default:
      throw new Error();
  }
};

const CiudadesProvider = ({ children }) => {
  const [provinces, setProvinces] = useState([]);
  const [ciudadesState, ciudadesDispatch] = useReducer(
    ciudadesReducer,
    listadoInitial
  );
  const [flagCity, setFlagCity] = useState(false)
  const [pageCiudad, setpageCiudad] = useState(0)
  const [city, setCity] = useState({});
  const [pasarProvincesSelected, setPasarProvincesSelected]= useState('')

  /*--------------------------------------Traigo ciudades------------------------------------*/

  function traigoCiudades() {
    const url = baseURL + '/api/v1/ciudad/buscarTodos';
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
      .then((data) =>
        ciudadesDispatch({ type: "GET_CIUDADES", payload: data })
      );
  }

  
  /*---------------------------------------Paginado de ciudades------------------------------------*/


  const upPageCiudad = () => {
    setpageCiudad(pageCiudad + 1);
    
  };

  const downPageCiudad = () => {
    setpageCiudad(pageCiudad - 1);
   
  };

  
  /*---------------------------------------Traigo ciudades con paginado------------------------------------*/
  function traigoCiudadesPaginadoAdmin() {
    const url = baseURL + '/api/v1/ciudad/buscarTodos';
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        pagina: pageCiudad,
        cantidad: 40,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((data) =>
      {

        ciudadesDispatch({ type: "GET_CIUDADES", payload: data })
      }
      );
  }

 /*--------------------Elimina (deshabilita) ciudad-------------------------*/

  const deleteCity =((idCiudad)=>{
    setFlagCity(false);
    let url = baseURL + "/api/v1/ciudad/" + idCiudad;
    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then(() => {
      Swal.fire({
        icon: "success",
        title: "Eliminada",
        text: "La ciudad se ha eliminado exitosamente",
        timer: 5000,
        backdrop: "rgb(64, 64, 64 )" ,
        didOpen: () => {
          Swal.showLoading()
          let timerInterval = setInterval(() => {
           Swal.getTimerLeft()
          }, 100)
        },
      });
      setFlagCity(true);
    });
  })
  
 /*--------------------Get PROVINCIAS--------------------------*/
  const getProvincia = () => {
    const url = baseURL + '/api/v1/provincia/buscarTodos'
   
     fetch(url,
       {
         method: "POST",
         headers: {
           Accept: "application/json",
           "Content-Type": "application/json",
         },
         body: JSON.stringify(
           {
             "pagina": 0,
             "cantidad": 24
         
         }),
       },
   
     )
       .then((response) => {
         if (!response.ok) {
           throw new Error(
           console.log('Provincias no encontrados')
           
           );
         }
         return response.json();
       })
       .then((data) => {
         setProvinces(data)
   
       })
       .catch((error) => {
         console.log(error);
       });
   };
   
 /*--------------------Crea ciudad  -------------------------*/
   
    const [nombreCity, setNombreCity] = useState('')

    const handleChangeCiudad = ()=> {
        setNombreCity(e.target.value)
    }
      const crearCiudad= (event) => {
       event.preventDefault()
 
        setFlagCity(false)
        const urlCiudad =  baseURL + '/api/v1/ciudad' 
        
                  Swal.fire({
            width: "60%",
            backdrop: "rgb(64, 64, 64 , 0.90)",
            title: "Agregar ciudad",
            html: `<form id="updateForm" class=${stylesRegister.containerFormRegister} >
            
            <div class="${stylesRegister.containerInputRegister}">
            <label class="${stylesRegister.labelRegister}" htmlFor="provincia">
              Provincia:
            </label>
            <select
              id="provincia"
              name="provincia"
              required
              class="${stylesRegister.inputRegister}"
            >
            <option
                  class=${stylesRegister.option}
                 
              
                >
                <span>Seleccionar Provincia</span>
                </option>
              ${provinces.map((provincia) => {          
                
                if(pasarProvincesSelected?.provincia===provincia.provincia){
               
                  return `<option
                  class=${stylesRegister.option}
                  value=${provincia?.idProvincia}
                  selected
                >
                  ${provincia.provincia}
                </option>`;
                

                }else{
                  return `<option
                  class=${stylesRegister.option}
                  value=${provincia?.idProvincia}
              
                >
                  ${provincia.provincia}
                </option>`;

                }
                 
              
              }).join('')}
            </select>
          </div>
            <div class="${stylesRegister.containerInputRegister}">
            <label class="${stylesRegister.labelRegister}" htmlFor="ciudad">
            Ciudad:
              </label>
            <input
              class="${stylesRegister.input_user}"
              id="ciudad"
              name="ciudad"
              type="text"
              onChange="${handleChangeCiudad}"
              required
              value= "${nombreCity}"
      
      
            />
          </div>     
            </form>`, 
            showCancelButton: true,
            cancelButtonColor: 'rgb(136, 136, 136)',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Agregar ciudad',
            confirmButtonColor: "#F0572D", 
            preConfirm: () => {
              const ciudad = Swal.getPopup().querySelector('#ciudad').value
              const provincia = Swal.getPopup().querySelector('#provincia').value
            
             if(
              !nombreValido(ciudad)     
                       
             ){
              Swal.fire({
                icon: "error",
                title: "REVISAR CAMPOS",
                text: 'Nombre Ciudad debe tener más de 3 caracteres y no pueden contener números',
                confirmButtonColor: "#F0572D", 
              
              })
                return false
      
             
            } else{
              return { 
                ciudad: ciudad, 
                provincia: parseInt(provincia),
                indicadorHabilitado: true,       
                
              }
            }}
      
          }).then((result) => {
      

            if (result.value) {
                 fetch(urlCiudad, {
                    method: 'post',
                    headers: {
                  
                      "Content-Type": "application/json",
                      "Access-Control-Allow-Origin": "*",
                    },
                    body: JSON.stringify({
                                          
                      ciudad:  result.value.ciudad,
                      idProvincia:  result.value.provincia,
                      indicadorHabilitado:  result.value.indicadorHabilitado,
                                     
                      
                    })
                  
                }).then(response => response.json())
                .then((data) => {
                  setCity(data?.idCiudad)
                })
                setTimeout(function(){
                  setFlagCity(true)
              }, 5000);
              
          
              }
            
                if(result.isConfirmed){
                  Swal.fire({
                    icon: "success",
                    title: "Ciudad creada",
                    text: "La ciudad se creo con éxito",
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
            title: "CANCELADA",
            text: "La ciudad no se creó",
            confirmButtonColor: "#F0572D", 
          })
         }     
        })
      
      }
            
     /*--------------------Edita ciudad  -------------------------*/   
     

const getEditCiudad= (idCiudad) => {

 
  setFlagCity(false)
  const urlCiudad =  baseURL + '/api/v1/ciudad' 
  const urlgetCiudad =  baseURL + '/api/v1/ciudad/' + idCiudad
  fetch(urlgetCiudad)
  .then(response => response.json())
     .then((data) => {

  
   

     Swal.fire({
      width: "60%",
      backdrop: "rgb(64, 64, 64 , 0.90)",
      title: "Actualizar Ciudad",
      html: `<form id="updateForm" class=${stylesRegister.containerFormRegister} >
                
      <div class="${stylesRegister.containerInputRegister}">
      <label class="${stylesRegister.labelRegister}" htmlFor="ciudad">
        Ciudad:
        </label>
      <input
        class="${stylesRegister.input_user}"
        id="ciudad"
        name="ciudad"
        type="text"
        required
         value="${data?.ciudad}"

      />
    </div>
     
    </div>

<div class="${stylesRegister.containerInputRegister}">
      <label class="${stylesRegister.labelRegister}" htmlFor="provincia">
        Provincia:
      </label>
      <select
        id="provincia"
        name="provincia"
        required
        class="${stylesRegister.inputRegister}"
      >
        ${provinces.map((provincia) => {

          if(provincia.idProvincia === data.idProvincia){
            return `<option
            class=${stylesRegister.option}
            value=${provincia?.idProvincia}
            selected
          >
            ${provincia.provincia}
          </option>`;
          } else{
            return `<option
            class=${stylesRegister.option}
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
        const ciudad = Swal.getPopup().querySelector('#ciudad').value
        const provincia = Swal.getPopup().querySelector('#provincia').value
      
       if(
        !nombreValido(ciudad)     
                 
       ){
        Swal.fire({
          icon: "error",
          title: "REVISAR CAMPOS",
          text: 'Ciudad debe tener más de 3 caracteres y no pueden contener números',
          confirmButtonColor: "#F0572D", 
        
        })
          return false

       
      } else{
        return { 
          idCiudad:  parseInt(data?.idCiudad),
          ciudad: data.ciudad,
          provincia: parseInt(provincia),
          indicadorHabilitado: true,       
          
        }
      }}

    }).then((result) => {

     
      if (result.value) {
           fetch(urlCiudad, {
              method: 'PUT',
              headers: {
            
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
              },
              body: JSON.stringify({
                idCiudad:  result.value.idCiudad,
                ciudad: result.value.ciudad,
                idProvincia:  result.value.provincia,
                indicadorHabilitado:  result.value.indicadorHabilitado,
                               
                
              })
            
          })
          setTimeout(function(){
            setFlagCity(true)
        }, 5000);
    
        }
      
          if(result.isConfirmed){
            Swal.fire({
              icon: "success",
              title: "Ciudad actualizada",
              text: "La ciudad se actualizó con éxito",
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
      title: "CANCELADA",
      text: "La ciudad no se actualizó",
      confirmButtonColor: "#F0572D", 
    })
   }     
  })
} 
)}
      
        

  return (
    <ResultadoBusquedaContext.Provider

      value={{ ciudadesState, ciudadesDispatch, traigoCiudades, getProvincia, provinces, setProvinces, flagCity, deleteCity, traigoCiudadesPaginadoAdmin, city, setCity, crearCiudad, handleChangeCiudad,
         upPageCiudad, downPageCiudad, pageCiudad, setPasarProvincesSelected, getEditCiudad}}
    >
      {children}
    </ResultadoBusquedaContext.Provider>
  );
};
export default CiudadesProvider;
export const ciudadesContext = () => useContext(ResultadoBusquedaContext);
