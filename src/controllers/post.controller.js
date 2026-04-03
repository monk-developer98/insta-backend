const postModel = require("../models/post.models");
const Imagekit = require("@imagekit/nodejs");
const {toFile}  = require('@imagekit/nodejs')


const imagekit = new Imagekit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function createPostController(req, res) {
    // const { caption, imgUrl, user } = req.body;

    console.log(req.body , req.file );
    const file = await imagekit.files.upload({
        file : await toFile(Buffer (req.file.buffer), 'file'),
        fileName : "test.jpg",
    });

    res.send(file);

}


module.exports = { createPostController };