import React from "react";
import axios from "axios";
import "../../component-styles/Equipment.scss";

const EquipmentItems = (props) => {
  const items = props.category.items.map((item) => {
    return (
      <div className="equipment-card-items">
        <h6>{item.gearName}</h6>
      </div>
    );
  });

  const quantity = props.category.items.map((item) => {
    console.log("EQUIPMENT ARRAY", props.equipmentArray);
    const updateQuantity = (number) => {
      const gear = item.gear_item;
      const newNumber = item.quantity + number;
      return axios
        .put(`/api/equipment/${props.trip_id}`, { gear, newNumber })
        .then(() => {
          props.setEquipmentArray({
            ...props.equipmentArray,
            newNumber,
          });
        });
    };
    return (
      <div className="equipment-card-quantity">
        <button
          className="btn btn-default btn-sm equipment-card-quantity-buttons"
          onClick={() => updateQuantity(-1)}
        >
          <b>-</b>
        </button>
        <h6>{item.quantity}</h6>
        <button
          className="btn btn-default btn-sm equipment-card-quantity-buttons"
          onClick={() => updateQuantity(1)}
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
