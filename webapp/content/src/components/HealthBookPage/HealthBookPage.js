import React, {useCallback} from "react";
import { useState, useEffect } from 'react';
import { Toast } from "react-bootstrap";
import './HealthBookPage.css';


import petDefaultAvatar from '../../svg/mpl-pet-icon.svg';
import beautySalon from '../../svg/icon-map-beauty-salon.svg';
import veterinaryCare from '../../svg/icon-map-veterinary-care.svg';

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import { ButtonTextIcon } from '../../utils/responsive-functions';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { useTranslation } from 'react-i18next';
import HealthBookInfoSection from '../HealthBookInfoSection/HealthBookInfoSection';
import apiPets from "../../utils/apiPets";
import HealthBookPopupEditSectionGlobal from "../HealthBookPopupEditSectionGlobal/HealthBookPopupEditSectionGlobal";
import HealthBookPopupEditSectionVeterinary from "../HealthBookPopupEditSectionVeterinary/HealthBookPopupEditSectionVeterinary";
import blankInfoSection from "./blankInfoSection";
import HealthBookPetMenu from "../HealthBookPetMenu/HealthBookPetMenu";

/**
 * Component HEALTHBOOK
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export default function HealthBookPage(props) {

    const [ showPopupEditGlobal, setShowPopupEditGlobal ] = useState(false);
    const [ showToastEditGlobalSuccess, setShowToastEditGlobalSuccess ] = useState(false);
    const [ showToastEditGlobalFailure, setShowToastEditGlobalFailure ] = useState(false);
    const [ showPopupEditVeterinarian, setShowPopupEditVeterinarian ] = useState(false);
    const [ showToastEditVeterinarianSuccess, setShowToastEditVeterinarianSuccess ] = useState(false);
    const [ showToastEditVeterinarianFailure, setShowToastEditVeterinarianFailure ] = useState(false);

    const [ petsNames, setPetsNames ] = useState("");

    const [ selectedPetId, setSelectedPetId ] = useState("");
    const [ petName, setPetName ] = useState("");
    const [ petAvatar, setPetAvatar ] = useState("");
    const [ petInfos, setPetInfos ] = useState("");

    const user_id = props.user_id;

    const { t } = useTranslation();

    let infoSectionData;

    function handleChangePopupGlobal(state) {
        setShowPopupEditGlobal(state);
    }

    function handleChangePopupVeterinarian(state) {
        setShowPopupEditVeterinarian(state);
    }

    /**
     * Handle update of components without querying again
     * @param state
     * @param target
     */
    function handleChangePopupUpdate(state, target) {
        if (target === 'global') {
            try {
                infoSectionData = JSON.parse(JSON.stringify(petInfos));
                infoSectionData.global.forEach((item, i) => item.description = state[i]);
                setPetName(state[0]);
                let newNames = JSON.parse(JSON.stringify(petsNames));
                for (let i = 0; i < newNames.length; i++) {
                    if (newNames[i]._id === selectedPetId && petsNames[i].name !== state[0]) {
                        newNames[i].name = state[0];
                    }

                }
                setPetsNames(newNames);
            } catch {

            }
        } else if (target === 'veterinary') {
            try {
                infoSectionData = JSON.parse(JSON.stringify(petInfos));
                infoSectionData.veterinarian.forEach((item, i) => item.description = state[i]);
            } catch {

            }
        }
        setPetInfos(infoSectionData);
    }

    function handleChangeToastEditGlobalSuccess (state) {
        setShowToastEditGlobalSuccess(state);
    }

    function handleChangeToastEditGlobalFailure (state) {
        setShowToastEditGlobalFailure(state);
    }

    function handleChangeToastEditVeterinarySuccess (state) {
        setShowToastEditVeterinarianSuccess(state);
    }

    function handleChangeToastEditVeterinaryFailure (state) {
        setShowToastEditVeterinarianFailure(state);
    }

    function handleChangeSelectedPetId (state) {
        selectPet(state);
    }

    /**
     *  Select active pet
     * @param pet_id
     */
    const selectPet = useCallback((pet_id) => {
        if (selectedPetId !== pet_id) {
            setSelectedPetId(pet_id);
            getPetInfos(pet_id);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /**
     *  Fetch pet infos and dispatch them
     * @param pet_id
     */
    function getPetInfos(pet_id) {
        apiPets.getInfos(pet_id).then(
            result => {
                if (result.status === 200) {
                    let infos = result.data.infos;
                    infoSectionData = JSON.parse(JSON.stringify(blankInfoSection));
                    infoSectionData.global[0].description = infos.name;
                    infoSectionData.global[1].description = infos.sex;
                    infoSectionData.global[2].description = infos.species;
                    infoSectionData.global[3].description = infos.race;
                    infoSectionData.global[4].description = infos.birth_date;
                    infoSectionData.global[5].description = infos.welcome_date;
                    infoSectionData.veterinarian[0].description = infos.neutering;
                    infoSectionData.veterinarian[1].description = infos.microchip;
                    infoSectionData.veterinarian[2].description = infos.tattoo;
                    infoSectionData.veterinarian[3].description = infos.vet_name;
                    infoSectionData.veterinarian[4].description = infos.vet_phone;
                    infoSectionData.veterinarian[5].description = infos.vet_address;
                    if (infos.avatar) {
                        setPetAvatar(infos.avatar);
                    } else {
                        setPetAvatar(petDefaultAvatar);
                    }
                    setPetInfos(infoSectionData);
                    setPetName(infos.name);
                } else {
                    setPetInfos(blankInfoSection);
                }
            }
        );
    }

    /**
     * Load user's pets ids and names
     */
    useEffect(() => {
        apiPets.getPetsName(user_id).then(
            result => {
                if (result.status === 200) {
                    setPetsNames(result.data.petsname);
                    if (result.data.petsname.some( item => typeof item == 'object'))
                        selectPet(result.data.petsname[0]._id);
                } else if (result.status === 201) {
                    window.location.href = window.location.origin;
                }
            }
        );
    }, [selectPet, user_id])

    /**
     * Resize healthbook and its components dynamically
     */
    function onResize() {
        let book_box = document.getElementById("healthbook-box-col");
        let book_space = document.getElementById("healthbook-space");
        let book_space_box = book_space.getBoundingClientRect();
        let w = book_space_box.width;
        let h = book_space_box.height;
        let pages = document.getElementsByClassName("healthbook-book");


        // book dimensions
        if (w >= 1200) {
            const book_ratio = 1.4;
            let book_width;
            let book_height;
            if (w < book_ratio * h) {
                book_width = Math.ceil(w * 0.9);
                book_height = Math.ceil(book_width / book_ratio);
            } else {
                book_height = Math.ceil(h * 0.9)
                book_width = Math.ceil(book_height * book_ratio);
            }
            book_box.style.setProperty('width', book_width.toString() + "px");
            book_box.style.setProperty('height', book_height.toString() + "px");
        } else {

            book_box.style.removeProperty('width');
            book_box.style.removeProperty('height');
            book_box.style.removeProperty('margin');
        }
        // title font_size
        let page_rec = pages[0].getBoundingClientRect();
        let font_size;

        font_size = Math.ceil(((page_rec.height > page_rec.width) ? page_rec.height : page_rec.width) *  0.015);

        for (var i = 0; i < pages.length; i++) {
            pages[i].style.setProperty('font-size', font_size.toString() + 'px');
        }
        // pet portrait size
        let portrait = document.getElementById("healthbook-portrait");
        let portrait_box = portrait.parentElement;
        let portrait_rec = portrait_box.getBoundingClientRect();
        let portrait_width = portrait_rec.width;
        let portrait_height = portrait_rec.height;

        if (portrait_height > portrait_width) {
            portrait.style.setProperty('height', portrait_width.toString() + 'px');
            portrait.style.setProperty('width', portrait_width.toString() + 'px');
        } else {
            portrait.style.setProperty('width', portrait_height.toString() + 'px');
            portrait.style.setProperty('height', portrait_height.toString() + 'px');
        }
    }
    useEffect(() => {
        window.addEventListener('resize', onResize);
        onResize();
    }, [petAvatar])


    /**
     * Cover page (left page)
     * @returns {JSX.Element}
     * @constructor
     */
    function HealthbookCoverPage() {
        return (
            <>
                <Row className="healthbook-title-container">
                    <Col xs={12} id="healthbook-title-box">
                        <div className="healthbook-title">{t('healthbook.title')}</div>
                    </Col>
                    <Col xs={12} className="healthbook-petname-container">
                        <div className="healthbook-title">{petName}</div>
                    </Col>
                </Row>
                <Row className="healthbook-status-container">
                    <Col xs={6} id="healthbook-portrait-box">
                        <Image draggable={false} src={petAvatar} id="healthbook-portrait"/>
                    </Col>
                    {
                        (localStorage.getItem("i18nextLng")!=="en") &&
                        <Col xs={6} className="healthbook-status-progress-container">
                            <Row className="healthbook-completed-container">
                                <div className="healthbook-completed-text" id='swapTarget1'>{t('healthbook.complete')}</div>
                            </Row>
                            <Row>
                                <div className="healthbook-percent-text" id='swapTarget2'>60%</div>
                            </Row>
                            <Row style={{display: "inline"}}>
                                <ProgressBar variant={"progressbar-custom"} stripped="true" animated now={60} />
                            </Row>
                        </Col>
                    }
                    {
                        (localStorage.getItem("i18nextLng")==="en") &&
                        <Col xs={6} className="healthbook-status-progress-container">
                            <Row className="healthbook-completed-container">
                                <div className="healthbook-percent-text" id='swapTarget2'>60%</div>
                            </Row>
                            <Row>
                                <div className="healthbook-completed-text" id='swapTarget1'>{t('healthbook.complete')}</div>
                            </Row>
                            <Row style={{display: "inline"}}>
                                <ProgressBar variant={"progressbar-custom"} stripped="true" animated now={60} />
                            </Row>
                        </Col>
                    }
                </Row>
                <Row className="healthbook-graph-container">
                </Row>
                <Row className="healthbook-page-btn-container">
                    <Col  xs={4} className="healthbook-page-button-container">
                        <div className="btn-mpl-primary w-90 healthbook-btn-text healthbook-dropshadow" id="healthbook-btn-budget">
                            <ButtonTextIcon icon={"fas fa-wallet"} text={t('healthbook.budget')} customStyle={{fontSize: '2.3em'}}/>
                        </div>
                    </Col>
                    <Col xs={4} className="healthbook-page-button-container">
                        <div className="btn-mpl-primary w-90 healthbook-btn-text healthbook-dropshadow">
                            <ButtonTextIcon icon={"fas fa-file-alt"} text={t('healthbook.documents')} customStyle={{fontSize: '2.3em'}}/>
                        </div>
                    </Col>
                    <Col xs={4} className="healthbook-page-button-container">
                        <div className="btn-mpl-primary w-90 healthbook-btn-text healthbook-dropshadow">
                            <ButtonTextIcon icon={"fas fa-user-alt"} text={t('healthbook.profile')} customStyle={{fontSize: '2.3em'}}/>
                        </div>
                    </Col>
                </Row>
            </>
        );
    }

    /**
     * Information (right) page
     * @returns {JSX.Element}
     * @constructor
     */
    function HealthBookInfos () {

        var infos = petInfos;

        return (
            <>
                <HealthBookInfoSection infos={infos} onChangeGlobal={handleChangePopupGlobal} onChangeVeterinary={handleChangePopupVeterinarian}/>
            </>
        );
    }

    return (
        <>
            {
                showPopupEditGlobal &&
                <HealthBookPopupEditSectionGlobal
                    name={petInfos.global[0].description}
                    sex={petInfos.global[1].description}
                    species={petInfos.global[2].description}
                    race={petInfos.global[3].description}
                    birthDate={petInfos.global[4].description}
                    welcomeDate={petInfos.global[5].description}
                    pet_id={selectedPetId}
                    onClosed={() => setShowPopupEditGlobal(false)}
                    onUpdate={handleChangePopupUpdate}
                    onSuccess={handleChangeToastEditGlobalSuccess}
                    onFailure={handleChangeToastEditGlobalFailure}/>
            }
            {
                showPopupEditVeterinarian &&
                <HealthBookPopupEditSectionVeterinary
                    neutering={petInfos.veterinarian[0].description}
                    microchip={petInfos.veterinarian[1].description}
                    tatto={petInfos.veterinarian[2].description}
                    veterinary_name={petInfos.veterinarian[3].description}
                    veterinary_phone={petInfos.veterinarian[4].description}
                    veterinary_address={petInfos.veterinarian[5].description}
                    onClosed={() => setShowPopupEditVeterinarian(false)}
                    pet_id={selectedPetId}
                    onUpdate={handleChangePopupUpdate}
                    onSuccess={handleChangeToastEditVeterinarySuccess}
                    onFailure={handleChangeToastEditVeterinaryFailure}/>
            }
            <div className="full-page-w-nav">
                <div className="healthbook-bg"/>
                <div id="healthbook-space">
                    <div className="healthbook-container" id="healthbook-box-col">
                        <Row className="healthbook-book2">
                            <Col xl={6} xs={12}>
                                <Row className="healthbook-book" id="healthbook-leftside-row">
                                    <Col xs={12} xl={1} className="petname-navbar">
                                        <Row className="petname-navbar-row">
                                            <HealthBookPetMenu petsNames={petsNames} selectedPetId={selectedPetId} onChange={handleChangeSelectedPetId}/>
                                        </Row>
                                    </Col>
                                    <Col xs={12} xl={11} className="healthbook-page healthbook-dropshadow" id="healthbook-leftpage">
                                        <HealthbookCoverPage/>
                                    </Col>
                                </Row>
                            </Col>
                            <Col xl={6} xs={12}>
                                <Row className="healthbook-book health-book-left-page">
                                    <Col xs={12} xl={11} className="healthbook-page healthbook-dropshadow">
                                        <HealthBookInfos/>
                                    </Col>
                                    <Col xs={12} xl={1} className="healthbook-submenu">
                                        <Row className="healthbook-submenu-row">
                                            <Col xl={12} xs={"auto"} className="healthbook-submenu-tab healthbook-dropshadow healthbook-submenu-tab-selected ">
                                            <span className="healthbook-fontawesome1 healthbook-fontawesome1-selected">
                                                <i className="fas fa-address-card"/>
                                            </span>
                                            </Col>
                                            <Col xl={12} xs={"auto"} className="healthbook-submenu-tab healthbook-dropshadow">
                                            <span className="healthbook-fontawesome1">
                                                <i className="fas fa-tachometer-alt"/>
                                            </span>
                                            </Col>
                                            <Col xl={12} xs={"auto"} className="healthbook-submenu-tab healthbook-dropshadow">
                                            <span className="healthbook-fontawesome1">
                                                <i className="fas fa-heartbeat"/>
                                            </span>
                                            </Col>
                                            <Col xl={12} xs={"auto"} className="healthbook-submenu-tab healthbook-dropshadow">
                                            <span className="healthbook-fontawesome1">
                                                <Image draggable={false} src={beautySalon} style={{height: "1em", marginBottom: "3px"}}/>
                                            </span>
                                            </Col>
                                            <Col xl={12} xs={"auto"} className="healthbook-submenu-tab healthbook-dropshadow">
                                            <span className="healthbook-fontawesome1">
                                                <Image draggable={false} src={veterinaryCare} style={{height: "1em", marginBottom: "3px"}}/>
                                            </span>
                                            </Col>
                                            <Col xl={12} xs={"auto"} className="healthbook-submenu-tab healthbook-dropshadow">
                                            <span className="healthbook-fontawesome1">
                                                <i className="fas fa-camera-retro"/>
                                            </span>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
            <div className="toast-container">
                <Toast className="toast"
                       onClose={() => setShowToastEditGlobalSuccess(false)}
                       show={showToastEditGlobalSuccess}
                       delay={10000}
                       autohide>
                    <Toast.Header>
                    <span className="healthbook-fontawesome3">
                        <i className="fas fa-check-circle"/>
                    </span>
                        <strong className="mr-auto m-rigth-5p">{t('healthbook.sectionGlobalInfo.title')}</strong>
                        <small style={{marginLeft: "10px"}}>{t('healthbook.popup.justNow')}</small>
                    </Toast.Header>
                    <Toast.Body className="font-2">
                        {t('healthbook.popupSuccess')}
                    </Toast.Body>
                </Toast>
                <Toast className="toast"
                       onClose={() => setShowToastEditVeterinarianSuccess(false)}
                       show={showToastEditVeterinarianSuccess}
                       delay={10000}
                       autohide>
                    <Toast.Header>
                    <span className="healthbook-fontawesome3">
                        <i className="fas fa-check-circle"/>
                    </span>
                        <strong className="mr-auto m-rigth-5p">{t('healthbook.sectionVeterinarianInfo.title')}</strong>
                        <small style={{marginLeft: "10px"}}>{t('healthbook.popup.justNow')}</small>
                    </Toast.Header>
                    <Toast.Body className="font-2">
                        {t('healthbook.popupSuccess')}
                    </Toast.Body>
                </Toast>
                <Toast className="toast"
                       onClose={() => setShowToastEditGlobalFailure(false)}
                       show={showToastEditGlobalFailure}
                       delay={10000}
                       autohide>
                    <Toast.Header>
                    <span className="healthbook-fontawesome3">
                        <i className="fas fa-exclamation-triangle"/>
                    </span>
                        <strong className="mr-auto m-rigth-5p">{t('healthbook.sectionGlobalInfo.title')}</strong>
                        <small style={{marginLeft: "10px"}}>{t('healthbook.popup.justNow')}</small>
                    </Toast.Header>
                    <Toast.Body className="font-2">
                        {t('healthbook.popupFailure')}
                    </Toast.Body>
                </Toast>
                <Toast className="toast"
                       onClose={() => setShowToastEditVeterinarianFailure(false)}
                       show={showToastEditVeterinarianFailure}
                       delay={10000}
                       autohide>
                    <Toast.Header>
                    <span className="healthbook-fontawesome3">
                        <i className="fas fa-exclamation-triangle"/>
                    </span>
                        <strong className="mr-auto m-rigth-5p">{t('healthbook.title')}</strong>
                        <small style={{marginLeft: "10px"}}>{t('healthbook.popup.justNow')}</small>
                    </Toast.Header>
                    <Toast.Body className="font-2">
                        {t('healthbook.popupFailure')}
                    </Toast.Body>
                </Toast>
            </div>
        </>
    );
}
