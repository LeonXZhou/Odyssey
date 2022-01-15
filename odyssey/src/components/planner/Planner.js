import React, { useEffect } from "react";
import "../component-styles/Planner.scss";
import Sidebar from "./Sidebar";

const Planner = () => {
  return (
    <main className="planner-page">
      <Sidebar />
      <section className="page">NOT SIDEBAR</section>
    </main>
  );
};

export default Planner;
