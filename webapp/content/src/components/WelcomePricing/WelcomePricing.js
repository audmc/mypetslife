import React, {useState} from "react";
import './WelcomePricing.css'
import PricingElement from "../PricingElement/PricingElement";
import {useTranslation} from "react-i18next";
import {Carousel} from "react-bootstrap";

export default function WelcomePricing(props) {
    const {t} = useTranslation();

    const freeOffer = [t('pricing.forum'), t('pricing.blog'), t('pricing.adoption'), t('pricing.contact'), t('pricing.vetos')];
    const basicOffer = [t('pricing.freeOffer'), t('pricing.healthBook'), t('pricing.lifedoc'), t('pricing.budget'), t('pricing.andMore')];
    const [index, setIndex] = useState(2);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    const Free = <PricingElement
        title={t('pricing.offers.free')}
        titleColor={'#333333'}
        price={"0€"}
        timeOffer={t('pricing.free')}
        color={'#c7f9cc'}
        content={freeOffer}
        scale={0.95}
    />

    const Basic = <PricingElement
        title={t('pricing.offers.basic')}
        titleColor={'#FAFAFA'}
        price={"4.99€"}
        timeOffer={t('pricing.mensual')}
        color={'#80ed99'}
        content={basicOffer}
        scale={1}
    />
    const Relax =
        <PricingElement
            title={t('pricing.offers.relax')}
            titleColor={'#FAFAFA'}
            price={"13.99€"}
            discount={"- 7%"}
            timeOffer={t('pricing.quarterly')}
            color={'#57cc99'}
            content={basicOffer}
            scale={1.05}
        />
    const Zen =
        <PricingElement
            title={t('pricing.offers.zen')}
            titleColor={'#FAFAFA'}
            price={"25.99€"}
            discount={"-13%"}
            timeOffer={t('pricing.semiAnnual')}
            color={'#80ed99'}
            content={basicOffer}
            scale={1}
        />
    const Serenity =
        <PricingElement
            title={t('pricing.offers.serenity')}
            titleColor={'#333333'}
            price={"49.99€"}
            discount={"-17%"}
            timeOffer={t('pricing.annual')}
            color={'#c7f9cc'}
            content={basicOffer}
            scale={0.95}
        />

    return (
        <div className="welcome-pricing-bg">
            <div className="welcome-pricing-content">
                <div className="welcome-pricing-header">
                    <h2 className="welcome-pricing-title">{t('pricing.discoverOur')}<span
                        className="color-red">{t('pricing.offer')}</span></h2>
                    <h5 className="welcome-pricing-subtitle">{t('pricing.subtitle')}</h5>
                </div>
                <div className="welcome-pricing-container">
                    {
                        props.isMobile &&
                        <>
                            <Carousel className="welcome-pricing-carousel"
                                      activeIndex={index}
                                      onSelect={handleSelect}
                                      wrap={false}>
                                <Carousel.Item>
                                    {Free}
                                </Carousel.Item>
                                <Carousel.Item>
                                    {Basic}

                                </Carousel.Item>
                                <Carousel.Item>
                                    {Relax}
                                </Carousel.Item>
                                <Carousel.Item>
                                    {Zen}
                                </Carousel.Item>
                                <Carousel.Item>
                                    {Serenity}
                                </Carousel.Item>
                            </Carousel>
                        </>
                    }
                    {
                        !props.isMobile &&
                        <>
                            {Free}
                            {Basic}
                            {Relax}
                            {Zen}
                            {Serenity}
                        </>
                    }

                </div>
            </div>
        </div>
    );
}
