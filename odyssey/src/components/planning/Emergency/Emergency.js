import React from "react";
import "../../component-styles/Emergency.scss";
import {
  getEmergencyContactByTripId,
  insertEmergencyContact,
  updateEmergencyContact,
} from "../../../Helpers/apiHelpers.js";
import { formatEmergencyData } from "../../../Helpers/dataHelpers";

const Emergency = (props) => {
  return (
    <main className="emergency">
      <div>Emergency Contact</div>

      <form
        className="emergency-form"
        onSubmit={(e) => {
          e.preventDefault();
          console.log("SUBMIT", props.emergencyState);
          if (props.emergencyState.id !== "") {
            updateEmergencyContact(
              props.emergencyState.trip_id,
              props.emergencyState.name,
              props.emergencyState.phone_number,
              props.emergencyState.email,
              props.emergencyState.send_date,
              props.emergencyState.send_time,
              props.emergencyState.contact_id
            );
          } else {
            console.log("YES");
            insertEmergencyContact(
              props.trip_id,
              props.emergencyState.name,
              props.emergencyState.phone_number,
              props.emergencyState.email,
              props.emergencyState.send_date,
              props.emergencyState.send_time,
              props.emergencyState.contact_id
            );
          }
        }}
      >
        <div>Contact Name</div>
        <input
          className="name"
          value={props.emergencyState.name}
          onChange={(e) => {
            props.setEmergencyState((prev) => {
              return { ...prev, name: e.target.value };
            });
          }}
          placeholder="Contact Name"
          required
        ></input>

        <div>Contact Phone Number</div>
        <input
          className="phone"
          value={props.emergencyState.phone_number}
          onChange={(e) => {
            props.setEmergencyState((prev) => {
              return { ...prev, phone_number: e.target.value };
            });
          }}
          placeholder="123-456-7890"
          required
        ></input>
        <div>Contact Email</div>
        <input
          className="email"
          value={props.emergencyState.email}
          onChange={(e) => {
            props.setEmergencyState((prev) => {
              return { ...prev, email: e.target.value };
            });
          }}
          placeholder="example@example.com"
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
          className="contact-time"
          type={"time"}
          value={props.emergencyState.send_time}
          onChange={(e) => {
            props.setEmergencyState((prev) => {
              return { ...prev, send_time: e.target.value };
            });
          }}
          required
        ></input>
        <button>SAVE</button>
      </form>
    </main>
  );
};

export default Emergency;
