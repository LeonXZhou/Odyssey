import { useState } from "react"
import "./component-styles/Login.scss"
import axios from "axios"
function Register() {
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    console.log(email);
    return (
        <form>
            <input type={"email"} value={email} onChange={(e) => { setEmail(e.target.value) }}></input>
            <input type={"password"} value={password} onChange={(e) => { setPassword(e.target.value) }}></input>
            <button onClick={(e) => {
                console.log(email);
                e.preventDefault();
                axios.post("/register", { email: email, password: password })
                    .then((res) => { console.log(res) });
            }}>Register</button>
        </form>
    );

}
export default Register