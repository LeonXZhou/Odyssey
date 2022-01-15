import React, { useEffect } from "react";
import DisplayTrips from "./DisplayTrips";
import TripDisplayItem from "./TripDisplayItem";
import "./component-styles/home.scss";
import { useState } from "react";
import { getTrips } from "../Helpers/apiHelpers";
import { formatTripData } from "../Helpers/dataHelpers";

// description: "Big hike up mountain"
// email: "kiradunn@gmail.com"
// first_name: "Kira"
// last_name: "Dunn"
// routes_id: 2
// routes_lat: "49.394299484055080"
// routes_long: "-123.144883520974550"
// stop_days: "2021-11-07T00:00:00.000Z"
// stop_names: "Start of Trip"
// stop_types: "Start"
// stops_id: 4
// stops_lat: "49.444392774925090"
// stops_long: "-123.112021401587400"
// trip_end: "2021-11-09T00:00:00.000Z"
// trip_id: 2
// trip_start: "2021-11-07T00:00:00.000Z"
// trips_name: "Big Hike"
// user_id: 2

const Home = () => {
  const [tripsArray, setTripsArray] = useState([]);
  useEffect(() => {
    getTrips().then((res) => {
      setTripsArray(formatTripData(res.data));
    });
  }, []);
  console.log(tripsArray);
  const displayedTrips = tripsArray.map((trip, i) => {
    return (
      <TripDisplayItem
        key={i}
        mapOptions={{ center: [trip.maps.lat, trip.maps.long] }}
        markers={trip.markers.map((serverMarker) => {
          return {
            position: [serverMarker.lat, serverMarker.long],
            icon: serverMarker.type,
          };
        })}
        name={"asdf"}
        description={"ASDF"}
        userName={"asdf"}
      />
    );
  });
  return <main className="home-page">{displayedTrips}</main>;
};

export default Home;
