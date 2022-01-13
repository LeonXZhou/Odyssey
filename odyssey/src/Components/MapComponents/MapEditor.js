import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import L from 'leaflet';
import './MapEditor.css'

import { useState } from 'react';

import { iconFinder } from '../../Helpers/markerHelpers';
import { themeAttributionFinder, themeURLFinder } from '../../Helpers/mapHelper';

function MapEditor(props) {
  //Defaulting Map Theme
  const [editable, setEditable] = useState(false)
  const mapThemeAttribution = props.mapOptions && themeAttributionFinder(props.mapOptions.themeAttribution)
  const mapThemeURL = props.mapOptions && themeURLFinder(props.mapOptions.themeAttribution)

  return (
    <div>
      <div>
        <MapContainer center={props.mapOptions.center} zoom={props.mapOptions.zoom} scrollWheelZoom={false} doubleClickZoom={false}>
          <TileLayer
            attribution={mapThemeAttribution}
            url={mapThemeURL}
          />
        </MapContainer>
      </div>

      
      <button onClick={(e) => {
        e.preventDefault();
        if (!editable) {
          setEditable(true);
        }
      }} className={"add mapButton"}>
        edit
      </button>
    </div>
  )
}

export default MapEditor;