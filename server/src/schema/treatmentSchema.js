const mongoose = require("mongoose");

const treatmentSchema = mongoose.Schema(
    {
        pet_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Pet'},
        start_date: Date,
        end_date: Date,
        name: String,
    },
);

module.exports = mongoose.model("Treatment", treatmentSchema);
