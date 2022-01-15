const allData = [
    {
      meals_id: 1,
      meal: "breakfast",
      meal_itemid: 2,
      food_item: "brocoli",
      quantity: "10 cups",
      days_date: "2022-01-08T07:00:00.000Z",
      days_id: 1,
    },
    {
      meals_id: 1,
      meal: "breakfast",
      meal_itemid: 1,
      food_item: "brocoli",
      quantity: "10 cups",
      days_date: "2022-01-08T07:00:00.000Z",
      days_id: 1,
    },
    {
      meals_id: 2,
      meal: "lunch",
      meal_itemid: 3,
      food_item: "brocoli",
      quantity: "10 cups",
      days_date: "2022-01-08T07:00:00.000Z",
      days_id: 1,
    },
    {
      meals_id: 3,
      meal: "dinner",
      meal_itemid: 4,
      food_item: "brocoli",
      quantity: "10 cups",
      days_date: "2022-01-08T07:00:00.000Z",
      days_id: 1,
    },
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
          mealsItems : {itemid: dataPoint.meal_itemid , itemName: dataPoint.food_item, quantity : dataPoint.quantity}
          
        });
      
    console.log(formatedData[dataPoint.days_id]["meals"]);
  }
  console.log(formatedData[dataPoint.days_id]["meals"]);
  return formatedData
  
  // { day: day_id , meals: [{meal_name  : meal_name ,meal.id , meal_items: [{meals_itemname: meal_items.name, meal_items.id mealsquantity: meal_items.quantity}]}]}
  