const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v2: cloudinary } = require("cloudinary");
const fs = require("fs");

//                         CREATE USER CONTROLLER
// Controller function to create a new user and insert data into the user_collection
const createUser = async (req, res) => {
  try {
    // Generate a salt for password hashing
    const salt = await bcrypt.genSalt(10);
    // console.log(req.body.password)
    const { password } = req.body;

    // Hash the password using the generated salt
    const hashedPassword = await bcrypt.hash(password, salt);

    // Extract user data from the request body
    const data = req.body;

    // Check if any data is provided in the request
    if (Object.keys(data).length === 0) {
      return res.status(400).send({ status: false, msg: "no data provided" });
    }

    //get the image object
    const imageFile = req.file;

    if (!imageFile) {
      return res.status(401).json({
        success: false,
        message: "No image provided",
      });
    }

    //upload the image from the uploads floder to the cloudinary in to the folder feedback_images
    const imageResponse = await cloudinary.uploader.upload(imageFile.path, {
      folder: "feedback_images",
    });

    // Delete the file from the uploads folder
    fs.unlinkSync(imageFile.path);

    //get the image url from cloudinary in the response
    const imageUrl = imageResponse.secure_url;

    const email_id = data.email_id;

    // Check if the email id already exists
    const existingUser = await userModel.findOne({ email_id });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        msg: "User already exists, please register with another email id",
      });
    }

    // Create a new user with the hashed password and profile_pic
    const newUser = await userModel.create({
      ...data,
      password: hashedPassword,
      profile_pic: imageUrl,
    });

    // Return a success response if data insertion is successful
    return res.status(201).json({
      status: true,
      msg: "User registered successfully",
      data: newUser,
    });
  } catch (err) {
    // Handle any errors that occur during the process
    console.error(err);

    // Return an error response
    return res
      .status(500)
      .json({ msg: "Internal server error", status: false });
  }
};


//                   LOGIN USER CONTROLLER
const loginUser = async (req, res) => {
  try {
    // Extract email and password from the request body
    const { email_id, password } = req.body;
    console.log(req.body);

    // Attempt to find a user in the database based on the provided email
    const userData = await userModel.findOne({ email_id });

    // If no user is found, return a 400 status response with an error message
    if (!userData) {
      return res
        .status(400)
        .json({ msg: "Try logging with correct credentials", status: false });
    }

    // Compare the provided password with the hashed password stored in the database
    const isPasswordValid = await bcrypt.compare(password, userData.password);

    // If passwords don't match, return a 400 status response with an error message
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ msg: "Try logging with correct credentials", status: false });
    }

    // If email and password are valid, create a JWT access token and a refresh token
    const accessTokenPayload = {
      user_id: userData.id,
      role: userData.role,
      exp: Math.floor(Date.now() / 1000) + 3600, // Set expiration time to 1 hour from now
      // exp: Math.floor(Date.now() / 1000) + 86400 * 30,
    };

    const refreshTokenPayload = {
      user_id: userData.id,
      exp: Math.floor(Date.now() / 1000) + 86400 * 30, // Set expiration time to 30 days from now
    };

    const accessToken = jwt.sign(
      accessTokenPayload,
      process.env.JWT_SECRET_KEY
    );
    
    const refreshToken = jwt.sign(
      refreshTokenPayload,
      process.env.JWT_REFRESH_KEY
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 86400 * 30 * 1000,
    });

    // Return a JSON response with success status and the JWT tokens
    return res.json({
      success: true,
      authToken: accessToken,
      refToken: refreshToken,
    });
  } catch (error) {
    // Handle any unexpected errors
    console.error("Error during login:", error);
    return res
      .status(500)
      .json({ msg: "Internal Server Error", status: false });
  }
};

const getUser = async (req, res) => {
  try {
    const userId = req.user.user_id;
    console.log(userId);

    const userData = await userModel.findOne({ _id: userId });

    if (!userData) {
      return res.status(404).json({
        status: false,
        msg: "User not found",
      });
    }

    return res.status(200).json({
      status: true,
      msg: "User data retrieved successfully",
      data: userData,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ msg: "Internal server error", status: false });
  }
};

const getAllusers = async (req, res) => {
  try {
    const allUsers = await userModel.find();
    return res.status(200).json({
      status: true,
      msg: " all User data retrieved successfully",
      data: allUsers,
    });
  } catch (e) {
    return res.status(404).json({
      status: flse,
      msg: " error retrieving users",
    });
  }
};

//                      UPDATE USER CONTROLLER
const updateUser = async (req, res) => {
  try {
    // Extract user ID from the request parameters or body
    const userId = req.query.id;
    const userData = req.body;
    const newImageFile = req.file;

    // Check if user ID is provided
    if (!userId) {
      return res
        .status(400)
        .send({ status: false, msg: "User ID is required" });
    }

    // Extract the fields to be updated from the request body
    const updatedFields = {
      ...userData,
    };

    if (newImageFile) {
      // Retrieve the existing image key from the database
      const existingUser = await userModel.findById(userId);
      const existingImageKey = existingUser.profile_pic;

      // Delete the old image from S3
      await s3
        .deleteObject({
          Bucket: process.env.WASABI_BUCKET,
          Key: existingImageKey,
        })
        .promise();

      // Generate a pre-signed URL for the new image
      const newImageURL = generatePublicPresignedUrl(newImageFile.key);

      // Update the user data to include the new image URL
      userData.profile_pic = newImageURL;
    }

  

    // Construct an update object with only provided fields
    const updateObject = {};
    for (const key in userData) {
      if (userData[key] !== undefined) {
        updateObject[key] = userData[key];
      }
    }

  

    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      updateObject,
      { new: true }
    );

    // Check if the user was found and updated
    if (!updatedUser) {
      return res.status(404).send({ status: false, msg: "User not found" });
    }

    // Return a success response with the updated user data
    return res.status(200).send({
      status: true,
      msg: "User updated successfully",
      data: updatedUser,
    });
  } catch (err) {
    // Handle any errors that occur during the process
    console.error(err);

    // Return an error response
    return res.status(500).send({ status: false, msg: "Error updating user" });
  }
};

//              LOGOUT USER

const blacklistedTokens = [];

const logoutController = (req, res) => {
  try {
    // Clear the JWT cookies on the client-side
    // res.clearCookie("authToken");
    res.clearCookie("refreshToken");

    // Retrieve the access token and refresh token from the request
    // const accessToken = req.cookies.authToken;
    const refreshToken = req.cookies.refreshToken;

    // Add the tokens to the server-side blacklist (for illustration purposes)
    // blacklistedTokens.push(accessToken);
    blacklistedTokens.push(refreshToken);

    return res.status(200).json({ status: true, msg: "Logout successful" });
  } catch (error) {
    console.error("Error during logout:", error);
    return res
      .status(500)
      .json({ msg: "Internal Server Error", status: false });
  }
};

// Export the functions for use in other modules
module.exports = {
  createUser,
  loginUser,
  updateUser,
  logoutController,
  blacklistedTokens,
  getUser,
  getAllusers,
};
