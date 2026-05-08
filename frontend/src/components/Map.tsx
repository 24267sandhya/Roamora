"use client";

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon in Leaflet + Next.js
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

interface MapProps {
  destination: string;
}

function ChangeView({ center }: { center: [number, number] }) {
  const map = useMap();
  map.setView(center, 12);
  return null;
}

export default function Map({ destination }: MapProps) {
  const [coords, setCoords] = useState<[number, number]>([51.505, -0.09]); // Default London

  useEffect(() => {
    // Simple geocoding using Nominatim (OpenStreetMap) to get coordinates for the destination
    if (!destination) return;
    
    const fetchCoords = async () => {
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(destination)}`);
        const data = await res.json();
        if (data && data.length > 0) {
          setCoords([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
        }
      } catch (error) {
        console.error("Failed to geocode destination:", error);
      }
    };
    
    fetchCoords();
  }, [destination]);

  return (
    <div className="w-full h-full rounded-2xl overflow-hidden shadow-lg border border-white/10 relative z-0">
      <MapContainer 
        center={coords} 
        zoom={12} 
        scrollWheelZoom={false} 
        style={{ height: '100%', width: '100%', minHeight: '300px' }}
      >
        <ChangeView center={coords} />
        {/* Dark theme map tiles */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        <Marker position={coords}>
          <Popup>
            <div className="text-black font-semibold">{destination}</div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
