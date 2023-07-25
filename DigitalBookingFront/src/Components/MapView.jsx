import React, { useEffect } from "react";
import { useGlobalStates } from "../Context/global.context";
import { ciudadesContext } from "../Context/ciudades.context";
import stylesText from '../Styles/Text.module.css'

import { GoogleMap, Marker } from "@react-google-maps/api";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const MapView = () => {

  const { productoSedes } = useGlobalStates();
  const { traigoCiudades, getProvincia, provinces } = ciudadesContext();


  useEffect(() => {
    traigoCiudades()
    getProvincia()
  }, [provinces.idProvincia])

  return (

    <div className={stylesText.containerZindexCero}>
      <Swiper
        slidesPerView={1}
        navigation={true}
        spaceBetween={30}
        effect={"fade"}
        modules={[Navigation]}
        style={{
          "--swiper-navigation-color": "#F0572D",
          "width": "80%",

        }}
        className="mySwiper"
      >
        {productoSedes.map((sede, index) => (
          <>

            <SwiperSlide key={sede.idSede}>
              <h2 className={stylesText.subtitle}>{sede.sede}</h2>
              <GoogleMap mapContainerStyle={{ width: '90%', height: '500px', margin: 'auto', borderRadius: '8px' }} center={{ lat: parseFloat(sede.latitud), lng: parseFloat(sede.longitud) }} zoom={15} >
                <Marker position={{ lat: parseFloat(sede.latitud), lng: parseFloat(sede.longitud) }} />
              </GoogleMap>
            </SwiperSlide>

          </>

        ))
        }
      </Swiper>

    </div>
  )
}

export default MapView