import React from "react";
import DisplayTrips from "./DisplayTrips";
import "./component-styles/home.scss";

const tripsArray = [
  {
    mapOptions: {},
    markers: [{}, {}],
    name: "name",
    description: "description",
    username: "username",
  },
  {
    mapOptions: {},
    markers: [{}, {}],
    name: "name",
    description: "description",
    username: "username",
  },
  {
    mapOptions: {},
    markers: [{}, {}],
    name: "name",
    description: "description",
    username: "username",
  },
];
const Home = () => {
  const displayedTrips = tripsArray.map((trip, i) => {
    console.log("THIS");
    return (
      <DisplayTrips
        key={i}
        name={trip.name}
        map={trip.map}
        numberOfDays={trip.numberOfDays}
      />
    );
  });
  return (
    <main className="home-page">
      <section></section>
      {displayedTrips}
    </main>
  );
};

export default Home;
