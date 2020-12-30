const mongoose = require("mongoose");

const outcomeSchema = mongoose.Schema(
    {
        user_id: String, //{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        pet_id: String, //{ type: mongoose.Schema.Types.ObjectId, ref: 'Pet' },
        title: String,
        description: String,
        category: String,
        value: Number,
        payment_type: String,
        date: Date,
        frequency: String,
    },
);

module.exports = mongoose.model("Outcome", outcomeSchema);
