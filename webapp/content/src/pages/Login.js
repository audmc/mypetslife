import React from "react";
import NavbarTop from "../components/NavbarTop/NavbarTop";
import LoginPage from "../components/LoginPage/LoginPage";
import {useAuth} from "../context/auth";

export default function Login() {

    const { authTokens } = useAuth();

    return (
        <>
            <>
                <NavbarTop isConnected={authTokens} isWelcomePage={false}/>
                <LoginPage/>
            </>
        </>
    );
}

