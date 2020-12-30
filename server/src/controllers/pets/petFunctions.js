const Pets = require("../../schema/petSchema");
var mongoose = require('mongoose');

/**
 * GET request to fetch user's pets names and ids
 * @param req
 * @param res
 * @returns {promise}
 */
async function getPetsNameAndId(req, res) {

    try {
        const findPetsName = await Pets.find({ user_id: req.params.user_id }).select('name');
        if (!findPetsName) {
            return res.status(202).json({
                text: "Internal error"
            });
        }
        else if (findPetsName.length === 0) {
            return res.status(201).json({
                text: "User has no pets"
            });
        }
        else {
            return res.status(200).json({
                text: "Success",
                petsname: findPetsName
            });
        }
    } catch (err) {
        return res.status(202).json({
            text: "Internal error"
        });
    }

}

/**
 * GET request to fetch pet's avatar
 * @param req
 * @param res
 * @returns {promise}
 */
async function getAvatar(req, res) {

    try {
        const findPetAvatar = await Pets.findById(req.params.id).select('avatar');
        if (!findPetAvatar) {
            return res.status(202).json({
                text: "Internal error"
            });
        }
        else {
            if (findPetAvatar.avatar !== undefined && findPetAvatar.avatar !== "") {
                return res.status(200).json({
                    text: "Success",
                    avatar: findPetAvatar
                });
            } else {
                return res.status(201).json({
                    text: "Pet has no avatar"
                });
            }
        }
    } catch (err) {
        return res.status(202).json({
            text: "Internal error"
        });
    }
}

/**
 * GET request to check the id
 * @param req
 * @param res
 * @returns {promise}
 */
async function getPetsName(req, res) {
    const findPetsName = await Pets.find({ user_id: req.query.user_id}).select("name avatar").limit(3)
    if (findPetsName[0]){
        return res.status(200).json({
            text: "Pets's name  found",
            petsname: findPetsName
        });
    }
    else{
        return res.status(209).json({
            text: "Pets are not here",
            petsname: findPetsName
        });
    }
}

/**
 * GET request to fetch pet's infos
 * @param req
 * @param res
 * @returns {promise}
 */
async function getInfos(req, res) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(202).json({
            text: "Not a valid id"});
    }
    try {
        const findPetInfos = await Pets.findById(req.params.id);
        if (!findPetInfos) {
            return res.status(202).json({
                text: "Internal error"
            });
        }
        else {
            return res.status(200).json({
                text: "Success",
                infos: findPetInfos
            });
        }
    } catch (err) {
        return res.status(202).json({
            text: "Internal error"
        });
    }
}

/**
 * POST request to update global section information
 * @param req
 * @param res
 * @returns {promise}
 */
async function updateGlobalInfo(req, res) {

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(202).json({
            text: "Not a valid id"});
    }
    try {
        const update = await Pets.updateOne(
            {_id: req.params.id},
            {
                name : req.body.name,
                sex : req.body.sex,
                species : req.body.species,
                race : req.body.race,
                birth_date : req.body.birth_date,
                welcome_date : req.body.welcome_date
            },
            function (err) {
                if (err) {
                    throw err;
                }
            });
        if (update) {
            return res.status(200).json({
                text: "Success"});
        } else {
            return res.status(201).json({
                text: "Unknown pet id"});
        }
    } catch (err) {
        return res.status(203).json({
            text: "Internal error"
        });
    }
}

/**
 * POST request to update veterinary section information
 * @param req
 * @param res
 * @returns {promise}
 */
async function updateVeterinaryInfo(req, res) {

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(202).json({
            text: "Not a valid id"});
    }
    try {
        await Pets.updateOne(
            {_id: req.params.id},
            {
                neutering : req.body.neutering,
                microchip : req.body.microchip,
                tattoo : req.body.tattoo,
                vet_name : req.body.vet_name,
                vet_phone : req.body.vet_phone,
                vet_address : req.body.vet_address
            },
            function (err) {
                if (err) {
                    throw err;
                }
            });
        return res.status(200).json({
            text: "Success"});
    } catch (err) {
        return res.status(202).json({
            text: "Internal error"
        });
    }
}

exports.getPetsNameAndId = getPetsNameAndId;
exports.getPetsName = getPetsName;
exports.getAvatar = getAvatar;
exports.getInfos = getInfos;
exports.updateGlobalInfo = updateGlobalInfo;
exports.updateVeterinaryInfo = updateVeterinaryInfo;
