const Outcome = require("../../schema/outcomeSchema");
/**
 * GET request to check the id of pets
 * @param req
 * @param res
 * @returns {promise}
 */
async function getPetOutcome(req, res) {
  let findSinglePetOutcome;
  let outcomeDisplayPerPage = 15;
  let limit = req.query.outcomePageNumber * outcomeDisplayPerPage - outcomeDisplayPerPage;
  try {
    if (req.query.pet_id === "" || req.query.pet_id === undefined) {
      if (!(req.query.category === "" || req.query.category === undefined)) {
        findSinglePetOutcome = await Outcome.find({
          user_id: req.query.user_id,
          category: req.query.category,
        }).sort({
          date: "desc",
        });
      } else {
        findSinglePetOutcome = await Outcome.find({
          user_id: req.query.user_id,
        }).sort({
          date: "desc",
        });
      }
    } else {
      if (!(req.query.category === "" || req.query.category === undefined)) {
        findSinglePetOutcome = await Outcome.find({
          user_id: req.query.user_id,
          pet_id: req.query.pet_id,
          category: req.query.category,
        }).sort({
          date: "desc",
        });
      } else {
        findSinglePetOutcome = await Outcome.find({
          user_id: req.query.user_id,
          pet_id: req.query.pet_id,
        }).sort({
          date: "desc",
        });
      }
    }
    if (findSinglePetOutcome[0]) {
      return res.status(200).json({
        text: "Animal outcome are here",
        outcome: findSinglePetOutcome,
      });
    } else {
      return res.status(206).json({
        text: "Animal outcome not found",
      });
    }
  } catch (err) {
    return res.status(400).json({
      text: "Failed",
    });
  }
}
/**
 * GET request to check outcome id's
 * @param req
 * @param res
 * @returns {promise}
 */
async function getOutcomeById(req, res) {
  try {
    const findOutcomeById = await Outcome.findOne({ _id: req.query.outcome_id}).select(
      "title"
    );
    if (findOutcomeById !== null || findOutcomeById !== "") {
      return res.status(200).json({
        text: "One outcome is here",
        outcome: findOutcomeById,
      });
    } else {
      return res.status(201).json({
        text: "Not even one ",
      });
    }
  } catch (err) {
    return res.status(202).json({
      text: "Failed",
    });
  }
}

exports.getOutcomeById = getOutcomeById;
exports.getPetOutcome = getPetOutcome;
