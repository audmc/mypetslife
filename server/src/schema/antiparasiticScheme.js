const mongoose = require("mongoose");

const antiparasiticSchema = mongoose.Schema(
    {
        pet_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Pet'},
        start_date: Date,
        end_date: Date,
        name: String,
        type: String,
    },
);

module.exports = mongoose.model("Antiparasitic", antiparasiticSchema);
