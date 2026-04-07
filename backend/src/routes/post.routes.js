const express = require("express");
const { createPostController, getPostController, getPostDetailsController, likePostController, getFeedController } = require("../controllers/post.controller");
const postRouter = express.Router();
const multer = require("multer");
const upload = multer({ multer: multer.memoryStorage() });
const { identifyUser } = require("../middlewares/auth.middleware");


postRouter.post("/",upload.single("image"), identifyUser, createPostController);

postRouter.get("/" , identifyUser, getPostController);
postRouter.get("/details/:postId" , identifyUser, getPostDetailsController);

// like post

postRouter.post("/like/:postId" , identifyUser, likePostController)

postRouter.get("/feed", identifyUser, getFeedController);
 

module.exports = postRouter;