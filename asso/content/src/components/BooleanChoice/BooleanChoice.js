import React, {useState} from "react";
import './BooleanChoice.css';

export default function BooleanChoice(props) {
    const [booleanState, setBooleanState] = useState(props.initialState);
    const trueValue = props.trueValue ? props.trueValue : true;
    const falseValue = props.falseValue ? props.falseValue : false;

    function handleStateChange(value) {
        //setBooleanState(value);
        //props.handleStateChange(value);
    }

    return (
        <div className={"boolean-choice"}>
            <div className="boolean-choice-title">{props.title}</div>
            <div className="boolean-choice-body">
                <div
                    className={"boolean-choice-item text-capitalize" + ((booleanState === trueValue) ? " boolean-choice-item-active" : "")}
                    onClick={() => handleStateChange(trueValue)}>
                    <i className={props.trueIcon + " mr-2 color-gradiant-green"}/>
                    {props.trueText}
                </div>
                <div
                    className={"boolean-choice-item text-capitalize" + ((booleanState === falseValue) ? " boolean-choice-item-active" : "")}
                    onClick={() => handleStateChange(falseValue)}>
                    <i className={props.falseIcon + " mr-2 color-gradiant-green"}/>
                    {props.falseText}
                </div>
            </div>
        </div>
    )
}
