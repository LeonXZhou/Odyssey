import React from "react";
import "../../component-styles/MealItem.scss";
import { useState, useEffect } from "react";

import { formatTripMealsData } from "../../../Helpers/dataHelpers";
import {
  getMealsForTrip,
  deleteMealItem,
  getNutrition,
} from "../../../Helpers/apiHelpers";

const SAVE = "SAVE";

const MealItem = (props) => {
  return (
    <>
      <tr>
        <td className={"delete"}>
          {props.edit === "edit" && (
            <button
              className="meal-item-delete"
              onClick={() => {
                props.setSaveState(SAVE);
                deleteMealItem(props.itemState.mealItemId).then(() => {
                  getMealsForTrip(props.tripId).then((res) => {
                    props.setMealState(formatTripMealsData(res.data));
                  });
                });
              }}
            >
              x
            </button>
          )}
        </td>
        <td>
          {props.edit === "edit" ? (
            <input
              contentEditable="true"
              className="meal-items"
              type={"text"}
              value={props.itemState.mealItemName}
              onBlur={(e) => console.log(e)}
              onChange={(e) => {
                props.setSaveState(SAVE);
                props.setMealState((prev) => {
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
            <p>{props.itemState.mealItemName}</p>
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
                props.setSaveState(SAVE);
                props.setMealState((prev) => {
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
            <p>{props.itemState.mealItemQuantity}</p>
          )}
        </td>
      </tr>
    </>
  );
};

export default MealItem;
