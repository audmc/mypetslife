import React, {useRef, useState} from "react";
import './WelcomeNewsletter.css'
import {useTranslation} from 'react-i18next';
import WomanAndPhoneAnimation from "../../animations/WomanAndPhoneAnimation/WomanAndPhoneAnimation";
import {Col, Row} from "react-bootstrap";
import {authorizedEmail, checkEmailFormat} from "../../utils/form-functions";
import api from "../../utils/api";
import {cryptData} from "../../utils/user-infos";
import ReCAPTCHA from "react-google-recaptcha";

export default function WelcomeNewsletter() {
    const {t} = useTranslation();
    const [mailValue, setMailValue] = useState("");
    const [mailCheck, setMailCheck] = useState(false);
    const [unauthorizedMail, setUnauthorizedMail] = useState(false);
    const [subscribed, setSubscribed] = useState(false);
    const [subscribedError, setSubscribedError] = useState(false);
    const [subscribeInProgress, setSubscribeInProgress] = useState(false);
    const mailChimp = useRef();
    const [reCaptchaValue, setReCaptchaValue] = useState();
    const reCaptcha = useRef();

    function handleNewsletterMail(value) {
        setMailCheck(checkEmailFormat(value, "") && authorizedEmail(value, ""));
        setMailValue(value);
        setUnauthorizedMail(!authorizedEmail(value, ""))
    }

    function subscribeToNewsletter() {
        if (reCaptchaValue !== "") {
            setSubscribeInProgress(true);
            setSubscribedError(false);
            api.subscribeNewsletter(cryptData(mailValue, process.env.REACT_APP_TOKEN_SECRET)).then(result => {
                setSubscribeInProgress(false);
                if (result.status === 200) {
                    api.sendConfirmNewsletterEmail(mailValue);
                    setSubscribed(true);
                } else {
                    setSubscribedError(true);
                }
            });
        }
    }
     function changeEmail(value) {
         handleNewsletterMail(value);
         setSubscribedError(false);
         reCaptcha.current.execute();
     }

    const newsletter = <>
        {
            !subscribed &&
            <>
                <p>{t('welcomePage.newsletter.description')}</p>

                <label className="label-input-mpl">{t('register.stepOne.mail')}</label>
                <div className="d-flex">
                    <input className={("input-mpl input-newsletter") + (mailValue ? " not-empty" : "")}
                           type="mail"
                           value={mailValue}
                           onChange={(e) => changeEmail(e.target.value)}/>
                    {
                        mailCheck && !unauthorizedMail &&
                        <div className={"newsletter-check"}><i className="fas fa-check-circle"/></div>
                    }
                    {
                        unauthorizedMail &&
                        <div className={"newsletter-cross"}><i className="fas fa-times-circle"/></div>
                    }
                    <div id="mc_embed_signup">
                        <form
                            ref={mailChimp}
                            id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form"
                            className="validate">
                            <div id="mc_embed_signup_scroll">
                                <div className="mc-field-group">
                                    <input type="email" value={mailValue} readOnly={true} name="EMAIL"
                                           className="required email d-none"
                                           id="mce-EMAIL"/>
                                </div>
                                <div id="mce-responses" className="clear">
                                    <div className="response d-none" id="mce-error-response"/>
                                    <div className="response d-none" id="mce-success-response"/>
                                </div>
                                <div className="mailChime-hidden" aria-hidden="true">
                                    <input type="text"
                                           name="b_69f0d3bae1957c3d38be8b147_2d537b6db0"
                                           tabIndex="-1"
                                           value=""
                                           readOnly={true}/>
                                </div>
                                <div className="clear">
                                    <input type="submit" value="Subscribe" name="subscribe"
                                           id="mc-embedded-subscribe" className="d-none"/>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                {
                    mailCheck && !unauthorizedMail &&
                    <div id="newsletter-subscribe" className="btn-mpl-primary"
                         onClick={() => subscribeToNewsletter()}>
                        { !subscribeInProgress &&
                            t('confirmEmail.validate')
                        }
                        { subscribeInProgress &&
                            t('welcomePage.newsletter.subscribeInProgress')
                        }
                    </div>
                }
                {
                    subscribedError &&
                    <p className="newsletter-error mt-1">
                        <i className="fas fa-exclamation-triangle"/> {t('welcomePage.newsletter.subscribeError')}
                    </p>
                }
                {
                    unauthorizedMail &&
                    <p className="newsletter-error mt-1">
                        <i className="fas fa-exclamation-triangle"/> {t('register.stepOne.mailErrorUnauthorized')}
                    </p>
                }
            </>
        }
        {
            subscribed &&
            <p>{t('welcomePage.newsletter.thanks')} <i className="fas fa-heart color-pink"/></p>
        }
    </>

    return (
        <Row className={"newsletter-container"}>
            <Col lg={5} className={"text-center newsletter-illustration"}>
                <WomanAndPhoneAnimation/>
            </Col>
            <Col lg={7} className="newsletter-text">
                <ReCAPTCHA
                    ref={reCaptcha}
                    size={"invisible"}
                    onChange={(value) => (setReCaptchaValue(value))}
                    sitekey={process.env.REACT_APP_RECAPTCHA_KEY}
                />
                <h1 className="welcome-simple-section-container-title">{t('welcomePage.newsletter.subscribe')}</h1>
                <div className="welcome-simple-section-container-content text-justify pb-5">
                    {newsletter}
                </div>
            </Col>
        </Row>
    );
}
