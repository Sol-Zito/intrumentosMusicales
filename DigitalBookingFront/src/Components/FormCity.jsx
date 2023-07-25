import React, { useEffect, useState } from 'react';
import { useContextSede } from '../Context/sedes.context';
import styles from "../Styles/Admin.module.css";
import stylesButton from "../Styles/Button.module.css";
import Swal from 'sweetalert2';
import config from '../../env-config.js';
import { ciudadesContext } from '../Context/ciudades.context';
import { GoogleMap,  Marker } from '@react-google-maps/api';



const FormCity = () => {

  const { stateAddress, dispatchAddress,  SET_ADDRESS_FIELD } =  useContextSede()
  const { getProvincia, provinces, ciudadesState, traigoCiudades, city, setCity, crearCiudad, flagCity, setPasarProvincesSelected} =  ciudadesContext()
  const { address } = stateAddress;
  const {provincesSelected, setProvincesSelected, ciudadSelected, setCiudadSelected} = useContextSede()
  const [optionAddress, setOptionAddress] = useState(null)
  const [optionAddressMap, setOptionAddressMap] = useState(null)
  const [sede, setSede] = useState({})
  const [idCiudad, setIdCiudad] = useState(null)
  const [formErrors, setFormErrors] = useState({});


  const baseURL = config.API_URL;


  /*---------------------------------------Setea los datos del formulario de crear sedes cuando son ingresados en cada input------------------------------------*/
  const setAddressField = (field, value) => {
    dispatchAddress({
      type: SET_ADDRESS_FIELD,
      payload: {
        field,
        value,
      },
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddressField(name, value);
  
  };

const handleChangeProvinceSelected = (e) => {
  provinces.map((province)=>{
    if(province.provincia === e.target.value){
      setProvincesSelected(
        {
        idProvincia: province.idProvincia,
        provincia: province.provincia
        }
      
        )
             
      
      }})}

        const handleChangeCiudadSelected = (e) => {
         ciudadesState.ciudadesList.map((ciudad)=>{
            if(ciudad.ciudad === e.target.value){
              setCiudadSelected(
                {
                idCiudad: ciudad.idCiudad,
               ciudad: ciudad.ciudad
                }
                )}})}

 const handleDireccionEquivocada = (e) =>{
   e.preventDefault()
   
   Swal.fire({
    icon: 'info',
    title: 'Dirección equivocada',
    text: 'Si no es la dirección que buscabas puedes realizar una nueva búsqueda en el formulario. Si la calle que buscas lleva en su nombre la palabra Avenida debes escribirla de manera completa. Por ejemplo: "Avenida Colón"',
    confirmButtonColor: '#F0572D',
  });
  
 }


 const handleConfirmarDireccion = (e) => {
  e.preventDefault()  
  setSede(
    {   
      idCiudad : ciudadSelected.idCiudad,
      idProvincia: provincesSelected?.idProvincia,
      direccion: `${address.calle} ${address.numero}` ,
      latitud: optionAddressMap.latitud,
      longitud:  optionAddressMap.longitud,
      sede: address.sede
    }
    
  )

}

console.log('sede', sede)

useEffect(()=>{
  getProvincia()
  
  traigoCiudades()

}, [flagCity])

useEffect(() => {
    if (Object.keys(sede).length > 0) {
      postSede();
    }
  
  }, [sede])
  


      
    function refreshPage() {
      window.location.reload(false);
    }
     

const postSede =  (e) => {
  const url = baseURL + '/api/v1/sede'
 
  
fetch(url,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sede),
    },

  )
 
  .then((response) => response.json())
  .then((data)=>{
  
      console.log(data);
      if(data){
        Swal.fire({
          icon: 'success',
          title: 'Sede guardada exitosamente',
          showConfirmButton: true,
          timer: 2500
        })
      }
      })
     
        
    .catch((error)=> {
      Swal.fire({
        icon: 'error',
        title: 'La sede no se pudo guardar',
        showConfirmButton: false,
        timer: 1500
        
      })
 
    })

  }
      //convierte el input de calle en un cadena de palabras separadas por el signo +
const addressPalabrasArray = address.calle.split(' ')
const sumaPalabras = addressPalabrasArray.join(' + ')


// Construir la cadena de búsqueda con la dirección 
const searchString = `${sumaPalabras} + ${address.numero} + ${ciudadSelected.ciudad} + ${provincesSelected.provincia} + ${address.pais} `;
 
console.log(ciudadSelected?.ciudad, provincesSelected?.provincia)

const API_KEY = 'AIzaSyAJhjm0yE8qVX0BFwpjxA5NLY25h1kgFTk'

// Construir la URL de la API de Google Maps
const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${searchString}&key=${API_KEY}`

// Realizar la solicitud HTTP GET a la API
const getSearchAddress = (e)=>{
    e.preventDefault()

    // Realizar validaciones
  const errors = {};
  if (address.calle.trim() === '') {
    errors.calle = 'Ingrese el nombre de una calle';
  }
  if (address.numero.trim() === '') {
    errors.numero = 'Ingrese el número de la casa o local';
  }
  if (address.ciudad.trim() === '') {
    errors.ciudad = 'Ingrese el nombre de la ciudad';
  }
  if (provincesSelected === undefined ) {
    errors.provincia = 'Ingrese el nombre de la provincia';
  }

    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data) {
            console.log('data', data)
           setOptionAddress(data.results[0].formatted_address);
           setOptionAddressMap(
            {
              latitud: data.results[0]?.geometry?.location?.lat,
              longitud: data.results[0]?.geometry?.location?.lng,
            }
            
           )
           setCity({
            idProvincia: provincesSelected.idProvincia,
            ciudad: ciudadSelected.idCiudad,
            indicadorHabilitado: true,
          });

       

        } else {
         
          Swal.fire({
            icon: 'error',
            title: 'Dirección no encontrada',
            text: 'No se encontró la dirección solicitada. Intente nuevamente escribiendo el nombre completo de la dirección',
            confirmButtonColor: '#F0572D',
          });
        }
      })
  .catch(error => {
    console.log('Ocurrió un error al realizar la solicitud:', error);
  });


}

console.log(optionAddressMap)
console.log('optionAddress', optionAddress)
console.log('address', address)

  return (
    <>
    <div className={styles.containerFormCity}>
  <form className={styles.form} onSubmit={getSearchAddress}>
  <div className={styles.container}>
  <div className={styles.containerInput}>
        <label className={styles.label} htmlFor="calle">
          Nombre de la Sede:
          </label>
          <input
          className={styles.select}
            type="text"
            name="sede"
            value={address.sede}
            onChange={handleChange}
          />
          {formErrors.calle && <span className={styles.error}>{formErrors.calle}</span>}
    </div>  

  <div className={styles.containerInput}>
        <label className={styles.label} htmlFor="calle">
          Calle:
          </label>
          <input
          className={styles.select}
            type="text"
            name="calle"
            value={address.calle}
            onChange={handleChange}
          />
          {formErrors.calle && <span className={styles.error}>{formErrors.calle}</span>}
    </div>  

     <div className={styles.containerInput}>  
    
        <label className={styles.label} htmlFor="numero">
          Número:
          </label>
          <input
            className={styles.select}
            type="text"
            name="numero"
            value={address.numero}
            onChange={handleChange}
          />
           {formErrors.numero && <span className={styles.error}>{formErrors.numero}</span>}
    </div>  
   
    <div className={styles.containerInput}>
        <label className={styles.label} htmlFor="provincia">
          Provincia:
          </label>
         
          <select 
             className={styles.select}
             type="text"
             name="provincia"
              onChange={handleChangeProvinceSelected}>
                 <option hidden>Selecciona una provincia</option>
          {provinces.map((province)=>{
            return(
              <option
              value={province?.provincia}
              key={province.idProvincia}
              >{province?.provincia}
              </option>
            )
          })}
          </select> 
               {formErrors.provincia && <span className={styles.error}>{formErrors.provincia}</span>}
  </div>



   { provincesSelected === '' ? <span></span> :

    <div className={styles.containerInput}>
    <label className={styles.label} htmlFor="ciudadSelect">
     Ciudad:
      </label>
     
      <select 
         className={styles.select}
         type="text"
         name="ciudad"
          onChange={handleChangeCiudadSelected}>
             <option hidden>Selecciona una ciudad</option>
      {ciudadesState.ciudadesList.map((ciudad)=>{
        
        if(provincesSelected.idProvincia === ciudad.idProvincia) {
             return(
              <option
              value={ciudad?.ciudad}
              key={ciudad.idCiudad}
              >{ciudad.ciudad}
              </option>
          
   
             )
   
       }          
    
      })}
      </select> 
    
      <button  className={stylesButton.buttonSinFondoNegro} onClick={crearCiudad}>Agregar Nueva Ciudad</button>
   </div>




}



   
   
 
                 
 
 
    <button className={stylesButton.buttonSubmit}>Buscar</button>  
    </div>
      </form>
    
   
  
 {optionAddressMap  === null  ?
  ""
  :
  <div className={styles.containerMapCity}>
  
      <GoogleMap mapContainerStyle={{width: '100%', height: '100%', margin:'auto', borderRadius:'8px'}} center={{lat: optionAddressMap?.latitud, lng: optionAddressMap?.longitud}} zoom={15}>
        <Marker position={ {lat: optionAddressMap?.latitud, lng: optionAddressMap?.longitud}} />
      </GoogleMap>
  
      <p>{ `${address.calle}  ${address.numero},  ${ciudadSelected.ciudad},  ${provincesSelected.provincia},  ${address.pais} `}</p>
      <div>
<button className={stylesButton.buttonSinFondoNegro} onClick={handleDireccionEquivocada} >El mapa no muestra la dirección que busco</button>
<button className={stylesButton.buttonSubmit} onClick={handleConfirmarDireccion}>Guardar sede</button>
</div>

</div>
}


    </div>


    
          </>

  );
};

export default FormCity;