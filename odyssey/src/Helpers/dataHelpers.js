export function formatTripData(allTripData) {
  const formatedTripData = {};
  const formatedTripDataArray = [];
  for (const dataPoint of allTripData) {
    if (!formatedTripData[dataPoint.trip_id]) {
      formatedTripData[dataPoint.trip_id] = {};
    }

    if (!formatedTripData[dataPoint.trip_id]["title"]) {
      formatedTripData[dataPoint.trip_id]["title"] = dataPoint.trips_name;
    }
    if (!formatedTripData[dataPoint.trip_id]["description"]) {
      formatedTripData[dataPoint.trip_id]["description"] =
        dataPoint.description;
    }
    if (!formatedTripData[dataPoint.trip_id]["markers"]) {
      formatedTripData[dataPoint.trip_id]["markers"] = [];
    }
    formatedTripData[dataPoint.trip_id]["markers"].push({
      type: dataPoint.stop_types,
      lat: dataPoint.stops_lat,
      long: dataPoint.stops_long,
    });
    if (!formatedTripData[dataPoint.trip_id]["maps"]) {
      formatedTripData[dataPoint.trip_id]["maps"] = {
        lat: dataPoint.routes_lat,
        long: dataPoint.routes_long,
      };
    }
    if (!formatedTripData[dataPoint.trip_id]["users"]) {
      formatedTripData[dataPoint.trip_id]["users"] = {
        firstName: dataPoint.first_name,
        LastName: dataPoint.last_name,
      };
    }
  }
  for (const data in formatedTripData) {
    formatedTripData[data]["trip_id"] = data;
    formatedTripDataArray.push(formatedTripData[data]);
  }
  return formatedTripDataArray;
}

export function formatTripEquipmentData(allTripData) {
  const formatedData = {};
  const formatedDataArray = [];
  for (const dataPoint of allTripData) {
    if (!formatedData[dataPoint.category_id]) {
      formatedData[dataPoint.category_id] = {};
    }
    if (!formatedData[dataPoint.category_id]["category"]) {
      formatedData[dataPoint.category_id]["category"] = dataPoint.catergory;
    }
    if (!formatedData[dataPoint.category_id]["tripID"]) {
      formatedData[dataPoint.category_id]["tripID"] = dataPoint.id;
    }
    if (!formatedData[dataPoint.category_id]["items"]) {
      formatedData[dataPoint.category_id]["items"] = {};
    }
    if (dataPoint.gear_item !== null) {
      formatedData[dataPoint.category_id]["items"][dataPoint.item_id] = {
        gearName: dataPoint.gear_item,
        quantity: dataPoint.quantity,
        itemId: dataPoint.item_id,
      };
    }
  }

  return formatedData;
}


export function formatTripMealsData(allMealData) {
  const formattedMealData = {};
  for (const mealRow of allMealData) {
    if (!formattedMealData[mealRow.days_id]) {
      formattedMealData[mealRow.days_id] = {};
    }
    if (!formattedMealData[mealRow.days_id]["dayId"]) {
      formattedMealData[mealRow.days_id]["dayId"] = mealRow.days_id;
    }
    if (!formattedMealData[mealRow.days_id]["date"]) {
      formattedMealData[mealRow.days_id]["date"] = mealRow.days_date;
    }
    if (!formattedMealData[mealRow.days_id]["meals"]) {
      formattedMealData[mealRow.days_id]["meals"] = {};
    }

    if (!formattedMealData[mealRow.days_id]["meals"][mealRow.meals_id]) {
      formattedMealData[mealRow.days_id]["meals"][mealRow.meals_id] = {}
    }

    formattedMealData[mealRow.days_id]["meals"][mealRow.meals_id]["mealId"] = mealRow.meals_id
    formattedMealData[mealRow.days_id]["meals"][mealRow.meals_id]["mealName"] = mealRow.meal

    if (!formattedMealData[mealRow.days_id]["meals"][mealRow.meals_id]["mealItems"]) {
      formattedMealData[mealRow.days_id]["meals"][mealRow.meals_id]["mealItems"] = {}
    }

    if (!formattedMealData[mealRow.days_id]["meals"][mealRow.meals_id]["mealItems"][mealRow.meal_itemid]) {
      formattedMealData[mealRow.days_id]["meals"][mealRow.meals_id]["mealItems"][mealRow.meal_itemid] = {};
    }

    if (mealRow.meal_itemid)
    {
      formattedMealData[mealRow.days_id]["meals"][mealRow.meals_id]["mealItems"][mealRow.meal_itemid]["mealItemName"] = mealRow.food_item;
      formattedMealData[mealRow.days_id]["meals"][mealRow.meals_id]["mealItems"][mealRow.meal_itemid]["mealItemQuantity"] = mealRow.quantity;
      formattedMealData[mealRow.days_id]["meals"][mealRow.meals_id]["mealItems"][mealRow.meal_itemid]["mealItemId"] = mealRow.meal_itemid;
    }
  }

  return formattedMealData
}

export function formatEmergencyData(userData) {
  const formatedData = {}
    if(!formatedData["user_info"]){
      formatedData["user_info"] = {
          first_name : user.first_name,
          last_name : user.last_name,
          trip_name : user.name,
          trip_description : user.description,
          trip_start_date : user.start_date,
          trip_end_date : user.end_date
      }
    }
    if(!formatedData["user_info"]["emergency_contact"]){

      formatedData["user_info"]["emergency_contact"] = {
          emergency_contact : user.emergency_contact,
          phone_number :user.emergency_contact_phone,
          email : user.emergency_contact_email,
          send_message_by : user.send_date
      }
    }
      return formatedData
}
