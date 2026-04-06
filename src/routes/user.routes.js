const express = require("express");
const { followUser } = require("../controllers/user.controller");
const { identifyUser } = require("../middlewares/auth.middleware");
const userRouter = express.Router();

userRouter.get("/follow", identifyUser, followUser);



module.exports = userRouter;