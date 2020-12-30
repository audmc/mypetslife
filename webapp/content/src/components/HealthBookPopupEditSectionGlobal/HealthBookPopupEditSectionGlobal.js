import React, {useEffect, useState} from "react";
import Popup from "../Popup/Popup";
import '../HealthBookPopupEdit/HealthBookPopupEdit.css';
import {Col, Container, Form, Row} from "react-bootstrap";
import { useTranslation } from 'react-i18next';
import apiPets from '../../utils/apiPets';
import racesList from "../../utils/races";
import CustomDatePicker from "../CustomDatePicker/CustomDatePicker";
import { getSpeciesOptions, getRacesOptions } from "../../utils/pet-functions"

export default function HealthBookPopupEdit (props) {

    const { name,
            sex,
            species,
            race,
            birthDate,
            welcomeDate,
            pet_id,
            onUpdate,
            onSuccess,
            onFailure } = props;

    const { t } = useTranslation();

    /* Global section */

    const [nameValue, setNameValue] = useState(name);
    const [nameAlert, setNameAlert] = useState("");

    const [sexValue, setSexValue] = useState(sex);
    const [sexAlert, setSexAlert] = useState(false);

    const [speciesValue, setSpeciesValue] = useState(species);
    const [speciesAlert, setSpeciesAlert] = useState(false);

    const [raceValue, setRaceValue] = useState(race);
    const [raceAlert, setRaceAlert] = useState(false);

    const [birthDateValue, setBirthDateValue] = useState(birthDate);
    const [birthDateAlert, setBirthDateAlert] = useState(false);

    const [welcomeDateValue, setWelcomeDateValue] = useState(welcomeDate);
    const [welcomeDateAlert, setWelcomeDateAlert] = useState("");

    /**
     * Handler for birthdate
     * @param newBirthDate
     */
    function handleChangeBirthDate(newBirthDate) {
        setBirthDateValue(newBirthDate);
    }

    /**
     * Handler for welcomeDate
     * @param newWelcomeDate
     */
    function handleChangeWelcomeDate(newWelcomeDate) {
        setWelcomeDateValue(newWelcomeDate);
    }

    /**
     * Handler for UpdateInfo
     * @param state
     */
    function handleUpdate(state, target) {
        onUpdate(state, target);
    }

    function setSpecieAndRace(value) {
        setSpeciesValue(value);
        setRaceValue(racesList[value][0]);
    }

    /**
     * content for global section edit popup
     * @type {JSX.Element}
     */
    const popupGlobalContent =
        <div className="healthbook-popup-edit">
            <Container>
                <div>
                    <h2 className="color-green font-weight-bolder text-center healthbook-popup-edit-title">{t('healthbook.popupTitle')}</h2>
                    <div className="color-red healthbook-popup-edit-subtitle">{t('healthbook.sectionGlobalInfo.title')} {name}</div>
                </div>
                <Row className="healthbook-popup-body">
                    <Col lg={6}>
                        <div className="healthbook-popup-edit-input-container">
                            <i className="fas fa-user healthbook-popup-edit-icon color-gradiant-red"/>
                            <input className="healthbook-popup-edit-input-field font-2"
                                   type="text"
                                   placeholder={t('healthbook.sectionGlobalInfo.name')}
                                   value={(nameValue) ? (nameValue) : ""}
                                   spellCheck={false}
                                   onChange={(event) => setNameValue(event.target.value)}/>
                        </div>
                        {
                            (nameAlert === "empty") &&
                            <p className="healthbook-popup-edit-alert">{t('healthbook.popup.nameEmpty')}</p>
                        }
                        {
                            (nameAlert === "invalid") &&
                            <p className="healthbook-popup-edit-alert">{t('healthbook.popup.nameInvalidChars')}</p>
                        }
                        {
                            (nameAlert === "too long") &&
                            <p className="healthbook-popup-edit-alert">{t('healthbook.popup.nameTooLong')}</p>
                        }
                        <div className="healthbook-popup-edit-input-container healthbook-popup-edit-input-select">
                            <i className="fas fa-paw healthbook-popup-edit-icon color-gradiant-red"/>
                            <Form.Control as="select"
                                          placeholder={t('healthbook.sectionGlobalInfo.species')}
                                          className="healthbook-popup-edit-input-field  font-2"
                                          value={speciesValue}
                                          onChange={((event) => setSpecieAndRace(event.target.value))}>
                                {
                                    getSpeciesOptions(t)
                                }
                            </Form.Control>
                        </div>
                        {
                            speciesAlert &&
                            <p className="healthbook-popup-edit-alert">{t('healthbook.popup.speciesEmpty')}</p>
                        }
                        <div className="healthbook-popup-edit-input-container">
                            <i className="fas fa-calendar healthbook-popup-edit-icon color-gradiant-red"/>
                            <CustomDatePicker placeholder={t('healthbook.sectionGlobalInfo.birthDate')}
                                              value={birthDateValue}
                                              onChange={handleChangeBirthDate}
                                              style={'red'}/>
                        </div>
                        {
                            birthDateAlert &&
                            <p className="healthbook-popup-edit-alert">{t('healthbook.popup.birthdayEmpty')}</p>
                        }
                    </Col>
                    <Col lg={6}>
                        <div className="healthbook-popup-edit-input-container healthbook-popup-edit-input-select">
                            <i className="fas fa-paw healthbook-popup-edit-icon color-gradiant-red"/>
                            <Form.Control as="select"
                                          placeholer={t('healthbook.sectionGlobalInfo.sex')}
                                          className="healthbook-popup-edit-input-field font-2"
                                          value={sexValue}
                                          onChange={((event) => setSexValue(event.target.value))}>
                                <option key="male" value="male">{t("healthbook.sectionGlobalInfo.male")}</option>
                                <option key="female" value="female">{t("healthbook.sectionGlobalInfo.female")}</option>
                            </Form.Control>
                        </div>
                        {
                            sexAlert &&
                            <p className="healthbook-popup-edit-alert">{t('healthbook.popup.sexEmpty')}</p>
                        }
                        <div className="healthbook-popup-edit-input-container healthbook-popup-edit-input-select">
                            <i className="fas fa-paw healthbook-popup-edit-icon color-gradiant-red"/>
                            <Form.Control as="select"
                                          placeholer={t('healthbook.sectionGlobalInfo.race')}
                                          className="healthbook-popup-edit-input-field font-2"
                                          value={raceValue}
                                          onChange={((event) => setRaceValue(event.target.value))}>
                                {
                                    getRacesOptions(t, speciesValue)
                                }
                            </Form.Control>
                        </div>
                        {
                            raceAlert &&
                            <p className="healthbook-popup-edit-alert">{t('healthbook.popup.raceEmpty')}</p>
                        }
                        <div className="healthbook-popup-edit-input-container">
                            <i className="fas fa-home healthbook-popup-edit-icon color-gradiant-red"/>
                            <CustomDatePicker placeholder={t('healthbook.sectionGlobalInfo.welcomeDate')}
                                              value={welcomeDateValue}
                                              onChange={handleChangeWelcomeDate}
                                              style={'red'}/>
                        </div>
                        {
                            (welcomeDateAlert === "empty") &&
                            <p className="healthbook-popup-edit-alert">{t('healthbook.popup.welcomeDateEmpty')}</p>
                        }
                        {
                            (welcomeDateAlert === "imposible_date") &&
                            <p className="healthbook-popup-edit-alert">{t('healthbook.popup.welcomeBeforeBirth')}</p>
                        }
                    </Col>
                </Row>
                <div className="text-center">
                    <div className="btn-mpl-alert healthbook-popup-edit-btn"
                         onClick={() => sendGlobalSectionForm(nameValue, sexValue, speciesValue, raceValue, birthDateValue, welcomeDateValue)}>
                        {t('healthbook.validate')}
                    </div>
                </div>
            </Container>
        </div>

    /**
     * Validate user's input and set errors alerts for global section
     * @param nameValue
     * @param sexValue
     * @param speciesValue
     * @param raceValue
     * @param birthDateValue
     * @param welcomeDateValue
     * @returns {boolean}
     */
    function checkGlobalSectionForm(nameValue, sexValue, speciesValue, raceValue, birthDateValue, welcomeDateValue) {
        let returnValue = true;

        try {
            if (!nameValue) {
                setNameAlert("empty");
                returnValue = false;
            } else if (nameValue.length > 15) {
                setNameAlert("too long")
                returnValue = false;
            } else if (nameValue.match('^[\\w\'\\-,.][^0-9_!¡?÷?¿/\\\\+=@#$%ˆ&*(){}|~<>;:[\\]]{2,}$') === null) {
                setNameAlert("invalid");
                returnValue = false;
            }
            if (!sexValue) {
                setSexAlert(true);
                returnValue = false;
            }
            if (!speciesValue) {
                setSpeciesAlert(true);
                returnValue = false;
            }
            if (!raceValue) {
                setRaceAlert(true);
                returnValue = false;
            }
            if (!birthDateValue) {
                setBirthDateAlert(true);
                returnValue = false;
            }
            if (!welcomeDateValue) {
                setWelcomeDateAlert("empty");
                returnValue = false;
            }
            let birthDate = new Date(birthDateValue);
            let welcomeDate = new Date(welcomeDateValue);
            if (welcomeDate - birthDate < 0) {
                setWelcomeDateAlert("impossible_date");
                returnValue = false;
            }
        } catch {}
        return returnValue;
    }

    /**
     * upload form data for global section
     * @param nameValue
     * @param sexValue
     * @param speciesValue
     * @param raceValue
     * @param birthDateValue
     * @param welcomeDateValue
     */
    function sendGlobalSectionForm(nameValue, sexValue, speciesValue, raceValue, birthDateValue, welcomeDateValue) {
        if (checkGlobalSectionForm(nameValue, sexValue, speciesValue, raceValue, birthDateValue, welcomeDateValue)) {
            apiPets.updateGlobalSection(pet_id, nameValue, sexValue, speciesValue, raceValue, birthDateValue, welcomeDateValue).then(result => {
                if (result.status === 200) {
                    let data = new Array(6);
                    data[0] = nameValue;
                    data[1] = sexValue;
                    data[2] = speciesValue;
                    data[3] = raceValue;
                    data[4] = birthDateValue;
                    data[5] = welcomeDateValue;
                    handleUpdate(data, 'global');
                    onSuccess(true);
                    props.onClosed(true);
                } else {
                    onFailure(true);
                    props.onClosed(true);
                }
            })
        }
    }

    useEffect(() => {
        if (nameValue)
            setNameAlert("");
        if (sexValue)
            setSexAlert(false);
        if (speciesValue)
            setSpeciesAlert(false);
        if (raceValue)
            setRaceAlert(false);
        if (birthDateValue)
            setBirthDateAlert(false);
        if (welcomeDateValue)
            setWelcomeDateAlert("");
    }, [nameValue, sexValue, speciesValue, raceValue, birthDateValue, welcomeDateValue]);

    return (
        <Popup
            content={popupGlobalContent}
            popupHeight={'fit-content'}
            popupWidth={'30%'}
            onClosed={props.onClosed}/>
    );
}