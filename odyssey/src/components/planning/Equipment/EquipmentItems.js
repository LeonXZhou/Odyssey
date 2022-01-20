import React from "react";
import "../../component-styles/Equipment.scss";
import { formatTripEquipmentData } from "../../../Helpers/dataHelpers";
import {
  getEquipmentForTrip,
  deleteCategoryItem,
} from "../../../Helpers/apiHelpers";

const EquipmentItems = (props) => {
  return (
    <tr>
      <td className="equipment-card-delete">
        {props.edit === "edit" && (
          <button
            className="btn equipment-card-items-delete"
            onClick={() => {
              deleteCategoryItem(props.itemId).then(() => {
                getEquipmentForTrip(props.trip_id).then((res) => {
                  props.setState(formatTripEquipmentData(res.data));
                });
              });
            }}
          >
            x
          </button>
        )}
      </td>
      <td>
        {props.edit === "edit" ? (
          <input
            contentEditable="true"
            className="equipment-card-items"
            type={"text"}
            value={props.itemName}
            onChange={(e) => {
              props.setState((prev) => {
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
        ) : (
          <p1>{props.itemName}</p1>
        )}
      </td>
      <td className="equipment-card-quantity-column">
        {props.edit === "edit" ? (
          <>
            <i>-</i>
            <input
              className="equipment-card-quantities"
              type={"number"}
              value={props.quantity}
              onChange={(e) => {
                props.setState((prev) => {
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
            <i>+</i>
          </>
        ) : (
          <p1>{props.quantity}</p1>
        )}
      </td>
    </tr>
  );
};

export default EquipmentItems;
