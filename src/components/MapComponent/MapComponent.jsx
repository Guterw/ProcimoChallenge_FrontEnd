import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, LayersControl, LayerGroup } from 'react-leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import './styles.css';
import LocationMarker from '../LocationMarker/LocationMarker';
import Networks from '../Networks/Networks';

export default function MapComponent() {
  const [data, setData] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null); // Estado para armazenar o país selecionado
  const [showCountries, setShowCountries] = useState(false); // Estado para controlar a visibilidade da lista de países
  const [searchTerm, setSearchTerm] = useState(''); // Estado para armazenar o termo de pesquisa
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
              {selectedCountry &&
                data
                  .filter(network => network.location.country === selectedCountry)
                  .map((network, index) => (
                    <Networks
                      key={index}
                      data={network}
                      index={index}
                    />
                  ))
              }
              {!selectedCountry &&
                data.map((network, index) => (
                  <Networks
                    key={index}
                    data={network}
                    index={index}
                  />
                ))
              }
          <LocationMarker />
      </MapContainer>
    </>
  );
}
