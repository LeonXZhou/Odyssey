
import React from "react";
import { Link } from "react-router-dom";
import "./component-styles/navigation.scss";

const Navigation = (props) => {
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
      {props.userEmail ? <>
        <div>{`logged in as ${props.userEmail}`}</div>
        <Link to="/logout" type="button" className="btn btn-default">
            logout
          </Link>
      </>
        :
        <div className="header-right">
          <Link to="/login" type="button" className="btn btn-default">
            Login
          </Link>
          <Link to="/register" type="button" className="btn btn-default">
            Register
          </Link>
        </div>}
    </main>
  );
};

export default Navigation;
