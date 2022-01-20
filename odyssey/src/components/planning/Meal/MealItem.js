import React from "react";
import "../../component-styles/MealItem.scss";

const MealItem = (props) => {
  return (
    <tr>
      <td>
        <input
          contentEditable="true"
          className="equipment-card-items"
          type={"text"}
          value={props.itemState.mealItemName}
          onChange={(e) => {
            props.setMealState((prev) => {
              console.log(prev);
              const newState = { ...prev };
              newState[props.dayId].mealItems = {
                ...newState[props.dayId].mealItems,
              };
              newState[props.dayId].meals[props.mealId].mealItems[props.itemState.mealItemId] = { ...newState[props.dayId].meals[props.mealId].mealItems[props.itemState.mealItemId], mealItemName: e.target.value }
              return newState;
            });
          }}
        />
      </td>
      <td>
        <input
          contentEditable="true"
          className="equipment-card-items"
          type={"text"}
          value={props.itemState.mealItemQuantity}
          onChange={(e) => {
            props.setMealState((prev) => {
              console.log(prev);
              const newState = { ...prev };
              newState[props.dayId].mealItems = {
                ...newState[props.dayId].mealItems,
              };
              newState[props.dayId].meals[props.mealId].mealItems[props.itemState.mealItemId] = { ...newState[props.dayId].meals[props.mealId].mealItems[props.itemState.mealItemId], mealItemQuantity: e.target.value }
              return newState;
            });
          }}
        />
      </td>
      <td><button>x</button></td>
    </tr>
  );
};

export default MealItem;
