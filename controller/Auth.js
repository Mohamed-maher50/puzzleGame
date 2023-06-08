const User = require("../models/user");
const { createJwtToken, comparePassword } = require("../utils/miscellaneous");
const SignUp = async (req, res) => {
  try {
    const isAlreadyExist = await User.findOne({ email: req.body.email });
    if (isAlreadyExist)
      return res.status(400).json({ msg: "this account already exist" });
    const { email, fullName, _id, iD } = await new User({
      ...req.body,
    }).save();
    const token = createJwtToken({ userId: _id });
    res.status(200).json({ jwt: token, email, fullName, _id, iD });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};
const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "can not found this email" });
    var checkPassword = await comparePassword(password, user.password);
    if (!checkPassword)
      return res.status(400).json({ msg: "password not correct" });
    const token = createJwtToken({ userId: user._id });
    res.status(200).json({
      jwt: token,
      email: user.fullName,
      fullName: user.fullName,
      _id: user._id,
      iD: user.iD,
    });
  } catch (error) {
    res.sendStatus(200);
  }
};

const findUserById = async (id) => {
  try {
    const user = await User.findById(id);

    return user;
  } catch (error) {
    return undefined;
  }
};
module.exports = { SignUp, Login, findUserById };
