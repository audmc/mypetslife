const mongoose = require("mongoose");

const sizeSchema = mongoose.Schema(
    {
        pet_id:  {type: mongoose.Schema.Types.ObjectId, ref: 'Pet'},
        value: Number,
        unit: String,
        date: Date,
    },
);

module.exports = mongoose.model("Size", sizeSchema);
