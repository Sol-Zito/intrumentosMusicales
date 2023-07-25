import React from "react";
import { useGlobalStates } from "../Context/global.context";
import Card from "../Components/Card";
import styles from "../Styles/Card.module.css";
import stylesText from "../Styles/Text.module.css";
import stylesButton from "../Styles/Button.module.css";
import { Link } from "react-router-dom";

const Recomendaciones = () => {
  const { productState, pageProduct, upPageProduct, downPageProduct } = useGlobalStates();
  return (
    <>
      <h2 className={stylesText.title}>Recomendaciones</h2>
      <div className={styles.cardGrid}>
        {productState.productList.map((product) => {
          return (
            <Link
              key={product.idProducto}
              to={"/productDetail/" + product.idProducto}
            >
              <Card product={product} />
            </Link>

          );        

        })}

          {(pageProduct == 0)
            ?
            <div className={stylesButton.containerButton}>
             <span></span>
            <button className={stylesButton.buttonSubirImagen} onClick={upPageProduct}>Siguiente</button> 
            </div>
           : 
            <div  className={stylesButton.containerButton} >
           <button className={stylesButton.buttonSubirImagen} onClick={downPageProduct}>Anterior</button>
           <button className={stylesButton.buttonSubirImagen} onClick={upPageProduct}>Siguiente</button>
            
           </div>
           }  
      </div>
    </>
  );
};

export default Recomendaciones;
