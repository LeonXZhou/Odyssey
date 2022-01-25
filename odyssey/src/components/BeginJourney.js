import { useState, useContext } from "react";
import { authContext } from "./providers/AuthenticationProvider";
import { Link, useNavigate } from "react-router-dom";
import "./component-styles/Home.scss";
import { insertNewTrip } from "../Helpers/apiHelpers";

const BEGIN = "BEGIN";
const NEWTRIP = "NEWTRIP";
const LOADING = "LOADING";

const USER_ID = 1; // hard coded user id for insert, will update to use context

function BeginJourney(props) {
  let navigate = useNavigate();
  const [journeyRenderState, setJourneyRenderState] = useState(BEGIN);
  const { user, auth } = useContext(authContext);
  const [newJourneyState, setNewJourneyState] = useState({
    name: "",
    startDate: "",
    endDate: "",
  });
  const [showBanner, setShowBanner] = useState(false);
  return (
    <>
      {journeyRenderState === BEGIN && !auth && (
        <div className="banner">
          <Link to="/register" type="button" className="begin-journey">
            Your journey begins here
          </Link>
        </div>
      )}

      {journeyRenderState === BEGIN && auth && (
        <div className="banner">
          <button
            type="button"
            className="begin-journey"
            onClick={() => {
              setJourneyRenderState(NEWTRIP);
            }}
          >
            Begin your journey now
          </button>
        </div>
      )}

      {journeyRenderState === NEWTRIP && (
        <div className="banner">
          <div className="details">
            <input
              className="trip-title"
              type={"text"}
              placeholder="Odyssey Name"
              value={newJourneyState.name}
              onChange={(e) => {
                setNewJourneyState((prev) => {
                  return { ...prev, name: e.target.value };
                });
              }}
            ></input>

            <div className="date">
              <label className="date-text">Start Date</label>
              <input
                className="date-input"
                type={"date"}
                value={newJourneyState.startDate}
                onChange={(e) => {
                  setNewJourneyState((prev) => {
                    return { ...prev, startDate: e.target.value };
                  });
                }}
              ></input>
            </div>
            <div className="date">
              <label className="date-text">End Date</label>
              <input
                className="date-input"
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
              className="create-trip"
              onClick={(e) => {
                e.preventDefault();
                setJourneyRenderState(LOADING);
                insertNewTrip(
                  USER_ID,
                  newJourneyState.name,
                  newJourneyState.startDate,
                  newJourneyState.endDate
                ).then((res) => {
                  console.log(res);
                  navigate(`/planning/edit/${res.data.trip_id}`);
                });
              }}
            >
              Create New Trip
            </button>
          </div>
        </div>
      )}

      {journeyRenderState === LOADING && <div>loading</div>}
    </>
  );
}
export default BeginJourney;
