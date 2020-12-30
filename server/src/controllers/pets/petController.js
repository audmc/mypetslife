// Definition of Pets routes

const pet = require('./petFunctions');

module.exports = function (app) {
    // ~/pets/names/{user_id}
    app.get('/names/:user_id', pet.getPetsNameAndId);
    // ~/pets/{id}/avatar
    app.get('/:id/avatar', pet.getAvatar);
    // ~/pets/getPetsName
    app.get('/getPetsName', pet.getPetsName);
    // ~/pets/{id}
    app.get('/:id', pet.getInfos);
    // ~/pets/{id}/globalSection
    app.post('/:id/globalSection', pet.updateGlobalInfo);
    // ~/pets/{id}/veterinarySection
    app.post('/:id/veterinarySection', pet.updateVeterinaryInfo);
}