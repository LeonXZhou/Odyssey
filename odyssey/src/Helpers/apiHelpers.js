import axios from "axios";

export function getTrips() {
  return axios.get("/api/trips");
}

export function getMapForTrip(trip_id) {
  return axios.get(`/api/trips/${trip_id}`);
}

//Meal API START
//Meal API START
//Meal API START
//Meal API START
export function getMealsForTrip(trip_id){
  return axios.get(`/api/meals/${trip_id}`)
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

export function sqlizeItems(items) {
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
  const { newItems, updatedItems } = sqlizeItems(category_items);
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

export function authenticate() {
  return axios.get(`/authenticate`);
}

export function insertNewTrip(user_id, name, startDate, endDate) {
  return axios.post("/api/trips", {
    user_id: user_id,
    name: name,
    startDate: startDate,
    endDate: endDate,
  });
}

//EQUIPMENT API END
//EQUIPMENT API END
//EQUIPMENT API END
//EQUIPMENT API END
