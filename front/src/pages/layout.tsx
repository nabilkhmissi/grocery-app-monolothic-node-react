import { Outlet } from "react-router-dom";
import Header from "../components/headers";
import AppContext from "../context/auth.context";
import { useEffect, useState } from "react";

export default function Layout() {
    const [authUser, setAuthUser] = useState(null);
    useEffect(() => {
        initAuth()
    }, [])
    function initAuth() {
        const auth = localStorage.getItem("grocery_app_user");
        if (auth) {
            setAuthUser(JSON.parse(auth))
        }
    }

    return (
        <AppContext.Provider value={{ authUser, setAuthUser }}>
            <Header />
            <Outlet />
        </AppContext.Provider>
    )
}