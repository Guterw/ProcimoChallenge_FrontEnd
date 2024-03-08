import React from "react"
import { Marker, Popup } from 'react-leaflet';
import StationSvg from '../../assets/Station.svg'
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function Stations ({ data, index }) {
    
    const customIcon = L.icon({
        iconUrl: StationSvg,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
    });
    
    return (
        <Marker
            icon={customIcon}
            key={index}
            position={[data.location.latitude, data.location.longitude]}
        >
            <Popup>
                <div>
                    <h2>{data.name}</h2>
                    <p>{data.location.city}</p>
                </div>
            </Popup>
        </Marker>
    )
}