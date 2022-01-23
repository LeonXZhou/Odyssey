import "leaflet/dist/leaflet.css";
import "./component-styles/TripDisplayItem.scss";
import { themeAttributionFinder, themeURLFinder } from "../Helpers/mapHelper";
import { Link } from "react-router-dom";
import MapDisplay from "./MapComponents/MapDisplay";
function TripDisplayItemLink(props) {
  //Defaulting Map Theme
  const mapThemeAttribution =
    props.mapOptions &&
    themeAttributionFinder(props.mapOptions.themeAttribution);
  const mapThemeURL =
    props.mapOptions && themeURLFinder(props.mapOptions.themeAttribution);

  return (
    <Link className={"tripDisplayCard"} to={`/planning/${props.edit}/${props.trip_id}`}>
      <MapDisplay
        mapOptions={{...props.mapOptions,scrollWheelZoom:false}}
        markers={props.markers}
      ></MapDisplay>
      <div className="descriptionContainer">
        <h1>
          <b>{props.name}</b>
        </h1>
        <p>{props.description}</p>
        <p>Created By: {props.username}</p>
      </div>
    </Link>
  );
}

export default TripDisplayItemLink;
