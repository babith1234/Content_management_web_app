const projectModel = require("../models/projectModel");
const jwt = require("jsonwebtoken");
const jwtSecret = "MynameIsBabithPoojary";

// authenticateMiddleware.js

const authenticateMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    console.log(token);
    const Tokens = token.split(" ");
    const actualToken = Tokens[1];

    const decodedToken = jwt.verify(actualToken, jwtSecret);
    console.log(decodedToken);

    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).send({ msg: "Invalid token", status: false });
  }
};

// CREATE A PROJECT CONTROLLER

const createProject = async (req, res) => {
  try {
    let projectData = req.body;

    const userId = req.user.user_id;
    console.log(userId);

    if (Object.keys(projectData).length === 0) {
      return res.status(400).send({ status: false, msg: "no data provided" });
    }

    if (Object.keys(projectData).length < 5) {
      return res
        .status(400)
        .send({ status: false, msg: "insufficient data provided" });
    }

    let saveProject = await projectModel.create({
      ...projectData,
      user: userId,
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
    // const userId = req.params.user;
    const userId = req.query.user;

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
    
    // const projectId = req.params.project_id;
    const projectId = req.query.id;

    // Check if the project exists and is associated with the user
    const projectToDelete = await projectModel.findOne({
      _id: projectId,
      
    });

    if (!projectToDelete) {
      return res
        .status(404)
        .json({ status: false, msg: "Project not found for the user" });
    }

    // Deleting the project
    await projectModel.findByIdAndDelete(projectId);

    return res.status(200).json({
      status: true,
      msg: "Project deleted successfully",
      deleted_project: projectToDelete,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ msg: "Internal server error", status: false });
  }
};

// UPDATE A PROJECT
const updateProject = async (req, res) => {
  try {
    const project_id = req.query.id;
    const projectDataToUpdate = req.body;

    if(!(project_id)){
      return res.status(400).json({
        status:false,
        msg:"No userId or projectId provided"
      })
    }

    // Construct an update object with only provided fields
    const updateObject = {};
    for (const key in projectDataToUpdate) {
      if (projectDataToUpdate[key] !== undefined) {
        updateObject[key] = projectDataToUpdate[key];
      }
    }

    // Assuming projectModel has an update method
    const updatedProject = await projectModel.findByIdAndUpdate(
      project_id,
      updateObject,
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ status: false, msg: "Project not found" });
    }

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



const getAllProjects = async (req, res) => {
  try {
   
    const projects = await projectModel.find();

    return res.status(200).send({
      status: true,
      msg: 'All projects retrieved successfully',
      data: projects,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ msg: 'Internal server error', status: false });
  }
};


module.exports = {createProject, authenticateMiddleware, getProjects, deleteProject, updateProject, getAllProjects,};
