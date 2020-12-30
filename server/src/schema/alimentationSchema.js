const mongoose = require("mongoose");

const alimentationSchema = mongoose.Schema(
    {
        pet_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Pet'},
        start_date: Date,
        end_date: Date,
        brand: String,
        type: {
            type: String,
            required: true,
            enum: ['croquettes'],
            default: 'croquettes'
        },
    },
);

module.exports = mongoose.model("Alimentation", alimentationSchema);
