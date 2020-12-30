const mongoose = require("mongoose");

const medicalTestSchema = mongoose.Schema(
    {
        pet_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Pet'},
        date: Date,
        name: String,
        type: String,
    },
);

module.exports = mongoose.model("MedicalTest", medicalTestSchema);
