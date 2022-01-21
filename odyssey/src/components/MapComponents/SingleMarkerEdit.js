import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { iconFinder } from "../../Helpers/markerHelpers";
import { useRef } from "react";
import PopUpEdit from "./PopUpEdit";

function SingleMarkerEdit(props) {
    const markerRef = useRef();

    return (<Marker
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
    >
        {props.marker.popUp ? (
            <Popup >
                <PopUpEdit
                    name={props.marker.popUp.name}
                    date={props.marker.popUp.date}
                    description={props.marker.popUp.description}
                    endDate={props.endDate}
                    startDate={props.startDate}
                    setRouteArray={props.setRouteArray}
                    stopId={props.marker.stopId}
                    mapId={props.marker.mapId}
                />
            </Popup>
        ) : (
            <></>
        )}
    </Marker>);

}

export default SingleMarkerEdit;