import "leaflet/dist/leaflet.css";
import "./component-styles/TripDisplayItem.scss";
import { themeAttributionFinder, themeURLFinder } from "../Helpers/mapHelper";

import MapDisplay from "./MapComponents/MapDisplay";
function TripDisplayItem(props) {

  //Defaulting Map Theme
  const mapThemeAttribution =
    props.mapOptions &&
    themeAttributionFinder(props.mapOptions.themeAttribution);
  const mapThemeURL =
    props.mapOptions && themeURLFinder(props.mapOptions.themeAttribution);

  return (
    <div className={"tripDisplayCard"}>
      <MapDisplay
        mapOptions={props.mapOptions}
        markers={props.markers}
      ></MapDisplay>
      <div className="descriptionContainer">
        <h1>
          <b>{props.name}</b>
        </h1>
        <p>{props.description}</p>
        <p>Created By: {props.username}</p>
      </div>
    </div>
  );
}

export default TripDisplayItem;
