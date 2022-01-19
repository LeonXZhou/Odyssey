import React from "react";
import "../../component-styles/Equipment.scss";
import { useState } from "react";
import EquipmentItems from "./EquipmentItems";
import {
  updateEquipmentCard,
  getEquipmentForTrip,
} from "../../../Helpers/apiHelpers";
import { formatTripEquipmentData } from "../../../Helpers/dataHelpers";

const EquipmentCategories = (props) => {
  // const [categoryInfo, setCategoryInfo] = useState({
  //   categoryName: props.category.category,
  //   categoryId: props.category.id,
  // });
  const [categoryState, setCategoryState] = useState({});
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

  return (
    <main>
      <div className="equipment-card">
        <div className="equipment-card-title">
          <input
            contentEditable="true"
            className="equipment-card-title-input"
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
          <thead>
            <tr>
              <th>ITEM</th>
              <th>QUANTITY</th>
            </tr>
          </thead>
          <tbody>{lineItems}</tbody>
          <tbody>
            <tr>
              <td>
                <input
                  className="equipment-card-new"
                  value={newItemState.name}
                  placeholder="New Item"
                  onChange={(e) => {
                    setNewItemState((prev) => {
                      return { ...prev, name: e.target.value };
                    });
                  }}
                ></input>
              </td>
              <td>
                <input
                  className="equipment-card-new"
                  value={newItemState.quantity}
                  placeholder="Quantity"
                  onChange={(e) => {
                    setNewItemState((prev) => {
                      return { ...prev, quantity: e.target.value };
                    });
                  }}
                  type={"number"}
                ></input>
              </td>
            </tr>
          </tbody>
        </table>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            props.setEquipmentState((prev) => {
              const newState = { ...prev };
              const newKey =
                -Object.keys(newState[props.categoryId].items).length - 1;
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
          <br />
          <button className="btn btn-default btn-sm equipment-card-button">
            Add
          </button>
        </form>
        <button
          className="btn btn-default btn-sm equipment-card-button"
          onClick={(e) => {
            e.preventDefault();
            props.setEquipmentState();
            updateEquipmentCard(
              props.trip_id,
              Number(props.categoryId),
              props.categoryName,
              props.categoryItems
            );
          }}
        >
          Save
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();

            props.onSubmit(props.trip_id, inputState).then(() => {
              getEquipmentForTrip(props.trip_id).then((res) => {
                props.setState(formatTripEquipmentData(res.data));
              });
            });
          }}
        >
          Save
        </button>
      </div>
    </main>
  );
};

export default EquipmentCategories;
