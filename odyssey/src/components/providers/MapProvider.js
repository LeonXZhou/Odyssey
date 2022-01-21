import { createContext, useState } from "react";

export const mapContext = createContext();

export default function AuthenticationProvider(props) {
  const [map, setMap] = useState({});
  // Perform login process for the user & save authID, etc
  // const login = function (email, password) {
  //   setAuth(true);
  //   const id = "1234-1234-1234"; // Some random userId
  //   setUser({ email, id, name: "Test User" });
  // };

  // const logout = function () {
  //   setAuth(false);
  //   setUser(null);
  // };

  // authContext will expose these items
  const userData = { map, setMap};

  // We can use this component to wrap any content we want to share this context
  return (
    <mapContext.Provider value={userData}>
      {props.children}
    </mapContext.Provider>
  );
}
