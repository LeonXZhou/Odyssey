//react imports
import React, { useState, useEffect } from "react";
import { Route, useParams } from "react-router";
//leaflet imports
import "../component-styles/Planning.scss";
//local imports
import Sidebar from "./Sidebar";
import MapDisplay from "../MapComponents/MapDisplay";
import Equipment from "./Equipment/Equipment";
import Meals from "./Meal/Meals";
import Emergency from "./Emergency/Emergency";
import MapEditor from "../MapComponents/MapEditor";
import MapProvider from "../providers/MapProvider";
import General from "./General/General";
import {
  formatTripData,
  formatTripEquipmentData,
  formatTripMealsData,
  formatEmergencyData,
} from "../../Helpers/dataHelpers";
import {
  getGeneralForTrip,
  getEquipmentForTrip,
  getMapForTrip,
  getMealsForTrip,
  getEmergencyContactByTripId,
} from "../../Helpers/apiHelpers";
import { parseDBMap, parseDBMarkers } from "../../Helpers/mapHelper";

const Planning = (props) => {
  const { trip_id } = useParams();
  const [routeArray, setRouteArray] = useState([{}]);
  const [equipmentState, setEquipmentState] = useState({});
  const [mealState, setMealState] = useState({});
  const [generalState, setGeneralState] = useState({});
  const [emergencyState, setEmergencyState] = useState({
    id: "",
    trip_id: trip_id,
    name: "",
    phone_number: "",
    email: "",
    send_date: "",
    send_time: "",
  });
<<<<<<< HEAD
  const [weatherState, setWeatherState] = useState({});
=======
  const [weatherState, setWeatherState] = useState({})
>>>>>>> f9877f48fe26ad46800bb0fbee70ca5e2c7fb049
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
    if (props.edit === "edit")
    {
      getEmergencyContactByTripId(trip_id).then((res) => {
        setEmergencyState(formatEmergencyData(res.data));
      });
    }
    getGeneralForTrip(trip_id)
    .then((res) => {
      setGeneralState(res.data);
    });
  }, [trip_id]);
  const checkPage = (props) => {
    const route = routeArray[0];
    if (
      props.page === "route" &&
      Object.keys(route).length > 0 &&
      props.edit === "view"
    ) {
      return (
        <MapDisplay
          mapOptions={parseDBMap(route.maps)}
          markers={parseDBMarkers(route.markers)}
        ></MapDisplay>
      );
    }
    if (
      props.page === "route" &&
      Object.keys(route).length > 0 &&
      props.edit === "edit"
    ) {
      return (
        <MapProvider>
          <MapEditor
            //same map options as Mapdisplay
            trip_id={route.trip_id}
            mapOptions={parseDBMap(route.maps)}
            markers={parseDBMarkers(route.markers)}
            startDate={route.startDate}
            endDate={route.endDate}
            setRouteArray={setRouteArray}
          ></MapEditor>
        </MapProvider>
      );
    }
    if (props.page === "equipment") {
      let averageLat = 0;
      let averageLng = 0;
      if (Object.keys(route).length && route.markers.length > 0) {
        averageLat = Number(route.maps.lat);
        averageLng = Number(route.maps.long);
        let latTotal = 0;
        let lngTotal = 0;
        for (const marker of route.markers) {
          latTotal += Number(marker.lat);
          lngTotal += Number(marker.long);
        }
        averageLat = latTotal / route.markers.length;
        averageLng = lngTotal / route.markers.length;
      }
      return (
        <Equipment
          equipmentState={equipmentState}
          setEquipmentState={setEquipmentState}
          trip_id={route.trip_id}
          edit={props.edit}
          startDate={route.startDate}
          endDate={route.endDate}
          averageLat={averageLat}
          averageLng={averageLng}
          weatherState={weatherState}
          setWeatherState={setWeatherState}
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
      return (
        <Emergency
          trip_id={trip_id}
          emergencyState={emergencyState}
          setEmergencyState={setEmergencyState}
        />
      );
    }
    if (
      props.page === "general" &&
      Object.keys(route).length > 0 &&
      props.edit === "view"
    ) {
<<<<<<< HEAD
      return <General></General>;
=======
      return (<General generalState={generalState}></General>
      );
>>>>>>> f9877f48fe26ad46800bb0fbee70ca5e2c7fb049
    }
    if (
      props.page === "general" &&
      Object.keys(route).length > 0 &&
      props.edit === "edit"
    ) {
<<<<<<< HEAD
      return <General></General>;
=======
      return (<General generalState={generalState} setGeneralState={setGeneralState} setMealState={setMealState}></General>
      );
>>>>>>> f9877f48fe26ad46800bb0fbee70ca5e2c7fb049
    }
    return <></>;
  };

  return (
    <main className="planning">
      <Sidebar trip_id={trip_id} edit={props.edit} />
      {checkPage(props)}
    </main>
  );
};

export default Planning;
