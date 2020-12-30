const mongoose = require("mongoose");

const adoptionSchema = mongoose.Schema(
    {
        association_id: String,
        status: String,
        folderStatus: String,
        position: Number,
        publication_date: Date,
        association_name: String,
        name: String,
        birthDate: Date,
        sex: String,
        color: String,
        sterilisation: Boolean,
        microchip: Boolean,
        cross: Boolean,
        species: String,
        race: String,
        race_two: String,
        description: String,
        additional_information: String,
        size:Number,
        size_unit:String,

        photo_one: String,
        photo_two: String,
        photo_three: String,

        contact: {
            phone: Number,
            address: String,
            postcode: Number,
            city: String,
            country: String
        },
    },
);

module.exports = mongoose.model("Adoption", adoptionSchema);
