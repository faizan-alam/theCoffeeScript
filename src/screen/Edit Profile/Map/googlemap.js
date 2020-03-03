import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
    <GoogleMap
        defaultZoom={12}
        defaultCenter={{ lat: props.coords.latitude, lng: props.coords.longitude }}
    >
        {props.isMarkerShown && <Marker position={{ lat: props.coords.latitude, lng: props.coords.longitude }} draggable onDragEnd={position => { props.updateCoords({latitude: position.latLng.lat(), longitude: position.latLng.lng()})}} controlPosition={1} />}
    </GoogleMap>
))

export default MyMapComponent;