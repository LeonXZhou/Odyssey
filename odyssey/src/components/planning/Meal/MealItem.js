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
      </td>
      <td>
        <input
          contentEditable="true"
          className="equipment-card-items"
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
      </td>
      <td><button>x</button></td>
    </tr>
  );
};

export default MealItem;
