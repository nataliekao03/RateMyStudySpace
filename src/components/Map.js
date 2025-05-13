// // src/components/MapComponent.js
// "use client";
// import React, { useState, useEffect } from "react";
// import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

// const MapComponent = () => {
//   // Set the map center (Bay Area coordinates)
//   const center = { lat: 37.7749, lng: -122.4194 }; // San Francisco

//   // Set the initial zoom level
//   const zoom = 12;

//   // Sample spots data (we need to fetch this from Firebase later, using dummy spots for now)
//   const spots = [
//     { id: 1, name: "Study Spot 1", lat: 37.7749, lng: -122.4194 },
//     { id: 2, name: "Study Spot 2", lat: 37.7849, lng: -122.4294 },
//     { id: 3, name: "Study Spot 3", lat: 37.7949, lng: -122.4394 },
//   ];

//   return (
//     <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
//       <GoogleMap
//         mapContainerStyle={{ width: "50%", height: "400px" }}
//         center={center}
//         zoom={zoom}
//       >
//         {/* Loop through the spots array and render a Marker for each */}
//         {spots.map((spot) => (
//           <Marker
//             key={spot.id}
//             position={{ lat: spot.lat, lng: spot.lng }}
//             label={spot.name} // This will display the spot name on the marker
//             title={spot.name} // This is the title that appears when hovering over the marker
//           />
//         ))}
//         <Marker position={center} />
//       </GoogleMap>
//     </LoadScript>
//   );
// };

// export default MapComponent;
"use client";
import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const MapComponent = () => {
  const center = { lat: 37.7749, lng: -122.4194 };
  const zoom = 12;

  const spots = [
    { id: 1, name: "Study Spot 1", lat: 37.7749, lng: -122.4194 },
    { id: 2, name: "Study Spot 2", lat: 37.7849, lng: -122.4294 },
    { id: 3, name: "Study Spot 3", lat: 37.7949, lng: -122.4394 },
  ];

  return (
    <div className="rounded-2xl overflow-hidden shadow-lg  w-full max-w-4xl h-[500px]">
      <LoadScript
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
      >
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={center}
          zoom={zoom}
        >
          {spots.map((spot) => (
            <Marker
              key={spot.id}
              position={{ lat: spot.lat, lng: spot.lng }}
              label={spot.name}
              title={spot.name}
            />
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default MapComponent;
