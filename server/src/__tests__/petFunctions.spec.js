const axios = require('axios');

const burl = "http://localhost:8080"

const user_id = "5f4a8b34de2af9007936a2a1";
const pet_id = "5f743e4059c72772ece4af5c";

describe('Get pets IDs and Names', () => {
    test('Get pets ids success', async () => {
        const res = await axios.get(
            `${burl}/pets/names/${user_id}`);
        expect(res.status).toBe(200);
    },30000);

    test('Get pets ids no pets', async () => {
        const res = await axios.get(
            `${burl}/pets/names/fds${user_id}ze`);
        expect(res.status).toBe(201);
    },30000);

    test('Get pets ids failure', async () => {
        const res = await axios.get(
            `${burl}/pets/names/`);
        expect(res.status).toBe(202);
    },30000);
});

describe('Get pets Avatar', () => {

/*    test('Get pets avatar success', async () => {
        const res = await axios.get(
            `${burl}/pets/${pet_id}/avatar`);
        expect(res.status).toBe(200);
    },30000);*/

    test('Get pets avatar failure', async () => {
        const res = await axios.get(
            `${burl}/pets//avatar`);
        expect(res.status).toBe(202);
    },30000);

});

// getPetsName function

describe('Check petname function data', () => {

    test('User_id exist', async () => {
        const res = await axios.get(
            `http://localhost:8080/pets/getPetsName`,
            {
                params: {
                    user_id: "5f4a8b34de2af9007936a2a1",
                },
            });
        expect(res.status).toBe(200);
    },30000);

    test('User_id is empty', async () => {
        const res = await axios.get(
            `http://localhost:8080/pets/getPetsName`,
            {
                params: {
                    user_id: "",
                },
            });
        expect(res.status).toBe(209);
    },30000);

    test('User_id is wrong', async () => {
        const res = await axios.get(
            `http://localhost:8080/pets/getPetsName`,
            {
                params: {
                    user_id: "test",
                },
            });
        expect(res.status).toBe(209);
    },30000);
});


describe('Fetching pets info', () => {

/*    test('Get pets infos success', async () => {
        const res = await axios.get(
            `${burl}/pets/${pet_id}`);
        expect(res.status).toBe(200);
    },30000);*/

    test('Get pets infos failure', async () => {
        const res = await axios.get(
            `${burl}/pets/lko`);
        expect(res.status).toBe(202);
    },30000);
});

describe('Updating pets info', () => {

    test('Update pet Global info success', async () => {
        const res = await axios.post(
            `${burl}/pets/${pet_id}/globalSection`,
            {
                name : "Mowgli",
                sex : "male",
                species: "cat",
                race : "siamese",
                birth_date : "1971-06-24T11:00:00.000Z",
                welcome_date : "1972-06-24T11:00:00.000Z"
            });
        expect(res.status).toBe(200);
    },30000);

    test('Update pet Global info failure', async () => {
        const res = await axios.post(
            `${burl}/pets/k/globalSection`,
            {
                name : "Mowgli",
                sex : "male",
                species: "cat",
                race : "siamese",
                birth_date : "1971-06-24T11:00:00.000Z",
                welcome_date : "1972-06-24T11:00:00.000Z"
            });
        expect(res.status).toBe(202);
    },30000);

    test('Update pet veterinary info success', async () => {
        const res = await axios.post(
            `${burl}/pets/${pet_id}/veterinarySection`,
            {
                neutering : "1971-09-24T11:00:00.000Z",
                microchip : "S3-R1AL-NUMB3R",
                tattoo : "ARZC4FE8",
                vet_name : "Mr. Deanette",
                vet_phone : "0656487515",
                vet_address : "al. Jana Pawła II 78, 00-175 Warszawa, Poland"
            });
        expect(res.status).toBe(200);
    },30000);

    test('Update pet veterinary info failure', async () => {
        const res = await axios.post(
            `${burl}/pets/0/veterinarySection`,
            {
                neutering : "1971-09-24T11:00:00.000Z",
                microchip : "S3-R1AL-NUMB3R",
                tattoo : "ARZC4FE8",
                vet_name : "Mr. Deanette",
                vet_phone : "0656487515",
                vet_address : "al. Jana Pawła II 78, 00-175 Warszawa, Poland"
            });
        expect(res.status).toBe(202);
    },30000);
});
