import React, {useState, useEffect} from "react";
import "./ShowAskingAdoption.css";
import {useTranslation} from "react-i18next";
import NavbarTop from "../NavbarTop/NavbarTop";
import {Row, Col, Spinner} from "react-bootstrap";
import emailWait from "../../svg/folder-waiting-email.svg";
import emailRefuse from "../../svg/folder-refuse-email.svg";
import emailAccept from "../../svg/folder-accept-email.svg";

import SearchLocationInput from "../SearchLocationInput/SearchLocationInput";
import api from "../../utils/api"
import {useAuth} from "../../context/auth";
import {cryptData, decryptData, retrievedFromJwt} from "../../utils/user-infos";
import Toasts from "../Toasts/Toasts";
import {toPhoneFormat} from "../../utils/user-infos";
import AskingAdoptionInput from "../AskingAdoptionInput/AskingAdoptionInput";
import BooleanChoice from "../BooleanChoice/BooleanChoice";
import PopupChangeFolderState from "../PopupChangeFolderState/PopupChangeFolderState";

export default function ShowAskingAdoption() {
    const {t} = useTranslation();
    const {authTokens} = useAuth();

    const [category, setCategory] = useState("all");
    const [items, setItems] = useState([]);
    const [selectedFolder, setSelectedFolder] = useState("");

    const [searchInProgress, setSearchInProgress] = useState(false);
    const [folderInProgress, setFolderInProgress] = useState(false);

    const [stateAcceptInProgress, setStateAcceptInProgress] = useState(false);
    const [stateAcceptUserInProgress, setStateAcceptUserInProgress] = useState(false);
    const [stateWaitInProgress, setStateWaitInProgress] = useState(false);
    const [stateRefuseInProgress, setStateRefuseInProgress] = useState(false);
    const [stateRefuseUserInProgress, setStateRefuseUserInProgress] = useState(false);

    const [commentInProgress, setCommentInProgress] = useState(false);

    const [folderState, setFolderState] = useState("");

    const [lastNameValue, setLastNameValue] = useState("");
    const [firstNameValue, setFirstNameValue] = useState("");
    const [mailValue, setMailValue] = useState("");
    const [phoneValue, setPhoneValue] = useState("");
    const [addressValue, setAddressValue] = useState("");

    const [houseValue, setHouseValue] = useState("apartment");
    const [isHouseOwnerValue, setIsHouseOwnerValue] = useState(false);
    const [hasHouseOwnerAccordValue, setHasHouseOwnerAccordValue] = useState(false);
    const [gardenValue, setGardenValue] = useState(true);
    const [gardenSurfaceValue, setGardenSurfaceValue] = useState("");
    const [gardenSurfaceUnity, setGardenSurfaceUnity] = useState("");
    const [gardenFenceValue, setGardenFenceValue] = useState(false);

    const [childNumberValue, setChildNumberValue] = useState(0);
    const [adultNumberValue, setAdultNumberValue] = useState(0);
    const [allergyValue, setAllergyValue] = useState(false);
    const [otherPetsValue, setOtherPetsValue] = useState(true);
    const [otherPetsDescriptionValue, setOtherPetsDescriptionValue] = useState("");

    const [haveAdoptedYetValue, setHaveAdoptedYetValue] = useState(true);
    const [petAdoptedDescriptionValue, setPetAdoptedDescriptionValue] = useState("");
    const [adoptionDayNightValue, setAdoptionDayNightValue] = useState("");
    const [hoursAbsentValue, setHoursAbsentValue] = useState(0);
    const [adoptionActivitiesValue, setAdoptionActivitiesValue] = useState("");
    const [walkNumberValue, setWalkNumberValue] = useState(0);

    const [whyAdoption, setWhyAdoption] = useState("");
    const [whenAdoption, setWhenAdoption] = useState("");
    const [petQuality, setPetQuality] = useState("");

    const [commentValue, setCommentValue] = useState("");

    const [showPopupAccept, setShowPopupAccept] = useState(false);
    const [showPopupRefuse, setShowPopupRefuse] = useState(false);
    const [showPopupWait, setShowPopupWait] = useState(false);
    const [showPopupUserAccept, setShowPopupUserAccept] = useState(false);
    const [showPopupUserRefuse, setShowPopupUserRefuse] = useState(false);

    const [showToastMailSuccess, setShowToastMailSuccess] = useState(false);
    const [showToastMailFailure, setShowToastMailFailure] = useState(false);

    const [showToastCommentSuccess, setShowToastCommentSuccess] = useState(false);
    const [showToastCommentFailure, setShowToastCommentFailure] = useState(false);

    const [showToastAdoptionSuccess, setShowToastAdoptionSuccess] = useState(false);
    const [showToastAdoptionFailure, setShowToastAdoptionFailure] = useState(false);

    const [showToastUserSuccess, setShowToastUserSuccess] = useState(false);
    const [showToastUserFailure, setShowToastUserFailure] = useState(false);

    function researchPets(species) {
        setSearchInProgress(true);
        setItems([]);
        setSelectedFolder("");
        const token = {
            association_id: retrievedFromJwt(authTokens)._id,
            category: species,
        };
        api.getAllAdoptionsAskingLabels(cryptData(token, process.env.REACT_APP_TOKEN_SECRET)).then(result => {
            setSearchInProgress(false);
            if (result.status === 200) {
                if (decryptData(result.data.findFolders, process.env.REACT_APP_TOKEN_SECRET) !== null)
                    setItems(decryptData(result.data.findFolders, process.env.REACT_APP_TOKEN_SECRET).findFolders);
            }
        })
    }

    function getFolder(id) {
        localStorage.removeItem("folder-id");
        setFolderInProgress(true);
        setSelectedFolder("");
        const token = {
            _id: id,
        };
        api.getOneAdoptionsAsking(cryptData(token, process.env.REACT_APP_TOKEN_SECRET)).then(result => {
            setFolderInProgress(false);
            if (result.status === 200) {
                const folder = decryptData(result.data.findAdoption, process.env.REACT_APP_TOKEN_SECRET).findAdoption;
                setSelectedFolder(folder);
                setFolderState(folder.status);
                setLastNameValue(folder.user_name);
                setFirstNameValue(folder.firstName);
                setMailValue(folder.email);
                setPhoneValue(folder.phoneNumber);
                setAddressValue(folder.address);

                setHouseValue(folder.house_type);
                setIsHouseOwnerValue(folder.is_house_owner);
                setHasHouseOwnerAccordValue(folder.have_house_owner_accord);
                setGardenValue(folder.garden);
                setGardenSurfaceValue(folder.garden_surface);
                setGardenSurfaceUnity(folder.garden_unity);
                setGardenFenceValue(folder.garden_fence);

                setChildNumberValue(folder.child_number);
                setAdultNumberValue(folder.adult_number);
                setAllergyValue(folder.allergy);
                setOtherPetsValue(folder.other_pets);
                setOtherPetsDescriptionValue(folder.other_pets_description);

                setHaveAdoptedYetValue(folder.have_adopted_yet);
                setPetAdoptedDescriptionValue(folder.pet_adopted_description);
                setAdoptionDayNightValue(folder.adoption_day_night);
                setHoursAbsentValue(folder.hour_absent);
                setAdoptionActivitiesValue(folder.adoption_activities);
                setWalkNumberValue(folder.walk_number);

                setWhyAdoption(folder.adoption_why);
                setWhenAdoption(folder.adoption_when);
                setPetQuality(folder.adoption_research);
                setCommentValue(folder.comment);
            }
        })
    }

    function addComment() {
        setCommentInProgress(true);
        const token = {
            _id: selectedFolder._id,
            comment: commentValue
        };
        api.commentAdoptionsAsking(cryptData(token, process.env.REACT_APP_TOKEN_SECRET)).then(result => {
            setCommentInProgress(false);
            if (result.status === 200) {
                setShowToastCommentSuccess(true);
            } else {
                setShowToastCommentFailure(true);
            }
        })

    }

    function handleOnClosedPopup() {
        setShowPopupAccept(false);
        setShowPopupRefuse(false);
        setShowPopupWait(false);
        setShowPopupUserAccept(false);
        setShowPopupUserRefuse(false);
    }

    function handleAcceptFolder() {
        setStateAcceptInProgress(true);
        const token = {
            _id: selectedFolder._id,
        };
        api.acceptAdoptionsAsking(cryptData(token, process.env.REACT_APP_TOKEN_SECRET)).then(result => {
            setStateAcceptInProgress(false);
            if (result.status === 200) {
                setFolderState("accepted");
                setShowToastMailSuccess(true);
            } else if(result.status === 205){
                setShowToastAdoptionFailure(true);
            }else if(result.status === 206){
                setShowToastAdoptionSuccess(true);
            }else {
                setShowToastMailFailure(true);
            }
        })
    }

    function handleRefuseFolder() {
        setStateRefuseInProgress(true);
        const token = {
            _id: selectedFolder._id,
        };
        api.refuseAdoptionsAsking(cryptData(token, process.env.REACT_APP_TOKEN_SECRET)).then(result => {
            setStateRefuseInProgress(false);
            if (result.status === 200) {
                setFolderState("refused");
                setShowToastMailSuccess(true);
            } else {
                setShowToastMailFailure(true);
            }
        })
    }

    function handleWaitFolder() {
        setStateWaitInProgress(true);
        const token = {
            _id: selectedFolder._id,
        };
        api.waitAdoptionsAsking(cryptData(token, process.env.REACT_APP_TOKEN_SECRET)).then(result => {
            setStateWaitInProgress(false);
            if (result.status === 200) {
                setFolderState("waiting");
                setShowToastMailSuccess(true);
            } else {
                setShowToastMailFailure(true);
            }
        })
    }

    function handleUserRefuseFolder() {
        setStateRefuseUserInProgress(true);
        const token = {
            _id: selectedFolder._id,
        };
        api.refuseUserAdoptionsAsking(cryptData(token, process.env.REACT_APP_TOKEN_SECRET)).then(result => {
            setStateRefuseUserInProgress(false);
            if (result.status === 200) {
                setFolderState("refused");
                setShowToastUserSuccess(true);
            } else {
                setShowToastUserFailure(true);
            }
        })
    }

    function handleUserAcceptFolder() {
        setStateAcceptUserInProgress(true);
        const token = {
            _id: selectedFolder._id,
        };
        api.acceptUserAdoptionsAsking(cryptData(token, process.env.REACT_APP_TOKEN_SECRET)).then(result => {
            setStateAcceptUserInProgress(false);
            if (result.status === 200) {
                setShowToastUserSuccess(true);
            } else {
                setShowToastUserFailure(true);
            }
        })
    }

    function handleMailToastSuccess(state) {
        setShowToastMailSuccess(state);
    }

    function handleMailToastFailure(state) {
        setShowToastMailFailure(state);
    }

    function handleAdoptionToastSuccess(state) {
        setShowToastAdoptionSuccess(state);
    }

    function handleAdoptionToastFailure(state) {
        setShowToastAdoptionFailure(state);
    }

    function handleUserToastSuccess(state) {
        setShowToastUserSuccess(state);
    }

    function handleUserToastFailure(state) {
        setShowToastUserFailure(state);
    }

    function handleCommentToastSuccess(state) {
        setShowToastCommentSuccess(state);
    }

    function handleCommentToastFailure(state) {
        setShowToastCommentFailure(state);
    }

    useEffect(() => {
        researchPets("all");
        if (localStorage.getItem("folder-id")) {
            getFolder(decryptData(localStorage.getItem("folder-id"), process.env.REACT_APP_TOKEN_SECRET).data);
        }
    }, []);

    return (
        <>
            {showPopupAccept &&
            <PopupChangeFolderState onClosed={handleOnClosedPopup} title={t('folders.acceptTitle')}
                                    paragraphOne={t('folders.acceptParagraphOne')}
                                    paragraphTwo={t('folders.acceptParagraphTwo')}
                                    paragraphThree={t('folders.acceptParagraphThree')}
                                    onValidate={handleAcceptFolder}
            />
            }
            {showPopupRefuse &&
            <PopupChangeFolderState onClosed={handleOnClosedPopup} title={t('folders.refuseTitle')}
                                    paragraphOne={t('folders.refuseParagraphOne')}
                                    paragraphTwo={t('folders.refuseParagraphTwo')}
                                    paragraphThree={t('folders.refuseParagraphThree')}
                                    onValidate={handleRefuseFolder}
            />
            }
            {showPopupWait &&
            <PopupChangeFolderState onClosed={handleOnClosedPopup} title={t('folders.waitTitle')}
                                    paragraphOne={t('folders.waitParagraphOne')}
                                    paragraphTwo={t('folders.waitParagraphTwo')}
                                    paragraphThree={t('folders.waitParagraphThree')}
                                    onValidate={handleWaitFolder}
            />
            }
            {showPopupUserAccept &&
            <PopupChangeFolderState onClosed={handleOnClosedPopup} title={t('folders.userAcceptTitle')}
                                    paragraphOne={t('folders.userAcceptParagraphOne')}
                                    paragraphTwo={t('folders.userAcceptParagraphTwo')}
                                    paragraphThree={t('folders.userAcceptParagraphThree')}
                                    onValidate={handleUserAcceptFolder}
            />
            }
            {showPopupUserRefuse &&
            <PopupChangeFolderState onClosed={handleOnClosedPopup} title={t('folders.userRefuseTitle')}
                                    paragraphOne={t('folders.userRefuseParagraphOne')}
                                    paragraphTwo={t('folders.userRefuseParagraphTwo')}
                                    paragraphThree={t('folders.userRefuseParagraphThree')}
                                    onValidate={handleUserRefuseFolder}
            />
            }
            <NavbarTop/>
            <div className="full-page-w-nav background-page">
                <h5 className="adoption-main-title">
                    {t('adoption.menu.received')}
                </h5>
                <div className="adoption-container">
                    <div className="adoption-navigation">
                        <div className="adoption-nav-left w-100">
                            <div
                                className={"adoption-nav-item" + (category === "all" ? " adoption-nav-item-active" : "")}
                                onClick={() => {
                                    setCategory("all");
                                    researchPets("all")
                                }}>
                                {t('all')}
                            </div>
                            <div
                                className={"adoption-nav-item" + (category === "accepted" ? " adoption-nav-item-active" : "")}
                                onClick={() => {
                                    setCategory("accepted");
                                    researchPets("accepted")
                                }}>
                                {t('folders.status.accepted')}
                            </div>
                            <div
                                className={"adoption-nav-item" + (category === "waiting" ? " adoption-nav-item-active" : "")}
                                onClick={() => {
                                    setCategory("waiting");
                                    researchPets("waiting")
                                }}>
                                {t('folders.status.waiting')}
                            </div>
                            <div
                                className={"adoption-nav-item" + (category === "refused" ? " adoption-nav-item-active" : "")}
                                onClick={() => {
                                    setCategory("refused");
                                    researchPets("refused")
                                }}>
                                {t('folders.status.refused')}
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
                                {(items && items.length === 0 && !searchInProgress) || items == undefined &&
                                <p className="px-2">{t('folders.noFolderFind')}</p>
                                }
                                {searchInProgress &&
                                <div className="text-center my-3">
                                    <Spinner animation="border" className="color-green"/>
                                </div>
                                }
                                {items && items.map((value, index) => (
                                    <div className="folder-names"
                                         onClick={() => getFolder(value._id)}>{value.user_name} - {value.pet_name}</div>
                                ))}
                            </div>
                        </Col>
                        <Col lg={6}>
                            <div className="adoption-pet-card blue-scroll">
                                {
                                    !selectedFolder && !folderInProgress &&
                                    <p className="m-4"><i
                                        className="fas fa-arrow-left color-green"/> {t('folders.noFolder')}</p>
                                }
                                {
                                    folderInProgress &&
                                    <div className="text-center my-3">
                                        <Spinner animation="border" className="color-green"/>
                                    </div>
                                }
                                {
                                    selectedFolder && !folderInProgress &&
                                    <>
                                        <div className="popup-edit-personnal-section">
                                            <div className="popup-edit-personnal-section-body">
                                                <h4 className="section-title">{t('folders.contactInformations')}</h4>
                                                <div className="section-breakline"/>
                                                <Row className="my-1">
                                                    <Col lg={6}>
                                                        <div>
                                                            <AskingAdoptionInput icon={"fa fa-user"}
                                                                                 value={lastNameValue}
                                                                                 handleValue={setLastNameValue}
                                                                                 required={true}
                                                                                 inputPlaceholder={t('folders.lastName')}/>
                                                        </div>
                                                    </Col>
                                                    <Col lg={6}>
                                                        <div>
                                                            <AskingAdoptionInput icon={"fa fa-user"}
                                                                                 value={firstNameValue}
                                                                                 handleValue={setFirstNameValue}
                                                                                 required={true}
                                                                                 inputPlaceholder={t('folders.firstName')}/>
                                                        </div>
                                                    </Col>
                                                </Row>
                                                <Row className="my-1">
                                                    <Col lg={6}>
                                                        <div>
                                                            <AskingAdoptionInput icon={"fa fa-envelope"}
                                                                                 value={mailValue}
                                                                                 handleValue={setMailValue}
                                                                                 required={true}
                                                                                 inputPlaceholder={t('folders.email')}/>
                                                        </div>
                                                    </Col>
                                                    <Col lg={6}>
                                                        <div>
                                                            <AskingAdoptionInput icon={"fa fa-phone-alt"}
                                                                                 value={toPhoneFormat(phoneValue)}
                                                                                 handleValue={setPhoneValue}
                                                                                 inputType={"number"}
                                                                                 required={true}
                                                                                 inputPlaceholder={t('folders.phone')}/>
                                                        </div>
                                                    </Col>
                                                </Row>
                                                <Row className="my-1">
                                                    <Col lg={12}>
                                                        <div>
                                                            <div className="input-edit-container">
                                                                <i className={"fas fa-map-marker-alt input-edit-icon color-gradiant-green"}/>
                                                                <SearchLocationInput value={addressValue}
                                                                                     className={"input-edit" + (!addressValue ? " input-edit-empty" : "")}
                                                                                     onChange={setAddressValue}
                                                                                     disabled={true}
                                                                />
                                                            </div>
                                                        </div>
                                                    </Col>
                                                </Row>
                                                <h4 className="section-title">{t('folders.houseInformations')}</h4>
                                                <div className="section-breakline"/>
                                                <div>
                                                    <BooleanChoice initialState={houseValue}
                                                                   handleStateChange={setHouseValue}
                                                                   title={t('folders.youLiveIn') + " :"}
                                                                   trueIcon={"fa fa-home"}
                                                                   trueText={t('folders.house')}
                                                                   trueValue={"house"}
                                                                   falseIcon={"fas fa-building"}
                                                                   falseText={t('folders.apartment')}
                                                                   falseValue={"apartment"}
                                                    />
                                                    <BooleanChoice initialState={isHouseOwnerValue}
                                                                   handleStateChange={setIsHouseOwnerValue}
                                                                   title={t('folders.youAre') + " :"}
                                                                   trueIcon={"fa fa-key"}
                                                                   trueText={t('folders.owner')}
                                                                   falseIcon={"fas fa-file-contract"}
                                                                   falseText={t('folders.tenant')}
                                                    />
                                                    {
                                                        isHouseOwnerValue === false &&
                                                        <BooleanChoice initialState={hasHouseOwnerAccordValue}
                                                                       handleStateChange={setHasHouseOwnerAccordValue}
                                                                       title={t('folders.haveOwnerAccord') + " :"}
                                                                       trueIcon={"fa fa-check-circle"}
                                                                       trueText={t('yes')}
                                                                       falseIcon={"fas fa-times-circle"}
                                                                       falseText={t("no")}
                                                        />
                                                    }
                                                    <BooleanChoice initialState={gardenValue}
                                                                   handleStateChange={setGardenValue}
                                                                   title={t('folders.haveGarden') + " :"}
                                                                   trueIcon={"fa fa-check-circle"}
                                                                   trueText={t("yes")}
                                                                   falseIcon={"fas fa-times-circle"}
                                                                   falseText={t("no")}
                                                    />
                                                    {
                                                        gardenValue &&
                                                        <div className="position-relative">
                                                            <input
                                                                className={"input-mpl garden-input w-25 mx-3" + (gardenSurfaceValue ? " not-empty" : "")}
                                                                value={gardenSurfaceValue}
                                                                disabled={true}
                                                                type="number"
                                                                onChange={(e) => setGardenSurfaceValue(e.target.value)}
                                                            />
                                                            <select disabled={true}
                                                                    className="input-mpl garden-select w-25"
                                                                    value={gardenSurfaceUnity}
                                                                    onChange={(e) => setGardenSurfaceUnity(e.target.value)}>
                                                                <option value="m">m²</option>
                                                                <option value="yd">yd²</option>
                                                            </select>
                                                        </div>
                                                    }
                                                    {
                                                        gardenValue &&
                                                        <BooleanChoice initialState={gardenFenceValue}
                                                                       handleStateChange={setGardenFenceValue}
                                                                       title={t('folders.yourGardenIs') + " :"}
                                                                       trueIcon={"fa fa-door-closed"}
                                                                       trueText={t('folders.fence')}
                                                                       falseIcon={"fas fa-door-open"}
                                                                       falseText={t('folders.noFence')}
                                                        />
                                                    }
                                                </div>
                                                <h4 className="section-title">{t('folders.environment')}</h4>
                                                <div className="section-breakline"/>
                                                <div>
                                                    <p>{t('folders.childNumber')} :</p>
                                                    <div className="environment-input-container">
                                                        <AskingAdoptionInput
                                                            icon={"fas fa-baby input-edit-icon color-gradiant-green"}
                                                            value={childNumberValue}
                                                            handleValue={setChildNumberValue}
                                                            inputType={"number"}
                                                            required={true}
                                                            inputPlaceholder={0}/>
                                                    </div>
                                                    <p>{t('folders.adultNumber')} :</p>
                                                    <div className="environment-input-container">
                                                        <AskingAdoptionInput
                                                            icon={"fas fa-child input-edit-icon color-gradiant-green"}
                                                            value={adultNumberValue}
                                                            handleValue={setAdultNumberValue}
                                                            inputType={"number"}
                                                            required={true}
                                                            inputPlaceholder={1}/>
                                                    </div>
                                                    <BooleanChoice initialState={allergyValue}
                                                                   handleStateChange={setAllergyValue}
                                                                   title={t('folders.allergy') + " :"}
                                                                   trueIcon={"fa fa-check-circle"}
                                                                   trueText={t("yes")}
                                                                   falseIcon={"fas fa-times-circle"}
                                                                   falseText={t("no")}
                                                    />
                                                    <BooleanChoice initialState={otherPetsValue}
                                                                   handleStateChange={setOtherPetsValue}
                                                                   title={t('folders.otherPets') + " :"}
                                                                   trueIcon={"fa fa-check-circle"}
                                                                   trueText={t("yes")}
                                                                   falseIcon={"fas fa-times-circle"}
                                                                   falseText={t("no")}
                                                    />
                                                    {
                                                        otherPetsValue &&
                                                        <>
                                                            <p>{t('folders.shortPetsDescription')} :</p>
                                                            <div className="environment-input-container">
                                                            <textarea
                                                                className={"input-edit pl-3" + (!otherPetsDescriptionValue ? " input-edit-empty" : "")}
                                                                value={otherPetsDescriptionValue}
                                                                rows={4}
                                                                disabled={true}
                                                                placeholder={otherPetsDescriptionValue ? otherPetsDescriptionValue : ""}
                                                                onChange={(e) => setOtherPetsDescriptionValue(e.target.value)}/>
                                                            </div>
                                                        </>
                                                    }
                                                </div>
                                                <h4 className="section-title">{t('folders.daily')}</h4>
                                                <div className="section-breakline"/>
                                                <div>
                                                    <BooleanChoice initialState={haveAdoptedYetValue}
                                                                   handleStateChange={setHaveAdoptedYetValue}
                                                                   title={t('folders.alreadyAdopted') + " :"}
                                                                   trueIcon={"fa fa-check-circle"}
                                                                   trueText={t("yes")}
                                                                   falseIcon={"fas fa-times-circle"}
                                                                   falseText={t("no")}
                                                    />
                                                    {
                                                        haveAdoptedYetValue &&
                                                        <>
                                                            <p>{t('folders.adoptedRace')} :</p>
                                                            <div className="environment-input-container">
                                                                <AskingAdoptionInput
                                                                    icon={"fas fa-paw input-edit-icon color-gradiant-green"}
                                                                    value={petAdoptedDescriptionValue}
                                                                    handleValue={setPetAdoptedDescriptionValue}
                                                                    inputType={"text"}/>
                                                            </div>
                                                        </>
                                                    }

                                                    <p>{t('folders.whereAdoptedPet')} :</p>
                                                    <div className="environment-input-container">
                                                        <textarea
                                                            className={"input-edit pl-3" + (!adoptionDayNightValue ? " input-edit-empty" : "")}
                                                            value={adoptionDayNightValue}
                                                            rows={3}
                                                            disabled={true}
                                                            placeholder={adoptionActivitiesValue ? adoptionActivitiesValue : ""}
                                                            onChange={(e) => setAdoptionDayNightValue(e.target.value)}/>
                                                    </div>

                                                    <p>{t('folders.absent')} :</p>
                                                    <div className="environment-input-container">
                                                        <div className="input-edit-container d-flex">
                                                            <i className={"fas fa-clock input-edit-icon color-gradiant-green"}/>
                                                            <input
                                                                className={"input-edit edit-daily-input-absent" + (!hoursAbsentValue ? " input-edit-empty" : "")}
                                                                type={"number"}
                                                                value={hoursAbsentValue}
                                                                placeholder={0}
                                                                disabled={true}
                                                                onChange={(e) => setHoursAbsentValue(e.target.value)}/>
                                                            <div
                                                                className="popup-edit-input-complement-absent font-2"> {t('folders.hoursADay')}.
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <p>{t('folders.activities')} :</p>
                                                    <div className="environment-input-container">
                                                        <textarea
                                                            className={"input-edit pl-3" + (!adoptionActivitiesValue ? " input-edit-empty" : "")}
                                                            value={adoptionActivitiesValue}
                                                            rows={3}
                                                            disabled={true}
                                                            onChange={(e) => setAdoptionActivitiesValue(e.target.value)}/>
                                                    </div>
                                                    <p>{t('folders.youPlanTo')} :</p>
                                                    <div className="environment-input-container">
                                                        <div className="input-edit-container d-flex">
                                                            <i className={"fas fa-dog input-edit-icon color-gradiant-green"}/>
                                                            <input
                                                                className={"input-edit edit-daily-input-walks" + (!walkNumberValue ? " input-edit-empty" : "")}
                                                                type={"number"}
                                                                value={walkNumberValue}
                                                                placeholder={0}
                                                                disabled={true}
                                                                onChange={(e) => setWalkNumberValue(e.target.value)}/>
                                                            <div
                                                                className="popup-edit-input-complement-walks font-2"> {t('folders.walksAWeek')}.
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <h4 className="section-title">{t('folders.motivation')}</h4>
                                                <div className="section-breakline"/>
                                                <p>{t('folders.whyAdoption')} :</p>
                                                <div className="environment-input-container">
                                                        <textarea
                                                            className={"input-edit pl-3" + (!whyAdoption ? " input-edit-empty" : "")}
                                                            value={whyAdoption}
                                                            rows={3}
                                                            disabled={true}
                                                            onChange={(e) => setWhyAdoption(e.target.value)}/>
                                                </div>
                                                <p>{t('folders.whenAdoption')} :</p>
                                                <div className="environment-input-container">
                                                    <div className="input-edit-container d-flex">
                                                        <i className={"fas fa-clock input-edit-icon color-gradiant-green"}/>
                                                        <input
                                                            className={"input-edit edit-daily-input-walks" + (!whenAdoption ? " input-edit-empty" : "")}
                                                            type={"number"}
                                                            value={whenAdoption}
                                                            placeholder={0}
                                                            disabled={true}
                                                            onChange={(e) => setWhenAdoption(e.target.value)}/>
                                                    </div>
                                                </div>
                                                <p>{t('folders.quality')} :</p>
                                                <div className="environment-input-container">
                                                        <textarea
                                                            className={"input-edit pl-3" + (!petQuality ? " input-edit-empty" : "")}
                                                            value={petQuality}
                                                            rows={3}
                                                            disabled={true}
                                                            onChange={(e) => setPetQuality(e.target.value)}/>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                }
                            </div>
                        </Col>
                        {
                            selectedFolder && !folderInProgress &&
                            <Col lg={4}>
                                <div className="folder-card blue-scroll">
                                    <div
                                        className={("folder-button") + (folderState === "accepted" ? " folder-button-active" : "") + (!folderState || folderState === "waiting" ? " link" : "")}
                                        onClick={() => (!folderState || folderState === "waiting") ? setShowPopupAccept(true) : null}>
                                        {!stateAcceptInProgress &&
                                        t('folders.acceptFolder')
                                        }
                                        {stateAcceptInProgress &&
                                        <Spinner animation="border" className="color-green" size="sm"/>
                                        }
                                    </div>
                                    {
                                        folderState === "accepted" && selectedFolder.folderStatus === "finished" && //TODO CHANGER LES CONDITIONS
                                        <div className="btn-mpl-primary w-100 my-2">
                                            t('folders.userAccept')
                                        </div>
                                    }
                                    {
                                        folderState === "accepted" && selectedFolder.folderStatus !== "finished" &&
                                        <div className="folder-status-content">
                                            {t('folders.acceptFolderMail')}
                                            <img draggable={false} src={emailAccept} width={"100%"}
                                                 alt={"accept folder"}/>
                                            <div className="btn-mpl-primary w-100 my-2"
                                                 onClick={() => setShowPopupUserAccept(true)}>
                                                {!stateAcceptUserInProgress &&
                                                t('folders.userAccept')
                                                }
                                                {stateAcceptUserInProgress &&
                                                <Spinner animation="border" className="color-red" size="sm"/>
                                                }
                                            </div>
                                            <div className="btn-mpl-alert w-100"
                                                 onClick={() => setShowPopupUserRefuse(true)}>
                                                {!stateRefuseUserInProgress &&
                                                t('folders.userRefuse')
                                                }
                                                {stateRefuseUserInProgress &&
                                                <Spinner animation="border" className="color-green" size="sm"/>
                                                }
                                            </div>
                                        </div>
                                    }
                                    <div
                                        className={("folder-button mt-3") + (folderState === "refused" ? " folder-button-active" : "") + (!folderState || folderState === "waiting" ? " link" : "")}
                                        onClick={() => (!folderState || folderState === "waiting") ? setShowPopupRefuse(true) : null}>
                                        {!stateRefuseInProgress &&
                                        t('folders.refuseFolder')
                                        }
                                        {stateRefuseInProgress &&
                                        <Spinner animation="border" className="color-green" size="sm"/>
                                        }
                                    </div>
                                    {
                                        folderState === "refused" &&
                                        <div className="folder-status-content">
                                            {t('folders.refuseFolderMail')}
                                            <img draggable={false} src={emailRefuse} width={"100%"}
                                                 alt={"refuse email"}/>
                                        </div>
                                    }
                                    <div
                                        className={("folder-button mt-3") + (folderState === "waiting" ? " folder-button-active" : "") + (!folderState ? " link" : "")}
                                        onClick={() => !folderState ? setShowPopupWait(true) : null}>
                                        {!stateWaitInProgress &&
                                        t('folders.waitFolder')
                                        }
                                        {stateWaitInProgress &&
                                        <Spinner animation="border" className="color-green" size="sm"/>
                                        }
                                    </div>
                                    {
                                        folderState === "waiting" &&
                                        <div className="folder-status-content">
                                            {t('folders.waitFolderMail')}
                                            <img draggable={false} src={emailWait} width={"100%"}
                                                 alt={"wainting email"}/>
                                        </div>

                                    }
                                    <div className="folder-comment-container mt-3">
                                        <div>{t('folders.comments')}</div>
                                        <textarea className="folder-comment-input"
                                                  value={commentValue}
                                                  onChange={(e) => setCommentValue(e.target.value)}/>
                                        <div className="btn-mpl-primary w-100"
                                             onClick={() => addComment()}>
                                            {!commentInProgress &&
                                            t('folders.save')
                                            }
                                            {commentInProgress &&
                                            <Spinner animation="border" className="color-green" size="sm"/>
                                            }
                                        </div>
                                    </div>
                                    {/*<div className="btn-mpl-primary w-100 mt-3"
                                     onClick={() => (console.log("contact"))}>
                                    {t('folders.contact')}
                                    </div>*/}
                                </div>
                            </Col>
                        }
                    </Row>
                </div>
            </div>
            <Toasts onChangeSuccess={handleMailToastSuccess} showSuccess={showToastMailSuccess}
                    successTitle={t('toaster.folderMailSuccessTitle')}
                    successTime={t('toaster.justNow')} successContent={t('toaster.folderMailSuccess')}
                    onChangeFailure={handleMailToastFailure} showFailure={showToastMailFailure}
                    failureTitle={t('toaster.folderMailFailureTitle')}
                    failureTime={t('toaster.justNow')} failureContent={t('toaster.folderMailFailure')}
            />
            <Toasts onChangeSuccess={handleCommentToastSuccess} showSuccess={showToastCommentSuccess}
                    successTitle={t('toaster.folderCommentSuccessTitle')}
                    successTime={t('toaster.justNow')} successContent={t('toaster.folderCommentSuccess')}
                    onChangeFailure={handleCommentToastFailure} showFailure={showToastCommentFailure}
                    failureTitle={t('toaster.folderCommentFailureTitle')}
                    failureTime={t('toaster.justNow')} failureContent={t('toaster.folderCommentFailure')}
            />
            <Toasts onChangeSuccess={handleUserToastSuccess} showSuccess={showToastUserSuccess}
                    successTitle={t('toaster.updateSuccessTitle')}
                    successTime={t('toaster.justNow')} successContent={t('toaster.updateSuccess')}
                    onChangeFailure={handleUserToastFailure} showFailure={showToastUserFailure}
                    failureTitle={t('toaster.updateFailureTitle')}
                    failureTime={t('toaster.justNow')} failureContent={t('toaster.updateFailure')}
            />
            <Toasts onChangeSuccess={handleAdoptionToastSuccess} showSuccess={showToastAdoptionSuccess}
                    successTitle={t('toaster.adoptionSuccessTitle')}
                    successTime={t('toaster.justNow')} successContent={t('toaster.adoptionSuccess')}
                    onChangeFailure={handleAdoptionToastFailure} showFailure={showToastAdoptionFailure}
                    failureTitle={t('toaster.adoptionFailureTitle')}
                    failureTime={t('toaster.justNow')} failureContent={t('toaster.adoptionFailure')}
            />
        </>
    );

}
