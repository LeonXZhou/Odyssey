import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { latLng } from "leaflet";

import MapEditor from "./components/MapComponents/MapEditor.js";
import MapDisplay from "./components/MapComponents/MapDisplay";
import TripDisplayItem from "./components/TripDisplayItem";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Planning from "./components/planning/Planning";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      {/* <h1>always here</h1>
      <Link to="/">home</Link>
      <br />
      <Link to="/map-display">map-display</Link>
      <br />
      <Link to="/map-editor">map-editor</Link>
      <br />
      <Link to="/tripDisplayCard">tripDisplayCard</Link> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/planning/view/:trip_id" element={<Planning page="route" edit={"view"}/>} />
        <Route path="/planning/equipment/view/:trip_id" element={<Planning page="equipment" edit={"view"} />}/>

        <Route path="/login" element={<Login/>}/>
        <Route path="/Register" element={<Register/>}/>

        <Route path="/planning" element={<Planning page="route" />} />
        <Route path="/planning/route" element={<Planning page="route" />} />
        <Route
          path="/planning/equipment"
          element={<Planning page="equipment" />}
        />
        <Route path="/planning/meals" element={<Planning page="meals" />} />
        <Route
          path="/planning/emergency"
          element={<Planning page="emergency" />}
        />
        <Route
          path="/map-editor"
          element={
            <MapEditor
              //same map options as Mapdisplay
              mapOptions={{
                zoom: 5,
                center: [51.505, -0.09],
                //route_id: we can pass in the id from the db later so we can make axios requests to the right map
              }}
              markers={[]}
            ></MapEditor>
          }
        />

        <Route
          path="/map-display"
          element={
            <MapDisplay
              //the MapDisplay component can accept an options prop. which will determine how it is rendered
              mapOptions={{
                zoom: 10,
                center: [49.246292, -123.116226],
                themeAttribution: "TOPO", //needed for theme: converted to url by helper functions in mapHelpers.js
                themeURL: "TOPO", //needed for theme: converted to url by helper functions in mapHelpers.js
                //route_id: we can pass in the id from the db later
              }}
              //the markers prop is an array of "marker" objects that will tell MapDisplay where to draw markers
              //these are not leaflet markers, just our custom objects which represent marker information
              //this would eventually be populated by a get request to our server/db
              markers={[
                { position: [49.246292, -123.116226], iconSize: [40, 40] },
                {
                  position: [49.286292, -123.136226],
                  icon: "TENT",
                  iconSize: [20, 20],
                }, //icon string is converted to actual url like the theme strings
                {
                  position: [49.346292, -123.166226],
                  icon: "TENT",
                  iconSize: [20, 20],
                  popUp: { name: "First Night", description: "I <3 Camping" },
                },
              ]}
            ></MapDisplay>
          }
        />

        <Route
          path="/tripDisplayCard"
          element={
            <TripDisplayItem
              mapOptions={{
                zoom: 10,
                center: [49.246292, -123.116226],
                themeAttribution: "TOPO",
                themeURL: "TOPO",
              }}
              markers={[
                { position: [49.246292, -123.116226], iconSize: [40, 40] },
                {
                  position: [49.286292, -123.136226],
                  icon: "TENT",
                  iconSize: [20, 20],
                },
                {
                  position: [49.346292, -123.166226],
                  icon: "TENT",
                  iconSize: [20, 20],
                  popUp: { name: "First Night", description: "I <3 Camping" },
                },
              ]}
            ></TripDisplayItem>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
