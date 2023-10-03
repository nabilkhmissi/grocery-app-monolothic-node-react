import { useState } from "react";
import { login } from "../services/auth.service";
import { useNavigate, useOutletContext } from "react-router-dom";

export default function Login() {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [authUser, setAuthUser] = useOutletContext();
    const navigate = useNavigate();


    function handleEmailChange(e) {
        setEmail(e.target.value)
    }
    function handlePasswordChange(e) {
        setPassword(e.target.value)
    }

    async function handleLogin() {
        const response = await login(email, password);
        setAuthUser(response);
        navigate('/')
    }

    return (
        <div className="auth-form">
            <h1 className="auth-form-header">Login</h1>
            <div className="form-group">
                <label>Email </label>
                <input type="text" onChange={handleEmailChange} />
            </div>
            <div className="form-group">
                <label>Password </label>
                <input type="password" onChange={handlePasswordChange} />
            </div>
            <div className="form-group">
                <button className="btn-light" onClick={handleLogin}>Login</button>
            </div>
        </div>
    )
}