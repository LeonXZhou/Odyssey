import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import './MapEditor.css'

import { useState } from 'react';

import { themeAttributionFinder, themeURLFinder } from '../../Helpers/mapHelper';
import MarkersEdit from './MarkersEdit';

//the MapEditor Component generates a map that can be edited

function MapEditor(props) {
  //only enable map edit when something like an edit button is clicked. editable state keeps track of this.
  // const [editable, setEditable] = useState(false);
  //markers state represents the markers on this map. defaults to the props passed in.
  //the "marker" object passed in is converted to jsx by generateMarkers in markerHelpers function
  const [markers, setMarkers] = useState(props.markers);

  const [iconValue,setIconValue] = useState('TENT');

  //Defaulting Map Themes (theme...Finder() converts theme string such as 'TOPO' to the random garbage string that theme actually needs)
  const mapThemeAttribution = props.mapOptions && themeAttributionFinder(props.mapOptions.themeAttribution);
  const mapThemeURL = props.mapOptions && themeURLFinder(props.mapOptions.themeAttribution);

  return (
    // TileLayer Component: determines theme

    // AddMarker Component: has to be a child of MapContainer. it attaches a listener
    // that updates the markers state if editable is set to true

    <div>
      <div>
        <MapContainer center={props.mapOptions.center} zoom={props.mapOptions.zoom} scrollWheelZoom={true} doubleClickZoom={false}>
          <TileLayer attribution={mapThemeAttribution} url={mapThemeURL} />
          <MarkersEdit markers={markers} setMarkers={setMarkers} icon={iconValue}></MarkersEdit>
        </MapContainer>
      </div>
      <select value={iconValue} onChange={(e)=>{setIconValue(e.target.value)}}>
        <option value="DEFAULT">default</option>
        <option value="TENT">tent</option>
      </select>
      {/* <button onClick={(e) => {
        e.preventDefault();
        if (!editable) {
          setEditable(true);
        }
      }} className={"add mapButton"}>
        Add
      </button> */}
    </div>
  )
}

export default MapEditor;



