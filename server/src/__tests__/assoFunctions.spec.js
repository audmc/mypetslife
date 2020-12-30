const axios = require('axios');

describe('Check data function', () => {

    test('Email exist', async () => {
        const res = await axios.get(
            `http://localhost:8080/asso/checkAddr`,
            {
                params: {
                    email: "lucie@mypetslife.co",
                }
            });
        expect(res.status).toBe(200);
    },30000);

    test('Email does not exist', async () => {
        const res = await axios.get(
            `http://localhost:8080/asso/checkAddr`,
            {
                params: {
                    email: "lucie@mypetslife.com",
                }
            });
        expect(res.status).toBe(201);
    },30000);

});

describe('Login tests', () => {

    test('Asso exist', async () => {
        const res = await axios.get(
            `http://localhost:8080/asso/loginAsso`,
            {
                params: {
                    pseudo: "associationTest"
                }
            });
        expect(res.status).toBe(200);
    },30000);

    test('Wrong pseudo', async () => {
        const res = await axios.get(
            `http://localhost:8080/asso/loginAsso`,
            {
                params: {
                    pseudo: "lucie"
                }
            });
        expect(res.status).toBe(202);
    },30000);

});

describe('Check first password function', () => {

   /*test('Asso exist', async () => {
        const res = await axios.post(
            `http://localhost:8080/asso/firstPassword`,
            {
                params: {
                    id: "5fa837ffbe1d080759df2d94",
                    password:"Admin123"
                },
            }
        );
        expect(res.status).toBe(200);
    },30000);*/

/*   test('Asso do not exist', async () => {
        const res = await axios.post(
            `http://localhost:8080/asso/firstPassword`,
            {
                params: {
                    id: "lucie",
                    password:"Admin123"
                },
            }
        );
        expect(res.status).toBe(202);
    },30000);*/

});

describe('Check forgot password function', () => {

    test('Pseudo exist', async () => {
        const res = await axios.post(
            `http://localhost:8080/asso/forgotPasswordAsso`,
            {
                params: {
                    pseudo: "associationTest",
                    tr:"fr"
                },
            }
        );
        expect(res.status).toBe(200);
    },30000);

    test('Pseudo do not exist', async () => {
        const res = await axios.post(
            `http://localhost:8080/asso/forgotPasswordAsso`,
            {
                params: {
                    pseudo: "lucie@mypetslife.com",
                    tr:"fr"
                },
            }
        );
        expect(res.status).toBe(202);
    },30000);

    test('Token is invalid', async () => {
        const res = await axios.post(
            `http://localhost:8080/asso/resetPasswordAsso`,
            {
                params: {
                    token: "test",
                    password:"test"
                },
            }
        );
        expect(res.status).toBe(202);
    },30000);

});
