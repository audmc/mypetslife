import React, {useState} from "react";
import Popup from "../../Popup/Popup";
import {useTranslation} from "react-i18next";
import {useAuth} from "../../../context/auth";
import {retrievedFromJwt} from "../../../utils/user-infos";


export default function PopupDeleteAccount(props) {
    const {t} = useTranslation();
    const { authTokens } = useAuth();

    const name = retrievedFromJwt(authTokens).firstName;

    function handleClose() {
        props.onClosed();
    }

    const deleteAccount =
        <>
        <div className="popup-edit-personnal-section">
            <div className="popup-edit-personnal-section-header">
                <h2>{t('profile.delete.title')}</h2>
            </div>
            <div>
                <p>{t('profile.delete.content1')} {name} ! {t('profile.delete.content2')}</p>
                <p>{t('profile.delete.content3')} <i>{t('profile.delete.deleteEmail')}</i>{t('profile.delete.content4')} </p>
                <p>{t('profile.delete.content5')} <i>{t('profile.delete.contactEmail')} </i> {t('profile.delete.content6')} </p>
            </div>
            <div className="text-center ">
                <div className="btn-mpl-alert" onClick={() => (handleClose())}>
                    {t('profile.delete.understand')}
                </div>
            </div>
        </div>
    </>;

    return (
        <Popup
            content={deleteAccount}
            popupHeight={'fit-content'}
            popupWidth={'50%'}
            onClosed={props.onClosed}
            minWidth={'0'}
        />
    )
}
