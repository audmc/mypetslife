// Definition of adoptions components
const adoptions = require('./adoptionsFunctions.js');

module.exports = function (app) {
    // ~/adoption/countAdoptions
    app.get('/countAdoptions', adoptions.countAdoptions);
    // ~/adoption/getAllAdoption
    app.get('/getAllAdoption', adoptions.getAllAdoptions);
    // ~/adoption/getAdoptionsLabels
    app.get('/getAdoptionsLabels', adoptions.getAdoptionsLabels);
    // ~/adoption/getOneAdoption
    app.get('/getOneAdoption', adoptions.getOneAdoption);
    // ~/adoption/updateAdoption
    app.post('/updateAdoption', adoptions.updateAdoption);
    // ~/adoption/addAdoption
    app.post('/addAdoption', adoptions.addAdoption);
    // ~/adoption/updatePosition
    app.post('/updatePosition', adoptions.updatePosition);
    // ~/adoption/deleteAdoption
    app.post('/deleteAdoption', adoptions.deleteAdoption);
};
