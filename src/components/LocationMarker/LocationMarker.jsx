import React, { useState } from "react"
import { useMapEvents, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import LocationPng from '../../assets/Location.png'

export default function LocationMarker() {
    const customIcon = L.icon({
        iconUrl: LocationPng,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
    });
    
    const [position, setPosition] = useState(null)
    const map = useMapEvents({
        click() {
        map.locate()
      },
      locationfound(e) {
        setPosition(e.latlng)
        map.flyTo(e.latlng, map.getZoom())
      },
    })
  
    return position === null ? null : (
      <Marker
        position={position}
        icon={customIcon}
      >
        <Popup>You are here</Popup>
      </Marker>
    )
  }