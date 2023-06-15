const express = require("express");
const {
  signUPValidationRules,
  handleErrorAuth,
  LoginValidationRules,
} = require("../utils/Validate");
const { SignUp, Login, GetUser } = require("../controller/Auth");
const { ProtectRoute } = require("../utils/ProtectRoute");
const router = express.Router();

router.post("/signUp", signUPValidationRules, handleErrorAuth, SignUp);
router.post("/login", LoginValidationRules, handleErrorAuth, Login);
router.get("/", ProtectRoute, GetUser);
module.exports = router;
