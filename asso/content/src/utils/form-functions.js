import api from "./api";
import dateFnsFormat from "date-fns/format";
import FORMAT from "./calendarParameters/formatDate";
import {retrieveLanguage} from "./user-infos";

export function checkEmpty(value, id) {
    if (value === "") {
        if(id !== "")
            document.getElementById(id).style.display =  'block';
        return false;
    } else {
        if(id !== "")
            document.getElementById(id).style.display = 'none';
        return true;
    }
}

export function checkPhoneFormat(value, id) {
    if (value.length < 10 || value.length > 13) {
        if(id !== "")
            document.getElementById(id).style.display = 'block';
        return false;
    } else {
        if(id !== "")
            document.getElementById(id).style.display = 'none';
        return true;
    }
}

export function checkPasswordFormat(value, id) {
    if (value.match(/[A-Z]/g) === null || value.length < 8 || value.match(/[a-z]/g) === null
        || value.match(/[0-9]/g) === null || value.match(/[" "]/g) !== null) {
        if(id !== "")
            document.getElementById(id).style.display = 'block';
        return false;
    } else {
        if(id !== "")
            document.getElementById(id).style.display = 'none';
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
            if(id !== "")
                document.getElementById(id).style.display = 'block';
            return true;
        } else {
            if(id !== "")
                document.getElementById(id).style.display = 'none';
            return false;
        }
    } catch {
        if(id !== "")
            document.getElementById(id).style.display = 'block';
        return false;
    }
}

export async function checkEmailDoNotExist(value, id) {
    try {
        const data = await api.checkAddr(value);
        if (data.status === 200) {
            if(id !== "")
                document.getElementById(id).style.display = 'none';
            return true;
        } else {
            if(id !== "")
                document.getElementById(id).style.display = 'block';
            return false;
        }
    } catch {
        if(id !== "")
            document.getElementById(id).style.display = 'none';
        return false;
    }
}

export async function checkPseudoExist(value, id) {
    try {
        const data = await api.checkPseudo(value);
        if (data.status === 200) {
            if(id !== "")
                document.getElementById(id).style.display = 'block';
            return true;
        } else {
            if(id !== "")
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

    if (value === "" || value.match(/[@,.,[," ",#,{,&,~,",',(,|,`,^,),=,},%,£,$,$,*,µ,!,/,:,;,?,<,>,§]/g) !== null) {
        if (id !== "")
            document.getElementById(id).style.display = 'block';
        return false;
    } else {
        for (var k in invalidWords) {
            if (invalidWords[k] !== "" && value.includes(invalidWords[k])) {
                if(id !== "")
                    document.getElementById(id).style.display = 'block';
                return false;
            }
        }
        if (id !== "")
            document.getElementById(id).style.display = 'none';
        return true;
    }
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

export function isMobile() {
    return window.innerWidth <= 900;
}

export function isSmallMobile() {
    return window.innerWidth <= 425;
}
