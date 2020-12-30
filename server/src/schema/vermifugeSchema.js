const mongoose = require("mongoose");

const vermifugeSchema = mongoose.Schema(
    {
        pet_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Pet'},
        date: Date,
        name: String,
        type: String,
        validity: Number,
    },
);

module.exports = mongoose.model("Vermifuge", vermifugeSchema);
