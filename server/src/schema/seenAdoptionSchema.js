const mongoose = require("mongoose");

const seenAdoptionSchema = mongoose.Schema(
    {
        adoption_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Adoption'},
        user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    },
);

module.exports = mongoose.model("SeenAdoption", seenAdoptionSchema);
