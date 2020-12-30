const mongoose = require("mongoose");

const hygieneSchema = mongoose.Schema(
    {
        pet_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Pet'},
        date: Date,
        type: String,
    },
);

module.exports = mongoose.model("Hygiene", hygieneSchema);
