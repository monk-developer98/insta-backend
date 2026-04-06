const mongoose = require("mongoose");

const followSchema = new mongoose.Schema({
    follwer : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [ true, "Follower is required" ]
    },
    followee : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [ true, "Followee is required" ]
    }

}, { timestamps: true });

const followModel = mongoose.model('Follow', followSchema);

module.exports = followModel;

