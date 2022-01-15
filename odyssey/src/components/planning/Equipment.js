import React from "react";
import "../component-styles/Equipment.scss";

const Equipment = () => {
  // const equipment = equipmentArray.map((equipment, i) => {
  //   return <EquipmentItem key={i} name={equipment.name} />;
  // });
  return (
    <main className="equipment">
      <div className="equipment-card">
        <div className="descriptionContainer">
          <h1>
            <b>Apparel</b>
          </h1>
          <p>{"props.description"}</p>
          <p>Created By: {"props.username"}</p>
        </div>
      </div>
    </main>
  );
};

export default Equipment;
