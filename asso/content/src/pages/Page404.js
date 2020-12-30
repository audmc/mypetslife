import React from "react";
import "../css/Page404.css";
import {useTranslation} from "react-i18next";
import Page404Animation from "../animations/Page404Animation/Page404Animation";

export default function Page404() {
    const {t} = useTranslation();

    function goToHome() {
        window.location = '/';
    }

    return (
        <>
            <div className="page404">
                <div className="page404-illustration">
                    <Page404Animation/>
                </div>
                <div className="page404-body">
                    <h1 className="page404-title">{t('page404.title')}</h1>
                    <p className="page404-subtitle">{t('page404.subtitle')}</p>
                    <div className="btn-mpl-primary page404-btn"
                         onClick={() => goToHome()}>
                        {t('page404.button')}
                    </div>
                </div>
            </div>
        </>
    );
}
