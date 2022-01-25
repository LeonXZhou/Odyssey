import { getMealsForTrip, updateGeneralForTrip } from "../../../Helpers/apiHelpers";
import { formatTripMealsData } from "../../../Helpers/dataHelpers";
export default function General(props) {
    console.log(props.generalState)
    let start = "";
    let end = "";
    if (props.generalState.start_date) {
        start = new Date(props.generalState.start_date).toISOString().split('T')[0]
    }
    if (props.generalState.end_date) {
        end = new Date(props.generalState.end_date).toISOString().split('T')[0]
    }
    return (
        <main>
            <form onSubmit={(e) => {
                e.preventDefault()
                updateGeneralForTrip(props.generalState.id, props.generalState)
                    .then(() => {
                        getMealsForTrip(props.generalState.id).then((res) => {
                            props.setMealState(formatTripMealsData(res.data));
                        });
                    })
            }}>
                <label>Trip Name</label>
                <input type={'text'}
                    value={props.generalState.name ? props.generalState.name : ""}
                    onChange={(e) => { props.setGeneralState((prev) => { return { ...prev, name: e.target.value } }) }}></input>
                <label>descirption</label>
                <textarea value={props.generalState.description ? props.generalState.description : ""}
                    onChange={(e) => { props.setGeneralState((prev) => { return { ...prev, description: e.target.value} }) }}></textarea>
                <label >State Date</label>
                <input type="date" value={start}
                    onChange={(e) => { props.setGeneralState((prev) => { return { ...prev, start_date: e.target.value+"T05:00:00.000Z" } }) }}></input>
                <label>End Date</label>
                <input type="date" value={end}
                    onChange={(e) => { props.setGeneralState((prev) => { return { ...prev, end_date: e.target.value+"T05:00:00.000Z"  } }) }}></input>
                <button>Update</button>
            </form>
        </main>)
}