const mongoose = require("mongoose");

const petSchema = mongoose.Schema(
    {
        user_id: String,
        avatar: String,
        name: String,
        birth_date: Date,
        sex: String,
        color: String,
        species: String,
        race: String,
        description: String,

        welcome_date: Date,
        neutering: Date,
        microchip: String,
        tattoo: String,

        vet_name: String,
        vet_phone: String,
        vet_address: String
    },
);

module.exports = mongoose.model("Pet", petSchema);
