const mongoose = require("mongoose");

const forumCommentVoteSchema = mongoose.Schema(
    {
        user_id:  {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        topic_comment_id:  {type: mongoose.Schema.Types.ObjectId, ref: 'ForumComment'},
    },
);

module.exports = mongoose.model("ForumCommentVote", forumCommentVoteSchema);
