import React from "react";
import './WelcomeAdvantages.css'
import app from '../../svg/welcome-advantages-app.svg'
import community from '../../svg/welcome-advantages-community.svg'
import nomad from '../../svg/welcome-advantages-nomad.svg'
import {CardDeck, Carousel} from "react-bootstrap";
import {useTranslation} from 'react-i18next';
import WelcomeAdvantagesCard from "../WelcomeAdvantagesCard/WelcomeAdvantagesCard";

export default function WelcomeAdvantages(props) {
    const {t} = useTranslation();
    return (
        <div className="full-page-w-nav advantages-bg">
            <CardDeck className="advantages-card-cols">
                <div className="advantages-card-container">
                    {
                        props.isMobile &&
                        <>
                            <Carousel className="advantages-carousel" wrap={false}>
                                <Carousel.Item>
                                    <WelcomeAdvantagesCard
                                        title={t('welcomePage.section3.nomadTitle')}
                                        content={t('welcomePage.section3.nomadContent')}
                                        image={nomad}
                                        translate={"bottom"}
                                    />
                                </Carousel.Item>
                                <Carousel.Item>
                                    <WelcomeAdvantagesCard
                                        title={t('welcomePage.section3.fluidTitle')}
                                        content={t('welcomePage.section3.fluidContent')}
                                        image={app}
                                        translate={"top"}
                                    />

                                </Carousel.Item>
                                <Carousel.Item>
                                    <WelcomeAdvantagesCard
                                        title={t('welcomePage.section3.communityTitle')}
                                        content={t('welcomePage.section3.communityContent')}
                                        image={community}
                                        translate={"bottom"}
                                    />
                                </Carousel.Item>
                            </Carousel>
                        </>
                    }
                    {
                        !props.isMobile &&
                        <>
                            <WelcomeAdvantagesCard
                                title={t('welcomePage.section3.nomadTitle')}
                                content={t('welcomePage.section3.nomadContent')}
                                image={nomad}
                                translate={"bottom"}
                            />
                            <WelcomeAdvantagesCard
                                title={t('welcomePage.section3.fluidTitle')}
                                content={t('welcomePage.section3.fluidContent')}
                                image={app}
                                translate={"top"}
                            />
                            <WelcomeAdvantagesCard
                                title={t('welcomePage.section3.communityTitle')}
                                content={t('welcomePage.section3.communityContent')}
                                image={community}
                                translate={"bottom"}
                            />
                        </>
                    }
                </div>
            </CardDeck>
        </div>

    );
}
