const postModel = require("../models/post.models");
const Imagekit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");


const imagekit = new Imagekit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function createPostController(req, res) {
  const file = await imagekit.files.upload({
    file: await toFile(Buffer(req.file.buffer), "file"),
    fileName: "test.jpg",
  });

  const post = await postModel.create({
    caption: req.body.caption,
    imgUrl: file.url,
    user: req.user.userId,
  });

  res.status(201).json({
    message: "Post created successfully",
    post,
  });
}

async function getPostController(req, res) {
  const userId = req.user.userId;

  const posts = await postModel.find({ user: userId });

  res.status(200).json({
    message: "Posts fetched successfully",
    posts,
  });
}

async function getPostDetailsController(req, res) {
  const userId = req.user.userId;
  const postId = req.params.postId;

  const post = await postModel.findById(postId);

  if (!post) {
    return res.status(404).json({
      message: "Post not found",
    });
  }

  const isValidUser = post.user.toString() === userId;
  if (!isValidUser) {
    return res.status(403).json({
      message:
        "Forbidden Access, You don't have permission to access this post",
    });
  }

  res.status(200).json({
    message: "Post details fetched successfully",
    post,
  });
}

async function likePostController(req, res) {

}
module.exports = {
  createPostController,
  getPostController,
  getPostDetailsController,
  likePostController
};
