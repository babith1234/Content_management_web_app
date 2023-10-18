const testimonialModel = require("../models/testimonialModel");

// CREATE A TESTIMONIAL CONTROLLER
const createTestimonial = async (req, res) => {
  try {
    const { client_image, client_name, client_company, client_description,created_on } =
      req.body;

    // Validate required fields
    if (
      !client_image ||
      !client_name ||
      !client_company ||
      !client_description ||
      !created_on
    ) {
      return res.status(400).json({
        status: false,
        msg: "All fields are required",
      });
    }

    // Assuming req.user contains user information from authentication middleware
    // const userId = req.user.user_id;

    // Create a new testimonial document and save it to the testimonials collection
    const newTestimonial = await testimonialModel.create({
      client_image,
      client_name,
      client_company,
      client_description,
      created_on
    });

    return res.status(201).json({
      status: true,
      msg: "Testimonial created successfully",
      data: newTestimonial,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: false, msg: "Internal server error" });
  }
};

// GET ALL TESTIMONIALS
const getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await testimonialModel.find();

    return res.status(200).json({
      status: true,
      msg: "Testimonials retrieved successfully",
      data: testimonials,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: false, msg: "Internal server error" });
  }
};

// delete testimonials

const deleteTestimonial = async (req, res) => {
  try {
    const testimonialId = req.query.id;

    // Check if the project exists and is associated with the user
    const testimonialToDelete = await testimonialModel.findOne({
      _id: testimonialId,
    });

    if (!testimonialToDelete) {
      return res
        .status(404)
        .json({ status: false, msg: "testimonial not found for the user" });
    }

    await testimonialModel.findByIdAndDelete(testimonialId);

    return res.status(200).json({
      status: true,
      msg: "Testimonial deleted successfully",
      deleted_testimonial: testimonialToDelete,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ msg: "Internal server error", status: false });
  }
};

// UPDATE A PROJECT
const updateTestimonial = async (req, res) => {
  try {
    const testimonial_id = req.query.id;
    const testimonialDataToUpdate = req.body;

    if (!testimonial_id) {
      return res.status(400).json({
        status: false,
        msg: "No userId or testimonailId provided",
      });
    }

    // Construct an update object with only provided fields
    const updateObject = {};
    for (const key in testimonialDataToUpdate) {
      if (testimonialDataToUpdate[key] !== undefined) {
        updateObject[key] = testimonialDataToUpdate[key];
      }
    }

    // Assuming projectModel has an update method
    const updatedTestimonial = await testimonialModel.findByIdAndUpdate(
      testimonial_id,
      updateObject,
      { new: true }
    );

    if (!updatedTestimonial) {
      return res.status(404).json({ status: false, msg: "Testimonial not found" });
    }

    return res.status(200).json({
      status: true,
      msg: "Testimonial updated successfully",
      data: updatedTestimonial,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: false, msg: "Internal server error" });
  }
};



module.exports = { createTestimonial, getAllTestimonials, deleteTestimonial,updateTestimonial };
