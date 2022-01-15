import React, { useEffect } from "react";
import "../component-styles/Planning.scss";
import Sidebar from "./Sidebar";
import TripDisplayItem from "../TripDisplayItem";
import Equipment from "./Equipment";
import Meals from "./Meals";
import Emergency from "./Emergency";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

const Planning = (props) => {
  const checkPage = (props) => {
    if (props.page === "route") {
      return (
        <div>
          <TripDisplayItem
            mapOptions={{
              zoom: 10,
              center: [49.246292, -123.116226],
              themeAttribution: "TOPO",
              themeURL: "TOPO",
            }}
            markers={[
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
            ]}
          ></TripDisplayItem>
        </div>
      );
    }
    if (props.page === "equipment") {
      return <Equipment />;
    }
    if (props.page === "meals") {
      return <Meals />;
    }
    if (props.page === "emergency") {
      return <Emergency />;
    }
  };
  // if (isLoggedIn) {
  //   return <UserGreeting />;
  // }
  // return <GuestGreeting />;

  return (
    <main className="planning">
      <Sidebar />
      {checkPage(props)}
    </main>
  );
};

export default Planning;
