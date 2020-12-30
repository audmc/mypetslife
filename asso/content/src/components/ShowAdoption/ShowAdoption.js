import React, {useState, useEffect} from "react";
import "./ShowAdoption.css";
import {useTranslation} from "react-i18next";
import NavbarTop from "../NavbarTop/NavbarTop";
import {Row, Col, Spinner} from "react-bootstrap";
import {Form} from "react-bootstrap";

import {
    sortableContainer,
    sortableElement,
    sortableHandle
} from "react-sortable-hoc";

import SearchLocationInput from "../SearchLocationInput/SearchLocationInput";
import speciesList from "../../utils/species";
import racesList from "../../utils/races";
import petColorList from "../../utils/pet-color";
import user from "../../svg/mpl-pet-icon.svg";
import PopupEditProfilePicture from "../PopupEditProfilePicture/PopupEditProfilePicture";
import api from "../../utils/api"
import {useAuth} from "../../context/auth";
import {cryptData, decryptData, retrievedFromJwt, retrieveLanguage} from "../../utils/user-infos";
import {format} from 'date-fns';
import Toasts from "../Toasts/Toasts";
import PopupValidatePublishedAdoptionChange
    from "../PopupValidatePublishedAdoptionChange/PopupValidatePublishedAdoptionChange";
import PopupDeleteAdoption from "../PopupDeleteAdoption/PopupDeleteAdoption";

export default function ShowAdoption() {
    const {t} = useTranslation();
    const {authTokens} = useAuth();

    const [items, setItems] = useState([]);

    const [users, setUsers] = useState([]);

    const [category, setCategory] = useState("all");

    const [selectedPet, setSelectedPet] = useState("");

    const [photoOne, setPhotoOne] = useState(selectedPet ? selectedPet.photoOne : "");
    const [showPhotoOnePopup, setShowPhotoOnePopup] = useState(false);

    const [photoTwo, setPhotoTwo] = useState("");
    const [showPhotoTwoPopup, setShowPhotoTwoPopup] = useState(false);

    const [photoThree, setPhotoThree] = useState("");
    const [showPhotoThreePopup, setShowPhotoThreePopup] = useState(false);

    const [nameValue, setNameValue] = useState("");
    const [sexValue, setSexValue] = useState("");
    const [sterilizedValue, setSterilizedValue] = useState("");
    const [crossValue, setCrossValue] = useState("");

    const [birthDateValue, setBirthDateValue] = useState("");

    const [specieValue, setSpecieValue] = useState("");
    const [raceValue, setRaceValue] = useState("");
    const [raceValue2, setRaceValue2] = useState("");

    const [sizeValue, setSizeValue] = useState("");
    const [sizeUnit, setSizeUnit] = useState("");
    const [robeValue, setRobeValue] = useState("");

    const [addressValue, setAddressValue] = useState("");
    const [descriptionValue, setDescriptionValue] = useState("");
    const [infosValue, setInfosValue] = useState("");

    const [searchInProgress, setSearchInProgress] = useState(false);
    const [petInProgress, setPetInProgress] = useState(false);
    const [updateInProgress, setUpdateInProgress] = useState(false);
    const [folderInProgress, setFolderInProgress] = useState(false);

    const [showToastEditSuccess, setShowToastEditSuccess] = useState(false);
    const [showToastEditFailure, setShowToastEditFailure] = useState(false);

    const [showToastDeleteSuccess, setShowToastDeleteSuccess] = useState(false);
    const [showToastDeleteFailure, setShowToastDeleteFailure] = useState(false);

    const [showPopupValidatePublishedAdoptionChange, setShowPopupValidatePublishedAdoptionChange] = useState(false);
    const [showPopupDeleteAdoption, setShowPopupDeleteAdoption] = useState(false);
    const [statusValue, setStatusValue] = useState("");

    function researchPets(species) {
        setSearchInProgress(true);
        setItems([]);
        setSelectedPet("");
        const token = {
            name: retrievedFromJwt(authTokens).name,
            status: localStorage.getItem("type"),
            category:  species,
        };
        api.getAdoptionsLabels(cryptData(token, process.env.REACT_APP_TOKEN_SECRET)).then( result => {
            setSearchInProgress(false);
            if(result.status === 200){
                console.log(decryptData(result.data.findAdoption, process.env.REACT_APP_TOKEN_SECRET).findAdoption)
                setItems(decryptData(result.data.findAdoption, process.env.REACT_APP_TOKEN_SECRET).findAdoption);
                if(!localStorage.getItem("pet-id") && decryptData(result.data.findAdoption, process.env.REACT_APP_TOKEN_SECRET).findAdoption[0]){
                    getPet(decryptData(result.data.findAdoption, process.env.REACT_APP_TOKEN_SECRET).findAdoption[0]._id);
                    getFolders(decryptData(result.data.findAdoption, process.env.REACT_APP_TOKEN_SECRET).findAdoption[0]._id);
                }
            }
        })
    }

    function handleChangeToastEditSuccess (state) {
        setShowToastEditSuccess(state);
    }

    function handleChangeToastEditFailure (state) {
        setShowToastEditFailure(state);
    }

    function handleChangeToastDeleteSuccess (state) {
        setShowToastDeleteSuccess(state);
    }

    function handleChangeToastDeleteFailure (state) {
        setShowToastDeleteFailure(state);
    }

    function getPet(id) {
        setPetInProgress(true);
        const token = {
            id: id,
        };
        api.getOneAdoption(cryptData(token, process.env.REACT_APP_TOKEN_SECRET)).then( result => {
            setPetInProgress(false);
            if(result.status === 200){
                const pet = decryptData(result.data.findAdoption, process.env.REACT_APP_TOKEN_SECRET).findAdoption;
                setSelectedPet(pet);
                setPhotoOne(pet.photo_one);
                setPhotoTwo(pet.photo_two);
                setPhotoThree(pet.photo_three);
                setNameValue(pet.name);
                setSexValue(pet.sex);
                setSterilizedValue(pet.sterilisation);
                setCrossValue(pet.cross);
                setBirthDateValue(format(new Date(pet.birthDate), 'yyyy-MM-dd'));
                setSpecieValue(pet.species);
                setRaceValue(pet.race);
                setRaceValue2(pet.race_two);
                setSizeValue(pet.size);
                setSizeUnit(pet.size_unit);
                setRobeValue(pet.color);
                setAddressValue(pet.address);
                setDescriptionValue(pet.description);
                setInfosValue(pet.additional_information)
            }
        });
        getFolders(id);
    }

    function getFolders(id) {
        setFolderInProgress(true);
        api.getAdoptionsAskingLabels(cryptData({_id : id },process.env.REACT_APP_TOKEN_SECRET)).then( result =>{
            setFolderInProgress(false);
            if(result.status === 200) {
                setUsers(decryptData(result.data.findAdoption, process.env.REACT_APP_TOKEN_SECRET).findAdoption);
                if(localStorage.getItem("pet-id"))
                    localStorage.removeItem("pet-id");
            }
        });
    }

    function updatePet(status){
        setUpdateInProgress(true);
        const token = {
            id: selectedPet._id,
            position: selectedPet.position,
            association_id: retrievedFromJwt(authTokens)._id,
            status: status === "" ? selectedPet.status : status,
            change_status: status === "" ? false : true,
            new_status: (selectedPet.status === "published" ? status !== "" : false),
            tr: retrieveLanguage(),
            photo_one: photoOne,
            photo_two: photoTwo,
            photo_three: photoThree,
            name: nameValue,
            sex: sexValue,
            sterilisation: sterilizedValue,
            cross: crossValue,
            birthDate: birthDateValue,
            species: specieValue,
            race: raceValue,
            race_two: raceValue2,
            size: sizeValue,
            size_unit: sizeUnit,
            color: robeValue,
            address: addressValue,
            description: descriptionValue,
            additional_information: infosValue
        };
        api.updateAdoption(cryptData(token, process.env.REACT_APP_TOKEN_SECRET)).then( result => {
            setUpdateInProgress(false);
            setPetInProgress(false);
            if(result.status === 200){
                handleChangeToastEditSuccess(true);
                if(status !== "") {
                    localStorage.setItem("pet-id", cryptData(selectedPet._id, process.env.REACT_APP_TOKEN_SECRET));
                    localStorage.setItem("type", status);
                    window.location = "/adoption";
                }
            }else{
                handleChangeToastEditFailure(true);
            }
        })
    }

    function goToFolder(id){
        localStorage.setItem("folder-id", cryptData(id, process.env.REACT_APP_TOKEN_SECRET));
        window.location = "/folders";
    }

    useEffect(() => {
        researchPets("all");
        if(localStorage.getItem("pet-id")){
            getPet(decryptData(localStorage.getItem("pet-id"), process.env.REACT_APP_TOKEN_SECRET).data);
            getFolders(decryptData(localStorage.getItem("pet-id"), process.env.REACT_APP_TOKEN_SECRET).data);
        }
    }, []);

    function handleChangeAddress(newAddress) {
        setAddressValue(newAddress);
    }

    const arrayMoveMutate = (array, from, to) => {
        array.splice(to < 0 ? array.length + to : to, 0, array.splice(from, 1)[0]);
    };

    const arrayMove = (array, from, to) => {
        array = array.slice();
        arrayMoveMutate(array, from, to);
        return array;
    };

    function onSortEnd({oldIndex, newIndex}) {
        setItems(arrayMove(items, oldIndex, newIndex));
        api.updatePosition(cryptData(arrayMove(items, oldIndex, newIndex), process.env.REACT_APP_TOKEN_SECRET))
    }

    const DragHandle = sortableHandle(() => (
        <span className="dragHandler">
            <i className="fas fa-list-ul"/>
        </span>
    ));

    const SortableItem = sortableElement(({value}) => (
        <div className="dragElement link" onClick={() => getPet(value._id)}>
            <span>{value.name}</span>
            <DragHandle/>
        </div>
    ));

    const SortableContainer = sortableContainer(({children}) => {
        return <div className="dragContainer">{children}</div>;
    });

    function handleEditPhotoOne() {
        setShowPhotoOnePopup(!showPhotoOnePopup);
    }

    function handleChangePhotoOne(newPhoto) {
        setPhotoOne(newPhoto);
    }

    function handleEditPhotoTwo() {
        setShowPhotoTwoPopup(!showPhotoTwoPopup);
    }

    function handleChangePhotoTwo(newPhoto) {
        setPhotoTwo(newPhoto);
    }

    function handleEditPhotoThree() {
        setShowPhotoThreePopup(!showPhotoThreePopup);
    }

    function handleChangePhotoThree(newPhoto) {
        setPhotoThree(newPhoto);
    }

    function handleValidatePublishedAdoptionChange() {
        setShowPopupValidatePublishedAdoptionChange(!showPopupValidatePublishedAdoptionChange);
    }

    function handleValidate() {
        updatePet(statusValue)
    }

    function handleValidateDeleteAdoption() {
        setShowPopupDeleteAdoption(!showPopupDeleteAdoption);
    }

    function handleDelete() {
        const token = {
            _id: selectedPet._id,
        };
        api.deleteAdoption(cryptData(token, process.env.REACT_APP_TOKEN_SECRET)).then( result => {
            if (result.status === 200) {
                handleChangeToastDeleteSuccess(true);
                researchPets(category);
            }else{
                handleChangeToastDeleteFailure(true);
            }
        });
    }

    return (
        <>
            {
                showPhotoOnePopup &&
                <PopupEditProfilePicture photo={photoOne}
                                         onClosed={() => handleEditPhotoOne()}
                                         onChangePhotoOne={handleChangePhotoOne}
                />
            }
            {
                showPhotoTwoPopup &&
                <PopupEditProfilePicture photo={photoTwo}
                                         onClosed={() => handleEditPhotoTwo()}
                                         onChangePhotoTwo={handleChangePhotoTwo}
                />
            }
            {
                showPhotoThreePopup &&
                <PopupEditProfilePicture photo={photoThree}
                                         onClosed={() => handleEditPhotoThree()}
                                         onChangePhotoThree={handleChangePhotoThree}
                />
            }
            {
                showPopupValidatePublishedAdoptionChange &&
                <PopupValidatePublishedAdoptionChange onValidate={handleValidate}
                                         onClosed={() => handleValidatePublishedAdoptionChange()}
                />
            }
            {
                showPopupDeleteAdoption &&
                <PopupDeleteAdoption onValidate={handleDelete}
                                     onClosed={() => handleValidateDeleteAdoption()}
                />
            }
            <NavbarTop/>
            <div className="full-page-w-nav background-page">
                <h5 className="adoption-main-title">
                    {t('adoption.menu.' + localStorage.getItem("type"))}
                </h5>
                <div className="adoption-container">
                    <div className="adoption-navigation">
                        <div className="adoption-nav-left w-100">
                            <div
                                className={"adoption-nav-item" + (category === "all" ? " adoption-nav-item-active" : "")}
                                onClick={() => {setCategory("all"); researchPets("all")}}>
                                {t('all')}
                            </div>
                            <div
                                className={"adoption-nav-item" + (category === "dog" ? " adoption-nav-item-active" : "")}
                                onClick={() => {setCategory("dog"); researchPets("dog")}}>
                                {t('pets:species.dog')}
                            </div>
                            <div
                                className={"adoption-nav-item" + (category === "cat" ? " adoption-nav-item-active" : "")}
                                onClick={() => {setCategory("cat"); researchPets("cat")}}>
                                {t('pets:species.cat')}
                            </div>
                            <div
                                className={"adoption-nav-item" + (category === "nac" ? " adoption-nav-item-active" : "")}
                                onClick={() => {setCategory("nac"); researchPets("nac")}}>
                                {t('pets:species.nac')}
                            </div>
                        </div>
                        {/*
                        <div className="adoption-searchbar">
                            <div className="adoption-search-input">
                                <i className="fa fa-search color-gradiant-green"/>
                                <input id="adoption-search-input" type="text" placeholder={t('home.search')}/>
                            </div>
                        </div>
                        }*/}
                    </div>
                    <Row>
                        <Col lg={2}>
                            <div className="adoption-pet-list py-2 font-2 blue-scroll">
                                {items.length === 0 && !searchInProgress &&
                                    <p className="px-2">{t('adoption.noAdoptionFind')}</p>
                                }
                                { searchInProgress &&
                                    <div className="text-center my-3">
                                        <Spinner animation="border" className="color-green"/>
                                    </div>
                                }
                                <SortableContainer onSortEnd={onSortEnd} useDragHandle>
                                    {items.map((value, index) => (
                                        <SortableItem key={`item-${index}`} index={index} value={value}/>
                                    ))}
                                </SortableContainer>
                            </div>
                        </Col>
                        <Col lg={4}>
                            <div className="adoption-pet-card blue-scroll">
                                {
                                    !selectedPet && !petInProgress &&
                                    <p className="m-4"><i className="fas fa-arrow-left color-green"/> {t('adoption.noAdoption')}</p>
                                }
                                {
                                    petInProgress &&
                                    <div className="text-center my-3">
                                        <Spinner animation="border" className="color-green"/>
                                    </div>
                                }
                                {
                                    selectedPet && !petInProgress &&
                                    <>
                                        <Row className="px-4 pt-1 text-center mb-2">
                                            <Col lg={4}>
                                                <div className="position-relative">
                                                    <img draggable={false} className="mpl-profile-picture"
                                                         src={(photoOne !== "") ? photoOne : user} alt={"One"}/>
                                                    <div className="mpl-profile-picture-overlay-container">
                                                        <div className="mpl-profile-picture-overlay"
                                                             onClick={() => setShowPhotoOnePopup(true)}>
                                                            <div className="w-100 text-center">
                                                                <i className="fas fa-edit fa-2x color-gradiant-black"/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col lg={4}>
                                                <div className="position-relative">
                                                    <img draggable={false} className="mpl-profile-picture"
                                                         src={(photoTwo !== "") ? photoTwo : user} alt={"Two"}/>
                                                    <div className="mpl-profile-picture-overlay-container">
                                                        <div className="mpl-profile-picture-overlay"
                                                             onClick={() => setShowPhotoTwoPopup(true)}>
                                                            <div className="w-100 text-center">
                                                                <i className="fas fa-edit fa-2x color-gradiant-black"/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col lg={4}>
                                                <div className="position-relative">
                                                    <img draggable={false} className="mpl-profile-picture"
                                                         src={(photoThree !== "") ? photoThree : user} alt={"Three"}/>
                                                    <div className="mpl-profile-picture-overlay-container">
                                                        <div className="mpl-profile-picture-overlay"
                                                             onClick={() => setShowPhotoThreePopup(true)}>
                                                            <div className="w-100 text-center">
                                                                <i className="fas fa-edit fa-2x color-gradiant-black"/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg={12}>
                                                <input className="input-mpl w-100" placeholder={t('adoption.name')} value={nameValue}
                                                onChange={(e) => setNameValue(e.target.value)}/>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg={4} className="adoption-selector-container font-2">
                                                <div
                                                    className={("link adoption-right-selector adoption-small ") + (sexValue === "male" ? "adoption-selector-active" : "")}
                                                    onClick={() => (setSexValue("male"))}>
                                                    <div className="adoption-selector-text">{t('adoption.male')}</div>
                                                </div>
                                                <div
                                                    className={("link adoption-left-selector adoption-small ") + (sexValue === "female" ? "adoption-selector-active" : "")}
                                                    onClick={() => (setSexValue("female"))}>
                                                    <div className="adoption-selector-text">{t('adoption.female')}</div>
                                                </div>
                                            </Col>
                                            <Col lg={4} className="adoption-selector-container">
                                                <div
                                                    className={("link adoption-right-selector adoption-small ") + (sterilizedValue ? "adoption-selector-active" : "")}
                                                    onClick={() => (setSterilizedValue(true))}>
                                                    <div
                                                        className="adoption-selector-text"> {t('adoption.sterilized')}
                                                    </div>
                                                </div>
                                                <div
                                                    className={("link adoption-left-selector adoption-small ") + (!sterilizedValue ? "adoption-selector-active" : "")}
                                                    onClick={() => (setSterilizedValue(false))}>
                                                    <div
                                                        className="adoption-selector-text">{t('adoption.notSterilized')}
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col lg={4} className="adoption-selector-container">
                                                <div
                                                    className={("link adoption-right-selector adoption-small ") + (crossValue ? "adoption-selector-active" : "")}
                                                    onClick={() => (setCrossValue(true))}>
                                                    <div className="adoption-selector-text">{t('adoption.cross')}</div>
                                                </div>
                                                <div
                                                    className={("link adoption-left-selector adoption-small ") + (!crossValue ? "adoption-selector-active" : "")}
                                                    onClick={() => (setCrossValue(false))}>
                                                    <div className="adoption-selector-text">{t('adoption.notCross')}</div>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg={6}>
                                                <Form.Control as="select"
                                                              className="input-mpl w-100"
                                                              value={specieValue}
                                                              style={ specieValue === "" ? {color: "#8a8a8a"} : {}}
                                                              onChange={(e) => setSpecieValue(e.target.value)}>
                                                    <option key={0} value={""} disabled>{t('adoption.species')}</option>
                                                    {speciesList.map((item, i) =>
                                                        <option key={i}
                                                                value={item}>{t("pets:species." + item)}</option>)}
                                                    )
                                                </Form.Control>
                                            </Col>
                                            <Col lg={6} className="adoption-selector-container">
                                                <input className="input-mpl w-100"
                                                       style={ !birthDateValue ? {color: "#8a8a8a"} : {}}
                                                       type="date"
                                                       value={birthDateValue}
                                                       onChange={(e) => setBirthDateValue(e.target.value)}
                                                />
                                            </Col>
                                        </Row>
                                        {specieValue &&
                                        <Row>
                                            <Col lg={crossValue ? 6 : 12}>
                                                <Form.Control as="select"
                                                              className="input-mpl w-100"
                                                              value={raceValue}
                                                              style={ raceValue === "" ? {color: "#8a8a8a"} : {}}
                                                              onChange={(e) => setRaceValue(e.target.value)}>
                                                    <option key={0} value={""}
                                                            disabled>Race {crossValue ? "1" : ""}</option>
                                                    {
                                                        specieValue === "" &&
                                                        <option key={1} value={""}
                                                                disabled>{t('adoption.selectSpecies')}</option>
                                                    }
                                                    {
                                                        specieValue !== "" &&
                                                        racesList[specieValue].map((item, i) =>
                                                            <option key={i}
                                                                    value={item}>{t("pets:races." + specieValue + "." + item)}
                                                            </option>
                                                        )
                                                    }
                                                </Form.Control>
                                            </Col>
                                            {
                                                crossValue &&
                                                <Col lg={6}>
                                                    <Form.Control as="select"
                                                                  className="input-mpl w-100"
                                                                  value={raceValue2}
                                                                  style={ raceValue2 === "" ? {color: "#8a8a8a"} : {}}
                                                                  onChange={(e) => setRaceValue2(e.target.value)}>
                                                        <option key={0} value={""} disabled>Race 2</option>
                                                        {
                                                            specieValue === "" &&
                                                            <option key={1} value={""}
                                                                    disabled>{t('adoption.selectSpecies')}</option>
                                                        }
                                                        {
                                                            specieValue !== "" &&
                                                            racesList[specieValue].map((item, i) =>
                                                                <option key={i}
                                                                        value={item}>{t("pets:races." + specieValue + "." + item)}
                                                                </option>
                                                            )
                                                        }
                                                    </Form.Control>
                                                </Col>
                                            }
                                        </Row>
                                        }
                                        <Row>
                                            <Col lg={12}>
                                                <Form.Control as="select"
                                                              className="input-mpl w-100"
                                                              value={robeValue}
                                                              style={ robeValue === "" ? {color: "#8a8a8a"} : {}}
                                                              onChange={(e) => setRobeValue( e.target.value)}>
                                                    <option key={0} value={""} disabled>{t('adoption.color')}</option>
                                                    {petColorList.map((item, i) =>
                                                        <option key={i} value={item}>{t("pets:color." + item)}</option>
                                                    )}
                                                </Form.Control>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg={12} className="d-flex">
                                                    <div className="pl-0 w-75 mr-2">
                                                        <input
                                                            placeholder={t('adoption.adultSize')}
                                                            className="input-mpl w-100"
                                                            type="number"
                                                            value={sizeValue}
                                                            onChange={(e) => setSizeValue( e.target.value)}/>
                                                    </div>
                                                    <div className="pr-0 w-25">
                                                        <Form.Control as="select"
                                                                      className="input-mpl  w-100 color-dark "
                                                                      style={ sizeUnit === "" ? {color: "#8a8a8a"} : {}}
                                                                      value={sizeUnit}
                                                                      onChange={(e) => setSizeUnit(e.target.value)}>
                                                            <option value="m">m</option>
                                                            <option value="cm">cm</option>
                                                            <option value="yd">yd</option>
                                                            <option value="inch">inch</option>
                                                        </Form.Control>
                                                    </div>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col lg={12}>
                                                <SearchLocationInput value={addressValue} className={"input-mpl"}
                                                                     onChange={handleChangeAddress}
                                                                     placeholder={t('adoption.address')}/>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg={12}>
                                                <textarea className="input-mpl w-100 blue-scroll"
                                                          style={{height: "100px", lineHeight:"20px"}}
                                                          placeholder={t('adoption.description')} maxLength="250" value={descriptionValue}
                                                          onChange={(e) => setDescriptionValue(e.target.value)}/>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg={12}>
                                                <textarea className="input-mpl w-100 blue-scroll" placeholder={t('adoption.infos')} value={infosValue}
                                                          maxLength="250" onChange={(e) => setInfosValue(e.target.value)}/>
                                            </Col>
                                        </Row>
                                        <Row>
                                            {updateInProgress &&
                                                <Col lg={12}>
                                                <div className="text-center my-1">
                                                    <Spinner animation="border" className="color-green"/>
                                                </div>
                                                </Col>
                                            }
                                            { !updateInProgress && localStorage.getItem("type") !== "archived" &&
                                                <Col lg={4}>
                                                    <div className="btn-mpl-primary w-100 px-0"
                                                    onClick={() => updatePet("")}>
                                                        {t('adoption.modify')}
                                                    </div>
                                                </Col>
                                            }
                                            {
                                                !updateInProgress && localStorage.getItem("type") === "archived" &&
                                                <>
                                                    <Col lg={4}>
                                                        <div className="btn-mpl-primary w-100 px-0"
                                                             onClick={() => updatePet("waiting")}>
                                                            {t('adoption.save')}
                                                        </div>
                                                    </Col>
                                                    <Col lg={4}>
                                                        <div className="btn-mpl-primary w-100 px-0 my-1"
                                                             onClick={() => updatePet("published")}>
                                                            {t('adoption.publish')}
                                                        </div>
                                                    </Col>
                                                    <Col lg={4}>
                                                        <div className="btn-mpl-primary w-100 px-0"
                                                             onClick={() => setShowPopupDeleteAdoption(true)}>
                                                            {t('adoption.delete')}
                                                        </div>
                                                    </Col>
                                                </>
                                            }
                                            {
                                                !updateInProgress && localStorage.getItem("type") === "published" &&
                                                <>
                                                    <Col lg={4}>
                                                        <div className="btn-mpl-primary w-100 px-0 my-1"
                                                             onClick={() => {setStatusValue("waiting"); setShowPopupValidatePublishedAdoptionChange(true)}}>
                                                            {t('adoption.save')}
                                                        </div>
                                                    </Col>
                                                    <Col lg={4}>
                                                        <div className="btn-mpl-primary w-100 px-0"
                                                             onClick={() => {setStatusValue("archived"); setShowPopupValidatePublishedAdoptionChange(true)}}>
                                                            {t('adoption.archive')}
                                                        </div>
                                                    </Col>
                                                </>
                                            }
                                            {
                                                !updateInProgress && localStorage.getItem("type") === "waiting" &&
                                                <>
                                                    <Col lg={4}>
                                                        <div className="btn-mpl-primary w-100 px-0 my-1"
                                                             onClick={() => updatePet("archived")}>
                                                            {t('adoption.archive')}
                                                        </div>
                                                    </Col>
                                                    <Col lg={4}>
                                                        <div className="btn-mpl-primary w-100 px-0"
                                                             onClick={() => updatePet("published")}>
                                                            {t('adoption.publish')}
                                                        </div>
                                                    </Col>
                                                </>
                                            }
                                        </Row>
                                    </>
                                }
                            </div>
                        </Col>
                        {
                            selectedPet && !petInProgress &&
                            <Col lg={6}>
                                <div className="adoption-pet-details">
                                    <Row>
                                        <Col lg={6}>
                                            <div className="adoption-blue-title my-2">
                                                <p>{t('adoption.menu.received')}</p>
                                            </div>
                                            {
                                                folderInProgress &&
                                                <div className="text-center my-3">
                                                    <Spinner animation="border" className="color-green"/>
                                                </div>
                                            }
                                            {
                                                !folderInProgress && users.length !== 0 &&
                                                <div className="folders-users-container blue-scroll">
                                                    {users.map((value, index) => (
                                                        <div className="folders-users"  onClick={() => goToFolder(value._id)}>
                                                            <p>{value.user_name}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            }

                                            {
                                                !folderInProgress && users.length === 0 &&
                                                <div className="folders-users-container px-2 font-2 blue-scroll">
                                                    {t('adoption.noFolderFind')}
                                                </div>
                                            }
                                        </Col>
                                        <Col lg={6}>
                                            <div className="adoption-big-button my-2">
                                                <p>{t('navbarTop.healthbook')}</p>
                                            </div>
                                            {/*
                                            <div className="adoption-big-button mb-2">
                                                <p>{t('adoption.documents')}</p>
                                            </div> */}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg={12}>
                                            <div className="adoption-blue-title my-2 w-100">
                                                <p>{t('adoption.statistics')}</p>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        }
                    </Row>
                </div>
            </div>
            <Toasts onChangeSuccess={handleChangeToastEditSuccess} showSuccess={showToastEditSuccess} successTitle={t('toaster.updateSuccessTitle')}
                    successTime={t('toaster.justNow')} successContent={t('toaster.updateSuccess')}
                    onChangeFailure={handleChangeToastEditFailure} showFailure={showToastEditFailure} failureTitle={t('toaster.updateFailureTitle')}
                    failureTime={t('toaster.justNow')} failureContent={t('toaster.updateFailure')}
            />
            <Toasts onChangeSuccess={handleChangeToastDeleteSuccess} showSuccess={showToastDeleteSuccess} successTitle={t('toaster.deleteSuccessTitle')}
                    successTime={t('toaster.justNow')} successContent={t('toaster.updateSuccess')}
                    onChangeFailure={handleChangeToastDeleteFailure} showFailure={showToastDeleteFailure} failureTitle={t('toaster.deleteFailureTitle')}
                    failureTime={t('toaster.justNow')} failureContent={t('toaster.deleteFailure')}
            />
        </>
    );

}
