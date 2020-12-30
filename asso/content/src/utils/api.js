import axios from 'axios';
import {retrieveLanguage} from "./user-infos";

const burl = process.env.REACT_APP_API_URL;
const headers = {
    "Content-Type": "application/json",
};

export default {

    checkAddr: function(email) {
        return axios.get(
            `${burl}/asso/checkAddr`,
            {
                params: {
                    email: email
                },
                headers: {
                    headers
                }
            });
    },

    updateAsso: function(asso, email){
        return axios.post(
            `${burl}/asso/updateAsso`,
            {
                params: {
                    token: asso,
                    email: email,
                    tr: retrieveLanguage()
                },
                headers: {
                    headers
                }
            }
        );
    },

    checkPseudo: function(pseudo) {
        return axios.get(
            `${burl}/asso/checkPseudo`,
            {
                params: {
                    pseudo: pseudo
                },
                headers: {
                    headers
                }
            });
    },

    loginAsso: function(pseudo) {
        return axios.get(
            `${burl}/asso/loginAsso`,
            {
                params: {
                    pseudo: pseudo
                }
            });
    },

    forgotPasswordAsso: function (pseudo) {
        return axios.post(
            `${burl}/asso/forgotPasswordAsso`,
            {
                params: {
                    pseudo: pseudo,
                    tr: retrieveLanguage()
                },
                headers: {
                    headers
                }
            }
        );
    },

    resetPasswordAsso: function (token, password) {
        return axios.post(
            `${burl}/asso/resetPasswordAsso`,
            {
                params: {
                    token: token,
                    password: password,
                    tr: localStorage.getItem("i18nextLng")
                },
                headers: {
                    headers
                }
            }
        );
    },

    firstPassword: function (id, password) {
        return axios.post(
            `${burl}/asso/firstPassword`,
            {
                params: {
                    id: id,
                    password: password,
                    tr: localStorage.getItem("i18nextLng")
                },
                headers: {
                    headers
                }
            }
        );
    },

    getAdoptionsLabels: function (token) {
        return axios.get(
            `${burl}/adoption/getAdoptionsLabels`,
            {
                params: {
                    token: token
                },
                headers: {
                    headers
                }
            }
        );
    },

    getOneAdoption: function (token) {
        return axios.get(
            `${burl}/adoption/getOneAdoption`,
            {
                params: {
                    token: token
                },
                headers: {
                    headers
                }
            }
        );
    },

    updateAdoption: function (token) {
        return axios.post(
            `${burl}/adoption/updateAdoption`,
            {
                params: {
                    token: token
                },
                headers: {
                    headers
                }
            }
        );
    },

    updatePosition: function (token) {
        return axios.post(
            `${burl}/adoption/updatePosition`,
            {
                params: {
                    token: token
                },
                headers: {
                    headers
                }
            }
        );
    },

    getAdoptionsAskingLabels: function (token) {
        return axios.get(
            `${burl}/adoptionAsking/getAdoptionsAskingLabels`,
            {
                params: {
                    token: token
                },
                headers: {
                    headers
                }
            }
        );
    },

    getAllAdoptionsAskingLabels: function (token) {
        return axios.get(
            `${burl}/adoptionAsking/getAllAdoptionsAskingLabels`,
            {
                params: {
                    token: token
                },
                headers: {
                    headers
                }
            }
        );
    },

    getOneAdoptionsAsking: function (token) {
        return axios.get(
            `${burl}/adoptionAsking/getOneAdoptionsAsking`,
            {
                params: {
                    token: token
                },
                headers: {
                    headers
                }
            }
        );
    },

    deleteAdoption: function (token) {
        return axios.post(
            `${burl}/adoption/deleteAdoption`,
            {
                params: {
                    token: token
                },
                headers: {
                    headers
                }
            }
        );
    },

    addAdoption: function (token) {
        return axios.post(
            `${burl}/adoption/addAdoption`,
            {
                params: {
                    token: token
                },
                headers: {
                    headers
                }
            }
        );
    },

    waitAdoptionsAsking: function (token) {
        return axios.post(
            `${burl}/adoptionAsking/waitAdoptionsAsking`,
            {
                params: {
                    token: token,
                    tr: retrieveLanguage()
                },
                headers: {
                    headers
                }
            }
        );
    },

    refuseAdoptionsAsking: function (token) {
        return axios.post(
            `${burl}/adoptionAsking/refuseAdoptionsAsking`,
            {
                params: {
                    token: token,
                    tr: retrieveLanguage()
                },
                headers: {
                    headers
                }
            }
        );
    },

    commentAdoptionsAsking: function (token) {
        return axios.post(
            `${burl}/adoptionAsking/commentAdoptionsAsking`,
            {
                params: {
                    token: token,
                },
                headers: {
                    headers
                }
            }
        );
    },

    acceptAdoptionsAsking: function (token) {
        return axios.post(
            `${burl}/adoptionAsking/acceptAdoptionsAsking`,
            {
                params: {
                    token: token,
                    tr: retrieveLanguage()
                },
                headers: {
                    headers
                }
            }
        );
    },

    refuseUserAdoptionsAsking: function (token) {
        return axios.post(
            `${burl}/adoptionAsking/refuseUserAdoptionsAsking`,
            {
                params: {
                    token: token,
                    tr: retrieveLanguage()
                },
                headers: {
                    headers
                }
            }
        );
    },

    acceptUserAdoptionsAsking: function (token) {
        return axios.post(
            `${burl}/adoptionAsking/acceptUserAdoptionsAsking`,
            {
                params: {
                    token: token,
                    tr: retrieveLanguage()
                },
                headers: {
                    headers
                }
            }
        );
    },
}
