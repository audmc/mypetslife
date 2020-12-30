import React, {useState} from "react";
import './PopupEditEnvironmentSection.css';
import Popup from "../../Popup/Popup";
import {Spinner} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import {cryptData, retrievedFromJwt} from "../../../utils/user-infos";
import api from "../../../utils/api";
import {useAuth} from "../../../context/auth";
import BooleanChoice from "../../BooleanChoice/BooleanChoice";
import PopupEditInput from "../PopupEditInput/PopupEditInput";

export default function PopupEditEnvironmentSection(props) {
    const {t} = useTranslation();
    const {authTokens, setAuthTokens} = useAuth();

    const [isLoading, setIsLoading] = useState(false);

    const [childNumberValue, setChildNumberValue] = useState(props.user.child_number);
    const [adultNumberValue, setAdultNumberValue] = useState(props.user.adult_number);
    const [allergyValue, setAllergyValue] = useState(props.user.allergy);
    const [otherPetsValue, setOtherPetsValue] = useState(props.user.other_pets);
    const [otherPetsDescriptionValue, setOtherPetsDescriptionValue] = useState(props.user.other_pets_description);

    function updateUserEnvironmentInfos() {
        const token = {
            _id: retrievedFromJwt(authTokens)._id,
            child_number: childNumberValue,
            adult_number: adultNumberValue,
            allergy: allergyValue,
            other_pets: otherPetsValue,
            other_pets_description: otherPetsDescriptionValue,
        };
        setIsLoading(true);
        api.updateUserEnvironmentInfos(cryptData(token, process.env.REACT_APP_TOKEN_SECRET)).then(result => {
            setIsLoading(false);
            if (result.status === 200) {
                props.onSuccess(true);
                props.onClosed(true);
                setAuthTokens(result.data.token);
            } else {
                props.onFailure(true);
                props.onClosed(true);
            }
        }).catch(e => {
            setIsLoading(false);
            props.onFailure(true);
            props.onClosed(true);
        });
    }

    const editHomeSection =
        <div className="popup-edit-environment-section">
            <div className="popup-edit-personnal-section-header">
                <h2>{t('profile.update.title')}</h2>
            </div>
            <div className="popup-edit-environment-section-body blue-scroll">
                <h4 className="section-title">{t('profile.myEnvironment')}</h4>
                <div className="section-breakline"/>
                <div>
                    <p>{t('profile.update.childNumber')}</p>
                    <div className="environment-input-container">
                        <PopupEditInput icon={"fas fa-baby input-edit-icon color-gradiant-green"}
                                        value={childNumberValue}
                                        handleValue={setChildNumberValue}
                                        inputType={"number"}
                                        required={true}
                                        inputPlaceholder={0}/>
                    </div>
                    <p>{t('profile.update.adultNumber')}</p>
                    <div className="environment-input-container">
                        <PopupEditInput icon={"fas fa-child input-edit-icon color-gradiant-green"}
                                        value={adultNumberValue}
                                        handleValue={setAdultNumberValue}
                                        inputType={"number"}
                                        required={true}
                                        inputPlaceholder={1}/>
                    </div>
                    <BooleanChoice initialState={props.user.allergy}
                                   handleStateChange={setAllergyValue}
                                   title={t('profile.allergy') + " :"}
                                   trueIcon={"fa fa-check-circle"}
                                   trueText={t("yes")}
                                   falseIcon={"fas fa-times-circle"}
                                   falseText={t("no")}
                    />
                    <BooleanChoice initialState={props.user.other_pets}
                                   handleStateChange={setOtherPetsValue}
                                   title={t('profile.otherPets') + " :"}
                                   trueIcon={"fa fa-check-circle"}
                                   trueText={t("yes")}
                                   falseIcon={"fas fa-times-circle"}
                                   falseText={t("no")}
                    />
                    {
                        otherPetsValue &&
                        <>
                            <p>{t('profile.update.shortPetsDescription')} :</p>
                            <div className="environment-input-container">
                                <textarea
                                    className={"input-edit pl-3" + (!otherPetsDescriptionValue ? " input-edit-empty" : "")}
                                    value={otherPetsDescriptionValue}
                                    rows={5}
                                    onChange={(e) => setOtherPetsDescriptionValue(e.target.value)}/>
                            </div>
                        </>
                    }
                </div>
                <div className="text-center mt-3">
                    {
                        isLoading &&
                        <Spinner animation="border" variant="danger"/>
                    }
                    {
                        !isLoading &&
                        <div className="btn-mpl-alert" onClick={() => updateUserEnvironmentInfos()}>
                            {t('toValidate')}
                        </div>
                    }
                </div>
            </div>
        </div>

    return (
        <Popup
            content={editHomeSection}
            popupHeight={'fit-content'}
            popupWidth={'40%'}
            onClosed={props.onClosed}/>
    )
}
