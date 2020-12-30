import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { retrievedFromJwt } from "../../utils/user-infos";

function PrivateRouteFree({ component: Component, ...rest }) {
    const {authTokens} = useAuth();
    let isConfirmed = false;
    if(retrievedFromJwt(authTokens) !== null && retrievedFromJwt(authTokens) !== undefined){
        isConfirmed = retrievedFromJwt(authTokens).confirmed;
    }

    return (

        <Route
            {...rest}
            render={props =>
                authTokens && isConfirmed ? (
                    <Component {...props} />
                ) : authTokens && !isConfirmed ? (
                    <Redirect to="/confirm_email"/>
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    );
}

export default PrivateRouteFree;
