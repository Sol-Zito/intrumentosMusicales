import React, { useEffect, useState } from 'react'
import { useGlobalStatesAuth } from '../Context/auth.context';
import styles from "../Styles/Search.module.css";
import stylesButton from "../Styles/Button.module.css";


const SearchUser= () => {
    const { setUsersCorreo, searchTerm, setSearchTerm, getUsersCorreo, usersCorreo} = useGlobalStatesAuth();
   
    
      // Función para manejar el cambio en el campo de entrada
      function handleInputChange(event) {
         setSearchTerm(event.target.value);  
 
      }    


       function  handleDeleteSearch(){
        setUsersCorreo(null);
        setSearchTerm("");
       }


      return (
        <div className={styles.containerButtonSearch}>
       <div className={styles.contenedorInputCorreo}> 
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Buscar por e-mail"
            className={styles.inputSearch }          />
          <button className={styles.btnSearch} onClick={()=>getUsersCorreo(searchTerm)}><i className="bi bi-search"></i></button>
          </div>
          {usersCorreo ? 
            <button className={styles.buttonVerTodosLosUsuarios}  onClick={handleDeleteSearch}>Ver todos los usuarios</button>
            : ""
          }
   
    
       </div>
    )}


         
    




export default SearchUser