import React from "react";
import "../../component-styles/MealItem.scss";

const MealItem = (props) => {
  return (
    <tr>
      <td>
        {props.edit === "edit" ? (
          <input
            contentEditable="true"
            className="mealQuantity"
            type={"text"}
            value={props.itemState.mealItemQuantity}
            // onChange={(e) => {
            //   props.setState((prev) => {
            //     const newState = { ...prev };
            //     newState[props.categoryId].items = {
            //       ...newState[props.categoryId].items,
            //     };
            //     newState[props.categoryId].items[props.itemId].gearName =
            //       e.target.value;
            //     // newState = { ...prev };
            //     return newState;
            //   });
            // }}
          />
        ) : (
          <p1>{props.itemState.mealItemQuantity}</p1>
        )}
      </td>
      <td>
        {props.edit === "edit" ? (
          <input
            contentEditable="true"
            className="mealItem"
            type={"text"}
            value={props.itemState.mealItemName}
            // onChange={(e) => {
            //   props.setState((prev) => {
            //     const newState = { ...prev };
            //     newState[props.categoryId].items = {
            //       ...newState[props.categoryId].items,
            //     };
            //     newState[props.categoryId].items[props.itemId].gearName =
            //       e.target.value;
            //     // newState = { ...prev };
            //     return newState;
            //   });
            // }}
          />
        ) : (
          <p1>{props.itemState.mealItemName}</p1>
        )}
      </td>
      <td>{props.edit === "edit" && <button>x</button>}</td>
    </tr>
  );
};

export default MealItem;
