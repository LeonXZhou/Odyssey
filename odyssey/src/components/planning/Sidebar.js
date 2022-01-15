import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../component-styles/Sidebar.scss";

const Sidebar = () => {
  return (
    <section className="sidebar">
      <Link
        to="/planning/route"
        type="button"
        className="btn btn-default sidebar-item"
      >
        Route
      </Link>
      <Link
        to="/planning/equipment"
        type="button"
        className="btn btn-default sidebar-item"
      >
        Equipment
      </Link>
      <Link
        to="/planning/meals"
        type="button"
        className="btn btn-default  sidebar-item"
      >
        Meals
      </Link>
      <Link
        to="/planning/emergency"
        type="button"
        className="btn btn-default  sidebar-item"
      >
        Emergency Contact
      </Link>
    </section>
  );
};

export default Sidebar;
