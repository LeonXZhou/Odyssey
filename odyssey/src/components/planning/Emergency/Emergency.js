import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "../../component-styles/Emergency.scss";
import {
  insertEmergencyContact,
  getEmergencyContactByTripId,
} from "../../../Helpers/apiHelpers.js";

const Emergency = (props) => {
  const { trip_id } = useParams();
  const [emergencyState, setEmergencyState] = useState({});
  useEffect(() => {
    getEmergencyContactByTripId(trip_id).then((res) => {
      console.log(res.data);
      // setEmergencyState(res.data);
    });
  });
  return (
    <main className="emergency">
      <div>Emergency Contact</div>

      <form
        className="emergency-form"
        onSubmit={(e) => {
          e.preventDefault();
          console.log("STATE", emergencyState);
          insertEmergencyContact(
            props.trip_id,
            emergencyState.name,
            emergencyState.phone_number,
            emergencyState.email,
            false,
            emergencyState.send_date
          );
        }}
      >
        <div>Contact Name</div>
        <input
          className="name"
          value={emergencyState.first_name}
          onChange={(e) => {
            setEmergencyState((prev) => {
              return { ...prev, name: e.target.value };
            });
          }}
          placeholder="Contact Name"
        ></input>

        <div>Contact Phone Number</div>
        <input
          className="phone"
          value={emergencyState.phone_number}
          onChange={(e) => {
            setEmergencyState((prev) => {
              return { ...prev, phone_number: e.target.value };
            });
          }}
          placeholder="123-456-7890"
        ></input>
        <div>Contact Email</div>
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
        <div>Send message on this date</div>
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
        <div>Send message at this time</div>
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
