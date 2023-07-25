import React from 'react'
import { useGlobalStatesAuth } from '../Context/auth.context';
import styles from "../Styles/Register.module.css";
import stylesAdmin from "../Styles/Admin.module.css";

const AdminUserRols = () => {
    const{setRol} = useGlobalStatesAuth();
    const handleChangeRol= (event) => {
        setRol(event.target.value);
      };

  return (
    <div>
     <label className={styles.labelRegister} htmlFor='rol'>Selecciona el rol de usuario</label>
     <select   
     id="rol"
     onChange={handleChangeRol}
     name="rol"
     required
     className={styles.inputRegister}
     >
        <option  hidden>Elige un rol</option>
        <option className={styles.option}  value={1}>Administrador</option>
        <option className={styles.option}  value={2}>Cliente</option>
     </select>

    </div>
  )
}

export default AdminUserRols