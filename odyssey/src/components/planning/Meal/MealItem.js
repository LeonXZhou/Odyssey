import React from "react";
import "../../component-styles/MealItem.scss";

const MealItem = (props) => {
  return (
    <tr>
      <td>
        {props.edit === "edit" && (
          <button className="meal-item-delete">x</button>
        )}
      </td>
      <td>
        {props.edit === "edit" ? (
          <input
            contentEditable="true"
            className="meal-items"
            type={"text"}
            value={props.itemState.mealItemName}
            onChange={(e) => {
              props.setMealState((prev) => {
                console.log(prev);
                const newState = { ...prev };
                newState[props.dayId].mealItems = {
                  ...newState[props.dayId].mealItems,
                };
                newState[props.dayId].meals[props.mealId].mealItems[
                  props.itemState.mealItemId
                ] = {
                  ...newState[props.dayId].meals[props.mealId].mealItems[
                    props.itemState.mealItemId
                  ],
                  mealItemName: e.target.value,
                };
                return newState;
              });
            }}
          />
        ) : (
          <p1>{props.itemState.mealItemName}</p1>
        )}
      </td>
      <td>
        {props.edit === "edit" ? (
          <input
            contentEditable="true"
            className="meal-quantities"
            type={"text"}
            value={props.itemState.mealItemQuantity}
            onChange={(e) => {
              props.setMealState((prev) => {
                console.log(prev);
                const newState = { ...prev };
                newState[props.dayId].mealItems = {
                  ...newState[props.dayId].mealItems,
                };
                newState[props.dayId].meals[props.mealId].mealItems[
                  props.itemState.mealItemId
                ] = {
                  ...newState[props.dayId].meals[props.mealId].mealItems[
                    props.itemState.mealItemId
                  ],
                  mealItemQuantity: e.target.value,
                };
                return newState;
              });
            }}
          />
        ) : (
          <p1>{props.itemState.mealItemQuantity}</p1>
        )}
      </td>
    </tr>
  );
};

export default MealItem;
