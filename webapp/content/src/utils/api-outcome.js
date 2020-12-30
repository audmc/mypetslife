import axios from 'axios';

const burl = process.env.REACT_APP_API_URL;
const headers = {
    "Content-Type": "application/json",
};
export default {
    getPetsName: function (user_id) {
        return axios.get(
            `${burl}/pets/getPetsName`,
            {
                params: {
                    user_id: user_id
                },
                headers: {
                    headers
                }
            }
        );
    },
    getPetOutcome: function (user_id, pet_id, category, outcomePageNumber) {
        return axios.get(
            `${burl}/outcome/getSinglePetOutcome`,
            {
                params: {
                    user_id: user_id,
                    pet_id: pet_id,
                    category:category,
                    outcomePageNumber: outcomePageNumber
                },
                headers: {
                    headers
                }
            }
        );
    },
    getOutcomeById: function(outcome_id){
        return axios.get(
            `${burl}/outcome/getOutcomeById`,
            {
                params:{
                    outcome_id : outcome_id
                },
                headers:{
                    headers
                }
            }
        );
    }
}
