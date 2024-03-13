import React from "react";
import T from "prop-types";
import styled from "styled-components/macro";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import MapUserMarker from "./MapUserMarker";
import Button from "../../commons/components/Button";
import callLocalStorage from "../../commons/util/callLocalStorage";

const Box = styled.div`
  position: relative;
  width: 40%;
  flex-shrink: 0;
  background-color: var(--neutral-190);
  z-index: var(--z-index-0);
`;

const ButtonStyled = styled(Button)`
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 650;
`;

function Map({ className, universities, setFilters,
               filters }) {
  const position = callLocalStorage("userLocation", "get") || [
    50.06143, 19.93658,
  ];
  const [userLocation, setUserLocation] = React.useState(position);
  const [userLocationEditing, setUserLocationEditing] = React.useState(false);

  function handleUserLocationEditingToggle() {
    if (userLocationEditing && userLocation) {
      callLocalStorage("userLocation", "set", [
        userLocation.lat,
        userLocation.lng,
      ]);
      if (filters.distance) {
        setFilters((currentFilters) => ({
          ...currentFilters,
          distance: {
            ...filters?.distance,
            userCoordinates: {
              latitude: userLocation.lat,
              longitude: userLocation.lng,
            },
          },
        }))
      }else {
        setFilters((currentFilters) => {
              const {distance, ...newFilters} = currentFilters;
              return {
                ...newFilters, userCoordinates: {
                  latitude: userLocation.lat,
                  longitude: userLocation.lng,
                }
              }
            }
        )
      }

    }
    setUserLocationEditing(!userLocationEditing);
  }

  return (
    <Box className={className}>
      <ButtonStyled
        variant="tertiary"
        onClick={handleUserLocationEditingToggle}
      >
        {userLocationEditing
          ? "Zapisz lokację użytkownika"
          : "Ustaw lokację użytkownika"}
      </ButtonStyled>
      <MapContainer center={position} zoom={12}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.jawg.io/jawg-streets/{z}/{x}/{y}{r}.png?access-token=oe69RYYnrr6UsgG1XbmVkHMlBtWBvQhqKQHG61ZIcECAXRVgS1dCOCpeCdGx654i"
        />
        {universities.map((uni) => {
          return (
            <Marker key={uni.name} position={uni.position}>
              <Popup>{uni.name}</Popup>
            </Marker>
          );
        })}
        <MapUserMarker
          userLocationEditing={userLocationEditing}
          userLocation={userLocation}
          setUserLocation={setUserLocation}
        />
      </MapContainer>
    </Box>
  );
}

Map.propTypes = {
  className: T.string,
};

export default Map;
