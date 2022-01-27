import React from "react";
import "../../component-styles/Emergency.scss";
import {
  getEmergencyContactByTripId,
  insertEmergencyContact,
  updateEmergencyContact,
  deleteEmergencyContact,
} from "../../../Helpers/apiHelpers.js";
import { formatEmergencyData } from "../../../Helpers/dataHelpers";

const Emergency = (props) => {
  return (
    <main className="emergency">
      <form className="emergency-form">
        <div>Contact Name</div>
        <input
          className="emergency-text"
          value={props.emergencyState.name}
          onChange={(e) => {
            props.setEmergencyState((prev) => {
              return { ...prev, name: e.target.value };
            });
          }}
          required
        ></input>

        <div>Contact Phone Number</div>
        <input
          className="emergency-text"
          value={props.emergencyState.phone_number}
          onChange={(e) => {
            props.setEmergencyState((prev) => {
              return { ...prev, phone_number: e.target.value };
            });
          }}
          required
        ></input>

        <div>Send message on this date</div>
        <input
          type={"date"}
          value={props.emergencyState.send_date}
          onChange={(e) => {
            props.setEmergencyState((prev) => {
              return { ...prev, send_date: e.target.value };
            });
          }}
          className="send-date"
          required
        ></input>
        <div>Send message at this time</div>
        <input
          className="send-time"
          type={"time"}
          value={props.emergencyState.send_time}
          onChange={(e) => {
            props.setEmergencyState((prev) => {
              return { ...prev, send_time: e.target.value };
            });
          }}
          required
        ></input>
        {props.emergencyState.id === "" ? (
          <button
            className="emergency-buttons"
            onClick={(e) => {
              e.preventDefault();
              console.log("SUBMIT", props.emergencyState);
              insertEmergencyContact(
                props.trip_id,
                props.emergencyState.name,
                props.emergencyState.phone_number,
                props.emergencyState.email,
                props.emergencyState.send_date,
                props.emergencyState.send_time,
                props.emergencyState.contact_id
              ).then(() => {
                window.location.reload();
              });
            }}
          >
            SAVE
          </button>
        ) : (
          <>
            <button
              className="emergency-buttons"
              onClick={(e) => {
                e.preventDefault();
                updateEmergencyContact(
                  props.emergencyState.trip_id,
                  props.emergencyState.name,
                  props.emergencyState.phone_number,
                  props.emergencyState.email,
                  props.emergencyState.send_date,
                  props.emergencyState.send_time,
                  props.emergencyState.id
                );
              }}
            >
              Update Contact
            </button>
            <button
              className="emergency-buttons"
              onClick={(e) => {
                e.preventDefault();
                deleteEmergencyContact(
                  props.emergencyState.trip_id,
                  props.emergencyState.id
                ).then(() => {
                  getEmergencyContactByTripId(
                    props.emergencyState.trip_id
                  ).then((res) => {
                    props.setEmergencyState(formatEmergencyData(res.data));
                  });
                });
              }}
            >
              Check-In
            </button>
          </>
        )}
      </form>
    </main>
  );
};

export default Emergency;
