import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import TripDisplayItemLink from "./TripDisplayItemLink";
import "./component-styles/home.scss";
import { useState } from "react";
import { getTrips } from "../Helpers/apiHelpers";
import { formatTripData } from "../Helpers/dataHelpers";

import { parseDBMap, parseDBMarkers } from "../Helpers/mapHelper";

const Home = () => {
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
      <Link
        to="/planning"
        type="button"
        className="add-button btn btn-default header-right-button"
      >
        Begin your journey now
        <img
          className="arrows"
          src="https://www.pngall.com/wp-content/uploads/5/Black-Fast-Forward-Button-PNG-Clipart.png"
        ></img>
      </Link>
      <section className="trip-cards">{displayedTrips}</section>
    </main>
  );
};

export default Home;
