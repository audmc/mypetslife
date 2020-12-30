import React from "react";

export default function NumberSelector(props) {

    const {
        minValue,
        maxValue
    } = props;

    function reduceNumber(){
        if(props.value>minValue){
            props.onChange(props.value-1);
        }
    }

    function increaseNumber(){
        if(props.value<maxValue){
            props.onChange(props.value+1);
        }
    }

    return (
        <div className="choice-container text-center mb-3">
            <span className="w-50 text-right"><i className="fa fa-chevron-circle-left color-green mr-3" onClick={() => reduceNumber()}/></span>
            <div className="input-mpl not-empty w-25 pl-0 mb-0">{props.value}</div>
            <span className="w-50 text-left"><i onClick={() => increaseNumber()} className="fa fa-chevron-circle-right color-green ml-3"/></span>
        </div>
    )
};
