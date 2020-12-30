import React, {useState} from "react";
import '../RegisterPage/RegisterPage.css';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import logo_title from '../../svg/logo-title.svg'
import {Image} from "react-bootstrap";
import './ForgotPasswordPage.css'

import {useTranslation} from "react-i18next";
import api from "../../utils/api";
import UserLockAnimation from "../../animations/UserLockAnimation/UserLockAnimation";
import {authorizedEmail, checkEmailDoNotExist, checkEmailFormat, checkEmpty} from "../../utils/form-functions";

export default function ForgotPasswordPage() {
    const {t} = useTranslation();

    const [mailValue, setMailValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    function sendResetEmail(mail) {
        document.getElementById("confirm-send").style.display = 'none';
        if (checkEmpty(mail, "mail-error-empty")) {
            if (checkEmailFormat(mail, "mail-error-format")) {
                if (authorizedEmail(mail, "mail-error-unauthorized")) {
                    checkEmailDoNotExist(mail, "mail-error-do-not-exist").then(mail_result => {
                        if (mail_result === true) {
                            setIsLoading(true);
                            api.forgotPassword(mail).then(result => {
                                setIsLoading(false);
                                if (result.status === 200) {
                                    document.getElementById("confirm-send").style.display = 'block';
                                }
                            });
                        }
                    });
                }
            }
        }
    }

    return (
        <>
            <Row className="full-page-w-nav mx-0">
                <Col lg={5} className="px-5">
                    <div className="col-right-container small-form">
                        <div>
                            <div className="register-logo-container">
                                <Image draggable={false} src={logo_title} className="register-logo"/>
                                <h1 className="register-main-title">{t('forgotPassword.title')}</h1>
                            </div>
                            <div className="register-form-container">
                                <h2 className="register-subtitle">{t('forgotPassword.subtitle')}</h2>
                                <label className="label-input-mpl">{t('register.stepOne.mail')}</label>
                                <input className={("input-mpl") + (mailValue ? " not-empty" : "")}
                                       type="mail"
                                       value={mailValue}
                                       onChange={(e) => setMailValue(e.target.value)}/>
                                <small className="register-error-label"
                                       id="mail-error-empty">{t('register.stepOne.mailErrorEmpty')}</small>
                                <small className="register-error-label"
                                       id="mail-error-format">{t('register.stepOne.mailErrorFormat')}</small>
                                <small className="register-error-label"
                                       id="mail-error-do-not-exist">{t('forgotPassword.mailDoNotExist')}</small>
                                <small className="register-error-label"
                                       id="mail-error-unauthorized">{t('register.stepOne.mailErrorUnauthorized')}</small>
                                <h6 id="confirm-send"
                                    className="color-green validate-messages">{t('confirmEmail.confirmSend')} {mailValue}</h6>
                                {!isLoading &&
                                <button className="mt-3 mb-3 btn-mpl-primary confirm-button"
                                        onClick={() => (sendResetEmail(mailValue))}>{t('forgotPassword.clickToReceive')}
                                </button>
                                }
                                {isLoading &&
                                    <>
                                    <button className="mt-3 mb-3 btn-mpl-primary confirm-button" disabled>
                                        {t('confirmEmail.sendInProgress')}
                                    </button>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </Col>
                <Col className="register-illustration" lg={7}>
                    <UserLockAnimation/>
                </Col>
            </Row>
        </>
    );
}
