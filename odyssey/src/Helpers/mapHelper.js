//maps themeAttribution string
export function themeAttributionFinder(themeString) {
  switch (themeString) {
    case "TOPO":
      return 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    default:
      return '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }
}

//maps themeURL String
export function themeURLFinder(themeString) {
  switch (themeString) {
    case "TOPO":
      return 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png'
    default:
      return 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'

  }
}

// paseDBinput {lat: number, long number}
export function parseDBMap(tripMaps) {
  return { center: [tripMaps.lat, tripMaps.long], mapId: tripMaps.mapId, zoom: tripMaps.zoom, themeAttribution: tripMaps.theme, themeURL: tripMaps.theme }
}
// parseDBMap options
// mapOptions={
//   zoom: 10, OPTIONAL
//   center: [49.246292, -123.116226], NEEDED
//   themeAttribution: "TOPO", OPTIONAL
//   themeURL: "TOPO", OPTIONAL
//   //route_id: we can pass in the id from the db later
// }


// parseDBinput [{type:"string",lat: number, long number}]
export function parseDBMarkers(tripMarkers) {
  if (tripMarkers.length < 1) {
    return [];
  }
  return tripMarkers.map((serverMarker) => {
    return {
      position: [serverMarker.lat, serverMarker.long],
      icon: serverMarker.type,
      popUp: {
        name: serverMarker.name,
        description: serverMarker.description,
        date: serverMarker.date,
      },
      mapId: serverMarker.mapId,
      stopId: serverMarker.stopId,
      tripId: serverMarker.tripId,
      type: serverMarker.type
    }
  })
}
// parseDBoutput
// markers=[
//   { position: [49.246292, -123.116226], iconSize: [40, 40] },
//   {
//     position: [49.286292, -123.136226],
//     icon: "TENT",
//     iconSize: [20, 20],
//   }, //icon string is converted to actual url like the theme strings
//   {
//     position: [49.346292, -123.166226],
//     icon: "TENT",
//     iconSize: [20, 20],
//     popUp: { name: "First Night", description: "I <3 Camping" },
//   },
// }
