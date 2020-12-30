import React from "react";
import api from "./api";
import {Image} from "react-bootstrap";
import dateFnsFormat from "date-fns/format";
import FORMAT from "./calendarParameters/formatDate";
import {retrieveLanguage} from "./user-infos";

export function checkEmpty(value, id) {
    if (value === "") {
        if( id !== "")
            document.getElementById(id).style.display =  'block';
        return false;
    } else {
        if( id !== "")
            document.getElementById(id).style.display = 'none';
        return true;
    }
}

export function checkPhoneFormat(value, id) {
    if (value.length < 10 || value.length > 13) {
        document.getElementById(id).style.display = 'block';
        return false;
    } else {
        document.getElementById(id).style.display = 'none';
        return true;
    }
}

export function checkPasswordFormat(value, id) {
    if (value.match(/[A-Z]/g) === null || value.length < 8 || value.match(/[a-z]/g) === null
        || value.match(/[0-9]/g) === null || value.match(/[" "]/g) !== null) {
        if(id !== "") {
            document.getElementById(id).style.display = 'block';
        }
        return false;
    } else {
        if(id !== "") {
            document.getElementById(id).style.display = 'none';
        }
        return true;
    }
}

export function checkChangePasswordFormat(value) {
    if(value === "********") {
        return true;
    } else if (value === "********" || value.match(/[A-Z]/g) === null || value.length < 8 || value.match(/[a-z]/g) === null
        || value.match(/[0-9]/g) === null || value.match(/[" "]/g) !== null) {
        return false;
    }else{
        return true;
    }
}

export function checkDateFormat(value, id) {
    try{
        const date = dateFnsFormat(value, FORMAT[retrieveLanguage()] );
        if (date === "" || date.match(/[A-Z]/g) !== null || date.match(/[a-z]/g) !== null) {
            if(id !== "")
                document.getElementById(id).style.display = 'block';
            return false;
        } else {
            if(id !== "")
                document.getElementById(id).style.display = 'none';
            return true;
        }
    } catch (e) {
        if(id !== "")
            document.getElementById(id).style.display = 'block';
        return false;
    }

}

export function checkEmailFormat(value, id) {
    if (value.match(/[@]/g) === null || value.match(/[.]/g) === null || value.match(/[" "]/g) !== null) {
        if (id !== "")
            document.getElementById(id).style.display = 'block';
        return false;
    } else {
        if (id !== "")
            document.getElementById(id).style.display = 'none';
        return true;
    }
}

export function authorizedEmail(value, id) {
    // Check if email is temporary
    var invalidEmailsFile = require('./invalidEmails');
    var invalidEmails = invalidEmailsFile['default'].split(",");
    for (var k in invalidEmails) {
        if (invalidEmails[k] !== "" && value.includes(invalidEmails[k])) {
            if (id !== "")
                document.getElementById(id).style.display = 'block';
            return false;
        }
    }
    // Check if it's a bad email
    if (!value.includes("@mypetslife.co")) {
        if (value.match(/[+]/g) !== null) {
            if (id !== "")
                document.getElementById(id).style.display = 'block';
            return false;
        }
    }
    if (id !== "")
        document.getElementById(id).style.display = 'none';
    return true;
}

export async function checkEmailExist(value, id) {
    try {
        const data = await api.checkAddr(value);
        if (data.status === 200) {
            document.getElementById(id).style.display = 'block';
            return true;
        } else {
            document.getElementById(id).style.display = 'none';
            return false;
        }
    } catch {
        document.getElementById(id).style.display = 'block';
        return false;
    }
}

export async function checkEmailDoNotExist(value, id) {
    try {
        const data = await api.checkAddr(value);
        if (data.status === 200) {
            document.getElementById(id).style.display = 'none';
            return true;
        } else {
            document.getElementById(id).style.display = 'block';
            return false;
        }
    } catch {
        document.getElementById(id).style.display = 'none';
        return false;
    }
}

export async function checkPseudoExist(value, id) {
    try {
        const data = await api.checkPseudo(value);
        if (data.status === 200) {
            document.getElementById(id).style.display = 'block';
            return true;
        } else {
            document.getElementById(id).style.display = 'none';
            return false;
        }
    } catch {
        return false;
    }
}

export function authorizedPseudo(value, id) {
    var invalidWordsFile = require('./invalidWords');
    var invalidWords = invalidWordsFile['default'].split(",");
    for (var k in invalidWords) {
        if (invalidWords[k] !== "" && value.includes(invalidWords[k])) {
            if (id !== "")
                document.getElementById(id).style.display = 'block';
            return false;
        }
    }
    if (id !== "")
        document.getElementById(id).style.display = 'none';
    return true;
}

export function showPassword(id) {
    var inputPassword = document.getElementById(id);
    if (inputPassword.type === "password") {
        inputPassword.type = "text";
    } else if (inputPassword.type === "text") {
        inputPassword.type = "password";
    }
}

export function displayCurrentPhoneCode(){
    var language = retrieveLanguage();
    var phoneCode = "+33";

    if(language === 'it'){
        phoneCode = "+39";
    }
    if(language === 'de'){
        phoneCode = "+49";
    }
    if(language === 'pt'){
        phoneCode = "+351";
    }
    if(language === 'es'){
        phoneCode = "+34";
    }
    if(language === 'en'){
        phoneCode = "+44";
    }

    return phoneCode;
}

export function displayCurrentFlag(){

    var language = retrieveLanguage();
    var flag = require('../svg/flags/french.svg');

    if(language === 'it'){
        flag = require('../svg/flags/italian.svg');
    }
    if(language === 'de'){
        flag = require('../svg/flags/german.svg');
    }
    if(language === 'pt'){
        flag = require('../svg/flags/portuguese.svg');
    }
    if(language === 'es'){
        flag = require('../svg/flags/spanish.svg');
    }
    if(language === 'en'){
        flag = require('../svg/flags/english.svg');
    }

    return(
        <>
            <Image
                className="flag-asset"
                draggable={false}
                src={flag}
            />
        </>
    )
}

export function isMobile() {
    return window.innerWidth <= 900;
}

export function isSmallMobile() {
    return window.innerWidth <= 425;
}
