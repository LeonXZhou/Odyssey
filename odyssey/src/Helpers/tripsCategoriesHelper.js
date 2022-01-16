export function formatTripCategoriesData(allTripData) {
  const formatedData = {};
  for (const dataPoint of allTripData) {
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
      gearName: dataPoint.gear_item,
    });
  }
}
