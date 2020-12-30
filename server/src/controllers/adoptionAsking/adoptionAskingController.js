// Definition of adoptions components
const adoptions = require('./adoptionAskingFunctions.js');

module.exports = function (app) {
    // ~/adoptionAsking/getAdoptionsAskingLabels
    app.get('/getAdoptionsAskingLabels', adoptions.getAdoptionsAskingLabels);
    // ~/adoptionAsking/getOneAdoptionsAsking
    app.get('/getOneAdoptionsAsking', adoptions.getOneAdoptionsAsking);
    // ~/adoptionAsking/getAdoptionsAskingLabels
    app.get('/getAllAdoptionsAskingLabels', adoptions.getAllAdoptionsAskingLabels);
    // ~/adoptionAsking/deleteAdoptionsAskingWithAdoptionId
    app.post('/deleteAdoptionsAskingWithAdoptionId', adoptions.deleteAdoptionsAskingWithAdoptionId);
    // ~/adoptionAsking/waitAdoptionsAsking
    app.post('/waitAdoptionsAsking', adoptions.waitAdoptionsAsking);
    // ~/adoptionAsking/refuseAdoptionsAsking
    app.post('/refuseAdoptionsAsking', adoptions.refuseAdoptionsAsking);
    // ~/adoptionAsking/commentAdoptionsAsking
    app.post('/commentAdoptionsAsking', adoptions.commentAdoptionsAsking);
    // ~/adoptionAsking/acceptAdoptionsAsking
    app.post('/acceptAdoptionsAsking', adoptions.acceptAdoptionsAsking);
    // ~/adoptionAsking/acceptUserAdoptionsAsking
    app.post('/acceptUserAdoptionsAsking', adoptions.acceptUserAdoptionsAsking);
    // ~/adoptionAsking/acceptUserAdoptionsAsking
    app.post('/refuseUserAdoptionsAsking', adoptions.refuseUserAdoptionsAsking);
};
