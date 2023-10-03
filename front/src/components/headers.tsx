import { NavLink } from "react-router-dom";

export default function Header({ authUser, logout }) {

    return (
        <div className="header">
            <h1>GroceryStore</h1>
            <div className="nav-links">
                <NavLink to="">Home</NavLink>
                <NavLink to="products">Products</NavLink>
                <NavLink to="categories">Categories</NavLink>
            </div>
            <div className="nav-actions">
                {
                    !authUser && (<>
                        <NavLink to="login">Login</NavLink>
                        <NavLink to="signup">Signup</NavLink>
                    </>
                    )
                }

                {authUser && <button>{authUser.name}</button>}
                {authUser && <button onClick={logout}>Logout</button>}
            </div>
        </div>
    )
}