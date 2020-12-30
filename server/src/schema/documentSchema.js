const mongoose = require("mongoose");

const documentSchema = mongoose.Schema(
    {
        user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        pet_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Pet'},
        outcome_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Outcome'},
        category: String,
        file: String,
        title: String,
    },
);

module.exports = mongoose.model("Document", documentSchema);
