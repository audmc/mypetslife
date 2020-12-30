import React, {useState} from "react";
import "../css/Login.css";
import logo from "../svg/logo.svg"
import {useAuth} from "../context/auth";
import {useTranslation} from "react-i18next";
import {authorizedPseudo, checkPasswordFormat, showPassword} from "../utils/form-functions";
import api from "../utils/api"
import {Redirect} from "react-router-dom";
import {retrievedFromJwt} from "../utils/user-infos";

let bcrypt = require('bcryptjs');

export default function Login() {

    const {t} = useTranslation();

    const [pseudoValue, setPseudoValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");

    const [isLoggedIn, setLoggedIn] = useState(false);
    const {authTokens, setAuthTokens} = useAuth();

    function postLogin(pseudo, password) {
        document.getElementById("no-user").style.display = 'none';
        var pseudo_ok = authorizedPseudo(pseudo, "pseudo-error-format");
        var password_ok = checkPasswordFormat(password, "password-error-format");
        if (pseudo_ok && password_ok) {
            api.loginAsso(pseudo).then(result => {
                if (result.status === 200) {
                    bcrypt.compare(password, retrievedFromJwt(result.data.token).password, function (err, res) {
                        if (res) {
                            setAuthTokens(result.data.token);
                            setLoggedIn(true);
                        } else {
                            document.getElementById("no-user").style.display = 'block';
                        }
                    });
                } else {
                    document.getElementById("no-user").style.display = 'block';
                }
            }).catch(e => {
                document.getElementById("no-user").style.display = 'block';
            });
        }
    }

    if (isLoggedIn) {
        window.location.href = "/home";
    }

    return (
        <>
            {!authTokens &&
            <div className="text-center pt-5 background-page min-vh-100 d-flex align-items-center">
                <div className="w-100 pb-5">
                    <img draggable={false} src={logo} className="mb-3" alt="MyPetsLife Logo" width="250px"/>
                    <div className="login-div py-2">
                        <label className="label-input-mpl">{t('register.stepOne.pseudo')}</label>
                        <input className={("input-mpl") + (pseudoValue ? " not-empty" : "")}
                               type="pseudo"
                               value={pseudoValue}
                               onChange={(e) => setPseudoValue(e.target.value)}/>
                        <small className="register-error-label"
                               id="pseudo-error-format">{t('register.stepOne.pseudoErrorFormat')}</small>

                        <label className="label-input-mpl">{t('register.stepOne.password')}</label>
                        <input className={("input-mpl") + (passwordValue ? " not-empty" : "")}
                               id="password-input"
                               type="password"
                               value={passwordValue}
                               onChange={(e) => setPasswordValue(e.target.value)}/>
                        <button className="btn show-password" onClick={() => {
                            showPassword("password-input")
                        }}><i className="fas fa-eye-slash"/></button>
                        <small className="register-error-label"
                               id="password-error-format">{t('register.stepOne.passwordErrorFormat')}</small>
                        <label className="label-input-mpl forgot-password"
                               onClick={() => document.location.href = "/forgot_password"}>{t('login.forgotPassword')}</label>
                        <small id="no-user" className="register-error-label">{t('login.noUser')}</small>
                        <br/>
                        <button className="mt-3 btn-mpl-primary"
                                onClick={() => (postLogin(pseudoValue, passwordValue))}>{t('login.validate')}
                        </button>
                    </div>
                </div>
            </div>
            }
            { authTokens &&
                <Redirect to="/home"/>
            }
        </>
    );
}
