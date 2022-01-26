import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { iconFinder } from "../../Helpers/markerHelpers";
import { useEffect, useRef } from "react";
import PopUpEdit from "./PopUpEdit";

function SingleMarkerEdit(props) {
    const markerRef = useRef();

    useEffect(() => {
        if (props.marker.stopId === null && markerRef.current && props.marker.tripId) {
            markerRef.current.openPopup();
        }
    }, [markerRef.current])
    

    return (<Marker
        position={props.markerPosition}
        icon={
            new L.Icon({
                iconUrl: iconFinder(props.icon),
                iconSize: new L.Point(props.markerWidth, props.markerHeight),
                className: "",
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
                    tripId={props.marker.tripId}
                    type={props.marker.type}
                    position={props.markerPosition}
                    markerRef={markerRef}
                />
            </Popup>
        ) : (
            <></>
        )}
    </Marker>);

}

export default SingleMarkerEdit;