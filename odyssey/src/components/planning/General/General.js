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

export default function General(props) {
  const { trip_id } = useParams();
  const [privacyState, setPrivacyState] = useState(false);
  useEffect(() => {
    getPrivacyForTrip(trip_id).then((res) => {
      setPrivacyState(res.data[0].shared);
    });
  });
  console.log(props.generalState);
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
        <label>descirption</label>
        <textarea
          className="general-text"
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
        {privacyState === false && (
          // trip is private
          <button
            className="general-switch"
            onClick={() => {
              setPrivacyState(true);
              updatePrivacyForTrip(trip_id, true);
            }}
          >
            Private
          </button>
        )}
        {privacyState === true && (
          // trip is public
          <button
            className="sidebar-item"
            onClick={() => {
              setPrivacyState(false);
              updatePrivacyForTrip(trip_id, false);
            }}
          >
            Public
          </button>
        )}
        <button className="general-buttons">Update</button>
      </form>
    </main>
  );
}
