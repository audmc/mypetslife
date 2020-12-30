import './AdoptionPage.css';
import AdoptionBackground from '../../svg/adoption-illustration.svg';
import '../AdoptionPageSelection/AdoptionPageSelection.css';
import {Image, Row, Navbar} from "react-bootstrap";
import PageButton from "../AdoptionPageSelection/AdoptionPageSelection";
import AdoptionBar from "../AdoptionBar/AdoptionBar";
import AdoptionPet from "../AdoptionPet/AdoptionPet";
import AdoptionButton from "../AdoptionButton/AdoptionButton";
import React, {useEffect, useState} from "react";
import api from '../../utils/adoption-api';
import {useTranslation} from "react-i18next";

export default function AdoptionPage() {

    const [showNavbarSearch, setShowNavbarSearch] = useState(true);
    const [axiosCount, setAxiosCount] = useState(1);
    const [axiosAdoption, setAxiosAdoption] = useState({name: ''});
    const [pageNumber, setPageNumber] = useState(1);

    const handleScroll = (func, wait = 20, immediate = true) => {
        const position = window.pageYOffset;
        setShowNavbarSearch(position <= 205)
    };

    function handleChangePage(newPageNumber) {
        setPageNumber(newPageNumber);
        api.getAllAdoptions(newPageNumber).then(result => {
            if (result.status === 200) {
                setAxiosAdoption(result.data.findAdoption);
            }
        });
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, {passive: true});
        api.getAllAdoptions(pageNumber).then(result => {
            if (result.status === 200) {
                setAxiosAdoption(result.data.findAdoption);
            }
        });
        api.countAdoptions().then(result => {
            if (result.status === 200) {
                setAxiosCount(Math.round(result.data.pageNumber));
            }
        });
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };

    }, [showNavbarSearch, setAxiosAdoption, pageNumber, setAxiosCount]);
    const {t} = useTranslation();
    return (
            <>
                <Row
                    className="full-page-w-nav adoption-bg">
                    {showNavbarSearch  &&
                    <>
                        <Image draggable={false} src={AdoptionBackground} className="welcome-adoption-pic-container"/>
                        <div className="text-adoption-container text-bar">
                            {t('adoptionPetPage.title')}
                        </div>
                        <div className="text-description-adoption-container tb-bar">
                            {t('adoptionPetPage.description')}
                        </div>
                    </>
                    }

                    <AdoptionBar scroll={showNavbarSearch}/>
                        <Row className="pet-page-container">
                            {Object.keys(axiosAdoption).map((adoption, i) => (
                                <AdoptionPet
                                             pet={axiosAdoption[adoption]}
                                             key={i}>
                                </AdoptionPet>
                            ))
                            }
                            <Navbar className="navbar-bottom-page">
                                <PageButton max={axiosCount} value={pageNumber} onChange={handleChangePage}/>
                            </Navbar>
                        </Row>
                    <AdoptionButton/>
                </Row>
            </>
    );
}