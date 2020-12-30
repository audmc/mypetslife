import React from "react";
import './ProfileTopMenuElement.css'

export function ProfileTopMenuSeparator() {
    return (
        <div className="menu-top-separator"/>
    )
}

export default function ProfileTopMenuElement(props) {
    const isMobile = () => {
        return (window.innerWidth <= 425)
    }

    return (
        <li className={"nav-item menu-top-item" + (props.activeTab === props.value ? " menu-top-item-active" : "")}
            onClick={() => props.setActiveTab(props.value)}>
            <i className={props.icon + " mr-2 color-gradiant-red"}/>
            {
                !isMobile() &&
                props.text
            }
        </li>
    )
}
