import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useGlobalStates } from "../Context/global.context";
import styles from "../Styles/CategoryPage.module.css";
import Card from "../Components/Card";
import ButtonNavigate from "../Components/ButtonNavigate";
import Loader from "../Components/Loader";

const Category = () => {
  const { idCategoria } = useParams();
  const { categoryState, getCategory, loading } = useGlobalStates();

  useEffect(() => {
    getCategory(idCategoria);
  }, [idCategoria]);

  return (
    <section>
      <ButtonNavigate />
      {loading ? <Loader/> :  
      <div className={styles.container}>
        {categoryState.categoryDetail.map((product) => {
          if (product.indicadorHabilitado) {
            return (
              <Link
                key={product.idProducto}
                to={"/productDetail/" + product.idProducto}
              >
              <Card product={product} />
              </Link>
            );
          }
        })}
      </div>
}
    </section>
  );
};

export default Category;
