import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { latLng } from "leaflet";
import { useState, useEffect, useContext } from "react";

import { authContext } from "./components/providers/AuthenticationProvider";

import { authenticate } from "./Helpers/apiHelpers";

import MapEditor from "./components/MapComponents/MapEditor.js";
import MapDisplay from "./components/MapComponents/MapDisplay";
import TripDisplayItem from "./components/TripDisplayItem";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Planning from "./components/planning/Planning";
import Login from "./components/Login";
import Register from "./components/Register";
import LoginDev from "./components/LoginDev";
import MyTrips from "./components/MyTrips";
function App() {
  const [userEmail, setUserEmail] = useState();
  const { setAuth, setUser, user } = useContext(authContext);
  useEffect(() => {
    authenticate().then((res) => {
      if (res.data.userId) {
        setUser(res.data);
        setAuth(true);
      }
    });
  }, []);
  return (
    <BrowserRouter>
      <Navigation userEmail={userEmail} setUserEmail={setUserEmail} />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* start of planning view routes */}
        <Route
          path="/planning/view/:trip_id"
          element={<Planning page="route" edit={"view"} />}
        />

        <Route
          path="/planning/equipment/view/:trip_id"
          element={<Planning page="equipment" edit={"view"} />}
        />

        <Route
          path="/planning/meals/view/:trip_id"
          element={<Planning page="meals" edit={"view"} />}
        />
        {/* end of planning view routes */}

        {/* start of planning edit routes */}
        <Route
          path="/planning/edit/:trip_id"
          element={<Planning page="route" edit={"edit"} />}
        />

        <Route
          path="/planning/equipment/edit/:trip_id"
          element={<Planning page="equipment" edit={"edit"} />}
        />

        <Route
          path="/planning/meals/edit/:trip_id"
          element={<Planning page="meals" edit={"edit"} />}
        />
        {/* end of planning edit routes */}

        <Route path="/myTrips/:user_id" element={<MyTrips />} />

        <Route path="/login" element={<Login setUserEmail={setUserEmail} />} />
        <Route
          path="/login/dev"
          element={<LoginDev setUserEmail={setUserEmail} />}
        />
        <Route
          path="/Register"
          element={<Register setUserEmail={setUserEmail} />}
        />

        {/* START OF PLANNING ROUTES */}
        <Route path="/planning/:trip_id" element={<Planning page="route" />} />
        <Route path="/planning/route" element={<Planning page="route" />} />
        <Route
          path="/planning/equipment/:trip_id"
          element={<Planning page="equipment" />}
        />
        <Route
          path="/planning/meals/:trip_id"
          element={<Planning page="meals" />}
        />
        <Route
          path="/planning/emergency/:trip_id"
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
