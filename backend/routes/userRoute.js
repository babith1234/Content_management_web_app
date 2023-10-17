const express=require('express')
const userController = require("../controllers/userController")
const projectController = require("../controllers/projectController")
const {authenticateMiddleware} = require("../controllers/projectController")
const router=express.Router()

router.post("/register",userController.createUser)
router.put("/users/:id",userController.updateUser)
router.post("/login",userController.loginUser)

router.post("/projects", authenticateMiddleware, projectController.createProject);
router.get("/projects",projectController.getProjects)
router.get("/projects/all",projectController.getAllProjects)
router.delete("/projects",projectController.deleteProject)
router.put("/projects",projectController.updateProject)



module.exports=router




