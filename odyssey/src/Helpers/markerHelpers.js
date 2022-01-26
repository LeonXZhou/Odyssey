//maps icon string to icon url

export function iconFinder(iconString) {
  switch (iconString) {
    case "DEFAULT":
      return require("../components/images/markers/default.png");

    case "TENT":
      return require("../components/images/markers/tent.png");

    case "CAMPFIRE":
      return require("../components/images/markers/campfire.png");

    case "HIKER":
      return require("../components/images/markers/hiker.gif");

    case "BEAVER":
      return require("../components/images/markers/beaver.gif");

    default:
      return require("../components/images/markers/default.png");
  }
}

// export function generateMarkers(markers) {
//   const markersJSX = markers.map((marker, i) => {
//     //setting default options for markers
//     const markerWidth = marker.iconSize ? marker.iconSize[0] : 20;
//     const markerHeight = marker.iconSize ? marker.iconSize[1] : 20;
//     const icon = marker.icon ? marker.icon : "DEFAULT";
//     const markerPosition = marker.position ? marker.position : [0, 0];
//     // const iconAnchor = [markerWidth/2, markerHeight];
//     return (
//       <Marker
//         position={markerPosition}
//         icon={
//           new L.Icon({
//             iconUrl: iconFinder(icon),
//             iconSize: new L.Point(markerWidth, markerHeight),
//             className: "leaflet-div-icon",
//             // iconAnchor: iconAnchor
//           })
//         }
//         key={i}

//         we can pass an eventHandler prop to marker to attach listeners to it
//         eventHandlers={{
//           click: (e) => {
//             console.log('marker clicked', e.sourceTarget._popup);
//           },
//         }}
//       >
//         {marker.popUp ? (
//           <Popup>
//             {marker.popUp.content}
//           </Popup>
//         ) : (
//           <></>
//         )}
//       </Marker>
//     );
//   });
//   return markersJSX;
// }
