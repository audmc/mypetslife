import '../PlugAdoptionBack/PlugAdoptionBack.css';
import React from "react";
import "./PlugAdoptionDescription.css"
import {Col, Row} from "react-bootstrap";
import {getAge, getGoodGender} from "../../utils/adoption-function";
import {useTranslation} from "react-i18next";

export default function PlugAdoptionDescription(props) {
    const {
        pet,
    } = props;

    const { t } = useTranslation();

    return (
        <div className="description-container">
            <div className="name-description-container">
                {pet.name}
            </div>
            <Row lg={2} className="col-top first-top-container">
                    <Col className="col-top icon-container">
                        <i className="fas fa-paw icon-property"/>
                        {t("pets:species." + pet.species)} - {t("pets:color." + pet.color)}
                    </Col>
                <Col className="col-top icon-container">
                    <i className="fas fa-dna icon-property"/>
                    {((pet.race_two !== "" && pet.race_two !== undefined) ? t("pets:races." + pet.species + "." + pet.race) + "/" + t("pets:races." + pet.species + "." + pet.race_two) : t("pets:races." + pet.species + "." + pet.race))}
                </Col>
            </Row>
                <Row lg={2} className="col-top">
                    <Col className="col-top icon-container">
                        <i className="fas fa-birthday-cake icon-property"/>
                        {getAge(pet.birthDate, t('adoptionPetPage.year'), t('adoptionPetPage.years'), t('adoptionPetPage.month'), t('adoptionPetPage.months'))}
                    </Col>
                    <Col className="col-top icon-container">
                        <i className="icon-property">
                            {getGoodGender(pet.sex)}
                        </i>
                        {pet.sex === "female" ? t('register.stepThree.petFemale') : t('register.stepThree.petFemale')}
                    </Col>
                </Row>
                <Row lg={2} className="col-top mb-2">
                    <Col className="col-top icon-container">
                        <i className="fas fa-microchip icon-property"/>
                        {pet.microchip ? t('plugAdoptionPage.ship') : t('plugAdoptionPage.not_ship')}
                    </Col>
                    <Col className="col-top icon-container">
                        <i className="fas fa-syringe icon-property"/>
                        {pet.sterilisation ?  t('plugAdoptionPage.neutering') : t('plugAdoptionPage.not_neutering')}
                    </Col>
                </Row>
                <div className="txt-plug-description-container">
                    {pet.description}
                </div>
                <div className="txt-plug-description-v2-container">
                    {pet.additional_information}
                </div>
                <Row lg={2} className="col-bottom second-bottom-container">
                    <Col className="icon-bottom-container">
                        <i className="fas fa-home icon-property"/>
                        {pet.association_name}
                    </Col>
                    <Col className="col-bottom icon-bottom-container">
                        <i className="fas fa-map-marker icon-property"/>
                        {pet.city}, {pet.country}
                    </Col>
                </Row>
        </div>
    )
}
