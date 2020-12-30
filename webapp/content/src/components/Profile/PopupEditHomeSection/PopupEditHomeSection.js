import React, {useState} from "react";
import './PopupEditHomeSection.css';
import Popup from "../../Popup/Popup";
import {Spinner} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import {cryptData, retrievedFromJwt} from "../../../utils/user-infos";
import api from "../../../utils/api";
import {useAuth} from "../../../context/auth";
import BooleanChoice from "../../BooleanChoice/BooleanChoice";

export default function PopupEditHomeSection(props) {
    const {t} = useTranslation();
    const {authTokens, setAuthTokens} = useAuth();

    const [isLoading, setIsLoading] = useState(false);

    const [houseValue, setHouseValue] = useState(props.user.house);
    const [isHouseOwnerValue, setIsHouseOwnerValue] = useState(props.user.is_house_owner);
    const [hasHouseOwnerAccordValue, setHasHouseOwnerAccordValue] = useState(props.user.have_house_owner_accord);
    const [gardenValue, setGardenValue] = useState(props.user.garden);
    const [gardenSurfaceValue, setGardenSurfaceValue] = useState(props.user.garden_surface);
    const [gardenSurfaceUnity, setGardenSurfaceUnity] = useState(props.user.garden_unity);
    const [gardenFenceValue, setGardenFenceValue] = useState(props.user.garden_fence);

    function updateUserHomeInfos() {
        const token = {
            _id: retrievedFromJwt(authTokens)._id,
            house: houseValue,
            is_house_owner: isHouseOwnerValue,
            have_house_owner_accord: hasHouseOwnerAccordValue,
            garden: gardenValue,
            garden_surface: gardenSurfaceValue,
            garden_unity: gardenSurfaceUnity,
            garden_fence: gardenFenceValue
        };
        setIsLoading(true);
        api.updateUserHomeInfos(cryptData(token, process.env.REACT_APP_TOKEN_SECRET)).then(result => {
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
        <div className="popup-edit-home-section">
            <div className="popup-edit-personnal-section-header">
                <h2>{t('profile.update.title')}</h2>
            </div>
            <div className="popup-edit-home-section-body blue-scroll">
                <h4 className="section-title">{t('profile.update.house')}</h4>
                <div className="section-breakline"/>
                <div>
                    <BooleanChoice initialState={props.user.house}
                                   handleStateChange={setHouseValue}
                                   title={t('profile.youLiveIn') + " :"}
                                   trueIcon={"fa fa-home"}
                                   trueText={t('dataBase.house')}
                                   trueValue={"house"}
                                   falseIcon={"fas fa-building"}
                                   falseText={t('dataBase.apartment')}
                                   falseValue={"apartment"}
                    />
                    <BooleanChoice initialState={props.user.is_house_owner}
                                   handleStateChange={setIsHouseOwnerValue}
                                   title={t('youAre') + " :"}
                                   trueIcon={"fa fa-key"}
                                   trueText={t('owner')}
                                   falseIcon={"fas fa-file-contract"}
                                   falseText={t('tenant')}
                    />
                    {
                        isHouseOwnerValue === false &&
                        <BooleanChoice initialState={props.user.have_house_owner_accord}
                                       handleStateChange={setHasHouseOwnerAccordValue}
                                       title={t('haveOwnerAccord') + " :"}
                                       trueIcon={"fa fa-check-circle"}
                                       trueText={t("yes")}
                                       falseIcon={"fas fa-times-circle"}
                                       falseText={t("no")}
                        />
                    }
                    <BooleanChoice initialState={props.user.garden}
                                   handleStateChange={setGardenValue}
                                   title={t('haveGarden')}
                                   trueIcon={"fa fa-check-circle"}
                                   trueText={t("yes")}
                                   falseIcon={"fas fa-times-circle"}
                                   falseText={t("no")}
                    />
                    {
                        gardenValue &&
                        <div className="position-relative">
                            <input className={"input-mpl garden-input" + (gardenSurfaceValue ? " not-empty" : "")}
                                   value={gardenSurfaceValue}
                                   type="number"
                                   onChange={(e) => setGardenSurfaceValue(e.target.value)}
                            />
                            <select className="input-mpl garden-select" value={gardenSurfaceUnity} onChange={(e) => setGardenSurfaceUnity(e.target.value)}>
                                <option value="m">m²</option>
                                <option value="yd">yd²</option>
                            </select>
                        </div>
                    }
                    {
                        gardenValue &&
                        <BooleanChoice initialState={props.user.garden_fence}
                                       handleStateChange={setGardenFenceValue}
                                       title={t('yourGardenIs')}
                                       trueIcon={"fa fa-door-closed"}
                                       trueText={t('fence')}
                                       falseIcon={"fas fa-door-open"}
                                       falseText={t('noFence')}
                        />
                    }
                </div>
                <div className="text-center mt-3">
                    {
                        isLoading &&
                        <Spinner animation="border" variant="danger"/>
                    }
                    {
                        !isLoading &&
                        <div className="btn-mpl-alert" onClick={() => updateUserHomeInfos()}>
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
            popupWidth={'700px'}
            onClosed={props.onClosed}/>
    )
}
