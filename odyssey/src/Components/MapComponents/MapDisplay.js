import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import L from 'leaflet';

import { iconFinder } from '../../Helpers/markerHelpers';
import { themeAttributionFinder, themeURLFinder } from '../../Helpers/mapHelper';

function MapDisplay(props) {
  let markers = <></>;

  if (props.markers){
    markers = props.markers.map((marker, i) => {
      //setting default options for markers
      const markerWidth = marker.iconSize ? marker.iconSize[0] : 20;
      const markerHeight = marker.iconSize ? marker.iconSize[1] : 20;
      const icon = marker.icon ? marker.icon : "DEFAULT";
      const markerPosition = marker.position ? marker.position : [0, 0];
  
      return (
        <Marker
          position={markerPosition}
          icon={
            new L.Icon({
              iconUrl: iconFinder(icon),
              iconSize: new L.Point(markerWidth, markerHeight),
              className: 'leaflet-div-icon'
            })}
          key={i}>
  
          {marker.popUp ? <Popup>
            <h1>{marker.popUp.name}</h1>
            <p>{marker.popUp.description}</p>
          </Popup>:<></>}
  
        </Marker>)
    })
  }

  //Defaulting Map Theme
  const mapThemeAttribution = props.mapOptions && themeAttributionFinder(props.mapOptions.themeAttribution )
  const mapThemeURL = props.mapOptions && themeURLFinder(props.mapOptions.themeAttribution )

  return (
    <MapContainer center={props.mapOptions.center} zoom={props.mapOptions.zoom} scrollWheelZoom={false} doubleClickZoom={false}>
      <TileLayer
        attribution= {mapThemeAttribution}
        url= {mapThemeURL}
      />

      {markers}

    </MapContainer>
  )
}

export default MapDisplay;