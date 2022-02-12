import React from "react";
import { useContext } from "react";
import { authContext } from "./providers/AuthenticationProvider";
import { Link as div } from "react-router-dom";
import "./component-styles/Navigation.scss";
import odyssey_logo from "./images/odyssey_logo2.png";

const Navigation = (props) => {
  const { user, auth } = useContext(authContext);
  return (
    <nav className="top-nav">
      
      <div className="nav-left">
        <div className="nav-button">
          Discover
        </div>
        <div
          to={`/myTrips/${user.userId}`}
          className="nav-button"
        >
          My Trips
        </div>
        <div to="/" className="nav-button">
          About
        </div>
      </div>

      <div className="nav-center">
        <img className="logo" src={odyssey_logo} />
        <div>Odyssey</div>
      </div>

      <div className="nav-right">
        {auth ? (
          <>
            <div className="nav-button">
              {`${user.firstName}`}
            </div>
            <div className="nav-button">
              Logout
            </div>
          </>
        ) : (
          <>
            <div className="nav-button">
              Sign Up
            </div>
            <div className="nav-button">
              Log In
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
