import React, {useEffect, useRef, useState} from "react";
import './PopupContact.css'
import Popup from "../Popup/Popup";
import bg from '../../svg/welcome-contact-bg.svg'
import {useTranslation} from "react-i18next";
import {Col, Container, Form, Row} from "react-bootstrap";
import {checkEmailFormat} from "../../utils/form-functions";
import api from "../../utils/api";
import ReCAPTCHA from "react-google-recaptcha";
import MailSentAnimation from "../../animations/MailSentAnimation/MailSentAnimation";

export default function PopupContact(props) {
    const [lastNameValue, setLastNameValue] = useState("");
    const [lastNameAlert, setLastNameAlert] = useState("");

    const [firstNameValue, setFirstNameValue] = useState("");
    const [firstNameAlert, setFirstNameAlert] = useState("");

    const [mailValue, setMailValue] = useState("");
    const [mailAlert, setMailAlert] = useState("");

    const [phoneValue, setPhoneValue] = useState("");

    const [objectValue, setObjectValue] = useState("");
    const [objectAlert, setObjectAlert] = useState("");

    const [subObjectValue, setSubObjectValue] = useState("");
    const [subObjectAlert, setSubObjectAlert] = useState("");

    const [contentValue, setContentValue] = useState("");
    const [contentAlert, setContentAlert] = useState("");

    const [isMailSend, setIsMailSend] = useState(false);
    const [mailError, setMailError] = useState(false);

    const [reCaptchaValue, setReCaptchaValue] = useState();
    const [isSending, setIsSending] = useState(false);

    const {t} = useTranslation();
    const reCaptcha = useRef();

    function getObjectOption() {
        var optionList;
        if (objectValue === 'sponsorship') {
            optionList = ['sponsorShip', 'issue', 'info', 'other']
        } else if (objectValue === 'info') {
            optionList = ['healthbook', 'lifeDoc', 'budget', 'adoption', 'subscription', 'other']
        } else if (objectValue === 'asso') {
            optionList = ['become', 'info', 'other']
        } else if (objectValue === 'subscription') {
            optionList = ['cancel', 'issue', 'longOffer']
        } else if (objectValue === 'bug') {
            optionList = ['healthbook', 'lifeDoc', 'budget', 'adoption', 'other']
        } else if (objectValue === 'media') {
            optionList = ['journalist', 'other']
        } else {
            return
        }

        return optionList.map((item) =>
            <option key={item}
                    value={t('contact.objects.' + objectValue + '.' + item)}>{t('contact.objects.' + objectValue + '.' + item)}</option>
        );
    }

    function checkContactForm(lastNameValue, firstNameValue, mailValue, phoneValue, objectValue, subObjectValue, contentValue) {
        if (!lastNameValue) {
            setLastNameAlert(true)
            return false
        }
        if (!firstNameValue) {
            setFirstNameAlert(true)
            return false
        }
        if (!mailValue) {
            setMailAlert(true)
            return false
        }
        if (!objectValue) {
            setObjectAlert(true)
            return false
        }
        if (!subObjectValue) {
            setSubObjectAlert(objectValue !== 'other')
            return (objectValue === 'other')
        }
        if (!contentValue) {
            setContentAlert(true)
            return false
        }
        return checkEmailFormat(mailValue, "mail-error-format");
    }

    function sendContactForm(lastNameValue, firstNameValue, mailValue, phoneValue, objectValue, subObjectValue, contentValue) {
        if (reCaptchaValue !== "") {
            if (checkContactForm(lastNameValue, firstNameValue, mailValue, phoneValue, objectValue, subObjectValue, contentValue)) {
                setIsSending(true)
                api.sendContactForm(lastNameValue, firstNameValue, mailValue, phoneValue, objectValue, subObjectValue, contentValue).then(result => {
                    if (result.status === 200) {
                        setIsMailSend(true)
                        setIsSending(false)
                    } else {
                        setMailError(true)
                        setIsSending(false)
                    }
                }).catch(e => {
                    setMailError(true)
                    setIsSending(false)
                });
            }
        }
    }

    useEffect(() => {
        if (lastNameValue)
            setLastNameAlert(false)
        if (firstNameValue)
            setFirstNameAlert(false)
        if (mailValue)
            setMailAlert(false)
        if (objectValue)
            setObjectAlert(false)
        if (subObjectValue)
            setSubObjectAlert(false)
        if (contentValue)
            setContentAlert(false)
    }, [lastNameValue, firstNameValue, mailValue, objectValue, subObjectValue, contentValue]);

    const isMobile = () => {
        return (window.innerWidth <= 425)
    }

    const contactContent =
        <div className="popup-contact">
            <Container>
                <ReCAPTCHA
                    ref={reCaptcha}
                    size={"invisible"}
                    onChange={(value) => (setReCaptchaValue(value))}
                    sitekey={process.env.REACT_APP_RECAPTCHA_KEY}
                />
                <img draggable={false} src={bg} className="popup-contact-illustration" alt={'contact'}/>
                <div className="popup-contact-header">
                    <h2 className="color-red mb-4">{t('contact.contactUs')}</h2>
                </div>
                {
                    mailError &&
                    <p className="popup-alert-mail-error"><i
                        className="fas fa-exclamation-triangle mr-1"/> {t('contact.mailError')}</p>
                }
                <div className="popup-contact-body">
                    <Row>
                        <Col lg={6}>
                            <div>
                                <label className="label-input-mpl">{t('contact.lastName')}</label>
                                <input className={("input-mpl w-100") + (lastNameValue ? " not-empty" : "")} type="text"
                                       value={lastNameValue}
                                       onChange={(e) => setLastNameValue(e.target.value)}/>
                                {
                                    lastNameAlert &&
                                    <p className="popup-contact-alert">{t('contact.emptyField')}</p>
                                }
                                {
                                    firstNameAlert && !isMobile() &&
                                    <p className="popup-contact-alert invisible">{t('contact.emptyField')}</p>
                                }
                            </div>
                        </Col>
                        <Col lg={6}>
                            <div>
                                <label className="label-input-mpl">{t('contact.firstName')}</label>
                                <input className={("input-mpl w-100") + (firstNameValue ? " not-empty" : "")}
                                       type="text"
                                       value={firstNameValue}
                                       onChange={(e) => setFirstNameValue(e.target.value)}/>
                                {
                                    firstNameAlert &&
                                    <p className="popup-contact-alert">{t('contact.emptyField')}</p>
                                }
                                {
                                    lastNameAlert && !isMobile() &&
                                    <p className="popup-contact-alert invisible">{t('contact.emptyField')}</p>
                                }
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={6}>
                            <div>
                                <label className="label-input-mpl">{t('contact.email')}</label>
                                <input className={("input-mpl w-100") + (mailValue ? " not-empty" : "")} type="mail"
                                       value={mailValue}
                                       onChange={(e) => setMailValue(e.target.value)}/>
                                <p className="popup-contact-alert"
                                   id="mail-error-format">{t('register.stepOne.mailErrorFormat')}</p>
                                {
                                    mailAlert &&
                                    <p className="popup-contact-alert">{t('contact.emptyField')}</p>
                                }
                            </div>
                        </Col>
                        <Col lg={6}>
                            <div>
                                <label className="label-input-mpl">{t('contact.phone')}</label>
                                <input className={("input-mpl w-100") + (phoneValue ? " not-empty" : "")} type="number"
                                       value={phoneValue}
                                       onChange={(e) => setPhoneValue(e.target.value)}/>
                                {
                                    mailAlert && !isMobile() &&
                                    <p className="popup-contact-alert invisible">{t('contact.emptyField')}</p>
                                }
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={6}>
                            <label className="label-input-mpl">{t('contact.object')}</label>
                            <Form.Control as="select"
                                          className={("input-mpl  w-100") + (objectValue ? " not-empty" : "")}
                                          value={objectValue}
                                          onChange={(e) => setObjectValue(e.target.value)}>
                                <option value="" disabled/>
                                <option value="sponsorship">{t('contact.objects.sponsorship.title')}</option>
                                <option value="info">{t('contact.objects.info.title')}</option>
                                <option value="asso">{t('contact.objects.asso.title')}</option>
                                <option value="subscription">{t('contact.objects.subscription.title')}</option>
                                <option value="bug">{t('contact.objects.bug.title')}</option>
                                <option value="media">{t('contact.objects.media.title')}</option>
                                <option value="other">{t('contact.other')}</option>
                            </Form.Control>
                            {
                                objectAlert &&
                                <p className="popup-contact-alert">{t('contact.emptyField')}</p>
                            }
                        </Col>
                        <Col lg={6}>
                            <label className="label-input-mpl">{t('contact.objects.precisely')}</label>
                            <Form.Control as="select"
                                          className={("input-mpl  w-100") + (subObjectValue ? " not-empty" : "")}
                                          value={subObjectValue}
                                          disabled={(objectValue === 'other') || (objectValue === "")}
                                          onChange={(e) => setSubObjectValue(e.target.value)}>
                                <option value="" disabled/>
                                {
                                    getObjectOption()
                                }
                            </Form.Control>
                            {
                                subObjectAlert &&
                                <p className="popup-contact-alert">{t('contact.emptyField')}</p>
                            }
                        </Col>
                    </Row>
                    <label className="label-input-mpl">{t('contact.message')}</label>
                    <textarea className={("input-mpl w-100") + (contentValue ? " not-empty" : "")}
                              rows="5"
                              value={contentValue}
                              onChange={(e) => {
                                  setContentValue(e.target.value);
                                  reCaptcha.current.execute();
                              }}/>
                    {
                        contentAlert &&
                        <p className="popup-contact-alert">{t('contact.emptyField')}</p>
                    }
                </div>
                <div className="text-center pt-2">
                    <div className="btn-mpl-primary"
                         onClick={() => sendContactForm(lastNameValue, firstNameValue, mailValue, phoneValue, objectValue, subObjectValue, contentValue)}>
                        { !isSending &&
                            t('submit')
                        }
                        { isSending &&
                            t('confirmEmail.sendInProgress')
                        }
                    </div>
                </div>
            </Container>
        </div>

    const mailSendContent = <div className="mail-send-container">
        <p className="mail-send-title">{t('contact.mailSent')}</p>
        <div className="mail-send-illustration">
            <MailSentAnimation/>
        </div>
    </div>

    return (
        <Popup
            content={isMailSend ? mailSendContent : contactContent}
            popupHeight={'fit-content'}
            popupWidth={'60%'}
            onClosed={props.onClosed}/>
    )
}

