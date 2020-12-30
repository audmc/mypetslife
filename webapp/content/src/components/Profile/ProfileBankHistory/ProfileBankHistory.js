import React from "react";
import './ProfileBankHistory.css'

export default function ProfileBankHistory(props) {
    return (
        <div className="profile-bank-history-element">
            <div className="d-flex mb-1">
                <div className="profile-bank-history-element-date"> {props.date} </div>
                <div className="profile-bank-history-price">{props.price}</div>
            </div>
            <div className="profile-bank-history-description">
                <div className="profile-bank-history-shape"/>
                {props.description}
            </div>
        </div>
    );
}
