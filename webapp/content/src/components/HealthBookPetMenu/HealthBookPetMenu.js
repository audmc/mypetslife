import React from "react";
import Col from "react-bootstrap/Col";
import './HealthBookPetMenu.css';

/**
 * Construct the petMenu's tabs
 * @returns {JSX.Element|null}
 * @constructor
 */
export default function HealthBookPetMenu(props){

    const { petsNames, selectedPetId, onChange } = props;

    try {
        let tab = petsNames;
        return (
            <>
                {tab.map( (pet, i) => (
                        <Col key={i} xl={12} xs={"auto"} className={("healthbook-petname-tab healthbook-dropshadow healthbook-petname-tab-") + (tab.length) + ((selectedPetId === pet._id) ? " healthbook-petname-tab-selected" : "")} onClick={() => {onChange(pet._id)}}>
                            <div className="healthbook-petname-div">
                                    <span className={("healthbook-peticon ") + ((selectedPetId === pet._id) ? "healthbook-peticon-selected" : "")}>
                                        <i className="fas fa-paw"/>
                                    </span>
                                {pet.name}
                            </div>
                        </Col>
                    )
                )}
            </>
        );
    } catch {
        return null;
    }
}