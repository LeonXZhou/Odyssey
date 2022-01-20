import React from "react";
import "../../component-styles/MealCard.scss";
import MealItem from "./MealItem";
import { useState } from "react";
import { updateMealCard } from "../../../Helpers/apiHelpers";

const MealCard = (props) => {
  const mealItemArray = [];
  const [newItemState, setNewItemState] = useState({
    name: "",
    quantity: "",
  });
  for (const mealItemKey in props.mealState.mealItems) {
    mealItemArray.push(
      <MealItem
        key={mealItemKey}
        itemState={props.mealState.mealItems[mealItemKey]}
        edit={props.edit}
        setMealState={props.setMealState}
        mealId={props.mealState.mealId}
        dayId={props.dayId}
      ></MealItem>
    );
  }
  return (
    <div className={"mealCard"}>
      <div className={"mealName"}>
        {props.edit === "edit" ? (
          <input
            className="equipment-card-title-input"
            value={props.mealState.mealName}
            onChange={(e) => {
              props.setMealState((prev) => {
                const newState = { ...prev };
                console.log("lool at me please", props);
                newState[props.dayId].meals[props.mealState.mealId] = {
                  ...newState[props.dayId].meals[props.mealState.mealId],
                  mealName: e.target.value,
                };

                return newState;
              });
            }}
          ></input>
        ) : (
          <p1>{props.mealState.mealName}</p1>
        )}
      </div>
      <table>
        <tbody>
          <tr>
            <th className={"foodName"}>Item Name</th>
            <th>Quantity</th>
          </tr>
          {mealItemArray}
          <tr>
            <td>
              {props.edit === "edit" && (
                <input
                  className="equipment-card-new"
                  placeholder="New Item"
                  value={newItemState.name}
                  onChange={(e) => {
                    setNewItemState((prev) => {
                      return { ...prev, name: e.target.value };
                    });
                  }}
                ></input>
              )}
            </td>
            <td>
              {props.edit === "edit" && (
                <input
                  className="equipment-card-new"
                  placeholder="Quantity"
                  value={newItemState.quantity}
                  onChange={(e) => {
                    setNewItemState((prev) => {
                      return { ...prev, quantity: e.target.value };
                    });
                  }}
                  type={"number"}
                ></input>
              )}
            </td>
          </tr>
        </tbody>
      </table>
      {props.edit === "edit" && (
        <>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              props.setMealState((prev) => {
                console.log(prev);
                const newState = { ...prev };
                newState[props.dayId].meals[props.mealState.mealId].mealItems =
                  {
                    ...newState[props.dayId].meals[props.mealState.mealId]
                      .mealItems,
                  };
                const newKey =
                  -Object.keys(
                    newState[props.dayId].meals[props.mealState.mealId]
                      .mealItems
                  ).length - 1;
                newState[props.dayId].meals[props.mealState.mealId].mealItems[
                  newKey
                ] = {
                  mealItemName: newItemState.name,
                  mealItemQuantity: newItemState.quantity,
                  mealItemId: newKey,
                };
                console.log(newState);
                return newState;
              });
              setNewItemState({
                name: "",
                quantity: "",
              });
            }}
          >
            <button className="btn btn-default btn-sm equipment-card-button">
              Add Item
            </button>
          </form>

          <button
            className="btn btn-default btn-sm equipment-card-button"
            onClick={(e) => {
              e.preventDefault();
              updateMealCard(
                props.dayId,
                props.mealState.mealId,
                props.mealState.mealName,
                props.mealState.mealItems
              );
            }}
          >
            Save Card
          </button>
        </>
      )}
    </div>
  );
};

export default MealCard;
