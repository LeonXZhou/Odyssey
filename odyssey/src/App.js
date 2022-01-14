import React from "react";
import "./App.css";
import Home from "./components/Home";
import Navigation from "./components/Navigation";
import DisplayTrips from "./components/DisplayTrips";
import AddTrip from "./components/AddTrip";

const App = () => {
  return (
    <div className="App">
      <Navigation />
      <Home></Home>
    </div>
  );
};

export default App;
