export default function PopUpDisplay(props) {
    let stopDate = "";
    if (props.date) {

        stopDate = new Date(props.date).toISOString().split('T')[0];
    }
    return (
        <>
            <h1>{props.name}</h1>
            <p>Stop date: {stopDate}</p>
            <p>{props.description}</p>
        </>
    )

}