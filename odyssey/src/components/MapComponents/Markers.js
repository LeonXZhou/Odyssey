import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import {iconFinder} from "../../Helpers/markerHelpers";
import { useRef, useEffect } from "react";

function Markers(props) {
    const markerRef = useRef();
    useEffect(()=>{
      if (markerRef.current){
        markerRef.current.openPopup();
        props.setRefState(markerRef.current);
      }
    },[markerRef.current]);

    const markersJSX = props.markers.map((marker, i) => {
      //setting default options for markers
      const markerWidth = marker.iconSize ? marker.iconSize[0] : 20;
      const markerHeight = marker.iconSize ? marker.iconSize[1] : 20;
      const icon = marker.icon ? marker.icon : "DEFAULT";
      const markerPosition = marker.position ? marker.position : [0, 0];
      // const iconAnchor = [markerWidth/2, markerHeight];
      return (
        <Marker
          position={markerPosition}
          icon={
            new L.Icon({
              iconUrl: iconFinder(icon),
              iconSize: new L.Point(markerWidth, markerHeight),
              className: "leaflet-div-icon",
              // iconAnchor: iconAnchor
            })
          }

          key={i}

          ref ={markerRef}

          eventHandlers={{
            click: (e) => {
              console.log('marker clicked', e.target);
              console.log('marker clicked 2', e.target.testing);
              console.log('marker ref', markerRef);
            },
          }}
        >
          {marker.popUp ? (
            <Popup >
              {marker.popUp.content}
            </Popup>
          ) : (
            <></>
          )}
        </Marker>
      );
    });
    return markersJSX;
  }

  export default Markers;
