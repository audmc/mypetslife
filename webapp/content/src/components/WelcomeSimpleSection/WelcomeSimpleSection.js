import React from "react";
import './WelcomeSimpleSection.css'
import { Col, Image, Row } from "react-bootstrap";

export default function WelcomeSimpleSection(props) {
    const { isReversed, title, image, content, background } = props;

    return (
        <>
            <Row className={"welcome-simple-section-container" + (isReversed ? ' reverse' : '')}
                style={{ backgroundImage: `url(${background})` }}>
                <Col lg={5} className={"welcome-simple-section-container-image"}>
                    <Image src={image} draggable={false} fluid className="welcome-simple-section-image" alt={title} />
                </Col>
                <Col lg={7} className="welcome-simple-section-container-text">
                    <h1 className="welcome-simple-section-container-title">{title}</h1>
                    <div className="welcome-simple-section-container-content text-justify">
                        {content}
                    </div>
                </Col>
            </Row>
        </>
    );
}
