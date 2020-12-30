import './AdoptionPageSelection.css';
import React from "react";

export default function AdoptionPageSelection(props) {

    function handleChangePage(pageNumber) {
        props.onChange(pageNumber)
    }

    return (
        <div>
            {props.value > 1 &&
            <>
                <a className="button-page-selector button-chevron-left-container" href="#top"
                   onClick={() => (handleChangePage(props.value - 1))}>{<i className="fa fa-chevron-left"/>}</a>
                <a className="button-page-selector button-one-container page-text" href="#top"
                   onClick={() => (handleChangePage(props.value - 1))}>{props.value - 1}</a>
            </>
            }
            <div className="button-page-selector button-two-container page-text">{props.value}</div>
            {props.value < props.max &&
            <>
                <a className="button-page-selector button-tree-container page-text" href="#top"
                   onClick={() => (handleChangePage(props.value + 1))}>{props.value + 1}</a>
                <a className="button-page-selector button-chevron-right-container page-text" href="#top"
                   onClick={() => (handleChangePage(props.value + 1))}>{<i className="fa fa-chevron-right"/>}</a>
            </>
            }
        </div>
    )
}
