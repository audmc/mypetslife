const mongoose = require("mongoose");

const conversationSchema = mongoose.Schema(
    {
        users_id:  [String],
        users_not_seen: [String],
    },
);

module.exports = mongoose.model("Conversation", conversationSchema);
