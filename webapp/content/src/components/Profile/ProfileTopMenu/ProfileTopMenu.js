import React from "react";
import './ProfileTopMenu.css'

export default function ProfileTopMenu(props) {

    return (
        <div className="menu-top-container">
            <ul className="nav menu-top-nav">
                {props.children}
            </ul>
        </div>
    );
}
