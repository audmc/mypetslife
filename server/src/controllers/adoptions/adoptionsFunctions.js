// ----- /adoptions functions ----- //
const adoptionAskingFunctions = require("../adoptionAsking/adoptionAskingFunctions");
const conversationFunctions = require("../conversation/conversationFunctions");

const adoptionSchema = require("../../schema/adoptionSchema.js");
const jwt = require('jsonwebtoken');

/**
 * GET request to count number of pages
 * @param req
 * @param res
 * @returns {promise}
 */

async function countAdoptions(req, res) {
    adoptionSchema.countDocuments({}, function(err, result) {
        if (result <= 0) {
            return res.status(201).json({
                text: "Wow, I think we do our job, no page ir",
            });
        } else {
            return res.status(200).json({
                text: "Success",
                pageNumber : (result/20 + 1),
            });
        }
    });
}

/**
 * GET request to stock data for display
 * @param req
 * @param res
 * @returns {promise}
 */

async function getAllAdoptions(req, res) {
    if(req.query.pageNumber === 0) {
        return res.status(202).json({
           text: "No Page ir, invalid page number"
        });
    } else {
        var adoptionsDisplayPerPage = 20;
        var sum = ((req.query.pageNumber * adoptionsDisplayPerPage) - adoptionsDisplayPerPage);
        const findAdoption = await adoptionSchema.find().limit(adoptionsDisplayPerPage).skip(sum).sort({publication_date: -1});

        if (findAdoption) {
            return res.status(200).json({
                text: "Success",
                findAdoption: findAdoption
            });
        } else {
            return res.status(201).json({
                text: "No Adoption yet, coming soon"
            });
        }
    }
}

/**
 * GET request to recover all
 * @param req
 * @param res
 * @returns {promise}
 */
async function getAdoptionsLabels(req, res) {
    const token = req.query.token;
    const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
    if (decoded.data.name) {
        let request = {
            association_name: decoded.data.name,
            status: decoded.data.status
        };
        if(decoded.data.category !== "all"){
            request = {
                association_name: decoded.data.name,
                status: decoded.data.status,
                species: decoded.data.category
            };
        }
        let findAdoption = await adoptionSchema.find(request).select('name').sort({position:1});
        const adoption = jwt.sign(
            { findAdoption },
            process.env.SECRET_TOKEN
        );
        return res.status(200).json({
            text: "Success",
            findAdoption: adoption
        });
    }
}

/**
 * GET request to recover all
 * @param req
 * @param res
 * @returns {promise}
 */
async function getOneAdoption(req, res) {
    const token = req.query.token;
    const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
    if (decoded.data.id) {
        const findAdoption = await adoptionSchema.findOne({_id: decoded.data.id});
        if (findAdoption) {
            const adoption = jwt.sign(
                {findAdoption},
                process.env.SECRET_TOKEN
            );
            return res.status(200).json({
                text: "Success",
                findAdoption: adoption
            });
        } else {
            return res.status(201).json({
                text: "No Adoption yet, coming soon"
            });
        }
    } else {
        return res.status(202).json({
            text: "Wrong token"
        });
    }
}

/**
 * POST request to recover all
 * @param req
 * @param res
 * @returns {promise}
 */
async function updateAdoption(req, res) {
    const token = req.body.params.token;
    const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
    if (decoded.data.id) {
        const newPosition = await adoptionSchema.find({ status: decoded.data.status }).count();
        const findAdoption = await adoptionSchema.updateOne(
            { _id: decoded.data.id },
            {
                status: decoded.data.status,
                position: decoded.data.change_status ? newPosition : decoded.data.position,
                photo_one: decoded.data.photo_one,
                photo_two: decoded.data.photo_two,
                photo_three: decoded.data.photo_three,
                name: decoded.data.name,
                sex: decoded.data.sex,
                sterilisation: decoded.data.sterilisation,
                cross: decoded.data.cross,
                birthDate: decoded.data.birthDate,
                species: decoded.data.species,
                race: decoded.data.race,
                race_two: decoded.data.race_two,
                size: decoded.data.size,
                size_unit: decoded.data.size_unit,
                color: decoded.data.color,
                address: decoded.data.address,
                description: decoded.data.description,
                additional_information: decoded.data.additional_information,
                folderStatus: ""
            });
        if (findAdoption) {
            const Adoption = await adoptionSchema.findOne({_id: decoded.data.id});
            const adoption = jwt.sign(
                {Adoption},
                process.env.SECRET_TOKEN
            );
            if(decoded.data.new_status){
                conversationFunctions.updatePublishedAdoptionConversation(req,res);
            }
            return res.status(200).json({
                text: "Success",
                findAdoption: adoption
            });
        } else {
            return res.status(201).json({
                text: "No Adoption yet, coming soon"
            });
        }
    }
}

/**
 * POST request to delete one adoption
 * @param req
 * @param res
 * @returns {promise}
 */
async function deleteAdoption(req, res) {
    const token = req.body.params.token;
    const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
    if (decoded.data._id) {
        const deletedAdoption = await adoptionSchema.deleteOne({ _id: decoded.data._id });
        if (deletedAdoption) {
            const result = await adoptionAskingFunctions.deleteAdoptionsAskingWithAdoptionId(req,res);
            if (result.status === 200) {
                return res.status(200).json({
                    text: "Success"
                });
            }
        } else {
            return res.status(201).json({
                text: "No Adoption deleted"
            });
        }
    }
}

/**
 * POST
 * @param req
 * @param res
 * @returns {promise}
 */
async function updatePosition(req, res) {
    const token = req.body.params.token;
    const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
    if(decoded.data){
        decoded.data.map(async (value, index) => {
            await adoptionSchema.updateOne(
                { _id: value._id },
                { position: index }
            );
        })
    }else{
        return res.status(201).json({
            text: "Wrong token"
        });
    }
}

/**
 * POST update adoption with new user name
 * @param req
 * @param res
 * @returns {promise}
 */
async function updateAdoptionsAssociationName(req, res) {
    const token = req.body.params.token;
    const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
    if (decoded.data._id) {
        await adoptionSchema.updateMany(
            {association_id: decoded.data._id},
            {association_name: decoded.data.name});
    }
}

/**
 * POST request to recover all
 * @param req
 * @param res
 * @returns {promise}
 */
async function addAdoption(req, res) {
    const token = req.body.params.token;
    const decoded = jwt.verify(token, process.env.SECRET_TOKEN);

    if (decoded.data.status) {
        const adoptionNumber = await adoptionSchema.countDocuments({ status: decoded.data.status });
        const newAdoption = new adoptionSchema(
            {
                association_id: decoded.data.association_id,
                association_name: decoded.data.association_name,
                status: decoded.data.status,
                position: adoptionNumber,
                photo_one: decoded.data.photo_one,
                photo_two: decoded.data.photo_two,
                photo_three: decoded.data.photo_three,
                name: decoded.data.name,
                sex: decoded.data.sex,
                sterilisation: decoded.data.sterilisation,
                cross: decoded.data.cross,
                birthDate: decoded.data.birthDate,
                species: decoded.data.species,
                race: decoded.data.race,
                race_two: decoded.data.race_two,
                size: decoded.data.size,
                size_unit: decoded.data.size_unit,
                color: decoded.data.color,
                address: decoded.data.address,
                description: decoded.data.description,
                additional_information: decoded.data.additional_information
            });
        newAdoption.save();
        if (newAdoption._id) {
            const Adoption = { _id : newAdoption._id};
            const adoption = jwt.sign(
                {Adoption},
                process.env.SECRET_TOKEN
            );
            return res.status(200).json({
                text: "Success",
                findAdoption: adoption
            });
        } else {
            return res.status(201).json({
                text: "No Adoption yet, coming soon"
            });
        }
    }
}

exports.getAllAdoptions = getAllAdoptions;
exports.getAdoptionsLabels = getAdoptionsLabels;
exports.getOneAdoption = getOneAdoption;
exports.countAdoptions = countAdoptions;
exports.updateAdoption = updateAdoption;
exports.updatePosition = updatePosition;
exports.deleteAdoption = deleteAdoption;
exports.updateAdoptionsAssociationName = updateAdoptionsAssociationName;
exports.addAdoption = addAdoption;
