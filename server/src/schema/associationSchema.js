const mongoose = require("mongoose");

const associationSchema = mongoose.Schema(
    {
        name: String,
        password: String,
        email: String,
        pseudo: String,
        confirmed: Boolean,
        mangoId: String,
        princingOffer: String,
        inPayment: Boolean,
        siret: String,
        tokenResetPassword: String,
        avatar: String,
        confirmEmailToken: String,
        createdAt: Date,

        phone: Number,
        address: String,
        facebook: String,
        instagram: String,
        twitter: String,

        kbis: String,
        partnerContract: String,

        referentName: String,
        referentPhone: Number,
        referentRespo: String,
        referentEmail: String,
    },
);

module.exports = mongoose.model("Association", associationSchema);
