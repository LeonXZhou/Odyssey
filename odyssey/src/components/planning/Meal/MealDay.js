import React from "react";
import "../../component-styles/MealDay.scss";
import MealCard from "./MealCard";

const MealDay = (props) => {
  return (
    <div className={"mealDay"}>
      <div>Day 1</div>
      <MealCard></MealCard>
      <MealCard></MealCard>
    </div>);
};

export default MealDay;
