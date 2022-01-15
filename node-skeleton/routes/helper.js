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
    if (!formatedData[dataPoint.id]) {
        formatedData[dataPoint.id] = {};
      }
    if (!formatedData[dataPoint.id]["tripID"]) {
        formatedData[dataPoint.id]["tripID"] = dataPoint.id;
      }
    if (!formatedData[dataPoint.id]["tripName"]) {
        formatedData[dataPoint.id]["tripName"] = dataPoint.name;
      }
      if (!formatedData[dataPoint.id]["categories"]) {
        formatedData[dataPoint.id]["categories"] = [];
      }
       formatedData[dataPoint.id]["categories"].push({
          type: dataPoint.catergory,
          gearName: dataPoint.gear_item
        });


console.log(formatedData[dataPoint.id]["categories"]);

}
// { tripid: trip_id , tripsName: trip_name,gear_categories.name: [{gearName  : gear_item.name }]}