import React from "react";
import "../component-styles/Equipment.scss";
import EquipmentItem from "./EquipmentItem";

const Equipment = () => {
  const equipmentArray = [
    {
      apparel: {
        item1: "jacket",
        item2: "socks",
      },
    },
    {
      apparel: {
        item1: "jacket",
        item2: "socks",
      },
    },
  ];
  const EquipmentItems = equipmentArray.map((category, i) => {
    return <EquipmentItem key={i} apparel={category.apparel} />;
  });
  return (
    <main className="equipment">
      {EquipmentItems}
      <div className="equipment-card">
        <div className="equipment-card-header">
          <h3>Add</h3>
        </div>
      </div>
    </main>
  );
};

export default Equipment;
