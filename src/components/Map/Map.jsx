import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import './Map.css';
import LocationMarker from '../LocationMarker/LocationMarker';
import Networks from '../Networks/Networks';
import Stations from '../Stations/Stations';


export default function Map() {
    const [data, setData] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [showCountries, setShowCountries] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [networkMarkersVisible, setNetworkMarkersVisible] = useState(true);
    const [selectedNetworkId, setSelectedNetworkId] = useState(null);
    const [stations, setStations] = useState([]);
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

    // Função para lidar com a seleção de país
    const handleCountrySelect = (country) => {
        setSelectedCountry(country);
        setShowCountries(false); // Fechar a lista de países ao selecionar um país
        setSearchTerm(''); // Limpar o termo de pesquisa ao selecionar um país
        setNetworkMarkersVisible(true);
        setStations([]);
    };

    // Extrair a lista de países disponíveis dos dados
    const availableCountries = [...new Set(data.map(network => network.location.country))];

    // Filtrar países com base no termo de pesquisa
    const filteredCountries = availableCountries.filter(country =>
        country.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getNetworkCount = (country) => {
        return data.filter(network => network.location.country === country).length;
    };

    const toggleNetworkMarkersVisibility = () => {
        setNetworkMarkersVisible(!networkMarkersVisible);
    };

    const handleNetworkClick = (networkId) => {
        setSelectedNetworkId(networkId);
        axios.get(`http://api.citybik.es/v2/networks/${networkId}`)
            .then(response => {
                setStations(response.data.network.stations);
                toggleNetworkMarkersVisibility();
            })
            .catch(error => {
                console.error('Error fetching stations:', error);
            });
    };

    const selectedNetwork = data.find(network => network.id === selectedNetworkId);

    return (
        <>
            {selectedCountry && (
                <div className="selected-country-info">
                    <p>{selectedCountry} - Networks: {getNetworkCount(selectedCountry)}</p>
                </div>
            )}
            <div className="country-dropdown">
                <button onClick={() => setShowCountries(!showCountries)}>Selecione um país</button>
                {showCountries && (
                    <div className="country-list">
                        <input
                            type="text"
                            placeholder="Pesquisar país"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        {filteredCountries.map((country, index) => (
                            <button
                                key={index}
                                onClick={() => handleCountrySelect(country)}
                            >
                                {country}
                            </button>
                        ))}
                    </div>
                )}
            </div>
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
                {networkMarkersVisible &&
                    <>
                        {selectedCountry ?
                            data
                                .filter(network => network.location.country === selectedCountry)
                                .map((network, index) => (
                                    <Networks
                                        key={index}
                                        data={network}
                                        index={index}
                                        onClick={handleNetworkClick}
                                    />
                                ))
                            :
                            data.map((network, index) => (
                                <Networks
                                    key={index}
                                    data={network}
                                    index={index}
                                    onClick={handleNetworkClick}
                                />
                            ))
                        }
                    </>
                }
                {stations.map((station, index) => (
                    <Stations
                        key={index}
                        data={station}
                        index={index}
                    />
                ))}
                <LocationMarker />
            </MapContainer>
            {selectedNetworkId && selectedNetwork && (
                <div>{stations.length > 0 && (
                <div className="selected-network-info">
                    
                    <p>{selectedNetwork.name} Network Stations: {stations.length}</p>
                </div>)}
                </div>
            )}
        </>
    );
}
