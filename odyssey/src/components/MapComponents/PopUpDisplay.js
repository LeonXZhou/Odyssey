export default function PopUpDisplay(props) {
    console.log(props);
    return (
        <>
            <h1>{props.name}</h1>
            <p>Stop date: {props.date}</p>
            <p>{props.description}</p>
        </>
    )

}