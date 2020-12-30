import React from "react";

import NavbarTop from "../components/NavbarTop/NavbarTop";
import RegisterPage from "../components/RegisterPage/RegisterPage";
import { useAuth } from "../context/auth";

export default function Register() {
    const { authTokens } = useAuth();
    return (
        <>
            <NavbarTop isConnected={authTokens} isWelcomePage={false} />
            <RegisterPage />
        </>
    );
}
