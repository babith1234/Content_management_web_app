const express=require('express')
const userController = require("../controllers/userController")
const projectController = require("../controllers/projectController")
const {authenticateMiddleware} = require("../controllers/projectController")
const contactController = require("../controllers/conactController")
const feedController = require("../controllers/feedController")
const servicesController = require("../controllers/servicesController")
const router=express.Router()

// REGISTRATION, LOGIN, LOGOUT ROUTE
router.post("/register",userController.createUser)
router.put("/users/:id",userController.updateUser)
router.post("/login",userController.loginUser)
router.post("/logout",userController.logoutController)


// PROJECT CREATION, DISPLAY, DELETE, UPDATE ROUTE
router.post("/projects", authenticateMiddleware, projectController.createProject);
router.get("/projects",projectController.getProjects)
router.get("/projects/all",projectController.getAllProjects)
router.delete("/projects",projectController.deleteProject)
router.put("/projects",projectController.updateProject)

// CONTACT FORM 
router.post("/contacts",contactController.submitContactForm)  // 

// FEEDS CREATION, DISPLAY, DELETE, UPDATE ROUTE
router.post("/feeds",authenticateMiddleware,feedController.createFeeds)
router.get("/feeds",feedController.getFeeds)
router.delete("/feeds",feedController.deleteFeed)
router.put("/feeds",feedController.updateFeed)

// FEEDS CREATION, DISPLAY, DELETE, UPDATE ROUTE

router.post('/services', authenticateMiddleware, servicesController.createService);
router.get('/services', servicesController.getServices);
router.delete('/services', servicesController.deleteService);
router.put('/services', servicesController.updateService)


module.exports=router


