import React from "react";
import { isMobileOnly } from "react-device-detect";

export function ButtonTextIcon(props) {
    if (isMobileOnly) {
        return <i className={props.icon} style={props.customStyle}/>;
    } else {
        return (props.text);
    }
}
