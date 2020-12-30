import React from "react";
import NavbarTop from "../components/NavbarTop/NavbarTop";
import {useAuth} from "../context/auth";
import ConfirmEmailPage from "../components/ConfirmEmailPage/ConfirmEmailPage";
import ConfirmEmailToken from "../components/ConfirmEmailToken/ConfirmEmailToken";
import {retrievedFromJwt} from "../utils/user-infos";
import Page404 from "./Page404";

export default function ConfirmEmail() {

    const { authTokens } = useAuth();
    let isConfirmed = true;

    var url = document.location.href;
    var token = url.substring (url.lastIndexOf( "/" )+1 );

    if(retrievedFromJwt(authTokens) !== null && retrievedFromJwt(authTokens) !== undefined){
        isConfirmed = retrievedFromJwt(authTokens).confirmed;
    }

    return (
        <>
            <>
                <NavbarTop isConnected={authTokens} isWelcomePage={false}/>
                {!isConfirmed && authTokens && token === "confirm_email" &&
                    <ConfirmEmailPage/>
                }
                {authTokens && token !== "confirm_email" &&
                    <ConfirmEmailToken token={token}/>
                }
                {!authTokens &&
                    <Page404/>
                }
            </>
        </>
    );
}

