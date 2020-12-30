// Definition of Asso routes

const asso = require('./assoFunctions.js');

module.exports = function (app) {
    // ~/asso/checkaddr
    app.get('/checkAddr', asso.checkAddr);
    // ~/asso/forgotPasswordAsso
    app.post('/forgotPasswordAsso', asso.forgotPasswordAsso);
    // ~/asso/resetPasswordAsso
    app.post('/resetPasswordAsso', asso.resetPasswordAsso);
    // ~/asso/firstPassword
    app.post('/firstPassword', asso.firstPassword);
    // ~/asso/loginAsso
    app.get('/loginAsso', asso.loginAsso);
    // ~/asso/updateAsso
    app.post('/updateAsso', asso.updateAsso);
};
