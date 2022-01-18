import React from "react";
import axios from "axios";
import "../../component-styles/Equipment.scss";
import { updateQuantity } from "../../../Helpers/apiHelpers";
import { useState } from "react";
const EquipmentItems = (props) => {
  return (
    <tr>
      <td>
        <input
          value={props.itemName}
          onChange={(e) => {
            props.setEquipmentState((prev) => {
              const newState = { ...prev };
              newState[props.categoryId].items = {
                ...newState[props.categoryId].items,
              };
              newState[props.categoryId].items[props.itemId].gearName =
                e.target.value;
              // newState = { ...prev };
              return newState;
            });
          }}
        ></input>
      </td>
      <td>
        <input
          type={"number"}
          value={props.quantity}
          onChange={(e) => {
            props.setEquipmentState((prev) => {
              const newState = { ...prev };
              newState[props.categoryId].items = {
                ...newState[props.categoryId].items,
              };
              newState[props.categoryId].items[props.itemId].quantity =
                e.target.value;
              // newState = { ...prev };
              return newState;
            });
          }}
        ></input>
      </td>
    </tr>
  );
};

export default EquipmentItems;

// const newQuantity = (number) => {
//   const quantity = item.quantity + number;
//   const gear_name = item.gear_name;
//   return axios
//     .put(`/api/equipment/${props.trip_id}/quantities`, {
//       quantity,
//       gear_name,
//     })
//     .then(() => {
//       props.setEquipmentArray({
//         ...props.setEquipmentArray,
//       });
//     });
// };

// const items = props.category.items.map((item) => {
//   return (
//     <div className="equipment-card-items">
//       <h6>{item.gearName}</h6>
//     </div>
//   );
// });

// const quantity = props.category.items.map((item) => {
//   return (
//     <div className="equipment-card-quantity">
//       <button className="btn btn-default btn-sm equipment-card-quantity-buttons">
//         <b>-</b>
//       </button>
//       <h6>{item.quantity}</h6>
//       <button className="btn btn-default btn-sm equipment-card-quantity-buttons">
//         <b>+</b>
//       </button>
//     </div>
//   );
// });
