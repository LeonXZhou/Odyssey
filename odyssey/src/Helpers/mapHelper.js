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
