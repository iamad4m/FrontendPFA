"use client";

import React, { useEffect, useState } from "react";
import {
  DirectionsRenderer,
  GoogleMap,
  useJsApiLoader,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "480px",
};

const center = {
  lat: 34.06525,
  lng: -4.97336,
};
const destination = {
  lat: 34.05156855629086,
  lng: -4.993323516100645,
};
const wayPoints = [
  {
    location: {
      lat: 34.06481995939324,
      lng: -4.978783817720926,
    },
    stopover: true,
  },
  {
    location: {
      lat: 34.05880269350849,
      lng: -4.986556495774336,
    },
    stopover: true,
  },
];
export default function MyMap() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY,
  });

  const [directionResponse, setDirectionResponse] = useState(null);
  const [map, setMap] = useState(null);

  async function calculateRoute() {
    // eslint-disable-next-line no-undef
    const directionService = new google.maps.DirectionsService();
    const results = await directionService.route({
      origin: center,
      destination: destination,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
      waypoints: wayPoints,
    });
    setDirectionResponse(results);
  }

  return isLoaded ? (
    <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
        options={{
          zoomControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          mapTypeControl: false,
        }}
        onLoad={(map) => {
          setMap(map);
          calculateRoute();
        }}
      >
        {directionResponse && (
          <DirectionsRenderer directions={directionResponse} />
        )}
      </GoogleMap>

      <button
        onClick={() => map.panTo(center)}
        type="button"
        class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-3"
      >
        Center Map
      </button>
    </>
  ) : (
    <></>
  );
}
