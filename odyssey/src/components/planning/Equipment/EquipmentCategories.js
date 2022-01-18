import React from "react";
import axios from "axios";
import "../../component-styles/Equipment.scss";
import { useState } from "react";

const EquipmentItems = (props) => {
  return (
    <tr>
      <td>{props.item}</td>
      <td>
        <input
          type={"number"}
          value={props.quantity}
          onChange={(e) => {
            props.setItems((prev) => {
              return { ...prev };
            });
          }}
        ></input>
        {/* <button className="btn btn-default btn-sm equipment-card-quantity-buttons">
          <b>-</b>
        </button>
        {props.quantity}
        <button className="btn btn-default btn-sm equipment-card-quantity-buttons">
          <b>+</b>
        </button> */}
      </td>
    </tr>
  );
};

const EquipmentCategories = (props) => {
  const [categoryInfo, setCategoryInfo] = useState({
    categoryName: props.category.category,
    categoryId: props.category.id,
  });

  const [items, setItems] = useState(props.categoryItems);
  console.log(items);
  const lineItems = [];
  for (const item in items) {
    lineItems.push(
      <EquipmentItems
        item={items[item].gearName}
        quantity={items[item].quantity}
        setItems={setItems}
      ></EquipmentItems>
    );
  }
  // const lineItems = items.forEach((item) => {
  //   console.log("ITEM", item);
  //   return (
  //     <EquipmentItems
  //       item={item.gearName}
  //       quantity={item.quantity}
  //     ></EquipmentItems>
  //   );
  // });

  return (
    <main>
      <div className="equipment-card">
        <div className="equipment-card-header">
          <input
            value={categoryInfo.categoryName}
            onChange={(e) => {
              setCategoryInfo((prev) => {
                return { ...prev, categoryName: e.target.value };
              });
            }}
          ></input>
        </div>
        <table>
          <tr>
            <th>ITEM</th>
            <th>QUANTITY</th>
          </tr>
          {lineItems}
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

export default EquipmentCategories;

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
