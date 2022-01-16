// { day: day_id , meals: [{meal_name  : meal_name ,meal.id , meal_items: [{meals_itemname: meal_items.name, meal_items.id mealsquantity: meal_items.quantity}]}]}
const allData = [
  { gear_item: "boots", catergory: "Apparel", id: 1, name: "Small Hike" },
  {
    gear_item: "climbing gear",
    catergory: "Apparel",
    id: 1,
    name: "Small Hike",
  },
  { gear_item: "gloves", catergory: "Apparel", id: 1, name: "Small Hike" },
];

    const formatedData = {};
    for (dataPoint of allData) {
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
  
   
// { tripid: trip_id , tripsName: trip_name,gear_categories.name: [{gearName  : gear_item.name }]}