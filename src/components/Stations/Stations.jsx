import React from "react";
import { Marker, Tooltip } from 'react-leaflet';
import StationSvg from '../../assets/Station.svg';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function Stations({ data, index }) {
    
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
            position={[data.latitude, data.longitude]}
        >
            <Tooltip sticky>
                <div>
                    <h2>{data.name}</h2>
                    <p>{data.free_bikes} bicicletas disponíveis</p>
                </div>
            </Tooltip>
        </Marker>
    )
}
