import React, {useState} from "react";
import './PopupEditMotivationSection.css';
import Popup from "../../Popup/Popup";
import {Spinner} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import {cryptData, retrievedFromJwt} from "../../../utils/user-infos";
import api from "../../../utils/api";
import {useAuth} from "../../../context/auth";
import PopupEditInput from "../PopupEditInput/PopupEditInput";

export default function PopupEditMotivationSection(props) {
    const {t} = useTranslation();
    const {authTokens, setAuthTokens} = useAuth();

    const [isLoading, setIsLoading] = useState(false);

    const [adoptionWhyValue, setAdoptionWhyValue] = useState(props.user.adoption_why);
    const [adoptionWhenValue, setAdoptionWhenValue] = useState(props.user.adoption_when);
    const [adoptionResearchValue, setAdoptionResearchValue] = useState(props.user.adoption_research);

    function updateUserMotivationInfos() {
        const token = {
            _id: retrievedFromJwt(authTokens)._id,
            adoption_why: adoptionWhyValue,
            adoption_when: adoptionWhenValue,
            adoption_research: adoptionResearchValue,
        };
        setIsLoading(true);
        api.updateUserMotivationInfos(cryptData(token, process.env.REACT_APP_TOKEN_SECRET)).then(result => {
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
        <div className="popup-edit-motivation-section">
            <div className="popup-edit-personnal-section-header">
                <h2>{t('profile.update.title')}</h2>
            </div>
            <div className="popup-edit-motivation-section-body blue-scroll">
                <h4 className="section-title">{t('profile.motivationTitle')}</h4>
                <div className="section-breakline"/>
                <div>
                    <p>{t('profile.update.adoptionWhy')}</p>
                    <div className="environment-input-container">
                        <textarea
                            className={"input-edit pl-3" + (!adoptionWhyValue ? " input-edit-empty" : "")}
                            value={adoptionWhyValue}
                            rows={3}
                            onChange={(e) => setAdoptionWhyValue(e.target.value)}/>
                    </div>
                    <p>{t('profile.update.sinceWhen')}</p>
                    <div className="environment-input-container">
                        <PopupEditInput icon={"fas fa-clock input-edit-icon color-gradiant-green"}
                                        value={adoptionWhenValue}
                                        handleValue={setAdoptionWhenValue}
                                        inputType={"text"}/>
                    </div>
                    <p>{t('profile.update.qualities')}</p>
                    <div className="environment-input-container">
                        <textarea
                            className={"input-edit pl-3" + (!adoptionResearchValue ? " input-edit-empty" : "")}
                            value={adoptionResearchValue}
                            rows={4}
                            onChange={(e) => setAdoptionResearchValue(e.target.value)}/>
                    </div>
                </div>
                <div className="text-center mt-3">
                    {
                        isLoading &&
                        <Spinner animation="border" variant="danger"/>
                    }
                    {
                        !isLoading &&
                        <div className="btn-mpl-alert" onClick={() => updateUserMotivationInfos()}>
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
