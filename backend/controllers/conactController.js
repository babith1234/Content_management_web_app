const contactModel = require("../models/contactModel");

// Controller function to handle contact form submissions
const submitContactForm = async (req, res) => {
  try {
    // Extract contact form data from the request body
    const { name, email, phone_number, message } = req.body;

    // Check if any data is provided in the request
    if (!name || !email || !phone_number || !message) {
      return res
        .status(400)
        .send({ status: false, msg: "Incomplete form data" });
    }

    // Create a new contact document and save it to the contact_collection
    const newContact = await contactModel.create({
      name,
      email,
      phone_number,
      message,
    });

    // Return a success response if data insertion is successful
    return res
      .status(201)
      .send({
        status: true,
        msg: "Contact form submitted successfully",
        data: newContact,
      });
  } catch (err) {
    // Handle any errors that occur during the process
    console.error(err);

    // Return an error response
    return res
      .status(500)
      .send({ status: false, msg: "Internal server error" });
  }
};

// Export the function for use in other modules
module.exports = {
  submitContactForm,
};
