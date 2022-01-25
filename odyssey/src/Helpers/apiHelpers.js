import axios from "axios";

export function getTrips() {
  return axios.get("/api/trips");
}

export function getTripsByUser(user_id) {
  return axios.get(`/api/trips/user/${user_id}`);
}

//Map API Start
//Map API Start
//Map API Start
//Map API Start
export function getMapForTrip(trip_id) {
  return axios.get(`/api/trips/${trip_id}`);
}

export function updateMapById(map_id, lat, long, zoom) {
  console.log({ lat: lat, long: long, zoom: zoom });
  return axios.post(`/api/trips/map/${map_id}`, {
    lat: lat,
    long: long,
    zoom: zoom,
  });
}

export function updateMarkerById(
  marker_id,
  name,
  date,
  description,
  lat,
  lng,
  type
) {
  // console.log(marker_id,name,date,description,lat,lng);
  return axios.post(`/api/trips/stop/${marker_id}`, {
    name: name,
    date: date,
    description,
    lat,
    lng,
    type,
  });
}

export function addMarker(route_id, name, date, description, lat, lng, type) {
  return axios.post(`/api/trips/stop`, {
    route_id,
    name: name,
    date: date,
    description,
    lat,
    lng,
    type,
  });
}
export function deleteMarker(marker_id) {
  return axios.delete(`/api/trips/stop/${marker_id}`);
}
//Map API end
//Map API end
//Map API end
//Map API end

//Meal API START
//Meal API START
//Meal API START
//Meal API START
export function sqlizeMealItems(items) {
  const newItems = {};
  const updatedItems = {};
  let newItemsIndex = 0;
  for (const itemKey in items) {
    const item = items[itemKey];
    if (Number(itemKey) >= 0) {
      updatedItems[itemKey] = {
        name: item.mealItemName,
        quantity: item.mealItemQuantity,
        // item_id: itemKey,
      };
    }
    if (Number(itemKey) < 0) {
      newItems[newItemsIndex] = {
        name: item.mealItemName,
        quantity: item.mealItemQuantity,
      };
      newItemsIndex++;
    }
  }
  return { newItems, updatedItems };
}
export function getMealsForTrip(trip_id) {
  return axios.get(`/api/meals/${trip_id}`);
}

export function newMealOnDay(day_id, name) {
  return axios.post(`/api/meals/${day_id}/meals`, {
    name: name,
  });
}

export function updateMealCard(day_id, meal_id, meal_name, meal_items) {
  const { newItems, updatedItems } = sqlizeMealItems(meal_items);
  const postData = {
    meal_name: meal_name,
    updateItems: updatedItems,
    newItems: newItems,
  };
  return axios.post(`/api/meals/${day_id}/${meal_id}`, postData);
}

export function deleteMeal(meal_id) {
  return axios.delete(`/api/meals/${meal_id}`);
}

export function deleteMealItem(meal_item_id) {
  return axios.delete(`/api/meals/meal_items/${meal_item_id}`);
}

export function getNutrition(search) {
  console.log("API HELPERS");
  return axios.post(`/api/meals/nutrition/`, { search });
}
//Meal API END
//Meal API END
//Meal API END
//Meal API END

// Equipment API START
// Equipment API START
// Equipment API START
// Equipment API START
export function getEquipmentForTrip(trip_id) {
  return axios.get(`/api/equipment/${trip_id}`);
}

export function sqlizeGearItems(items) {
  const newItems = {};
  const updatedItems = {};
  let newItemsIndex = 0;
  for (const itemKey in items) {
    const item = items[itemKey];
    if (Number(itemKey) >= 0) {
      updatedItems[itemKey] = {
        name: item.gearName,
        quantity: item.quantity,
        // item_id: itemKey,
      };
    }
    if (Number(itemKey) < 0) {
      newItems[newItemsIndex] = {
        name: item.gearName,
        quantity: item.quantity,
      };
      newItemsIndex++;
    }
  }
  return { newItems, updatedItems };
}

export function updateEquipmentCard(
  trip_id,
  category_id,
  category_name,
  category_items
) {
  const { newItems, updatedItems } = sqlizeGearItems(category_items);
  const postData = {
    category: category_name,
    updateItems: updatedItems,
    newItems: newItems,
  };
  return axios.post(`/api/equipment/${trip_id}/${category_id}`, postData);
  // endpoint: /api/equipment/:trip_id/:category_id
  // req.body = {category:{name}, updatedItems{0:{name,quantity,itemId}} newItems={0:{name,quantity}}} items can have 0-N keys
  // equipmentCard = {category:{name,trip_id}, items{0:{item},1:{item}}}
}

export function updateEquipment(trip_id, equipmentState) {
  // console.log("this is equipment state", equipmentState);
  // sqlizeEquipmentState(equipmentState);
  return axios.post(`/api/equipment/${trip_id}`, equipmentState);
}

export function newCategory(trip_id, name) {
  // console.log({
  //   trip_id: trip_id,
  //   name: name,
  // });
  return axios.post(`/api/equipment/${trip_id}/category`, {
    name: name,
  });
}

export function deleteCategory(trip_id, category_id) {
  return axios.post(`/api/equipment/delete/${trip_id}/${category_id}`);
}

export function deleteCategoryItem(item_id) {
  return axios.post(`/api/equipment/delete/${item_id}`);
}
//EQUIPMENT API END
//EQUIPMENT API END
//EQUIPMENT API END
//EQUIPMENT API END

export function authenticate() {
  return axios.get(`/authenticate`);
}

//General Trip API Start
//General Trip API Start
//General Trip API Start
//General Trip API Start
export function getAboutForTrip(trip_id) {
  return axios.get("/api/trips/:trip_id");
}

export function insertNewTrip(user_id, name, startDate, endDate) {
  return axios.post("/api/trips", {
    user_id: user_id,
    name: name,
    startDate: startDate,
    endDate: endDate,
  });
}
//General Trip API End
//General Trip API End
//General Trip API End
//General Trip API End

//EQUIPMENT API END
//EQUIPMENT API END
//EQUIPMENT API END
//EQUIPMENT API END

export function emergencyContacts() {
  return axios.get(`/api/emergency-contact`);
}
//EMERGENCY API SART
//EMERGENCY API SART
//EMERGENCY API SART

// EMERGENCY CONTACT API START
// EMERGENCY CONTACT API START
// EMERGENCY CONTACT API START
export function getEmergencyContactByTripId(trip_id) {
  return axios.get(`/api/emergency-contact/${trip_id}`);
}

export function updateEmergencyContact(
  trip_id,
  contact_name,
  contact_phone_number,
  contact_email,
  contact_send_date,
  contact_send_time,
  contact_id
) {
  console.log("HIT");
  return axios.post(`/api/emergency-contact/${trip_id}/update_contact`, {
    name: contact_name,
    phone_number: contact_phone_number,
    email: contact_email,
    send_date: contact_send_date,
    send_time: contact_send_time,
    id: contact_id,
  });
}

export function deleteEmergencyContact(trip_id, id) {
  return axios.post(`/api/emergency-contact/${trip_id}/delete_contact`, {
    id: id,
  });
}

export function insertEmergencyContact(
  trip_id,
  contact_name,
  contact_phone_number,
  contact_email,
  contact_send_date,
  contact_send_time
) {
  return axios.post(`/api/emergency-contact/${trip_id}/new_contact`, {
    name: contact_name,
    phone_number: contact_phone_number,
    email: contact_email,
    send_date: contact_send_date,
    send_time: contact_send_time,
    message_sent: false,
  });
}

// EMERGENCY CONTACT API END
// EMERGENCY CONTACT API END
// EMERGENCY CONTACT API END

export function getWeather(lat, lng, startDate, endDate) {
  return axios.get(`/api/weather/${lat}/${lng}/${startDate}/${endDate}`);
}
// export function checkDbForMessage() {
//   return axios.post(`/api/helper`)

// }

// PRIVACY SETTING STARTS
// PRIVACY SETTING STARTS
// PRIVACY SETTING STARTS

export function getPrivacyForTrip(trip_id) {
  return axios.get(`/api/trips/privacy/${trip_id}`);
}

export function updatePrivacyForTrip(trip_id, privacy) {
  return axios.post(`/api/trips/privacy/${trip_id}`, { shared: privacy });
}

// PRIVACY SETTING ENDS
// PRIVACY SETTING ENDS
// PRIVACY SETTING ENDS
