import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useGlobalStates } from "../Context/global.context";
import stylesCategory from "../Styles/CardCategory.module.css";
import CategoryCard from "./CategoryCard";
import stylesText from "../Styles/Text.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper";

const CategoryList = () => {
  const { categoryState } = useGlobalStates();

  return (
    <div className={stylesCategory.container}>
      <h2 className={stylesText.title}>Buscar por Categorías</h2>

      <Swiper
        slidesPerView={1}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          450: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1200: {
            slidesPerView: 5,
            spaceBetween: 50,
          },
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {categoryState.categoryList.map((categoria) => (
          <SwiperSlide   key={categoria.idCategoria}>
            {" "}
            <Link
            
              to={"/Category/" + categoria.idCategoria}
            >
              {" "}
              <CategoryCard categoria={categoria} />
            </Link>{" "}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CategoryList;
