import React from "react";
import "../../css/Profile.css"
import {Toast} from "react-bootstrap";

export default function Toasts(props) {

    function handleChangeToastEditSuccess(state) {
        props.onChangeSuccess(state);
    }

    function handleChangeToastEditFailure(state) {
        props.onChangeFailure(state);
    }

    return (
        <>
            <div className="toast-container">
                <Toast className="toast"
                       onClose={() => handleChangeToastEditSuccess(false)}
                       show={props.showSuccess}
                       delay={10000}
                       autohide>
                    <Toast.Header>
                        <i className="fas fa-check-circle color-gradiant-green"/>
                        <strong className="ml-1 mr-auto">{props.successTitle}</strong>
                        <small>{props.successTime}</small>
                    </Toast.Header>
                    <Toast.Body className="font-2">
                        {props.successContent}
                    </Toast.Body>
                </Toast>
                <Toast className="toast"
                       onClose={() => handleChangeToastEditFailure(false)}
                       show={props.showFailure}
                       delay={10000}
                       autohide>
                    <Toast.Header>
                        <i className="fas fa-times-circle color-gradiant-red"/>
                        <strong className="ml-1 mr-auto">{props.failureTitle}</strong>
                        <small>{props.failureTime}</small>
                    </Toast.Header>
                    <Toast.Body className="font-2">
                        {props.failureContent}
                    </Toast.Body>
                </Toast>
            </div>
        </>
    );
}
