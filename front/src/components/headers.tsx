import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../context/auth.context";
import CartContext from "../context/cart.context";

export default function Header() {

    const { authUser, setAuthUser } = useContext(AuthContext);
    const { cart, setCart } = useContext(CartContext)

    const navigate = useNavigate();
    function handleLogout() {
        setAuthUser(null)
        localStorage.removeItem("grocery_app_user")
    }
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
                <button className="header-cart">Cart <span className="cart-count">{cart.length}</span></button>

                {authUser && <button onClick={handleLogout}>Logout</button>}
            </div>
        </div>
    )
}