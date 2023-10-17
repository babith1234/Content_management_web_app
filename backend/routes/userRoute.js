const express=require('express')
const userController = require("../controllers/userController")
const projectController = require("../controllers/projectController")
const {authenticateMiddleware} = require("../controllers/projectController")
const router=express.Router()

router.post("/register",userController.createUser)
router.put("/users/:id",userController.updateUser)
router.post("/login",userController.loginUser)

router.post("/projects", authenticateMiddleware, projectController.createProject);
router.get("/projects/:id",projectController.getProjects)
router.delete("/projects/:user_id/:project_id",projectController.deleteProject)
router.put("/projects/:user_id/:project_id",projectController.updateProject)





module.exports=router




