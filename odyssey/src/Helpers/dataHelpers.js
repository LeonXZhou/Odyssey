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
      formatedTripData[dataPoint.trip_id]["description"] = dataPoint.description;
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
  for (const data in formatedTripData)
  {
    formatedTripData[data]["trip_id"] = data;
    formatedTripDataArray.push(formatedTripData[data])
  }
  return formatedTripDataArray
}


export function formatTripEquipmentData(allTripData) {
  const formatedData = {};
  const formatedDataArray =[];
  for (const dataPoint of allTripData) {
    if (!formatedData[dataPoint.catergory]) {
      formatedData[dataPoint.catergory] = {};
    }
    if (!formatedData[dataPoint.catergory]["tripID"]) {
      formatedData[dataPoint.catergory]["tripID"] = dataPoint.id;
    }
    if (!formatedData[dataPoint.catergory]["items"]) {
      formatedData[dataPoint.catergory]["items"] = [];
    }
    formatedData[dataPoint.catergory]["items"].push({
      type: dataPoint.catergory,
      gearName: dataPoint.gear_item,
    });
  }
  for (const data in formatedData)
  {
    formatedData[data]["category"] = data;
    formatedDataArray.push(formatedData[data])
  }
  return formatedDataArray;
}

