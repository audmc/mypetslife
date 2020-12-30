import React from "react"
import { useAuth } from "../context/auth";
import Page404 from "./Page404";
import ForgotPasswordPage from "../components/ForgotPasswordPage/ForgotPasswordPage";
import ForgotPasswordToken from "../components/ForgotPasswordToken/ForgotPasswordToken";

export default function ForgotPassword() {

    const { authTokens } = useAuth();

    let url = document.location.href;
    let token = url.substring(url.lastIndexOf( "/" ) + 1);

    return (
        <>
            <>
                {
                    !authTokens && token === "forgot_password" &&
                    <ForgotPasswordPage/>
                }
                {
                    !authTokens && token !== "forgot_password" &&
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

