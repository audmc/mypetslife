import {getAge, getGoodGender} from "../utils/adoption-function";
import {cryptData, decryptData} from "../utils/user-infos";
import React from "react";

describe('test age', () => {

    var today = new Date();

    test('4 months', () => {
        if(today.getDay() !== 1) {
            var birthDate = new Date(today.getFullYear(), today.getMonth() - 4, today.getDay() - 1);
        }else{
            var birthDate = new Date(today.getFullYear(), today.getMonth() - 4, today.getDay());
        }
        expect(getAge(birthDate, "month", "years", "year", "months")).toBe('4 months');
    });

    test('1 year 4 months', () => {
        if(today.getDay() !== 1) {
            var birthDate = new Date(today.getFullYear() - 1, today.getMonth() - 4, today.getDay() - 1);
        }else {
            var birthDate = new Date(today.getFullYear() - 1, today.getMonth() - 4, today.getDay());
        }
        expect(getAge(birthDate, "month", "years", "year", "months")).toBe('1 year 4 months');
    });

    test('2 years 4 months', () => {
        if(today.getDay() !== 1) {
            var birthDate = new Date(today.getFullYear() - 2, today.getMonth() - 4, today.getDay() - 1);
        }else{
            var birthDate = new Date(today.getFullYear() - 2, today.getMonth() - 4, today.getDay());
        }
        expect(getAge(birthDate, "month", "years", "year", "months")).toBe('2 years 4 months');
    });

    test('2 years 1 month', () => {
        if(today.getDay() !== 1) {
            var birthDate = new Date(today.getFullYear() - 2, today.getMonth() - 1, today.getDay() - 1);
        }else {
            var birthDate = new Date(today.getFullYear() - 2, today.getMonth() - 1, today.getDay());
        }
        expect(getAge(birthDate, "month", "years", "year", "months")).toBe('2 years 1 month');
    });

    test('1002 years 1 month', () => {
        if(today.getDay() !== 1) {
            var birthDate = new Date(today.getFullYear() - 1002, today.getMonth() - 1, today.getDay() - 1);
        }else {
            var birthDate = new Date(today.getFullYear() - 1002, today.getMonth() - 1, today.getDay());
        }
        expect(getAge( birthDate, "month", "years", "year", "months")).toBe('1002 years 1 month');
    });
});

describe('test sex', () => {

    test('female', () => {
        expect(getGoodGender('female')).toStrictEqual(<i className="fas fa-venus"/>);
    });
    test('male', () => {
        expect(getGoodGender('male')).toStrictEqual(<i className="fas fa-mars"/>);
    });
});

describe('test Crypt', () => {

    test('decrypt', () => {
        expect(decryptData(cryptData("toto", "test"), "test").data).toBe("toto");
    });

    test('crypt', () => {
        expect(cryptData("toto", "test").toString().length).toBe(124);
    });
});
