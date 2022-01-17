import { useState } from "react"
import "./component-styles/Login.scss"
import axios from "axios"
function Register() {
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [message, setMessage] = useState("")
    return (
        <form>
            <input type={"email"} value={email} onChange={(e) => { setEmail(e.target.value) }}></input>
            <input type={"password"} value={password} onChange={(e) => { setPassword(e.target.value) }}></input>
            <button onClick={(e) => {
                e.preventDefault();
                axios.post("/register", { email: email, password: password })
                    .then((res) => { setMessage(res.data) });
            }}>Register</button>
            <div>{message}</div>
        </form>
    );

}
export default Register