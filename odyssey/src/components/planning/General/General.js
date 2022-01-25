import React, { useEffect, useState } from "react";
import { Route, useParams } from "react-router";
import {
  getMealsForTrip,
  updateGeneralForTrip,
  updatePrivacyForTrip,
  getPrivacyForTrip,
} from "../../../Helpers/apiHelpers";
import { formatTripMealsData } from "../../../Helpers/dataHelpers";
import "../../component-styles/General.scss";

const UPDATE = "UPDATE";
const SAVED = "SAVED";

export default function General(props) {
  const { trip_id } = useParams();
  const [saveState, setSaveState] = useState(UPDATE);
  const [privacyState, setPrivacyState] = useState(false);
  useEffect(() => {
    getPrivacyForTrip(trip_id).then((res) => {
      setPrivacyState(res.data[0].shared);
    });
  });
  console.log(props);
  let start = "";
  let end = "";
  if (props.generalState.start_date) {
    start = new Date(props.generalState.start_date).toISOString().split("T")[0];
  }
  if (props.generalState.end_date) {
    end = new Date(props.generalState.end_date).toISOString().split("T")[0];
  }
  return (
    <main className="general">
      <form
        className="general-form"
        onSubmit={(e) => {
          e.preventDefault();
          updateGeneralForTrip(props.generalState.id, props.generalState).then(
            () => {
              getMealsForTrip(props.generalState.id).then((res) => {
                props.setMealState(formatTripMealsData(res.data));
              });
            }
          );
        }}
      >
        <label>Trip Name</label>
        <input
          className="general-text"
          type={"text"}
          value={props.generalState.name ? props.generalState.name : ""}
          onChange={(e) => {
            props.setGeneralState((prev) => {
              return { ...prev, name: e.target.value };
            });
          }}
        ></input>
        <label>Description</label>
        <textarea
          className="general-textarea"
          value={
            props.generalState.description ? props.generalState.description : ""
          }
          onChange={(e) => {
            props.setGeneralState((prev) => {
              return { ...prev, description: e.target.value };
            });
          }}
        ></textarea>
        <label>State Date</label>
        <input
          className="general-date"
          type="date"
          value={start}
          onChange={(e) => {
            props.setGeneralState((prev) => {
              return { ...prev, start_date: e.target.value + "T05:00:00.000Z" };
            });
          }}
        ></input>
        <label>End Date</label>
        <input
          className="general-date"
          type="date"
          value={end}
          onChange={(e) => {
            props.setGeneralState((prev) => {
              return { ...prev, end_date: e.target.value + "T05:00:00.000Z" };
            });
          }}
        ></input>
        <div className="general-switch">
          Public
          {privacyState === false && (
            // trip is private
            <label className="switch">
              <input
                onChange={() => {
                  setSaveState(UPDATE);
                  setPrivacyState(true);
                  updatePrivacyForTrip(trip_id, true);
                }}
                type="checkbox"
              ></input>
              <span className="slider round"></span>
            </label>
          )}
          {privacyState === true && (
            // trip is public
            <label className="switch">
              <input
                onChange={() => {
                  setSaveState(UPDATE);
                  setPrivacyState(false);
                  updatePrivacyForTrip(trip_id, false);
                }}
                type="checkbox"
                checked
              ></input>
              <span className="slider round"></span>
            </label>
          )}
        </div>
        {saveState === UPDATE && (
          <button
            className="general-buttons"
            onClick={(e) => {
              e.preventDefault();
              setSaveState(SAVED);
              //   setTimeout(setSaveState(UPDATE), 2000);
            }}
          >
            Update
          </button>
        )}
        {saveState === SAVED && (
          <button className="general-buttons">Saved!</button>
        )}
      </form>
    </main>
  );
}
