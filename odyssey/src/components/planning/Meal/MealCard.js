import React from "react";
import "../../component-styles/MealCard.scss";
import MealItem from "./MealItem";
// import getMealsForTrip from "../../../Helpers/apiHelpers"
// import formatTripMealsData from ""


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
      <button className="btn btn-default btn-sm equipment-card-button">
        Add Item
      </button>
      <button
        className="btn btn-default btn-sm equipment-card-button"
        onClick={(e) => {
          e.preventDefault();
          // updateEquipmentCard(
          //   props.trip_id,
          //   Number(props.categoryId),
          //   props.categoryName,
          //   props.categoryItems
          // ).then(() => {
          //   getMealsForTrip(props.trip_id).then((res) => {
          //     props.setState(formatTripEquipmentData(res.data));
          //   });
          // });
        }}
      >
        Save Card
      </button>
    </div>
  );
};

export default MealCard;
