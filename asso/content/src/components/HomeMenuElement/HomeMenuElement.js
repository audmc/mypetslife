import React from "react";
import "./HomeMenuElement.css";
import Col from "react-bootstrap/Col";

export default function HomeMenuElement(props) {
    return (
        <Col lg={2} xs={6} className="px-2" onClick={()=>(props.link ? window.location = props.link : window.location = "#")}>
            <div className="home-app-div">
                <img className="app-icon" src={props.icon} alt={props.title}/>
                <div className="home-app-title">
                    <p className="m-auto">{props.title}</p>
                </div>
            </div>
        </Col>
    );
}
