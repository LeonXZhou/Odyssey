import React from "react";
import MealDay from "./MealDay";
import "../../component-styles/Meals.scss";

const Meals = (props) => {
  const mealDayArray = [];
  for (const dayKey in props.mealState) {
    mealDayArray.push(
      <MealDay
        setMealState={props.setMealState}
        key={dayKey}
        mealDayState={props.mealState[dayKey]}
        edit={props.edit}
      ></MealDay>
    );
  }
  return <main className="meal">{mealDayArray}</main>;
};

export default Meals;
