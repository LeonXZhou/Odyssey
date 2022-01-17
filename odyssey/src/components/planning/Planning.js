//react imports
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
//leaflet imports
import "../component-styles/Planning.scss";
//local imports
import Sidebar from "./Sidebar";
import TripDisplayItem from "../TripDisplayItem";
import Equipment from "./Equipment/Equipment";
import Meals from "./Meal/Meals";
import Emergency from "./Emergency";
import {
  formatTripData,
  formatTripEquipmentData,
} from "../../Helpers/dataHelpers";
import { getEquipmentForTrip, getMapForTrip } from "../../Helpers/apiHelpers";
import { parseDBMap, parseDBMarkers } from "../../Helpers/mapHelper";

const Planning = (props) => {
  const { trip_id } = useParams();
  const [tripsArray, setTripsArray] = useState([{}]);
  const [equipmentArray, setEquipmentArray] = useState([{}]);
  useEffect(() => {
    getMapForTrip(trip_id).then((res) => {
      setTripsArray(formatTripData(res.data));
    });
    getEquipmentForTrip(trip_id).then((res) => {
      setEquipmentArray(formatTripEquipmentData(res.data));
    });
  }, []);

  const trip = tripsArray[0];
  console.log("TRIPSARRAY", tripsArray);

  const checkPage = (props) => {
    if (props.page === "route" && Object.keys(trip).length > 0) {
      return (
        <TripDisplayItem
          key={trip_id}
          mapOptions={parseDBMap(trip.maps)}
          markers={parseDBMarkers(trip.markers)}
          name={"asdf"}
          description={"ASDF"}
          username={"asdf"}
          trip_id={trip.trip_id}
        />
      );
    }
    if (props.page === "equipment") {
      return (
        <Equipment
          equipmentArray={equipmentArray}
          setEquipmentArray={setEquipmentArray}
          trip_id={trip.trip_id}
        />
      );
    }
    if (props.page === "meals") {
      return <Meals />;
    }
    if (props.page === "emergency") {
      return <Emergency />;
    }
    return <></>;
  };
  // if (isLoggedIn) {
  //   return <UserGreeting />;
  // }
  // return <GuestGreeting />;

  return (
    <main className="planning">
      <Sidebar trip_id={trip_id} edit={props.edit} />
      {checkPage(props)}
    </main>
  );
};

export default Planning;
