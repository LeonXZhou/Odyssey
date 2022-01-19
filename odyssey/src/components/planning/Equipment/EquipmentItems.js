import React from "react";
import axios from "axios";
import "../../component-styles/Equipment.scss";
import { updateQuantity } from "../../../Helpers/apiHelpers";
import { useState } from "react";
const EquipmentItems = (props) => {
  return (
    <tr>
      <td>
        <textarea
          contenteditable="true"
          className="equipment-card-items"
          type={"text"}
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
        ></textarea>
      </td>
      <td className="equipment-card-quantity-column">
        <input
          className="equipment-card-quantities"
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
