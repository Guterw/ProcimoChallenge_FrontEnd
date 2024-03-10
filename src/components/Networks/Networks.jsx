import React from "react";
import { Marker, Tooltip } from 'react-leaflet';
import NetworkPng from '../../assets/Network.png';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function Networks({ data, index, onClick }) {
    
    const customIcon = L.icon({
        iconUrl: NetworkPng,
        iconSize: [40, 40],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
    });

    const handleClick = () => {
        onClick(data.id);
    };
    
    return (
        <Marker
            icon={customIcon}
            key={index}
            position={[data.location.latitude, data.location.longitude]}
            eventHandlers={{ click: handleClick }}
            data-testid="marker"
        >
            <Tooltip sticky>
                <div style={{ alignItems: 'center', textAlign: 'center', width: '100%', padding: '2px' }}>
                    <h2 style={{ padding: '0 25px'}}>{data.name}</h2>
                    <p>{data.location.city}</p>
                </div>
            </Tooltip>
        </Marker>
    )
}
