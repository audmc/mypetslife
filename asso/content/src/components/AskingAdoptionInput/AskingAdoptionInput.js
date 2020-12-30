import React, {useState} from "react";
import './AskingAdoptionInput.css'
import {useTranslation} from "react-i18next";

export default function AskingAdoptionInput(props) {
    const {t} = useTranslation();
    return (
        <div className="input-edit-container">
            <i className={props.icon + " input-edit-icon color-gradiant-green"}/>
            <input className={"input-edit" + (!props.value ? " input-edit-empty" : "")}
                   type={props.inputType}
                   value={props.value}
                   placeholder={!props.value ? props.inputPlaceholder : ""}
                   disabled={true}
                   onChange={(e) => props.handleValue(e.target.value)}/>
        </div>
    )
}

AskingAdoptionInput.defaultProps = {
    inputType: "text"
}
