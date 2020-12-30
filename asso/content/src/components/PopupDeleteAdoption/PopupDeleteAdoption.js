import React from "react";
import './PopupDeleteAdoption.css';
import Popup from "../Popup/Popup";
import {useTranslation} from "react-i18next";
import {isSmallMobile} from "../../utils/form-functions";

export default function PopupDeleteAdoption(props) {
    const {t} = useTranslation();

    function validate() {
        props.onValidate();
        props.onClosed();
    }

    const content =
        <div className="popup-edit-profile-picture">
            <div className="popup-edit-profile-picture-header color-gradiant-red mb-3">
                <h2>{t('adoption.deleteAdoption')}</h2>
            </div>
            <p>{t('adoption.confirmDelete')}</p>
            <p>{t('adoption.confirmDelete2')}</p>
            <p>{t('adoption.confirmDelete3')}</p>
            <div className="text-center mt-4">
                <div className="btn-mpl-alert-secondary" onClick={() => validate()}>
                    {t('adoption.toValidate')}
                </div>
                <div className="btn-mpl-alert ml-2" onClick={() => props.onClosed()}>
                    {t('adoption.cancel')}
                </div>
            </div>
        </div>;

    return (
        <Popup
            content={content}
            popupHeight={'fit-content'}
            popupWidth={'50%'}
            minWidth={ isSmallMobile() ? '95%' : '50%' }
            onClosed={props.onClosed}
        />
    )
}
