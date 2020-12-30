import {Image, Col} from "react-bootstrap";
import './AdoptionPet.css';
import React from "react";
import {useTranslation} from "react-i18next";
import {getAge} from "../../utils/adoption-function";
import {getGoodGender} from "../../utils/adoption-function";
import {saveRoute} from "../NavbarTop/NavbarTop";
import {cryptData} from "../../utils/user-infos";
import empty from "../../svg/mpl-pet-icon.svg";

export default function AdoptionPet(props) {
    const {
        pet
    } = props;


    function saveInformationPet(pet) {
        saveRoute("/plugAdoption")
        localStorage.setItem('pet', cryptData(pet, process.env.REACT_APP_TOKEN_SECRET))
    }

    const {t} = useTranslation();
    return (
        <Col xs={4.5} className="pet-container pet-text">
            <span className="link" onClick={() => saveInformationPet(pet)}>
                            <div className="pet-click-container"></div>
            </span>
            {pet.photo_one !== undefined && pet.photo_one !== "" &&
            <span className="link" onClick={() => saveInformationPet(pet)}>
                    <Image src={pet.photo_one} draggable={false} className="pic-pet-container"/>
            </span>
            }
            {(pet.photo_one === undefined || pet.photo_one === "") &&
            <span className="link" onClick={() => saveInformationPet(pet)}>
                    <Image src={empty} draggable={false} className="pic-pet-container"/>
            </span>
            }
            <span className="link" onClick={() => saveInformationPet(pet)}>
                 <div className="name-pet-container">
                    {pet.name}
                </div>
            </span>
            <div className="home-pet-container">
                {pet.association_name}
            </div>
            <div className="age-pet-container">
                {getAge(pet.birthDate, t('adoptionPetPage.month'), t('adoptionPetPage.years'), t('adoptionPetPage.year'), t('adoptionPetPage.months'))}
            </div>
            <div className="race-pet-container">
                {pet.species}
            </div>
            <div className="loc-pet-container">
                {pet.city}, {pet.country}
            </div>
            <div className="pet-bar">
                <span className="i-eyes-container">
                    <i className="fas fa-eye"/>
                </span>
                <span className="i-envelope-container">
                    <i className="fas fa-envelope"/>
                </span>
                <span className="i-heart-container">
                    <i className="fas fa-heart"/>
                </span>
                <span className="i-paw-container">
                    <i className="fas fa-paw"/>
                </span>
                <span className="i-cake-container">
                    <i className="fas fa-birthday-cake"/>
                </span>
                <span className="i-loc-container">
                    <i className="fas fa-map-marker"/>
                </span>
                <span className="i-home-container">
                    <i className="fas fa-home"/>
                </span>
                <span className="i-gender-container">
                    {getGoodGender(pet.sex)}
                </span>
            </div>
        </Col>
    );
};