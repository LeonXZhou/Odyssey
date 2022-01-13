//maps icon string to icon url
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";

export function iconFinder(iconString) {
  switch (iconString) {
    case "DEFAULT":
      return "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png"

    case "TENT":
      return "https://www.pngfind.com/pngs/m/80-807696_png-file-svg-camping-tent-svg-transparent-png.png"
  }
}

export function generateMarkers(markers, markersState, setMarkers, markerEvents) {
  const markersJSX = markers.map((marker, i) => {
    //setting default options for markers
    const markerWidth = marker.iconSize ? marker.iconSize[0] : 20;
    const markerHeight = marker.iconSize ? marker.iconSize[1] : 20;
    const icon = marker.icon ? marker.icon : "DEFAULT";
    const markerPosition = marker.position ? marker.position : [0, 0];
    // const iconAnchor = [markerWidth/2, markerHeight];

    return (
      <Marker
        position={markerPosition}
        icon={
          new L.Icon({
            iconUrl: iconFinder(icon),
            iconSize: new L.Point(markerWidth, markerHeight),
            className: 'leaflet-div-icon',
            // iconAnchor: iconAnchor
          })}
        key={i}
        // eventHandlers={{
        //   click: (e) => {
        //     console.log('marker clicked', e);
        //   },
        // }}
      >

        {marker.popUp ? <Popup>
          <h1>{marker.popUp.name}</h1>
          <p>{marker.popUp.description}</p>
        </Popup> : <></>}
      </Marker>)
  })
  return markersJSX

}