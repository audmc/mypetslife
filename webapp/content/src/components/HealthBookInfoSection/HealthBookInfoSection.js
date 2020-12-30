import React from "react";
import './HealthBookInfoSection.css';
import { useTranslation } from 'react-i18next';
import {Row, Col} from "react-bootstrap";
import blankInfoSection from "../HealthBookPage/blankInfoSection";

/**
 * Component INFOSECTION for HEALTHBOOK
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export default function HealthBookInfoSection(props) {
    const {t} = useTranslation();

    const {
        infos,
        onChangeGlobal,
        onChangeVeterinary
    } = props;

    /**
     * Apply necessary transformation from serialized values
     * @param item
     * @returns {string|null|*}
     */
    function tradIfNeeded(item) {
        if (item === undefined || item.description === undefined)
            return null;
        switch (item.nameTag) {
            case 'healthbook.sectionGlobalInfo.sex':
                return (t("healthbook.sectionGlobalInfo." + item.description));
            case 'healthbook.sectionGlobalInfo.species':
                return (t("pets:species." + item.description));
            case 'healthbook.sectionGlobalInfo.race':
                return (t("pets:races." + infos.global[2].description + '.' + item.description));
            case 'healthbook.sectionGlobalInfo.birthDate':
                return new Date(item.description).toLocaleDateString();
            case 'healthbook.sectionGlobalInfo.welcomeDate':
                return new Date(item.description).toLocaleDateString();
            case 'healthbook.sectionVeterinarianInfo.neutering':
                return new Date(item.description).toLocaleDateString();
            default:
                return (item.description);
        }
    }

    /**
     * Do literally nothing
     * @param state
     * @returns {null}
     */
    function doNothing (state) {
        return null;
    }

    /**
     * Render a section of information
     * @param props
     * @returns {JSX.Element}
     * @constructor
     */
    function RenderSection (props) {
        const { infos, title, onChange } = props;
        return (
            <>
                <Row className="healthbook-section-header">
                    <div className="healthbook-h1">
                        <span className="healthbook-fontawesome2 color-gradiant-red">
                            <i className="fas fa-list-alt"/>
                        </span>
                        {title}
                        <span className="healthbook-fontawesome2 healthbook-fontawesome2-right color-gradiant-red">
                            <i className="fas fa-edit" onClick={() => onChange(true)}/>
                        </span>
                    </div>
                </Row>
                <Row className="healthbook-section-data">
                    <Col>
                        {infos.map( (item, i) => (
                            <span key={i}>
                                {
                                    item.nameTag === 'healthbook.sectionVeterinarianInfo.veterinary' &&
                                    <Row className="healthbook-section-row">
                                        <Col className="healthbook-section-entry-icon-container">
                                            <div>
                                        <span className="healthbook-section-entry-icon color-gradiant-red">
                                            <i className="fas fa-id-card-alt"/>
                                        </span>
                                            </div>
                                        </Col>
                                        <Col>
                                            <div className={"healthbook-section-entry-text"}>
                                                {t('healthbook.sectionVeterinarianInfo.contactDetails')}:
                                            </div>
                                        </Col>
                                    </Row>
                                }
                                <Row className={"healthbook-section-row "  + ((item.nameTag === 'healthbook.sectionVeterinarianInfo.phone' || item.nameTag === 'healthbook.sectionVeterinarianInfo.veterinary' || (item.nameTag === 'healthbook.sectionVeterinarianInfo.address')) ? "healthbook-section-contact" : "")}>
                                    <Col className="healthbook-section-entry-icon-container">
                                        <div>
                                        <span className="healthbook-section-entry-icon color-gradiant-red">
                                            <i className={item.icon}/>
                                        </span>
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className={"healthbook-section-entry-text font-2"}>
                                            {t(item.nameTag)}: {(onChange === doNothing) ? "" : tradIfNeeded(item)}
                                        </div>
                                    </Col>
                                </Row>
                            </span>
                        ))}
                    </Col>
                </Row>
            </>
        );
    }
    if (infos === "") {
        return (
            <>
                <RenderSection title={t('healthbook.sectionGlobalInfo.title')} infos={blankInfoSection.global} onChange={doNothing}/>
                <RenderSection title={t('healthbook.sectionVeterinarianInfo.title')} infos={blankInfoSection.veterinarian} onChange={doNothing}/>
            </>
        );
    } else {
        return (
            <>
                <RenderSection title={t('healthbook.sectionGlobalInfo.title')} infos={infos.global} onChange={onChangeGlobal}/>
                <RenderSection title={t('healthbook.sectionVeterinarianInfo.title')} infos={infos.veterinarian} onChange={onChangeVeterinary}/>
            </>
        );
    }
}
