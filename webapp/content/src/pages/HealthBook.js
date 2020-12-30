import React from "react";
import HealthBookPage from "../components/HealthBookPage/HealthBookPage";

import NavbarTop from "../components/NavbarTop/NavbarTop";
import {useAuth} from "../context/auth";
import { retrievedFromJwt } from "../utils/user-infos";

export default function HealthBook() {

    const { authTokens } = useAuth();

    let user_id;

    if(retrievedFromJwt(authTokens) !== null && retrievedFromJwt(authTokens) !== undefined) {
        user_id = retrievedFromJwt(authTokens)._id;
    }
    return (
        <>
            <NavbarTop isConnected={authTokens} isWelcomePage={false}/>
            <HealthBookPage user_id={user_id}/>
        </>
    );
}
