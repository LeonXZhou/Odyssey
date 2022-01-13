import 'leaflet/dist/leaflet.css';
import { useState } from 'react';
import {Marker, useMapEvents,Popup } from 'react-leaflet'
import L from 'leaflet';

import { iconFinder, generateMarkers } from '../../Helpers/markerHelpers';
function AddMarkers(props) {

  const map = useMapEvents({
    click: (e) => {
      if (props.editable)
      {
        props.setMarkers((prev)=>{return [...prev,{ position: [e.latlng.lat, e.latlng.lng], iconSize: [40,40], iconId: prev.length},]})
        props.setEditable(false)
      }
    },
  })

  const markers = generateMarkers(props.markers)


  return (<>{markers}</>)
}


export default AddMarkers;
