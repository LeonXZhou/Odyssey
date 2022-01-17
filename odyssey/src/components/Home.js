import React, { useEffect } from "react";
import { useState } from "react";


import { parseDBMap, parseDBMarkers } from "../Helpers/mapHelper";
import { getTrips } from "../Helpers/apiHelpers";
import { formatTripData } from "../Helpers/dataHelpers";

import "./component-styles/home.scss";
import TripDisplayItemLink from "./TripDisplayItemLink";
import BeginJourney from "./BeginJourney";

const Home = (props) => {
  const [tripsArray, setTripsArray] = useState([]);

  useEffect(() => {
    getTrips().then((res) => {
      setTripsArray(formatTripData(res.data));
    });
  }, []);

  const displayedTrips = tripsArray.map((trip, i) => {
    return (
      <TripDisplayItemLink
        key={i}
        mapOptions={parseDBMap(trip.maps)}
        markers={parseDBMarkers(trip.markers)}
        name={"asdf"}
        description={"ASDF"}
        username={"asdf"}
        trip_id={trip.trip_id}
      />
    );
  });
  return (
    <main className="home-page">
      <BeginJourney userEmail ={props.userEmail}></BeginJourney>
      <section className="trip-cards">{displayedTrips}</section>
    </main>
  );
};

export default Home;
