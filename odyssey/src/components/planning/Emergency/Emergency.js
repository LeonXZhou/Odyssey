import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../component-styles/Emergency.scss";
import updateEmergencyContact from "../../../Helpers/apiHelpers.js";

const Emergency = (props) => {
  const [emergencyState, setEmergencyState] = useState({});
  console.log(emergencyState);
  return (
    <main className="emergency">
      <div>Emergency Contact</div>

      <form
        className="emergency-form"
        onSubmit={(e) => {
          e.preventDefault();
          updateEmergencyContact(props.trip_id, emergencyState);
        }}
      >
        <input
          className="first-name"
          value={emergencyState.first_name}
          onChange={(e) => {
            setEmergencyState((prev) => {
              return { ...prev, first_name: e.target.value };
            });
          }}
          placeholder="First Name"
        ></input>

        <input
          className="last-name"
          value={emergencyState.last_name}
          onChange={(e) => {
            setEmergencyState((prev) => {
              return { ...prev, last_name: e.target.value };
            });
          }}
          placeholder="Last Name"
        ></input>
        <div>Contact Phone Number</div>
        <input
          className="phone"
          value={emergencyState.phone_number}
          onChange={(e) => {
            setEmergencyState((prev) => {
              return { ...prev, phone: e.target.value };
            });
          }}
          placeholder="123-456-7890"
        ></input>
        <input
          className="email"
          value={emergencyState.email}
          onChange={(e) => {
            setEmergencyState((prev) => {
              return { ...prev, email: e.target.value };
            });
          }}
          placeholder="example@example.com"
        ></input>
        <div>Contact Date</div>
        <input
          type={"date"}
          value={emergencyState.send_date}
          onChange={(e) => {
            setEmergencyState((prev) => {
              return { ...prev, send_date: e.target.value };
            });
          }}
          className="send-date"
        ></input>
        <div>Time</div>
        <input
          className="contact-time"
          type={"time"}
          onChange={(e) => {
            setEmergencyState((prev) => {
              return { ...prev, send_time: e.target.value };
            });
          }}
        ></input>
        <button>SAVE</button>
      </form>
    </main>
  );
};

export default Emergency;
