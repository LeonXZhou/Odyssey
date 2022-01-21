import React from "react";
import { useContext } from "react";
import { authContext } from "./providers/AuthenticationProvider";
import { Link } from "react-router-dom";
import "./component-styles/Navigation.scss";
import odyssey_logo from "./images/odyssey_logo.png";

const Navigation = (props) => {
  const { user, auth } = useContext(authContext);
  return (
    <main className="header-container">
      <div className="header-left">
        <Link to="/planning" type="button" className="nav-button">
          Discover
        </Link>
        <Link
          to={`/myTrips/${user.userId}`}
          type="button"
          className="btn btn-default"
        >
          My Trips
        </Link>
        <Link to="/" type="button" className="btn btn-default">
          About
        </Link>
      </div>
      <div className="header-middle">
        <Link to="/" type="button" className="btn btn-default">
          <img className="logo" src={odyssey_logo} />
          Odyssey
        </Link>
      </div>
      {auth ? (
        <div className="header-right">
          <div>{`${user.firstName}`}</div>
          <Link to="/logout" type="button" className="btn btn-default">
            Logout
          </Link>
        </div>
      ) : (
        <div className="header-right">
          <Link to="/register" type="button" className="signup">
            Sign Up
          </Link>
          <Link to="/login" type="button" className="login">
            Log In
          </Link>
        </div>
      )}
    </main>
  );
};

export default Navigation;
