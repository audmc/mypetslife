import React from "react";
import './AdoptionBar.css';
import '../AdoptionPage/AdoptionPage.css';
import {NavDropdown, Navbar} from "react-bootstrap";
import {useTranslation} from "react-i18next";
import {isMobile} from "../../utils/form-functions";

export default function AdoptionBar(props) {

    const {t} = useTranslation();
    const iconDropdown = <>
        <NavDropdown title={<i className="fas fa-paw"/>} id="dropdown-species"/>
        <NavDropdown title={<i className="fas fa-venus-mars"/>} id="dropdown-sex"/>
        <NavDropdown title={<i className="fas fa-otter"/>} id="dropdown-race"/>
        <NavDropdown title={<i className="fas fa-tshirt"/>} id="dropdown-coat"/>
        <NavDropdown title={<i className="fas fa-map-marker"/>} id="dropdown-location"/>
        <NavDropdown title={<i className="fas fa-home"/>} id="dropdown-association"/>
    </>;
    const species = <>
        {t('adoptionPetPage.species')} <i className="fa fa-chevron-down"/>
    </>;
    const sex = <>
        {t('adoptionPetPage.sex')} <i className="fa fa-chevron-down"/>
    </>;
    const race = <>
        {t('adoptionPetPage.race')} <i className="fa fa-chevron-down"/>
    </>;
    const coat = <>
        {t('adoptionPetPage.animalCoat')} <i className="fa fa-chevron-down"/>
    </>;
    const location = <>
        {t('adoptionPetPage.location')} <i className="fa fa-chevron-down"/>
    </>;
    const association = <>
        {t('adoptionPetPage.association')} <i className="fa fa-chevron-down"/>
    </>;
    const find = <>
        <i className="fas fa-search"/> {t('adoptionPetPage.search')}
    </>;
    const classicDropdown =  <>
        <NavDropdown title={species} id="dropdown-species"/>
        <NavDropdown title={sex} id="dropdown-sex"/>
        <NavDropdown title={race} id="dropdown-race"/>
        <NavDropdown title={coat} id="dropdown-coat"/>
        <NavDropdown title={location} id="dropdown-location"/>
        <NavDropdown title={association} id="dropdown-association"/>
    </>;

    return (
        <div>
            {props.scroll &&
            <>
                <Navbar className="navbar navbar-light bg-light  navbar-search">
                    <div className="search-bar-container search-bar">
                        <div className="i-search">
                            {find}
                        </div>
                        <div className="button-search-container button-text-bar">{t('adoptionPetPage.search')}</div>
                    </div>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        {props.scroll && isMobile() &&
                            iconDropdown
                        }
                        {props.scroll && !isMobile() &&
                            classicDropdown
                        }
                    </Navbar.Collapse>
                </Navbar>
            </>
            }
            {!props.scroll && !isMobile() &&
            <>
                <Navbar className="navbar fixed navbar-phase2-search">
                    <div className="mask-space-container"/>
                    <div className="search-phase2-container search-bar">
                        <div className="i-v2-search">
                            {find}
                        </div>
                    </div>
                    <div className="button-phase2-container button-text-bar" onClick={() => {
                    }}>{t('adoptionPetPage.search')}</div>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        {classicDropdown}
                    </Navbar.Collapse>
                </Navbar>
            </>
            }
            {!props.scroll && isMobile() &&
            <>
                <Navbar className="navbar navbar-light bg-light  navbar-search">
                    <div className="search-bar-container search-bar">
                        <div className="i-search">
                            {find}
                        </div>
                        <div className="button-search-container button-text-bar">{t('adoptionPetPage.search')}</div>
                    </div>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav">
                            {iconDropdown}
                        >
                    </Navbar.Collapse>
                </Navbar>
            </>
            }
        </div>
    );
}
