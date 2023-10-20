const servicesModel = require("../models/servicesModel");
const multerConfig = require("../middleware/multer");
const { generatePublicPresignedUrl } = require("../middleware/multer");

// CREATE A SERVICE CONTROLLER
const createService = async (req, res) => {
  try {
    const serviceData = req.body;
    const userId = req.user.user_id;

    if (Object.keys(serviceData).length === 0) {
      return res.status(400).send({ status: false, msg: "No data provided" });
    }

    // Check if the image has been successfully uploaded
    if (!req.file) {
      return res
        .status(400)
        .send({ status: false, msg: "No project image provided" });
    }

    // Generate a pre-signed URL for public access with a 12-hour expiration
    const preSignedUrl = generatePublicPresignedUrl(req.file.key);

    const saveService = await servicesModel.create({
      ...serviceData,
      user: userId,
      service_image: preSignedUrl,
    });

    return res.status(201).send({
      status: true,
      msg: "Service creation success",
      data: saveService,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ msg: "Internal server error", status: false });
  }
};

// DISPLAY LOGGED IN USER'S SERVICES
const getServices = async (req, res) => {
  try {
    const userId = req.query.user; // Assuming you have user data in the request

    const userServices = await servicesModel.find({ user: userId });

    return res.status(200).json({
      status: true,
      msg: "User services retrieved successfully",
      data: userServices,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ msg: "Internal server error", status: false });
  }
};

// DELETE A SERVICE
const deleteService = async (req, res) => {
  try {
    const serviceId = req.query.id;

    // Check if the service exists and is associated with the user
    const serviceToDelete = await servicesModel.findOne({
      _id: serviceId,
    });

    if (!serviceToDelete) {
      return res
        .status(404)
        .json({ status: false, msg: "Service not found for the user" });
    }

    // Get the image key associated with the project
    const imageKey = serviceToDelete.service_image;

    await servicesModel.findByIdAndDelete(serviceId);

    // Delete the image from the S3 bucket
    await deleteImageFromS3(imageKey);

    return res.status(200).json({
      status: true,
      msg: "Service deleted successfully",
      deleted_service: serviceToDelete,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ msg: "Internal server error", status: false });
  }
};
// Function to delete an image from the S3 bucket
const deleteImageFromS3 = (imageKey) => {
  const params = {
    Bucket: process.env.WASABI_BUCKET,
    Key: imageKey,
  };

  return new Promise((resolve, reject) => {
    s3.deleteObject(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};


// UPDATE A SERVICE
const updateService = async (req, res) => {
  try {
    const service_id = req.query.id;
    const serviceDataToUpdate = req.body;

    if (!service_id) {
      return res.status(400).json({
        status: false,
        msg: "No userId or serviceId provided",
      });
    }

    // Construct an update object with only provided fields
    const updateObject = {};
    for (const key in serviceDataToUpdate) {
      if (serviceDataToUpdate[key] !== undefined) {
        updateObject[key] = serviceDataToUpdate[key];
      }
    }

    const updatedService = await servicesModel.findByIdAndUpdate(
      service_id,
      updateObject,
      { new: true }
    );

    if (!updatedService) {
      return res.status(404).json({ status: false, msg: "Service not found" });
    }

    return res.status(200).json({
      status: true,
      msg: "Service updated successfully",
      data: updatedService,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: false, msg: "Internal server error" });
  }
};

//DISPLAY ALL THE SERVICES IN THE SERVICES MODEL

const displayServices = async (req, res) => {
  try {
    const serviceData = await servicesModel.find();

    if (!serviceData) {
      return res.status(400).json({
        status: false,
        msg: "No services found",
        data: serviceData,
      });
    }
    return res.status(200).json({
      status: true,
      msg: "Services retrieved successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      msg: "Internal serever error",
    });
  }
};

module.exports = {
  createService,
  getServices,
  deleteService,
  updateService,
};
