export default function PopUpEdit(props) {
    const start = new Date(props.startDate).toISOString().split('T')[0];
    const end = new Date(props.endDate).toISOString().split('T')[0];
    const stopDate = new Date(props.date).toISOString().split('T')[0];
    console.log("psdfasdfasdfasdfasdfowerowoeruiocvoibuofjflowerspe", props)
    // start.toISOString().split('T')[0]
    // const [startMonth, startDay, startYear] = [start.getMonth()+1, start.getDate(), start.getFullYear()];
    // const end = new Date(props.endDate);
    // const [endMonth, endDay, endYear] = [end.getMonth()+1, end.getDate(), end.getFullYear()];
    return (
        <>
            <form onSubmit={(e) => {
                e.preventDefault()
                console.log(e)
            }}>
                <input
                    type={'text'}
                    placeholder={"name"}
                    value={props.name}
                    onChange={(e) => {
                        props.setRouteArray((prev) => {
                            const newState = [...prev];
                            console.log(prev);
                            return prev
                        })
                    }}></input>
                <input type={'date'} min={start} max={end} value={stopDate}></input>
                <input type={'description'} placeholder="description"></input>
                <button>save</button>
                <button>remove</button>
            </form>
        </>
    )

}