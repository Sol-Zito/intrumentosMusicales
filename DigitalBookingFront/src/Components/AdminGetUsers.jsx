import React, { useEffect } from "react";
import styles from "../Styles/Admin.module.css";
import stylesButton from "../Styles/Button.module.css";
import { useGlobalStatesAuth } from "../Context/auth.context";



const AdminGetUsers = () => {
  const { users } = useGlobalStatesAuth();
  const { getUser, upPageUser, downPageUser, pageUser} = useGlobalStatesAuth();
  


  return (
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
        {users.map((user) => {
          return (
            <tr key={user.idUsuario}>
              <td>{user.persona?.nombre}</td>
            <td>{user.persona?.apellido}</td>
              <td>{user.persona?.correo}</td>
              <td>{user.rol?.nombre}</td>
              <td>{user.verificado ? "Verificado" : " "}</td>
              <td>{user.indicadorHabilitado ? "Habilitado" : " "}</td>
              <td>
            
              <button
                  className={stylesButton.buttonSinfondo}
                  onClick={() => getUser(user.idUsuario)}
                >
                 <i className="bi bi-pencil-square"></i><span>     Editar</span>
                </button>
                </td>
             
            </tr>
          );
        })}
      </tbody>
      </table>
      
      {(pageUser == 0)
       ?
       <div className={stylesButton.containerButton}>
        <span></span>
       <button className={stylesButton.buttonSubirImagen} onClick={upPageUser}>Siguiente</button> 
   
       </div>
      : 
      <>
      {(users.length < 10 )
         ?
       <div  className={stylesButton.containerButton} >
        <button className={stylesButton.buttonSubirImagen} onClick={downPageUser}>Anterior</button>
       </div>
      : 

      <div  className={stylesButton.containerButton} >
          <button className={stylesButton.buttonSubirImagen} onClick={downPageUser}>Anterior</button>
          <button className={stylesButton.buttonSubirImagen} onClick={upPageUser}>Siguiente</button>
      </div>
      }</>
      }
      </div>
  
  );
};

export default AdminGetUsers


