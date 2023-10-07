import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../context/app.context";

export default function Header() {

    const { authUser, setAuthUser } = useContext(AuthContext);
    const navigate = useNavigate();
    return (
        <div className="header">
            <h1>Grocery Store</h1>
            <div className="nav-links">
                <NavLink to="">Home</NavLink>
                <NavLink to="products">Products</NavLink>
            </div>
            <div className="nav-actions">
                {!authUser && <>
                    <NavLink to="login">Login</NavLink>
                    <NavLink to="signup">Signup</NavLink>
                </>
                }
                {authUser && <button onClick={() => navigate('/profile')}>Auth user</button>}
                {authUser && <button onClick={() => setAuthUser({ auth: null })}>Logout</button>}
            </div>
        </div>
    )
}