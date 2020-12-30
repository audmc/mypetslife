// Definition of message components
const message = require('./messageFunctions');

module.exports = function (app) {
    // ~/message/newMessage
    app.post('/newMessage', message.newMessage);
};
