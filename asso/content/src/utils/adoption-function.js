import React from "react";

export function getAge(birthDate, month, years, year, months) {

    var space = " ";
    var chevron = " < ";
    var today = new Date();
    var cpy_birthDate = new Date(birthDate);
    var age = today.getFullYear() - cpy_birthDate.getFullYear();
    var m = today.getMonth() - cpy_birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < cpy_birthDate.getDate())) {
        age--;
    }
    if (age === 0 && m === 1 && m < 12) {
        return (space + m + month);
    }
    if (age <= 0 && m > 1 && m < 12) {
        return (m + space + months);
    }
    if (age >= 2 && m >= 2) {
        return (age + space + years) + (space + m + space + months);
    }
    if (age >= 2 && m === 0) {
        return (age + space + years)
    }
    if (age === 1 && m >= 2) {
        return (age + space + year) + (space + m + space + months);
    }
    if (age === 1 && m === 0) {
        return (age + space + year);
    }
    if (age === 1 && m === 1) {
        return (age + space + year) + (space + m + space + month);
    }
    if(age >=2 && m === 1){
        return (age + space+  years) + (space + m + space + month);
    }
    if (age === 0 && m === 0) {
        return (chevron + 1 +  month);
    }
}

export function getGoodGender(sex) {

    if (sex === 'male') {
        return (
            <i className="fas fa-mars blue-icon"/>
        )
    } else {
        return (
            <i className="fas fa-venus blue-icon"/>
        )
    }
}

export function getDate(publication_date, txt) {

    let space = " "

    return (txt + space) + new Date(publication_date).toLocaleDateString();
}
