import React, {useState} from "react";
import logo from '../../svg/logo.svg';
import {useTranslation} from "react-i18next";
import api from "../../utils/api";
import {authorizedPseudo} from "../../utils/form-functions";
import "./ForgotPasswordPage.css";

export default function ForgotPasswordPage() {

    const {t} = useTranslation();

    const [pseudoValue, setPseudoValue] = useState("");
    const [mailValue, setMailValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    function sendResetEmail(pseudo) {
        document.getElementById("confirm-send").style.display = 'none';
        document.getElementById("error-send").style.display = 'none';
        document.getElementById("error-pseudo").style.display = 'none';
        if (authorizedPseudo(pseudo, "pseudo-error-format")) {
            setIsLoading(true);
            api.forgotPasswordAsso(pseudo).then(result => {
                setIsLoading(false);
                if (result.status === 200) {
                    setMailValue(result.data.email);
                    document.getElementById("confirm-send").style.display = 'block';
                }else if (result.status === 202){
                    document.getElementById("error-pseudo").style.display = 'block';
                }else{
                    document.getElementById("error-send").style.display = 'block';
                }
            });
        }
    }

    return (
        <>
            <div className="text-center pt-5 background-page min-vh-100  d-flex align-items-center">
                <div className="w-100 pb-4">
                    <div className="change-password-logo-container">
                        <img draggable={false} src={logo} className="mb-3" alt="MyPetsLife Logo" width="250px"/>
                        <h1 className="main-title">{t('forgotPassword.title')}</h1>
                    </div>
                    <div className="login-div">
                        <h2 className="subtitle">{t('forgotPassword.subtitle')}</h2>
                        <label className="label-input-mpl">{t('register.stepOne.pseudo')}</label>
                        <input className={("input-mpl") + (pseudoValue ? " not-empty" : "")}
                               type="text"
                               value={pseudoValue}
                               onChange={(e) => setPseudoValue(e.target.value)}/>
                        <small className="register-error-label"
                               id="pseudo-error-format">{t('register.stepOne.pseudoErrorFormat')}</small>
                        <h6 id="confirm-send"
                            className="color-green validate-message">{t('forgotPassword.confirmSend')} {mailValue}</h6>
                        <h6 id="error-send"
                            className="color-green validate-message">{t('forgotPassword.errorSend')}</h6>
                        <h6 id="error-pseudo"
                            className="color-green validate-message">{t('forgotPassword.pseudoDoNotExist')}</h6>
                        {
                            !isLoading &&
                            <button className="mt-3 mb-3 btn-mpl-primary confirm-button"
                                    onClick={() => (sendResetEmail(pseudoValue))}>{t('forgotPassword.clickToReceive')}
                            </button>
                        }
                        {
                            isLoading &&
                            <>
                                <button className="mt-3 mb-3 btn-mpl-primary confirm-button" disabled>
                                    {t('forgotPassword.sendInProgress')}
                                </button>
                            </>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}
