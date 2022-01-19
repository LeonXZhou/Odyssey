import React from "react";
import "../../component-styles/MealCard.scss";
import MealItem from "./MealItem";
const MealCard = (props) => {
  const mealItemArray =[];
  for (const mealItemKey in props.mealState.mealItems)
  {
    mealItemArray.push(<MealItem key={mealItemKey} itemState={props.mealState.mealItems[mealItemKey]}></MealItem>)
  }
  return (
    <div className={"mealCard"}>
      <div className={"mealName"}><h1>{props.mealState.mealName}</h1></div>
      <table>
        <tbody>
          <tr>
            <th>Quantity</th>
            <th className={"foodName"}>Item Name</th>
          </tr>
            {mealItemArray}
        </tbody>
      </table>
    </div>
  );
};

export default MealCard;
