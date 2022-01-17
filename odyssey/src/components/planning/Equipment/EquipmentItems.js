import React from "react";
import axios from "axios";
import "../../component-styles/Equipment.scss";
import { updateQuantity } from "../../../Helpers/apiHelpers";

const EquipmentItems = (props) => {
  const items = props.category.items.map((item) => {
    return (
      <div className="equipment-card-items">
        <h6>{item.gearName}</h6>
      </div>
    );
  });

  const quantity = props.category.items.map((item) => {
    const newQuantity = (number) => {
      const quantity = item.quantity + number;
      const gear_name = item.gear_name;
      return axios
        .put(`/api/equipment/${trip_id}/quantities`, {
          quantity,
          gear_name,
        })
        .then(() => {
          props.setEquipmentArray({
            ...props.setEquipmentArray,
          });
        });
    };
    return (
      <div className="equipment-card-quantity">
        <button
          className="btn btn-default btn-sm equipment-card-quantity-buttons"
          onClick={console.log(newQuantity(-1))}
        >
          <b>-</b>
        </button>
        <h6>{item.quantity}</h6>
        <button
          className="btn btn-default btn-sm equipment-card-quantity-buttons"
          onClick={() => newQuantity(1)}
        >
          <b>+</b>
        </button>
      </div>
    );
  });

  return (
    <main>
      <div className="equipment-card">
        <div className="equipment-card-header">
          <h3>{props.category.category}</h3>
        </div>
        <table>
          <tr>
            <th>ITEM</th>
            <th>QUANTITY</th>
          </tr>
          <tr>
            <td>{items}</td>
            <td>{quantity}</td>
          </tr>
        </table>
        <input
          placeholder="Add Item"
          style={{
            border: "none",
            borderBottom: "1.5px solid black",
            backgroundColor: "rgb(216, 216, 185)",
          }}
        ></input>
      </div>
    </main>
  );
};

export default EquipmentItems;
