import React, {useEffect, useState} from "react";
import '../RegisterPage/RegisterPage.css';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import logo_title from '../../svg/logo-title.svg'
import {Image} from "react-bootstrap";
import '../ConfirmEmailPage/ConfirmEmailPage.css'

import {useTranslation} from "react-i18next";
import api from "../../utils/api";
import UserUnlockAnimation from "../../animations/UserUnlockAnimation/UserUnlockAnimation";
import {checkPasswordFormat, showPassword} from "../../utils/form-functions";
var bcrypt = require('bcryptjs');

export default function ForgotPasswordToken(props) {
    const {t} = useTranslation();

    const [passwordValue, setPasswordValue] = useState();
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

            api.resetPassword(token,hash).then(result => {
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
            <Row className="full-page-w-nav mx-0">
                <Col lg={5} className="px-5">
                    <div className="col-right-container small-form">
                        <div>
                            <div className="register-logo-container">
                                <Image draggable={false} src={logo_title} className="register-logo"/>
                                <h1 className="register-main-title mb-0">{t('forgotPassword.reset1')}</h1>
                                <h1 className="register-main-title mt-0 mb-4">{t('forgotPassword.reset2')}</h1>
                            </div>
                            <div className="register-form-container">
                                {!isReset && !wrongToken &&
                                    <>
                                        <h2 id="confirm-mail" className="register-subtitle mb-0">{t('forgotPassword.instruction1')}</h2>
                                        <h2 className="register-subtitle">{t('forgotPassword.instruction2')}</h2>
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

                                        {!isLoading &&
                                        <button className="mt-3 mb-3 btn-mpl-primary confirm-button"
                                                onClick={() => (resetPassword(passwordValue))}>{t('forgotPassword.clickToReceive')}
                                        </button>
                                        }
                                        {isLoading &&
                                        <>
                                            <button className="mt-3 mb-3 btn-mpl-primary confirm-button" disabled>
                                                {t('forgotPassword.resetInProgress')}
                                            </button>
                                        </>
                                        }
                                    </>
                                }
                                {isReset && !wrongToken &&
                                <>
                                    <h2 id="confirm-mail" className="register-subtitle mb-0">{t('forgotPassword.congratulation1')}</h2>
                                    <h2 className="register-subtitle">{t('forgotPassword.congratulation2')}</h2>
                                    <button className="mt-3 mb-3 btn-mpl-primary confirm-button"
                                    onClick={()=> window.location.href = "/login"}>
                                        {t('forgotPassword.goToLogin')}
                                    </button>
                                </>
                                }
                                {wrongToken &&
                                <>
                                    <h2 id="confirm-mail" className="register-subtitle mb-0">{t('forgotPassword.wrongToken1')}</h2>
                                    <h2 className="register-subtitle">{t('forgotPassword.wrongToken2')}</h2>
                                    <button className="mt-3 mb-3 btn-mpl-primary confirm-button"
                                            onClick={()=> window.location.href = "/"}>
                                        {t('page404.button')}
                                    </button>
                                </>
                                }
                            </div>
                        </div>
                    </div>
                </Col>
                <Col className="register-illustration" lg={7}>
                    <UserUnlockAnimation/>
                </Col>
            </Row>
        </>

    );
}
