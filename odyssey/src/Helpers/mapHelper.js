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


// mapOptions={
//   zoom: 10,
//   center: [49.246292, -123.116226],
//   themeAttribution: "TOPO", //needed for theme: converted to url by helper functions in mapHelpers.js
//   themeURL: "TOPO", //needed for theme: converted to url by helper functions in mapHelpers.js
//   //route_id: we can pass in the id from the db later
// }
export function parseDBMap(tripMaps) {
  return { center: [tripMaps.lat, tripMaps.long] }
}


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
export function parseDBMarkers(tripMarkers) {
  return tripMarkers.map((serverMarker) => { return { position: [serverMarker.lat, serverMarker.long], icon: serverMarker.type } })
}
