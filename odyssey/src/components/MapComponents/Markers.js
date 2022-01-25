
import SingleMarker from "./SingleMarker";

function Markers(props) {

  const markersJSX = props.markers.map((marker, i) => {
    //setting default options for markers
    const markerWidth = marker.iconSize ? marker.iconSize[0] : 30;
    const markerHeight = marker.iconSize ? marker.iconSize[1] : 30;
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
