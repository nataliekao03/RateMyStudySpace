"use client";
import React from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";

const center = { lat: 37.7749, lng: -122.4194 }; // Bay Area

// const spots = [
//   { id: 1, name: "Study Spot 1", lat: 37.7749, lng: -122.4194 },
//   { id: 2, name: "Study Spot 2", lat: 37.7849, lng: -122.4294 },
//   { id: 3, name: "Study Spot 3", lat: 37.7949, lng: -122.4394 },
// ];

const MapComponent = ({ spots = [] }) => {
  const zoom = 16;

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  // If no spots provided, use a fallback center
  const fallbackCenter = { lat: 37.3352, lng: -121.8811 }; // SJSU?
  const center = spots.length > 0
    ? { lat: spots[0].lat, lng: spots[0].lng }
    : fallbackCenter;

  if (!isLoaded) {
    return <div className="text-center">Loading Map...</div>;
  }

  return (
    <div className="rounded-2xl overflow-hidden shadow-lg w-full max-w-4xl h-[500px]">
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }}
        center={center}
        zoom={zoom}
      >
        {spots.map((spot) => (
          <Marker
            key={spot.id}
            position={{ lat: spot.lat, lng: spot.lng }}
            label={spot.id}
            title={spot.name}
          />
        ))}
      </GoogleMap>
    </div>
  );
};

export default MapComponent;
