import React, {useContext, useState} from "react";
import './RegisterPage.css';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import logo_title from '../../svg/logo-title.svg'
import {Form, Image} from "react-bootstrap";
import RegisterStepTwoAnimation from "../../animations/RegisterStepTwoAnimation/RegisterStepTwoAnimation";
import 'react-day-picker/lib/style.css';
import WomanAndPhoneAnimation from "../../animations/WomanAndPhoneAnimation/WomanAndPhoneAnimation";
import dog from "../../svg/icon-dog.svg";
import cat from "../../svg/icon-cat.svg";
import nac from "../../svg/icon-nac.svg";
import racesList from "../../utils/races";
import '../CustomDatePicker/CustomDatePicker.css';

import {
    authorizedEmail, authorizedPseudo, checkEmailExist,
    checkEmailFormat,
    checkEmpty, checkPasswordFormat, checkPseudoExist,
    showPassword, checkPhoneFormat, checkDateFormat, isSmallMobile
} from "../../utils/form-functions";

import { useTranslation } from "react-i18next";
import LanguageRegisterSelector from "../LanguageRegisterSelector/LanguageRegisterSelector";
import GlobalState from "../GlobalState/GlobalState";

import CustomDatePicker from "../CustomDatePicker/CustomDatePicker";
import SearchLocationInput from "../SearchLocationInput/SearchLocationInput";
import CustomPetAnimation from "../../animations/CustomPetAnimation/CustomPetAnimation";
import petColorList from "../../utils/pet-color";
import AllPetAnimation from "../../animations/AllPetAnimation/AllPetAnimation";

import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

export default function RegisterPage() {
    const {t} = useTranslation();
    const globalState = useContext(GlobalState);

    const [step, setStep] = useState(1);
    const [registerIsCompleted] = useState(false);
    const [mailValue, setMailValue] = useState("");
    const [pseudoValue, setPseudoValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");
    const [cguValue, setCguValue] = useState(true);
    const [newsletterValue, setNewsletterValue] = useState(true);

    const [firstNameValue, setFirstNameValue] = useState("");
    const [lastNameValue, setLastNameValue] = useState("");
    const [birthDateValue, setBirthDateValue] = useState("");
    const [sexValue, setSexValue] = useState(true);
    const [phoneValue, setPhoneValue] = useState("");
    const [addressValue, setAddressValue] = useState("");

    const [havePet, setHavePet] = useState(null);
    const [petNumber, setPetNumber] = useState(1);
    const [petCount, setPetCount] = useState(0);

    const [specieValue, setSpecieValue] = useState({0: "", 1: "", 2: "", 3: ""});
    const [petNameValue, setPetNameValue] = useState({0: "", 1: "", 2: "", 3: ""});
    const [raceValue, setRaceValue] = useState({0: "", 1: "", 2: "", 3: ""});
    const [robeValue, setRobeValue] = useState({0: "", 1: "", 2: "", 3: ""});
    const [petBirthDate, setPetBirthDate] = useState({0: "", 1: "", 2: "", 3: ""});
    const [petSex, setPetSex] = useState({0: false, 1: false, 2: false, 3: false});
    const [petWeight, setPetWeight] = useState({0: "", 1: "", 2: "", 3: ""});
    const [petWeightUnit, setPetWeightUnit] = useState({0: "kg", 1: "kg", 2: "kg", 3: "kg"});
    const [petDescription, setPetDescription] = useState({0: "", 1: "", 2: "", 3: ""});

    function haveSpecies(specieName) {
        for (let i = 0; i < 4; i++) {
            if (specieValue[i] === specieName) {
                return true;
            }
        }
        return false;
    }

    function handleChangePetDate(newBirthDate) {
        setPetBirthDate({...birthDateValue, [petCount]: newBirthDate});
    }

    function handleStep3() {
        goToStep3(firstNameValue, lastNameValue, birthDateValue, phoneValue, addressValue);
    }

    function handleChangeAddress(newAddress) {
        setAddressValue(newAddress);
    }

    function changeCguValue() {
        document.getElementById("check-cgu").checked = !document.getElementById("check-cgu").checked;
        setCguValue(!cguValue);
    }

    function changeNewsletterValue() {
        document.getElementById("check-newsletter").checked = !document.getElementById("check-newsletter").checked;
        setNewsletterValue(!newsletterValue);
    }

    function goToStep2(mail, pseudo, password, cgu) {
        if (checkEmpty(mail, "mail-error-empty")) {
            if (checkEmailFormat(mail, "mail-error-format")) {
                if (authorizedEmail(mail, "mail-error-unauthorized")) {
                    if (checkEmpty(pseudo, "pseudo-error-empty")) {
                        if (authorizedPseudo(pseudo, "pseudo-error-unauthorized")) {
                            if (checkPasswordFormat(password, "password-error-format")) {
                                if (cgu) {
                                    document.getElementById("cgu-error").style.display = 'block';
                                } else {
                                    document.getElementById("cgu-error").style.display = 'none';
                                    checkEmailExist(mail, "mail-error-exist").then(mail_result => {
                                        if (mail_result === false) {
                                            checkPseudoExist(pseudo, "pseudo-error-exist").then(pseudo_result => {
                                                if (pseudo_result === false) {
                                                    setStep(2);
                                                }
                                            });
                                        }
                                    });
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    function goToStep3(firstname, lastname, birthdate, phone, department) {
        if (checkEmpty(firstname, "firstname-error-empty")) {
            if (checkEmpty(lastname, "lastname-error-empty")) {
                if (checkEmpty(birthdate, "birthdate-error-format")) {
                    if (checkPhoneFormat(phone, "phone-error-format")) {
                        if (checkEmpty(department, "address-error-format")) {
                            setStep(3);
                        }
                    }
                }
            }
        }
    }

    function passStep3() {
        setStep(4);
    }

    function goToPetInfo() {
        if (checkEmpty(havePet, "have-pet-error-empty")) {
            if (havePet === true) {
                setStep(3.1);
            } else {
                setStep(4);
            }
        }
    }

    function goToPetInfoBis() {
        if (checkEmpty(specieValue[petCount], "specie-error-empty")) {
            if (checkEmpty(petNameValue[petCount], "pet-name-error-empty")) {
                if (checkEmpty(raceValue[petCount], "race-error-empty")) {
                    if (checkEmpty(robeValue[petCount], "robe-error-empty")) {
                        setStep(3.2);
                    }
                }
            }
        }
    }

    function goToStep4(petCount) {
        if (checkDateFormat(petBirthDate[petCount - 1], "pet-birthdate-error-format")) {
            setPetCount(petCount);
            if (petCount < petNumber) {
                setStep(3.1);
            } else {
                setStep(4);
            }
        }
    }

    return (
        <>
            {
                (!registerIsCompleted && step === 1) &&
                <>
                    <Row className="full-page-w-nav mx-0">
                        <Col lg={5} className="px-5">
                            <div className="col-right-container">
                                <div>
                                    <div className="register-logo-container">
                                        <Image draggable={false} src={logo_title} className="register-logo" />
                                        <h1 className="register-main-title">{t('register.stepOne.createAccount')}</h1>
                                    </div>
                                    <div className="register-form-container">
                                        <h2 className="register-subtitle">{t('register.stepOne.totallyFree')}</h2>
                                        <LanguageRegisterSelector />

                                        <label className="label-input-mpl">{t('register.stepOne.mail')}</label>
                                        <input className={("input-mpl") + (mailValue ? " not-empty" : "")} type="mail"
                                               value={mailValue}
                                               onChange={(e) => setMailValue(e.target.value)}
                                               onKeyDown={(e) => e.keyCode === 13 ? document.getElementById("pseudo-input").focus() : null}
                                        />
                                        <small className="register-error-label"
                                            id="mail-error-empty">{t('register.stepOne.mailErrorEmpty')}</small>
                                        <small className="register-error-label"
                                            id="mail-error-format">{t('register.stepOne.mailErrorFormat')}</small>
                                        <small className="register-error-label"
                                            id="mail-error-exist">{t('register.stepOne.mailErrorExist')}</small>
                                        <small className="register-error-label"
                                            id="mail-error-unauthorized">{t('register.stepOne.mailErrorUnauthorized')}</small>

                                        <label className="label-input-mpl">{t('register.stepOne.pseudo')}</label>
                                        <input className={("input-mpl") + (pseudoValue ? " not-empty" : "")} type="text"
                                               value={pseudoValue}
                                               id="pseudo-input"
                                               onChange={(e) => setPseudoValue(e.target.value)}
                                               onKeyDown={(e) => e.keyCode === 13 ? document.getElementById("password-input").focus() : null}
                                        />
                                        <small className="register-error-label"
                                            id="pseudo-error-empty">{t('register.stepOne.pseudoErrorEmpty')}</small>
                                        <small className="register-error-label"
                                            id="pseudo-error-exist">{t('register.stepOne.pseudoErrorExist')}</small>
                                        <small className="register-error-label"
                                            id="pseudo-error-unauthorized">{t('register.stepOne.pseudoErrorUnauthorized')}</small>

                                        <label className="label-input-mpl">{t('register.stepOne.password')}</label>
                                        <input className={("input-mpl") + (passwordValue ? " not-empty" : "")}
                                               id="password-input"
                                               type="password"
                                               value={passwordValue}
                                               autoComplete="new-password"
                                               onChange={(e) => setPasswordValue(e.target.value)}
                                               onKeyDown={(e) => e.keyCode === 13 ? goToStep2(mailValue, pseudoValue, passwordValue, cguValue) : null}
                                        />
                                        <button className="btn show-password" onClick={() => {
                                            showPassword("password-input")
                                        }}><i className="fas fa-eye-slash"/></button>
                                        <small className="register-error-label"
                                               id="password-error-format">{t('register.stepOne.passwordErrorFormat')}</small>

                                        <div className="checkbox-container">
                                            <input type="checkbox" id="check-newsletter" className="register-checkbox"
                                                   value={newsletterValue}/>
                                            <span className="checkmark"
                                                  onClick={() => (changeNewsletterValue())}/>
                                            <label className="checkbox-label"
                                                   onClick={() => (changeNewsletterValue())}>{t('register.stepOne.acceptNewsletter')}</label>
                                        </div>

                                        <div className="checkbox-container">
                                            <input type="checkbox" id="check-cgu" className="register-checkbox"
                                                   value={cguValue}/>
                                            <span className="checkmark" onClick={() => (changeCguValue())}/>
                                            <label className="checkbox-label"
                                                   onClick={() => (changeCguValue())}>{t('register.stepOne.acceptCgu')}. <span
                                                className="font-weight-bold link"
                                                onClick={() => globalState.setShowPopupCgu(true)}>{t('register.stepOne.readCgu')}.</span></label>
                                            <small className="register-error-label"
                                                id="cgu-error">{t('register.stepOne.cguError')}</small>
                                        </div>

                                        <button className="mt-3 btn-mpl-primary"
                                            onClick={() => (goToStep2(mailValue, pseudoValue, passwordValue, cguValue))}>{t('register.stepOne.register')}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col className="register-illustration" lg={7}>
                            <WomanAndPhoneAnimation/>
                        </Col>
                    </Row>
                </>
            }
            {
                (!registerIsCompleted && step === 2) &&
                <>
                    <Row className="full-page-w-nav mx-0">
                        <Col lg={5} className="px-5">
                            <div className="col-right-container">
                                <div>
                                    <span className="link" onClick={() => (setStep(1))}><i
                                        className="fa fa-chevron-circle-left fa-2x color-green"/></span>
                                    <div className="register-logo-container">
                                        <Image draggable={false} src={logo_title} className="register-logo"/>
                                        <h1 className="register-main-title">{t('register.stepTwo.personalInformation')}</h1>
                                    </div>

                                    <div className="register-form-container">
                                        <h2 className="register-subtitle">{t('register.stepTwo.noDiffusion')}</h2>
                                        <label className="label-input-mpl">{t('register.stepTwo.firstName')}</label>
                                        <input className={("input-mpl") + (firstNameValue ? " not-empty" : "")}
                                               type="text"
                                               value={firstNameValue}
                                               onChange={(e) => setFirstNameValue(e.target.value)}
                                               onKeyDown={(e) => e.keyCode === 13 ? document.getElementById("lastName-input").focus() : null}
                                        />
                                        <small className="register-error-label"
                                               id="firstname-error-empty">{t('register.stepTwo.firstNameErrorEmpty')}</small>

                                        <label className="label-input-mpl">{t('register.stepTwo.lastName')}</label>
                                        <input className={("input-mpl") + (lastNameValue ? " not-empty" : "")}
                                               id="lastName-input"
                                               type="text"
                                               value={lastNameValue}
                                               onChange={(e) => setLastNameValue(e.target.value)}
                                               onKeyDown={(e) => e.keyCode === 13 ? document.getElementById("date-input").focus() : null}
                                        />
                                        <small className="register-error-label"
                                               id="lastname-error-empty">{t('register.stepTwo.lastNameErrorEmpty')}</small>

                                        <label className="label-input-mpl">{t('register.stepTwo.birthDate')}</label>
                                        <input id="date-input" className={("input-mpl") + (birthDateValue ? " not-empty" : "")}
                                               type="date"
                                               value={birthDateValue}
                                               onChange={(e) => setBirthDateValue(e.target.value)}
                                               onKeyDown={(e) => e.keyCode === 13 ? document.getElementById("phone-input").focus() : null}/>
                                        <small className="register-error-label"
                                               id="birthdate-error-format">{t('register.stepTwo.birthDateErrorEmpty')}</small>

                                        <label className="label-input-mpl">{t('register.stepTwo.sex')}</label>
                                        <div className="sex-input">
                                            <span className="mr-2 font-2 color-dark">{t('register.stepTwo.male')}</span>
                                            <label className="switch">
                                                <input type="checkbox"/>
                                                <span className="slider round"
                                                      onClick={() => (setSexValue(!sexValue))}/>
                                            </label>
                                            <span
                                                className="ml-2 font-2 color-dark">{t('register.stepTwo.female')}</span>
                                        </div>

                                        <label className="label-input-mpl">{t('register.stepTwo.phone')}</label>
                                        <PhoneInput
                                            country={'fr'}
                                            value={phoneValue}
                                            onKeyDown={(e) => e.keyCode === 13 ? document.getElementById("address-input").focus() : null}
                                            onChange={phone => setPhoneValue(phone)}
                                            regions={'europe'}
                                            placeholder={" "}
                                            containerStyle={isSmallMobile() ? {width:"100%", lineHeight: "1.8rem", margin:"auto"}:{width:"70%", lineHeight: "1.8rem", margin:"auto"}}
                                            inputClass={"input-mpl"}
                                            inputProps={{id:'phone-input'}}
                                            inputStyle={ phoneValue ? {width:"100%", lineHeight: "1.8rem", border:"solid 1.5px #13E2BA", backgroundColor:"#fff"} : {width:"100%", lineHeight: "1.8rem", border:"none", backgroundColor:"#F2F2F2"}}
                                            buttonStyle = { phoneValue ? {border:"solid 1.5px #13E2BA", backgroundColor:"#fff", textAlign: "left"} : {border:"none", backgroundColor:"#F2F2F2", textAlign: "left"}}
                                        />
                                        <small className="register-error-label"
                                               id="phone-error-format">{t('register.stepTwo.phoneErrorFormat')}</small>

                                        <label className="label-input-mpl">{t('register.stepTwo.address')}</label>
                                        <SearchLocationInput value={addressValue} className={"input-mpl"} onChange={handleChangeAddress}
                                                             onKeyDown={handleStep3}
                                        />
                                        <small className="register-error-label"
                                               id="address-error-format">{t('register.stepTwo.addressErrorFormat')}</small>
                                        <br/>

                                        <button className="mt-3 google-margin-bottom btn-mpl-primary"
                                                onClick={() => (goToStep3(firstNameValue, lastNameValue, birthDateValue, phoneValue, addressValue))}>{t('register.stepTwo.nextStep')}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col className="register-illustration" lg={7}>
                            <RegisterStepTwoAnimation address={addressValue} phone={phoneValue} name={firstNameValue}
                                                      date={birthDateValue}/>
                        </Col>
                    </Row>
                </>
            }
            {
                (!registerIsCompleted && step === 3) &&
                <>
                    <Row className="full-page-w-nav mx-0">
                        <Col lg={5} className="px-5">
                            <div className="col-right-container">
                                <div>
                                    <span className="link" onClick={() => setStep(2)}><i
                                        className="fa fa-chevron-circle-left fa-2x color-green"/></span>
                                    <div className="register-logo-container">
                                        <Image draggable={false} src={logo_title} className="register-logo"/>
                                        <h1 className="register-main-title">{t('register.stepThree.title')}</h1>
                                    </div>

                                    <div className="register-form-container">
                                        <h2 className="register-subtitle">{t('register.stepThree.subtitle')}</h2>
                                        <label
                                            className="label-input-mpl mb-2">{t('register.stepThree.oneOrManyQuestion')}</label>
                                        <div className="choice-container">
                                            <Col className="pl-0">
                                                <div
                                                    className={("input-mpl link icon-choice ") + (havePet === true ? "not-empty" : "")}
                                                    onClick={() => (setHavePet(true))}>
                                                    <i className="fas fa-check-circle color-green mr-3"/><span
                                                    className="color-dark">{t('yes')}</span>
                                                </div>
                                            </Col>
                                            <Col className="pr-0">
                                                <div
                                                    className={("input-mpl link icon-choice ") + (havePet === false ? "not-empty" : "")}
                                                    onClick={() => (setHavePet(false))}>
                                                    <i className="fas fa-times-circle color-green mr-3"/><span
                                                    className="color-dark">{t('no')}</span>
                                                </div>
                                            </Col>
                                        </div>
                                        <small className="register-error-label"
                                               id="have-pet-error-empty">{t('register.stepThree.oneOrManyError')}</small>
                                        {havePet &&
                                        <>
                                            <label
                                                className="label-input-mpl mb-2">{t('register.stepThree.howMany')}</label>
                                            <br/>
                                            <div className="choice-container">
                                                <Col className="pl-0">
                                                    <div
                                                        className={("input-mpl link icon-choice text-center p-0 ") + (petNumber === 1 ? "not-empty" : "")}
                                                        onClick={() => (setPetNumber(1))}>
                                                        <span className="color-dark">1</span>
                                                    </div>
                                                </Col>
                                                <Col>
                                                    <div
                                                        className={("input-mpl link icon-choice text-center p-0 ") + (petNumber === 2 ? "not-empty" : "")}
                                                        onClick={() => (setPetNumber(2))}>
                                                        <span className="color-dark">2</span>
                                                    </div>
                                                </Col>
                                                <Col>
                                                    <div
                                                        className={("input-mpl link icon-choice text-center p-0 ") + (petNumber === 3 ? "not-empty" : "")}
                                                        onClick={() => (setPetNumber(3))}>
                                                        <span className="color-dark">3</span>
                                                    </div>
                                                </Col>
                                                <Col className="pr-0">
                                                    <div
                                                        className={("input-mpl link icon-choice text-center p-0 ") + (petNumber === 4 ? "not-empty" : "")}
                                                        onClick={() => (setPetNumber(4))}>
                                                        <span className="color-dark">4</span>
                                                    </div>
                                                </Col>
                                            </div>
                                        </>
                                        }
                                        <button className="mt-3 btn-mpl-primary"
                                                onClick={() => (goToPetInfo())}>{t('register.stepThree.continue')}
                                        </button>
                                        <div className="under-button-link"
                                             onClick={() => (passStep3())}>{t('register.stepThree.pass')}</div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col className="register-illustration" lg={7}>
                            <AllPetAnimation/>
                        </Col>
                    </Row>
                </>
            }
            {
                (!registerIsCompleted && step === 3.1) &&
                <>
                    <Row className="full-page-w-nav mx-0">
                        <Col lg={5} className="px-5">
                            <div className="col-right-container">
                                <div>
                                <span className="link"
                                      onClick={() => (petCount === 0 ? setStep(3) : (setPetCount(petCount - 1), setStep(3.2)))}>
                                    <i className="fa fa-chevron-circle-left fa-2x color-green"/>
                                </span>
                                    <div className="register-logo-container">
                                        <Image draggable={false} src={logo_title} className="register-logo"/>
                                        <h1 className="register-main-title">{t('register.stepThree.title')}</h1>
                                    </div>

                                    <div className="register-form-container">
                                        <h2 className="register-subtitle">{t('register.stepThree.subtitle')}</h2>
                                        <label className="label-input-mpl">
                                            {petCount === 0 ? t('register.stepThree.firstPet') : petCount === 1 ? t('register.stepThree.secondPet') : petCount === 2 ? t('register.stepThree.thirdPet') : t('register.stepThree.fourthPet')}
                                        </label>
                                        <div className="choice-container">
                                            <Col className="p-0">
                                                <div
                                                    className={("pl-1 input-mpl link align-items-center icon-choice ") + (specieValue[petCount] === "dog" ? "not-empty" : "")}
                                                    onClick={() => (setSpecieValue({
                                                        ...specieValue,
                                                        [petCount]: "dog"
                                                    }))}>
                                                    <Image draggable={false} src={dog} className="mr-2 ml-1 mb-1"/>
                                                    <small className="color-dark">{t('register.stepThree.dog')}</small>
                                                </div>
                                            </Col>
                                            <Col>
                                                <div
                                                    className={("pl-1 input-mpl link icon-choice ") + (specieValue[petCount] === "cat" ? "not-empty" : "")}
                                                    onClick={() => (setSpecieValue({
                                                        ...specieValue,
                                                        [petCount]: "cat"
                                                    }))}>
                                                    <Image draggable={false} src={cat} className="mr-2 ml-1 mb-1"/>
                                                    <small className="color-dark">{t('register.stepThree.cat')}</small>
                                                </div>
                                            </Col>
                                            <Col className="p-0">
                                                <div
                                                    className={("pl-1 input-mpl nac-choice link icon-choice ") + (specieValue[petCount] === "nac" ? "not-empty" : "")}
                                                    onClick={() => (setSpecieValue({
                                                        ...specieValue,
                                                        [petCount]: "nac"
                                                    }))}>
                                                    <Image draggable={false} src={nac} className="mr-2 ml-1 mb-1"/>
                                                    <small className="color-dark">{t('register.stepThree.nac')}</small>
                                                </div>
                                            </Col>
                                        </div>
                                        <small className="register-error-label"
                                               id="specie-error-empty">{t('register.stepThree.oneOrManyError')}</small>

                                        <label className="label-input-mpl">{t('register.stepThree.petName')}</label>
                                        <input className={("input-mpl") + (petNameValue[petCount] ? " not-empty" : "")}
                                               type="text"
                                               value={petNameValue[petCount]}
                                               onChange={(e) => setPetNameValue({
                                                   ...specieValue,
                                                   [petCount]: e.target.value
                                               })}/>
                                        <small className="register-error-label"
                                               id="pet-name-error-empty">{t('register.stepThree.petNameErrorEmpty')}</small>

                                        <label className="label-input-mpl">{t('register.stepThree.race')}</label>
                                        <Form.Control as="select"
                                                      className={("input-mpl m-auto ") + (raceValue[petCount] ? " not-empty" : "")}
                                                      value={raceValue[petCount]}
                                                      onChange={(e) => setRaceValue({
                                                          ...raceValue,
                                                          [petCount]: e.target.value
                                                      })}>
                                            <option key={0} value={""} disabled/>
                                            {specieValue[petCount] === "" &&
                                            <option key={1} value={""}
                                                    disabled>{t('register.stepThree.speciesDefault')}</option>
                                            }
                                            {specieValue[petCount] !== "" &&
                                            racesList[specieValue[petCount]].map((item, i) =>
                                                <option key={i}
                                                        value={item}>{t("pets:races." + specieValue[petCount] + "." + item)}</option>
                                            )
                                            }
                                        </Form.Control>
                                        <small className="register-error-label"
                                               id="race-error-empty">{t('register.stepThree.raceErrorEmpty')}</small>

                                        <label className="label-input-mpl">{t('register.stepThree.color')}</label>
                                        <Form.Control as="select"
                                                      className={("input-mpl m-auto ") + (robeValue[petCount] ? " not-empty" : "")}
                                                      value={robeValue[petCount]}
                                                      onChange={(e) => setRobeValue({
                                                          ...robeValue,
                                                          [petCount]: e.target.value
                                                      })}>
                                            <option key={0} value={""} disabled/>
                                            {specieValue[petCount] === "" &&
                                            <option key={1} value={""}
                                                    disabled>{t('register.stepThree.colorDefault')}</option>
                                            }
                                            {specieValue[petCount] !== "" &&
                                            petColorList.map((item, i) =>
                                                <option key={i} value={item}>{t("pets:color." + item)}</option>
                                            )
                                            }
                                        </Form.Control>
                                        <small className="register-error-label"
                                               id="robe-error-empty">{t('register.stepThree.colorErrorEmpty')}</small>

                                        <br/>
                                        <button className="mt-3 btn-mpl-primary"
                                                onClick={() => (goToPetInfoBis())}>{t('register.stepThree.continue')}
                                        </button>
                                        <div className="under-button-link"
                                             onClick={() => (passStep3())}>{t('register.stepThree.pass')}</div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col className="register-illustration" lg={7}>
                            <CustomPetAnimation nac={haveSpecies("nac")} dog={haveSpecies("dog")}
                                                cat={haveSpecies("cat")}/>
                        </Col>
                    </Row>
                </>
            }
            {
                (!registerIsCompleted && step === 3.2) &&
                <>
                    <Row className="full-page-w-nav mx-0">
                        <Col lg={5} className="px-5">
                            <div className="col-right-container">
                                <div>
                                    <span className="link" onClick={() => (setStep(3.1))}><i
                                        className="fa fa-chevron-circle-left fa-2x color-green"/></span>
                                    <div className="register-logo-container">
                                        <Image draggable={false} src={logo_title} className="register-logo"/>
                                        <h1 className="register-main-title">{t('register.stepThree.title')}</h1>
                                    </div>

                                    <div className="register-form-container">
                                        <h2 className="register-subtitle">{t('register.stepThree.subtitle')}</h2>

                                        <label className="label-input-mpl">{t('register.stepTwo.birthDate')}</label>
                                        <CustomDatePicker value={petBirthDate[petCount]}
                                                          onChange={handleChangePetDate}/>
                                        <small className="register-error-label"
                                               id="pet-birthdate-error-format">{t('register.stepTwo.birthDateErrorEmpty')}</small>

                                        <label className="label-input-mpl">{t('register.stepTwo.sex')}</label>
                                        <div className="sex-input">
                                            <span
                                                className="mr-2 font-2 color-dark">{t('register.stepThree.petMale')}</span>
                                            <label className="switch">
                                                <input type="checkbox" checked={petSex[petCount]}/>
                                                <span className="slider round" onClick={() => (setPetSex({
                                                    ...petSex,
                                                    [petCount]: !petSex[petCount]
                                                }))}/>
                                            </label>
                                            <span
                                                className="ml-2 font-2 color-dark">{t('register.stepThree.petFemale')}</span>
                                        </div>

                                        <label className="label-input-mpl">{t('register.stepThree.weight')}</label>
                                        <div className="choice-container">
                                            <div className="pl-0 w-75 mr-2">
                                                <input
                                                    className={("input-mpl w-100") + (petWeight[petCount] ? " not-empty" : "")}
                                                    type="number"
                                                    value={petWeight[petCount]}
                                                    onChange={(e) => setPetWeight({
                                                        ...petWeight,
                                                        [petCount]: e.target.value
                                                    })}/>
                                            </div>
                                            <div className="pr-0 w-25">
                                                <Form.Control as="select"
                                                              className={("input-mpl  w-100 color-dark")}
                                                              value={petWeightUnit[petCount]}
                                                              onChange={(e) => setPetWeightUnit({
                                                                  ...petWeightUnit,
                                                                  [petCount]: e.target.value
                                                              })}>
                                                    <option value="kg">kg</option>
                                                    <option value="g">g</option>
                                                </Form.Control>
                                            </div>
                                        </div>
                                        <label
                                            className="label-input-mpl">{t('register.stepThree.description')} {petNameValue[petCount]}</label>
                                        <textarea
                                            className={("input-mpl") + (petDescription[petCount] ? " not-empty" : "")}
                                            rows="4"
                                            value={petDescription[petCount]} maxLength="200"
                                            onChange={(e) => setPetDescription({
                                                ...petDescription,
                                                [petCount]: e.target.value
                                            })}/>

                                        <br/>
                                        <button className="mt-3 btn-mpl-primary"
                                                onClick={() => (goToStep4(petCount + 1))}>{t('register.stepThree.continue')}
                                        </button>
                                        <div className="under-button-link"
                                             onClick={() => (passStep3())}>{t('register.stepThree.pass')}</div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col className="register-illustration" lg={7}>
                            <CustomPetAnimation nac={haveSpecies("nac")} dog={haveSpecies("dog")}
                                                cat={haveSpecies("cat")}/>
                        </Col>
                    </Row>
                </>
            }
        </>
    );
}
