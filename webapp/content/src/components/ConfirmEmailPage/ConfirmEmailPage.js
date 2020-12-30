import React, { useState } from "react";
import '../RegisterPage/RegisterPage.css';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import logo_title from '../../svg/logo-title.svg'
import { Image } from "react-bootstrap";
import './ConfirmEmailPage.css'

import { checkEmailFormat, checkEmailExist, authorizedEmail, checkEmpty } from "../../utils/form-functions";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/auth";
import api from "../../utils/api";
import { retrievedFromJwt } from "../../utils/user-infos";
import ConfirmEmailAnimation from "../../animations/ConfirmEmailAnimation/ConfirmEmailAnimation";

export default function ConfirmEmailPage() {
    const { t } = useTranslation();

    const [mailValue, setMailValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { authTokens, setAuthTokens } = useAuth();

    let originalMail = "";
    let pseudo = "";

    const date = new Date();
    let hello = t("confirmEmail.goodMorning");
    if(date.getHours()<=18 && date.getHours()<=3 ){
        hello = t("confirmEmail.goodNight")
    }

    if (retrievedFromJwt(authTokens) !== null) {
        originalMail = retrievedFromJwt(authTokens).email;
        pseudo = retrievedFromJwt(authTokens).pseudo;
    }

    function sendEmail(email) {
        document.getElementById("confirm-send").style.display = 'none';
        setIsLoading(true);
        api.sendConfirmEmail(email).then(result => {
            if (result.status === 200) {
                document.getElementById("confirm-send").style.display = 'block';
                setAuthTokens(result.data.token);
                setIsLoading(false);
            }
        });
    }

    function sendNewEmail(mail, oldEmail) {
        document.getElementById("confirm-change").style.display = 'none';
        setIsLoading(true);
        if (checkEmpty(mail, "mail-error-empty")) {
            if (checkEmailFormat(mail, "mail-error-format")) {
                if (authorizedEmail(mail, "mail-error-unauthorized")) {
                    checkEmailExist(mail, "mail-error-exist").then(mail_result => {
                        if (mail_result === false) {
                            api.changeEmailAndConfirm(mail, oldEmail).then(result => {
                                if (result.status === 200) {
                                    document.getElementById("confirm-change").style.display = 'block';
                                    setAuthTokens(result.data.token);
                                    setIsLoading(false);
                                }
                            });
                        }
                    });

                }
            }
        }
    }

    function newEmail() {
        document.getElementById("email-change").style.display = 'block';
        document.getElementById("button-change").style.display = 'none';
    }

    return (
        <>
            <Row className="full-page-w-nav mx-0">
                <Col lg={5} className="px-5">
                    <div className="col-right-container">
                        <div>
                            <div className="register-logo-container">
                                <Image draggable={false} src={logo_title} className="register-logo" />
                                <h1 className="register-main-title">{t('confirmEmail.title')}</h1>
                            </div>
                            <div className="register-form-container">
                                <h2 className="register-subtitle">{hello} {pseudo} !</h2>
                                <h2 className="register-subtitle">{t('confirmEmail.instruction')}</h2>
                                <h2 className="register-subtitle">{t('confirmEmail.noReceive')}</h2>

                                {!isLoading &&
                                <button className="mt-3 mb-3 btn-mpl-primary confirm-button"
                                    onClick={() => (sendEmail(originalMail))}>{t('confirmEmail.clickToReceive')}
                                </button>
                                }
                                {isLoading &&
                                    <>
                                    <button className="mt-3 mb-3 btn-mpl-primary confirm-button" disabled>
                                        {t('confirmEmail.sendInProgress')}
                                    </button>
                                    </>
                                }
                                <h6 id="confirm-send"
                                    className="color-green validate-messages">{t('confirmEmail.confirmSend')} {originalMail}</h6>
                                <h2 className="register-subtitle">{t('confirmEmail.changeEmail')}</h2>
                                <button id="button-change" className="mt-3 mb-3 btn-mpl-secondary confirm-button"
                                    onClick={() => (newEmail())}>{t('confirmEmail.clickToChange')}
                                </button>

                                <div id="email-change" className="email-field">
                                    <label className="label-input-mpl">{t('confirmEmail.newEmail')}</label>
                                    <input className={("input-mpl") + (mailValue ? " not-empty" : "")}
                                        type="mail"
                                        value={mailValue}
                                        onChange={(e) => setMailValue(e.target.value)} />
                                    <h6 id="confirm-change"
                                        className="color-green validate-messages">{t('confirmEmail.confirmEmailChange')}</h6>
                                    <small className="register-error-label"
                                        id="mail-error-empty">{t('register.stepOne.mailErrorEmpty')}</small>
                                    <small className="register-error-label"
                                        id="mail-error-format">{t('register.stepOne.mailErrorFormat')}</small>
                                    <small className="register-error-label"
                                        id="mail-error-exist">{t('register.stepOne.mailErrorExist')}</small>
                                    <small className="register-error-label"
                                        id="mail-error-unauthorized">{t('register.stepOne.mailErrorUnauthorized')}</small>
                                    <button className="mt-3 btn-mpl-primary confirm-button"
                                        onClick={() => (sendNewEmail(mailValue, originalMail))}>{t('confirmEmail.validate')}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col className="register-illustration" lg={7}>
                    <ConfirmEmailAnimation />
                </Col>
            </Row>
        </>
    );
}
