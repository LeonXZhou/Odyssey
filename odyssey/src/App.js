import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

import { authContext } from "./components/providers/AuthenticationProvider";

import { authenticate } from "./Helpers/apiHelpers";
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
          path="/planning/general/view/:trip_id"
          element={<Planning page="general" edit={"view"} />}
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

        <Route
          path="/planning/emergency/edit/:trip_id"
          element={<Planning page="emergency" edit={"edit"} />}
        />
        <Route
          path="/planning/general/edit/:trip_id"
          element={<Planning page="general" edit={"edit"} />}
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
      </Routes>
    </BrowserRouter>
  );

}

export default App;
