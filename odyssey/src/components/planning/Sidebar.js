import React, { useEffect, useState } from "react";
import { Route, useParams } from "react-router";
import { Link } from "react-router-dom";
import "../component-styles/Sidebar.scss";
import {
  updatePrivacyForTrip,
  getPrivacyForTrip,
} from "../../Helpers/apiHelpers";

const Sidebar = (props) => {
  const { trip_id } = useParams();
  const [privacyState, setPrivacyState] = useState(false);
  useEffect(() => {
    getPrivacyForTrip(trip_id).then((res) => {
      setPrivacyState(res.data[0].shared);
    });
  });
  return (
    <section className="sidebar">
      <Link
        to={`/planning/${props.edit}/${props.trip_id}`}
        type="button"
        className="sidebar-item"
      >
        <i className="fa fa-map sidebar-icon" aria-hidden="true"></i>
        Route
      </Link>
      <Link
        to={`/planning/equipment/${props.edit}/${props.trip_id}`}
        type="button"
        className="sidebar-item"
      >
        <i className="fa fa-archive sidebar-icon" aria-hidden="true"></i>
        Equipment
      </Link>
      <Link
        to={`/planning/meals/${props.edit}/${props.trip_id}`}
        type="button"
        className="sidebar-item"
      >
        <i className="fa fa-cutlery sidebar-icon" aria-hidden="true"></i>
        Meals
      </Link>
      <Link
        to={`/planning/emergency/${props.edit}/${props.trip_id}`}
        type="button"
        className="sidebar-item"
      >
        <i className="fa fa-phone sidebar-icon" aria-hidden="true"></i>
        Emergency Contact
      </Link>
      {privacyState === false && (
        <button
          className="sidebar-item"
          onClick={() => {
            setPrivacyState(true);
            updatePrivacyForTrip(trip_id, true);
          }}
        >
          Private
        </button>
      )}
      {privacyState === true && (
        <button
          className="sidebar-item"
          onClick={() => {
            setPrivacyState(false);
            updatePrivacyForTrip(trip_id, false);
          }}
        >
          Public
        </button>
      )}
    </section>
  );
};

export default Sidebar;
