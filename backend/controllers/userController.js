const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = "MynameIsBabithPoojary";

// Controller function to create a new user and insert data into the user_collection
const createUser = async (req, res) => {
  // Generate a salt for password hashing
  const salt = await bcrypt.genSalt(10);

  // Hash the password using the generated salt
  let setPassword = await bcrypt.hash(req.body.password, salt);

  try {
    // Extract user data from the request body
    let data = req.body;

    // Check if any data is provided in the request
    if (Object.keys(data).length === 0) {
      return res.status(400).send({ status: false, msg: "no data provided" });
    }

    // Create a new user document and save it to the user_collection
    let saveData = await userModel.create({
      name: req.body.name,
      phone_number: req.body.phone_number,
      gender: req.body.gender,
      email_id: req.body.email_id,
      password: setPassword,
      profile_pic: req.body.profile_pic,
    });

    // Return a success response if data insertion is successful
    return res.status(201).send({ status: true, msg: "data insert success" });
  } catch (err) {
    // Handle any errors that occur during the process
    console.error(err);

    // Return an error response
    return res.status(500).send({ msg: "error" });
  }
};



const loginUser = async (req, res) => {
  try {
    // Extract email and password from the request body
    const { email_id, password } = req.body;

    // Attempt to find a user in the database based on the provided email
    const userData = await userModel.findOne({ email_id });

    // If no user is found, return a 400 status response with an error message
    if (!userData) {
      return res
        .status(400)
        .json({ errors: "Try logging with correct credentials" });
    }

    // Compare the provided password with the hashed password stored in the database
    const isPasswordValid = await bcrypt.compare(password, userData.password);

    // If passwords don't match, return a 400 status response with an error message
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ errors: "Try logging with correct credentials" });
    }

    // If email and password are valid, create a JWT token
    const data = { user: userData.id }; // Payload of the JWT (user ID)
    const authToken = jwt.sign(data, jwtSecret); // Sign the JWT with a secret key

    // Return a JSON response with success status and the JWT token
    return res.json({ success: true, authToken: authToken });
  } catch (error) {
    // Handle any unexpected errors
    console.error("Error during login:", error);
    return res.status(500).json({ errors: "Internal Server Error" });
  }
};

module.exports = {
  createUser,
  loginUser,
};
