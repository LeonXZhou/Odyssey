import React from "react";
import "../../component-styles/Equipment.scss";
import EquipmentItem from "./EquipmentItem";

const Equipment = (props) => {
  console.log("EQUIPMENT ARRAY: ", props.equipmentArray);
  // const EquipmentItems = equipmentArray.map((category, i) => {
  //   return <EquipmentItem key={i} apparel={category.apparel} />;
  // });
  return (
    <main className="equipment">
      {/* {EquipmentItems} */}
      <div className="equipment-card">
        <div className="equipment-card-header">
          <h3>Add</h3>
        </div>
      </div>
    </main>
  );
};

export default Equipment;
