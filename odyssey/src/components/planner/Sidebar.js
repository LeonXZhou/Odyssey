import React, { useEffect } from "react";
import "../component-styles/Sidebar.scss";

const Sidebar = () => {
  return (
    <main className="sidebar">
      <ul>
        <li>Route</li>
        <li>Equipment</li>
        <li>Meals</li>
        <li>Emergency Contact</li>
      </ul>
    </main>
  );
};

export default Sidebar;
