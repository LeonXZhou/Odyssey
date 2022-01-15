import React from "react";
import "../component-styles/MealCard.scss";

const MealCard = (props) => {
  return (
    <div className={"mealCard"}>
      <h1>Mean Name</h1>
      <div>
      <ul>
        <li>Coffee</li>
        <li>Tea</li>
        <li>Milk</li>
      </ul>
      </div>
    </div>
  );
};

export default MealCard;
