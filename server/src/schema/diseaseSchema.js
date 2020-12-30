const mongoose = require("mongoose");

const diseaseSchema = mongoose.Schema(
    {
        pet_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Pet'},
        start_date: Date,
        end_date: Date,
        name: String,
        type: {
            type: String,
            required: true,
            enum: ['appartment', 'house'],
            default: 'appartment'
        },
    },
);

module.exports = mongoose.model("Disease", diseaseSchema);
