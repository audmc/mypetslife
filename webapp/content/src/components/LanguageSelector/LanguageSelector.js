import {Image, NavDropdown} from "react-bootstrap";
import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import './LanguageSelector.css';
import frenchFlag from '../../svg/flags/french.svg'
import englishFlag from '../../svg/flags/english.svg'
import germanFlag from '../../svg/flags/german.svg'
import spanishFlag from '../../svg/flags/spanish.svg'
import portugueseFlag from '../../svg/flags/portuguese.svg'
import italianFlag from '../../svg/flags/italian.svg'

export default function LanguageSelector() {
    const {i18n} = useTranslation();
    const [showTrads, setShowTrads] = useState(false);

    const showTradsDropdown = () => {
        setShowTrads(!showTrads);
    }
    const hideTradsDropdown = () => {
        setShowTrads(false);
    }

    function changeLanguage(i18n, lng) {
        i18n.changeLanguage(lng);
    }

    function flagImage(flagName) {
        return (
            <Image
                className="language-selector-flag"
                draggable={false}
                src={flagName}
            />
        )
    }

    function flagItem(language, flagName) {
        return (
            <NavDropdown.Item onClick={() => changeLanguage(i18n, language)}>
                {flagImage(flagName)}
            </NavDropdown.Item>
        )
    }

    return (
        <NavDropdown className="language-selector" title={<i className="fa fa-globe"/>}
                     id="languageDropdown"
                     show={showTrads}
                     onMouseEnter={showTradsDropdown}
                     onMouseLeave={hideTradsDropdown}>
            {flagItem('fr', frenchFlag)}
            {flagItem('en', englishFlag)}
            {flagItem('de', germanFlag)}
            {flagItem('es', spanishFlag)}
            {flagItem('pt', portugueseFlag)}
            {flagItem('it', italianFlag)}
        </NavDropdown>
    )
}
