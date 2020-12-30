// Definition of conversation components
const conversation = require('./conversationFunctions');

module.exports = function (app) {
    // ~/conversation/updatePublishedAdoptionConversation
    app.post('/updatePublishedAdoptionConversation', conversation.updatePublishedAdoptionConversation);
};
