import { useState } from "react"
import "./component-styles/Login.scss"
function Login() {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    return (
        <form>
            <input type={"email"} value={email} onChange={(e) => {setEmail(e.value)}}></input>
            <input type={"password"} value={password} onChange={(e) => {setPassword(e.value)}}></input>
            <button>login</button>
        </form>
    );

}
export default Login