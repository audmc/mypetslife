import React, {useContext} from "react";
import './Footer.css'
import logo from '../../svg/logo-white.svg'
import facebook from '../../svg/icon-facebook.svg'
import instagram from '../../svg/icon-instagram.svg'
//import twitter from '../../svg/icon-twitter.svg'
import linkedin from '../../svg/icon-linkedin.svg'

import {useTranslation} from "react-i18next";
import GlobalState from "../GlobalState/GlobalState";

export default function Footer() {
    const {t} = useTranslation();
    const globalState = useContext(GlobalState);

    return (
        <footer className="footer-mpl">
            <div className="footer-container">
                <div className="footer-section">
                    <div className="footer-section-link" onClick={() => console.log('whoAreWe')}>
                        {t('footer.whoAreWe')}
                    </div>
                    <div className="footer-section-link" onClick={() => console.log('newsletter')}>
                        {t('footer.newsletter')}
                    </div>
                    <div className="footer-section-link" onClick={() => console.log('pictureCredits')}>
                        {t('footer.pictureCredits')}
                    </div>
                    <div className="footer-section-link" onClick={() => globalState.setShowPopupContact(true)}>
                        {t('footer.contactUs')}
                    </div>
                    <div className="footer-section-link" onClick={() => globalState.setShowPopupCgu(true)}>
                        {t('footer.CGU')}
                    </div>
                    <div className="footer-section-link" onClick={() => globalState.setShowPopupCookies(true)}>
                        {t('footer.cookies')}
                    </div>
                </div>
                <div className="footer-logo">
                    <img draggable={false} src={logo} alt={"MyPetsLife"}/>

                    <div className="footer-made-with-love">
                        Conçu avec <i className="fas fa-heart color-pink"/>
                    </div>
                </div>
                <div className="footer-social-network">
                    <img draggable={false} src={facebook} className="first-icon" alt={"Facebook"} onClick={() => {
                        window.open('https://www.facebook.com/My-Pets-Life-105549364547425')
                    }}/>
                    <img draggable={false} src={instagram} alt={"Instagram"} onClick={() => {
                        window.open('https://www.instagram.com/mypetslife.co')
                    }}/>

                    <img draggable={false} src={linkedin} alt={"Linkedin"} className="last-icon" onClick={() => {
                        window.open('https://www.linkedin.com/company/my-pets-life')
                    }}/>
                </div>
            </div>
        </footer>
    );
}
