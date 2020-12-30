import React, {useState} from "react";
import logo from "../svg/logo.svg"
import {useTranslation} from "react-i18next";

import "../css/Home.css";

import adoptionIcon from "../svg/adoption.svg";
import familyIcon from "../svg/family.svg";
import webIcon from "../svg/web.svg";
import infosIcon from "../svg/infos.svg";
import statIcon from "../svg/stat.svg";
import healthbookIcon from "../svg/healthbook.svg";
import Row from "react-bootstrap/Row";
import HomeMenuElement from "../components/HomeMenuElement/HomeMenuElement";

export default function Home() {

    const {t} = useTranslation();

    const [searchValue, setSearchValue] = useState("");

    function logout() {
        localStorage.removeItem("tokens-asso");
        window.location.href = '/';
    }

    return (
        <>
            <div className="text-center pt-5 background-page min-vh-100 d-flex align-items-center">
                <div className="w-100">
                    <img draggable={false} src={logo} className="mb-3" alt="MyPetsLife Logo" width="150px"/>
                    <div className="search-container">
                        <i className="fas fa-search p-2 color-green"/>
                        <input className="color-green font-2 search-input" placeholder={t('home.search')}
                               value={searchValue}
                               onChange={(e) => setSearchValue(e.target.value)}/>
                    </div>
                    <Row className="home-app-container">
                        <HomeMenuElement icon={adoptionIcon} title={t('home.adoption')} link={"/adoption_menu"}/>
                        <HomeMenuElement icon={familyIcon} title={t('home.family')}/>
                        <HomeMenuElement icon={webIcon} title={t('home.web')}/>
                        <HomeMenuElement icon={infosIcon} title={t('home.infos')} link={"/infos"}/>
                        <HomeMenuElement icon={statIcon} title={t('home.stat')}/>
                        <HomeMenuElement icon={healthbookIcon} title={t('home.healthbook')}/>
                    </Row>
                    <div className="login-div pt-2 pb-5">
                        <div className="btn-mpl-primary" onClick={() => (logout())}>{t('logout')}</div>
                    </div>
                </div>
            </div>
        </>
    );
}
