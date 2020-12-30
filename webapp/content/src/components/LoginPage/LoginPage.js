import React, { useState } from "react";
import '../RegisterPage/RegisterPage.css';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import logo_title from '../../svg/logo-title.svg'
import {Image, Spinner} from "react-bootstrap";

import { checkEmailFormat, checkPasswordFormat, showPassword } from "../../utils/form-functions";
import { useTranslation } from "react-i18next";
import LanguageRegisterSelector from "../LanguageRegisterSelector/LanguageRegisterSelector";
import { useAuth } from "../../context/auth";
import api from "../../utils/api";
import UserUnlockAnimation from "../../animations/UserUnlockAnimation/UserUnlockAnimation";
import UserLockAnimation from "../../animations/UserLockAnimation/UserLockAnimation";
import {retrievedFromJwt} from "../../utils/user-infos";

let bcrypt = require('bcryptjs');

export default function LoginPage() {
    const { t } = useTranslation();

    const [ mailValue, setMailValue ] = useState("");
    const [ passwordValue, setPasswordValue ] = useState("");

    const [ isLoggedIn, setLoggedIn ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(false);
    const { setAuthTokens } = useAuth();

    function postLogin(email, password) {
        document.getElementById("no-user").style.display = 'none';
        document.getElementById("no-account").style.display = 'none';
        var email_ok = checkEmailFormat(email, "mail-error-empty");
        var password_ok = checkPasswordFormat(password, "password-error-format");
        if (email_ok && password_ok) {
            setIsLoading(true);
            api.loginUser(email).then(result => {
                setIsLoading(false);
                if (result.status === 200) {
                    bcrypt.compare(password, retrievedFromJwt(result.data.token).password, function (err, res) {
                        if (res) {
                            setAuthTokens(result.data.token);
                            setLoggedIn(true);
                        } else {
                            document.getElementById("no-user").style.display = 'block';
                            document.getElementById("no-account").style.display = 'block';
                        }
                    });
                } else {
                    document.getElementById("no-user").style.display = 'block';
                    document.getElementById("no-account").style.display = 'block';
                }
            }).catch(e => {
                setIsLoading(false);
                document.getElementById("no-user").style.display = 'block';
                document.getElementById("no-account").style.display = 'block';
            });
        }
    }

    if (isLoggedIn) {
        if(localStorage.getItem("route")) {
            window.location.href = localStorage.getItem("route");
        }else{
            window.location.href = "/";
        }
    }

    return (
        <>
            <Row className="full-page-w-nav mx-0">
                <Col lg={5} className="px-5">
                    <div className="col-right-container">
                        <div>
                            <div className="register-logo-container">
                                <Image draggable={false} src={logo_title} className="register-logo" />
                                <h1 className="register-main-title">{t('login.connect')}</h1>
                            </div>
                            <div className="register-form-container">
                                <h2 className="register-subtitle">{t('login.connectInstruction')}</h2>
                                <LanguageRegisterSelector />
                                <label className="label-input-mpl">{t('register.stepOne.mail')}</label>
                                <input className={("input-mpl") + (mailValue ? " not-empty" : "")}
                                    type="mail"
                                    value={mailValue}
                                    onChange={(e) => setMailValue(e.target.value)}
                                       onKeyDown={(e) => e.keyCode === 13 ? document.getElementById("password-input").focus() : null}
                                />
                                <small className="register-error-label"
                                    id="mail-error-empty">{t('register.stepOne.mailErrorEmpty')}</small>

                                <label className="label-input-mpl">{t('register.stepOne.password')}</label>
                                <input className={("input-mpl") + (passwordValue ? " not-empty" : "")}
                                    id="password-input"
                                    type="password"
                                    value={passwordValue}
                                    onChange={(e) => setPasswordValue(e.target.value)}
                                    onKeyDown={(e) => e.keyCode === 13 ? postLogin(mailValue, passwordValue) : null}
                                />
                                <button className="btn show-password" onClick={() => {
                                    showPassword("password-input")
                                }}><i className="fas fa-eye-slash" /></button>
                                <small className="register-error-label"
                                       id="password-error-format">{t('register.stepOne.passwordErrorFormat')}</small>
                                <label className="label-input-mpl forgot-password" onClick={() => document.location.href = "/forgot_password"}>{t('login.forgotPassword')}</label>
                                <small id="no-user" className="register-error-label">{t('login.noUser')}</small>
                                <label id="no-account" className="register-error-label">{t('login.noAccount')} <span className="forgot-password" onClick={() => document.location.href = "/register"}>{t('login.register')}</span></label>
                                <br />
                                {
                                    !isLoading &&
                                    <button className="mt-3 btn-mpl-primary"
                                            onClick={() => (postLogin(mailValue, passwordValue))}>{t('login.validate')}
                                    </button>
                                }
                                {
                                    isLoading &&
                                    <div className="text-center my-3">
                                        <Spinner animation="border" className="color-green"/>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </Col>
                <Col className="register-illustration" lg={7}>
                    {mailValue && passwordValue ? <UserUnlockAnimation /> : <UserLockAnimation />}
                </Col>
            </Row>
        </>
    );
}
