const messageSchema = require("../../schema/messageSchema");
const jwt = require('jsonwebtoken');

/**
 * POST request to recover all
 * @param req
 * @param res
 * @returns {promise}
 */
async function newMessage(req, res) {
    const new_conversation = new messageSchema({
        conversation_id: "",
        user_from_id: "",
        users_to_id: [""],
        content: "new message",
        date: new Date(),
    });
    new_conversation.save()
}

async function sendMessage(conversation_id, user_from_id, users_to_id, content) {
    const new_message = new messageSchema({
        conversation_id: conversation_id,
        user_from_id: user_from_id,
        users_to_id: users_to_id,
        content: content,
        date: new Date(),
    });
    new_message.save();
    return true;
}

exports.newMessage = newMessage;
exports.sendMessage = sendMessage;
