import React, { useEffect } from "react";
import DisplayTrips from "./DisplayTrips";
import TripDisplayItem from "./TripDisplayItem";
import "./component-styles/home.scss";
import { useState } from "react";
import { getTrips } from "../Helpers/apiHelpers";
import { formatTripData } from "../Helpers/dataHelpers";

import { parseDBMap, parseDBMarkers } from "../Helpers/mapHelper";


const Home = () => {
  const [tripsArray, setTripsArray] = useState([]);
  useEffect(() => {
    getTrips()
      .then((res) => {
        setTripsArray(formatTripData(res.data))
      });
  }, [])
  const displayedTrips = tripsArray.map((trip, i) => {
    return (
      <TripDisplayItem
        key={i}
        mapOptions= {parseDBMap(trip.maps)}
        markers= {parseDBMarkers(trip.markers)}
        name={"asdf"}
        description={"ASDF"}
        userName={"asdf"}
      />
    );
  });
  return <main className="home-page">{displayedTrips}</main>;
};

export default Home;
