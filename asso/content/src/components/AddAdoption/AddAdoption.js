import React, {useState} from "react";
import "./AddAdoption.css";
import {useTranslation} from "react-i18next";
import NavbarTop from "../NavbarTop/NavbarTop";
import {Row, Col, Spinner} from "react-bootstrap";
import {Form} from "react-bootstrap";

import SearchLocationInput from "../SearchLocationInput/SearchLocationInput";
import speciesList from "../../utils/species";
import racesList from "../../utils/races";
import petColorList from "../../utils/pet-color";
import user from "../../svg/mpl-pet-icon.svg";
import PopupEditProfilePicture from "../PopupEditProfilePicture/PopupEditProfilePicture";
import api from "../../utils/api"
import {useAuth} from "../../context/auth";
import {cryptData, decryptData, retrievedFromJwt, retrieveLanguage} from "../../utils/user-infos";
import Toasts from "../Toasts/Toasts";
import {getAge, getGoodGender} from "../../utils/adoption-function";

export default function AddAdoption() {
    const {t} = useTranslation();
    const {authTokens} = useAuth();

    const [photoOne, setPhotoOne] = useState("");
    const [showPhotoOnePopup, setShowPhotoOnePopup] = useState(false);

    const [photoTwo, setPhotoTwo] = useState("");
    const [showPhotoTwoPopup, setShowPhotoTwoPopup] = useState(false);

    const [photoThree, setPhotoThree] = useState("");
    const [showPhotoThreePopup, setShowPhotoThreePopup] = useState(false);

    const [nameValue, setNameValue] = useState("");
    const [sexValue, setSexValue] = useState("male");
    const [sterilizedValue, setSterilizedValue] = useState(false);
    const [crossValue, setCrossValue] = useState(false);

    const [birthDateValue, setBirthDateValue] = useState("");

    const [specieValue, setSpecieValue] = useState("");
    const [raceValue, setRaceValue] = useState("");
    const [raceValue2, setRaceValue2] = useState("");

    const [sizeValue, setSizeValue] = useState("");
    const [sizeUnit, setSizeUnit] = useState("m");
    const [robeValue, setRobeValue] = useState("");

    const [addressValue, setAddressValue] = useState("");
    const [descriptionValue, setDescriptionValue] = useState("");
    const [infosValue, setInfosValue] = useState("");

    const [error, setError] = useState(false);
    const [updateInProgress, setUpdateInProgress] = useState(false);

    const [showToastEditSuccess, setShowToastEditSuccess] = useState(false);
    const [showToastEditFailure, setShowToastEditFailure] = useState(false);

    function handleChangeToastEditSuccess(state) {
        setShowToastEditSuccess(state);
    }

    function handleChangeToastEditFailure(state) {
        setShowToastEditFailure(state);
    }

    function allIsCompleted(){
        if(nameValue && sexValue
            && birthDateValue && specieValue && raceValue && sizeValue
            && sizeUnit && robeValue && addressValue && descriptionValue){
            if(crossValue){
                return !!raceValue2;
            }else {
                return true;
            }
        }
        return false;
    }

    function addPet(status) {
        setError(false);
        if(allIsCompleted()) {
            setUpdateInProgress(true);
            const token = {
                association_id: retrievedFromJwt(authTokens)._id,
                association_name: retrievedFromJwt(authTokens).name,
                status: status,
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
            api.addAdoption(cryptData(token, process.env.REACT_APP_TOKEN_SECRET)).then(result => {
                setUpdateInProgress(false);
                if (result.status === 200) {
                    handleChangeToastEditSuccess(true);
                    localStorage.setItem("pet-id", cryptData(decryptData(result.data.findAdoption, process.env.REACT_APP_TOKEN_SECRET).Adoption._id, process.env.REACT_APP_TOKEN_SECRET));
                    localStorage.setItem("type", status);
                    window.location = "/adoption";
                } else {
                    handleChangeToastEditFailure(true);
                }
            })
        }else{
            setError(true);
        }
    }

    function handleChangeAddress(newAddress) {
        setAddressValue(newAddress);
    }

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
            <NavbarTop/>
            <div className="full-page-w-nav background-page">
                <h5 className="adoption-main-title">
                    {t('adoption.menu.new')}
                </h5>
                <div className="adoption-container">
                    <Row>
                        <Col lg={3}>
                            <div className="adoption-pet-card-new text-center">
                                <Row className="d-block mb-2">
                                    <p className="mb-0">{t('adoption.new.photos')} 1 </p>
                                    <div className="position-relative">
                                        <img draggable={false} className="mpl-profile-picture-new"
                                             src={(photoOne !== "") ? photoOne : user} alt={"One"}/>
                                        <div className="mpl-profile-picture-overlay-container-new">
                                            <div className="mpl-profile-picture-overlay-new"
                                                 onClick={() => setShowPhotoOnePopup(true)}>
                                                <div className="w-100 text-center">
                                                    <i className="fas fa-edit fa-2x color-gradiant-black"/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Row>
                                <Row className="d-block mb-2">
                                    <p className="mb-0">{t('adoption.new.photos')} 2 </p>
                                    <div className="position-relative">
                                        <img draggable={false} className="mpl-profile-picture-new"
                                             src={(photoTwo !== "") ? photoTwo : user} alt={"Two"}/>
                                        <div className="mpl-profile-picture-overlay-container-new">
                                            <div className="mpl-profile-picture-overlay-new"
                                                 onClick={() => setShowPhotoTwoPopup(true)}>
                                                <div className="w-100 text-center">
                                                    <i className="fas fa-edit fa-2x color-gradiant-black"/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Row>
                                <Row className="d-block">
                                    <p className="mb-0">{t('adoption.new.photos')} 3 </p>
                                    <div className="position-relative">
                                        <img draggable={false} className="mpl-profile-picture-new"
                                             src={(photoThree !== "") ? photoThree : user} alt={"Three"}/>
                                        <div className="mpl-profile-picture-overlay-container-new">
                                            <div className="mpl-profile-picture-overlay-new"
                                                 onClick={() => setShowPhotoThreePopup(true)}>
                                                <div className="w-100 text-center">
                                                    <i className="fas fa-edit fa-2x color-gradiant-black"/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Row>
                            </div>
                        </Col>
                        <Col lg={9} className="adoption-pet-card-right blue-scroll">
                            <Row className="mpl-view-content pb-0 mx-1">
                                <Col lg={12}>
                                    <div className="mt-2 ml-4 text-left">
                                        <p>{t('adoption.new.infos')}</p>
                                    </div>
                                </Col>
                                <Col lg={6}>
                                    <Row>
                                        <Col lg={12}>
                                            <input className={("input-mpl w-100") + (error && !nameValue ? " error-input" : "")}
                                                   placeholder={t('adoption.name')}
                                                   value={nameValue}
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
                                                          className={("input-mpl w-100") + (error && !specieValue ? " error-input" : "")}
                                                          value={specieValue}
                                                          style={specieValue === "" ? {color: "#8a8a8a"} : {}}
                                                          onChange={(e) => setSpecieValue(e.target.value)}>
                                                <option key={0} value={""} disabled>{t('adoption.species')}</option>
                                                {speciesList.map((item, i) =>
                                                    <option key={i}
                                                            value={item}>{t("pets:species." + item)}</option>)}
                                                )
                                            </Form.Control>
                                        </Col>
                                        <Col lg={6} className="adoption-selector-container">
                                            <input className={("input-mpl w-100") + (error && !birthDateValue ? " error-input" : "")}
                                                   style={!birthDateValue ? {color: "#8a8a8a"} : {}}
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
                                                          className={("input-mpl w-100") + (error && !raceValue ? " error-input" : "")}
                                                          value={raceValue}
                                                          style={raceValue === "" ? {color: "#8a8a8a"} : {}}
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
                                                              className={("input-mpl w-100") + (error && !raceValue2 ? " error-input" : "")}
                                                              value={raceValue2}
                                                              style={raceValue2 === "" ? {color: "#8a8a8a"} : {}}
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
                                                          className={("input-mpl w-100") + (error && !robeValue ? " error-input" : "")}
                                                          value={robeValue}
                                                          style={robeValue === "" ? {color: "#8a8a8a"} : {}}
                                                          onChange={(e) => setRobeValue(e.target.value)}>
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
                                                    className={("input-mpl w-100") + (error && !sizeValue ? " error-input" : "")}
                                                    type="number"
                                                    value={sizeValue}
                                                    onChange={(e) => setSizeValue(e.target.value)}/>
                                            </div>
                                            <div className="pr-0 w-25">
                                                <Form.Control as="select"
                                                              className="input-mpl  w-100 color-dark "
                                                              style={sizeUnit === "" ? {color: "#8a8a8a"} : {}}
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
                                </Col>
                                <Col lg={6}>
                                    <Row>
                                        <Col lg={12}>
                                            <SearchLocationInput value={addressValue} className={("input-mpl") + (error && !addressValue ? " error-input" : "")}
                                                                 onChange={handleChangeAddress}
                                                                 placeholder={t('adoption.address')}/>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg={12}>
                                        <textarea className={("input-mpl w-100 blue-scroll") + (error && !descriptionValue ? " error-input" : "")}
                                                  placeholder={t('adoption.description')} maxLength="250"
                                                  value={descriptionValue}
                                                  style={{height: "100px"}}
                                                  onChange={(e) => setDescriptionValue(e.target.value)}/>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg={12}>
                                        <textarea className="input-mpl w-100 blue-scroll"
                                                  placeholder={t('adoption.infos')} value={infosValue}
                                                  maxLength="250" onChange={(e) => setInfosValue(e.target.value)}/>
                                        </Col>
                                    </Row>
                                    <Row>
                                        {
                                            !updateInProgress &&
                                            <>
                                            <Col lg={6}>
                                                <div className="adoption-blue-title mb-3 link" onClick={() => addPet("published")}>
                                                    {t('adoption.publish')}
                                                </div>
                                            </Col>
                                            <Col lg={6}>
                                                <div className="adoption-blue-title mb-3 link" onClick={() => addPet("waiting")}>
                                                    {t('adoption.save')}
                                                </div>
                                            </Col>
                                            </>
                                        }
                                        {
                                            updateInProgress &&
                                            <Col lg={12} className="text-center mb-3">
                                                <Spinner animation="border" className="color-green"/>
                                            </Col>
                                        }
                                    </Row>
                                </Col>
                                {
                                    error &&
                                    <Col lg={12}
                                         className="text-center mb-3 adoption-error">{t('adoption.new.error')}</Col>
                                }
                            </Row>
                            <Row>
                                <Col lg={12}>
                                    <div className="mt-3 ml-4 text-left">
                                        <p>{t('adoption.new.view')}</p>
                                    </div>
                                </Col>
                            </Row>
                            <Row className="mr-1">
                                <Col lg={4}>
                                    <div id="carouselExampleControls" className="carousel slide text-center" data-ride="carousel">
                                        <div className="carousel-inner">
                                            <div className="carousel-item active">
                                                <img draggable={false} style={ photoOne ? {borderRadius:"10px"} : {borderRadius:"10px", width:"60%", height:"60%"}}
                                                     src={(photoOne !== "") ? photoOne : user} alt={"One"}/>
                                            </div>
                                            { photoTwo !== "" &&
                                            <div className="carousel-item">
                                                <img draggable={false} style={{borderRadius:"10px"}}
                                                     src={(photoTwo !== "") ? photoTwo : user} alt={"Two"}/>
                                            </div>
                                            }
                                            { photoThree !== "" &&
                                                <div className="carousel-item">
                                                    <img draggable={false} style={{borderRadius:"10px"}}
                                                         src={(photoThree !== "") ? photoThree : user} alt={"Three"}/>
                                                </div>
                                            }
                                        </div>
                                        { (photoTwo !== "" || photoThree !== "") &&
                                            <>
                                                <a className="carousel-control-prev" href="#carouselExampleControls"
                                                   role="button" data-slide="prev">
                                                    <span className="carousel-control-prev-icon" aria-hidden="true"/>
                                                </a>
                                                <a className="carousel-control-next" href="#carouselExampleControls"
                                                   role="button" data-slide="next">
                                                    <span className="carousel-control-next-icon" aria-hidden="true"/>
                                                </a>
                                            </>
                                        }
                                    </div>
                                </Col>
                                <Col lg={8} className="mpl-view-content">
                                    <h5 className="new-adoption-name">{nameValue ? nameValue : t('adoption.name')}</h5>
                                    <Row className="font-2 mb-1">
                                        <Col lg={12}>
                                            <i className="fas fa-paw blue-icon"/>
                                            {specieValue ? t('pets:species.' + specieValue) : t('adoption.species')}
                                            {raceValue ? " : " + t('pets:races.' + specieValue + "." + raceValue) : ""}
                                            {raceValue2 ? ", " + t('pets:races.' + specieValue + "." + raceValue2) : ""}
                                        </Col>
                                    </Row>
                                    <Row className="font-2 mb-1">
                                        <Col lg={3}>
                                            <i className="fas fa-tint blue-icon"/>
                                            {robeValue ? t('pets:color.' + robeValue) : t('adoption.color')}
                                        </Col>
                                        <Col lg={3}>
                                            {sexValue ? getGoodGender(sexValue) : <i className="fas fa-mars blue-icon" />}
                                            {sexValue ? t('adoption.' + sexValue) : t('adoption.sex')}
                                        </Col>
                                        <Col lg={6}>
                                            <i className="fas fa-birthday-cake blue-icon"/>
                                            {birthDateValue ? getAge(birthDateValue, t('adoption.month'), t('adoption.years'), t('adoption.year'), t('adoption.months')) : t('adoption.birthDate')}
                                        </Col>
                                    </Row>
                                    <Row className="font-2 mb-1">
                                        <Col lg={3}>
                                            <i className="fas fa-ruler-vertical blue-icon"/>
                                            {sizeValue ? sizeValue.toString() + " " + sizeUnit : t('adoption.adultSize')}
                                        </Col>
                                        <Col lg={3}>
                                            <i className="fas fa-heartbeat blue-icon"/>
                                            {sterilizedValue ? t('adoption.sterilized') : t('adoption.notSterilized')}
                                        </Col>
                                        <Col lg={6}>
                                            <i className="fas fa-sitemap blue-icon"/>
                                            {crossValue ? t('adoption.cross') : t('adoption.notCross')}
                                        </Col>
                                    </Row>
                                    <Row className="font-2 mb-1">
                                        <Col lg={12}>
                                            <i className="fas fa-map-marker-alt blue-icon"/>
                                            {addressValue ? addressValue : t('adoption.address')}
                                        </Col>
                                    </Row>
                                    <Row className="font-2 mb-1">
                                        <Col lg={12}>
                                            <i className="fas fa-id-card blue-icon"/>
                                            <span
                                                style={{maxWidth: "50%"}}>{descriptionValue ? descriptionValue : t('adoption.description')}</span>
                                        </Col>
                                    </Row>
                                    <Row className="font-2 mb-1">
                                        <Col lg={12}>
                                            <i className="fas fa-plus-circle blue-icon"/>
                                            {infosValue ? infosValue : t('adoption.infos')}
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </div>
            <Toasts onChangeSuccess={handleChangeToastEditSuccess} showSuccess={showToastEditSuccess}
                    successTitle={t('toaster.addSuccessTitle')}
                    successTime={t('toaster.justNow')} successContent={t('toaster.addSuccess')}
                    onChangeFailure={handleChangeToastEditFailure} showFailure={showToastEditFailure}
                    failureTitle={t('toaster.addFailureTitle')}
                    failureTime={t('toaster.justNow')} failureContent={t('toaster.addFailure')}
            />
        </>
    );

}
