import React, {useState} from "react";
import './PopupEditPersonalSection.css'
import Popup from "../../Popup/Popup";
import {Col, Row, Spinner} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import {cryptData, retrievedFromJwt, toDate, toPhoneFormat} from "../../../utils/user-infos";
import PopupEditInput from "../PopupEditInput/PopupEditInput";
import SearchLocationInput from "../../SearchLocationInput/SearchLocationInput";
import api from "../../../utils/api"
import {useAuth} from "../../../context/auth";
import {
    authorizedEmail, authorizedPseudo,
    checkChangePasswordFormat,
    checkEmailFormat,
} from "../../../utils/form-functions";
import {format} from 'date-fns';

let bcrypt = require('bcryptjs');


export default function PopupEditPersonalSection(props) {
    const {t} = useTranslation();
    const {authTokens, setAuthTokens} = useAuth();

    const [pseudoValue, setPseudoValue] = useState(props.user.pseudo);
    const [passwordValue, setPasswordValue] = useState("********");
    const [lastNameValue, setLastNameValue] = useState(props.user.lastName);
    const [firstNameValue, setFirstNameValue] = useState(props.user.firstName);
    const [mailValue, setMailValue] = useState(props.user.email);
    const [phoneValue, setPhoneValue] = useState(props.user.phoneNumber);
    const [addressValue, setAddressValue] = useState(props.user.address);
    const [birthDateValue, setBirthDateValue] = useState(format(new Date(props.user.birthDate), 'yyyy-MM-dd'));

    const [wrongEmail, setWrongEmail] = useState(false);
    const [wrongPseudo, setWrongPseudo] = useState(false);
    const [errorPasswordFormat, setErrorPasswordFormat] = useState(false);
    const [errorEmailFormat, setErrorEmailFormat] = useState(false);
    const [errorEmailAuthorized, setErrorEmailAuthorized] = useState(false);
    const [errorPseudoAuthorized, setErrorPseudoAuthorized] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    function updateUserGlobalInfos() {
        setWrongEmail(false);
        setWrongPseudo(false);
        setErrorPasswordFormat(false);
        setErrorEmailFormat(false);
        setErrorEmailAuthorized(false);
        setErrorPseudoAuthorized(false);
        const salt = bcrypt.genSaltSync(10);
        if (pseudoValue && passwordValue && lastNameValue && firstNameValue && mailValue && phoneValue && addressValue && birthDateValue) {
            if (checkChangePasswordFormat(passwordValue)) {
                if (checkEmailFormat(mailValue, "")) {
                    if (authorizedEmail(mailValue, "")) {
                        if (authorizedPseudo(pseudoValue, "")) {
                            let hash = props.user.password;
                            if (passwordValue !== "********") {
                                hash = bcrypt.hashSync(passwordValue, salt);
                            }
                            const userGlobalUser = {
                                _id: retrievedFromJwt(authTokens)._id,
                                oldName: retrievedFromJwt(authTokens).lastName,
                                firstName: firstNameValue,
                                lastName: lastNameValue,
                                email: mailValue,
                                password: hash,
                                pseudo: pseudoValue,
                                address: addressValue,
                                phoneNumber: phoneValue,
                                birthDate: birthDateValue
                            };
                            setIsLoading(true);
                            api.updateUserGlobalInfos(cryptData(userGlobalUser, process.env.REACT_APP_TOKEN_SECRET), mailValue).then(result => {
                                setIsLoading(false);
                                if (result.status === 200) {
                                    props.onSuccess(true);
                                    props.onClosed(true);
                                    setAuthTokens(result.data.token);
                                } else if (result.status === 201) {
                                    setWrongPseudo(true)
                                } else if (result.status === 202) {
                                    setWrongEmail(true);
                                } else {
                                    props.onFailure(true);
                                    props.onClosed(true);
                                }
                            }).catch(e => {
                                props.onFailure(true);
                                props.onClosed(true);
                            });
                        } else {
                            setIsLoading(false);
                            setErrorPseudoAuthorized(true);
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

    const editPersonalSection =
        <div className="popup-edit-personnal-section">
            <div className="popup-edit-personnal-section-header">
                <h2>{t('profile.update.title')}</h2>
            </div>
            <div className="popup-edit-personnal-section-body">
                <h4 className="section-title">{t('profile.update.contactInformations')}</h4>
                <div className="section-breakline"/>
                <Row className="my-1">
                    <Col lg={6}>
                        <div>
                            <PopupEditInput icon={"fa fa-user"} value={lastNameValue} handleValue={setLastNameValue}
                                            required={true}
                                            inputPlaceholder={t('contact.lastName')}/>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div>
                            <PopupEditInput icon={"fa fa-user"} value={firstNameValue} handleValue={setFirstNameValue}
                                            required={true}
                                            inputPlaceholder={t('contact.firstName')}/>
                        </div>
                    </Col>
                </Row>
                <Row className="my-1">
                    <Col lg={6}>
                        <div>
                            <PopupEditInput icon={"fa fa-user"} value={pseudoValue} handleValue={setPseudoValue}
                                            required={true}
                                            inputPlaceholder={t('register.stepOne.pseudo')}/>
                            {
                                wrongPseudo &&
                                <p className="input-edit-alert">{t('register.stepOne.pseudoErrorExist')}</p>
                            }
                            {
                                errorPseudoAuthorized &&
                                <p className="input-edit-alert">{t('register.stepOne.pseudoErrorUnauthorized')}</p>
                            }
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div>
                            <PopupEditInput icon={"fas fa-lock"} value={passwordValue} handleValue={setPasswordValue}
                                            inputType={"password"}
                                            required={true}
                                            inputPlaceholder={t('register.stepOne.password')}/>
                            {
                                errorPasswordFormat &&
                                <p className="input-edit-alert">{t('register.stepOne.passwordErrorFormat')}</p>
                            }
                        </div>
                    </Col>
                </Row>
                <Row className="my-1">
                    <Col lg={6}>
                        <div>
                            <PopupEditInput icon={"fa fa-envelope"} value={mailValue} handleValue={setMailValue}
                                            required={true}
                                            inputPlaceholder={t('contact.email')}/>
                            {
                                wrongEmail &&
                                <p className="input-edit-alert">{t('register.stepOne.mailErrorExist')}</p>
                            }
                            {
                                errorEmailFormat &&
                                <p className="input-edit-alert">{t('register.stepOne.mailErrorFormat')}</p>
                            }
                            {
                                errorEmailAuthorized &&
                                <p className="input-edit-alert">{t('register.stepOne.mailErrorUnauthorized')}</p>
                            }
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div>
                            <PopupEditInput icon={"fa fa-phone-alt"} value={toPhoneFormat(phoneValue)}
                                            handleValue={setPhoneValue}
                                            inputType={"number"}
                                            required={true}
                                            inputPlaceholder={t('contact.phone')}/>
                        </div>
                    </Col>
                </Row>
                <Row className="my-1">
                    <Col lg={6}>
                        <div>
                            <PopupEditInput icon={"fas fa-birthday-cake input-edit-icon color-gradiant-green"}
                                            value={birthDateValue}
                                            handleValue={setBirthDateValue}
                                            inputType={"date"}
                                            required={true}
                                            inputPlaceholder={""}/>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div>
                            <div className="input-edit-container">
                                <i className={"fas fa-map-marker-alt input-edit-icon color-gradiant-green"}/>
                                <SearchLocationInput value={addressValue}
                                                     className={"input-edit" + (!addressValue ? " input-edit-empty" : "")}
                                                     onChange={setAddressValue}/>
                                {
                                    !addressValue &&
                                    <p className="input-edit-alert">{t('contact.emptyField')}</p>
                                }
                            </div>
                        </div>
                    </Col>
                </Row>
                <div className="text-center my-3">
                    {
                        isLoading &&
                        <Spinner animation="border" variant="danger"/>
                    }
                    {
                        !isLoading &&
                        <div className="btn-mpl-alert" onClick={() => (updateUserGlobalInfos())}>
                            {t('toValidate')}
                        </div>
                    }
                </div>
            </div>
        </div>;

    return (
        <Popup
            content={editPersonalSection}
            popupHeight={'fit-content'}
            popupWidth={'30%'}
            onClosed={props.onClosed}/>
    )
}
