const mongoose = require("mongoose");

const forumTopicSchema = mongoose.Schema(
    {
        user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        title: String,
        publication_date: Date,
        content: String,
        category: String,
        sub_category: String,
        comment_number: Number,
        favorite_comment_id: {type: mongoose.Schema.Types.ObjectId, ref: 'forumComment'},
    },
);

module.exports = mongoose.model("ForumTopic", forumTopicSchema);
