function MarkerForm(props) {

    return (
        <form>
            <input type="date" id="start" name="trip-start"
                value="2018-07-22"
                min="2018-07-20" max="2018-07-30">
            </input>
            <input type="textfield"></input>
        </form>
    );
}


export default MarkerForm