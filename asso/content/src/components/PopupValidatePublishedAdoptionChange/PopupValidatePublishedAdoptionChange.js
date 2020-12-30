import React from "react";
import './PopupValidatePublishedAdoptionChange.css';
import Popup from "../Popup/Popup";
import {useTranslation} from "react-i18next";

import "../ReactProfilePicture/ProfilePicture.css";

export default function PopupValidatePublishedAdoptionChange(props) {
    const {t} = useTranslation();

    function validate() {
        props.onValidate();
        props.onClosed();
    }

    const content =
        <div className="popup-edit-profile-picture">
            <div className="popup-edit-profile-picture-header mb-3">
                <h2>{t('adoption.updateStatus')}</h2>
            </div>
            <p>{t('adoption.confirmUpdateStatus')}</p>
            <p>{t('adoption.confirmUpdateStatus2')}</p>
            <div className="text-center mt-3">
                <div className="btn-mpl-secondary" onClick={() => validate()}>
                    {t('adoption.toValidate')}
                </div>
                <div className="btn-mpl-primary ml-2" onClick={() => props.onClosed()}>
                    {t('adoption.cancel')}
                </div>
            </div>
        </div>;

    return (
        <Popup
            content={content}
            popupHeight={'fit-content'}
            popupWidth={'50%'}
            minWidth={'50%'}
            onClosed={props.onClosed}
        />
    )
}
