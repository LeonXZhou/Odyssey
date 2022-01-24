import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer } from 'react-leaflet'
import './MapEditor.scss'
import L from 'leaflet'

import { useState } from 'react';
import { useContext } from "react";
import { mapContext } from "../providers/MapProvider";

import { updateMapById } from "../../Helpers/apiHelpers"
import { themeAttributionFinder, themeURLFinder } from '../../Helpers/mapHelper';
import MarkersEdit from './MarkersEdit';

//the MapEditor Component generates a map that can be edited

function MapEditor(props) {

  //only enable map edit when something like an edit button is clicked. editable state keeps track of this.
  const [editable, setEditable] = useState(false);
  //markers state represents the markers on this map. defaults to the props passed in.
  //the "marker" object passed in is converted to jsx by generateMarkers in markerHelpers function
  // const [markers, setMarkers] = useState(props.markers);
  const [iconValue, setIconValue] = useState('TENT');
  //Defaulting Map Themes (theme...Finder() converts theme string such as 'TOPO' to the random garbage string that theme actually needs)
  const mapThemeAttribution = props.mapOptions && themeAttributionFinder(props.mapOptions.themeAttribution);
  const mapThemeURL = props.mapOptions && themeURLFinder(props.mapOptions.themeAttribution);
  if (!props.mapOptions.zoom) {
    props.mapOptions.zoom = 12;
  }

  const { map, setMap } = useContext(mapContext);
  return (
    // TileLayer Component: determines theme

    // AddMarker Component: has to be a child of MapContainer. it attaches a listener
    // that updates the markers state if editable is set to true

    <div className={"map-editor"}>
      <MapContainer center={props.mapOptions.center}
        zoom={props.mapOptions.zoom}
        scrollWheelZoom={true}
        doubleClickZoom={false}
      >
        <TileLayer
          continuousWorld={false}
          noWrap={true}
          attribution={
            'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Map style: &copy; <a href="https://waymarkedtrails.org">waymarkedtrails.org</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
          }
          url={"https://tile.waymarkedtrails.org/hiking/{z}/{x}/{y}.png"}
          zIndex={2}
        />
        <TileLayer
          attribution={mapThemeAttribution}
          url={mapThemeURL}
          continuousWorld={true}
          noWrap={true} />
          zIndex{1}
        <MarkersEdit
          markers={props.markers}
          // setMarkers={setMarkers}
          icon={iconValue}
          editable={editable}
          setEditable={setEditable}
          startDate={props.startDate}
          endDate={props.endDate}
          setRouteArray={props.setRouteArray}
          mapId={props.mapOptions.mapId}
          tripId={props.trip_id}></MarkersEdit>
      </MapContainer>
      <div className={"map-edit-form"}>
        <select value={iconValue} onChange={(e) => { setIconValue(e.target.value) }}>
          <option value="DEFAULT">default</option>
          <option value="TENT">tent</option>
        </select>
        <button onClick={(e) => {
          e.preventDefault();
          if (!editable) {
            setEditable(true);
          }
        }} className={"add mapButton"}>
          Add
        </button>
        <button onClick={(e) => {
          e.preventDefault();
          updateMapById(props.mapOptions.mapId, map.getCenter().lat, map.getCenter().lng, map.getZoom())
        }} className={"add mapButton"}>
          Save Map
        </button>
      </div>
    </div>
  )
}

export default MapEditor;



