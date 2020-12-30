import React, {useRef} from "react";
import './PricingElement.css'
import {Table} from "react-bootstrap";
import {useTranslation} from "react-i18next";

export default function PricingElement(props) {
    const {t} = useTranslation();

    const card = useRef();
    const subscribeButton = useRef();
    const priceRef = useRef();

    function hexToRgba(hex, opacity) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return ("rgba(" + parseInt(result[1], 16) + ","
            + parseInt(result[2], 16) + ","
            + parseInt(result[3], 16) + ","
            + opacity + ")");
    }

    function setOutline() {
        card.current.style.boxShadow = "0 0 0 0.2rem " + hexToRgba(color, 0.75);
        subscribeButton.current.style.transform = "scale(1.05)";
        priceRef.current.style.fontSize = "1.4rem";
    }

    function resetOutline() {
        card.current.style.boxShadow = "none"
        subscribeButton.current.style.transform = "scale(1)"
        priceRef.current.style.fontSize = "1.25rem";
    }

    const {
        title,
        titleColor,
        price,
        discount,
        timeOffer,
        content,
        color,
        scale
    } = props;

    return (
        <div ref={card}
             className="pricing-card"
             onMouseEnter={setOutline}
             onMouseLeave={resetOutline}
             style={{transform: "scale("+scale+")"}}
        >
            <div className="pricing-title-section" style={{backgroundColor: color}}>
                <h4 className="pricing-title" style={{color: titleColor}}>{title}</h4>
            </div>
            <div className="pricing-content text-center">
                <h5 ref={priceRef} className="pricing-price">{price}</h5>
                {
                    discount &&
                    <div className="pricing-discount">
                        {discount}
                    </div>
                }
                <p className="text-info">{timeOffer}</p>
                <div className="pricing-content-table">
                    <Table striped hover>
                        <tbody>
                        {
                            content.map((element) =>
                                <tr key={element}>
                                    <td>{element}</td>
                                </tr>
                            )
                        }
                        </tbody>
                    </Table>
                </div>
                <p ref={subscribeButton} className="pricing-subscription" style={{backgroundColor: color, color: titleColor}}>{t('pricing.subscribe')}</p>

            </div>

        </div>
    );
}
