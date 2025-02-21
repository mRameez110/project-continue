const userModel = require("../models/userModel");
const pharmacistModel = require("../models/pharmacistModel");

const { NotFoundError } = require("../utils/errorHandlerClass");

const getAllPharmacistService = async () => {
	const pharmacists = await pharmacistModel.find().populate("user");
	if (pharmacists.length == 0)
		throw new NotFoundError("No pharmacist found", 200);
	return pharmacists;
};

const getPharmacistByIdService = async (req) => {
	const userId = req.params.id;

	const findedPharmacist = await pharmacistModel
		.findOne({
			$or: [{ user: userId }, { _id: userId }],
		})
		.populate("user", ["userName", "email", "role"])
		.populate("pharmacyBranch", "name");

	if (!findedPharmacist) throw new NotFoundError("No pharmacist found", 404);

	console.log("see get pharmacist by id ", findedPharmacist);

	return findedPharmacist;
};

const updatePharmacistService = async (req) => {
	const pharmacistId = req.params.id;

	const updatedPharmacist = await pharmacistModel
		.findOneAndUpdate(
			{ $or: [{ user: pharmacistId }, { _id: pharmacistId }] },
			req.body,
			{
				new: true,
			}
		)
		.populate("user", "userName email role");

	if (!updatedPharmacist) {
		throw new NotFoundError("Pharmacist not found", 404);
	}

	if (updatedPharmacist && (req.body.userName || req.body.email)) {
		const updatedUser = await userModel.findByIdAndUpdate(
			{ _id: updatedPharmacist.user._id },
			{ userName: req.body.userName, email: req.body.email },
			{ new: true }
		);

		if (!updatedUser) {
			throw new NotFoundError("User not found", 404);
		}
	}

	return updatedPharmacist;
};

const deletePharmacistService = async (req) => {
	const { loggedInUserId, loggedInUserRole, targetUserId } = req.accessControl;

	const pharmacistIdToDelete = req.params.id;

	const deletedPharmacist = await pharmacistModel
		.findByIdAndDelete(pharmacistIdToDelete)
		.populate("user", "userName email role");

	console.log("see deleted pharmacist ", deletedPharmacist);

	if (deletedPharmacist) {
		const deletedUser = await userModel.findByIdAndDelete(
			deletedPharmacist.user?._id
		);
		console.log("see user deleted if pharmacist deleted");
		if (!deletedUser) {
			throw new NotFoundError("User not found.", 404);
		}
	}

	return deletedPharmacist;
};

module.exports = {
	getAllPharmacistService,
	getPharmacistByIdService,
	updatePharmacistService,
	deletePharmacistService,
};
