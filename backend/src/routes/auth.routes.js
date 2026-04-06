const express = require("express");
const {
  registerController,
  loginController,
  getMeController,
} = require("../controllers/auth.controller");
const { identifyUser } = require("../middlewares/auth.middleware");
const authRouter = express.Router();


authRouter.post("/register", registerController);

authRouter.post("/login", loginController);

/**
 * @route GET /api/auth/get-me
 * @desc Get current user info
 * @access Private
 */
authRouter.get("/get-me", identifyUser, getMeController);

module.exports = authRouter;
