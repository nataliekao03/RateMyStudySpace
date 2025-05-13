import React from "react";
import MapComponent from "@/components/Map";

export default function page() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-center mt-10">
        Map View (can remove since map component is on home page)
      </h1>
      <div className="mt-8">
        <MapComponent />
      </div>
    </div>
  );
}
