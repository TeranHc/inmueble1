"use client";
import React, { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';

const mapData = [
  { country: "us", name: "Estados Unidos", value: 1, url: "https://www.realleaderfitness.com/", region: "América del Norte", description: "Sede principal - Equipos de fitness premium", established: "2010" },
  { country: "cl", name: "Chile", value: 1, url: "https://letsgofitness.cl/", region: "América del Sur", description: "Distribuidor oficial - Let's Go Fitness", established: "2015" },
  { country: "es", name: "España", value: 1, url: "https://realleader-usa.es/", region: "Europa", description: "Hub europeo - Distribución continental", established: "2018" },
  { country: "gb", name: "Reino Unido", value: 1, url: "https://www.realleader.co.uk/", region: "Europa", description: "Mercado británico - Equipos profesionales", established: "2019" },
  { country: "in", name: "India", value: 1, url: "https://intowellness.in/realleader-usa/", region: "Asia", description: "Into Wellness - Expansión asiática", established: "2017" },
  { country: "id", name: "Indonesia", value: 1, url: "https://realleaderusa.co.id/", region: "Asia Pacífico", description: "Mercado del sudeste asiático", established: "2020" },
  { country: "vn", name: "Vietnam", value: 1, url: "https://liveprofitness.vn/collections/vendors?q=realleader-usa", region: "Asia Pacífico", description: "Live Pro Fitness - Distribuidor local", established: "2021" },
  { country: "au", name: "Australia", value: 1, url: "https://www.realleaderusa.com.au/", region: "Oceanía", description: "Mercado australiano - Fitness profesional", established: "2016" },
];

// <-- CAMBIO: Paleta de colores única para cada PAÍS -->
const countryColors = {
  "Estados Unidos": "#E11D48", // Rojo Rosado
  "Chile": "#F59E0B",         // Naranja Ámbar
  "España": "#2563EB",         // Azul Vibrante
  "Reino Unido": "#0891B2",    // Cian (Azul-Verde)
  "India": "#8B5CF6",           // Púrpura
  "Indonesia": "#10B981",       // Verde Esmeralda
  "Vietnam": "#FBBF24",         // Amarillo Sol
  "Australia": "#059669"        // Verde Azulado Oscuro
};

export default function WorldMapPage() {
  const [isClient, setIsClient] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const onCountryClick = (event) => {
    const countryCode = event.target.id.toLowerCase();
    const countryData = mapData.find(c => c.country === countryCode);
    if (countryData) {
      setSelectedCountry(countryData);
    }
  };
  
  const WorldMapWithNoSSR = useMemo(() => dynamic(
    () => import('react-svg-worldmap').then(mod => mod.WorldMap),
    { 
      ssr: false,
      loading: () => <div className="w-full h-96 flex justify-center items-center"><p>Cargando Mapa...</p></div>
    }
  ), []);

  const DistributorCard = ({ country }) => (
    <div 
      key={country.country} 
      onClick={() => setSelectedCountry(country)}
      className="group block bg-white border border-gray-200 rounded-xl p-4 hover:border-red-500 transition-all duration-300 hover:shadow-lg cursor-pointer"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          {/* <-- CAMBIO: El círculo ahora usa 'countryColors' --> */}
          <div className="w-4 h-4 rounded-full flex-shrink-0" style={{backgroundColor: countryColors[country.name]}}></div>
          <h3 className="font-bold text-gray-900 group-hover:text-red-600 transition-colors duration-300">
            {country.name}
          </h3>
        </div>
        <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
          {country.established}
        </div>
      </div>
      <p className="text-gray-600 text-sm mb-3 pl-7">
        {country.description}
      </p>
      <div className="flex items-center text-red-600 font-semibold text-sm pl-7">
        <span>Ver Detalles</span>
        <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-100 min-h-screen text-gray-800">
      <section className="bg-white text-gray-800 py-12 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Nuestra <span className="text-red-500">Red Global</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Descubre nuestros distribuidores oficiales alrededor del mundo.
          </p>
        </div>
      </section>

      <div className="max-w-screen-xl mx-auto p-4 md:p-4">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="hidden lg:block lg:w-1/4 space-y-4">
            {mapData.slice(0, 4).map(country => <DistributorCard key={country.country} country={country} />)}
          </div>
          <div className="w-full lg:flex-1 bg-white p-4 md:p-6 rounded-2xl shadow-xl">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Distribuidores Activos</h2>
            <div className="flex justify-center w-full">
              {isClient && (
                <WorldMapWithNoSSR
                  size="responsive"
                  data={mapData}
                  onClickFunction={onCountryClick}
                  styleFunction={(country) => ({
                    fill: mapData.find(c => c.country === country.countryCode.toLowerCase()) 
                          ? countryColors[mapData.find(c => c.country === country.countryCode.toLowerCase()).name] 
                          : '#D1D5DB',
                    stroke: "white",
                    strokeWidth: 1,
                    cursor: mapData.find(c => c.country === country.countryCode.toLowerCase()) ? "pointer" : "default",
                  })}
                />
              )}
            </div>
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 border-t border-gray-200 pt-6">
              {mapData.map((country) => (
                <div key={country.name} className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full border border-gray-300" style={{backgroundColor: countryColors[country.name]}}></div>
                  <span className="text-sm text-gray-700 font-medium">{country.name}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="hidden lg:block lg:w-1/4 space-y-4">
            {mapData.slice(4).map(country => <DistributorCard key={country.country} country={country} />)}
          </div>
        </div>
        <div className="lg:hidden mt-12">
           <h2 className="text-2xl font-bold text-gray-900 mb-6">Nuestros Distribuidores</h2>
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {mapData.map((country) => <DistributorCard key={country.country} country={country} />)}
           </div>
        </div>
      </div>

      {selectedCountry && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedCountry(null)}>
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{selectedCountry.name}</h2>
                {/* <-- CAMBIO: El color del modal ahora usa 'countryColors' --> */}
                <p className="text-sm font-semibold" style={{color: countryColors[selectedCountry.name]}}>{selectedCountry.region}</p>
              </div>
              <button onClick={() => setSelectedCountry(null)} className="text-gray-400 hover:text-gray-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <span className="text-sm text-gray-500 uppercase tracking-wide">Descripción</span>
                <p className="text-gray-700">{selectedCountry.description}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500 uppercase tracking-wide">Establecido</span>
                <p className="text-gray-700 font-semibold">{selectedCountry.established}</p>
              </div>
            </div>
            <a href={selectedCountry.url} target="_blank" rel="noopener noreferrer" className="block w-full mt-6 text-center bg-red-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105">
              Visitar Sitio Web
            </a>
          </div>
        </div>
      )}
    </div>
  );
  
}