const mongoose = require("mongoose");

const weightSchema = mongoose.Schema(
    {
        pet_id:  {type: mongoose.Schema.Types.ObjectId, ref: 'Pet'},
        value: Number,
        unit: String,
        date: Date,
    },
);

module.exports = mongoose.model("Weight", weightSchema);
