import React, { useEffect, useState } from 'react'
import styles from "../Styles/Admin.module.css";
import stylesButton from "../Styles/Button.module.css";
import { ciudadesContext } from '../Context/ciudades.context'
import { useContextSede } from '../Context/sedes.context'



const AdminGetCity = () => {

    const {getListSedesTodas, flagSede, listSedes} = useContextSede()
    const { getProvincia, provinces, ciudadesState,  deleteCity, traigoCiudadesPaginadoAdmin, flagCity, crearCiudad, pageCiudad,  upPageCiudad, downPageCiudad, getEditCiudad} =  ciudadesContext()
    const [disabledRows, setDisabledRows] = useState([]);
  
    useEffect(()=>{
        traigoCiudadesPaginadoAdmin()
        getProvincia()
        getListSedesTodas()
        
    }, [ pageCiudad, flagCity, flagSede,])

    useEffect(() => {
      // Inicializar disabledRows con todos los valores en true
      setDisabledRows(new Array(ciudadesState.ciudadesList.length).fill(true));
    }, [ciudadesState.ciudadesList]);
     
    const handleEliminar = (index) => {
      deleteCity(ciudadesState.ciudadesList[index]?.idCiudad);
    };
    return (
        <div className={styles.containerAdminPanel}>
      
         <div>
         <button  className={stylesButton.buttonSubmit} onClick={crearCiudad}>Agregar Nueva Ciudad</button>
         </div>
        <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
          <th scope="col">#</th>
            <th scope="col">Ciudad</th>
            <th scope="col">Provincia</th>
            <th scope="col">Sede</th>
            <th scope="col">Eliminar</th>
            <th scope="col">Editar</th>
          
           </tr>
        </thead>
     
    <tbody className={styles.tbody}>
      { ciudadesState.ciudadesList.map((ciudad, index) => {
        console.log('index',index)
        let tieneSede = false;
        listSedes.forEach((sede) => {
          if (sede.idCiudad === ciudad.idCiudad) {
            tieneSede = true;
          }
        });
        disabledRows[index] = tieneSede; // Actualizar el estado disabledRows
          return (
            <tr key={ciudad.idCiudad}>
               <td>{index + 1}</td>
              <td>{ciudad.ciudad}</td>
              {provinces.map((provincia)=>{
                  if ( provincia.idProvincia === ciudad.idProvincia)
                  return(
                  <td key={provincia.idProvincia}>{provincia.provincia},</td>) 
                })}
            <td id="sede"> 
              { listSedes.map((sede)=>{
                 let tieneSede = false;
                  if(sede.idCiudad===ciudad.idCiudad ){
                    tieneSede = true;
                    return(
                    <span>{sede?.sede}</span>
                   )
                  
                  }  else{
                    
                    return(
                      <span></span>    )
                  }    
                
              }
              
              
              )}  
             </td>
            <td>

              {tieneSede === true ? 
              
             <button
                id='eliminar'
                className={stylesButton.buttonDisabled}
                onClick={()=>(handleEliminar(index))}
                disabled={disabledRows[index]}
              
              >
             <i className="bi bi-trash3"></i><span>    Eliminar</span>
              </button>
           
                 :

                 <button
                id='eliminar'
                className={stylesButton.buttonSinfondo}
                onClick={()=>(handleEliminar(index))}
                disabled={disabledRows[index]}
              >
             <i className="bi bi-trash3"></i><span>    Eliminar</span>
              </button>
     
            
            } 
              </td>
           
            <td>
              <button
                  className={stylesButton.buttonSinfondo}
                  onClick={()=>getEditCiudad(ciudad.idCiudad)}
                >
                 <i className="bi bi-pencil-square"></i><span>     Editar</span>
                </button>
                </td>
             
            </tr>
          );
                                                                                             
      })}
    </tbody>
    </table>
    
    {(pageCiudad == 0)
     ?
     <div className={stylesButton.containerButton}>
      <span></span>
     <button className={stylesButton.buttonSubirImagen} onClick={upPageCiudad}>Siguiente</button> 
     </div>
    : 
    <>
    {( ciudadesState.ciudadesList.length < 10 )
       ?
     <div  className={stylesButton.containerButton} >
      <button className={stylesButton.buttonSubirImagen} onClick={downPageCiudad}>Anterior</button>
     </div>
    : 
    
    <div  className={stylesButton.containerButton} >
        <button className={stylesButton.buttonSubirImagen} onClick={downPageCiudad}>Anterior</button>
        <button className={stylesButton.buttonSubirImagen} onClick={upPageCiudad}>Siguiente</button>
    </div>
    }</>
    }
    </div>
    
    );
    };
    
    
export default AdminGetCity