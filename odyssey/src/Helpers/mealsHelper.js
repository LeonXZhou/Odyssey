export function formatTripData(allTripData) {
  const formatedData = {};
  for (dataPoint of allTripData) {
    if (!formatedData[dataPoint.days_id]) {
      formatedData[dataPoint.days_id] = {};
    }
    if (!formatedData[dataPoint.days_id]["day"]) {
      formatedData[dataPoint.days_id]["day"] = dataPoint.days_id;
    }
    if (!formatedData[dataPoint.days_id]["meals"]) {
      formatedData[dataPoint.days_id]["meals"] = [];
    }
    formatedData[dataPoint.days_id]["meals"].push({
      mealID: dataPoint.meals_id,
      mealName: dataPoint.meal,
      mealsItems: {
        itemid: dataPoint.meal_itemid,
        itemName: dataPoint.food_item,
        quantity: dataPoint.quantity,
      },
    });
  }

  return formatedData;
}
// { day: day_id , meals: [{meal_name  : meal_name ,meal.id , meal_items: [{meals_itemname: meal_items.name, meal_items.id mealsquantity: meal_items.quantity}]}]}
