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

export default function MyMap({ info }) {
  const center = {
    lat: info.circuit.departureMonument.latitude,
    lng: info.circuit.departureMonument.longitude,
  };

  const destination = {
    lat: info.circuit.monuments[info.route[info.route.length - 1]].latitude,
    lng: info.circuit.monuments[info.route[info.route.length - 1]].longitude,
  };

  const wayPoints = info.route
    .filter((monument, index) => {
      return index !== info.route.length - 1;
    })
    .map((monIndex) => {
      return {
        location: {
          lat: info.circuit.monuments[monIndex].latitude,
          lng: info.circuit.monuments[monIndex].longitude,
        },
        stopover: true,
      };
    });

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
        className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-3"
      >
        Center Map
      </button>
    </>
  ) : (
    <></>
  );
}
