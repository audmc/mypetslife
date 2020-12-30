import React, {Suspense, useState} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Loader from "./components/Loader/Loader";
import { AuthContext } from "./context/auth";
import Login from "./pages/Login";
import GlobalState from "./components/GlobalState/GlobalState";
import Page404 from "./pages/Page404";
import ChangePassword from "./pages/ChangePassword";
import Home from "./pages/Home";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import ForgotPassword from "./pages/ForgotPassword";
import Infos from "./pages/Infos"
import AdoptionMenu from "./components/AdoptionMenu/AdoptionMenu";
//import FamilyMenu from "./components/FamilyMenu/FamilyMenu";
import ShowAdoption from "./components/ShowAdoption/ShowAdoption";
import AddAdoption from "./components/AddAdoption/AddAdoption";
import ShowAskingAdoption from "./components/ShowAskingAdoption/ShowAskingAdoption";

function App() {
  const existingTokens = JSON.parse(localStorage.getItem("tokens-asso"));
  const [authTokens, setAuthTokens] = useState(existingTokens);

  const setTokens = (token) => {
    localStorage.setItem("tokens-asso", JSON.stringify(token));
    setAuthTokens(token);
  };

  const initialState = {};

  return (
      <>
        <Suspense fallback={<Loader/>}>
          <AuthContext.Provider value={{authTokens, setAuthTokens: setTokens}}>
            <GlobalState.Provider value={initialState}>
              <Router>
                <Switch>
                  <Route exact path="/" component={Login}/>
                  <Route exact path="/change_password" component={ChangePassword}/>
                  <Route path="/forgot_password" component={ForgotPassword}/>
                  <PrivateRoute exact path="/home" component={Home}/>
                  <PrivateRoute exact path="/infos" component={Infos}/>
                  <PrivateRoute exact path="/adoption_menu" component={AdoptionMenu}/>
                  <PrivateRoute exact path="/adoption" component={ShowAdoption}/>
                  <PrivateRoute exact path="/folders" component={ShowAskingAdoption}/>
                  <PrivateRoute exact path="/add_adoption" component={AddAdoption}/>
                  {/*<PrivateRoute exact path="/family_menu" component={FamilyMenu}/>*/}
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
