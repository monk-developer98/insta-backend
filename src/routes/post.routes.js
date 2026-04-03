const express = require("express");
const { createPostController } = require("../controllers/post.controller");
const postRouter = express.Router();

const multer = require("multer");
const upload = multer({ multer: multer.memoryStorage() });


postRouter.post("/",upload.single("image"), createPostController);
 

module.exports = postRouter;