import React from "react";
import "../../component-styles/MealItem.scss";

const MealItem = (props) => {
  return (
    <tr>
      <td>{props.itemState.mealItemQuantity}</td>
      <td>{props.itemState.mealItemName}</td>
      <td><button>x</button></td>
    </tr>
  );
};

export default MealItem;
