import React from "react";
import styles from "../Styles/Admin.module.css";
import stylesButton from "../Styles/Button.module.css";
import { useGlobalStatesAdmin } from "../Context/admin.context";
import { useGlobalStates } from "../Context/global.context";

const TableAdmin = () => {
  const { productState, deleteProduct} = useGlobalStatesAdmin();
  const { downPageProduct, upPageProduct, pageProduct } = useGlobalStates();

  return (
       <div className={styles.containerAdminPanel}>
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Imagen</th>
              <th scope="col">Marca</th>
              <th scope="col">Modelo</th>
              <th scope="col">Descripción</th>
              <th scope="col">Categoría</th>
              <th scope="col">Editar</th>
              <th scope="col">Eliminar</th>
            </tr>
          </thead>
       
      <tbody className={styles.tbody}>
        {productState.productList.map((product) => {
          return (
            <tr key={product.idProducto}>
              <td>{product.nombre}</td>
              <td>
                {" "}
                {
                  <img
                    className={styles.previstaImagen}
                    src={product.listaProductosImagenes[0]?.imagen?.urlImagen}
                    alt="imagen del instrumento"
                  />
                }
              </td>
              <td>{product.marca}</td>
              <td>{product.modelo}</td>
              <td>{product.descripcion}</td>
              <td>{product?.categoria?.nombre}</td>
              <td><button   className={stylesButton.buttonSinfondo}> <i className="bi bi-pencil-square"></i><span>     Editar</span></button></td>
              <td>
                <button
                   className={stylesButton.buttonSinfondo}
                  onClick={() => deleteProduct(product.idProducto)}
                >
                  <i className="bi bi-trash3"></i><span>    Eliminar</span>
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
      </table>
      {(pageProduct == 0)
      ?
      
            <div className={stylesButton.containerButton}>
             <span></span>
            <button className={stylesButton.buttonSubirImagen} onClick={upPageProduct}>Siguiente</button> 
            </div>
        :
        <>
          {(productState.productList.length < 10) 
           ?
           <div  className={stylesButton.containerButton} >
           <button className={stylesButton.buttonSubirImagen} onClick={downPageProduct}>Anterior</button>            
           </div>
        :

          <div  className={stylesButton.containerButton} >
          <button className={stylesButton.buttonSubirImagen} onClick={downPageProduct}>Anterior</button>
          <button className={stylesButton.buttonSubirImagen} onClick={upPageProduct}>Siguiente</button>
        </div>
       
          }  </> }
   
            

      </div>
  
  );
};

export default TableAdmin;
