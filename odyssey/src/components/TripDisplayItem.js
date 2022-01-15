import "leaflet/dist/leaflet.css";
import "./component-styles/TripDisplayItem.scss";
import { generateMarkers } from "../Helpers/markerHelpers";
import { themeAttributionFinder, themeURLFinder } from "../Helpers/mapHelper";

import MapDisplay from "./MapComponents/MapDisplay";
function TripDisplayItem(props) {
  let markers = <></>;

  if (props.markers) {
    markers = generateMarkers(props.markers);
  }

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
          <b>Trip Title</b>
        </h1>
        <p>
          Trip Description: alsdkfjlaksdf asdif asdif aisd fidkle id kei
          dkllelalsdkfjlaksdf asdif asdif aisd fidkle id kei dkllelalsdkfjlaksdf
          asdif asdif aisd fidkle id kei dkllelalsdkfjlaksdf asdif asdif aisd
          fidkle id kei dkllelalsdkfjlaksdf asdif asdif aisd fidkle id kei
          dkllelalsdkfjlaksdf asdif asdif aisd fidkle id kei dkllelalsdkfjlaksdf
          asdif asdif aisd fidkle id kei dkllelalsdkfjlaksdf asdif asdif aisd
          fidkle id kei dkllel
        </p>
        <p>Created By: First Last</p>
      </div>
    </div>
  );
}

export default TripDisplayItem;
