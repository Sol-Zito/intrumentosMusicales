import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LocalStorageContext } from "../Context/auth.services";


const AdminButtonPanel = () => {
  const { ChangeBtnMenu, btnMenu } = useContext(LocalStorageContext);

  return (
    <>
      {!btnMenu ? (
        <>
          <Link to={"/AdminPanel"} onClick={ChangeBtnMenu}>
            <li><p>Lista de productos</p></li>
          </Link>
          <Link to={"/AdminGetCategories"} onClick={ChangeBtnMenu}>
            <li><p>Lista de Categorías</p></li>
          </Link>
          <Link to={"/AdminGetUser"} onClick={ChangeBtnMenu}>
            <li><p>Lista de Usuarios</p></li>
          </Link>
          <Link to={"/AdminSedes"} onClick={ChangeBtnMenu}>
            <li><p>Lista de Sedes</p></li>
          </Link>
          <Link to={"/AdminGetCiudades"} onClick={ChangeBtnMenu}>
            <li><p>Lista de Ciudades</p></li>
          </Link>
        
          <Link to={"/AdminRegisterProduct"} onClick={ChangeBtnMenu}>
            <li><p>Crear Producto</p></li>
          </Link>
          <Link to={"/AdminRegisterCategory"} onClick={ChangeBtnMenu}>
            <li><p>Crear Categoría</p></li>
          </Link>
          <Link to={"/Register"} onClick={ChangeBtnMenu}>
            <li><p>Crear Usuario</p></li>
          </Link>
          <Link to={"/AdminRegisterCity"} onClick={ChangeBtnMenu}>
            <li><p>Crear Sede</p></li>
          </Link>
         

        </>
      ) : (
        <>
          <Link to={"/AdminPanel"}>
            <li><p>Lista de productos</p></li>
          </Link>
          <Link to={"/AdminGetCategories"}>
            <li><p>Lista de Categorías</p></li>
          </Link>
          <Link to={"/AdminGetUser"}>
            <li><p>Lista de Usuarios</p></li>
          </Link>
          <Link to={"/AdminSedes"} >
            <li><p>Lista de Sedes</p></li>
          </Link>
          <Link to={"/AdminGetCiudades"} >
            <li><p>Lista de Ciudades</p></li>
          </Link>
          <Link to={"/AdminRegisterProduct"}>
            <li><p>Crear Producto</p></li>
          </Link>
          <Link to={"/AdminRegisterCategory"}>
            <li><p>Crear Categoría</p></li>
          </Link>
          <Link to={"/Register"}>
            <li><p>Crear Usuario</p></li>
          </Link>
          <Link to={"/AdminRegisterCity"}>
            <li><p>Crear Sede</p></li>
          </Link>
        </>
      )}
    </>
  );
};

export default AdminButtonPanel;
