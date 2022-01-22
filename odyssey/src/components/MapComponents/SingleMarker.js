import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { iconFinder } from "../../Helpers/markerHelpers";
import { useRef} from "react";
import PopUpDisplay from "./PopUpDisplay";

function SingleMarker(props) {
    const markerRef = useRef();

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
                <PopUpDisplay name={props.marker.popUp.name} date={props.marker.popUp.date} description={props.marker.popUp.description}></PopUpDisplay>
            </Popup>
        ) : (
            <></>
        )}
    </Marker>);

}

export default SingleMarker;