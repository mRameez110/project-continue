const prescriptionModel = require("../models/prescriptionModel");
const MedicineOrderModel = require("../models/medicineOrderModel");
const { NotFoundError } = require("../utils/errorHandlerClass");
const patientModel = require("../models/patientModel");
const pharmacistModel = require("../models/pharmacistModel");
const { findOne } = require("../models/userModel");

const getAllMedicineOrders = async (req, res, next) => {
  try {
    const { loggedInUserRole, loggedInUserId } = req.accessControl;
    console.log("check get all medicine order api request");

    let queryFilter = {};

    if (loggedInUserRole === "admin") {
      console.log("Admin: Fetching all orders");
    } else if (loggedInUserRole === "pharmacist") {
      console.log("Pharmacist: Fetching orders handled by pharmacist");
      const pharmacist = await pharmacistModel.findOne({
        user: loggedInUserId,
      });

      if (!pharmacist) {
        throw new NotFoundError("Pharmacist not found", 404);
      }

      queryFilter.pharmacist = pharmacist._id;
    } else if (loggedInUserRole === "patient") {
      console.log("Patient: Fetching orders made by patient");
      const patient = await patientModel.findOne({ user: loggedInUserId });
      if (!patient) {
        throw new NotFoundError("Patient not found", 404);
      }
      queryFilter.patient = patient._id;
    } else {
      throw new NotFoundError("Invalid role or permissions", 403);
    }

    console.log("see query filter ", queryFilter);

    const allOrders = await MedicineOrderModel.find(queryFilter).populate(
      "prescription patient pharmacist"
    );

    console.log("see fetched all orders ", allOrders[0]);

    if (allOrders.length === 0) {
      throw new NotFoundError("No orders found for the given user", 404);
    }

    res.status(200).json({
      message: "Orders fetched successfully",
      orders: allOrders,
    });
  } catch (error) {
    next(error);
  }
};

const createMedicineOrder = async (req, res, next) => {
  try {
    console.log("check create medicine order api hit 2 ", req.body);

    const { prescriptionId, patientId, createdById } = req.body;
    const prescription = await prescriptionModel.findById(prescriptionId);
    console.log(
      "check create medicine order api hit 2  and see ids",
      prescriptionId,
      patientId,
      createdById
    );

    const pharmacistId = await pharmacistModel.findOne({ user: createdById });

    if (!prescription) {
      throw new NotFoundError("Prescription not found");
    }

    const newOrder = new MedicineOrderModel({
      prescription: prescription._id,
      patient: patientId,
      pharmacist: pharmacistId,
      orderStatus: "pending",
    });

    await newOrder.save();

    console.log("Medicine order created", newOrder);
    res.status(200).json({
      message: "order created successfully",
      order: newOrder,
    });
  } catch (error) {
    console.error("Error creating medicine order:", error);
    next(error);
  }
};

const getMedicineOrderById = async (req, res, next) => {
  try {
    console.log("check get medicine order by id api request", req.params);
    const { id } = req.params; // ID comes from the URL parameter
    const loggedUserId = req.user.userId; // Assuming the logged user ID is available in req.user (this might come from authentication)

    const order = await MedicineOrderModel.findOne({
      $or: [
        { _id: id },
        { prescription: id },
        { patient: id },
        { pharmacist: id },
        { patient: loggedUserId },
        { pharmacist: loggedUserId },
      ],
    }).populate("prescription patient pharmacist");

    if (!order) {
      throw new NotFoundError("Medicine order not found");
    }

    res.status(200).json({
      message: "Medicine order fetched successfully",
      order,
    });
  } catch (error) {
    console.error("Error fetching medicine order:", error);
    next(error);
  }
};

//  ---> Update Medicine Order

const updateMedicineOrder = async (req, res, next) => {
  try {
    const { id } = req.params; // ID from the URL parameter
    const { status } = req.body; // New status coming from the request body

    console.log(
      "check update medicine order api request with id and body ",
      id,
      req.body
    );

    // Validate the status if necessary (e.g., only allow certain statuses)
    const allowedStatuses = ["pending", "approved", "shipped", "delivered"];
    if (!allowedStatuses.includes(status)) {
      throw new Error("Invalid status");
    }

    // Fetch the order by ID
    const order = await MedicineOrderModel.findById(id).populate(
      "prescription patient pharmacist"
    );
    if (!order) {
      throw new NotFoundError("Order not found");
    }

    order.orderStatus = status;

    console.log(first);

    // Save the updated order
    await order.save();
    console.log("see new status ", order.status);

    // Return the updated order data in the response
    res.status(200).json({
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    console.error("Error updating order status:", error);
    next(error);
  }
};

const deleteMedicineOrder = async (req, res, next) => {
  try {
    console.log("check get medicine order delete api request", req.params);
    const { id } = req.params;
    const loggedUserId = req.user.userId;

    const orderToDelete = await MedicineOrderModel.findOne({
      $or: [
        { _id: id },
        { prescription: id },
        { patient: id },
        { pharmacist: id },
        { patient: loggedUserId },
        { pharmacist: loggedUserId },
      ],
    }).populate("prescription patient pharmacist");

    if (!orderToDelete) {
      throw new NotFoundError("Medicine order not found");
    }

    await MedicineOrderModel.deleteOne({
      $or: [
        { _id: id },
        { prescription: id },
        { patient: id },
        { pharmacist: id },
        { patient: loggedUserId },
        { pharmacist: loggedUserId },
      ],
    });

    res.status(200).json({
      message: "Order cancelled successfully",
      order: orderToDelete,
    });
  } catch (error) {
    console.error("Error fetching medicine order:", error);
    next(error);
  }
};
module.exports = {
  getAllMedicineOrders,
  createMedicineOrder,
  getMedicineOrderById,
  updateMedicineOrder,
  deleteMedicineOrder,
};
