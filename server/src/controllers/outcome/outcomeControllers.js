// Definition of Outcome Route

const outcome = require('./outcomeFunction.js');

module.exports = function (app) {
    // ~/outcome/getSinglePetOutcome
    app.get('/getSinglePetOutcome', outcome.getPetOutcome);
    // ~/outcome/getOutcomeById
    app.get('/getOutcomeById', outcome.getOutcomeById);
};
