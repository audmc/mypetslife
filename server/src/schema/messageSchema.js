const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
    {
        conversation_id: String,
        user_from_id: String,
        users_to_id: String,
        content: String,
        date: Date,
    },
);

module.exports = mongoose.model("Message", messageSchema);
