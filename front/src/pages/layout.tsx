import { Outlet } from "react-router-dom";
import Header from "../components/headers";
import AppContext from "../context/auth.context";
import { useEffect, useState } from "react";
import CartContext from "../context/cart.context";
import { loadCart } from "../services/customer.service";
import CartBar from "../components/cart-bar";

export default function Layout() {
    const [authUser, setAuthUser] = useState(null);
    const [cart, setCart] = useState([])
    useEffect(() => {
        initAuth();
        initCart()
    }, [])

    function initAuth() {
        const auth = localStorage.getItem("grocery_app_user");
        if (auth) {
            setAuthUser(JSON.parse(auth))
        }
    }

    async function initCart() {
        const response = await loadCart();
        const cart = response.data.cart;
        setCart(cart)
    }

    const [isOpen, setIsOpen] = useState(false);

    function handleCartBar() {
        setIsOpen(!isOpen)
    }

    return (
        <AppContext.Provider value={{ authUser, setAuthUser }}>
            <CartContext.Provider value={{ cart, setCart }}>
                <CartBar isOpen={isOpen} />
                <Header handleCartBar={handleCartBar} />
                <Outlet />
            </CartContext.Provider>
        </AppContext.Provider>
    )
}