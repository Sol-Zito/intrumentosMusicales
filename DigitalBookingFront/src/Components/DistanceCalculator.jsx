import React, { useEffect, useState } from "react";
import { useGlobalStates } from "../Context/global.context";

const DistanceCalculator = () => {
  const { coordenadas } = useGlobalStates();
  const [userCoordinates, setUserCoordinates] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    // Crear un mapa con Leaflet
    let map = L.map("map").setView([0, 0], 13);

    // Obtener la geolocalización del usuario
    map.locate({ setView: true, maxZoom: 16 });

    // Manejar el evento de ubicación encontrada
    function onLocationFound(e) {
      let lat = e.latlng.lat;
      let lng = e.latlng.lng;

      setUserCoordinates({ lat, lng });
    }

    map.on("locationfound", onLocationFound);

    // Manejar el evento de error de ubicación
    function onLocationError(e) {
      console.log(e.message);
    }

    map.on("locationerror", onLocationError);

    return () => {
      map.remove();
    };
  }, []);

  const distance = () => {
    if (coordenadas.lat === undefined) {
      return <p>Coordenadas no obtenidas</p>;
    }

    const earthRadiusInKm = 6371; // Radio de la Tierra en kilómetros

    const toRadians = (degrees) => {
      return (degrees * Math.PI) / 180;
    };

    const lat1 = coordenadas.lat;
    const lon1 = coordenadas.lng;
    const lat2 = userCoordinates.lat;
    const lon2 = userCoordinates.lng;

    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distanceInKm = earthRadiusInKm * c;

    return parseInt(distanceInKm);
  };

  return (
    <>
      <div id="map" style={{ display: "none" }}></div>
      <p>Usted se encuentra a {distance()} km de esta sede.</p>
    </>
  );
};

export default DistanceCalculator;
