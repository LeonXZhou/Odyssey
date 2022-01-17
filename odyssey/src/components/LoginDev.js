import { useState } from "react"
import axios from "axios"
import "./component-styles/Login.scss"
function LoginDev(props) {
    let [user_id, setUser_id] = useState(1);
    let [message, setMessage] = useState("")
    return (
        <form>
            <input type={"number"} value={user_id} onChange={(e) => { setUser_id(e.target.value) }}></input>
            <button onClick={(e) => {
                e.preventDefault();
                axios.post("/login/dev", { user_id: user_id })
                    .then((res) => {
                        setMessage(res.data.message);
                        if (res.data.message === 'logged in!') {
                            props.setUserEmail(res.data.email);
                        }
                    });
            }}>login</button>
            <div>{message}</div>
        </form>
    );

}
export default LoginDev