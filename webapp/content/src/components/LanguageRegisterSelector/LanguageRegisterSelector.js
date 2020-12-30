import {Image} from "react-bootstrap";
import React from "react";
import {useTranslation} from "react-i18next";
import './LanguageRegisterSelector.css';
import frenchFlag from '../../svg/flags/french.svg'
import englishFlag from '../../svg/flags/english.svg'
import germanFlag from '../../svg/flags/german.svg'
import spanishFlag from '../../svg/flags/spanish.svg'
import portugueseFlag from '../../svg/flags/portuguese.svg'
import italianFlag from '../../svg/flags/italian.svg'

export default function LanguageRegisterSelector() {

    const {i18n} = useTranslation();

    function changeLanguage(i18n, lng) {
        i18n.changeLanguage(lng);
    }

    function flagImage(flagName) {
        return (
            <Image
                className="language-selector-flag zoom-2"
                draggable={false}
                src={flagName}
            />
        )
    }

    function flagItem(language, flagName) {
        return (
            <div className="flag-selection" onClick={() => changeLanguage(i18n,language)}>
                {flagImage(flagName)}
            </div>
        )
    }

    return (
        <div className="language-register-selector">
            <div>
            {flagItem('fr', frenchFlag)}
            {flagItem('en', englishFlag)}
            {flagItem('de', germanFlag)}
            {flagItem('es', spanishFlag)}
            {flagItem('pt', portugueseFlag)}
            {flagItem('it', italianFlag)}
            </div>
        </div>
    )
}
