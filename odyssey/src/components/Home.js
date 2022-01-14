import React from "react";
import TripDisplayItem from "./TripDisplayItem";
import "./component-styles/home.scss";

const tripsArray = [
  {
    mapOptions: {
      zoom: 10,
      center: [49.246292, -123.116226],
      themeAttribution: "TOPO",
      themeURL: "TOPO",
    },
    markers: [
      { position: [49.246292, -123.116226], iconSize: [40, 40] },
      {
        position: [49.286292, -123.136226],
        icon: "TENT",
        iconSize: [20, 20],
      },
      {
        position: [49.346292, -123.166226],
        icon: "TENT",
        iconSize: [20, 20],
        popUp: { name: "First Night", description: "I <3 Camping" },
      },
    ],
    name: "name",
    description: "description",
    username: "username",
  },
  {
    mapOptions: {
      zoom: 10,
      center: [49.246292, -123.116226],
      themeAttribution: "TOPO",
      themeURL: "TOPO",
    },
    markers: [
      { position: [49.246292, -123.116226], iconSize: [40, 40] },
      {
        position: [49.286292, -123.136226],
        icon: "TENT",
        iconSize: [20, 20],
      },
      {
        position: [49.346292, -123.166226],
        icon: "TENT",
        iconSize: [20, 20],
        popUp: { name: "First Night", description: "I <3 Camping" },
      },
    ],
    name: "name",
    description: "description",
    username: "username",
  },
  {
    mapOptions: {
      zoom: 10,
      center: [49.246292, -123.116226],
      themeAttribution: "TOPO",
      themeURL: "TOPO",
    },
    markers: [
      { position: [49.246292, -123.116226], iconSize: [40, 40] },
      {
        position: [49.286292, -123.136226],
        icon: "TENT",
        iconSize: [20, 20],
      },
      {
        position: [49.346292, -123.166226],
        icon: "TENT",
        iconSize: [20, 20],
        popUp: { name: "First Night", description: "I <3 Camping" },
      },
    ],
    name: "name",
    description: "description",
    username: "username",
  },
  {
    mapOptions: {
      zoom: 10,
      center: [49.246292, -123.116226],
      themeAttribution: "TOPO",
      themeURL: "TOPO",
    },
    markers: [
      { position: [49.246292, -123.116226], iconSize: [40, 40] },
      {
        position: [49.286292, -123.136226],
        icon: "TENT",
        iconSize: [20, 20],
      },
      {
        position: [49.346292, -123.166226],
        icon: "TENT",
        iconSize: [20, 20],
        popUp: { name: "First Night", description: "I <3 Camping" },
      },
    ],
    name: "name",
    description: "description",
    username: "username",
  },
  {
    mapOptions: {
      zoom: 10,
      center: [49.246292, -123.116226],
      themeAttribution: "TOPO",
      themeURL: "TOPO",
    },
    markers: [
      { position: [49.246292, -123.116226], iconSize: [40, 40] },
      {
        position: [49.286292, -123.136226],
        icon: "TENT",
        iconSize: [20, 20],
      },
      {
        position: [49.346292, -123.166226],
        icon: "TENT",
        iconSize: [20, 20],
        popUp: { name: "First Night", description: "I <3 Camping" },
      },
    ],
    name: "name",
    description: "description",
    username: "username",
  },
  {
    mapOptions: {
      zoom: 10,
      center: [49.246292, -123.116226],
      themeAttribution: "TOPO",
      themeURL: "TOPO",
    },
    markers: [
      { position: [49.246292, -123.116226], iconSize: [40, 40] },
      {
        position: [49.286292, -123.136226],
        icon: "TENT",
        iconSize: [20, 20],
      },
      {
        position: [49.346292, -123.166226],
        icon: "TENT",
        iconSize: [20, 20],
        popUp: { name: "First Night", description: "I <3 Camping" },
      },
    ],
    name: "name",
    description: "description",
    username: "username",
  },
  {
    mapOptions: {
      zoom: 10,
      center: [49.246292, -123.116226],
      themeAttribution: "TOPO",
      themeURL: "TOPO",
    },
    markers: [
      { position: [49.246292, -123.116226], iconSize: [40, 40] },
      {
        position: [49.286292, -123.136226],
        icon: "TENT",
        iconSize: [20, 20],
      },
      {
        position: [49.346292, -123.166226],
        icon: "TENT",
        iconSize: [20, 20],
        popUp: { name: "First Night", description: "I <3 Camping" },
      },
    ],
    name: "name",
    description: "description",
    username: "username",
  },
  {
    mapOptions: {
      zoom: 10,
      center: [49.246292, -123.116226],
      themeAttribution: "TOPO",
      themeURL: "TOPO",
    },
    markers: [
      { position: [49.246292, -123.116226], iconSize: [40, 40] },
      {
        position: [49.286292, -123.136226],
        icon: "TENT",
        iconSize: [20, 20],
      },
      {
        position: [49.346292, -123.166226],
        icon: "TENT",
        iconSize: [20, 20],
        popUp: { name: "First Night", description: "I <3 Camping" },
      },
    ],
    name: "name",
    description: "description",
    username: "username",
  },
  {
    mapOptions: {
      zoom: 10,
      center: [49.246292, -123.116226],
      themeAttribution: "TOPO",
      themeURL: "TOPO",
    },
    markers: [
      { position: [49.246292, -123.116226], iconSize: [40, 40] },
      {
        position: [49.286292, -123.136226],
        icon: "TENT",
        iconSize: [20, 20],
      },
      {
        position: [49.346292, -123.166226],
        icon: "TENT",
        iconSize: [20, 20],
        popUp: { name: "First Night", description: "I <3 Camping" },
      },
    ],
    name: "name",
    description: "description",
    username: "username",
  },
];
const Home = () => {
  const displayedTrips = tripsArray.map((trip, i) => {
    return (
      <section className="home-trip-box">
        <TripDisplayItem
          key={i}
          mapOptions={trip.mapOptions}
          markers={trip.markers}
          name={trip.name}
          description={trip.description}
          username={trip.username}
        />
      </section>
    );
  });
  return (
    <main className="home-page">
      <section className="home-banner">
        <h1>BANNER</h1>
      </section>
      {displayedTrips}
    </main>
  );
};

export default Home;
