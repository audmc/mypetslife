import './PlugAdoptionBack.css';
import {Carousel, Image, Row} from "react-bootstrap";
import {saveRoute} from "../NavbarTop/NavbarTop";
import {decryptData} from "../../utils/user-infos";
import {getDate} from "../../utils/adoption-function";
import {useTranslation} from "react-i18next";
import empty from "../../svg/mpl-pet-icon.svg";
import React from "react";
import PlugAdoptionDescription from "../PlugAdoptionDescription/PlugAdoptionDescription";


export default function PlugAdoptionBack() {


    const {t} = useTranslation();
    let pet = {};

    if (decryptData(localStorage.getItem("pet"), process.env.REACT_APP_TOKEN_SECRET) !== null && decryptData(localStorage.getItem("pet"), process.env.REACT_APP_TOKEN_SECRET) !== undefined) {
        pet = decryptData(localStorage.getItem("pet"), process.env.REACT_APP_TOKEN_SECRET).data;
    }

    return (
        <div className="body">
            <>
                <div className="plug-background">
                    <Row className="full-page-w-nav plug-adoption-bg">
                        <div className="back-page-container">
                        <span className="link" onClick={() => (saveRoute("/adoption"))}><i
                            className="fa fa-chevron-circle-left fa-2x color-green"/></span>
                        </div>
                        <div className="parent-container">
                            {(pet.photo_two === undefined && pet.photo_one !== undefined) && pet.photo_one !== "" &&
                            <Image src={pet.photo_one} draggable={false} className="picture-plug-container"/>
                            }
                            {((pet.photo_two === undefined && pet.photo_one === undefined) || pet.photo_one === "") &&
                            <Image src={empty} draggable={false} className="picture-plug-container"/>
                            }
                            {pet.photo_two !== undefined &&
                            <React.StrictMode>
                                <Carousel className="picture-plug-container" wrap={false}>
                                    <Carousel.Item>
                                        {pet.photo_one !== undefined && pet.photo_one !== "" &&
                                        <Image src={pet.photo_one} draggable={false} className="picture-plug-one-container"/>
                                        }
                                        {(pet.photo_one === undefined || pet.photo_one === "") &&
                                        <Image src={empty} draggable={false} className="picture-plug-one-container"/>
                                        }
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <Image src={pet.photo_two} draggable={false} className="picture-plug-one-container"/>
                                    </Carousel.Item>
                                    {pet.photo_three !== undefined &&
                                    <Carousel.Item>
                                        <Image src={pet.photo_three} draggable={false} className="picture-plug-one-container"/>
                                    </Carousel.Item>
                                    }
                                </Carousel>
                            </React.StrictMode>
                            }
                            <PlugAdoptionDescription pet={pet}/>
                            <div className="bar-left-container">
                                <span className="hearth-container">
                                    <i className="fas fa-heart"/>
                                </span>
                                <span className="env-container">
                                    <i className="fas fa-envelope"/>
                                </span>
                                <span className="eyes-container">
                            <i className="fas fa-eye"/>
                        </span>
                            </div>
                            <div className="bar-right-container font-2" onClick={() => (saveRoute("/adoption"))}>
                                {t("plugAdoptionPage.plugAdoptionButton")}
                            </div>
                            <div className="bar-bottom-container">
                                <div className="txt-date-container font-2">
                                    {getDate(pet.publication_date, t('plugAdoptionPage.adoption_date'))}
                                </div>
                            </div>
                        </div>
                    </Row>
                </div>
            </>
        </div>
    )
}
