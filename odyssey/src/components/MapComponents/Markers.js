import { useMapEvents } from "react-leaflet";
import SingleMarker from "./SingleMarker";
import MarkerForm from "./MarkerForm";

function Markers(props) {

  useMapEvents({
    click: (e) => {
      props.setMarkers((prev) => {
        return [...prev, {
          position: [e.latlng.lat, e.latlng.lng], iconSize: [20, 20], icon: props.icon, popUp: {
            content: <MarkerForm/>  }
        }]
      })
    },
  })

  const markersJSX = props.markers.map((marker, i) => {
    //setting default options for markers
    const markerWidth = marker.iconSize ? marker.iconSize[0] : 20;
    const markerHeight = marker.iconSize ? marker.iconSize[1] : 20;
    const icon = marker.icon ? marker.icon : "DEFAULT";
    const markerPosition = marker.position ? marker.position : [0, 0];
    // const iconAnchor = [markerWidth/2, markerHeight];

    return (
      <SingleMarker markerPosition={markerPosition}
        icon={icon}
        markerWidth={markerWidth}
        markerHeight={markerHeight}
        marker={marker} 
        key={i}/>
    );
  });
  return markersJSX;
}

export default Markers;
