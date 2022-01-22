import React from "react";
import "../../component-styles/MealDay.scss";
import MealCard from "./MealCard";
import AddButton from "../AddButton";
import { newMealOnDay } from "../../../Helpers/apiHelpers";

const MealDay = (props) => {
  const date = new Date(props.mealDayState.date);
  const mealArray = [];
  console.log(props.mealDayState);
  for (const mealKey in props.mealDayState.meals) {
    mealArray.push(
      <MealCard
        key={mealKey}
        mealState={props.mealDayState.meals[mealKey]}
        edit={props.edit}
        setMealState={props.setMealState}
        dayId={props.mealDayState.dayId}
      ></MealCard>
    );
  }

  return (
    <div className={"days"}>
      <div className="days-date">{date.toDateString()}</div>
      <div className="day-meals">
        {mealArray}
        {props.edit === "edit" && (
          <AddButton
            addButtonType={"Meal"}
            day_id={props.mealDayState.dayId}
            onSubmit={newMealOnDay}
            setState={props.setMealState}
          />
        )}
      </div>
    </div>
  );
};

export default MealDay;
