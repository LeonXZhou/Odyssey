import React from "react";
import "./component-styles/navigation.scss";

const Navigation = () => {
  return (
    <main className="header-container">
      <div className="header-left">
        <a href="/" type="button" class="btn btn-default header-right-button">
          Home
        </a>
        <a
          href="/planning"
          type="button"
          class="btn btn-default header-right-button"
        >
          Discover
        </a>
        <a href="" type="button" class="btn btn-default header-right-button">
          My Trips
        </a>
        <a href="" type="button" class="btn btn-default header-right-button">
          About
        </a>
      </div>
      <div className="header-right">
        <a href="" type="button" class="btn btn-default header-right-button">
          Login
        </a>
        <a href="" type="button" class="btn btn-default header-right-button">
          Register
        </a>
      </div>
    </main>
  );
};

export default Navigation;
