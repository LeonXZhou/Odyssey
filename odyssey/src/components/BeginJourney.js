
import { useState } from "react";
import { Link } from "react-router-dom";
import "./component-styles/BeginJourney.scss"
const BEGIN = "BEGIN";
const NEWTRIP = "NEWTRIP";
function BeginJourney(props) {
    const [journeyState, setJourneyState] = useState(BEGIN)
    return (
        <>
           {(journeyState === BEGIN && !props.userEmail) && <Link
                to="/register"
                type="button"
                className="add-button btn btn-default header-right-button"
            >
                Begin your journey now
                <img
                    className="arrows"
                    src="https://www.pngall.com/wp-content/uploads/5/Black-Fast-Forward-Button-PNG-Clipart.png"
                ></img>
            </Link>}

            {(journeyState === BEGIN) && <div
                type="button"
                className="add-button btn btn-default header-right-button"
                onClick={()=>{setJourneyState(NEWTRIP)}}>
                Begin your journey now
                <img
                    className="arrows"
                    src="https://www.pngall.com/wp-content/uploads/5/Black-Fast-Forward-Button-PNG-Clipart.png"
                ></img>
            </div>}

            {(journeyState === NEWTRIP) && 
                <form>
                    <input type={"text"}></input>
                    <input type={"text"}></input>
                    <input type={"text"}></input>
                </form>}
        </>
    );
}

export default BeginJourney;