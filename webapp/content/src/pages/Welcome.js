import React, {useEffect, useState} from "react";
import WelcomePage from "../components/WelcomePage/WelcomePage";
import WelcomeAdvantages from "../components/WelcomeAdvantages/WelcomeAdvantages";
import WelcomeSimpleSection from "../components/WelcomeSimpleSection/WelcomeSimpleSection";
import * as Scroll from 'react-scroll';

import manAndDogs from "../svg/welcome-carousel-man-w-dogs.svg";
import womanAndBunny from "../svg/welcome-carousel-woman-w-bunny.svg";
import doctorsAndCat from "../svg/welcome-carousel-doctors-cat.svg";

import bgShare from "../svg/welcome-bg-share.svg";
import bgLife from "../svg/welcome-bg-life.svg";
import bgHealth from "../svg/welcome-bg-health.svg";

import {useTranslation} from "react-i18next";
import Footer from "../components/Footer/Footer";
import WelcomePricing from "../components/WelcomePricing/WelcomePricing";
import {useAuth} from "../context/auth";
import NavbarTop from "../components/NavbarTop/NavbarTop";
import WelcomeNewsletter from "../components/WelcomeNewsletter/WelcomeNewsletter";

export default function Welcome() {
    const [showNavbarTop, setShowNavbarTop] = useState(true);
    let scroll = Scroll.animateScroll;

    const {t} = useTranslation();

    const {authTokens} = useAuth();

    const welcomeHealth = <>
        <p>{t('welcomePage.section2.careContent1')}</p>
        <p>{t('welcomePage.section2.careContent2')}</p>
    </>

    const welcomeShare = <>
        <p>{t('welcomePage.section2.shareContent1')}</p>
        <p>{t('welcomePage.section2.shareContent2')}</p>
    </>

    const welcomeLife = <>
        <p>{t('welcomePage.section2.lifeContent1')}</p>
        <p>{t('welcomePage.section2.lifeContent2')}</p>
        <p>{t('welcomePage.section2.lifeContent3')}</p>
    </>

    const isMobile = () => {
        return (window.innerWidth <= 992)
    }

    const handleScroll = (func, wait = 20, immediate = true) => {
        const position = window.pageYOffset;
        setShowNavbarTop(position <= 35)
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, {passive: true});

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="overflow-hidden">
            <div className="vh-100">
                <WelcomePage onDiscoverClick={() => scroll.scrollTo(window.innerHeight)}/>
            </div>
            <div className="vh-100">
                <WelcomeSimpleSection
                    isReversed={false}
                    title={t('welcomePage.section2.shareTitle')}
                    image={manAndDogs}
                    content={welcomeShare}
                    background={bgShare}
                />
            </div>
            <div className="vh-100">
                <WelcomeSimpleSection
                    isReversed={true}
                    title={t('welcomePage.section2.lifeTitle')}
                    image={womanAndBunny}
                    content={welcomeLife}
                    background={bgLife}
                />
            </div>
            <div className="vh-100">
                <WelcomeSimpleSection
                    isReversed={false}
                    title={t('welcomePage.section2.careTitle')}
                    image={doctorsAndCat}
                    content={welcomeHealth}
                    background={bgHealth}
                />
            </div>
            <div className="vh-100">
                <WelcomeAdvantages isMobile={isMobile()}/>
            </div>
            <div className="vh-100 position-relative d-flex align-items-center" id="pricing">
                <WelcomePricing isMobile={isMobile()}/>
            </div>
            <WelcomeNewsletter/>
            <div className="mpl-welcome-footer">
                <Footer/>
            </div>
            {
                !showNavbarTop &&
                <NavbarTop isConnected={authTokens} isWelcomePage={showNavbarTop}/>
            }
        </div>
    );
}
