const mongoose  = require('mongoose');


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: [ true, 'Username already exists'],
        required: [ true, 'Username is required']
    },
    email: {
        type: String,
        required: [ true, 'Email is required'],
        unique: [ true, 'Email already exists']
    },
    password: {
        type: String,
        required: [ true, 'Password is required']   
    },
    bio: {
        type: String
    },
    profilePic: {
        type: String,
        default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
    }

}, {
    versionKey: false,
    timestamps: true
})

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;