import React from "react";
import axios from "axios";
import "../../component-styles/Equipment.scss";
import { useState } from "react";
import EquipmentItems from "./EquipmentItems";

const EquipmentCategories = (props) => {
  // const [categoryInfo, setCategoryInfo] = useState({
  //   categoryName: props.category.category,
  //   categoryId: props.category.id,
  // });
  const [newItemState, setNewItemState] = useState({
    name: "",
    quantity: "",
  });
  const lineItems = [];
  for (const item in props.categoryItems) {
    lineItems.push(
      <EquipmentItems
        key={item}
        itemName={props.categoryItems[item].gearName}
        itemId={props.categoryItems[item].itemId}
        quantity={props.categoryItems[item].quantity}
        categoryId={Number(props.categoryId)}
        setEquipmentState={props.setEquipmentState}
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
            value={props.categoryName}
            onChange={(e) => {
              props.setEquipmentState((prev) => {
                const newState = { ...prev };
                newState[props.categoryId] = {
                  ...prev[props.categoryId],
                  category: e.target.value,
                };
                return newState;
              });
            }}
          ></input>
        </div>
        <table>
          <tbody>
            <tr>
              <th>ITEM</th>
              <th>QUANTITY</th>
            </tr>
            {lineItems}
          </tbody>
        </table>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            props.setEquipmentState((prev) => {
              const newState = { ...prev };
              const newKey = -Object.keys(newState[props.categoryId].items)
                .length;
              newState[props.categoryId].items[newKey] = {
                gearName: newItemState.name,
                quantity: newItemState.quantity,
                itemId: newKey,
              };
              return newState;
            });
            setNewItemState({
              name: "",
              quantity: "",
            });
          }}
        >
          {" "}
          <input
            value={newItemState.name}
            placeholder="New Item Name"
            onChange={(e) => {
              setNewItemState((prev) => {
                return { ...prev, name: e.target.value };
              });
            }}
            style={{
              border: "none",
              borderBottom: "1.5px solid black",
              backgroundColor: "rgb(216, 216, 185)",
            }}
          ></input>
          <input
            value={newItemState.quantity}
            placeholder="Quantity"
            onChange={(e) => {
              setNewItemState((prev) => {
                return { ...prev, quantity: e.target.value };
              });
            }}
            type={"number"}
            style={{
              border: "none",
              borderBottom: "1.5px solid black",
              backgroundColor: "rgb(216, 216, 185)",
            }}
          ></input>
          <button>add</button>
        </form>
      </div>
    </main>
  );
};

export default EquipmentCategories;
