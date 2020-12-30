const mongoose = require("mongoose");

const adoptionAskingSchema = mongoose.Schema(
    {
        adoption_id: String,
        user_id: String,
        user_name: String,
        status: String,
        comment: String,
        ask_date: Date,
        house_type: {
                type: String,
                required: true,
                enum: ['appartment', 'house'],
                default: 'appartment'
        },
        is_house_owner: Boolean,
        have_house_owner_accord: Boolean,
        garden: Boolean,
        child_number: Number,
        adult_number: Number,
        allergy: Boolean,
        other_pets: Boolean,
        other_pets_description: String,
        have_adopted_yet: Boolean,
        pet_adopted_description: String,
        adoption_day_night: String,
        hour_absent: Number,
        adoption_activities: String,
        walk_number: Number,
        adoption_why: String,
        adoption_when: Date,
        adoption_research: String,
    },
);

module.exports = mongoose.model("adoptionAsking", adoptionAskingSchema);
