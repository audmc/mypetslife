import React, {useEffect, useState} from "react";
import Popup from "../Popup/Popup";
import '../HealthBookPopupEdit/HealthBookPopupEdit.css';
import {Col, Container, Row} from "react-bootstrap";
import { useTranslation } from 'react-i18next';
import apiPets from '../../utils/apiPets';
import CustomDatePicker from "../CustomDatePicker/CustomDatePicker";
import SearchLocationInput from "../SearchLocationInput/SearchLocationInput";

/**
 * Component POPUPEDIT for HEALTHBOOK
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export default function HealthBookPopupEdit (props) {

    const { neutering,
            microchip,
            tattoo,
            veterinary_name,
            veterinary_phone,
            veterinary_address,
            pet_id,
            onUpdate,
            onSuccess,
            onFailure } = props;

    const { t } = useTranslation();

    /* Veterinary section */

    const [ neuteringValue, setNeuteringValue ] = useState(neutering);

    const [ microchipValue, setMicrochipValue ] = useState(microchip);

    const [ tattooValue, setTattooValue ] = useState(tattoo);

    const [ veterinaryValue, setVeterinaryValue ] = useState(veterinary_name);

    const [ veterinaryPhoneValue, setVeterinaryPhoneValue ] = useState(veterinary_phone);
    const [ phoneAlert, setPhoneAlert ] = useState(false);

    const [ veterinaryAddressValue, setVeterinaryAddressValue ] = useState(veterinary_address);
    const [ addressUpdated, setAddressUpdated ] = useState(false);

    /**
     * Handler for neutering
     * @param newNeutering
     */
    function handleChangeNeutering(newNeutering) {
        setNeuteringValue(newNeutering);
    }

    /**
     * Handler for address
     * @param newAddress
     */
    function handleChangeVeterinaryAddress(newAddress) {
        setVeterinaryAddressValue(newAddress);
        setAddressUpdated(true);
    }

    /**
     * Handler for UpdateInfo
     * @param state
     */
    function handleUpdate(state, target) {
        onUpdate(state, target);
    }

    const popupVeterinarianContent =
        <div className="healthbook-popup-edit">
            <Container>
                <div>
                    <h2 className="color-green font-weight-bolder text-center healthbook-popup-edit-title">{t('healthbook.popupTitle')}</h2>
                    <div className="color-red healthbook-popup-edit-subtitle">{t('healthbook.sectionVeterinarianInfo.title')}</div>
                </div>
                <div className="healthbook-popup-body">
                    <div className="healthbook-popup-edit-input-container">
                        <i className="fas fa-stethoscope healthbook-popup-edit-icon color-gradiant-red"/>
                        <CustomDatePicker placeholder={t('healthbook.sectionVeterinarianInfo.neutering')}
                                          value={neuteringValue}
                                          onChange={handleChangeNeutering}
                                          style={'red'}/>
                    </div>
                    <Row>
                        <Col lg={6}>
                            <div className="healthbook-popup-edit-input-container">
                                <i className="fas fa-tag healthbook-popup-edit-icon color-gradiant-red"/>
                                <input className="healthbook-popup-edit-input-field font-2"
                                       type="text"
                                       placeholder={t('healthbook.sectionVeterinarianInfo.tattoo')}
                                       value={(tattooValue) ? tattooValue : ""}
                                       onChange={((event) => setTattooValue(event.target.value))}/>
                            </div>
                            <div className="healthbook-popup-edit-input-container">
                                <i className="fas fa-home healthbook-popup-edit-icon color-gradiant-red"/>
                                <input className="healthbook-popup-edit-input-field font-2"
                                       type="text"
                                       placeholder={t('healthbook.sectionVeterinarianInfo.veterinary')}
                                       value={(veterinaryValue) ? veterinaryValue : ""}
                                       onChange={(event) => setVeterinaryValue(event.target.value)}/>
                            </div>
                        </Col>
                        <Col lg={6}>
                            <div className="healthbook-popup-edit-input-container">
                                <i className="fas fa-microchip healthbook-popup-edit-icon color-gradiant-red"/>
                                <input className="healthbook-popup-edit-input-field font-2"
                                       type="text"
                                       placeholder={t('healthbook.sectionVeterinarianInfo.microchip')}
                                       value={(microchipValue) ? microchipValue : ""}
                                       onChange={(event) => setMicrochipValue(event.target.value)}/>
                            </div>
                            <div className="healthbook-popup-edit-input-container">
                                <i className="fas fa-phone-alt healthbook-popup-edit-icon color-gradiant-red"/>
                                <input className="healthbook-popup-edit-input-field font-2"
                                       type="text"
                                       placeholder={t('healthbook.sectionVeterinarianInfo.phone')}
                                       value={(veterinaryPhoneValue) ? veterinaryValue : ""}
                                       onChange={(event) => setVeterinaryPhoneValue(event.target.value)}/>
                            </div>
                            {
                                phoneAlert &&
                                <p className="healthbook-popup-edit-alert">{t('healthbook.popup.invalidPhoneNumber')}</p>
                            }
                        </Col>
                    </Row>
                    <div className="healthbook-popup-edit-input-container">
                        <i className="fas fa-home healthbook-popup-edit-icon color-gradiant-red"/>
                        <SearchLocationInput value={veterinaryAddressValue}
                                             placeholder={t('healthbook.sectionVeterinarianInfo.address')}
                                             onChange={handleChangeVeterinaryAddress}/>
                    </div>
                </div>
                <div className="text-center">
                    <div className="btn-mpl-alert healthbook-popup-edit-btn"
                         onClick={() => sendVeterinarySectionForm(neuteringValue, microchipValue, tattooValue, veterinaryValue, veterinaryPhoneValue, veterinaryAddressValue)}>
                        {t('healthbook.validate')}
                    </div>
                </div>
            </Container>
        </div>

    /**
     * Validate form data for veterinary section and set appropriate alerts
     * @param neuteringValue
     * @param microchipValue
     * @param tattooValue
     * @param veterinaryValue
     * @param veterinaryPhoneValue
     * @param veterinaryAddressValue
     * @returns {boolean}
     */
    function checkVeterinarySectionForm(neuteringValue, microchipValue, tattooValue, veterinaryValue, veterinaryPhoneValue, veterinaryAddressValue) {
        let returnValue = true;

        try {

            if (veterinaryPhoneValue && (veterinaryPhoneValue.length < 10 || veterinaryPhoneValue.length > 13)) {
                setPhoneAlert(true);
                returnValue = false;
            }
        } catch {
            return false;
        }
        return returnValue;
    }

    /**
     * Upload form data for veterinary section
     * @param neuteringValue
     * @param microchipValue
     * @param tattooValue
     * @param veterinaryValue
     * @param veterinaryPhoneValue
     * @param veterinaryAddressValue
     */
    function sendVeterinarySectionForm(neuteringValue, microchipValue, tattooValue, veterinaryValue, veterinaryPhoneValue, veterinaryAddressValue) {
        if (checkVeterinarySectionForm(neuteringValue, microchipValue, tattooValue, veterinaryValue, veterinaryPhoneValue, veterinaryAddressValue)) {
            apiPets.updateVeterinarySection(pet_id, neuteringValue, microchipValue, tattooValue, veterinaryValue, veterinaryPhoneValue, (addressUpdated) ? veterinaryAddressValue['formatted_address'] : veterinaryAddressValue).then(result => {
                if (result.status === 200) {
                    let data = new Array(6);
                    data[0] = neuteringValue;
                    data[1] = microchipValue;
                    data[2] = tattooValue;
                    data[3] = veterinaryValue;
                    data[4] = veterinaryPhoneValue;
                    data[5] = (addressUpdated) ? veterinaryAddressValue['formatted_address'] : veterinaryAddressValue;
                    handleUpdate(data, 'veterinary');
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
        if (veterinaryPhoneValue)
            setPhoneAlert(false);
    }, [veterinaryPhoneValue]);

    return (
        <Popup
            content={popupVeterinarianContent}
            popupHeight={'fit-content'}
            popupWidth={'30%'}
            onClosed={props.onClosed}/>
    );
}
