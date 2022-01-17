import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { iconFinder } from "../../Helpers/markerHelpers";
import { useRef, useEffect } from "react";

function SingleMarker(props) {
    const markerRef = useRef();
    useEffect(() => {
        if (markerRef.current) {
            markerRef.current.openPopup();
        }
    }, [markerRef.current]);

    return(<Marker
        position={props.markerPosition}
        icon={
            new L.Icon({
                iconUrl: iconFinder(props.icon),
                iconSize: new L.Point(props.markerWidth, props.markerHeight),
                className: "leaflet-div-icon",
                // iconAnchor: iconAnchor
            })
        }

        ref={markerRef}

        // eventHandlers={{
        //     click: (e) => {
        //         e.target.remove()
        //     },
        // }}
    >
        {props.marker.popUp ? (
            <Popup >
                {props.marker.popUp.content}
            </Popup>
        ) : (
            <></>
        )}
    </Marker>);

}

export default SingleMarker;