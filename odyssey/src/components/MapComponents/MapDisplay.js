// import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer } from 'react-leaflet'

import Markers from './Markers';
import MapTheme from './MapTheme';
function MapDisplay(props) {

  if (!props.mapOptions.zoom) {
    props.mapOptions.zoom = 8;
  }



  return (
    <MapContainer center={props.mapOptions.center} zoom={props.mapOptions.zoom} scrollWheelZoom={props.mapOptions.scrollWheelZoom} doubleClickZoom={false}>
      <TileLayer
        continuousWorld={false}
        // noWrap={true}
        attribution={
          'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Map style: &copy; <a href="https://waymarkedtrails.org">waymarkedtrails.org</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
        }
        url={"https://tile.waymarkedtrails.org/hiking/{z}/{x}/{y}.png"}
        zIndex={2}
      />
      <MapTheme mapTheme={props.mapOptions.theme}></MapTheme>
      <Markers markers={props.markers}></Markers>

    </MapContainer>
  )
}

export default MapDisplay;