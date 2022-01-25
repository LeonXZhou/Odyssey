import { updateMarkerById, deleteMarker, getMapForTrip, addMarker } from "../../Helpers/apiHelpers";
import { formatTripData } from "../../Helpers/dataHelpers";
const findMarkerIndexByStopId = function (markers, stopId) {
    for (const i in markers) {
        if (stopId === markers[i].stopId) {
            return i;
        }
    }
}


export default function PopUpEdit(props) {
    console.log(props);
    let start = "";
    let end = "";
    let stopDate = "";
    if (props.startDate) {
        start = new Date(props.startDate).toISOString().split('T')[0];
    }
    if (props.endDate) {

        end = new Date(props.endDate).toISOString().split('T')[0];
    }
    if (props.date) {

        stopDate = new Date(props.date).toISOString().split('T')[0];
    }
    // start.toISOString().split('T')[0]
    // const [startMonth, startDay, startYear] = [start.getMonth()+1, start.getDate(), start.getFullYear()];
    // const end = new Date(props.endDate);
    // const [endMonth, endDay, endYear] = [end.getMonth()+1, end.getDate(), end.getFullYear()];
    return (
        <>
            <form onSubmit={(e) => {
                e.preventDefault()
            }}>
                <input
                    type={'text'}
                    placeholder={"name"}
                    value={props.name}
                    onChange={(e) => {
                        props.setRouteArray((prev) => {
                            const newState = [...prev];
                            const markerIndex = findMarkerIndexByStopId(newState[0].markers, props.stopId);
                            newState[0].markers = [...newState[0].markers];
                            newState[0].markers[markerIndex] = { ...newState[0].markers[markerIndex], name: e.target.value }
                            return newState
                        })
                    }}></input>
                <input type={'date'}
                    onKeyDown={(e) => { e.preventDefault() }}
                    min={start}
                    max={end}
                    value={stopDate}
                    onChange={(e) => {
                        props.setRouteArray((prev) => {
                            const newState = [...prev];
                            const markerIndex = findMarkerIndexByStopId(newState[0].markers, props.stopId);
                            newState[0].markers = [...newState[0].markers];
                            newState[0].markers[markerIndex] = { ...newState[0].markers[markerIndex], date: e.target.value }
                            return newState
                        })
                    }}></input>
                <input type={'text'} placeholder="description" value={props.description}
                    onChange={(e) => {
                        props.setRouteArray((prev) => {
                            const newState = [...prev];
                            const markerIndex = findMarkerIndexByStopId(newState[0].markers, props.stopId);
                            newState[0].markers = [...newState[0].markers];
                            newState[0].markers[markerIndex] = { ...newState[0].markers[markerIndex], description: e.target.value }
                            return newState
                        })
                    }}></input>
                <input type={'number'} placeholder="lat" value={props.position[0]}
                    onChange={(e) => {
                        props.setRouteArray((prev) => {
                            const newState = [...prev];
                            const markerIndex = findMarkerIndexByStopId(newState[0].markers, props.stopId);
                            newState[0].markers = [...newState[0].markers];
                            newState[0].markers[markerIndex] = { ...newState[0].markers[markerIndex], lat: e.target.value }
                            console.log(newState)
                            return newState
                        })
                    }}></input>
                <input type={'number'} placeholder="lng" value={props.position[1]}
                    onChange={(e) => {
                        props.setRouteArray((prev) => {
                            const newState = [...prev];
                            const markerIndex = findMarkerIndexByStopId(newState[0].markers, props.stopId);
                            newState[0].markers = [...newState[0].markers];
                            newState[0].markers[markerIndex] = { ...newState[0].markers[markerIndex], long: e.target.value }
                            return newState
                        })
                    }}></input>
                <button onClick={(e) => {
                    e.preventDefault();
                    if (props.stopId) {
                        updateMarkerById(props.stopId, props.name, props.date, props.description, props.position[0], props.position[1], props.type)
                            .then(() => {

                                props.markerRef.current.closePopup();
                            })
                    }
                    if (!props.stopId) {
                        addMarker(props.mapId, props.name, props.date, props.description, props.position[0], props.position[1], props.type)
                            .then(() => {
                                getMapForTrip(props.tripId).then((res) => {
                                    props.markerRef.current.closePopup();
                                    props.setRouteArray((prev) => {
                                        const newState = [...formatTripData(res.data)];
                                        newState[0].maps.theme = prev[0].maps.theme;
                                        console.log(newState);
                                        return newState
                                    }
                                    );
                                })
                            })
                    }
                }}>save</button>
                <button onClick={(e) => {
                    e.preventDefault();
                    deleteMarker(props.stopId)
                        .then(() => {
                            getMapForTrip(props.tripId).then((res) => {
                                props.markerRef.current.closePopup();
                                props.setRouteArray((prev) => {
                                    const newState = [...formatTripData(res.data)];
                                    newState[0].maps.theme = prev[0].maps.theme;
                                    console.log(newState);
                                    return newState
                                }
                                );
                            })
                        })
                }}>remove</button>
            </form>
        </>
    )

}