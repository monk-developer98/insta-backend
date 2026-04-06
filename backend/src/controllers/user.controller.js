// const folloModel = require("../models/follow.model");


async function followUser(req, res) {
    const userId  = req.user.userId

    console.log(userId)

}

module.exports = {
    followUser
};