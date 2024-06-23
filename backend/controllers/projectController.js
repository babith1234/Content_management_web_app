const projectModel = require("../models/projectModel");
const jwt = require("jsonwebtoken");


const { v2: cloudinary } = require("cloudinary");
const fs = require("fs");


const authenticateMiddleware = (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    console.log(authorizationHeader)

    if (!authorizationHeader) {
      return res
        .status(401)
        .send({ msg: "Authorization header missing", status: false });
    }

    const tokens = authorizationHeader.split(" ");
    const tokenType = tokens[0];
    const accessToken = tokens[1];

    if (tokenType === "Bearer") {
      // Verify the access token
      jwt.verify(accessToken, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
          // If access token is invalid or expired, try using the refresh token
          if (err.name === "TokenExpiredError") {
            return tryRefreshToken(req.cookies.refreshToken, res, next);
          }
          return res
            .status(401)
            .json({ msg: "Invalid access token", status: false });
        }

        // Attach the user data to the request object
        req.user = decoded;
        next();
      });
    } else {
      return res.status(401).send({ msg: "Invalid token type", status: false });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ msg: "Internal server error", status: false });
  }
};

const tryRefreshToken = (refreshToken, res, next) => {
  // Verify the refresh token
  jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ msg: "Invalid refresh token", status: false });
    }

    // Generate a new access token
    const newAccessToken = jwt.sign(
      {
        user_id: decoded.user_id,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "10m" }
    );

    // Attach the new access token to the request object
    req.user = { ...decoded, newAccessToken };
    next();
  });
};

// CREATE A PROJECT CONTROLLER

const createProject = async (req, res) => {
  try {
    let projectData = req.body;

    const userId = req.user.user_id;

    if (Object.keys(projectData).length === 0) {
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

    let saveProject = await projectModel.create({
      ...projectData,
      user: userId,
      project_image: imageUrl,
    });
    return res.status(201).send({
      status: true,
      msg: "project creation success",
      data: saveProject,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ msg: "Internal server error", staus: false });
  }
};

//DISPLAY ALL THE PROJECTS OF LOGGED IN USER

const getProjects = async (req, res) => {
  try {
    
    const userId = req.user.user_id;

    const projectId = req.query.projectId;
    if (projectId) {
      const project = await projectModel.findOne({ _id: projectId });
      return res.status(200).send({
        status: true,
        msg: "Project retrieved successfully",
        data: project,
      });
    }

    if (!userId) {
      try {
        const projects = await projectModel.find();

        return res.status(200).send({
          status: true,
          msg: "All projects retrieved successfully",
          data: projects,
        });
      } catch (error) {
        console.error(error);
        return res
          .status(500)
          .send({ msg: "Internal server error", status: false });
      }
    }

    const userProjects = await projectModel.find({ user: userId });

    return res.status(200).json({
      status: true,
      msg: "User projects retrieved successfully",
      data: userProjects,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ msg: "Internal server error", status: false });
  }
};

//DELETE A PROJECT

const deleteProject = async (req, res) => {
  try {
    const projectId = req.query.id;

    // Fetch the project from the database
    const project = await projectModel.findById(projectId);

    if (!project) {
      return res.status(404).send({ status: false, msg: "Project not found" });
    }

    // Extract the public ID of the image from the URL
    const imageUrl = project.project_image;
    const imagePublicId = imageUrl.split('/').pop().split('.')[0];

    // Delete the image from Cloudinary
    await cloudinary.uploader.destroy(`feedback_images/${imagePublicId}`);

    // Delete the project from the database
    await projectModel.findByIdAndDelete(projectId);

    return res.status(200).send({ status: true, msg: "Project deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ msg: "Internal server error", status: false });
  }
};




// UPDATE A PROJECT
const updateProject = async (req, res) => {
  try {
    const project_id = req.query.id;
    const projectDataToUpdate = req.body;
    const newImageFile = req.file;

    console.log(projectDataToUpdate)

    if (!project_id) {
      return res.status(400).json({
        status: false,
        msg: "No projectId provided",
      });
    }

    // Retrieve the existing project from the database
    const existingProject = await projectModel.findById(project_id);
    if (!existingProject) {
      return res.status(404).json({ status: false, msg: "Project not found" });
    }

    // Check if a new image file has been provided
    if (newImageFile) {
      // Delete the old image from Cloudinary
      const existingImagePublicId = existingProject.project_image.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(`feedback_images/${existingImagePublicId}`);

      // Upload the new image to Cloudinary
      const imageResponse = await cloudinary.uploader.upload(newImageFile.path, {
        folder: "feedback_images",
      });

      // Delete the new image file from the uploads folder
      fs.unlinkSync(newImageFile.path);

      // Update the image URL in the project data
      projectDataToUpdate.project_image = imageResponse.secure_url;
    }

    // Construct an update object, keeping existing fields if not provided
    const updateObject = { ...existingProject.toObject(), ...projectDataToUpdate };

    // Update the project in the database
    const updatedProject = await projectModel.findByIdAndUpdate(
      project_id,
      updateObject,
      { new: true }
    );

    return res.status(200).json({
      status: true,
      msg: "Project updated successfully",
      data: updatedProject,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: false, msg: "Internal server error" });
  }
};


module.exports = {
  createProject,
  authenticateMiddleware,
  getProjects,
  deleteProject,
  updateProject,
};
