import React, { useState, useEffect } from "react";
import "../../component-styles/Equipment.scss";
import EquipmentItems from "./EquipmentItems";
import axios from "axios";

const Equipment = (props) => {
  const equipmentCards = props.equipmentArray.map((category, i) => {
    return (
      <EquipmentItems
        key={i}
        category={category}
        equipmentArray={props.equipmentArray}
        setEquipmentArray={props.setEquipmentArray}
      />
    );
  });
  // console.log("EQUIPMENT ARRY", props.equipmentArray);
  return (
    <main className="equipment">
      {equipmentCards}
      <button className="add-equipment-card">
        <i class="fa fa-plus" style={{ fontSize: "5em" }} />
      </button>
    </main>
  );
};

export default Equipment;
