const axios = require('axios');

// getPetOutcome function

describe('Check outcome function data', () => {

    test('Outcome not found when user_id is empty', async () => {
        const res = await axios.get(
            `http://localhost:8080/outcome/getSinglePetOutcome`,
            {
                params: {
                    user_id: "",
                },
            });
        expect(res.status).toBe(206);
    },30000);

    test('All outcomes found , with user_id no pet_id to read yet', async () => {
        const res = await axios.get(
            `http://localhost:8080/outcome/getSinglePetOutcome`,
            {
                params: {
                    user_id: "5f4a8b34de2af9007936a2a1",
                },
            });
        expect(res.status).toBe(200);
    },30000);

    test('Outcomes not found when user_id & pet_id empty', async () => {
        const res = await axios.get(
              `http://localhost:8080/outcome/getSinglePetOutcome`,
              {
                  params: {
                      user_id: "",
                      pet_id: ""
                  },
              });
        expect(res.status).toBe(206);
    },30000);

    test('Get all outcomes with user_id and empty pet_id ', async () => {
        const res = await axios.get(
            `http://localhost:8080/outcome/getSinglePetOutcome`,
            {
              params: {
                 user_id: "5f4a8b34de2af9007936a2a1",
                 pet_id: "",
              },
            });
        expect(res.status).toBe(200);
    },30000);

    test('Outcomes not found when wrong user_id and empty pet_id ', async () => {
        const res = await axios.get(
            `http://localhost:8080/outcome/getSinglePetOutcome`,
            {
              params: {
                 user_id: "wrongId",
                 pet_id: "",
            },
        });
        expect(res.status).toBe(206);
    },30000);

    /*test('Get all outcomes of one pet by user_id and pet_id', async () => {
        const res = await axios.get(
        `http://localhost:8080/outcome/getSinglePetOutcome`,
        {
            params: {
                user_id: "5f4a8b34de2af9007936a2a1",
                pet_id: "5f7b1c4e883dabedc43bcaeb"
            },
        });
        expect(res.status).toBe(200);
    });*/

    test('Outcomes not found when good user_id and wrong pet_id ', async () => {
        const res = await axios.get(
            `http://localhost:8080/outcome/getSinglePetOutcome`,
            {
              params: {
                 user_id: "5f4a8b34de2af9007936a2a1",
                 pet_id: "test",
            },
        });
        expect(res.status).toBe(206);
    },30000);

    test('Outcomes not found when wrong user_id and good pet_id ', async () => {
        const res = await axios.get(
            `http://localhost:8080/outcome/getSinglePetOutcome`,
            {
              params: {
                 user_id: "test",
                 pet_id: "5f743e4059c72772ece4af5c",
            },
        });
        expect(res.status).toBe(206);
    },30000);

    test('Get all outcomes with empty pet_id and category ', async () => {
        const res = await axios.get(
            `http://localhost:8080/outcome/getSinglePetOutcome`,
            {
                params: {
                    user_id: "5f4a8b34de2af9007936a2a1",
                    category: "",
                    pet_id: ""
                },
            });
        expect(res.status).toBe(200);
    },30000);

    /*test('Get outcomes by user/pet_id with empty category', async () => {
        const res = await axios.get(
            `http://localhost:8080/outcome/getSinglePetOutcome`,
            {
                params: {
                    user_id: "5f4a8b34de2af9007936a2a1",
                    category: "",
                    pet_id: "5f7b1c4e883dabedc43bcaeb"
                },
            });
        expect(res.status).toBe(200);
    });*/
});

describe('Check single outcome get byId function',()=>{

    test(`Outcome id found`, async () => {
        const res = await axios.get(`http://localhost:8080/outcome/getOutcomeById`,
        {
            params:{
                outcome_id: "5f7724bdeb53eac68ad288da"
            },
        });
        expect(res.status).toBe(200)
    },30000);

    test(`Outcome id not found`, async () => {
        const res = await axios.get(`http://localhost:8080/outcome/getOutcomeById`,
        {
            params:{
                outcome_id: "fefez"
            },
        });
        expect(res.status).toBe(202)
    },30000);
});
