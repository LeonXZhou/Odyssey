import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../component-styles/Sidebar.scss";

const Sidebar = (props) => {
  return (
    <section className="sidebar">
      <Link
        to={`/planning/${props.edit}/${props.trip_id}`}
        type="button"
        className="btn btn-default sidebar-item"
      >
        <i className="fa fa-map" aria-hidden="true"></i>
        Route
      </Link>
      <Link
        to={`/planning/equipment/${props.edit}/${props.trip_id}`}
        type="button"
        className="btn btn-default sidebar-item"
      >
        <i className="fa fa-archive" aria-hidden="true"></i>
        Equipment
      </Link>
      <Link
        to={`/planning/meals/${props.edit}/${props.trip_id}`}
        type="button"
        className="btn btn-default  sidebar-item"
      >
        <i className="fa fa-cutlery" aria-hidden="true"></i>
        Meals
      </Link>
      <Link
        to="/planning/emergency"
        type="button"
        className="btn btn-default  sidebar-item"
      >
        <i className="fa fa-phone" aria-hidden="true"></i>
        Emergency Contact
      </Link>
    </section>
  );
};

export default Sidebar;
