import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { iconFinder } from "../../Helpers/markerHelpers";
import { useRef, useEffect } from "react";
import SingleMarker from "./SingleMarker";

function Markers(props) {
  // const markerRef = useRef();
  // useEffect(()=>{
  //   if (markerRef.current){
  //     markerRef.current.openPopup();
  //     props.setRefState(markerRef.current);
  //   }
  // },[markerRef.current]);

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
