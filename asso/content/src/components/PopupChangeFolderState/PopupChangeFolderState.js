import React from "react";
import './PopupChangeFolderState.css';
import Popup from "../Popup/Popup";
import {useTranslation} from "react-i18next";
import {isSmallMobile} from "../../utils/form-functions";

export default function PopupChangeFolderState(props) {
    const {t} = useTranslation();

    function validate() {
        props.onValidate();
        props.onClosed();
    }

    const content =
        <div className="popup-edit-profile-picture">
            <div className="popup-edit-profile-picture-header color-gradiant-blue mb-3">
                <h4>{props.title}</h4>
            </div>
            <p>{props.paragraphOne}</p>
            <p>{props.paragraphTwo}</p>
            <p>{props.paragraphThree}</p>
            <div className="text-center mt-4">
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
            minWidth={ isSmallMobile() ? '95%' : '50%' }
            onClosed={props.onClosed}
        />
    )
}
