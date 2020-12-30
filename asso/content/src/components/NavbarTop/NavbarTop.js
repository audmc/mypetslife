import React, {useState} from "react";
import './NavbarTop.css';
import logoWhite from '../../svg/logo-white.png'
import {Nav, NavDropdown, Navbar, Image} from "react-bootstrap";
import {useTranslation} from 'react-i18next';
import LanguageSelector from "../LanguageSelector/LanguageSelector";

export function saveRoute(route) {
    localStorage.setItem("route", route);
    window.location.href = route;
}

function goTo(route, name){
    localStorage.setItem("type", name);
    localStorage.setItem("route", route);
    window.location = route;
}

export default function NavbarTop(props) {
    const { isWelcomePage } = props;
    const { t } = useTranslation();

    const animation = (window.location.pathname === '/');

    const [showAdoption, setShowAdoption] = useState(false);
    //const [showFamily, setShowFamily] = useState(false);

    const showAdoptionDropdown = () => {
        setShowAdoption(!showAdoption);
    };
    const hideAdoptionDropdown = () => {
        setShowAdoption(false);
    };

    /*const showFamilyDropdown = () => {
        setShowFamily(!showFamily);
    }
    const hideFamilyDropdown = () => {
        setShowFamily(false);
    }
    const family = <>
        {t('navbarTop.family')} <i className="fa fa-chevron-down" />
    </>;
    */

    const adoption = <>
        {t('navbarTop.adoption')} <i className="fa fa-chevron-down" />
    </>;

    function logout() {
        localStorage.removeItem("tokens");
        window.location.href = '/';
    }

    return (
        <Navbar
            className={(isWelcomePage ? "navbar-welcome" : "shadow navbar-top") + (animation && !isWelcomePage ? " navbar-animation" : "")}
            expand="lg"
            fixed={isWelcomePage ? "" : "top"}
            variant={"dark"}>
            {
                !isWelcomePage &&
                <Navbar.Brand href="/">
                    <Image
                        draggable={false}
                        src={logoWhite}
                        width="46"
                        height="46"
                        className="navbar-logo"
                        alt="My Pets Life logo"
                    />
                </Navbar.Brand>
            }

            <Navbar.Toggle aria-controls={isWelcomePage ? "welcome-navbar-nav" : "top-navbar-nav"}
                className={"ml-auto mr-3"}
            />
            <Navbar.Collapse id={isWelcomePage ? "welcome-navbar-nav" : "top-navbar-nav"}>
                <Nav className={isWelcomePage ? "navbar-nav-center welcome-navbar-nav" : "navbar-nav-center"}>
                    <NavDropdown title={adoption} id="navbarAdoption"
                                 show={showAdoption}
                                 onMouseEnter={showAdoptionDropdown}
                                 onMouseLeave={hideAdoptionDropdown}
                                 onClick={() => (saveRoute("/adoption_menu"))}>
                        <NavDropdown.Item href="/adoption" onClick={() => (goTo("/adoption","published"))}>{t('adoption.menu.published')}</NavDropdown.Item>
                        <NavDropdown.Item href="/adoption" onClick={() => (goTo("/adoption","archived"))}>{t('adoption.menu.archived')}</NavDropdown.Item>
                        <NavDropdown.Item href="/add_adoption" onClick={() => (saveRoute("/add_adoption"))}>{t('adoption.menu.new')}</NavDropdown.Item>
                        <NavDropdown.Item href="/adoption" onClick={() => (goTo("/adoption","waiting"))}>{t('adoption.menu.waitingShort')}</NavDropdown.Item>
                        <NavDropdown.Item href="/folders" onClick={() => (saveRoute("/folders"))}>{t('adoption.menu.received')}</NavDropdown.Item>
                    </NavDropdown>
                    {/*
                    <NavDropdown title={family} id="navbarFamily"
                                 show={showFamily}
                                 onMouseEnter={showFamilyDropdown}
                                 onMouseLeave={hideFamilyDropdown}
                                 onClick={() => (saveRoute("/family_menu"))}>
                        <NavDropdown.Item href="/" onClick={() => (saveRoute("/"))}>{t('adoption.menu.published')}</NavDropdown.Item>
                        <NavDropdown.Item href="/" onClick={() => (saveRoute("/"))}>{t('adoption.menu.archived')}</NavDropdown.Item>
                        <NavDropdown.Item href="/" onClick={() => (saveRoute("/"))}>{t('adoption.menu.new')}</NavDropdown.Item>
                        <NavDropdown.Item href="/" onClick={() => (saveRoute("/"))}>{t('adoption.menu.waitingShort')}</NavDropdown.Item>
                        <NavDropdown.Item href="/" onClick={() => (saveRoute("/"))}>{t('adoption.menu.received')}</NavDropdown.Item>
                    </NavDropdown>*/}

                    <Nav.Link href="#forum" onClick={() => (saveRoute("/"))}>{t('navbarTop.web')}</Nav.Link>
                    <Nav.Link href="/infos" onClick={() => (saveRoute("/infos"))}>{t('navbarTop.infos')}</Nav.Link>
                    <Nav.Link href="#blog" onClick={() => (saveRoute("/"))}>{t('navbarTop.stats')}</Nav.Link>
                    <Nav.Link href="#blog" onClick={() => (saveRoute("/"))}>{t('navbarTop.healthbook')}</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            <Nav.Link href="#" onClick={() => (logout())}><i className="fas fa-sign-out-alt"/></Nav.Link>
            <LanguageSelector />
        </Navbar >
    );
}
