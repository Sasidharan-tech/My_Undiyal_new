"use client";

import { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import {
  CircleMarker,
  MapContainer,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";

function MapClickCapture({ onPick }) {
  useMapEvents({
    click(event) {
      onPick({
        lat: event.latlng.lat,
        lng: event.latlng.lng,
      });
    },
  });

  return null;
}

function RecenterMap({ center }) {
  const map = useMap();

  useEffect(() => {
    if (!center) {
      return;
    }

    map.setView([center.lat, center.lng], map.getZoom(), {
      animate: true,
    });
  }, [center, map]);

  return null;
}

export default function LocationPickerMap({ center, selectedCoords, onPick }) {
  return (
    <div className="mt-3 overflow-hidden rounded-xl border border-[#D8D8D8] bg-white">
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={16}
        scrollWheelZoom={false}
        className="h-64 w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapClickCapture onPick={onPick} />
        <RecenterMap center={center} />

        {selectedCoords ? (
          <CircleMarker
            center={[selectedCoords.lat, selectedCoords.lng]}
            radius={10}
            pathOptions={{
              color: "#C1683A",
              fillColor: "#C1683A",
              fillOpacity: 0.35,
              weight: 2,
            }}
          />
        ) : null}
      </MapContainer>
    </div>
  );
}
