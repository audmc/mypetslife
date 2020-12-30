import React, {useEffect, useState} from "react";
import '../RegisterPage/RegisterPage.css';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import logo_title from '../../svg/logo-title.svg'
import {Image} from "react-bootstrap";
import '../ConfirmEmailPage/ConfirmEmailPage.css'

import {useTranslation} from "react-i18next";
import api from "../../utils/api";
import ConfirmEmailAnimation from "../../animations/ConfirmEmailAnimation/ConfirmEmailAnimation";
import {useAuth} from "../../context/auth";
import {retrievedFromJwt} from "../../utils/user-infos";

export default function ConfirmEmailToken(props) {
    const {t} = useTranslation();

    const { token } = props;
    const { authTokens, setAuthTokens } = useAuth();
    const [wrongToken, setWrongToken] = useState();
    let isConfirmed = false;
    let pseudo = "";

    if(retrievedFromJwt(authTokens) !== null && retrievedFromJwt(authTokens) !== undefined){
        isConfirmed = retrievedFromJwt(authTokens).confirmed;
        pseudo = retrievedFromJwt(authTokens).pseudo;
    }

    useEffect(() => {
        if (token.length !== 40) {
            setWrongToken(true);
        } else {
            document.getElementById("confirm-mail").style.display = 'none';
            document.getElementById("confirm-error").style.display = 'none';
            if (!isConfirmed) {
                api.confirmEmail(token).then(result => {
                    if (result.status === 200) {
                        document.getElementById("confirm-mail").style.display = 'block';
                        setAuthTokens(result.data.token);
                    } else {
                        document.getElementById("confirm-error").style.display = 'block';
                    }
                }).catch(e => {
                    document.getElementById("confirm-error").style.display = 'block';
                });
            } else {
                document.getElementById("confirm-mail").style.display = 'block';
            }
        }
    }, [token, isConfirmed, setAuthTokens, setWrongToken]);

    return (
        <>
            <Row className="full-page-w-nav mx-0">
                <Col lg={5} className="px-5">
                    <div className="col-right-container">
                        <div>
                            <div className="register-logo-container">
                                <Image draggable={false} src={logo_title} className="register-logo"/>
                                <h1 className="register-main-title">{t('confirmEmail.confirmed')}</h1>
                            </div>

                            <div className="register-form-container">
                                {!wrongToken &&
                                    <>
                                    <h2 id="confirm-mail"
                                        className="register-subtitle">{t('confirmEmail.congratulation')} {pseudo}{t('confirmEmail.congratulation2')}</h2>
                                    <h2 id="confirm-error" className="register-subtitle">{t('confirmEmail.error')}</h2>
                                    </>
                                }
                                {wrongToken &&
                                    <h2 id="confirm-error" className="register-subtitle">{t('confirmEmail.error')}</h2>
                                }
                                <div id=" " className="btn-mpl-primary mt-2"
                                     onClick={() => (window.location.href = "/")}>
                                    {t('confirmEmail.home')}
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col className="register-illustration" lg={7}>
                    <ConfirmEmailAnimation/>
                </Col>
            </Row>
        </>

    );
}
