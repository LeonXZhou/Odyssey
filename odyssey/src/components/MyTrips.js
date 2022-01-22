import React, { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { authContext } from "./providers/AuthenticationProvider";

import { parseDBMap, parseDBMarkers } from "../Helpers/mapHelper";
import { getTripsByUser } from "../Helpers/apiHelpers";
import { formatTripData } from "../Helpers/dataHelpers";

import "./component-styles/Home.scss";
import TripDisplayItemLink from "./TripDisplayItemLink";
import BeginJourney from "./BeginJourney";

const MyTrips = (props) => {
  const [tripsArray, setTripsArray] = useState([]);
  const { user } = useContext(authContext);
  console.log("this is user id in mytrips", user.userId);
  useEffect(() => {
    if (user.userId) {
      getTripsByUser(user.userId).then((res) => {
        console.log("this is res", res.data);
        setTripsArray(formatTripData(res.data));
      });
    }
  }, [user]);
  console.log("this is trips array", tripsArray);
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
        edit={"edit"}
      />
    );
  });
  return (
    <main className="home-page">
      {/* <BeginJourney userEmail={props.userEmail}></BeginJourney> */}
      <section className="trip-cards">{displayedTrips}</section>
    </main>
  );
};

export default MyTrips;
