import { createContext, useState } from "react";

export const authContext = createContext();

export default function AuthenticationProvider(props) {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState({});

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
  const userData = { auth, user, setAuth, setUser };

  // We can use this component to wrap any content we want to share this context
  return (
    <authContext.Provider value={userData}>
      {props.children}
    </authContext.Provider>
  );
}
