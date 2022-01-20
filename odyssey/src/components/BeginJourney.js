import { useState, useContext } from "react";
import { authContext } from "./providers/AuthenticationProvider";
import { Link, useNavigate } from "react-router-dom";
import "./component-styles/BeginJourney.scss";
import { insertNewTrip } from "../Helpers/apiHelpers";

const BEGIN = "BEGIN";
const NEWTRIP = "NEWTRIP";
const LOADING = "LOADING";

const USER_ID = 1; // hard coded user id for insert, will update to use context

function BeginJourney(props) {
  const [journeyRenderState, setJourneyRenderState] = useState(BEGIN);
  const { user, auth } = useContext(authContext);
  const [newJourneyState, setNewJourneyState] = useState({
    name: "",
    startDate: "",
    endDate: "",
  });
  let navigate = useNavigate();
  return (
    <>
      {journeyRenderState === BEGIN && !auth && (
        <Link to="/register" type="button" className="banner">
          Begin your journey now
          <img
            className="arrows"
            src="https://www.pngall.com/wp-content/uploads/5/Black-Fast-Forward-Button-PNG-Clipart.png"
          ></img>
        </Link>
      )}

      {journeyRenderState === BEGIN && auth && (
        <div
          type="button"
          className="add-button btn btn-default header-right-button"
          onClick={() => {
            setJourneyRenderState(NEWTRIP);
          }}
        >
          Begin your journey now
          <img
            className="arrows"
            src="https://www.pngall.com/wp-content/uploads/5/Black-Fast-Forward-Button-PNG-Clipart.png"
          ></img>
        </div>
      )}

      {journeyRenderState === NEWTRIP && (
        <div className="newTrip">
          <div>
            <label>Trip Name</label>
            <input
              type={"text"}
              value={newJourneyState.name}
              onChange={(e) => {
                setNewJourneyState((prev) => {
                  return { ...prev, name: e.target.value };
                });
              }}
            ></input>
          </div>
          <div>
            <label>Start Date</label>
            <input
              type={"date"}
              value={newJourneyState.startDate}
              onChange={(e) => {
                setNewJourneyState((prev) => {
                  return { ...prev, startDate: e.target.value };
                });
              }}
            ></input>
          </div>
          <div>
            <label>End Date</label>
            <input
              type={"date"}
              value={newJourneyState.endDate}
              onChange={(e) => {
                setNewJourneyState((prev) => {
                  return { ...prev, endDate: e.target.value };
                });
              }}
            ></input>
          </div>
          <button
            onClick={() => {
              setJourneyRenderState(LOADING);
              insertNewTrip(
                USER_ID,
                newJourneyState.name,
                newJourneyState.startDate,
                newJourneyState.endDate
              ).then((res) => {
                console.log(res);
              });
            }}
          >
            Create New Trip
          </button>
        </div>
      )}

      {journeyRenderState === LOADING && <div>loading</div>}
    </>
  );
}
export default BeginJourney;
