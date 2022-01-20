import React from "react";
import "../../component-styles/MealCard.scss";
import MealItem from "./MealItem";
import { useState } from "react";


const MealCard = (props) => {
  const mealItemArray = [];
  const [newItemState, setNewItemState] = useState({
    name: "",
    quantity: "",
  });
  for (const mealItemKey in props.mealState.mealItems) {
    mealItemArray.push(<MealItem key={mealItemKey} itemState={props.mealState.mealItems[mealItemKey]} setMealState={props.setMealState} mealId={props.mealState.mealId} dayId={props.dayId}></MealItem>)
  }
  return (
    <div className={"mealCard"}>
      <div className={"mealName"}><input
        className="equipment-card-title-input"
        value={props.mealState.mealName}
        onChange={(e) => {
          props.setMealState((prev) => {
            const newState = { ...prev };
            newState[props.dayId].meals[props.mealState.mealId] = { ...newState[props.dayId].meals[props.mealState.mealId], mealName: e.target.value }

            return newState;
          });
        }}
      ></input></div>
      <table>
        <tbody>
          <tr>
            <th className={"foodName"}>Item Name</th>
            <th>Quantity</th>
          </tr>
          {mealItemArray}
          <tr>
            <td>
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
            </td>
            <td>
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
            </td>
          </tr>
        </tbody>
      </table>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          props.setMealState((prev) => {
            console.log(prev);
            const newState = { ...prev };
            newState[props.dayId].meals[props.mealState.mealId].mealItems = {
              ...newState[props.dayId].meals[props.mealState.mealId].mealItems,
            };
            const newKey = -Object.keys(newState[props.dayId].meals[props.mealState.mealId].mealItems).length - 1;
            newState[props.dayId].meals[props.mealState.mealId].mealItems[newKey] = {
              mealItemName: newItemState.name,
              mealItemQuantity: newItemState.quantity,
              mealItemId: newKey,
            };
            console.log(newState)
            return newState;
          });
          setNewItemState({
            name: "",
            quantity: "",
          });
          // props.setEquipmentState((prev) => {
          //   const newState = { ...prev };
          //   const newKey =
          //     -Object.keys(newState[props.categoryId].items).length - 1;
          //   newState[props.categoryId].items[newKey] = {
          //     gearName: newItemState.name,
          //     quantity: newItemState.quantity,
          //     itemId: newKey,
          //   };
          //   return newState;
          // });
          // setNewItemState({
          //   name: "",
          //   quantity: "",
          // });
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
          // updateEquipmentCard(
          //   props.trip_id,
          //   Number(props.categoryId),
          //   props.categoryName,
          //   props.categoryItems
          // ).then(() => {
          //   getMealsForTrip(props.trip_id).then((res) => {
          //     props.setState(formatTripMealsData(res.data));
          //   });
          // });
        }}
      >
        Save Card
      </button>
    </div>
  );
};

export default MealCard;
