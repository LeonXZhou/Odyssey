import React from "react";
import "../../component-styles/MealDay.scss";
import MealCard from "./MealCard";
import AddButton from "../AddButton"

const MealDay = (props) => {
  const date = new Date(props.mealDayState.date)
  const mealArray = [];
  console.log(props.mealDayState)
  for (const mealKey in props.mealDayState.meals) {
    mealArray.push(<MealCard key={mealKey} mealState={props.mealDayState.meals[mealKey]}></MealCard>)
  }

  return (
    <div className={"mealDay"}>
      <div>{date.toDateString()}</div>
      {mealArray}
      <AddButton/>
    </div>);
};

export default MealDay;
