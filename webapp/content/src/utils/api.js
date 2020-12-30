import axios from 'axios';
import {retrieveLanguage} from "./user-infos";

const burl = process.env.REACT_APP_API_URL;
const headers = {
    "Content-Type": "application/json",
};

export default {

    checkToken: function(token) {
        return axios.get(
            `${burl}/users/checkToken`,
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

    checkAddr: function(email) {
        return axios.get(
            `${burl}/users/checkAddr`,
            {
                params: {
                    email: email
                },
                headers: {
                    headers
                }
            });
    },

    sendContactForm: function(firstName, lastName, email, phone, object, subObject, message){
        return axios.post(
            `${burl}/users/sendContactMail`,
            {
                params: {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    phone: phone,
                    object: object,
                    subObject: subObject,
                    message: message,
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
            `${burl}/users/checkPseudo`,
            {
                params: {
                    pseudo: pseudo
                },
                headers: {
                    headers
                }
            });
    },

    signupParticulier: function (email, mdp, cgu, preference, newsletter) {
        return axios.post(
            `${burl}/users/signupParticulier`,
            {
                params: {
                    email: email,
                    password: mdp,
                    cgu: cgu,
                    preference: preference,
                    newsletter: newsletter,
                },
                headers: {
                    headers
                }
            }
        );
    },

    loginUser: function(email) {
        return axios.get(
            `${burl}/users/loginUser`,
            {
                params: {
                    email: email
                }
            });
    },

    confirmEmail: function (token) {
        return axios.post(
            `${burl}/users/confirmEmail`,
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

    subscribeNewsletter: function (mail) {
        return axios.post(
            `${burl}/users/subscribeNewsletter`,
            {
                params: {
                    email: mail,
                },
                headers: {
                    headers
                }
            }
        );
    },

    changeEmailAndConfirm: function (email, oldEmail) {
        return axios.post(
            `${burl}/users/changeEmailAndConfirm`,
            {
                params: {
                    oldEmail: oldEmail,
                    email: email,
                    tr: retrieveLanguage()
                },
                headers: {
                    headers
                }
            }
        );
    },

    sendConfirmNewsletterEmail: function (email) {
        return axios.post(
            `${burl}/users/sendConfirmNewsletterEmail`,
            {
                params: {
                    email: email,
                    tr: retrieveLanguage()
                },
                headers: {
                    headers
                }
            }
        );
    },

    forgotPassword: function (email) {
        return axios.post(
            `${burl}/users/forgotPassword`,
            {
                params: {
                    email: email,
                    tr: retrieveLanguage()
                },
                headers: {
                    headers
                }
            }
        );
    },

    sendConfirmEmail: function (email) {
        return axios.post(
            `${burl}/users/sendConfirmEmail`,
            {
                params: {
                    email: email,
                    tr: retrieveLanguage()
                },
                headers: {
                    headers
                }
            }
        );
    },

    resetPassword: function (token, password) {
        return axios.post(
            `${burl}/users/resetPassword`,
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

    updateUserGlobalInfos: function (token, email) {
        return axios.post(
            `${burl}/users/updateUserGlobalInfos`,
            {
                params: {
                    token: token,
                    email: email,
                    tr: localStorage.getItem("i18nextLng")
                },
                headers: {
                    headers
                }
            }
        );
    },

    updateUserHomeInfos: function (token) {
        return axios.post(
            `${burl}/users/updateUserHomeInfos`,
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

    updateUserEnvironmentInfos: function (token) {
        return axios.post(
            `${burl}/users/updateUserEnvironmentInfos`,
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

    updateUserDailyInfos: function (token) {
        return axios.post(
            `${burl}/users/updateUserDailyInfos`,
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

    updateUserMotivationInfos: function (token) {
        return axios.post(
            `${burl}/users/updateUserMotivationInfos`,
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

    updateUserAvatar: function (token) {
        return axios.post(
            `${burl}/users/updateUserAvatar`,
            {
                params: {
                    token: token
                },
                headers: {
                    headers
                }
            }
        );
    }
}
