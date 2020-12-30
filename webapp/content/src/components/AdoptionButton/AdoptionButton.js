import React from "react";
import './AdoptionButton.css';
import {NavDropdown, Navbar} from "react-bootstrap";
import {useTranslation} from "react-i18next";

export default function AdoptionButton() {
    const {t} = useTranslation();
    const younger = <>
        {t('adoptionPetPage.youngerFilter')} <i className="fa fa-chevron-down"/>
    </>;
    const older = <>{t('adoptionPetPage.olderFilter')} <i className="fa fa-chevron-down"/>
    </>;
    return (
        <Navbar className="navbar-filter filter-txt">
            <Navbar.Collapse id="responsive-navbar-nav">
                <NavDropdown title={younger} id="responsive-nav-dropdown">
                    <NavDropdown.Item href="#action/2.1">{older}</NavDropdown.Item>
                </NavDropdown>
            </Navbar.Collapse>
        </Navbar>
    );
}