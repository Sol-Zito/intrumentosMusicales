import React, { useEffect } from 'react'
import styles from '../Styles/ProductDetail.module.css'
import stylesText from '../Styles/Text.module.css'
import { useGlobalStates } from '../Context/global.context'
import { ciudadesContext } from '../Context/ciudades.context'



const UbicationCard = ({sede}) => {
    const { obtenerUbicacionUsuario, distance} = useGlobalStates();
    const {ciudadesState, provinces} = ciudadesContext()
   
       const lat1 = sede.latitud
       const lon1= sede.longitud

    useEffect(() => {
        obtenerUbicacionUsuario()
      }, [])
     
     
  return (
    <div className={styles.blockUbication}>        
    <div><i className={`${"bi bi-house-door-fill"} ${stylesText.i}`} ></i><h3 className={`${stylesText.subtitle} ${stylesText.marginCinco}`}>{sede.sede}</h3></div>
     <div className={styles.textDireccion}>
       <i className=  {`${"bi bi-geo-alt-fill"} ${stylesText.i}`}  ></i>
       <p>{sede.direccion},</p>
       
       {ciudadesState.ciudadesList.map((ciudad)=>{
         if ( ciudad.idCiudad === sede.idCiudad)
         return(
         <p key={ciudad.idCiudad}>{ciudad.ciudad},</p>
         
         ) 
       })}
       
       {provinces.map((provincia)=>{
         if ( provincia.idProvincia === sede.idProvincia)
         return(
         <p key={provincia.idProvincia}>{provincia.provincia},</p>) 
       })}
       
      <p>Argentina.</p>          
     </div>
     <div>
     <i className= {`${"bi bi-bookmark-fill"} ${stylesText.i}`} ></i>  
     
     <p>Usted se encuentra a {distance(lat1, lon1)} km de esta sede.</p>
     </div>
     </div>
  )
}

export default UbicationCard