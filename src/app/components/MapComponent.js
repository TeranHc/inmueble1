"use client";
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './MapStyles.css'; // <-- AÑADE ESTA LÍNEA

import L from 'leaflet';


let DefaultIcon = L.icon({
    iconUrl: "/images/marker-icon.png",
    iconRetinaUrl: "/images/marker-icon-2x.png",
    shadowUrl: "/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const markers = [
  { name: "Estados Unidos (Sede Global)", position: [39.8283, -98.5795], url: "https://www.realleaderfitness.com/" },
  { name: "Chile", position: [-35.6751, -71.543], url: "https://letsgofitness.cl/" },
  { name: "España", position: [40.4168, -3.7038], url: "https://realleader-usa.es/" },
  { name: "Reino Unido", position: [51.5074, -0.1278], url: "https://www.realleader.co.uk/" },
  { name: "India", position: [20.5937, 78.9629], url: "https://intowellness.in/realleader-usa/" },
  { name: "Indonesia", position: [-0.7893, 113.9213], url: "https://realleaderusa.co.id/" },
  { name: "Vietnam", position: [14.0583, 108.2772], url: "https://liveprofitness.vn/collections/vendors?q=realleader-usa" },
  { name: "Australia", position: [-25.2744, 133.7751], url: "https://www.realleaderusa.com.au/" },
];

export default function MapComponent() {
  return (
    <MapContainer 
        center={[20, 10]} 
        zoom={3} // <-- Aumentamos el zoom inicial
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
    >
        <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.map((marker) => (
        <Marker key={marker.name} position={marker.position}>
          <Popup>
            <div className="text-center">
              <h3 className="font-bold text-base mb-1">{marker.name}</h3>
              <a 
                href={marker.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-red-600 hover:text-red-800 font-semibold text-sm"
              >
                Visitar Sitio Web &rarr;
              </a>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}