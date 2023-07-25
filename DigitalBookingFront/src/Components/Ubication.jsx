import React, { useEffect } from "react";
import styles from "../Styles/ProductDetail.module.css";
import { useGlobalStates } from "../Context/global.context";
import { ciudadesContext } from "../Context/ciudades.context";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import UbicationCard from "./UbicationCard";

const Ubication = () => {
  const { productoSedes } = useGlobalStates();


  const { traigoCiudades, getProvincia } = ciudadesContext();

  useEffect(() => {
    traigoCiudades();
    getProvincia();
  }, []);


  return (
    <div className={styles.block}>
      <Swiper
        slidesPerView={1}
        navigation={true}
        modules={[Navigation]}
        style={{
          "--swiper-navigation-color": "#F0572D",
          "position": "relative",
          "zIndex": "0",
        }}
        className="mySwiper"
      >
        {productoSedes.map((sede, index) => (
          <>
            <SwiperSlide key={sede.sede}>
              <UbicationCard sede={sede} />
            </SwiperSlide>
          </>
        ))}
      </Swiper>
    </div>
  );
};

export default Ubication;
