import logo from '../../svg/logo.svg'
import React from "react";
import './Loader.css'
export default function Loader() {
    return (
        <div className="loading-container">
            <img draggable={false} className="icon-loading" src={logo} alt="MyPetsLife"/>
        </div>
    )
};
