import axios from 'axios';

const burl = process.env.REACT_APP_API_URL;
const headers = {
    "Content-Type": "application/json",
};

// eslint-disable-next-line
export default {

    /**
     * Fetch pets names & ids
     * @param user_id
     * @returns {Promise<AxiosResponse<any>>}
     */
    getPetsName: function(user_id) {
        return axios.get(
            `${burl}/pets/names/${user_id}`,
            {
                headers: {
                    headers
                }
            }
        )
    },

    /**
     * Fetch pet's avatar
     * @param pet_id
     * @returns {Promise<AxiosResponse<any>>}
     */
    getAvatar: function(pet_id) {
        return axios.get(
            `${burl}/pets/${pet_id}/avatar`,
            {
                headers: {
                    headers
                }
            }
        )
    },

    /**
     * Fetch pet's information
     * @param pet_id
     * @returns {Promise<AxiosResponse<any>>}
     */
    getInfos: function(pet_id) {
        return axios.get(
            `${burl}/pets/${pet_id}`,
            {
                headers: {
                    headers
                }
            }
        )
    },

    /**
     * Post new data for global section
     * @param pet_id
     * @param name
     * @param sex
     * @param species
     * @param race
     * @param birthDate
     * @param welcomeDate
     * @returns {Promise<AxiosResponse<any>>}
     */
    updateGlobalSection: function(pet_id, name, sex, species, race, birthDate, welcomeDate) {
        return axios.post(
            `${burl}/pets/${pet_id}/globalSection`,
            {
                name : name,
                sex : sex,
                species: species,
                race : race,
                birth_date : birthDate,
                welcome_date : welcomeDate
            },
            {
                headers: {
                    headers
                }
            }
        )
    },

    /**
     * Post new data for veterinary section
     * @param pet_id
     * @param neutering
     * @param microchip
     * @param tattoo
     * @param veterinary
     * @param phone
     * @param address
     * @returns {Promise<AxiosResponse<any>>}
     */
    updateVeterinarySection: function(pet_id, neutering, microchip, tattoo, veterinary, phone, address) {
        return axios.post(
            `${burl}/pets/${pet_id}/veterinarySection`,
            {
                neutering : neutering,
                microchip : microchip,
                tattoo : tattoo,
                vet_name : veterinary,
                vet_phone : phone,
                vet_address : address
            },
            {
                headers: {
                    headers
                }
            }
        )
    }
}