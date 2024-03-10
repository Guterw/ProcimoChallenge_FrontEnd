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
        <div>
        <Marker
            icon={customIcon}
            key={index}
            position={[data.latitude, data.longitude]}
        >
            <Tooltip sticky>
                <div style={{ marginRight: '25px', padding: '0 6px', width: '100%' }}>
                    <h2 style={{ alignItems: 'center', textAlign: 'center', width: '100%' }}>{data.name}</h2>
                    <p>{data.free_bikes} Available bikes</p>
                    <p>{data.empty_slots} Empty spaces</p>
                </div>
            </Tooltip>
        </Marker>
        </div>
    )
}
