import React from "react";
import axios from "axios";
import "../../component-styles/Equipment.scss";
import { updateQuantity } from "../../../Helpers/apiHelpers";
import { useState } from "react";
const EquipmentItems = (props) => {
  return (
    <tr>
      <td>{props.item}</td>
      <td>
        <button className="btn btn-default btn-sm equipment-card-quantity-buttons">
          <b>-</b>
        </button>
        {props.quantity}
        <button className="btn btn-default btn-sm equipment-card-quantity-buttons">
          <b>+</b>
        </button>
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
