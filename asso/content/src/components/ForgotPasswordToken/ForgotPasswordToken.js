import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import api from "../../utils/api";
import {checkPasswordFormat, showPassword} from "../../utils/form-functions";
import logo from "../../svg/logo.svg";
var bcrypt = require('bcryptjs');

export default function ForgotPasswordToken(props) {

    const {t} = useTranslation();

    const [passwordValue, setPasswordValue] = useState("");
    const [isReset, setIsReset] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [wrongToken, setWrongToken] = useState(false);

    const { token } = props;

    useEffect(()=>{
        if (token === "" || token.length !== 40) {
            setWrongToken(true)
        }
    },[token, setWrongToken]);

    function resetPassword(password){

        if(checkPasswordFormat(password, "password-error-format")) {
            setIsLoading(true);
            setWrongToken(false);

            const salt = bcrypt.genSaltSync(process.env.REACT_APP_TOKEN_SECRET.toNumber);
            const hash = bcrypt.hashSync(password, salt);

            api.resetPasswordAsso(token,hash).then(result => {
                setIsLoading(false);
                if (result.status === 200) {
                    setWrongToken(false);
                    setIsReset(true);
                }else{
                    setWrongToken(true);
                }
            });
        }
    }

    return (
        <>
            <div className="text-center pt-5 background-page d-flex align-items-center">
                <div className="w-100 pb-5">
                    <img draggable={false} src={logo} className="mb-3" alt="MyPetsLife Logo" width="250px"/>
                    <div className="login-div py-2">
                        {
                            !isReset && !wrongToken &&
                            <>
                                <h2 id="confirm-mail" className="subtitle mb-0">{t('forgotPassword.instruction1')}</h2>
                                <h2 className="subtitle">{t('forgotPassword.instruction2')}</h2>
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

                                {
                                    !isLoading &&
                                    <button className="mt-3 mb-3 btn-mpl-primary confirm-button"
                                            onClick={() => (resetPassword(passwordValue))}>{t('forgotPassword.clickToReceive')}
                                    </button>
                                }
                                {
                                    isLoading &&
                                    <>
                                        <button className="mt-3 mb-3 btn-mpl-primary confirm-button" disabled>
                                            {t('forgotPassword.resetInProgress')}
                                        </button>
                                    </>
                                }
                            </>
                        }
                        {
                            isReset && !wrongToken &&
                            <>
                                <h2 id="confirm-mail" className="subtitle mb-0">{t('forgotPassword.congratulation1')}</h2>
                                <h2 className="subtitle">{t('forgotPassword.congratulation2')}</h2>
                                <button className="mt-3 mb-3 btn-mpl-primary confirm-button"
                                        onClick={()=> window.location.href = "/"}>
                                    {t('forgotPassword.goToLogin')}
                                </button>
                            </>
                        }
                        {
                            wrongToken &&
                            <>
                                <h2 id="confirm-mail" className="subtitle mb-0">{t('forgotPassword.wrongToken1')}</h2>
                                <h2 className="subtitle">{t('forgotPassword.wrongToken2')}</h2>
                                <button className="mt-3 mb-3 btn-mpl-primary confirm-button"
                                        onClick={()=> window.location.href = "/"}>
                                    {t('page404.button')}
                                </button>
                            </>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}
