import React, { useState } from "react";
import { Marker, Popup,  useMapEvents  } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import { useGlobalStates } from "../Context/global.context";

function LocationMarker() {
    
  const {position, setPosition} = useGlobalStates();
  

    const map = useMapEvents({
      click() {
        map.locate()
      },
      locationfound(e) {
        setPosition(e.latlng)
        console.log('position', position)
        map.flyTo(e.latlng, map.getZoom())
      },
    })
  

    return position === null ? null : (
      <Marker position={position}>
        <Popup>Usted está cerca de aquí.</Popup>
      </Marker>
    )
  }

export default LocationMarker