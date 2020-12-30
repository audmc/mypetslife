const mongoose = require("mongoose");

const surgerySchema = mongoose.Schema(
    {
        pet_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Pet'},
        start_date: Date,
        end_date: Date,
        name: String,
        type: String,
    },
);

module.exports = mongoose.model("Surgery", surgerySchema);
