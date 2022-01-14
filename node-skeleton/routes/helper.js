const allData = [
  {
    user_id: 2,
    first_name: "Kira",
    last_name: "Dunn",
    email: "kiradunn@gmail.com",
    trip_id: 2,
    trips_name: "Big Hike",
    description: "Big hike up mountain",
    stops_id: 4,
    stop_days: "2021-11-07T06:00:00.000Z",
    stop_names: "Start of Trip",
    stop_types: "Start",
    stops_lat: "49.444392774925090",
    stops_long: "-123.112021401587400",
    routes_id: 2,
    routes_lat: "49.394299484055080",
    routes_long: "-123.144883520974550",
    trip_start: "2021-11-07T06:00:00.000Z",
    trip_end: "2021-11-09T07:00:00.000Z",
  },
  {
    user_id: 1,
    first_name: "Alice",
    last_name: "Smith",
    email: "alicesmith@gmail.com",
    trip_id: 1,
    trips_name: "Small Hike",
    description: "Small hike up mountain",
    stops_id: 1,
    stop_days: "2022-01-03T07:00:00.000Z",
    stop_names: "Start of Trip",
    stop_types: "Start",
    stops_lat: "49.349587174838480",
    stops_long: "-122.969046657869810",
    routes_id: 1,
    routes_lat: "49.320443228352566",
    routes_long: "-123.027884538143200",
    trip_start: "2022-01-03T07:00:00.000Z",
    trip_end: "2022-01-04T07:00:00.000Z",
  },
  {
    user_id: 2,
    first_name: "Kira",
    last_name: "Dunn",
    email: "kiradunn@gmail.com",
    trip_id: 2,
    trips_name: "Big Hike",
    description: "Big hike up mountain",
    stops_id: 5,
    stop_days: "2021-11-07T06:00:00.000Z",
    stop_names: "End of Day 1",
    stop_types: "End of Day",
    stops_lat: "49.488700216100220",
    stops_long: "-123.120359550989390",
    routes_id: 2,
    routes_lat: "49.394299484055080",
    routes_long: "-123.144883520974550",
    trip_start: "2021-11-07T06:00:00.000Z",
    trip_end: "2021-11-09T07:00:00.000Z",
  },
  {
    user_id: 1,
    first_name: "Alice",
    last_name: "Smith",
    email: "alicesmith@gmail.com",
    trip_id: 1,
    trips_name: "Small Hike",
    description: "Small hike up mountain",
    stops_id: 2,
    stop_days: "2021-11-03T06:00:00.000Z",
    stop_names: "End of Day 1",
    stop_types: "End of Day",
    stops_lat: "49.407705247021720",
    stops_long: "-123.139978726987450",
    routes_id: 1,
    routes_lat: "49.320443228352566",
    routes_long: "-123.027884538143200",
    trip_start: "2022-01-03T07:00:00.000Z",
    trip_end: "2022-01-04T07:00:00.000Z",
  },
  {
    user_id: 2,
    first_name: "Kira",
    last_name: "Dunn",
    email: "kiradunn@gmail.com",
    trip_id: 2,
    trips_name: "Big Hike",
    description: "Big hike up mountain",
    stops_id: 6,
    stop_days: "2021-11-08T07:00:00.000Z",
    stop_names: "End of Day 2",
    stop_types: "End of Day",
    stops_lat: "49.525167977322190",
    stops_long: "-123.052918634246910",
    routes_id: 2,
    routes_lat: "49.394299484055080",
    routes_long: "-123.144883520974550",
    trip_start: "2021-11-07T06:00:00.000Z",
    trip_end: "2021-11-09T07:00:00.000Z",
  },
  {
    user_id: 2,
    first_name: "Kira",
    last_name: "Dunn",
    email: "kiradunn@gmail.com",
    trip_id: 2,
    trips_name: "Big Hike",
    description: "Big hike up mountain",
    stops_id: 7,
    stop_days: "2021-11-09T07:00:00.000Z",
    stop_names: "End of Trip",
    stop_types: "End",
    stops_lat: "49.561290417055890",
    stops_long: "-122.935203579401320",
    routes_id: 2,
    routes_lat: "49.394299484055080",
    routes_long: "-123.144883520974550",
    trip_start: "2021-11-07T06:00:00.000Z",
    trip_end: "2021-11-09T07:00:00.000Z",
  },
  {
    user_id: 1,
    first_name: "Alice",
    last_name: "Smith",
    email: "alicesmith@gmail.com",
    trip_id: 1,
    trips_name: "Small Hike",
    description: "Small hike up mountain",
    stops_id: 3,
    stop_days: "2022-01-04T07:00:00.000Z",
    stop_names: "End of Trip",
    stop_types: "End",
    stops_lat: "49.366039645624376",
    stops_long: "-122.946239366188540",
    routes_id: 1,
    routes_lat: "49.320443228352566",
    routes_long: "-123.027884538143200",
    trip_start: "2022-01-03T07:00:00.000Z",
    trip_end: "2022-01-04T07:00:00.000Z",
  },
];
const formatedData = {};
for (dataPoint of allData) {
  if (!formatedData[dataPoint.trip_id]) {
   
    formatedData[dataPoint.trip_id] = {};
  }

  if (!formatedData[dataPoint.trip_id]["title"]) {

    formatedData[dataPoint.trip_id]["title"] = dataPoint.trips_name
  }
  if (!formatedData[dataPoint.trip_id]["description"]) {

    formatedData[dataPoint.trip_id]["description"] = dataPoint.description
  }
  if (!formatedData[dataPoint.trip_id]["markers"]) {

    formatedData[dataPoint.trip_id]["markers"] = []
  }
  formatedData[dataPoint.trip_id]["markers"].push({type: dataPoint.stop_types, lat: dataPoint.stops_lat , long: dataPoint.stops_long})
  if (!formatedData[dataPoint.trip_id]["maps"]) {

    formatedData[dataPoint.trip_id]["maps"] = {lat : dataPoint.routes_lat, long:dataPoint.routes_long}
  }
  if (!formatedData[dataPoint.trip_id]["users"]) {

    formatedData[dataPoint.trip_id]["users"] = {firstName : dataPoint.first_name, LastName:dataPoint.last_name}
  }

}
console.log(formatedData);

