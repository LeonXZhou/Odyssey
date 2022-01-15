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

