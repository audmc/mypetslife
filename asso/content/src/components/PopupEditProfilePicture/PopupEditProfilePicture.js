import React, {useRef, useState} from "react";
import './PopupEditProfilePicture.css';
import Popup from "../Popup/Popup";
import {useTranslation} from "react-i18next";

import ProfilePicture from "../ReactProfilePicture/src";
import "../ReactProfilePicture/ProfilePicture.css";

export default function PopupEditProfilePicture(props) {
    const {t} = useTranslation();
    const profilePictureRef = useRef();
    const [isLoading, setIsLoading] = useState(false);

    function validateChanges() {
        const profilePictureData = profilePictureRef.current;
        const imageData = profilePictureData.getImageAsDataUrl();
        var emptyState = profilePictureData.state.status === "EMPTY";
        setIsLoading(true);
        if(props.onChangePhotoOne){
            props.onChangePhotoOne(emptyState ? "" : imageData)
        }
        if(props.onChangePhotoTwo){
            props.onChangePhotoTwo(emptyState ? "" : imageData)
        }
        if(props.onChangePhotoThree){
            props.onChangePhotoThree(emptyState ? "" : imageData)
        }
        props.onClosed(true);
    }

    const editProfilePicture =
        <div className="popup-edit-profile-picture">
            <div className="popup-edit-profile-picture-header">
                <h2>{t('adoption.updatePicture')}</h2>
            </div>
            <ProfilePicture
                cropSize={220}
                frameFormat={"circle"}
                useHelper={true}
                minImageSize={220}
                ref={profilePictureRef}
                image={props.photo}
            />
            <div className="text-center my-3">
                { !isLoading &&
                    <div className="btn-mpl-alert" onClick={() => validateChanges()}>
                        {t('adoption.toValidate')}
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
            onClosed={props.onClosed}
        />
    )
}
