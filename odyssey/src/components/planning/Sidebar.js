import React, { useEffect, useState } from "react";
import { Route, useParams } from "react-router";
import { Link } from "react-router-dom";
import "../component-styles/Sidebar.scss";
import {
  updatePrivacyForTrip,
  getPrivacyForTrip,
} from "../../Helpers/apiHelpers";

const GENERAL = "GENERAL";
const ROUTE = "ROUTE";
const EQUIPMENT = "EQUIPMENT";
const MEALS = "MEALS";
const EMERGENCY = "EMERGENCY";

const Sidebar = (props) => {
  const { trip_id } = useParams();
  const [privacyState, setPrivacyState] = useState(false);
  const [selectedState, setSelectedState] = useState();
  useEffect(() => {
    getPrivacyForTrip(trip_id).then((res) => {
      setPrivacyState(res.data[0].shared);
    });
  });
  return (
    <section className="sidebar">
      {selectedState === GENERAL ? (
        <Link
          to={`/planning/general/${props.edit}/${props.trip_id}`}
          type="button"
          className="selected"
        >
          <i className="fa fa-bandcamp sidebar-icon" aria-hidden="true"></i>
          General
        </Link>
      ) : (
        <Link
          to={`/planning/general/${props.edit}/${props.trip_id}`}
          type="button"
          className="sidebar-item"
          onClick={() => {
            setSelectedState(GENERAL);
          }}
        >
          <i className="fa fa-bandcamp sidebar-icon" aria-hidden="true"></i>
          General
        </Link>
      )}
      {selectedState === ROUTE ? (
        <Link
          to={`/planning/${props.edit}/${props.trip_id}`}
          type="button"
          className="selected"
        >
          <i className="fa fa-map sidebar-icon" aria-hidden="true"></i>
          Route
        </Link>
      ) : (
        <Link
          to={`/planning/${props.edit}/${props.trip_id}`}
          type="button"
          className="sidebar-item"
          onClick={() => {
            setSelectedState(ROUTE);
          }}
        >
          <i className="fa fa-map sidebar-icon" aria-hidden="true"></i>
          Route
        </Link>
      )}
      {selectedState === EQUIPMENT ? (
        <Link
          to={`/planning/equipment/${props.edit}/${props.trip_id}`}
          type="button"
          className="selected"
        >
          <i className="fa fa-archive sidebar-icon" aria-hidden="true"></i>
          Equipment
        </Link>
      ) : (
        <Link
          to={`/planning/equipment/${props.edit}/${props.trip_id}`}
          type="button"
          className="sidebar-item"
          onClick={() => {
            setSelectedState(EQUIPMENT);
          }}
        >
          <i className="fa fa-archive sidebar-icon" aria-hidden="true"></i>
          Equipment
        </Link>
      )}
      {selectedState === MEALS ? (
        <Link
          to={`/planning/meals/${props.edit}/${props.trip_id}`}
          type="button"
          className="selected"
        >
          <i className="fa fa-cutlery sidebar-icon" aria-hidden="true"></i>
          Meals
        </Link>
      ) : (
        <Link
          to={`/planning/meals/${props.edit}/${props.trip_id}`}
          type="button"
          className="sidebar-item"
          onClick={() => {
            setSelectedState(MEALS);
          }}
        >
          <i className="fa fa-cutlery sidebar-icon" aria-hidden="true"></i>
          Meals
        </Link>
      )}
      {props.edit === "edit" && selectedState === EMERGENCY && (
        <Link
          to={`/planning/emergency/${props.edit}/${props.trip_id}`}
          type="button"
          className="selected"
        >
          <i className="fa fa-phone sidebar-icon" aria-hidden="true"></i>
          Emergency Contact
        </Link>
      )}
      {props.edit === "edit" && selectedState !== EMERGENCY && (
        <Link
          to={`/planning/emergency/${props.edit}/${props.trip_id}`}
          type="button"
          className="sidebar-item"
          onClick={() => {
            setSelectedState(EMERGENCY);
          }}
        >
          <i className="fa fa-phone sidebar-icon" aria-hidden="true"></i>
          Emergency Contact
        </Link>
      )}
    </section>
  );
};

export default Sidebar;
