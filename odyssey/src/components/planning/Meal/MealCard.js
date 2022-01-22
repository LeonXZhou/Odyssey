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
    console.log("what the actuall fuck is going on here")
    mealItemArray.push(
      <MealItem
        key={mealItemKey}
        itemState={props.mealState.mealItems[mealItemKey]}
        edit={props.edit}
        setMealState={props.setMealState}
        mealId={props.mealState.mealId}
        dayId={props.dayId}
        tripId={props.tripId}
      ></MealItem>
    );
  }
  return (
    <div className={"mealCard"}>
      {props.edit === "edit" ? (
        <input
          className="meal-card-title"
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

      <table>
        <tbody className="meal-table">
          <tr className="meal-table-titles">
            <th className="meal-item-title">Items</th>
            <th className="meal-quantity-title">Quantity</th>
          </tr>
          {mealItemArray}
          <tr className="meal-table-items">
            <td>
              {props.edit === "edit" && (
                <input
                  className="meal-card-new-item"
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
                  className="meal-card-new-quantity"
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
            <button className="meal-card-add-save">Add Item</button>
          </form>

          <button
            className="meal-card-add-save"
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
