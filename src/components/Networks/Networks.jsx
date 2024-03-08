import React from "react"
import { Marker, Tooltip } from 'react-leaflet';
import NetworkSvg from '../../assets/Network.svg'
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function Networks ({ data, index }) {
    
    const customIcon = L.icon({
        iconUrl: NetworkSvg,
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
            <Tooltip sticky>
                <div>
                    <h2>{data.name}</h2>
                    <p>{data.location.city}</p>
                </div>
            </Tooltip>
        </Marker>
    )
}