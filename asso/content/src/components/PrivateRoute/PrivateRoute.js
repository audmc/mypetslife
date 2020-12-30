import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { retrievedFromJwt } from "../../utils/user-infos";

function PrivateRoute({ component: Component, ...rest }) {
    const {authTokens} = useAuth();
    let isInPayment = false;
    let isConfirmed = false;
    if(retrievedFromJwt(authTokens) !== null && retrievedFromJwt(authTokens) !== undefined){
        isInPayment = retrievedFromJwt(authTokens).inPayment;
        isConfirmed = retrievedFromJwt(authTokens).confirmed;
    }

    return (

        <Route
            {...rest}
            render={props =>
                authTokens && isInPayment && isConfirmed ? (
                    <Component {...props} />
                ) : authTokens && !isConfirmed ? (
                    <Redirect to="/change_password"/>
                ) : authTokens && !isInPayment ? (
                    <Redirect to="/pricing" />
                ) : (
                    <Redirect to="/"/>
                )
            }
        />
    );
}

export default PrivateRoute;
