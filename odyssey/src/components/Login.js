import { useState } from "react"
import axios from "axios"
import "./component-styles/Login.scss"
function Login(props) {
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [message, setMessage] = useState("")
    return (
        <form>
            <input type={"email"} value={email} onChange={(e) => { setEmail(e.target.value) }}></input>
            <input type={"password"} value={password} onChange={(e) => { setPassword(e.target.value) }}></input>
            <button onClick={(e) => {
                e.preventDefault();
                axios.post("/login", { email: email, password: password })
                    .then((res) => {
                        setMessage(res.data);
                        if (res.data === 'logged in!')
                        {
                            props.setUserEmail(email);
                        }
                    });
            }}>Register</button>
            <div>{message}</div>
        </form>
    );

}
export default Login