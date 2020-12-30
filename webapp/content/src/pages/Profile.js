import React, {useState} from "react";
import "../css/Profile.css";
import {useTranslation} from "react-i18next";
import {useAuth} from "../context/auth";
import NavbarTop from "../components/NavbarTop/NavbarTop";
import {Col, Row} from "react-bootstrap";
import user from "../svg/user.svg"
import ProfileTopMenu from "../components/Profile/ProfileTopMenu/ProfileTopMenu";
import ProfileTopMenuElement, {ProfileTopMenuSeparator} from "../components/Profile/ProfileTopMenuElement/ProfileTopMenuElement";
import ProfileInfoContentElement from "../components/Profile/ProfileInfoContentElement/ProfileInfoContentElement";
import ProfileInfoSection from "../components/Profile/ProfileInfoSection/ProfileInfoSection";
import {retrievedFromJwt, toDate, toPhoneFormat} from "../utils/user-infos";
import ProfileBankHistory from "../components/Profile/ProfileBankHistory/ProfileBankHistory";
import PopupEditPersonalSection from "../components/Profile/PopupEditPersonalSection/PopupEditPersonalSection";
import PopupDeleteAccount from "../components/Profile/PopupDeleteAccount/PopupDeleteAccount";
import Toasts from "../components/Toasts/Toasts";
import PopupEditProfilePicture from "../components/Profile/PopupEditProfilePicture/PopupEditProfilePicture";
import PopupEditHomeSection from "../components/Profile/PopupEditHomeSection/PopupEditHomeSection";
import PopupEditEnvironmentSection
    from "../components/Profile/PopupEditµEnvironmentSection/PopupEditEnvironmentSection";
import PopupEditDailySection from "../components/Profile/PopupEditDailySection/PopupEditDailySection";
import PopupEditMotivationSection from "../components/Profile/PopupEditMotivationSection/PopupEditMotivationSection";

export default function Profile() {
    const {t} = useTranslation();
    const [activeTab, setActiveTab] = useState("user");
    const [showProfilePicturePopup, setShowProfilePicturePopup] = useState(false);
    const [showPersonalInfosPopup, setShowPersonalInfosPopup] = useState(false);
    const [showHomeInfosPopup, setShowHomeInfosPopup] = useState(false);
    const [showEnvironmentInfosPopup, setShowEnvironmentInfosPopup] = useState(false);
    const [showDailyInfosPopup, setShowDailyInfosPopup] = useState(false);
    const [showMotivationInfosPopup, setShowMotivationInfosPopup] = useState(false);

    const [showToastEditSuccess, setShowToastEditSuccess] = useState(false);
    const [showToastEditFailure, setShowToastEditFailure] = useState(false);

    const [showToastNewAvatarSuccess, setShowToastNewAvatarSuccess] = useState(false);
    const [showToastNewAvatarFailure, setShowToastNewAvatarFailure] = useState(false);

    const [showDeleteAccountPopup, setShowDeleteAccountPopup] = useState(false);
    const {authTokens} = useAuth();

    let userInfo = {};
    if (retrievedFromJwt(authTokens) !== null && retrievedFromJwt(authTokens) !== undefined) {
        userInfo = retrievedFromJwt(authTokens);
    }

    function handleEditProfilePicture() {
        setShowProfilePicturePopup(!showProfilePicturePopup);
    }

    function handleEditPersonalSection() {
        setShowPersonalInfosPopup(!showPersonalInfosPopup);
    }

    function handleEditHomeSection() {
        setShowHomeInfosPopup(!showHomeInfosPopup);
    }

    function handleEditEnvironmentSection() {
        setShowEnvironmentInfosPopup(!showEnvironmentInfosPopup);
    }

    function handleEditDailySection() {
        setShowDailyInfosPopup(!showDailyInfosPopup);
    }

    function handleEditMotivationSection() {
        setShowMotivationInfosPopup(!showMotivationInfosPopup);
    }

    function handleDeleteAccount() {
        setShowDeleteAccountPopup(!showDeleteAccountPopup);
    }

    function handleChangeToastEditSuccess(state) {
        setShowToastEditSuccess(state);
    }

    function handleChangeToastEditFailure(state) {
        setShowToastEditFailure(state);
    }

    function handleChangeToastNewAvatarSuccess(state) {
        setShowToastNewAvatarSuccess(state);
    }

    function handleChangeToastNewAvatarFailure(state) {
        setShowToastNewAvatarFailure(state);
    }

    return (
        <>
            {
                showProfilePicturePopup &&
                <PopupEditProfilePicture user={userInfo}
                                         onSuccess={handleChangeToastNewAvatarSuccess}
                                         onFailure={handleChangeToastNewAvatarFailure}
                                         onClosed={() => handleEditProfilePicture()}/>
            }
            {
                showPersonalInfosPopup &&
                <PopupEditPersonalSection user={userInfo}
                                          onClosed={() => handleEditPersonalSection()}
                                          onSuccess={handleChangeToastEditSuccess}
                                          onFailure={handleChangeToastEditFailure}
                />
            }
            {
                showHomeInfosPopup &&
                <PopupEditHomeSection user={userInfo}
                                      onClosed={() => handleEditHomeSection()}
                                      onSuccess={handleChangeToastEditSuccess}
                                      onFailure={handleChangeToastEditFailure}
                />
            }
            {
                showEnvironmentInfosPopup &&
                <PopupEditEnvironmentSection user={userInfo}
                                             onClosed={() => handleEditEnvironmentSection()}
                                             onSuccess={handleChangeToastEditSuccess}
                                             onFailure={handleChangeToastEditFailure}
                />
            }
            {
                showDailyInfosPopup &&
                <PopupEditDailySection user={userInfo}
                                       onClosed={() => handleEditDailySection()}
                                       onSuccess={handleChangeToastEditSuccess}
                                       onFailure={handleChangeToastEditFailure}
                />
            }
            {
                showMotivationInfosPopup &&
                <PopupEditMotivationSection user={userInfo}
                                       onClosed={() => handleEditMotivationSection()}
                                       onSuccess={handleChangeToastEditSuccess}
                                       onFailure={handleChangeToastEditFailure}
                />
            }
            {
                showDeleteAccountPopup &&
                <PopupDeleteAccount onClosed={() => handleDeleteAccount()}/>
            }

            <NavbarTop isConnected={authTokens} isWelcomePage={false}/>
            <div className="full-page-w-nav profile-page">
                <div className="profile-top-menu">
                    <ProfileTopMenu>
                        <ProfileTopMenuElement activeTab={activeTab} setActiveTab={setActiveTab}
                                               icon="fa fa-user"
                                               value="user"
                                               text={t('myProfile')}/>
                        <ProfileTopMenuSeparator/>
                        <ProfileTopMenuElement activeTab={activeTab} setActiveTab={setActiveTab}
                                               icon="fa fa-paw"
                                               value="pets"
                                               text={t('myPets')}/>
                    </ProfileTopMenu>
                </div>
                <div className="profile-container">
                    <div className="profile-card-container">
                        <div className="position-relative">
                            <img draggable={false} className="mpl-profile-picture"
                                 src={(userInfo.avatar !== "") ? userInfo.avatar : user} alt={"Profile"}/>
                            <div className="mpl-profile-picture-overlay-container">
                                <div className="mpl-profile-picture-overlay"
                                     onClick={() => setShowProfilePicturePopup(true)}>
                                    <div className="w-100 text-center">
                                        <i className="fas fa-edit fa-4x color-gradiant-black"/>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <h3 className="profile-name">{userInfo.pseudo}</h3>
                        <div className="profile-name-subline"/>
                        <div className="profile-stats">
                            {/*<div>75 {t('profile.forumParticipations')}</div>*/}
                            <div>{t('profile.memberSince')} {toDate(userInfo.createdAt)}</div>
                        </div>
                    </div>
                    <div className="profile-infos-container">
                        <ProfileInfoSection title={t('profile.myInfos')} onEditSection={handleEditPersonalSection}>
                            <p className="profile-infos-section-body-title">{t('profile.identity')}</p>
                            <Row>
                                <Col sm={5}>
                                    <ProfileInfoContentElement
                                        text={<>{userInfo.firstName} <b>{userInfo.lastName}</b></>}
                                        value={userInfo.firstName || userInfo.lastName}
                                        icon="fa fa-user"/>
                                    <ProfileInfoContentElement value="**********"
                                                               icon="fa fa-lock"/>
                                    <ProfileInfoContentElement value={toPhoneFormat(userInfo.phoneNumber)}
                                                               icon="fas fa-phone-alt"/>
                                </Col>
                                <Col sm={7}>
                                    <ProfileInfoContentElement value={userInfo.email}
                                                               icon="fa fa-envelope"/>
                                    <ProfileInfoContentElement value={toDate(userInfo.birthDate)}
                                                               icon="fas fa-birthday-cake"/>
                                    <ProfileInfoContentElement value={userInfo.address}
                                                               text={userInfo.address}
                                                               icon="fas fa-map-marker-alt"/>
                                </Col>
                            </Row>
                        </ProfileInfoSection>
                        <ProfileInfoSection title={t('profile.myHome')} onEditSection={handleEditHomeSection}>
                            <ProfileInfoContentElement value={userInfo.house}
                                                       text={t('profile.youLiveIn') + " " + t('dataBase.' + userInfo.house)}
                                                       icon="fas fa-home"/>
                            <ProfileInfoContentElement value={userInfo.is_house_owner}
                                                       text={userInfo.is_house_owner ? t('profile.owner') : t('profile.tenant')}
                                                       icon="fas fa-file-contract"/>
                            {
                                userInfo.is_house_owner === false &&
                                <ProfileInfoContentElement value={userInfo.have_house_owner_accord}
                                                           text={userInfo.have_house_owner_accord ? t('profile.ownerAgreement') : t('profile.ownerDisagreement')}
                                                           icon={(!userInfo.have_house_owner_accord || typeof userInfo.have_house_owner_accord === "undefined") ? "fas fa-times-circle" : "fas fa-check-circle"}/>
                            }
                            <ProfileInfoContentElement value={userInfo.garden}
                                                       text={userInfo.garden ? (t('profile.gardenIs') + " " + (userInfo.garden_surface ? t('profile.gardenPrep') + " " + userInfo.garden_surface + " " + userInfo.garden_unity + "²" : "")) : t('profile.noGarden')}
                                                       icon={(!userInfo.garden || typeof userInfo.garden === "undefined") ? "fas fa-times-circle" : "fas fa-check-circle"}/>
                            {
                                userInfo.garden === true &&
                                <ProfileInfoContentElement value={userInfo.garden_fence}
                                                           text={userInfo.garden_fence ? t('profile.fence') : t('profile.noFence')}
                                                           icon={userInfo.garden_fence ? "fas fa-door-closed" : "fas fa-door-open"}/>
                            }
                        </ProfileInfoSection>
                        <ProfileInfoSection title={t('profile.myEnvironment')}
                                            onEditSection={handleEditEnvironmentSection}>
                            <ProfileInfoContentElement value={userInfo.adult_number}
                                                       text={t('profile.family') + " " + userInfo.adult_number + " " + t('profile.adults') + " " + userInfo.child_number + " " + t('profile.children')}
                                                       icon="fas fa-child"/>
                            <ProfileInfoContentElement value={userInfo.allergy}
                                                       text={userInfo.allergy ? t('profile.allergy') : t('profile.noAllergy')}
                                                       icon={(!userInfo.allergy || typeof userInfo.allergy === "undefined") ? "fas fa-times-circle" : "fas fa-check-circle"}/>
                            <ProfileInfoContentElement value={userInfo.other_pets}
                                                       text={userInfo.other_pets ? t('profile.otherPets') : t('profile.noOtherPets')}
                                                       icon={(!userInfo.other_pets || typeof userInfo.other_pets === "undefined") ? "fas fa-times-circle" : "fas fa-check-circle"}/>
                            {
                                userInfo.other_pets &&
                                <ProfileInfoContentElement value={userInfo.other_pets_description}
                                                           text={<>{t('profile.yourAnimals')} : <div
                                                               className="fst-italic font-1">{userInfo.other_pets_description}</div></>}
                                                           icon={"fas fa-paw"}/>
                            }
                        </ProfileInfoSection>
                        <ProfileInfoSection title={t('profile.dailyTitle')}
                                            onEditSection={handleEditDailySection}>
                            <ProfileInfoContentElement value={userInfo.have_adopted_yet}
                                                       text={userInfo.have_adopted_yet ? t('profile.adoptedYet') : t('profile.notAdoptedYet')}
                                                       icon={"fas fa-home"}/>
                            {
                                userInfo.have_adopted_yet &&
                                <ProfileInfoContentElement value={userInfo.pet_adopted_description}
                                                           text={<>{t('profile.daily.animalAdopted')} : <div
                                                               className="fst-italic font-1">{userInfo.pet_adopted_description}</div></>}
                                                           icon={"fas fa-paw"}/>
                            }
                            <ProfileInfoContentElement value={userInfo.adoption_day_night}
                                                       text={<>{t('profile.daily.animalLocation')} : <div
                                                           className="fst-italic font-1">{userInfo.adoption_day_night}</div></>}
                                                       icon={"fas fa-paw"}/>
                            <ProfileInfoContentElement value={userInfo.hour_absent}
                                                       text={t('profile.absent') +  " " + userInfo.hour_absent + " " + t('profile.hoursADay')}
                                                       icon={"fas fa-clock"}/>
                            <ProfileInfoContentElement value={userInfo.adoption_activities}
                                                       text={<>{t('profile.daily.activities')} : <div
                                                           className="fst-italic font-1">{userInfo.adoption_activities}</div></>}
                                                       icon={"fas fa-paw"}/>
                            <ProfileInfoContentElement value={userInfo.walk_number}
                                                       text={t('profile.daily.planTo') + " " + userInfo.walk_number + " " + t('profile.daily.walksAWeek')}
                                                       icon={"fas fa-clock"}/>
                        </ProfileInfoSection>
                        <ProfileInfoSection title={t('profile.motivationTitle')}
                                            onEditSection={handleEditMotivationSection}>
                            <ProfileInfoContentElement value={userInfo.adoption_why}
                                                       text={<>{t('profile.update.adoptionWhySentence')} : <div
                                                           className="fst-italic font-1">{userInfo.adoption_why}</div></>}
                                                       icon={"fas fa-paw"}/>
                            <ProfileInfoContentElement value={userInfo.adoption_when}
                                                       text={<>{t('profile.update.sinceWhenSentence')} : <div
                                                           className="fst-italic font-1">{userInfo.adoption_when}</div></>}
                                                       icon={"fas fa-clock"}/>
                            <ProfileInfoContentElement value={userInfo.adoption_research}
                                                       text={<>{t('profile.update.qualitiesSentence')} : <div
                                                           className="fst-italic font-1">{userInfo.adoption_research}</div></>}
                                                       icon={"fas fa-heart"}/>
                        </ProfileInfoSection>

                        <div className="text-center my-5">
                            <div className="btn-mpl-alert" onClick={() => (handleDeleteAccount())}>
                                {t('profile.deleteAccount')}
                            </div>
                        </div>
                    </div>
                    <div className="profile-bank-container">
                        <ProfileInfoSection title={t('profile.accountStatement')}>
                            <p className="profile-infos-section-body-title">{t('profile.bankAccount')}</p>
                            <p className="profile-bank-account">XXXX XXXX XXXX 1234</p>
                            <p className="profile-bank-add-account zoom-1">
                                <i className="fas fa-plus-circle color-gradiant-red"/> {t('add')}
                            </p>
                        </ProfileInfoSection>
                        <div className="profile-infos-section-body">
                            <p className="profile-infos-section-body-title">{t('profile.myActivity')}</p>
                            <ProfileBankHistory date="03/10/2020" price="4,99€"
                                                description={t('subscription') + " " + t('pricing.offers.basic')}/>
                            <ProfileBankHistory date="26/09/2020" price="24,99€" description={t('purchase')}/>
                            <ProfileBankHistory date="03/09/2020" price="4,99€"
                                                description={t('subscription') + " " + t('pricing.offers.basic')}/>
                        </div>
                    </div>
                </div>
            </div>
            <Toasts onChangeSuccess={handleChangeToastEditSuccess} showSuccess={showToastEditSuccess}
                    successTitle={t('toaster.updateSuccessTitle')}
                    successTime={t('toaster.justNow')} successContent={t('toaster.updateSuccess')}
                    onChangeFailure={handleChangeToastEditFailure} showFailure={showToastEditFailure}
                    failureTitle={t('toaster.updateFailureTitle')}
                    failureTime={t('toaster.justNow')} failureContent={t('toaster.updateFailure')}
            />
            <Toasts onChangeSuccess={handleChangeToastNewAvatarSuccess} showSuccess={showToastNewAvatarSuccess}
                    successTitle={t('toaster.updateSuccessTitle')}
                    successTime={t('toaster.justNow')} successContent={t('toaster.updateProfilePictureSuccess')}
                    onChangeFailure={handleChangeToastNewAvatarFailure} showFailure={showToastNewAvatarFailure}
                    failureTitle={t('toaster.updateFailureTitle')}
                    failureTime={t('toaster.justNow')} failureContent={t('toaster.updateProfilePictureFailure')}
            />

        </>
    );
}
