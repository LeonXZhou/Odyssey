import React from "react";
import "./component-styles/navigation.scss";

const Navigation = () => {
  return (
    <main className="header-container">
      <div className="header-left">
        <a href="/" type="button" className="btn btn-default">
          Home
        </a>
        <a href="/planning" type="button" className="btn btn-default">
          Discover
        </a>
        <a href="" type="button" className="btn btn-default">
          My Trips
        </a>
        <a href="" type="button" className="btn btn-default">
          About
        </a>
      </div>
      <div className="header-right">
        <a href="" type="button" className="btn btn-default">
          Login
        </a>
        <a href="" type="button" className="btn btn-default">
          Register
        </a>
      </div>
    </main>
  );
};

export default Navigation;
