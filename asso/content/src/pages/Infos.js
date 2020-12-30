import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import NavbarTop from "../components/NavbarTop/NavbarTop";
import {cryptData, retrievedFromJwt} from "../utils/user-infos";
import {Row, Col} from "react-bootstrap";
import '../css/Infos.css';
import {useAuth} from "../context/auth";
import SearchLocationInput from "../components/SearchLocationInput/SearchLocationInput";
import {toPhoneFormat} from "../utils/user-infos";
import api from "../utils/api";
import {
    authorizedEmail,
    checkChangePasswordFormat,
    checkEmailFormat,
    checkPhoneFormat
} from "../utils/form-functions";
import Toasts from "../components/Toasts/Toasts";

let bcrypt = require('bcryptjs');

export default function Infos() {

    const {t} = useTranslation();
    const {authTokens, setAuthTokens} = useAuth();

    const assoValue = retrievedFromJwt(authTokens);

    const [nameValue, setNameValue] = useState(assoValue.name ? assoValue.name : "");
    const [addressValue, setAddressValue] = useState(assoValue.address ? assoValue.address : "");
    const [mailValue, setMailValue] = useState(assoValue.email ? assoValue.email : "");
    const [passwordValue, setPasswordValue] = useState("********");
    const [phoneValue, setPhoneValue] = useState(assoValue.phone ? toPhoneFormat(assoValue.phone) : "");
    const [facebookValue, setFacebookValue] = useState(assoValue.facebook ? assoValue.facebook : "");
    const [instagramValue, setInstagramValue] = useState(assoValue.instagram ? assoValue.instagram : "");
    const [twitterValue, setTwitterValue] = useState(assoValue.twitter ? assoValue.twitter : "");

    const [refNameValue, setRefNameValue] = useState(assoValue.referentName ? assoValue.referentName : "");
    const [refRespoValue, setRefRespoValue] = useState(assoValue.referentRespo ? assoValue.referentRespo : "");
    const [refPhoneValue, setRefPhoneValue] = useState(assoValue.referentPhone ? toPhoneFormat(assoValue.referentPhone) : "");
    const [refMailValue, setRefMailValue] = useState(assoValue.referentEmail ? assoValue.referentEmail : "");

    const [partnerContractValue, setPartnerContractValue] = useState(assoValue.partnerContract ? assoValue.partnerContract : "");
    const [kbisValue, setKbisValue] = useState(assoValue.kbis ? assoValue.kbis : "");

    const [showToastEditSuccess, setShowToastEditSuccess] = useState(false);
    const [showToastEditFailure, setShowToastEditFailure] = useState(false);

    const [wrongEmail, setWrongEmail] = useState(false);
    const [errorPasswordFormat, setErrorPasswordFormat] = useState(false);
    const [errorEmailFormat, setErrorEmailFormat] = useState(false);
    const [errorPhoneFormat, setErrorPhoneFormat] = useState(false);
    const [errorRefPhoneFormat, setErrorRefPhoneFormat] = useState(false);
    const [errorEmailAuthorized, setErrorEmailAuthorized] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    function handleChangeToastEditSuccess (state) {
        setShowToastEditSuccess(state);
    }

    function handleChangeToastEditFailure (state) {
        setShowToastEditFailure(state);
    }

    function saveAssoInfos() {
        setWrongEmail(false);
        setErrorPasswordFormat(false);
        setErrorEmailFormat(false);
        setErrorPhoneFormat(false);
        setErrorRefPhoneFormat(false);
        setErrorEmailAuthorized(false);
        const salt = bcrypt.genSaltSync(10);
        if (passwordValue && mailValue && phoneValue && addressValue && refMailValue && refPhoneValue && refRespoValue && refNameValue) {
            setIsLoading(true);
            if (checkChangePasswordFormat(passwordValue)) {
                if (checkEmailFormat(mailValue, "")) {
                    if (authorizedEmail(mailValue, "")) {
                        if (checkPhoneFormat(phoneValue, "")) {
                            if (checkPhoneFormat(refPhoneValue, "")) {
                                let hash = assoValue.password;
                                if (passwordValue !== "********") {
                                    hash = bcrypt.hashSync(passwordValue, salt);
                                }
                                const asso = {
                                    _id: assoValue._id,
                                    name: nameValue,
                                    password: hash,
                                    address: addressValue['formatted_address'],
                                    email: mailValue,
                                    phone: phoneValue,
                                    facebook: facebookValue,
                                    instagram: instagramValue,
                                    twitter: twitterValue,
                                    referentName: refNameValue,
                                    referentRespo: refRespoValue,
                                    referentPhone: refPhoneValue,
                                    referentEmail: refMailValue,
                                    partnerContract: partnerContractValue,
                                    kbis: kbisValue
                                };

                                api.updateAsso(cryptData(asso, process.env.REACT_APP_TOKEN_SECRET), mailValue).then(result => {
                                    setIsLoading(false);
                                    if (result.status === 200) {
                                        setShowToastEditSuccess(true);
                                        setAuthTokens(result.data.token);
                                    } else {
                                        setShowToastEditFailure(true);
                                    }
                                })
                            } else {
                                setIsLoading(false);
                                setErrorRefPhoneFormat(true);
                            }
                        } else {
                            setIsLoading(false);
                            setErrorPhoneFormat(true);
                        }
                    } else {
                        setIsLoading(false);
                        setErrorEmailAuthorized(true);
                    }
                } else {
                    setIsLoading(false);
                    setErrorEmailFormat(true);
                }
            } else {
                setIsLoading(false);
                setErrorPasswordFormat(true);
            }
        }
    }

    function handleChangeAddress(newAddress) {
        setAddressValue(newAddress);
    }

    return (
        <>
            <NavbarTop/>
            <div className="full-page-w-nav background-page">
                <div className="infos-container">
                    <Row>
                        <Col lg={4}>
                            <div className="infos-title">
                                <span className="font-2 color-dark">{t('infos.association')}</span>
                            </div>
                            <div className="infos-content">
                                <label className="label-input-mpl">{t('infos.name')}</label>
                                <input className="input-mpl w-100"
                                       type="text"
                                       value={nameValue}
                                       onChange={(e) => setNameValue(e.target.value)}/>
                                {
                                    !nameValue &&
                                    <p className="input-edit-alert">{t('errors.emptyError')}</p>
                                }

                                <label className="label-input-mpl">{t('infos.address')}</label>
                                <SearchLocationInput value={addressValue} className={"input-mpl"}
                                                     onChange={handleChangeAddress}/>
                                {
                                    !addressValue &&
                                    <p className="input-edit-alert">{t('errors.emptyError')}</p>
                                }

                                <label className="label-input-mpl">{t('infos.mail')}</label>
                                <input className="input-mpl w-100"
                                       type="mail"
                                       value={mailValue}
                                       onChange={(e) => setMailValue(e.target.value)}/>
                                {
                                    !mailValue &&
                                    <p className="input-edit-alert">{t('errors.emptyError')}</p>
                                }
                                {
                                    wrongEmail &&
                                    <p className="input-edit-alert">{t('errors.mailErrorExist')}</p>
                                }
                                {
                                    errorEmailFormat &&
                                    <p className="input-edit-alert">{t('errors.mailErrorFormat')}</p>
                                }
                                {
                                    errorEmailAuthorized &&
                                    <p className="input-edit-alert">{t('errors.mailErrorUnauthorized')}</p>
                                }

                                <label className="label-input-mpl">{t('infos.password')}</label>
                                <input className="input-mpl w-100"
                                       type="mail"
                                       value={passwordValue}
                                       onChange={(e) => setPasswordValue(e.target.value)}/>
                                {
                                    !passwordValue &&
                                    <p className="input-edit-alert">{t('errors.emptyError')}</p>
                                }
                                {
                                    errorPasswordFormat &&
                                    <p className="input-edit-alert">{t('errors.passwordErrorFormat')}</p>
                                }

                                <label className="label-input-mpl">{t('infos.phone')}</label>
                                <input className="input-mpl w-100"
                                       type="number"
                                       value={phoneValue}
                                       onChange={(e) => setPhoneValue(e.target.value)}/>
                                {
                                    !phoneValue &&
                                    <p className="input-edit-alert">{t('errors.emptyError')}</p>
                                }
                                {
                                    errorPhoneFormat &&
                                    <p className="input-edit-alert">{t('errors.phoneErrorFormat')}</p>
                                }

                                <label className="label-input-mpl">{t('infos.facebook')}</label>
                                <input className="input-mpl w-100"
                                       type="text"
                                       value={facebookValue}
                                       onChange={(e) => setFacebookValue(e.target.value)}/>

                                <label className="label-input-mpl">{t('infos.instagram')}</label>
                                <input className="input-mpl w-100"
                                       type="text"
                                       value={instagramValue}
                                       onChange={(e) => setInstagramValue(e.target.value)}/>

                                <label className="label-input-mpl">{t('infos.twitter')}</label>
                                <input className="input-mpl w-100"
                                       type="text"
                                       value={twitterValue}
                                       onChange={(e) => setTwitterValue(e.target.value)}/>
                            </div>
                        </Col>
                        <Col lg={4}>
                            <div className="infos-title">
                                <span className="font-2 color-dark">{t('infos.ref')}</span>
                            </div>
                            <div className="infos-content">
                                <label className="label-input-mpl">{t('infos.refName')}</label>
                                <input className="input-mpl w-100"
                                       type="text"
                                       value={refNameValue}
                                       onChange={(e) => setRefNameValue(e.target.value)}/>
                                {
                                    !refNameValue &&
                                    <p className="input-edit-alert">{t('errors.emptyError')}</p>
                                }

                                <label className="label-input-mpl">{t('infos.respo')}</label>
                                <input className="input-mpl w-100"
                                       type="text"
                                       value={refRespoValue}
                                       onChange={(e) => setRefRespoValue(e.target.value)}/>
                                {
                                    !refRespoValue &&
                                    <p className="input-edit-alert">{t('errors.emptyError')}</p>
                                }

                                <label className="label-input-mpl">{t('infos.refPhone')}</label>
                                <input className="input-mpl w-100"
                                       type="number"
                                       value={refPhoneValue}
                                       onChange={(e) => setRefPhoneValue(e.target.value)}/>
                                {
                                    !refPhoneValue &&
                                    <p className="input-edit-alert">{t('errors.emptyError')}</p>
                                }
                                {
                                    errorRefPhoneFormat &&
                                    <p className="input-edit-alert">{t('errors.phoneErrorFormat')}</p>
                                }

                                <label className="label-input-mpl">{t('infos.refMail')}</label>
                                <input className="input-mpl w-100"
                                       type="mail"
                                       value={refMailValue}
                                       onChange={(e) => setRefMailValue(e.target.value)}/>
                                {
                                    !refMailValue &&
                                    <p className="input-edit-alert">{t('errors.emptyError')}</p>
                                }
                            </div>
                        </Col>
                        <Col lg={4}>
                            <div className="infos-row" >
                                <div className="infos-title w-100">
                                    <span className="font-2 color-dark">{t('infos.doc')}</span>
                                </div>
                                <div className="infos-content">
                                    <label className="label-input-mpl">{t('infos.kbis')}</label>
                                    <input className="input-mpl w-100"
                                           type="text"
                                           value={kbisValue}
                                           onChange={(e) => setKbisValue(e.target.value)}/>

                                    <label className="label-input-mpl">{t('infos.partnerContract')}</label>
                                    <input className="input-mpl w-100"
                                           type="text"
                                           value={partnerContractValue}
                                           onChange={(e) => setPartnerContractValue(e.target.value)}/>
                                </div>
                            </div>
                            <div className="infos-row">
                                <div className="infos-title w-100">
                                    <span className="font-2 color-dark">{t('infos.invoice')}</span>
                                </div>
                                <div className="infos-content w-100 infos-small-content">
                                    <p className="input-mpl w-100 infos-invoice">Facture 10/20 : 17,50€</p>
                                    <p className="input-mpl w-100 infos-invoice">Facture 11/20 : 17,50€</p>
                                </div>
                            </div>
                            <div className="infos-row">
                                <div className="btn-mpl-primary infos-btn">
                                <span className="font-2 color-dark" onClick={() => (saveAssoInfos())}>
                                    {!isLoading &&
                                    t('infos.save')
                                    }
                                    {isLoading &&
                                    t('infos.saveInProgress')
                                    }
                                </span>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
            <Toasts onChangeSuccess={handleChangeToastEditSuccess} showSuccess={showToastEditSuccess} successTitle={t('toaster.updateSuccessTitle')}
                    successTime={t('toaster.justNow')} successContent={t('toaster.updateSuccess')}
                    onChangeFailure={handleChangeToastEditFailure} showFailure={showToastEditFailure} failureTitle={t('toaster.updateFailureTitle')}
                    failureTime={t('toaster.justNow')} failureContent={t('toaster.updateFailure')}
            />
        </>
    );
}
