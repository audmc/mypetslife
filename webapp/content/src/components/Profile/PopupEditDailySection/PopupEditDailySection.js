import React, {useState} from "react";
import './PopupEditDailySection.css';
import Popup from "../../Popup/Popup";
import {Spinner} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import {cryptData, retrievedFromJwt} from "../../../utils/user-infos";
import api from "../../../utils/api";
import {useAuth} from "../../../context/auth";
import BooleanChoice from "../../BooleanChoice/BooleanChoice";
import PopupEditInput from "../PopupEditInput/PopupEditInput";

export default function PopupEditDailySection(props) {
    const {t} = useTranslation();
    const {authTokens, setAuthTokens} = useAuth();

    const [isLoading, setIsLoading] = useState(false);

    const [haveAdoptedYetValue, setHaveAdoptedYetValue] = useState(props.user.have_adopted_yet);
    const [petAdoptedDescriptionValue, setPetAdoptedDescriptionValue] = useState(props.user.pet_adopted_description);
    const [adoptionDayNightValue, setAdoptionDayNightValue] = useState(props.user.adoption_day_night);
    const [hoursAbsentValue, setHoursAbsentValue] = useState(props.user.hour_absent);
    const [adoptionActivitiesValue, setAdoptionActivitiesValue] = useState(props.user.adoption_activities);
    const [walkNumberValue, setWalkNumberValue] = useState(props.user.walk_number);

    function updateUserDailyInfos() {
        const token = {
            _id: retrievedFromJwt(authTokens)._id,
            have_adopted_yet: haveAdoptedYetValue,
            pet_adopted_description: petAdoptedDescriptionValue,
            adoption_day_night: adoptionDayNightValue,
            hour_absent: hoursAbsentValue,
            adoption_activities: adoptionActivitiesValue,
            walk_number: walkNumberValue
        };
        setIsLoading(true);
        api.updateUserDailyInfos(cryptData(token, process.env.REACT_APP_TOKEN_SECRET)).then(result => {
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
        <div className="popup-edit-daily-section">
            <div className="popup-edit-personnal-section-header">
                <h2>{t('profile.update.title')}</h2>
            </div>
            <div className="popup-edit-daily-section-body blue-scroll">
                <h4 className="section-title">{t('profile.dailyTitle')}</h4>
                <div className="section-breakline"/>
                <div>
                    <BooleanChoice initialState={haveAdoptedYetValue}
                                   handleStateChange={setHaveAdoptedYetValue}
                                   title={t('profile.update.alreadyAdopted')}
                                   trueIcon={"fa fa-check-circle"}
                                   trueText={t("yes")}
                                   falseIcon={"fas fa-times-circle"}
                                   falseText={t("no")}
                    />

                    {
                        haveAdoptedYetValue &&
                        <>
                            <p>{t('profile.update.adoptedRace')} :</p>
                            <div className="environment-input-container">
                                <PopupEditInput icon={"fas fa-paw input-edit-icon color-gradiant-green"}
                                                value={petAdoptedDescriptionValue}
                                                handleValue={setPetAdoptedDescriptionValue}
                                                inputType={"text"}/>
                            </div>
                        </>
                    }

                    <p>{t('profile.update.whereAdoptedPet')}</p>
                    <div className="environment-input-container">
                        <textarea
                            className={"input-edit pl-3" + (!adoptionDayNightValue ? " input-edit-empty" : "")}
                            value={adoptionDayNightValue}
                            rows={3}
                            onChange={(e) => setAdoptionDayNightValue(e.target.value)}/>
                    </div>

                    <p>{t('profile.update.absent')} :</p>
                    <div className="environment-input-container">
                        <div className="input-edit-container d-flex">
                            <i className={"fas fa-clock input-edit-icon color-gradiant-green"}/>
                            <input
                                className={"input-edit edit-daily-input-absent" + (!hoursAbsentValue ? " input-edit-empty" : "")}
                                type={"number"}
                                value={hoursAbsentValue}
                                placeholder={0}
                                onChange={(e) => setHoursAbsentValue(e.target.value)}/>
                            <div className="popup-edit-input-complement-absent font-2">{t('profile.update.hoursADay')}.</div>
                        </div>
                    </div>

                    <p>{t('profile.update.activities')}</p>
                    <div className="environment-input-container">
                        <textarea
                            className={"input-edit pl-3" + (!adoptionActivitiesValue ? " input-edit-empty" : "")}
                            value={adoptionActivitiesValue}
                            rows={3}
                            onChange={(e) => setAdoptionActivitiesValue(e.target.value)}/>
                    </div>

                    <p>{t('profile.update.youPlanTo')} :</p>
                    <div className="environment-input-container">
                        <div className="input-edit-container d-flex">
                            <i className={"fas fa-dog input-edit-icon color-gradiant-green"}/>
                            <input
                                className={"input-edit edit-daily-input-walks" + (!walkNumberValue ? " input-edit-empty" : "")}
                                type={"number"}
                                value={walkNumberValue}
                                placeholder={0}
                                onChange={(e) => setWalkNumberValue(e.target.value)}/>
                            <div className="popup-edit-input-complement-walks font-2">{t('profile.update.walksAWeek')}.</div>
                        </div>
                    </div>
                </div>
                <div className="text-center mt-3">
                    {
                        isLoading &&
                        <Spinner animation="border" variant="danger"/>
                    }
                    {
                        !isLoading &&
                        <div className="btn-mpl-alert" onClick={() => updateUserDailyInfos()}>
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
