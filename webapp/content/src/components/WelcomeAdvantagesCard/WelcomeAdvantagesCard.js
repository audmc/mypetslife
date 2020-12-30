import React from "react";
import './WelcomeAdvantagesCard.css'
import {Card} from "react-bootstrap";

export default function WelcomeAdvantagesCard(props) {
    const {title, image, content, translate} = props;

    return (
        <>
            <Card className={"shadow welcome-advantages-card" + (translate ? " translate-"+ translate : "")}>
                <Card.Img variant="top" src={image} />
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text>
                        {content}
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    );
}
