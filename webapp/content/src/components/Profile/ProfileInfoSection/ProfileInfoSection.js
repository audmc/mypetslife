import React from "react";
import './ProfileInfoSection.css'

export default function ProfileInfoSection(props) {
    return (
        <>
            <div className="profile-infos-section-title">
                <h5><i className="fas fa-list-alt mr-2 color-gradiant-red"/>{props.title}</h5>
            </div>
            <div className="profile-infos-section-body">
                <div className="profile-infos-section-edit zoom-1" onClick={props.onEditSection}>
                    <i className="fas fa-edit color-gradiant-red"/>
                </div>
                {props.children}
            </div>
        </>
    );
}
