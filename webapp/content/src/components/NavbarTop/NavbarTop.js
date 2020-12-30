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

export default function NavbarTop(props) {
    const { isConnected, isWelcomePage } = props;
    const { t } = useTranslation();

    const animation = (window.location.pathname === '/');

    const [showHealth, setShowHealth] = useState(false);
    const [showLife, setShowLife] = useState(false);
    const [showProfile, setShowProfile] = useState(false);

    const showHealthDropdown = () => {
        setShowHealth(!showHealth);
    }
    const hideHealthDropdown = () => {
        setShowHealth(false);
    }

    const showLifeDropdown = () => {
        setShowLife(!showLife);
    }
    const hideLifeDropdown = () => {
        setShowLife(false);
    }

    const showProfileDropdown = () => {
        setShowProfile(!showProfile);
    }
    const hideProfileDropdown = () => {
        setShowProfile(false);
    }

    const health = <>
        {t('navbarTop.health')} <i className="fa fa-chevron-down" />
    </>
    const life = <>
        {t('navbarTop.life')} <i className="fa fa-chevron-down" />
    </>

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
                    <NavDropdown title={health} id="navbarHealth"
                                 show={showHealth}
                                 onMouseEnter={showHealthDropdown}
                                 onMouseLeave={hideHealthDropdown}>
                        <NavDropdown.Item href="#action/2.1">{t('navbarTop.lifeDoc')}</NavDropdown.Item>
                        <NavDropdown.Item href="/health_book" onClick={() => (saveRoute("/health_book"))}>{t('navbarTop.healthBook')}</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title={life} id="navbarLife"
                                 show={showLife}
                                 onMouseEnter={showLifeDropdown}
                                 onMouseLeave={hideLifeDropdown}>
                        <NavDropdown.Item href="/adoption"
                                          onClick={() => (saveRoute("/adoption"))}>{t('navbarTop.adoption')}</NavDropdown.Item>
                        <NavDropdown.Item href="/outcome"
                                          onClick={() => (saveRoute("/outcome"))}>{t('navbarTop.budget')}</NavDropdown.Item>
                    </NavDropdown>

                    <Nav.Link href="#forum" onClick={() => (saveRoute("/forum"))}>{t('navbarTop.forum')}</Nav.Link>
                    <Nav.Link href="#blog" onClick={() => (saveRoute("/blog"))}>{t('navbarTop.blog')}</Nav.Link>
                    {
                        !isConnected &&
                        <>
                            <Nav.Link href="/login" onClick={() => (saveRoute("/"))}
                                      className={"navbar-connexion" + (window.location.pathname === "/login" ? " active-tab" : "")}>
                                {t('navbarTop.signIn')}
                            </Nav.Link>
                            <Nav.Link href="/register">{t('navbarTop.signUp')}</Nav.Link>
                        </>
                    }
                </Nav>
            </Navbar.Collapse>
            {
                isConnected &&
                <Nav className="navbar-nav-left">
                    <NavDropdown title={<i className="fa fa-user"/>} id="navbarProfile"
                                 show={showProfile}
                                 onMouseEnter={showProfileDropdown}
                                 onMouseLeave={hideProfileDropdown}
                                 onClick={() => (saveRoute("/profile"))}>
                        <NavDropdown.Item href="/profile"
                                          onClick={() => (saveRoute("/profile"))}>
                            {t('navbarTop.profile')}
                        </NavDropdown.Item>
                        <NavDropdown.Item onClick={() => (logout())}>{t('navbarTop.logout')}</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link><i className="fa fa-envelope" /></Nav.Link>
                </Nav >
            }
            <LanguageSelector />
        </Navbar >
    );
}
