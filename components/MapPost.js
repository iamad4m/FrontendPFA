"use client";

import React, { useState } from "react";
import {
  DirectionsRenderer,
  GoogleMap,
  useJsApiLoader,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "480px",
};

export default function MapPost({ coordinates, departure, route }) {
  const center = {
    lat: departure[0],
    lng: departure[1],
  };

  const destination = {
    lat: coordinates[route[route.length - 1]][0],
    lng: coordinates[route[route.length - 1]][1],
  };

  const wayPoints = route
    .filter((r) => {
      return r !== route[route.length - 1];
    })
    .map((myIndex) => {
      return {
        location: {
          lat: coordinates[myIndex][0],
          lng: coordinates[myIndex][1],
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
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={13}
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
  ) : (
    <></>
  );
}
