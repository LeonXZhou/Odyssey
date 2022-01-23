import React from "react";
import "../../component-styles/MealItem.scss";

import { formatTripMealsData } from "../../../Helpers/dataHelpers";
import { getMealsForTrip, deleteMealItem } from "../../../Helpers/apiHelpers";
const MealItem = (props) => {
  return (
    <tr>
      <td>
        {props.edit === "edit" && (
          <button className="meal-item-delete"
            onClick={() => {
              deleteMealItem(props.itemState.mealItemId).then(() => {
                getMealsForTrip(props.tripId).then((res) => {
                  props.setMealState(formatTripMealsData(res.data));
                });
              });
            }}>x</button>
        )}
      </td>
      <td>
        {props.edit === "edit" ? (
          <input
            contentEditable="true"
            className="meal-items"
            type={"text"}
            value={props.itemState.mealItemName}
            onBlur={(e)=>console.log(e)}

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
