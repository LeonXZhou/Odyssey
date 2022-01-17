import React, { useState, useEffect } from "react";
import "../../component-styles/Equipment.scss";
import EquipmentItems from "./EquipmentItems";
import axios from "axios";

const Equipment = (props) => {
  if (props.equipmentArray) {
    const equipmentCards = props.equipmentArray.map((category, i) => {
      return (
        <EquipmentItems
          key={i}
          category={category}
          equipmentArray={props.equipmentArray}
          setEquipmentArray={props.setEquipmentArray}
          trip_id={props.trip_id}
        />
      );
    });
    return (
      <main className="equipment">
        {equipmentCards}
        <button className="add-equipment-card">
          <i className="fa fa-plus" style={{ fontSize: "5em" }} />
        </button>
      </main>
    );
  } else {
    return (
      <main className="equipment">
        <button className="add-equipment-card">
          <i className="fa fa-plus" style={{ fontSize: "5em" }} />
        </button>
      </main>
    );
  }
};

export default Equipment;
