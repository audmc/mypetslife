import React, {useState} from "react";
import logo from '../svg/logo.svg';
import { Redirect } from "react-router-dom";
import {useTranslation} from "react-i18next";
import api from "../utils/api";
import {checkPasswordFormat, showPassword} from "../utils/form-functions";
import {useAuth} from "../context/auth";
import {retrievedFromJwt} from "../utils/user-infos";
var bcrypt = require('bcryptjs');

export default function ChangePassword() {
    const {t} = useTranslation();

    const { authTokens, setAuthTokens } = useAuth();

    const [passwordValue, setPasswordValue] = useState();
    const [isReset, setIsReset] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [wrongToken, setWrongToken] = useState(false);

    let token;
    let isConfirmed;

    if(retrievedFromJwt(authTokens) !== null && retrievedFromJwt(authTokens) !== undefined){
        token = retrievedFromJwt(authTokens)._id;
        isConfirmed = retrievedFromJwt(authTokens).confirmed;
    }

    function resetPassword(password){
        if(checkPasswordFormat(password, "password-error-format")) {
            setIsLoading(true);
            setWrongToken(false);

            const salt = bcrypt.genSaltSync(process.env.REACT_APP_TOKEN_SECRET.toNumber);
            const hash = bcrypt.hashSync(password, salt);

            api.firstPassword(token, hash).then(result => {
                setIsLoading(false);
                if (result.status === 200) {
                    setWrongToken(false);
                    setIsReset(true);
                    setAuthTokens(result.data.token);
                }else{
                    setWrongToken(true);
                }
            });
        }
    }

    return (
        <>
            <div className="text-center pt-5 background-page min-vh-100 d-flex align-items-center">
                <div className="w-100 pb-4">
                    <div className="change-password-logo-container">
                        <img draggable={false} src={logo} className="mb-3" alt="MyPetsLife Logo" width="250px"/>
                        <h1 className="main-title my-3">{t('changePassword.reset')}</h1>
                    </div>
                    <div className="login-div">
                        {!isReset && !wrongToken && !isConfirmed &&
                        <>
                            <h2 id="confirm-mail" className="subtitle mb-2">{t('changePassword.instruction1')}</h2>
                            <h5 className="subtitle w-75 m-auto">{t('changePassword.instruction2')}</h5>
                            <label className="label-input-mpl mt-3">{t('register.stepOne.password')}</label>
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
                            {!isLoading &&
                            <button className="mt-3 mb-3 btn-mpl-primary confirm-button"
                                    onClick={() => (resetPassword(passwordValue))}>{t('changePassword.clickToReceive')}
                            </button>
                            }
                            {isLoading &&
                            <>
                                <button className="mt-3 mb-3 btn-mpl-primary confirm-button" disabled>
                                    {t('changePassword.resetInProgress')}
                                </button>
                            </>
                            }
                        </>
                        }
                        {isReset && !wrongToken && isConfirmed &&
                        <>
                            <h2 id="confirm-mail" className="subtitle mb-0">{t('changePassword.congratulation1')}</h2>
                            <h2 className="subtitle">{t('changePassword.congratulation2')}</h2>
                            <button className="mt-3 mb-3 btn-mpl-primary confirm-button"
                                    onClick={()=> window.location.href = "/home"}>
                                {t('changePassword.goToHome')}
                            </button>
                        </>
                        }
                        {wrongToken &&
                        <>
                            <h2 id="confirm-mail" className="register-subtitle mb-0">{t('changePassword.wrongToken1')}</h2>
                            <h2 className="register-subtitle">{t('changePassword.wrongToken2')}</h2>
                            <button className="mt-3 mb-3 btn-mpl-primary confirm-button"
                                    onClick={()=> window.location.href = "/"}>
                                {t('page404.button')}
                            </button>
                        </>
                        }
                        {!isReset && !wrongToken && isConfirmed &&
                            <Redirect to="/home"/>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}
