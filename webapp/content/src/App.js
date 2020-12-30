import React, {Suspense, useState} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Register from "./pages/Register";
import Loader from "./components/Loader/Loader";
import Welcome from "./pages/Welcome";
import { AuthContext } from "./context/auth";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import PrivateRouteFree from "./components/PrivateRouteFree/PrivateRouteFree";
import Login from "./pages/Login";
import ConfirmEmail from "./pages/ConfirmEmail";
import HealthBook from "./pages/HealthBook";
import GlobalState from "./components/GlobalState/GlobalState";
import PopupContact from "./components/PopupContact/PopupContact";
import PopupCgu from "./components/PopupCGU/PopupCgu";
import PopupCookies from "./components/PopupCookies/PopupCookies";
import Outcome from "./pages/Outcome";
import Page404 from "./pages/Page404";
import PlugAdoption from "./pages/PlugAdoption";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";
import Adoption from "./pages/Adoption"

function App() {
    const existingTokens = JSON.parse(localStorage.getItem("tokens"));
    const [authTokens, setAuthTokens] = useState(existingTokens);

    const setTokens = (token) => {
        localStorage.setItem("tokens", JSON.stringify(token));
        setAuthTokens(token);
    }
    const [showPopupContact, setShowPopupContact] = useState(false);
    const [showPopupCgu, setShowPopupCgu] = useState(false);
    const [showPopupCookies, setShowPopupCookies] = useState(false);

    const initialState = {
        showPopupContact,
        setShowPopupContact,
        showPopupCgu,
        setShowPopupCgu,
        showPopupCookies,
        setShowPopupCookies,
    };

    return (
        <>
            <Suspense fallback={<Loader/>}>
                <AuthContext.Provider value={{authTokens, setAuthTokens: setTokens}}>
                    <GlobalState.Provider value={initialState}>
                        <Router>
                            {
                                showPopupContact &&
                                <PopupContact onClosed={() => setShowPopupContact(false)}/>
                            }
                            {
                                showPopupCgu &&
                                <PopupCgu onClosed={() => setShowPopupCgu(false)}/>
                            }
                            {
                                showPopupCookies &&
                                <PopupCookies onClosed={() => setShowPopupCookies(false)}/>
                            }
                            <Switch>
                                <Route exact path="/" component={Welcome}/>
                                <Route exact path ="/adoption" component={Adoption}/>
                                <Route exact path ="/plugAdoption" component={PlugAdoption}/>
                                <PrivateRouteFree exact path="/profile" component={Profile}/>
                                <Route exact path="/login" component={Login}/>
                                <Route exact path="/register" component={Register}/>
                                <Route path="/confirm_email" component={ConfirmEmail}/>
                                <Route path="/forgot_password" component={ForgotPassword}/>
                                <PrivateRoute exact path="/outcome" component={Outcome} />
                                <PrivateRoute exact path="/health_book" component={HealthBook}/>
                                {/* 404 MUST be the last specified route, or the following routes will be redirected to 404 */}
                                <Route component={Page404}/>
                            </Switch>
                        </Router>
                    </GlobalState.Provider>
                </AuthContext.Provider>
            </Suspense>
        </>
    );
}

export default App;
