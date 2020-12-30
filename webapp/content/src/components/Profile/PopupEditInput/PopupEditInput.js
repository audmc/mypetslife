import React, {useState} from "react";
import './PopupEditInput.css'
import {useTranslation} from "react-i18next";

export default function PopupEditInput(props) {
    const {t} = useTranslation();
    const [showPassword, setShowPassword] = useState(true);
    return (
        <div className="input-edit-container">
            <i className={props.icon + " input-edit-icon color-gradiant-green"}/>
            <input className={"input-edit" + (!props.value ? " input-edit-empty" : "")}
                   type={(props.inputType === "password") ? (showPassword ? "text" : "password") : props.inputType}
                   value={props.value}
                   placeholder={!props.value ? props.inputPlaceholder : ""}
                   onChange={(e) => props.handleValue(e.target.value)}/>
            {
                props.inputType === "password" &&
                <i className="fas fa-eye-slash input-edit-show-password"
                   onClick={() => setShowPassword(!showPassword)}/>
            }
            {
                props.required && !props.value &&
                <p className="input-edit-alert">{t('contact.emptyField')}</p>
            }
        </div>
    )
}

PopupEditInput.defaultProps = {
    inputType: "text"
}
