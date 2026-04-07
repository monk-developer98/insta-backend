const userModel = require("../models/user.models");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function registerController(req, res) {
  const { username, email, password, bio, profilePic } = req.body;

  const isUserExist = await userModel.findOne({
    $or: [{ email }, { username }],
  });

  if (isUserExist) {
    return res.status(409).json({
      message:
        "User already exists" +
        (isUserExist.email === email
          ? " with this email"
          : " with this username"),
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username,
    email,
    password: hashedPassword,
    bio,
    profilePic,
  });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: false, // true only in HTTPS
    sameSite: "lax", // or "none" if cross-site strict
  });

  res.status(201).json({
    message: "User registered successfully",
    user: {
      username: user.username,
      email: user.email,
      bio: user.bio,
      profilePic: user.profilePic,
    },
    token,
  });
}

async function loginController(req, res) {
  const { username, email, password } = req.body;
  const user = await userModel.findOne({
    $or: [{ email: email }, { username: username }],
  }).select("+password");

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const hashedPassword = await bcrypt.compare(password, user.password);

  if (!hashedPassword) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: false, // true only in HTTPS
    sameSite: "lax", // or "none" if cross-site strict
  });

  res.status(200).json({
    message: "Logged in successfully",
    user: {
      username: user.username,
      email: user.email,
      bio: user.bio,
      profilePic: user.profilePic,
    },
    token,
  });
}


async function getMeController(req, res) {
  const userId = req.userId;  
  const user = await userModel.findById(userId).select("-password");

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json({
    user: {
      username: user.username ,
      email: user.email,
      bio: user.bio,
      profilePic: user.profilePic,
    },
  });

}
  

module.exports = {
  registerController,
  loginController,
  getMeController,
};
