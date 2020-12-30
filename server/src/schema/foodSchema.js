const mongoose = require("mongoose");

const foodSchema = mongoose.Schema(
    {
        pet_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Pet'},
        type: String,
        quantity: Number,
        unit: String,
        date: Date,
    },
);

module.exports = mongoose.model("Food", foodSchema);
