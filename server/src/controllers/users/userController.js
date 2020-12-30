// Definition of Users routes

const user = require('./userFunctions.js');


module.exports = function (app) {
    // ~/users/checkaddr
    app.get('/checkAddr', user.checkAddr);
    // ~/users/checkPseudo
    app.get('/checkPseudo', user.checkPseudo);
    // ~/users/loginUser
    app.get('/loginUser', user.loginUser);
    // ~/users/signupParticulier
    app.post('/signupParticulier', user.signupParticulier);
    // ~/users/checkToken
    app.get('/checkToken', user.checkToken);
    // ~/users/confirmEmail
    app.post('/confirmEmail', user.confirmEmail);
    // ~/users/forgotPassword
    app.post('/forgotPassword', user.forgotPassword);
    // ~/users/sendContactMail
    app.post('/sendContactMail', user.sendContactMail);
    // ~/users/resetPassword
    app.post('/resetPassword', user.resetPassword);
    // ~/users/updateUser
    app.put('/updateUser', user.updateUser);
    // ~/users/updateUserGlobalInfos
    app.post('/updateUserGlobalInfos', user.updateUserGlobalInfos);
    // ~/users/updateUserHomeInfos
    app.post('/updateUserHomeInfos', user.updateUserHomeInfos);
    // ~/users/updateUserEnvironmentInfos
    app.post('/updateUserEnvironmentInfos', user.updateUserEnvironmentInfos);
    // ~/users/updateUserDailyInfos
    app.post('/updateUserDailyInfos', user.updateUserDailyInfos);
    // ~/users/updateUserMotivationInfos
    app.post('/updateUserMotivationInfos', user.updateUserMotivationInfos);
    // ~/users/updateUserAvatar
    app.post('/updateUserAvatar', user.updateUserAvatar);
    // ~/users/sendConfirmEmail
    app.post('/sendConfirmEmail', user.sendConfirmEmail);
    // ~/users/changeEmailAndConfirm
    app.post('/changeEmailAndConfirm', user.changeEmailAndConfirm);
    // ~/users/sendConfirmNewsletterEmail
    app.post('/sendConfirmNewsletterEmail', user.sendConfirmNewsletterEmail);
    // ~/users/subscribeNewsletter
    app.post('/subscribeNewsletter', user.subscribeNewsletter);
};
