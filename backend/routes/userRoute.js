const express=require('express')
const userController = require("../controllers/userController")
const projectController = require("../controllers/projectController")
const {authenticateMiddleware} = require("../controllers/projectController")
const contactController = require("../controllers/conactController")
const feedController = require("../controllers/feedController")
const servicesController = require("../controllers/servicesController")
const testimonialController = require("../controllers/testimonialController")
const {upload} = require("../middleware/multer")
const router=express.Router()

// REGISTRATION, LOGIN, LOGOUT ROUTE
router.post("/register",upload.single('profile_pic'),userController.createUser)
router.put("/users/:id",userController.updateUser)
router.post("/login",userController.loginUser)
router.post("/logout",userController.logoutController)


// PROJECT CREATION, DISPLAY, DELETE, UPDATE ROUTE
router.post("/projects", authenticateMiddleware,upload.single('project_image'), projectController.createProject);
router.get("/projects",projectController.getProjects)
router.get("/projects/all",projectController.getAllProjects)
router.delete("/projects",projectController.deleteProject)
router.put("/projects",upload.single('project_image'),projectController.updateProject)

// CONTACT FORM 
router.post("/contacts",contactController.submitContactForm)
router.get("/contacts",contactController.displayForm) 

// FEEDS CREATION, DISPLAY, DELETE, UPDATE ROUTE
router.post("/feeds",authenticateMiddleware,upload.single('image'),feedController.createFeeds)
router.get("/feeds",feedController.getFeeds)
router.delete("/feeds",feedController.deleteFeed)
router.put("/feeds",feedController.updateFeed)
router.get("/feeds/all",feedController.displayFeed)



// SERVICES CREATION, DISPLAY, DELETE, UPDATE ROUTE
router.post('/services', authenticateMiddleware,upload.single('service_image'), servicesController.createService);
router.get('/services', servicesController.getServices);
router.delete('/services', servicesController.deleteService);
router.put('/services', servicesController.updateService)
router.get("/services/all",servicesController.deleteService)


// TESTIMONIALS CREATION, DISPLAY, DELETE, UPDATE ROUTE
router.post('/testimonial',upload.single('client_image'),testimonialController.createTestimonial );
router.get('/testimonial', testimonialController.getAllTestimonials);
router.delete('/testimonial', testimonialController.deleteTestimonial);
router.put('/testimonial', testimonialController.updateTestimonial)


module.exports=router


