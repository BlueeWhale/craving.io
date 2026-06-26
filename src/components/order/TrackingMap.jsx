import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import io from 'socket.io-client';

// Core Leaflet CSS load
import 'leaflet/dist/leaflet.css';

const socket = io(import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000');

// ==========================================
// 1. DYNAMIC CUSTOM MARKERS CONFIGURATION
// ==========================================
// Yahan hum SVG vectors se real-time custom icons trace kar rhe hain

const bikeIcon = new L.Icon({
  iconUrl: '/bike.png',
  iconSize: [36, 36],
  iconAnchor: [18, 36], // Bottom-center point touch point anchor
  popupAnchor: [0, -36],
});

const homeIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="%230f172a" stroke="%23ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
  iconSize: [34, 34],
  iconAnchor: [17, 34],
  popupAnchor: [0, -34],
});

// Map View Recenter Hook
const RecenterMap = ({ coords }) => {
  const map = useMap();
  useEffect(() => {
    if (coords) {
      map.setView(coords, map.getZoom());
    }
  }, [coords, map]);
  return null;
};

const TrackingMap = ({ orderId }) => {
  const [customerLoc] = useState([28.6139, 77.2090]); // Home
  const [riderLoc, setRiderLoc] = useState([28.6100, 77.2010]); // Live Bike Coordinates
  const [status, setStatus] = useState('Preparing your food...');

  useEffect(() => {
    if (orderId) {
      socket.emit('trackOrder', orderId);

      socket.on('riderLocationUpdated', (data) => {
        if (data.coords) setRiderLoc(data.coords);
        if (data.status) setStatus(data.status);
      });
    }

    // Backup simulation for smooth movement flow tracking
    const mockMovement = setInterval(() => {
      setRiderLoc((prev) => {
        const nextLat = prev[0] + 0.0003;
        const nextLng = prev[1] + 0.0003;
        
        if (nextLat >= customerLoc[0]) {
          setStatus('Rider has arrived at your gate! 🛵 Enjoy your warm meal.');
          clearInterval(mockMovement);
          return customerLoc;
        } else {
          setStatus('Rider is speeding towards your destination matrix... 🚀');
        }
        return [nextLat, nextLng];
      });
    }, 3000);

    return () => {
      socket.off('riderLocationUpdated');
      clearInterval(mockMovement);
    };
  }, [orderId, customerLoc]);

  return (
    <div className="space-y-4">
      {/* Live Headbar Overlay status */}
      <div className="bg-slate-900 dark:bg-darkcard text-white p-4 rounded-2xl flex items-center justify-between shadow-md border border-slate-800">
        <div>
          <span className="text-[10px] font-mono text-rose-400 uppercase tracking-widest block mb-0.5">Live Delivery Pulse</span>
          <h4 className="text-sm font-black tracking-tight">{status}</h4>
        </div>
        <div className="text-2xl animate-bounce">🛵</div>
      </div>

      {/* Map Board Render Stage */}
      <div className="h-80 w-full rounded-3xl overflow-hidden shadow-inner border border-slate-200 dark:border-slate-800/80 relative z-10">
        <MapContainer center={riderLoc} zoom={15} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          <RecenterMap coords={riderLoc} />

          {/* 2. CUSTOM HOME PIN ASSIGNED HERE */}
          <Marker position={customerLoc} icon={homeIcon}>
            <Popup><span className="font-bold text-xs">Your Delivery Drop-off 🏠</span></Popup>
          </Marker>

          {/* 3. CUSTOM RIDER BIKE PIN ASSIGNED HERE */}
          <Marker position={riderLoc} icon={bikeIcon}>
            <Popup><span className="font-bold text-xs">Your Food is on this Bike! 🛵</span></Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default TrackingMap;