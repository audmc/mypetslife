import axios from 'axios';

const burl = process.env.REACT_APP_API_URL;
const headers = {
    "Content-Type": "application/json",
};

export default {

    getAllAdoptions: function (pageNumber) {
        return axios.get(
            `${burl}/adoption/getAllAdoption`,
            {
                params: {
                    pageNumber: pageNumber
                },
                headers: {
                    headers
                },
            }
        )
    },

    countAdoptions: function (countAdoption) {
        return axios.get(
            `${burl}/adoption/countAdoptions`,
            {
                headers: {
                    headers
                },
            }
        );
    },
}

