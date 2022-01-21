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
    console.log(trip);
    return (
      <TripDisplayItemLink
        key={i}
        mapOptions={parseDBMap(trip.maps)}
        markers={parseDBMarkers(trip.markers)}
        name={trip.title}
        description={trip.description}
        username={trip.users.firstName + " " + trip.users.LastName}
        trip_id={trip.trip_id}
        edit={"view"}
      />
    );
  });
  return (
    <main className="home-page">
      <BeginJourney userEmail={props.userEmail}></BeginJourney>
      <section className="trip-cards">{displayedTrips}</section>
    </main>
  );
};

export default Home;
