const mongoose = require("mongoose");

const forumCommentSchema = mongoose.Schema(
    {
        user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        topic_id: {type: mongoose.Schema.Types.ObjectId, ref: 'forumTopic'},
        publication_date: Date,
        content: String,
        vote_number: String,
    },
);

module.exports = mongoose.model("ForumComment", forumCommentSchema);
