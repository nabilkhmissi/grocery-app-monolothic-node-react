import { Outlet } from "react-router-dom";
import Header from "../components/headers";
import AppContext from "../context/app.context";
import { useState } from "react";

export default function Layout() {
    const [authUser, setAuthUser] = useState(null);
    return (
        <AppContext.Provider value={{ authUser, setAuthUser }}>
            <Header />
            <Outlet />
        </AppContext.Provider>
    )
}