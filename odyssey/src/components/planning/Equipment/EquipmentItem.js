import React from "react";
import "../../component-styles/Equipment.scss";

const Equipment = (props) => {
  // const equipment = equipmentArray.map((equipment, i) => {
  //   return <EquipmentItem key={i} name={equipment.name} />;
  // });
  return (
    <main>
      <div className="equipment-card">
        <div className="equipment-card-header">
          <h3></h3>
        </div>
        <h5>{props.apparel.item1}</h5>
        <h5>{props.apparel.item2}</h5>
      </div>
    </main>
  );
};

export default Equipment;
