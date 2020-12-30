import React from "react";
import "../AdoptionMenu/AdoptionMenu.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import familyIcon from "../../svg/family.svg";
import {useTranslation} from "react-i18next";
import NavbarTop from "../NavbarTop/NavbarTop";

export default function FamilyMenu() {
    const {t} = useTranslation();

    return (
        <>
            <NavbarTop/>
            <div className="text-center pt-5 background-page min-vh-100 d-flex align-items-center">
                <div className="w-100">
                    <Col className="px-2">
                        <Row>
                            <div className="adoption-app-div mb-4">
                                <img className="adoption-app-icon" src={familyIcon} alt={t('home.family')}/>
                                <div className="adoption-app-title">
                                    <p className="m-auto">{t('home.family')}</p>
                                </div>
                            </div>
                        </Row>
                        <Row className="menu-container">
                            <Col>
                                <div className="adoption-menu-div text-center">
                                    <div className="adoption-menu-title">
                                        <p className="m-auto font-2">{t('adoption.menu.published')}</p>
                                    </div>
                                </div>
                                <div className="adoption-menu-div text-center">
                                    <div className="adoption-menu-title">
                                        <p className="m-auto font-2">{t('adoption.menu.archived')}</p>
                                    </div>
                                </div>
                                <div className="adoption-menu-div text-center">
                                    <div className="adoption-menu-title">
                                        <p className="m-auto font-2">{t('adoption.menu.new')}</p>
                                    </div>
                                </div>
                                <div className="adoption-menu-div text-center">
                                    <div className="adoption-menu-title">
                                        <p className="m-auto font-2">{t('adoption.menu.waiting')}</p>
                                    </div>
                                </div>
                                <div className="adoption-menu-div text-center last-menu">
                                    <div className="adoption-menu-title">
                                        <p className="m-auto font-2">{t('adoption.menu.received')}</p>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </div>
            </div>
        </>
    );

}
