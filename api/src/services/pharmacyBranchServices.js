const pharmacistModel = require("../models/pharmacistModel");
const pharmacyBranchModel = require("../models/pharmacyBranchModel");
const PharmacyBranchModel = require("../models/pharmacyBranchModel");
const {
	NotFoundError,
	UserAlreadyExistError,
} = require("../utils/errorHandlerClass");

const createPharmacyBranchService = async (req) => {
	const { name, address, contact, pharmacists } = req.body;

	const existingBranch = await pharmacyBranchModel.findOne({ name });
	if (existingBranch) {
		throw new UserAlreadyExistError(
			"A pharmacy branch with this name already exists."
		);
	}

	const pharmacyBranch = new PharmacyBranchModel({
		name,
		address,
		contact,
		pharmacists,
	});

	await pharmacyBranch.save();

	await pharmacistModel.updateMany(
		{ _id: { $in: pharmacists } },
		{ $set: { pharmacyBranch: pharmacyBranch._id } }
	);

	const newPharmacyBranch = await PharmacyBranchModel.findById(
		pharmacyBranch._id
	).populate("pharmacists", "fullName age contact");

	return newPharmacyBranch;
};

const getPharmacyBranchesService = async (req) => {
	let count = 0;
	console.log("check all branches api request hit ");
	if (req.user.role === "admin") {
		return await PharmacyBranchModel.find().populate({
			path: "pharmacists",
			select: "fullName age contact user",
		});
	} else if (req.user.role === "pharmacist") {
		return await PharmacyBranchModel.findOne({
			pharmacists: req.user._id,
		}).populate({
			path: "pharmacists",
			select: "fullName age contact user",
		});
	} else {
		throw new Error("Unauthorized access");
	}
};

const getPharmacyBranchByIdService = async (req) => {
	const { id } = req.params;
	const loggedInUser = req.user;

	console.log("Logged-in user details:", loggedInUser);
	console.log("parameter id:", id);

	let pharmacyBranch;

	if (loggedInUser.role === "admin") {
		console.log("Admin is requesting branch details.");

		pharmacyBranch = await PharmacyBranchModel.findById(id)
			.populate({
				path: "pharmacists",
				select: "fullName age contact",
				populate: {
					path: "user",
					select: "userName email",
				},
			})
			.select("name address contact createdAt");

		console.log("check pharmacy branch detail if role admin", pharmacyBranch);
		return pharmacyBranch;
	} else if (loggedInUser.role === "pharmacist") {
		console.log("Pharmacist is requesting branch details.");

		const pharmacist = await pharmacistModel
			.findOne({
				user: loggedInUser.userId,
			})
			.populate("pharmacyBranch");

		if (!pharmacist) {
			throw new NotFoundError("Pharmacist not found", 404);
		}

		const assignedBranch = pharmacist.pharmacyBranch;

		if (!assignedBranch) {
			throw new NotFoundError("No branch assigned to this pharmacist", 404);
		}

		console.log("Assigned Branch:", assignedBranch);
		console.log("Requested Branch ID:", id);

		return PharmacyBranchModel.findById(assignedBranch._id).select(
			"-pharmacists"
		);
	}
};

// const updatePharmacyBranchService = async (req) => {
// 	console.log(
// 		"check update pharmacy branch api hit and body data  in services",
// 		req.body
// 	);
// 	const { id } = req.params;
// 	const { name, address, contact, pharmacists } = req.body;

// 	const updateData = { name, address, contact };
// 	if (pharmacists) {
// 		updateData.pharmacists = pharmacists;
// 	}

// 	const updatedBranch = await PharmacyBranchModel.findByIdAndUpdate(
// 		id,
// 		updateData,
// 		{ new: true }
// 	).populate("pharmacists", "fullName age contact user");

// 	if (!updatedBranch) {
// 		throw new NotFoundError("Pharmacy Branch not found", 404);
// 	}

// 	return updatedBranch;
// };

const updatePharmacyBranchService = async (req) => {
	console.log(
		"check update pharmacy branch api hit and body data in services",
		req.body
	);
	const { id } = req.params;
	const { name, address, contact, pharmacists } = req.body;

	// Update ke liye data prepare karo (pharmacists ko alag handle karenge)
	const updateData = { name, address, contact };

	// Pehle existing branch find karo
	const existingBranch = await PharmacyBranchModel.findById(id);
	if (!existingBranch) {
		throw new NotFoundError("Pharmacy Branch not found", 404);
	}

	// Agar naye pharmacists aaye hain to unko existing list me add karo
	if (pharmacists && pharmacists.length > 0) {
		// Duplicates remove karne ke liye unique IDs ka set bana rahe hain
		const existingPharmacistIds = existingBranch.pharmacists.map((id) =>
			id.toString()
		);
		const newPharmacists = pharmacists.filter(
			(id) => !existingPharmacistIds.includes(id.toString())
		);

		// Sirf naye pharmacists add kar rahe hain
		updateData.pharmacists = [...existingBranch.pharmacists, ...newPharmacists];
	}

	// Database me update karo
	const updatedBranch = await PharmacyBranchModel.findByIdAndUpdate(
		id,
		updateData,
		{ new: true }
	).populate("pharmacists", "fullName age contact user");

	await pharmacistModel.updateMany(
		{ _id: { $in: pharmacists } },
		{ $set: { pharmacyBranch: updatedBranch._id } }
	);

	return updatedBranch;
};

const deletePharmacyBranchService = async (req) => {
	const { id } = req.params;

	const deletedPharmacyBranch = await pharmacyBranchModel.findByIdAndDelete(id);

	if (!deletedPharmacyBranch) {
		throw new NotFoundError("Pharmacy Branch not found", 404);
	}

	await pharmacistModel.updateMany(
		{ pharmacyBranch: id },
		{ $set: { pharmacyBranch: null } }
	);

	await pharmacyBranchModel.updateOne(
		{ _id: id },
		{ $pull: { pharmacists: { $in: deletedPharmacyBranch.pharmacists } } }
	);

	return deletedPharmacyBranch;
};

module.exports = {
	createPharmacyBranchService,
	getPharmacyBranchesService,
	getPharmacyBranchByIdService,
	updatePharmacyBranchService,
	deletePharmacyBranchService,
};
