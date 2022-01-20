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
  formatTripMealsData,
} from "../../Helpers/dataHelpers";
import {
  getEquipmentForTrip,
  getMapForTrip,
  getMealsForTrip,
} from "../../Helpers/apiHelpers";
import { parseDBMap, parseDBMarkers } from "../../Helpers/mapHelper";

const Planning = (props) => {
  const { trip_id } = useParams();
  const [routeArray, setRouteArray] = useState([{}]);
  const [equipmentState, setEquipmentState] = useState({});
  const [mealState, setMealState] = useState({});
  useEffect(() => {
    getMapForTrip(trip_id).then((res) => {
      setRouteArray(formatTripData(res.data));
    });
    getEquipmentForTrip(trip_id).then((res) => {
      setEquipmentState(formatTripEquipmentData(res.data));
    });
    getMealsForTrip(trip_id).then((res) => {
      setMealState(formatTripMealsData(res.data));
    });
    console.log("ooops");
  }, [trip_id]);
  console.log("this is tripsArray");

  const checkPage = (props) => {
    const route = routeArray[0];
    if (props.page === "route" && Object.keys(route).length > 0) {
      return (
        <TripDisplayItem
          key={trip_id}
          mapOptions={parseDBMap(route.maps)}
          markers={parseDBMarkers(route.markers)}
          name={"asdf"}
          description={"ASDF"}
          username={"asdf"}
          trip_id={route.trip_id}
        />
      );
    }
    if (props.page === "equipment") {
      return (
        <Equipment
          equipmentState={equipmentState}
          setEquipmentState={setEquipmentState}
          trip_id={route.trip_id}
          edit={props.edit}
        />
      );
    }
    if (props.page === "meals") {
      return (
        <Meals
          setMealState={setMealState}
          mealState={mealState}
          edit={props.edit}
        />
      );
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
