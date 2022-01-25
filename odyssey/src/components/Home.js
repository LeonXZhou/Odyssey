import React, { useEffect } from "react";
import { useState } from "react";

import { parseDBMap, parseDBMarkers } from "../Helpers/mapHelper";
import { getTrips } from "../Helpers/apiHelpers";
import { formatTripData } from "../Helpers/dataHelpers";

import "./component-styles/Home.scss";
import TripDisplayItemLink from "./TripDisplayItemLink";
import BeginJourney from "./BeginJourney";
import { process_params } from "express/lib/router";

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
      <section className="home-discover">
        <div className="mission-statement">
          <h1>Mission Statement</h1>
          <p1>asdfasdf</p1>
        </div>
        Discover Other
        <i className="fa fa-arrow-down down-arrow" aria-hidden="true"></i>
      </section>
      <section className="trip-cards">{displayedTrips}</section>
    </main>
  );
};

export default Home;
