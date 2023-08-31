const { findUserById } = require("../controller/Auth");
const { verificationToken } = require("./miscellaneous");
const mongoose = require("mongoose");

const ProtectRoute = async (req, res, next) => {
  try {
    var token = req.headers.authorization;
    if (!token) return res.status(401).json({ msg: "jsonwebtoken not found" });
    token = token.slice(7);
    const { userId } = verificationToken(token);
    if (!mongoose.isValidObjectId(userId))
      return res.status(401).json("token not have any data");
    const user = await findUserById(userId);
    if (!user)
      return res.status(403).json({ msg: "this user may be delete before" });
    req.userId = userId;
    next();
  } catch (error) {
    res.status(401).json({ msg: error });
  }
};
const isAdmin = async (req, res, next) => {
  try {
    const { userId } = req;
    const user = await findUserById(userId);
    if (!user) return res.status(400).json({ msg: "can't find this account" });
    if (req.params.userId == user._id) return next();
    if (user.userType == "user")
      return res.status(403).json({ msg: "you are not authorized" });
    next();
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};
module.exports = { ProtectRoute, isAdmin };
