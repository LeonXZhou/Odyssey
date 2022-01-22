import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../../component-styles/Emergency.scss";
import updateEmergencyContact from "../../../Helpers/apiHelpers.js";

const Emergency = (props) => {
  console.log(props);
  return (
    <main className="emergency">
      <div>Emergency Contact</div>

      <form
        className="emergency-form"
        onSubmit={(e) => {
          e.preventDefault();
          updateEmergencyContact(props.trip_id);
        }}
      >
        <input className="first-name" placeholder="First Name"></input>

        <input className="last-name" placeholder="Last Name"></input>
        <div>Contact Phone Number</div>
        <input className="phone" placeholder="123-456-7890"></input>
        <div>Contact Date</div>
        <input type={"date"} className="contact-date"></input>
        <div>Time</div>
        <input className="contact-time"></input>
        <button>SAVE</button>
      </form>
    </main>
  );
};

export default Emergency;
