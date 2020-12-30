import React from "react";
import './WelcomePage.css';

import logo from '../../svg/logo.svg'

import {Col, Image, Row} from "react-bootstrap";
import {useTranslation} from 'react-i18next';
import NavbarTop from "../NavbarTop/NavbarTop";
import WelcomeAnimation from "../../animations/WelcomeAnimation/WelcomeAnimation";
import {useAuth} from "../../context/auth";

export default function WelcomePage(props) {
    const {t} = useTranslation();

    const {authTokens} = useAuth()

    return (
        <>
            <Image draggable={false} src={logo} className="welcome-logo"/>
            <NavbarTop isConnected={authTokens} isWelcomePage={true}/>
            <Row className="welcome-bg">
                <Col className="welcome-col" lg={7}>
                    <div className="welcome-container">
                        <h1 className="welcome-main-title">{t('welcomePage.section1.title')}</h1>
                        <h4 className="welcome-subtitle">{t('welcomePage.section1.baseline1')}</h4>
                        <h4 className="welcome-subtitle">{t('welcomePage.section1.baseline2')}</h4>
                        <div className="welcome-btn">
                            <div className="btn-mpl-primary"
                                 onClick={props.onDiscoverClick}>
                                {t('welcomePage.section1.discover')}
                            </div>
                        </div>
                    </div>
                </Col>
                <Col className="p-0" lg={5}>
                    <div className="welcome-illustration">
                        <WelcomeAnimation/>
                    </div>
                </Col>
            </Row>
        </>
    );
}
