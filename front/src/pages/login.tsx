import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/auth.service";
import Error from "../components/error";

export default function Login() {

    const [form, setForm] = useState<{ email: string, password: string }>({ email: "", password: "" });
    const [error, setError] = useState<string | null>(null);
    const [state, setState] = useState<string>("idle");
    const navigate = useNavigate();

    function handleChanges(e: any, field: string) {
        switch (field) {
            case 'email':
                setForm({ ...form, email: e.target.value })
                break;
            case 'password':
                setForm({ ...form, password: e.target.value })
                break;
            default:
                break;
        }
    }

    async function handleClick() {
        try {
            const response = await login(form.email, form.password);
            console.log(response)
        } catch (error) {
            setError(error.response.data.message)
        } finally {
            setState("idle")
        }
    }

    return (
        <div className="auth-form">
            <h1 className="auth-form-header">Login</h1>

            {error && <Error message={error} />}

            <div className="form-group">
                <label>Email </label>
                <input type="text" value={form.email} onChange={(e) => handleChanges(e, 'email')} />
            </div>
            <div className="form-group">
                <label>Password </label>
                <input type="password" value={form.password} onChange={(e) => handleChanges(e, 'password')} />
            </div>
            <div className="form-group">
                <button className="btn-light" onClick={handleClick}>{state === 'idle' ? 'Login' : 'Submitting...'}</button>
            </div>
        </div>
    )
}