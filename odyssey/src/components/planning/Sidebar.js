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
        to={`/planning/general/${props.edit}/${props.trip_id}`}
        type="button"
        className="sidebar-item"
      >
        <i className="fa fa-map sidebar-icon" aria-hidden="true"></i>
        General
      </Link>
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
      {props.edit === "edit" && (
        <Link
          to={`/planning/emergency/${props.edit}/${props.trip_id}`}
          type="button"
          className="sidebar-item"
        >
          <i className="fa fa-phone sidebar-icon" aria-hidden="true"></i>
          Emergency Contact
        </Link>
      )}
    </section>
  );
};

export default Sidebar;
