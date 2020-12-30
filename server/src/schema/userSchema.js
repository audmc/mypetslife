const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        // App Information
        email: String,
        password: String,
        pseudo: String,
        mangoId: String,
        pricing_offer: String,
        inPayment: Boolean,
        token: String,
        timeStamp: Date,
        confirmed: Boolean,
        tokenResetPassword: String,
        avatar: String,
        avatarIsValidated: Boolean,
        confirmEmailToken: String,
        createdAt: Date,

        // Legal Information
        lastName: String,
        firstName: String,
        birthDate: Date,
        nationality: String,
        phoneNumber: Number,
        address: JSON,

        // Inscription Checkbox
        cgu: Boolean,
        newsletter: Boolean,

        // Pets account
        pets_account: [
            {type: mongoose.Schema.Types.ObjectId, ref: 'Pet'}
        ],

        // Adoption information
        house: String,
        is_house_owner: Boolean,
        have_house_owner_accord: Boolean,
        garden: Boolean,
        garden_surface: Number,
        garden_unity: String,
        garden_fence: Boolean,
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
        adoption_when: String,
        adoption_research: String,
    },
);

module.exports = mongoose.model("User", userSchema);
