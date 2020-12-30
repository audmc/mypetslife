let fr = require('../../public/locales/fr/translation');
let de = require('../../public/locales/de/translation');
let es = require('../../public/locales/es/translation');
let pt = require('../../public/locales/pt/translation');
let it = require('../../public/locales/it/translation');
let en = require('../../public/locales/en/translation');

let frPets = require('../../public/locales/fr/pets');
let dePets = require('../../public/locales/de/pets');
let esPets = require('../../public/locales/es/pets');
let ptPets = require('../../public/locales/pt/pets');
let itPets = require('../../public/locales/it/pets');
let enPets = require('../../public/locales/en/pets');

describe('languages tests', () => {

    describe('All traductions exist', () => {
        test('JSON have the same line number', () => {
            expect(JSON.stringify(fr).match(/"/g).length).toEqual(JSON.stringify(de).match(/"/g).length);
            expect(JSON.stringify(fr).match(/"/g).length).toEqual(JSON.stringify(es).match(/"/g).length);
            expect(JSON.stringify(fr).match(/"/g).length).toEqual(JSON.stringify(pt).match(/"/g).length);
            expect(JSON.stringify(fr).match(/"/g).length).toEqual(JSON.stringify(en).match(/"/g).length);
            expect(JSON.stringify(fr).match(/"/g).length).toEqual(JSON.stringify(it).match(/"/g).length);
        });

        var frenchKeys = [];
        var germanKeys = [];
        var italianKeys = [];
        var spanishKeys = [];
        var portugueseKeys = [];
        var englishKeys = [];

        for (var k1 in fr) frenchKeys.push(k1);
        for (var k2 in de) germanKeys.push(k2);
        for (var k3 in it) italianKeys.push(k3);
        for (var k4 in es) spanishKeys.push(k4);
        for (var k5 in en) englishKeys.push(k5);
        for (var k6 in pt) portugueseKeys.push(k6);

        test('JSON have the same sections', () => {
            expect(frenchKeys).toEqual(germanKeys);
            expect(frenchKeys).toEqual(italianKeys);
            expect(frenchKeys).toEqual(spanishKeys);
            expect(frenchKeys).toEqual(englishKeys);
            expect(frenchKeys).toEqual(portugueseKeys);
        });

        var frenchSubKeys = [];
        var germanSubKeys = [];
        var italianSubKeys = [];
        var spanishSubKeys = [];
        var portugueseSubKeys = [];
        var englishSubKeys = [];

        for (var j1 in frenchKeys){
            for (var k7 in fr[j1]) frenchSubKeys.push(k7);
        }
        for (var j2 in germanKeys){
            for (var k8 in fr[j2]) germanSubKeys.push(k8);
        }
        for (var j3 in italianKeys){
            for (var k9 in fr[j3]) italianSubKeys.push(k9);
        }
        for (var j4 in spanishKeys){
            for (var k10 in fr[j4]) spanishSubKeys.push(k10);
        }
        for (var j5 in portugueseKeys){
            for (var k11 in fr[j5]) portugueseSubKeys.push(k11);
        }
        for (var j6 in englishKeys){
            for (var k12 in fr[j6]) englishSubKeys.push(k12);
        }

        test('JSON have the same subsections', () => {
            expect(frenchSubKeys).toEqual(germanSubKeys);
            expect(frenchSubKeys).toEqual(italianSubKeys);
            expect(frenchSubKeys).toEqual(spanishSubKeys);
            expect(frenchSubKeys).toEqual(englishSubKeys);
            expect(frenchSubKeys).toEqual(portugueseSubKeys);
        });
    });

    describe('All pet traductions exist', () => {
        test('JSON have the same line number', () => {
            expect(JSON.stringify(frPets).match(/"/g).length).toEqual(JSON.stringify(dePets).match(/"/g).length);
            expect(JSON.stringify(frPets).match(/"/g).length).toEqual(JSON.stringify(esPets).match(/"/g).length);
            expect(JSON.stringify(frPets).match(/"/g).length).toEqual(JSON.stringify(ptPets).match(/"/g).length);
            expect(JSON.stringify(frPets).match(/"/g).length).toEqual(JSON.stringify(enPets).match(/"/g).length);
            expect(JSON.stringify(frPets).match(/"/g).length).toEqual(JSON.stringify(itPets).match(/"/g).length);
        });

        var frenchKeysPets = [];
        var germanKeysPets = [];
        var italianKeysPets = [];
        var spanishKeysPets = [];
        var portugueseKeysPets = [];
        var englishKeysPets = [];

        for (var kPets1 in frPets) frenchKeysPets.push(kPets1);
        for (var kPets2 in dePets) germanKeysPets.push(kPets2);
        for (var kPets3 in itPets) italianKeysPets.push(kPets3);
        for (var kPets4 in esPets) spanishKeysPets.push(kPets4);
        for (var kPets5 in enPets) englishKeysPets.push(kPets5);
        for (var kPets6 in ptPets) portugueseKeysPets.push(kPets6);

        test('JSON have the same sections', () => {
            expect(frenchKeysPets).toEqual(germanKeysPets);
            expect(frenchKeysPets).toEqual(italianKeysPets);
            expect(frenchKeysPets).toEqual(spanishKeysPets);
            expect(frenchKeysPets).toEqual(englishKeysPets);
            expect(frenchKeysPets).toEqual(portugueseKeysPets);
        });

        var frenchSubKeysPets = [];
        var germanSubKeysPets = [];
        var italianSubKeysPets = [];
        var spanishSubKeysPets = [];
        var portugueseSubKeysPets = [];
        var englishSubKeysPets = [];

        for (var jPets1 in frenchKeysPets){
            for (var kPets7 in frPets[jPets1]) frenchSubKeysPets.push(kPets7);
        }
        for (var jPets2 in germanKeysPets){
            for (var kPets8 in frPets[jPets2]) germanSubKeysPets.push(kPets8);
        }
        for (var jPets3 in italianKeysPets){
            for (var kPets9 in frPets[jPets3]) italianSubKeysPets.push(kPets9);
        }
        for (var jPets4 in spanishKeysPets){
            for (var kPets10 in frPets[jPets4]) spanishSubKeysPets.push(kPets10);
        }
        for (var jPets5 in portugueseKeysPets){
            for (var kPets11 in frPets[jPets5]) portugueseSubKeysPets.push(kPets11);
        }
        for (var jPets6 in englishKeysPets){
            for (var kPets12 in fr[jPets6]) englishSubKeysPets.push(kPets12);
        }

        test('JSON have the same subsections', () => {
            expect(frenchSubKeysPets).toEqual(germanSubKeysPets);
            expect(frenchSubKeysPets).toEqual(italianSubKeysPets);
            expect(frenchSubKeysPets).toEqual(spanishSubKeysPets);
            expect(frenchSubKeysPets).toEqual(englishSubKeysPets);
            expect(frenchSubKeysPets).toEqual(portugueseSubKeysPets);
        });
    });

});
