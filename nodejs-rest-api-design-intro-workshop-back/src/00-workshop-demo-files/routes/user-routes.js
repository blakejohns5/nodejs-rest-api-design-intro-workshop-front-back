const Router = require("express").Router;

const userController = require("../controllers/user-controller");

const UserRouter = Router();

UserRouter.get("/", userController.getUsers);
UserRouter.get("/:userId", userController.getUserDetails);
UserRouter.post("/", userController.createUser);
UserRouter.patch("/:userId", userController.updateUser);
UserRouter.delete("/:userId", userController.deleteUser);

module.exports = UserRouter;
