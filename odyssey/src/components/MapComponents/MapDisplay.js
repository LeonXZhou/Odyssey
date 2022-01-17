import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer} from 'react-leaflet'

import Markers from './Markers';
import { themeAttributionFinder, themeURLFinder } from '../../Helpers/mapHelper';

function MapDisplay(props) {
  // let markers = <></>;

  // if (props.markers){
  //   markers = Markers(props.markers)
  // }

  if (!props.mapOptions.zoom)
  {
    props.mapOptions.zoom = 8;
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

      <Markers markers={props.markers}></Markers>

    </MapContainer>
  )
}

export default MapDisplay;