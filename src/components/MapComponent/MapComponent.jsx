import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import './styles.css';
import Stations from '../Stations/Stations';

export default function MapComponent () {
    const [data, setData] = useState([]);
    const position = [51.505, -0.09]; // Posição padrão do mapa

    useEffect(() => {
        axios
        .get("http://api.citybik.es/v2/networks")
        .then((response) => {
            setData(response.data.networks); // Armazenar os dados na state 'data'
        })
        .catch((error) => {
            console.log(error);
        });
    }, []);

    return (
        <>
            <MapContainer
                center={position} 
                zoom={11}
                scrollWheelZoom={true}
                className='map-container'
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {data.map((network, index) => (
                    <Stations
                        key={index}
                        data={network}
                        index={index}
                    />
                ))}
            </MapContainer>
        </>
    );
}