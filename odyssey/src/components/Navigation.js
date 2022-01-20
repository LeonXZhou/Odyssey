import React from "react";
import { useContext } from "react";
import { authContext } from "./providers/AuthenticationProvider";
import { Link } from "react-router-dom";
import "./component-styles/navigation.scss";

const Navigation = (props) => {
  const { user, auth } = useContext(authContext);
  return (
    <main className="header-container">
      <div className="header-left">
        <Link to="/" type="button" className="btn btn-default">
          Home
        </Link>
        <Link to="/planning" type="button" className="btn btn-default">
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
      {auth ? (
        <>
          <div>{`logged in as ${user.email}`}</div>
          <Link to="/logout" type="button" className="btn btn-default">
            logout
          </Link>
        </>
      ) : (
        <div className="header-right">
          <Link to="/login" type="button" className="btn btn-default">
            Login
          </Link>
          <Link to="/register" type="button" className="btn btn-default">
            Register
          </Link>
        </div>
      )}
    </main>
  );
};

export default Navigation;
