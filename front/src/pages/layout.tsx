import { Outlet } from "react-router-dom";
import Header from "../components/headers";
import { useState } from "react";
import { Customer } from "../models/models";

export default function Layout() {

    const [authUser, setAuthUser] = useState<Customer | null>(null);

    function handleLogout() {
        setAuthUser(null)
    }

    return (
        <>
            <Header authUser={authUser} logout={handleLogout} />
            <Outlet context={[authUser, setAuthUser]} />
        </>
    )
}