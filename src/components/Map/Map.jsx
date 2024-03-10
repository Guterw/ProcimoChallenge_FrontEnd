import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import './Map.css';
import LocationMarker from '../LocationMarker/LocationMarker';
import Networks from '../Networks/Networks';
import Stations from '../Stations/Stations';
import CustomButton from '../CustomButton/CustomButton';
import CloseImage from '../../assets/Close.svg'


export default function Map() {
    const [data, setData] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [showCountries, setShowCountries] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [networkMarkersVisible, setNetworkMarkersVisible] = useState(true);
    const [selectedNetworkId, setSelectedNetworkId] = useState(null);
    const [stations, setStations] = useState([]);
    const position = [47, 10];

    useEffect(() => {
        axios
            .get("http://api.citybik.es/v2/networks")
            .then((response) => {
                setData(response.data.networks);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleCountrySelect = (country) => {
        setSelectedCountry(country);
        setShowCountries(false);
        setSearchTerm('');
        setNetworkMarkersVisible(true);
        setStations([]);
    };

    const availableCountries = [...new Set(data.map(network => network.location.country))];

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
                if (!selectedCountry) {
                    setSelectedCountry(response.data.network.location.country);
                }
            })
            .catch(error => {
                console.error('Error fetching stations:', error);
            });
    };

    const resetMapLayers = () => {
        setSelectedCountry(null);
        setSelectedNetworkId(null);
        setStations([]);
        setNetworkMarkersVisible(true);
    };

    const removeStationsLayer = () => {
        setStations([]);
        setNetworkMarkersVisible(true);

    };

    const removeNetworksLayer = () => {
        setSelectedCountry(null);
        setSelectedNetworkId(null);
        setStations([]);
        setNetworkMarkersVisible(true);
    };

    const selectedNetwork = data.find(network => network.id === selectedNetworkId);

    return (
        <>
            {selectedCountry && (
                <div className="selected-country-info">
                    <p>{selectedCountry} - Country Networks: {getNetworkCount(selectedCountry)}</p>
                    <CustomButton 
                        onClick={removeNetworksLayer}
                        image={CloseImage}
                        style={{ width: '30px', height: '30px', marginRight: '5px' }}
                        tooltip="Close layer"
                    />
                </div>
            )}
            <div className="country-dropdown">
                <button onClick={() => setShowCountries(!showCountries)}>
                    {selectedCountry ? selectedCountry : "Choose a country"}
                </button>
                {showCountries && (
                    <div className="country-list">
                        <input
                            type="text"
                            placeholder="Search a country"
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
                zoom={5}
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
                        <CustomButton 
                            onClick={removeStationsLayer}
                            image={CloseImage}
                            style={{ width: '30px', height: '30px', marginRight: '5px' }}
                            tooltip="Close layer"
                        />
                    </div>
                )}
                </div>
            )}
            <div>
                <button onClick={resetMapLayers}>Resetar Mapa</button>
            </div>
        </>
    );
}
