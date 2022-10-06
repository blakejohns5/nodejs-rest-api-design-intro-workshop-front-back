const Router = require("express").Router;

// add auth middleware, then use to protect endpoints
const { authMiddleware } = require('../middleware/auth-middleware')

const userController = require("../controllers/user-controller");

// const { User } = require("../models");

const UserRouter = Router();


// Can add auth middleware to all endpoints instead of each one
UserRouter.use('/users', authMiddleware)

UserRouter.get("/users", userController.getUsers);
UserRouter.get("/users/:userId", userController.getUserDetails);
UserRouter.post("/users", userController.createUser);
UserRouter.patch("/users/:userId", userController.updateUser);
UserRouter.delete("/users/:userId", userController.deleteUser);

UserRouter.post('/sign-up', authMiddleware, userController.signUp);

module.exports = UserRouter;
