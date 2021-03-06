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
    if (dataPoint.stops_id) {
      formatedTripData[dataPoint.trip_id]["markers"].push({
        type: dataPoint.stop_types,
        lat: dataPoint.stops_lat,
        long: dataPoint.stops_long,
        name: dataPoint.stop_name,
        date: dataPoint.stop_day,
        mapId: dataPoint.routes_id,
        stopId: dataPoint.stops_id,
        tripId: dataPoint.trip_id,
        description: dataPoint.stop_description,
      });
    }
    if (!formatedTripData[dataPoint.trip_id]["maps"]) {
      formatedTripData[dataPoint.trip_id]["maps"] = {
        lat: dataPoint.routes_lat,
        long: dataPoint.routes_long,
        mapId: dataPoint.routes_id,
        zoom: dataPoint.routes_zoom,
        theme: dataPoint.routes_theme,
      };
    }
    if (!formatedTripData[dataPoint.trip_id]["users"]) {
      formatedTripData[dataPoint.trip_id]["users"] = {
        firstName: dataPoint.first_name,
        LastName: dataPoint.last_name,
      };
    }
    formatedTripData[dataPoint.trip_id].startDate = dataPoint.trip_start;
    formatedTripData[dataPoint.trip_id].endDate = dataPoint.trip_end;
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
    if (!formattedMealData[mealRow.days_id]["tripId"]) {
      formattedMealData[mealRow.days_id]["tripId"] = mealRow.trip_id;
    }
    if (!formattedMealData[mealRow.days_id]["date"]) {
      formattedMealData[mealRow.days_id]["date"] = mealRow.days_date;
    }
    if (!formattedMealData[mealRow.days_id]["meals"]) {
      formattedMealData[mealRow.days_id]["meals"] = {};
    }

    if (mealRow.meals_id) {
      if (!formattedMealData[mealRow.days_id]["meals"][mealRow.meals_id] && mealRow.meals_id) {
        formattedMealData[mealRow.days_id]["meals"][mealRow.meals_id] = {}
      }

      formattedMealData[mealRow.days_id]["meals"][mealRow.meals_id]["mealId"] = mealRow.meals_id
      formattedMealData[mealRow.days_id]["meals"][mealRow.meals_id]["mealName"] = mealRow.meal

      if (!formattedMealData[mealRow.days_id]["meals"][mealRow.meals_id]["mealItems"]) {
        formattedMealData[mealRow.days_id]["meals"][mealRow.meals_id]["mealItems"] = {}
      }


      if (mealRow.meal_itemid) {
        if (!formattedMealData[mealRow.days_id]["meals"][mealRow.meals_id]["mealItems"][mealRow.meal_itemid]) {
          formattedMealData[mealRow.days_id]["meals"][mealRow.meals_id]["mealItems"][mealRow.meal_itemid] = {};
        }
        formattedMealData[mealRow.days_id]["meals"][mealRow.meals_id]["mealItems"][mealRow.meal_itemid]["mealItemName"] = mealRow.food_item;
        formattedMealData[mealRow.days_id]["meals"][mealRow.meals_id]["mealItems"][mealRow.meal_itemid]["mealItemQuantity"] = mealRow.quantity;
        formattedMealData[mealRow.days_id]["meals"][mealRow.meals_id]["mealItems"][mealRow.meal_itemid]["mealItemId"] = mealRow.meal_itemid;
      }
    }
  }

  return formattedMealData;
}

export function formatEmergencyData(contactArray) {
  const contact = contactArray[0];
  let formatedData = {};

  if (contact) {
    formatedData = {
      id: contact.id,
      trip_id: contact.trip_id,
      name: contact.name,
      phone_number: contact.phone_number,
      email: contact.email,
      send_date: contact.send_date.slice(0, 10),
      send_time: contact.send_time,
    };
  } else {
    formatedData.id = "";
    formatedData.name = "";
    formatedData.phone_number = "";
    formatedData.email = "";
    formatedData.send_date = "";
    formatedData.send_time = "";
  }

  return formatedData;
}
