import { useState, useContext } from "react";
import { authContext } from "./providers/AuthenticationProvider";
import axios from "axios";
import "./component-styles/Login.scss";
function LoginDev(props) {
  let [user_id, setUser_id] = useState(1);
  let [message, setMessage] = useState("");
  const { setUser, setAuth } = useContext(authContext);
  return (
    <form>
      <input
        type={"number"}
        value={user_id}
        onChange={(e) => {
          setUser_id(e.target.value);
        }}
      ></input>
      <button
        onClick={(e) => {
          e.preventDefault();
          axios.post("/login/dev", { user_id: user_id }).then((res) => {
            setMessage(res.data);
            console.log(res.data);
            if (res.data.userId) {
              setAuth(true);
              setUser(res.data);
            }
          });
        }}
      >
        login
      </button>
      {/* <div>{message}</div> */}
    </form>
  );
}
export default LoginDev;
