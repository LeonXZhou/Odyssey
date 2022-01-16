import React from "react";
import "../../component-styles/MealCard.scss";
import MealItem from "./MealItem";
const MealCard = (props) => {
  return (
    <div className={"mealCard"}>
      <div className={"mealName"}><h1>Mean Name</h1></div>
      <table>
        <tr>
          <th>Quantity</th>
          <th className={"foodName"}>Item Name</th>
          <th></th>
        </tr>
        <MealItem></MealItem>
        <MealItem></MealItem>
        <MealItem></MealItem>
        <MealItem></MealItem>
      </table>
    </div>
  );
};

export default MealCard;
