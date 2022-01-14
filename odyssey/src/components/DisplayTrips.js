import React from "react";
import "./component-styles/displayTrips.scss";

const DisplayTrips = ({ name, map, numberOfDays }) => {
  console.log("THIS");
  return (
    <div>
      <button className="trip-box">
        <h1>{name}</h1>
        <h1>{map}</h1>
        <h1>{numberOfDays}</h1>
      </button>
      <br />
    </div>
  );
};

export default DisplayTrips;
