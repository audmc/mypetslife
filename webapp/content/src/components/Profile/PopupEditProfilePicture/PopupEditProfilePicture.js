import React, {useRef, useState} from "react";
import './PopupEditProfilePicture.css';
import Popup from "../../Popup/Popup";
import {useTranslation} from "react-i18next";

import ProfilePicture from "../../ReactProfilePicture/src";
import "../../ReactProfilePicture/ProfilePicture.css";

import api from "../../../utils/api";
import {cryptData, retrievedFromJwt} from "../../../utils/user-infos";
import {useAuth} from "../../../context/auth";

export default function PopupEditProfilePicture(props) {
    const {t} = useTranslation();
    const profilePictureRef = useRef();
    const {authTokens, setAuthTokens} = useAuth();
    const [isLoading, setIsLoading] = useState(false);

    function validateChanges() {
        const profilePictureData = profilePictureRef.current;
        const imageData = profilePictureData.getImageAsDataUrl();
        var emptyState = profilePictureData.state.status === "EMPTY";
        const token = {
            _id: retrievedFromJwt(authTokens)._id,
            avatar: emptyState ? "" : imageData
        }
        setIsLoading(true);
        api.updateUserAvatar(cryptData(token, process.env.REACT_APP_TOKEN_SECRET)).then(result => {
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

    const editProfilePicture =
        <div className="popup-edit-profile-picture">
            <div className="popup-edit-profile-picture-header">
                <h2>{t('profile.update.picture')}</h2>
            </div>
            <ProfilePicture
                cropSize={220}
                frameFormat={"circle"}
                useHelper={true}
                minImageSize={220}
                ref={profilePictureRef}
                image={props.user.avatar}
            />
            <div className="text-center my-3">
                { !isLoading &&
                    <div className="btn-mpl-alert" onClick={() => validateChanges()}>
                        {t('toValidate')}
                    </div>
                }
                { isLoading &&
                    <div className="spinner-border text-danger" role="status"/>
                }
            </div>
        </div>

    return (
        <Popup
            content={editProfilePicture}
            popupHeight={'fit-content'}
            popupWidth={'30%'}
            onClosed={props.onClosed}/>
    )
}