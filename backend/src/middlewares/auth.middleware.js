const jwt = require("jsonwebtoken");

async function identifyUser(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Token not provided,Unauthorized Access" });
  }

  let decoded = null;
  try { 
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Invalid token, Unauthorized Access" });
  }

  req.user = decoded;
  next();
}

module.exports = {
  identifyUser,
};
