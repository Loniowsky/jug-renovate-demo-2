import React from "react";
import {Marker, Popup, useMapEvents} from "react-leaflet";
import L from "leaflet";

function MapUserMarker({userLocationEditing, userLocation, setUserLocation}) {

    const redIcon = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
        shadowAnchor: [12, 41]
    });

    useMapEvents({
        click(event) {
            if (userLocationEditing) {
                setUserLocation(event.latlng);
            }
        },
    });

    return (
        <Marker position={userLocation} icon={redIcon}>
            <Popup>
                Twoja lokalizacja
            </Popup>
        </Marker>
    );
}

export default MapUserMarker;