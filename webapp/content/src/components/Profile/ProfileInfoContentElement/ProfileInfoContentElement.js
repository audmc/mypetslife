import React from "react";
import './ProfileInfoContentElement.css'
import {useTranslation} from "react-i18next";

export default function ProfileInfoContentElement(props) {
    const {t} = useTranslation();
    const undefinedValue = <span className="profile-info-element-undefined">{t('contact.emptyField')}</span>

    return (
        <p className="profile-info-element">
            <i className={props.icon + " color-gradiant-" + props.iconColor}/>
            {
                (typeof props.value === "undefined" || props.value === null || props.value === "") ? undefinedValue : (props.text ? props.text : props.value)
            }
        </p>
    );
}

ProfileInfoContentElement.defaultProps = {
    iconColor: "green",
    text: null
}
