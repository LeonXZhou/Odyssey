import React from "react";
import { Link } from "react-router-dom";
import "./component-styles/navigation.scss";

const Navigation = () => {
  return (
    <main className="header-container">
      <div className="header-left">
        <Link to="/" type="button" className="btn btn-default">
          Home
        </Link>
        <Link to="/planning" type="button" className="btn btn-default">
          Discover
        </Link>
        <Link to="/" type="button" className="btn btn-default">
          My Trips
        </Link>
        <Link to="/" type="button" className="btn btn-default">
          About
        </Link>
      </div>
      <div className="header-right">
        <Link to="" type="button" className="btn btn-default">
          Login
        </Link>
        <Link to="" type="button" className="btn btn-default">
          Register
        </Link>
      </div>
    </main>
  );
};

export default Navigation;
