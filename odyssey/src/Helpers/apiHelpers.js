import axios from "axios";

export function getTrips() {
  return axios.get("/api/trips");
}

export function getMapForTrip(trip_id) {
  return axios.get(`/api/trips/${trip_id}`);
}

export function getEquipmentForTrip(trip_id) {
  return axios.get(`/api/equipment/${trip_id}`);
}

// export function sqlizeEquipmentState(equipmentState) {
//   const newCategories = {};
//   const updatedCategories = {};
//   const newItems = {};
//   const updatedItems = {};
//   for (const categoryKey in equipmentState) {
//     let newCategoryIndex = 0;
//     let updatedCategoriesIndex = 0;
//     let newItemsIndex = 0;
//     let updatedItemsIndex = 0;
//     if (Number(categoryKey) < 0) {
//       const categoryName = equipmentState[categoryKey].category;
//       const trip_id = equipmentState[categoryKey].tripID;
//       newCategories[newCategoryIndex] = {};
//       newCategories[newCategoryIndex]["name"] = categoryName;
//       newCategories[newCategoryIndex]["trip_id"] = trip_id;
//       newCategoryIndex++;
//     }
//     if (Number(categoryKey) >= 0) {
//       const categoryName = equipmentState[categoryKey].category;
//       const trip_id = equipmentState[categoryKey].tripID;
//       updatedCategories[updatedCategoriesIndex] = {};
//       updatedCategories[updatedCategoriesIndex]["name"] = categoryName;
//       updatedCategories[updatedCategoriesIndex]["trip_id"] = trip_id;
//       updatedCategoriesIndex++;
//     }
//     const items = equipmentState[categoryKey].items;
//     for (const itemKey in items) {
//       if (Number(itemKey) < 0) {
//         //gear_category_id
//         //name
//         //quantity
//         const gear_category_id =
//         updatedItemsIndex++;
//       }
//       if (Number(itemKey) >= 0) {
//         newItemsIndex++;
//       }
//     }
//   }
//   console.log(newCategories);
//   return { newCategories, updatedCategories, newItems, updatedItems };
// }
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
    trip_id: trip_id,
    name: name,
  });
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
