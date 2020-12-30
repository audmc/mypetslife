const axios = require('axios');
const jwt = require('jsonwebtoken');
require('dotenv').config();

describe('Display adoptions', () => {

    test('get All Adoptions', async () => {
        const res = await axios.get(
            `http://localhost:8080/adoption/getAllAdoption`,
            {
                params: {
                    pageNumber: 20,
                }
            });
        expect(res.status).toBe(200);
    },30000);

});

describe('update Adoption', () => {

    test('Adoption exist', async () => {
        const data = {
            id: "5f7759ff3cf0d5b1e0387d2b",
            status: "published",
            position: "1",
            photo_one: "",
            photo_two: "",
            photo_three: "",
            name: "updateTest Pet",
            sex: "female",
            sterilisation: true,
            cross: true,
            birthDate: new Date(),
            species: "cat",
            race: "siamese",
            race_two: "siamese",
            size: 34,
            size_unit: "cm",
            color: "amande",
            address: "1 rue du test",
            description: "Ma description de test pour mon super animal",
            additional_information: "Pas d'informations complémentaires"
        };
        const res = await axios.post(
            `http://localhost:8080/adoption/updateAdoption`,
            {
                params: {
                   token: jwt.sign(
                       { data },
                       process.env.SECRET_TOKEN
                   )
                }
            });
        expect(res.status).toBe(200);
    },50000);

});

describe('get One Adoption', () => {

    test('Adoption exist', async () => {
        const data = {
            id : "5f75c1da13e011900c34fecf"
        };
        const res = await axios.get(
            `http://localhost:8080/adoption/getOneAdoption`,
            {
                params: {
                    token: jwt.sign(
                        { data },
                        process.env.SECRET_TOKEN
                    )
                }
            });
        expect(res.status).toBe(200);
    },50000);


    test('Adoption does not exist', async () => {
        let data = {
            id : "5f75c1da13e011900c34fecb"
        };
        const res = await axios.get(
            `http://localhost:8080/adoption/getOneAdoption`,
            {
                params: {
                    token: jwt.sign(
                        { data },
                        process.env.SECRET_TOKEN
                    )
                }
            });
        expect(res.status).toBe(201);
    },50000);

});

describe('add and delete adoptions', () => {

    test('Add and delete an adoption', async () => {
        let data = {
            association_id: "5fa837ffbe1d080759df2d94",
            association_name: "association test",
            status: "publishad",
            tr: "fr",
            photo_one: "",
            photo_two: "",
            photo_three: "",
            name: "Test Pet",
            sex: "male",
            sterilisation: true,
            cross: false,
            birthDate: new Date(),
            species: "cat",
            race: "siamese",
            race_two: "",
            size: 12,
            size_unit: "m",
            color: "amande",
            address: "1 rue du test",
            description: "test test test",
            additional_information: "test test test"
        };
        const res = await axios.post(
            `http://localhost:8080/adoption/addAdoption`,
            {
                params: {
                    token: jwt.sign(
                        { data },
                        process.env.SECRET_TOKEN
                    )
                }
            });
        expect(res.status).toBe(200);
        const decoded = jwt.verify(res.data.findAdoption, process.env.SECRET_TOKEN);
        data = {
            _id: decoded.Adoption._id
        };
        const result = await axios.post(
            `http://localhost:8080/adoption/deleteAdoption`,
            {
                params: {
                    token: jwt.sign(
                        { data },
                        process.env.SECRET_TOKEN
                    )
                }
            });
        expect(result.status).toBe(200);
        console.log(res);
    },50000);

});
