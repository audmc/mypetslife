import React from "react";
import NavbarTop from "../components/NavbarTop/NavbarTop";
import {useAuth} from "../context/auth";
import Page404 from "./Page404";
import ForgotPasswordPage from "../components/ForgotPasswordPage/ForgotPasswordPage";
import ForgotPasswordToken from "../components/ForgotPasswordToken/ForgotPasswordToken";

export default function ForgotPassword() {

    const { authTokens } = useAuth();

    var url = document.location.href;
    var token = url.substring (url.lastIndexOf( "/" )+1 );
    return (
        <>
            <>
                <NavbarTop isConnected={authTokens} isWelcomePage={false}/>

                {!authTokens && token === "forgot_password" &&
                <ForgotPasswordPage/>
                }
                {!authTokens && token !== "forgot_password" &&
                <ForgotPasswordToken token={token}/>
                }
                {
                    authTokens &&
                    <Page404/>
                }
            </>
        </>
    );
}

