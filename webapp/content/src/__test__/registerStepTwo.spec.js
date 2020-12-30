import {displayCurrentPhoneCode} from "../utils/form-functions";

describe('Test display phone code and flag', () => {

    test('French phone code', () => {
        localStorage.setItem("i18nextLng","fr")
        expect(displayCurrentPhoneCode()).toBe("+33");
    })

    test('Italian phone code', () => {
        localStorage.setItem("i18nextLng","it")
        expect(displayCurrentPhoneCode()).toBe("+39");
    })

    test('Portuguese phone code', () => {
        localStorage.setItem("i18nextLng","pt")
        expect(displayCurrentPhoneCode()).toBe("+351");
    })

    test('Spanish phone code', () => {
        localStorage.setItem("i18nextLng","es")
        expect(displayCurrentPhoneCode()).toBe("+34");
    })
    test('German phone code', () => {
        localStorage.setItem("i18nextLng","de")
        expect(displayCurrentPhoneCode()).toBe("+49");
    })

    test('English phone code', () => {
        localStorage.setItem("i18nextLng","en")
        expect(displayCurrentPhoneCode()).toBe("+44");
    })

});