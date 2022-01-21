const findMarkerIndexByStopId = function (markers, stopId) {
    for (const i in markers) {
        if (stopId === markers[i].stopId) {
            return i;
        }
    }
}


export default function PopUpEdit(props) {
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
    console.log("psdfasdfasdfasdfasdfowerowoeruiocvoibuofjflowerspe", props)
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
                    onKeyDown={(e)=>{e.preventDefault()}}
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
                <input type={'description'} placeholder="description" value={props.description}
                    onChange={(e) => {
                        props.setRouteArray((prev) => {
                            const newState = [...prev];
                            const markerIndex = findMarkerIndexByStopId(newState[0].markers, props.stopId);
                            newState[0].markers = [...newState[0].markers];
                            newState[0].markers[markerIndex] = { ...newState[0].markers[markerIndex], description: e.target.value }
                            return newState
                        })
                    }}></input>
                <button onClick={(e) => { console.log(props) }}>save</button>
                <button>remove</button>
            </form>
        </>
    )

}