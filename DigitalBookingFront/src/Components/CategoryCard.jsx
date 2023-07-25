import React from "react";
import styles from "../Styles/CardCategory.module.css";
import CategoryList from "./CategoryList";

const CategoryCard = ({ categoria }) => {
  return (
    <div className={styles.cardCategory}>
      <img
        className={styles.imgCategory}
        src={categoria.urlImagen}
        alt="foto categoria"
      />
      <h3 className={styles.textTitleCategoryCard}>{categoria.nombre}</h3>
      <p className={styles.descriptionCategory}>
        {categoria.descripcion.substring(0, 20)}...
      </p>
    </div>
  );
};

export default CategoryCard;
