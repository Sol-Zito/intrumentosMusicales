import React, { useEffect } from "react";
import styles from "../Styles/Admin.module.css";
import stylesButton from "../Styles/Button.module.css";
import { useContextSede } from "../Context/sedes.context";
import { ciudadesContext } from "../Context/ciudades.context";

const AdminGetSedes = () => {
 
    const {listSedes, getListSedes, upPageSede, downPageSede, pageSede, deleteSede, flagSede, getSede}= useContextSede()
    const {traigoCiudades, getProvincia, provinces, ciudadesState} =  ciudadesContext()
   
    useEffect(()=>{
        traigoCiudades()
        getProvincia()
        getListSedes()
    }, [flagSede, pageSede])


  return (
    <div className={styles.containerAdminPanel}>
    <table className={styles.table}>
    <thead className={styles.thead}>
      <tr>
        <th scope="col">Sede</th>
        <th scope="col">Dirección</th>
        <th scope="col">Ciudad</th>
        <th scope="col">Provincia</th>
        <th scope="col">Coordenadas</th>
        <th scope="col">Eliminar</th>
        <th scope="col">Editar</th>
       </tr>
    </thead>
 
<tbody className={styles.tbody}>
  {listSedes.map((sede) => {
   {if(sede.indicadorHabilitado === true)
    {
      return (
        <tr key={sede.idSede}>
          <td>{sede.sede}</td>
          <td>{sede.direccion}</td>
  
          {ciudadesState.ciudadesList.map((ciudad)=>{
              if ( ciudad.idCiudad === sede.idCiudad)
              return(
              <td key={ciudad.idCiudad}>{ciudad.ciudad}</td>) 
            })}
            
            {provinces.map((provincia)=>{
              if ( provincia.idProvincia === sede.idProvincia)
              return(
              <td key={provincia.idProvincia}>{provincia.provincia},</td>) 
            })}
  
          <td>{sede.latitud}, {sede.longitud}</td>
          <td>
        
        <button
            className={stylesButton.buttonSinfondo}
            onClick={() => deleteSede(sede.idSede)}
          >
         <i className="bi bi-trash3"></i><span>    Eliminar</span>
          </button>
          </td>
  
          <td>
        
          <button
              className={stylesButton.buttonSinfondo}
              onClick={() => getSede(sede.idSede)}
            >
             <i className="bi bi-pencil-square"></i><span>     Editar</span>
            </button>
            </td>
         
        </tr>
      );
    
    
    }}

  })}
</tbody>
</table>

{(pageSede == 0)
 ?
 <div className={stylesButton.containerButton}>
  <span></span>
 <button className={stylesButton.buttonSubirImagen} onClick={upPageSede}>Siguiente</button> 
 </div>
: 
<>
{(listSedes.length < 10 )
   ?
 <div  className={stylesButton.containerButton} >
  <button className={stylesButton.buttonSubirImagen} onClick={downPageSede}>Anterior</button>
 </div>
: 

<div  className={stylesButton.containerButton} >
    <button className={stylesButton.buttonSubirImagen} onClick={downPageSede}>Anterior</button>
    <button className={stylesButton.buttonSubirImagen} onClick={upPageSede}>Siguiente</button>
</div>
}</>
}
</div>

);
};


export default AdminGetSedes