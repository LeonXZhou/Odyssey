import React from "react";
import "../../component-styles/Equipment.scss";
import { useState } from "react";
import EquipmentItems from "./EquipmentItems";
import { formatTripEquipmentData } from "../../../Helpers/dataHelpers";
import {
  getEquipmentForTrip,
  updateEquipmentCard,
  deleteCategory,
} from "../../../Helpers/apiHelpers";

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
        setState={props.setEquipmentState}
        trip_id={props.trip_id}
        edit={props.edit}
      ></EquipmentItems>
    );
  }

  return (
    <main>
      <div className="equipment-card">
        <div className="equipment-card-title">
          <input
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
          {props.edit === "edit" && (
            <button
              className="equipment-card-title-button"
              onClick={() => {
                deleteCategory(props.trip_id, props.categoryId).then(() => {
                  getEquipmentForTrip(props.trip_id).then((res) => {
                    props.setState(formatTripEquipmentData(res.data));
                  });
                });
              }}
            >
              X
            </button>
          )}
        </div>
        <table>
          <thead>
            <tr>
              <th className="equipment-card-delete-title"></th>
              <th>ITEM</th>
              <th>QUANTITY</th>
            </tr>
          </thead>
          <tbody>{lineItems}</tbody>
          {props.edit === "edit" && (
            <tbody>
              <tr>
                <td></td>
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
          )}
        </table>
        {props.edit === "edit" && (
          <>
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
                Add Item
              </button>
            </form>
            <button
              onClick={(e) => {
                e.preventDefault();
                updateEquipmentCard(
                  props.trip_id,
                  Number(props.categoryId),
                  props.categoryName,
                  props.categoryItems
                ).then(() => {
                  getEquipmentForTrip(props.trip_id).then((res) => {
                    props.setState(formatTripEquipmentData(res.data));
                  });
                });
              }}
              className="btn btn-default btn-sm equipment-card-button"
            >
              Save Card
            </button>
          </>
        )}
      </div>
    </main>
  );
};

export default EquipmentCategories;
