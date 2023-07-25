import React, { useEffect } from 'react'

import styles from "../Styles/Admin.module.css";
import stylesButton from "../Styles/Button.module.css";
import { useGlobalStatesAuth } from '../Context/auth.context';

const ResultsSearchUsers = () => {
  const {getUser,  usersCorreo} = useGlobalStatesAuth();

    return (
<>

{ usersCorreo  ?

        <div className={styles.containerAdminPanel}>
          <table className={styles.table}>
      <thead className={styles.thead}>
        <tr>
          <th scope="col">Nombre</th>
          <th scope="col">Apellido</th>
          <th scope="col">Correo</th>
          <th scope="col">Rol</th>
          <th scope="col">Verificación</th>
          <th scope="col">Habilitado</th>
          <th scope="col">Editar</th>
         </tr>
      </thead>
      
      <tbody className={styles.tbody}>
         
         <tr key={usersCorreo.idUsuario}>
              <td>{usersCorreo.persona?.nombre}</td>
            <td>{usersCorreo.persona?.apellido}</td>
              <td>{usersCorreo.persona?.correo}</td>
              <td>{usersCorreo.rol?.nombre}</td>
              <td>{usersCorreo.verificado ? "Verificado" : " "}</td>
              <td>{usersCorreo.indicadorHabilitado ? "Habilitado" : " "}</td>
              <td>
            
              <button
                  className={stylesButton.buttonSinfondo}
                  onClick={() => getUser(usersCorreo.idUsuario)}
                >
                 <i className="bi bi-pencil-square"></i><span>     Editar</span>
                </button>
                </td>
             
            </tr>
    
       </tbody>
       </table>
       </div>
     : ""  }



</>
  

);
};

export default ResultsSearchUsers