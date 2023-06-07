const express = require("express");
const {
  signUPValidationRules,
  handleErrorAuth,
  LoginValidationRules,
} = require("../utils/Validate");
const { SignUp, Login } = require("../controller/Auth");
const router = express.Router();

router.post("/signUp", signUPValidationRules, handleErrorAuth, SignUp);
router.post("/login", LoginValidationRules, handleErrorAuth, Login);

module.exports = router;
